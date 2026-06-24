// Progress persistence as a subscribable external store, consumed via
// React's useSyncExternalStore (see useProgress.tsx). Defined behind a small
// surface so the localStorage backing can be swapped for a server/account
// backend later without changing any UI code.

export interface ActivityState {
  completed: boolean;
  /** 0–100; meaning depends on activity type (quiz score, puzzle = 100 on solve). */
  score: number;
  attempts: number;
  /** ISO timestamp of last completion, if any. */
  completedAt?: string;
}

export type ProgressData = Record<string, ActivityState>;

const STORAGE_KEY = "chess-trainer:progress:v1";

export const EMPTY_STATE: ActivityState = {
  completed: false,
  score: 0,
  attempts: 0,
};

// Stable empty snapshot for SSR and the first client render, so server and
// client agree before localStorage is read. Frozen so identity never changes.
const SERVER_SNAPSHOT: ProgressData = Object.freeze({});

/** Pure selectors over a snapshot — used by components after reading the store. */
export function selectActivityState(
  data: ProgressData,
  activityId: string,
): ActivityState {
  return data[activityId] ?? EMPTY_STATE;
}

export function selectModuleProgress(
  data: ProgressData,
  activityIds: string[],
): number {
  if (activityIds.length === 0) return 0;
  const done = activityIds.filter((id) => data[id]?.completed).length;
  return done / activityIds.length;
}

/**
 * Stars earned for an activity (0–3): 0 not done; 3 = solved cleanly (full score,
 * first try); 2 = full score but took a few tries; 1 = completed. Kid-friendly
 * reward derived from the existing score/attempts.
 */
export function selectStars(data: ProgressData, activityId: string): number {
  const s = data[activityId];
  if (!s?.completed) return 0;
  if (s.score >= 100 && s.attempts <= 1) return 3;
  if (s.score >= 100 && s.attempts <= 3) return 2;
  return 1;
}

/** Total stars across a set of activities (e.g. a lesson). */
export function selectTotalStars(
  data: ProgressData,
  activityIds: string[],
): number {
  return activityIds.reduce((sum, id) => sum + selectStars(data, id), 0);
}

/**
 * Kid-mode stars (0–3): completing is never punishing. 3 = solved cleanly (full
 * score); 2 = completed after exploring; 0 = not done. Unlike `selectStars`, this
 * does NOT dock stars for taking several tries — for ages ~5–8, effort and
 * persistence are rewarded, not penalized. Pairs with the retry-until-right
 * players (a clean solve scores 100 → 3; a solve after a miss scores 90 → 2).
 */
export function selectStarsKid(data: ProgressData, activityId: string): number {
  const s = data[activityId];
  if (!s?.completed) return 0;
  return s.score >= 100 ? 3 : 2;
}

/** Total kid-mode stars across a set of activities. */
export function selectTotalStarsKid(
  data: ProgressData,
  activityIds: string[],
): number {
  return activityIds.reduce((sum, id) => sum + selectStarsKid(data, id), 0);
}

/** Whether every activity in the set is completed (e.g. a lesson trophy). */
export function selectAllComplete(
  data: ProgressData,
  activityIds: string[],
): boolean {
  return activityIds.length > 0 && activityIds.every((id) => data[id]?.completed);
}

export interface ProgressStore {
  subscribe(listener: () => void): () => void;
  /** Current snapshot — a stable reference that only changes on write. */
  getSnapshot(): ProgressData;
  /** SSR / first-client-render snapshot (always empty, stable identity). */
  getServerSnapshot(): ProgressData;
  markComplete(activityId: string, score?: number): void;
  recordAttempt(activityId: string): void;
  reset(): void;
}

export class LocalProgressStore implements ProgressStore {
  private listeners = new Set<() => void>();
  // Cached snapshot. Replaced (new object) on every write so React detects the
  // change; null until first read so we lazy-load from localStorage once.
  private cache: ProgressData | null = null;

  private load(): ProgressData {
    if (typeof window === "undefined") return SERVER_SNAPSHOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ProgressData) : {};
    } catch {
      return {};
    }
  }

  private persist(data: ProgressData): void {
    this.cache = data;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        // Quota or privacy mode — progress is best-effort.
      }
    }
    this.listeners.forEach((l) => l());
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): ProgressData => {
    if (this.cache === null) this.cache = this.load();
    return this.cache;
  };

  getServerSnapshot = (): ProgressData => SERVER_SNAPSHOT;

  markComplete = (activityId: string, score = 100): void => {
    const data = this.getSnapshot();
    const prev = data[activityId] ?? EMPTY_STATE;
    this.persist({
      ...data,
      [activityId]: {
        completed: true,
        score: Math.max(prev.score, score),
        attempts: prev.attempts + 1,
        completedAt: nowIso(),
      },
    });
  };

  recordAttempt = (activityId: string): void => {
    const data = this.getSnapshot();
    const prev = data[activityId] ?? EMPTY_STATE;
    this.persist({
      ...data,
      [activityId]: { ...prev, attempts: prev.attempts + 1 },
    });
  };

  reset = (): void => {
    this.persist({});
  };
}

// `new Date()` can be unavailable in some sandboxed contexts; guard so progress
// writes never throw.
function nowIso(): string {
  try {
    return new Date().toISOString();
  } catch {
    return "";
  }
}
