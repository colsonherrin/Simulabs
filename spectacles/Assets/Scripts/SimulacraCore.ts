// Simulacra device client core for Snap Spectacles.
//
// Everything in this file is plain TypeScript with no Lens Studio API in it: the device protocol,
// the world model, the avatar's local movement, and audio conversion. That is deliberate: this
// part is exercised by automated tests outside Lens Studio (backend/test/spectacles.test.ts)
// against the real backend. SimulacraLens.ts is the thin binding to the glasses.
//
// Conventions inside this file match the backend protocol (and Unity): metres, y up, LEFT-handed
// (looking along +z, +x is to the right). Lens Studio is centimetres and right-handed; the binding
// converts at the boundary.

export interface Vec {
  x: number;
  y: number;
  z: number;
}

/** What the core needs from the device. Positions are in protocol space (metres, left-handed). */
export interface Host {
  /** Send one JSON text frame to the backend. */
  send(text: string): void;
  headPosition(): Vec;
  headForward(): Vec;
  /** Height of the physical floor, or null while unknown. */
  floorY(): number | null;
  /** True if a real, roughly level surface at floor height exists under this point. */
  isFloor(p: Vec): boolean;
  /** Where the user is pointing or looking on a real surface, or null. */
  pointerHit(): Vec | null;
  /** Queue speech samples (PCM16, 24 kHz mono) for playback. */
  playAudio(samples: Int16Array): void;
  /** Drop queued speech. */
  stopAudio(): void;
  log(message: string): void;
}

export interface WorldObject {
  id: string;
  label: string;
  pos: Vec;
  size: Vec;
  source: 'manual' | 'detected' | 'room_scan' | 'simulated';
  confidence: number;
  seenAt: number;
}

export interface AvatarPose {
  pos: Vec;
  /** Radians; 0 faces +z, positive turns toward +x. */
  yaw: number;
  /** idle | walking | turning | following */
  state: string;
  /** 0..1 metres per second relative to walking speed, for blending a walk animation. */
  speed01: number;
  /** A gesture started this frame (wave, nod, shake_head, shrug) or ''. */
  gesture: string;
}

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/** PCM16 little-endian samples to base64, without relying on any platform helper. */
export function pcm16ToBase64(samples: Int16Array, count: number): string {
  let out = '';
  const bytes = count * 2;
  const byteAt = (i: number): number => {
    const s = samples[i >> 1] & 0xffff;
    return (i & 1) === 0 ? s & 0xff : s >> 8;
  };
  for (let i = 0; i < bytes; i += 3) {
    const a = byteAt(i);
    const b = i + 1 < bytes ? byteAt(i + 1) : 0;
    const c = i + 2 < bytes ? byteAt(i + 2) : 0;
    out += B64.charAt(a >> 2) + B64.charAt(((a & 3) << 4) | (b >> 4));
    out += i + 1 < bytes ? B64.charAt(((b & 15) << 2) | (c >> 6)) : '=';
    out += i + 2 < bytes ? B64.charAt(c & 63) : '=';
  }
  return out;
}

export function base64ToPcm16(text: string): Int16Array {
  let len = text.length;
  while (len > 0 && text.charAt(len - 1) === '=') len--;
  const bytes = Math.floor((len * 3) / 4);
  const out = new Int16Array(bytes >> 1);
  let acc = 0;
  let bits = 0;
  let n = 0;
  let low = 0;
  for (let i = 0; i < len; i++) {
    const v = B64.indexOf(text.charAt(i));
    if (v < 0) continue;
    acc = (acc << 6) | v;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      const byte = (acc >> bits) & 0xff;
      if ((n & 1) === 0) low = byte;
      else {
        const s = low | (byte << 8);
        out[n >> 1] = s >= 0x8000 ? s - 0x10000 : s;
      }
      n++;
    }
  }
  return out;
}

const flat = (a: Vec, b: Vec): number => Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.z - b.z) * (a.z - b.z));

/**
 * The device side of the Simulacra protocol: receives actions, moves the avatar locally and
 * reports back. The AI names targets; this class resolves and validates them and never accepts
 * coordinates from the backend.
 */
export class SimulacraCore {
  static readonly AUDIO_RATE = 24000;
  walkSpeed = 0.9; // m/s
  turnSpeed = 3.5; // rad/s
  userDistance = 1.2;
  /** While true the microphone stream carries silence (echo guard while the avatar speaks). */
  micMuted = false;

