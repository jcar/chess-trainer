// "Chess Strategy" module — a positional course built around imbalances and
// planning. Lessons run from the thinking method through minor pieces, pawns,
// squares, files, and initiative to a synthesis on planning. Concept checks
// (quiz/sort) and annotated replays carry the ideas; engine-verified puzzles/
// drills appear where a sound, forced one exists.
//
// All prose is original; positions are standard/public chess knowledge; every
// puzzle/drill is engine-verified by `npm run validate`.

import type { Module } from "../../types";
import { imbalancesLesson } from "./imbalances";
import { endgamesLesson } from "./endgames";
import { calculationLesson } from "./calculation";
import { bishopsLesson } from "./bishops";
import { knightsLesson } from "./knights";
import { bishopVsKnightLesson } from "./bishop-vs-knight";
import { spaceLesson } from "./space";
import { centerLesson } from "./center";
import { weakPawnsLesson } from "./weak-pawns";
import { weakSquaresLesson } from "./weak-squares";
import { openFilesLesson } from "./open-files";
import { initiativeLesson } from "./initiative";
import { synthesisLesson } from "./synthesis";

export const strategy: Module = {
  id: "strategy",
  title: "Chess Strategy",
  description:
    "Think like a positional player: weigh the imbalances, find the right plan, and turn small edges into wins.",
  level: "Advanced",
  lessons: [
    imbalancesLesson,
    endgamesLesson,
    calculationLesson,
    bishopsLesson,
    knightsLesson,
    bishopVsKnightLesson,
    spaceLesson,
    centerLesson,
    weakPawnsLesson,
    weakSquaresLesson,
    openFilesLesson,
    initiativeLesson,
    synthesisLesson,
  ],
};
