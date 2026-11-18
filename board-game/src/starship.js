// The Warstars worlds: a starship's bridge for the board (where the castle terrace is in the
// classic game) and a hangar deck for the battles (where the battlefield is). Both are built from
// plain shapes and drawn textures, so nothing is downloaded and a headset draws them cheaply.

import * as THREE from 'three';

function canvasTex(w, h, draw, repeat = null) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  return t;
}

/** Deck plating: dark panels with seams, rivets and the odd lit strip. */
function deckTexture(repeat) {
  return canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = '#1b2029';
    g.fillRect(0, 0, w, h);
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        const v = 26 + ((x * 7 + y * 13) % 5) * 4;
        g.fillStyle = `rgb(${v},${v + 5},${v + 13})`;
        g.fillRect(x * 128 + 3, y * 128 + 3, 122, 122);
        g.fillStyle = 'rgba(255,255,255,0.05)';
        g.fillRect(x * 128 + 3, y * 128 + 3, 122, 3);
        g.fillStyle = 'rgba(0,0,0,0.5)';
        for (const [dx, dy] of [[10, 10], [112, 10], [10, 112], [112, 112]]) g.fillRect(x * 128 + dx, y * 128 + dy, 4, 4);
      }
    }
    g.fillStyle = '#3fb7ff';
    g.fillRect(0, 254, w, 4);
    g.fillStyle = 'rgba(63,183,255,0.25)';
    g.fillRect(0, 248, w, 16);
  }, repeat);
}

/** Wall panelling: tall plates, a lit band and small status lights. */
function wallTexture(repeat) {
  return canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = '#20252f';
    g.fillRect(0, 0, w, h);
    for (let x = 0; x < 4; x++) {
      g.fillStyle = x % 2 ? '#2a303c' : '#252b36';
      g.fillRect(x * 128 + 4, 8, 120, 496);
      g.fillStyle = 'rgba(0,0,0,0.45)';
      g.fillRect(x * 128 + 4, 300, 120, 6);
      g.fillStyle = '#131720';
      g.fillRect(x * 128 + 24, 330, 80, 120);
      for (let k = 0; k < 5; k++) {
        g.fillStyle = ['#3fb7ff', '#ff5a3c', '#7dffb0', '#ffd45a', '#3fb7ff'][(k + x) % 5];
        g.fillRect(x * 128 + 32 + k * 14, 344, 8, 5);
      }
    }
    g.fillStyle = '#bfe6ff';
    g.fillRect(0, 150, w, 10);
    g.fillStyle = 'rgba(120,200,255,0.3)';
    g.fillRect(0, 140, w, 30);
  }, repeat);
}

/** A holographic readout: lines, bars and a ring, on nothing. */
function holoTexture() {
  return canvasTex(512, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.strokeStyle = 'rgba(110,220,255,0.9)';
    g.fillStyle = 'rgba(110,220,255,0.75)';
    g.lineWidth = 2;
    g.strokeRect(6, 6, w - 12, h - 12);
    for (let i = 0; i < 9; i++) g.fillRect(24, 30 + i * 22, 60 + ((i * 53) % 150), 6);
    g.beginPath();
    g.arc(380, 128, 78, 0, Math.PI * 2);
    g.stroke();
    g.beginPath();
    g.arc(380, 128, 52, 0.4, 4.6);
    g.stroke();
    for (let i = 0; i < 14; i++) g.fillRect(250 + i * 9, 220 - ((i * 37) % 60), 5, (i * 37) % 60);
    g.fillRect(376, 60, 8, 136);
    g.fillRect(312, 124, 136, 8);
  });
}

/** Stars all around, far away. Drawn after everything else that is solid. */
function starField(count, radius, seed = 3) {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = rnd() * 2 - 1;
    const a = rnd() * Math.PI * 2;
    const r = Math.sqrt(1 - u * u);
    pos.set([Math.cos(a) * r * radius, u * radius, Math.sin(a) * r * radius], i * 3);
    const warm = rnd();
    const b = 0.55 + rnd() * 0.45;
    col.set([b * (0.8 + warm * 0.2), b * 0.9, b * (1 - warm * 0.25)], i * 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const stars = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.42, sizeAttenuation: true, vertexColors: true, fog: false, toneMapped: false, depthWrite: false }));
  stars.frustumCulled = false;
  return stars;
}

