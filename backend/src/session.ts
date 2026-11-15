// One connected device and everything behind it. No Node-only imports: the same class runs inside
// the backend (behind a WebSocket) and inside the browser (the stand-alone WebXR page).
import type { Brain, BrainContext } from './brain.js';
import type { Memory } from './memory.js';
import { TurnTimer, type TurnRecord } from './latency.js';
import { AUDIO_RATE, PROTOCOL_VERSION, type ActionName, type ActionResult, type BackendMessage, type DeviceMessage } from './protocol.js';
import { SkillExecutor, type DeviceLink } from './skills.js';
import { detectObjects } from './vision.js';
import { WorldModel } from './world.js';

export interface ServerOptions {
  port: number;
  brain: 'claude' | 'gpt' | 'audio' | 'realtime' | 'mock';
  /** The 'audio' mind: one OpenAI model that listens and answers in audio per request. */
  audioModel?: string;
  audioVoice?: string;
  /** Pause that ends the user's turn for the 'audio' mind and for HTTPS hearing. */
  sttSilenceMs?: number;
  /** The 'gpt' mind: an OpenAI chat model plans; OpenAI speech models hear and speak. */
  gptModel?: string;
  gptEffort?: string;
  gptBaseUrl?: string;
  /** OpenAI key: realtime brain, and speech-to-text / text-to-speech / vision for the Claude brain. */
  apiKey?: string;
  /** Claude brain. The key may be omitted to let the SDK resolve credentials from the environment. */
  anthropicKey?: string;
  anthropicBaseUrl?: string;
  claudeModel?: string;
  claudeEffort?: 'low' | 'medium' | 'high' | 'xhigh' | 'max';
  claudeFast?: boolean;
  sttModel?: string;
  /** 'http' skips the live socket and hears through plain HTTPS uploads. Default: live, falling back to http. */
  sttMode?: 'stream' | 'http';
  ttsModel?: string;
  ttsBaseUrl?: string;
  /** Key for text-to-speech when it should differ from `apiKey` (benchmarks). */
  ttsApiKey?: string;
  worldEventMinGapSec?: number;
  realtimeModel: string;
  realtimeVoice: string;
  realtimeUrl?: string;
  /** How long a pause ends the user's turn. Shorter answers sooner but may cut in on a hesitation. */
  realtimeSilenceMs?: number;
  visionModel: string;
  memoryPath: string | null;
  quiet?: boolean;
  /** Where the setup page saves keys (backend/.env). Unset: keys apply until the server stops. */
  envPath?: string;
  /** BRAIN was set by hand: the setup page must not switch minds when keys change. */
  brainFixed?: boolean;
  /** Override for the key check in tests. */
  openaiBaseUrl?: string;
}

/** How text frames reach the device. */
export interface Link {
  send(text: string): void;
  open(): boolean;
}

type Log = (level: 'info' | 'warn' | 'error', m: string) => void;
/** Builds the mind for a session. Kept outside this file so a browser build carries only the mind it uses. */
export type BrainFactory = (opts: ServerOptions, ctx: BrainContext, log: Log, kind: ServerOptions['brain']) => Brain;

/** Latency records from every session since the process started (served at /metrics). */
export const ALL_TURNS: TurnRecord[] = [];

/** One connected headset: its world model, its skill executor, its brain. */
export class Session implements DeviceLink {
  capabilities: Record<string, boolean> = {};
  private world = new WorldModel();
  private skills: SkillExecutor;
  private brain: Brain;
  private pending = new Map<string, { resolve: (r: ActionResult) => void; timer: NodeJS.Timeout }>();
  private nextId = 1;
  private worldSig = '';
  private refreshTimer: NodeJS.Timeout | null = null;
  private device = 'unknown';
  private timer = new TurnTimer();
  private knownIds: Set<string> | null = null;
  private userFar = false;
  private disposed = false;

