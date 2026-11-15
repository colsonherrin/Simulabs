// The Simulacra companion, standing inside the Crownfall scene.
// The game exposes its three.js constructors on window.__cf3 and calls window.__cfTick each frame.

import { SimulacraCore, xrToProtocol, protocolToXr } from '../spectacles/Assets/Scripts/SimulacraCore.ts';
import { startLocal } from './local-backend.ts';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const params = new URLSearchParams(location.search);
const isQuest = /OculusBrowser|Quest/i.test(navigator.userAgent);
const $ = (id) => document.getElementById(id);

const T = window.__cf3 || {};
const V3 = T.Vector3 || function V3() {};
const tmpV = new V3();
const tmpD = new V3();
const boardPos = new V3();
const standPos = new V3();

let audio = null;
let speechGain = null;
let analyser = null;
let nextPlay = 0;
const playing = new Set();
const levelBuf = new Uint8Array(256);
let micOn = false;
let micOpening = false;
let userMuted = true;
let aWasDown = false;
let parkedAt = null;
let commanded = false;
let lastStatus = '';
const halfDuplex = params.has('halfduplex') ? params.get('halfduplex') !== '0' : isQuest;
const voiceDbg = { sent: 0, sentAt: 0, rxAudio: 0, micError: '' };
let micLevel = 0;
let micStream = null;
const micWaiters = new Set();
let voiceAnalyser = null;
let voiceSource = null;
const voiceElement = new Audio();
voiceElement.autoplay = true;
const media = {
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
    voiceDbg.rxAudio++;
    voiceElement.play().catch(() => {});
    const ctx = audioContext();
    voiceSource = ctx.createMediaStreamSource(stream);
    voiceAnalyser = ctx.createAnalyser();
    voiceAnalyser.fftSize = 512;
    voiceSource.connect(voiceAnalyser);
  },
};

function savedKey() {
  try { return localStorage.getItem('simulacra.openaiKey') || ''; } catch (e) { return ''; }
}

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
  voiceDbg.rxAudio++;
}

function stopAudio() {
  for (const src of playing) {
    try { src.stop(); } catch (e) { /* already finished */ }
  }
  playing.clear();
  nextPlay = 0;
}

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

function viewCamera(ctx) {
  return ctx.renderer.xr.isPresenting ? ctx.renderer.xr.getCamera() : ctx.camera;
}

let socket = null;
let local = null;
let generation = 0;
const host = {
  send: (text) => {
    if (socket && socket.readyState === WebSocket.OPEN) socket.send(text);
  },
  headPosition: () => {
    const cam = viewCamera(latest);
    cam.getWorldPosition(tmpV);
    return xrToProtocol(tmpV.x, tmpV.y, tmpV.z);
  },
  headForward: () => {
    const cam = viewCamera(latest);
    cam.getWorldDirection(tmpD);
    return xrToProtocol(tmpD.x, tmpD.y, tmpD.z);
  },
  floorY: () => 0,
  isFloor: () => true,
  pointerHit: () => null,
  playAudio,
  stopAudio,
  log: (m) => console.log(m),
  roomInfo: () => ({ source: 'crownfall', obstacles: 0 }),
};

const core = new SimulacraCore(host, 'crownfall');
let latest = { scene: null, camera: null, renderer: null, board: null, dt: 0.016 };

function deviceUrl(base) {
  const b = String(base || '').trim().replace(/\/$/, '');
  if (!b) return '';
  return b.endsWith('/device') ? b : b + '/device';
}

