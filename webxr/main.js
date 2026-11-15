// Simulacra WebXR client: the same headset role as the Unity and Lens Studio clients, in a browser.
//
//   AR mode       an immersive-ar session: real floor, the headset's room scan (planes and
//                 furniture volumes) for obstacles and known objects, depth occlusion where offered.
//   Preview mode  no headset: a clearly simulated room on a flat screen, for development.
//
// Behaviour (protocol, world model, walking, path planning, microphone framing) is the shared
// core in spectacles/Assets/Scripts/SimulacraCore.ts. This file only binds it to the browser.
//
// Spaces: three.js / WebXR is metres, right-handed, -Z forward. The protocol is metres,
// left-handed. The conversion is a flip of z (xrToProtocol / protocolToXr).

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { SimulacraCore, xrToProtocol, protocolToXr } from '../spectacles/Assets/Scripts/SimulacraCore.ts';
import { startLocal } from './local-backend.ts';
import { createAvatar } from './avatar.js';
import { relayUrl, voicePass } from './voice-pass.js';

const params = new URLSearchParams(location.search);
const $ = (id) => document.getElementById(id);
const isQuest = /OculusBrowser|Quest/i.test(navigator.userAgent);

// ---------------------------------------------------------------- scene

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.xr.enabled = true;
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.05, 50);
camera.position.set(0, 1.6, 1.2);
camera.rotation.order = 'YXZ';
scene.add(camera);
scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8f98, 1.6));
const sun = new THREE.DirectionalLight(0xffffff, 1.4);
sun.position.set(1.5, 3, 2);
scene.add(sun);

window.addEventListener('resize', () => {
  if (renderer.xr.isPresenting) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------------------------------------------------------------- room knowledge

/**
 * What is known about the real (or simulated) room, in three.js space.
 * floors: polygons [[x, z], ...]; obstacles: { id, label, poly, top, centre, size }.
 */
const room = { source: 'unknown', floorY: null, floors: [], obstacles: [], origin: { x: 0, z: 0 } };
const BODY = 0.25; // metres kept between the avatar's centre and anything solid

function inPolygon(x, z, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i];
    const b = poly[j];
    if (a[1] > z !== b[1] > z && x < ((b[0] - a[0]) * (z - a[1])) / (b[1] - a[1]) + a[0]) inside = !inside;
  }
  return inside;
}

function edgeDistance(x, z, poly) {
  let best = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const ax = poly[j][0], az = poly[j][1];
    const dx = poly[i][0] - ax, dz = poly[i][1] - az;
    const len2 = dx * dx + dz * dz;
    const t = len2 > 0 ? Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / len2)) : 0;
    best = Math.min(best, Math.hypot(x - ax - dx * t, z - az - dz * t));
  }
  return best;
}

/** Can the avatar stand here? Inside mapped floor, clear of walls and of every known obstacle. */
function isFloor(x, z) {
  if (room.floorY === null) return false;
  if (room.floors.length > 0) {
    let ok = false;
    for (const f of room.floors) if (inPolygon(x, z, f) && edgeDistance(x, z, f) > BODY) ok = true;
    if (!ok) return false;
  } else if (Math.hypot(x - room.origin.x, z - room.origin.z) > 4) {
    return false; // no room scan: stay near where the session started
  }
  for (const o of room.obstacles) if (inPolygon(x, z, o.poly) || edgeDistance(x, z, o.poly) < BODY) return false;
  return true;
}

// ---------------------------------------------------------------- audio

let audio = null;
let speechGain = null;
let analyser = null;
let nextPlay = 0;
const playing = new Set();
const levelBuf = new Uint8Array(256);

function audioContext() {
  if (!audio) {
    audio = new (window.AudioContext || window.webkitAudioContext)();
    speechGain = audio.createGain();
    analyser = audio.createAnalyser();
    analyser.fftSize = 512;
    speechGain.connect(analyser);
    analyser.connect(audio.destination);
  }
  if (audio.state === 'suspended') audio.resume();
  return audio;
}

function playAudio(samples) {
  const ctx = audioContext();
  const buffer = ctx.createBuffer(1, samples.length, SimulacraCore.AUDIO_RATE);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < samples.length; i++) data[i] = samples[i] / 32768;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.connect(speechGain);
  nextPlay = Math.max(nextPlay, ctx.currentTime + 0.04);
  src.start(nextPlay);
  nextPlay += buffer.duration;
  playing.add(src);
  src.onended = () => playing.delete(src);
}

function stopAudio() {
  for (const src of playing) {
    try { src.stop(); } catch (e) { /* already finished */ }
  }
  playing.clear();
  nextPlay = 0;
}

/** 0..1 loudness of the speech being played right now, for the jaw. */
function speechLevel() {
  const source = voiceAnalyser || (playing.size > 0 ? analyser : null);
  if (!source) return 0;
  source.getByteTimeDomainData(levelBuf);
  let sum = 0;
  for (let i = 0; i < levelBuf.length; i++) {
    const v = (levelBuf[i] - 128) / 128;
    sum += v * v;
  }
  return Math.min(1, Math.sqrt(sum / levelBuf.length) * 5);
}

