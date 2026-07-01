import type { Lesson } from "../../types";
import { queensGambitAccepted } from "../../openings/queens-gambit-accepted";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Queen's Gambit Accepted lesson. Move sequences come from the shared opening
// data (src/content/openings/queens-gambit-accepted.ts); the prose is original.
export const queensGambitAcceptedLesson: Lesson = {
  id: "queens-gambit-accepted",
  title: "Queen's Gambit Accepted",
  summary:
    "1.d4 d5 2.c4 dxc4 — take the pawn, develop freely, and hit back with ...c5.",
  activities: [
    buildConcept(queensGambitAccepted),
    buildReplay(queensGambitAccepted, {
      id: "queens-gambit-accepted-main",
      title: "The Queen's Gambit Accepted, move by move",
      blurb: "Step through the main line.",
      intro:
        "Black answers the Queen's Gambit by taking on c4: 1.d4 d5 2.c4 dxc4. " +
        "Let's walk through the calm main line where Black develops and breaks " +
        "with ...c5.",
    }),
    buildOpeningDrill(queensGambitAccepted, {
      id: "queens-gambit-accepted-recall",
      title: "Play it: the QGA as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Queen's Gambit Accepted as Black. Make the moves " +
        "of the main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Nicely done — pawn returned, pieces out, and the ...c5 break in: that's " +
        "the spirit of the Queen's Gambit Accepted.",
    }),
    buildReplay(queensGambitAccepted, {
      id: "queens-gambit-accepted-var",
      title: "The Central Variation (3.e4)",
      blurb: "When White grabs the whole centre.",
      lineIdx: 1,
      intro:
        "If White answers 2...dxc4 with the ambitious 3.e4, Black strikes back " +
        "in the centre immediately. Step through this sharper line.",
    }),
  ],
};
