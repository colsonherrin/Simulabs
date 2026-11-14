import type { ActionName, ActionResult } from './protocol.js';
import type { Memory, SkillStep } from './memory.js';
import type { WorldModel } from './world.js';

/** What the skill layer needs from the connected headset. */
export interface DeviceLink {
  capabilities: Record<string, boolean>;
  request(action: ActionName, target_id?: string, params?: Record<string, unknown>, timeoutMs?: number): Promise<ActionResult>;
}

export interface ToolDef {
  type: 'function';
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

const obj = (properties: Record<string, unknown> = {}, required: string[] = []) => ({
  type: 'object',
  properties,
  required,
  additionalProperties: false,
});
const TARGET = { type: 'string', description: 'An object id from the world state (like "chair_1"), or "user".' };

/** The skill library exposed to the model. Fixed primitives plus data-only composites. No generated code. */
export const TOOLS: ToolDef[] = [
  { type: 'function', name: 'get_world_state', description: 'Fresh snapshot of the room: where you and the user are, what the user is looking toward, and every known object with its id, origin and distance. Call before answering questions about the surroundings.', parameters: obj() },
  { type: 'function', name: 'look_at', description: 'Turn your body to face an object or the user.', parameters: obj({ target_id: TARGET }, ['target_id']) },
  { type: 'function', name: 'walk_to', description: 'Walk across the real floor to stand next to an object or the user. Returns immediately; the outcome arrives later as an [action_result].', parameters: obj({ target_id: TARGET }, ['target_id']) },
  { type: 'function', name: 'approach_user', description: 'Walk over to the user and stop at a comfortable conversational distance, facing them. Outcome arrives later as an [action_result].', parameters: obj() },
  { type: 'function', name: 'inspect_object', description: 'Walk up to an object, face it, and get everything known about it including your saved notes. Outcome arrives later as an [action_result].', parameters: obj({ id: { type: 'string', description: 'Object id from the world state.' } }, ['id']) },
  { type: 'function', name: 'remember_object', description: 'Save a short note about an object to long-term memory (kept across sessions).', parameters: obj({ id: { type: 'string' }, note: { type: 'string', description: 'One short factual sentence.' } }, ['id', 'note']) },
  { type: 'function', name: 'scan_surroundings', description: "Look through the headset camera (the user's current view) and detect real objects. New objects appear in the world state. Outcome arrives later as an [action_result].", parameters: obj() },
  { type: 'function', name: 'register_marker', description: 'Register the spot the user is pointing or looking at as a named object, when the user tells you what something is ("this is my desk"). It is stored as registered-by-user, never as camera-detected.', parameters: obj({ label: { type: 'string', description: 'Lowercase singular noun, e.g. "chair".' } }, ['label']) },
  { type: 'function', name: 'follow_user', description: 'Keep following the user around at a comfortable distance until told to stop or given another movement. The body handles the walking by itself.', parameters: obj() },
  { type: 'function', name: 'gesture', description: 'Make a body gesture.', parameters: obj({ type: { type: 'string', enum: ['wave', 'nod', 'shake_head', 'shrug'] } }, ['type']) },
  { type: 'function', name: 'stop_moving', description: 'Stop walking or following immediately.', parameters: obj() },
  {
    type: 'function',
    name: 'run_sequence',
    description: 'Run several primitive skills one after another in a single go, without checking back in between (use this for multi-step requests such as "go to the table, then come back"). If save_as is given and every step succeeds, the sequence is stored as a reusable skill. Outcome arrives later as an [action_result].',
    parameters: obj(
      {
        steps: { type: 'array', items: obj({ skill: { type: 'string', enum: ['walk_to', 'look_at', 'approach_user', 'inspect_object', 'scan_surroundings', 'gesture'] }, target: { type: 'string', description: 'Object id, "user", or for gesture the gesture type.' } }, ['skill']) },
        save_as: { type: 'string', description: 'Optional snake_case name to remember this sequence under if it works.' },
      },
      ['steps'],
    ),
  },
  {
    type: 'function',
    name: 'save_skill',
    description: 'Store a reusable skill made of existing primitive skills, after a sequence worked. Use "$target" as the target to make it apply to any object later.',
    parameters: obj(
      {
        name: { type: 'string', description: 'snake_case name, e.g. "approach_object".' },
        description: { type: 'string' },
        steps: {
          type: 'array',
          items: obj({ skill: { type: 'string', enum: ['walk_to', 'look_at', 'approach_user', 'inspect_object', 'scan_surroundings', 'gesture'] }, target: { type: 'string', description: 'Object id, "user", "$target", or for gesture the gesture type.' } }, ['skill']),
        },
      },
      ['name', 'description', 'steps'],
    ),
  },
  { type: 'function', name: 'run_skill', description: 'Run a skill you saved earlier with save_skill. Outcome arrives later as an [action_result].', parameters: obj({ name: { type: 'string' }, target_id: { type: 'string', description: 'Replaces "$target" in the skill steps.' } }, ['name']) },
];

const MOVE_TIMEOUT = 45_000;
const QUICK_TIMEOUT = 8_000;
const PRIMITIVES = new Set(['walk_to', 'look_at', 'approach_user', 'inspect_object', 'scan_surroundings', 'gesture']);
const GESTURES = new Set(['wave', 'nod', 'shake_head', 'shrug']);

type Outcome = Record<string, unknown> & { status: string };

/**
 * Turns model tool calls into validated device actions, observes the result, and writes it to memory.
 * Long-running skills return {status:"started"} at once and report through `onFeedback` when done, so
 * the conversation never blocks on the avatar's legs.
 */
export class SkillExecutor {
  /** Called with the outcome of a long-running skill. */
  onFeedback: (outcome: Outcome) => void = () => {};
  private runToken = 0;