  readonly objects: WorldObject[] = [];
  readonly avatar: AvatarPose = { pos: { x: 0, y: 0, z: 0 }, yaw: 0, state: 'idle', speed01: 0, gesture: '' };
  connected = false;
  brain = '-';
  lastAction = '';
  lastTranscript = '';
  lastError = '';
  /** Seconds of speech still queued for playback, estimated from what was received. */
  speakingFor = 0;
  placed = false;

  private clock = 0;
  private nextWorld = 0;
  private counters: { [label: string]: number } = {};
  private goal: Vec | null = null;
  private face: Vec | null = null;
  private goalTarget = '';
  private following = false;
  private done: ((ok: boolean, reason: string) => void) | null = null;
  private stuckFor = 0;
  private bestDistance = 0;
  private sideBias = 0;
  private sideBiasFor = 0;
  private mic = new Int16Array((SimulacraCore.AUDIO_RATE / 1000) * 60);
  private micCount = 0;
  private micPos = 0;

  constructor(
    private host: Host,
    private deviceName: string,
  ) {}

  // ---- connection

  onOpen(): void {
    this.connected = true;
    this.lastError = '';
    this.sendJson({ type: 'hello', protocol: 1, device: this.deviceName, capabilities: { vision: false, navmesh: false } });
    this.nextWorld = 0;
  }

  onClose(): void {
    this.connected = false;
    this.brain = '-';
  }

  onMessage(text: string): void {
    let m: any;
    try {
      m = JSON.parse(text);
    } catch (e) {
      return;
    }
    switch (m.type) {
      case 'ready':
        this.brain = String(m.brain);
        break;
      case 'audio': {
        const samples = base64ToPcm16(String(m.pcm16));
        this.speakingFor += samples.length / SimulacraCore.AUDIO_RATE;
        this.host.playAudio(samples);
        break;
      }
      case 'audio_stop':
        this.speakingFor = 0;
        this.host.stopAudio();
        break;
      case 'action':
        this.handleAction(m);
        break;
      case 'transcript':
        this.lastTranscript = (m.role === 'user' ? 'You: ' : 'Sim: ') + String(m.text);
        break;
      case 'log':
        this.lastError = String(m.message);
        this.host.log('[backend ' + m.level + '] ' + m.message);
        break;
    }
  }

  private sendJson(obj: object): void {
    if (this.connected) this.host.send(JSON.stringify(obj));
  }

  /** The user pressed the interrupt control. */
  interrupt(): void {
    this.speakingFor = 0;
    this.host.stopAudio();
    this.sendJson({ type: 'interrupt' });
  }

  // ---- microphone

  /**
   * Feed captured microphone samples (-1..1) at `rate` Hz. They are resampled to 24 kHz, packed
   * as PCM16 and sent in 60 ms frames. The stream never stops: while muted it carries silence,
   * because the speech service needs continuous audio to notice the end of an utterance.
   */
  pushMic(samples: Float32Array, count: number, rate: number): void {
    const step = rate / SimulacraCore.AUDIO_RATE;
    while (this.micPos < count) {
      const i = Math.floor(this.micPos);
      const a = samples[i];
      const b = i + 1 < count ? samples[i + 1] : a;
      let s = a + (b - a) * (this.micPos - i);
      if (this.micMuted) s = 0;
      s = s < -1 ? -1 : s > 1 ? 1 : s;
      this.mic[this.micCount++] = Math.round(s * 32767);
      if (this.micCount === this.mic.length) {
        this.sendJson({ type: 'audio', pcm16: pcm16ToBase64(this.mic, this.micCount) });
        this.micCount = 0;
      }
      this.micPos += step;
    }
    this.micPos -= count;
  }

  // ---- world model

  find(id: string): WorldObject | null {
    const key = String(id || '').toLowerCase();
    for (let i = 0; i < this.objects.length; i++) if (this.objects[i].id.toLowerCase() === key) return this.objects[i];
    return null;
  }

  /** Add an object the user pointed at and named. Re-registering the same thing nearby keeps its id. */
  register(label: string, pos: Vec, source: WorldObject['source']): WorldObject {
    label = String(label || 'object').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'object';
    for (let i = 0; i < this.objects.length; i++) {
      const o = this.objects[i];
      if (o.label === label && flat(o.pos, pos) < 0.75) {
        o.seenAt = this.clock;
        return o;
      }
    }
    this.counters[label] = (this.counters[label] || 0) + 1;
    const obj: WorldObject = { id: label + '_' + this.counters[label], label: label, pos: pos, size: { x: 0.5, y: 0.5, z: 0.5 }, source: source, confidence: 1, seenAt: this.clock };
    this.objects.push(obj);
    return obj;
  }

