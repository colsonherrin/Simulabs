import WebSocket from 'ws';
import { buildInstructions, type Brain, type BrainContext } from './brain.js';
import { AUDIO_RATE } from './protocol.js';
import { TOOLS } from './skills.js';

interface Opts {
  apiKey: string;
  model: string;
  voice: string;
  url?: string; // override for tests / proxies
}

/**
 * Speech-to-speech brain on the OpenAI Realtime API. One upstream WebSocket per headset.
 * The model hears the user, talks back, and picks skills through function calling.
 */
export class RealtimeBrain implements Brain {
  readonly name = 'realtime';
  private ws: WebSocket | null = null;
  private closed = false;
  private responseActive = false;
  private wantResponse = false;
  private userSpeaking = false;
  private reconnects = 0;
  private handledCalls = new Set<string>();

  constructor(
    private ctx: BrainContext,
    private opts: Opts,
  ) {}

  start(): Promise<void> {
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
        resolve();
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
        setTimeout(() => !this.closed && this.start().catch(() => {}), delay);
      });
    });
  }

  private up(event: Record<string, unknown>) {
    if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(event));
  }

  private sendSession() {
    this.up({
      type: 'session.update',
      session: {
        type: 'realtime',
        instructions: buildInstructions(this.ctx),
        output_modalities: ['audio'],
        audio: {
          input: {
            format: { type: 'audio/pcm', rate: AUDIO_RATE },
            transcription: { model: 'gpt-4o-mini-transcribe' },
            turn_detection: { type: 'server_vad', threshold: 0.6, silence_duration_ms: 500, create_response: true, interrupt_response: true },
          },
          output: { format: { type: 'audio/pcm', rate: AUDIO_RATE }, voice: this.opts.voice },
        },
        tools: TOOLS,
        tool_choice: 'auto',
      },
    });
  }

  refreshContext() {
    this.up({ type: 'session.update', session: { type: 'realtime', instructions: buildInstructions(this.ctx) } });
  }

  onAudio(pcm16: string) {
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

  onIdle() {
    this.up({
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'user',
        content: [{ type: 'input_text', text: '[idle] The user has been quiet for a while. If something in the room is worth a look, or you are far from the user, you may choose one skill to run and say one short sentence about it. Otherwise say nothing at all.' }],
      },
    });
    this.requestResponse();
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

      case 'input_audio_buffer.speech_started':
        this.userSpeaking = true;
        // Barge-in: the server cancels its own response; we must drop audio already queued on the device.
        this.ctx.send({ type: 'audio_stop' });
        this.ctx.send({ type: 'state', status: 'listening' });
        break;
      case 'input_audio_buffer.speech_stopped':
        this.userSpeaking = false;
        this.ctx.timer.begin('voice', '(speech)');
        this.ctx.timer.countLlmCall();
        break;

      case 'response.done': {
        this.responseActive = false;
        const output: any[] = ev.response?.output ?? [];
        const calls = output.filter((i) => i.type === 'function_call' && i.call_id && !this.handledCalls.has(i.call_id));
        if (ev.response?.status === 'failed') this.ctx.log('error', `response failed: ${JSON.stringify(ev.response?.status_details)}`);
        if (calls.length) void this.runCalls(calls);
        else if (this.wantResponse) this.requestResponse();
        else this.ctx.send({ type: 'state', status: 'idle' });
        break;
      }

      case 'error': {
        const msg = ev.error?.message ?? JSON.stringify(ev);
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

  private async runCalls(calls: any[]) {
    for (const call of calls) {
      this.handledCalls.add(call.call_id);
      let args: Record<string, unknown> = {};
      try {
        args = call.arguments ? JSON.parse(call.arguments) : {};
      } catch {
        /* the executor reports missing arguments */
      }
      this.ctx.log('info', `skill ${call.name}(${JSON.stringify(args)})`);
      const result = await this.ctx.skills.execute(call.name, args);
      this.ctx.log('info', `  -> ${JSON.stringify(result).slice(0, 300)}`);
      this.up({ type: 'conversation.item.create', item: { type: 'function_call_output', call_id: call.call_id, output: JSON.stringify(result) } });
    }
    this.requestResponse();
  }

  close() {
    this.closed = true;
    this.ws?.close();
  }
}