  constructor(
    private device: DeviceLink,
    private world: WorldModel,
    private memory: Memory,
  ) {}

  async execute(name: string, args: Record<string, any>): Promise<Outcome> {
    try {
      switch (name) {
        case 'get_world_state':
          return { status: 'ok', ...this.world.describe() };
        case 'look_at':
          return await this.runPrimitive('look_at', args.target_id);
        case 'walk_to':
        case 'approach_user':
        case 'inspect_object':
        case 'scan_surroundings': {
          const target = name === 'inspect_object' ? args.id : name === 'walk_to' ? args.target_id : undefined;
          const invalid = this.validate(name, target);
          if (invalid) return this.fail(name, target, invalid);
          this.background(name, target, () => this.runPrimitive(name, target));
          return { status: 'started', note: 'In progress. Say a brief acknowledgement now; the outcome will arrive as an [action_result].' };
        }
        case 'remember_object': {
          const o = this.world.find(args.id);
          if (!o) return this.fail(name, args.id, this.unknownTarget(args.id));
          this.memory.rememberObject(o.id, o.label, String(args.note ?? ''));
          return { status: 'succeeded', remembered: { id: o.id, note: args.note } };
        }
        case 'register_marker': {
          const label = String(args.label ?? '').trim().toLowerCase();
          if (!label) return { status: 'failed', reason: 'label is required' };
          const r = await this.device.request('register_marker', undefined, { label }, QUICK_TIMEOUT);
          this.memory.recordOutcome(name, label, r.status, r.reason);
          return { status: r.status, reason: r.reason, ...r.data };
        }
        case 'follow_user': {
          if (!this.world.snapshot) return this.fail(name, undefined, 'The headset has not sent any world data yet.');
          this.runToken++;
          const r = await this.device.request('follow_user', undefined, undefined, QUICK_TIMEOUT);
          this.memory.recordOutcome(name, undefined, r.status, r.reason);
          return { status: r.status, skill: name, reason: r.reason, ...r.data };
        }
        case 'gesture':
          return await this.runPrimitive('gesture', String(args.type ?? ''));
        case 'run_sequence':
          return this.runSequence(args);
        case 'stop_moving': {
          this.runToken++;
          const r = await this.device.request('stop', undefined, undefined, QUICK_TIMEOUT);
          return { status: r.status, reason: r.reason };
        }
        case 'save_skill':
          return this.saveSkill(args);
        case 'run_skill':
          return this.runSkill(args);
        default:
          return { status: 'failed', reason: `Unknown skill "${name}". Available: ${TOOLS.map((t) => t.name).join(', ')}` };
      }
    } catch (e: any) {
      return this.fail(name, args?.target_id ?? args?.id, `internal error: ${e?.message ?? e}`);
    }
  }

