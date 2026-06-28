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
  pos: Pos; // "home" square (where it sits on even parity)
  /** If set, the enemy oscillates between `pos` and `away` (period 2). */
  away?: Pos;
  /** Phase 0 = at `pos` on even turns; phase 1 = at `away` on even turns. */
  phase?: number;
}
/** An enemy resolved to a concrete square for a given turn parity. */
export interface Placed {
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
  /** Optimal solve length (moves) — the "par" for scoring. */
  par: number;
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

/** Where an enemy sits on a given turn parity (0/1). Static enemies ignore it. */
export function enemyAt(e: Enemy, parity: number): Pos {
  if (!e.away) return e.pos;
  return (parity + (e.phase ?? 0)) % 2 === 1 ? e.away : e.pos;
}
/** Resolve every enemy to a concrete square for a turn parity. */
export function enemiesAt(level: Level, parity: number): Placed[] {
  return level.enemies.map((e) => ({ piece: e.piece, pos: enemyAt(e, parity) }));
}

/** Squares an enemy attacks (blocker-aware). Sliders stop at the first occupant
 *  (itself attacked). Pawns attack diagonally downward. */
function attacks(e: Placed, occupied: Set<string>): Pos[] {
  const out: Pos[] = [];
  if (e.piece === "pawn") {
    for (const dx of [-1, 1]) {
      const x = e.pos.x + dx, y = e.pos.y - 1;
      if (onBoard(x, y)) out.push({ x, y });
    }
    return out;
  }
  const spec = dirsFor(e.piece)!;
  for (const [dx, dy] of spec.dirs) {
    let x = e.pos.x + dx, y = e.pos.y + dy;
    while (onBoard(x, y)) {
      out.push({ x, y });
      if (!spec.slide || occupied.has(`${x},${y}`)) break;
      x += dx; y += dy;
    }
  }
  return out;
}

/** Squares under fire for a resolved set of enemy positions. */
export function threatOf(placed: Placed[]): Set<string> {
  const occupied = new Set(placed.map((e) => key(e.pos)));
  const t = new Set<string>();
  for (const e of placed) for (const p of attacks(e, occupied)) t.add(key(p));
  return t;
}

/**
 * Time-expanded shortest path (in moves) over (square, turn-parity). Enemies
 * oscillate with period 2, so there are two board configs. A move from P at parity
 * p picks a square Q reachable through the CURRENT config; it's valid only if Q is
 * safe in the NEXT config (not threatened, not occupied) — i.e. you survive the
 * guards' shift. Returns the optimal length, or -1 if unwinnable. (For static
 * levels both configs are equal, so this reduces to ordinary BFS.)
 */
export function solveTimed(level: Level): number {
  const placed = [enemiesAt(level, 0), enemiesAt(level, 1)];
  const occ = [new Set(placed[0].map((e) => key(e.pos))), new Set(placed[1].map((e) => key(e.pos)))];
  const threat = [threatOf(placed[0]), threatOf(placed[1])];
  if (threat[0].has(key(level.start)) || occ[0].has(key(level.start))) return -1;
  const dist = new Map<string, number>([[`${key(level.start)}@0`, 0]]);
  const q: { p: Pos; par: number }[] = [{ p: level.start, par: 0 }];
  while (q.length) {
    const { p, par } = q.shift()!;
    if (samePos(p, level.crown)) return dist.get(`${key(p)}@${par}`)!;
    const np = par ^ 1;
    const d = dist.get(`${key(p)}@${par}`)!;
    for (const m of reachable(level.piece, p, occ[par])) {
      const k = key(m);
      if (threat[np].has(k) || occ[np].has(k)) continue; // survive the shift
      const sk = `${k}@${np}`;
      if (dist.has(sk)) continue;
      dist.set(sk, d + 1);
      q.push({ p: m, par: np });
    }
  }
  return -1;
}

export function solvable(level: Level): boolean {
  return solveTimed(level) >= 0;
}

/** Target minimum optimal-path length per level. Gentle start, capped. */
const minPath = (n: number): number => Math.min(2 + Math.floor(n / 2), 9);

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

/** A direction to make an enemy oscillate (one step / hop along its movement). */
function moverDir(piece: Piece, rng: () => number): number[] | null {
  switch (piece) {
    case "rook": return pick(rng, ROOK_DIRS);
    case "bishop": return pick(rng, BISHOP_DIRS);
    case "queen": return pick(rng, [...ROOK_DIRS, ...BISHOP_DIRS]);
    case "king": return pick(rng, [...ROOK_DIRS, ...BISHOP_DIRS]);
    case "knight": return pick(rng, KNIGHT);
    case "pawn": return null;
  }
}

/** Generate level `n` (1-based) for `seed` — deterministic, ALWAYS solvable,
 *  with oscillating movers from level 4 on, tuned toward a target path length. */
export function generateLevel(seed: number, n: number): Level {
  const rng = mulberry32(hashStr(`${seed}:${n}`));
  const piece = n <= TEACH_ORDER.length ? TEACH_ORDER[n - 1] : pick(rng, PLAYER_PIECES);
  const enemyPool: Piece[] =
    n <= 2 ? ["bishop", "knight", "pawn", "rook"]
      : n <= 5 ? ["rook", "bishop", "knight", "pawn", "queen"]
        : ["queen", "rook", "rook", "bishop", "knight"];
  const target = Math.min(2 + Math.floor(n * 0.8), 14);
  const want = minPath(n);
  // Movers ramp in from level 4 (levels 1-3 are static tutorials).
  const moverBudget = n <= 3 ? 0 : Math.min(Math.ceil((n - 3) / 2), 6);

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
    // Turn some into oscillating movers (reserve both squares so they don't clash).
    let movers = moverBudget;
    for (const e of enemies) {
      if (movers <= 0) break;
      const dir = moverDir(e.piece, rng);
      if (!dir) continue;
      const away = { x: e.pos.x + dir[0], y: e.pos.y + dir[1] };
      const ak = key(away);
      if (onBoard(away.x, away.y) && !used.has(ak)) {
        e.away = away;
        e.phase = rng() < 0.5 ? 0 : 1;
        used.add(ak);
        movers--;
      }
    }
    return enemies;
  };

