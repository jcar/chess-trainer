import type { Lesson } from "../../types";
import { italianGame } from "../../openings/italian-game";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Italian Game lesson. Move sequences come from the shared opening data
// (src/content/openings/italian-game.ts); the prose here is original.
export const italianLesson: Lesson = {
  id: "italian",
  title: "Italian Game",
  summary:
    "1.e4 e5 2.Nf3 Nc6 3.Bc4 — natural development with the bishop aimed at f7.",
  activities: [
    buildConcept(italianGame),
    buildReplay(italianGame, {
      id: "italian-main",
      title: "The quiet Italian, move by move",
      blurb: "Step through the Giuoco Pianissimo main line.",
      intro:
        "The Italian begins 1.e4 e5 2.Nf3 Nc6 3.Bc4. Let's walk through the " +
        "calm, classical handling where both sides develop and castle.",
    }),
    {
      type: "quiz",
      id: "italian-idea",
      title: "Why Bc4?",
      blurb: "The point of the Italian bishop.",
      question: "What is the point of White's bishop move 3.Bc4 in the Italian Game?",
      options: [
        "It aims at f7, the square only Black's king defends.",
        "It threatens to win Black's queen with a discovered attack.",
        "It stops Black from castling on the kingside entirely.",
      ],
      correctIndex: 0,
      explanation:
        "The bishop on c4 stares down the a2–g8 diagonal at f7. Early on, only " +
        "the king guards f7, so it is the natural target in the Italian and " +
        "many 1.e4 e5 openings.",
    },
    {
      type: "sort",
      id: "italian-aim",
      title: "Where is the bishop aiming?",
      blurb: "Read the diagonal.",
      prompt: "White's bishop sits on c4. Which Black square is it aiming at?",
      fen: italianGame.tabiyaFen,
      orientation: "white",
      options: [{ label: "f7" }, { label: "a7" }, { label: "h7" }],
      correctIndex: 0,
      explanation:
        "From c4 the bishop's diagonal runs c4–d5–e6–f7 — straight at Black's " +
        "most sensitive early square.",
    },
    buildOpeningDrill(italianGame, {
      id: "italian-recall",
      title: "Play it: the Italian as White",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "white",
      intro:
        "Your turn to play the Italian as White. Make the moves of the quiet " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Giuoco Pianissimo: smooth development and a " +
        "safely castled king.",
    }),
    buildReplay(italianGame, {
      id: "italian-classical",
      title: "The sharper d4 break",
      blurb: "Fighting for the centre with c3 and d4.",
      lineIdx: 1,
      intro:
        "If you want a livelier game, the Italian can strike in the centre with " +
        "an early c3 and d4. Step through the classical main line.",
    }),
    buildReplay(italianGame, {
      id: "italian-classical-var2",
      title: "The Evans Gambit",
      blurb: "Sacrificing a pawn for fast development.",
      lineIdx: 2,
      intro:
        "The Evans Gambit offers the b-pawn to lure Black's bishop offside and " +
        "seize the centre with a rapid c3 and d4. Step through this bold, " +
        "attacking try.",
    }),
    {
      type: "puzzle",
      id: "italian-legal-trap",
      title: "Punish the greedy bishop",
      blurb: "A famous Italian trap.",
      fen: "r2qkbnr/ppp2ppp/2np4/4N3/2B1P3/2N4P/PPPP1PP1/R1BbK2R w KQkq - 0 7",
      orientation: "white",
      goal: { type: "mate", inMoves: 2 },
      prompt:
        "Black just snatched your queen with ...Bxd1 — but it was a blunder! " +
        "White to play and mate in two.",
      hints: [
        "Black's only weak point is f7. Start with a check that drags the king out.",
        "After the king steps to e7, a quiet knight move finishes it.",
      ],
      successText:
        "The famous Légal mate! Sacrificing the queen is worth it when it leads " +
        "to a forced checkmate — the two knights and bishop weave the net.",
      solution: ["c4f7", "e8e7", "c3d5"],
    },
  ],
};
