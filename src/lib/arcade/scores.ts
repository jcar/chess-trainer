"use client";

// Local arcade high scores (no backend). Same SSR-safe useSyncExternalStore
// singleton pattern as the theme / kids-prefs stores. Key is under the
// chess-trainer: prefix so Settings "reset all progress" clears it too.

import { useSyncExternalStore } from "react";
import { dailyLabel } from "@/lib/arcade/rng";

const STORAGE_KEY = "chess-trainer:arcade:v1";

export interface ArcadeScores {
  bestScore: number;
  bestLevel: number;
  /** Date label the daily best belongs to (resets when the day changes). */
  dailyKey: string;
  dailyBest: number;
}

const DEFAULTS: ArcadeScores = { bestScore: 0, bestLevel: 0, dailyKey: "", dailyBest: 0 };
const SERVER_SNAPSHOT: ArcadeScores = Object.freeze({ ...DEFAULTS });

class ArcadeScoreStore {
  private cache: ArcadeScores | null = null;
  private listeners = new Set<() => void>();

  private load(): ArcadeScores {
    if (typeof window === "undefined") return SERVER_SNAPSHOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<ArcadeScores>) } : { ...DEFAULTS };
    } catch {
      return { ...DEFAULTS };
    }
  }

  private persist(next: ArcadeScores): void {
    this.cache = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    this.listeners.forEach((l) => l());
  }

  subscribe = (l: () => void): (() => void) => {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  };
  getSnapshot = (): ArcadeScores => {
    if (this.cache === null) this.cache = this.load();
    return this.cache;
  };
  getServerSnapshot = (): ArcadeScores => SERVER_SNAPSHOT;

  /** Record a finished run. Returns true if it set a new overall best. */
  record = (score: number, level: number, daily: boolean): boolean => {
    const cur = this.getSnapshot();
    const today = dailyLabel();
    const dailyReset = cur.dailyKey !== today;
    const next: ArcadeScores = {
      bestScore: Math.max(cur.bestScore, score),
      bestLevel: Math.max(cur.bestLevel, level),
      dailyKey: daily ? today : dailyReset ? cur.dailyKey : cur.dailyKey,
      dailyBest: daily ? Math.max(dailyReset ? 0 : cur.dailyBest, score) : dailyReset ? 0 : cur.dailyBest,
    };
    if (daily && dailyReset) next.dailyKey = today;
    this.persist(next);
    return score > cur.bestScore;
  };
}

export const arcadeScoreStore = new ArcadeScoreStore();

export function useArcadeScores(): ArcadeScores {
  return useSyncExternalStore(
    arcadeScoreStore.subscribe,
    arcadeScoreStore.getSnapshot,
    arcadeScoreStore.getServerSnapshot,
  );
}
