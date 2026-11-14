import { execFile } from 'node:child_process';
import { createReadStream, existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createServer as createHttpServer, type Server } from 'node:http';
import { networkInterfaces } from 'node:os';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer, type WebSocket } from 'ws';
import type { Brain, BrainContext } from './brain.js';
import { Memory } from './memory.js';
import { ClaudeBrain } from './claudeBrain.js';
import { TurnTimer, type TurnRecord } from './latency.js';
import { MockBrain } from './mockBrain.js';
import { Ears, Mouth } from './speech.js';
import { AUDIO_RATE, PROTOCOL_VERSION, type ActionName, type ActionResult, type BackendMessage, type DeviceMessage } from './protocol.js';
import { RealtimeBrain } from './realtimeBrain.js';
import { SkillExecutor, type DeviceLink } from './skills.js';
import { detectObjects } from './vision.js';
import { WorldModel } from './world.js';

const HERE = dirname(fileURLToPath(import.meta.url));

export interface ServerOptions {
  port: number;
  brain: 'claude' | 'realtime' | 'mock';
  /** OpenAI key: realtime brain, and speech-to-text / text-to-speech / vision for the Claude brain. */
  apiKey?: string;
  /** Claude brain. The key may be omitted to let the SDK resolve credentials from the environment. */
  anthropicKey?: string;
  anthropicBaseUrl?: string;
  claudeModel?: string;
  claudeEffort?: 'low' | 'medium' | 'high' | 'xhigh' | 'max';
  claudeFast?: boolean;
  sttModel?: string;
  ttsModel?: string;
  ttsBaseUrl?: string;
  /** Key for text-to-speech when it should differ from `apiKey` (benchmarks). */
  ttsApiKey?: string;
  worldEventMinGapSec?: number;
  realtimeModel: string;
  realtimeVoice: string;
  realtimeUrl?: string;
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

/** Which mind runs with the keys at hand: Claude if it has a key, else OpenAI speech-to-speech, else keyword rules. */
export function pickBrain(anthropicKey?: string, openaiKey?: string): ServerOptions['brain'] {
  return anthropicKey ? 'claude' : openaiKey ? 'realtime' : 'mock';
}

/** Ask the provider whether a key is accepted. 'unknown' means the provider could not be reached. */
async function checkKey(url: string, headers: Record<string, string>): Promise<'ok' | 'rejected' | 'unknown'> {
  try {
    const r = await fetch(url, { headers, signal: AbortSignal.timeout(8000) });
    return r.ok ? 'ok' : r.status === 401 || r.status === 403 ? 'rejected' : 'unknown';
  } catch {
    return 'unknown';
  }
}

/** Set or replace NAME=value lines in an env file, leaving everything else as it is. */
function saveEnv(path: string, values: Record<string, string>): void {
  let text = existsSync(path) ? readFileSync(path, 'utf8') : '';
  for (const [name, value] of Object.entries(values)) {
    const line = `${name}=${value}`;
    const re = new RegExp(`^${name}=.*$`, 'm');
    text = re.test(text) ? text.replace(re, line) : text + (text === '' || text.endsWith('\n') ? '' : '\n') + line + '\n';
  }
  writeFileSync(path, text, { mode: 0o600 });
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
  private device = 'unknown';
  private timer = new TurnTimer();
  private knownIds: Set<string> | null = null;
  private userFar = false;

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
    if (opts.brain === 'mock') this.brain = new MockBrain(ctx);
    else if (opts.brain === 'claude')
      this.brain = new ClaudeBrain(ctx, {
        apiKey: opts.anthropicKey,
        baseURL: opts.anthropicBaseUrl,
        model: opts.claudeModel ?? 'claude-opus-5-5',
        effort: opts.claudeEffort ?? 'low',
        fast: opts.claudeFast ?? false,
        // Claude has no audio interface: speech in and out are separate, swappable services.
        ears: opts.apiKey ? new Ears({ apiKey: opts.apiKey, model: opts.realtimeModel, transcribeModel: opts.sttModel ?? 'gpt-4o-mini-transcribe', url: opts.realtimeUrl }, log) : null,
        mouth: opts.apiKey || opts.ttsBaseUrl ? new Mouth({ apiKey: opts.ttsApiKey ?? opts.apiKey ?? '', model: opts.ttsModel ?? 'gpt-4o-mini-tts', voice: opts.realtimeVoice, baseUrl: opts.ttsBaseUrl }, log) : null,
        worldEventMinGapMs: (opts.worldEventMinGapSec ?? 8) * 1000,
      });
    else this.brain = new RealtimeBrain(ctx, { apiKey: opts.apiKey!, model: opts.realtimeModel, voice: opts.realtimeVoice, url: opts.realtimeUrl });
    this.skills.onFeedback = (outcome) => {
      this.log('info', `feedback ${JSON.stringify(outcome).slice(0, 300)}`);
      this.brain.refreshContext(); // memory changed
      this.brain.onFeedback(outcome, true);
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
      this.timer.mark('action_dispatched');
    });
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

