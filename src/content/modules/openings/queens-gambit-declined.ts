import type { Lesson } from "../../types";
import { queensGambitDeclined } from "../../openings/queens-gambit-declined";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Queen's Gambit Declined lesson. Move sequences come from the shared opening
// data (src/content/openings/queens-gambit-declined.ts); the prose is original.
export const queensGambitDeclinedLesson: Lesson = {
  id: "queens-gambit-declined",
  title: "Queen's Gambit Declined",
  summary:
    "1.d4 d5 2.c4 e6 — declining the gambit with a solid, classical wall.",
  activities: [
    buildConcept(queensGambitDeclined),
    buildReplay(queensGambitDeclined, {
      id: "queens-gambit-declined-main",
      title: "The QGD, move by move",
      blurb: "Step through the classical main line.",
      intro:
        "The Queen's Gambit Declined begins 1.d4 d5 2.c4 e6. Let's walk through " +
        "the classical main line where Black builds a sturdy wall and unravels " +
        "patiently.",
    }),
    buildOpeningDrill(queensGambitDeclined, {
      id: "queens-gambit-declined-recall",
      title: "Play it: the QGD as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the QGD as Black. Make the moves of the classical " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the classical QGD: a sturdy wall, safe king, and " +
        "a plan to free the position with ...b6 and ...Bb7.",
    }),
    buildReplay(queensGambitDeclined, {
      id: "queens-gambit-declined-var",
      title: "The Exchange Variation",
      blurb: "Clarifying the centre with cxd5.",
      lineIdx: 1,
      intro:
        "White can release the central tension early with cxd5. Step through the " +
        "Exchange Variation and see how the structures fix.",
    }),
    buildReplay(queensGambitDeclined, {
      id: "queens-gambit-declined-var2",
      title: "Facing the Catalan",
      blurb: "Meeting White's kingside fianchetto.",
      lineIdx: 2,
      intro:
        "When White fianchettoes with g3 and Bg2, the long diagonal bears down " +
        "on Black's queenside. Step through a sound way to meet the Catalan " +
        "set-up.",
    }),
    {
      type: "puzzle",
      id: "qgd-elephant",
      title: "The Elephant Trap",
      blurb: "Greedy pawn-grabbing punished.",
      fen: "r1bqkb1r/pppn1ppp/5n2/3N2B1/3P4/8/PP2PPPP/R2QKBNR b KQkq - 0 6",
      orientation: "black",
      goal: { type: "win-material", minGain: 2 },
      prompt:
        "White just grabbed a pawn with Nxd5?? — but it loses a piece. Black to " +
        "play.",
      hints: [
        "Capture the knight. If White tries Bxd8, you have a zwischenzug.",
        "After ...Nxd5, the threat of ...Bb4+ wins the queen back with interest.",
      ],
      successText:
        "...Nxd5! wins a clean piece: if White grabs the queen with Bxd8, then " +
        "...Bb4+! forces Qd2 Bxd2+ Kxd2 Kxd8 and Black emerges a piece up. The " +
        "Elephant Trap.",
      solution: ["f6d5"],
    },
  ],
};
