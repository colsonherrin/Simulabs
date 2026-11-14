import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer as createHttpServer, type Server } from 'node:http';
import { networkInterfaces } from 'node:os';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer, type WebSocket } from 'ws';
import type { Brain, BrainContext } from './brain.js';
import { Memory } from './memory.js';
import { MockBrain } from './mockBrain.js';
import { AUDIO_RATE, PROTOCOL_VERSION, type ActionName, type ActionResult, type BackendMessage, type DeviceMessage } from './protocol.js';
import { RealtimeBrain } from './realtimeBrain.js';
import { SkillExecutor, type DeviceLink } from './skills.js';
import { detectObjects } from './vision.js';
import { WorldModel } from './world.js';

const HERE = dirname(fileURLToPath(import.meta.url));

export interface ServerOptions {
  port: number;
  brain: 'realtime' | 'mock';
  apiKey?: string;
  realtimeModel: string;
  realtimeVoice: string;
  realtimeUrl?: string;
  visionModel: string;
  memoryPath: string | null;
  autonomyIdleSec: number;
  quiet?: boolean;
}

/** One connected headset: its world model, its skill executor, its brain. */
class Session implements DeviceLink {
  capabilities: Record<string, boolean> = {};
  private world = new WorldModel();
  private skills: SkillExecutor;
  private brain: Brain;
  private pending = new Map<string, { resolve: (r: ActionResult) => void; timer: NodeJS.Timeout }>();
  private nextId = 1;
  private worldSig = '';
  private refreshTimer: NodeJS.Timeout | null = null;
  private idleTimer: NodeJS.Timeout | null = null;
  private device = 'unknown';

  constructor(
    private ws: WebSocket,
    private opts: ServerOptions,
    memory: Memory,
  ) {
    this.skills = new SkillExecutor(this, this.world, memory);
    const ctx: BrainContext = {
      send: (m) => this.send(m),
      skills: this.skills,
      world: this.world,
      memory,
      log: (level, message) => this.log(level, message),
    };
    this.brain =
      opts.brain === 'mock'
        ? new MockBrain(ctx)
        : new RealtimeBrain(ctx, { apiKey: opts.apiKey!, model: opts.realtimeModel, voice: opts.realtimeVoice, url: opts.realtimeUrl });
    this.skills.onFeedback = (outcome) => {
      this.log('info', `feedback ${JSON.stringify(outcome).slice(0, 300)}`);
      this.brain.refreshContext(); // memory changed
      this.brain.onFeedback(outcome, true);
      this.touch();
    };

    ws.on('message', (raw, isBinary) => {
      if (isBinary) return;
      let msg: DeviceMessage;
      try {
        msg = JSON.parse(raw.toString());
      } catch {
        return;
      }
      this.onMessage(msg);
    });
    ws.on('close', () => this.dispose());
    ws.on('error', () => this.dispose());

    this.brain
      .start()
      .then(() => this.send({ type: 'ready', protocol: PROTOCOL_VERSION, brain: this.brain.name, audioRate: AUDIO_RATE }))
      .catch((e) => {
        this.log('error', `brain failed to start: ${e?.message ?? e}. Check OPENAI_API_KEY / network.`);
      });
  }

  private log(level: 'info' | 'warn' | 'error', message: string) {
    if (!this.opts.quiet) console[level === 'info' ? 'log' : level](`[${this.device}] ${message}`);
    if (level !== 'info') this.send({ type: 'log', level, message });
  }

  send(msg: BackendMessage) {
    if (this.ws.readyState === this.ws.OPEN) this.ws.send(JSON.stringify(msg));
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
    });
  }

  private touch() {
    if (this.idleTimer) clearTimeout(this.idleTimer);
    if (this.opts.autonomyIdleSec > 0) this.idleTimer = setTimeout(() => this.brain.onIdle(), this.opts.autonomyIdleSec * 1000);
  }

  private onMessage(msg: DeviceMessage) {
    switch (msg.type) {
      case 'hello':
        this.device = msg.device;
        this.capabilities = msg.capabilities ?? {};
        this.log('info', `hello protocol=${msg.protocol} capabilities=${JSON.stringify(this.capabilities)}`);
        if (msg.protocol !== PROTOCOL_VERSION) this.log('warn', `protocol mismatch: device ${msg.protocol}, backend ${PROTOCOL_VERSION}`);
        this.touch();
        break;
      case 'audio':
        this.brain.onAudio(msg.pcm16);
        break;
      case 'text':
        this.touch();
        this.brain.onText(msg.text);
        break;
      case 'interrupt':
        this.brain.interrupt();
        break;
      case 'world': {
        this.world.update(msg.world);
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
      case 'frame':
        void this.onFrame(msg.id, msg.jpeg);
        break;
      case 'event':
        this.log('info', `event ${msg.name} ${JSON.stringify(msg.data ?? {})}`);
        break;
    }
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

  private dispose() {
    if (this.idleTimer) clearTimeout(this.idleTimer);
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

const MIME: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

export function startServer(opts: ServerOptions): Promise<{ server: Server; port: number; close: () => Promise<void> }> {
  const memory = new Memory(opts.memoryPath);
  const publicDir = join(HERE, '..', 'public');

  const server = createHttpServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://x');
    if (url.pathname === '/health') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ ok: true, brain: opts.brain, protocol: PROTOCOL_VERSION }));
      return;
    }
    const rel = normalize(url.pathname === '/' ? '/index.html' : url.pathname).replace(/^(\.\.[/\\])+/, '');
    const file = join(publicDir, rel);
    if (!file.startsWith(publicDir) || !existsSync(file) || !statSync(file).isFile()) {
      res.writeHead(404).end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
    createReadStream(file).pipe(res);
  });

  const wss = new WebSocketServer({ server, path: '/device', maxPayload: 8 * 1024 * 1024 });
  wss.on('connection', (ws) => new Session(ws, opts, memory));

  return new Promise((resolve) => {
    server.listen(opts.port, '0.0.0.0', () => {
      const port = (server.address() as any).port as number;
      resolve({
        server,
        port,
        close: () =>
          new Promise<void>((done) => {
            for (const c of wss.clients) c.terminate();
            wss.close();
            server.close(() => done());
          }),
      });
    });
  });
}

// ---- entry point
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const env = process.env;
  let brain = (env.BRAIN ?? 'realtime') as 'realtime' | 'mock';
  if (brain === 'realtime' && !env.OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY is not set: starting with the MOCK brain (typed text, keyword rules, no AI, no voice).');
    brain = 'mock';
  }
  const { port } = await startServer({
    port: Number(env.PORT ?? 8787),
    brain,
    apiKey: env.OPENAI_API_KEY,
    realtimeModel: env.REALTIME_MODEL ?? 'gpt-realtime',
    realtimeVoice: env.REALTIME_VOICE ?? 'marin',
    visionModel: env.VISION_MODEL ?? 'gpt-4.1-mini',
    memoryPath: env.MEMORY_PATH ?? join(HERE, '..', 'data', 'memory.json'),
    autonomyIdleSec: Number(env.AUTONOMY_IDLE_SEC ?? 0),
  });
  console.log(`Simulacra backend up. brain=${brain}`);
  console.log(`  simulator:  http://localhost:${port}/`);
  for (const list of Object.values(networkInterfaces()))
    for (const ni of list ?? []) if (ni.family === 'IPv4' && !ni.internal) console.log(`  headset URL: ws://${ni.address}:${port}/device`);
}
