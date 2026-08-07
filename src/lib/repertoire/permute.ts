// Alternate move ORDERS that reach the same position.
//
// This is what makes the Shuffled Order drill possible. The learner's complaint
// is that they know the moves but lose the sequence, so the drill has the
// opponent arrive at the same position by a different route while the learner
// still has to produce their own moves.
//
// Constraint that makes the drill well-defined: OUR plies keep their authored
// relative order (so at each of our turns exactly one move is owed); only the
// opponent's plies are permuted. Measured across the corpus, every line/colour
// pair yields at least one such reorder.

import { Chess } from "chess.js";
import { seededOrder } from "../shuffle";
import { nodeKey } from "./tree";

/** Search bound — permutation space is small but not free. */
const NODE_CAP = 40_000;

export interface AlternateOrder {
  /** The full reordered SAN sequence from the initial position. */
  sans: string[];
  /** The opponent plies that moved, for the post-drill explanation. */
  changedAtPly: number[];
}

function toUci(sans: string[]): { uci: string[]; targetKey: string } | null {
  const game = new Chess();
  const uci: string[] = [];
  for (const san of sans) {
    try {
      const m = game.move(san);
      uci.push(`${m.from}${m.to}${m.promotion ?? ""}`);
    } catch {
      return null;
    }
  }
  return { uci, targetKey: nodeKey(game.fen()) };
}

/**
 * Find alternate legal orders of `sans` that end on the same position, with our
 * plies fixed in relative order. `ourParity` is 0 when we move first (White).
 * Deterministic: candidates are explored in a `seed`-shuffled order so a given
 * (line, seed) always yields the same variety.
 */
export function alternateOrders(
  sans: string[],
  ourParity: 0 | 1,
  seed: string,
  limit = 3,
): AlternateOrder[] {
  const converted = toUci(sans);
  if (!converted) return [];
  const { uci, targetKey } = converted;
  const authored = uci.join(" ");
  const ours = uci.filter((_, i) => i % 2 === ourParity);
  const theirs = uci.filter((_, i) => i % 2 !== ourParity);

  const found: AlternateOrder[] = [];
  let nodes = 0;

  const dfs = (
    game: Chess,
    ourIdx: number,
    rest: string[],
    accUci: string[],
    accSan: string[],
  ): void => {
    if (found.length >= limit || nodes > NODE_CAP) return;
    nodes++;

    if (ourIdx >= ours.length && rest.length === 0) {
      if (nodeKey(game.fen()) === targetKey && accUci.join(" ") !== authored) {
        const changed: number[] = [];
        accUci.forEach((u, i) => {
          if (u !== uci[i]) changed.push(i);
        });
        found.push({ sans: [...accSan], changedAtPly: changed });
      }
      return;
    }

    const ourTurn = accUci.length % 2 === ourParity;
    const raw = ourTurn
      ? ourIdx < ours.length
        ? [ours[ourIdx]]
        : []
      : [...new Set(rest)];
    // Deterministic variety: explore the opponent's options in a seeded order.
    const order = ourTurn ? raw.map((_, i) => i) : seededOrder(raw.length, `${seed}:${accUci.length}`);
    for (const oi of order) {
      const u = raw[oi];
      if (!u) continue;
      let move;
      try {
        move = game.move({
          from: u.slice(0, 2),
          to: u.slice(2, 4),
          promotion: (u.slice(4) || undefined) as never,
        });
      } catch {
        continue;
      }
      const nextRest = rest.slice();
      if (!ourTurn) nextRest.splice(nextRest.indexOf(u), 1);
      dfs(game, ourTurn ? ourIdx + 1 : ourIdx, nextRest, [...accUci, u], [...accSan, move.san]);
      game.undo();
    }
  };

  dfs(new Chess(), 0, theirs, [], []);
  return found;
}
