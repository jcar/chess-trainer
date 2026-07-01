import type { Lesson } from "../../types";
import { benkoGambit } from "../../openings/benko-gambit";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Benko Gambit lesson. Move sequences come from the shared opening data
// (src/content/openings/benko-gambit.ts); the prose here is original.
export const benkoGambitLesson: Lesson = {
  id: "benko-gambit",
  title: "Benko Gambit",
  summary:
    "1.d4 Nf6 2.c4 c5 3.d5 b5 — give a pawn for lasting queenside pressure.",
  activities: [
    buildConcept(benkoGambit),
    buildReplay(benkoGambit, {
      id: "benko-gambit-main",
      title: "The Benko Accepted, move by move",
      blurb: "Step through the main line of the Benko Gambit.",
      intro:
        "The Benko begins 1.d4 Nf6 2.c4 c5 3.d5 b5. Let's walk through the " +
        "Accepted line, where Black sacrifices a pawn to open the queenside.",
    }),
    buildOpeningDrill(benkoGambit, {
      id: "benko-gambit-recall",
      title: "Play it: the Benko as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Benko Gambit as Black. Make the moves of the " +
        "Accepted line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Benko: a pawn invested, and the a- and b-files " +
        "now belong to your rooks and bishop.",
    }),
    buildReplay(benkoGambit, {
      id: "benko-gambit-var",
      title: "Declined with 4.Nf3",
      blurb: "White sidesteps the gambit.",
      lineIdx: 1,
      intro:
        "White can decline the pawn with 4.Nf3, keeping the position more " +
        "closed. Step through this practical alternative.",
    }),
  ],
};
