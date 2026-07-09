// The opening "book" for Sparring: turns the flat per-line opening data into a
// live, position-aware book so the bot can play real, varied theory (blind to
// the learner) and the coach can say "still in book — this is the X" or "you've
// left book — theory was Y", then hand off to the middlegame.
//
// Model: the game state is the SET OF CANDIDATE LINES still consistent with the
// moves played so far. Every line's `sans` is a full sequence from the standard
// start, so all surviving candidates share the live board position and the same
// ply cursor. (Lines with a non-standard `startFen` are excluded — they'd break
// that invariant; they're a small minority.) As the game deepens, candidates
// narrow, which is exactly how the opening reveals itself.

import { OPENINGS } from "@/content/openings";
import type { Opening, OpeningLine } from "@/content/openings/types";
import type { Orientation } from "@/content/types";

interface Candidate {
  opening: Opening;
  line: OpeningLine;
  /** Index of the NEXT move expected in line.sans. */
  ply: number;
}

export interface BookState {
  candidates: Candidate[];
}

/** Strip decoration so stored SAN and chess.js SAN compare equal. */
function norm(san: string): string {
  return san.replace(/[+#!?]/g, "");
}

/** All full-from-start lines, at the opening position. */
export function initBook(): BookState {
  const candidates: Candidate[] = [];
  for (const opening of OPENINGS) {
    for (const line of opening.lines) {
      if (line.startFen) continue; // keep the "sans from the standard start" invariant
      candidates.push({ opening, line, ply: 0 });
    }
  }
  return { candidates };
}

/** Are we still following authored theory? */
export function inBook(state: BookState): boolean {
  return state.candidates.some((c) => c.line.sans[c.ply] !== undefined);
}

/** Keep only candidates whose next move is `san`, advancing their cursor. */
export function advanceBook(state: BookState, san: string): BookState {
  const played = norm(san);
  const candidates = state.candidates
    .filter((c) => c.line.sans[c.ply] !== undefined && norm(c.line.sans[c.ply]!) === played)
    .map((c) => ({ ...c, ply: c.ply + 1 }));
  return { candidates };
}

export interface TheoryMove {
  san: string;
  note?: string;
  /** Total weight (core openings count double) — used for the bot's choice. */
  weight: number;
}

/** The booked continuations from the current position, for the side to move. */
export function theoryMoves(state: BookState): TheoryMove[] {
  const bySan = new Map<string, TheoryMove>();
  for (const c of state.candidates) {
    const san = c.line.sans[c.ply];
    if (san === undefined) continue;
    const key = norm(san);
    const w = c.opening.tier === "core" ? 2 : 1;
    const existing = bySan.get(key);
    if (existing) {
      existing.weight += w;
      if (!existing.note) existing.note = c.line.notes?.[c.ply];
    } else {
      bySan.set(key, { san, note: c.line.notes?.[c.ply], weight: w });
    }
  }
  return [...bySan.values()];
}

export interface DeviationLesson {
  /** The opening we were in (only once candidates converged to one). */
  opening?: Opening;
  /** The line (only once it's the single candidate). */
  line?: OpeningLine;
  /** The booked moves that were available, weight-sorted (best/most-common first). */
  theory: TheoryMove[];
  /** Authored "why this wrong move is bad" for the played move, if one exists. */
  mistakeWhy?: string;
}

/**
 * Explain a move that left book, resolved against the PRE-move book state (its
 * candidates are still populated). Powers the Sparring off-book coaching card:
 * the correct book move + its idea, plus any authored refutation of the move
 * the learner actually played.
 */
export function explainDeviation(before: BookState, playedSan: string): DeviationLesson {
  const played = norm(playedSan);
  const theory = [...theoryMoves(before)].sort((a, b) => b.weight - a.weight);
  const id = identify(before);
  let mistakeWhy: string | undefined;
  for (const c of before.candidates) {
    const cm = c.line.commonMistakes?.find(
      (m) => m.ply === c.ply && norm(m.move) === played,
    );
    if (cm) { mistakeWhy = cm.why; break; }
  }
  return { opening: id.opening, line: id.line, theory, mistakeWhy };
}

/** Pick a booked reply for the bot (weighted toward core theory), or null. */
export function pickBotSan(state: BookState, rand: number = Math.random()): string | null {
  const moves = theoryMoves(state);
  if (moves.length === 0) return null;
  const total = moves.reduce((s, m) => s + m.weight, 0);
  let r = rand * total;
  for (const m of moves) {
    r -= m.weight;
    if (r < 0) return m.san;
  }
  return moves[moves.length - 1].san;
}

export interface BookIdentity {
  /** The single opening we're in, once candidates converge to one. */
  opening?: Opening;
  /** The single line, once it's the only candidate of that opening. */
  line?: OpeningLine;
  /** How many distinct openings are still possible. */
  openingCount: number;
}

/** Which opening/line the current position belongs to (as it narrows). */
export function identify(state: BookState): BookIdentity {
  const ids = new Map<string, Opening>();
  for (const c of state.candidates) ids.set(c.opening.id, c.opening);
  if (ids.size !== 1) return { openingCount: ids.size };
  const opening = [...ids.values()][0];
  const lines = new Set(state.candidates.map((c) => c.line.label));
  const line = lines.size === 1 ? state.candidates[0].line : undefined;
  return { opening, line, openingCount: 1 };
}

/**
 * If the current position has converged to a single opening AND the learner is
 * playing that opening's trained side, return the SRS line key so a slip can be
 * fed back to the classic Trainer. Otherwise null (we only own the trained side).
 */
export function slipLine(
  state: BookState,
  learnerColor: Orientation,
): { openingId: string; color: Orientation; label: string } | null {
  const id = identify(state);
  if (!id.opening || !id.line) return null;
  if (id.opening.trainerColor !== learnerColor) return null;
  return {
    openingId: id.opening.id,
    color: id.opening.trainerColor,
    label: id.line.label,
  };
}
