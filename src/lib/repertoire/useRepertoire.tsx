"use client";

// React binding for the Repertoire Lab. Provider-less singleton read through
// useSyncExternalStore (same as lib/trainer/useTrainer.tsx), so SSR and the
// first client render share the frozen-empty snapshot and hydration matches.

import { useSyncExternalStore } from "react";
import { repertoireStore, type RepertoireData } from "./store";
import { buildTree, type RepTree } from "./tree";
import { useSrs } from "../srs/useSrs";
import type { SrsData } from "../srs/store";
import type { Orientation } from "@/content/types";

/**
 * One tree per colour. Building a single tree from BOTH colours' openings would
 * pollute each root: a Black repertoire's Petroff contributes 1.e4 to the start
 * position, and the White view would then offer it as our first move.
 */
export interface RepertoireTrees {
  white: RepTree;
  black: RepTree;
}

export interface RepertoireApi {
  data: RepertoireData;
  trees: RepertoireTrees;
  srs: SrsData;
  store: typeof repertoireStore;
}

export function useRepertoireData(): RepertoireData {
  return useSyncExternalStore(
    repertoireStore.subscribe,
    repertoireStore.getSnapshot,
    repertoireStore.getServerSnapshot,
  );
}

export function treesFor(data: RepertoireData): RepertoireTrees {
  // buildTree is memoized on the id set, so this is a map lookup after the
  // first compile — safe to call during render.
  return { white: buildTree(data.white), black: buildTree(data.black) };
}

export function pickTree(trees: RepertoireTrees, color: Orientation): RepTree {
  return color === "white" ? trees.white : trees.black;
}

export function useRepertoire(): RepertoireApi {
  const data = useRepertoireData();
  const srs = useSrs();
  return { data, trees: treesFor(data), srs, store: repertoireStore };
}

export { repertoireStore };