function defaultBackend() {
  const q = params.get('backend');
  if (q) return q;
  try {
    const saved = localStorage.getItem('simulacra-backend');
    if (saved) return saved;
  } catch (e) { /* private mode */ }
  if (!/github\.io$/i.test(location.hostname)) return (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host;
  return '';
}

let heard = '';
let reply = '';

function takeMessage(text) {
  try {
    const m = JSON.parse(text);
    if (m && m.type === 'transcript' && m.text) {
      const line = String(m.text).replace(/\s+/g, ' ').trim();
      if (m.role === 'user') {
        heard = line;
        reply = '…';
      } else reply = line;
    }
  } catch (e) { /* the core still reads the message */ }
  core.onMessage(text);
}

function rememberKey(k) {
  if (!k) return '';
  try { localStorage.setItem('simulacra.openaiKey', k); } catch (e) { /* private mode */ }
  return k;
}

function keyOverSocket() {
  return new Promise((resolve) => {
    let ws;
    let finished = false;
    const done = (k) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      try { if (ws) ws.close(); } catch (e) { /* already closed */ }
      resolve(k || '');
    };
    const timer = setTimeout(() => done(''), 2500);
    try { ws = new WebSocket('ws://127.0.0.1:8787/device'); }
    catch (e) { done(''); return; }
    ws.onopen = () => { try { ws.send(JSON.stringify({ type: 'want_key' })); } catch (e) { done(''); } };
    ws.onmessage = (e) => {
      if (typeof e.data !== 'string') return;
      try {
        const m = JSON.parse(e.data);
        if (m && m.type === 'local_key' && typeof m.openaiKey === 'string' && m.openaiKey) done(m.openaiKey.trim());
      } catch (err) { /* ignore other session messages */ }
    };
    ws.onerror = () => done('');
  });
}

async function keyFromLaptop() {
  try {
    const r = await fetch('http://127.0.0.1:8787/local/key', { signal: AbortSignal.timeout(2500) });
    if (r.ok) {
      const j = await r.json();
      if (j && typeof j.openaiKey === 'string' && j.openaiKey.trim()) return j.openaiKey.trim();
    }
  } catch (e) { /* the socket below is the fallback */ }
  return keyOverSocket();
}

function connectLocal(key) {
  const mine = ++generation;
  if (local) {
    try { local.close(); } catch (e) { /* replacing it */ }
    local = null;
  }
  if (socket && socket.close) {
    socket.onclose = null;
    try { socket.close(); } catch (e) { /* replacing it */ }
  }
  setStatus('Starting her voice in this game…');
  try {
    local = startLocal(key, (text) => { if (mine === generation) takeMessage(text); }, media, params.get('mind') === 'audio' ? 'audio' : 'realtime');
  } catch (e) {
    setStatus('Her voice could not start. ' + (e && e.message ? e.message : e));
    return;
  }
  socket = { readyState: WebSocket.OPEN, send: (text) => local && local.send(text), close: () => {} };
  core.onOpen();
  const link = $('companion-link');
  if (link) link.hidden = true;
}

function connect(base) {
  const url = deviceUrl(base);
  if (!url) {
    setStatus('She is beside the board. Paste an OpenAI key, or a laptop address.');
    return;
  }
  const mine = ++generation;
  if (local) {
    try { local.close(); } catch (e) { /* using the laptop instead */ }
    local = null;
  }
  if (socket) {
    socket.onclose = null;
    try { socket.close(); } catch (e) { /* reconnecting */ }
  }
  setStatus('Connecting the companion…');
  socket = new WebSocket(url);
  socket.onopen = () => {
    if (mine !== generation) return;
    core.onOpen();
    setStatus('Companion connected.');
    const link = $('companion-link');
    if (link) link.hidden = true;
  };
  socket.onmessage = (e) => { if (typeof e.data === 'string' && mine === generation) takeMessage(e.data); };
  socket.onclose = () => {
    if (mine !== generation) return;
    core.onClose();
    setStatus('Companion disconnected. Retrying…');
    setTimeout(() => { if (mine === generation) connect(base); }, 2000);
  };
  socket.onerror = () => { /* onclose follows */ };
}

function setStatus(text) {
  const extra = core.lastTranscript ? '\n' + core.lastTranscript : '';
  const mic = userMuted ? ' Mic is quiet. Press A on the right controller, or Talk.' : ' Listening.';
  const line = text + (core.connected ? mic : '') + extra;
  if (line === lastStatus) return;
  lastStatus = line;
  const el = $('companion-status');
  if (el) el.textContent = line;
}