  private dispose() {
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

/** Latency records from every session since the server started (served at /metrics). */
const ALL_TURNS: TurnRecord[] = [];

const MIME: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.fbx': 'application/octet-stream' };

/** The WebXR client: sources live in /webxr, shared logic in the Spectacles core, bundled on first request. */
const WEBXR_DIR = join(HERE, '..', '..', 'webxr');
const AVATAR_DIR = join(HERE, '..', '..', 'packages', 'com.simulacra.core', 'Avatar', 'Rocketbox');
const bundles = new Map<string, Promise<string>>();
function webxrBundle(entry: string): Promise<string> {
  let b = bundles.get(entry);
  if (!b) {
    b = import('esbuild').then((esbuild) =>
      esbuild
        .build({ entryPoints: [join(WEBXR_DIR, entry)], bundle: true, format: 'esm', target: 'es2020', write: false, minify: true, nodePaths: [join(HERE, '..', 'node_modules')], logLevel: 'silent' })
        .then((r) => r.outputFiles[0].text),
    );
    b.catch(() => bundles.delete(entry));
    bundles.set(entry, b);
  }
  return b;
}

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
    if (url.pathname === '/metrics') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ brain: opts.brain, summary: TurnTimer.summarize(ALL_TURNS), turns: ALL_TURNS.slice(-50) }, null, 2));
      return;
    }
    if (url.pathname === '/setup/status') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ brain: opts.brain, anthropic: !!opts.anthropicKey, openai: !!opts.apiKey, voice: !!opts.apiKey, saved: !!opts.envPath }));
      return;
    }
    if (url.pathname === '/setup' && req.method === 'POST') {
      // Keys are accepted from this computer only (a headset on USB also counts: it arrives through adb's tunnel).
      const from = req.socket.remoteAddress ?? '';
      if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(from)) {
        res.writeHead(403, { 'content-type': 'application/json' }).end(JSON.stringify({ error: 'Open this page on the computer that runs the backend.' }));
        return;
      }
      let body = '';
      req.on('data', (c) => {
        if (body.length < 10_000) body += c;
      });
      req.on('end', async () => {
        let input: { anthropicKey?: string; openaiKey?: string };
        try {
          input = JSON.parse(body);
        } catch {
          res.writeHead(400).end('bad request');
          return;
        }
        const clean = (v: unknown) => (typeof v === 'string' ? v.trim().replace(/^["']|["']$/g, '') : '');
        const a = clean(input.anthropicKey);
        const o = clean(input.openaiKey);
        const [anthropic, openai] = await Promise.all([
          a ? checkKey((opts.anthropicBaseUrl ?? 'https://api.anthropic.com') + '/v1/models', { 'x-api-key': a, 'anthropic-version': '2023-06-01' }) : 'skipped',
          o ? checkKey((opts.openaiBaseUrl ?? 'https://api.openai.com') + '/v1/models', { authorization: 'Bearer ' + o }) : 'skipped',
        ]);
        // A rejected key is not kept. One that could not be checked (no internet right now) is kept and reported as such.
        const save: Record<string, string> = {};
        if (a && anthropic !== 'rejected') save.ANTHROPIC_API_KEY = opts.anthropicKey = a;
        if (o && openai !== 'rejected') save.OPENAI_API_KEY = opts.apiKey = o;
        if (!opts.brainFixed) opts.brain = pickBrain(opts.anthropicKey, opts.apiKey);
        let saved = false;
        if (opts.envPath && Object.keys(save).length > 0) {
          try {
            saveEnv(opts.envPath, save);
            saved = true;
          } catch {
            /* reported below: the keys still apply until the server stops */
          }
        }
        // Connected headsets and simulators reconnect by themselves and come back with the new mind.
        if (Object.keys(save).length > 0) for (const client of wss.clients) client.close();
        if (!opts.quiet && Object.keys(save).length > 0) console.log(`Keys updated from the setup page. brain=${opts.brain}, voice=${opts.apiKey ? 'on' : 'off'}`);
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ anthropic, openai, brain: opts.brain, voice: !!opts.apiKey, saved }));
      });
      return;
    }
    if (url.pathname === '/xr') {
      res.writeHead(302, { location: '/xr/' }).end();
      return;
    }
    if (url.pathname === '/xr/app.js' || url.pathname === '/xr/emulator.js') {
      webxrBundle(url.pathname === '/xr/app.js' ? 'main.js' : 'emulator.js').then(
        (js) => res.writeHead(200, { 'content-type': 'text/javascript', 'cache-control': 'no-cache' }).end(js),
        (e) => res.writeHead(500, { 'content-type': 'text/plain' }).end('WebXR client failed to build: ' + (e?.message ?? e)),
      );
      return;
    }
    let root = publicDir;
    let path = url.pathname === '/' ? '/index.html' : url.pathname === '/setup' ? '/setup.html' : url.pathname;
    if (path === '/xr/') {
      root = WEBXR_DIR;
      path = '/index.html';
    } else if (path.startsWith('/xr/avatar/')) {
      root = AVATAR_DIR;
      path = path.slice('/xr/avatar'.length);
    }
    const rel = normalize(path).replace(/^(\.\.[/\\])+/, '');
    const file = join(root, rel);
    if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
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
  // Default: Claude plans if it has credentials; otherwise the speech-to-speech brain; otherwise the mock.
  let brain = (env.BRAIN ?? pickBrain(env.ANTHROPIC_API_KEY || env.ANTHROPIC_AUTH_TOKEN, env.OPENAI_API_KEY)) as ServerOptions['brain'];
  if (brain === 'realtime' && !env.OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY is not set: starting with the MOCK brain (typed text, keyword rules, no AI, no voice).');
    brain = 'mock';
  }
  if (brain === 'claude' && !env.OPENAI_API_KEY) console.warn('OPENAI_API_KEY is not set: Claude will work with typed text only (no speech-to-text, no voice, no camera detection).');
  const { port } = await startServer({
    port: Number(env.PORT ?? 8787),
    brain,
    apiKey: env.OPENAI_API_KEY,
    anthropicKey: env.ANTHROPIC_API_KEY,
    claudeModel: env.PLANNER_MODEL ?? 'claude-opus-5-5',
    claudeEffort: (env.PLANNER_EFFORT as ServerOptions['claudeEffort']) ?? 'low',
    claudeFast: env.PLANNER_FAST === '1',
    sttModel: env.STT_MODEL,
    ttsModel: env.TTS_MODEL,
    realtimeModel: env.REALTIME_MODEL ?? 'gpt-realtime',
    realtimeVoice: env.REALTIME_VOICE ?? 'marin',
    visionModel: env.VISION_MODEL ?? 'gpt-4.1-mini',
    memoryPath: env.MEMORY_PATH ?? join(HERE, '..', 'data', 'memory.json'),
    envPath: join(HERE, '..', '.env'),
    brainFixed: !!env.BRAIN,
  });
  if (!env.ANTHROPIC_API_KEY || !env.OPENAI_API_KEY) console.log(`\n  >>> Keys missing. Open http://localhost:${port}/setup on this computer and paste them in. No restart needed.\n`);
  console.log(`Simulacra backend up. brain=${brain}`);
  console.log(`  simulator:  http://localhost:${port}/`);
  console.log(`  latency:    http://localhost:${port}/metrics`);

  // A headset on USB reaches this server at ws://127.0.0.1:<port>/device (the app's default) through
  // adb's reverse tunnel. Set it up, and keep re-doing it, so plugging the headset in is the only step.
  let usb = '';
  const tether = () =>
    execFile('adb', ['reverse', `tcp:${port}`, `tcp:${port}`], { timeout: 4000 }, (err) => {
      const now = err ? ((err as NodeJS.ErrnoException).code === 'ENOENT' ? 'adb not installed: use the Wi-Fi address above, or install Android platform-tools' : 'no headset on USB yet') : `headset on USB can use ws://127.0.0.1:${port}/device`;
      if (now !== usb) console.log(`  USB:        ${(usb = now)}`);
      if (!err || (err as NodeJS.ErrnoException).code !== 'ENOENT') setTimeout(tether, 10_000).unref();
    });
  tether();
  for (const list of Object.values(networkInterfaces()))
    for (const ni of list ?? []) if (ni.family === 'IPv4' && !ni.internal) console.log(`  headset URL: ws://${ni.address}:${port}/device`);
}
