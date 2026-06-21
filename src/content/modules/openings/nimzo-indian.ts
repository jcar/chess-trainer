import type { Lesson } from "../../types";
import { nimzoIndian } from "../../openings/nimzo-indian";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Nimzo-Indian Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/nimzo-indian.ts); the prose here is original.
export const nimzoIndianLesson: Lesson = {
  id: "nimzo-indian",
  title: "Nimzo-Indian Defence",
  summary:
    "1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 — pin the knight and fight for the e4-square.",
  activities: [
    buildConcept(nimzoIndian),
    buildReplay(nimzoIndian, {
      id: "nimzo-indian-main",
      title: "The Rubinstein, move by move",
      blurb: "Step through the solid Rubinstein main line.",
      intro:
        "The Nimzo-Indian begins 1.d4 Nf6 2.c4 e6 3.Nc3 Bb4. Let's walk " +
        "through the calm Rubinstein handling, where both sides develop and " +
        "the fight for the centre takes shape.",
    }),
    {
      type: "quiz",
      id: "nimzo-indian-idea",
      title: "Why ...Bb4?",
      blurb: "The point of the pin.",
      question: "What is the main idea behind Black's bishop move 3...Bb4 in the Nimzo-Indian?",
      options: [
        "To pin the c3-knight and fight for control of the e4-square.",
        "To threaten an immediate checkmate against White on the c3-square.",
        "To win White's undefended c4-pawn by force in a few moves.",
      ],
      correctIndex: 0,
      explanation:
        "The bishop pins the c3-knight, weakening White's grip on e4. If White " +
        "ever captures the bishop, Black is happy to leave White with doubled, " +
        "vulnerable pawns in return for the dark-squared bishop.",
    },
    {
      type: "sort",
      id: "nimzo-indian-aim",
      title: "Which knight is pinned?",
      blurb: "Read the pin.",
      prompt: "Black's bishop has gone to b4. Which White knight does it pin?",
      fen: nimzoIndian.tabiyaFen,
      orientation: "white",
      options: [
        { label: "The c3-knight" },
        { label: "The f3-knight" },
        { label: "The g1-knight" },
      ],
      correctIndex: 0,
      explanation:
        "The bishop on b4 pins the knight on c3 against the king on e1, so the " +
        "knight cannot move without exposing the king — and its control of e4 " +
        "is loosened.",
    },
    buildOpeningDrill(nimzoIndian, {
      id: "nimzo-indian-recall",
      title: "Play it: the Nimzo as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Nimzo-Indian as Black. Make the moves of the " +
        "Rubinstein main line — drag or tap a piece, and use Show me if you " +
        "get stuck.",
      successText:
        "Well played — that's the Rubinstein: a sound pin, a fight for e4, and " +
        "a flexible, solid position.",
    }),
    buildReplay(nimzoIndian, {
      id: "nimzo-indian-var",
      title: "The Classical Qc2 line",
      blurb: "Defending c3 in advance with the queen.",
      lineIdx: 1,
      intro:
        "White can support the c3-knight ahead of time with Qc2, keeping the " +
        "pawns healthy after a trade on c3. Step through the Classical " +
        "variation.",
    }),
  ],
};
