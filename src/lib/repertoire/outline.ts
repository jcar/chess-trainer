// Flattens the repertoire DAG into the indented rows the tree view renders.
//
// An outline (not miller columns): depth runs 6-15 plies with fan-out mostly 2,
// and reading the SEQUENCE top-to-bottom is the thing the learner needs to
// internalise. Opponent branch points show their main reply and collapse the
// rest behind a "+N more" affordance so the page stays scannable.

import type { NodeKey, RepTree } from "./tree";
import { resolveEdge } from "./tree";
import type { Orientation } from "@/content/types";

export interface OutlineRow {
  /** Stable id: the SAN route to this position. */
  id: string;
  san: string;
  /** 1-based ply of this move. */
  ply: number;
  /** Indentation level (increases at each opponent branch). */
  depth: number;
  /** True when this is OUR move. */
  ours: boolean;
  fromKey: NodeKey;
  toKey: NodeKey;
  note?: string;
  /** Full SAN route to the position after this move. */
  path: string[];
  /** This position is reachable by more than one move order. */
  transposition: boolean;
  /** Openings that pass through the resulting position. */
  openings: string[];
  /** Alternatives to this move at the same position (0 when it's forced/chosen). */
  alternatives: number;
  /** Set on an opponent row that has collapsed siblings below it. */
  collapsed?: number;
  /** The node whose siblings are collapsed (the expand toggle's key). */
  branchKey?: NodeKey;
}

export interface OutlineOptions {
  /** Opponent branch nodes the learner has expanded. */
  expanded?: Set<NodeKey>;
  /** Safety bound on total rows. */
  maxRows?: number;
}

/**
 * Build the outline for one colour: follow our resolved move at our positions,
 * and the opponent's replies at theirs.
 */
export function buildOutline(
  tree: RepTree,
  color: Orientation,
  choices: Record<NodeKey, string> = {},
  opts: OutlineOptions = {},
): OutlineRow[] {
  const expanded = opts.expanded ?? new Set<NodeKey>();
  const maxRows = opts.maxRows ?? 600;
  const rows: OutlineRow[] = [];
  const startKey = tree.roots[0];
  if (!startKey) return rows;

  const walk = (key: NodeKey, ply: number, depth: number, path: string[], seen: Set<NodeKey>): void => {
    if (rows.length >= maxRows) return;
    const node = tree.nodes.get(key);
    if (!node || seen.has(key)) return;
    const nextSeen = new Set(seen).add(key);

    const emit = (
      san: string,
      toKey: NodeKey,
      note: string | undefined,
      alternatives: number,
      extra?: Partial<OutlineRow>,
    ): string[] => {
      const nextPath = [...path, san];
      const to = tree.nodes.get(toKey);
      rows.push({
        id: nextPath.join(" "),
        san,
        ply: ply + 1,
        depth,
        ours: node.turn === color,
        fromKey: key,
        toKey,
        note,
        path: nextPath,
        transposition: (to?.paths.length ?? 0) > 1,
        openings: to?.openings ?? [],
        alternatives,
        ...extra,
      });
      return nextPath;
    };

    if (node.turn === color) {
      const edge = resolveEdge(node, choices);
      if (!edge) return;
      const nextPath = emit(edge.san, edge.toKey, edge.note, node.edges.length - 1);
      walk(edge.toKey, ply + 1, depth, nextPath, nextSeen);
      return;
    }

    // Opponent to move: show the main reply, plus the rest if expanded. The
    // root is always expanded — for a Black repertoire, "what White opens with"
    // IS the top-level branch, and hiding it behind "+2 more" buries the shape
    // of the whole repertoire.
    const isExpanded = expanded.has(key) || key === startKey;
    const shown = isExpanded ? node.edges : node.edges.slice(0, 1);
    const hidden = node.edges.length - shown.length;

    shown.forEach((edge, i) => {
      const nextPath = emit(edge.san, edge.toKey, edge.note, node.edges.length - 1, {
        ...(i === shown.length - 1 && hidden > 0
          ? { collapsed: hidden, branchKey: key }
          : {}),
        ...(node.edges.length > 1 ? { branchKey: key } : {}),
      });
      // Only branch the indentation when there really is a choice.
      walk(edge.toKey, ply + 1, depth + (node.edges.length > 1 ? 1 : 0), nextPath, nextSeen);
    });
  };

  walk(startKey, 0, 0, [], new Set());
  return rows;
}

/** Move number label for a ply: "4." for White's move, "4…" for Black's. */
export function plyLabel(ply: number): string {
  const moveNo = Math.ceil(ply / 2);
  return ply % 2 === 1 ? `${moveNo}.` : `${moveNo}…`;
}
