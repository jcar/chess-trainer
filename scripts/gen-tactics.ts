// Tactics-bank generator (authoring aid, not shipped). Constructs sparse random
// positions, screens them cheaply with Stockfish, then FULLY verifies the ones
// that look tactical — keeping only puzzles that are engine-sound AND uniquely
// best, using the SAME thresholds as scripts/validate-content.ts plus a safety
// margin so the full-depth `npm run validate` pass can never reject them later.
//
// Usage: npx tsx scripts/gen-tactics.ts <out.json> [targetCount] [maxAttempts]
//
// Output: a JSON array of BankPuzzle-shaped objects (id/fen/orientation/
// solution/goal/theme/difficulty/prompt) ready to splice into tactics-bank.ts.

import { writeFileSync } from "node:fs";
import { Chess } from "chess.js";
import { getEngine, quitEngine, type Score } from "./lib/engine";

const MATE_DEPTH = 24;
const EVAL_DEPTH = 20;
const SCREEN_DEPTH = 12;
const GAP = 150; // validator's uniqueness gap
const GAP_MARGIN = 90; // require best to beat 2nd by GAP+this (depth-robust)
const CP_MARGIN = 110; // require eval to exceed minGain*100 by this

const outPath = process.argv[2] || "/tmp/gen-tactics.json";
const TARGET = Number(process.argv[3] || 170);
const MAX_ATTEMPTS = Number(process.argv[4] || 9000);

const FILES = "abcdefgh";
const sq = (f: number, r: number) => FILES[f] + (r + 1);
const VAL: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
const isMate = (s: Score): s is { mate: number } => "mate" in s;
const toCp = (s: Score) =>
  isMate(s) ? (s.mate > 0 ? 100000 - s.mate : -100000 - s.mate) : s.cp;

function buildFen(pieces: Record<string, string>, side: "w" | "b"): string {
  const rows: string[] = [];
  for (let r = 7; r >= 0; r--) {
    let row = "";
    let empty = 0;
    for (let f = 0; f < 8; f++) {
      const p = pieces[sq(f, r)];
      if (p) {
        if (empty) {
          row += empty;
          empty = 0;
        }
        row += p;
      } else empty++;
    }
    if (empty) row += empty;
    rows.push(row);
  }
  return `${rows.join("/")} ${side} - - 0 1`;
}

/** Mirror validator's legality: load, and the side NOT to move must not be in check. */
function legal(fen: string): Chess | null {
  let g: Chess;
  try {
    g = new Chess(fen);
  } catch {
    return null;
  }
  const parts = fen.split(" ");
  parts[1] = parts[1] === "w" ? "b" : "w";
  try {
    if (new Chess(parts.join(" ")).inCheck()) return null;
  } catch {
    return null;
  }
  return g;
}

const rnd = (n: number) => Math.floor(Math.random() * n);
const pick = <T,>(a: T[]): T => a[rnd(a.length)];

function randPosition(): string | null {
  const pieces: Record<string, string> = {};
  const used = new Set<string>();
  const placeAt = (p: string, s: string) => {
    used.add(s);
    pieces[s] = p;
  };
  const place = (p: string): boolean => {
    for (let tries = 0; tries < 30; tries++) {
      const f = rnd(8);
      const r = rnd(8);
      const s = sq(f, r);
      if (used.has(s)) continue;
      const isPawn = p === "P" || p === "p";
      if (isPawn && (r === 0 || r === 7)) continue;
      placeAt(p, s);
      return true;
    }
    return false;
  };
  if (!place("K") || !place("k")) return null;
  // White's attacking force, then optional pawns.
  const wForce = pick([
    ["Q"], ["R"], ["R", "R"], ["Q", "R"], ["R", "N"], ["R", "B"],
    ["Q", "N"], ["N", "N"], ["B", "N"], ["Q", "B"], ["N"], ["B"],
  ]);
  for (const p of wForce) if (!place(p)) return null;
  for (let i = 0; i < rnd(3); i++) place("P");
  // Black's pieces (targets / defenders), then optional pawns.
  const bForce = pick([
    ["q"], ["r"], ["r", "r"], ["q", "n"], ["r", "n"], ["r", "b"],
    ["n"], ["b"], ["q", "b"], ["n", "n"], ["b", "n"], [],
  ]);
  for (const p of bForce) if (!place(p)) return null;
  for (let i = 0; i < rnd(3); i++) place("p");
  if (Object.keys(pieces).length > 8) return null;
  return buildFen(pieces, "w");
}

