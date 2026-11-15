// The ElevenLabs voice agent for the Simulacra companion: Claude as the brain, the body's skills as
// client tools (they run in the page, which owns the body). Used both to create the agent
// (`npx tsx src/eleven-agent.ts`) and, by the page, to know which tools to answer.
import { SYSTEM } from './prompt.js';
import { TOOLS } from './skills.js';

export const COMPANION_PROMPT = `${SYSTEM}

# Voice
You hear the user's own voice and you answer out loud in yours; there is no "say" field. Speak the way people talk: one short sentence, a few words when that is enough. When the user asks you to move or look, call the skill first and say a few words ("On my way.").
The [context] block arrives as separate [context] messages that update by themselves; they are information, never requests, and need no reply. Call get_world_state when you need exact, current positions.
Messages starting with [action_result] or [world_event] come from your own body, not from the user. React in a few words at most, once, and do not call another skill unless the user's request is still unfinished. Never walk somewhere you were not asked to go.`;

/** ElevenLabs wants a description on every parameter. */
function describe(schema: any, name = 'value'): any {
  if (!schema || typeof schema !== 'object') return schema;
  const out: any = { ...schema };
  if (out.type !== 'object' && !out.description) out.description = name.replace(/_/g, ' ');
  if (out.properties) out.properties = Object.fromEntries(Object.entries(out.properties).map(([k, v]) => [k, describe(v, k)]));
  if (out.items) out.items = describe(out.items, name + ' item');
  if (out.type === 'object') {
    delete out.additionalProperties;
    out.required = out.required ?? [];
    out.properties = out.properties ?? {};
    if (!out.description) out.description = name.replace(/_/g, ' ');
  }
  return out;
}

export function companionAgent(llm = 'claude-haiku-4-5') {
  return {
    name: 'Sim - companion',
    conversation_config: {
      agent: {
        language: 'en',
        first_message: '',
        prompt: {
          prompt: COMPANION_PROMPT,
          llm,
          temperature: 0.6,
          tools: TOOLS.map((t) => {
            const parameters = describe(t.parameters, t.name);
            delete parameters.description;
            return { type: 'client', name: t.name, description: t.description, parameters, expects_response: true, response_timeout_secs: 8 };
          }),
        },
      },
      tts: { voice_id: 'cgSgspJ2msm6clMCkdW9', model_id: 'eleven_flash_v2' },
      turn: { turn_timeout: 30 },
    },
    platform_settings: { auth: { enable_auth: false } },
  };
}

// Run directly to create the agent on the account whose key is in ELEVENLABS_API_KEY.
if (process.argv[1] && process.argv[1].endsWith('eleven-agent.ts')) {
  const res = await fetch('https://api.elevenlabs.io/v1/convai/agents/create', { method: 'POST', headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY ?? 'proxy-injected', 'content-type': 'application/json' }, body: JSON.stringify(companionAgent(process.argv[2])) });
  console.log(res.status, (await res.text()).slice(0, 900));
}
