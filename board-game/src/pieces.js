import * as THREE from 'three';

export function standard(color, roughness = 0.55) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.06,
    envMapIntensity: 0.55,
  });
}

export function metal(color, emissive = 0x000000) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: 0.28,
    metalness: 0.88,
    roughness: 0.26,
    envMapIntensity: 1.15,
  });
}

function add(group, mesh) {
  group.add(mesh);
  return mesh;
}

const geoCache = {};
function sharedGeo(name, build) {
  if (!geoCache[name]) geoCache[name] = build();
  return geoCache[name];
}

let crownMap;
function crownTexture() {
  if (crownMap) return crownMap;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const g = canvas.getContext('2d');
  g.clearRect(0, 0, 128, 128);
  g.fillStyle = '#ffffff';
  g.beginPath();
  g.moveTo(18, 100);
  g.lineTo(18, 62);
  g.lineTo(40, 78);
  g.lineTo(52, 42);
  g.lineTo(64, 74);
  g.lineTo(78, 38);
  g.lineTo(92, 78);
  g.lineTo(110, 58);
  g.lineTo(110, 100);
  g.closePath();
  g.fill();
  g.fillRect(18, 92, 92, 14);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  crownMap = tex;
  return tex;
}

function flat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.55,
    metalness: opts.metalness ?? 0.12,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    flatShading: true,
    envMapIntensity: 0.4,
  });
}

function factionColors(side) {
  const gold = side === 0;
  return {
    armor: 0xc5cad2,
    armorDark: 0x8e949e,
    steel: 0xd8dbe2,
    cloth: 0xb7bcc6,
    tabard: 0xf3f0e8,
    cape: gold ? 0xc4373f : 0x5c3d96,
    scarf: gold ? 0xd24a52 : 0x6d4eae,
    crown: gold ? 0xe2b23a : 0x3f86e0,
    base: gold ? 0xd7b25c : 0xc5bddc,
    baseTop: 0xf7f4ee,
    visor: 0x14120f,
    leather: 0x6a6158,
    string: 0x2c2a28,
  };
}

const THIGH = 0.16;
const SHIN = 0.15;
const UPPER = 0.15;
const FORE = 0.135;
const HIP_Y = 0.4;

const _up = new THREE.Vector3(0, 1, 0);
const _tipTop = new THREE.Vector3(0, 0.22, 0);
const _tipBot = new THREE.Vector3(0, -0.22, 0);
const _mid = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _wp = new THREE.Vector3();
const _wp2 = new THREE.Vector3();

function stretch(mesh, a, b) {
  _dir.subVectors(b, a);
  const len = Math.max(0.001, _dir.length());
  _mid.addVectors(a, b).multiplyScalar(0.5);
  mesh.position.copy(_mid);
  mesh.scale.set(1, len, 1);
  _dir.multiplyScalar(1 / len);
  mesh.quaternion.setFromUnitVectors(_up, _dir);
}

