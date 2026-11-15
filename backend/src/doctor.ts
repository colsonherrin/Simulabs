// Pre-demo check: `npm run doctor`. Verifies, without spending tokens, that the keys work, the
// configured models exist for those keys, and prints the address the headset should use.
import './env.js';
import Anthropic from '@anthropic-ai/sdk';
import { accessSync, constants, mkdirSync } from 'node:fs';
import { networkInterfaces } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const env = process.env;
const here = dirname(fileURLToPath(import.meta.url));
let problems = 0;
const ok = (m: string) => console.log(`  ok    ${m}`);
const bad = (m: string) => { problems++; console.log(`  FAIL  ${m}`); };
const note = (m: string) => console.log(`  note  ${m}`);

const brain = env.BRAIN ?? (env.OPENAI_API_KEY ? 'audio' : env.ANTHROPIC_API_KEY ? 'claude' : 'mock');
console.log(`Simulacra doctor\n\nMind: ${brain}`);
if (brain === 'mock') bad('no API keys found in backend/.env: the character would run on keyword rules, not AI');

if (brain === 'claude') {
  const model = env.PLANNER_MODEL ?? 'claude-opus-5-5';
  try {
    const m = await new Anthropic({ timeout: 10_000, maxRetries: 0 }).models.retrieve(model);
    ok(`Claude key accepted; model ${m.id} is available`);
  } catch (e) {
    if (e instanceof Anthropic.AuthenticationError) bad('ANTHROPIC_API_KEY was rejected');
    else if (e instanceof Anthropic.NotFoundError) bad(`PLANNER_MODEL "${model}" does not exist for this key`);
    else if (e instanceof Anthropic.APIConnectionError) bad('cannot reach api.anthropic.com (no internet?)');
    else bad(`Claude check failed: ${(e as Error).message}`);
  }
}

if (env.OPENAI_API_KEY) {
  const wanted = brain === 'realtime' ? { REALTIME_MODEL: env.REALTIME_MODEL ?? 'gpt-realtime' } : { STT_MODEL: env.STT_MODEL ?? 'gpt-4o-mini-transcribe', TTS_MODEL: env.TTS_MODEL ?? 'gpt-4o-mini-tts', REALTIME_MODEL: env.REALTIME_MODEL ?? 'gpt-realtime' };
  for (const [name, model] of Object.entries({ ...wanted, VISION_MODEL: env.VISION_MODEL ?? 'gpt-4.1-mini' })) {
    try {
      const res = await fetch(`https://api.openai.com/v1/models/${model}`, { headers: { authorization: `Bearer ${env.OPENAI_API_KEY}` }, signal: AbortSignal.timeout(10_000) });
      if (res.ok) ok(`OpenAI ${name}=${model} is available`);
      else if (res.status === 401) { bad('OPENAI_API_KEY was rejected'); break; }
      else if (name === 'VISION_MODEL') note(`${name}=${model} is not available (HTTP ${res.status}); camera object detection will fail, pointing-and-naming still works`);
      else bad(`${name}=${model} is not available for this key (HTTP ${res.status})`);
    } catch (e) {
      bad(`cannot reach api.openai.com: ${(e as Error).message}`);
      break;
    }
  }
} else if (brain === 'claude') bad('OPENAI_API_KEY is missing: Claude would work from typed text only, with no hearing and no voice');

try {
  const dir = join(here, '..', 'data');
  mkdirSync(dir, { recursive: true });
  accessSync(dir, constants.W_OK);
  ok('memory folder is writable');
} catch { bad('backend/data is not writable: skills and notes will not be remembered'); }

const port = env.PORT ?? '8787';
console.log('\nHeadset address (Backend Url on the Simulacra object, or simulacra.json):');
console.log(`  USB:   ws://127.0.0.1:${port}/device   after running: adb reverse tcp:${port} tcp:${port}`);
for (const list of Object.values(networkInterfaces())) for (const ni of list ?? []) if (ni.family === 'IPv4' && !ni.internal) console.log(`  Wi-Fi: ws://${ni.address}:${port}/device`);

console.log(problems ? `\n${problems} problem(s). Fix them before the demo.` : '\nAll checks passed. Start the backend with: npm start');
process.exit(problems ? 1 : 0);
