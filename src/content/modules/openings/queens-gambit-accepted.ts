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
    {
      type: "quiz",
      id: "queens-gambit-accepted-idea",
      title: "Why take on c4?",
      blurb: "The real point of accepting.",
      question:
        "After 2...dxc4, what is Black's real plan with the extra pawn?",
      options: [
        "Trade queens at once to defuse the position.",
        "Develop freely and play a timely ...c5, giving the pawn back if needed.",
        "Cling to the extra pawn on c4 at all costs.",
      ],
      correctIndex: 1,
      explanation:
        "The c4-pawn is hard to hold, so Black doesn't try. The point of " +
        "accepting is fast, free development and a quick ...c5 break — the pawn " +
        "is happily returned for an easy game.",
    },
    {
      type: "sort",
      id: "queens-gambit-accepted-aim",
      title: "What is Black after?",
      blurb: "Read Black's plan.",
      prompt: "After 2...dxc4, what is Black's real plan?",
      fen: queensGambitAccepted.tabiyaFen,
      orientation: "white",
      options: [
        { label: "Develop freely, give the pawn back if needed" },
        { label: "Hold the pawn at all costs" },
        { label: "Trade queens at once" },
      ],
      correctIndex: 0,
      explanation:
        "Black grabs c4 as a loan, not a prize — the aim is quick development " +
        "and the freeing ...c5 break, returning the pawn when it suits.",
    },
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
