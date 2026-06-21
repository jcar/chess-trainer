import type { Lesson } from "../../types";
import { grunfeld } from "../../openings/grunfeld";
import { buildReplay, buildOpeningDrill } from "../../openings";

// Grünfeld Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/grunfeld.ts); the prose here is original.
export const grunfeldLesson: Lesson = {
  id: "grunfeld",
  title: "Grünfeld Defence",
  summary:
    "1.d4 Nf6 2.c4 g6 3.Nc3 d5 — invite the big centre, then attack it.",
  activities: [
    buildReplay(grunfeld, {
      id: "grunfeld-main",
      title: "The Exchange Variation, move by move",
      blurb: "Step through the main line of the Grünfeld.",
      intro:
        "The Grünfeld begins 1.d4 Nf6 2.c4 g6 3.Nc3 d5. Let's walk through the " +
        "Exchange Variation, where White grabs the centre and Black takes aim.",
    }),
    {
      type: "quiz",
      id: "grunfeld-idea",
      title: "What's Black's plan?",
      blurb: "The hypermodern idea.",
      question: "What is Black's main idea in the Grünfeld Defence?",
      options: [
        "Black tries to prevent any White centre from forming.",
        "Black lets White build a big centre, then attacks it with the g7-bishop and ...c5.",
        "Black aims for a symmetric structure.",
      ],
      correctIndex: 1,
      explanation:
        "The Grünfeld is hypermodern: Black invites White to occupy the centre " +
        "with pawns, then undermines it with the fianchettoed bishop and the " +
        "...c5 break, turning White's space into a target.",
    },
    {
      type: "sort",
      id: "grunfeld-aim",
      title: "Allow, then attack",
      blurb: "Name the Grünfeld plan.",
      prompt: "What does Black allow, then target, in the Grünfeld?",
      fen: grunfeld.tabiyaFen,
      orientation: "white",
      options: [
        { label: "A big White centre, then attacks it" },
        { label: "An early queen trade" },
        { label: "A symmetrical pawn structure" },
      ],
      correctIndex: 0,
      explanation:
        "Black deliberately lets White build a broad pawn centre, then strikes " +
        "it with the g7-bishop and ...c5 — space for activity, the hypermodern way.",
    },
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
