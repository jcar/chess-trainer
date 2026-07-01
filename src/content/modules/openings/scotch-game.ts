import type { Lesson } from "../../types";
import { scotchGame } from "../../openings/scotch-game";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Scotch Game lesson. Move sequences come from the shared opening data
// (src/content/openings/scotch-game.ts); the prose here is original.
export const scotchGameLesson: Lesson = {
  id: "scotch-game",
  title: "Scotch Game",
  summary:
    "1.e4 e5 2.Nf3 Nc6 3.d4 — open the centre at once for fast, active piece play.",
  activities: [
    buildConcept(scotchGame),
    buildReplay(scotchGame, {
      id: "scotch-game-main",
      title: "The Scotch, move by move",
      blurb: "Step through the 4...Nf6 main line.",
      intro:
        "The Scotch begins 1.e4 e5 2.Nf3 Nc6 3.d4. Let's walk through the main " +
        "line, where White opens the centre and both sides develop into a clear, " +
        "open game.",
    }),
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
