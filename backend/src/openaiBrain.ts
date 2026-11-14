import type { Brain, BrainContext } from './brain.js';
import { SPEAKING_TOOLS, SYSTEM, validateInput } from './claudeBrain.js';
import { TOOLS } from './skills.js';
import { Ears, Mouth, SentenceChunker } from './speech.js';

export interface OpenAIBrainOptions {
  apiKey: string;
  baseUrl?: string; // tests
  model: string;
  /** Sent as reasoning_effort; '' leaves it out (models without reasoning reject it). */
  effort: string;
  ears: Ears | null;
  mouth: Mouth | null;
  worldEventMinGapMs: number;
}

type ChatMessage =
  | { role: 'system' | 'user'; content: string }
  | { role: 'assistant'; content: string | null; tool_calls?: { id: string; type: 'function'; function: { name: string; arguments: string } }[] }
  | { role: 'tool'; tool_call_id: string; content: string };

/** Same skills as the Claude mind: the world is prefetched into every turn, and action tools carry a line to speak. */
const SCHEMAS = new Map<string, any>();
const GPT_TOOLS = TOOLS.filter((t) => t.name !== 'get_world_state').map((t) => {
  const schema = structuredClone(t.parameters) as any;
  if (SPEAKING_TOOLS.has(t.name)) schema.properties = { ...schema.properties, say: { type: 'string', description: 'One short natural sentence to say out loud the instant this starts, e.g. "Sure, on my way." Put your spoken reply here rather than in text when you call this tool.' } };
  SCHEMAS.set(t.name, schema);
  return { type: 'function' as const, function: { name: t.name, description: t.description, parameters: schema } };
});

interface Input {
  kind: 'user' | 'event' | 'note';
  text: string;
}

/**
 * An OpenAI chat model as the high-level mind, over plain HTTPS: one key gives thinking, hearing
 * and voice. Same design as ClaudeBrain: event-driven, never in the movement loop, each action
 * handed to the body the moment its arguments are complete, speech synthesized sentence by
 * sentence, and the user speaking again aborts the reply in flight.
 */
export class OpenAIBrain implements Brain {
  readonly name = 'gpt';
  private history: ChatMessage[] = [];
  private inbox: Input[] = [];
  private running = false;
  private abort: AbortController | null = null;
  private closed = false;
  private speechEndAt = 0;
  private lastCallAt = 0;
  private worldEventTimer: NodeJS.Timeout | null = null;

  constructor(
    private ctx: BrainContext,
    private opts: OpenAIBrainOptions,
  ) {
    if (opts.mouth) {
      opts.mouth.onAudio = (pcm16) => this.ctx.send({ type: 'audio', pcm16 });
      opts.mouth.onFirstAudio = () => this.ctx.timer.mark('first_audio');
    }
    if (opts.ears) {
      opts.ears.onSpeechStart = () => this.ctx.send({ type: 'state', status: 'listening' });
      opts.ears.onSpeechEnd = () => (this.speechEndAt = performance.now());
      opts.ears.onTranscript = (text) => this.heard(text, 'voice');
    }
  }

