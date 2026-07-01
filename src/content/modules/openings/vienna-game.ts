import type { Lesson } from "../../types";
import { viennaGame } from "../../openings/vienna-game";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Vienna Game lesson. Move sequences come from the shared opening data
// (src/content/openings/vienna-game.ts); the prose here is original.
export const viennaGameLesson: Lesson = {
  id: "vienna-game",
  title: "Vienna Game",
  summary:
    "1.e4 e5 2.Nc3 — develop the knight first and keep f4 in reserve.",
  activities: [
    buildConcept(viennaGame),
    buildReplay(viennaGame, {
      id: "vienna-game-main",
      title: "The quiet main line, move by move",
      blurb: "A calm, Italian-like build-up.",
      intro:
        "The Vienna starts 1.e4 e5 2.Nc3 — developing while keeping the f-pawn " +
        "free to advance later. Step through the calm, principled version.",
    }),
    buildOpeningDrill(viennaGame, {
      id: "vienna-game-recall",
      title: "Play it: the Vienna as White",
      blurb: "Reproduce the quiet main line.",
      learnerColor: "white",
      intro:
        "Your turn to play the Vienna as White. Make the moves of the quiet " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Nicely done — that's the Vienna: knight to c3, bishop to c4, and a " +
        "comfortable Italian-like game with the f4 break in reserve.",
    }),
    buildReplay(viennaGame, {
      id: "vienna-game-gambit",
      title: "The Vienna Gambit",
      blurb: "Strike with f4.",
      lineIdx: 1,
      intro:
        "Because the knight guards e4, White can strike with f4. The Vienna " +
        "Gambit offers sharp, attacking play — step through the critical line.",
    }),
  ],
};
