import assert from 'node:assert/strict';
import { test } from 'node:test';
import { startServer } from '../src/server.js';
import { begin, end, fakeCloud, fakeDevice, opts, sleep, sse, textBlock, toolBlock } from './helpers.js';
import { SentenceChunker } from '../src/speech.js';

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
  assert.match(result.content, /Known ids: chair_1, table_1/);
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
