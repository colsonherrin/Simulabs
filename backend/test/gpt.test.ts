// The OpenAI-model mind ('gpt' brain) and plain-HTTPS hearing, against stand-in services.
// The same path was also run against the real OpenAI API (see docs/FULL_SYSTEM_AUDIT.md).
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { test } from 'node:test';
import { Ears } from '../src/speech.js';
import { startServer } from '../src/server.js';
import { fakeDevice, opts, sleep } from './helpers.js';

function standIn() {
  const requests: any[] = [];
  const uploads: number[] = [];
  const server = createServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const body = Buffer.concat(chunks);
      if (req.url === '/audio/speech') return void res.writeHead(200, { 'content-type': 'audio/pcm' }).end(Buffer.alloc(4800));
      if (req.url === '/audio/transcriptions') {
        uploads.push(body.length);
        return void res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ text: 'come over here' }));
      }
      const json = JSON.parse(body.toString());
      requests.push(json);
      res.writeHead(200, { 'content-type': 'text/event-stream' });
      const send = (delta: object) => res.write(`data: ${JSON.stringify({ choices: [{ delta }] })}\n\n`);
      if (requests.length === 1) {
        // The tool call arrives in pieces, as the real API streams it.
        send({ tool_calls: [{ index: 0, id: 'call_1', type: 'function', function: { name: 'approach_user', arguments: '' } }] });
        send({ tool_calls: [{ index: 0, function: { arguments: '{"say":"On ' } }] });
        send({ tool_calls: [{ index: 0, function: { arguments: 'my way."}' } }] });
      } else send({ content: 'Here I am.' });
      res.end('data: [DONE]\n\n');
    });
  });
  return new Promise<{ url: string; requests: any[]; uploads: number[]; close: () => void }>((r) => server.listen(0, '127.0.0.1', () => r({ url: `http://127.0.0.1:${(server.address() as any).port}`, requests, uploads, close: () => server.close() })));
}

test('gpt brain: a streamed tool call moves the body, speaks its line, and the result comes back as the next turn', async () => {
  const cloud = await standIn();
  const { port, close } = await startServer(opts({ url: cloud.url }, { brain: 'gpt', apiKey: 'k', gptBaseUrl: cloud.url }));
  const dev = fakeDevice(port, () => ({ status: 'succeeded', data: { metres_from_target: 1.2 } }));
  try {
    await dev.ready;
    assert.equal(dev.got.find((m) => m.type === 'ready').brain, 'gpt');
    dev.send({ type: 'text', text: 'Hey, come over here.' });
    const action = await dev.waitFor((m) => m.type === 'action');
    assert.equal(action.action, 'approach_user');
    assert.equal(action.params?.say, undefined, 'the spoken line is not passed to the body');
    await dev.waitFor((m) => m.type === 'transcript' && m.text === 'On my way.');
    await dev.waitFor((m) => m.type === 'audio');
    await dev.waitFor((m) => m.type === 'transcript' && m.text === 'Here I am.');

    const [first, second] = cloud.requests;
    assert.equal(first.messages[0].role, 'system');
    assert.match(first.messages[1].content, /\[context\][\s\S]*chair_1[\s\S]*\[user said\] Hey, come over here\./);
    assert.ok(first.tools.some((t: any) => t.function.name === 'run_sequence') && !first.tools.some((t: any) => t.function.name === 'get_world_state'));
    // Second request: the assistant's call, its tool result, then the action's outcome as an event.
    const roles = second.messages.map((m: any) => m.role);
    assert.deepEqual(roles, ['system', 'user', 'assistant', 'tool', 'user']);
    assert.equal(second.messages[3].tool_call_id, 'call_1');
    assert.match(second.messages[4].content, /\[action_result\]/);
  } finally {
    dev.ws.close();
    await close();
    cloud.close();
  }
});

