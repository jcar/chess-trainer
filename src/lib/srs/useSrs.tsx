"use client";

import { useSyncExternalStore } from "react";
import { srsStore, type SrsData } from "./store";

export function useSrs(): SrsData {
  return useSyncExternalStore(
    srsStore.subscribe,
    srsStore.getSnapshot,
    srsStore.getServerSnapshot,
  );
}

export { srsStore };
