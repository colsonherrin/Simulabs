// Builds a character's canonical Gaussians from its rigged mesh.
//
//   node build_canonical.mjs <model.fbx> <texture-dir> <texture-prefix> <out-basename> [count]
//
// Every Gaussian is a point on the body's surface in the bind pose, carrying what it needs to be
// drawn and moved without the mesh: position, normal, colour (read from the character's own
// textures), radius, and the four bones that move it with their weights (the skeletal attachment
// map). The face is sampled about nine times more densely than the rest, since that is where the eye
// looks. Sampling is seeded, so the same inputs always give the same Gaussians (the training code
// and the runtime must agree on them, one for one).
//
// Textures are read as raw 1024x1024 RGBA files named <prefix>_<body|head|opacity>_color.rgba
// (made from the PNGs with any image tool).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

globalThis.self = globalThis;
globalThis.window = globalThis;
globalThis.document = { createElementNS: () => ({ style: {}, addEventListener() {}, removeEventListener() {} }), createElement: () => ({ getContext: () => null, style: {} }) };
const quiet = console.warn;
console.warn = () => {};
// three.js is taken from the game's install (this folder has no dependencies of its own yet).
const THREE = await import('../../../board-game/node_modules/three/build/three.module.js');
const { FBXLoader } = await import('../../../board-game/node_modules/three/examples/jsm/loaders/FBXLoader.js');

const [fbxPath, texDir, prefix, outBase, countArg] = process.argv.slice(2);
const COUNT = Number(countArg) || 60000;
const TEX = 1024;
const buf = readFileSync(fbxPath);
const model = new FBXLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '');
console.warn = quiet;
let mesh = null;
model.traverse((o) => { if (o.isSkinnedMesh && !mesh) mesh = o; });
if (!mesh) throw new Error('no skinned mesh in ' + fbxPath);

const geo = mesh.geometry;
const P = geo.attributes.position;
const NRM = geo.attributes.normal;
const UV = geo.attributes.uv;
const SI = geo.attributes.skinIndex;
const SW = geo.attributes.skinWeight;
const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
const texOf = materials.map((m) => {
  const n = String(m.name).toLowerCase();
  const kind = n.includes('opacity') ? 'opacity' : n.includes('head') ? 'head' : 'body';
  const file = join(texDir, `${prefix}_${kind}_color.rgba`);
  return { kind, data: existsSync(file) ? readFileSync(file) : null };
});
const groups = geo.groups.length ? geo.groups : [{ start: 0, count: P.count, materialIndex: 0 }];

// Seeded random numbers (mulberry32).
let seed = 20261120;
const rnd = () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Triangles with their area, weighted so the face gets more Gaussians.
const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), ab = new THREE.Vector3(), ac = new THREE.Vector3();
const tris = [];
let total = 0;
for (const g of groups) {
  const t = texOf[g.materialIndex] || texOf[0];
  const boost = t.kind === 'head' ? 9 : t.kind === 'opacity' ? 2.5 : 1;
  for (let i = g.start; i + 2 < g.start + g.count; i += 3) {
    a.fromBufferAttribute(P, i); b.fromBufferAttribute(P, i + 1); c.fromBufferAttribute(P, i + 2);
    const area = ab.subVectors(b, a).cross(ac.subVectors(c, a)).length() / 2;
    if (!(area > 0)) continue;
    total += area * boost;
    tris.push({ i, area, w: area * boost, tex: t, cum: total, boost });
  }
}