/** Space itself: a black shell (so nothing of the real room shows through), stars, a planet and a nebula. */
function space() {
  const g = new THREE.Group();
  const shell = new THREE.Mesh(new THREE.SphereGeometry(90, 24, 16), new THREE.MeshBasicMaterial({ color: 0x02030a, side: THREE.BackSide, fog: false, toneMapped: false, depthWrite: false }));
  shell.renderOrder = -10;
  g.add(shell, starField(1400, 80));
  const planetTex = canvasTex(256, 128, (c, w, h) => {
    const grad = c.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#2a5fb0');
    grad.addColorStop(0.5, '#3f8fd0');
    grad.addColorStop(1, '#17335f');
    c.fillStyle = grad;
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 26; i++) {
      c.fillStyle = `rgba(${200 + (i * 13) % 55},${220 + (i * 7) % 35},255,${0.12 + ((i * 17) % 10) / 60})`;
      c.fillRect(0, (i * 37) % h, w, 2 + (i % 5));
    }
  });
  const planet = new THREE.Mesh(new THREE.SphereGeometry(16, 40, 24), new THREE.MeshBasicMaterial({ map: planetTex, fog: false, toneMapped: false }));
  planet.position.set(-26, -9, -62);
  planet.rotation.z = 0.35;
  const halo = new THREE.Mesh(new THREE.SphereGeometry(16.9, 40, 24), new THREE.MeshBasicMaterial({ color: 0x6fb8ff, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, side: THREE.BackSide, fog: false, depthWrite: false }));
  halo.position.copy(planet.position);
  const nebula = new THREE.Sprite(new THREE.SpriteMaterial({ map: canvasTex(256, 256, (c, w) => {
    const r = c.createRadialGradient(w / 2, w / 2, 8, w / 2, w / 2, w / 2);
    r.addColorStop(0, 'rgba(190,110,255,0.55)');
    r.addColorStop(0.5, 'rgba(90,70,220,0.22)');
    r.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = r;
    c.fillRect(0, 0, w, w);
  }), blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
  nebula.position.set(30, 12, -70);
  nebula.scale.set(60, 44, 1);
  g.add(planet, halo, nebula);
  g.userData.planet = planet;
  return g;
}

const strip = (hex) => new THREE.MeshBasicMaterial({ color: hex, toneMapped: false, fog: false });

/**
 * The bridge, for the board. The player stands on a deck facing a wall of windows onto space,
 * with consoles to either side and holograms in the air.
 */
export function createBridge() {
  const world = new THREE.Group();
  world.visible = false;
  const deck = new THREE.MeshStandardMaterial({ map: deckTexture([5, 5]), metalness: 0.75, roughness: 0.42 });
  const wall = new THREE.MeshStandardMaterial({ map: wallTexture([4, 1]), metalness: 0.6, roughness: 0.5, side: THREE.DoubleSide });
  const dark = new THREE.MeshStandardMaterial({ color: 0x151920, metalness: 0.8, roughness: 0.4 });
  const R = 6.2;
  const H = 3.4;

  const floor = new THREE.Mesh(new THREE.CircleGeometry(R, 40), deck);
  floor.rotation.x = -Math.PI / 2;
  const ceiling = new THREE.Mesh(new THREE.CircleGeometry(R, 40), new THREE.MeshStandardMaterial({ color: 0x12151b, metalness: 0.7, roughness: 0.6 }));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = H;
  world.add(floor, ceiling);

  // Solid wall behind and to the sides; the forward 150 degrees is window.
  const back = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 40, 1, true, Math.PI * (17 / 12), Math.PI * (14 / 12)), wall);
  back.position.y = H / 2;
  world.add(back);
  // Window frames: ribs between the panes, a sill and a header, glowing strips along both.
  const WIN = Math.PI * (10 / 12);
  for (let i = 0; i <= 5; i++) {
    const a = -WIN / 2 + (i / 5) * WIN;
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.16, H, 0.22), dark);
    rib.position.set(Math.sin(a) * R, H / 2, -Math.cos(a) * R);
    rib.rotation.y = -a;
    world.add(rib);
  }
  const sill = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.7, 40, 1, true, Math.PI - WIN / 2, WIN), wall);
  sill.position.y = 0.35;
  const header = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.5, 40, 1, true, Math.PI - WIN / 2, WIN), wall);
  header.position.y = H - 0.25;
  const sillLight = new THREE.Mesh(new THREE.CylinderGeometry(R - 0.02, R - 0.02, 0.04, 40, 1, true, Math.PI - WIN / 2, WIN), strip(0x6fd0ff));
  sillLight.material.side = THREE.DoubleSide;
  sillLight.position.y = 0.72;
  world.add(sill, header, sillLight);

  // Consoles either side, their tops lit.
  for (const sx of [-1, 1]) {
    const desk = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.7), dark);
    desk.position.set(sx * 3.4, 0.45, -2.2);
    desk.rotation.y = -sx * 0.6;
    const top = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.6), new THREE.MeshBasicMaterial({ map: holoTexture(), transparent: true, toneMapped: false }));
    top.rotation.x = -Math.PI / 2 + 0.5;
    top.position.set(0, 0.56, 0.02);
    desk.add(top);
    world.add(desk);
  }
  // Holograms hanging in the air, slowly turning.
  const holos = [];
  const holoMat = new THREE.MeshBasicMaterial({ map: holoTexture(), transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
  for (const [x, y, z, s] of [[-2.6, 1.9, -3.6, 1.3], [2.7, 2.0, -3.4, 1.2], [0, 2.75, -4.6, 1.7]]) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(s, s / 2), holoMat);
    p.position.set(x, y, z);
    p.lookAt(0, 1.5, 0);
    world.add(p);
    holos.push(p);
  }
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.012, 6, 64), strip(0x6fd0ff));
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, 0.02, 0);
  world.add(ring);
  // Ceiling light bars.
  for (const z of [-2.5, 0, 2.5]) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.04, 0.18), strip(0xcfe8ff));
    bar.position.set(0, H - 0.03, z);
    world.add(bar);
  }

  // Cool, even ship lighting with a blue cast from the windows.
  world.add(new THREE.HemisphereLight(0xa9c8ff, 0x1a2030, 0.75));
  const keyLight = new THREE.DirectionalLight(0xcfe2ff, 0.9);
  keyLight.position.set(1.5, 4, 2);
  world.add(keyLight, keyLight.target);
  const windowGlow = new THREE.PointLight(0x4f9dff, 1.4, 12, 1.6);
  windowGlow.position.set(0, 1.8, -5);
  world.add(windowGlow);

  const sky = space();
  world.add(sky);

  return {
    world,
    /** Stand the bridge around a player, the windows the way they are facing (same call as the castle's). */
    placeAround(x, floorY, z, forwardX, forwardZ) {
      world.rotation.y = Math.atan2(-forwardX, -forwardZ);
      world.position.set(x + forwardX * 1.6, floorY, z + forwardZ * 1.6);
      world.updateMatrixWorld(true);
    },
    update(time) {
      holoMat.opacity = 0.68 + Math.sin(time * 3.1) * 0.1 + (Math.sin(time * 47) > 0.96 ? -0.3 : 0);
      for (let i = 0; i < holos.length; i++) holos[i].position.y += Math.sin(time * 0.9 + i * 2) * 0.0006;
      ring.material.color.setHSL(0.55, 0.9, 0.6 + Math.sin(time * 2) * 0.12);
      sky.userData.planet.rotation.y = time * 0.01;
    },
  };
}

