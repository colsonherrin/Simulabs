/**
 * Per-turn latency breakdown. A turn starts when the user stops speaking (or typed text arrives)
 * and collects the first occurrence of each milestone, in milliseconds from that start:
 *
 *   transcript        speech-to-text returned the words            (voice only)
 *   llm_request       the reasoning request left the backend
 *   llm_first_token   first streamed event came back
 *   action_dispatched the first action was sent to the headset
 *   device_started    the body reported it began moving            (includes local path planning)
 *   speech_text       first sentence was ready to be spoken
 *   first_audio       first synthesized audio left the backend
 *
 * plan_ms is the headset's own measurement of validation + path planning for that action.
 */
export interface TurnRecord {
  at: string;
  trigger: 'voice' | 'text' | 'event';
  input: string;
  ms: Record<string, number>;
  plan_ms?: number;
  path_m?: number;
  llm_calls: number;
}

export class TurnTimer {
  readonly history: TurnRecord[] = [];
  onRecord: (r: TurnRecord) => void = () => {};
  private current: TurnRecord | null = null;
  private t0 = 0;
  private flushTimer: NodeJS.Timeout | null = null;

  /** `t0` lets voice turns start at end-of-speech even though we learn of the turn later. */
  begin(trigger: TurnRecord['trigger'], input: string, t0 = performance.now()) {
    this.flush();
    this.t0 = t0;
    this.current = { at: new Date().toISOString(), trigger, input: input.slice(0, 80), ms: {}, llm_calls: 0 };
    // A turn is "over" for measurement purposes a few seconds in; later milestones belong to follow-ups.
    this.flushTimer = setTimeout(() => this.flush(), 8000);
  }

  mark(name: string) {
    if (!this.current || name in this.current.ms) return;
    this.current.ms[name] = Math.round(performance.now() - this.t0);
  }

  note(fields: Partial<Pick<TurnRecord, 'plan_ms' | 'path_m' | 'input'>>) {
    if (this.current) Object.assign(this.current, fields);
  }

  countLlmCall() {
    if (this.current) this.current.llm_calls++;
  }

  flush() {
    if (this.flushTimer) clearTimeout(this.flushTimer);
    this.flushTimer = null;
    const r = this.current;
    this.current = null;
    if (!r || Object.keys(r.ms).length === 0) return;
    this.history.push(r);
    if (this.history.length > 200) this.history.shift();
    this.onRecord(r);
  }

  /** Median and p90 per milestone over recorded turns. */
  static summarize(records: TurnRecord[]) {
    const cols: Record<string, number[]> = {};
    for (const r of records) {
      for (const [k, v] of Object.entries(r.ms)) (cols[k] ??= []).push(v);
      if (r.plan_ms !== undefined) (cols.plan_ms ??= []).push(r.plan_ms);
    }
    const out: Record<string, { n: number; p50: number; p90: number }> = {};
    for (const [k, v] of Object.entries(cols)) {
      v.sort((a, b) => a - b);
      out[k] = { n: v.length, p50: v[Math.floor((v.length - 1) * 0.5)], p90: v[Math.floor((v.length - 1) * 0.9)] };
    }
    return out;
  }
}
