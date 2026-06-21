// Persistent state for the Openings Trainer. Mirrors the LocalProgressStore
// pattern (localStorage + useSyncExternalStore) but is a standalone singleton
// (no provider) like lib/rewards/streak.ts, so the /trainer page can use it
// without touching the root layout. Kept separate from lib/progress — different
// lifecycle (a personal repertoire + mastery, not lesson completion).

const STORAGE_KEY = "chess-trainer:trainer:v1";

/** How well a single repertoire line is known. */
export type MasteryLevel = "new" | "learning" | "mastered";

/** Clean recalls needed in a row to count a line as mastered. */
export const MASTERED_STREAK = 2;

export interface LineState {
  level: MasteryLevel;
  /** Consecutive clean recalls (no wrong move, no "Show me"). */
  streak: number;
  attempts: number;
  /** ISO timestamp of the last time this line was drilled. */
  lastSeenAt?: string;
}

export interface TrainerData {
  /** Selected opening ids that make up the user's repertoire. */
  repertoire: string[];
  /** Per-line mastery, keyed by `<openingId>:<color>:<lineSlug>`. */
  lines: Record<string, LineState>;
}

export const EMPTY_LINE_STATE: LineState = Object.freeze({
  level: "new",
  streak: 0,
  attempts: 0,
});

const SERVER_SNAPSHOT: TrainerData = Object.freeze({
  repertoire: [],
  lines: {},
});

function nowIso(): string {
  try {
    return new Date().toISOString();
  } catch {
    return "";
  }
}

/** Selector: a line's state, or the default "new" state. */
export function selectLineState(data: TrainerData, key: string): LineState {
  return data.lines[key] ?? EMPTY_LINE_STATE;
}

class LocalTrainerStore {
  private cache: TrainerData | null = null;
  private listeners = new Set<() => void>();

  private load(): TrainerData {
    if (typeof window === "undefined") return SERVER_SNAPSHOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { repertoire: [], lines: {} };
      const parsed = JSON.parse(raw) as Partial<TrainerData>;
      return {
        repertoire: Array.isArray(parsed.repertoire) ? parsed.repertoire : [],
        lines:
          parsed.lines && typeof parsed.lines === "object" ? parsed.lines : {},
      };
    } catch {
      return { repertoire: [], lines: {} };
    }
  }

  private persist(next: TrainerData): void {
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

  getSnapshot = (): TrainerData => {
    if (this.cache === null) this.cache = this.load();
    return this.cache;
  };

  getServerSnapshot = (): TrainerData => SERVER_SNAPSHOT;

  setRepertoire = (ids: string[]): void => {
    this.persist({ ...this.getSnapshot(), repertoire: [...new Set(ids)] });
  };

  toggleOpening = (id: string): void => {
    const data = this.getSnapshot();
    const has = data.repertoire.includes(id);
    this.persist({
      ...data,
      repertoire: has
        ? data.repertoire.filter((x) => x !== id)
        : [...data.repertoire, id],
    });
  };

  /** Record the outcome of drilling one line. `clean` = no wrong move / no hint. */
  recordLineResult = (key: string, clean: boolean): void => {
    const data = this.getSnapshot();
    const prev = data.lines[key] ?? EMPTY_LINE_STATE;
    const streak = clean ? prev.streak + 1 : 0;
    const level: MasteryLevel = clean
      ? streak >= MASTERED_STREAK
        ? "mastered"
        : "learning"
      : "learning";
    this.persist({
      ...data,
      lines: {
        ...data.lines,
        [key]: {
          level,
          streak,
          attempts: prev.attempts + 1,
          lastSeenAt: nowIso(),
        },
      },
    });
  };

  reset = (): void => {
    this.persist({ repertoire: [], lines: {} });
  };
}

export const trainerStore = new LocalTrainerStore();
