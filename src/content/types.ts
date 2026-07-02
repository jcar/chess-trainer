// Content model for the learning platform.
//
// A `Module` is a self-contained curriculum (usually shaped by one book).
// A module has one or more `Lesson`s, each of which is an ordered list of
// `Activity`s. An `Activity` is a discriminated union on `type`, so new
// interaction kinds can be added without touching existing modules.
//
// All content is authored as typed data in `src/content/modules/*` and
// registered in `src/content/index.ts`. There is no backend — content ships
// with the app and progress lives in the browser (see `src/lib/progress`).

import type { CharacterId } from "./kids/characters";

/** Board orientation — whose pieces sit at the bottom. */
export type Orientation = "white" | "black";

/** The illustrated storybook backdrops a `scene` can use (kid mode). The art for
 *  each lives in components/kids/SceneArt.tsx. */
export type SceneBackdropId =
  | "kingdom"
  | "meadow"
  | "heights"
  | "road"
  | "forest"
  | "throne";

/** One spoken line of dialogue, attributed to a character (drives the portrait,
 *  name chip, and synthesized voice). */
export interface DialogueLine {
  speaker: CharacterId;
  text: string;
  /** Optional expression hint for the portrait. */
  mood?: "idle" | "happy" | "worried" | "sly";
}

/** Common fields every activity shares. */
interface ActivityBase {
  /** Stable, unique-within-module id. Used as the progress key and route param. */
  id: string;
  /** Short title shown in lists and the activity header. */
  title: string;
  /** Optional one-line teaser shown in the activity list. */
  blurb?: string;
  /**
   * Optional kid-mode story dialogue layered around the activity (Pip & the
   * Grey). `intro` frames the task in-character above the board; `onCorrect`
   * cheers a solve; `onWrong` is a gentle Murk taunt. `onWrong` is only wired
   * for players that report attempts (puzzle / openingDrill) for now.
   */
  dialogue?: {
    intro?: DialogueLine;
    onCorrect?: DialogueLine;
    onWrong?: DialogueLine;
  };
}

/**
 * What a puzzle is asking the solver to achieve. Drives engine-backed
 * verification in `scripts/validate-content.ts` (soundness + uniqueness) so the
 * check is precise rather than guessed from prose.
 */
export type PuzzleGoal =
  /** Forced checkmate in exactly `inMoves` of the solver's moves. */
  | { type: "mate"; inMoves: number }
  /** Decisive material gain; `minGain` is in pawns (e.g. 2 = win a knight-ish). */
  | { type: "win-material"; minGain: number }
  /** Defensive: the solver forces stalemate (saving a lost position with a draw). */
  | { type: "stalemate" }
  /** Defensive: the solver forces a draw by perpetual check / repetition. */
  | { type: "perpetual" }
  /** The solver's move simply gives check (a one-move "give check" exercise). */
  | { type: "check" }
  /** The solver's king starts in check; the move gets out of it. */
  | { type: "escape" };

/**
 * Puzzle: the learner must play a specific line from a position. Each move they
 * make is validated against `solution` (in order). Wrong moves are rejected.
 */
export interface PuzzleActivity extends ActivityBase {
  type: "puzzle";
  /** Starting position. */
  fen: string;
  orientation: Orientation;
  /**
   * What the solver must achieve. Used by the validator to engine-verify that
   * the solution is sound and the intended first move is uniquely best.
   */
  goal?: PuzzleGoal;
  /**
   * The correct line as a sequence of moves in UCI form ("e2e4", "e7e8q").
   * Odd-indexed moves (the opponent's replies) are auto-played by the app.
   */
  solution: string[];
  /** Optional progressive hints revealed on request. */
  hints?: string[];
  /** Prompt shown above the board, e.g. "White to play — mate in one." */
  prompt: string;
  /** Message shown when the puzzle is solved. */
  successText: string;
}

/** What counts as "done" in a drill played against the engine. */
export type DrillObjective = "checkmate" | "promote" | "stalemate-avoided";

/**
 * Drill: the learner plays a position out against Stockfish until they achieve
 * `objective`. Used for converting won endgames (e.g. K+Q vs K).
 */
export interface DrillActivity extends ActivityBase {
  type: "drill";
  fen: string;
  orientation: Orientation;
  objective: DrillObjective;
  /** Stockfish skill level 0–20. Lower = weaker opponent. */
  engineSkill: number;
  /** Instructions shown above the board. */
  instructions: string;
  successText: string;
}

/** Read + check-for-understanding multiple choice. */
export interface QuizActivity extends ActivityBase {
  type: "quiz";
  question: string;
  options: string[];
  /** Index into `options`. */
  correctIndex: number;
  /** Shown after answering, regardless of correctness. */
  explanation: string;
}

