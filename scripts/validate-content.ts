// Content validator. Run with `npm run validate`.
//
// Two layers:
//   1. chess.js legality — FENs are legal and "could arise in a game" (the side
//      NOT to move must not be in check), and all solution/replay lines play out.
//   2. Stockfish soundness + uniqueness — every puzzle's stated `goal` is actually
//      forced, and the intended first move is the uniquely-best move (no
//      unintended alternative solution). Drills are checked to be winnable.
//
// Engines don't hallucinate, so layer 2 is authoritative for "no mistakes".

import { Chess } from "chess.js";
import { MODULES, getModuleActivities } from "../src/content";
import { OPENINGS } from "../src/content/openings";
import lichessPuzzles from "../src/content/tactics-puzzles.json";
import type { Activity, PuzzleActivity, PuzzleGoal } from "../src/content/types";
import { getEngine, quitEngine, type Score } from "./lib/engine";

const MATE_DEPTH = 24; // mates are found fast; go deep enough to be certain
const EVAL_DEPTH = 20;
const UNIQUE_CP_GAP = 150; // best must beat 2nd-best by ≥1.5 pawns to be "unique"

const problems: string[] = [];
const warnings: string[] = [];
const note = (where: string, msg: string) => problems.push(`${where}: ${msg}`);
const warn = (where: string, msg: string) => warnings.push(`${where}: ${msg}`);

/** A position is illegal if the side that just moved left itself in check. */
function assertLegalPosition(where: string, fen: string): Chess | null {
  let game: Chess;
  try {
    game = new Chess(fen);
  } catch (e) {
    note(where, `FEN rejected by chess.js: ${(e as Error).message}`);
    return null;
  }
  const parts = fen.split(" ");
  parts[1] = parts[1] === "w" ? "b" : "w";
  try {
    if (new Chess(parts.join(" ")).inCheck()) {
      note(where, `illegal — the side not to move is in check ("${fen}")`);
    }
  } catch {
    /* flipped position may be unusual; the primary check above suffices */
  }
  return game;
}

/** chess.js move from a UCI string; returns false if illegal. */
function playUci(game: Chess, uci: string): boolean {
  try {
    game.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] });
    return true;
  } catch {
    return false;
  }
}

const isMate = (s: Score): s is { mate: number } => "mate" in s;
/** Centipawn value with mates mapped to large magnitudes (closer mate = bigger). */
function toCp(s: Score): number {
  if (isMate(s)) return s.mate > 0 ? 100000 - s.mate : -100000 - s.mate;
  return s.cp;
}

/** Engine/rules verification of one solution line for a given goal. Reusable
 *  for both `puzzle` activities and `practiceSet` items. */