  constructor(
    private link: Link,
    private opts: ServerOptions,
    memory: Memory,
    makeBrain: BrainFactory,
  ) {
    this.skills = new SkillExecutor(this, this.world, memory);
    const ctx: BrainContext = {
      send: (m) => this.send(m),
      skills: this.skills,
      world: this.world,
      memory,
      timer: this.timer,
      log: (level, message) => this.log(level, message),
    };
    this.timer.onRecord = (r) => {
      ALL_TURNS.push(r);
      if (ALL_TURNS.length > 500) ALL_TURNS.shift();
      this.log('info', `latency ${r.trigger} "${r.input}": ${Object.entries(r.ms).map(([k, v]) => `${k}=${v}ms`).join(' ')}${r.plan_ms !== undefined ? ` plan=${r.plan_ms}ms` : ''} llm_calls=${r.llm_calls}`);
      this.send({ type: 'metrics', turn: r as unknown as Record<string, unknown> });
    };
    const log = (level: 'info' | 'warn' | 'error', m: string) => this.log(level, m);
    this.brain = makeBrain(opts, ctx, log, opts.brain);
    this.skills.onFeedback = (outcome) => {
      this.log('info', `feedback ${JSON.stringify(outcome).slice(0, 300)}`);
      this.brain.refreshContext(); // memory changed
      this.brain.onFeedback(outcome, true);
    };

    const ready = () => this.send({ type: 'ready', protocol: PROTOCOL_VERSION, brain: this.brain.name, audioRate: AUDIO_RATE });
    this.brain
      .start()
      .then(ready)
      .catch((e) => {
        // The live speech-to-speech connection is the fastest mind but needs WebSockets to OpenAI.
        // If it cannot be opened, think, hear and speak through separate requests instead: slower, but it works.
        if (this.brain.name === 'realtime' && !opts.brainFixed && opts.apiKey) {
          this.log('warn', `live speech-to-speech is unavailable (${e?.message ?? e}); using the 'audio' mind instead.`);
          this.brain.close();
          this.brain = makeBrain(opts, ctx, log, 'audio');
          return this.brain.start().then(ready);
        }
        this.log('error', `her mind could not start: ${e?.message ?? e}. Check the network (and the key, if one is used).`);
      })
      .catch((e) => this.log('error', `her mind could not start: ${e?.message ?? e}. Check the network (and the key, if one is used).`));
  }

  private log(level: 'info' | 'warn' | 'error', message: string) {
    if (!this.opts.quiet) console[level === 'info' ? 'log' : level](`[${this.device}] ${message}`);
    if (level !== 'info') this.send({ type: 'log', level, message });
  }

  send(msg: BackendMessage) {
    if (this.link.open()) this.link.send(JSON.stringify(msg));
    if (msg.type === 'transcript' && !this.opts.quiet) console.log(`[${this.device}] ${msg.role}: ${msg.text}`);
  }

