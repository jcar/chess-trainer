import type { Lesson } from "../../types";
import { frenchDefence } from "../../openings/french-defence";
import { buildReplay, buildOpeningDrill } from "../../openings";

// French Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/french-defence.ts); the prose here is original.
export const frenchDefenceLesson: Lesson = {
  id: "french-defence",
  title: "French Defence",
  summary:
    "1.e4 e6 — a solid, resilient reply that strikes back with ...d5 and ...c5.",
  activities: [
    buildReplay(frenchDefence, {
      id: "french-defence-main",
      title: "The Advance Variation, move by move",
      blurb: "Step through the French Advance main line.",
      intro:
        "The French begins 1.e4 e6. Let's walk through the Advance Variation, " +
        "where White pushes e5 and Black counters with the ...c5 break.",
    }),
    {
      type: "quiz",
      id: "french-defence-idea",
      title: "Why the French?",
      blurb: "The trade-off Black accepts.",
      question: "What is the main idea behind meeting 1.e4 with 1...e6?",
      options: [
        "Black accepts a cramped game for a solid, resilient structure.",
        "Black wins material in the opening by force after ...d5.",
        "Black avoids all pawn-structure weaknesses entirely in this line.",
      ],
      correctIndex: 0,
      explanation:
        "The French gives Black a touch less space, but the pawn wall is very " +
        "hard to break down. Black happily defends and then counterattacks " +
        "White's centre with ...c5.",
    },
    {
      type: "sort",
      id: "french-defence-aim",
      title: "The freeing break",
      blurb: "Spot the key pawn move.",
      prompt: "What is Black's typical freeing pawn-break in the French?",
      fen: frenchDefence.tabiyaFen,
      orientation: "white",
      options: [{ label: "c5" }, { label: "h5" }, { label: "a5" }],
      correctIndex: 0,
      explanation:
        "...c5 strikes at the base of White's pawn chain on d4. It frees Black's " +
        "game and is the thematic counterattack in almost every French line.",
    },
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
  ],
};