async function checkLineSound(
  where: string,
  fen: string,
  solution: string[],
  goal: PuzzleGoal,
) {
  // check / escape are simple rules checks (no engine needed).
  if (goal.type === "check") {
    const g = new Chess(fen);
    if (!playUci(g, solution[0])) {
      note(where, `give-check move "${solution[0]}" is illegal`);
    } else if (!g.isCheck()) {
      note(where, "give-check move does not actually give check");
    }
    return;
  }
  if (goal.type === "escape") {
    const g = new Chess(fen);
    if (!g.isCheck()) {
      note(where, "escape puzzle: the side to move is NOT in check at the start");
    }
    if (!playUci(g, solution[0])) {
      note(where, `escape move "${solution[0]}" is illegal (doesn't get out of check)`);
    }
    return;
  }

  const engine = getEngine();
  const game = new Chess(fen);

  for (let i = 0; i < solution.length; i++) {
    const uci = solution[i];
    const learnerMove = i % 2 === 0;

    if (learnerMove) {
      const isFirst = i === 0;
      const { lines } = await engine.analyze(game.fen(), {
        depth: goal.type === "win-material" ? EVAL_DEPTH : MATE_DEPTH,
        multiPV: 2,
      });
      if (lines.length === 0) {
        note(where, `engine returned no lines at move #${i + 1} (illegal/terminal?)`);
        break;
      }
      const best = lines[0];
      const second = lines[1];

      if (best.move !== uci) {
        note(
          where,
          `move #${i + 1}: intended ${uci} is not the engine's best (${best.move}, ${JSON.stringify(best.score)})`,
        );
      }

      if (goal.type === "mate") {
        const remaining = goal.inMoves - i / 2;
        if (!isMate(best.score) || best.score.mate !== remaining) {
          note(
            where,
            `move #${i + 1}: expected forced mate in ${remaining}, engine says ${JSON.stringify(best.score)}`,
          );
        }
        if (second && isMate(second.score) && second.score.mate > 0 && second.score.mate <= remaining) {
          note(
            where,
            `move #${i + 1}: NOT unique — a second move (${second.move}) also mates in ${second.score.mate}`,
          );
        }
      } else if (goal.type === "win-material") {
        const s0 = toCp(best.score);
        if (s0 < goal.minGain * 100) {
          note(where, `move #${i + 1}: gain ${(s0 / 100).toFixed(1)} < required ${goal.minGain} pawns`);
        }
        if (isFirst && second && s0 - toCp(second.score) < UNIQUE_CP_GAP) {
          note(
            where,
            `move #${i + 1}: NOT unique — 2nd-best (${second.move}) within ${UNIQUE_CP_GAP}cp of best`,
          );
        }
      }
    }

    if (!playUci(game, uci)) {
      note(where, `solution move #${i + 1} ("${uci}") is illegal`);
      return;
    }
  }

  if (goal.type === "mate" && !game.isCheckmate()) {
    note(where, "solution does not end in checkmate");
  }
  if (goal.type === "stalemate" && !game.isStalemate()) {
    note(where, "solution does not end in stalemate");
  }
  if (goal.type === "perpetual" && !game.isThreefoldRepetition() && !game.isDraw()) {
    note(where, "solution does not reach a draw by repetition");
  }
}

async function checkPuzzleEngine(where: string, a: PuzzleActivity) {
  if (!a.goal) {
    warn(where, "puzzle has no `goal` — soundness/uniqueness NOT engine-verified");
    return;
  }
  await checkLineSound(where, a.fen, a.solution, a.goal);
}