function material(fen: string): { w: number; b: number } {
  let w = 0;
  let b = 0;
  for (const ch of fen.split(" ")[0]) {
    const v = VAL[ch.toLowerCase()];
    if (v === undefined) continue;
    if (ch >= "A" && ch <= "Z") w += v;
    else b += v;
  }
  return { w, b };
}

const uci = (m: string) => ({
  from: m.slice(0, 2),
  to: m.slice(2, 4),
  promotion: m[4],
});

const eng = getEngine();
const analyze = (fen: string, depth: number, multiPV = 2) =>
  eng.analyze(fen, { depth, multiPV });

/** Full mate verification (unique). Returns the forced solution or null. */
async function verifyMate(fen: string, N: number): Promise<string[] | null> {
  const game = new Chess(fen);
  const solution: string[] = [];
  for (let ply = 0; ply <= 2 * N; ply++) {
    const learner = ply % 2 === 0;
    const { lines } = await analyze(game.fen(), MATE_DEPTH, 2);
    if (lines.length === 0) return null;
    const best = lines[0];
    if (learner) {
      const remaining = N - ply / 2;
      if (!isMate(best.score) || best.score.mate !== remaining) return null;
      const second = lines[1];
      if (
        second &&
        isMate(second.score) &&
        second.score.mate > 0 &&
        second.score.mate <= remaining
      )
        return null; // not unique
    }
    solution.push(best.move);
    try {
      game.move(uci(best.move));
    } catch {
      return null;
    }
    if (learner && game.isCheckmate()) return solution;
  }
  return null;
}

interface Gen {
  fen: string;
  solution: string[];
  goal: { type: "mate"; inMoves: number } | { type: "win-material"; minGain: number };
  theme: string;
  difficulty: 1 | 2 | 3;
  prompt: string;
}

function mateTheme(fen: string, lastMove: string): string {
  // Back-rank: a rook/queen mates on rank 1/8 with the enemy king on that rank.
  const g = new Chess(fen);
  const to = lastMove.slice(2, 4);
  const rank = to[1];
  if (rank !== "1" && rank !== "8") return "mate";
  const board = g.board();
  // find black king
  for (let r = 0; r < 8; r++)
    for (let f = 0; f < 8; f++) {
      const pc = board[r][f];
      if (pc && pc.type === "k" && pc.color === "b") {
        const kingRank = String(8 - r);
        if (kingRank === rank) return "back-rank";
      }
    }
  return "mate";
}

function isForkAfter(fenBefore: string, move: string): boolean {
  // The moved piece is a knight that, after moving, attacks >= 2 enemy
  // major/minor pieces (or king + a piece).
  const g = new Chess(fenBefore);
  let res: ReturnType<Chess["move"]>;
  try {
    res = g.move(uci(move));
  } catch {
    return false;
  }
  if (!res || res.piece !== "n") return false;
  const to = move.slice(2, 4);
  // Count enemy (now black) pieces attacked from `to`.
  const board = g.board();
  let hits = 0;
  const KN = [
    [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2],
  ];
  const tf = FILES.indexOf(to[0]);
  const tr = Number(to[1]) - 1;
  for (const [df, dr] of KN) {
    const f = tf + df;
    const r = tr + dr;
    if (f < 0 || f > 7 || r < 0 || r > 7) continue;
    const pc = board[7 - r][f];
    if (pc && pc.color === "b" && "qrbk".includes(pc.type)) hits++;
  }
  return hits >= 2;
}

