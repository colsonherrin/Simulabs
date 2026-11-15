// The backend's session, running inside the page. Used when the page is hosted on its own
// (GitHub Pages) and the user has given it an OpenAI key: the browser then talks to OpenAI
// directly and no computer running the backend is needed. Same code as the backend, same protocol;
// only the transport differs (function calls instead of a WebSocket).
import { Memory } from '../backend/src/memory.js';
import { OpenAIBrain } from '../backend/src/openaiBrain.js';
import { Session, type ServerOptions } from '../backend/src/session.js';
import { Ears, Mouth } from '../backend/src/speech.js';

// @ts-ignore plain JavaScript module
import { rtcConnector } from './realtime-rtc.js';
import { RealtimeBrain } from '../backend/src/realtimeBrain.js';

export interface Media {
  onMic(cb: (stream: MediaStream) => void): () => void;
  onVoice(stream: MediaStream | null): void;
}

/**
 * `mind` 'realtime' opens OpenAI's live voice call and, if that cannot be set up, falls back to
 * 'audio' (one request per utterance) by itself. 'audio' goes straight there.
 */
export function startLocal(apiKey: string, toDevice: (text: string) => void, media: Media, mind: 'realtime' | 'audio', pass?: () => Promise<string>): { send(text: string): void; close(): void } {
  // With only a relay pass there is no key for the per-sentence fallback, so the live call is the only mind.
  const opts: ServerOptions = { port: 0, brain: mind, apiKey: apiKey || undefined, brainFixed: !apiKey, realtimeModel: 'gpt-realtime', realtimeVoice: 'marin', visionModel: 'gpt-4.1-mini', memoryPath: 'memory.json' };
  let open = true;
  const session = new Session(
    { send: (text) => void Promise.resolve().then(() => open && toDevice(text)), open: () => open },
    opts,
    new Memory('memory.json'),
    (o, ctx, log, kind) =>
      kind === 'realtime'
        ? new RealtimeBrain(ctx, { apiKey, model: o.realtimeModel, voice: o.realtimeVoice, connect: rtcConnector(apiKey || pass, o.realtimeModel, media) })
        : new OpenAIBrain(ctx, {
            apiKey,
            model: 'gpt-5.4-mini',
            effort: 'none',
            ears: new Ears({ apiKey, model: o.realtimeModel, transcribeModel: 'gpt-4o-mini-transcribe', mode: 'http' }, log),
            mouth: new Mouth({ apiKey, model: 'gpt-4o-mini-tts', voice: 'alloy' }, log),
            worldEventMinGapMs: 8000,
            audioModel: 'gpt-audio-mini',
            voice: 'alloy',
          }),
  );
  return {
    send: (text) => open && session.receive(text),
    close: () => {
      open = false;
      session.dispose();
    },
  };
}
