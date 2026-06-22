// Build-time importer (authoring aid, not shipped) — curates a balanced subset of
// the Lichess open puzzle database (CC0 / public domain) into our app's puzzle
// pool. The raw multi-GB DB is NEVER committed; only the curated JSON ships.
//
// Usage:
//   zstd -dc lichess_db_puzzle.csv.zst | npx tsx scripts/import-lichess-puzzles.ts
//
// Lichess CSV columns:
//   PuzzleId,FEN,Moves,Rating,RatingDeviation,Popularity,NbPlays,Themes,GameUrl,OpeningTags
// Convention: FEN is the position BEFORE the opponent's move; apply Moves[0] to get
// the position to present, and Moves[1:] is the solution (solver move first, then the
// auto-played reply, …) — which is exactly our `{ fen, orientation, solution }` shape.

import { createInterface } from "node:readline";
import { writeFileSync } from "node:fs";
import { Chess } from "chess.js";

type Theme =
  | "mate" | "fork" | "pin" | "skewer" | "discovered"
  | "sacrifice" | "back-rank" | "defense" | "win-material" | "endgame";

const OUT = "src/content/tactics-puzzles.json";

// Quality gates (cheap string checks, applied before any chess.js work).
const MIN_POPULARITY = 85;
const MIN_PLAYS = 1000;
const MAX_RATING_DEVIATION = 80;
const MIN_SOLVER_MOVES = 1; // solver plies = Moves.length - 1
const MAX_SOLVER_MOVES = 4;

// Balance: cap per (theme × difficulty) cell so no pattern/level dominates.
const CAP_PER_CELL = 130;

interface Out {
  id: string;
  fen: string;
  orientation: "white" | "black";
  solution: string[];
  theme: Theme;
  difficulty: 1 | 2 | 3;
  rating: number;
}

function mapTheme(themes: string[]): Theme {
  const t = new Set(themes);
  if (t.has("backRankMate")) return "back-rank";
  if (themes.some((x) => /mate/i.test(x))) return "mate"; // mateInN, smotheredMate, …
  // Endgame technique/conversion (non-mate) — its own bucket for the endgame
  // lessons & the Endgames filter. Matches generic "endgame" + the typed ones
  // (rookEndgame, pawnEndgame, knightEndgame, bishopEndgame, queenEndgame, …).
  if (themes.some((x) => /endgame/i.test(x))) return "endgame";
  if (t.has("fork")) return "fork";
  if (t.has("pin")) return "pin";
  if (t.has("skewer")) return "skewer";
  if (t.has("discoveredAttack") || t.has("discoveredCheck") || t.has("doubleCheck"))
    return "discovered";
  if (t.has("sacrifice")) return "sacrifice";
  if (t.has("defensiveMove")) return "defense";
  return "win-material";
}

const bucket = (rating: number): 1 | 2 | 3 =>
  rating < 1400 ? 1 : rating <= 1800 ? 2 : 3;

function uciMove(uci: string) {
  return { from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] };
}

const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });

const out: Out[] = [];
const cells = new Map<string, number>();
const seenFen = new Set<string>();
let read = 0;
let header = true;

rl.on("line", (line) => {
  if (header) {
    header = false;
    if (line.startsWith("PuzzleId")) return; // skip header row
  }
  read++;
  // No field contains a comma in the Lichess CSV, so a plain split is safe.
  const f = line.split(",");
  if (f.length < 8) return;
  const [puzzleId, fen, movesStr, ratingStr, devStr, popStr, playsStr, themesStr] = f;

  // Cheap gates first.
  const popularity = Number(popStr);
  const plays = Number(playsStr);
  const dev = Number(devStr);
  const rating = Number(ratingStr);
  if (popularity < MIN_POPULARITY || plays < MIN_PLAYS || dev > MAX_RATING_DEVIATION)
    return;

  const moves = movesStr.split(" ").filter(Boolean);
  const solverMoves = moves.length - 1;
  if (solverMoves < MIN_SOLVER_MOVES || solverMoves > MAX_SOLVER_MOVES) return;

  const theme = mapTheme(themesStr.split(" ").filter(Boolean));
  const difficulty = bucket(rating);
  const cellKey = `${theme}|${difficulty}`;
  if ((cells.get(cellKey) ?? 0) >= CAP_PER_CELL) return; // cell full — skip expensive work

  // Expensive: apply the opponent's setup move, verify the whole solution is legal.
  let game: Chess;
  try {
    game = new Chess(fen);
    if (!game.move(uciMove(moves[0]))) return;
  } catch {
    return;
  }
  const startFen = game.fen();
  if (seenFen.has(startFen)) return;
  const orientation = game.turn() === "w" ? "white" : "black";
  const solution = moves.slice(1);
  try {
    for (const m of solution) {
      if (!game.move(uciMove(m))) return; // unplayable — skip
    }
  } catch {
    return;
  }

  seenFen.add(startFen);
  cells.set(cellKey, (cells.get(cellKey) ?? 0) + 1);
  out.push({
    id: `lc-${puzzleId}`,
    fen: startFen,
    orientation,
    solution,
    theme,
    difficulty,
    rating,
  });
});

rl.on("close", () => {
  // Sort by rating so the JSON is browsable; the app shuffles at session time.
  out.sort((a, b) => a.rating - b.rating);
  writeFileSync(OUT, JSON.stringify(out));

  const byTheme: Record<string, number> = {};
  const byDiff: Record<string, number> = {};
  for (const p of out) {
    byTheme[p.theme] = (byTheme[p.theme] ?? 0) + 1;
    byDiff[p.difficulty] = (byDiff[p.difficulty] ?? 0) + 1;
  }
  process.stderr.write(
    `Read ${read} rows → kept ${out.length} puzzles (dup FENs skipped).\n` +
      `themes=${JSON.stringify(byTheme)}\n` +
      `difficulty=${JSON.stringify(byDiff)}\n` +
      `wrote ${OUT}\n`,
  );
});