  private unknownTarget(id: unknown): string {
    const ids = this.world.objects.map((o) => o.id);
    return `No object with id "${id}". Known ids: ${ids.length ? ids.join(', ') : '(none yet)'}, or "user". Try scan_surroundings or ask the user to point at it and use register_marker.`;
  }

  /** Cheap checks before bothering the headset. Geometry is validated on the device. */
  private validate(skill: string, target: string | undefined): string | null {
    if (!this.world.snapshot) return 'The headset has not sent any world data yet.';
    if (skill === 'scan_surroundings') return this.device.capabilities.vision ? null : 'This headset has no camera access for object detection. Ask the user to point at things and use register_marker instead.';
    if (skill === 'approach_user') return null;
    if (skill === 'gesture') return target && GESTURES.has(target) ? null : `Unknown gesture "${target}". Available: ${[...GESTURES].join(', ')}.`;
    if (!target) return 'A target id is required.';
    if (target === 'user') return skill === 'inspect_object' ? 'inspect_object needs an object id, not the user.' : null;
    if (!this.world.find(target)) return this.unknownTarget(target);
    return null;
  }

  private fail(skill: string, target: string | undefined, reason: string): Outcome {
    this.memory.recordOutcome(skill, target, 'failed', reason);
    return { status: 'failed', skill, target_id: target, reason };
  }

  /** One primitive: validate, send to device, wait, record, enrich. */
  private async runPrimitive(skill: string, target: string | undefined): Promise<Outcome> {
    const invalid = this.validate(skill, target);
    if (invalid) return this.fail(skill, target, invalid);
    const action = skill as ActionName;
    const timeout = skill === 'look_at' || skill === 'gesture' ? QUICK_TIMEOUT : MOVE_TIMEOUT;
    const r = skill === 'gesture' ? await this.device.request(action, undefined, { type: target }, timeout) : await this.device.request(action, target, undefined, timeout);
    this.memory.recordOutcome(skill, target, r.status, r.reason);
    const out: Outcome = { status: r.status, skill, target_id: target, reason: r.reason, ...r.data };
    if (skill === 'inspect_object' && r.status === 'succeeded') {
      const o = this.world.find(target);
      if (o) {
        out.object = this.world.describeObject(o);
        out.your_notes = this.memory.notesFor(o.id);
      }
    }
    return out;
  }

  private background(skill: string, target: string | undefined, run: () => Promise<Outcome>) {
    const token = ++this.runToken;
    run()
      .catch((e): Outcome => ({ status: 'failed', skill, target_id: target, reason: String(e?.message ?? e) }))
      .then((outcome) => {
        // A newer movement replaced this one; its own result is what matters.
        if (token !== this.runToken && outcome.status === 'failed') return;
        this.onFeedback(outcome);
      });
  }

