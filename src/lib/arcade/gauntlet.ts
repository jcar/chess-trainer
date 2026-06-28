// Knight's Gauntlet — a seeded chess-pathfinding game. Pilot one piece across the
// board to the crown, dodging the squares enemy pieces attack. Pure + deterministic
// (seed + level → the same board), no chess.js (we allow kingless hazard boards and
// need blocker-aware threat squares, which chess.js can't express).

import { mulberry32, hashStr } from "@/lib/arcade/rng";

export type Piece = "knight" | "rook" | "bishop" | "queen" | "king" | "pawn";
export interface Pos {
  x: number; // file 0..7 (a..h)
  y: number; // rank 0..7 (1..8)
}
export interface Enemy {
  piece: Piece;
  pos: Pos;
}
export interface Level {
  level: number;
  size: number;
  piece: Piece; // the piece YOU control this level
  start: Pos;
  crown: Pos;
  enemies: Enemy[];
}

export const SIZE = 8;
export const key = (p: Pos): string => `${p.x},${p.y}`;
export const samePos = (a: Pos, b: Pos): boolean => a.x === b.x && a.y === b.y;
const onBoard = (x: number, y: number): boolean => x >= 0 && x < SIZE && y >= 0 && y < SIZE;

const ROOK_DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const BISHOP_DIRS = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
const KNIGHT = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];

// Pieces you can be (pawn excluded — its one-way movement creates dead-ends).
const PLAYER_PIECES: Piece[] = ["knight", "rook", "bishop", "queen", "king"];
// A gentle teaching order for the first levels, then seeded variety.
const TEACH_ORDER: Piece[] = ["knight", "rook", "bishop", "king", "queen"];

function dirsFor(piece: Piece): { dirs: number[][]; slide: boolean } | null {
  switch (piece) {
    case "rook": return { dirs: ROOK_DIRS, slide: true };
    case "bishop": return { dirs: BISHOP_DIRS, slide: true };
    case "queen": return { dirs: [...ROOK_DIRS, ...BISHOP_DIRS], slide: true };
    case "king": return { dirs: [...ROOK_DIRS, ...BISHOP_DIRS], slide: false };
    case "knight": return { dirs: KNIGHT, slide: false };
    case "pawn": return null; // handled specially (enemy only)
  }
}

/**
 * Empty squares the player's piece can LAND on from `from`, treating `occupied`
 * (enemy squares) as blockers it can neither pass through nor capture.
 */
export function reachable(piece: Piece, from: Pos, occupied: Set<string>): Pos[] {
  const out: Pos[] = [];
  const spec = dirsFor(piece);
  if (!spec) return out;
  for (const [dx, dy] of spec.dirs) {
    let x = from.x + dx;
    let y = from.y + dy;
    while (onBoard(x, y)) {
      const k = `${x},${y}`;
      if (occupied.has(k)) break; // blocked; can't capture or pass
      out.push({ x, y });
      if (!spec.slide) break;
      x += dx; y += dy;
    }
  }
  return out;
}

/** Squares an enemy attacks (blocker-aware among enemies). Sliders stop at the
 *  first occupant (which is itself "attacked"). Pawns attack diagonally downward. */
function attacks(e: Enemy, occupied: Set<string>): Pos[] {
  const out: Pos[] = [];
  if (e.piece === "pawn") {
    for (const dx of [-1, 1]) {
      const x = e.pos.x + dx;
      const y = e.pos.y - 1;
      if (onBoard(x, y)) out.push({ x, y });
    }
    return out;
  }
  const spec = dirsFor(e.piece)!;
  for (const [dx, dy] of spec.dirs) {
    let x = e.pos.x + dx;
    let y = e.pos.y + dy;
    while (onBoard(x, y)) {
      out.push({ x, y });
      if (!spec.slide || occupied.has(`${x},${y}`)) break;
      x += dx; y += dy;
    }
  }
  return out;
}

/** The set of all squares under enemy fire (the glowing threat). */
export function threatSquares(level: Level): Set<string> {
  const occupied = new Set(level.enemies.map((e) => key(e.pos)));
  const t = new Set<string>();
  for (const e of level.enemies) for (const p of attacks(e, occupied)) t.add(key(p));
  return t;
}

/** Length of the shortest start → crown path stepping only on SAFE squares, or
 *  -1 if there is none. (BFS, so the first time we pop the crown it's shortest.) */
