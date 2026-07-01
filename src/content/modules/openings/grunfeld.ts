import type { Lesson } from "../../types";
import { grunfeld } from "../../openings/grunfeld";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Grünfeld Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/grunfeld.ts); the prose here is original.
export const grunfeldLesson: Lesson = {
  id: "grunfeld",
  title: "Grünfeld Defence",
  summary:
    "1.d4 Nf6 2.c4 g6 3.Nc3 d5 — invite the big centre, then attack it.",
  activities: [
    buildConcept(grunfeld),
    buildReplay(grunfeld, {
      id: "grunfeld-main",
      title: "The Exchange Variation, move by move",
      blurb: "Step through the main line of the Grünfeld.",
      intro:
        "The Grünfeld begins 1.d4 Nf6 2.c4 g6 3.Nc3 d5. Let's walk through the " +
        "Exchange Variation, where White grabs the centre and Black takes aim.",
    }),
    buildOpeningDrill(grunfeld, {
      id: "grunfeld-recall",
      title: "Play it: the Grünfeld as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Grünfeld as Black. Make the moves of the " +
        "Exchange Variation — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Grünfeld: you let White build the centre, " +
        "and now the g7-bishop and ...c5 are tearing into it.",
    }),
    buildReplay(grunfeld, {
      id: "grunfeld-var",
      title: "The Russian System",
      blurb: "White's queen sortie to b3.",
      lineIdx: 1,
      intro:
        "A major alternative is the Russian System, where White's queen jumps to " +
        "b3 to pressure d5. Step through this important line.",
    }),
  ],
};