// Live voice call (WebRTC): the microphone goes out and the voice comes back as audio tracks.
let micStream = null;
const micWaiters = new Set();
let voiceAnalyser = null;
let voiceSource = null;
const voiceElement = document.createElement('audio');
voiceElement.autoplay = true;
voiceElement.playsInline = true;
voiceElement.style.display = 'none';
document.body.appendChild(voiceElement);
const media = {
  log: (line) => debugLog('voice ' + line),
  onMic(cb) {
    if (micStream) cb(micStream);
    micWaiters.add(cb);
    return () => micWaiters.delete(cb);
  },
  onVoice(stream) {
    voiceElement.srcObject = stream;
    if (voiceSource) voiceSource.disconnect();
    voiceSource = null;
    voiceAnalyser = null;
    if (!stream) return;
    voiceElement.play().then(() => debugLog('voice playing'), (e) => debugLog('VOICE REFUSED by the browser: ' + e.message));
    // A second tap on the same stream, only to read loudness for the mouth.
    const ctx = audioContext();
    voiceSource = ctx.createMediaStreamSource(stream);
    voiceAnalyser = ctx.createAnalyser();
    voiceAnalyser.fftSize = 512;
    voiceSource.connect(voiceAnalyser);
  },
};

let micOn = false;
let micLevel = 0; // recent loudness of the microphone, so the user can see it is alive
async function startMic() {
  if (micOn) return true;
  try {
    const ctx = audioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 } });
    const worklet = `class P extends AudioWorkletProcessor{process(i){const c=i[0][0];if(c)this.port.postMessage(c.slice(0));return true}}registerProcessor('simulacra-mic',P)`;
    await ctx.audioWorklet.addModule(URL.createObjectURL(new Blob([worklet], { type: 'text/javascript' })));
    const node = new AudioWorkletNode(ctx, 'simulacra-mic');
    node.port.onmessage = (e) => {
      let sum = 0;
      for (let i = 0; i < e.data.length; i++) sum += e.data[i] * e.data[i];
      micLevel = Math.max(Math.sqrt(sum / e.data.length), micLevel * 0.9);
      core.pushMic(e.data, e.data.length, ctx.sampleRate);
    };
    ctx.createMediaStreamSource(stream).connect(node);
    micStream = stream;
    for (const cb of micWaiters) cb(stream);
    micOn = true;
    $('mic').disabled = true;
    $('mic').textContent = 'Microphone on';
    return true;
  } catch (e) {
    note('Microphone unavailable: ' + (e && e.message ? e.message : e));
    return false;
  }
}

// ---------------------------------------------------------------- core + connection

let lastPointer = null; // THREE.Object3D whose -Z is the pointing ray (a controller or hand), or null for gaze
const tmpV = new THREE.Vector3();
const tmpD = new THREE.Vector3();

function viewCamera() {
  return renderer.xr.isPresenting ? renderer.xr.getCamera() : camera;
}

/** Where a ray lands: the top of a known obstacle, else the floor. Null if it hits neither within 8 m. */
function rayHit(origin, dir) {
  let best = null;
  let bestT = 8;
  const tryPlane = (y, test) => {
    if (Math.abs(dir.y) < 1e-4) return;
    const t = (y - origin.y) / dir.y;
    if (t <= 0.05 || t >= bestT) return;
    const x = origin.x + dir.x * t;
    const z = origin.z + dir.z * t;
    if (!test(x, z)) return;
    bestT = t;
    best = new THREE.Vector3(x, y, z);
  };
  for (const o of room.obstacles) tryPlane(o.top, (x, z) => inPolygon(x, z, o.poly));
  if (room.floorY !== null) tryPlane(room.floorY, () => true);
  return best;
}

// ---------------------------------------------------------------- seeing

// What the user sees, as a picture the mind can look at.
//   Preview: the rendered view itself (exact).
//   AR: the headset's outward camera, if the browser offers one. The picture is matched to the
//   room with the head pose at that moment and an assumed lens angle (?camfov=, degrees across),
//   so positions taken from it are approximate.
let cameraVideo = null;
let cameraLabel = '';
const shot = document.createElement('canvas');
const CAM_FOV = Number(params.get('camfov')) || 90;

async function startCamera() {
  if (cameraVideo || params.get('camera') === '0') return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } } });
    const label = (stream.getVideoTracks()[0] && stream.getVideoTracks()[0].label) || '';
    // A headset browser may offer the user's avatar as a "camera". That is not what they see: refuse it.
    if (/avatar|selfie|virtual|front/i.test(label) && !/passthrough|back|environment|world/i.test(label)) {
      stream.getTracks().forEach((t) => t.stop());
      cameraLabel = 'refused: "' + label + '" is not an outward camera';
      debugLog('camera ' + cameraLabel);
      return;
    }
    const v = document.createElement('video');
    v.srcObject = stream;
    v.muted = true;
    v.playsInline = true;
    await v.play();
    cameraVideo = v;
    cameraLabel = label || 'camera';
    debugLog('camera on: ' + cameraLabel + ' ' + v.videoWidth + 'x' + v.videoHeight);
  } catch (e) {
    cameraLabel = 'unavailable: ' + (e && e.message ? e.message : e);
    debugLog('camera ' + cameraLabel);
  }
}