function applyMute() {
  if (!micStream) return;
  for (const track of micStream.getAudioTracks()) track.enabled = !userMuted;
}

async function startMic() {
  if (micOn || micOpening) return micOn;
  micOpening = true;
  try {
    const ctx = audioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 } });
    const worklet = `class P extends AudioWorkletProcessor{process(i){const c=i[0][0];if(c)this.port.postMessage(c.slice(0));return true}}registerProcessor('crownfall-mic',P)`;
    await ctx.audioWorklet.addModule(URL.createObjectURL(new Blob([worklet], { type: 'text/javascript' })));
    const node = new AudioWorkletNode(ctx, 'crownfall-mic');
    node.port.onmessage = (e) => {
      const samples = e.data;
      let sum = 0;
      for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i];
      micLevel = Math.max(Math.sqrt(sum / samples.length), micLevel * 0.9);
      voiceDbg.sent++;
      voiceDbg.sentAt = performance.now();
      core.pushMic(samples, samples.length, ctx.sampleRate);
    };
    ctx.createMediaStreamSource(stream).connect(node);
    micStream = stream;
    applyMute();
    for (const cb of micWaiters) cb(stream);
    micOn = true;
    return true;
  } catch (e) {
    voiceDbg.micError = e && e.message ? e.message : String(e);
    setStatus('Microphone unavailable. You can still type to her.');
    return false;
  } finally {
    micOpening = false;
  }
}

function pollA(renderer) {
  const session = renderer.xr.getSession && renderer.xr.getSession();
  if (!session) return;
  let down = false;
  for (const source of session.inputSources) {
    if (source.handedness !== 'right') continue;
    const pad = source.gamepad;
    const button = pad && pad.buttons.length > 4 ? pad.buttons[4] : null;
    if (button && button.pressed) down = true;
  }
  if (down && !aWasDown) {
    userMuted = !userMuted;
    applyMute();
    if (!userMuted) startMic();
    setStatus(userMuted ? 'Companion muted.' : 'Companion listening.');
  }
  aWasDown = down;
}

const BONES = {
  hips: ['bip01 pelvis', 'hips'],
  head: ['bip01 head', 'head'],
  lUpperArm: ['bip01 l upperarm', 'leftarm'],
  lForearm: ['bip01 l forearm', 'leftforearm'],
  rUpperArm: ['bip01 r upperarm', 'rightarm'],
  rForearm: ['bip01 r forearm', 'rightforearm'],
  lThigh: ['bip01 l thigh', 'leftupleg'],
  lCalf: ['bip01 l calf', 'leftleg'],
  lFoot: ['bip01 l foot', 'leftfoot'],
  rThigh: ['bip01 r thigh', 'rightupleg'],
  rCalf: ['bip01 r calf', 'rightleg'],
  rFoot: ['bip01 r foot', 'rightfoot'],
};
const boneKey = (name) => {
  let n = String(name).toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  const colon = n.lastIndexOf(':');
  if (colon >= 0) n = n.substring(colon + 1);
  return n.replace(/^mixamorig/, '');
};

const body = {
  root: null, ready: false, bones: {}, rest: {}, leg: 0.85, phase: 0, walk: 0,
  headYaw: 0, headPitch: 0, gesture: '', gestureT: 0, jaw: [], blink: [], blinkAt: 2,
  jawNow: 0, kind: 'none',
};
const q1 = new THREE.Quaternion();
const q2 = new THREE.Quaternion();
const UP = new THREE.Vector3(0, 1, 0);
let modelNote = 'Loading the companion.';
let lastFeet = null;

