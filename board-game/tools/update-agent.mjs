// Brings Sim's ElevenLabs agent for Crownfall up to date with src/sim.js (her instructions and tools).
//   ELEVENLABS_API_KEY=... node tools/update-agent.mjs [agent_id]
// The agent id defaults to the one in ../webxr/sim-config.json.
import { readFileSync } from 'node:fs';
globalThis.document = { createElement: () => ({ getContext: () => ({}), style: {} }), baseURI: 'http://x/', body: { appendChild() {} } };
globalThis.window = {};
const { INSTRUCTIONS, TOOLS, SKIP_TURN } = await import('../src/sim.js');
const id = process.argv[2] || JSON.parse(readFileSync(new URL('../../webxr/sim-config.json', import.meta.url), 'utf8')).crownfallAgentId;
const tools = [...TOOLS.map((t) => ({ type: 'client', name: t.name, description: t.description, parameters: { type: 'object', properties: Object.fromEntries(Object.entries(t.parameters.properties || {}).map(([k, v]) => [k, { type: v.type, description: v.description || k, ...(v.enum ? { enum: v.enum } : {}) }])), required: t.parameters.required || [] }, expects_response: true, response_timeout_secs: t.name === 'look_around' ? 20 : 5 })), SKIP_TURN];
const res = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${id}`, {
  method: 'PATCH',
  headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY ?? 'proxy-injected', 'content-type': 'application/json' },
  body: JSON.stringify({ conversation_config: { agent: { prompt: { prompt: INSTRUCTIONS, tools } }, turn: { turn_timeout: 300 }, tts: { supported_voices: [{ label: 'Saturday', voice_id: 'bIHbv24MWmeRgasZH58o', description: 'The voice of Saturdai, the male companion. Use it for everything you say while you are Saturdai.' }] }, conversation: { max_duration_seconds: 3600, file_input: { enabled: true, max_files_in_memory: 3, max_files_per_conversation: 200 } } } }),
});
const text = await res.text();
console.log(res.status, res.ok ? 'agent ' + id + ' updated' : text.slice(0, 800));
