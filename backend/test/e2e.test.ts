import assert from 'node:assert/strict';
import { test } from 'node:test';
import WebSocket, { WebSocketServer } from 'ws';
import { Memory } from '../src/memory.js';
import type { WorldSnapshot } from '../src/protocol.js';
import { startServer, type ServerOptions } from '../src/server.js';
import { SkillExecutor } from '../src/skills.js';
import { WorldModel } from '../src/world.js';

const WORLD: WorldSnapshot = {
  user: { pos: [0, 1.6, 0], fwd: [0, 0, 1] },
  avatar: { pos: [0, 0, 3], fwd: [0, 0, -1], state: 'idle' },
  objects: [
    { id: 'chair_1', label: 'chair', pos: [0.2, 0.4, 2], source: 'manual', confidence: 1, lastSeen: 3 },
    { id: 'table_1', label: 'table', pos: [-2, 0.4, 0], source: 'room_scan', confidence: 1, lastSeen: 3 },
  ],
};

const base: ServerOptions = { port: 0, brain: 'mock', realtimeModel: 'x', realtimeVoice: 'x', visionModel: 'x', memoryPath: null, autonomyIdleSec: 0, quiet: true };

/** Minimal headset: answers actions the way the Unity client does. */
function fakeDevice(port: number, behave: (action: any) => { status: string; reason?: string; data?: any }) {
  const ws = new WebSocket(`ws://127.0.0.1:${port}/device`);
  const got: any[] = [];
  const waiters: { pred: (m: any) => boolean; resolve: (m: any) => void }[] = [];
  ws.on('message', (raw) => {
    const m = JSON.parse(raw.toString());
    got.push(m);
    if (m.type === 'action') setTimeout(() => ws.send(JSON.stringify({ type: 'action_result', id: m.id, ...behave(m) })), 20);
    for (const w of [...waiters]) if (w.pred(m)) (waiters.splice(waiters.indexOf(w), 1), w.resolve(m));
  });
  const waitFor = (pred: (m: any) => boolean, ms = 3000) =>
    new Promise<any>((resolve, reject) => {
      const hit = got.find(pred);
      if (hit) return resolve(hit);
      const t = setTimeout(() => reject(new Error('timeout waiting for message; got ' + JSON.stringify(got))), ms);
      waiters.push({ pred, resolve: (m) => (clearTimeout(t), resolve(m)) });
    });
  const send = (m: any) => ws.send(JSON.stringify(m));
  const open = new Promise<void>((r) => ws.on('open', () => r()));
  return { ws, got, waitFor, send, open };
}

test('world model: bearings, gaze target and truthful origins', () => {
  const w = new WorldModel();
  w.update(WORLD);
  assert.equal(WorldModel.bearing(WORLD.user, [0, 0, 5]), 'straight ahead');
  assert.equal(WorldModel.bearing(WORLD.user, [5, 0, 0]), 'to the right');
  assert.equal(WorldModel.bearing(WORLD.user, [-5, 0, 0]), 'to the left');
  assert.equal(WorldModel.bearing(WORLD.user, [0, 0, -5]), 'behind');
  assert.equal(w.gazeTarget()?.id, 'chair_1');
  const d = w.describe() as any;
  assert.match(d.objects[0].origin, /not camera detection/);
  assert.ok(!JSON.stringify(d).includes('"pos"'), 'no raw coordinates go to the model');
});