function setWorldQuaternion(bone, q) {
  bone.parent.getWorldQuaternion(q2);
  bone.quaternion.copy(q2.invert().multiply(q));
  bone.updateMatrixWorld(true);
}
function turn(key, axis, radians) {
  const b = body.bones[key];
  if (!b || radians === 0) return;
  b.getWorldQuaternion(q1);
  setWorldQuaternion(b, new THREE.Quaternion().setFromAxisAngle(axis, radians).multiply(q1));
}
function hang(upper, lower, side) {
  const u = body.bones[upper];
  const l = body.bones[lower];
  if (!u || !l) return;
  const current = l.getWorldPosition(new THREE.Vector3()).sub(u.getWorldPosition(new THREE.Vector3())).normalize();
  const wanted = new THREE.Vector3(side.x * 0.13, -1, side.z * 0.13).normalize();
  const axis = new THREE.Vector3().crossVectors(current, wanted);
  const sin = axis.length();
  if (sin < 1e-4) return;
  turn(upper, axis.normalize(), Math.atan2(sin, current.dot(wanted)));
}

function fitAvatar(model) {
  const found = {};
  model.traverse((o) => {
    const k = boneKey(o.name);
    if (!(k in found)) found[k] = o;
    if (o.isMesh) {
      o.frustumCulled = false;
      o.raycast = () => {};
      if (o.morphTargetDictionary) {
        for (const name in o.morphTargetDictionary) {
          const n = name.toLowerCase();
          if (n.includes('jawopen')) body.jaw.push([o, o.morphTargetDictionary[name]]);
          else if (n.includes('eyeblinkleft') || n.includes('eyeblinkright')) body.blink.push([o, o.morphTargetDictionary[name]]);
        }
      }
    }
  });
  for (const key in BONES) for (const name of BONES[key]) if (found[name] && !body.bones[key]) body.bones[key] = found[name];
  body.root.add(model);
  model.updateMatrixWorld(true);
  const b = body.bones;
  const pos = (o) => o.getWorldPosition(new THREE.Vector3());
  if (b.head && b.lFoot) {
    const spine = pos(b.head).sub(pos(b.lFoot));
    if (Math.abs(spine.z) > Math.abs(spine.y)) model.rotation.x += spine.z > 0 ? -Math.PI / 2 : Math.PI / 2;
    else if (spine.y < 0) model.rotation.x += Math.PI;
    model.updateMatrixWorld(true);
  }
  if (b.lThigh && b.rThigh) {
    const right = pos(b.rThigh).sub(pos(b.lThigh));
    const fwd = new THREE.Vector3().crossVectors(UP, right);
    model.rotation.y -= Math.atan2(fwd.x, fwd.z);
    model.updateMatrixWorld(true);
  }
  const box = new THREE.Box3().setFromObject(model, true);
  const height = box.max.y - box.min.y;
  if (height > 0.01) model.scale.multiplyScalar(1.7 / height);
  model.updateMatrixWorld(true);
  box.setFromObject(model, true);
  model.position.x -= (box.min.x + box.max.x) / 2;
  model.position.z -= (box.min.z + box.max.z) / 2;
  model.position.y -= box.min.y;
  model.updateMatrixWorld(true);
  for (const key in b) body.rest[key] = b[key].quaternion.clone();
  body.ready = !!(b.lThigh && b.rThigh && b.lCalf && b.rCalf);
  if (body.ready && b.lFoot) {
    const len = pos(b.lThigh).distanceTo(pos(b.lCalf)) + pos(b.lCalf).distanceTo(pos(b.lFoot));
    if (len > 0.3 && len < 1.4) body.leg = len;
  }
  body.kind = 'rocketbox';
  modelNote = '';
}

function placeholderAvatar() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x6f8fb5, roughness: 0.8 });
  const part = (geo, y) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.y = y;
    m.raycast = () => {};
    g.add(m);
    return m;
  };
  part(new THREE.CapsuleGeometry(0.17, 0.5, 6, 16), 1.12);
  part(new THREE.SphereGeometry(0.115, 20, 16), 1.6);
  part(new THREE.CapsuleGeometry(0.075, 0.68, 4, 12), 0.42).position.x = -0.1;
  part(new THREE.CapsuleGeometry(0.075, 0.68, 4, 12), 0.42).position.x = 0.1;
  body.root.add(g);
  body.kind = 'placeholder';
  modelNote = 'The companion model did not load.';
}

