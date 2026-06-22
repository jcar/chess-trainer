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

/** Board orientation — whose pieces sit at the bottom. */
export type Orientation = "white" | "black";

/** Common fields every activity shares. */
interface ActivityBase {
  /** Stable, unique-within-module id. Used as the progress key and route param. */
  id: string;
  /** Short title shown in lists and the activity header. */
  title: string;
  /** Optional one-line teaser shown in the activity list. */
  blurb?: string;
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
}

/**
 * Guided replay: the learner steps forward/back through an annotated line.
 * No free play — the board reflects the current step.
 */
export interface ReplayActivity extends ActivityBase {
  type: "replay";
  /** Starting position (defaults to the standard start if omitted). */
  startFen?: string;
  orientation: Orientation;
  /** Intro shown before the first move. */
  intro: string;
  steps: ReplayStep[];
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
  /** Optional illustrative diagrams (display-only). */
  diagrams?: { fen: string; orientation?: Orientation; caption?: string }[];
  /**
   * Optional "Practice now" handoff into a tool — turns a lesson into a
   * teach → drill loop. Renders a button to the Tactics Trainer (optionally
   * pre-filtered by theme/difficulty) or the Endgame Trainer.
   */
  practice?: {
    tool: "tactics" | "endgames";
    /** Tactics: pre-selected theme filter (a PuzzleTheme string). */
    theme?: string;
    /** Tactics: difficulty cap (1 easy … 3 all levels). */
    maxDifficulty?: 1 | 2 | 3;
    /** Button label; defaults to a sensible "Practice now …". */
    label?: string;
  };
}

export type Activity =
  | PuzzleActivity
  | DrillActivity
  | QuizActivity
  | ReplayActivity
  | MoveMapActivity
  | PictureQuizActivity
  | TargetActivity
  | SortActivity
  | CoordinateActivity
  | PracticeSetActivity
  | OpeningDrillActivity
  | ConceptActivity;

export type ActivityType = Activity["type"];

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  activities: Activity[];
}

export interface Module {
  id: string;
  title: string;
  /** Short marketing-style description for the module card. */
  description: string;
  /** Difficulty band, shown as a chip. */
  level: "Beginner" | "Intermediate" | "Advanced";
  /**
   * When true, the module is presented in "kid mode": bigger/brighter UI,
   * tap-to-move board with legal-move dots and hints, read-aloud speaker
   * buttons, and sound effects. Designed for ages ~5–8.
   */
  kidMode?: boolean;
  lessons: Lesson[];
}