export function shortestPath(level: Level): number {
  const occupied = new Set(level.enemies.map((e) => key(e.pos)));
  const threat = threatSquares(level);
  if (threat.has(key(level.start)) || threat.has(key(level.crown))) return -1;
  const dist = new Map<string, number>([[key(level.start), 0]]);
  const queue: Pos[] = [level.start];
  while (queue.length) {
    const cur = queue.shift()!;
    if (samePos(cur, level.crown)) return dist.get(key(cur))!;
    for (const nxt of reachable(level.piece, cur, occupied)) {
      const k = key(nxt);
      if (dist.has(k) || threat.has(k)) continue; // only stand on safe squares
      dist.set(k, dist.get(key(cur))! + 1);
      queue.push(nxt);
    }
  }
  return -1;
}

/** Is the level winnable for its piece at all? */
export function solvable(level: Level): boolean {
  return shortestPath(level) >= 0;
}

/** Target minimum optimal-path length per level — so sliders aren't 1–2 moves and
 *  the challenge climbs. Gentle start, capped. */
const minPath = (n: number): number => Math.min(2 + Math.floor(n / 2), 9);

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

/** Generate level `n` (1-based) for `seed` — deterministic + ALWAYS solvable, and
 *  tuned toward a minimum optimal-path length so it isn't trivial. */
export function generateLevel(seed: number, n: number): Level {
  const rng = mulberry32(hashStr(`${seed}:${n}`));
  const piece = n <= TEACH_ORDER.length ? TEACH_ORDER[n - 1] : pick(rng, PLAYER_PIECES);
  // Enemy mix gets nastier with depth.
  const enemyPool: Piece[] =
    n <= 2 ? ["bishop", "knight", "pawn", "rook"]
      : n <= 5 ? ["rook", "bishop", "knight", "pawn", "queen"]
        : ["queen", "rook", "rook", "bishop", "knight"];
  const target = Math.min(2 + Math.floor(n * 0.8), 14);
  const want = minPath(n);

  // Start low, crown high, far apart. The bishop is COLOR-BOUND: if the crown is
  // on the opposite color it is mathematically unreachable, so force a match.
  const start: Pos = { x: Math.floor(rng() * SIZE), y: Math.floor(rng() * 2) };
  let crown: Pos = { x: Math.floor(rng() * SIZE), y: SIZE - 1 - Math.floor(rng() * 2) };
  if (piece === "bishop" && (start.x + start.y) % 2 !== (crown.x + crown.y) % 2) {
    crown = { ...crown, x: crown.x === SIZE - 1 ? crown.x - 1 : crown.x + 1 };
  }

  const placeEnemies = (count: number): Enemy[] => {
    const enemies: Enemy[] = [];
    const used = new Set<string>([key(start), key(crown)]);
    for (let i = 0; i < count; i++) {
      let pos: Pos | null = null;
      for (let t = 0; t < 30; t++) {
        const c = { x: Math.floor(rng() * SIZE), y: Math.floor(rng() * SIZE) };
        if (!used.has(key(c))) { pos = c; break; }
      }
      if (!pos) break;
      used.add(key(pos));
      enemies.push({ piece: pick(rng, enemyPool), pos });
    }
    return enemies;
  };

  // Prefer a board that is solvable AND meets the target path length; keep the
  // longest-path solvable board seen as a fallback so we never ship a soft-lock.
  let best: Level | null = null;
  let bestD = -1;
  for (let count = target; count >= 1; count--) {
    for (let attempt = 0; attempt < 50; attempt++) {
      const level: Level = { level: n, size: SIZE, piece, start, crown, enemies: placeEnemies(count) };
      const d = shortestPath(level);
      if (d > bestD) { bestD = d; best = level; }
      if (d >= want) return level;
    }
  }
  if (best && bestD >= 0) return best; // solvable, just shorter than ideal
  // Empty board — always solvable now (bishop crown color is matched above).
  return { level: n, size: SIZE, piece, start, crown, enemies: [] };
}

export const GLYPH: Record<Piece, string> = {
  king: "♚", queen: "♛", rook: "♜",
  bishop: "♝", knight: "♞", pawn: "♟",
};
export const PIECE_NAME: Record<Piece, string> = {
  king: "King", queen: "Queen", rook: "Rook",
  bishop: "Bishop", knight: "Knight", pawn: "Pawn",
};
