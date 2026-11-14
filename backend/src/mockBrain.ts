import type { Brain, BrainContext } from './brain.js';

/**
 * No-network stand-in for the voice model. Typed text + keyword rules. It exists so the device
 * protocol, skill execution and feedback loop can be tested without credentials. It is NOT an AI
 * and must not be used for a demo.
 */
export class MockBrain implements Brain {
  readonly name = 'mock';
  constructor(private ctx: BrainContext) {}

  async start() {}
  onAudio() {}
  interrupt() {
    this.ctx.send({ type: 'audio_stop' });
  }
  refreshContext() {}
  onIdle() {}
  close() {}

  private say(text: string) {
    this.ctx.send({ type: 'transcript', role: 'assistant', text });
  }

  private mentioned(text: string) {
    return this.ctx.world.objects.find((o) => text.includes(o.label.toLowerCase()) || text.includes(o.id.toLowerCase())) ?? this.ctx.world.gazeTarget();
  }

  async onText(raw: string) {
    const text = raw.toLowerCase();
    this.ctx.timer.begin('text', raw);
    this.ctx.send({ type: 'transcript', role: 'user', text: raw });
    const run = async (name: string, args: Record<string, unknown> = {}) => {
      const r = await this.ctx.skills.execute(name, args);
      this.ctx.log('info', `[mock] ${name}(${JSON.stringify(args)}) -> ${JSON.stringify(r).slice(0, 200)}`);
      return r;
    };

    if (/\b(stop|wait|halt)\b/.test(text)) {
      await run('stop_moving');
      return this.say('Okay, stopping.');
    }
    if (/come (over )?here|come to me|over here/.test(text)) {
      const r = await run('approach_user');
      return this.say(r.status === 'started' ? 'Of course.' : `I can't: ${r.reason}`);
    }
    if (/what do you see|what's (over )?there|look around/.test(text)) {
      const o = this.ctx.world.gazeTarget() ?? this.ctx.world.objects[0];
      return this.say(o ? `There's a ${o.label} over there. Want me to take a closer look?` : "I don't know of anything here yet.");
    }
    const mark = text.match(/this is (?:a |an |my |the )?([a-z ]+)/);
    if (mark) {
      const r = await run('register_marker', { label: mark[1].trim() });
      return this.say(r.status === 'succeeded' ? `Got it, I'll remember the ${mark[1].trim()}.` : `I couldn't mark that: ${r.reason}`);
    }
    if (/scan/.test(text)) {
      const r = await run('scan_surroundings');
      return this.say(r.status === 'started' ? 'Let me take a look.' : `I can't: ${r.reason}`);
    }
    if (/check|inspect|closer look|go (to|check)|walk to/.test(text)) {
      const o = this.mentioned(text);
      if (!o) return this.say("I'm not sure what you mean.");
      const r = await run(/walk to|go to/.test(text) ? 'walk_to' : 'inspect_object', /walk to|go to/.test(text) ? { target_id: o.id } : { id: o.id });
      return this.say(r.status === 'started' ? "Sure, I'll take a look." : `I can't: ${r.reason}`);
    }
    if (/look at/.test(text)) {
      const o = /\bme\b/.test(text) ? { id: 'user' } : this.mentioned(text);
      if (!o) return this.say("I'm not sure what to look at.");
      const r = await run('look_at', { target_id: o.id });
      return this.say(r.status === 'succeeded' ? 'Looking.' : `I can't: ${r.reason}`);
    }
    this.say('(mock brain) Try: "come here", "what do you see", "check out the chair", "this is a lamp", "stop".');
  }

  onFeedback(outcome: Record<string, unknown>, respond: boolean) {
    if (!respond) return;
    this.say(outcome.status === 'succeeded' ? `Done: ${outcome.skill}${outcome.target_id ? ` ${outcome.target_id}` : ''}.` : `That didn't work: ${outcome.reason}`);
  }
}
