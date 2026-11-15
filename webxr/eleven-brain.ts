// A mind for the stand-alone page that lives on ElevenLabs: a public voice agent whose brain is
// Claude. ElevenLabs' library carries the microphone and her voice as live audio; when Claude
// calls a skill, the call arrives here and is run by the same skill executor every other mind
// uses, so the body behaves identically. The page needs only the agent's id, which is not a secret.
import { Conversation } from '@elevenlabs/client';
import type { Brain, BrainContext } from '../backend/src/brain.js';
import { TOOLS } from '../backend/src/skills.js';

export class ElevenBrain implements Brain {
  readonly name = 'claude (elevenlabs)';
  private conv: any = null;
  private closed = false;
  private lastContext = '';
  private contextTimer: any = null;
  private reconnects = 0;

  constructor(
    private ctx: BrainContext,
    private agentId: string,
    /** Gives the page a way to read how loud her voice is right now (for the mouth). */
    private onVoiceLevel: (read: (() => number) | null) => void,
  ) {}

  async start(): Promise<void> {
    const { ctx } = this;
    const clientTools: Record<string, (p: any) => Promise<string>> = {};
    for (const t of TOOLS) {
      clientTools[t.name] = async (params: any) => {
        ctx.log('info', `skill ${t.name}(${JSON.stringify(params ?? {})})`);
        const result = await ctx.skills.execute(t.name, params ?? {}).catch((e: any) => ({ status: 'failed', reason: String(e?.message ?? e) }));
        return JSON.stringify(result);
      };
    }
    const options = (connectionType: 'webrtc' | 'websocket') => ({
      agentId: this.agentId,
      connectionType,
      clientTools,
      onConnect: () => ctx.log('info', `voice agent connected (${connectionType})`),
      onDisconnect: (d: any) => {
        if (this.closed) return;
        this.onVoiceLevel(null);
        this.conv = null;
        // Sessions have a maximum length and networks drop: pick the conversation back up by itself.
        ctx.log('warn', `voice connection ended${d?.reason ? ` (${d.reason}${d.message ? ': ' + d.message : ''})` : ''}; reconnecting`);
        const wait = Math.min(15000, 1500 * 2 ** this.reconnects++);
        setTimeout(() => !this.closed && this.start().then(() => (this.reconnects = 0), (e) => ctx.log('error', `Could not reconnect her voice: ${e?.message ?? e}. Reload the page.`)), wait);
      },
      onError: (message: string) => ctx.log('error', `voice agent: ${message}`),
      onMessage: (m: any) => ctx.send({ type: 'transcript', role: m.source === 'user' ? 'user' : 'assistant', text: String(m.message) }),
      onModeChange: (m: any) => ctx.send({ type: 'state', status: m.mode === 'speaking' ? 'speaking' : 'idle' }),
    });
    try {
      this.conv = await Conversation.startSession(options('webrtc') as any);
    } catch (e: any) {
      ctx.log('warn', `live-audio route failed (${e?.message ?? e}); trying the socket route`);
      this.conv = await Conversation.startSession(options('websocket') as any);
    }
    this.onVoiceLevel(() => {
      try {
        return Math.min(1, this.conv.getOutputVolume() * 2.2);
      } catch {
        return 0;
      }
    });
    this.lastContext = '';
    this.refreshContext();
  }

  onAudio() {
    /* the microphone is already on the call */
  }

  onText(text: string) {
    this.ctx.send({ type: 'transcript', role: 'user', text });
    this.conv?.sendUserMessage(text);
  }

  interrupt() {
    this.ctx.send({ type: 'audio_stop' });
  }

  onFeedback(outcome: Record<string, unknown>) {
    this.conv?.sendUserMessage(`[action_result] ${JSON.stringify(outcome)}`);
  }

  onWorldEvent(description: string, urgent: boolean) {
    if (urgent) this.conv?.sendUserMessage(`[world_event] ${description}`);
    else this.conv?.sendContextualUpdate(`[world_event] ${description}`);
  }

  /** Keep Claude's picture of the room current, without interrupting: at most one update every two seconds. */
  refreshContext() {
    if (this.contextTimer || !this.conv) return;
    this.contextTimer = setTimeout(() => {
      this.contextTimer = null;
      const text = `[context]\n${this.ctx.world.contextText()}\nmemory:\n${this.ctx.memory.summary()}\n[/context]`;
      if (text === this.lastContext || !this.conv) return;
      this.lastContext = text;
      try {
        this.conv.sendContextualUpdate(text);
      } catch {
        /* the next change sends it */
      }
    }, 2000);
  }

  close() {
    this.closed = true;
    if (this.contextTimer) clearTimeout(this.contextTimer);
    this.onVoiceLevel(null);
    try {
      this.conv?.endSession();
    } catch {
      /* already gone */
    }
  }
}
