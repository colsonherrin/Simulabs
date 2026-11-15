// The ElevenLabs voice agent for the Simulacra companion: Claude as the brain, the body's skills as
// client tools (they run in the page, which owns the body). Used both to create the agent
// (`npx tsx src/eleven-agent.ts`) and, by the page, to know which tools to answer.
import { SYSTEM } from './prompt.js';
import { TOOLS } from './skills.js';

export const COMPANION_PROMPT = `${SYSTEM}

# Voice
You hear the user's own voice and you answer out loud in yours; there is no "say" field. Speak the way people talk: one short sentence, a few words when that is enough. When the user asks you to move or look, call the skill first and say a few words ("On my way.").
The [context] block arrives as separate [context] messages that update by themselves; they are information, never requests, and need no reply. Call get_world_state when you need exact, current positions.
Messages starting with [action_result] or [world_event] come from your own body, not from the user. React in a few words at most, once, and do not call another skill unless the user's request is still unfinished. Never walk somewhere you were not asked to go.
Never say or write "<silent>". When nothing needs saying (an event that needs no comment, the user thinking aloud, background noise, or the user talking to someone else), call skip_turn instead. Do not ask whether the user is still there.
Moving without a target: "stand to my left / next to me / behind me" is stand_by_user; "a step forward", "back up", "move right", "a bit closer" is step. Only say you are moving if you called a skill in this reply.
If the user mentions something that is not in your list and shows you where it is (they are looking or pointing at it, or say "over there"), call register_marker with its name straight away instead of asking them to describe it again. You cannot sit or pick things up: say so and offer to stand beside the thing instead.`;

/** Lets the agent say nothing for a turn. */
export const SKIP_TURN = { type: 'system', name: 'skip_turn', description: 'Stay quiet for this turn: nothing needs to be said.', params: { system_tool_type: 'skip_turn' } };
/** Sessions of up to an hour, and no "are you still there?" after every pause. */
export const LONG_AND_PATIENT = { turn: { turn_timeout: 300 }, conversation: { max_duration_seconds: 3600 } };

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
          tools: [
            ...TOOLS.map((t) => {
              const parameters = describe(t.parameters, t.name);
              delete parameters.description;
              return { type: 'client', name: t.name, description: t.description, parameters, expects_response: true, response_timeout_secs: 8 };
            }),
            SKIP_TURN,
          ],
        },
      },
      tts: { voice_id: 'cgSgspJ2msm6clMCkdW9', model_id: 'eleven_flash_v2' },
      ...LONG_AND_PATIENT,
    },
    platform_settings: { auth: { enable_auth: false } },
  };
}

// Run directly: `npx tsx src/eleven-agent.ts` creates the agent; `... --update <agent_id>` brings an
// existing one up to date. The key comes from ELEVENLABS_API_KEY.
if (process.argv[1] && process.argv[1].endsWith('eleven-agent.ts')) {
  const update = process.argv.indexOf('--update') > 0 ? process.argv[process.argv.indexOf('--update') + 1] : '';
  const headers = { 'xi-api-key': process.env.ELEVENLABS_API_KEY ?? 'proxy-injected', 'content-type': 'application/json' };
  const agent = companionAgent();
  const res = update
    ? await fetch(`https://api.elevenlabs.io/v1/convai/agents/${update}`, { method: 'PATCH', headers, body: JSON.stringify({ conversation_config: agent.conversation_config }) })
    : await fetch('https://api.elevenlabs.io/v1/convai/agents/create', { method: 'POST', headers, body: JSON.stringify(agent) });
  const text = await res.text();
  console.log(res.status, res.ok ? text.slice(0, 120) : text.slice(0, 900));
}
