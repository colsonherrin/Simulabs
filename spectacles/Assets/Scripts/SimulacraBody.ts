// Procedural body animation for the character on Spectacles: arms at the sides and a walk cycle
// driven by the distance actually covered, for a model that has no animation clips (the bundled
// Rocketbox character). The same idea as ProceduralHumanoid.cs in the Unity package.
//
// Bones are the model's joint SceneObjects, found by name (3ds Max Biped or Mixamo naming).
// If they are not found this class does nothing. Lens Studio is right-handed, so with
// right = forward x up a positive turn about `right` swings a hanging limb forward.

const BONES: { [key: string]: string[] } = {
  lUpperArm: ['bip01 l upperarm', 'leftarm'],
  lForearm: ['bip01 l forearm', 'leftforearm'],
  rUpperArm: ['bip01 r upperarm', 'rightarm'],
  rForearm: ['bip01 r forearm', 'rightforearm'],
  lThigh: ['bip01 l thigh', 'leftupleg'],
  lCalf: ['bip01 l calf', 'leftleg'],
  lFoot: ['bip01 l foot', 'leftfoot'],
  rThigh: ['bip01 r thigh', 'rightupleg'],
  rCalf: ['bip01 r calf', 'rightleg'],
};

export class SimulacraBody {
  ready = false;
  private bones: { [key: string]: Transform } = {};
  private rest: { [key: string]: quat } = {};
  private legCm = 85;
  private phase = 0;
  private walk = 0;

  constructor(root: SceneObject) {
    const found: { [name: string]: SceneObject } = {};
    this.collect(root, found, 0);
    for (const key in BONES) {
      for (let i = 0; i < BONES[key].length; i++) {
        const obj = found[BONES[key][i]];
        if (obj) {
          this.bones[key] = obj.getTransform();
          this.rest[key] = this.bones[key].getLocalRotation();
          break;
        }
      }
    }
    this.ready = !!(this.bones.lThigh && this.bones.rThigh && this.bones.lCalf && this.bones.rCalf);
    if (this.ready && this.bones.lFoot) {
      const a = this.bones.lThigh.getWorldPosition();
      const b = this.bones.lCalf.getWorldPosition();
      const c = this.bones.lFoot.getWorldPosition();
      const len = a.distance(b) + b.distance(c);
      if (len > 20 && len < 150) this.legCm = len;
    }
  }

  private collect(obj: SceneObject, into: { [name: string]: SceneObject }, depth: number): void {
    if (depth > 40) return;
    let name = obj.name.toLowerCase();
    const colon = name.lastIndexOf(':');
    if (colon >= 0) name = name.substring(colon + 1);
    if (!into[name]) into[name] = obj;
    const n = obj.getChildrenCount();
    for (let i = 0; i < n; i++) this.collect(obj.getChild(i), into, depth + 1);
  }

  private turn(key: string, axis: vec3, radians: number): void {
    const t = this.bones[key];
    if (!t || radians === 0) return;
    t.setWorldRotation(quat.angleAxis(radians, axis).multiply(t.getWorldRotation()));
  }

  private hang(upper: string, lower: string, side: vec3): void {
    const u = this.bones[upper];
    const l = this.bones[lower];
    if (!u || !l) return;
    const current = l.getWorldPosition().sub(u.getWorldPosition()).normalize();
    const wanted = new vec3(side.x * 0.13, -1, side.z * 0.13).normalize();
    const axis = current.cross(wanted);
    const sin = axis.length;
    if (sin < 1e-4) return;
    const angle = Math.atan2(sin, current.dot(wanted));
    u.setWorldRotation(quat.angleAxis(angle, axis.normalize()).multiply(u.getWorldRotation()));
  }

  /**
   * Pose the body for this frame. `forward` is the direction the avatar faces (world, level),
   * `metres` the distance it moved this frame, `speed01` its speed relative to walking speed.
   */
  update(forward: vec3, metres: number, speed01: number, dt: number): void {
    if (!this.ready) return;
    for (const key in this.bones) this.bones[key].setLocalRotation(this.rest[key]);

    const right = forward.cross(vec3.up()).normalize();
    this.hang('lUpperArm', 'lForearm', right.uniformScale(-1));
    this.hang('rUpperArm', 'rForearm', right);
    this.turn('lForearm', right, 0.24);
    this.turn('rForearm', right, 0.24);

    const target = speed01 > 0.06 ? 1 : 0;
    this.walk += Math.max(-dt * 4, Math.min(dt * 4, target - this.walk));
    const swing = 0.42 * Math.max(0.35, Math.min(1.2, speed01));
    const cycleCm = Math.max(25, 4 * this.legCm * Math.sin(swing));
    this.phase += (2 * Math.PI * metres * 100) / cycleCm;
    const s = Math.sin(this.phase);
    const c = Math.cos(this.phase);

    this.turn('lThigh', right, s * swing * this.walk);
    this.turn('rThigh', right, -s * swing * this.walk);
    this.turn('lCalf', right, -Math.max(0, c) * 0.6 * this.walk); // the knee bends backward
    this.turn('rCalf', right, -Math.max(0, -c) * 0.6 * this.walk);
    this.turn('lUpperArm', right, -s * swing * 0.6 * this.walk);
    this.turn('rUpperArm', right, s * swing * 0.6 * this.walk);
  }
}
