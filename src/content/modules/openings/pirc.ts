import type { Lesson } from "../../types";
import { pirc } from "../../openings/pirc";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Pirc Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/pirc.ts); the prose here is original.
export const pircLesson: Lesson = {
  id: "pirc",
  title: "Pirc Defence",
  summary:
    "1.e4 d6 2.d4 Nf6 3.Nc3 g6 — fianchetto, castle, and hit the centre later.",
  activities: [
    buildConcept(pirc),
    buildReplay(pirc, {
      id: "pirc-main",
      title: "The Classical Variation, move by move",
      blurb: "Step through the Pirc Classical main line.",
      intro:
        "The Pirc begins 1.e4 d6 2.d4 Nf6 3.Nc3 g6. Let's walk through the " +
        "Classical, where Black fianchettoes, castles, and prepares to strike " +
        "back.",
    }),
    {
      type: "quiz",
      id: "pirc-idea",
      title: "What is Black doing?",
      blurb: "The hypermodern plan.",
      question: "What is Black's plan in the Pirc Defence?",
      options: [
        "Black trades queens early.",
        "Black tries to stop White occupying the centre at all.",
        "Black gives White a big centre, fianchettoes, and strikes back later with ...e5 or ...c5.",
      ],
      correctIndex: 2,
      explanation:
        "The Pirc is hypermodern: Black allows the broad centre, fianchettoes " +
        "the bishop to g7, castles, and then counterattacks the centre with a " +
        "well-timed ...e5 or ...c5.",
    },
    {
      type: "sort",
      id: "pirc-aim",
      title: "The Pirc set-up",
      blurb: "Spot the plan.",
      prompt: "What is the Pirc setup for Black?",
      fen: pirc.tabiyaFen,
      orientation: "white",
      options: [
        { label: "Fianchetto ...g6/...Bg7, hit the centre later" },
        { label: "Occupy the centre with pawns first" },
        { label: "Trade queens early" },
      ],
      correctIndex: 0,
      explanation:
        "Black's defining set-up is ...g6 and ...Bg7, castling behind the " +
        "fianchetto, then breaking with ...e5 or ...c5 once the time is right.",
    },
    buildOpeningDrill(pirc, {
      id: "pirc-recall",
      title: "Play it: the Pirc as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Pirc as Black. Make the moves of the Classical " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Pirc Classical: a fianchettoed bishop, a safe " +
        "king, and a position ready to counterattack the centre.",
    }),
    buildReplay(pirc, {
      id: "pirc-var",
      title: "The Austrian Attack",
      blurb: "Meeting White's most aggressive try.",
      lineIdx: 1,
      intro:
        "In the Austrian Attack, White adds f4 for a big space grab and a " +
        "possible pawn storm. Black sticks to the plan: fianchetto, castle, and " +
        "prepare the ...e5 break. Step through it.",
    }),
  ],
};
