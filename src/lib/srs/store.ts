// Generic spaced-repetition store (Leitner boxes) keyed by item id. Reusable for
// the Tactics Trainer (and any future review tool). Provider-less singleton over
// localStorage via useSyncExternalStore — same pattern as lib/rewards/streak and
// lib/trainer/store. SSR-safe (frozen empty server snapshot).

const STORAGE_KEY = "chess-trainer:srs:v1";

/** Box → days until due again. Box 0 is "due now / soon". */
const BOX_DAYS = [0, 1, 3, 7, 16, 35];
const MAX_BOX = BOX_DAYS.length - 1;
const DAY_MS = 86_400_000;

export interface SrsItem {
  box: number;
  /** Epoch ms when this item is next due. */
  due: number;
  reps: number;
  /** Times the learner got it wrong (drives the "mistake bank"). */
  lapses: number;
  lastResult: "good" | "again" | null;
  lastSeen: number;
}

export type SrsData = Record<string, SrsItem>;

const SERVER_SNAPSHOT: SrsData = Object.freeze({});

function now(): number {
  try {
    return Date.now();
  } catch {
    return 0;
  }
}

export function isDue(data: SrsData, id: string, t: number): boolean {
  const it = data[id];
  return !it || it.due <= t; // unseen items are due
}

/** Split candidate ids into review-due (seen, due now) and fresh (never seen). */
export function partitionQueue(
  data: SrsData,
  ids: string[],
  t: number,
): { due: string[]; fresh: string[] } {
  const due: string[] = [];
  const fresh: string[] = [];
  for (const id of ids) {
    const it = data[id];
    if (!it) fresh.push(id);
    else if (it.due <= t) due.push(id);
  }
  // Most overdue first; within that, items you've missed (mistake bank) first.
  due.sort((a, b) => {
    const A = data[a];
    const B = data[b];
    if (B.lapses !== A.lapses) return B.lapses - A.lapses;
    return A.due - B.due;
  });
  return { due, fresh };
}

export function dueCount(data: SrsData, ids: string[], t = now()): number {
  return ids.reduce((n, id) => n + (isDue(data, id, t) ? 1 : 0), 0);
}

class LocalSrsStore {
  private cache: SrsData | null = null;
  private listeners = new Set<() => void>();

  private load(): SrsData {
    if (typeof window === "undefined") return SERVER_SNAPSHOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SrsData) : {};
    } catch {
      return {};
    }
  }

  private persist(next: SrsData): void {
    this.cache = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota / privacy-mode */
    }
    this.listeners.forEach((l) => l());
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): SrsData => {
    if (this.cache === null) this.cache = this.load();
    return this.cache;
  };

  getServerSnapshot = (): SrsData => SERVER_SNAPSHOT;

  /** Record an attempt. `good` = solved cleanly; otherwise it's a lapse. */
  record = (id: string, good: boolean): void => {
    const data = this.getSnapshot();
    const prev = data[id];
    const t = now();
    const box = good ? Math.min((prev?.box ?? 0) + 1, MAX_BOX) : 0;
    this.persist({
      ...data,
      [id]: {
        box,
        due: t + BOX_DAYS[box] * DAY_MS,
        reps: (prev?.reps ?? 0) + 1,
        lapses: (prev?.lapses ?? 0) + (good ? 0 : 1),
        lastResult: good ? "good" : "again",
        lastSeen: t,
      },
    });
  };

  reset = (): void => this.persist({});
}

export const srsStore = new LocalSrsStore();
