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
  /**
   * Set to use a model that listens to the user's audio and answers in audio within one request
   * (e.g. gpt-audio-mini): no separate transcription before it and no speech synthesis after it.
   * `ears` must then be in HTTP mode; it only cuts the microphone stream into utterances.
   */
  audioModel?: string;
  voice?: string;
}

type ChatMessage =
  | { role: 'system'; content: string }
  | { role: 'user'; content: string | any[] }
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

/** For the listening model: the same skills without the "say" field, because it speaks for itself. */
const AUDIO_TOOLS = TOOLS.filter((t) => t.name !== 'get_world_state').map((t) => ({ type: 'function' as const, function: { name: t.name, description: t.description, parameters: t.parameters } }));
const AUDIO_RULES = `

# Voice
You hear the user's own voice and you answer out loud in yours; there is no "say" field. Speak the way people talk: one short sentence, a few words when that is enough. When the user asks you to move or look, call the skill AND say a few words ("On my way.") in the same reply. If you cannot make out what was said, ask them to say it again.
When an [action_result] arrives, say a few words at most, once, and do not call another skill unless the user's request is still unfinished. Never walk somewhere you were not asked to go.`;

/** Short commands the body obeys the instant they are transcribed, without waiting for the model. */
const REFLEXES: { re: RegExp; skill: string }[] = [
  { re: /^(come( on)?( over| back)?( here| to me)|get over here|over here|come here( now)?)$/, skill: 'approach_user' },
  { re: /^(follow me|come with me|come along|walk with me)$/, skill: 'follow_user' },
  { re: /^(stop|wait|hold on|freeze|halt|stop moving|stay there|stay)$/, skill: 'stop_moving' },
];
const MOVES = new Set(['walk_to', 'approach_user', 'follow_user', 'inspect_object', 'run_sequence', 'run_skill']);
export function reflexFor(text: string): string | null {
  const t = text.toLowerCase().replace(/[^a-z' ]+/g, ' ').replace(/\b(hey|hi|ok|okay|sim|please|now|can you|could you|just)\b/g, ' ').replace(/\s+/g, ' ').trim();
  for (const r of REFLEXES) if (r.re.test(t)) return r.skill;
  return null;
}

interface Input {
  kind: 'user' | 'event' | 'note';
  text: string;
  /** A spoken utterance as a base64 WAV, for the listening model. */
  audio?: string;
  utterance?: number;
}

/**
 * An OpenAI chat model as the high-level mind, over plain HTTPS: one key gives thinking, hearing
 * and voice. Same design as ClaudeBrain: event-driven, never in the movement loop, each action
 * handed to the body the moment its arguments are complete, speech synthesized sentence by
 * sentence, and the user speaking again aborts the reply in flight.
 */
export class OpenAIBrain implements Brain {
  readonly name: string;
  private utterances = 0;
  private heardAs = new Map<number, { message?: { role: 'user'; content: string | any[] }; context?: string; text?: string }>();
  private reflex = { skill: '', at: -1e9 };
  /**
   * An answer begun before the end of the user's turn was certain. Nothing of it reaches the
   * headset until `release` is called; if the user keeps talking it is thrown away unheard.
   */
  private early: { release: () => void; gate: Promise<void>; cancelled: boolean; id: number; begin: () => void } | null = null;
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
    this.name = opts.audioModel ? 'audio' : 'gpt';
    if (opts.ears) {
      opts.ears.onSpeechStart = () => this.ctx.send({ type: 'state', status: 'listening' });
      opts.ears.onSpeechEnd = () => (this.speechEndAt = performance.now());
      opts.ears.onTranscript = (text) => this.heard(text, 'voice');
      if (opts.audioModel) {
        opts.ears.onSpeechConfirmed = () => this.cutOff(); // barge-in: a person is talking, stop and listen
        opts.ears.onEarly = (pcm) => this.heardAudio(pcm, true);
        opts.ears.onResumed = () => this.discardEarly();
        opts.ears.onUtterance = (pcm) => (this.early ? this.confirmEarly() : this.heardAudio(pcm, false));
      }
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

  /** An utterance for the listening model: send the sound itself, and transcribe on the side. */
  private heardAudio(pcm: Buffer, early: boolean) {
    const { ctx, opts } = this;
    if (early && (this.running || this.early)) return; // only speculate from rest
    if (!early) this.cutOff();
    const id = ++this.utterances;
    const record: { message?: { role: 'user'; content: string | any[] }; context?: string; text?: string } = {};
    this.heardAs.set(id, record);
    if (this.heardAs.size > 8) this.heardAs.delete(this.heardAs.keys().next().value!);
    const begin = () => ctx.timer.begin('voice', '(speech)', performance.now());
    if (early) {
      let release = () => {};
      const gate = new Promise<void>((r) => (release = r));
      this.early = { release, gate, cancelled: false, id, begin };
    } else begin();
    this.inbox.push({ kind: 'user', text: '[the user said the attached audio]', audio: Ears.wav(pcm).toString('base64'), utterance: id });
    void this.pump();

    // The words, for the display, for the record, and for reflexes. The model does not wait for them.
    void opts.ears!.transcribe(pcm).then(async (text) => {
      if (this.closed || !text || !this.heardAs.has(id)) return; // thrown away: the user kept talking
      if (this.early?.id === id) await this.early.gate;
      if (!this.heardAs.has(id)) return;
      record.text = text;
      ctx.timer.note({ input: text.slice(0, 80) });
      ctx.send({ type: 'transcript', role: 'user', text });
      if (record.message) record.message.content = `${record.context}\n[user said] ${text}`; // the sound is no longer needed
      const skill = reflexFor(text);
      if (skill && !(this.reflex.skill === skill && performance.now() - this.reflex.at < 4000)) {
        this.reflex = { skill, at: performance.now() };
        ctx.log('info', `reflex ${skill} ("${text}")`);
        void ctx.skills.execute(skill, {});
      }
    });
  }

  /** The pause held: let the early answer through. */
  private confirmEarly() {
    const e = this.early!;
    this.early = null;
    this.opts.mouth?.cancel();
    this.ctx.send({ type: 'audio_stop' });
    e.begin();
    e.release();
  }

  /** The user kept talking: drop the early answer; the whole utterance will come again. */
  private discardEarly() {
    const e = this.early;
    if (!e) return;
    e.cancelled = true;
    this.early = null;
    this.heardAs.delete(e.id);
    this.inbox = this.inbox.filter((i) => i.utterance !== e.id);
    this.abort?.abort();
    e.release();
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
        const context = `[context]\n${this.ctx.world.contextText()}\nmemory:\n${this.ctx.memory.summary()}\n[/context]`;
        const spoken = inputs.filter((i) => i.audio);
        const said = spoken[spoken.length - 1]; // if several utterances queued up, the latest is the one to answer
        const text = `${context}\n${inputs.filter((i) => !i.audio || i === said).map((i) => i.text).join('\n')}`;
        // Sound from earlier turns is dropped (their transcripts replaced it, or it is simply gone): only the newest utterance is sent as audio.
        for (const m of this.history) if (m.role === 'user' && Array.isArray(m.content)) m.content = String(m.content[0]?.text ?? '').replace('[the user said the attached audio]', '[user said something that was not transcribed]');
        const message: { role: 'user'; content: string | any[] } = { role: 'user', content: said ? [{ type: 'text', text }, { type: 'input_audio', input_audio: { data: said.audio, format: 'wav' } }] : text };
        if (said) {
          const record = this.heardAs.get(said.utterance!);
          if (record) {
            record.message = message;
            record.context = context;
            if (record.text) message.content = `${context}\n[user said] ${record.text}`;
          }
        }
        this.history.push(message);
        const speculative = said && this.early?.id === said.utterance ? this.early : null;
        this.trimHistory();
        for (let hop = 0; hop < 4; hop++) if (!(await this.callOnce(hop === 0 ? speculative : null))) break;
        if (speculative?.cancelled) {
          // As if it never happened.
          const at = this.history.indexOf(message);
          if (at >= 0) this.history.splice(at);
          this.inbox = this.inbox.filter((i) => !i.text.startsWith('[note] You were interrupted'));
        }
      }
    } catch (e) {
      this.ctx.log('error', `OpenAI brain error: ${(e as any)?.message ?? e}`);
    } finally {
      this.running = false;
      this.ctx.send({ type: 'state', status: 'idle' });
    }
  }

  /** One streamed request. Returns true if the model must see a failed tool result right away. */
  private async callOnce(early: { gate: Promise<void>; cancelled: boolean } | null = null): Promise<boolean> {
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
    let voiced = false;
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
        body: JSON.stringify(
          opts.audioModel
            ? { model: opts.audioModel, stream: true, modalities: ['text', 'audio'], audio: { voice: opts.voice ?? 'alloy', format: 'pcm16' }, messages: [{ role: 'system', content: SYSTEM + AUDIO_RULES }, ...this.history], tools: AUDIO_TOOLS }
            : { model: opts.model, stream: true, messages: [{ role: 'system', content: SYSTEM }, ...this.history], tools: GPT_TOOLS, ...(opts.effort ? { reasoning_effort: opts.effort } : {}) },
        ),
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
          if (early) {
            await early.gate; // hold everything until the user's turn is known to be over
            if (early.cancelled) throw new Error('discarded');
          }
          if (first) {
            first = false;
            ctx.timer.mark('llm_first_token');
          }
          if (delta.audio?.data) {
            // The model's own voice, passed straight through to the headset.
            if (!voiced) {
              voiced = true;
              ctx.timer.mark('speech_text');
              ctx.timer.mark('first_audio');
              ctx.send({ type: 'state', status: 'speaking' });
            }
            ctx.send({ type: 'audio', pcm16: delta.audio.data });
          }
          if (delta.audio?.transcript) spoken += delta.audio.transcript;
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
      if (early) {
        await early.gate;
        if (early.cancelled) return false;
      }
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
      if (early?.cancelled) return false;
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
    // The body already obeyed this as a reflex: do not restart the walk.
    if (performance.now() - this.reflex.at < 4000 && (t.name === this.reflex.skill || (this.reflex.skill !== 'stop_moving' && MOVES.has(t.name)))) {
      started.push(`${t.name}()`);
      return { failed: false, content: JSON.stringify({ status: 'started', note: `The body had already obeyed the user by reflex (${this.reflex.skill}); this call was not needed and was not run.` }) };
    }
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