function loadAvatar() {
  const base = new URL('./avatar/', import.meta.url);
  const tex = new THREE.TextureLoader();
  const map = (name, srgb) => {
    const t = tex.load(new URL(name, base).href);
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  const quiet = new THREE.LoadingManager();
  quiet.setURLModifier((url) => (/\.fbx$/i.test(url) ? url : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'));
  new FBXLoader(quiet).load(
    new URL('RocketboxAdult.fbx', base).href,
    (model) => {
      try {
        const made = {};
        const material = (old) => {
          const name = String(old.name || '').toLowerCase();
          if (made[name]) return made[name];
          let m;
          if (name.includes('opacity')) m = new THREE.MeshStandardMaterial({ map: map('f006_opacity_color.png', true), transparent: true, alphaTest: 0.35, side: THREE.DoubleSide, roughness: 0.75 });
          else if (name.includes('head')) m = new THREE.MeshStandardMaterial({ map: map('f006_head_color.png', true), normalMap: map('f006_head_normal.png', false), roughness: 0.7 });
          else m = new THREE.MeshStandardMaterial({ map: map('f006_body_color.png', true), normalMap: map('f006_body_normal.png', false), roughness: 0.8 });
          m.name = old.name;
          made[name] = m;
          return m;
        };
        model.traverse((o) => {
          if (o.isMesh) o.material = Array.isArray(o.material) ? o.material.map(material) : material(o.material);
        });
        fitAvatar(model);
      } catch (e) {
        console.warn('avatar setup failed', e);
        placeholderAvatar();
      }
    },
    undefined,
    (e) => {
      console.warn('avatar failed to load', e);
      placeholderAvatar();
    },
  );
}

function poseAvatar(dt, metres, ctx) {
  if (!body.ready) return;
  const a = core.avatar;
  if (a.gesture) {
    body.gesture = a.gesture;
    body.gestureT = 0;
  }
  const level = speechLevel();
  body.jawNow += (level - body.jawNow) * Math.min(1, dt * 18);
  for (const [mesh, i] of body.jaw) mesh.morphTargetInfluences[i] = body.jawNow * 0.8;
  body.blinkAt -= dt;
  const blink = body.blinkAt < 0.12 ? 1 : 0;
  if (body.blinkAt < 0) body.blinkAt = 2.5 + Math.random() * 3;
  for (const [mesh, i] of body.blink) mesh.morphTargetInfluences[i] = blink;
  for (const key in body.bones) body.bones[key].quaternion.copy(body.rest[key]);
  body.root.updateMatrixWorld(true);
  const forward = new THREE.Vector3(Math.sin(a.yaw), 0, -Math.cos(a.yaw));
  const right = new THREE.Vector3().crossVectors(forward, UP).normalize();
  const left = right.clone().negate();
  hang('lUpperArm', 'lForearm', left);
  hang('rUpperArm', 'rForearm', right);
  turn('lForearm', right, 0.24);
  turn('rForearm', right, 0.24);
  const moving = a.speed01 > 0.06 ? 1 : 0;
  body.walk += Math.max(-dt * 4, Math.min(dt * 4, moving - body.walk));
  const swing = 0.42 * Math.max(0.35, Math.min(1.2, a.speed01));
  body.phase += (2 * Math.PI * metres) / Math.max(0.25, 4 * body.leg * Math.sin(swing));
  const s = Math.sin(body.phase);
  const c = Math.cos(body.phase);
  turn('lThigh', right, s * swing * body.walk);
  turn('rThigh', right, -s * swing * body.walk);
  turn('lCalf', right, -Math.max(0, c) * 0.6 * body.walk);
  turn('rCalf', right, -Math.max(0, -c) * 0.6 * body.walk);
  turn('lUpperArm', right, -s * swing * 0.6 * body.walk);
  turn('rUpperArm', right, s * swing * 0.6 * body.walk);
  let nod = 0;
  let shake = 0;
  if (body.gesture) {
    body.gestureT += dt;
    const t = body.gestureT;
    const ease = Math.min(1, t * 4) * Math.min(1, Math.max(0, (1.8 - t) * 4));
    if (body.gesture === 'wave') {
      turn('rUpperArm', forward, -1.9 * ease);
      turn('rForearm', forward, -(0.9 + Math.sin(t * 11) * 0.4) * ease);
    } else if (body.gesture === 'shrug') {
      turn('lUpperArm', forward, 0.35 * ease);
      turn('rUpperArm', forward, -0.35 * ease);
      turn('lForearm', right, 0.9 * ease);
      turn('rForearm', right, 0.9 * ease);
    } else if (body.gesture === 'nod') nod = Math.sin(t * 9) * 0.22 * ease;
    else if (body.gesture === 'shake_head') shake = Math.sin(t * 9) * 0.35 * ease;
    if (t > 1.8) body.gesture = '';
  }
  if (body.bones.head && ctx) {
    const headPos = body.bones.head.getWorldPosition(new THREE.Vector3());
    const cam = viewCamera(ctx);
    const to = cam.getWorldPosition(new THREE.Vector3()).sub(headPos);
    let yaw = Math.atan2(to.x, to.z) - Math.atan2(forward.x, forward.z);
    yaw = Math.atan2(Math.sin(yaw), Math.cos(yaw));
    let pitch = Math.atan2(to.y, Math.hypot(to.x, to.z));
    if (Math.abs(yaw) > 1.3) {
      yaw = 0;
      pitch = 0;
    }
    const k = Math.min(1, dt * 6);
    body.headYaw += (Math.max(-1, Math.min(1, yaw)) * 0.75 - body.headYaw) * k;
    body.headPitch += (Math.max(-0.4, Math.min(0.4, pitch)) * 0.7 - body.headPitch) * k;
    turn('head', UP, body.headYaw + shake);
    turn('head', right.clone().applyAxisAngle(UP, body.headYaw), body.headPitch - nod);
  }
}

function placeBeside(board) {
  board.updateWorldMatrix(true, true);
  standPos.set(0.85, 0, 0.05);
  board.localToWorld(standPos);
  standPos.y = 0;
  board.getWorldPosition(boardPos);
  const pos = xrToProtocol(standPos.x, 0, standPos.z);
  const face = xrToProtocol(boardPos.x, 0, boardPos.z);
  core.avatar.pos = pos;
  core.avatar.yaw = Math.atan2(face.x - pos.x, face.z - pos.z);
  core.placed = true;
  parkedAt = { x: boardPos.x, z: boardPos.z };
  core.upsert('crownfall', 'board game', xrToProtocol(boardPos.x, boardPos.y, boardPos.z), { x: 0.5, y: 0.08, z: 0.5 }, 'manual');
}

let voiceMesh = null;
let voiceCanvasCtx = null;
let voiceTex = null;
let voiceShown = '';
let voiceHold = false;
let voiceWait = 0;
const voiceCamP = new THREE.Vector3();
const voiceCamD = new THREE.Vector3();
const voiceWant = new THREE.Vector3();

function wrapLabeled(label, text, width) {
  const words = String(text || '').split(' ').filter(Boolean);
  const indent = ' '.repeat(label.length + 2);
  const lines = [];
  let cur = label + '  ';
  for (const word of words.length ? words : ['(nothing yet)']) {
    if (cur.trim() !== label && (cur + word).length > width) {
      lines.push(cur.replace(/\s+$/, ''));
      cur = indent;
    }
    cur += word + ' ';
  }
  lines.push(cur.replace(/\s+$/, ''));
  return lines;
}

function voiceDebugText() {
  const loud = Math.max(0, Math.min(10, Math.round(micLevel * 18)));
  const meter = '█'.repeat(loud) + '·'.repeat(10 - loud);
  const mic = !micOn ? 'OFF — press A or Talk' : userMuted ? 'muted  ' + meter : core.micMuted ? 'quiet while she talks  ' + meter : 'LIVE  ' + meter;
  const lines = [
    'VOICE',
    'mic  ' + mic,
    ...wrapLabeled('you', heard || '(nothing heard yet)', 42),
    ...wrapLabeled('her', reply || '(nothing said yet)', 42),
  ];
  const err = voiceDbg.micError || core.lastError;
  if (err) lines.push('err  ' + err);
  return lines.slice(0, 16).join('\n');
}

function ensureVoicePanel(scene) {
  if (!voiceMesh) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    voiceCanvasCtx = canvas.getContext('2d');
    voiceTex = new THREE.CanvasTexture(canvas);
    if (THREE.SRGBColorSpace) voiceTex.colorSpace = THREE.SRGBColorSpace;
    voiceMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 0.525),
      new THREE.MeshBasicMaterial({ map: voiceTex, transparent: true, depthTest: true }),
    );
    voiceMesh.name = 'voice-debug';
    voiceMesh.renderOrder = 11;
    voiceMesh.frustumCulled = false;
  }
  if (voiceMesh.parent !== scene) scene.add(voiceMesh);
}

