import type { Lesson } from "../../types";
import { englishOpening } from "../../openings/english-opening";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// English Opening lesson. Move sequences come from the shared opening data
// (src/content/openings/english-opening.ts); the prose here is original.
export const englishOpeningLesson: Lesson = {
  id: "english-opening",
  title: "English Opening",
  summary:
    "1.c4 — controlling the centre from the flank and fighting for d5.",
  activities: [
    buildConcept(englishOpening),
    buildReplay(englishOpening, {
      id: "english-opening-main",
      title: "The Symmetrical English, move by move",
      blurb: "Step through the Symmetrical main line.",
      intro:
        "The English begins 1.c4. Let's walk through the Symmetrical " +
        "variation, where both sides fianchetto and contest the centre from " +
        "the flank.",
    }),
    buildOpeningDrill(englishOpening, {
      id: "english-opening-recall",
      title: "Play it: the English as White",
      blurb: "Reproduce the Symmetrical main line move by move.",
      learnerColor: "white",
      intro:
        "Your turn to play the English as White. Make the moves of the " +
        "Symmetrical main line — drag or tap a piece, and use Show me if you " +
        "get stuck.",
      successText:
        "Well played — that's the Symmetrical English: a flank grip on the " +
        "centre, a fianchettoed bishop, and a flexible, healthy position.",
    }),
    buildReplay(englishOpening, {
      id: "english-opening-var",
      title: "The Reversed Sicilian",
      blurb: "When Black grabs the centre with ...e5.",
      lineIdx: 1,
      intro:
        "If Black answers 1.c4 with 1...e5, the game becomes a Sicilian with " +
        "the colours reversed and White a tempo up. Step through the Reversed " +
        "Sicilian.",
    }),
  ],
};
