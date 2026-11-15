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
  if (!analyser || playing.size === 0) return 0;
  analyser.getByteTimeDomainData(levelBuf);
  let sum = 0;
  for (let i = 0; i < levelBuf.length; i++) {
    const v = (levelBuf[i] - 128) / 128;
    sum += v * v;
  }
  return Math.min(1, Math.sqrt(sum / levelBuf.length) * 5);
}

let micOn = false;
async function startMic() {
  if (micOn) return true;
  try {
    const ctx = audioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 } });
    const worklet = `class P extends AudioWorkletProcessor{process(i){const c=i[0][0];if(c)this.port.postMessage(c.slice(0));return true}}registerProcessor('simulacra-mic',P)`;
    await ctx.audioWorklet.addModule(URL.createObjectURL(new Blob([worklet], { type: 'text/javascript' })));
    const node = new AudioWorkletNode(ctx, 'simulacra-mic');
    node.port.onmessage = (e) => core.pushMic(e.data, e.data.length, ctx.sampleRate);
    ctx.createMediaStreamSource(stream).connect(node);
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
  log: (m) => console.log(m),
  roomInfo: () => ({ source: room.source, obstacles: room.obstacles.length }),
};

let previewMode = true;
const core = new SimulacraCore(host, 'webxr');
core.wander = params.get('wander') !== '0'; // strolls between requests; ?wander=0 keeps it still
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
function savedKey() {
  try { return localStorage.getItem('simulacra.openaiKey') || ''; } catch (e) { return ''; }
}
/** Stand-alone: the page is hosted on its own, has a key, and was not pointed at a backend. */
const standalone = () => hostedElsewhere && !params.get('backend') && !!savedKey();

let generation = 0;
function connect() {
  const mine = ++generation;
  if (standalone()) {
    // No backend: the same session code runs right here and talks to OpenAI directly.
    const local = startLocal(savedKey(), (text) => { if (mine === generation) core.onMessage(text); });
    socket = { readyState: WebSocket.OPEN, send: (text) => local.send(text), close: () => { local.close(); core.onClose(); connect(); } };
    core.onOpen();
    return;
  }
  const base = backendAddress();
  if (document.activeElement !== $('backend')) $('backend').value = base;
  if (!base) return; // hosted on its own with no key and no backend chosen yet: wait for one
  const ws = (socket = new WebSocket(base.replace(/\/$/, '') + '/device'));
  ws.onopen = () => core.onOpen();
  ws.onmessage = (e) => { if (typeof e.data === 'string' && mine === generation) core.onMessage(e.data); };
  ws.onclose = () => {
    if (mine !== generation) return;
    core.onClose();
    setTimeout(() => { if (mine === generation) connect(); }, 2000);
  };
  ws.onerror = () => { /* onclose follows */ };
}

// ---------------------------------------------------------------- avatar

const avatarRoot = new THREE.Group();
avatarRoot.visible = false;
scene.add(avatarRoot);

// A soft contact shadow: the cheapest cue that the feet are on the real floor.
const shadowCanvas = document.createElement('canvas');
shadowCanvas.width = shadowCanvas.height = 128;
const shadowCtx = shadowCanvas.getContext('2d');
const shadowFade = shadowCtx.createRadialGradient(64, 64, 6, 64, 64, 64);
shadowFade.addColorStop(0, 'rgba(0,0,0,0.5)');
shadowFade.addColorStop(1, 'rgba(0,0,0,0)');
shadowCtx.fillStyle = shadowFade;
shadowCtx.fillRect(0, 0, 128, 128);
const shadow = new THREE.Mesh(
  new THREE.PlaneGeometry(0.95, 0.95),
  new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }),
);
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = 0.006;
avatarRoot.add(shadow);

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

const body = { ready: false, bones: {}, rest: {}, leg: 0.85, phase: 0, walk: 0, headYaw: 0, headPitch: 0, gesture: '', gestureT: 0, jaw: [], blink: [], blinkAt: 2, jawNow: 0, kind: 'none' };
const q1 = new THREE.Quaternion();
const q2 = new THREE.Quaternion();
const UP = new THREE.Vector3(0, 1, 0);

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
/** Swing an upper arm so the arm hangs at the side instead of the model's A/T pose. */
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