async function classify(fen: string): Promise<Gen | null> {
  // Skip if white is already in check (keep tactics clean) or terminal.
  const g0 = new Chess(fen);
  if (g0.inCheck()) return null;
  if (g0.isGameOver()) return null;

  // Cheap screen.
  const screen = await analyze(fen, SCREEN_DEPTH, 2);
  if (screen.lines.length === 0) return null;
  const sBest = screen.lines[0];

  // --- Mate candidates ---
  if (isMate(sBest.score) && sBest.score.mate > 0 && sBest.score.mate <= 3) {
    const N = sBest.score.mate;
    const sol = await verifyMate(fen, N);
    if (!sol) return null;
    const theme = mateTheme(fen, sol[sol.length - 1]);
    const prompt =
      N === 1
        ? "White to play and mate in one."
        : N === 2
          ? "White to play and force mate in two."
          : "White to play and force mate in three.";
    return {
      fen,
      solution: sol,
      goal: { type: "mate", inMoves: N },
      theme,
      difficulty: (N === 1 ? 1 : N === 2 ? 2 : 3) as 1 | 2 | 3,
      prompt,
    };
  }

  // --- Win-material candidates (from a roughly balanced position) ---
  const m = material(fen);
  if (Math.abs(m.w - m.b) > 1) return null;
  if (toCp(sBest.score) < 250) return null;

  // Full-depth confirmation with uniqueness margin.
  const full = await analyze(fen, EVAL_DEPTH, 2);
  if (full.lines.length === 0) return null;
  const best = full.lines[0];
  if (isMate(best.score)) return null; // handled as mate only at <=3; deep mates skip
  const second = full.lines[1];
  const cp = toCp(best.score);
  if (cp < 250) return null;
  if (second && cp - toCp(second.score) < GAP + GAP_MARGIN) return null;

  let minGain: number;
  if (cp >= 800) minGain = 5;
  else if (cp >= 450) minGain = 3;
  else minGain = 2;
  if (cp < minGain * 100 + CP_MARGIN) return null;

  const fork = isForkAfter(fen, best.move);
  const isCapture = (() => {
    try {
      const g = new Chess(fen);
      const r = g.move(uci(best.move));
      return !!r && (r.captured !== undefined);
    } catch {
      return false;
    }
  })();
  const theme = fork ? "fork" : "win-material";
  const prompt = fork
    ? "White to play — a knight fork wins material."
    : "White to play and win material.";
  return {
    fen,
    solution: [best.move],
    goal: { type: "win-material", minGain },
    theme,
    difficulty: (isCapture && !fork ? 1 : 2) as 1 | 2 | 3,
    prompt,
  };
}

async function main() {
  const accepted: Gen[] = [];
  const seenFen = new Set<string>();
  const themeCap: Record<string, number> = {
    mate: 130,
    "back-rank": 60,
    fork: 40,
    "win-material": 130,
  };
  const themeCount: Record<string, number> = {};
  let attempts = 0;
  const t0 = Date.now();

  while (accepted.length < TARGET && attempts < MAX_ATTEMPTS) {
    attempts++;
    const fen = randPosition();
    if (!fen || seenFen.has(fen)) continue;
    if (!legal(fen)) continue;
    let g: Gen | null = null;
    try {
      g = await classify(fen);
    } catch {
      g = null;
    }
    if (!g) continue;
    const cap = themeCap[g.theme] ?? 30;
    if ((themeCount[g.theme] ?? 0) >= cap) continue;
    seenFen.add(fen);
    themeCount[g.theme] = (themeCount[g.theme] ?? 0) + 1;
    accepted.push(g);
    if (accepted.length % 10 === 0) {
      const secs = ((Date.now() - t0) / 1000).toFixed(0);
      process.stderr.write(
        `[${secs}s] accepted=${accepted.length} attempts=${attempts} themes=${JSON.stringify(themeCount)}\n`,
      );
    }
  }

  // Stable ids, grouped by theme.
  const byTheme: Record<string, number> = {};
  const out = accepted.map((g) => {
    const n = (byTheme[g.theme] = (byTheme[g.theme] ?? 0) + 1);
    return {
      id: `tb-gen-${g.theme}-${n}`,
      fen: g.fen,
      orientation: "white",
      solution: g.solution,
      goal: g.goal,
      theme: g.theme,
      difficulty: g.difficulty,
      prompt: g.prompt,
    };
  });
  writeFileSync(outPath, JSON.stringify(out, null, 2));
  process.stderr.write(
    `DONE: ${out.length} puzzles in ${((Date.now() - t0) / 1000).toFixed(0)}s -> ${outPath}\n` +
      `themes=${JSON.stringify(themeCount)} attempts=${attempts}\n`,
  );
  quitEngine();
}

main();
