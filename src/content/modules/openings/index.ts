// "Chess Openings" module — a systematic, opening-by-opening catalog. Each
// opening gets a guided main line, an ideas quiz/sort, a guess-the-move drill,
// and (where a sound one exists) an engine-verified tactic. Move sequences are
// derived from the shared opening data in `src/content/openings/`, which the
// future standalone openings trainer will also read.
//
// All prose is original; all lines are standard public opening theory; every
// puzzle is engine-verified by `npm run validate`.

import type { Lesson, Module } from "../../types";
import { italianLesson } from "./italian";
import { ruyLopezLesson } from "./ruy-lopez";
import { scotchGameLesson } from "./scotch-game";
import { sicilianDefenceLesson } from "./sicilian-defence";
import { frenchDefenceLesson } from "./french-defence";
import { caroKannLesson } from "./caro-kann";
import { queensGambitDeclinedLesson } from "./queens-gambit-declined";
import { slavDefenceLesson } from "./slav-defence";
import { kingsIndianLesson } from "./kings-indian";
import { nimzoIndianLesson } from "./nimzo-indian";
import { londonSystemLesson } from "./london-system";
import { englishOpeningLesson } from "./english-opening";

// Short, catalog-specific framing (the openings taxonomy) — distinct from the
// Intermediate module's coverage of general opening principles.
const overviewLesson: Lesson = {
  id: "openings-overview",
  title: "How this course works",
  summary: "Openings are grouped by White's first move and judged by their plans.",
  activities: [
    {
      type: "quiz",
      id: "openings-families",
      title: "The opening families",
      blurb: "How openings are grouped.",
      question:
        "Openings are usually grouped by White's first move. Which pair are both 'King's Pawn' openings?",
      options: [
        "1.e4 e5 (Open Games) and the Sicilian (1.e4 c5).",
        "The Queen's Gambit and the Slav Defence.",
        "The English Opening and the Réti Opening.",
      ],
      correctIndex: 0,
      explanation:
        "Everything that starts with 1.e4 is a King's Pawn opening. 1.d4 openings " +
        "(like the Queen's Gambit) are Queen's Pawn openings, and 1.c4 / 1.Nf3 " +
        "are flank openings. This course is grouped the same way.",
    },
  ],
};

export const openings: Module = {
  id: "openings",
  title: "Chess Openings",
  description:
    "Meet the most important chess openings — their ideas, plans, and key lines — then drill them move by move.",
  level: "Advanced",
  lessons: [
    overviewLesson,
    // 1.e4 e5 — the Open Games
    italianLesson,
    ruyLopezLesson,
    scotchGameLesson,
    // Other 1.e4 defences
    sicilianDefenceLesson,
    frenchDefenceLesson,
    caroKannLesson,
    // 1.d4 openings
    queensGambitDeclinedLesson,
    slavDefenceLesson,
    kingsIndianLesson,
    nimzoIndianLesson,
    londonSystemLesson,
    // Flank
    englishOpeningLesson,
  ],
};
