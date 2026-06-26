// Authoring engine (NOT shipped): manifest-driven puzzle curation. Each SLOT is a
// "recipe card" for a teaching situation (motif + phase + level + clarity). One
// pass over the Lichess open DB (CC0) selects the cleanest candidates per slot;
// `npm run validate` is the final gate before any candidate is embedded.
//
// Usage:
//   zstd -dc scratchpad/lichess_db_puzzle.csv.zst | npx tsx scripts/curate-puzzles.ts
//   → writes scratchpad/curated.json (candidates per slot) + a console summary.
//
// This is how we pick the RIGHT puzzle for each spot instead of hand-crafting —
// re-runnable as the DB updates or as we add lessons.

import { createInterface } from "node:readline";
import { writeFileSync } from "node:fs";
import { Chess } from "chess.js";

interface Slot {
  id: string;
  themes?: string[];   // ALL must be present
  any?: string[];      // at least ONE
  exclude?: string[];  // NONE
  rating: [number, number];
  moves: [number, number];
  maxPieces: number;
  n: number;
}

// The manifest. Tactics slots require `middlegame` and exclude `endgame` so a
// tactics lesson gets a tactics example; the mating-pattern library uses the
// named-mate themes the DB already carries.
const SLOTS: Slot[] = [
  // — sharper tactics (Intermediate level) —
  { id: "tactic.discovered", themes: ["discoveredAttack", "middlegame"], exclude: ["endgame"], rating: [900, 1350], moves: [1, 3], maxPieces: 22, n: 3 },
  { id: "tactic.deflection", themes: ["deflection", "middlegame"], exclude: ["endgame"], rating: [900, 1350], moves: [1, 3], maxPieces: 20, n: 3 },
  { id: "tactic.removeDefender", themes: ["capturingDefender", "middlegame"], exclude: ["endgame"], rating: [900, 1400], moves: [1, 3], maxPieces: 22, n: 3 },
  { id: "tactic.interference", themes: ["interference", "middlegame"], exclude: ["endgame"], rating: [1000, 1500], moves: [1, 3], maxPieces: 22, n: 3 },
  { id: "tactic.zwischenzug", themes: ["intermezzo", "middlegame"], exclude: ["endgame"], rating: [1000, 1500], moves: [1, 4], maxPieces: 24, n: 3 },
  // — mating-pattern library (named mates) —
  { id: "mate.smothered", themes: ["smotheredMate"], rating: [800, 1400], moves: [1, 3], maxPieces: 22, n: 3 },
  { id: "mate.arabian", themes: ["arabianMate"], rating: [800, 1400], moves: [1, 3], maxPieces: 18, n: 3 },
  { id: "mate.anastasia", themes: ["anastasiaMate"], rating: [900, 1500], moves: [1, 4], maxPieces: 22, n: 3 },
  { id: "mate.boden", themes: ["bodenMate"], rating: [900, 1500], moves: [1, 3], maxPieces: 22, n: 3 },
  { id: "mate.hook", themes: ["hookMate"], rating: [900, 1500], moves: [1, 3], maxPieces: 20, n: 3 },
  { id: "mate.doubleBishop", themes: ["doubleBishopMate"], rating: [900, 1500], moves: [1, 3], maxPieces: 22, n: 3 },
  // — attack the king (f7/f2 assault) —
  { id: "attack.f7", themes: ["attackingF2F7", "middlegame"], exclude: ["endgame"], rating: [900, 1400], moves: [1, 4], maxPieces: 26, n: 3 },
];

const pieceCount = (fen: string) => fen.split(" ")[0].replace(/[^a-zA-Z]/g, "").length;

interface Cand { id: string; fen: string; orientation: "white" | "black"; solution: string[]; rating: number; pieces: number; score: number; }
const bySlot = new Map<string, Cand[]>();
SLOTS.forEach((s) => bySlot.set(s.id, []));

const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
let header = true;

rl.on("line", (line) => {
  if (header) { header = false; if (line.startsWith("PuzzleId")) return; }
  const f = line.split(",");
  if (f.length < 8) return;
  const [id, fen, movesStr, ratingStr, devStr, popStr, playsStr, themesStr] = f;
  const rating = Number(ratingStr);
  if (Number(popStr) < 90 || Number(playsStr) < 1000 || Number(devStr) > 90) return;
  const tset = new Set(themesStr.split(" ").filter(Boolean));
  const moves = movesStr.split(" ").filter(Boolean);
  const solver = moves.length - 1;

  // Which slots could this row satisfy (cheap checks before chess.js)?
  const hits = SLOTS.filter((s) =>
    rating >= s.rating[0] && rating <= s.rating[1] &&
    solver >= s.moves[0] && solver <= s.moves[1] &&
    (!s.themes || s.themes.every((t) => tset.has(t))) &&
    (!s.any || s.any.some((t) => tset.has(t))) &&
    (!s.exclude || !s.exclude.some((t) => tset.has(t))),
  );
  if (!hits.length) return;

  let game: Chess;
  try { game = new Chess(fen); if (!game.move({ from: moves[0].slice(0, 2), to: moves[0].slice(2, 4), promotion: moves[0][4] })) return; }
  catch { return; }
  const startFen = game.fen();
  const pieces = pieceCount(startFen);
  const orientation = game.turn() === "w" ? "white" : "black";
  const score = pieces * 3 + solver * 4 - Number(popStr) / 50;

  for (const s of hits) {
    if (pieces > s.maxPieces) continue;
    const arr = bySlot.get(s.id)!;
    arr.push({ id: `lc-${id}`, fen: startFen, orientation, solution: moves.slice(1), rating, pieces, score });
  }
});

rl.on("close", () => {
  const out: Record<string, Cand[]> = {};
  for (const s of SLOTS) {
    const top = bySlot.get(s.id)!.sort((a, b) => a.score - b.score).slice(0, s.n);
    out[s.id] = top;
  }
  writeFileSync("scratchpad/curated.json", JSON.stringify(out, null, 2));
  process.stderr.write("=== curated candidates per slot (cleanest first) ===\n");
  for (const s of SLOTS) {
    const top = out[s.id];
    const best = top[0];
    process.stderr.write(
      `  ${s.id.padEnd(20)} ${String(bySlot.get(s.id)!.length).padStart(6)} matched` +
      (best ? ` → best: ${best.pieces}p ${best.solution.length}mv r${best.rating}` : " → none") + "\n",
    );
  }
  process.stderr.write("wrote scratchpad/curated.json\n");
});
