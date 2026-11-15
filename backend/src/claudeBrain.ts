import Anthropic from '@anthropic-ai/sdk';
import type { Brain, BrainContext } from './brain.js';
import { TOOLS } from './skills.js';
import { Ears, Mouth, SentenceChunker } from './speech.js';

type Msg = Anthropic.Beta.BetaMessageParam;
type ToolResult = Anthropic.Beta.BetaToolResultBlockParam;

export interface ClaudeBrainOptions {
  apiKey?: string; // omitted: the SDK resolves credentials from the environment
  baseURL?: string; // tests
  model: string;
  effort: 'low' | 'medium' | 'high' | 'xhigh' | 'max';
  fast: boolean; // fast output mode (costs more; only on models that support it)
  ears: Ears | null;
  mouth: Mouth | null;
  worldEventMinGapMs: number;
}

/** Tools whose arguments may carry a line to speak the instant the action starts. */
export const SPEAKING_TOOLS = new Set(['walk_to', 'approach_user', 'follow_user', 'inspect_object', 'look_at', 'gesture', 'scan_surroundings', 'run_sequence', 'run_skill', 'stop_moving', 'register_marker']);

/** Claude gets the world prefetched into every turn, so it has no world-query tool: that would cost a round trip. */
const CLAUDE_TOOLS: Anthropic.Beta.BetaTool[] = TOOLS.filter((t) => t.name !== 'get_world_state').map((t) => {
  const schema = structuredClone(t.parameters) as any;
  if (SPEAKING_TOOLS.has(t.name)) schema.properties = { ...schema.properties, say: { type: 'string', description: "One short natural sentence to say out loud the instant this starts, e.g. \"Sure, on my way.\" Put your spoken reply here rather than in text when you call this tool." } };
  return { name: t.name, description: t.description, input_schema: schema, eager_input_streaming: true };
});

export const SYSTEM = `You are Sim, an embodied AI companion. You have a human body standing on the floor of the user's real room, seen through their AR headset. You hear the user by voice and you can walk around their room.

# How you act
You are the mind; a separate local controller is the body. You decide WHAT to do and name a target. The body plans the path, avoids obstacles, animates and replans by itself, and tells you how it went. You never plan steps of a walk, never check on a walk in progress and never ask for confirmation before a simple movement.

- Whatever you write as plain text is spoken aloud. Keep it to one or two short, natural sentences. No lists, no markup, no stage directions, never mention tools, ids or that you are an AI model.
- To act, call a skill. When a skill has a "say" field, put your spoken line there and write no other text in that reply: the line is spoken the instant the body starts, with no extra delay.
- Call at most one movement skill per reply. For a multi-step request use run_sequence (or run_skill for a sequence you saved before); the body runs all the steps without coming back to you in between.
- Movement skills return "started" at once. Do not wait, do not call anything to check. When the body finishes you receive a message beginning [action_result]. React with at most one short sentence, or with the next skill if the user's request is not finished. If it failed, say so plainly and offer an alternative; never claim to have arrived when you did not.
- Targets are object ids from the context, or "user". You cannot pass coordinates. If something the user means is not listed, ask them to look at it and say what it is, then call register_marker (or scan_surroundings if the room data says camera vision is available).

# What you know
Every message starts with a [context] block: where you and the user are, what the user is looking toward, every known object with its id, how it is known, and distances, plus your long-term memory. It is always current, so trust it over anything earlier in the conversation. "Here", "come here", "over here" and "to me" always mean the user: use approach_user. "That", "this" and "over there" usually mean what the user is looking toward.
Be truthful about how you know things: only objects marked "seen by the headset camera" may be described as something you see. Objects from the room scan or registered by the user are things you were told about.

# Events
Messages are not always the user speaking. [action_result] reports how an action ended. [world_event] reports a change in the room. [note] is information only. If an event needs no words and no action, reply with exactly <silent> and nothing else.

# Learning
When a sequence of steps would be useful again, pass save_as to run_sequence; if it works it is remembered. Prefer run_skill (with a target_id) for things you already learned. Use remember_object for facts worth keeping about a thing.

Stay at a comfortable distance and never walk into the user.`;

/** Minimal check that eager-streamed tool input matches its schema before the body acts on it. */
export function validateInput(schema: any, input: unknown): string | null {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) return 'input must be a JSON object';
  for (const key of schema.required ?? []) if (!(key in (input as any))) return `missing required field "${key}"`;
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    const prop = schema.properties?.[key];
    if (!prop) continue;
    if (prop.type === 'string' && typeof value !== 'string') return `field "${key}" must be a string`;
    if (prop.type === 'array' && !Array.isArray(value)) return `field "${key}" must be an array`;
    if (prop.enum && !prop.enum.includes(value)) return `field "${key}" must be one of ${prop.enum.join(', ')}`;
  }
  return null;
}

