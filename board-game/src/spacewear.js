// Warstars outfits for the two companions, worn while that mode is on.
//
//   Sundai    a starship commander: a pale, high-collared long tunic with lit blue trim over dark
//             leggings and boots.
//   Saturdai  a pilot: a slate flight jacket with a chest harness and blue piping, dark flight
//             trousers and boots.
//
// Like the court gown (medieval.js), each outfit is painted on the character's own surface in the
// bind pose, measured from that character's skeleton, so it fits either body and moves with it.
// Face, neck, hands and hair keep their own colours. Putting it on and taking it off is reversible.

import * as THREE from 'three';

const HEAD = /* glsl */ `
varying vec3 vBindPos;
uniform vec3 uShoulder;
uniform vec3 uWrist;
uniform float uWaist;
uniform float uBust;
uniform float uKnee;
uniform float uAnkle;
uniform vec3 uBase;
uniform vec3 uDark;
uniform vec3 uAccent;
uniform float uPilot;
float swGlow = 0.0;
float swEdge(float v, float at) {
  float w = max(fwidth(v), 0.08);
  return smoothstep(at - w, at + w, v);
}
// A band between two heights (or lengths), soft-edged.
float swBand(float v, float a, float b) {
  return swEdge(v, a) * (1.0 - swEdge(v, b));
}
// Technical cloth: an even colour with a fine ribbing.
vec3 swCloth(vec3 col, vec3 p) {
  float rib = 0.5 + 0.5 * sin(p.y * 5.0);
  float mottle = 0.5 + 0.5 * sin(p.x * 0.31 + p.y * 0.17) * sin(p.y * 0.23 - p.z * 0.29);
  return col * (0.95 + 0.05 * rib) * (0.95 + 0.1 * mottle);
}
`;

const PAINT = /* glsl */ `
#include <map_fragment>
{
  // Positions are in the bind pose, in the model's centimetres (x across, y up, z forward).
  vec3 p = vBindPos;
  vec3 bp = p;
  bp.x = abs(bp.x);
  vec3 c0 = diffuseColor.rgb;
  float mx = max(c0.r, max(c0.g, c0.b));
  float mn = min(c0.r, min(c0.g, c0.b));
  float sat = mx > 0.0 ? (mx - mn) / mx : 0.0;
  bool skin = c0.r > c0.g * 1.05 && c0.g > c0.b * 1.02 && sat > 0.12;
  vec3 armDir = uWrist - uShoulder;
  float armLen = length(armDir);
  float along = dot(bp - uShoulder, armDir) / (armLen * armLen);
  float across = length(bp - uShoulder - armDir * along);
  bool onArm = along > 0.04 && along < 0.975 && across < 10.0;
  bool torso = bp.x < 24.0 && !onArm;
  float front = swEdge(bp.z, -2.0);
  vec3 base = swCloth(uBase, p);
  vec3 dark = swCloth(uDark, p);
  vec3 col = c0;
  float glow = 0.0;
  // How far the upper garment comes down: a long tunic for the commander, a waist-length jacket for the pilot.
  float hem = mix(uWaist - (uWaist - uKnee) * 0.55, uWaist - 1.0, uPilot);
  if (onArm) {
    // Full sleeves: a lit band on the upper arm and a dark cuff.
    float l = along * armLen;
    col = base;
    glow = swBand(l, 0.30 * armLen, 0.33 * armLen);
    col = mix(col, dark, swEdge(l, 0.9 * armLen));
    glow = max(glow, swBand(l, 0.885 * armLen, 0.9 * armLen));
  } else if (torso && bp.y < uAnkle + 9.0) {
    // Boots, with a lit line round the top.
    col = dark * 0.55;
    glow = swBand(bp.y, uAnkle + 7.8, uAnkle + 9.0) * 0.8;
  } else if (torso && bp.y < hem) {
    // Leggings or flight trousers, with a padded knee.
    col = dark;
    col = mix(col, dark * 1.6, swBand(bp.y, uKnee - 4.0, uKnee + 5.0) * front);
  } else if (torso && (bp.y < uBust + 7.0 || !skin)) {
    // The tunic or jacket.
    col = base;
    // Its hem and its front closing, both lit.
    glow = swBand(bp.y, hem, hem + 1.1);
    float seam = front * (1.0 - swEdge(bp.x, 0.55)) * (1.0 - swEdge(bp.y, uBust + 9.0));
    col = mix(col, dark, seam);
    // A belt at the waist with a lit clasp.
    float belt = swBand(bp.y, uWaist - 0.5, uWaist + 4.0);
    col = mix(col, dark * 0.7, belt);
    glow = max(glow, belt * front * (1.0 - swEdge(bp.x, 2.6)) * swBand(bp.y, uWaist + 0.4, uWaist + 3.1));
    // Shoulder yoke and high collar in the darker cloth, piped in light.
    float yoke = swEdge(bp.y, uShoulder.y - 1.5);
    col = mix(col, dark, yoke);
    glow = max(glow, swBand(bp.y, uShoulder.y - 2.6, uShoulder.y - 1.5));
    if (uPilot > 0.5) {
      // The pilot's harness: two straps over the shoulders to the belt, and a chest box.
      float strap = swBand(bp.x, 6.0, 9.5) * swEdge(bp.y, uWaist + 4.0);
      col = mix(col, vec3(0.045, 0.04, 0.035), strap);
      float box = front * swBand(bp.x, 1.5, 5.0) * swBand(bp.y, uBust - 7.0, uBust - 1.5) * step(0.0, p.x);
      col = mix(col, vec3(0.5, 0.52, 0.55), box);
      glow = max(glow, front * swBand(bp.x, 2.2, 4.3) * swBand(bp.y, uBust - 4.2, uBust - 3.2) * step(0.0, p.x));
    } else {
      // The commander's rank: three short lit bars on the left breast.
      float bars = front * step(0.0, p.x) * swBand(bp.x, 6.0, 11.5) * step(0.5, fract((bp.y - uBust) * 0.42)) * swBand(bp.y, uBust + 0.5, uBust + 7.4);
      glow = max(glow, bars);
    }
  }
  col = mix(col, uAccent, glow * 0.85);
  swGlow = glow;
  diffuseColor.rgb = col;
}
`;