function captureView() {
  const cam = viewCamera();
  cam.updateMatrixWorld(true);
  const origin = cam.getWorldPosition(new THREE.Vector3());
  const pose = cam.matrixWorld.clone();
  let rayFor;
  if (!renderer.xr.isPresenting) {
    // Preview: draw the frame now and read it back at once (the buffer is cleared afterwards).
    renderer.render(scene, camera);
    shot.width = 640;
    shot.height = Math.round((640 * renderer.domElement.height) / renderer.domElement.width);
    shot.getContext('2d').drawImage(renderer.domElement, 0, 0, shot.width, shot.height);
    const inverse = camera.projectionMatrixInverse.clone();
    rayFor = (x, y) => new THREE.Vector3(x * 2 - 1, 1 - y * 2, 0.5).applyMatrix4(inverse).applyMatrix4(pose).sub(origin).normalize();
  } else {
    if (!cameraVideo || cameraVideo.videoWidth === 0) return null;
    shot.width = 640;
    shot.height = Math.round((640 * cameraVideo.videoHeight) / cameraVideo.videoWidth);
    shot.getContext('2d').drawImage(cameraVideo, 0, 0, shot.width, shot.height);
    const tx = Math.tan((CAM_FOV * Math.PI) / 360);
    const ty = (tx * shot.height) / shot.width;
    rayFor = (x, y) => new THREE.Vector3((x * 2 - 1) * tx, (1 - y * 2) * ty, -1).transformDirection(pose);
  }
  const jpeg = shot.toDataURL('image/jpeg', 0.7).split(',')[1];
  return {
    jpeg,
    locate: (x, y) => {
      const hit = rayHit(origin, rayFor(x, y));
      return hit && hit.distanceTo(origin) < 7 ? xrToProtocol(hit.x, hit.y, hit.z) : null;
    },
  };
}

const host = {
  send: (text) => { if (socket && socket.readyState === WebSocket.OPEN) socket.send(text); },
  headPosition: () => {
    viewCamera().getWorldPosition(tmpV);
    return xrToProtocol(tmpV.x, tmpV.y, tmpV.z);
  },
  headForward: () => {
    viewCamera().getWorldDirection(tmpD);
    return xrToProtocol(tmpD.x, tmpD.y, tmpD.z);
  },
  floorY: () => room.floorY,
  isFloor: (p) => isFloor(p.x, -p.z),
  pointerHit: () => {
    const source = lastPointer && lastPointer.visible ? lastPointer : viewCamera();
    source.getWorldPosition(tmpV);
    source.getWorldDirection(tmpD);
    if (source !== viewCamera()) tmpD.negate(); // controllers point down their own -Z; getWorldDirection gives +Z for non-cameras
    const hit = rayHit(tmpV, tmpD) || (source !== viewCamera() ? rayHit(viewCamera().getWorldPosition(tmpV), viewCamera().getWorldDirection(tmpD)) : null);
    return hit ? xrToProtocol(hit.x, hit.y, hit.z) : null;
  },
  playAudio,
  stopAudio,
  log: (m) => { console.log(m); debugLog(m); },
  roomInfo: () => ({ source: room.source, obstacles: room.obstacles.length }),
  captureView,
};

let previewMode = true;
const core = new SimulacraCore(host, 'webxr');
const wanderWanted = params.get('wander') !== '0'; // strolls between requests, but only across floor it actually knows; ?wander=0 keeps it still
let socket = null;

/**
 * Where the backend is. Served by the backend itself: the same host. Hosted somewhere else
 * (GitHub Pages): the address typed into the page, else this device's own port 8787, which is the
 * laptop when a headset is plugged in by USB. A secure page may only use ws:// to localhost;
 * any other backend must be wss://.
 */
