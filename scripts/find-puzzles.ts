// Authoring aid (NOT shipped): pick the *right* puzzle for a teaching situation
// from the Lichess open puzzle DB (CC0). Instead of hand-crafting positions, we
// query by motif + difficulty + "cleanliness" and rank, so a lesson gets a sound,
// uniquely-solved, uncluttered example that actually demonstrates the motif.
//
// Usage:
//   zstd -dc scratchpad/lichess_db_puzzle.csv.zst | npx tsx scripts/find-puzzles.ts \
//     --themes deflection --rating 700-1300 --moves 1-3 --maxpieces 16 --n 8
//
// Selection rubric (why a puzzle is "right" for teaching):
//   • must carry the requested theme(s)  — it actually shows the motif
//   • rating band                         — matches the learner's level
//   • short forced line (solver moves)    — the point is clear, not a grind
//   • few pieces on the board             — uncluttered, the idea stands out
//   • high popularity / low rating-dev    — the community agrees it's a good, sound puzzle
// Output is ready-to-embed { fen, orientation, solution, themes, rating } objects.

import { createInterface } from "node:readline";
import { Chess } from "chess.js";

function arg(name: string, def = ""): string {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : def;
}
const wantThemes = arg("themes").split(",").filter(Boolean); // ALL must be present
const anyThemes = arg("any").split(",").filter(Boolean);     // at least ONE must be present
const exclThemes = arg("exclude").split(",").filter(Boolean); // NONE may be present
const [rMin, rMax] = (arg("rating", "0-4000").split("-").map(Number));
const [mMin, mMax] = (arg("moves", "1-4").split("-").map(Number));
const maxPieces = Number(arg("maxpieces", "32"));
const N = Number(arg("n", "10"));
const MIN_POP = Number(arg("pop", "90"));
const MIN_PLAYS = Number(arg("plays", "1000"));

const pieceCount = (fen: string) => fen.split(" ")[0].replace(/[^a-zA-Z]/g, "").length;

interface Cand {
  id: string; fen: string; orientation: "white" | "black"; solution: string[];
  themes: string[]; rating: number; pieces: number; score: number;
}
const out: Cand[] = [];
const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
let header = true;

rl.on("line", (line) => {
  if (header) { header = false; if (line.startsWith("PuzzleId")) return; }
  const f = line.split(",");
  if (f.length < 8) return;
  const [id, fen, movesStr, ratingStr, devStr, popStr, playsStr, themesStr] = f;
  const rating = Number(ratingStr);
  if (rating < rMin || rating > rMax) return;
  if (Number(popStr) < MIN_POP || Number(playsStr) < MIN_PLAYS || Number(devStr) > 90) return;
  const themes = themesStr.split(" ").filter(Boolean);
  const tset = new Set(themes);
  if (wantThemes.length && !wantThemes.every((t) => tset.has(t))) return;
  if (anyThemes.length && !anyThemes.some((t) => tset.has(t))) return;
  if (exclThemes.length && exclThemes.some((t) => tset.has(t))) return;
  const moves = movesStr.split(" ").filter(Boolean);
  const solver = moves.length - 1;
  if (solver < mMin || solver > mMax) return;

  let game: Chess;
  try { game = new Chess(fen); if (!game.move({ from: moves[0].slice(0, 2), to: moves[0].slice(2, 4), promotion: moves[0][4] })) return; }
  catch { return; }
  const startFen = game.fen();
  const pieces = pieceCount(startFen);
  if (pieces > maxPieces) return;
  const orientation = game.turn() === "w" ? "white" : "black";

  // Cleanliness score: fewer pieces + shorter line are clearer teaching examples;
  // popularity breaks ties (community-vetted soundness).
  const score = pieces * 3 + solver * 4 - Number(popStr) / 50;
  out.push({ id: `lc-${id}`, fen: startFen, orientation, solution: moves.slice(1), themes, rating, pieces, score });
});

rl.on("close", () => {
  out.sort((a, b) => a.score - b.score);
  const top = out.slice(0, N);
  for (const c of top) {
    process.stdout.write(
      `# pieces=${c.pieces} moves=${c.solution.length} r${c.rating}  themes=[${c.themes.join(" ")}]\n` +
      `  fen: "${c.fen}",\n  orientation: "${c.orientation}",\n  solution: ${JSON.stringify(c.solution)},\n\n`,
    );
  }
  process.stderr.write(`matched ${out.length} puzzles; showing top ${top.length} (cleanest first).\n`);
});