/** One step of a guided replay. */
export interface ReplayStep {
  /** Move in SAN ("Rh8#") applied to reach this step. */
  san: string;
  /** Annotation displayed while this move is shown. */
  note: string;
  /** Strategy Lab: extra arrows to draw on this step (beyond the move arrow),
   *  e.g. pointing out a weak square or a plan. */
  arrows?: { from: string; to: string }[];
  /** Strategy Lab: squares to emphasize on this step (e.g. an outpost, a hole). */
  highlights?: string[];
  /** Strategy Lab: a short bolded "key idea" callout shown above the note. */
  keyIdea?: string;
}

/**
 * Guided replay: the learner steps forward/back through an annotated line.
 * No free play — the board reflects the current step.
 *
 * Used in two registers: the kid-mode "watch the moves" replay, and the adult
 * **Strategy Lab** (`eval: true`) — a real master game annotated with the *why*,
 * arrows/highlights per step, and a live Stockfish eval bar so the advantage is
 * visible as it grows.
 */
export interface ReplayActivity extends ActivityBase {
  type: "replay";
  /** Starting position (defaults to the standard start if omitted). */
  startFen?: string;
  orientation: Orientation;
  /** Intro shown before the first move. */
  intro: string;
  steps: ReplayStep[];
  /** Strategy Lab: show a live Stockfish evaluation bar beside the board. */
  eval?: boolean;
  /** Optional attribution for a real game, e.g. "Capablanca–Tartakower, 1924". */
  source?: string;
}

/** The six chess piece kinds (used by visual move-maps). */
export type PieceType =
  | "rook"
  | "bishop"
  | "queen"
  | "king"
  | "knight"
  | "pawn";

/**
 * Move-map ("Meet the Piece"): a single piece on an otherwise empty board. The
 * child taps the piece to light up every square it can reach (with arrows), then
 * can tap a lit square to move it there and explore again. Teaches movement
 * visually — no reading required. Display-only board (not a legal position), so
 * it is exempt from chess.js legality checks.
 */
export interface MoveMapActivity extends ActivityBase {
  type: "movemap";
  /** Which piece to demonstrate (assumed White). */
  piece: PieceType;
  /** Starting square for the piece, e.g. "e4". */
  square: string;
  orientation: Orientation;
  /** Short spoken intro, e.g. "This is the rook. Tap it!" */
  intro: string;
  /** A memorable, kid-friendly fact read aloud, e.g. "Rooks move like trains!" */
  funFact: string;
}

/** One tappable picture option in a picture-answer quiz. */
export interface PictureOption {
  /** Display-only FEN showing the diagram (e.g. a piece to illustrate). */
  fen: string;
  orientation?: Orientation;
  /** Arrows drawn on the mini board to show a movement pattern. */
  arrows?: { from: string; to: string }[];
  /** Optional tiny caption under the picture. */
  caption?: string;
}

/**
 * Picture-answer quiz: the question's answers are little board diagrams the child
 * taps, instead of sentences. Built for pre-readers. Option boards are
 * display-only (exempt from legality checks).
 */
export interface PictureQuizActivity extends ActivityBase {
  type: "pictureQuiz";
  question: string;
  options: PictureOption[];
  correctIndex: number;
  explanation: string;
}

/**
 * Target game ("Move to the ⭐" / "Collect the stars"): a single (white) piece
 * the child taps to light up its moves, then taps a star to move there. Complete
 * when all target squares are reached. Display-only board (geometric movement,
 * no chess.js), so it's exempt from legality checks.
 */
export interface TargetActivity extends ActivityBase {
  type: "target";
  piece: PieceType;
  /** The piece's starting square. */
  square: string;
  orientation: Orientation;
  /** Squares the child must land the piece on (collect all to finish). */
  targets: string[];
  intro: string;
  successText: string;
  /**
   * Optional emoji shown ON each target square instead of the plain gold star
   * (e.g. "🍎" for a "gobble" game). Cosmetic only.
   */
  prey?: string;
  /**
   * Optional squares shown in red that the piece must NOT land on; landing on
   * one ends the attempt and resets (a gentle "don't get caught" mechanic).
   */
  avoidSquares?: string[];
  /**
   * Optional move budget — "do it in N hops!". Shown as pips; running out
   * resets the attempt. Omit for unlimited moves.
   */
  moveBudget?: number;
}

/** One labeled choice in a sort game. */
export interface SortOption {
  label: string;
  emoji?: string;
}

