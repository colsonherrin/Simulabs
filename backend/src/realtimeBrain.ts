import WebSocket from 'ws';
import { type Brain, type BrainContext } from './brain.js';
import { SYSTEM } from './prompt.js';
import { AUDIO_RATE } from './protocol.js';
import { TOOLS } from './skills.js';

interface Opts {
  apiKey: string;
  model: string;
  voice: string;
  url?: string; // override for tests / proxies
  silenceMs?: number;
  /**
   * Another way to reach the service than a server-side WebSocket: in a browser, a WebRTC call,
   * where the microphone and the voice travel as live audio tracks and only events come through here.
   */
  connect?: (handlers: { onMessage(text: string): void; onClose(): void }) => Promise<{ send(text: string): void; close(): void }>;
}

// The situation is written into the instructions and refreshed whenever the room changes and the
// moment the user starts speaking, so the model never spends a round trip asking for it.
const REALTIME_TOOLS = TOOLS.filter((t) => t.name !== 'get_world_state');
const VOICE_RULES = `
# Voice
You speak aloud directly; there is no "say" field. When you call a movement skill, call it FIRST, before saying anything, so the body sets off at once; then say a few words at most ("On my way."). Answer in one short sentence unless asked for more. The [context] block is the section "Current situation" below, kept up to date for you.
When an [action_result] arrives, say a few words at most, once, and do not call another skill unless the user's request is still unfinished. Never walk somewhere you were not asked to go.`;

/**
 * Speech-to-speech brain on the OpenAI Realtime API. One upstream WebSocket per headset.
 * The model hears the user, talks back, and picks skills through function calling.
 */
export class RealtimeBrain implements Brain {
  readonly name = 'realtime';
  private ws: WebSocket | null = null;
  private call: { send(text: string): void; close(): void } | null = null;
  private closed = false;
  private responseActive = false;
  private wantResponse = false;
  private userSpeaking = false;
  private reconnects = 0;
  private handledCalls = new Set<string>();
  private accepted: ((problem?: string) => void) | null = null;
  private running: Promise<void> = Promise.resolve();
  private ranCalls = false;

  constructor(
    private ctx: BrainContext,
    private opts: Opts,
  ) {}

  start(): Promise<void> {
    if (this.opts.connect) return this.startCall();
    return new Promise((resolve, reject) => {
      const url = this.opts.url ?? `wss://api.openai.com/v1/realtime?model=${encodeURIComponent(this.opts.model)}`;
      const ws = new WebSocket(url, { headers: { Authorization: `Bearer ${this.opts.apiKey}` } });
      this.ws = ws;
      let opened = false;
      ws.on('open', () => {
        opened = true;
        this.reconnects = 0;
        this.responseActive = false;
        this.sendSession();
        this.ctx.log('info', `realtime connected (${this.opts.model})`);
        // Connected is not enough: wait until the service has accepted the session settings, so a
        // rejected configuration is caught here (and the session can use another mind) instead of
        // leaving a character that never answers.
        this.accepted = (problem) => {
          this.accepted = null;
          clearTimeout(timer);
          if (!problem) return resolve();
          this.closed = true;
          ws.close();
          reject(new Error(problem));
        };
        const timer = setTimeout(() => this.accepted?.('the service did not confirm the session settings'), 4000);
      });
      ws.on('message', (raw) => {
        try {
          this.handle(JSON.parse(raw.toString()));
        } catch (e) {
          this.ctx.log('error', `realtime message handling failed: ${e}`);
        }
      });
      ws.on('error', (e) => {
        this.ctx.log('error', `realtime socket error: ${e.message}`);
        if (!opened) reject(e);
      });
      ws.on('close', (code, reason) => {
        if (this.closed) return;
        this.ctx.log('warn', `realtime closed (${code} ${reason}); reconnecting`);
        if (!opened) return;
        // Sessions are time limited upstream. Reconnect; long-term memory survives, chat history does not.
        const delay = Math.min(8000, 500 * 2 ** this.reconnects++);
        setTimeout(() => !this.closed && this.start().catch((e) => this.ctx.log('error', `realtime reconnect failed: ${e?.message ?? e}`)), delay);
      });
    });
  }

