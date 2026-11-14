import assert from 'node:assert/strict';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { test } from 'node:test';
import WebSocket from 'ws';
import type { WorldSnapshot } from '../src/protocol.js';
import { startServer, type ServerOptions } from '../src/server.js';
import { SentenceChunker } from '../src/speech.js';

const WORLD: WorldSnapshot = {
  user: { pos: [0, 1.6, 0], fwd: [0, 0, 1] },
  avatar: { pos: [0, 0, 3], fwd: [0, 0, -1], state: 'idle' },
  objects: [{ id: 'chair_1', label: 'chair', pos: [0.2, 0.4, 2], source: 'manual', confidence: 1, lastSeen: 3 }],
  room: { source: 'room_scan', floorY: 0, obstacles: 1, navmesh: true },
};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Script = (res: ServerResponse, body: any) => Promise<void>;
const sse = (res: ServerResponse, type: string, data: object) => res.write(`event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`);
const begin = (res: ServerResponse) => {
  res.writeHead(200, { 'content-type': 'text/event-stream' });
  sse(res, 'message_start', { message: { id: 'msg_1', type: 'message', role: 'assistant', model: 'claude-opus-5-5', content: [], stop_reason: null, stop_sequence: null, usage: { input_tokens: 10, output_tokens: 1 } } });
};
const end = (res: ServerResponse, stop_reason: string) => {
  sse(res, 'message_delta', { delta: { stop_reason, stop_sequence: null }, usage: { output_tokens: 5 } });
  sse(res, 'message_stop', {});
  res.end();
};
const toolBlock = (res: ServerResponse, index: number, id: string, name: string, input: object) => {
  const json = JSON.stringify(input);
  sse(res, 'content_block_start', { index, content_block: { type: 'tool_use', id, name, input: {} } });
  sse(res, 'content_block_delta', { index, delta: { type: 'input_json_delta', partial_json: json.slice(0, 5) } });
  sse(res, 'content_block_delta', { index, delta: { type: 'input_json_delta', partial_json: json.slice(5) } });
  sse(res, 'content_block_stop', { index });
};
const textBlock = (res: ServerResponse, index: number, text: string) => {
  sse(res, 'content_block_start', { index, content_block: { type: 'text', text: '' } });
  sse(res, 'content_block_delta', { index, delta: { type: 'text_delta', text } });
  sse(res, 'content_block_stop', { index });
};