  /** Put the avatar in front of the user, facing them, on real floor. Call once the floor is known. */
  placeInFrontOfUser(distance: number): boolean {
    const floorY = this.host.floorY();
    if (floorY === null) return false;
    const head = this.host.headPosition();
    const f = this.host.headForward();
    const len = Math.sqrt(f.x * f.x + f.z * f.z) || 1;
    const base = Math.atan2(f.x / len, f.z / len);
    const user = { x: head.x, y: floorY, z: head.z };
    const dists = [distance, distance * 0.75, distance * 1.3, 1.0];
    for (let d = 0; d < dists.length; d++) {
      for (let i = 0; i < 9; i++) {
        const a = base + Math.ceil(i / 2) * 0.44 * (i % 2 === 0 ? -1 : 1);
        const p = { x: user.x + Math.sin(a) * dists[d], y: floorY, z: user.z + Math.cos(a) * dists[d] };
        if (!this.host.isFloor(p) || !this.clearLine(user, p)) continue;
        this.avatar.pos = p;
        this.avatar.yaw = Math.atan2(user.x - p.x, user.z - p.z);
        this.placed = true;
        return true;
      }
    }
    return false;
  }

  private userFloor(): Vec {
    const h = this.host.headPosition();
    const y = this.host.floorY();
    return { x: h.x, y: y === null ? this.avatar.pos.y : y, z: h.z };
  }

