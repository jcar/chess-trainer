// Per-POSITION mastery for the Repertoire Lab.
//
// The Openings Trainer tracks mastery per LINE (`ol:<openingId>:<color>:<slug>`).
// A line you can replay from move 1 is not the same as a position you can answer
// cold, which is all a real game ever gives you — so the Lab tracks the same SRS
// store under its own namespace, keyed by position.
//
// `rn:` and `ol:` coexist deliberately: /trainer keeps reading its own progress.

import { srsStore, isDue, partitionQueue, type SrsData } from "../srs/store";
import type { NodeKey, RepNode, RepTree } from "./tree";
import { ourNodes, resolveEdge } from "./tree";
import type { RepertoireData } from "./store";
import type { RepertoireTrees } from "./useRepertoire";
import type { Orientation } from "@/content/types";

/** SRS namespace for a repertoire POSITION (distinct from `ol:` lines). */
export const nodeSrsKey = (key: NodeKey): string => `rn:${key}`;

/** Leitner box at which a position counts as known cold. */
export const KNOWN_BOX = 2;

export type NodeStatus = "new" | "learning" | "known";

export interface NodeMastery {
  status: NodeStatus;
  box: number;
  reps: number;
  lapses: number;
}

export function nodeMastery(srs: SrsData, key: NodeKey): NodeMastery {
  const it = srs[nodeSrsKey(key)];
  if (!it) return { status: "new", box: 0, reps: 0, lapses: 0 };
  return {
    status: it.box >= KNOWN_BOX ? "known" : "learning",
    box: it.box,
    reps: it.reps,
    lapses: it.lapses,
  };
}

export interface RepertoireCounts {
  total: number;
  known: number;
  learning: number;
  fresh: number;
  due: number;
}

/** Mastery across every position where it's our move, both colours. */
export function repertoireCounts(
  trees: RepertoireTrees,
  data: RepertoireData,
  srs: SrsData,
  now: number,
): RepertoireCounts {
  const counts: RepertoireCounts = { total: 0, known: 0, learning: 0, fresh: 0, due: 0 };
  for (const node of drillableNodes(trees, data)) {
    counts.total++;
    const it = srs[nodeSrsKey(node.key)];
    if (!it) counts.fresh++;
    else if (it.box >= KNOWN_BOX) counts.known++;
    else counts.learning++;
    if (isDue(srs, nodeSrsKey(node.key), now)) counts.due++;
  }
  return counts;
}

/**
 * Every position the learner is responsible for: our-move positions reachable
 * by playing our resolved moves and following every authored opponent reply,
 * across both colours.
 */
export function drillableNodes(trees: RepertoireTrees, data: RepertoireData): RepNode[] {
  const seen = new Set<NodeKey>();
  const out: RepNode[] = [];
  for (const color of ["white", "black"] as Orientation[]) {
    const ids = color === "white" ? data.white : data.black;
    if (!ids.length) continue;
    const tree = color === "white" ? trees.white : trees.black;
    for (const node of ourNodes(tree, color, data.choices)) {
      if (seen.has(node.key)) continue;
      seen.add(node.key);
      out.push(node);
    }
  }
  return out;
}

/** Which colour a drillable position belongs to (the side to move is ours). */
export function colorOf(node: RepNode): Orientation {
  return node.turn;
}

/**
 * The review queue: positions due now (most-lapsed first — the SRS's built-in
 * mistake bank), then up to `newLimit` never-seen positions, shallowest first so
 * a session builds outward from the opening rather than starting at ply 13.
 */
export function reviewQueue(
  trees: RepertoireTrees,
  data: RepertoireData,
  srs: SrsData,
  now: number,
  newLimit = 8,
): RepNode[] {
  const nodes = drillableNodes(trees, data);
  const byKey = new Map(nodes.map((n) => [n.key, n]));
  const { due, fresh } = partitionQueue(
    srs,
    nodes.map((n) => n.key).map(nodeSrsKey),
    now,
  );
  const strip = (id: string): NodeKey => id.slice(3);
  const dueNodes = due.map((id) => byKey.get(strip(id))!).filter(Boolean);

  // Fresh positions are shallow-first so a new repertoire is learned from the
  // opening outward — but taking the shallowest N makes a whole session ply 0-3,
  // where there is no move order to confuse and the deeper drills can't fire.
  // So: anchor on the shallow head, then spread the rest across the depth range.
  const sorted = fresh
    .map((id) => byKey.get(strip(id))!)
    .filter(Boolean)
    .sort((a, b) => a.minPly - b.minPly);
  const headCount = Math.min(Math.ceil(newLimit * 0.6), sorted.length);
  const head = sorted.slice(0, headCount);
  const tail = sorted.slice(headCount);
  const wantTail = Math.min(newLimit - headCount, tail.length);
  const step = wantTail > 0 ? Math.max(1, Math.floor(tail.length / wantTail)) : 1;
  const spread: RepNode[] = [];
  for (let i = 0; i < tail.length && spread.length < wantTail; i += step) {
    spread.push(tail[i]);
  }
  return [...dueNodes, ...head, ...spread];
}

