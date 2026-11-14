import type { Vec3, WorldObject, WorldSnapshot } from './protocol.js';

const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const flatDist = (a: Vec3, b: Vec3) => Math.hypot(a[0] - b[0], a[2] - b[2]);

const SOURCE_TEXT: Record<string, string> = {
  detected: 'seen by the headset camera',
  room_scan: "from the user's room setup scan (not camera detection)",
  manual: 'registered by the user pointing at it (not camera detection)',
  simulated: 'simulated test object',
};

/** Backend copy of the device's world model. The device stays authoritative for geometry. */
export class WorldModel {
  snapshot: WorldSnapshot | null = null;
  updatedAt = 0;

  update(s: WorldSnapshot) {
    this.snapshot = s;
    this.updatedAt = Date.now();
  }

  get objects(): WorldObject[] {
    return this.snapshot?.objects ?? [];
  }

  find(id: string | undefined): WorldObject | undefined {
    if (!id) return undefined;
    const key = id.trim().toLowerCase();
    return this.objects.find((o) => o.id.toLowerCase() === key);
  }

  /** Signature that changes only when the set of things changes, not when poses jitter. */
  signature(): string {
    return this.objects
      .map((o) => `${o.id}:${o.label}:${o.source}:${o.reachable ?? ''}`)
      .sort()
      .join('|');
  }

  /** "ahead", "ahead-left", "behind"... relative to a pose's facing direction. */
  static bearing(from: { pos: Vec3; fwd: Vec3 }, to: Vec3): string {
    const d = sub(to, from.pos);
    const fx = from.fwd[0];
    const fz = from.fwd[2];
    // Signed angle from forward to d on the floor plane; positive = to the right (Unity, y up, left-handed).
    const ang = (Math.atan2(fz * d[0] - fx * d[2], fx * d[0] + fz * d[2]) * 180) / Math.PI;
    const a = Math.abs(ang);
    const side = ang > 0 ? 'right' : 'left';
    if (a < 20) return 'straight ahead';
    if (a < 70) return `ahead-${side}`;
    if (a < 110) return `to the ${side}`;
    if (a < 160) return `behind-${side}`;
    return 'behind';
  }

  /** The object closest to the centre of the user's view, if any is within `maxDeg`. */
  gazeTarget(maxDeg = 25): WorldObject | undefined {
    const s = this.snapshot;
    if (!s) return undefined;
    let best: WorldObject | undefined;
    let bestAng = maxDeg;
    for (const o of s.objects) {
      // Compare headings on the floor plane: things on the floor sit well below eye level.
      const d = sub(o.pos, s.user.pos);
      const len = Math.hypot(d[0], d[2]);
      const flen = Math.hypot(s.user.fwd[0], s.user.fwd[2]);
      if (len < 0.2 || flen < 0.1) continue;
      const dot = (d[0] * s.user.fwd[0] + d[2] * s.user.fwd[2]) / (len * flen);
      const ang = (Math.acos(Math.max(-1, Math.min(1, dot))) * 180) / Math.PI;
      if (ang < bestAng) {
        bestAng = ang;
        best = o;
      }
    }
    return best;
  }

  describeObject(o: WorldObject): Record<string, unknown> {
    const s = this.snapshot!;
    return {
      id: o.id,
      label: o.label,
      origin: SOURCE_TEXT[o.source] ?? o.source,
      confidence: Number(o.confidence.toFixed(2)),
      metres_from_you: Number(flatDist(o.pos, s.avatar.pos).toFixed(1)),
      metres_from_user: Number(flatDist(o.pos, s.user.pos).toFixed(1)),
      direction_for_user: WorldModel.bearing(s.user, o.pos),
      seconds_since_observed: Math.round(o.lastSeen),
      reachable: o.reachable ?? true,
    };
  }

  /** Structured state for tool results. No raw coordinates leave the backend toward the LLM. */
  describe(): Record<string, unknown> {
    const s = this.snapshot;
    if (!s) return { status: 'no world data from the headset yet' };
    const gaze = this.gazeTarget();
    return {
      you: {
        state: s.avatar.state,
        metres_from_user: Number(flatDist(s.avatar.pos, s.user.pos).toFixed(1)),
        direction_for_user: WorldModel.bearing(s.user, s.avatar.pos),
      },
      user_is_looking_toward: gaze ? gaze.id : 'nothing you know about',
      room: s.room ?? 'unknown',
      objects: s.objects.map((o) => this.describeObject(o)),
    };
  }

  /** Compact text block for the system prompt. */
  summary(): string {
    const s = this.snapshot;
    if (!s) return 'No world data from the headset yet.';
    if (s.objects.length === 0) return 'You know of no objects in the room yet.';
    return s.objects
      .map((o) => `- ${o.id}: a ${o.label}, ${SOURCE_TEXT[o.source] ?? o.source}${o.reachable === false ? ', NOT reachable on foot' : ''}`)
      .join('\n');
  }

  /** Fresh spatial context as plain text, prefetched into every reasoning turn so the model never has to ask for it. */
  contextText(): string {
    const s = this.snapshot;
    if (!s) return 'No world data from the headset yet.';
    const gaze = this.gazeTarget();
    const lines = [
      `you: ${s.avatar.state}, ${flatDist(s.avatar.pos, s.user.pos).toFixed(1)} m from the user, ${WorldModel.bearing(s.user, s.avatar.pos)} of them`,
      `user is looking toward: ${gaze ? gaze.id : 'nothing you know about'}`,
      `room: ${s.room ? `${s.room.source}, walkable floor ${s.room.navmesh ? 'mapped' : 'NOT mapped'}` : 'unknown'}`,
    ];
    if (s.objects.length === 0) lines.push('objects: none known yet');
    else {
      lines.push('objects:');
      for (const o of s.objects)
        lines.push(
          `- ${o.id}: ${o.label}, ${SOURCE_TEXT[o.source] ?? o.source}, ${flatDist(o.pos, s.avatar.pos).toFixed(1)} m from you, ${flatDist(o.pos, s.user.pos).toFixed(1)} m from the user (${WorldModel.bearing(s.user, o.pos)} for them)${o.reachable === false ? ', NOT reachable on foot' : ''}`,
        );
    }
    return lines.join('\n');
  }
}