test('mock brain end to end: speech -> skill -> device action -> feedback', async () => {
  const srv = await startServer(base);
  const dev = fakeDevice(srv.port, (a) => (a.action === 'approach_user' ? { status: 'succeeded', data: { metres_from_user: 1.2 } } : { status: 'failed', reason: 'no path' }));
  await dev.open;
  await dev.waitFor((m) => m.type === 'ready');
  dev.send({ type: 'hello', protocol: 1, device: 'test', capabilities: { vision: false } });
  dev.send({ type: 'world', world: WORLD });

  dev.send({ type: 'text', text: 'Hey, can you come over here?' });
  const action = await dev.waitFor((m) => m.type === 'action');
  assert.equal(action.action, 'approach_user');
  assert.equal(action.status, 'requested');
  await dev.waitFor((m) => m.type === 'transcript' && m.role === 'assistant' && /Of course/.test(m.text));
  await dev.waitFor((m) => m.type === 'transcript' && /Done: approach_user/.test(m.text));

  // Failure is reported, not hidden.
  dev.send({ type: 'text', text: 'go check out the chair' });
  const a2 = await dev.waitFor((m) => m.type === 'action' && m.action === 'inspect_object');
  assert.equal(a2.target_id, 'chair_1');
  await dev.waitFor((m) => m.type === 'transcript' && /didn't work: no path/.test(m.text));

  dev.ws.close();
  await srv.close();
});

test('skills: unknown targets never reach the device; composite skills run and are remembered', async () => {
  const world = new WorldModel();
  world.update(WORLD);
  const memory = new Memory(null);
  const sent: any[] = [];
  const exec = new SkillExecutor(
    {
      capabilities: { vision: false },
      request: async (action, target_id) => {
        sent.push({ action, target_id });
        return { type: 'action_result', id: 'x', status: 'succeeded' };
      },
    },
    world,
    memory,
  );
  const feedback: any[] = [];
  exec.onFeedback = (o) => feedback.push(o);

  const bad = await exec.execute('walk_to', { target_id: 'sofa_9' });
  assert.equal(bad.status, 'failed');
  assert.match(String(bad.reason), /Known ids: chair_1, table_1/);
  assert.equal(sent.length, 0);

  const noCam = await exec.execute('scan_surroundings', {});
  assert.equal(noCam.status, 'failed');
  assert.equal(sent.length, 0);

  const notPrimitive = await exec.execute('save_skill', { name: 'x', description: '', steps: [{ skill: 'rm_rf', target: '/' }] });
  assert.equal(notPrimitive.status, 'failed');

  assert.equal((await exec.execute('save_skill', { name: 'approach_object', description: 'walk up and face it', steps: [{ skill: 'walk_to', target: '$target' }, { skill: 'look_at', target: '$target' }] })).status, 'succeeded');
  assert.equal((await exec.execute('run_skill', { name: 'approach_object', target_id: 'table_1' })).status, 'started');
  await new Promise((r) => setTimeout(r, 30));
  assert.deepEqual(sent, [
    { action: 'walk_to', target_id: 'table_1' },
    { action: 'look_at', target_id: 'table_1' },
  ]);
  assert.equal(feedback[0].status, 'succeeded');
  assert.equal(memory.data.learnedSkills.approach_object.successes, 1);
  assert.match(memory.summary(), /approach_object/);
});

test('realtime brain: tool call round trip against a fake Realtime upstream', async () => {
  // Fake OpenAI Realtime server: on user text, emit a function call; after the tool output, emit audio.
  const upstream = new WebSocketServer({ port: 0 });
  const upstreamGot: any[] = [];
  upstream.on('connection', (ws) => {
    let turn = 0;
    ws.on('message', (raw) => {
      const ev = JSON.parse(raw.toString());
      upstreamGot.push(ev);
      if (ev.type !== 'response.create') return;
      turn++;
      ws.send(JSON.stringify({ type: 'response.created' }));
      if (turn === 1) ws.send(JSON.stringify({ type: 'response.done', response: { status: 'completed', output: [{ type: 'function_call', name: 'walk_to', call_id: 'c1', arguments: '{"target_id":"chair_1"}' }] } }));
      else {
        ws.send(JSON.stringify({ type: 'response.output_audio.delta', delta: 'AAAA' }));
        ws.send(JSON.stringify({ type: 'response.output_audio_transcript.done', transcript: `turn ${turn}` }));
        ws.send(JSON.stringify({ type: 'response.done', response: { status: 'completed', output: [{ type: 'message' }] } }));
      }
    });
  });
  const upPort = (upstream.address() as any).port;
  const srv = await startServer({ ...base, brain: 'realtime', apiKey: 'test-key', realtimeUrl: `ws://127.0.0.1:${upPort}` });
  const dev = fakeDevice(srv.port, () => ({ status: 'succeeded', data: { metres_from_target: 0.7 } }));
  await dev.open;
  await dev.waitFor((m) => m.type === 'ready');
  dev.send({ type: 'hello', protocol: 1, device: 'test', capabilities: {} });
  dev.send({ type: 'world', world: WORLD });
  await new Promise((r) => setTimeout(r, 50));
  dev.send({ type: 'text', text: 'go to the chair' });

  const action = await dev.waitFor((m) => m.type === 'action');
  assert.equal(action.action, 'walk_to');
  assert.equal(action.target_id, 'chair_1');
  await dev.waitFor((m) => m.type === 'audio' && m.pcm16 === 'AAAA'); // acknowledgement speech
  await dev.waitFor((m) => m.type === 'transcript' && m.text === 'turn 3'); // reaction to [action_result]

  const session = upstreamGot.find((e) => e.type === 'session.update');
  assert.ok(session.session.tools.some((t: any) => t.name === 'walk_to'));
  const toolOut = upstreamGot.find((e) => e.item?.type === 'function_call_output');
  assert.equal(JSON.parse(toolOut.item.output).status, 'started');
  const fb = upstreamGot.find((e) => e.item?.content?.[0]?.text?.startsWith('[action_result]'));
  assert.match(fb.item.content[0].text, /"status":"succeeded"/);
  assert.ok(upstreamGot.filter((e) => e.type === 'session.update').some((e) => /chair_1: a chair, registered by the user/.test(e.session.instructions)));

  dev.ws.close();
  await srv.close();
  upstream.close();
});
