"use client";

// React binding for the trainer's spaced-repetition state. Like
// lib/rewards/streak.ts this reads a provider-less singleton via
// useSyncExternalStore, so SSR and the first client render share the
// frozen-empty snapshot (no hydration mismatch).
//
// The trainer is now single-opening focused (no multi-select repertoire), so the
// SRS data is a per-line SKILL meter: `counts` summarise mastery across the whole
// catalog (for the home tile / catalog), and `srs` is exposed so per-opening and
// per-line views can derive their own state via the helpers in ./lines.

import { allOpenings, masteryCounts, srsKey, type MasteryCounts } from "./lines";
import { trainerStore } from "./store";
import { useSrs, srsStore } from "../srs/useSrs";
import type { SrsData } from "../srs/store";

export interface TrainerApi {
  /** Raw SRS snapshot — feed to `lineState` / `masteryCounts` for a given opening. */
  srs: SrsData;
  /** Mastery across ALL openings (powers the home-page tile and overall progress). */
  counts: MasteryCounts;
  recordLineResult: (key: string, clean: boolean) => void;
  reset: () => void;
}

const ALL_OPENING_IDS = allOpenings().map((o) => o.id);

export function useTrainer(): TrainerApi {
  const srs = useSrs();
  return {
    srs,
    counts: masteryCounts(srs, ALL_OPENING_IDS),
    // True spaced repetition: a clean recall pushes the line further out; a miss
    // resets it to be reviewed again soon. Also drives the per-line skill meter.
    recordLineResult: (key, clean) => srsStore.record(srsKey(key), clean),
    reset: () => {
      trainerStore.reset();
      srsStore.reset();
    },
  };
}