async function checkActivity(moduleId: string, a: Activity) {
  const where = `${moduleId}/${a.id}`;
  switch (a.type) {
    case "quiz":
      if (a.correctIndex < 0 || a.correctIndex >= a.options.length) {
        note(where, `correctIndex ${a.correctIndex} out of range`);
      }
      break;

    case "puzzle": {
      const game = assertLegalPosition(where, a.fen);
      if (!game) break;
      // Legality of the full line (independent of engine).
      const probe = new Chess(a.fen);
      for (let i = 0; i < a.solution.length; i++) {
        if (!playUci(probe, a.solution[i])) {
          note(where, `solution move #${i + 1} ("${a.solution[i]}") is illegal`);
          break;
        }
      }
      // Engine soundness + uniqueness.
      await checkPuzzleEngine(where, a);
      break;
    }

    case "drill": {
      if (!assertLegalPosition(where, a.fen)) break;
      // The side to move must actually have a decisive, winning position,
      // otherwise the drill is unwinnable.
      const { lines } = await getEngine().analyze(a.fen, { depth: EVAL_DEPTH, multiPV: 1 });
      const s = lines[0]?.score;
      const winning = s && (isMate(s) ? s.mate > 0 : s.cp >= 500);
      if (!winning) {
        note(where, `drill not winnable for the side to move (engine: ${JSON.stringify(s)})`);
      }
      break;
    }

    case "replay": {
      const game = new Chess(a.startFen);
      assertLegalPosition(where, game.fen());
      for (let i = 0; i < a.steps.length; i++) {
        try {
          game.move(a.steps[i].san);
        } catch {
          note(where, `replay step #${i + 1} ("${a.steps[i].san}") is illegal`);
          break;
        }
      }
      break;
    }

    case "movemap": {
      // Display-only single-piece board; just sanity-check the start square.
      if (!/^[a-h][1-8]$/.test(a.square)) {
        note(where, `invalid start square "${a.square}"`);
      }
      break;
    }

    case "pictureQuiz": {
      // Option boards are display-only diagrams — no legality check.
      if (a.correctIndex < 0 || a.correctIndex >= a.options.length) {
        note(where, `correctIndex ${a.correctIndex} out of range`);
      }
      if (a.options.length < 2) {
        note(where, "picture quiz needs at least 2 options");
      }
      break;
    }

    case "target": {
      const sq = /^[a-h][1-8]$/;
      if (!sq.test(a.square)) note(where, `invalid piece square "${a.square}"`);
      if (a.targets.length === 0) note(where, "target game has no targets");
      for (const t of a.targets) {
        if (!sq.test(t)) note(where, `invalid target square "${t}"`);
      }
      break;
    }

    case "sort": {
      if (a.correctIndex < 0 || a.correctIndex >= a.options.length) {
        note(where, `correctIndex ${a.correctIndex} out of range`);
      }
      if (a.options.length < 2) note(where, "sort game needs at least 2 options");
      break;
    }

    case "coordinate": {
      if (a.rounds.length === 0) note(where, "coordinate game has no rounds");
      for (const r of a.rounds) {
        if (!/^[a-h][1-8]$/.test(r)) note(where, `invalid round square "${r}"`);
      }
      break;
    }

    case "practiceSet": {
      if (a.requiredCorrect < 1 || a.requiredCorrect > a.items.length) {
        note(where, `requiredCorrect ${a.requiredCorrect} must be 1..${a.items.length}`);
      }
      for (let i = 0; i < a.items.length; i++) {
        const it = a.items[i];
        const itemWhere = `${where} item#${i + 1}`;
        if (!assertLegalPosition(itemWhere, it.fen)) continue;
        const probe = new Chess(it.fen);
        let ok = true;
        for (let j = 0; j < it.solution.length; j++) {
          if (!playUci(probe, it.solution[j])) {
            note(itemWhere, `solution move #${j + 1} ("${it.solution[j]}") is illegal`);
            ok = false;
            break;
          }
        }
        if (ok) await checkLineSound(itemWhere, it.fen, it.solution, it.goal);
      }
      break;
    }

    case "openingDrill": {
      // Replay the line for full legality; confirm the learner actually has
      // moves to play (parity is correct for the trained color).
      const game = new Chess(a.startFen);
      assertLegalPosition(where, game.fen());
      if (a.line.length === 0) note(where, "opening drill has no moves");
      const learnerTurn = a.learnerColor === "white" ? "w" : "b";
      let learnerMoves = 0;
      for (let i = 0; i < a.line.length; i++) {
        if (game.turn() === learnerTurn) learnerMoves++;
        try {
          game.move(a.line[i]);
        } catch {
          note(where, `line move #${i + 1} ("${a.line[i]}") is illegal`);
          break;
        }
      }
      if (learnerMoves === 0) {
        note(where, `no ${a.learnerColor} moves for the learner to play`);
      }
      break;
    }

    case "reviewCheckpoint": {
      // MCQ review over earlier concepts (display-only) — no engine check needed.
      if (a.items.length < 1) note(where, "review checkpoint has no items");
      if (a.masteryBar <= 0 || a.masteryBar > 1) {
        note(where, `masteryBar ${a.masteryBar} must be in (0, 1]`);
      }
      a.items.forEach((it, i) => {
        if (it.options.length < 2) note(where, `item ${i} needs ≥2 options`);
        if (it.correctIndex < 0 || it.correctIndex >= it.options.length) {
          note(where, `item ${i} correctIndex ${it.correctIndex} out of range`);
        }
        if (!it.conceptId) note(where, `item ${i} missing conceptId`);
      });
      break;
    }
    case "concept": {
      // Read-only teaching card; diagrams are display-only. Just require text.
      if (!a.body || !a.body.trim()) note(where, "concept card has no body text");
      if (a.check) {
        if (a.check.options.length < 2) note(where, "concept check needs ≥2 options");
        if (a.check.correctIndex < 0 || a.check.correctIndex >= a.check.options.length) {
          note(where, `concept check correctIndex ${a.check.correctIndex} out of range`);
        }
      }
      break;
    }
  }
}

