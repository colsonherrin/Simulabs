import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export interface SkillStep {
  skill: string; // a primitive skill name
  target?: string; // an object id, "user", or the placeholder "$target"
}

export interface LearnedSkill {
  name: string;
  description: string;
  steps: SkillStep[];
  createdAt: string;
  uses: number;
  successes: number;
}

export interface Episode {
  t: string;
  skill: string;
  target?: string;
  status: 'succeeded' | 'failed';
  reason?: string;
}

interface MemoryData {
  objectNotes: Record<string, { label: string; notes: string[]; updatedAt: string }>;
  skillStats: Record<string, { ok: number; fail: number; lastFailReason?: string }>;
  learnedSkills: Record<string, LearnedSkill>;
  episodes: Episode[];
}

const empty = (): MemoryData => ({ objectNotes: {}, skillStats: {}, learnedSkills: {}, episodes: [] });

/**
 * Voyager-style long-term memory: what was tried, what worked, notes about things, and skills
 * composed out of primitives. Plain JSON on disk. This is bookkeeping the LLM reads back, not
 * neural reinforcement learning, and nothing here is executable code.
 */
export class Memory {
  data: MemoryData = empty();

  constructor(private path: string | null) {
    if (path && existsSync(path)) {
      try {
        this.data = { ...empty(), ...JSON.parse(readFileSync(path, 'utf8')) };
      } catch (e) {
        console.warn(`[memory] could not read ${path}, starting empty:`, e);
      }
    }
  }

  private save() {
    if (!this.path) return;
    try {
      mkdirSync(dirname(this.path), { recursive: true });
      writeFileSync(this.path, JSON.stringify(this.data, null, 2));
    } catch (e) {
      console.warn('[memory] save failed:', e);
    }
  }

  recordOutcome(skill: string, target: string | undefined, status: 'succeeded' | 'failed', reason?: string) {
    const st = (this.data.skillStats[skill] ??= { ok: 0, fail: 0 });
    if (status === 'succeeded') st.ok++;
    else {
      st.fail++;
      st.lastFailReason = reason;
    }
    this.data.episodes.push({ t: new Date().toISOString(), skill, target, status, reason });
    if (this.data.episodes.length > 200) this.data.episodes.splice(0, this.data.episodes.length - 200);
    this.save();
  }

  rememberObject(id: string, label: string, note: string) {
    const rec = (this.data.objectNotes[id] ??= { label, notes: [], updatedAt: '' });
    rec.label = label;
    if (note && !rec.notes.includes(note)) rec.notes.push(note);
    if (rec.notes.length > 8) rec.notes.shift();
    rec.updatedAt = new Date().toISOString();
    this.save();
  }

  notesFor(id: string): string[] {
    return this.data.objectNotes[id]?.notes ?? [];
  }

  saveSkill(skill: Omit<LearnedSkill, 'createdAt' | 'uses' | 'successes'>) {
    const prev = this.data.learnedSkills[skill.name];
    this.data.learnedSkills[skill.name] = {
      ...skill,
      createdAt: prev?.createdAt ?? new Date().toISOString(),
      uses: prev?.uses ?? 0,
      successes: prev?.successes ?? 0,
    };
    this.save();
  }

  skillUsed(name: string, ok: boolean) {
    const s = this.data.learnedSkills[name];
    if (!s) return;
    s.uses++;
    if (ok) s.successes++;
    this.save();
  }

  /** Text block for the system prompt. */
  summary(): string {
    const lines: string[] = [];
    const learned = Object.values(this.data.learnedSkills);
    if (learned.length) {
      lines.push('Skills you composed earlier (call with run_skill):');
      for (const s of learned)
        lines.push(`- ${s.name}: ${s.description} [${s.steps.map((x) => `${x.skill}(${x.target ?? ''})`).join(' -> ')}] worked ${s.successes}/${s.uses} times`);
    }
    const failing = Object.entries(this.data.skillStats).filter(([, v]) => v.fail > 0);
    if (failing.length) {
      lines.push('Past failures to learn from:');
      for (const [k, v] of failing) lines.push(`- ${k}: failed ${v.fail}x (ok ${v.ok}x), last reason: ${v.lastFailReason ?? 'unknown'}`);
    }
    const notes = Object.entries(this.data.objectNotes).filter(([, v]) => v.notes.length);
    if (notes.length) {
      lines.push('Notes you saved about things (ids may differ between sessions, match by label):');
      for (const [id, v] of notes) lines.push(`- ${id} (${v.label}): ${v.notes.join('; ')}`);
    }
    const recent = this.data.episodes.slice(-5);
    if (recent.length) {
      lines.push('Most recent actions:');
      for (const e of recent) lines.push(`- ${e.skill}(${e.target ?? ''}) ${e.status}${e.reason ? `: ${e.reason}` : ''}`);
    }
    return lines.length ? lines.join('\n') : 'Nothing remembered yet.';
  }
}
