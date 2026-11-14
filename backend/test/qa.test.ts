// Targeted QA tests for the full-system audit. Real backend, real WebSockets, real HTTP;
// only the cloud services (Claude, speech-to-text, text-to-speech) and the headset are stand-ins.
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { WebSocketServer } from 'ws';
import { startServer } from '../src/server.js';
import { WorldModel } from '../src/world.js';
import { begin, end, fakeCloud, fakeDevice, opts, sleep, sse, textBlock, toolBlock, WORLD, type Script } from './helpers.js';

const say = (text: string): Script => async (res) => { begin(res); textBlock(res, 0, text); end(res, 'end_turn'); };
const call = (name: string, input: object): Script => async (res) => { begin(res); toolBlock(res, 0, 'toolu_' + Math.random().toString(36).slice(2), name, input); end(res, 'tool_use'); };

test('Q27 tool arguments are checked before anything reaches the body', async () => {
  const bad: Script[] = [
    call('gesture', { type: 'backflip' }), // not in the enum
    call('walk_to', {}), // missing required target_id
    call('teleport', { x: 1, y: 2, z: 3 }), // no such skill, raw coordinates
    async (res) => { // malformed JSON
      begin(res);
      sse(res, 'content_block_start', { index: 0, content_block: { type: 'tool_use', id: 'toolu_x', name: 'walk_to', input: {} } });
      sse(res, 'content_block_delta', { index: 0, delta: { type: 'input_json_delta', partial_json: '{"target_id": "chair_1' } });
      sse(res, 'content_block_stop', { index: 0 });
      end(res, 'tool_use');
    },
    call('walk_to', { target_id: [1, 2, 3] }), // wrong type
  ];
  const cloud = await fakeCloud((n) => (n % 2 === 0 ? bad[n / 2] : say('Sorry, I cannot do that.')));
  const srv = await startServer(opts(cloud));
  const dev = fakeDevice(srv.port, () => ({ status: 'succeeded' }));
  await dev.ready;
  for (let i = 0; i < bad.length; i++) {
    dev.send({ type: 'text', text: `attempt number ${i}` });
    await dev.waitFor(() => cloud.calls.length >= (i + 1) * 2);
    await sleep(40);
    const result = cloud.calls[i * 2 + 1].body.messages.at(-1).content[0];
    assert.equal(result.type, 'tool_result');
    assert.equal(result.is_error, true, `case ${i} must be rejected: ${result.content}`);
  }
  assert.ok(!dev.got.some((m) => m.type === 'action'), 'no invalid call produced a device action');
  dev.ws.close(); await srv.close(); cloud.close();
});

test('Q28/Q29 a three-step task is one model call; it is saved, generalised and reused on another object', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'sim-'));
  const memoryPath = join(dir, 'memory.json');
  const cloud = await fakeCloud([
    call('run_sequence', { say: 'Sure, back in a moment.', save_as: 'visit_and_return', steps: [{ skill: 'walk_to', target: 'chair_1' }, { skill: 'look_at', target: 'chair_1' }, { skill: 'approach_user' }] }),
    say('Done. It looks comfortable.'),
    call('run_skill', { name: 'visit_and_return', target_id: 'table_1', say: 'Same thing for the table.' }),
    say('Back again.'),
  ]);
  const srv = await startServer(opts(cloud, { memoryPath }));
  const dev = fakeDevice(srv.port, () => ({ status: 'succeeded' }), 120);
  await dev.ready;

  dev.send({ type: 'text', text: 'Walk over to the chair, look at it, and come back.' });
  await dev.waitFor((m) => m.type === 'transcript' && /Done\./.test(m.text));
  const first = dev.got.filter((m) => m.type === 'action').map((m) => `${m.action}:${m.target_id ?? ''}`);
  assert.deepEqual(first, ['walk_to:chair_1', 'look_at:chair_1', 'approach_user:']);
  assert.equal(cloud.calls.length, 2, 'one call to start three movements, one when all three were done');
  const event = cloud.calls[1].body.messages.at(-1).content.at(-1).text;
  assert.match(event, /\[action_result\].*"status":"succeeded".*"steps":\[/);

  const saved = JSON.parse(readFileSync(memoryPath, 'utf8')).learnedSkills.visit_and_return;
  assert.deepEqual(saved.steps.map((s: any) => s.target), ['$target', '$target', undefined], 'stored with a placeholder, not as chat history');

  dev.send({ type: 'text', text: 'Do that again for the table.' });
  await dev.waitFor((m) => m.type === 'transcript' && /Back again/.test(m.text));
  assert.match(cloud.calls[2].body.messages.at(-1).content.at(-1).text, /visit_and_return: .*worked 1\/1 times/, 'the saved skill is shown to the model on later turns');
  assert.deepEqual(dev.got.filter((m) => m.type === 'action').slice(3).map((m) => `${m.action}:${m.target_id ?? ''}`), ['walk_to:table_1', 'look_at:table_1', 'approach_user:']);
  assert.equal(cloud.calls.length, 4);
  dev.ws.close(); await srv.close(); cloud.close();
});

