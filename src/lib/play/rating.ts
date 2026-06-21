"use client";

// Persistent Play rating for Adaptive mode. After each rated game the player's
// rating moves by a standard Elo update against the opponent's rating, so the
// next Adaptive game picks an opponent near the player's true strength. Stored
// in localStorage via a provider-less useSyncExternalStore singleton (same
// pattern as lib/rewards/daily.ts), SSR-safe.

import { useSyncExternalStore } from "react";
import { MIN_ELO, MAX_ELO } from "./opponents";

const STORAGE_KEY = "chess-trainer:play-rating:v1";
/** Beginner-friendly starting rating. */
export const DEFAULT_RATING = 800;
const K = 32; // Elo K-factor (responsive, since games are infrequent)

export interface PlayRating {
  rating: number;
  games: number;
  wins: number;
  losses: number;
  draws: number;
}

export type GameResult = "win" | "loss" | "draw";

const SERVER_SNAPSHOT: PlayRating = Object.freeze({
  rating: DEFAULT_RATING,
  games: 0,
  wins: 0,
  losses: 0,
  draws: 0,
});

const clamp = (n: number) => Math.max(MIN_ELO, Math.min(MAX_ELO, Math.round(n)));
const scoreOf = (r: GameResult) => (r === "win" ? 1 : r === "draw" ? 0.5 : 0);

class PlayRatingStore {
  private cache: PlayRating | null = null;
  private listeners = new Set<() => void>();

  private load(): PlayRating {
    if (typeof window === "undefined") return SERVER_SNAPSHOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...SERVER_SNAPSHOT };
      const p = JSON.parse(raw) as Partial<PlayRating>;
      return {
        rating: p.rating ?? DEFAULT_RATING,
        games: p.games ?? 0,
        wins: p.wins ?? 0,
        losses: p.losses ?? 0,
        draws: p.draws ?? 0,
      };
    } catch {
      return { ...SERVER_SNAPSHOT };
    }
  }

  private persist(next: PlayRating): void {
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

  getSnapshot = (): PlayRating => {
    if (this.cache === null) this.cache = this.load();
    return this.cache;
  };

  getServerSnapshot = (): PlayRating => SERVER_SNAPSHOT;

  /** Apply an Elo update for a finished game vs `opponentElo`. Returns the
   *  before/after rating + delta so the UI can show the change. */
  record = (
    opponentElo: number,
    result: GameResult,
  ): { before: number; after: number; delta: number } => {
    const s = this.getSnapshot();
    const expected = 1 / (1 + 10 ** ((opponentElo - s.rating) / 400));
    const after = clamp(s.rating + K * (scoreOf(result) - expected));
    this.persist({
      rating: after,
      games: s.games + 1,
      wins: s.wins + (result === "win" ? 1 : 0),
      losses: s.losses + (result === "loss" ? 1 : 0),
      draws: s.draws + (result === "draw" ? 1 : 0),
    });
    return { before: s.rating, after, delta: after - s.rating };
  };

  reset = (): void => this.persist({ ...SERVER_SNAPSHOT });
}

export const playRatingStore = new PlayRatingStore();

export function usePlayRating(): PlayRating {
  return useSyncExternalStore(
    playRatingStore.subscribe,
    playRatingStore.getSnapshot,
    playRatingStore.getServerSnapshot,
  );
}