/**
 * The hangar, for the battles: a long deck with a ribbed roof, a great door open to space behind
 * the enemy (held by an energy field), landing lights and parked craft off to the sides. The
 * player stands at the origin and the enemy comes from -Z, as on the battlefield; the lane
 * between them is left clear.
 */
export function createHangar() {
  const world = new THREE.Group();
  world.visible = false;
  const W = 26;
  const L = 44;
  const H = 9;
  const deck = new THREE.MeshStandardMaterial({ map: deckTexture([13, 22]), metalness: 0.35, roughness: 0.62 });
  const wall = new THREE.MeshStandardMaterial({ map: wallTexture([10, 2]), metalness: 0.6, roughness: 0.5, side: THREE.DoubleSide });
  const dark = new THREE.MeshStandardMaterial({ color: 0x151920, metalness: 0.8, roughness: 0.42 });
  const hull = new THREE.MeshStandardMaterial({ color: 0x8892a0, metalness: 0.7, roughness: 0.4 });

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, L), deck);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, -6);
  floor.receiveShadow = true;
  const roof = new THREE.Mesh(new THREE.PlaneGeometry(W, L), new THREE.MeshStandardMaterial({ color: 0x10131a, metalness: 0.7, roughness: 0.6 }));
  roof.rotation.x = Math.PI / 2;
  roof.position.set(0, H, -6);
  world.add(floor, roof);
  for (const sx of [-1, 1]) {
    const side = new THREE.Mesh(new THREE.PlaneGeometry(L, H), wall);
    side.rotation.y = -sx * Math.PI / 2;
    side.position.set(sx * W / 2, H / 2, -6);
    world.add(side);
    // Landing lights along the lane.
    for (let i = 0; i < 9; i++) {
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.5), strip(i % 2 ? 0x6fd0ff : 0xffb44a));
      lamp.position.set(sx * 3.4, 0.016, 8 - i * 4.2);
      world.add(lamp);
    }
    // A wall strip the length of the deck.
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.12, L), strip(0x9fdcff));
    band.position.set(sx * (W / 2 - 0.04), 2.6, -6);
    world.add(band);
  }
  const rear = new THREE.Mesh(new THREE.PlaneGeometry(W, H), wall);
  rear.rotation.y = Math.PI;
  rear.position.set(0, H / 2, L / 2 - 6);
  world.add(rear);
  // Roof ribs with light bars under them.
  for (let i = 0; i < 8; i++) {
    const z = 13 - i * 5.4;
    const rib = new THREE.Mesh(new THREE.BoxGeometry(W, 0.5, 0.5), dark);
    rib.position.set(0, H - 0.25, z);
    const bar = new THREE.Mesh(new THREE.BoxGeometry(W * 0.7, 0.05, 0.16), strip(0xdcebff));
    bar.position.set(0, H - 0.53, z);
    world.add(rib, bar);
  }
  // The great door at the far end: a frame, and a faint blue field holding the air in.
  const doorZ = -L / 2 - 6;
  for (const [x, y, w, h] of [[-W / 2 + 1.2, H / 2, 2.4, H], [W / 2 - 1.2, H / 2, 2.4, H], [0, H - 0.8, W, 1.6]]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(w, h, 1), dark);
    post.position.set(x, y, doorZ);
    world.add(post);
  }
  const field = new THREE.Mesh(new THREE.PlaneGeometry(W - 4.8, H - 1.6), new THREE.MeshBasicMaterial({ color: 0x4fb4ff, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
  field.position.set(0, (H - 1.6) / 2, doorZ + 0.3);
  const fieldEdge = new THREE.Mesh(new THREE.BoxGeometry(W - 4.8, 0.08, 0.08), strip(0x8fd8ff));
  fieldEdge.position.set(0, 0.05, doorZ + 0.3);
  world.add(field, fieldEdge);

  // Parked craft, well off the lane: a wedge hull, wings, engines and a lit canopy.
  function craft(x, z, yaw, s) {
    const c = new THREE.Group();
    const body = new THREE.Mesh(new THREE.ConeGeometry(0.9, 4.2, 4), hull);
    body.rotation.set(Math.PI / 2, Math.PI / 4, 0);
    body.scale.set(1.5, 1, 0.45);
    body.position.y = 1.05;
    const wing = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.08, 1.3), dark);
    wing.position.set(0, 0.95, 0.9);
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 8), strip(0x7fd4ff));
    canopy.scale.set(1, 0.6, 1.7);
    canopy.position.set(0, 1.38, -0.2);
    c.add(body, wing, canopy);
    for (const ex of [-0.55, 0.55]) {
      const eng = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 1.1, 10), dark);
      eng.rotation.x = Math.PI / 2;
      eng.position.set(ex, 1.0, 2.0);
      const burn = new THREE.Mesh(new THREE.CircleGeometry(0.2, 12), strip(0xff8a3a));
      burn.position.set(ex, 1.0, 2.56);
      c.add(eng, burn);
    }
    for (const [lx, lz] of [[-1.1, 0.8], [1.1, 0.8], [0, -1.2]]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.75, 6), dark);
      leg.position.set(lx, 0.375, lz);
      c.add(leg);
    }
    c.position.set(x, 0, z);
    c.rotation.y = yaw;
    c.scale.setScalar(s);
    world.add(c);
  }
  craft(-8.5, -9, 0.5, 1.25);
  craft(8.8, -15, -0.45, 1.25);
  craft(-9, 6, 2.4, 1.1);
  craft(9.2, 4.5, -2.3, 1.1);
  // Crates and fuel drums beside them.
  for (const [x, z, w, h] of [[-6.2, -3.5, 1.1, 0.9], [-6.9, -2.2, 0.8, 0.8], [6.4, -6.5, 1.2, 1.0], [6.0, -8.2, 0.7, 1.3], [-5.8, -14, 1.0, 0.8], [6.8, 1.5, 0.9, 0.9]]) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), dark);
    box.position.set(x, h / 2, z);
    box.rotation.y = x * 0.7;
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(w + 0.02, 0.06, w + 0.02), strip(0xffb44a));
    stripe.position.y = h * 0.2;
    box.add(stripe);
    world.add(box);
  }

  // (The battle's own lights are used, recoloured cool: see combat.js.)
  const doorGlow = new THREE.PointLight(0x4f9dff, 2.2, 30, 1.4);
  doorGlow.position.set(0, 4, doorZ + 4);
  world.add(doorGlow);

  const sky = space();
  world.add(sky);

  return {
    world,
    update(time) {
      field.material.opacity = 0.09 + Math.sin(time * 2.3) * 0.02;
      sky.userData.planet.rotation.y = time * 0.01;
    },
  };
}