interface Input {
  kind: 'user' | 'event' | 'note';
  text: string;
}

/**
 * Claude as the high-level mind: event-driven, asynchronous, and never in the movement loop.
 *
 * A reasoning call happens only when something meaningful arrives (the user spoke, an action
 * ended, the room changed). Within a call, each action is dispatched to the body the moment its
 * tool block finishes streaming, without waiting for the rest of the reply, and no second call is
 * made just to acknowledge a started action. Speech is synthesized sentence by sentence in the
 * background. The user speaking again aborts whatever call is in flight.
 */
export class ClaudeBrain implements Brain {
  readonly name = 'claude';
  private client: Anthropic;
  private history: Msg[] = [];
  private inbox: Input[] = [];
  private pendingResults: ToolResult[] = [];
  private running = false;
  private stream: { abort(): void } | null = null;
  private aborted = false;
  private closed = false;
  private speechEndAt = 0;
  private lastCallAt = 0;
  private worldEventTimer: NodeJS.Timeout | null = null;

  constructor(
    private ctx: BrainContext,
    private opts: ClaudeBrainOptions,
  ) {
    this.client = new Anthropic({ ...(opts.apiKey ? { apiKey: opts.apiKey } : {}), ...(opts.baseURL ? { baseURL: opts.baseURL } : {}), maxRetries: 1, timeout: 20_000 }); // a hung request must not freeze the character
    if (opts.mouth) {
      opts.mouth.onAudio = (pcm16) => this.ctx.send({ type: 'audio', pcm16 });
      opts.mouth.onFirstAudio = () => this.ctx.timer.mark('first_audio');
    }
    if (opts.ears) {
      // A noise burst also looks like "speech started". Nothing is cut off until real words arrive
      // (see heard()), so background noise can neither silence the character nor drop a request.
      opts.ears.onSpeechStart = () => this.ctx.send({ type: 'state', status: 'listening' });
      opts.ears.onSpeechEnd = () => (this.speechEndAt = performance.now());
      opts.ears.onTranscript = (text) => this.heard(text, 'voice');
    }
  }

  async start() {
    if (this.opts.ears) await this.opts.ears.start();
    if (!this.opts.mouth) this.ctx.log('warn', 'No text-to-speech configured: Claude will answer as text only.');
  }

  onAudio(pcm16: string) {
    this.opts.ears?.audio(pcm16);
  }

  onText(text: string) {
    this.heard(text, 'text');
  }

  interrupt() {
    this.cutOff();
    this.ctx.send({ type: 'state', status: 'idle' });
  }

  onFeedback(outcome: Record<string, unknown>) {
    this.inbox.push({ kind: 'event', text: `[action_result] ${JSON.stringify(outcome)}` });
    void this.pump();
  }

  onWorldEvent(description: string, urgent: boolean) {
    this.inbox.push({ kind: 'note', text: `[world_event] ${description}` });
    // Noticing an object is not a reason to speak: it just rides along with the next turn.
    if (!urgent) {
      if (this.inbox.filter((i) => i.kind === 'note').length > 12) this.inbox.splice(this.inbox.findIndex((i) => i.kind === 'note'), 1);
      return;
    }
    // Room changes are batched and rate limited; they ride along with the next turn, or trigger
    // one quiet call of their own if nothing else is going on.
    if (this.worldEventTimer) return;
    const wait = Math.max(1500, this.opts.worldEventMinGapMs - (performance.now() - this.lastCallAt));
    this.worldEventTimer = setTimeout(() => {
      this.worldEventTimer = null;
      for (const i of this.inbox) if (i.kind === 'note' && i.text.startsWith('[world_event]')) i.kind = 'event';
      void this.pump();
    }, wait);
  }

  refreshContext() {
    /* context is rebuilt from the live world model on every turn */
  }

  close() {
    this.closed = true;
    this.cutOff();
    if (this.worldEventTimer) clearTimeout(this.worldEventTimer);
    this.opts.ears?.close();
  }

  // ---- input

  private heard(text: string, trigger: 'voice' | 'text') {
    // Speech-to-text returns punctuation or nothing for coughs and clatter: not a turn.
    if (!/\p{L}{2,}/u.test(text)) return;
    this.cutOff(); // barge-in on real words: stop talking and abandon the reply to the old request
    this.ctx.send({ type: 'transcript', role: 'user', text });
    this.ctx.timer.begin(trigger, text, trigger === 'voice' && this.speechEndAt ? this.speechEndAt : performance.now());
    if (trigger === 'voice') this.ctx.timer.mark('transcript');

    // Safety reflex: a bare "stop" halts the body locally, before any model call.
    if (/^\s*(stop|wait|hold on|freeze|halt)\b[\s.!]*$/i.test(text)) {
      void this.ctx.skills.execute('stop_moving', {});
      this.inbox.push({ kind: 'note', text: '[note] The body was already stopped by a local reflex when the user said this.' });
    }
    this.inbox.push({ kind: 'user', text: `[user said] ${text}` });
    void this.pump();
  }

