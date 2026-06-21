import type { Lesson } from "../../types";
import { scandinavian } from "../../openings/scandinavian";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Scandinavian Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/scandinavian.ts); the prose here is original.
export const scandinavianLesson: Lesson = {
  id: "scandinavian",
  title: "Scandinavian Defence",
  summary:
    "1.e4 d5 — challenge the king's pawn at once, then develop fast.",
  activities: [
    buildConcept(scandinavian),
    buildReplay(scandinavian, {
      id: "scandinavian-main",
      title: "The Main Line, move by move",
      blurb: "Step through the 3...Qa5 main line.",
      intro:
        "The Scandinavian begins 1.e4 d5. Let's walk through the main line, " +
        "where Black recaptures with the queen, retreats it to a5, and develops " +
        "smoothly.",
    }),
    {
      type: "quiz",
      id: "scandinavian-idea",
      title: "What is Black doing?",
      blurb: "The point of 1...d5.",
      question: "What is Black's idea in the Scandinavian Defence?",
      options: [
        "Black wins the e4-pawn for free.",
        "Black challenges e4 at once; the queen comes out early but development is quick and clear.",
        "Black forces an early queen trade.",
      ],
      correctIndex: 1,
      explanation:
        "1...d5 hits e4 immediately. After the exchange the queen does come out " +
        "early to recapture, but it is well-timed: it retreats to a safe square " +
        "and Black gets fast, easy development.",
    },
    {
      type: "sort",
      id: "scandinavian-aim",
      title: "How does Black reply?",
      blurb: "Spot the first move.",
      prompt: "How does Black answer 1.e4 in the Scandinavian?",
      fen: scandinavian.tabiyaFen,
      orientation: "white",
      options: [
        { label: "1...d5, hitting e4 at once" },
        { label: "1...e5" },
        { label: "1...c5" },
      ],
      correctIndex: 0,
      explanation:
        "The Scandinavian is defined by 1...d5, challenging White's king's pawn " +
        "on the very first move.",
    },
    buildOpeningDrill(scandinavian, {
      id: "scandinavian-recall",
      title: "Play it: the Scandinavian as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Scandinavian as Black. Make the moves of the " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Scandinavian main line: a safe queen on a5 and " +
        "quick, harmonious development.",
    }),
    buildReplay(scandinavian, {
      id: "scandinavian-var",
      title: "The Modern (2...Nf6)",
      blurb: "Recapturing with the knight instead.",
      lineIdx: 1,
      intro:
        "Instead of the queen, Black can recapture on d5 with the knight after " +
        "2...Nf6, keeping the queen at home and fianchettoing the bishop. Step " +
        "through it.",
    }),
  ],
};
