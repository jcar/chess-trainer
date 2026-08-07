// Coverage gaps: positions where the opponent has a plausible move your
// repertoire has no answer to.
//
// "Plausible" comes from two sources, ranked in that order:
//   1. Another authored line plays this move from the same position. That is a
//      known-real human move, not an engine artifact — highest confidence.
//   2. The precomputed engine replies in `repertoire-replies.json`, within a
//      centipawn window of best.
//
// Filtering matters more than detection here. Unfiltered, most opponent nodes
// have replies we don't answer and the page becomes a wall of noise, which
// reads as "your repertoire is broken" when it is merely finite. So: shallow
// positions only, a tight cp window, and a cap per opening.

import repliesData from "@/content/repertoire-replies.json";
import { buildTree, resolveEdge, type NodeKey, type RepNode } from "./tree";
import type { RepertoireData } from "./store";
import type { RepertoireTrees } from "./useRepertoire";
import type { Orientation } from "@/content/types";

interface Reply {
  uci: string;
  san: string;
  cp: number;
  known: boolean;
}

const REPLIES = repliesData as Record<string, Reply[]>;

/** Only flag gaps this early — deep novelties are not a repertoire problem. */
const MAX_PLY = 10;
/** How far below the best reply a move can be and still count as plausible. */
const CP_WINDOW = 60;
/** Cap per opening so one branchy line can't dominate the report. */
const PER_OPENING_CAP = 3;

export interface Gap {
  /** The position where they deviate. */
  key: NodeKey;
  fen: string;
  /** Their unanswered move. */
  san: string;
  /** How we got here. */
  route: string[];
  ply: number;
  /** Which side would be facing this. */
  color: Orientation;
  openings: string[];
  /** True when another authored line plays this move (highest confidence). */
  known: boolean;
  /** Engine eval of their move, from their perspective. */
  cp: number | null;
}

function repliesFor(node: RepNode): Reply[] {
  return REPLIES[node.key] ?? [];
}

/**
 * Walk the repertoire for one colour and collect unanswered opponent moves.
 * We take our resolved move at our positions and every authored reply at
 * theirs — a gap is an opponent move that is plausible but has no edge.
 */
function gapsForColor(
  trees: RepertoireTrees,
  data: RepertoireData,
  color: Orientation,
): Gap[] {
  const tree = color === "white" ? trees.white : trees.black;
  const start = tree.roots[0];
  if (!start) return [];

  const gaps: Gap[] = [];
  const seen = new Set<NodeKey>();
  const queue: { key: NodeKey; route: string[] }[] = [{ key: start, route: [] }];

  while (queue.length) {
    const { key, route } = queue.shift()!;
    if (seen.has(key)) continue;
    seen.add(key);
    const node = tree.nodes.get(key);
    if (!node || node.minPly > MAX_PLY) continue;

    if (node.turn === color) {
      const edge = resolveEdge(node, data.choices);
      if (edge) queue.push({ key: edge.toKey, route: [...route, edge.san] });
      continue;
    }

    // Opponent to move: everything authored is covered; anything plausible and
    // unauthored is a gap.
    const answered = new Set(node.edges.map((e) => e.san));
    const replies = repliesFor(node);
    const best = replies.length ? Math.max(...replies.map((r) => r.cp)) : 0;

    for (const reply of replies) {
      if (answered.has(reply.san)) continue;
      if (!data.suppressed.includes(node.key) && best - reply.cp <= CP_WINDOW) {
        gaps.push({
          key: node.key,
          fen: node.fen,
          san: reply.san,
          route,
          ply: node.minPly,
          color,
          openings: node.openings,
          known: reply.known,
          cp: reply.cp,
        });
      }
    }

    for (const edge of node.edges) {
      queue.push({ key: edge.toKey, route: [...route, edge.san] });
    }
  }

  return gaps;
}

/** All coverage gaps, most-actionable first, capped per opening. */
export function findGaps(trees: RepertoireTrees, data: RepertoireData): Gap[] {
  const all = [
    ...(data.white.length ? gapsForColor(trees, data, "white") : []),
    ...(data.black.length ? gapsForColor(trees, data, "black") : []),
  ];

  all.sort((a, b) => {
    if (a.known !== b.known) return a.known ? -1 : 1; // real human moves first
    if (a.ply !== b.ply) return a.ply - b.ply; // shallow = more likely to meet
    return (b.cp ?? 0) - (a.cp ?? 0);
  });

  const perOpening = new Map<string, number>();
  const out: Gap[] = [];
  for (const gap of all) {
    const bucket = gap.openings[0] ?? "misc";
    const n = perOpening.get(bucket) ?? 0;
    if (n >= PER_OPENING_CAP) continue;
    perOpening.set(bucket, n + 1);
    out.push(gap);
  }
  return out;
}

/** Whether the precomputed reply data is present at all. */
export function hasReplyData(): boolean {
  return Object.keys(REPLIES).length > 0;
}

/** Rebuild helper for tools that need a full-catalog view of the gaps. */
export function catalogTree() {
  return buildTree();
}