/** Fake Anthropic Messages API + fake text-to-speech endpoint on one port. */
async function fakeCloud(scripts: Script[]) {
  const calls: { body: any; startedAt: number; endedAt?: number }[] = [];
  const spoken: string[] = [];
  const read = (req: IncomingMessage) => new Promise<any>((resolve) => { let d = ''; req.on('data', (c) => (d += c)); req.on('end', () => resolve(JSON.parse(d || '{}'))); });
  const server = createServer(async (req, res) => {
    const body = await read(req);
    if (req.url?.startsWith('/v1/messages')) {
      const call = { body, startedAt: performance.now() } as (typeof calls)[number];
      calls.push(call);
      const script = scripts[calls.length - 1];
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

function fakeDevice(port: number, behave: (a: any) => { status: string; reason?: string; data?: any }, delayMs = 150) {
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

const opts = (cloud: { url: string }): ServerOptions => ({
  port: 0, brain: 'claude', anthropicKey: 'test-key', anthropicBaseUrl: cloud.url, ttsBaseUrl: cloud.url,
  realtimeModel: 'x', realtimeVoice: 'v', visionModel: 'x', memoryPath: null, autonomyIdleSec: 0, quiet: true,
});

test('"come over here": action is dispatched mid-stream, one call to start, one on completion', async () => {
  const cloud = await fakeCloud([
    async (res) => {
      begin(res);
      toolBlock(res, 0, 'toolu_1', 'approach_user', { say: 'Of course.' });
      await sleep(500); // the model is still "generating"; the body must not wait for this
      end(res, 'tool_use');
    },
    async (res) => {
      begin(res);
      textBlock(res, 0, 'Here I am. What did you want to show me?');
      end(res, 'end_turn');
    },
  ]);
  const srv = await startServer(opts(cloud));
  const dev = fakeDevice(srv.port, () => ({ status: 'succeeded', data: { metres_from_target: 1.2 } }), 900);
  await dev.ready;

  dev.send({ type: 'text', text: 'Hey, come over here.' });
  const action = await dev.waitFor((m) => m.type === 'action');
  assert.equal(action.action, 'approach_user');
  assert.ok(cloud.calls[0].endedAt === undefined, 'the action reached the headset while the model reply was still streaming');
  await dev.waitFor((m) => m.type === 'audio'); // "Of course." spoken without another model call
  assert.deepEqual(cloud.spoken, ['Of course.']);
  await sleep(600);
  assert.equal(cloud.calls.length, 1, 'no acknowledgement round trip while the avatar is walking');

  await dev.waitFor((m) => m.type === 'transcript' && /Here I am/.test(m.text));
  assert.equal(cloud.calls.length, 2);
  assert.deepEqual(cloud.spoken.slice(1), ['Here I am.', 'What did you want to show me?']);

  // Request shape: cached stable prefix, eager tool streaming, low effort, prefetched world, no world-query tool.
  const b0 = cloud.calls[0].body;
  assert.equal(b0.system[0].cache_control.type, 'ephemeral');
  assert.equal(b0.output_config.effort, 'low');
  assert.ok(b0.tools.every((t: any) => t.eager_input_streaming === true));
  assert.ok(!b0.tools.some((t: any) => t.name === 'get_world_state'));
  assert.ok(b0.tools.find((t: any) => t.name === 'follow_user').input_schema.properties.say);
  assert.match(b0.messages[0].content[0].text, /chair_1: chair, registered by the user/);
  assert.match(b0.messages[0].content[0].text, /\[user said\] Hey, come over here\./);
  // Second call carries the deferred tool result plus the completion event in one user message.
  const last = cloud.calls[1].body.messages.at(-1);
  assert.equal(last.role, 'user');
  assert.equal(last.content[0].type, 'tool_result');
  assert.equal(JSON.parse(last.content[0].content).status, 'started');
  assert.match(last.content.at(-1).text, /\[action_result\].*"status":"succeeded"/);

  // Latency record: speech-to-action path measured, with the headset's own planning time.
  const metrics: any = await (await fetch(`http://127.0.0.1:${srv.port}/metrics`)).json();
  const turn = metrics.turns[0];
  assert.ok(turn.ms.action_dispatched < 450, `dispatched at ${turn.ms.action_dispatched}ms, before the reply finished`);
  assert.ok(turn.ms.device_started >= turn.ms.action_dispatched);
  assert.equal(turn.plan_ms, 3);
  assert.equal(turn.llm_calls, 1);
  assert.ok(dev.got.some((m) => m.type === 'metrics'));

  dev.ws.close();
  await srv.close();
  cloud.close();
});

test('a refused action is reported back immediately and its "say" line is never spoken', async () => {
  const cloud = await fakeCloud([
    async (res) => { begin(res); toolBlock(res, 0, 'toolu_1', 'walk_to', { target_id: 'sofa_9', say: 'On my way.' }); end(res, 'tool_use'); },
    async (res) => { begin(res); textBlock(res, 0, "I don't know where the sofa is. Can you look at it and tell me?"); end(res, 'end_turn'); },
  ]);
  const srv = await startServer(opts(cloud));
  const dev = fakeDevice(srv.port, () => ({ status: 'succeeded' }));
  await dev.ready;
  dev.send({ type: 'text', text: 'go to the sofa' });
  await dev.waitFor((m) => m.type === 'transcript' && /don't know where the sofa/.test(m.text));
  assert.ok(!dev.got.some((m) => m.type === 'action'), 'nothing was sent to the body');
  assert.ok(!cloud.spoken.includes('On my way.'));
  const result = cloud.calls[1].body.messages.at(-1).content[0];
  assert.equal(result.is_error, true);
  assert.match(result.content, /Known ids: chair_1/);
  dev.ws.close();
  await srv.close();
  cloud.close();
});

test('barge-in aborts the call in flight and the next call knows what was interrupted', async () => {
  const cloud = await fakeCloud([
    async (res) => {
      begin(res);
      sse(res, 'content_block_start', { index: 0, content_block: { type: 'text', text: '' } });
      sse(res, 'content_block_delta', { index: 0, delta: { type: 'text_delta', text: 'Let me tell you a long story. ' } });
      await sleep(1500);
      end(res, 'end_turn');
    },
    async (res) => { begin(res); toolBlock(res, 0, 'toolu_2', 'stop_moving', { say: 'Okay.' }); end(res, 'tool_use'); },
  ]);
  const srv = await startServer(opts(cloud));
  const dev = fakeDevice(srv.port, () => ({ status: 'succeeded' }), 10);
  await dev.ready;
  dev.send({ type: 'text', text: 'tell me a story' });
  await dev.waitFor((m) => m.type === 'audio');
  dev.send({ type: 'text', text: 'actually never mind' });
  await dev.waitFor((m) => m.type === 'audio_stop' && m.at > dev.got.find((g) => g.type === 'audio')!.at);
  await dev.waitFor((m) => m.type === 'action' && m.action === 'stop');
  const msgs = cloud.calls[1].body.messages;
  assert.ok(msgs.every((m: any) => m.role === 'user'), 'the aborted partial reply was not kept');
  assert.match(JSON.stringify(msgs.at(-1)), /interrupted mid-reply; you had begun saying: \\"Let me tell you a long story\./);
  assert.match(JSON.stringify(msgs.at(-1)), /\[user said\] actually never mind/);
  dev.ws.close();
  await srv.close();
  cloud.close();
});

test('sentence chunker emits sentences as they complete', () => {
  const out: string[] = [];
  const c = new SentenceChunker((s) => out.push(s));
  for (const d of ['Sure', ', on my way. It is 3', '.5 metres. Almost', ' there']) c.push(d);
  assert.deepEqual(out, ['Sure, on my way.', 'It is 3.5 metres.']);
  c.flush();
  assert.deepEqual(out.at(-1), 'Almost there');
});
