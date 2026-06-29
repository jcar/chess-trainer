"use client";

// Persisted placement-diagnostic result. Provider-less singleton over localStorage
// via useSyncExternalStore, SSR-safe (frozen null server snapshot) — same pattern
// as lib/srs/store and lib/rewards/streak.

import { useSyncExternalStore } from "react";
import type { PlacementResult } from "./placement";

const STORAGE_KEY = "chess-trainer:placement:v1";
const SERVER_SNAPSHOT: PlacementResult | null = null;

class PlacementStore {
  private cache: PlacementResult | null | undefined = undefined;
  private listeners = new Set<() => void>();

  private load(): PlacementResult | null {
    if (typeof window === "undefined") return SERVER_SNAPSHOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as PlacementResult) : null;
    } catch {
      return null;
    }
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): PlacementResult | null => {
    if (this.cache === undefined) this.cache = this.load();
    return this.cache;
  };

  getServerSnapshot = (): PlacementResult | null => SERVER_SNAPSHOT;

  save = (result: PlacementResult): void => {
    this.cache = result;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    } catch {
      /* ignore quota / privacy-mode */
    }
    this.listeners.forEach((l) => l());
  };

  clear = (): void => {
    this.cache = null;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    this.listeners.forEach((l) => l());
  };
}

export const placementStore = new PlacementStore();

export function usePlacement(): PlacementResult | null {
  return useSyncExternalStore(
    placementStore.subscribe,
    placementStore.getSnapshot,
    placementStore.getServerSnapshot,
  );
}
