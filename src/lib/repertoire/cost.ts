// What a repertoire actually costs you.
//
// The Chooser used to report "7 openings as White", which reads as seven
// openings to learn. It isn't: against 1.e4 Black picks the defence, so those
// are seven ANSWERS you owe. The honest numbers are how many decisions you own
// and how many positions you become responsible for — the latter being exactly
// what the drills test.
//
// Everything is derived, never stored: a cached count would go stale against
// the content the moment a line is authored.

import { drillableNodes } from "./mastery";
import { treesFor } from "./useRepertoire";
import { walkRepertoire, START_KEY, type RepTree } from "./tree";
import { keyForSlot, systemNameFor, ourMovesFromSlot } from "./naming";
import { SLOTS, type FirstMove, type SlotId } from "./traits";
import type { RepertoireData } from "./store";
import type { RepertoirePlan } from "./chooser";

export interface SlotCost {
  slot: SlotId;
  systemName: string;
  positions: number;
}

export interface RepertoireCost {
  /** Slots you own — the decisions the repertoire makes for you. */
  decisions: number;
  whiteDecisions: number;
  blackDecisions: number;
  /** Our-move positions: what drilling actually tests. */
  positions: number;
  whitePositions: number;
  blackPositions: number;
  bySlot: SlotCost[];
}

/**
 * Build the `RepertoireData` a plan implies.
 *
 * The START_KEY choice is load-bearing: without it `ourNodes` takes the
 * first-authored root move rather than the plan's opening move, and every White
 * count comes out wrong. `choose/page.tsx#confirm` writes the same key for the
 * same reason.
 */
export function dataForPlan(plan: RepertoirePlan): RepertoireData {
  return {
    white: plan.white,
    black: plan.black,
    choices: { [START_KEY]: plan.firstMove },
    suppressed: [],
    seeded: false,
    version: 1,
  };
}

const cache = new Map<string, RepertoireCost>();

export function planCost(plan: RepertoirePlan): RepertoireCost {
  const cacheKey = `${plan.firstMove}|${[...plan.white].sort().join(",")}|${[...plan.black].sort().join(",")}`;
  const hit = cache.get(cacheKey);
  if (hit) return hit;

  const data = dataForPlan(plan);
  const trees = treesFor(data);

  let whitePositions = 0;
  let blackPositions = 0;
  for (const node of drillableNodes(trees, data)) {
    if (node.turn === "white") whitePositions++;
    else blackPositions++;
  }

  const bySlot: SlotCost[] = plan.slots.map((s) => ({
    slot: s.slot,
    systemName: systemNameFor(
      s.slot,
      s.openingId,
      ourMovesFromSlot(
        SLOTS[s.slot].color === "white" ? trees.white : trees.black,
        s.slot,
        data.choices,
      ),
    ),
    positions: slotPositions(
      SLOTS[s.slot].color === "white" ? trees.white : trees.black,
      s.slot,
      data.choices,
    ),
  }));

  const whiteDecisions = plan.slots.filter((s) => SLOTS[s.slot].color === "white").length;
  const cost: RepertoireCost = {
    decisions: plan.slots.length,
    whiteDecisions,
    blackDecisions: plan.slots.length - whiteDecisions,
    positions: whitePositions + blackPositions,
    whitePositions,
    blackPositions,
    bySlot,
  };
  cache.set(cacheKey, cost);
  return cost;
}

/** Our-move positions reachable from one slot's starting position. */
function slotPositions(
  tree: RepTree,
  slot: SlotId,
  choices: Record<string, string>,
): number {
  const color = SLOTS[slot].color;
  const key = keyForSlot(slot);
  const start = key && tree.nodes.has(key) ? key : tree.roots[0];
  if (!start) return 0;
  return walkRepertoire(tree, color, choices, start).filter((n) => n.turn === color)
    .length;
}

/** The Black replies a first move commits you to answering, for the cost table. */
export const REPLIES_FACED: Record<FirstMove, string> = {
  e4: "1…e5, c5, e6, c6, d5, Nf6, d6",
  d4: "1…d5 and 1…Nf6",
  c4: "1…c5 and 1…Nf6",
  Nf3: "1…d5 and 1…Nf6",
  b3: "1…e5 and 1…d5",
};
