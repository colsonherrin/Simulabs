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

export function createMiniature(type, side) {
  const group = new THREE.Group();
  const gold = side === 0;
  const primary = metal(gold ? 0xf2d48a : 0xd5d2f4, gold ? 0x5a3d12 : 0x2a2150);
  const accent = metal(gold ? 0xffe6a6 : 0xf2ecff, gold ? 0x7a5418 : 0x3d2c78);
  accent.emissiveIntensity = 0.55;
  const cloth = standard(gold ? 0x8d2434 : 0x2a1858, 0.62);
  const leather = standard(gold ? 0x4a301c : 0x241c28, 0.72);
  const dark = metal(gold ? 0x6e5428 : 0x6a6790, 0x000000);

  const base = add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.023, 0.007, 18), primary));
  base.position.y = 0.0035;
  const ring = add(group, new THREE.Mesh(new THREE.TorusGeometry(0.0175, 0.0024, 6, 20), accent));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.0072;

  if (type === 'S') buildSwordsman(group, { primary, accent, cloth, leather, dark });
  else if (type === 'A') buildArcher(group, { primary, accent, cloth, leather, dark });
  else buildMonarch(group, { primary, accent, cloth, leather, dark });

  group.traverse((obj) => {
    if (obj.isMesh) obj.userData.mini = true;
  });
  return group;
}

function buildSwordsman(group, m) {
  const leg = new THREE.CylinderGeometry(0.0045, 0.0055, 0.02, 6);
  const lLeg = add(group, new THREE.Mesh(leg, m.leather));
  const rLeg = add(group, new THREE.Mesh(leg, m.leather));
  lLeg.position.set(-0.006, 0.017, 0);
  rLeg.position.set(0.006, 0.017, 0);
  const torso = add(group, new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.01), m.cloth));
  torso.position.y = 0.036;
  const belt = add(group, new THREE.Mesh(new THREE.BoxGeometry(0.021, 0.004, 0.011), m.primary));
  belt.position.y = 0.028;
  const head = add(group, new THREE.Mesh(new THREE.SphereGeometry(0.0072, 10, 8), m.leather));
  head.position.y = 0.052;
  const helm = add(group, new THREE.Mesh(new THREE.ConeGeometry(0.008, 0.012, 6), m.primary));
  helm.position.y = 0.06;
  const crest = add(group, new THREE.Mesh(new THREE.BoxGeometry(0.002, 0.01, 0.008), m.accent));
  crest.position.set(0, 0.064, 0);
  const shield = add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.003, 12), m.primary));
  shield.rotation.z = Math.PI / 2;
  shield.position.set(-0.014, 0.038, 0.006);
  const boss = add(group, new THREE.Mesh(new THREE.SphereGeometry(0.003, 8, 6), m.accent));
  boss.position.set(-0.014, 0.038, 0.0085);
  const blade = add(group, new THREE.Mesh(new THREE.BoxGeometry(0.003, 0.028, 0.0016), m.accent));
  blade.position.set(0.012, 0.05, 0.004);
  blade.rotation.z = -0.25;
  const guard = add(group, new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.0022, 0.003), m.primary));
  guard.position.set(0.012, 0.038, 0.004);
}

function buildArcher(group, m) {
  const leg = new THREE.CylinderGeometry(0.004, 0.005, 0.02, 6);
  const lLeg = add(group, new THREE.Mesh(leg, m.leather));
  const rLeg = add(group, new THREE.Mesh(leg, m.leather));
  lLeg.position.set(-0.0055, 0.017, 0);
  rLeg.position.set(0.0055, 0.017, 0);
  const torso = add(group, new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.02, 0.009), m.cloth));
  torso.position.y = 0.036;
  const head = add(group, new THREE.Mesh(new THREE.SphereGeometry(0.0066, 10, 8), m.leather));
  head.position.y = 0.051;
  const hood = add(group, new THREE.Mesh(new THREE.ConeGeometry(0.009, 0.012, 8), m.cloth));
  hood.position.y = 0.058;
  const bow = add(group, new THREE.Mesh(new THREE.TorusGeometry(0.016, 0.0016, 6, 14, Math.PI * 1.15), m.leather));
  bow.position.set(-0.002, 0.038, 0.009);
  bow.rotation.y = Math.PI / 2;
  const string = add(group, new THREE.Mesh(new THREE.BoxGeometry(0.001, 0.03, 0.001), m.accent));
  string.position.set(-0.002, 0.038, 0.009);
  const quiver = add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.0045, 0.02, 6), m.leather));
  quiver.position.set(0.009, 0.04, -0.006);
  quiver.rotation.z = 0.4;
  const fletch = add(group, new THREE.Mesh(new THREE.ConeGeometry(0.003, 0.008, 4), m.accent));
  fletch.position.set(0.012, 0.05, -0.006);
}

