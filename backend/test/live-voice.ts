// Live check, not part of `npm test`: speaks a recorded sentence into the running backend as if
// it were the headset microphone and reports what the character heard, did and said.
//   npx tsx test/live-voice.ts <port> <speech.pcm (PCM16 mono 24 kHz)>
import { readFileSync } from 'node:fs';
import { fakeDevice, sleep } from './helpers.js';

const port = Number(process.argv[2]);
const pcm = readFileSync(process.argv[3]);
const dev = fakeDevice(port, () => ({ status: 'succeeded', data: { metres_from_target: 1.2 } }), 1500);
await dev.ready;
console.log('brain:', dev.got.find((m) => m.type === 'ready').brain);
const frame = 2880; // 60 ms
const silence = Buffer.alloc(frame);
const send = (b: Buffer) => dev.send({ type: 'audio', pcm16: b.toString('base64') });
for (let i = 0; i < 10; i++) { send(silence); await sleep(60); }
for (let o = 0; o < pcm.length; o += frame) { send(pcm.subarray(o, Math.min(pcm.length, o + frame))); await sleep(60); }
const spokeAt = performance.now();
const quiet = setInterval(() => send(silence), 60);
try {
  const heard = await dev.waitFor((m) => m.type === 'transcript' && m.role === 'user', 20000);
  console.log(`heard:  "${heard.text}"  (${Math.round(heard.at - spokeAt)} ms after the last word)`);
  const act = await dev.waitFor((m) => m.type === 'action', 20000);
  console.log(`action: ${act.action} ${act.target_id ?? ''}  (${Math.round(act.at - spokeAt)} ms after the last word)`);
  const audio = await dev.waitFor((m) => m.type === 'audio', 20000);
  console.log(`voice:  first speech audio ${Math.round(audio.at - spokeAt)} ms after the last word`);
  await sleep(4000);
  console.log('said:   ' + dev.got.filter((m) => m.type === 'transcript' && m.role === 'assistant').map((m) => m.text).join(' | '));
} catch (e) {
  console.log('FAILED:', (e as Error).message.slice(0, 400));
  console.log(dev.got.filter((m) => m.type === 'log').map((m) => `[${m.level}] ${m.message}`).join('\n'));
}
clearInterval(quiet);
dev.ws.close();
process.exit(0);
