// Position-keyed repertoire tree.
//
// The Openings Trainer (`lib/trainer/lines.ts`) keys everything by LINE and
// drills each line by replaying from move 1. That trains sequence recall — the
// crutch that fails in a real game, where you only ever get a POSITION. This
// module compiles the same `OPENINGS` data into a graph keyed by position, so
// the Lab can answer "what do I play HERE", collapse transpositions onto one
// node, and drill from a position with no line context.
//
// Content is curated-only: every node and edge derives from `src/content/openings`.

import { Chess } from "chess.js";
import type { Opening, OpeningLine } from "@/content/openings/types";
import { OPENINGS, getOpening } from "@/content/openings";
import type { Orientation } from "@/content/types";

/**
 * A position identity: the first four FEN fields (placement, side to move,
 * castling, en-passant) — the halfmove/fullmove counters are dropped so the
 * same position reached by different move orders collapses onto one node.
 */
export type NodeKey = string;

/**
 * Canonical node key for a FEN. ALWAYS round-trips through chess.js first:
 * chess.js 1.4.0 emits the ep square only when a capture is actually legal and
 * normalizes a spurious one away on load, so a hand-written FEN (`tabiyaFen`,
 * `structureDiagram.fen`) must never be sliced directly — it would split a node
 * in two. `scripts/repertoire-stats.ts` asserts this behavior still holds.
 */
export function nodeKey(fen: string): NodeKey {
  return new Chess(fen).fen().split(" ").slice(0, 4).join(" ");
}

/** Which authored line contributed a move, and at which ply. */
export interface EdgeSource {
  openingId: string;
  openingName: string;
  lineLabel: string;
  ply: number;
}

/** A move out of a position. */
export interface RepEdge {
  san: string;
  uci: string;
  /** The position this move leads to. */
  toKey: NodeKey;
  /** The authored `notes[ply]` for this move (first non-empty wins). */
  note?: string;
  /** Every authored line that plays this move from this position. */
  sources: EdgeSource[];
  /**
   * Set when this move is an authored opponent DEVIATION (`OpeningLine.branch`),
   * so a drill can frame it: "instead of the main move, they play this".
   */
  deviationFrom?: string;
}

/** A position in the repertoire. */
export interface RepNode {
  key: NodeKey;
  /** A full FEN for this position (counters are arbitrary — key is the identity). */
  fen: string;
  turn: Orientation;
  /** Shallowest ply at which this position arises. */
  minPly: number;
  /** Distinct SAN routes into this position (capped; >1 means a transposition). */
  paths: string[][];
  /** Moves out, in registry order — the first is the main move. */
  edges: RepEdge[];
  parents: NodeKey[];
  /** Openings whose lines pass through here. */
  openings: string[];
  /**
   * Authored `commonMistakes` for THIS position — wrong moves a learner plays
   * here, with the teaching explanation. Deduped by move across contributing
   * lines.
   */
  mistakes: { move: string; why: string }[];
}

export interface RepTree {
  nodes: Map<NodeKey, RepNode>;
  /** Start positions (normally just the standard initial position). */
  roots: NodeKey[];
}

/** The standard initial position's node key — the root of every tree. */
export const START_KEY: NodeKey =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -";

/** How many distinct routes we retain per node (bounds memory; UI shows ~3). */
const MAX_PATHS = 4;

function blankNode(fen: string, ply: number): RepNode {
  return {
    key: nodeKey(fen),
    fen,
    turn: fen.split(" ")[1] === "w" ? "white" : "black",
    minPly: ply,
    paths: [],
    edges: [],
    parents: [],
    openings: [],
    mistakes: [],
  };
}

function pushUnique<T>(arr: T[], value: T): void {
  if (!arr.includes(value)) arr.push(value);
}