/** Count of positions due for review right now. */
export function dueNodeCount(
  trees: RepertoireTrees,
  data: RepertoireData,
  srs: SrsData,
  now: number,
): number {
  let n = 0;
  for (const node of drillableNodes(trees, data)) {
    if (isDue(srs, nodeSrsKey(node.key), now)) n++;
  }
  return n;
}

/** Record a drill result for one position. */
export function recordNode(key: NodeKey, good: boolean): void {
  srsStore.record(nodeSrsKey(key), good);
}

/** The positions the learner misses most — the health page's actionable list. */
export function weakestNodes(
  trees: RepertoireTrees,
  data: RepertoireData,
  srs: SrsData,
  limit = 8,
): { node: RepNode; lapses: number; box: number }[] {
  return drillableNodes(trees, data)
    .map((node) => {
      const it = srs[nodeSrsKey(node.key)];
      return { node, lapses: it?.lapses ?? 0, box: it?.box ?? 0 };
    })
    .filter((x) => x.lapses > 0)
    .sort((a, b) => b.lapses - a.lapses || a.box - b.box)
    .slice(0, limit);
}

/**
 * How deep the learner can actually go from a position before hitting one they
 * don't know cold: follows our resolved move and the MAIN opponent reply,
 * counting plies while each of our positions is at box >= KNOWN_BOX.
 */
export function coldDepth(
  tree: RepTree,
  startKey: NodeKey,
  color: Orientation,
  choices: Record<NodeKey, string>,
  srs: SrsData,
): number {
  const seen = new Set<NodeKey>();
  let depth = 0;
  let cur = tree.nodes.get(startKey);
  while (cur && !seen.has(cur.key)) {
    seen.add(cur.key);
    if (cur.turn === color) {
      const it = srs[nodeSrsKey(cur.key)];
      if (!it || it.box < KNOWN_BOX) break;
    }
    const edge = cur.turn === color ? resolveEdge(cur, choices) : cur.edges[0];
    if (!edge) break;
    depth++;
    cur = tree.nodes.get(edge.toKey);
  }
  return depth;
}

/**
 * One-time, NON-DESTRUCTIVE seed of position mastery from the Openings
 * Trainer's line-level progress: a line you've drilled cleanly gives some
 * evidence about its positions, but not full credit — line recall is the weaker
 * claim, so we cap the seeded box below KNOWN_BOX+1 and stagger the due dates so
 * the first Lab session still tests them.
 *
 * `ol:` items are left untouched; /trainer keeps working.
 */
export function seedFromTrainer(
  trees: RepertoireTrees,
  data: RepertoireData,
  srs: SrsData,
  now: number,
): { seeded: number } {
  const DAY = 86_400_000;

  // Best `ol:` box per opening, computed once (ids are `ol:<openingId>:<color>:<slug>`).
  const bestBox = new Map<string, number>();
  for (const id in srs) {
    if (!id.startsWith("ol:")) continue;
    const openingId = id.slice(3, id.indexOf(":", 3));
    if (!openingId) continue;
    bestBox.set(openingId, Math.max(bestBox.get(openingId) ?? 0, srs[id].box));
  }
  if (bestBox.size === 0) return { seeded: 0 };

  const entries: { id: string; box: number; due: number }[] = [];
  let stagger = 0;
  for (const node of drillableNodes(trees, data)) {
    if (srs[nodeSrsKey(node.key)]) continue; // never overwrite earned Lab data

    let best = 0;
    for (const openingId of node.openings) {
      best = Math.max(best, bestBox.get(openingId) ?? 0);
    }
    if (best < 1) continue;

    // Line recall is the weaker claim than position recall, so cap the credit
    // and spread the first reviews over three days rather than burying the
    // learner in one session.
    entries.push({
      id: nodeSrsKey(node.key),
      box: Math.min(best, KNOWN_BOX),
      due: now + (stagger++ % 3) * DAY,
    });
  }
  return { seeded: srsStore.seedMissing(entries) };
}
