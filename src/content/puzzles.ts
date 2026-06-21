// Central puzzle pool. Flattens every `puzzle` activity and every `practiceSet`
// item from all modules into one tagged list, so tools (the Tactics Trainer, the
// daily puzzle) can draw from a single source. Theme + difficulty are derived
// from each puzzle's goal and prose when not explicitly set, so the whole
// existing library is usable without hand-tagging.

import type { Orientation, PuzzleGoal } from "./types";
import { MODULES, getModuleActivities } from "./index";
import { TACTICS_BANK } from "./tactics-bank";

export type PuzzleTheme =
  | "mate"
  | "fork"
  | "pin"
  | "skewer"
  | "discovered"
  | "sacrifice"
  | "back-rank"
  | "defense"
  | "win-material";

export type Difficulty = 1 | 2 | 3; // 1 = easy, 2 = medium, 3 = hard

export interface TacticsPuzzle {
  id: string;
  fen: string;
  orientation: Orientation;
  solution: string[];
  goal?: PuzzleGoal;
  prompt: string;
  successText?: string;
  hints?: string[];
  theme: PuzzleTheme;
  difficulty: Difficulty;
  /** Where it came from (module id), for reference. */
  source: string;
  /** True for kid-module puzzles (gentler framing). */
  kid: boolean;
}

const THEME_PATTERNS: [RegExp, PuzzleTheme][] = [
  [/back[\s-]?rank/i, "back-rank"],
  [/smother|sacrifice|sacrific|\bsac\b|gambit/i, "sacrifice"],
  [/discover/i, "discovered"],
  [/skewer/i, "skewer"],
  [/\bpin\b|pinn/i, "pin"],
  [/\bfork/i, "fork"],
];

function deriveTheme(text: string, goal?: PuzzleGoal): PuzzleTheme {
  for (const [re, theme] of THEME_PATTERNS) if (re.test(text)) return theme;
  if (goal?.type === "mate") return "mate";
  if (goal?.type === "escape") return "defense";
  if (goal?.type === "stalemate" || goal?.type === "perpetual") return "defense";
  return "win-material";
}

function deriveDifficulty(solution: string[], goal?: PuzzleGoal): Difficulty {
  if (goal?.type === "mate") {
    return goal.inMoves <= 1 ? 1 : goal.inMoves === 2 ? 2 : 3;
  }
  // learner plays the even-indexed moves
  const learnerMoves = Math.ceil(solution.length / 2);
  return learnerMoves <= 1 ? 1 : learnerMoves <= 2 ? 2 : 3;
}

let cache: TacticsPuzzle[] | null = null;

/** Every solvable tactical puzzle across the whole curriculum, tagged. */
export function getAllPuzzles(): TacticsPuzzle[] {
  if (cache) return cache;
  const out: TacticsPuzzle[] = [];
  for (const mod of MODULES) {
    const kid = !!mod.kidMode;
    for (const a of getModuleActivities(mod)) {
      if (a.type === "puzzle") {
        const text = `${a.title} ${a.prompt} ${a.successText} ${(a.hints ?? []).join(" ")}`;
        out.push({
          id: a.id,
          fen: a.fen,
          orientation: a.orientation,
          solution: a.solution,
          goal: a.goal,
          prompt: a.prompt,
          successText: a.successText,
          hints: a.hints,
          theme: deriveTheme(text, a.goal),
          difficulty: deriveDifficulty(a.solution, a.goal),
          source: mod.id,
          kid,
        });
      } else if (a.type === "practiceSet") {
        a.items.forEach((it, i) => {
          out.push({
            id: `${a.id}#${i}`,
            fen: it.fen,
            orientation: it.orientation,
            solution: it.solution,
            goal: it.goal,
            prompt: it.prompt,
            theme: deriveTheme(`${a.title} ${it.prompt}`, it.goal),
            difficulty: deriveDifficulty(it.solution, it.goal),
            source: mod.id,
            kid,
          });
        });
      }
    }
  }
  // Standalone tactics bank — explicit tags, no derivation.
  for (const p of TACTICS_BANK) {
    out.push({
      id: p.id,
      fen: p.fen,
      orientation: p.orientation,
      solution: p.solution,
      goal: p.goal,
      prompt: p.prompt,
      theme: p.theme,
      difficulty: p.difficulty,
      source: "tactics-bank",
      kid: false,
    });
  }
  cache = out;
  return out;
}

/** Puzzles filtered by theme/difficulty/kid-friendliness. */
export function selectPuzzles(opts: {
  themes?: PuzzleTheme[];
  maxDifficulty?: Difficulty;
  kidOnly?: boolean;
} = {}): TacticsPuzzle[] {
  return getAllPuzzles().filter((p) => {
    if (opts.themes && !opts.themes.includes(p.theme)) return false;
    if (opts.maxDifficulty && p.difficulty > opts.maxDifficulty) return false;
    if (opts.kidOnly && !p.kid) return false;
    return true;
  });
}

/** All themes that actually appear in the pool, with counts. */
export function themeCounts(): { theme: PuzzleTheme; count: number }[] {
  const counts = new Map<PuzzleTheme, number>();
  for (const p of getAllPuzzles()) counts.set(p.theme, (counts.get(p.theme) ?? 0) + 1);
  return [...counts.entries()].map(([theme, count]) => ({ theme, count }));
}

/** Deterministic puzzle-of-the-day: stable for a given YYYY-MM-DD date string. */
export function puzzleOfTheDay(dateStr: string): TacticsPuzzle {
  const pool = getAllPuzzles();
  let h = 2166136261 >>> 0;
  for (let i = 0; i < dateStr.length; i++) {
    h ^= dateStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return pool[(h >>> 0) % pool.length];
}