test('Q33 "stop" halts a running sequence at once, locally, before any model call', async () => {
  const cloud = await fakeCloud([
    call('run_sequence', { steps: [{ skill: 'walk_to', target: 'chair_1' }, { skill: 'walk_to', target: 'table_1' }, { skill: 'approach_user' }] }),
    async (res) => { await sleep(400); await say('Okay, stopped.')(res, {}); }, // the model is slow; the body must not wait for it
  ]);
  const srv = await startServer(opts(cloud));
  const dev = fakeDevice(srv.port, (a) => (a.action === 'stop' ? { status: 'succeeded' } : { status: 'failed', reason: 'stopped' }), 300);
  await dev.ready;
  dev.send({ type: 'text', text: 'Go to the chair, then the table, then come back.' });
  await dev.waitFor((m) => m.type === 'action' && m.action === 'walk_to');
  const t0 = performance.now();
  dev.send({ type: 'text', text: 'Stop!' });
  const stop = await dev.waitFor((m) => m.type === 'action' && m.action === 'stop');
  assert.ok(stop.at - t0 < 100, `stop reached the headset in ${Math.round(stop.at - t0)} ms`);
  assert.ok(cloud.calls[1] === undefined || cloud.calls[1].endedAt === undefined, 'stop was sent before the model answered');
  await dev.waitFor((m) => m.type === 'transcript' && /stopped/.test(m.text));
  await sleep(500);
  assert.deepEqual(dev.got.filter((m) => m.type === 'action').map((m) => m.action), ['walk_to', 'stop'], 'remaining steps were never sent');
  dev.ws.close(); await srv.close(); cloud.close();
});

test('Q30 a failing action cannot become a loop of model calls', async () => {
  // A stubborn model that retries the same walk forever.
  const cloud = await fakeCloud(() => call('walk_to', { target_id: 'chair_1', say: 'Trying again.' }));
  const srv = await startServer(opts(cloud));
  const dev = fakeDevice(srv.port, () => ({ status: 'failed', reason: 'no clear path to that spot' }), 20);
  await dev.ready;
  dev.send({ type: 'text', text: 'go to the chair' });
  await sleep(2500);
  const walks = dev.got.filter((m) => m.type === 'action').length;
  assert.equal(walks, 2, 'the body is asked twice, then the breaker refuses');
  assert.ok(cloud.calls.length <= 8, `model calls are bounded (${cloud.calls.length})`);
  const lastResult = cloud.calls.at(-1)!.body.messages.at(-1).content[0];
  assert.match(lastResult.content, /failed 2 times in a row.*Do not try it again/);
  const n = cloud.calls.length;
  await sleep(600);
  assert.equal(cloud.calls.length, n, 'and then it stops calling');
  dev.ws.close(); await srv.close(); cloud.close();
});