function updateVoicePanel(ctx, dt, text) {
  const show = ctx.renderer.xr.isPresenting && params.get('log') !== '0';
  if (!show) {
    voiceHold = false;
    voiceWait = 0;
    if (voiceMesh) voiceMesh.visible = false;
    return;
  }
  ensureVoicePanel(ctx.scene);
  if (text !== voiceShown) {
    voiceShown = text;
    voiceCanvasCtx.clearRect(0, 0, 1024, 768);
    voiceCanvasCtx.fillStyle = 'rgba(10, 14, 18, 0.86)';
    voiceCanvasCtx.beginPath();
    voiceCanvasCtx.roundRect(0, 0, 1024, 768, 28);
    voiceCanvasCtx.fill();
    voiceCanvasCtx.font = '30px ui-monospace, monospace';
        text.split('\n').slice(0, 16).forEach((line, i) => {
          voiceCanvasCtx.fillStyle = i === 0 || line.startsWith('you') ? '#f4c06a' : line.startsWith('her') ? '#9fd0ff' : line.startsWith('err') || line.includes('failed') ? '#ff8d7a' : '#e7f0df';
          voiceCanvasCtx.fillText(line.length > 46 ? line.slice(0, 45) + '…' : line, 36, 58 + i * 44);
        });
    voiceTex.needsUpdate = true;
  }
  if (!voiceHold) {
    voiceWait += dt;
    voiceMesh.visible = false;
    if (voiceWait < 0.4) return;
    const cam = viewCamera(ctx);
    cam.getWorldPosition(voiceCamP);
    cam.getWorldDirection(voiceCamD);
    voiceCamD.y = 0;
    if (voiceCamD.lengthSq() < 1e-6) return;
    voiceCamD.normalize();
    voiceMesh.position.copy(voiceCamP).addScaledVector(voiceCamD, 0.9);
    voiceMesh.position.y -= 0.15;
    voiceWant.copy(voiceCamP);
    voiceWant.y = voiceMesh.position.y;
    voiceMesh.lookAt(voiceWant);
    voiceHold = true;
  }
  voiceMesh.visible = true;
}