  /** DeviceLink: send an action and wait for the headset's verdict. Always resolves. */
  request(action: ActionName, target_id?: string, params?: Record<string, unknown>, timeoutMs = 30_000): Promise<ActionResult> {
    const id = `a${this.nextId++}`;
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        resolve({ type: 'action_result', id, status: 'failed', reason: `The headset did not finish ${action} within ${timeoutMs / 1000}s.` });
      }, timeoutMs);
      this.pending.set(id, { resolve, timer });
      this.send({ type: 'action', id, action, target_id, params, status: 'requested' });
      this.timer.mark('action_dispatched');
    });
  }

  /** One JSON text frame from the device. */
  receive(text: string) {
    let msg: DeviceMessage;
    try {
      msg = JSON.parse(text);
    } catch {
      return;
    }
    this.onMessage(msg);
  }

  private onMessage(msg: DeviceMessage) {
    switch (msg.type) {
      case 'hello':
        this.device = msg.device;
        this.capabilities = msg.capabilities ?? {};
        this.log('info', `hello protocol=${msg.protocol} capabilities=${JSON.stringify(this.capabilities)}`);
        if (msg.protocol !== PROTOCOL_VERSION) this.log('warn', `protocol mismatch: device ${msg.protocol}, backend ${PROTOCOL_VERSION}`);
        break;
      case 'audio':
        this.brain.onAudio(msg.pcm16);
        break;
      case 'text':
        this.brain.onText(msg.text);
        break;
      case 'interrupt':
        this.brain.interrupt();
        break;
      case 'world': {
        this.world.update(msg.world);
        this.detectWorldEvents();
        const sig = this.world.signature();
        if (sig !== this.worldSig) {
          this.worldSig = sig;
          if (this.refreshTimer) clearTimeout(this.refreshTimer);
          this.refreshTimer = setTimeout(() => this.brain.refreshContext(), 400);
        }
        break;
      }
      case 'action_result': {
        const p = this.pending.get(msg.id);
        if (!p) break;
        clearTimeout(p.timer);
        this.pending.delete(msg.id);
        p.resolve(msg);
        break;
      }
      case 'view':
        this.brain.onView?.(msg.jpeg);
        break;
      case 'frame':
        void this.onFrame(msg.id, msg.jpeg);
        break;
      case 'event':
        if (msg.name === 'action_started') {
          // The body began moving: this is the end of the speech-to-action path.
          this.timer.mark('device_started');
          this.timer.note({ plan_ms: Number(msg.data?.plan_ms ?? 0), path_m: Number(msg.data?.path_m ?? 0) });
        } else this.log('info', `event ${msg.name} ${JSON.stringify(msg.data ?? {})}`);
        break;
    }
  }

  /**
   * The world model updates continuously without involving the brain. Only meaningful changes
   * become events: an object nobody asked about appearing or vanishing, or the user walking off.
   */
  private detectWorldEvents() {
    const s = this.world.snapshot;
    if (!s || !this.brain.onWorldEvent) return;
    const ids = new Set(s.objects.map((o) => o.id));
    if (this.knownIds && this.pending.size === 0) {
      for (const o of s.objects) if (!this.knownIds.has(o.id)) this.brain.onWorldEvent(`A new object is now known: ${o.id} (${o.label}).`, false);
      for (const id of this.knownIds) if (!ids.has(id)) this.brain.onWorldEvent(`Object ${id} is no longer known.`, false);
    }
    this.knownIds = ids;

    const d = Math.hypot(s.avatar.pos[0] - s.user.pos[0], s.avatar.pos[2] - s.user.pos[2]);
    if (!this.userFar && d > 3.5 && s.avatar.state === 'idle') {
      this.userFar = true;
      this.brain.onWorldEvent(`The user has moved away; they are now ${d.toFixed(1)} m from you.`, true);
    } else if (this.userFar && d < 2.5) this.userFar = false;
  }

  private async onFrame(frameId: string, jpeg: string) {
    if (!this.opts.apiKey) {
      this.send({ type: 'detections', frameId, items: [], error: 'No vision model configured on the backend (OPENAI_API_KEY missing).' });
      return;
    }
    try {
      const items = await detectObjects(jpeg, { apiKey: this.opts.apiKey, model: this.opts.visionModel });
      this.log('info', `vision: ${items.map((i) => `${i.label}@${i.x.toFixed(2)},${i.y.toFixed(2)}`).join(' ') || 'nothing'}`);
      this.send({ type: 'detections', frameId, items });
    } catch (e: any) {
      this.log('error', `vision failed: ${e?.message ?? e}`);
      this.send({ type: 'detections', frameId, items: [], error: String(e?.message ?? e) });
    }
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    for (const p of this.pending.values()) {
      clearTimeout(p.timer);
      p.resolve({ type: 'action_result', id: '', status: 'failed', reason: 'headset disconnected' });
    }
    this.pending.clear();
    this.brain.close();
    if (!this.opts.quiet) console.log(`[${this.device}] disconnected`);
  }
}