test('Q31/Q35 noise does not cut the character off or drop a request; voice turns are timed from end of speech', async () => {
  // Stand-in speech-to-text service.
  const stt = new WebSocketServer({ port: 0 });
  let sttSocket: import('ws').WebSocket | undefined;
  let audioFrames = 0;
  stt.on('connection', (ws) => { sttSocket = ws; ws.on('message', (raw) => { if (JSON.parse(raw.toString()).type === 'input_audio_buffer.append') audioFrames++; }); });
  const emit = (ev: object) => sttSocket!.send(JSON.stringify(ev));

  const cloud = await fakeCloud([
    async (res) => { begin(res); textBlock(res, 0, 'Let me think about that for a while. '); await sleep(700); textBlock(res, 1, 'Here is the answer.'); end(res, 'end_turn'); },
    say('Coming.'),
  ]);
  const srv = await startServer(opts(cloud, { apiKey: 'k', realtimeUrl: `ws://127.0.0.1:${(stt.address() as any).port}` }));
  const dev = fakeDevice(srv.port, () => ({ status: 'succeeded' }));
  await dev.ready;
  dev.send({ type: 'audio', pcm16: 'AAAA' });
  await sleep(30);
  assert.equal(audioFrames, 1, 'microphone audio is forwarded to speech-to-text');

  emit({ type: 'input_audio_buffer.speech_started' });
  emit({ type: 'input_audio_buffer.speech_stopped' });
  emit({ type: 'conversation.item.input_audio_transcription.completed', transcript: 'What is that?' });
  await dev.waitFor((m) => m.type === 'audio');
  const stopsBefore = dev.got.filter((m) => m.type === 'audio_stop').length;

  // A door slams while the character is answering: speech "starts", and the transcript is junk.
  emit({ type: 'input_audio_buffer.speech_started' });
  emit({ type: 'input_audio_buffer.speech_stopped' });
  emit({ type: 'conversation.item.input_audio_transcription.completed', transcript: '.' });
  await dev.waitFor((m) => m.type === 'transcript' && /Here is the answer/.test(m.text));
  assert.equal(dev.got.filter((m) => m.type === 'audio_stop').length, stopsBefore, 'noise did not cut the reply');
  assert.equal(cloud.calls.length, 1, 'noise did not abort or restart the reasoning call');

  // Real words do interrupt.
  emit({ type: 'input_audio_buffer.speech_started' });
  await sleep(120);
  emit({ type: 'input_audio_buffer.speech_stopped' });
  await sleep(80);
  emit({ type: 'conversation.item.input_audio_transcription.completed', transcript: 'Come over here.' });
  await dev.waitFor((m) => m.type === 'transcript' && /Coming/.test(m.text));
  assert.ok(dev.got.filter((m) => m.type === 'audio_stop').length > stopsBefore);
  await sleep(50);
  dev.send({ type: 'text', text: 'flush the turn record' });
  await sleep(100);
  const metrics: any = await (await fetch(`http://127.0.0.1:${srv.port}/metrics`)).json();
  const voice = metrics.turns.filter((t: any) => t.trigger === 'voice').at(-1);
  assert.ok(voice.ms.transcript >= 70, `speech-to-text delay is part of the record (${voice.ms.transcript} ms)`);
  assert.ok(voice.ms.llm_first_token >= voice.ms.transcript && voice.ms.first_audio >= voice.ms.llm_first_token);
  dev.ws.close(); await srv.close(); cloud.close(); stt.close();
});

