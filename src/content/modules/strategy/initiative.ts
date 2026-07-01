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
        "The initiative is dictating the tempo: force the opponent to react to you.",
        "Open the position so your active pieces can strike.",
        "Don't waste time grabbing pawns; keep developing.",
        "Dynamic edges (a development lead, an exposed king) are fleeting and must be cashed in fast; static edges (a weak enemy pawn, the bishop pair) keep their value over time.",
      ],
      diagrams: [
        {
          fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1",
          orientation: "white",
          caption:
            "Both sides have developed quickly. Whoever castles and opens a line first gets the initiative — the right to make threats while the other side scrambles to respond.",
        },
      ],
    },
    {
      type: "replay",
      id: "init-demo",
      title: "Punishing slow play",
      blurb: "One side dawdles and pays.",
      orientation: "white",
      eval: true,
      source: "Légal's Mate",
      intro:
        "When one side wanders off to grab material instead of developing, the " +
        "better-developed side strikes. Watch fast play overwhelm a lazy setup — " +
        "and the eval bar swing from level to mate.",
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
          keyIdea: "Cash the lead before they catch up",
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
    {
      type: "guessMove",
      id: "initiative-guess",
      title: "Guess the Move: invest for the lead",
      blurb: "Predict the moves that buy time with development.",
      orientation: "white",
      source: "Scotch Gambit",
      intro:
        "You're White. Predict the moves. The thread: when you're developing faster, time beats material — a pawn is a fair price for getting all your pieces out and active first.",
      moves: [
        "e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Bc5", "c3", "dxc3", "Nxc3",
      ],
      guessAt: [6, 10],
      notes: [
        undefined, undefined, undefined, undefined, undefined, undefined,
        "Develop instead of recapturing! Offering the d4-pawn to get pieces out fast — a lead in development is worth more than a pawn here.",
        undefined, undefined, undefined,
        "Recapture by developing a piece, not a pawn — every move brings a new attacker toward Black's king while Black is still catching up.",
      ],
      successText:
        "You traded a pawn for a roaring lead in development. Now use it fast — open lines and make threats before Black untangles.",
    },
    {
      type: "plan",
      id: "initiative-plan-apply",
      title: "Find the plan, then convert",
      blurb: "Press the activity, then win.",
      fen: "5rk1/ppp2ppp/2n5/8/2B1P3/8/PPP2PPP/2R1R1K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "Your pieces are active, you own the open file, and you're up material. What's the plan?",
      options: [
        "Keep the initiative — invade with the rooks and active bishop, giving Black no time to consolidate — and convert.",
        "Trade everything to defuse the position.",
        "Sit tight and shuffle, conceding the initiative.",
      ],
      correctIndex: 0,
      explanation:
        "Don't let an initiative cool off. Pile your active pieces into Black's position, keep making threats, and the extra material converts itself.",
      convert: {
        kind: "drill",
        drill: {
          fen: "5rk1/ppp2ppp/2n5/8/2B1P3/8/PPP2PPP/2R1R1K1 w - - 0 1",
          orientation: "white",
          objective: "checkmate",
          engineSkill: 2,
          instructions:
            "White to play. Keep the initiative: invade with your rooks and bishop, give Black no respite, and convert into checkmate.",
          successText: "Converted — relentless activity never let Black off the hook.",
        },
      },
    },
  ],
};