  let best: Level | null = null;
  let bestD = -1;
  for (let count = target; count >= 1; count--) {
    for (let attempt = 0; attempt < 70; attempt++) {
      const lvl: Level = { level: n, size: SIZE, piece, start, crown, enemies: placeEnemies(count), par: 0 };
      const d = solveTimed(lvl);
      if (d > bestD) { bestD = d; best = { ...lvl, par: d }; }
      if (d >= want) return { ...lvl, par: d };
    }
  }

  if (best && bestD >= 0) {
    // Tighten: hill-climb par toward `want` by adding blocker enemies. This forces
    // sliding pieces (rook/bishop/queen) — which otherwise reach the crown in 1–2
    // moves — to detour, without ever creating an unsolvable board.
    let cur = best;
    const cap = target + 5;
    for (let i = 0; i < 70 && cur.par < want && cur.enemies.length < cap; i++) {
      const taken = new Set<string>([key(start), key(crown)]);
      for (const e of cur.enemies) { taken.add(key(e.pos)); if (e.away) taken.add(key(e.away)); }
      let pos: Pos | null = null;
      for (let t = 0; t < 20; t++) {
        const c = { x: Math.floor(rng() * SIZE), y: Math.floor(rng() * SIZE) };
        if (!taken.has(key(c))) { pos = c; break; }
      }
      if (!pos) break;
      const trial: Level = { ...cur, enemies: [...cur.enemies, { piece: pick(rng, enemyPool), pos }] };
      const d = solveTimed(trial);
      if (d >= cur.par) cur = { ...trial, par: d }; // keep only if still solvable & no shorter
    }
    return cur;
  }

  const empty: Level = { level: n, size: SIZE, piece, start, crown, enemies: [], par: 0 };
  return { ...empty, par: Math.max(0, solveTimed(empty)) };
}

export const GLYPH: Record<Piece, string> = {
  king: "♚", queen: "♛", rook: "♜",
  bishop: "♝", knight: "♞", pawn: "♟",
};
export const PIECE_NAME: Record<Piece, string> = {
  king: "King", queen: "Queen", rook: "Rook",
  bishop: "Bishop", knight: "Knight", pawn: "Pawn",
};