function smoothstep(t) {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function restPose(kind) {
  const pose = {
    hipL: [0.06, 0, -0.08],
    hipR: [0.06, 0, 0.08],
    kneeL: [0.16, 0, 0],
    kneeR: [0.16, 0, 0],
    ankleL: [-0.1, 0, 0],
    ankleR: [-0.1, 0, 0],
    spine: [0.04, 0, 0],
    neck: [0.06, 0, 0],
    shoulderL: [0.12, 0, -0.16],
    shoulderR: [0.12, 0, 0.16],
    elbowL: [-0.18, 0, 0],
    elbowR: [-0.18, 0, 0],
    wristL: [0, 0, 0],
    wristR: [0, 0, 0],
  };
  if (kind === 'archer') {
    pose.shoulderL = [-0.72, 0.2, -1.12];
    pose.elbowL = [-0.58, 0, 0];
    pose.wristL = [0.2, 0.15, 0];
    pose.shoulderR = [-1.12, -0.22, 0.62];
    pose.elbowR = [-1.15, 0, 0];
    pose.wristR = [0.45, -0.1, 0];
  } else if (kind === 'sword') {
    pose.shoulderL = [-0.42, 0.08, -1.02];
    pose.elbowL = [-0.48, 0, 0];
    pose.wristL = [0.25, -0.15, 0];
    pose.shoulderR = [-0.78, -0.12, 1.18];
    pose.elbowR = [-0.95, 0, 0];
    pose.wristR = [-0.4, 0, 0];
  } else {
    pose.shoulderL = [0.18, 0, -0.28];
    pose.elbowL = [-0.22, 0, 0];
    pose.shoulderR = [-0.5, 0.05, 0.95];
    pose.elbowR = [-0.42, 0, 0];
    pose.wristR = [-0.15, 0, 0];
  }
  return pose;
}

const JOINTS = [
  'hipL', 'hipR', 'kneeL', 'kneeR', 'ankleL', 'ankleR',
  'spine', 'neck', 'shoulderL', 'shoulderR', 'elbowL', 'elbowR', 'wristL', 'wristR',
];

function createRig(nodes, kind, extras) {
  const rest = restPose(kind);
  const cur = {};
  for (const name of JOINTS) cur[name] = rest[name].slice();
  let capeX = 0.32;
  let capeV = 0;
  const capeRest = 0.32;

  function drive(dt, state = {}) {
    const action = state.action || 'idle';
    const phase = state.gaitPhase || 0;
    const idlePhase = state.idlePhase ?? phase;
    const tgt = {};
    for (const name of JOINTS) tgt[name] = rest[name].slice();

    const breath = Math.sin(idlePhase * 1.7);
    tgt.spine[0] += breath * 0.02;
    tgt.spine[1] += Math.sin(idlePhase * 0.6) * 0.025;
    tgt.neck[0] += breath * 0.015;

    if (action === 'walk') {
      const s = Math.sin(phase);
      tgt.hipL[0] += -s * 0.52;
      tgt.hipR[0] += s * 0.52;
      tgt.kneeL[0] += Math.max(0, s) * 1.15;
      tgt.kneeR[0] += Math.max(0, -s) * 1.15;
      tgt.shoulderL[0] += s * 0.16;
      tgt.shoulderR[0] += -s * 0.16;
      tgt.elbowL[0] += Math.max(0, -s) * 0.28;
      tgt.elbowR[0] += Math.max(0, s) * 0.28;
      tgt.spine[1] += s * 0.08;
      tgt.spine[0] += 0.04;
    } else if (action === 'ready') {
      tgt.kneeL[0] += 0.14;
      tgt.kneeR[0] += 0.14;
      tgt.spine[0] += -0.07;
      tgt.shoulderL[0] += -0.12;
      tgt.shoulderR[0] += -0.1;
      tgt.shoulderL[2] += -0.08;
      tgt.shoulderR[2] += 0.08;
    } else if (action === 'strike') {
      const x = THREE.MathUtils.clamp(state.strike ?? 0, 0, 1);
      const cock = x < 0.38 ? smoothstep(x / 0.38) : smoothstep(1 - (x - 0.38) / 0.62);
      const slash = x < 0.38 ? 0 : smoothstep((x - 0.38) / 0.62);
      tgt.shoulderR[0] = rest.shoulderR[0] - 0.55 * cock - 1.25 * slash;
      tgt.shoulderR[2] = rest.shoulderR[2] + 0.15 * cock - 0.35 * slash;
      tgt.elbowR[0] = rest.elbowR[0] - 0.4 * cock + 0.7 * slash;
      tgt.wristR[0] = rest.wristR[0] + 0.3 * slash;
      tgt.spine[1] = -0.28 * cock + 0.4 * slash;
      tgt.spine[0] = rest.spine[0] + 0.1 * cock - 0.22 * slash;
      tgt.shoulderL[2] += -0.12 * slash;
      tgt.kneeL[0] += 0.08;
      tgt.kneeR[0] += 0.18 * slash;
      tgt.hipL[0] += 0.08 * slash;
    } else if (action === 'draw') {
      const d = smoothstep(state.draw ?? 0);
      tgt.shoulderL[0] = lerp(rest.shoulderL[0], -1.05, d);
      tgt.shoulderL[2] = lerp(rest.shoulderL[2], -0.85, d);
      tgt.elbowL[0] = lerp(rest.elbowL[0], -0.28, d);
      tgt.shoulderR[0] = lerp(rest.shoulderR[0], -1.35, d);
      tgt.shoulderR[1] = lerp(rest.shoulderR[1], -0.4, d);
      tgt.shoulderR[2] = lerp(rest.shoulderR[2], 0.4, d);
      tgt.elbowR[0] = lerp(rest.elbowR[0], -1.5, d);
      tgt.wristR[0] = lerp(rest.wristR[0], 0.55, d);
      tgt.spine[1] = lerp(rest.spine[1], -0.12, d);
      tgt.spine[0] = lerp(rest.spine[0], -0.04, d);
    } else if (action === 'slump') {
      const k = THREE.MathUtils.clamp(state.strike ?? 1, 0, 1);
      tgt.kneeL[0] = lerp(rest.kneeL[0], 1.35, k);
      tgt.kneeR[0] = lerp(rest.kneeR[0], 1.25, k);
      tgt.hipL[0] = lerp(rest.hipL[0], 0.45, k);
      tgt.hipR[0] = lerp(rest.hipR[0], 0.2, k);
      tgt.spine[0] = lerp(rest.spine[0], 0.85, k);
      tgt.neck[0] = lerp(rest.neck[0], 0.45, k);
      tgt.shoulderL[0] = lerp(rest.shoulderL[0], 0.4, k);
      tgt.shoulderR[0] = lerp(rest.shoulderR[0], 0.55, k);
      tgt.shoulderL[2] = lerp(rest.shoulderL[2], -0.2, k);
      tgt.shoulderR[2] = lerp(rest.shoulderR[2], 0.2, k);
      tgt.elbowL[0] = lerp(rest.elbowL[0], -0.3, k);
      tgt.elbowR[0] = lerp(rest.elbowR[0], -0.4, k);
    }

    const extraL = tgt.kneeL[0] - rest.kneeL[0];
    const extraR = tgt.kneeR[0] - rest.kneeR[0];
    tgt.ankleL[0] = rest.ankleL[0] - extraL * 0.55;
    tgt.ankleR[0] = rest.ankleR[0] - extraR * 0.55;

    const rate = action === 'strike' ? 22 : action === 'draw' ? 10 : 12;
    const k = 1 - Math.exp(-rate * Math.max(0, dt));
    for (const name of JOINTS) {
      const c = cur[name];
      const t = tgt[name];
      c[0] += (t[0] - c[0]) * k;
      c[1] += (t[1] - c[1]) * k;
      c[2] += (t[2] - c[2]) * k;
      nodes[name].rotation.set(c[0], c[1], c[2]);
    }

    const speed = state.speed || 0;
    const capeTarget = capeRest + speed * 0.28 + (action === 'walk' ? Math.sin(phase * 2) * 0.05 : 0) + (action === 'slump' ? 0.45 : 0);
    capeV += (capeTarget - capeX) * 28 * dt;
    capeV *= Math.exp(-5.5 * dt);
    capeX += capeV * dt;
    if (nodes.cape) nodes.cape.rotation.x = capeX;

    if (extras.bow && extras.wristL) {
      extras.root.updateMatrixWorld(true);
      extras.wristL.getWorldPosition(_wp);
      extras.bow.parent.worldToLocal(_wp);
      const follow = 1 - Math.exp(-14 * Math.max(dt, 0.016));
      extras.bow.position.lerp(_wp, follow);
      const pull = kind === 'archer'
        ? (action === 'draw' ? 0.15 + smoothstep(state.draw ?? 0) * 0.85 : action === 'slump' ? 0 : 0.22)
        : 0;
      if (extras.nock && extras.wristR) {
        extras.wristR.getWorldPosition(_wp2);
        extras.bow.worldToLocal(_wp2);
        const nockZ = -0.012 - pull * 0.09;
        extras.nock.position.set(
          THREE.MathUtils.clamp(_wp2.x, -0.05, 0.05) * pull,
          THREE.MathUtils.clamp(_wp2.y, -0.14, 0.14) * pull,
          nockZ,
        );
        if (extras.stringTop && extras.stringBot) {
          stretch(extras.stringTop, _tipTop, extras.nock.position);
          stretch(extras.stringBot, _tipBot, extras.nock.position);
        }
      }
    }
  }

  drive(1, { action: 'idle', idlePhase: 0 });
  return { drive, muzzle: extras.nock || null, bow: extras.bow || null };
}

function limbCylinder(top, bottom, length) {
  return sharedGeo(`cyl-${top}-${bottom}-${length}`, () => new THREE.CylinderGeometry(top, bottom, length, 5));
}

function buildKnight({ kind, side, height }) {
  const group = new THREE.Group();
  const colors = factionColors(side);
  const armor = flat(colors.armor, { metalness: 0.42, roughness: 0.4 });
  const armorDark = flat(colors.armorDark, { metalness: 0.5, roughness: 0.38 });
  const steel = flat(colors.steel, { metalness: 0.55, roughness: 0.32 });
  const cloth = flat(colors.cloth, { metalness: 0.02, roughness: 0.82 });
  const tabardMat = flat(colors.tabard, { metalness: 0.02, roughness: 0.72 });
  const capeMat = flat(colors.cape, { metalness: 0.02, roughness: 0.8 });
  capeMat.side = THREE.DoubleSide;
  const scarfMat = flat(colors.scarf, { metalness: 0.02, roughness: 0.78 });
  scarfMat.side = THREE.DoubleSide;
  const leather = flat(colors.leather, { metalness: 0.04, roughness: 0.7 });
  const baseMat = flat(colors.base, { metalness: 0.3, roughness: 0.42 });
  const baseTopMat = flat(colors.baseTop, { metalness: 0.05, roughness: 0.55 });
  const visorMat = new THREE.MeshBasicMaterial({ color: colors.visor });
  const crownMat = new THREE.MeshStandardMaterial({
    color: colors.crown,
    map: crownTexture(),
    transparent: true,
    alphaTest: 0.4,
    roughness: 0.38,
    metalness: 0.3,
    side: THREE.DoubleSide,
    flatShading: true,
  });
  const crownSolid = flat(colors.crown, { metalness: 0.45, roughness: 0.35, emissive: colors.crown, emissiveIntensity: 0.08 });
  const stringMat = flat(colors.string, { metalness: 0, roughness: 0.4 });

  const figure = new THREE.Group();
  figure.scale.setScalar(height);
  group.add(figure);

  const plinth = new THREE.Mesh(sharedGeo('plinth', () => new THREE.CylinderGeometry(0.2, 0.23, 0.04, 6)), baseMat);
  plinth.position.y = 0.02;
  const plinthTop = new THREE.Mesh(sharedGeo('plinthTop', () => new THREE.CylinderGeometry(0.185, 0.198, 0.016, 6)), baseTopMat);
  plinthTop.position.y = 0.046;
  figure.add(plinth, plinthTop);

  const rigRoot = new THREE.Group();
  figure.add(rigRoot);
  const hips = new THREE.Group();
  hips.position.y = HIP_Y;
  rigRoot.add(hips);

  const skirt = new THREE.Mesh(
    sharedGeo('skirt', () => new THREE.CylinderGeometry(0.095, 0.145, 0.2, 6)),
    cloth,
  );
  skirt.position.y = -0.06;
  hips.add(skirt);

  const tabard = new THREE.Mesh(sharedGeo('tabard', () => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.055, 0.06);
    shape.lineTo(0.055, 0.06);
    shape.lineTo(0.038, -0.04);
    shape.lineTo(0, -0.12);
    shape.lineTo(-0.038, -0.04);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }), tabardMat);
  tabard.position.set(0, 0.16, 0.09);

  const emblem = new THREE.Mesh(sharedGeo('emblem', () => new THREE.PlaneGeometry(0.07, 0.055)), crownMat);
  emblem.position.set(0, 0.01, 0.004);
  tabard.add(emblem);

  const spine = new THREE.Group();
  hips.add(spine);
  const chest = new THREE.Mesh(sharedGeo('chest', () => new THREE.BoxGeometry(0.16, 0.16, 0.09)), armor);
  chest.position.set(0, 0.2, 0.01);
  const belt = new THREE.Mesh(sharedGeo('belt', () => new THREE.BoxGeometry(0.17, 0.035, 0.1)), armorDark);
  belt.position.set(0, 0.1, 0.015);
  spine.add(chest, belt, tabard);

  const cape = new THREE.Group();
  cape.position.set(0, 0.28, -0.04);
  cape.rotation.x = 0.32;
  const capelet = new THREE.Mesh(sharedGeo('capelet', () => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.1, 0);
    shape.lineTo(0.1, 0);
    shape.lineTo(0.06, -0.1);
    shape.lineTo(-0.06, -0.1);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }), scarfMat);
  capelet.position.z = -0.01;
  cape.add(capelet);
  if (kind !== 'archer') {
    const cloak = new THREE.Mesh(sharedGeo('cloak', () => {
      const shape = new THREE.Shape();
      shape.moveTo(-0.13, 0);
      shape.lineTo(0.13, 0);
      shape.lineTo(0.07, -0.36);
      shape.lineTo(-0.07, -0.36);
      shape.closePath();
      return new THREE.ShapeGeometry(shape);
    }), capeMat);
    cloak.position.z = -0.012;
    cape.add(cloak);
  }
  spine.add(cape);

  if (kind === 'archer') {
    const quiver = new THREE.Mesh(sharedGeo('quiver', () => new THREE.CylinderGeometry(0.022, 0.028, 0.16, 5)), leather);
    quiver.position.set(-0.07, 0.18, -0.055);
    quiver.rotation.z = -0.35;
    const fletch = new THREE.Mesh(sharedGeo('qfletch', () => new THREE.ConeGeometry(0.02, 0.05, 4)), crownSolid);
    fletch.position.set(-0.09, 0.27, -0.05);
    fletch.rotation.z = -0.35;
    spine.add(quiver, fletch);
  }

  function makeLeg(sign, nameHip, nameKnee, nameAnkle) {
    const hip = new THREE.Group();
    hip.position.set(sign * 0.052, 0, 0);
    hips.add(hip);
    const thigh = new THREE.Mesh(limbCylinder(0.042, 0.036, THIGH * 0.96), armor);
    thigh.position.y = -THIGH / 2;
    hip.add(thigh);
    const knee = new THREE.Group();
    knee.position.y = -THIGH;
    const cop = new THREE.Mesh(sharedGeo('kneecop', () => new THREE.BoxGeometry(0.055, 0.04, 0.05)), steel);
    cop.position.z = 0.03;
    knee.add(cop);
    hip.add(knee);
    const shin = new THREE.Mesh(limbCylinder(0.034, 0.03, SHIN * 0.94), armor);
    shin.position.y = -SHIN / 2;
    knee.add(shin);
    const ankle = new THREE.Group();
    ankle.position.y = -SHIN;
    const boot = new THREE.Mesh(sharedGeo('boot', () => new THREE.BoxGeometry(0.05, 0.04, 0.085)), armorDark);
    boot.position.set(0, -0.018, 0.016);
    ankle.add(boot);
    knee.add(ankle);
    return { hip, knee, ankle };
  }

  const leftLeg = makeLeg(-1, 'hipL', 'kneeL', 'ankleL');
  const rightLeg = makeLeg(1, 'hipR', 'kneeR', 'ankleR');

  function makeArm(sign) {
    const shoulder = new THREE.Group();
    shoulder.position.set(sign * 0.125, 0.3, 0);
    spine.add(shoulder);
    const pad = new THREE.Mesh(sharedGeo('pad', () => new THREE.BoxGeometry(0.09, 0.042, 0.078)), steel);
    pad.position.set(sign * 0.03, 0.02, 0);
    pad.rotation.z = sign * -0.25;
    shoulder.add(pad);
    const upper = new THREE.Mesh(limbCylinder(0.032, 0.028, UPPER * 0.92), armor);
    upper.position.y = -UPPER / 2;
    shoulder.add(upper);
    const elbow = new THREE.Group();
    elbow.position.y = -UPPER;
    const padE = new THREE.Mesh(sharedGeo('elbow', () => new THREE.BoxGeometry(0.04, 0.035, 0.04)), steel);
    padE.position.z = 0.025;
    elbow.add(padE);
    shoulder.add(elbow);
    const fore = new THREE.Mesh(limbCylinder(0.026, 0.024, FORE * 0.92), armor);
    fore.position.y = -FORE / 2;
    elbow.add(fore);
    const wrist = new THREE.Group();
    wrist.position.y = -FORE;
    const fist = new THREE.Mesh(sharedGeo('fist', () => new THREE.BoxGeometry(0.046, 0.04, 0.046)), armorDark);
    fist.position.y = -0.02;
    wrist.add(fist);
    elbow.add(wrist);
    return { shoulder, elbow, wrist };
  }

  const leftArm = makeArm(-1);
  const rightArm = makeArm(1);

  const neck = new THREE.Group();
  neck.position.y = 0.32;
  spine.add(neck);
  const collar = new THREE.Mesh(sharedGeo('collar', () => new THREE.CylinderGeometry(0.05, 0.062, 0.045, 6)), scarfMat);
  collar.position.y = 0.01;
  const helm = new THREE.Group();
  helm.position.y = 0.05;
  const skull = new THREE.Mesh(sharedGeo('skull', () => new THREE.CylinderGeometry(0.068, 0.074, 0.07, 6)), armor);
  skull.position.y = 0.02;
  const point = new THREE.Mesh(sharedGeo('point', () => new THREE.ConeGeometry(0.07, 0.13, 6)), steel);
  point.position.y = 0.11;
  const visor = new THREE.Mesh(sharedGeo('visor', () => new THREE.BoxGeometry(0.086, 0.022, 0.04)), visorMat);
  visor.position.set(0, 0.015, 0.058);
  helm.add(skull, point, visor);
  neck.add(collar, helm);

  if (kind === 'monarch') {
    const band = new THREE.Mesh(sharedGeo('crownBand', () => new THREE.CylinderGeometry(0.05, 0.05, 0.02, 6)), crownSolid);
    band.position.y = 0.175;
    helm.add(band);
    for (let i = 0; i < 4; i++) {
      const prong = new THREE.Mesh(sharedGeo('prong', () => new THREE.ConeGeometry(0.014, 0.055, 4)), crownSolid);
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      prong.position.set(Math.cos(a) * 0.04, 0.21, Math.sin(a) * 0.04);
      helm.add(prong);
    }
    const jewel = new THREE.Mesh(sharedGeo('jewel', () => new THREE.OctahedronGeometry(0.016, 0)), flat(0x9ad7ff, { metalness: 0.1, roughness: 0.2, emissive: 0x6ec8ff, emissiveIntensity: 0.35 }));
    jewel.position.y = 0.2;
    jewel.position.z = 0.045;
    helm.add(jewel);
  }

  let bow = null;
  let nock = null;
  let stringTop = null;
  let stringBot = null;

  if (kind === 'sword') {
    const sword = new THREE.Group();
    const grip = new THREE.Mesh(sharedGeo('sgrip', () => new THREE.CylinderGeometry(0.011, 0.012, 0.055, 5)), leather);
    grip.position.y = -0.04;
    const guard = new THREE.Mesh(sharedGeo('sguard', () => new THREE.BoxGeometry(0.09, 0.012, 0.02)), steel);
    guard.position.y = -0.07;
    const blade = new THREE.Mesh(sharedGeo('sblade', () => new THREE.BoxGeometry(0.018, 0.26, 0.008)), steel);
    blade.position.y = -0.21;
    const tip = new THREE.Mesh(sharedGeo('stip', () => new THREE.ConeGeometry(0.012, 0.06, 4)), steel);
    tip.rotation.x = Math.PI;
    tip.position.y = -0.36;
    sword.add(grip, guard, blade, tip);
    rightArm.wrist.add(sword);

    const shield = new THREE.Group();
    const face = new THREE.Mesh(sharedGeo('heater', () => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0.1);
      shape.lineTo(0.075, 0.06);
      shape.lineTo(0.075, -0.01);
      shape.quadraticCurveTo(0.035, -0.085, 0, -0.115);
      shape.quadraticCurveTo(-0.035, -0.085, -0.075, -0.01);
      shape.lineTo(-0.075, 0.06);
      shape.closePath();
      const g = new THREE.ExtrudeGeometry(shape, {
        depth: 0.016,
        bevelEnabled: true,
        bevelThickness: 0.003,
        bevelSize: 0.003,
        bevelSegments: 1,
        curveSegments: 2,
      });
      g.translate(0, 0, -0.008);
      return g;
    }), tabardMat);
    const mark = new THREE.Mesh(sharedGeo('shieldMark', () => new THREE.PlaneGeometry(0.07, 0.055)), crownMat);
    mark.position.set(0, 0.01, 0.012);
    shield.add(face, mark);
    shield.position.set(0, -0.03, 0.03);
    shield.scale.setScalar(0.95);
    leftArm.wrist.add(shield);
  } else if (kind === 'archer') {
    bow = new THREE.Group();
    const curve = sharedGeo('bowcurve', () => new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, -0.24, 0.05),
      new THREE.Vector3(0, 0, 0.12),
      new THREE.Vector3(0, 0.24, 0.05),
    ));
    const limbGeo = sharedGeo('bowlimb', () => new THREE.TubeGeometry(curve, 6, 0.008, 4, false));
    const limb = new THREE.Mesh(limbGeo, leather);
    const wrap = new THREE.Mesh(sharedGeo('bowwrap', () => new THREE.CylinderGeometry(0.012, 0.012, 0.05, 5)), scarfMat);
    stringTop = new THREE.Mesh(sharedGeo('stringseg', () => new THREE.CylinderGeometry(0.0032, 0.0032, 1, 4)), stringMat);
    stringBot = new THREE.Mesh(sharedGeo('stringseg', () => new THREE.CylinderGeometry(0.0032, 0.0032, 1, 4)), stringMat);
    nock = new THREE.Group();
    const arrowShaft = new THREE.Mesh(sharedGeo('ashaft', () => new THREE.CylinderGeometry(0.004, 0.004, 0.2, 4)), leather);
    arrowShaft.rotation.x = Math.PI / 2;
    const arrowHead = new THREE.Mesh(sharedGeo('ahead', () => new THREE.ConeGeometry(0.012, 0.04, 4)), steel);
    arrowHead.rotation.x = Math.PI / 2;
    arrowHead.position.z = 0.11;
    const fletch = new THREE.Mesh(sharedGeo('afletch', () => new THREE.BoxGeometry(0.028, 0.004, 0.035)), crownSolid);
    fletch.position.z = -0.08;
    nock.add(arrowShaft, arrowHead, fletch);
    bow.add(limb, wrap, stringTop, stringBot, nock);
    rigRoot.add(bow);
  } else {
    const scepter = new THREE.Group();
    const rod = new THREE.Mesh(sharedGeo('rod', () => new THREE.CylinderGeometry(0.008, 0.008, 0.26, 5)), steel);
    rod.position.y = -0.15;
    const orb = new THREE.Mesh(sharedGeo('orb', () => new THREE.OctahedronGeometry(0.026, 0)), crownSolid);
    orb.position.y = -0.3;
    scepter.add(rod, orb);
    rightArm.wrist.add(scepter);
  }

  const nodes = {
    hipL: leftLeg.hip,
    hipR: rightLeg.hip,
    kneeL: leftLeg.knee,
    kneeR: rightLeg.knee,
    ankleL: leftLeg.ankle,
    ankleR: rightLeg.ankle,
    spine,
    neck,
    shoulderL: leftArm.shoulder,
    shoulderR: rightArm.shoulder,
    elbowL: leftArm.elbow,
    elbowR: rightArm.elbow,
    wristL: leftArm.wrist,
    wristR: rightArm.wrist,
    cape,
  };

  const rig = createRig(nodes, kind, {
    root: rigRoot,
    bow,
    nock,
    stringTop,
    stringBot,
    wristL: leftArm.wrist,
    wristR: rightArm.wrist,
  });

  group.userData.rig = rig;
  group.userData.kind = kind;
  group.userData.limbs = {
    legL: leftLeg.hip,
    legR: rightLeg.hip,
    armL: leftArm.shoulder,
    armR: rightArm.shoulder,
  };
  return group;
}

