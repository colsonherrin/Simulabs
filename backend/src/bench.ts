// Latency benchmark for the reasoning path, against the LIVE Claude API.
//
//   npm run bench                         (uses ANTHROPIC_API_KEY, PLANNER_MODEL, PLANNER_EFFORT, PLANNER_FAST)
//   PLANNER_MODEL=claude-haiku-5-5 npm run bench -- --runs 5
//
// It starts the real backend in-process with a scripted headset on the other end of the real
// WebSocket, types each prompt (so speech-to-text time is NOT included) and reports, per prompt,
// milliseconds from input to: first streamed event, action sent to the headset, headset started
// moving, first sentence ready to speak, and first synthesized audio (only if OPENAI_API_KEY is set).
// This spends real tokens: roughly 15 short requests per run.
import WebSocket from 'ws';
import { TurnTimer, type TurnRecord } from './latency.js';
import type { WorldSnapshot } from './protocol.js';
import { startServer } from './server.js';

const PROMPTS = ['Hey, come over here.', 'What do you see over there?', 'Yeah, go check it out.', 'Now follow me.', 'Stop.', 'Go to the table and then come back to me.'];
const runs = Number(process.argv[process.argv.indexOf('--runs') + 1] || 3) || 3;
const env = process.env;
const model = env.PLANNER_MODEL ?? 'claude-opus-5-5';

const world: WorldSnapshot = {
  user: { pos: [0, 1.6, -2], fwd: [0.3, 0, 0.95] },
  avatar: { pos: [0, 0, 1.5], fwd: [0, 0, -1], state: 'idle' },
  objects: [
    { id: 'chair_1', label: 'chair', pos: [1.2, 0.45, 1.8], size: [0.5, 0.9, 0.5], source: 'manual', confidence: 1, lastSeen: 2, reachable: true },
    { id: 'table_1', label: 'table', pos: [-1.4, 0.4, 1.0], size: [1.4, 0.75, 0.8], source: 'room_scan', confidence: 1, lastSeen: 2, reachable: true },
  ],
  room: { source: 'room_scan', floorY: 0, obstacles: 2, navmesh: true },
};

const srv = await startServer({
  port: 0, brain: 'claude', anthropicKey: env.ANTHROPIC_API_KEY, apiKey: undefined,
  // Text-to-speech only if a key is present; speech-to-text is bypassed by typing.
  ttsBaseUrl: env.OPENAI_API_KEY ? 'https://api.openai.com/v1' : undefined,
  claudeModel: model, claudeEffort: (env.PLANNER_EFFORT as 'low' | 'medium' | 'high' | undefined) ?? 'low', claudeFast: env.PLANNER_FAST === '1',
  realtimeModel: 'unused', realtimeVoice: env.REALTIME_VOICE ?? 'marin', visionModel: 'unused', memoryPath: null, quiet: true,
  ttsApiKey: env.OPENAI_API_KEY,
});

const ws = new WebSocket(`ws://127.0.0.1:${srv.port}/device`);
const turns: TurnRecord[] = [];
const said: string[] = [];
const actions: string[] = [];
let errors = 0;
ws.on('message', (raw) => {
  const m = JSON.parse(raw.toString());
  if (m.type === 'action') {
    actions.push(`${m.action}${m.target_id ? `(${m.target_id})` : ''}`);
    ws.send(JSON.stringify({ type: 'event', name: 'action_started', data: { id: m.id, plan_ms: 2, path_m: 3 } }));
    // A short scripted "walk"; long enough that the completion event does not land inside the measured turn.
    setTimeout(() => ws.send(JSON.stringify({ type: 'action_result', id: m.id, status: 'succeeded', data: { metres_from_target: 0.8 } })), ['stop', 'gesture', 'look_at', 'follow_user'].includes(m.action) ? 30 : 2500);
  } else if (m.type === 'metrics') turns.push(m.turn);
  else if (m.type === 'transcript' && m.role === 'assistant') said.push(m.text);
  else if (m.type === 'log') { if (m.level === 'error') errors++; console.error(`[${m.level}] ${m.message}`); }
});
await new Promise<void>((r) => ws.on('open', () => r()));
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
ws.send(JSON.stringify({ type: 'hello', protocol: 1, device: 'bench', capabilities: { vision: false } }));
ws.send(JSON.stringify({ type: 'world', world }));
await sleep(300);

console.log(`model=${model} effort=${env.PLANNER_EFFORT ?? 'low'} fast=${env.PLANNER_FAST === '1'} runs=${runs}\n`);
const rows: (TurnRecord & { said: string; actions: string })[] = [];
for (let run = 0; run < runs && errors === 0; run++) {
  for (const prompt of PROMPTS) {
    const before = turns.length;
    said.length = 0;
    actions.length = 0;
    ws.send(JSON.stringify({ type: 'text', text: prompt }));
    // A turn record is emitted when the next turn begins or after 8 s; wait for the model, then for stragglers.
    for (let i = 0; i < 300 && said.length === 0 && actions.length === 0 && errors === 0; i++) await sleep(100);
    await sleep(4500);
    ws.send(JSON.stringify({ type: 'interrupt' }));
    const mine = () => turns.find((x, idx) => idx >= before && x.trigger === 'text');
    for (let i = 0; i < 100 && !mine(); i++) await sleep(100);
    const t = mine();
    if (t) rows.push({ ...t, said: said.join(' | '), actions: actions.join(', ') });
    if (errors) break;
  }
}

const cols = ['llm_first_token', 'action_dispatched', 'device_started', 'speech_text', 'first_audio'];
console.log(['prompt'.padEnd(44), ...cols.map((c) => c.padStart(17)), 'calls'].join(' '));
for (const r of rows) console.log([r.input.padEnd(44).slice(0, 44), ...cols.map((c) => String(r.ms[c] ?? '-').padStart(17)), String(r.llm_calls).padStart(5), ' ', r.actions || '(no action)', '=>', r.said.slice(0, 70)].join(' '));
console.log('\nsummary (ms from typed input; p50 / p90):');
for (const [k, v] of Object.entries(TurnTimer.summarize(rows))) if (cols.includes(k)) console.log(`  ${k.padEnd(18)} ${String(v.p50).padStart(6)} / ${String(v.p90).padStart(6)}   n=${v.n}`);
ws.close();
await srv.close();
process.exit(errors ? 1 : 0);