  /** Every 25 cm along a straight line must be real floor. */
  private clearLine(a: Vec, b: Vec): boolean {
    const n = Math.max(1, Math.ceil(flat(a, b) / 0.25));
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      if (!this.host.isFloor({ x: a.x + (b.x - a.x) * t, y: a.y, z: a.z + (b.z - a.z) * t })) return false;
    }
    return true;
  }

  /** A reachable spot on a ring around a target, nearest side first. No path planner on this device: straight lines only. */
  private standPoint(target: Vec, radius: number): Vec | null {
    const from = this.avatar.pos;
    const base = Math.atan2(from.x - target.x, from.z - target.z);
    const radii = [radius, radius + 0.3, radius + 0.7];
    for (let r = 0; r < radii.length; r++) {
      for (let i = 0; i < 12; i++) {
        const a = base + Math.ceil(i / 2) * (Math.PI / 6) * (i % 2 === 0 ? -1 : 1);
        const p = { x: target.x + Math.sin(a) * radii[r], y: from.y, z: target.z + Math.cos(a) * radii[r] };
        if (this.host.isFloor(p) && this.clearLine(from, p)) return p;
      }
    }
    return null;
  }

  private resolve(target: string): { pos: Vec; standOff: number } | null {
    if (String(target).toLowerCase() === 'user') return { pos: this.userFloor(), standOff: this.userDistance };
    const o = this.find(target);
    if (!o) return null;
    const foot = Math.max(o.size.x, o.size.z) / 2 + 0.45;
    return { pos: o.pos, standOff: Math.min(2, Math.max(0.6, foot)) };
  }

  // ---- actions

  private finish(ok: boolean, reason: string): void {
    const cb = this.done;
    this.goal = null;
    this.face = null;
    this.done = null;
    this.goalTarget = '';
    this.avatar.state = this.following ? 'following' : 'idle';
    if (cb) cb(ok, reason);
  }

  private handleAction(m: any): void {
    const id = String(m.id);
    const action = String(m.action || '');
    const target = action === 'approach_user' ? 'user' : String(m.target_id || '');
    const reply = (ok: boolean, reason: string, data?: object): void => {
      this.lastAction = action + (target ? ' ' + target : '') + (ok ? ' ok' : ' FAILED: ' + reason);
      const r: any = { type: 'action_result', id: id, status: ok ? 'succeeded' : 'failed' };
      if (!ok && reason) r.reason = reason;
      if (data) r.data = data;
      this.sendJson(r);
    };
    const started = (pathM: number): void => this.sendJson({ type: 'event', name: 'action_started', data: { id: id, plan_ms: 0, path_m: Math.round(pathM * 10) / 10 } });
    this.lastAction = action + (target ? ' ' + target : '') + ' ...';

    if (action === 'walk_to' || action === 'inspect_object' || action === 'approach_user') {
      if (!this.placed) return reply(false, 'the floor has not been found yet; ask the user to look at the floor');
      const t = this.resolve(target);
      if (!t) return reply(false, "unknown target '" + target + "'");
      if (this.done) this.finish(false, 'superseded by a newer action');
      this.following = false;
      const near = flat(this.avatar.pos, t.pos) <= t.standOff + 0.25;
      const stand = near ? this.avatar.pos : this.standPoint(t.pos, t.standOff);
      if (!stand) return reply(false, 'there is no clear straight path to ' + target + ' on this device');
      this.goal = stand;
      this.face = t.pos;
      this.goalTarget = target;
      this.stuckFor = 0;
      this.bestDistance = flat(this.avatar.pos, stand);
      this.sideBias = 0;
      this.avatar.state = 'turning';
      started(flat(this.avatar.pos, stand));
      this.done = (ok, reason) => reply(ok, reason, { metres_from_target: Math.round(flat(this.avatar.pos, this.resolveOr(target, t.pos)) * 10) / 10 });
      return;
    }
    if (action === 'look_at') {
      const t = this.resolve(target);
      if (!t) return reply(false, "unknown target '" + target + "'");
      if (this.done) this.finish(false, 'superseded by a newer action');
      this.goal = this.avatar.pos;
      this.face = t.pos;
      this.avatar.state = 'turning';
      this.done = (ok, reason) => reply(ok, reason);
      return;
    }
    if (action === 'follow_user') {
      if (!this.placed) return reply(false, 'the floor has not been found yet');
      if (this.done) this.finish(false, 'superseded by a newer action');
      this.following = true;
      this.avatar.state = 'following';
      started(0);
      return reply(true, '', { following: true });
    }
    if (action === 'stop') {
      this.following = false;
      if (this.done) this.finish(false, 'stopped');
      this.avatar.state = 'idle';
      return reply(true, '');
    }
    if (action === 'gesture') {
      const type = String((m.params && m.params.type) || '');
      if (['wave', 'nod', 'shake_head', 'shrug'].indexOf(type) < 0) return reply(false, "unknown gesture '" + type + "'");
      this.avatar.gesture = type;
      return reply(true, '');
    }
    if (action === 'register_marker') {
      const label = String((m.params && m.params.label) || '');
      if (!label) return reply(false, 'a label is required');
      const hit = this.host.pointerHit();
      if (!hit) return reply(false, 'could not tell where the user is looking; ask them to look at the object or the floor beside it');
      const o = this.register(label, hit, 'manual');
      this.nextWorld = 0;
      return reply(true, '', { id: o.id, label: o.label, origin: 'registered by the user, not camera-detected' });
    }
    if (action === 'scan_surroundings') return reply(false, 'camera object detection is not available on this device; ask the user to look at things and name them');
    reply(false, "this device does not implement action '" + action + "'");
  }

  private resolveOr(target: string, fallback: Vec): Vec {
    const t = this.resolve(target);
    return t ? t.pos : fallback;
  }

  // ---- per-frame update

  private turnToward(point: Vec, dt: number): number {
    const want = Math.atan2(point.x - this.avatar.pos.x, point.z - this.avatar.pos.z);
    let diff = Math.atan2(Math.sin(want - this.avatar.yaw), Math.cos(want - this.avatar.yaw));
    const stepAbs = Math.min(Math.abs(diff), this.turnSpeed * dt);
    this.avatar.yaw += diff < 0 ? -stepAbs : stepAbs;
    diff = Math.atan2(Math.sin(want - this.avatar.yaw), Math.cos(want - this.avatar.yaw));
    return Math.abs(diff);
  }

  /**
   * One step toward a point. If the direct step is not on real floor, try stepping around the
   * obstruction (the same side for a while, so it does not dither). Returns metres moved.
   * This is local obstacle avoidance, not path planning: it gets around a chair, not out of a maze.
   */
  private stepToward(point: Vec, maxStep: number, dt: number): number {
    const want = Math.atan2(point.x - this.avatar.pos.x, point.z - this.avatar.pos.z);
    this.sideBiasFor = Math.max(0, this.sideBiasFor - dt);
    if (this.sideBiasFor === 0) this.sideBias = 0;
    const offsets = this.sideBias > 0 ? [0, 0.6, 1.2, 1.6] : this.sideBias < 0 ? [0, -0.6, -1.2, -1.6] : [0, 0.6, -0.6, 1.2, -1.2, 1.6, -1.6];
    for (let i = 0; i < offsets.length; i++) {
      const heading = want + offsets[i];
      // Look a body-width ahead as well as at the next step, so the avatar does not graze corners.
      const probe = { x: this.avatar.pos.x + Math.sin(heading) * 0.3, y: this.avatar.pos.y, z: this.avatar.pos.z + Math.cos(heading) * 0.3 };
      const next = { x: this.avatar.pos.x + Math.sin(heading) * maxStep, y: this.avatar.pos.y, z: this.avatar.pos.z + Math.cos(heading) * maxStep };
      if (!this.host.isFloor(next) || !this.host.isFloor(probe)) continue;
      if (offsets[i] !== 0) {
        this.sideBias = offsets[i] > 0 ? 1 : -1;
        this.sideBiasFor = 1.5;
      }
      // Turn the body to where it is actually going.
      let diff = Math.atan2(Math.sin(heading - this.avatar.yaw), Math.cos(heading - this.avatar.yaw));
      const turn = Math.min(Math.abs(diff), this.turnSpeed * dt);
      this.avatar.yaw += diff < 0 ? -turn : turn;
      this.avatar.pos = next;
      return maxStep;
    }
    return 0;
  }

  /** Advance the avatar. Call every frame; read `avatar` afterwards. Runs with or without a connection. */
  update(dt: number): void {
    this.clock += dt;
    this.avatar.gesture = '';
    if (this.speakingFor > 0) this.speakingFor = Math.max(0, this.speakingFor - dt);
    let moved = 0;
    const floorY = this.host.floorY();
    if (floorY !== null && this.placed) this.avatar.pos.y = floorY;

    if (this.goal && this.face) {
      // A moving target (the user) is tracked locally: re-aim while walking.
      if (this.goalTarget === 'user') {
        const u = this.userFloor();
        if (flat(u, this.face) > 0.3) {
          this.face = u;
          const p = flat(this.avatar.pos, u) <= this.userDistance + 0.25 ? this.avatar.pos : this.standPoint(u, this.userDistance);
          if (p) this.goal = p;
        }
      }
      const d = flat(this.avatar.pos, this.goal);
      if (d > 0.04) {
        // Face the goal before setting off; once moving, stepToward steers.
        const aim = Math.atan2(this.goal.x - this.avatar.pos.x, this.goal.z - this.avatar.pos.z);
        const off = Math.abs(Math.atan2(Math.sin(aim - this.avatar.yaw), Math.cos(aim - this.avatar.yaw)));
        if (this.avatar.state !== 'walking' && off > 0.4 && this.sideBias === 0) {
          this.turnToward(this.goal, dt);
          this.avatar.state = 'turning';
        } else {
          moved = this.stepToward(this.goal, Math.min(d, this.walkSpeed * dt), dt);
          this.avatar.state = 'walking';
          // Progress, not motion, is what counts: circling an obstacle forever is also being stuck.
          const now = flat(this.avatar.pos, this.goal);
          if (now < this.bestDistance - 0.05) {
            this.bestDistance = now;
            this.stuckFor = 0;
          } else {
            this.stuckFor += dt;
            if (this.stuckFor > (moved > 0 ? 4.0 : 1.0)) this.finish(false, 'the way became blocked');
          }
        }
      } else if (this.turnToward(this.face, dt) < 0.06) this.finish(true, '');
      else this.avatar.state = 'turning';
    } else if (this.following) {
      const u = this.userFloor();
      const d = flat(this.avatar.pos, u);
      const off = d > this.userDistance + 0.5 ? 0 : this.turnToward(u, dt);
      if (d > this.userDistance + 0.5) moved = this.stepToward(u, Math.min(d - this.userDistance, this.walkSpeed * dt), dt);
      else void off;
      this.avatar.state = 'following';
    }
    this.avatar.speed01 = dt > 0 ? Math.min(1, moved / dt / this.walkSpeed) : 0;

    if (this.connected && this.clock >= this.nextWorld) {
      this.nextWorld = this.clock + 0.4;
      this.sendWorld();
    }
  }

  private sendWorld(): void {
    const v = (p: Vec): number[] => [Math.round(p.x * 1000) / 1000, Math.round(p.y * 1000) / 1000, Math.round(p.z * 1000) / 1000];
    const floorY = this.host.floorY();
    const objects = [];
    for (let i = 0; i < this.objects.length; i++) {
      const o = this.objects[i];
      objects.push({ id: o.id, label: o.label, pos: v(o.pos), size: v(o.size), source: o.source, confidence: o.confidence, lastSeen: Math.round((this.clock - o.seenAt) * 10) / 10, reachable: true });
    }
    const state = this.avatar.state === 'idle' && this.speakingFor > 0 ? 'speaking' : this.avatar.state;
    this.sendJson({
      type: 'world',
      world: {
        user: { pos: v(this.host.headPosition()), fwd: v(this.host.headForward()) },
        avatar: { pos: v(this.avatar.pos), fwd: v({ x: Math.sin(this.avatar.yaw), y: 0, z: Math.cos(this.avatar.yaw) }), state: state },
        objects: objects,
        room: { source: floorY === null ? 'unknown' : 'surface_hit_test', floorY: floorY === null ? 0 : Math.round(floorY * 1000) / 1000, obstacles: 0, navmesh: false },
      },
    });
  }
}
