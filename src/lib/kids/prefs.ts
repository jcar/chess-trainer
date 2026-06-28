"use client";

// Solo-kid profile for the kids module: the child's name (for the certificate /
// greeting) and chosen cosmetics. Same provider-less localStorage +
// useSyncExternalStore singleton pattern as lib/rewards/daily.ts (SSR-safe with a
// frozen default snapshot, so server and first client render agree).

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "chess-trainer:kids:v1";

export interface KidsPrefs {
  /** Empty until the child enters it (first-run NameGate). */
  name: string;
  boardThemeId: string;
  pipOutfitId: string;
  pieceSetId: string;
  /** Read-aloud auto-plays the story + prompts (default ON — Pip reads to you). */
  readAloud: boolean;
}

const DEFAULTS: KidsPrefs = {
  name: "",
  boardThemeId: "classic",
  pipOutfitId: "default",
  pieceSetId: "standard",
  readAloud: true,
};

const SERVER_SNAPSHOT: KidsPrefs = Object.freeze({ ...DEFAULTS });

class KidsPrefsStore {
  private cache: KidsPrefs | null = null;
  private listeners = new Set<() => void>();

  private load(): KidsPrefs {
    if (typeof window === "undefined") return SERVER_SNAPSHOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS };
      const p = JSON.parse(raw) as Partial<KidsPrefs>;
      return { ...DEFAULTS, ...p };
    } catch {
      return { ...DEFAULTS };
    }
  }

  private persist(next: KidsPrefs): void {
    this.cache = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota / privacy mode */
    }
    this.listeners.forEach((l) => l());
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): KidsPrefs => {
    if (this.cache === null) this.cache = this.load();
    return this.cache;
  };

  getServerSnapshot = (): KidsPrefs => SERVER_SNAPSHOT;

  set = (patch: Partial<KidsPrefs>): void => {
    this.persist({ ...this.getSnapshot(), ...patch });
  };

  reset = (): void => this.persist({ ...DEFAULTS });
}

export const kidsPrefsStore = new KidsPrefsStore();

export function useKidsPrefs(): KidsPrefs {
  return useSyncExternalStore(
    kidsPrefsStore.subscribe,
    kidsPrefsStore.getSnapshot,
    kidsPrefsStore.getServerSnapshot,
  );
}

export function setKidsPrefs(patch: Partial<KidsPrefs>): void {
  kidsPrefsStore.set(patch);
}
