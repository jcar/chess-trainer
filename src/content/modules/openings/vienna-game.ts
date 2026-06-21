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
    {
      type: "quiz",
      id: "vienna-game-idea",
      title: "Why 2.Nc3?",
      blurb: "The point of the knight move.",
      question: "What does developing with 2.Nc3 give White in the Vienna?",
      options: [
        "It wins the e5-pawn by force.",
        "It develops a piece and supports e4, so a later f4 break doesn't drop the e-pawn with check.",
        "It threatens an immediate checkmate on f7.",
      ],
      correctIndex: 1,
      explanation:
        "2.Nc3 develops and guards e4. That's the whole idea: because e4 is " +
        "protected, White can play f4 later (the Vienna Gambit) without losing " +
        "the king's pawn to a check.",
    },
    {
      type: "sort",
      id: "vienna-game-aim",
      title: "How does White start?",
      blurb: "Spot the Vienna move.",
      prompt: "After 1.e4 e5, which move begins the Vienna Game?",
      fen: viennaGame.tabiyaFen,
      orientation: "white",
      options: [
        { label: "2.Nc3, developing the queen's knight" },
        { label: "2.Nf3, attacking e5" },
        { label: "2.Bc4, the Italian bishop" },
      ],
      correctIndex: 0,
      explanation:
        "The Vienna is defined by 2.Nc3 — developing the knight toward d5 and " +
        "keeping the f2–f4 break available.",
    },
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
