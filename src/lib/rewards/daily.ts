"use client";

// Persistent daily streak — counts consecutive days the learner did something.
// Unlike lib/rewards/streak.ts (session-only momentum), this survives reloads and
// drives the daily habit. Provider-less singleton over localStorage via
// useSyncExternalStore. SSR-safe.

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "chess-trainer:daily:v1";

export interface DailyState {
  /** Last active day, YYYY-MM-DD (local). */
  lastDate: string;
  current: number;
  best: number;
}

const SERVER_SNAPSHOT: DailyState = Object.freeze({
  lastDate: "",
  current: 0,
  best: 0,
});

function todayStr(): string {
  try {
    const d = new Date();
    const m = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${d.getFullYear()}-${m}-${day}`;
  } catch {
    return "";
  }
}

function prevDayStr(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    dt.setDate(dt.getDate() - 1);
    const mm = `${dt.getMonth() + 1}`.padStart(2, "0");
    const dd = `${dt.getDate()}`.padStart(2, "0");
    return `${dt.getFullYear()}-${mm}-${dd}`;
  } catch {
    return "";
  }
}

class DailyStreakStore {
  private cache: DailyState | null = null;
  private listeners = new Set<() => void>();

  private load(): DailyState {
    if (typeof window === "undefined") return SERVER_SNAPSHOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { lastDate: "", current: 0, best: 0 };
      const p = JSON.parse(raw) as Partial<DailyState>;
      return {
        lastDate: p.lastDate ?? "",
        current: p.current ?? 0,
        best: p.best ?? 0,
      };
    } catch {
      return { lastDate: "", current: 0, best: 0 };
    }
  }

  private persist(next: DailyState): void {
    this.cache = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    this.listeners.forEach((l) => l());
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): DailyState => {
    if (this.cache === null) this.cache = this.load();
    return this.cache;
  };

  getServerSnapshot = (): DailyState => SERVER_SNAPSHOT;

  /** Call whenever the learner completes any activity. Bumps the streak once/day. */
  record = (): void => {
    const today = todayStr();
    if (!today) return;
    const s = this.getSnapshot();
    if (s.lastDate === today) return; // already counted today
    const current = s.lastDate === prevDayStr(today) ? s.current + 1 : 1;
    this.persist({
      lastDate: today,
      current,
      best: Math.max(s.best, current),
    });
  };

  reset = (): void => this.persist({ lastDate: "", current: 0, best: 0 });
}

export const dailyStreakStore = new DailyStreakStore();

export function recordDailyActivity(): void {
  dailyStreakStore.record();
}

export function useDailyStreak(): DailyState & { playedToday: boolean } {
  const s = useSyncExternalStore(
    dailyStreakStore.subscribe,
    dailyStreakStore.getSnapshot,
    dailyStreakStore.getServerSnapshot,
  );
  return { ...s, playedToday: s.lastDate === todayStr() };
}

/** Today's date (YYYY-MM-DD) in a hydration-safe way: "" on the server / first
 *  paint, then the real date after hydration (avoids SSR mismatch). */
export function useToday(): string {
  return useSyncExternalStore(
    () => () => {},
    todayStr,
    () => "",
  );
}

export { todayStr };
