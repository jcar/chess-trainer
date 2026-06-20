// Geometric move generation for move-maps — independent of chess.js (which
// rejects positions without kings). Given one piece on an otherwise EMPTY board,
// returns the squares it can reach. Movement only (the board is empty), but pawns
// also report their diagonal capture squares so kids see how pawns attack.

import type { PieceType } from "@/content/types";

const FILES = "abcdefgh";

function fileIdx(sq: string): number {
  return FILES.indexOf(sq[0]);
}
function rankIdx(sq: string): number {
  return Number(sq[1]) - 1;
}
function toSq(f: number, r: number): string | null {
  if (f < 0 || f > 7 || r < 0 || r > 7) return null;
  return FILES[f] + (r + 1);
}

const ROOK_DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const BISHOP_DIRS = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];
const KNIGHT_OFFSETS = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

function ray(f: number, r: number, dirs: number[][]): string[] {
  const out: string[] = [];
  for (const [df, dr] of dirs) {
    let nf = f + df;
    let nr = r + dr;
    let sq = toSq(nf, nr);
    while (sq) {
      out.push(sq);
      nf += df;
      nr += dr;
      sq = toSq(nf, nr);
    }
  }
  return out;
}

function step(f: number, r: number, offsets: number[][]): string[] {
  const out: string[] = [];
  for (const [df, dr] of offsets) {
    const sq = toSq(f + df, r + dr);
    if (sq) out.push(sq);
  }
  return out;
}

/**
 * Squares a (white) piece reaches from `square` on an empty board. For move-maps.
 * Pawns: the forward square(s) plus the two diagonal capture squares.
 */
export function pieceTargets(piece: PieceType, square: string): string[] {
  const f = fileIdx(square);
  const r = rankIdx(square);
  switch (piece) {
    case "rook":
      return ray(f, r, ROOK_DIRS);
    case "bishop":
      return ray(f, r, BISHOP_DIRS);
    case "queen":
      return ray(f, r, [...ROOK_DIRS, ...BISHOP_DIRS]);
    case "king":
      return step(f, r, [...ROOK_DIRS, ...BISHOP_DIRS]);
    case "knight":
      return step(f, r, KNIGHT_OFFSETS);
    case "pawn": {
      const out: string[] = [];
      const one = toSq(f, r + 1);
      if (one) out.push(one);
      if (r === 1) {
        const two = toSq(f, r + 2);
        if (two) out.push(two);
      }
      for (const df of [-1, 1]) {
        const cap = toSq(f + df, r + 1);
        if (cap) out.push(cap);
      }
      return out;
    }
  }
}

/** A representative arrow per movement direction, for the "pattern" look. */
export function pieceArrows(
  piece: PieceType,
  square: string,
): { from: string; to: string }[] {
  const f = fileIdx(square);
  const r = rankIdx(square);
  const tips = (dirs: number[][]) =>
    dirs
      .map(([df, dr]) => {
        // Walk to the last on-board square in this direction.
        let last: string | null = null;
        let nf = f + df;
        let nr = r + dr;
        let sq = toSq(nf, nr);
        while (sq) {
          last = sq;
          nf += df;
          nr += dr;
          sq = toSq(nf, nr);
        }
        return last;
      })
      .filter((s): s is string => s !== null)
      .map((to) => ({ from: square, to }));

  switch (piece) {
    case "rook":
      return tips(ROOK_DIRS);
    case "bishop":
      return tips(BISHOP_DIRS);
    case "queen":
      return tips([...ROOK_DIRS, ...BISHOP_DIRS]);
    case "king":
    case "knight":
    case "pawn":
      // Short hops: arrow to each individual target square.
      return pieceTargets(piece, square).map((to) => ({ from: square, to }));
  }
}

const PIECE_CHARS: Record<PieceType, string> = {
  rook: "R",
  bishop: "B",
  queen: "Q",
  king: "K",
  knight: "N",
  pawn: "P",
};

/** Build a display-only FEN with a single (white) piece on `square`. */
export function singlePieceFen(piece: PieceType, square: string): string {
  return pieceFen([{ piece: PIECE_CHARS[piece], square }]);
}

/** Build a display-only FEN from a list of {pieceChar, square} placements. */
export function pieceFen(
  placements: { piece: string; square: string }[],
): string {
  const board: (string | null)[][] = Array.from({ length: 8 }, () =>
    Array<string | null>(8).fill(null),
  );
  for (const { piece, square } of placements) {
    board[rankIdx(square)][fileIdx(square)] = piece;
  }
  // FEN ranks go from rank 8 down to rank 1.
  const rows: string[] = [];
  for (let r = 7; r >= 0; r--) {
    let row = "";
    let empty = 0;
    for (let f = 0; f < 8; f++) {
      const p = board[r][f];
      if (p) {
        if (empty) {
          row += empty;
          empty = 0;
        }
        row += p;
      } else {
        empty += 1;
      }
    }
    if (empty) row += empty;
    rows.push(row);
  }
  return rows.join("/") + " w - - 0 1";
}
