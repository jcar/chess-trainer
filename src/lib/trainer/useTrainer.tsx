"use client";

// React binding for the trainer store. Like lib/rewards/streak.ts this is a
// provider-less singleton read via useSyncExternalStore, so SSR and the first
// client render share the frozen-empty snapshot (no hydration mismatch).

import { useSyncExternalStore } from "react";
import { trainerStore, type TrainerData } from "./store";
import { masteryCounts, dueQueue, srsKey, type MasteryCounts, type TrainerLine } from "./lines";
import { useSrs, srsStore } from "../srs/useSrs";

export function useTrainerData(): TrainerData {
  return useSyncExternalStore(
    trainerStore.subscribe,
    trainerStore.getSnapshot,
    trainerStore.getServerSnapshot,
  );
}

export interface TrainerApi {
  data: TrainerData;
  counts: MasteryCounts;
  due: TrainerLine[];
  inRepertoire: (openingId: string) => boolean;
  toggleOpening: (openingId: string) => void;
  setRepertoire: (ids: string[]) => void;
  recordLineResult: (key: string, clean: boolean) => void;
  reset: () => void;
}

export function useTrainer(): TrainerApi {
  const data = useTrainerData();
  const srs = useSrs();
  return {
    data,
    counts: masteryCounts(srs, data.repertoire),
    due: dueQueue(srs, data.repertoire),
    inRepertoire: (openingId) => data.repertoire.includes(openingId),
    toggleOpening: trainerStore.toggleOpening,
    setRepertoire: trainerStore.setRepertoire,
    // True spaced repetition: a clean recall pushes the line further out; a miss
    // resets it to be reviewed again soon.
    recordLineResult: (key, clean) => srsStore.record(srsKey(key), clean),
    reset: () => {
      trainerStore.reset();
      srsStore.reset();
    },
  };
}