const pos = new Float32Array(COUNT * 3);
const nrm = new Int8Array(COUNT * 4);
const col = new Uint8Array(COUNT * 4);
const bone = new Uint8Array(COUNT * 4);
const wgt = new Uint8Array(COUNT * 4);
const rad = new Float32Array(COUNT);
const sample = (tex, u, v, out) => {
  if (!tex.data) { out[0] = out[1] = out[2] = 180; out[3] = 255; return; }
  const x = Math.min(TEX - 1, Math.max(0, Math.floor((u - Math.floor(u)) * TEX)));
  const y = Math.min(TEX - 1, Math.max(0, Math.floor((1 - (v - Math.floor(v))) * TEX)));
  const k = (y * TEX + x) * 4;
  out[0] = tex.data[k]; out[1] = tex.data[k + 1]; out[2] = tex.data[k + 2]; out[3] = tex.data[k + 3];
};
const rgba = [0, 0, 0, 0];
const n = new THREE.Vector3();
let made = 0, tries = 0;
const perKind = { body: 0, head: 0, opacity: 0 };
while (made < COUNT && tries < COUNT * 30) {
  tries += 1;
  // Pick a triangle by weighted area (binary search), then a point in it.
  const r = rnd() * total;
  let lo = 0, hi = tris.length - 1;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (tris[mid].cum < r) lo = mid + 1; else hi = mid; }
  const t = tris[lo];
  let u = rnd(), v = rnd();
  if (u + v > 1) { u = 1 - u; v = 1 - v; }
  const w = 1 - u - v;
  const i = t.i;
  const tu = UV.getX(i) * w + UV.getX(i + 1) * u + UV.getX(i + 2) * v;
  const tv = UV.getY(i) * w + UV.getY(i + 1) * u + UV.getY(i + 2) * v;
  sample(t.tex, tu, tv, rgba);
  // Hair and lashes are cards with see-through parts: keep only where there is hair.
  if (t.tex.kind === 'opacity' && rgba[3] < 110) continue;
  // Eyelashes are dark cards in front of the eyes; as discs they would cover them. Keep hair only.
  if (t.tex.kind === 'opacity' && rgba[0] * 0.3 + rgba[1] * 0.6 + rgba[2] * 0.1 < 75) continue;
  const o = made * 3;
  pos[o] = P.getX(i) * w + P.getX(i + 1) * u + P.getX(i + 2) * v;
  pos[o + 1] = P.getY(i) * w + P.getY(i + 1) * u + P.getY(i + 2) * v;
  pos[o + 2] = P.getZ(i) * w + P.getZ(i + 1) * u + P.getZ(i + 2) * v;
  n.set(NRM.getX(i) * w + NRM.getX(i + 1) * u + NRM.getX(i + 2) * v, NRM.getY(i) * w + NRM.getY(i + 1) * u + NRM.getY(i + 2) * v, NRM.getZ(i) * w + NRM.getZ(i + 1) * u + NRM.getZ(i + 2) * v).normalize();
  const q = made * 4;
  nrm[q] = Math.round(n.x * 127); nrm[q + 1] = Math.round(n.y * 127); nrm[q + 2] = Math.round(n.z * 127);
  col[q] = rgba[0]; col[q + 1] = rgba[1]; col[q + 2] = rgba[2]; col[q + 3] = t.tex.kind === 'head' ? 1 : t.tex.kind === 'opacity' ? 2 : 0; // alpha byte carries the part
  // Attachment: the bones of the nearest corner.
  const corner = w >= u && w >= v ? i : u >= v ? i + 1 : i + 2;
  let sum = 0;
  for (let k = 0; k < 4; k++) sum += SW.getComponent(corner, k);
  for (let k = 0; k < 4; k++) {
    bone[q + k] = SI.getComponent(corner, k);
    wgt[q + k] = Math.round((SW.getComponent(corner, k) / (sum || 1)) * 255);
  }
  // Radius: so that neighbouring Gaussians overlap. Surface area per Gaussian, by how densely this part is sampled.
  rad[made] = 0;
  made += 1;
  perKind[t.tex.kind] += 1;
}
if (made < COUNT) throw new Error(`only ${made} of ${COUNT} Gaussians could be placed`);
// Radius from the density of each part: area / count, then a disc of 2.4x that area so discs overlap.
const areaOf = { body: 0, head: 0, opacity: 0 };
for (const t of tris) areaOf[t.tex.kind] += t.area;
for (let k = 0; k < COUNT; k++) {
  const kind = col[k * 4 + 3] === 1 ? 'head' : col[k * 4 + 3] === 2 ? 'opacity' : 'body';
  rad[k] = Math.sqrt((areaOf[kind] * (kind === 'opacity' ? 0.5 : 1) / Math.max(1, perKind[kind])) * 2.4 / Math.PI);
}

const parts = [pos, nrm, col, bone, wgt, rad];
const bytes = parts.reduce((s, p) => s + p.byteLength, 0);
const out = new Uint8Array(bytes);
let off = 0;
const layout = {};
for (const [name, p] of [['position', pos], ['normal', nrm], ['colour', col], ['bone', bone], ['weight', wgt], ['radius', rad]]) {
  layout[name] = off;
  out.set(new Uint8Array(p.buffer, p.byteOffset, p.byteLength), off);
  off += p.byteLength;
}
writeFileSync(outBase + '.gauss.bin', out);
// Each bone's place in the bind pose (mesh space, the same units as the positions), for training code that poses the body.
const boneBind = mesh.skeleton.boneInverses.map((m) => new THREE.Vector3().setFromMatrixPosition(m.clone().invert()).applyMatrix4(mesh.bindMatrix.clone().invert()).toArray().map((x) => +x.toFixed(3)));
writeFileSync(outBase + '.gauss.json', JSON.stringify({
  version: 1,
  count: COUNT,
  units: 'model units of the source mesh (centimetres), bind pose',
  layout,
  types: { position: 'float32 x3', normal: 'int8 x4 (xyz/127, pad)', colour: 'uint8 x4 (rgb, part: 0 body 1 head 2 hair)', bone: 'uint8 x4', weight: 'uint8 x4 (/255)', radius: 'float32' },
  parts: perKind,
  bones: mesh.skeleton.bones.map((bn) => bn.name),
  boneBind,
  source: { mesh: mesh.name, seed: 20261120 },
}, null, 1));
console.log(`${outBase}: ${COUNT} Gaussians (body ${perKind.body}, head ${perKind.head}, hair ${perKind.opacity}), ${(bytes / 1048576).toFixed(2)} MB; radius body ${rad[0].toFixed(2)}`);
