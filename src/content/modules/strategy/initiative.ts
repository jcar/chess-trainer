// Strategy lesson 12 — Development and the initiative. Original prose.

import type { Lesson } from "../../types";

export const initiativeLesson: Lesson = {
  id: "initiative",
  title: "Development & the Initiative",
  summary:
    "A lead in development is a temporary edge — use it fast, before it fades.",
  activities: [
    {
      type: "concept",
      id: "initiative-concept",
      title: "Development & the initiative",
      blurb: "A lead in development is borrowed time.",
      body:
        "A lead in development is a dynamic edge — temporary, and it fades the moment you let the opponent catch up. Every quiet move you make is a free move for them. So use it fast: open lines with pawn breaks and create threats while your pieces are out and theirs are still home.\n\nThe classic mistake is to dawdle, especially by stopping to grab a pawn. When you're ahead in development, time is worth more than material.",
      points: [
        "A development lead is temporary — act before it vanishes.",
        "Open the position so your active pieces can strike.",
        "Don't waste time grabbing pawns; keep developing.",
      ],
    },
    {
      type: "quiz",
      id: "init-temporary",
      title: "Use it or lose it",
      blurb: "The clock on a lead.",
      question: "Why must you USE a lead in development quickly?",
      options: [
        "It becomes permanent after move 10.",
        "It turns into an extra pawn automatically.",
        "It's temporary — the opponent will catch up if you delay.",
      ],
      correctIndex: 2,
      explanation:
        "Every quiet move you make lets the opponent develop another piece. A " +
        "development lead is borrowed time: open lines, create threats, and act " +
        "while your pieces are out and theirs are still home.",
    },
    {
      type: "sort",
      id: "init-open",
      title: "Open it up",
      blurb: "More pieces out = open the board.",
      prompt: "You're ahead in development. What helps you exploit it?",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 1",
      orientation: "white",
      options: [
        { label: "Open the position with pawn breaks" },
        { label: "Keep the position closed" },
      ],
      correctIndex: 0,
      explanation:
        "Open lines favour the side with more active pieces. When you're better " +
        "developed, pawn breaks rip the position open so your ready pieces reach " +
        "the enemy before he can finish developing.",
    },
    {
      type: "quiz",
      id: "init-static-dynamic",
      title: "Dynamic vs static",
      blurb: "Two kinds of advantage.",
      question: "A 'dynamic' advantage is one that...",
      options: [
        "Only matters in the endgame.",
        "Is temporary and must be used before it vanishes.",
        "Lasts forever, like a weak pawn.",
      ],
      correctIndex: 1,
      explanation:
        "Static edges (a weak enemy pawn, the bishop pair) keep their value over " +
        "time. Dynamic edges — a lead in development, an exposed king — are " +
        "fleeting: cash them in with energetic play or they evaporate.",
    },
    {
      type: "sort",
      id: "init-dont",
      title: "Don't dawdle",
      blurb: "The classic mistake.",
      prompt: "With a development lead, what should you avoid?",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
      orientation: "white",
      options: [
        { label: "Bringing rooks to open files" },
        { label: "Grabbing pawns and wasting time" },
      ],
      correctIndex: 1,
      explanation:
        "Stopping to win a pawn with an already-developed piece gives the " +
        "opponent free moves to catch up. With a lead, time is worth more than a " +
        "pawn — keep developing and attacking.",
    },
    {
      type: "replay",
      id: "init-demo",
      title: "Punishing slow play",
      blurb: "One side dawdles and pays.",
      orientation: "white",
      intro:
        "When one side wanders off to grab material instead of developing, the " +
        "better-developed side strikes. Watch fast play overwhelm a lazy setup.",
      steps: [
        { san: "e4", note: "White opens the centre." },
        { san: "e5", note: "Black replies in kind." },
        { san: "Nf3", note: "Develop with a threat to e5." },
        {
          san: "d6",
          note:
            "Black defends passively instead of developing a piece — a slow move.",
        },
        { san: "Bc4", note: "White's bishop eyes the f7 square." },
        {
          san: "Bg4",
          note: "Black pins the knight but still hasn't brought out the others.",
        },
        { san: "Nc3", note: "Another piece out — White is way ahead in development." },
        {
          san: "g6",
          note:
            "Black drifts again, weakening the kingside instead of catching up.",
        },
        {
          san: "Nxe5",
          note:
            "White strikes! The pin is broken because the bishop on g4 hangs.",
        },
        {
          san: "Bxd1",
          note:
            "Black grabs the queen — but it's a trap born of slow development.",
        },
        {
          san: "Bxf7+",
          note: "Check! The exposed king is dragged out into the open.",
        },
        {
          san: "Ke7",
          note:
            "The king must walk. Nd5# follows — fast development converted into " +
            "a mating attack while Black's pieces sat at home.",
        },
      ],
    },
  ],
};
