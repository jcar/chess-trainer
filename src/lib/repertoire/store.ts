// Persistent state for the Repertoire Lab. Same provider-less singleton pattern
// as lib/trainer/store.ts and lib/srs/store.ts (localStorage +
// useSyncExternalStore, frozen SSR snapshot so hydration matches).
//
// Kept separate from lib/trainer/store.ts on purpose: that store holds the
// Openings Trainer's LINE-keyed mastery and keeps working untouched. This one
// holds the two-colour repertoire and — the part the trainer has no concept of —
// the `choices` map that makes the repertoire a function position -> one move.

import type { NodeKey } from "./tree";

const STORAGE_KEY = "chess-trainer:repertoire:v1";

export interface RepertoireData {
  /** Opening ids that make up the White repertoire. */
  white: string[];
  /** Opening ids that make up the Black repertoire. */
  black: string[];
  /**
   * Resolved choice points. The corpus offers 2-7 of our own moves at ~60
   * positions (the start position alone gives e4/d4/c4/b3/Nf3); a repertoire
   * has to commit to one. Missing entries fall back to the main authored move.
   */
  choices: Record<NodeKey, string>;
  /** Gap node keys the learner has dismissed ("don't nag me about this"). */
  suppressed: NodeKey[];
  /** Whether the one-time, non-destructive `ol:` -> `rn:` seed has run. */
  seeded: boolean;
  version: 1;
}

export const EMPTY_REPERTOIRE: RepertoireData = Object.freeze({
  white: [],
  black: [],
  choices: {},
  suppressed: [],
  seeded: false,
  version: 1,
}) as RepertoireData;

const SERVER_SNAPSHOT: RepertoireData = EMPTY_REPERTOIRE;

function blank(): RepertoireData {
  return { white: [], black: [], choices: {}, suppressed: [], seeded: false, version: 1 };
}

function coerce(parsed: Partial<RepertoireData> | null): RepertoireData {
  if (!parsed || typeof parsed !== "object") return blank();
  return {
    white: Array.isArray(parsed.white) ? parsed.white : [],
    black: Array.isArray(parsed.black) ? parsed.black : [],
    choices:
      parsed.choices && typeof parsed.choices === "object" ? { ...parsed.choices } : {},
    suppressed: Array.isArray(parsed.suppressed) ? parsed.suppressed : [],
    seeded: parsed.seeded === true,
    version: 1,
  };
}

/** Every opening id in the repertoire, both colours, deduped. */
export function allOpeningIds(data: RepertoireData): string[] {
  return [...new Set([...data.white, ...data.black])];
}

/** Has the learner set up a repertoire at all? */
export function hasRepertoire(data: RepertoireData): boolean {
  return data.white.length > 0 || data.black.length > 0;
}

class LocalRepertoireStore {
  private cache: RepertoireData | null = null;
  private listeners = new Set<() => void>();

  private load(): RepertoireData {
    if (typeof window === "undefined") return SERVER_SNAPSHOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return blank();
      return coerce(JSON.parse(raw) as Partial<RepertoireData>);
    } catch {
      return blank();
    }
  }

  private persist(next: RepertoireData): void {
    this.cache = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* best-effort: ignore quota / privacy-mode failures */
    }
    this.listeners.forEach((l) => l());
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): RepertoireData => {
    if (this.cache === null) this.cache = this.load();
    return this.cache;
  };

  getServerSnapshot = (): RepertoireData => SERVER_SNAPSHOT;

  /** Replace both colours at once (the Chooser's "Lock it in"). */
  setRepertoire = (white: string[], black: string[]): void => {
    this.persist({
      ...this.getSnapshot(),
      white: [...new Set(white)],
      black: [...new Set(black)],
    });
  };

  toggleOpening = (color: "white" | "black", id: string): void => {
    const data = this.getSnapshot();
    const list = data[color];
    this.persist({
      ...data,
      [color]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
    });
  };

  /** Commit to one of our candidate moves at a choice point. */
  setChoice = (key: NodeKey, san: string): void => {
    const data = this.getSnapshot();
    this.persist({ ...data, choices: { ...data.choices, [key]: san } });
  };

  clearChoice = (key: NodeKey): void => {
    const data = this.getSnapshot();
    const choices = { ...data.choices };
    delete choices[key];
    this.persist({ ...data, choices });
  };

  suppressGap = (key: NodeKey): void => {
    const data = this.getSnapshot();
    if (data.suppressed.includes(key)) return;
    this.persist({ ...data, suppressed: [...data.suppressed, key] });
  };

  unsuppressGap = (key: NodeKey): void => {
    const data = this.getSnapshot();
    this.persist({ ...data, suppressed: data.suppressed.filter((k) => k !== key) });
  };

  markSeeded = (): void => {
    this.persist({ ...this.getSnapshot(), seeded: true });
  };

  /** Adopt a shared repertoire wholesale (from a ?r= link). */
  adopt = (next: Pick<RepertoireData, "white" | "black" | "choices">): void => {
    this.persist({
      ...this.getSnapshot(),
      white: [...new Set(next.white)],
      black: [...new Set(next.black)],
      choices: { ...next.choices },
    });
  };

  reset = (): void => this.persist(blank());
}

export const repertoireStore = new LocalRepertoireStore();