test('Q43 headset disconnect mid-action and model API failures are survived without a restart', async () => {
  let fail = 2; // first request and its automatic retry both fail
  const cloud = await fakeCloud((n) => {
    if (fail > 0) { fail--; return async (res) => { res.writeHead(500, { 'content-type': 'application/json' }); res.end(JSON.stringify({ type: 'error', error: { type: 'api_error', message: 'boom' } })); }; }
    return n < 4 ? call('walk_to', { target_id: 'chair_1' }) : say('All good.');
  });
  const srv = await startServer(opts(cloud));

  const dev1 = fakeDevice(srv.port, () => ({ status: 'succeeded' }), 5000);
  await dev1.ready;
  dev1.send({ type: 'text', text: 'hello there' });
  const err = await dev1.waitFor((m) => m.type === 'log' && m.level === 'error', 8000);
  assert.match(err.message, /Claude API error 500/, 'the failure is reported to the headset HUD');
  dev1.send({ type: 'text', text: 'go to the chair' });
  await dev1.waitFor((m) => m.type === 'action');
  const body = cloud.calls.at(-1)!.body;
  assert.equal(body.messages[0].role, 'user');
  assert.match(JSON.stringify(body.messages), /hello there.*go to the chair/s, 'the request that failed is not lost from the conversation');
  dev1.ws.terminate(); // Wi-Fi drops while the avatar is walking
  await sleep(150);

  const dev2 = fakeDevice(srv.port, () => ({ status: 'succeeded' }), 20);
  await dev2.ready; // a fresh session is ready
  dev2.send({ type: 'text', text: 'are you still there' });
  await dev2.waitFor((m) => m.type === 'action' || (m.type === 'transcript' && m.role === 'assistant'));
  assert.equal((await (await fetch(`http://127.0.0.1:${srv.port}/health`)).json() as any).ok, true);
  dev2.ws.close(); await srv.close(); cloud.close();
});

