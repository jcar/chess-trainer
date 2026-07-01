import type { Lesson } from "../../types";
import { reti } from "../../openings/reti";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Réti Opening lesson. Move sequences come from the shared opening data
// (src/content/openings/reti.ts); the prose here is original.
export const retiLesson: Lesson = {
  id: "reti",
  title: "Réti Opening",
  summary:
    "1.Nf3 d5 2.c4 — pressure the centre from the flank, with a fianchetto.",
  activities: [
    buildConcept(reti),
    buildReplay(reti, {
      id: "reti-main",
      title: "The Main Line, move by move",
      blurb: "Step through the Réti main line.",
      intro:
        "The Réti begins 1.Nf3 d5 2.c4. Let's walk through the main line, where " +
        "White fianchettoes and pressures Black's centre from the wing.",
    }),
    buildOpeningDrill(reti, {
      id: "reti-recall",
      title: "Play it: the Réti as White",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "white",
      intro:
        "Your turn to play the Réti as White. Make the moves of the main line — " +
        "drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Réti: a fianchettoed bishop pressuring the " +
        "centre from the flank and a safely castled king.",
    }),
    buildReplay(reti, {
      id: "reti-var",
      title: "The Advance (2...d4)",
      blurb: "When Black pushes past with ...d4.",
      lineIdx: 1,
      intro:
        "Black can answer 2.c4 with the space-grabbing 2...d4. White questions " +
        "the advanced pawn at once with e3. Step through it.",
    }),
  ],
};