function buildMonarch(group, m) {
  const robe = add(group, new THREE.Mesh(new THREE.ConeGeometry(0.016, 0.042, 8), m.cloth));
  robe.position.y = 0.03;
  const trim = add(group, new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.002, 6, 16), m.primary));
  trim.rotation.x = Math.PI / 2;
  trim.position.y = 0.022;
  const torso = add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.018, 8), m.primary));
  torso.position.y = 0.048;
  const head = add(group, new THREE.Mesh(new THREE.SphereGeometry(0.0074, 10, 8), m.leather));
  head.position.y = 0.064;
  const crown = add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.007, 0.008, 6), m.accent));
  crown.position.y = 0.074;
  for (let i = 0; i < 4; i++) {
    const prong = add(group, new THREE.Mesh(new THREE.ConeGeometry(0.0022, 0.008, 4), m.accent));
    const a = (i / 4) * Math.PI * 2;
    prong.position.set(Math.cos(a) * 0.006, 0.08, Math.sin(a) * 0.006);
  }
  const jewel = add(group, new THREE.Mesh(new THREE.OctahedronGeometry(0.0032, 0), standard(0x9ad7ff, 0.2)));
  jewel.position.y = 0.086;
  const cape = add(group, new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.04, 7, 1, true), m.cloth));
  cape.position.set(0, 0.034, -0.004);
  cape.rotation.x = 0.15;
  const scepter = add(group, new THREE.Mesh(new THREE.CylinderGeometry(0.0014, 0.0014, 0.03, 5), m.primary));
  scepter.position.set(0.012, 0.05, 0.006);
  scepter.rotation.z = -0.35;
  const orb = add(group, new THREE.Mesh(new THREE.SphereGeometry(0.0035, 8, 6), m.accent));
  orb.position.set(0.017, 0.064, 0.008);
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

export function createSoldier(kind, colors) {
  const group = new THREE.Group();
  const cloth = standard(colors.cloth, 0.68);
  const metalMat = metal(colors.metal, colors.emissive || 0x111111);
  const skin = standard(colors.skin || 0x8a6248, 0.6);
  const leather = standard(0x3a2918, 0.75);

  const legGeo = new THREE.CapsuleGeometry(0.07, 0.34, 3, 6);
  legGeo.translate(0, -0.28, 0);
  const legL = new THREE.Mesh(legGeo, cloth);
  const legR = new THREE.Mesh(legGeo, cloth);
  legL.position.set(-0.1, 0.86, 0);
  legR.position.set(0.1, 0.86, 0);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.38, 4, 8), cloth);
  torso.position.y = 1.12;
  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 0.16), metalMat);
  chest.position.set(0, 1.2, 0.04);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), skin);
  head.position.y = 1.55;
  const helm = new THREE.Mesh(
    new THREE.SphereGeometry(0.145, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.55),
    metalMat,
  );
  helm.position.y = 1.56;

  const armGeo = new THREE.CapsuleGeometry(0.055, 0.28, 3, 5);
  armGeo.translate(0, -0.24, 0);
  const armL = new THREE.Mesh(armGeo, cloth);
  const armR = new THREE.Mesh(armGeo, cloth);
  armL.position.set(-0.28, 1.38, 0);
  armR.position.set(0.28, 1.38, 0);

  const eyeMat = new THREE.MeshBasicMaterial({ color: kind === 'archer' ? 0xffe2a8 : 0xff5a3c });
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), eyeMat);
  const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), eyeMat);
  eyeL.position.set(-0.045, 1.55, 0.11);
  eyeR.position.set(0.045, 1.55, 0.11);

  group.add(legL, legR, torso, chest, head, helm, armL, armR, eyeL, eyeR);

  if (kind === 'sword') {
    const sword = createBattleSword(colors.metal);
    sword.scale.setScalar(0.75);
    sword.position.set(0.02, -0.42, -0.05);
    sword.rotation.x = -1.15;
    armR.add(sword);
    const shield = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 12), metalMat);
    shield.rotation.z = Math.PI / 2;
    shield.position.set(-0.02, -0.28, 0.02);
    armL.add(shield);
  } else {
    const bow = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.016, 6, 14, Math.PI), leather);
    bow.rotation.y = Math.PI / 2;
    bow.rotation.z = Math.PI;
    bow.position.set(0.02, -0.2, -0.08);
    armL.add(bow);
    const arrow = createArrowMesh(colors.metal);
    arrow.scale.setScalar(0.7);
    arrow.position.set(0, -0.25, -0.05);
    armR.add(arrow);
    group.userData.bowArm = armL;
  }

  group.userData.limbs = { legL, legR, armL, armR };
  return group;
}
