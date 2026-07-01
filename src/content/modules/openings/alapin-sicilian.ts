import type { Lesson } from "../../types";
import { alapinSicilian } from "../../openings/alapin-sicilian";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Alapin Sicilian lesson. Move sequences come from the shared opening data
// (src/content/openings/alapin-sicilian.ts); the prose here is original.
export const alapinSicilianLesson: Lesson = {
  id: "alapin-sicilian",
  title: "Alapin Sicilian (2.c3)",
  summary:
    "1.e4 c5 2.c3 — meet the Sicilian by building a big centre with d4.",
  activities: [
    buildConcept(alapinSicilian),
    buildReplay(alapinSicilian, {
      id: "alapin-sicilian-main",
      title: "vs 2...d5, move by move",
      blurb: "An easy IQP-style game.",
      intro:
        "Tired of memorizing Sicilian theory? The Alapin (2.c3) prepares d4 to " +
        "build a big centre. Against 2...d5 you reach a comfortable, open game.",
    }),
    buildOpeningDrill(alapinSicilian, {
      id: "alapin-sicilian-recall",
      title: "Play it: the Alapin as White",
      blurb: "Reproduce the 2...d5 line.",
      learnerColor: "white",
      intro:
        "Your turn to play the Alapin as White. Make the moves against 2...d5 — " +
        "drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — c3 and d4 give White a big centre and an easy, natural " +
        "game against the Sicilian.",
    }),
    buildReplay(alapinSicilian, {
      id: "alapin-sicilian-nf6",
      title: "vs 2...Nf6",
      blurb: "When Black attacks e4.",
      lineIdx: 1,
      intro:
        "Black's other main try is 2...Nf6, hitting e4. White gains space by " +
        "pushing e5 and reaches a comfortable French-like centre. Step through it.",
    }),
  ],
};