  /** Stop speaking and abandon the reasoning call in flight. */
  private cutOff() {
    this.opts.mouth?.cancel();
    this.ctx.send({ type: 'audio_stop' });
    if (this.stream) {
      this.aborted = true;
      this.stream.abort();
    }
  }

  // ---- reasoning loop (single flight)

  private async pump() {
    if (this.running || this.closed) return;
    if (!this.inbox.some((i) => i.kind !== 'note')) return; // notes alone never trigger a call
    this.running = true;
    try {
      while (!this.closed && this.inbox.some((i) => i.kind !== 'note')) {
        const inputs = this.inbox.splice(0);
        if (!inputs.some((i) => i.kind === 'user') && inputs.some((i) => i.kind === 'event')) this.ctx.timer.begin('event', inputs.find((i) => i.kind === 'event')!.text);
        const text = `[context]\n${this.ctx.world.contextText()}\nmemory:\n${this.ctx.memory.summary()}\n[/context]\n${inputs.map((i) => i.text).join('\n')}`;
        this.history.push({ role: 'user', content: [...this.pendingResults, { type: 'text', text }] });
        this.pendingResults = [];
        this.trimHistory();

        for (let hop = 0; hop < 4; hop++) {
          const followUp = await this.callOnce();
          if (!followUp) break;
        }
      }
    } catch (e) {
      this.report(e);
    } finally {
      this.running = false;
      this.ctx.send({ type: 'state', status: 'idle' });
    }
  }