/** Every opening line (used by the openings trainer) must replay legally. */
function checkOpeningLines(): number {
  let lineCount = 0;
  for (const o of OPENINGS) {
    for (const line of o.lines) {
      const where = `opening:${o.id}/${line.label}`;
      const game = new Chess(line.startFen);
      assertLegalPosition(where, game.fen());
      for (let i = 0; i < line.sans.length; i++) {
        try {
          game.move(line.sans[i]);
        } catch {
          note(where, `line move #${i + 1} ("${line.sans[i]}") is illegal`);
          break;
        }
      }
      lineCount++;
    }
  }
  return lineCount;
}

/** Curated Lichess puzzles (CC0). They're already engine-verified upstream, so we
 *  do the cheap-but-thorough checks on ALL of them — legal position + every
 *  solution move playable — and an engine SANITY sample (the solver's first move
 *  should be the engine's best) rather than re-verifying thousands at depth. */
async function checkImportedPuzzles(): Promise<number> {
  const puzzles = lichessPuzzles as {
    id: string;
    fen: string;
    solution: string[];
  }[];

  // 1) Legality + full playability for every puzzle (chess.js only — fast).
  for (const p of puzzles) {
    const where = `tactics-puzzles/${p.id}`;
    if (!assertLegalPosition(where, p.fen)) continue;
    const probe = new Chess(p.fen);
    for (let i = 0; i < p.solution.length; i++) {
      if (!playUci(probe, p.solution[i])) {
        note(where, `solution move #${i + 1} ("${p.solution[i]}") is illegal`);
        break;
      }
    }
  }

  // 2) Engine sanity on an evenly-spaced sample: the solver's first move should be
  //    the engine's best. Mismatches are warnings (alternate solutions exist); a
  //    large fraction disagreeing would signal a mapping bug and fails.
  const SAMPLE = 40;
  const step = Math.max(1, Math.floor(puzzles.length / SAMPLE));
  const engine = getEngine();
  let checked = 0;
  let mismatches = 0;
  for (let i = 0; i < puzzles.length && checked < SAMPLE; i += step) {
    const p = puzzles[i];
    const { lines } = await engine.analyze(p.fen, { depth: EVAL_DEPTH, multiPV: 1 });
    checked++;
    const best = lines[0]?.move;
    if (best && p.solution[0] && best !== p.solution[0]) {
      mismatches++;
      warn(
        `tactics-puzzles/${p.id}`,
        `sample: solver move ${p.solution[0]} != engine best ${best} (ok if an alternate solution)`,
      );
    }
  }
  if (checked && mismatches > checked / 3) {
    note(
      "tactics-puzzles",
      `engine sample: ${mismatches}/${checked} first moves disagree with the engine — investigate the import mapping`,
    );
  }
  return puzzles.length;
}

async function main() {
  let count = 0;
  for (const mod of MODULES) {
    for (const activity of getModuleActivities(mod)) {
      await checkActivity(mod.id, activity);
      count++;
    }
  }
  const openingLineCount = checkOpeningLines();
  const puzzleCount = await checkImportedPuzzles();
  quitEngine();

  for (const w of warnings) console.warn(`  ⚠ ${w}`);
  if (problems.length) {
    console.error(`\n✗ Content validation FAILED (${problems.length} problem(s)):`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  console.log(
    `\n✓ Content valid: ${count} activities across ${MODULES.length} module(s)` +
      ` + ${openingLineCount} opening lines + ${puzzleCount} Lichess puzzles` +
      (warnings.length ? ` (${warnings.length} warning(s))` : "") +
      `.`,
  );
}

main();