export function createMiniature(type, side) {
  const kind = type === 'A' ? 'archer' : type === 'S' ? 'sword' : 'monarch';
  const height = kind === 'monarch' ? 0.096 : 0.086;
  const group = buildKnight({ kind, side, height });
  group.traverse((obj) => {
    if (obj.isMesh) obj.userData.mini = true;
  });
  return group;
}

export function createBattleSword(hex = 0xf0d090) {
  const group = new THREE.Group();
  const bladeMat = metal(hex, 0x3a2a10);
  bladeMat.emissiveIntensity = 0.55;
  const gripMat = standard(0x3a2416, 0.62);
  const grip = add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.024, 0.2, 8), gripMat));
  grip.rotation.x = Math.PI / 2;
  grip.position.z = -0.02;
  const pommel = add(group, new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 6), bladeMat));
  pommel.position.z = 0.09;
  const guard = add(group, new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.028, 0.045), bladeMat));
  guard.position.z = -0.13;
  const blade = add(group, new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.012, 0.62), bladeMat));
  blade.position.z = -0.46;
  const fuller = add(group, new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.014, 0.48), metal(0xfff4d2, 0x6a5018)));
  fuller.position.z = -0.44;
  const tip = add(group, new THREE.Mesh(new THREE.ConeGeometry(0.034, 0.12, 4), bladeMat));
  tip.rotation.x = Math.PI / 2;
  tip.position.z = -0.82;
  group.userData.tip = new THREE.Vector3(0, 0, -0.9);
  group.userData.base = new THREE.Vector3(0, 0, -0.14);
  return group;
}

