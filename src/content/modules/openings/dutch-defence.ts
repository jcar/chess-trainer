import type { Lesson } from "../../types";
import { dutchDefence } from "../../openings/dutch-defence";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Dutch Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/dutch-defence.ts); the prose here is original.
export const dutchDefenceLesson: Lesson = {
  id: "dutch-defence",
  title: "Dutch Defence",
  summary:
    "1.d4 f5 — stake a kingside claim and fight for the e4-square.",
  activities: [
    buildConcept(dutchDefence),
    buildReplay(dutchDefence, {
      id: "dutch-defence-main",
      title: "The Classical Dutch, move by move",
      blurb: "Step through the Classical Variation.",
      intro:
        "The Dutch begins 1.d4 f5. Let's walk through the Classical Variation, " +
        "where Black develops solidly behind the f-pawn and eyes the kingside.",
    }),
    {
      type: "quiz",
      id: "dutch-defence-idea",
      title: "Why 1...f5?",
      blurb: "The point of the move.",
      question: "What is the idea behind 1...f5 in the Dutch Defence?",
      options: [
        "It forces an early queen trade.",
        "Black stakes a kingside claim and fights for the e4-square, aiming for attacking chances.",
        "It defends the king.",
      ],
      correctIndex: 1,
      explanation:
        "With 1...f5 Black grabs kingside space and contests control of e4, " +
        "accepting a slightly looser king in exchange for an aggressive, " +
        "unbalanced game and attacking prospects.",
    },
    {
      type: "sort",
      id: "dutch-defence-aim",
      title: "Which square?",
      blurb: "Read the f5-pawn.",
      prompt: "Which central square does 1...f5 fight for?",
      fen: dutchDefence.tabiyaFen,
      orientation: "white",
      options: [{ label: "e4" }, { label: "d5" }, { label: "h4" }],
      correctIndex: 0,
      explanation:
        "The f5-pawn controls e4, a key central light square. Owning e4 is the " +
        "strategic thread running through every line of the Dutch.",
    },
    buildOpeningDrill(dutchDefence, {
      id: "dutch-defence-recall",
      title: "Play it: the Dutch as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Dutch as Black. Make the moves of the Classical " +
        "Variation — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Classical Dutch: kingside space, a grip on e4, " +
        "and a safely castled king ready to push for the initiative.",
    }),
    buildReplay(dutchDefence, {
      id: "dutch-defence-var",
      title: "The Leningrad Variation",
      blurb: "The Dutch with a kingside fianchetto.",
      lineIdx: 1,
      intro:
        "The Leningrad Variation pairs the Dutch with a King's-Indian-style " +
        "fianchetto on g7. Step through this dynamic set-up.",
    }),
  ],
};
