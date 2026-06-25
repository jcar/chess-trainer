"use client";

// Tracks which achievement badges the child has already been congratulated for,
// so the "new badge!" celebration fires exactly once. Tiny localStorage set,
// same useSyncExternalStore singleton pattern as the other stores.

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "chess-trainer:kids-badges:v1";

// Stable module-level empty array for SSR / first render (never mutated).
const SERVER_SNAPSHOT: string[] = [];

class BadgeSeenStore {
  private cache: string[] | null = null;
  private listeners = new Set<() => void>();

  private load(): string[] {
    if (typeof window === "undefined") return SERVER_SNAPSHOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  }

  private persist(next: string[]): void {
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

  getSnapshot = (): string[] => {
    if (this.cache === null) this.cache = this.load();
    return this.cache;
  };

  getServerSnapshot = (): string[] => SERVER_SNAPSHOT;

  /** Returns the subset of `ids` not seen before, and marks them all seen. */
  markSeen = (ids: string[]): string[] => {
    const seen = new Set(this.getSnapshot());
    const fresh = ids.filter((id) => !seen.has(id));
    if (fresh.length) this.persist([...seen, ...fresh]);
    return fresh;
  };
}

export const badgeSeenStore = new BadgeSeenStore();

export function useBadgeSeen(): string[] {
  return useSyncExternalStore(
    badgeSeenStore.subscribe,
    badgeSeenStore.getSnapshot,
    badgeSeenStore.getServerSnapshot,
  );
}