const hostedElsewhere = !/^\/xr\//.test(location.pathname);
function backendAddress() {
  let saved = '';
  try { saved = localStorage.getItem('simulacra.backend') || ''; } catch (e) { /* storage unavailable */ }
  return params.get('backend') || (hostedElsewhere ? saved : (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host);
}

/** The user's OpenAI key for stand-alone use. It lives in this browser only and is sent only to OpenAI. */
// A link can carry the key (…/#key=sk-…): it is saved and removed from the address at once.
{
  const m = /[#&]key=(sk-[\w-]{20,})/.exec(location.hash);
  if (m) {
    try { localStorage.setItem('simulacra.openaiKey', m[1]); } catch (e) { /* storage unavailable */ }
    history.replaceState(null, '', location.pathname + location.search);
  }
}
function savedKey() {
  try { return localStorage.getItem('simulacra.openaiKey') || ''; } catch (e) { return ''; }
}
/** Stand-alone: the page is hosted on its own, has a key, and was not pointed at a backend. */
let relay = ''; // the site's voice relay, if it has one: live voice with no key in the page
const standalone = () => hostedElsewhere && !params.get('backend') && (!!savedKey() || !!relay);

// ---------------------------------------------------------------- debug

// A running record of what is happening, for when something does not work: shown on the page
// (Debug button) and, while debug is on, kept visible in the headset.
const debugLines = [];
let debugOn = params.has('debug');
try { debugOn = debugOn || localStorage.getItem('simulacra.debug') === '1'; } catch (e) { /* storage unavailable */ }
const t0 = performance.now();
function debugLog(line) {
  debugLines.push(((performance.now() - t0) / 1000).toFixed(1).padStart(6) + '  ' + line);
  if (debugLines.length > 200) debugLines.shift();
}
/** Everything the mind sends passes through here on its way to the character. */
function fromBackend(text) {
  try {
    const m = JSON.parse(text);
    if (m.type === 'ready') debugLog('mind ready: ' + m.brain);
    else if (m.type === 'state') debugLog('state ' + m.status);
    else if (m.type === 'action') debugLog('ACTION ' + m.action + ' ' + (m.target_id || '') + ' ' + (m.params ? JSON.stringify(m.params) : ''));
    else if (m.type === 'transcript') debugLog((m.role === 'user' ? 'heard: ' : 'said:  ') + m.text);
    else if (m.type === 'metrics') debugLog('timing ' + Object.entries(m.turn.ms || {}).map(([k, v]) => k + '=' + v).join(' '));
    else if (m.type === 'audio_stop') debugLog('speech cut off');
  } catch (e) { /* not JSON: the core ignores it too */ }
  core.onMessage(text);
}
function debugSummary() {
  const a = core.avatar;
  const head = host.headPosition();
  return [
    'mind: ' + (core.connected ? core.brain : 'not connected') + (standalone() ? ' (in this browser)' : hostedElsewhere ? ' (no key, no backend)' : ' (backend)') + '   status: ' + core.status,
    'microphone: ' + (micOn ? 'on, level ' + micLevel.toFixed(3) + (core.micMuted ? ' (paused while she speaks)' : '') : 'OFF') + '   voice: ' + (voiceAnalyser ? 'live call' : playing.size > 0 ? 'playing' : 'silent'),
    'camera: ' + (cameraVideo ? cameraLabel + ' (looking every ' + core.autoLook + ' s)' : previewMode ? (core.canSee ? 'the rendered view' : 'off in preview (add ?look=10)') : cameraLabel || 'not started') + '   seen by camera: ' + core.objects.filter((o) => o.source === 'detected').map((o) => o.id).join(' '),
    'room: ' + room.source + ', ' + room.floors.length + ' floor outline(s), ' + room.obstacles.length + ' obstacle(s), ' + core.objects.length + ' known object(s)' + (xrFeatures.length ? '   features: ' + xrFeatures.join(',') : ''),
    'her: ' + a.state + ' at ' + a.pos.x.toFixed(2) + ',' + a.pos.z.toFixed(2) + '   you: ' + head.x.toFixed(2) + ',' + head.z.toFixed(2) + '   apart: ' + Math.hypot(a.pos.x - head.x, a.pos.z - head.z).toFixed(2) + ' m   strolling: ' + (core.wander ? 'allowed' : 'off'),
    'last action: ' + (core.lastAction || '-') + (core.lastError ? '   LAST ERROR: ' + core.lastError : ''),
  ];
}

let generation = 0;
function connect() {
  const mine = ++generation;
  if (standalone()) {
    // No backend: the same session code runs right here and talks to OpenAI directly.
    const local = startLocal(savedKey(), (text) => { if (mine === generation) fromBackend(text); }, media, savedKey() && params.get('mind') === 'audio' ? 'audio' : 'realtime', voicePass);
    socket = { readyState: WebSocket.OPEN, send: (text) => local.send(text), close: () => { local.close(); core.onClose(); connect(); } };
    core.onOpen();
    return;
  }
  const base = backendAddress();
  if (document.activeElement !== $('backend')) $('backend').value = base;
  if (!base) return; // hosted on its own with no key and no backend chosen yet: wait for one
  const ws = (socket = new WebSocket(base.replace(/\/$/, '') + '/device'));
  ws.onopen = () => core.onOpen();
  ws.onmessage = (e) => { if (typeof e.data === 'string' && mine === generation) fromBackend(e.data); };
  ws.onclose = () => {
    if (mine !== generation) return;
    core.onClose();
    setTimeout(() => { if (mine === generation) connect(); }, 2000);
  };
  ws.onerror = () => { /* onclose follows */ };
}

// ---------------------------------------------------------------- avatar

const avatar = createAvatar({ THREE, FBXLoader, scene, assetBase: './avatar/', height: Number(params.get('height')) || 1.7, placeholder: params.get('avatar') === 'placeholder' });
const avatarRoot = avatar.root;
const body = avatar.body;
const loadAvatar = avatar.load;
const UP = new THREE.Vector3(0, 1, 0);
const lookTarget = new THREE.Vector3();
function animateBody(dt, metres) {
  const a = core.avatar;
  const p = protocolToXr(a.pos);
  avatar.animate(dt, { x: p.x, y: p.y, z: p.z, yaw: a.yaw, speed01: a.speed01, gesture: a.gesture, metres }, speechLevel(), viewCamera().getWorldPosition(lookTarget));
}

// ---------------------------------------------------------------- preview room (no headset)

const previewGroup = new THREE.Group();
function buildPreviewRoom() {
  scene.background = new THREE.Color(0x1a2026);
  room.source = 'simulated';
  room.floorY = 0;
  room.floors = [[[-2.6, -5], [2.6, -5], [2.6, 2], [-2.6, 2]]];
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 7), new THREE.MeshStandardMaterial({ color: 0x59636e, roughness: 0.95 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, -1.5);
  previewGroup.add(floor);
  const prop = (id, label, x, z, w, h, d, color) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: 0.85 }));
    m.position.set(x, h / 2, z);
    previewGroup.add(m);
    room.obstacles.push({ id, label, top: h, poly: [[x - w / 2, z - d / 2], [x + w / 2, z - d / 2], [x + w / 2, z + d / 2], [x - w / 2, z + d / 2]] });
    core.upsert(id, label, xrToProtocol(x, h / 2, z), { x: w, y: h, z: d }, 'simulated');
  };
  prop('table_1', 'table', 0.2, -2.4, 1.3, 0.74, 0.7, 0x8a6a4a);
  prop('chair_1', 'chair', -1.5, -3.6, 0.5, 0.9, 0.5, 0x4d7c8a);
  prop('plant_1', 'plant', 1.9, -4.2, 0.4, 1.1, 0.4, 0x4f8a57);
  scene.add(previewGroup);

  // Look around by dragging, move with WASD / arrow keys: the camera is "the user".
  const keys = {};
  let drag = null;
  renderer.domElement.addEventListener('pointerdown', (e) => { drag = [e.clientX, e.clientY]; });
  window.addEventListener('pointerup', () => { drag = null; });
  window.addEventListener('pointermove', (e) => {
    if (!drag) return;
    camera.rotation.y -= (e.clientX - drag[0]) * 0.004;
    camera.rotation.x = Math.max(-1.2, Math.min(1.2, camera.rotation.x - (e.clientY - drag[1]) * 0.004));
    drag = [e.clientX, e.clientY];
  });
  window.addEventListener('keydown', (e) => { if (e.target === document.body) keys[e.key.toLowerCase()] = true; });
  window.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; });
  return (dt) => {
    const f = (keys.w || keys.arrowup ? 1 : 0) - (keys.s || keys.arrowdown ? 1 : 0);
    const r = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
    if (!f && !r) return;
    const yaw = camera.rotation.y;
    camera.position.x += (-Math.sin(yaw) * f + Math.cos(yaw) * r) * dt * 1.4;
    camera.position.z += (-Math.cos(yaw) * f - Math.sin(yaw) * r) * dt * 1.4;
  };
}

