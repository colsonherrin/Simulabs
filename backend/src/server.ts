import './env.js';
import { execFile } from 'node:child_process';
import { createReadStream, existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createServer as createHttpServer, type Server } from 'node:http';
import { networkInterfaces } from 'node:os';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import { Memory } from './memory.js';
import { makeBrain } from './brains.js';
import { AVATAR_DIR, WEBXR_DIR, webxrBuild } from './webxr-bundle.js';
import { TurnTimer } from './latency.js';
import { ALL_TURNS, Session, type ServerOptions } from './session.js';
export type { ServerOptions } from './session.js';
import { PROTOCOL_VERSION } from './protocol.js';

const HERE = dirname(fileURLToPath(import.meta.url));

/**
 * Which mind runs with the keys at hand. With an OpenAI key: the listening 'audio' mind, the fastest
 * one that has been measured against the real service. Claude alone has no voice, so it is the
 * default only without an OpenAI key (BRAIN=claude or BRAIN=realtime select the others).
 */
export function pickBrain(anthropicKey?: string, openaiKey?: string): ServerOptions['brain'] {
  return openaiKey ? 'audio' : anthropicKey ? 'claude' : 'mock';
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


const MIME: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.fbx': 'application/octet-stream' };

/** The WebXR client: sources live in /webxr, bundled on first request. */
const bundles = new Map<string, Promise<string>>();
function webxrBundle(entry: string): Promise<string> {
  let b = bundles.get(entry);
  if (!b) {
    b = import('esbuild').then((esbuild) =>
      esbuild
        .build({ ...webxrBuild(entry), write: false })
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
  wss.on('connection', (ws) => {
    const session = new Session({ send: (text) => ws.send(text), open: () => ws.readyState === ws.OPEN }, opts, memory, makeBrain);
    ws.on('message', (raw, isBinary) => {
      if (!isBinary) session.receive(raw.toString());
    });
    ws.on('close', () => session.dispose());
    ws.on('error', () => session.dispose());
  });

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
  // Default: Claude plans if it has credentials; otherwise an OpenAI model plans; otherwise the mock.
  let brain = (env.BRAIN ?? pickBrain(env.ANTHROPIC_API_KEY || env.ANTHROPIC_AUTH_TOKEN, env.OPENAI_API_KEY)) as ServerOptions['brain'];
  if ((brain === 'realtime' || brain === 'gpt' || brain === 'audio') && !env.OPENAI_API_KEY) {
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
    audioModel: env.AUDIO_MODEL,
    audioVoice: env.AUDIO_VOICE,
    sttSilenceMs: env.STT_SILENCE_MS ? Number(env.STT_SILENCE_MS) : undefined,
    gptModel: env.OPENAI_PLANNER_MODEL,
    gptEffort: env.OPENAI_PLANNER_EFFORT,
    sttModel: env.STT_MODEL,
    sttMode: env.STT_MODE === 'http' ? 'http' : undefined,
    ttsModel: env.TTS_MODEL,
    realtimeModel: env.REALTIME_MODEL ?? 'gpt-realtime',
    realtimeVoice: env.REALTIME_VOICE ?? 'marin',
    realtimeSilenceMs: env.REALTIME_SILENCE_MS ? Number(env.REALTIME_SILENCE_MS) : undefined,
    visionModel: env.VISION_MODEL ?? 'gpt-4.1-mini',
    memoryPath: env.MEMORY_PATH ?? join(HERE, '..', 'data', 'memory.json'),
    envPath: join(HERE, '..', '.env'),
    brainFixed: !!env.BRAIN,
  });
  if (!env.ANTHROPIC_API_KEY || !env.OPENAI_API_KEY) console.log(`\n  >>> Keys missing. Open http://localhost:${port}/setup on this computer and paste them in. No restart needed.\n`);
  console.log(`Simulacra backend up. brain=${brain}`);
  console.log(`  setup keys: http://localhost:${port}/setup`);
  console.log(`  WebXR app:  http://localhost:${port}/xr/   (desktop preview; on Quest over USB, press Enter AR)`);
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