function tick(ctx) {
  latest = ctx;
  const dt = Math.min(0.1, ctx.dt || 0.016);
  if (ctx.renderer.xr.isPresenting) pollA(ctx.renderer);
  core.micMuted = userMuted || (halfDuplex && core.speakingFor > 0 && !voiceAnalyser);
  if (core.lastAction && /walk|follow|approach|stop/.test(core.lastAction)) commanded = true;

  const board = ctx.board;
  if (board && board.visible) {
    board.getWorldPosition(boardPos);
    const moved = !parkedAt || Math.hypot(boardPos.x - parkedAt.x, boardPos.z - parkedAt.z) > 0.35;
    if (!commanded && (moved || !core.placed) && core.avatar.state === 'idle') placeBeside(board);
    else core.upsert('crownfall', 'board game', xrToProtocol(boardPos.x, boardPos.y, boardPos.z), { x: 0.5, y: 0.08, z: 0.5 }, 'manual');
  } else if (!core.placed) {
    core.placeInFrontOfUser(1.5);
  }

  core.update(dt);
  const feet = core.avatar.pos;
  const metres = lastFeet ? Math.hypot(feet.x - lastFeet.x, feet.z - lastFeet.z) : 0;
  lastFeet = { x: feet.x, z: feet.z };
  const p = protocolToXr(feet);
  body.root.visible = core.placed && body.kind !== 'none';
  body.root.position.set(p.x, p.y, p.z);
  body.root.rotation.y = Math.PI - core.avatar.yaw;
  body.root.updateMatrixWorld(true);
  poseAvatar(dt, metres, ctx);
  const say = $('companion-say');
  if (say) say.hidden = ctx.renderer.xr.isPresenting;
  const voiceLog = voiceDebugText();
  updateVoicePanel(ctx, dt, voiceLog);
  const voicePre = $('companion-voice');
  if (voicePre && !ctx.renderer.xr.isPresenting) voicePre.textContent = voiceLog;
  if (modelNote) setStatus(modelNote);
  else if (core.connected) setStatus(core.brain && core.brain !== '-' ? 'She is here · ' + core.brain + '.' : 'She is connected.');
  else if (!socket && !local) setStatus('She is beside the board. Paste an OpenAI key to talk.');
}

