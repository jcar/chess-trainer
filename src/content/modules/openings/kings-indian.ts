import type { Lesson } from "../../types";
import { kingsIndian } from "../../openings/kings-indian";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// King's Indian Defence lesson. Move sequences come from the shared opening
// data (src/content/openings/kings-indian.ts); the prose here is original.
export const kingsIndianLesson: Lesson = {
  id: "kings-indian",
  title: "King's Indian Defence",
  summary:
    "1.d4 Nf6 2.c4 g6 — hypermodern: let White build, then strike with ...e5.",
  activities: [
    buildConcept(kingsIndian),
    buildReplay(kingsIndian, {
      id: "kings-indian-main",
      title: "The King's Indian, move by move",
      blurb: "Step through the Classical Variation.",
      intro:
        "The King's Indian Defence begins 1.d4 Nf6 2.c4 g6. Let's walk through " +
        "the Classical Variation where Black fianchettoes, castles, and hits " +
        "the centre with ...e5.",
    }),
    buildOpeningDrill(kingsIndian, {
      id: "kings-indian-recall",
      title: "Play it: the KID as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the King's Indian as Black. Make the moves of the " +
        "Classical Variation — drag or tap a piece, and use Show me if you get " +
        "stuck.",
      successText:
        "Well played — that's the Classical King's Indian: fianchettoed, " +
        "castled, and striking back in the centre with ...e5.",
    }),
    buildReplay(kingsIndian, {
      id: "kings-indian-var",
      title: "The Fianchetto Variation",
      blurb: "When White fianchettoes too.",
      lineIdx: 1,
      intro:
        "White can meet the King's Indian by fianchettoing the bishop as well. " +
        "Step through the calmer, very solid Fianchetto Variation.",
    }),
    buildReplay(kingsIndian, {
      id: "kings-indian-var2",
      title: "The Sämisch Variation",
      blurb: "Building a wall with f3.",
      lineIdx: 2,
      intro:
        "With an early f3, White reinforces the centre and prepares to castle " +
        "queenside for a pawn-storm race. Step through the rugged Sämisch " +
        "Variation.",
    }),
  ],
};
