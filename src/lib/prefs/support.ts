"use client";

// Owner-facing feature flag: whether the monetization surfaces (the Gear Guide
// link, the home-page gear card, and the donation footer) are shown. OFF by
// default. Same provider-less localStorage + useSyncExternalStore singleton
// pattern as lib/kids/prefs.ts — SSR-safe with a frozen default snapshot, so the
// server and first client render agree (default OFF → nothing renders on either,
// no hydration mismatch).

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "chess-trainer:support:v1";

export interface SupportPrefs {
  /** Show the Gear Guide + Support links. Default OFF. */
  showSupport: boolean;
}

const DEFAULTS: SupportPrefs = {
  showSupport: false,
};

const SERVER_SNAPSHOT: SupportPrefs = Object.freeze({ ...DEFAULTS });

class SupportPrefsStore {
  private cache: SupportPrefs | null = null;
  private listeners = new Set<() => void>();

  private load(): SupportPrefs {
    if (typeof window === "undefined") return SERVER_SNAPSHOT;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS };
      const p = JSON.parse(raw) as Partial<SupportPrefs>;
      return { ...DEFAULTS, ...p };
    } catch {
      return { ...DEFAULTS };
    }
  }

  private persist(next: SupportPrefs): void {
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

  getSnapshot = (): SupportPrefs => {
    if (this.cache === null) this.cache = this.load();
    return this.cache;
  };

  getServerSnapshot = (): SupportPrefs => SERVER_SNAPSHOT;

  set = (patch: Partial<SupportPrefs>): void => {
    this.persist({ ...this.getSnapshot(), ...patch });
  };
}

export const supportPrefsStore = new SupportPrefsStore();

/** Reactive boolean: are the support/gear surfaces enabled? */
export function useShowSupport(): boolean {
  return useSyncExternalStore(
    supportPrefsStore.subscribe,
    () => supportPrefsStore.getSnapshot().showSupport,
    () => SERVER_SNAPSHOT.showSupport,
  );
}

export function setShowSupport(on: boolean): void {
  supportPrefsStore.set({ showSupport: on });
}
