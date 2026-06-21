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
    {
      type: "quiz",
      id: "queens-gambit-declined-idea",
      title: "What does 'declining' mean?",
      blurb: "The idea behind ...e6.",
      question: "What does it mean to 'decline' the Queen's Gambit?",
      options: [
        "To support the d5-pawn with ...e6 instead of capturing on c4.",
        "To refuse to develop any of your pieces until later in the game.",
        "To immediately give the pawn straight back to White on the next move.",
      ],
      correctIndex: 0,
      explanation:
        "Declining means you don't take the c4-pawn. Instead, ...e6 props up the " +
        "d5-pawn, keeping a firm foothold in the centre while you develop.",
    },
    {
      type: "sort",
      id: "queens-gambit-declined-aim",
      title: "How does Black decline?",
      blurb: "Spot the supporting move.",
      prompt: "How does Black 'decline' the gambit on move 2?",
      fen: queensGambitDeclined.tabiyaFen,
      orientation: "white",
      options: [
        { label: "...e6, supporting d5" },
        { label: "...dxc4, taking the pawn" },
        { label: "...Nf6, ignoring d5" },
      ],
      correctIndex: 0,
      explanation:
        "...e6 is the classical declining move: it defends d5 with a pawn so " +
        "Black keeps a solid share of the centre.",
    },
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
