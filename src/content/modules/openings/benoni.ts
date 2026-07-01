import type { Lesson } from "../../types";
import { benoni } from "../../openings/benoni";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Benoni Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/benoni.ts); the prose here is original.
export const benoniLesson: Lesson = {
  id: "benoni",
  title: "Benoni Defence",
  summary:
    "1.d4 Nf6 2.c4 c5 3.d5 e6 — trade space for dynamic counterplay.",
  activities: [
    buildConcept(benoni),
    buildReplay(benoni, {
      id: "benoni-main",
      title: "The Modern Benoni, move by move",
      blurb: "Step through the main line of the Modern Benoni.",
      intro:
        "The Benoni begins 1.d4 Nf6 2.c4 c5 3.d5 e6. Let's walk through the " +
        "Modern Benoni, where Black accepts less space for active piece play.",
    }),
    buildOpeningDrill(benoni, {
      id: "benoni-recall",
      title: "Play it: the Benoni as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Benoni as Black. Make the moves of the Modern " +
        "Benoni — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Modern Benoni: less space, but a queenside " +
        "majority and a g7-bishop ready to fight.",
    }),
    buildReplay(benoni, {
      id: "benoni-var",
      title: "The Fianchetto Variation",
      blurb: "White meets the Benoni with g3.",
      lineIdx: 1,
      intro:
        "One of White's most respected tries is the Fianchetto Variation, " +
        "developing the bishop to g2. Step through this solid set-up.",
    }),
  ],
};