test('Q18/Q19/Q20/Q26 the model sees current positions, object origins and room changes, never coordinates', async () => {
  const cloud = await fakeCloud(() => say('Noted.'));
  const srv = await startServer(opts(cloud, { worldEventMinGapSec: 0 }));
  const dev = fakeDevice(srv.port, () => ({ status: 'succeeded' }));
  await dev.ready;

  dev.send({ type: 'text', text: 'what is around' });
  await dev.waitFor(() => cloud.calls.length === 1);
  let ctx = cloud.calls[0].body.messages[0].content[0].text as string;
  assert.match(ctx, /chair_1: chair, registered by the user pointing at it \(not camera detection\)/);
  assert.match(ctx, /table_1: table, from the user's room setup scan \(not camera detection\)/);
  assert.match(ctx, /you: idle, 3\.0 m from the user, straight ahead of them/);
  assert.match(ctx, /user is looking toward: chair_1/);
  assert.ok(!/\[\s*-?\d+(\.\d+)?\s*,\s*-?\d/.test(ctx), 'no coordinate triples in the prompt');

  // The headset detects a bottle with its camera and the chair's position is refined; the user turns around.
  const moved = structuredClone(WORLD);
  moved.user.fwd = [0, 0, -1];
  moved.objects[0].pos = [0.2, 0.4, 2.6];
  moved.objects.push({ id: 'bottle_1', label: 'bottle', pos: [1, 0.8, 1], source: 'detected', confidence: 0.82, lastSeen: 4 });
  dev.send({ type: 'world', world: moved });
  await sleep(2500);
  assert.equal(cloud.calls.length, 1, 'noticing an object does not make the character speak up by itself');
  dev.send({ type: 'text', text: 'anything new?' });
  await dev.waitFor(() => cloud.calls.length === 2);
  ctx = cloud.calls[1].body.messages.at(-1).content.at(-1).text;
  assert.match(ctx, /\[world_event\] A new object is now known: bottle_1 \(bottle\)/);
  assert.match(ctx, /bottle_1: bottle, seen by the headset camera, .*last seen 4 s ago, confidence 0\.8/);
  assert.match(ctx, /chair_1: chair, .* 0\.4 m from you/, 'the refined position is used, same id');
  assert.match(ctx, /user is looking toward: nothing you know about/);

  // The object disappears from the device's world model.
  moved.objects.pop();
  dev.send({ type: 'world', world: moved });
  await sleep(100);
  dev.send({ type: 'text', text: 'and now?' });
  await dev.waitFor(() => cloud.calls.length === 3);
  ctx = cloud.calls[2].body.messages.at(-1).content.at(-1).text;
  assert.match(ctx, /Object bottle_1 is no longer known/);
  assert.ok(!/bottle_1: bottle/.test(ctx.split('[/context]')[0]), 'a removed object is not offered as a target');

  // The user walking away IS worth reacting to: it triggers one call without being asked.
  moved.user.pos = [0, 1.6, -4];
  dev.send({ type: 'world', world: moved });
  await dev.waitFor(() => cloud.calls.length === 4, 6000);
  assert.match(cloud.calls[3].body.messages.at(-1).content.at(-1).text, /\[world_event\] The user has moved away; they are now 7\.0 m from you/);
  dev.ws.close(); await srv.close(); cloud.close();
});

test('Q8 backend spatial descriptions follow Unity conventions (left-handed, y up)', () => {
  const w = new WorldModel();
  // User at origin facing +x. In Unity, with y up, the right-hand side of someone facing +x is -z.
  w.update({ user: { pos: [0, 1.6, 0], fwd: [1, 0, 0] }, avatar: { pos: [3, 0, 0], fwd: [-1, 0, 0], state: 'idle' }, objects: [
    { id: 'a', label: 'a', pos: [2, 0.5, -2], source: 'manual', confidence: 1, lastSeen: 0 },
    { id: 'b', label: 'b', pos: [2, 0.5, 2], source: 'manual', confidence: 1, lastSeen: 0 },
    { id: 'c', label: 'c', pos: [-3, 2.5, 0], source: 'manual', confidence: 1, lastSeen: 0 },
  ] });
  assert.equal(WorldModel.bearing(w.snapshot!.user, [2, 0.5, -2]), 'ahead-right');
  assert.equal(WorldModel.bearing(w.snapshot!.user, [2, 0.5, 2]), 'ahead-left');
  assert.equal(WorldModel.bearing(w.snapshot!.user, [-3, 2.5, 0]), 'behind');
  assert.match(w.contextText(), /you: idle, 3\.0 m from the user, straight ahead/);
  // Distances are measured along the floor: height differences do not count.
  assert.match(w.contextText(), /c: c, .* 6\.0 m from you, 3\.0 m from the user/);
});

test('Q45 ten minutes of conversation compressed: bounded history, bounded memory, no stale state', async () => {
  let maxMessages = 0;
  const cloud = await fakeCloud((n, body) => {
    maxMessages = Math.max(maxMessages, body.messages.length);
    assert.equal(body.messages[0].role, 'user');
    return n % 3 === 0 ? call('gesture', { type: 'nod', say: 'Sure.' }) : say(`Reply ${n}.`);
  });
  const srv = await startServer(opts(cloud));
  const dev = fakeDevice(srv.port, () => ({ status: 'succeeded' }), 1);
  await dev.ready;
  global.gc?.();
  const heap0 = process.memoryUsage().heapUsed;
  const TURNS = 300; // one utterance every two seconds for ten minutes
  for (let i = 0; i < TURNS; i++) {
    const calls = cloud.calls.length;
    const w = structuredClone(WORLD);
    w.avatar.pos = [0, 0, 3 - (i % 20) * 0.1];
    dev.send({ type: 'world', world: w });
    dev.send({ type: 'text', text: `question number ${i}` });
    await dev.waitFor(() => cloud.calls.length > calls && cloud.calls.at(-1)!.endedAt !== undefined, 5000);
  }
  await sleep(100);
  global.gc?.();
  const grown = (process.memoryUsage().heapUsed - heap0) / 1e6;
  assert.ok(maxMessages <= 42, `conversation sent to the model stays bounded (max ${maxMessages} messages)`);
  assert.ok(grown < 60, `heap grew ${grown.toFixed(1)} MB over ${TURNS} turns`);
  // World state in the last request is the last one sent, not a stale one.
  assert.match(cloud.calls.at(-1)!.body.messages.at(-1).content.at(-1).text, /you: idle, 1\.[0-9] m from the user/);
  const last = dev.got.filter((m) => m.type === 'transcript' && m.role === 'user').at(-1);
  assert.equal(last.text, `question number ${TURNS - 1}`);
  dev.ws.close(); await srv.close(); cloud.close();
});