// ---------------------------------------------------------------- AR session

let xrSession = null;
let xrFeatures = [];
let roomReadAt = 0;
let sawRoomData = false;
let askedForCapture = false;
let sessionAge = 0;
const planeIds = new Map();
const idCounters = {};
const debugGroup = new THREE.Group();
scene.add(debugGroup);

function stableId(key, label) {
  let id = planeIds.get(key);
  if (!id) {
    idCounters[label] = (idCounters[label] || 0) + 1;
    id = label + '_' + idCounters[label];
    planeIds.set(key, id);
  }
  return id;
}
const cleanLabel = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

/**
 * Read the headset's room scan for this frame: floor polygons, and furniture as obstacles and
 * named objects (source "room_scan"). Labels are the headset's own, from the user's room setup;
 * nothing here is recognised by a camera.
 */
function readRoom(frame, ref) {
  const floors = [];
  const obstacles = [];
  const m = new THREE.Matrix4();
  const things = [];

  const planes = frame.detectedPlanes;
  if (planes) {
    for (const plane of planes) {
      const pose = frame.getPose(plane.planeSpace, ref);
      if (!pose || !plane.polygon || plane.polygon.length < 3) continue;
      m.fromArray(pose.transform.matrix);
      const pts = plane.polygon.map((pt) => new THREE.Vector3(pt.x, pt.y, pt.z).applyMatrix4(m));
      const normal = new THREE.Vector3(0, 1, 0).transformDirection(m);
      const label = cleanLabel(plane.semanticLabel);
      const box = new THREE.Box3().setFromPoints(pts);
      const horizontal = plane.orientation ? plane.orientation === 'horizontal' : Math.abs(normal.y) > 0.8;
      const poly = pts.map((p) => [p.x, p.z]);
      if (label === 'ceiling' || label === 'global_mesh') continue;
      if (horizontal) {
        const y = (box.min.y + box.max.y) / 2;
        if (label === 'floor' || (label === '' && Math.abs(y) < 0.15)) floors.push({ poly, y });
        else if (y > 0.2 && y < 1.9) things.push({ key: plane, label: label || 'surface', poly, top: y, box: new THREE.Box3(new THREE.Vector3(box.min.x, 0, box.min.z), new THREE.Vector3(box.max.x, y, box.max.z)), solid: true });
      } else if (label && label !== 'wall' && label !== 'invisible_wall_face' && label !== 'wall_face') {
        // Doors, windows, screens, wall art: things to know about and walk up to, not obstacles.
        things.push({ key: plane, label: label.replace(/_frame$/, ''), poly, top: box.max.y, box, solid: false });
      }
    }
  }
  const meshes = frame.detectedMeshes;
  if (meshes) {
    for (const mesh of meshes) {
      const label = cleanLabel(mesh.semanticLabel);
      if (!label || label === 'global_mesh' || label === 'floor' || label === 'ceiling' || label.includes('wall')) continue;
      const pose = frame.getPose(mesh.meshSpace, ref);
      if (!pose || !mesh.vertices || mesh.vertices.length < 9) continue;
      m.fromArray(pose.transform.matrix);
      const local = new THREE.Box3();
      const world = new THREE.Box3();
      const v = new THREE.Vector3();
      for (let i = 0; i + 2 < mesh.vertices.length; i += 3) {
        local.expandByPoint(v.set(mesh.vertices[i], mesh.vertices[i + 1], mesh.vertices[i + 2]));
        world.expandByPoint(v.applyMatrix4(m));
      }
      if (world.max.y < 0.2 || world.min.y > 1.9) continue;
      // Footprint: project the local box's eight corners to the ground and take their hull's bounding rectangle in world axes.
      const poly = [[world.min.x, world.min.z], [world.max.x, world.min.z], [world.max.x, world.max.z], [world.min.x, world.max.z]];
      const c = world.getCenter(new THREE.Vector3());
      // The same piece of furniture often arrives as both a plane (its top) and a volume: keep one.
      if (things.some((t) => t.solid && t.label === label && inPolygon(c.x, c.z, t.poly))) continue;
      things.push({ key: mesh, label, poly, top: world.max.y, box: world, solid: true });
    }
  }

  const keep = [];
  for (const t of things) {
    const id = stableId(t.key, t.label);
    keep.push(id);
    const c = t.box.getCenter(new THREE.Vector3());
    const s = t.box.getSize(new THREE.Vector3());
    core.upsert(id, t.label, xrToProtocol(c.x, c.y, c.z), { x: Math.max(0.1, s.x), y: Math.max(0.1, s.y), z: Math.max(0.1, s.z) }, 'room_scan');
    if (t.solid) obstacles.push({ id, label: t.label, poly: t.poly, top: t.top });
  }
  core.prune('room_scan', keep);

  const hadData = sawRoomData;
  if (floors.length > 0 || obstacles.length > 0) sawRoomData = true;
  room.floors = floors.map((f) => f.poly);
  room.obstacles = obstacles;
  room.floorY = floors.length > 0 ? floors.reduce((a, f) => a + f.y, 0) / floors.length : 0; // local-floor puts the floor at y = 0
  room.source = floors.length > 0 ? 'room_scan' : obstacles.length > 0 ? 'room_scan_no_floor_outline' : 'floor_level_only';
  if (sawRoomData !== hadData && core.placed && !isFloor(avatarRoot.position.x, avatarRoot.position.z)) core.placed = false; // re-place once the room is known

  if (debugOn) drawDebug();
  else if (debugGroup.children.length) debugGroup.clear();
}

