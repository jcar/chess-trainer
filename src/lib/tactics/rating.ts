"use client";

// Persistent tactics rating for the Tactics Trainer's Adaptive mode. Each solved
// puzzle is treated as a "game" against an opponent rated at the puzzle's Lichess
// rating: a clean solve scores 1, a miss scores 0, and the player's rating moves
// by a standard Elo update. Adaptive mode then serves fresh puzzles near this
// rating. localStorage singleton via useSyncExternalStore (same pattern as
// lib/play/rating.ts), SSR-safe.

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "chess-trainer:tactics-rating:v1";
/** Gentle starting point for an unknown solver. */
export const DEFAULT_RATING = 1000;
const K = 24; // puzzles are frequent, so a moderate K
const MIN = 400;
const MAX = 3000;

export interface TacticsRating {
  rating: number;
  solved: number; // clean solves
  attempts: number;
}

const SERVER_SNAPSHOT: TacticsRating = Object.freeze({
  rating: DEFAULT_RATING,
  solved: 0,
  attempts: 0,
});

const clamp = (n: number) => Math.max(MIN, Math.min(MAX, Math.round(n)));

class TacticsRatingStore {
  private cache: TacticsRating | null = null;
  private listeners = new Set<() => void>();

  private load(): TacticsRating {
    if (typeof window === "undefined") return SERVER_SNAPSHOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...SERVER_SNAPSHOT };
      const p = JSON.parse(raw) as Partial<TacticsRating>;
      return {
        rating: p.rating ?? DEFAULT_RATING,
        solved: p.solved ?? 0,
        attempts: p.attempts ?? 0,
      };
    } catch {
      return { ...SERVER_SNAPSHOT };
    }
  }

  private persist(next: TacticsRating): void {
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

  getSnapshot = (): TacticsRating => {
    if (this.cache === null) this.cache = this.load();
    return this.cache;
  };

  getServerSnapshot = (): TacticsRating => SERVER_SNAPSHOT;

  /** Elo update for one solved puzzle of the given rating. `clean` = no wrong
   *  move / no "Show me". Puzzles with no rating (module puzzles) are ignored. */
  record = (puzzleRating: number | undefined, clean: boolean): void => {
    if (!puzzleRating) return;
    const s = this.getSnapshot();
    const expected = 1 / (1 + 10 ** ((puzzleRating - s.rating) / 400));
    const next = clamp(s.rating + K * ((clean ? 1 : 0) - expected));
    this.persist({
      rating: next,
      solved: s.solved + (clean ? 1 : 0),
      attempts: s.attempts + 1,
    });
  };

  reset = (): void => this.persist({ ...SERVER_SNAPSHOT });
}

export const tacticsRatingStore = new TacticsRatingStore();

export function useTacticsRating(): TacticsRating {
  return useSyncExternalStore(
    tacticsRatingStore.subscribe,
    tacticsRatingStore.getSnapshot,
    tacticsRatingStore.getServerSnapshot,
  );
}