  async start() {
    // Hearing failing must not take the mind down with it: typed input and the body still work.
    if (this.opts.ears) {
      try {
        await this.opts.ears.start();
      } catch (e) {
        this.ctx.log('error', `Hearing is unavailable (${(e as any)?.message ?? e}): the character cannot hear the microphone. Typed input still works.`);
        this.opts.ears = null;
      }
    }
    if (!this.opts.mouth) this.ctx.log('warn', 'No text-to-speech configured: replies are text only.');
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
    if (!urgent) {
      if (this.inbox.filter((i) => i.kind === 'note').length > 12) this.inbox.splice(this.inbox.findIndex((i) => i.kind === 'note'), 1);
      return;
    }
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

  private heard(text: string, trigger: 'voice' | 'text') {
    if (!/\p{L}{2,}/u.test(text)) return; // coughs and clatter are not a turn
    this.cutOff();
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

  private cutOff() {
    this.opts.mouth?.cancel();
    this.ctx.send({ type: 'audio_stop' });
    this.abort?.abort();
  }

  private async pump() {
    if (this.running || this.closed) return;
    if (!this.inbox.some((i) => i.kind !== 'note')) return;
    this.running = true;
    try {
      while (!this.closed && this.inbox.some((i) => i.kind !== 'note')) {
        const inputs = this.inbox.splice(0);
        if (!inputs.some((i) => i.kind === 'user') && inputs.some((i) => i.kind === 'event')) this.ctx.timer.begin('event', inputs.find((i) => i.kind === 'event')!.text);
        this.history.push({ role: 'user', content: `[context]\n${this.ctx.world.contextText()}\nmemory:\n${this.ctx.memory.summary()}\n[/context]\n${inputs.map((i) => i.text).join('\n')}` });
        this.trimHistory();
        for (let hop = 0; hop < 4; hop++) if (!(await this.callOnce())) break;
      }
    } catch (e) {
      this.ctx.log('error', `OpenAI brain error: ${(e as any)?.message ?? e}`);
    } finally {
      this.running = false;
      this.ctx.send({ type: 'state', status: 'idle' });
    }
  }

  /** One streamed request. Returns true if the model must see a failed tool result right away. */
  private async callOnce(): Promise<boolean> {
    const { ctx, opts } = this;
    const abort = (this.abort = new AbortController());
    const timeout = setTimeout(() => abort.abort(), 20_000); // a hung request must not freeze the character
    this.lastCallAt = performance.now();
    ctx.timer.mark('llm_request');
    ctx.timer.countLlmCall();
    ctx.send({ type: 'state', status: 'thinking' });

    const calls: { id: string; name: string; json: string }[] = [];
    const results = new Map<number, Promise<{ failed: boolean; content: string }>>();
    const started: string[] = [];
    let chain: Promise<unknown> = Promise.resolve();
    let spoken = '';
    let first = true;
    const chunker = new SentenceChunker((sentence) => this.speak(sentence));
    // A tool call is complete when the next one begins or the stream ends: act on it then, not at the end of the reply.
    const dispatch = (index: number) => {
      if (results.has(index) || !calls[index]) return;
      const run = chain.then(() => this.runTool(calls[index], started));
      chain = run.catch(() => {});
      results.set(index, run);
    };

    try {
      const res = await fetch(`${opts.baseUrl ?? 'https://api.openai.com/v1'}/chat/completions`, {
        method: 'POST',
        headers: { authorization: `Bearer ${opts.apiKey}`, 'content-type': 'application/json' },
        body: JSON.stringify({ model: opts.model, stream: true, messages: [{ role: 'system', content: SYSTEM }, ...this.history], tools: GPT_TOOLS, ...(opts.effort ? { reasoning_effort: opts.effort } : {}) }),
        signal: abort.signal,
      });
      if (!res.ok || !res.body) {
        const detail = (await res.text().catch(() => '')).slice(0, 300);
        if (res.status === 401) throw new Error('OpenAI rejected the key. Check it at /setup.');
        throw new Error(`OpenAI API error ${res.status}: ${detail}. Check OPENAI_PLANNER_MODEL / OPENAI_PLANNER_EFFORT for this account.`);
      }
      const decoder = new TextDecoder();
      let buffer = '';
      for await (const chunk of res.body as any as AsyncIterable<Uint8Array>) {
        buffer += decoder.decode(chunk, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (!line.startsWith('data:') || line === 'data: [DONE]') continue;
          let delta: any;
          try {
            delta = JSON.parse(line.slice(5)).choices?.[0]?.delta;
          } catch {
            continue;
          }
          if (!delta) continue;
          if (first) {
            first = false;
            ctx.timer.mark('llm_first_token');
          }
          if (typeof delta.content === 'string' && delta.content) {
            spoken += delta.content;
            chunker.push(delta.content);
          }
          for (const tc of delta.tool_calls ?? []) {
            const i = tc.index ?? 0;
            if (!calls[i]) {
              calls[i] = { id: tc.id ?? `call_${i}`, name: '', json: '' };
              if (i > 0) dispatch(i - 1);
            }
            if (tc.id) calls[i].id = tc.id;
            if (tc.function?.name) calls[i].name += tc.function.name;
            if (tc.function?.arguments) calls[i].json += tc.function.arguments;
          }
        }
      }
      clearTimeout(timeout);
      this.abort = null;
      chunker.flush();
      for (let i = 0; i < calls.length; i++) dispatch(i);

      const text = spoken.trim();
      if (text && !/^<silent>$/i.test(text)) ctx.send({ type: 'transcript', role: 'assistant', text });
      this.history.push({ role: 'assistant', content: text || null, ...(calls.length ? { tool_calls: calls.map((c) => ({ id: c.id, type: 'function' as const, function: { name: c.name, arguments: c.json || '{}' } })) } : {}) });
      let followUp = false;
      for (let i = 0; i < calls.length; i++) {
        const r = await results.get(i)!;
        this.history.push({ role: 'tool', tool_call_id: calls[i].id, content: r.content });
        if (r.failed) followUp = true; // the model must hear about a failure at once, to tell the user
      }
      return followUp;
    } catch (e) {
      clearTimeout(timeout);
      this.abort = null;
      if (abort.signal.aborted) {
        // The partial reply is not kept. Tell the model what did happen before it was cut off.
        await chain;
        const bits = [spoken.trim() ? `you had begun saying: "${spoken.trim().slice(0, 200)}"` : '', started.length ? `you had already started: ${started.join('; ')}` : ''].filter(Boolean);
        if (bits.length) this.inbox.unshift({ kind: 'note', text: `[note] You were interrupted mid-reply; ${bits.join(' and ')}.` });
        return false;
      }
      throw e;
    }
  }

  private async runTool(t: { name: string; json: string }, started: string[]): Promise<{ failed: boolean; content: string }> {
    const fail = (content: string) => ({ failed: true, content });
    let input: any;
    try {
      input = t.json.trim() ? JSON.parse(t.json) : {};
    } catch {
      return fail(JSON.stringify({ INVALID_JSON: t.json.slice(0, 500) }));
    }
    const schema = SCHEMAS.get(t.name);
    if (!schema) return fail(`Unknown skill "${t.name}".`);
    const invalid = validateInput(schema, input);
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
    return { failed, content: JSON.stringify(failed && say ? { ...result, note: 'Your "say" line was NOT spoken because this failed.' } : result) };
  }

  private speak(sentence: string) {
    if (/^<silent>$/i.test(sentence.trim())) return;
    this.ctx.timer.mark('speech_text');
    this.ctx.send({ type: 'state', status: 'speaking' });
    this.opts.mouth?.say(sentence);
  }

  /** Keep the conversation bounded; always cut at a user message so tool calls keep their results. */
  private trimHistory() {
    if (this.history.length <= 60) return;
    for (let i = this.history.length - 30; i < this.history.length; i++) {
      if (this.history[i].role === 'user') {
        this.history.splice(0, i);
        return;
      }
    }
  }
}
