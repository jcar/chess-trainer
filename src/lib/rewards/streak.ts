"use client";

// A tiny session-scoped "correct in a row" streak, shared app-wide via
// useSyncExternalStore (no provider needed). Used to celebrate momentum for
// kids ("3 in a row! 🔥"). Resets on a wrong answer and on full page reload.

import { useSyncExternalStore } from "react";

let streak = 0;
let snapshot = { streak: 0 };
const listeners = new Set<() => void>();

function notify() {
  snapshot = { streak };
  listeners.forEach((l) => l());
}

/** Record an answer outcome; increments the streak on correct, resets on wrong. */
export function recordResult(correct: boolean): void {
  streak = correct ? streak + 1 : 0;
  notify();
}

export function resetStreak(): void {
  streak = 0;
  notify();
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function getSnapshot() {
  return snapshot;
}
const SERVER_SNAPSHOT = { streak: 0 };

/** Read the current streak reactively. */
export function useStreak(): number {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => SERVER_SNAPSHOT,
  ).streak;
}