/** Scale to a real adult's height, put the feet on the ground, and turn the model to face local +Z. */
function fitAvatar(model, kind) {
  const found = {};
  model.traverse((o) => {
    const k = boneKey(o.name);
    if (!(k in found)) found[k] = o;
    if (o.isMesh) {
      o.frustumCulled = false; // skinned bounds are unreliable once bones are posed
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

  avatarRoot.add(model);
  model.updateMatrixWorld(true);
  const b = body.bones;
  const pos = (o) => o.getWorldPosition(new THREE.Vector3());

  // Upright: some exports are Z-up. The head must be above the feet along Y.
  if (b.head && b.lFoot) {
    const spine = pos(b.head).sub(pos(b.lFoot));
    if (Math.abs(spine.z) > Math.abs(spine.y)) model.rotation.x += spine.z > 0 ? -Math.PI / 2 : Math.PI / 2;
    else if (spine.y < 0) model.rotation.x += Math.PI;
    model.updateMatrixWorld(true);
  }
  // Facing: with the character's own left and right known, forward is up x right.
  if (b.lThigh && b.rThigh) {
    const right = pos(b.rThigh).sub(pos(b.lThigh));
    const fwd = new THREE.Vector3().crossVectors(UP, right);
    model.rotation.y -= Math.atan2(fwd.x, fwd.z);
    model.updateMatrixWorld(true);
  }
  // Height and feet from the mesh itself (bones stop at the ankle and the top of the neck).
  const box = new THREE.Box3().setFromObject(model, true);
  const height = box.max.y - box.min.y;
  const target = Number(params.get('height')) || 1.7;
  if (height > 0.01) model.scale.multiplyScalar(target / height);
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
  body.kind = kind;
}

/** A plain mannequin, used only if the bundled character fails to load. Obviously a stand-in. */
function placeholderAvatar() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x6f8fb5, roughness: 0.8 });
  const part = (geo, y) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.y = y;
    g.add(m);
    return m;
  };
  part(new THREE.CapsuleGeometry(0.17, 0.5, 6, 16), 1.12);
  part(new THREE.SphereGeometry(0.115, 20, 16), 1.6);
  part(new THREE.CapsuleGeometry(0.075, 0.68, 4, 12), 0.42).position.x = -0.1;
  part(new THREE.CapsuleGeometry(0.075, 0.68, 4, 12), 0.42).position.x = 0.1;
  const nose = part(new THREE.ConeGeometry(0.03, 0.08, 8), 1.6);
  nose.position.z = 0.13;
  nose.rotation.x = Math.PI / 2;
  avatarRoot.add(g);
  body.kind = 'placeholder';
}