test('hearing over plain HTTPS: silence is ignored, an utterance is uploaded once and transcribed', async () => {
  const cloud = await standIn();
  const ears = new Ears({ apiKey: 'k', model: 'x', transcribeModel: 'stt', mode: 'http', httpBaseUrl: cloud.url }, () => {});
  const events: string[] = [];
  ears.onSpeechStart = () => events.push('start');
  ears.onSpeechEnd = () => events.push('end');
  ears.onTranscript = (t) => events.push('text:' + t);
  await ears.start();
  const frame = (amplitude: number) => {
    const b = Buffer.alloc(2880); // 60 ms at 24 kHz
    for (let i = 0; i < 1440; i++) b.writeInt16LE(Math.round(Math.sin(i * 0.2) * amplitude * 32767), i * 2);
    return b.toString('base64');
  };
  for (let i = 0; i < 20; i++) ears.audio(frame(0.002)); // room noise
  assert.equal(events.length, 0);
  for (let i = 0; i < 2; i++) ears.audio(frame(0.3)); // a click: too short to be speech once it ends
  for (let i = 0; i < 12; i++) ears.audio(frame(0.002));
  for (let i = 0; i < 15; i++) ears.audio(frame(0.3)); // 0.9 s of speech
  for (let i = 0; i < 12; i++) ears.audio(frame(0.002));
  await sleep(200);
  assert.deepEqual(events.filter((e) => e.startsWith('text')), ['text:come over here']);
  assert.equal(cloud.uploads.length, 1, 'the click was not uploaded');
  assert.ok(cloud.uploads[0] > 15 * 2880, 'the whole utterance was sent');
  ears.close();
  cloud.close();
});

test('with the live speech-to-speech service unreachable, the session falls back to the audio mind', async () => {
  const cloud = await standIn();
  const { port, close } = await startServer(opts({ url: cloud.url }, { brain: 'realtime', apiKey: 'k', gptBaseUrl: cloud.url, realtimeUrl: 'ws://127.0.0.1:9' }));
  const dev = fakeDevice(port, () => ({ status: 'succeeded' }));
  try {
    await dev.ready;
    assert.equal(dev.got.find((m) => m.type === 'ready').brain, 'audio');
    dev.send({ type: 'text', text: 'Hey, come over here.' });
    assert.equal((await dev.waitFor((m) => m.type === 'action')).action, 'approach_user');
    assert.equal(cloud.requests[0].model, 'gpt-audio-mini');
    assert.deepEqual(cloud.requests[0].modalities, ['text', 'audio']);
  } finally {
    dev.ws.close();
    await close();
    cloud.close();
  }
});

test('audio mind: answers early, throws the early answer away if the user keeps talking, and obeys short commands by reflex', async () => {
  const cloud = await standIn();
  const { port, close } = await startServer(opts({ url: cloud.url }, { brain: 'audio', apiKey: 'k', gptBaseUrl: cloud.url }));
  const dev = fakeDevice(port, () => ({ status: 'succeeded' }), 400);
  const frame = (amplitude: number) => {
    const b = Buffer.alloc(2880); // 60 ms
    for (let i = 0; i < 1440; i++) b.writeInt16LE(Math.round(Math.sin(i * 0.2) * amplitude * 32767), i * 2);
    return { type: 'audio', pcm16: b.toString('base64') };
  };
  const play = async (amplitude: number, frames: number) => {
    for (let i = 0; i < frames; i++) {
      dev.send(frame(amplitude));
      await sleep(15);
    }
  };
  try {
    await dev.ready;
    assert.equal(dev.got.find((m) => m.type === 'ready').brain, 'audio');
    await play(0.002, 10);
    await play(0.3, 10); // speech
    await play(0.002, 3); // a short pause: the answer is begun early ...
    await sleep(150);
    assert.equal(cloud.requests.length, 1, 'a request went out before the pause was long enough to be sure');
    assert.equal(cloud.requests[0].messages.at(-1).content[1].type, 'input_audio');
    assert.ok(!dev.got.some((m) => m.type === 'action' || m.type === 'audio'), '... but nothing of it reaches the headset yet');
    await play(0.3, 10); // ... and the user keeps talking: it is thrown away
    await play(0.002, 8); // now the turn really ends
    const action = await dev.waitFor((m) => m.type === 'action');
    // The stand-in transcribes everything as "come over here": the reflex obeys, and the model's own call is not run twice.
    assert.equal(action.action, 'approach_user');
    await sleep(300);
    assert.equal(dev.got.filter((m) => m.type === 'action').length, 1);
    const last = cloud.requests.at(-1).messages.filter((m: any) => m.role === 'user');
    assert.equal(last.length, 1, 'the discarded early turn left no trace in the conversation');
    assert.ok(cloud.uploads.length >= 1);
  } finally {
    dev.ws.close();
    await close();
    cloud.close();
  }
});
