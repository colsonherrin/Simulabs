import WebSocket from 'ws';
import { AUDIO_RATE } from './protocol.js';

/**
 * Ears: streaming speech-to-text with server-side voice activity detection.
 * Uses an OpenAI Realtime session configured to transcribe only (it never generates a reply),
 * so words arrive a few hundred milliseconds after the user stops talking.
 * Swap this class to change STT vendor; the brain only sees the three callbacks.
 */
export class Ears {
  onSpeechStart: () => void = () => {};
  onSpeechEnd: () => void = () => {};
  onTranscript: (text: string) => void = () => {};
  private ws: WebSocket | null = null;
  private closed = false;
  private retries = 0;

  constructor(
    private opts: { apiKey: string; model: string; transcribeModel: string; url?: string },
    private log: (level: 'info' | 'warn' | 'error', m: string) => void,
  ) {}

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = this.opts.url ?? `wss://api.openai.com/v1/realtime?model=${encodeURIComponent(this.opts.model)}`;
      const ws = new WebSocket(url, { headers: { Authorization: `Bearer ${this.opts.apiKey}` } });
      this.ws = ws;
      let opened = false;
      ws.on('open', () => {
        opened = true;
        this.retries = 0;
        ws.send(
          JSON.stringify({
            type: 'session.update',
            session: {
              type: 'realtime',
              output_modalities: ['text'],
              audio: {
                input: {
                  format: { type: 'audio/pcm', rate: AUDIO_RATE },
                  transcription: { model: this.opts.transcribeModel },
                  // create_response:false = listen and transcribe only; Claude does the thinking.
                  turn_detection: { type: 'server_vad', threshold: 0.6, silence_duration_ms: 400, create_response: false, interrupt_response: false },
                },
              },
            },
          }),
        );
        resolve();
      });
      ws.on('message', (raw) => {
        let ev: any;
        try {
          ev = JSON.parse(raw.toString());
        } catch {
          return;
        }
        if (ev.type === 'input_audio_buffer.speech_started') this.onSpeechStart();
        else if (ev.type === 'input_audio_buffer.speech_stopped') this.onSpeechEnd();
        else if (ev.type === 'conversation.item.input_audio_transcription.completed') {
          const text = String(ev.transcript ?? '').trim();
          if (text) this.onTranscript(text);
        } else if (ev.type === 'error') this.log('error', `speech-to-text error: ${ev.error?.message ?? JSON.stringify(ev)}`);
      });
      ws.on('error', (e) => {
        this.log('error', `speech-to-text socket error: ${e.message}`);
        if (!opened) reject(e);
      });
      ws.on('close', () => {
        if (this.closed || !opened) return;
        const delay = Math.min(8000, 500 * 2 ** this.retries++);
        setTimeout(() => !this.closed && this.start().catch(() => {}), delay);
      });
    });
  }

  audio(pcm16: string) {
    if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify({ type: 'input_audio_buffer.append', audio: pcm16 }));
  }

  close() {
    this.closed = true;
    this.ws?.close();
  }
}

/**
 * Mouth: sentence-at-a-time text-to-speech, streamed as PCM16 24 kHz.
 * Sentences are requested as soon as they are known (in parallel) and played strictly in order,
 * so the first words go out while the rest is still being generated. Never blocks the caller.
 */
export class Mouth {
  onAudio: (pcm16Base64: string) => void = () => {};
  onFirstAudio: () => void = () => {};
  private generation = 0;
  private tail: Promise<void> = Promise.resolve();
  private aborter = new AbortController();

  constructor(
    private opts: { apiKey: string; model: string; voice: string; baseUrl?: string; instructions?: string },
    private log: (level: 'info' | 'warn' | 'error', m: string) => void,
  ) {}

  say(text: string) {
    text = text.trim();
    if (!text) return;
    const gen = this.generation;
    const signal = this.aborter.signal;
    const response = fetch(`${this.opts.baseUrl ?? 'https://api.openai.com/v1'}/audio/speech`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${this.opts.apiKey}` },
      body: JSON.stringify({ model: this.opts.model, voice: this.opts.voice, input: text, response_format: 'pcm', ...(this.opts.instructions ? { instructions: this.opts.instructions } : {}) }),
      signal,
    });
    response.catch(() => {}); // handled in order below
    this.tail = this.tail.then(async () => {
      if (gen !== this.generation) return;
      try {
        const res = await response;
        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
        let carry: Buffer = Buffer.alloc(0);
        for await (const chunk of res.body as any as AsyncIterable<Uint8Array>) {
          if (gen !== this.generation) return;
          let buf = carry.length ? Buffer.concat([carry, chunk]) : Buffer.from(chunk);
          const even = buf.length - (buf.length % 2); // keep 16-bit samples whole
          carry = buf.subarray(even);
          buf = buf.subarray(0, even);
          if (buf.length) {
            this.onFirstAudio();
            this.onAudio(buf.toString('base64'));
          }
        }
      } catch (e: any) {
        if (gen === this.generation && e?.name !== 'AbortError') this.log('error', `text-to-speech failed: ${e?.message ?? e}`);
      }
    });
  }

  /** Drop everything queued or in flight (the user interrupted). */
  cancel() {
    this.generation++;
    this.aborter.abort();
    this.aborter = new AbortController();
    this.tail = Promise.resolve();
  }
}

/** Splits streamed text into speakable sentences as soon as each one is complete. */
export class SentenceChunker {
  private buf = '';
  constructor(private emit: (sentence: string) => void) {}
  push(delta: string) {
    this.buf += delta;
    for (;;) {
      const m = this.buf.match(/^([\s\S]*?[.!?…]+["')\]]*)(\s+|$)/);
      if (!m || (m[2] === '' && !/[.!?…]["')\]]*$/.test(this.buf))) break;
      // Do not split on a terminator at the very end of the buffer mid-stream ("3." of "3.5").
      if (m[2] === '') break;
      this.emit(m[1].trim());
      this.buf = this.buf.slice(m[0].length);
    }
  }
  flush() {
    const rest = this.buf.trim();
    this.buf = '';
    if (rest) this.emit(rest);
  }
}