  /** One streamed request. Returns true if Claude needs to see tool results right away. */
  private async callOnce(): Promise<boolean> {
    const { ctx, opts } = this;
    const supportsFallback = /^claude-(opus-5-5|sonnet-5-5|opus-5$|fable-5)/.test(opts.model);
    this.aborted = false;
    this.lastCallAt = performance.now();
    ctx.timer.mark('llm_request');
    ctx.timer.countLlmCall();
    ctx.send({ type: 'state', status: 'thinking' });

    const stream = this.client.beta.messages.stream({
      model: opts.model,
      max_tokens: 8000,
      // Stable prefix (tools + system) is cached; everything volatile lives in the messages.
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
      tools: CLAUDE_TOOLS,
      messages: this.history,
      output_config: { effort: opts.effort },
      ...(opts.fast ? { speed: 'fast' as const } : {}),
      // A safety decline is retried server-side on a fallback model instead of leaving the character mute.
      ...(supportsFallback ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' as const } : {}),
    });
    this.stream = stream;

    const tools = new Map<number, { id: string; name: string; json: string }>();
    const results = new Map<string, Promise<ToolResult>>();
    const started: string[] = [];
    let chain: Promise<unknown> = Promise.resolve();
    let spoken = '';
    let first = true;
    const chunker = new SentenceChunker((sentence) => this.speak(sentence));

    try {
      for await (const event of stream) {
        if (first) {
          first = false;
          ctx.timer.mark('llm_first_token');
        }
        if (event.type === 'content_block_start' && event.content_block.type === 'tool_use') {
          tools.set(event.index, { id: event.content_block.id, name: event.content_block.name, json: '' });
        } else if (event.type === 'content_block_delta') {
          if (event.delta.type === 'text_delta') {
            spoken += event.delta.text;
            chunker.push(event.delta.text);
          } else if (event.delta.type === 'input_json_delta') {
            const t = tools.get(event.index);
            if (t) t.json += event.delta.partial_json;
          }
        } else if (event.type === 'content_block_stop') {
          const t = tools.get(event.index);
          if (t) {
            // Act NOW: the body starts moving while the rest of the reply is still streaming.
            const run = chain.then(() => this.runTool(t, started));
            chain = run.catch(() => {});
            results.set(t.id, run);
          } else chunker.flush();
        }
      }
      chunker.flush();
      const message = await stream.finalMessage();
      this.stream = null;

      if (spoken.trim() && !/^<silent>$/i.test(spoken.trim())) ctx.send({ type: 'transcript', role: 'assistant', text: spoken.trim() });
      this.history.push({ role: 'assistant', content: message.content as Anthropic.Beta.BetaContentBlockParam[] });

      if (message.stop_reason === 'refusal') {
        this.speak("Sorry, I can't help with that one.");
        return false;
      }

      const toolUses = message.content.filter((b): b is Anthropic.Beta.BetaToolUseBlock => b.type === 'tool_use');
      if (toolUses.length === 0) return false;
      const out: ToolResult[] = [];
      let followUp = false;
      for (const use of toolUses) {
        const r = (await results.get(use.id)) ?? { type: 'tool_result' as const, tool_use_id: use.id, is_error: true, content: 'The tool call was cut off before it completed; nothing was done.' };
        out.push(r);
        if (r.is_error) followUp = true;
      }
      if (message.stop_reason === 'max_tokens') followUp = false; // do not loop on a truncated reply
      if (followUp) {
        // Something failed: Claude must hear about it immediately to tell the user.
        this.history.push({ role: 'user', content: out });
        return true;
      }
      // Everything started or succeeded: no acknowledgement round trip. The results ride along
      // with whatever comes next (the user's next words or the action's completion event).
      this.pendingResults = out;
      return false;
    } catch (e) {
      this.stream = null;
      if (this.aborted || e instanceof Anthropic.APIUserAbortError) {
        // The partial reply is not kept (it may hold half a tool call). Tell Claude what did happen.
        await chain;
        const bits = [spoken.trim() ? `you had begun saying: "${spoken.trim().slice(0, 200)}"` : '', started.length ? `you had already started: ${started.join('; ')}` : ''].filter(Boolean);
        if (bits.length) this.inbox.unshift({ kind: 'note', text: `[note] You were interrupted mid-reply; ${bits.join(' and ')}.` });
        return false;
      }
      throw e;
    }
  }

  private async runTool(t: { id: string; name: string; json: string }, started: string[]): Promise<ToolResult> {
    const fail = (content: string): ToolResult => ({ type: 'tool_result', tool_use_id: t.id, is_error: true, content });
    let input: any;
    try {
      input = t.json.trim() ? JSON.parse(t.json) : {};
    } catch {
      return fail(JSON.stringify({ INVALID_JSON: t.json.slice(0, 500) }));
    }
    const def = CLAUDE_TOOLS.find((d) => d.name === t.name);
    if (!def) return fail(`Unknown skill "${t.name}".`);
    const invalid = validateInput(def.input_schema, input);
    if (invalid) return fail(`Invalid input: ${invalid}`);

    const { say, ...args } = input;
    this.ctx.log('info', `skill ${t.name}(${JSON.stringify(args)})`);
    const result = await this.ctx.skills.execute(t.name, args);
    this.ctx.log('info', `  -> ${JSON.stringify(result).slice(0, 300)}`);
    const failed = result.status === 'failed';
    // Speak the line only if the action actually began: never say "on my way" to a refused request.
    if (!failed && typeof say === 'string' && say.trim()) {
      this.speak(say);
      this.ctx.send({ type: 'transcript', role: 'assistant', text: say.trim() });
    }
    if (!failed) started.push(`${t.name}(${JSON.stringify(args)})`);
    return { type: 'tool_result', tool_use_id: t.id, is_error: failed, content: JSON.stringify(failed && say ? { ...result, note: 'Your "say" line was NOT spoken because this failed.' } : result) };
  }

  private speak(sentence: string) {
    if (/^<silent>$/i.test(sentence.trim())) return;
    this.ctx.timer.mark('speech_text');
    this.ctx.send({ type: 'state', status: 'speaking' });
    this.opts.mouth?.say(sentence);
  }

  /** Keep the conversation bounded; cut only at a user message that carries no tool results. */
  private trimHistory() {
    if (this.history.length <= 40) return;
    for (let i = this.history.length - 24; i < this.history.length; i++) {
      const m = this.history[i];
      if (m.role === 'user' && Array.isArray(m.content) && !m.content.some((b) => b.type === 'tool_result')) {
        this.history.splice(0, i);
        return;
      }
    }
  }

  private report(e: unknown) {
    if (e instanceof Anthropic.AuthenticationError) this.ctx.log('error', 'Claude rejected the credentials. Check ANTHROPIC_API_KEY.');
    else if (e instanceof Anthropic.RateLimitError) this.ctx.log('error', 'Claude rate limit hit; the request was dropped.');
    else if (e instanceof Anthropic.BadRequestError) this.ctx.log('error', `Claude rejected the request (${e.message}). Check PLANNER_MODEL / PLANNER_EFFORT / PLANNER_FAST for this model.`);
    else if (e instanceof Anthropic.APIError) this.ctx.log('error', `Claude API error ${e.status}: ${e.message}`);
    else this.ctx.log('error', `Claude brain error: ${(e as any)?.message ?? e}`);
    // A failed request leaves a user message at the end of the history; that is valid, and the next input is appended to it.
  }
}