/**
 * Sort game: show a board/diagram, the child taps the right label. Powers
 * "Checkmate or Stalemate?", "Legal or Illegal?", "Which piece?", light/dark
 * square, "Is it safe?". Display-only board (exempt from legality checks).
 */
export interface SortActivity extends ActivityBase {
  type: "sort";
  prompt: string;
  fen: string;
  orientation?: Orientation;
  arrows?: { from: string; to: string }[];
  options: SortOption[];
  correctIndex: number;
  explanation: string;
}

/**
 * Coordinate game: "Find e4." The child taps the named square; several rounds.
 * Board has notation hidden so it's a real recall game.
 */
export interface CoordinateActivity extends ActivityBase {
  type: "coordinate";
  orientation: Orientation;
  /** Squares to find, in order (one per round). */
  rounds: string[];
  intro: string;
  successText: string;
}

/** One item in a practice set — a small move puzzle, engine-verified. */
export interface PracticeItem {
  fen: string;
  orientation: Orientation;
  /** Solution line in UCI; odd indices are auto-played replies. */
  solution: string[];
  goal: PuzzleGoal;
  prompt: string;
}

/**
 * Practice set: many short puzzles served one at a time. The child masters the
 * skill by getting `requiredCorrect` right. This is the rigor backbone — lots of
 * varied reps (and mixed review) in a single activity. Items are engine-verified.
 */
export interface PracticeSetActivity extends ActivityBase {
  type: "practiceSet";
  intro: string;
  requiredCorrect: number;
  items: PracticeItem[];
}

/**
 * Opening drill ("guess the move"): the learner reproduces one side of a known
 * opening line. The board is interactive; on the learner's turn they must play
 * the book move (validated by SAN), wrong moves are rejected with a gentle retry
 * and a "Show me" arrow hint, and the opponent's replies are auto-played. This is
 * the seed of the future standalone openings trainer — it reads the same line
 * data (see `src/content/openings/`).
 */
export interface OpeningDrillActivity extends ActivityBase {
  type: "openingDrill";
  /** Starting position (defaults to the standard start if omitted). */
  startFen?: string;
  /** Board view — normally the learner's color. */
  orientation: Orientation;
  /** The full line in SAN. The learner plays `learnerColor`'s moves. */
  line: string[];
  /** Which side the learner is training. */
  learnerColor: Orientation;
  /** Intro shown before the first move. */
  intro: string;
  /** Message shown when the whole line is reproduced. */
  successText: string;
  /** Optional per-move notes, parallel to `line` (shown as each move is played). */
  notes?: (string | undefined)[];
}

/**
 * Concept card: a short, read-only teaching screen shown at the START of a
 * lesson so the idea is explained before it is quizzed. A couple of short
 * paragraphs, optional key points, and optional display-only diagrams; the
 * learner taps "Got it" to continue. (Diagrams are illustrative — not legal
 * positions necessarily — so they are exempt from validation.)
 */
export interface ConceptActivity extends ActivityBase {
  type: "concept";
  /** One or two short paragraphs (split on a blank line). */
  body: string;
  /** Optional key takeaways shown as bullets. */
  points?: string[];
  /** Optional illustrative diagrams (display-only). `arrows` highlight the idea
   *  (e.g. a fork's two targets). */
  diagrams?: {
    fen: string;
    orientation?: Orientation;
    arrows?: { from: string; to: string }[];
    caption?: string;
  }[];
  /**
   * Optional check-for-understanding (kid mode): a quick multiple-choice question
   * shown after the teaching, gating "Got it" until answered correctly
   * (retry-until-right). Turns a passive read into active retrieval.
   */
  check?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  /**
   * Optional "Practice now" handoff into a tool — turns a lesson into a
   * teach → drill loop. Renders a button to the Tactics Trainer (optionally
   * pre-filtered by theme/difficulty) or the Endgame Trainer.
   */
  practice?: {
    tool: "tactics" | "endgames" | "play";
    /** Tactics: pre-selected theme filter (a PuzzleTheme string). */
    theme?: string;
    /** Tactics: difficulty cap (1 easy … 3 all levels). */
    maxDifficulty?: 1 | 2 | 3;
    /** Button label; defaults to a sensible "Practice now …". */
    label?: string;
  };
}

/** One review item in a Pip's Challenge checkpoint — an MCQ tagged with the
 *  concept it reinforces (so the SRS can resurface a child's weak spots first). */
