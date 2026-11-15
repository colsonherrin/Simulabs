// The backend's session, running inside the page. Used when the page is hosted on its own
// (GitHub Pages) and the user has given it an OpenAI key: the browser then talks to OpenAI
// directly and no computer running the backend is needed. Same code as the backend, same protocol;
// only the transport differs (function calls instead of a WebSocket).
import { Memory } from '../backend/src/memory.js';
import { OpenAIBrain } from '../backend/src/openaiBrain.js';
import { Session, type ServerOptions } from '../backend/src/session.js';
import { Ears, Mouth } from '../backend/src/speech.js';

export function startLocal(apiKey: string, toDevice: (text: string) => void): { send(text: string): void; close(): void } {
  const opts: ServerOptions = { port: 0, brain: 'audio', apiKey, realtimeModel: 'gpt-realtime', realtimeVoice: 'alloy', visionModel: 'gpt-4.1-mini', memoryPath: 'memory.json' };
  let open = true;
  const session = new Session(
    { send: (text) => void Promise.resolve().then(() => open && toDevice(text)), open: () => open },
    opts,
    new Memory('memory.json'),
    (o, ctx, log) =>
      new OpenAIBrain(ctx, {
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
