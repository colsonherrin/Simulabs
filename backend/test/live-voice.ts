// Live check, not part of `npm test`: plays recorded sentences into the running backend as if
// they were the headset microphone, and reports what the character heard, did and said, and when.
// Times are measured from the true end of speech in each recording (trailing silence excluded).
//   npx tsx test/live-voice.ts <port> <speech.pcm> [more.pcm ...]     (PCM16 mono 24 kHz)
import { readFileSync } from 'node:fs';
import { fakeDevice, sleep } from './helpers.js';

const port = Number(process.argv[2]);
const dev = fakeDevice(port, () => ({ status: 'succeeded', data: { metres_from_target: 1.2 } }), 2500);
await dev.ready;
console.log('mind:', dev.got.find((m) => m.type === 'ready').brain);
const frame = 2880; // 60 ms
const silence = Buffer.alloc(frame);
const send = (b: Buffer) => dev.send({ type: 'audio', pcm16: b.toString('base64') });
const ms = (t: number | undefined, from: number) => (t === undefined ? '   -  ' : String(Math.round(t - from)).padStart(5) + ' ms');

for (const file of process.argv.slice(3)) {
  const pcm = readFileSync(file);
  let last = 0;
  for (let i = 0; i + 1 < pcm.length; i += 2) if (Math.abs(pcm.readInt16LE(i)) > 600) last = i;
  for (let i = 0; i < 8; i++) { send(silence); await sleep(60); }
  const mark = dev.got.length;
  let spokeAt = 0;
  for (let o = 0; o < pcm.length; o += frame) {
    send(pcm.subarray(o, Math.min(pcm.length, o + frame)));
    if (!spokeAt && o + frame >= last) spokeAt = performance.now();
    await sleep(60);
  }
  const until = Date.now() + 9000;
  while (Date.now() < until) { send(silence); await sleep(60); }
  const got = dev.got.slice(mark);
  const first = (pred: (m: any) => boolean) => got.find(pred)?.at;
  const action = got.find((m) => m.type === 'action');
  console.log(`\n${file.split('/').pop()}`);
  console.log(`  first sound of the reply ${ms(first((m) => m.type === 'audio'), spokeAt)}`);
  console.log(`  body told to move        ${ms(action?.at, spokeAt)}  ${action ? action.action + ' ' + (action.target_id ?? '') : ''}`);
  console.log(`  words shown              ${ms(first((m) => m.type === 'transcript' && m.role === 'user'), spokeAt)}  "${got.find((m) => m.type === 'transcript' && m.role === 'user')?.text ?? ''}"`);
  console.log(`  said: ${got.filter((m) => m.type === 'transcript' && m.role === 'assistant').map((m) => m.text).join(' | ')}`);
  console.log(`  actions: ${got.filter((m) => m.type === 'action').map((m) => m.action).join(', ') || 'none'}; speech ${(got.filter((m) => m.type === 'audio').reduce((a, m) => a + m.pcm16.length * 0.75 / 48000, 0)).toFixed(1)} s`);
  for (const l of got.filter((m) => m.type === 'log' && m.level !== 'info')) console.log(`  [${l.level}] ${l.message}`);
}
dev.ws.close();
process.exit(0);
