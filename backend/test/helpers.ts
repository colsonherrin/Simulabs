import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import WebSocket from 'ws';
import type { WorldSnapshot } from '../src/protocol.js';
import type { ServerOptions } from '../src/server.js';

export const WORLD: WorldSnapshot = {
  user: { pos: [0, 1.6, 0], fwd: [0, 0, 1] },
  avatar: { pos: [0, 0, 3], fwd: [0, 0, -1], state: 'idle' },
  objects: [
    { id: 'chair_1', label: 'chair', pos: [0.2, 0.4, 2], source: 'manual', confidence: 1, lastSeen: 3 },
    { id: 'table_1', label: 'table', pos: [-2, 0.4, 0], source: 'room_scan', confidence: 1, lastSeen: 3 },
  ],
  room: { source: 'room_scan', floorY: 0, obstacles: 1, navmesh: true },
};
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type Script = (res: ServerResponse, body: any) => Promise<void>;
export const sse = (res: ServerResponse, type: string, data: object) => res.write(`event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`);
export const begin = (res: ServerResponse) => {
  res.writeHead(200, { 'content-type': 'text/event-stream' });
  sse(res, 'message_start', { message: { id: 'msg_1', type: 'message', role: 'assistant', model: 'claude-opus-5-5', content: [], stop_reason: null, stop_sequence: null, usage: { input_tokens: 10, output_tokens: 1 } } });
};
export const end = (res: ServerResponse, stop_reason: string) => {
  sse(res, 'message_delta', { delta: { stop_reason, stop_sequence: null }, usage: { output_tokens: 5 } });
  sse(res, 'message_stop', {});
  res.end();
};
export const toolBlock = (res: ServerResponse, index: number, id: string, name: string, input: object) => {
  const json = JSON.stringify(input);
  sse(res, 'content_block_start', { index, content_block: { type: 'tool_use', id, name, input: {} } });
  sse(res, 'content_block_delta', { index, delta: { type: 'input_json_delta', partial_json: json.slice(0, 5) } });
  sse(res, 'content_block_delta', { index, delta: { type: 'input_json_delta', partial_json: json.slice(5) } });
  sse(res, 'content_block_stop', { index });
};
export const textBlock = (res: ServerResponse, index: number, text: string) => {
  sse(res, 'content_block_start', { index, content_block: { type: 'text', text: '' } });
  sse(res, 'content_block_delta', { index, delta: { type: 'text_delta', text } });
  sse(res, 'content_block_stop', { index });
};

/** Fake Anthropic Messages API + fake text-to-speech endpoint on one port. */
export async function fakeCloud(scripts: Script[] | ((n: number, body: any) => Script | undefined)) {
  const calls: { body: any; startedAt: number; endedAt?: number }[] = [];
  const spoken: string[] = [];
  const read = (req: IncomingMessage) => new Promise<any>((resolve) => { let d = ''; req.on('data', (c) => (d += c)); req.on('end', () => resolve(JSON.parse(d || '{}'))); });
  const server = createServer(async (req, res) => {
    const body = await read(req);
    if (req.url?.startsWith('/v1/messages')) {
      const call = { body, startedAt: performance.now() } as (typeof calls)[number];
      calls.push(call);
      const script = Array.isArray(scripts) ? scripts[calls.length - 1] : scripts(calls.length - 1, body);
      if (!script) return void res.writeHead(500).end('no script');
      res.on('close', () => (call.endedAt ??= performance.now()));
      await script(res, body).catch(() => {});
      call.endedAt = performance.now();
    } else if (req.url === '/audio/speech') {
      spoken.push(body.input);
      res.writeHead(200, { 'content-type': 'audio/pcm' });
      res.end(Buffer.from([1, 0, 2, 0, 3, 0])); // three samples
    } else res.writeHead(404).end();
  });
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', () => r()));
  const port = (server.address() as any).port;
  return { calls, spoken, url: `http://127.0.0.1:${port}`, close: () => server.close() };
}

export function fakeDevice(port: number, behave: (a: any) => { status: string; reason?: string; data?: any }, delayMs = 150) {
  const ws = new WebSocket(`ws://127.0.0.1:${port}/device`);
  const got: (any & { at: number })[] = [];
  ws.on('message', (raw) => {
    const m = JSON.parse(raw.toString());
    got.push({ ...m, at: performance.now() });
    if (m.type === 'action') {
      ws.send(JSON.stringify({ type: 'event', name: 'action_started', data: { id: m.id, plan_ms: 3, path_m: 2.4 } }));
      setTimeout(() => ws.readyState === ws.OPEN && ws.send(JSON.stringify({ type: 'action_result', id: m.id, ...behave(m) })), delayMs);
    }
  });
  const waitFor = async (pred: (m: any) => boolean, ms = 4000) => {
    const until = Date.now() + ms;
    for (;;) {
      const hit = got.find(pred);
      if (hit) return hit;
      if (Date.now() > until) throw new Error('timeout; got ' + JSON.stringify(got.map((g) => g.type + ':' + (g.action ?? g.text ?? ''))));
      await sleep(10);
    }
  };
  const send = (m: any) => ws.send(JSON.stringify(m));
  const ready = (async () => {
    await new Promise<void>((r) => ws.on('open', () => r()));
    await waitFor((m) => m.type === 'ready');
    send({ type: 'hello', protocol: 1, device: 'test', capabilities: { vision: false } });
    send({ type: 'world', world: WORLD });
    await sleep(30);
  })();
  return { ws, got, waitFor, send, ready };
}

export const opts = (cloud: { url: string }, extra: Partial<ServerOptions> = {}): ServerOptions => ({
  port: 0, brain: 'claude', anthropicKey: 'test-key', anthropicBaseUrl: cloud.url, ttsBaseUrl: cloud.url,
  realtimeModel: 'x', realtimeVoice: 'v', visionModel: 'x', memoryPath: null, quiet: true, ...extra,
});

