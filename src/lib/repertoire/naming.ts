// Naming what WE play in a repertoire slot.
//
// An `Opening` file holds BOTH sides' moves and is named for the opening, so a
// White slot answering 1...c6 would be headlined "Caro-Kann Defence" — reading
// as though the app were telling you to play the Caro-Kann as White. This
// module resolves the name from OUR seat instead.
//
// Kept out of traits.ts so that stays tree-free.

import { Chess } from "chess.js";
import { getOpening } from "@/content/openings";
import { SLOTS, SYSTEM_NAMES, type SlotId } from "./traits";
import { nodeKey, resolveEdge, type NodeKey, type RepTree } from "./tree";

/** Node key for the position a slot answers, or null when it has no single one. */
export function keyForSlot(slot: SlotId): NodeKey | null {
  const prefix = SLOTS[slot].prefix;
  // `b-vs-flank` covers 1.c4 / 1.Nf3 / 1.b3 — there is no one position.
  if (prefix.length === 0) return null;
  const game = new Chess();
  for (const san of prefix) {
    try {
      game.move(san);
    } catch {
      return null;
    }
  }
  return nodeKey(game.fen());
}

/**
 * OUR resolved SAN moves from the slot position, following our choices and the
 * opponent's main reply. These select which curated name applies (Advance vs
 * Exchange vs Classical, etc.).
 */
export interface SlotMoves {
  /** OUR SAN moves, in order. */
  moves: string[];
  /** Plies already played before the first of them (drives move numbering). */
  startPly: number;
}

export function ourMovesFromSlot(
  tree: RepTree,
  slot: SlotId,
  choices: Record<NodeKey, string> = {},
  max = 4,
): string[] {
  return slotMoves(tree, slot, choices, max).moves;
}

export function slotMoves(
  tree: RepTree,
  slot: SlotId,
  choices: Record<NodeKey, string> = {},
  max = 4,
): SlotMoves {
  const color = SLOTS[slot].color;
  // A slot position may not exist in this tree: `w-vs-d5`/`w-vs-indian` are
  // defined by 1.d4 but are also the slots a 1.c4 / 1.Nf3 / 1.b3 repertoire
  // fills. Fall back to walking from the root, which yields what we actually
  // play there.
  const slotKey = keyForSlot(slot);
  const useSlotKey = !!slotKey && tree.nodes.has(slotKey);
  const startKey = useSlotKey ? slotKey! : tree.roots[0];
  if (!startKey) return { moves: [], startPly: 0 };
  const startPly = useSlotKey ? SLOTS[slot].prefix.length : 0;

  const ours: string[] = [];
  const seen = new Set<NodeKey>();
  let cur = tree.nodes.get(startKey);
  while (cur && ours.length < max && !seen.has(cur.key)) {
    seen.add(cur.key);
    const edge = cur.turn === color ? resolveEdge(cur, choices) : cur.edges[0];
    if (!edge) break;
    if (cur.turn === color) ours.push(edge.san);
    cur = tree.nodes.get(edge.toKey);
  }
  return { moves: ours, startPly };
}

/**
 * The name of the system we play. Resolution order:
 *   1. curated row (longest `after` prefix match against our moves)
 *   2. the opening's own name, when the slot's colour is the side that opening
 *      is written for — covers 37 of the 47 pairs
 *   3. a bare move gloss (safety net; `systemNameCoverageErrors()` asserts empty)
 */
export function systemNameFor(
  slot: SlotId,
  openingId: string,
  ourMoves: string[] = [],
): string {
  const rows = SYSTEM_NAMES.filter((r) => r.slot === slot && r.openingId === openingId);
  let best: { len: number; name: string } | null = null;
  for (const row of rows) {
    const after = row.after ?? [];
    const matches = after.every((san, i) => ourMoves[i] === san);
    if (!matches) continue;
    if (!best || after.length > best.len) best = { len: after.length, name: row.name };
  }
  if (best) return best.name;

  const opening = getOpening(openingId);
  if (opening && SLOTS[slot].color === opening.trainerColor) return opening.name;

  if (ourMoves.length) {
    return movesGloss({ moves: ourMoves, startPly: SLOTS[slot].prefix.length }, slot);
  }
  return opening?.name ?? openingId;
}

/** Convenience: resolve the name using the tree to find our actual moves. */
export function resolveSystemName(
  tree: RepTree,
  slot: SlotId,
  openingId: string,
  choices: Record<NodeKey, string> = {},
): string {
  return systemNameFor(slot, openingId, ourMovesFromSlot(tree, slot, choices));
}

/**
 * Our moves written with move numbers, e.g. "2.d4 3.e5" — used as the muted
 * line under the headline, and as the last-resort name.
 */
export function movesGloss({ moves, startPly }: SlotMoves, slot: SlotId): string {
  const white = SLOTS[slot].color === "white";
  return moves
    .map((san, i) => {
      const ply = startPly + i * 2 + 1; // our moves alternate from here
      const moveNo = Math.ceil(ply / 2);
      return white ? `${moveNo}.${san}` : `${moveNo}…${san}`;
    })
    .join(" ");
}