  /** Live audio call (browser). Audio is on the call's own tracks; events arrive as text. */
  private async startCall(): Promise<void> {
    const call = await this.opts.connect!({
      onMessage: (text) => {
        try {
          this.handle(JSON.parse(text));
        } catch (e) {
          this.ctx.log('error', `realtime message handling failed: ${e}`);
        }
      },
      onClose: () => {
        if (this.closed || this.call !== call) return;
        this.call = null;
        this.ctx.log('warn', 'live voice connection lost; reconnecting');
        const delay = Math.min(8000, 500 * 2 ** this.reconnects++);
        setTimeout(() => !this.closed && this.startCall().catch((e) => this.ctx.log('error', `live voice reconnect failed: ${e?.message ?? e}`)), delay);
      },
    });
    this.call = call;
    this.responseActive = false;
    this.sendSession();
    this.ctx.log('info', `live voice connected (${this.opts.model})`);
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => this.accepted?.('the service did not confirm the session settings'), 4000);
      this.accepted = (problem) => {
        this.accepted = null;
        clearTimeout(timer);
        if (!problem) {
          this.reconnects = 0;
          return resolve();
        }
        this.closed = true;
        call.close();
        reject(new Error(problem));
      };
    });
  }

  private up(event: Record<string, unknown>) {
    if (this.call) this.call.send(JSON.stringify(event));
    else if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(event));
  }

  private sendSession() {
    this.up({
      type: 'session.update',
      session: {
        type: 'realtime',
        instructions: this.instructions(),
        output_modalities: ['audio'],
        audio: {
          input: {
            ...(this.opts.connect ? {} : { format: { type: 'audio/pcm', rate: AUDIO_RATE } }), // a call negotiates its own audio
            transcription: { model: 'gpt-4o-mini-transcribe' },
            turn_detection: { type: 'server_vad', threshold: 0.6, silence_duration_ms: this.opts.silenceMs ?? 350, prefix_padding_ms: 200, create_response: true, interrupt_response: true },
          },
          output: { ...(this.opts.connect ? {} : { format: { type: 'audio/pcm', rate: AUDIO_RATE } }), voice: this.opts.voice },
        },
        tools: REALTIME_TOOLS,
        tool_choice: 'auto',
      },
    });
  }

  private instructions(): string {
    return `${SYSTEM}\n${VOICE_RULES}\n\n# Current situation\n${this.ctx.world.contextText()}\n\n# Your long-term memory\n${this.ctx.memory.summary()}`;
  }

  private lastInstructions = '';
  refreshContext() {
    const text = this.instructions();
    if (text === this.lastInstructions) return;
    this.lastInstructions = text;
    this.up({ type: 'session.update', session: { type: 'realtime', instructions: text } });
  }

  onAudio(pcm16: string) {
    if (this.opts.connect) return; // the microphone is already on the call
    this.up({ type: 'input_audio_buffer.append', audio: pcm16 });
  }

  onText(text: string) {
    this.ctx.timer.begin('text', text);
    this.ctx.timer.countLlmCall();
    this.up({ type: 'conversation.item.create', item: { type: 'message', role: 'user', content: [{ type: 'input_text', text }] } });
    this.requestResponse();
  }

  interrupt() {
    if (this.responseActive) this.up({ type: 'response.cancel' });
    this.ctx.send({ type: 'audio_stop' });
  }

  onFeedback(outcome: Record<string, unknown>, respond: boolean) {
    this.up({
      type: 'conversation.item.create',
      item: { type: 'message', role: 'user', content: [{ type: 'input_text', text: `[action_result] ${JSON.stringify(outcome)}` }] },
    });
    if (respond) this.requestResponse();
  }


  private viewSeq = 0;
  private lastViewId = '';
  /** Show the model what the user sees. Only the newest view is kept in the conversation. */
  onView(jpeg: string) {
    if (this.lastViewId) this.up({ type: 'conversation.item.delete', item_id: this.lastViewId });
    this.lastViewId = `view_${Date.now().toString(36)}_${++this.viewSeq}`;
    this.up({
      type: 'conversation.item.create',
      item: {
        id: this.lastViewId,
        type: 'message',
        role: 'user',
        content: [
          { type: 'input_text', text: '[view] This is what the user sees through the headset right now (you may be in the picture). Use it to answer questions about what is in front of them. It is not a request.' },
          { type: 'input_image', image_url: `data:image/jpeg;base64,${jpeg}` },
        ],
      },
    });
  }

  /** Ask for a model turn, but never on top of an active one or over the user's speech. */
  private requestResponse() {
    if (this.responseActive || this.userSpeaking) {
      this.wantResponse = true;
      return;
    }
    this.wantResponse = false;
    this.responseActive = true;
    this.up({ type: 'response.create' });
  }

  private handle(ev: any) {
    if (this.accepted) {
      if (ev.type === 'session.updated') this.accepted();
      else if (ev.type === 'error') return this.accepted(`settings rejected: ${ev.error?.message ?? JSON.stringify(ev)}`);
    }
    switch (ev.type) {
      case 'response.created':
        this.responseActive = true;
        this.ctx.timer.mark('llm_first_token');
        this.ctx.send({ type: 'state', status: 'thinking' });
        break;

      // GA and beta event names for the same things.
      case 'response.output_audio.delta':
      case 'response.audio.delta':
        this.ctx.timer.mark('first_audio');
        this.ctx.send({ type: 'audio', pcm16: ev.delta });
        break;
      case 'response.output_audio_transcript.done':
      case 'response.audio_transcript.done':
        if (ev.transcript) this.ctx.send({ type: 'transcript', role: 'assistant', text: ev.transcript });
        break;
      case 'conversation.item.input_audio_transcription.completed':
        if (ev.transcript) {
          this.ctx.timer.note({ input: String(ev.transcript).slice(0, 80) });
          this.ctx.send({ type: 'transcript', role: 'user', text: ev.transcript });
        }
        break;

      // On a call the voice is a live track, so these mark when it starts and stops being heard.
      case 'output_audio_buffer.started':
        this.ctx.timer.mark('first_audio');
        this.ctx.send({ type: 'state', status: 'speaking' });
        break;
      case 'output_audio_buffer.stopped':
      case 'output_audio_buffer.cleared':
        if (!this.responseActive) this.ctx.send({ type: 'state', status: 'idle' });
        break;

      case 'input_audio_buffer.speech_started':
        this.userSpeaking = true;
        this.refreshContext(); // where everyone is and what the user is looking at, as of this sentence
        // Barge-in: the server cancels its own response; we must drop audio already queued on the device.
        this.ctx.send({ type: 'audio_stop' });
        this.ctx.send({ type: 'state', status: 'listening' });
        break;
      case 'input_audio_buffer.speech_stopped':
        this.userSpeaking = false;
        this.ctx.timer.begin('voice', '(speech)');
        this.ctx.timer.countLlmCall();
        break;

      // A skill call is complete: act on it now, while the rest of the model's turn is still arriving.
      case 'response.output_item.done':
        if (ev.item?.type === 'function_call' && ev.item.call_id && !this.handledCalls.has(ev.item.call_id)) this.runCalls([ev.item]);
        break;

      case 'response.done': {
        this.responseActive = false;
        const output: any[] = ev.response?.output ?? [];
        for (const item of output) {
          if (item?.type !== 'message') continue;
          const said = (item.content ?? []).map((p: any) => p?.transcript || p?.text || '').filter(Boolean).join(' ').trim();
          if (said) this.ctx.send({ type: 'transcript', role: 'assistant', text: said });
        }
        const calls = output.filter((i) => i.type === 'function_call' && i.call_id && !this.handledCalls.has(i.call_id));
        if (ev.response?.status === 'failed') this.ctx.log('error', `response failed: ${JSON.stringify(ev.response?.status_details)}`);
        if (calls.length) this.runCalls(calls);
        if (this.ranCalls) {
          // The model hears how its skills went (usually "started") and says its few words.
          this.ranCalls = false;
          void this.running.then(() => this.requestResponse());
        } else if (this.wantResponse) this.requestResponse();
        else this.ctx.send({ type: 'state', status: 'idle' });
        break;
      }

      case 'error': {
        const msg = ev.error?.message ?? JSON.stringify(ev);
        if (/item.*(not found|does not exist)/i.test(msg)) break; // an old view that was already gone
        // Cancelling when nothing is running is harmless.
        if (/no active response|cancellation failed/i.test(msg)) break;
        if (/active response/i.test(msg)) {
          this.wantResponse = true;
          break;
        }
        this.ctx.log('error', `realtime error: ${msg}`);
        break;
      }
    }
  }

  /** Run skill calls in order, each as soon as it is known, and hand the outcomes back to the model. */
  private runCalls(calls: any[]) {
    this.ranCalls = true;
    for (const call of calls) {
      this.handledCalls.add(call.call_id);
      this.running = this.running.then(async () => {
        let args: Record<string, unknown> = {};
        try {
          args = call.arguments ? JSON.parse(call.arguments) : {};
        } catch {
          /* the executor reports missing arguments */
        }
        this.ctx.log('info', `skill ${call.name}(${JSON.stringify(args)})`);
        const result = await this.ctx.skills.execute(call.name, args).catch((e) => ({ status: 'failed', reason: String(e?.message ?? e) }));
        this.ctx.log('info', `  -> ${JSON.stringify(result).slice(0, 300)}`);
        this.up({ type: 'conversation.item.create', item: { type: 'function_call_output', call_id: call.call_id, output: JSON.stringify(result) } });
      });
    }
  }

  close() {
    this.closed = true;
    this.call?.close();
    this.ws?.close();
  }
}
