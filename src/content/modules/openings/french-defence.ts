import type { Lesson } from "../../types";
import { frenchDefence } from "../../openings/french-defence";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// French Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/french-defence.ts); the prose here is original.
export const frenchDefenceLesson: Lesson = {
  id: "french-defence",
  title: "French Defence",
  summary:
    "1.e4 e6 — a solid, resilient reply that strikes back with ...d5 and ...c5.",
  activities: [
    buildConcept(frenchDefence),
    buildReplay(frenchDefence, {
      id: "french-defence-main",
      title: "The Advance Variation, move by move",
      blurb: "Step through the French Advance main line.",
      intro:
        "The French begins 1.e4 e6. Let's walk through the Advance Variation, " +
        "where White pushes e5 and Black counters with the ...c5 break.",
    }),
    buildOpeningDrill(frenchDefence, {
      id: "french-defence-recall",
      title: "Play it: the French as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the French as Black. Make the moves of the Advance " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the French Advance: a solid wall and the ...c5 " +
        "break already pressuring White's centre.",
    }),
    buildReplay(frenchDefence, {
      id: "french-defence-var",
      title: "The Winawer Variation",
      blurb: "The sharpest French main line.",
      lineIdx: 1,
      intro:
        "The Winawer is the French at its most combative: Black pins with " +
        "...Bb4 and trades it for White's knight, unbalancing the pawns. Step " +
        "through the main line.",
    }),
    buildReplay(frenchDefence, {
      id: "french-defence-var2",
      title: "The Classical Variation",
      blurb: "Developing with ...Nf6 and ...Be7.",
      lineIdx: 2,
      intro:
        "In the Classical, Black develops naturally with ...Nf6 and ...Be7, " +
        "accepting the tension in the centre. Step through this solid, " +
        "well-tested main line.",
    }),
    buildReplay(frenchDefence, {
      id: "french-defence-var3",
      title: "The Tarrasch Variation",
      blurb: "White's flexible 3.Nd2.",
      lineIdx: 3,
      intro:
        "With 3.Nd2, White keeps the pawns intact and sidesteps the pin of the " +
        "Winawer. Step through how Black responds to the flexible Tarrasch " +
        "Variation.",
    }),
  ],
};
