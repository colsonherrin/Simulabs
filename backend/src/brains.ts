// Every mind the backend can run. (The browser build has its own, smaller factory.)
import type { Brain, BrainContext } from './brain.js';
import { ClaudeBrain } from './claudeBrain.js';
import { MockBrain } from './mockBrain.js';
import { OpenAIBrain } from './openaiBrain.js';
import { RealtimeBrain } from './realtimeBrain.js';
import type { ServerOptions } from './session.js';
import { Ears, Mouth } from './speech.js';

export function makeBrain(opts: ServerOptions, ctx: BrainContext, log: (level: 'info' | 'warn' | 'error', m: string) => void, kind: ServerOptions['brain']): Brain {
    const speech = () => (opts.apiKey || opts.ttsBaseUrl ? new Mouth({ apiKey: opts.ttsApiKey ?? opts.apiKey ?? '', model: opts.ttsModel ?? 'gpt-4o-mini-tts', voice: opts.realtimeVoice, baseUrl: opts.ttsBaseUrl }, log) : null);
    const gpt = (listening: boolean) =>
      new OpenAIBrain(ctx, {
        apiKey: opts.apiKey ?? '',
        baseUrl: opts.gptBaseUrl,
        model: opts.gptModel ?? 'gpt-5.4-mini',
        effort: opts.gptEffort ?? 'none',
        ears: listening
          ? new Ears({ apiKey: opts.apiKey ?? '', model: opts.realtimeModel, transcribeModel: opts.sttModel ?? 'gpt-4o-mini-transcribe', mode: 'http', httpBaseUrl: opts.gptBaseUrl, silenceMs: opts.sttSilenceMs }, log)
          : opts.apiKey && !opts.gptBaseUrl
            ? new Ears({ apiKey: opts.apiKey, model: opts.realtimeModel, transcribeModel: opts.sttModel ?? 'gpt-4o-mini-transcribe', url: opts.realtimeUrl, mode: opts.sttMode, silenceMs: opts.sttSilenceMs }, log)
            : null,
        mouth: speech(),
        worldEventMinGapMs: (opts.worldEventMinGapSec ?? 8) * 1000,
        ...(listening ? { audioModel: opts.audioModel ?? 'gpt-audio-mini', voice: opts.audioVoice ?? 'alloy' } : {}),
      });
    if (kind === 'mock') return new MockBrain(ctx);
    if (kind === 'claude')
      return new ClaudeBrain(ctx, {
        apiKey: opts.anthropicKey,
        baseURL: opts.anthropicBaseUrl,
        model: opts.claudeModel ?? 'claude-opus-5-5',
        effort: opts.claudeEffort ?? 'low',
        fast: opts.claudeFast ?? false,
        // Claude has no audio interface: speech in and out are separate, swappable services.
        ears: opts.apiKey ? new Ears({ apiKey: opts.apiKey, model: opts.realtimeModel, transcribeModel: opts.sttModel ?? 'gpt-4o-mini-transcribe', url: opts.realtimeUrl, mode: opts.sttMode }, log) : null,
        mouth: opts.apiKey || opts.ttsBaseUrl ? new Mouth({ apiKey: opts.ttsApiKey ?? opts.apiKey ?? '', model: opts.ttsModel ?? 'gpt-4o-mini-tts', voice: opts.realtimeVoice, baseUrl: opts.ttsBaseUrl }, log) : null,
        worldEventMinGapMs: (opts.worldEventMinGapSec ?? 8) * 1000,
      });
    if (kind === 'gpt') return gpt(false);
    if (kind === 'audio') return gpt(true);
    return new RealtimeBrain(ctx, { apiKey: opts.apiKey!, model: opts.realtimeModel, voice: opts.realtimeVoice, url: opts.realtimeUrl, silenceMs: opts.realtimeSilenceMs });
}
