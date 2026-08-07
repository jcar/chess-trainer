// Turns the `rn:` review queue into concrete drill items.
//
// Three modes, all keyed by POSITION rather than line:
//   cold-start  — dropped onto a position with no line context. Severs the
//                 replay-from-move-1 crutch, which is the whole point.
//   shuffled    — the opponent reaches the position by a different move order;
//                 you still owe your moves. The literal move-order drill.
//   where-am-i  — name the position. The diagnostic for "I've seen this, but
//                 from where?".

import { getOpening } from "@/content/openings";
import { seededOrder } from "../shuffle";
import { alternateOrders } from "./permute";
import { resolveEdge, type NodeKey, type RepNode, type RepTree } from "./tree";
import type { RepertoireData } from "./store";
import type { RepertoireTrees } from "./useRepertoire";
import { reviewQueue } from "./mastery";
import type { SrsData } from "../srs/store";
import type { Orientation } from "@/content/types";

export type DrillMode = "cold-start" | "shuffled" | "where-am-i";

interface BaseItem {
  key: NodeKey;
  color: Orientation;
  /** The position to present. */
  fen: string;
  /** The move we owe here. */
  answerSan: string;
  /** Authored explanation for the right move, if there is one. */
  note?: string;
  /** Authored wrong moves with teaching explanations. */
  mistakes: { move: string; why: string }[];
  /** Openings this position belongs to. */
  openings: string[];
  /** A SAN route into this position (the one we present, when we present one). */
  route: string[];
  /** True when this position is reachable by more than one order. */
  transposition: boolean;
  /** All distinct known routes here (for the "you also know this as…" note). */
  routes: string[][];
}

export interface ColdStartItem extends BaseItem {
  mode: "cold-start";
}

export interface ShuffledItem extends BaseItem {
  mode: "shuffled";
  /** The reordered sequence the opponent will play into. */
  sequence: string[];
  /** Plies where the order differs from the authored line. */
  changedAtPly: number[];
}

export interface WhereAmIItem extends BaseItem {
  mode: "where-am-i";
  options: string[];
  correctIndex: number;
}

export type DrillItem = ColdStartItem | ShuffledItem | WhereAmIItem;

const MIX: DrillMode[] = [
  "cold-start", "cold-start", "shuffled", "cold-start",
  "where-am-i", "shuffled", "cold-start", "shuffled",
  "cold-start", "shuffled", "where-am-i", "cold-start",
];

function openingNames(ids: string[]): string[] {
  return ids.map((id) => getOpening(id)?.name).filter((n): n is string => !!n);
}

function buildBase(
  node: RepNode,
  color: Orientation,
  choices: Record<NodeKey, string>,
  seed: string,
): BaseItem | null {
  const edge = resolveEdge(node, choices);
  if (!edge) return null;
  // Present a RANDOM known route in, not always the authored first one — for a
  // transposition node that alone is a move-order test.
  const order = seededOrder(node.paths.length, seed);
  const route = node.paths[order[0]] ?? node.paths[0] ?? [];
  return {
    key: node.key,
    color,
    fen: node.fen,
    answerSan: edge.san,
    note: edge.note,
    mistakes: node.mistakes,
    openings: node.openings,
    route,
    transposition: node.paths.length > 1,
    routes: node.paths,
  };
}

/** Distractor opening names for "Where am I?", drawn from the whole catalog. */
function distractors(correct: string, pool: string[], seed: string): string[] {
  const others = pool.filter((n) => n !== correct);
  const order = seededOrder(others.length, seed);
  return order.slice(0, 3).map((i) => others[i]);
}

export function buildDrillSession(
  trees: RepertoireTrees,
  data: RepertoireData,
  srs: SrsData,
  now: number,
  seed: string,
  length = 12,
): DrillItem[] {
  const queue = reviewQueue(trees, data, srs, now, length);
  if (queue.length === 0) return [];

  const allNames = openingNames([...new Set([...data.white, ...data.black])]);
  const items: DrillItem[] = [];

  queue.slice(0, length).forEach((node, i) => {
    const color: Orientation = node.turn;
    const tree: RepTree = color === "white" ? trees.white : trees.black;
    const base = buildBase(node, color, data.choices, `${seed}:${node.key}`);
    if (!base) return;

    const wanted = MIX[i % MIX.length];

    if (wanted === "where-am-i" && base.openings.length > 0 && allNames.length >= 4) {
      const correct = openingNames(base.openings)[0];
      if (correct) {
        const opts = [correct, ...distractors(correct, allNames, `${seed}:wai:${node.key}`)];
        const order = seededOrder(opts.length, `${seed}:opt:${node.key}`);
        const shuffledOpts = order.map((j) => opts[j]);
        items.push({
          ...base,
          mode: "where-am-i",
          options: shuffledOpts,
          correctIndex: shuffledOpts.indexOf(correct),
        });
        return;
      }
    }

    if (wanted === "shuffled" && base.route.length >= 4) {
      const ourParity: 0 | 1 = color === "white" ? 0 : 1;
      const alts = alternateOrders(base.route, ourParity, `${seed}:${node.key}`, 1);
      if (alts.length > 0) {
        items.push({
          ...base,
          mode: "shuffled",
          sequence: alts[0].sans,
          changedAtPly: alts[0].changedAtPly,
        });
        return;
      }
    }

    void tree;
    items.push({ ...base, mode: "cold-start" });
  });

  return items;
}

/** Human label for the mode, shown after the answer (never before — naming the
 *  drill up front would leak that the order is about to change). */
export const MODE_LABEL: Record<DrillMode, string> = {
  "cold-start": "Cold start",
  shuffled: "Move order",
  "where-am-i": "Where am I?",
};
