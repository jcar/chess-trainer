// Shared opening data model — the single source of truth for opening lines.
//
// The "Chess Openings" module DERIVES its guided replays and guess-the-move
// drills from this data (see ./index.ts helpers), and the future standalone
// "openings trainer" tool will read the same `OPENINGS` registry. Keeping the
// moves here (not duplicated inside each activity) means the lessons and the
// trainer can never drift apart.
//
// All prose is original; all move sequences are standard, public opening theory.

import type { Orientation } from "../types";

/** Which first-move family an opening belongs to (for grouping/ordering). */
export type OpeningFamily = "1e4-e5" | "1e4-other" | "1d4" | "flank";

/** One named line within an opening: a sequence of SAN moves + annotations. */
export interface OpeningLine {
  /** e.g. "Main line", "Exchange Variation". */
  label: string;
  /** Moves in SAN from `startFen` (or the standard start). */
  sans: string[];
  /** Per-move annotations, parallel to `sans` (sparse entries allowed). */
  notes?: (string | undefined)[];
  /** Optional start position; defaults to the standard initial position. */
  startFen?: string;
}

/** A complete opening: its character, plans, key position, and lines. */
export interface Opening {
  /** Stable id, e.g. "italian-game" (used in activity ids and by the trainer). */
  id: string;
  /** Display name, e.g. "Italian Game". */
  name: string;
  /** ECO code or range (public reference), e.g. "C50–C54". */
  eco?: string;
  family: OpeningFamily;
  /** The side the trainer drills for this opening (its natural repertoire color). */
  trainerColor: Orientation;
  /** Defining moves as a display string, e.g. "1.e4 e5 2.Nf3 Nc6 3.Bc4". */
  firstMoves: string;
  /** Original prose: the personality/character of the opening. */
  character: string;
  /** What White is trying to do. */
  whitePlan: string;
  /** What Black is trying to do. */
  blackPlan: string;
  /** Key tabiya FEN (the position after the defining moves). */
  tabiyaFen: string;
  /** Main line first; key variations after. At least one. */
  lines: OpeningLine[];
}

/** The learner's color in a generated opening drill. */
export type LearnerColor = Orientation;