function addLine(
  nodes: Map<NodeKey, RepNode>,
  roots: NodeKey[],
  o: Opening,
  line: OpeningLine,
): void {
  const game = new Chess(line.startFen);

  const touch = (fen: string, ply: number, path: string[]): RepNode => {
    const key = nodeKey(fen);
    let node = nodes.get(key);
    if (!node) {
      node = blankNode(fen, ply);
      nodes.set(key, node);
    }
    node.minPly = Math.min(node.minPly, ply);
    pushUnique(node.openings, o.id);
    if (node.paths.length < MAX_PATHS) {
      const sig = path.join(" ");
      if (!node.paths.some((p) => p.join(" ") === sig)) node.paths.push([...path]);
    }
    return node;
  };

  const path: string[] = [];
  let node = touch(game.fen(), 0, path);
  pushUnique(roots, node.key);

  line.sans.forEach((san, ply) => {
    // Attach this ply's authored mistakes to the position they'd be played FROM.
    for (const m of line.commonMistakes ?? []) {
      if (m.ply === ply && !node.mistakes.some((x) => x.move === m.move)) {
        node.mistakes.push({ move: m.move, why: m.why });
      }
    }

    const move = game.move(san); // throws on illegal — `npm run validate` guards content
    const from = node;
    node = touch(game.fen(), ply + 1, [...path, move.san]);
    path.push(move.san);
    pushUnique(node.parents, from.key);

    let edge = from.edges.find((e) => e.san === move.san);
    if (!edge) {
      edge = {
        san: move.san,
        uci: `${move.from}${move.to}${move.promotion ?? ""}`,
        toKey: node.key,
        sources: [],
      };
      from.edges.push(edge);
    }
    if (!edge.note) {
      const note = line.notes?.[ply];
      if (note) edge.note = note;
    }
    // An authored deviation labels the move it deviates WITH.
    if (line.branch && line.branch.atPly === ply && line.branch.tryMove === san) {
      edge.deviationFrom = line.branch.from;
    }
    edge.sources.push({
      openingId: o.id,
      openingName: o.name,
      lineLabel: line.label,
      ply,
    });
  });
}

const cache = new Map<string, RepTree>();

/**
 * Compile `OPENINGS` (or the given subset) into a position-keyed tree.
 * Memoized on the opening-id set — the whole corpus compiles in well under
 * 100ms, so this runs at call time rather than shipping a prebuilt JSON that
 * could go stale against the content.
 */
export function buildTree(openingIds?: string[]): RepTree {
  const ids = openingIds ? [...openingIds].sort() : OPENINGS.map((o) => o.id).sort();
  const cacheKey = ids.join(",");
  const hit = cache.get(cacheKey);
  if (hit) return hit;

  const nodes = new Map<NodeKey, RepNode>();
  const roots: NodeKey[] = [];
  for (const id of ids) {
    const opening = getOpening(id);
    if (!opening) continue;
    for (const line of opening.lines) addLine(nodes, roots, opening, line);
  }

  const tree: RepTree = { nodes, roots };
  cache.set(cacheKey, tree);
  return tree;
}

/** Positions reachable by more than one move order. */
export function transpositions(tree: RepTree): RepNode[] {
  return [...tree.nodes.values()]
    .filter((n) => n.paths.length > 1)
    .sort((a, b) => a.minPly - b.minPly);
}

/** Positions shared by more than one opening (the common early spine + genuine overlaps). */
export function sharedPositions(tree: RepTree): RepNode[] {
  return [...tree.nodes.values()]
    .filter((n) => n.openings.length > 1)
    .sort((a, b) => a.minPly - b.minPly);
}

/**
 * Positions where OUR side has more than one authored move — a repertoire must
 * be a function position → one move, so each of these needs resolving once (see
 * `RepertoireData.choices`).
 */
export function conflicts(tree: RepTree, color: Orientation): RepNode[] {
  return [...tree.nodes.values()]
    .filter((n) => n.turn === color && n.edges.length > 1)
    .sort((a, b) => a.minPly - b.minPly);
}

/**
 * The move we play from a node: the learner's resolved choice if there is one,
 * otherwise the main (first-authored) move.
 */
export function resolveEdge(
  node: RepNode,
  choices: Record<NodeKey, string> = {},
): RepEdge | undefined {
  const chosen = choices[node.key];
  if (chosen) {
    const edge = node.edges.find((e) => e.san === chosen);
    if (edge) return edge;
  }
  return node.edges[0];
}

/**
 * Walk our repertoire from `startKey`, taking our resolved move and following
 * EVERY authored opponent reply. Returns the reachable nodes, ours-to-move
 * first-come order. Used for coverage, depth and drill queues.
 */
export function walkRepertoire(
  tree: RepTree,
  color: Orientation,
  choices: Record<NodeKey, string> = {},
  startKey?: NodeKey,
): RepNode[] {
  const start = startKey ?? tree.roots[0];
  const seen = new Set<NodeKey>();
  const out: RepNode[] = [];
  const queue: NodeKey[] = start ? [start] : [];

  while (queue.length) {
    const key = queue.shift()!;
    if (seen.has(key)) continue;
    seen.add(key);
    const node = tree.nodes.get(key);
    if (!node) continue;
    out.push(node);

    if (node.turn === color) {
      const edge = resolveEdge(node, choices);
      if (edge) queue.push(edge.toKey);
    } else {
      for (const edge of node.edges) queue.push(edge.toKey);
    }
  }
  return out;
}

/** Every position where it's our move — the set the drills actually test. */
export function ourNodes(
  tree: RepTree,
  color: Orientation,
  choices: Record<NodeKey, string> = {},
): RepNode[] {
  return walkRepertoire(tree, color, choices).filter((n) => n.turn === color);
}