function loadAvatar() {
  return new Promise((resolve) => {
    if (params.get('avatar') === 'placeholder') {
      placeholderAvatar();
      return resolve();
    }
    const tex = new THREE.TextureLoader();
    const map = (name, srgb) => {
      const t = tex.load('./avatar/' + name);
      if (srgb) t.colorSpace = THREE.SRGBColorSpace;
      return t;
    };
    // The file names the artist's own texture paths; those are replaced below, so do not fetch them.
    const quiet = new THREE.LoadingManager();
    quiet.setURLModifier((url) => (/\.fbx$/i.test(url) ? url : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'));
    new FBXLoader(quiet).load(
      './avatar/RocketboxAdult.fbx',
      (model) => {
        try {
          // The FBX refers to textures by the artist's file paths; bind the bundled ones by material name.
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
          fitAvatar(model, 'rocketbox');
        } catch (e) {
          console.warn('avatar setup failed, using the placeholder', e);
          placeholderAvatar();
        }
        resolve();
      },
      undefined,
      (e) => {
        console.warn('avatar failed to load, using the placeholder', e);
        placeholderAvatar();
        resolve();
      },
    );
  });
}

function animateBody(dt, metres) {
  const a = core.avatar;
  const p = protocolToXr(a.pos);
  avatarRoot.position.set(p.x, p.y, p.z);
  avatarRoot.rotation.y = Math.PI - a.yaw; // protocol yaw 0 faces +z (three -Z); the model faces local +Z
  avatarRoot.updateMatrixWorld(true);
  if (a.gesture) {
    body.gesture = a.gesture;
    body.gestureT = 0;
  }

  // Mouth and eyes.
  const level = speechLevel();
  body.jawNow += (level - body.jawNow) * Math.min(1, dt * 18);
  for (const [mesh, i] of body.jaw) mesh.morphTargetInfluences[i] = body.jawNow * 0.8;
  body.blinkAt -= dt;
  const blink = body.blinkAt < 0.12 ? 1 : 0;
  if (body.blinkAt < 0) body.blinkAt = 2.5 + Math.random() * 3;
  for (const [mesh, i] of body.blink) mesh.morphTargetInfluences[i] = blink;

  if (!body.ready) return;
  for (const key in body.bones) body.bones[key].quaternion.copy(body.rest[key]);
  avatarRoot.updateMatrixWorld(true);

  const forward = new THREE.Vector3(Math.sin(a.yaw), 0, -Math.cos(a.yaw));
  const right = new THREE.Vector3().crossVectors(forward, UP).normalize();
  const left = right.clone().negate();
  hang('lUpperArm', 'lForearm', left);
  hang('rUpperArm', 'rForearm', right);
  turn('lForearm', right, 0.24);
  turn('rForearm', right, 0.24);

  // Walk cycle driven by the ground actually covered, so the feet do not slide.
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

  // Gestures.
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

  // Look at the user (or straight ahead while walking somewhere else).
  if (body.bones.head) {
    const headPos = body.bones.head.getWorldPosition(new THREE.Vector3());
    const to = viewCamera().getWorldPosition(new THREE.Vector3()).sub(headPos);
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
    // About the head's own right axis a positive turn tilts the face up.
    turn('head', right.clone().applyAxisAngle(UP, body.headYaw), body.headPitch - nod);
  }
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

  if (params.has('debug')) drawDebug();
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
  startMic(); // in parallel: the permission prompt must come from this tap
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
    note('Could not start AR: ' + (e && e.message ? e.message : e));
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
        text.split('\n').slice(0, 5).forEach((l, i) => ctx.fillText(l.length > 52 ? l.slice(0, 51) + '…' : l, 28, 54 + i * 46));
        texture.needsUpdate = true;
      }
      mesh.visible = renderer.xr.isPresenting && params.get('hud') !== '0' && now < hideAt;
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

function note(text) {
  $('note').textContent = text;
}

function statusText() {
  const lines = [];
  lines.push(core.connected ? (standalone() ? 'Running in this browser' : 'Backend connected') + ' · brain: ' + core.brain : hostedElsewhere ? 'Paste your OpenAI key below to start.' : 'Connecting to the backend…');
  if (core.connected && core.brain === 'mock') lines.push('No AI keys yet: open /setup on the computer running the backend');
  if (!core.placed) lines.push(room.floorY === null ? 'Looking for the floor…' : 'Finding a clear spot on the floor: look at open floor in front of you');
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

  core.micMuted = halfDuplex && core.speakingFor > 0;
  core.update(dt);
  avatarRoot.visible = core.placed;
  const a = core.avatar.pos;
  const metres = lastAvatar ? Math.hypot(a.x - lastAvatar.x, a.z - lastAvatar.z) : 0;
  lastAvatar = { x: a.x, z: a.z };
  animateBody(dt, metres);

  const text = statusText();
  if ($('status').textContent !== text) $('status').textContent = text;
  hud.update(text, now, dt);
  renderer.render(scene, camera);
}

// ---------------------------------------------------------------- start

async function start() {
  $('mic').onclick = startMic;
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

window.simulacra = { core, room, body, scene, camera, renderer, avatarRoot, enterAR, isFloor, get features() { return xrFeatures; }, get preview() { return previewMode; } };
start();