function boot() {
  if (!T.Group) return;
  body.root = new THREE.Group();
  body.root.name = 'simulacra';
  body.root.visible = false;
  loadAvatar();
  latest.scene = { add: () => {} };
  window.__cfTick = (ctx) => {
    if (body.root.parent !== ctx.scene) ctx.scene.add(body.root);
    tick(ctx);
  };
  const backend = defaultBackend();
  const input = $('companion-backend');
  if (input && backend) input.value = backend;
  const link = $('companion-link');
  if (link) {
    link.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = input ? input.value.trim() : '';
      if (!value) return;
      try { localStorage.setItem('simulacra-backend', value); } catch (err) { /* ignore */ }
      connect(value);
    });
  }
  const say = $('companion-say');
  if (say) {
    say.addEventListener('submit', (e) => {
      e.preventDefault();
      audioContext();
      const field = $('companion-text');
      const text = field ? field.value.trim() : '';
      if (text) core.sendText(text);
      if (field) field.value = '';
    });
  }
  const talk = $('companion-talk');
  if (talk) {
    talk.addEventListener('click', () => {
      userMuted = false;
      applyMute();
      startMic();
      setStatus('Companion listening.');
    });
  }
  const keyForm = $('companion-key');
  const keyInput = $('companion-key-input');
  if (keyForm) {
    keyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const k = (keyInput && keyInput.value || '').trim().replace(/^["']|["']$/g, '');
      if (!k) return;
      try { localStorage.setItem('simulacra.openaiKey', k); } catch (err) { /* private mode */ }
      if (keyInput) keyInput.value = '';
      audioContext();
      connectLocal(k);
      userMuted = false;
      startMic();
    });
  }
  for (const id of ['btn-ar', 'btn-vr', 'btn-play', 'btn-ar-mini', 'btn-vr-mini']) {
    const button = $(id);
    if (button) button.addEventListener('click', () => { audioContext(); startMic(); });
  }
  const explicit = params.get('backend');
  if (isQuest && keyForm) keyForm.hidden = true;
  if (explicit) connect(explicit);
  else if (savedKey()) connectLocal(savedKey());
  else {
    setStatus('Asking the laptop for her voice, once.');
    keyFromLaptop().then((k) => {
      if (k) {
        rememberKey(k);
        connectLocal(k);
        return;
      }
      if (backend) connect(backend);
      else setStatus('Plug the headset into the laptop once, with the backend running, so she can remember the key.');
    });
  }
}

boot();
