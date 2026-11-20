// The Gaussian body at run time, for three.js / WebXR.
//
// A character is drawn as its canonical Gaussians (avatar/canonical_gaussians) instead of its
// mesh. Each frame, per Gaussian, on the GPU:
//
//   1. student correction   displacement = sum_k coefficient[k] * basis[k]     (bind pose)
//   2. skeleton             the usual four-bone skinning, with the character's own skeleton
//   3. splat                a round, soft-edged disc facing the eye, sized by distance
//
// and once per frame on the CPU: the control vector is read from the skeleton and the voice, and
// the student's small network turns it into the K coefficients (a few thousand multiply-adds).
//
// Splats are drawn without sorting: the soft edge is dithered (stochastic transparency) and depth
// is written, so cost does not depend on view order. That is an approximation of Gaussian
// splatting's sorted blending, chosen so a standalone headset is not asked to sort every frame.
//
// The mesh is left in place and untouched, so going back to it is one call (show(false)).

const VERT = /* glsl */ `
uniform highp sampler2D boneTexture;
uniform mat4 bindMatrix;
uniform mat4 bindMatrixInverse;
uniform highp sampler2D uBasis;
uniform float uBasisWidth;
uniform float uCoeff[K_FIELDS];
uniform float uViewport;
uniform float uWorldScale;
uniform float uSize;
attribute vec3 aNormal;
attribute vec4 aColour;
attribute vec4 aBone;
attribute vec4 aWeight;
attribute float aRadius;
attribute float aId;
varying vec3 vColour;
varying vec3 vNormal;
mat4 boneMatrix(float i) {
  int size = textureSize(boneTexture, 0).x;
  int j = int(i) * 4;
  int x = j % size;
  int y = j / size;
  return mat4(texelFetch(boneTexture, ivec2(x, y), 0), texelFetch(boneTexture, ivec2(x + 1, y), 0), texelFetch(boneTexture, ivec2(x + 2, y), 0), texelFetch(boneTexture, ivec2(x + 3, y), 0));
}
void main() {
  // 1. The student's correction, in the bind pose.
  vec3 p = position;
  int first = int(aId) * K_FIELDS;
  int w = int(uBasisWidth);
  for (int k = 0; k < K_FIELDS; k++) {
    int t = first + k;
    vec3 b = texelFetch(uBasis, ivec2(t % w, t / w), 0).rgb * 255.0 - 128.0;
    p += b * uCoeff[k];
  }
  // 2. Skinning.
  mat4 skin = boneMatrix(aBone.x) * aWeight.x + boneMatrix(aBone.y) * aWeight.y + boneMatrix(aBone.z) * aWeight.z + boneMatrix(aBone.w) * aWeight.w;
  vec4 posed = bindMatrixInverse * (skin * (bindMatrix * vec4(p, 1.0)));
  vNormal = normalize(normalMatrix * (mat3(bindMatrixInverse) * mat3(skin) * mat3(bindMatrix) * aNormal));
  vColour = aColour.rgb;
  // 3. A disc of the Gaussian's radius, in pixels at this distance.
  vec4 mv = modelViewMatrix * posed;
  gl_Position = projectionMatrix * mv;
  // (diameter = 2 x radius; half the viewport height is one unit of clip space)
  // The face's Gaussians are drawn tighter, to keep its detail.
  float part = aColour.a * 255.0;
  float tight = part > 0.5 && part < 1.5 ? 0.72 : 1.0;
  gl_PointSize = clamp(aRadius * tight * uSize * uWorldScale * projectionMatrix[1][1] * uViewport / max(0.05, -mv.z), 2.0, 128.0);
}
`;
const FRAG = /* glsl */ `
varying vec3 vColour;
varying vec3 vNormal;
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d) * 4.0;
  if (r2 > 1.0) discard;
  // Gaussian falloff toward the edge, dithered rather than blended (no sorting needed).
  float a = exp(-r2 * 2.2);
  if (a < 0.14 + 0.3 * hash(gl_FragCoord.xy)) discard;
  vec3 n = normalize(vNormal);
  float light = 0.62 + 0.38 * max(0.0, dot(n, normalize(vec3(0.35, 0.75, 0.55))));
  vec3 colour = pow(vColour, vec3(2.2)) * light;
  gl_FragColor = vec4(colour, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const fetchJson = (url) => fetch(url).then((r) => (r.ok ? r.json() : Promise.reject(new Error(url + ' ' + r.status))));
const fetchBin = (url) => fetch(url).then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(url + ' ' + r.status))));

/**
 * Load a character's Gaussian body and attach it to its skinned mesh.
 *   THREE   the three.js module       mesh   the character's THREE.SkinnedMesh
 *   base    URL without extension, e.g. '.../gauss/sundai' (expects .gauss.json/.bin and .student.json/.bin)
 *   limit   draw at most this many Gaussians (they are stored in random order, so any prefix is an even sample)
 */
export async function createGaussianBody({ THREE, mesh, base, limit = 0 }) {
  const [meta, raw, student, basisRaw] = await Promise.all([fetchJson(base + '.gauss.json'), fetchBin(base + '.gauss.bin'), fetchJson(base + '.student.json'), fetchBin(base + '.student.bin')]);
  const total = meta.count;
  const n = limit > 0 ? Math.min(limit, total) : total;
  const K = student.k;
  const lay = meta.layout;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(raw, lay.position, n * 3), 3));
  geo.setAttribute('aNormal', new THREE.BufferAttribute(new Int8Array(raw, lay.normal, n * 4), 4, true));
  geo.setAttribute('aColour', new THREE.BufferAttribute(new Uint8Array(raw, lay.colour, n * 4), 4, true));
  geo.setAttribute('aBone', new THREE.BufferAttribute(new Uint8Array(raw, lay.bone, n * 4), 4, false));
  geo.setAttribute('aWeight', new THREE.BufferAttribute(new Uint8Array(raw, lay.weight, n * 4), 4, true));
  geo.setAttribute('aRadius', new THREE.BufferAttribute(new Float32Array(raw.slice(lay.radius, lay.radius + n * 4)), 1));
  const ids = new Float32Array(n);
  for (let i = 0; i < n; i++) ids[i] = i;
  geo.setAttribute('aId', new THREE.BufferAttribute(ids, 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 90), 400);

  // The basis as a texture: K texels per Gaussian, signed bytes stored offset by 128.
  const width = 2048;
  const rows = Math.ceil((n * K) / width);
  const texels = new Uint8Array(width * rows * 4);
  const src = new Int8Array(basisRaw, 0, n * K * 3);
  for (let i = 0; i < n * K; i++) {
    texels[i * 4] = src[i * 3] + 128;
    texels[i * 4 + 1] = src[i * 3 + 1] + 128;
    texels[i * 4 + 2] = src[i * 3 + 2] + 128;
    texels[i * 4 + 3] = 255;
  }
  const basis = new THREE.DataTexture(texels, width, rows, THREE.RGBAFormat, THREE.UnsignedByteType);
  basis.minFilter = basis.magFilter = THREE.NearestFilter;
  basis.generateMipmaps = false;
  basis.needsUpdate = true;

  const coeff = new Float32Array(K);
  const material = new THREE.ShaderMaterial({
    defines: { K_FIELDS: K },
    uniforms: {
      boneTexture: { value: null },
      bindMatrix: { value: mesh.bindMatrix },
      bindMatrixInverse: { value: mesh.bindMatrixInverse },
      uBasis: { value: basis },
      uBasisWidth: { value: width },
      uCoeff: { value: coeff },
      uViewport: { value: 1000 },
      uWorldScale: { value: 0.01 },
      // Fewer Gaussians are drawn larger, so the surface stays closed.
      uSize: { value: 3.3 * Math.sqrt(total / n) },
    },
    vertexShader: VERT,
    fragmentShader: FRAG,
  });
  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  points.visible = false;
  mesh.add(points); // shares the mesh's place in the world
  const viewport = new THREE.Vector4();
  points.onBeforeRender = (renderer) => {
    const sk = mesh.skeleton;
    if (!sk.boneTexture) sk.computeBoneTexture();
    material.uniforms.boneTexture.value = sk.boneTexture;
    renderer.getCurrentViewport(viewport);
    material.uniforms.uViewport.value = viewport.w;
    material.uniforms.uWorldScale.value = points.matrixWorld.getMaxScaleOnAxis();
  };

  // ---- controls from the skeleton (the same list and ranges as diffusion/teacher/controls.py)
  const bone = (suffix) => mesh.skeleton.bones.find((b) => b.name.replace(/ /g, '_').endsWith(suffix)) || null;
  const rest = new Map();
  const m = new THREE.Matrix4();
  const restLocal = (b) => {
    // The bone's own rotation in the bind pose, from the skeleton's bind matrices.
    const i = mesh.skeleton.bones.indexOf(b);
    const world = mesh.skeleton.boneInverses[i].clone().invert();
    const pi = mesh.skeleton.bones.indexOf(b.parent);
    if (pi >= 0) m.copy(mesh.skeleton.boneInverses[pi]).multiply(world);
    else m.copy(world);
    return new THREE.Quaternion().setFromRotationMatrix(m);
  };
  const flex = (b) => {
    if (!b) return 0;
    if (!rest.has(b)) rest.set(b, restLocal(b));
    return 2 * Math.acos(Math.min(1, Math.abs(b.quaternion.dot(rest.get(b)))));
  };
  const B = { elbowL: bone('L_Forearm'), elbowR: bone('R_Forearm'), kneeL: bone('L_Calf'), kneeR: bone('R_Calf'), shL: bone('L_UpperArm'), shR: bone('R_UpperArm'), sp1: bone('Spine1'), sp2: bone('Spine2'), head: bone('Head') };
  const low = student.controls.map((c) => c.low);
  const high = student.controls.map((c) => c.high);
  const x = new Float32Array(student.controls.length);
  const W = student.mlp.weights.map((w) => w.map((row) => Float32Array.from(row)));
  const Bv = student.mlp.biases.map((b) => Float32Array.from(b));
  const peak = student.basis.peak;
  let layers = W.map((w) => new Float32Array(w[0].length));
  let cpuMs = 0;

  return {
    points,
    count: n,
    k: K,
    teacher: student.teacher,
    report: student.report,
    /** Draw the Gaussians (true) or leave them hidden (false). The mesh is not touched here. */
    show(on) { points.visible = !!on; },
    /** Milliseconds of CPU the last update took (controls + the student's network). */
    get cpuMs() { return cpuMs; },
    /**
     * Once per frame: read the controls and run the student.
     *   time  seconds     jaw  0..1 mouth open (voice level)     smile  0..1
     */
    update(time, jaw = 0, smile = 0) {
      const t0 = performance.now();
      const phase = time * 2 * Math.PI * 0.25;
      const c = [Math.sin(phase), Math.cos(phase), jaw, flex(B.elbowL), flex(B.elbowR), flex(B.kneeL), flex(B.kneeR), flex(B.shL), flex(B.shR), flex(B.sp1) + flex(B.sp2), flex(B.head), smile];
      for (let i = 0; i < x.length; i++) {
        const v = Math.min(high[i], Math.max(low[i], c[i]));
        x[i] = (v - (low[i] + high[i]) / 2) / ((high[i] - low[i]) / 2);
      }
      let h = x;
      for (let l = 0; l < W.length; l++) {
        const w = W[l];
        const out = layers[l];
        out.set(Bv[l]);
        for (let i = 0; i < w.length; i++) {
          const hi = h[i];
          const row = w[i];
          for (let j = 0; j < out.length; j++) out[j] += hi * row[j];
        }
        if (l < W.length - 1) for (let j = 0; j < out.length; j++) out[j] = Math.tanh(out[j]);
        h = out;
      }
      // Fold the basis's scale into the coefficients, so the shader only multiplies.
      for (let k = 0; k < K; k++) coeff[k] = (h[k] * peak[k]) / 127;
      cpuMs = performance.now() - t0;
    },
    dispose() {
      mesh.remove(points);
      geo.dispose();
      material.dispose();
      basis.dispose();
    },
  };
}