function drawDebug() {
  debugGroup.clear();
  const line = (poly, y, color) => {
    const pts = poly.concat([poly[0]]).map((p) => new THREE.Vector3(p[0], y, p[1]));
    debugGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color })));
  };
  for (const f of room.floors) line(f, (room.floorY || 0) + 0.01, 0x33dd77);
  for (const o of room.obstacles) line(o.poly, o.top, 0xff5544);
}

async function enterAR() {
  audioContext();
  // Microphone first, and wait for it: its permission prompt is a 2D dialog that is lost if the
  // immersive session starts on top of it, leaving a character that can never hear.
  const hadMic = micOn;
  await startMic();
  await startCamera(); // same reason; and without it she knows only the room scan and what you name
  const wantDepth = params.get('depth') !== '0';
  const init = {
    requiredFeatures: ['local-floor'],
    optionalFeatures: ['plane-detection', 'mesh-detection', 'hand-tracking'],
  };
  if (wantDepth) {
    init.optionalFeatures.push('depth-sensing');
    init.depthSensing = { usagePreference: ['gpu-optimized'], dataFormatPreference: ['unsigned-short', 'float32', 'luminance-alpha'] };
  }
  let session;
  try {
    session = await navigator.xr.requestSession('immersive-ar', init);
  } catch (e) {
    // Answering the microphone prompt can use up the tap that is needed to start AR.
    if (!hadMic && micOn) note('Microphone is on. Press Enter AR once more.');
    else note('Could not start AR: ' + (e && e.message ? e.message : e));
    return;
  }
  xrSession = session;
  xrFeatures = Array.from(session.enabledFeatures || []);
  previewMode = false;
  previewGroup.visible = false;
  scene.background = null;
  core.prune('simulated', []);
  room.source = 'floor_level_only';
  room.floors = [];
  room.obstacles = [];
  room.floorY = 0;
  core.placed = false;
  avatarRoot.visible = false;
  sessionAge = 0;
  sawRoomData = false;
  renderer.xr.setReferenceSpaceType('local-floor');
  await renderer.xr.setSession(session);

  for (let i = 0; i < 2; i++) {
    const c = renderer.xr.getController(i);
    scene.add(c);
    // Trigger or pinch: cut the avatar off mid-sentence. Grip: bring the avatar back in front of you.
    c.addEventListener('selectstart', () => {
      lastPointer = c;
      core.interrupt();
    });
    c.addEventListener('squeezestart', () => {
      lastPointer = c;
      core.placed = false;
    });
    c.addEventListener('connected', () => { lastPointer = lastPointer || c; });
  }
  session.addEventListener('end', () => {
    xrSession = null;
    note('AR session ended. Reload the page to start again.');
  });
}

