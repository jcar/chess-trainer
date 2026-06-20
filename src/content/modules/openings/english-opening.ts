import type { Lesson } from "../../types";
import { englishOpening } from "../../openings/english-opening";
import { buildReplay, buildOpeningDrill } from "../../openings";

// English Opening lesson. Move sequences come from the shared opening data
// (src/content/openings/english-opening.ts); the prose here is original.
export const englishOpeningLesson: Lesson = {
  id: "english-opening",
  title: "English Opening",
  summary:
    "1.c4 — controlling the centre from the flank and fighting for d5.",
  activities: [
    buildReplay(englishOpening, {
      id: "english-opening-main",
      title: "The Symmetrical English, move by move",
      blurb: "Step through the Symmetrical main line.",
      intro:
        "The English begins 1.c4. Let's walk through the Symmetrical " +
        "variation, where both sides fianchetto and contest the centre from " +
        "the flank.",
    }),
    {
      type: "quiz",
      id: "english-opening-idea",
      title: "Why 1.c4?",
      blurb: "The point of the flank pawn.",
      question: "What is the strategic idea behind opening with 1.c4 in the English?",
      options: [
        "It controls the centre from the flank, fighting especially for the d5-square.",
        "It occupies the centre with pawns immediately to claim the most space.",
        "It aims to trade the queens off the board at once for a quiet game.",
      ],
      correctIndex: 0,
      explanation:
        "The English fights for the centre from the side. The c4-pawn presses " +
        "on d5, and the play often resembles a Sicilian with the colours " +
        "reversed and an extra tempo for White.",
    },
    {
      type: "sort",
      id: "english-opening-aim",
      title: "Which square does c4 fight for?",
      blurb: "Read the pawn's reach.",
      prompt: "Which central square does the move 1.c4 fight for?",
      fen: englishOpening.tabiyaFen,
      orientation: "white",
      options: [
        { label: "d5" },
        { label: "e5" },
        { label: "h5" },
      ],
      correctIndex: 0,
      explanation:
        "A pawn on c4 attacks the d5-square, the central battleground of the " +
        "English. Controlling d5 is the heart of White's flank strategy.",
    },
    buildOpeningDrill(englishOpening, {
      id: "english-opening-recall",
      title: "Play it: the English as White",
      blurb: "Reproduce the Symmetrical main line move by move.",
      learnerColor: "white",
      intro:
        "Your turn to play the English as White. Make the moves of the " +
        "Symmetrical main line — drag or tap a piece, and use Show me if you " +
        "get stuck.",
      successText:
        "Well played — that's the Symmetrical English: a flank grip on the " +
        "centre, a fianchettoed bishop, and a flexible, healthy position.",
    }),
    buildReplay(englishOpening, {
      id: "english-opening-var",
      title: "The Reversed Sicilian",
      blurb: "When Black grabs the centre with ...e5.",
      lineIdx: 1,
      intro:
        "If Black answers 1.c4 with 1...e5, the game becomes a Sicilian with " +
        "the colours reversed and White a tempo up. Step through the Reversed " +
        "Sicilian.",
    }),
  ],
};
