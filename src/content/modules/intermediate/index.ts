// "Intermediate Chess" (Intermediate). Five original lessons; every position
// engine-verified by `npm run validate`. Continues the Fundamentals module.

import type { Module } from "../../types";
import { ch9 } from "./ch9";
import { ch12 } from "./ch12";
import { ch13 } from "./ch13";
import { ch14 } from "./ch14";
import { ch15 } from "./ch15";
import { pawnStructures } from "./pawn-structures";
import { intReview1, intReview2 } from "./reviews";

// Note: specific opening repertoires (formerly ch10–11: London/Vienna/Alapin
// and Scandinavian/Caro-Kann/QGD) now live in the Chess Openings module +
// Trainer, where they're studied AND drilled with spaced repetition. ch9 is the
// gateway that teaches how to build a repertoire and hands off to that course.
// Lesson ids are kept as-is (ch12…ch15) so progress is preserved; only the
// learner-facing title numbers were resequenced (10–13).
export const intermediate: Module = {
  id: "intermediate",
  title: "Intermediate Chess",
  description:
    "The improver's path: how to build an opening repertoire, gambits, the endgames that decide games, sharper tactics, and the strategic ideas behind strong play.",
  level: "Intermediate",
  // intReview1/2 are spaced-retrieval checkpoints interleaved between lessons
  // (they re-test earlier ideas from fresh angles; they carry no chapter number).
  lessons: [ch9, ch12, ch13, intReview1, ch14, ch15, pawnStructures, intReview2],
};