// ---------------------------------------------------------------- heads-up text (AR only)

const hud = (() => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.12), new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthTest: false }));
  mesh.renderOrder = 10;
  mesh.visible = false;
  scene.add(mesh);
  let shown = '';
  let hideAt = 0;
  return {
    update(text, now, dt) {
      if (text !== shown) {
        shown = text;
        hideAt = now + 7;
        ctx.clearRect(0, 0, 1024, 256);
        ctx.fillStyle = 'rgba(12,16,20,0.72)';
        ctx.beginPath();
        ctx.roundRect(0, 0, 1024, 256, 28);
        ctx.fill();
        ctx.fillStyle = '#eef3f7';
        ctx.font = '38px system-ui, sans-serif';
        const rows = text.split('\n').slice(-9);
        const size = rows.length > 5 ? 24 : 38;
        ctx.font = size + 'px system-ui, sans-serif';
        const fit = Math.floor(1960 / size);
        rows.forEach((l, i) => ctx.fillText(l.length > fit ? l.slice(0, fit - 1) + '…' : l, 28, (size > 30 ? 54 : 34) + i * (size + (size > 30 ? 8 : 3))));
        texture.needsUpdate = true;
      }
      mesh.visible = renderer.xr.isPresenting && params.get('hud') !== '0' && (debugOn || now < hideAt || !micOn || !core.connected || core.status === 'listening' || core.status === 'thinking');
      if (!mesh.visible) return;
      const cam = viewCamera();
      const p = cam.getWorldPosition(new THREE.Vector3());
      const d = cam.getWorldDirection(new THREE.Vector3());
      d.y = 0;
      d.normalize();
      // Low and to the left, so it never covers the avatar's face.
      const want = p.clone().addScaledVector(d, 0.95).addScaledVector(new THREE.Vector3().crossVectors(d, UP), -0.34).add(new THREE.Vector3(0, -0.4, 0));
      mesh.position.lerp(want, Math.min(1, dt * 4));
      mesh.lookAt(p);
    },
  };
})();

// ---------------------------------------------------------------- frame loop

let debugShownAt = 0;
function note(text) {
  if (text) debugLog('note: ' + text);
  $('note').textContent = text;
}

function statusText() {
  const lines = [];
  lines.push(core.connected ? (standalone() ? 'Running in this browser' : 'Backend connected') + ' · brain: ' + core.brain : hostedElsewhere ? (renderer.xr.isPresenting ? 'No OpenAI key: leave AR and paste it on the page' : 'Paste your OpenAI key below to start.') : 'Connecting to the backend…');
  if (core.connected && core.brain === 'mock') lines.push('No AI keys yet: open /setup on the computer running the backend');
  if (!core.placed) lines.push(room.floorY === null ? 'Looking for the floor…' : 'Finding a clear spot on the floor: look at open floor in front of you');
  // Voice: say plainly whether she can hear, and what she is doing with it.
  if (!micOn) lines.push('Microphone OFF: she cannot hear you');
  else if (core.micMuted) lines.push('(speaking: microphone paused)');
  else if (core.status === 'listening') lines.push('Listening…');
  else if (core.status === 'thinking') lines.push('Thinking…');
  else lines.push('Microphone on ' + (micLevel > 0.02 ? '▮▮▮' : micLevel > 0.006 ? '▮▮' : '▮') + ' : just talk');
  if (renderer.xr.isPresenting && !cameraVideo) lines.push('No camera: she cannot see your view');
  if (renderer.xr.isPresenting && room.source !== 'room_scan') lines.push('No room scan: she stays put (run Space Setup on the headset)');
  if (core.lastTranscript) lines.push(core.lastTranscript);
  if (core.lastAction) lines.push('Action: ' + core.lastAction);
  if (core.lastError) lines.push(core.lastError);
  return lines.join('\n');
}

let movePreview = null;
let lastTime = 0;
let lastAvatar = null;
let placeTry = 0;
const halfDuplex = params.has('halfduplex') ? params.get('halfduplex') !== '0' : isQuest; // headset speakers sit next to the microphones

