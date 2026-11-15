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
  /** HTTP mode only: enough continuous speech that it is clearly a person talking, not a noise. */
  onSpeechConfirmed: () => void = () => {};
  /**
   * HTTP mode only. If set, each finished utterance is handed over as raw PCM16 and is NOT
   * transcribed here: the caller sends the audio itself to a model that listens directly.
   */
  onUtterance: ((pcm: Buffer) => void) | null = null;
  /**
   * HTTP mode only. Fired after a very short pause with the utterance so far, so the caller can
   * start answering before the pause is long enough to be sure. Followed by either onUtterance
   * (the pause held: go ahead) or onResumed (the user kept talking: throw the early start away).
   */
  onEarly: ((pcm: Buffer) => void) | null = null;
  onResumed: () => void = () => {};
  private ws: WebSocket | null = null;
  private closed = false;
  private retries = 0;
  /** 'stream' = live socket with server-side speech detection; 'http' = local speech detection + one upload per utterance. */
  mode: 'stream' | 'http' = 'stream';
  private vad = { noise: 0.004, speaking: false, confirmed: false, early: false, voicedMs: 0, silentMs: 0, chunks: [] as Buffer[], pre: [] as Buffer[], ms: 0 };

  constructor(
    private opts: { apiKey: string; model: string; transcribeModel: string; url?: string; mode?: 'stream' | 'http'; httpBaseUrl?: string; silenceMs?: number },
    private log: (level: 'info' | 'warn' | 'error', m: string) => void,
  ) {}

  /**
   * Connect. If the live socket cannot be opened (networks that block WebSockets), hearing falls
   * back to plain HTTPS: slower by roughly the upload of one utterance, but it works anywhere.
   */
  async start(): Promise<void> {
    if (this.opts.mode === 'http') {
      this.mode = 'http';
      return;
    }
    try {
      await this.connect();
    } catch (e) {
      this.mode = 'http';
      this.log('warn', `Live speech-to-text is unreachable (${(e as any)?.message ?? e}); hearing through plain HTTPS instead.`);
    }
  }

  private connect(): Promise<void> {
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
        setTimeout(() => !this.closed && this.connect().catch(() => {}), delay);
      });
    });
  }

  audio(pcm16: string) {
    if (this.mode === 'http') this.detect(Buffer.from(pcm16, 'base64'));
    else if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify({ type: 'input_audio_buffer.append', audio: pcm16 }));
  }

  /** Local speech detection for HTTP mode: loudness against a slowly tracked noise floor. */
  private detect(chunk: Buffer) {
    const v = this.vad;
    const samples = chunk.length >> 1;
    if (samples === 0) return;
    let sum = 0;
    for (let i = 0; i < samples; i++) {
      const x = chunk.readInt16LE(i * 2) / 32768;
      sum += x * x;
    }
    const rms = Math.sqrt(sum / samples);
    const ms = (samples / AUDIO_RATE) * 1000;
    const loud = rms > Math.max(0.008, v.noise * 3.5);
    if (!loud) v.noise += (rms - v.noise) * 0.05;

    if (!v.speaking) {
      v.pre.push(chunk);
      if (v.pre.length > 6) v.pre.shift(); // about a third of a second of lead-in
      v.voicedMs = loud ? v.voicedMs + ms : 0;
      if (v.voicedMs >= 120) {
        v.speaking = true;
        v.confirmed = false;
        v.chunks = v.pre.splice(0);
        v.silentMs = 0;
        v.ms = v.voicedMs;
        this.onSpeechStart();
      }
      return;
    }
    v.chunks.push(chunk);
    v.ms += ms;
    if (loud) v.voicedMs += ms;
    if (!v.confirmed && v.voicedMs >= 300) {
      v.confirmed = true;
      this.onSpeechConfirmed();
    }
    v.silentMs = loud ? 0 : v.silentMs + ms;
    if (loud && v.early) {
      v.early = false;
      this.onResumed();
    } else if (!v.early && this.onEarly && v.silentMs >= 120 && v.voicedMs >= 250) {
      v.early = true;
      this.onEarly(Buffer.concat(v.chunks));
    }
    if (v.silentMs >= (this.opts.silenceMs ?? 350) || v.ms >= 20_000) {
      const audio = Buffer.concat(v.chunks);
      const voiced = v.voicedMs;
      v.speaking = false;
      v.early = false;
      v.chunks = [];
      v.voicedMs = 0;
      this.onSpeechEnd();
      if (voiced >= 250) {
        if (this.onUtterance) this.onUtterance(audio);
        else void this.transcribe(audio).then((text) => text && !this.closed && this.onTranscript(text));
      }
    }
  }

  /** PCM16 mono at the protocol rate, wrapped as a WAV file. */
  static wav(pcm: Buffer): Buffer {
    const header = Buffer.alloc(44);
    header.write('RIFF', 0);
    header.writeUInt32LE(36 + pcm.length, 4);
    header.write('WAVEfmt ', 8);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20);
    header.writeUInt16LE(1, 22);
    header.writeUInt32LE(AUDIO_RATE, 24);
    header.writeUInt32LE(AUDIO_RATE * 2, 28);
    header.writeUInt16LE(2, 32);
    header.writeUInt16LE(16, 34);
    header.write('data', 36);
    header.writeUInt32LE(pcm.length, 40);
    return Buffer.concat([header, pcm]);
  }

  /** One utterance to text over plain HTTPS. Returns '' on failure (logged). */
  async transcribe(pcm: Buffer): Promise<string> {
    const form = new FormData();
    form.append('model', this.opts.transcribeModel);
    form.append('file', new Blob([new Uint8Array(Ears.wav(pcm))], { type: 'audio/wav' }), 'speech.wav');
    try {
      const res = await fetch(`${this.opts.httpBaseUrl ?? 'https://api.openai.com/v1'}/audio/transcriptions`, { method: 'POST', headers: { authorization: `Bearer ${this.opts.apiKey}` }, body: form, signal: AbortSignal.timeout(15_000) });
      if (!res.ok) {
        this.log('error', `speech-to-text failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
        return '';
      }
      return String(((await res.json()) as any).text ?? '').trim();
    } catch (e) {
      this.log('error', `speech-to-text failed: ${(e as any)?.message ?? e}`);
      return '';
    }
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