  private saveSkill(args: Record<string, any>): Outcome {
    const name = String(args.name ?? '').trim().toLowerCase().replace(/[^a-z0-9_]+/g, '_');
    const steps: SkillStep[] = Array.isArray(args.steps) ? args.steps : [];
    if (!name) return { status: 'failed', reason: 'name is required' };
    if (TOOLS.some((t) => t.name === name)) return { status: 'failed', reason: `"${name}" is a built-in skill; pick another name.` };
    if (steps.length === 0 || steps.length > 6) return { status: 'failed', reason: 'A skill needs 1 to 6 steps.' };
    const bad = steps.find((s) => !PRIMITIVES.has(s.skill));
    if (bad) return { status: 'failed', reason: `Step skill "${bad.skill}" is not a primitive. Allowed: ${[...PRIMITIVES].join(', ')}` };
    this.memory.saveSkill({ name, description: String(args.description ?? ''), steps: steps.map((s) => ({ skill: s.skill, target: s.target })) });
    return { status: 'succeeded', saved: name, steps: steps.length };
  }

  private runSkill(args: Record<string, any>): Outcome {
    const name = String(args.name ?? '').trim().toLowerCase();
    const skill = this.memory.data.learnedSkills[name];
    if (!skill) return { status: 'failed', reason: `No saved skill "${name}". Saved: ${Object.keys(this.memory.data.learnedSkills).join(', ') || '(none)'}` };
    const target = args.target_id as string | undefined;
    if (skill.steps.some((s) => s.target === '$target') && !target) return { status: 'failed', reason: `Skill "${name}" needs a target_id.` };
    this.runSteps(name, skill.steps, target, (ok) => this.memory.skillUsed(name, ok));
    return { status: 'started', note: `Running ${skill.steps.length} steps. The outcome will arrive as an [action_result].` };
  }

  /** Ad-hoc plan: executed locally step by step with no model call in between; optionally remembered if it works. */
  private runSequence(args: Record<string, any>): Outcome {
    const steps: SkillStep[] = Array.isArray(args.steps) ? args.steps.map((s: any) => ({ skill: String(s?.skill), target: s?.target })) : [];
    if (steps.length === 0 || steps.length > 6) return { status: 'failed', reason: 'A sequence needs 1 to 6 steps.' };
    const bad = steps.find((s) => !PRIMITIVES.has(s.skill));
    if (bad) return { status: 'failed', reason: `Step skill "${bad.skill}" is not a primitive. Allowed: ${[...PRIMITIVES].join(', ')}` };
    // Fail fast on anything checkable now, before the body starts moving.
    for (const st of steps) {
      const invalid = this.validate(st.skill, st.target);
      if (invalid) return this.fail('run_sequence', st.target, `step ${st.skill}: ${invalid}`);
    }
    const saveAs = String(args.save_as ?? '').trim().toLowerCase().replace(/[^a-z0-9_]+/g, '_');
    this.runSteps('run_sequence', steps, undefined, (ok) => {
      if (ok && saveAs && !TOOLS.some((t) => t.name === saveAs)) {
        this.memory.saveSkill({ name: saveAs, description: `Sequence that worked: ${steps.map((x) => `${x.skill}(${x.target ?? ''})`).join(' -> ')}`, steps });
        this.memory.skillUsed(saveAs, true);
      }
    });
    return { status: 'started', note: `Running ${steps.length} steps. The outcome will arrive as an [action_result].` };
  }

  private runSteps(label: string, steps: SkillStep[], target: string | undefined, done: (ok: boolean) => void) {
    const token = this.runToken + 1;
    this.background(label, target, async () => {
      const trace: Outcome[] = [];
      for (const step of steps) {
        if (this.runToken !== token) return { status: 'failed', skill: label, reason: 'interrupted by a newer action', steps: trace };
        const t = step.target === '$target' ? target : step.target;
        const r = await this.runPrimitive(step.skill, t);
        trace.push(r);
        if (r.status !== 'succeeded') {
          done(false);
          return { status: 'failed', skill: label, target_id: target, reason: `step ${trace.length} (${step.skill}) failed: ${r.reason}`, steps: trace };
        }
      }
      done(true);
      return { status: 'succeeded', skill: label, target_id: target, steps: trace };
    });
  }
}