export function createBattleShield(hex = 0xf0d090) {
  const group = new THREE.Group();
  const face = metal(hex, 0x2a2010);
  const disc = add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.045, 16), face));
  disc.rotation.x = Math.PI / 2;
  const boss = add(group, new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), metal(0xfff1c4, 0x5a4010)));
  boss.position.z = -0.04;
  const rim = add(group, new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.02, 6, 18), metal(0x8d7340)));
  group.position.z = -0.05;
  return group;
}

export function createBattleBow(hex = 0xf0d090) {
  const group = new THREE.Group();
  const wood = standard(0x6a4324, 0.55);
  const accent = metal(hex, 0x3a2a10);
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, -0.58, 0.08),
    new THREE.Vector3(0, 0, -0.32),
    new THREE.Vector3(0, 0.58, 0.08),
  );
  const limb = add(group, new THREE.Mesh(new THREE.TubeGeometry(curve, 18, 0.014, 6, false), wood));
  const wrap = add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.12, 8), accent));
  const string = add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 1.05, 4), accent));
  string.position.set(0, 0, 0.08);
  const nock = createArrowMesh(hex);
  nock.position.set(0, 0, 0.08);
  group.add(nock);
  group.userData.string = string;
  group.userData.nock = nock;
  group.userData.restZ = 0.08;
  return group;
}

export function createArrowMesh(hex = 0xe8d2a0) {
  const group = new THREE.Group();
  const shaft = add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.72, 5), standard(0x8b5a32, 0.5)));
  shaft.rotation.x = Math.PI / 2;
  const head = add(group, new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.14, 5), metal(hex, 0x33240e)));
  head.rotation.x = Math.PI / 2;
  head.position.z = -0.4;
  const fletchMat = standard(0xf2efe6, 0.45);
  for (const rot of [0, 2.1, 4.2]) {
    const f = add(group, new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.004, 0.12), fletchMat));
    f.position.set(0, 0, 0.28);
    f.rotation.z = rot;
  }
  return group;
}

export function createSoldier(kind, colors, side) {
  const resolved = side ?? (colors?.emissive === 0x4a3010 ? 0 : 1);
  const knightKind = kind === 'sword' ? 'sword' : 'archer';
  return buildKnight({ kind: knightKind, side: resolved, height: 1.72 });
}