const STYLE = {
  // Pale alloy-white over midnight blue.
  commander: { base: [0.62, 0.65, 0.7], dark: [0.035, 0.05, 0.1], accent: [0.2, 0.62, 1.0], pilot: 0 },
  // Slate over near-black.
  pilot: { base: [0.13, 0.17, 0.22], dark: [0.03, 0.035, 0.045], accent: [0.2, 0.62, 1.0], pilot: 1 },
};

/**
 * Put the Warstars outfit on a loaded avatar (from webxr/avatar.js): 'commander' or 'pilot'.
 * Safe to call again; does nothing if the model is not there yet.
 */
export function dressSpace(avatar, style = 'commander') {
  const model = avatar?.body?.model;
  if (!model) return;
  let kit = model.userData.spaceKit;
  if (kit) {
    if (!kit.on) {
      kit.on = true;
      for (const d of kit.dyed) d.apply();
      for (const o of kit.parts) o.visible = true;
    }
    return;
  }
  kit = { on: true, dyed: [], parts: [] };
  model.userData.spaceKit = kit;
  const s = STYLE[style] || STYLE.commander;

  // This character's own measurements, from the skeleton's bind pose (model centimetres).
  const m = { shoulder: new THREE.Vector3(17.2, 138, -6.1), wrist: new THREE.Vector3(52.4, 106.3, 3.1), pelvis: 92.3, spine: 128.9, knee: 48, ankle: 9 };
  model.traverse((o) => {
    if (!o.isSkinnedMesh) return;
    o.skeleton.bones.forEach((bone, i) => {
      const n = bone.name.toLowerCase().replace(/_/g, ' ');
      const at = () => new THREE.Vector3().setFromMatrixPosition(o.skeleton.boneInverses[i].clone().invert());
      if (n.endsWith('l upperarm')) m.shoulder.copy(at());
      else if (n.endsWith('l hand')) m.wrist.copy(at());
      else if (n.endsWith('pelvis')) m.pelvis = at().y;
      else if (n.endsWith('spine2')) m.spine = at().y;
      else if (n.endsWith('l calf')) m.knee = at().y;
      else if (n.endsWith('l foot')) m.ankle = at().y;
    });
  });
  m.shoulder.x = Math.abs(m.shoulder.x);
  m.wrist.x = Math.abs(m.wrist.x);
  const uniforms = {
    uShoulder: { value: m.shoulder },
    uWrist: { value: m.wrist },
    uWaist: { value: m.pelvis + (m.spine - m.pelvis) * 0.29 },
    uBust: { value: m.spine - 2 },
    uKnee: { value: m.knee },
    uAnkle: { value: m.ankle },
    uBase: { value: new THREE.Vector3(...s.base) },
    uDark: { value: new THREE.Vector3(...s.dark) },
    uAccent: { value: new THREE.Vector3(...s.accent) },
    uPilot: { value: s.pilot },
  };

  model.traverse((o) => {
    if (!o.isMesh) return;
    for (const mat of Array.isArray(o.material) ? o.material : [o.material]) {
      const name = String(mat?.name || '').toLowerCase();
      if (!mat || name.includes('head') || name.includes('opacity') || mat.userData.spaceWear) continue;
      mat.userData.spaceWear = true;
      const own = { onBeforeCompile: mat.onBeforeCompile, customProgramCacheKey: mat.customProgramCacheKey, normalMap: mat.normalMap, roughness: mat.roughness };
      const apply = () => {
        mat.onBeforeCompile = (shader) => {
          Object.assign(shader.uniforms, uniforms);
          shader.vertexShader = shader.vertexShader
            .replace('#include <common>', '#include <common>\nvarying vec3 vBindPos;')
            .replace('#include <begin_vertex>', '#include <begin_vertex>\nvBindPos = (bindMatrix * vec4(position, 1.0)).xyz;');
          shader.fragmentShader = shader.fragmentShader
            .replace('#include <common>', '#include <common>\n' + HEAD)
            .replace('#include <map_fragment>', PAINT)
            // The trim is lit from within.
            .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += uAccent * swGlow * 1.6;');
        };
        mat.customProgramCacheKey = () => 'space-wear-1-' + style;
        mat.normalMap = null; // the everyday clothes' folds and seams
        mat.roughness = 0.7;
        mat.needsUpdate = true;
      };
      const restore = () => {
        mat.onBeforeCompile = own.onBeforeCompile;
        mat.customProgramCacheKey = own.customProgramCacheKey;
        mat.normalMap = own.normalMap;
        mat.roughness = own.roughness;
        mat.needsUpdate = true;
      };
      kit.dyed.push({ apply, restore });
      apply();
    }
  });

}

/** Back into their own clothes. */
export function undressSpace(avatar) {
  const kit = avatar?.body?.model?.userData.spaceKit;
  if (!kit || !kit.on) return;
  kit.on = false;
  for (const d of kit.dyed) d.restore();
  for (const o of kit.parts) o.visible = false;
}
