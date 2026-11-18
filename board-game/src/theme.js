// The look of the game: 'classic' (medieval: swords and arrows) or 'warstars' (a space battle:
// energy swords and laser bolts). A theme changes only what things look and sound like. Nothing
// here touches rules, timing, speeds or collisions.
//
// Things that look different per theme register themselves once, when they are built:
//   variant(classicObjects, spaceObjects)   two sets of objects, one of which is shown
//   tint(material, spaceProps)              a material with different properties in space
// and setTheme() flips them all, so pieces already on the board change where they stand.

import * as THREE from 'three';

let theme = 'classic';
const variants = [];
const tints = [];
const listeners = [];

export const isSpace = () => theme === 'warstars';
export const getTheme = () => theme;

function showVariant(v) {
  const space = theme === 'warstars';
  for (const o of v.classic) o.visible = !space;
  for (const o of v.space) o.visible = space;
}
function applyTint(t) {
  const props = theme === 'warstars' ? t.space : t.own;
  for (const k in props) {
    const v = props[k];
    if (t.mat[k] && t.mat[k].isColor) t.mat[k].set(v);
    else t.mat[k] = v;
  }
  t.mat.needsUpdate = true;
}

/** Two looks for one thing: `classic` objects are shown in the medieval game, `space` ones in Warstars. */
export function variant(classic, space) {
  const v = { classic: [].concat(classic || []), space: [].concat(space || []) };
  variants.push(v);
  showVariant(v);
  return v;
}

/** A material that takes other properties in Warstars (colours as hex numbers). Its own are kept and restored. */
export function tint(mat, space) {
  const own = {};
  for (const k in space) own[k] = mat[k] && mat[k].isColor ? mat[k].getHex() : mat[k];
  const t = { mat, own, space };
  tints.push(t);
  applyTint(t);
  return mat;
}

/** Be told when the theme changes (called with 'classic' or 'warstars'). */
export function onTheme(fn) {
  listeners.push(fn);
}

export function setTheme(next) {
  const t = next === 'warstars' ? 'warstars' : 'classic';
  if (t === theme) return false;
  theme = t;
  for (const v of variants) showVariant(v);
  for (const x of tints) applyTint(x);
  for (const fn of listeners) {
    try { fn(theme); } catch (e) { console.warn('theme listener failed', e); }
  }
  return true;
}

// ---------------------------------------------------------------- shared space parts

/** Energy colours by side: the Light Side (the first player) blue, the Dark Side red. */
export const ENERGY = [0x3fa9ff, 0xff2d2d];
export const BOLT = 0xff2218;

const glowMats = new Map();
/** A see-through additive glow in a colour, shared. */
export function glowMat(hex, opacity = 0.34) {
  const key = hex + ':' + opacity;
  if (!glowMats.has(key)) glowMats.set(key, new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, fog: false }));
  return glowMats.get(key);
}
const coreMats = new Map();
/** The bright heart of a beam, shared. */
export function coreMat(hex) {
  if (!coreMats.has(hex)) coreMats.set(hex, new THREE.MeshBasicMaterial({ color: hex, toneMapped: false, fog: false }));
  return coreMats.get(hex);
}

/**
 * A beam along +Y from y0 to y1: a near-white core inside a glow of the given colour. Used for
 * energy-sword blades (wide, in a side's colour) and laser bolts (narrow, red).
 */
export function beam(y0, y1, radius, hex) {
  const g = new THREE.Group();
  const len = y1 - y0;
  const mid = (y0 + y1) / 2;
  const white = new THREE.Color(hex).lerp(new THREE.Color(0xffffff), 0.72).getHex();
  const core = new THREE.Mesh(new THREE.CapsuleGeometry(radius * 0.5, Math.max(0.01, len - radius), 3, 8), coreMat(white));
  core.position.y = mid;
  const inner = new THREE.Mesh(new THREE.CapsuleGeometry(radius, Math.max(0.01, len - radius), 3, 8), glowMat(hex, 0.55));
  inner.position.y = mid;
  const outer = new THREE.Mesh(new THREE.CapsuleGeometry(radius * 2.1, Math.max(0.01, len - radius), 3, 8), glowMat(hex, 0.22));
  outer.position.y = mid;
  g.add(core, inner, outer);
  return g;
}

/** A laser bolt along +Y, centred on the origin: bright red and easy to see coming. */
export function laserBolt(length = 0.6) {
  return beam(-length / 2, length / 2, 0.016, BOLT);
}
