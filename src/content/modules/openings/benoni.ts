import type { Lesson } from "../../types";
import { benoni } from "../../openings/benoni";
import { buildReplay, buildOpeningDrill } from "../../openings";

// Benoni Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/benoni.ts); the prose here is original.
export const benoniLesson: Lesson = {
  id: "benoni",
  title: "Benoni Defence",
  summary:
    "1.d4 Nf6 2.c4 c5 3.d5 e6 — trade space for dynamic counterplay.",
  activities: [
    buildReplay(benoni, {
      id: "benoni-main",
      title: "The Modern Benoni, move by move",
      blurb: "Step through the main line of the Modern Benoni.",
      intro:
        "The Benoni begins 1.d4 Nf6 2.c4 c5 3.d5 e6. Let's walk through the " +
        "Modern Benoni, where Black accepts less space for active piece play.",
    }),
    {
      type: "quiz",
      id: "benoni-idea",
      title: "What does Black get?",
      blurb: "Space versus activity.",
      question: "What does Black accept, and what does Black get, in the Modern Benoni?",
      options: [
        "Black gets a safe, symmetric game.",
        "Black wins a clean pawn.",
        "Black accepts less space for dynamic counterplay — a queenside majority and the g7-bishop.",
      ],
      correctIndex: 2,
      explanation:
        "Black willingly cedes central space. In return Black gets a queenside " +
        "pawn majority, the fianchettoed g7-bishop, and the ...b5 break — rich, " +
        "fighting counterplay rather than a quiet equality.",
    },
    {
      type: "sort",
      id: "benoni-aim",
      title: "The Benoni bargain",
      blurb: "Name what Black gets.",
      prompt: "What does Black get in the Modern Benoni?",
      fen: benoni.tabiyaFen,
      orientation: "white",
      options: [
        { label: "Dynamic counterplay for less space" },
        { label: "A safe, symmetric game" },
        { label: "An extra pawn" },
      ],
      correctIndex: 0,
      explanation:
        "It's a trade: Black hands over central space and takes dynamic " +
        "counterplay in return — a queenside majority and an active bishop on g7.",
    },
    buildOpeningDrill(benoni, {
      id: "benoni-recall",
      title: "Play it: the Benoni as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Benoni as Black. Make the moves of the Modern " +
        "Benoni — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Modern Benoni: less space, but a queenside " +
        "majority and a g7-bishop ready to fight.",
    }),
    buildReplay(benoni, {
      id: "benoni-var",
      title: "The Fianchetto Variation",
      blurb: "White meets the Benoni with g3.",
      lineIdx: 1,
      intro:
        "One of White's most respected tries is the Fianchetto Variation, " +
        "developing the bishop to g2. Step through this solid set-up.",
    }),
  ],
};
