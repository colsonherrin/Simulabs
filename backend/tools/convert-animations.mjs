// Converts Microsoft Rocketbox motion-capture clips (FBX, one per file, made for the same Bip01
// skeleton as the bundled character) into one compact pair of files the web apps can load:
//   animations.json  what each clip is (name, role, frames, speed) and the bone order
//   animations.bin   every bone rotation as int16 quaternions at 20 frames a second, plus the
//                    body's root position per frame
// About 50 MB of FBX becomes about 2 MB.
//
//   git clone --filter=blob:none https://github.com/microsoft/Microsoft-Rocketbox
//   node tools/convert-animations.mjs <Microsoft-Rocketbox>/Assets/Animations <output folder>
import { readFileSync, writeFileSync } from 'node:fs';
globalThis.self = globalThis;
globalThis.window = globalThis;
globalThis.document = { createElementNS: () => ({ style: {}, addEventListener() {}, removeEventListener() {} }), createElement: () => ({ style: {}, getContext: () => null }) };
const { FBXLoader } = await import('three/examples/jsm/loaders/FBXLoader.js');
const THREE = await import('three');

const FPS = 20;
const ST = 'all_animations_max_motextr_static/';
const XY = 'all_animations_max_motextr_xy/';
// name, role, file, longest stretch to keep (seconds)
const CLIPS = [
  ['idle_1', 'idle', ST + 'f_idle_neutral_01', 16],
  ['idle_2', 'idle', ST + 'f_idle_neutral_02', 14],
  ['idle_look', 'idle', ST + 'f_idle_look_around_01', 12],
  ['idle_shift', 'idle', ST + 'f_idle_move_01', 12],
  ['idle_breathe', 'idle', ST + 'f_idle_breathe_01', 10],
  ['walk', 'walk', XY + 'f_walk_neutral', 4],
  ['wave_1', 'wave', ST + 'f_wave_01', 8],
  ['wave_2', 'wave', ST + 'f_wave_02', 8],
  ['talk_1', 'talk', ST + 'f_gestic_talk_neutral_01', 14],
  ['talk_2', 'talk', ST + 'f_gestic_talk_neutral_02', 14],
  ['talk_3', 'talk', ST + 'f_gestic_talk_relaxed_01', 14],
  ['listen', 'listen', ST + 'f_gestic_listen_neutral_01', 12],
  ['nod', 'nod', ST + 'f_gestic_listen_accept_01', 6],
  ['shake_head', 'shake_head', ST + 'f_gestic_listen_deny_01', 6],
  ['shrug', 'shrug', ST + 'f_gestic_shrug_01', 6],
  ['sit_1', 'sit', ST + 'f_sit_chair_idle_neutral_01', 16],
  ['sit_breathe', 'sit', ST + 'f_sit_chair_breathe_01', 12],
];

const [src, out] = process.argv.slice(2);
if (!src || !out) throw new Error('usage: node tools/convert-animations.mjs <Rocketbox Assets/Animations> <output folder>');
let bones = null;
const chunks = [];
let offset = 0;
const meta = [];
const q = new THREE.Quaternion();
const v = new THREE.Vector3();
for (const [name, role, file, keep] of CLIPS) {
  const buf = readFileSync(`${src}/${file}.max.fbx`);
  const clip = new FBXLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '').animations[0];
  const rot = clip.tracks.filter((t) => t.name.endsWith('.quaternion') && !/Footsteps|MotionExtractionHelper/.test(t.name));
  const names = rot.map((t) => t.name.slice(0, -'.quaternion'.length));
  if (!bones) bones = names;
  else if (names.join() !== bones.join()) throw new Error(`${file}: a different skeleton`);
  const duration = Math.min(clip.duration, keep);
  const frames = Math.max(2, Math.round(duration * FPS) + 1);
  const quats = new Int16Array(frames * bones.length * 4);
  const interps = rot.map((t) => t.createInterpolant(new Float32Array(4)));
  const rootTrack = clip.tracks.find((t) => t.name === 'Bip01.position');
  const rootInterp = rootTrack.createInterpolant(new Float32Array(3));
  const root = new Float32Array(frames * 3);
  for (let f = 0; f < frames; f++) {
    const time = Math.min(clip.duration, f / FPS);
    for (let b = 0; b < bones.length; b++) {
      const r = interps[b].evaluate(time);
      q.set(r[0], r[1], r[2], r[3]).normalize();
      for (let k = 0; k < 4; k++) quats[(f * bones.length + b) * 4 + k] = Math.round(q.toArray()[k] * 32767);
    }
    const p = rootInterp.evaluate(time);
    root.set([p[0], p[1], p[2]], f * 3);
  }
  // A walk travels: take the steady forward drift out so it plays on the spot, and note how fast
  // it was going so the playback rate can match the ground she actually covers.
  const drift = v.set(root[(frames - 1) * 3] - root[0], root[(frames - 1) * 3 + 1] - root[1], root[(frames - 1) * 3 + 2] - root[2]);
  const speed = role === 'walk' ? drift.length() / 100 / ((frames - 1) / FPS) : 0;
  if (role === 'walk') for (let f = 0; f < frames; f++) for (let k = 0; k < 3; k++) root[f * 3 + k] -= drift.getComponent(k) * (f / (frames - 1));
  const qb = Buffer.from(quats.buffer);
  const rb = Buffer.from(root.buffer);
  meta.push({ name, role, frames, speed: +speed.toFixed(3), quats: offset, root: offset + qb.length });
  chunks.push(qb, rb);
  offset += qb.length + rb.length;
  console.log(name.padEnd(13), role.padEnd(11), `${((frames - 1) / FPS).toFixed(1)} s`, speed ? `walks at ${speed.toFixed(2)} m/s` : '');
}
writeFileSync(`${out}/animations.bin`, Buffer.concat(chunks));
writeFileSync(`${out}/animations.json`, JSON.stringify({ source: 'Microsoft Rocketbox Avatar Library animations (MIT)', fps: FPS, bones, clips: meta }));
console.log(`${meta.length} clips, ${bones.length} bones, ${(offset / 1e6).toFixed(2)} MB`);
