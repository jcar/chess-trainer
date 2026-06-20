import type { Lesson } from "../../types";
import { scotchGame } from "../../openings/scotch-game";
import { buildReplay, buildOpeningDrill } from "../../openings";

// Scotch Game lesson. Move sequences come from the shared opening data
// (src/content/openings/scotch-game.ts); the prose here is original.
export const scotchGameLesson: Lesson = {
  id: "scotch-game",
  title: "Scotch Game",
  summary:
    "1.e4 e5 2.Nf3 Nc6 3.d4 — open the centre at once for fast, active piece play.",
  activities: [
    buildReplay(scotchGame, {
      id: "scotch-game-main",
      title: "The Scotch, move by move",
      blurb: "Step through the 4...Nf6 main line.",
      intro:
        "The Scotch begins 1.e4 e5 2.Nf3 Nc6 3.d4. Let's walk through the main " +
        "line, where White opens the centre and both sides develop into a clear, " +
        "open game.",
    }),
    {
      type: "quiz",
      id: "scotch-game-idea",
      title: "Why 3.d4?",
      blurb: "The point of the early central break.",
      question: "What is the point of White's pawn move 3.d4 in the Scotch Game?",
      options: [
        "It opens the centre at once for fast, free piece play.",
        "It wins a clean central pawn by force in a few moves.",
        "It sets a trap that snares Black's queen on the next move.",
      ],
      correctIndex: 0,
      explanation:
        "Rather than maneuvering slowly like the Italian or Ruy Lopez, the " +
        "Scotch challenges e5 immediately. The pawns come off and the pieces get " +
        "open lines straight away — a direct, active approach.",
    },
    {
      type: "sort",
      id: "scotch-game-aim",
      title: "What does d4 strike at?",
      blurb: "Read the centre.",
      prompt: "What does White's 3.d4 strike at?",
      fen: scotchGame.tabiyaFen,
      orientation: "white",
      options: [
        { label: "The centre (e5)" },
        { label: "The black king" },
        { label: "The a7-pawn" },
      ],
      correctIndex: 0,
      explanation:
        "The pawn on d4 attacks Black's e5-pawn directly. Challenging the centre " +
        "this early is what opens the position and defines the Scotch.",
    },
    buildOpeningDrill(scotchGame, {
      id: "scotch-game-recall",
      title: "Play it: the Scotch as White",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "white",
      intro:
        "Your turn to play the Scotch as White. Make the moves of the main " +
        "line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Scotch: an open centre and active pieces from " +
        "the very start.",
    }),
    buildReplay(scotchGame, {
      id: "scotch-game-var",
      title: "The Classical Variation",
      blurb: "Black answers with the active 4...Bc5.",
      lineIdx: 1,
      intro:
        "Black's most natural reply is 4...Bc5, pointing the bishop at White's " +
        "centralized knight. Step through the Classical Variation.",
    }),
  ],
};