function frame(timeMs, xrFrame) {
  const now = timeMs / 1000;
  const dt = Math.min(0.1, lastTime ? now - lastTime : 0.016);
  lastTime = now;

  if (xrFrame && renderer.xr.isPresenting) {
    sessionAge += dt;
    if (now >= roomReadAt) {
      roomReadAt = now + 0.5;
      const ref = renderer.xr.getReferenceSpace();
      if (ref) readRoom(xrFrame, ref);
      // No room data after a few seconds: the headset has no saved room. Ask it to run room setup (once).
      if (!sawRoomData && !askedForCapture && sessionAge > 4 && xrSession && typeof xrSession.initiateRoomCapture === 'function' && xrFeatures.includes('plane-detection')) {
        askedForCapture = true;
        xrSession.initiateRoomCapture().catch(() => {});
      }
    }
  } else if (movePreview) movePreview(dt);

  // Stand the avatar on the floor in front of the user once there is a floor. In AR, wait a moment for the room scan.
  if (!core.placed && room.floorY !== null && now >= placeTry && (previewMode || sessionAge > 1.2)) {
    placeTry = now + 0.5;
    if (core.placeInFrontOfUser(previewMode ? 2.2 : 1.8)) lastAvatar = null;
  }

  core.micMuted = halfDuplex && core.speakingFor > 0 && !voiceAnalyser; // a live call cancels its own echo
  const sees = previewMode ? params.has('look') : !!cameraVideo;
  if (sees !== core.canSee) {
    core.canSee = sees;
    core.announce();
  }
  core.autoLook = sees && params.get('look') !== '0' ? Number(params.get('look')) || 10 : 0;
  core.wander = wanderWanted && (room.source === 'room_scan' || room.source === 'simulated'); // never stroll blind
  core.update(dt);
  avatarRoot.visible = core.placed;
  const a = core.avatar.pos;
  const metres = lastAvatar ? Math.hypot(a.x - lastAvatar.x, a.z - lastAvatar.z) : 0;
  lastAvatar = { x: a.x, z: a.z };
  animateBody(dt, metres);

  const text = statusText();
  if ($('status').textContent !== text) $('status').textContent = text;
  hud.update(debugOn ? debugSummary().concat(debugLines.slice(-4)).join('\n') : text, now, dt);
  if (debugOn && !renderer.xr.isPresenting && now - debugShownAt > 0.3) {
    debugShownAt = now;
    $('debug').textContent = debugSummary().concat('', debugLines.slice(-60)).join('\n');
  }
  renderer.render(scene, camera);
}

// ---------------------------------------------------------------- start

async function start() {
  $('mic').onclick = startMic;
  const showDebug = () => {
    $('debug').hidden = !debugOn;
    $('debugCopy').hidden = !debugOn;
    $('debugToggle').textContent = debugOn ? 'Hide debug' : 'Debug';
  };
  showDebug();
  $('debugToggle').onclick = () => {
    debugOn = !debugOn;
    try { localStorage.setItem('simulacra.debug', debugOn ? '1' : '0'); } catch (e) { /* storage unavailable */ }
    showDebug();
  };
  $('debugCopy').onclick = () => navigator.clipboard.writeText(debugSummary().concat('', debugLines).join('\n')).then(() => note('Debug log copied.'), () => note('Could not copy; select the text instead.'));
  window.addEventListener('error', (e) => debugLog('PAGE ERROR ' + e.message));
  window.addEventListener('unhandledrejection', (e) => debugLog('PAGE ERROR ' + (e.reason && e.reason.message ? e.reason.message : e.reason)));
  $('enter').onclick = enterAR;
  $('backendRow').hidden = !hostedElsewhere;
  $('keyRow').hidden = !hostedElsewhere;
  const showKey = () => { $('keyState').textContent = savedKey() ? 'A key is saved in this browser. Paste another to replace it.' : 'Stays in this browser; sent only to OpenAI.'; };
  showKey();
  $('keySave').onclick = () => {
    const k = $('key').value.trim().replace(/^["']|["']$/g, '');
    try { if (k) localStorage.setItem('simulacra.openaiKey', k); else localStorage.removeItem('simulacra.openaiKey'); } catch (e) { note('This browser will not store the key (private mode?).'); }
    $('key').value = '';
    showKey();
    audioContext();
    if (socket && socket.readyState <= 1) socket.close();
    else connect();
  };
  $('backend').addEventListener('change', () => {
    try { localStorage.setItem('simulacra.backend', $('backend').value.trim()); } catch (e) { /* storage unavailable */ }
    if (socket && socket.readyState <= 1) socket.close(); // reconnects to the new address
    else connect();
  });
  $('text').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    audioContext();
    const t = $('text').value.trim();
    if (t) core.sendText(t);
    $('text').value = '';
  });

  if (hostedElsewhere) relay = await relayUrl();
  movePreview = buildPreviewRoom();
  await loadAvatar();
  connect();
  renderer.setAnimationLoop(frame);

  let arSupported = false;
  try {
    arSupported = !!navigator.xr && (await navigator.xr.isSessionSupported('immersive-ar'));
  } catch (e) { /* not supported */ }
  if (arSupported) {
    $('enter').disabled = false;
    $('mode').textContent = 'This browser supports AR. Press Enter AR to put the avatar in your room.';
    note('Until then this is a preview in a simulated room.');
  } else {
    $('mode').textContent = 'PREVIEW — simulated room (this browser has no AR session)';
    const why = !window.isSecureContext ? 'AR needs a secure page: open this as http://localhost… (USB with adb reverse) or over https.' : !navigator.xr ? 'This browser has no WebXR.' : 'This browser does not offer immersive AR sessions.';
    note(why + ' Drag to look, WASD to move.');
  }
}

window.simulacra = { debugLines, debugSummary, core, room, body, scene, camera, renderer, avatarRoot, enterAR, isFloor, get features() { return xrFeatures; }, get preview() { return previewMode; } };
start();