export interface ReviewItem {
  /** Concept id (matches CONCEPT_FOR_ACTIVITY values in lib/kids/concepts). */
  conceptId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/** "Pip's Challenge" — a mixed, mastery-based review that interleaves earlier
 *  concepts. Items are ordered by the SRS (most-overdue / most-missed first),
 *  with a gentle mastery bar and no fail state. */
export interface ReviewCheckpointActivity extends ActivityBase {
  type: "reviewCheckpoint";
  intro: string;
  /** Fraction of presented items the child must get right to pass (e.g. 0.8). */
  masteryBar: number;
  successText: string;
  items: ReviewItem[];
}

/**
 * Story scene (kid mode, "Pip & the Grey"): a display-only screen that plays a
 * short sequence of character `lines` over an illustrated `backdrop`, then a
 * `cta` button that completes + advances (like a concept card). Each line is
 * spoken in its character's voice. No board, no chess rules — exempt from
 * engine/legality validation. Hooks and resolutions are injected around lessons
 * by content/kids/withStory.ts.
 */
export interface SceneActivity extends ActivityBase {
  type: "scene";
  backdrop: SceneBackdropId;
  /** How much color the backdrop shows: 0 = fully grey, 1 = full color.
   *  Defaults to 1. A "hook" scene before color is restored might use a low
   *  value; a "resolve" scene uses a high one. */
  colorAmount?: number;
  lines: DialogueLine[];
  /** Label on the button that ends the scene, e.g. "Wake the rook!". */
  cta: string;
}

/**
 * Guess the Move (adult "Try"): the learner plays a real master game forward and,
 * at chosen plies, must *predict* the move before it is revealed. Stockfish scores
 * the guess — an exact match scores full, a move within an eval-loss band scores
 * partial — then the game move and the idea behind it are shown. Teaches a learner
 * to think like the master rather than passively watch.
 */
export interface GuessMoveActivity extends ActivityBase {
  type: "guessMove";
  /** Starting position (defaults to the standard start if omitted). */
  startFen?: string;
  orientation: Orientation;
  /** The whole game line in SAN; the learner reproduces it ply by ply. */
  moves: string[];
  /** Indices into `moves` (0-based plies) at which the learner must guess. */
  guessAt: number[];
  /** Optional per-ply notes (parallel to `moves`), shown as each move is revealed. */
  notes?: (string | undefined)[];
  /** Intro shown before play. */
  intro: string;
  /** Message shown when the line is complete. */
  successText: string;
  /** Optional attribution, e.g. "Karpov–Unzicker, 1974". */
  source?: string;
}

/**
 * Find the Plan → convert (adult "Apply"): first the learner reads the position's
 * imbalances and picks the right *plan* (multiple choice), then immediately
 * **executes** that plan against the engine (a drill) or plays the key line (a
 * puzzle). Closes the loop from understanding to doing. `convert` carries a full
 * sub-activity minus its identity (the player supplies id/title/type).
 */
export interface PlanActivity extends ActivityBase {
  type: "plan";
  fen: string;
  orientation: Orientation;
  /** The strategic question, e.g. "How should White play this position?" */
  planQuestion: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  /** After the plan is identified, convert it: play it out (drill) or find the
   *  line (puzzle). */
  convert:
    | { kind: "puzzle"; puzzle: Omit<PuzzleActivity, "type" | "id" | "title" | "blurb" | "dialogue"> }
    | { kind: "drill"; drill: Omit<DrillActivity, "type" | "id" | "title" | "blurb" | "dialogue"> };
}

export type Activity =
  | PuzzleActivity
  | DrillActivity
  | QuizActivity
  | ReplayActivity
  | GuessMoveActivity
  | PlanActivity
  | MoveMapActivity
  | PictureQuizActivity
  | TargetActivity
  | SortActivity
  | CoordinateActivity
  | PracticeSetActivity
  | OpeningDrillActivity
  | ConceptActivity
  | ReviewCheckpointActivity
  | SceneActivity;

export type ActivityType = Activity["type"];

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  activities: Activity[];
  /** Optional grouping label for the module landing page (e.g. the Openings room
   *  groups lessons by "1.e4 e5 — Open Games", "1.d4 Openings", …). When set, the
   *  landing page renders a section divider at each change of value. */
  section?: string;
}

export interface Module {
  id: string;
  title: string;
  /** Short marketing-style description for the module card. */
  description: string;
  /** Difficulty band, shown as a chip. */
  level: "Beginner" | "Improver" | "Intermediate" | "Advanced";
  /**
   * When true, the module is presented in "kid mode": bigger/brighter UI,
   * tap-to-move board with legal-move dots and hints, read-aloud speaker
   * buttons, and sound effects. Designed for ages ~5–8.
   */
  kidMode?: boolean;
  lessons: Lesson[];
}
