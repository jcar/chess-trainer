// Chess Strategy — Lesson 9: Weak Pawns & Strong Pawns. Original prose.

import type { Lesson } from "../../types";

export const weakPawnsLesson: Lesson = {
  id: "weak-pawns",
  title: "Weak Pawns & Strong Pawns",
  summary:
    "Isolated, doubled, and backward pawns are targets; passed pawns are a long-term trump.",
  activities: [
    {
      type: "concept",
      id: "weak-pawns-concept",
      title: "Weak pawns & strong pawns",
      blurb: "Targets to attack, trumps to push.",
      body:
        "Some pawns are weaknesses because they can't be defended by another pawn — isolated pawns (no neighbours), backward pawns (left behind, with a hole in front), and doubled pawns. Pieces have to babysit them, which ties your forces down and hands the other side the initiative. The way to play against them is to blockade the pawn, then pile up attackers on it.\n\nOne pawn is the opposite — a trump. A passed pawn, with no enemy pawns able to stop it, threatens to queen and grows stronger as pieces come off.",
      points: [
        "Isolated, backward, and doubled pawns are targets.",
        "Play against a weak pawn: blockade the square in front, then pile on attackers.",
        "A knight is the ideal blockader — it stays active while it sits on the pawn.",
        "A passed pawn is a long-term winning trump that grows as pieces come off.",
      ],
      diagrams: [
        {
          fen: "r1bq1rk1/pp3ppp/2n1pn2/3p4/8/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 12",
          orientation: "white",
          arrows: [{ from: "d4", to: "d5" }],
          caption:
            "Black's d5-pawn is isolated — no neighbour can ever guard it. White's plan writes itself: blockade the d4-square in front of it, then attack the pawn with pieces until it falls.",
        },
      ],
    },
    {
      type: "replay",
      id: "wp-demo",
      title: "Creating a target",
      blurb: "Manufacturing a weakness.",
      orientation: "white",
      eval: true,
      source: "Queen's Gambit Declined, Exchange Variation",
      intro:
        "Watch how a series of trades and exchanges saddles Black with an " +
        "isolated pawn that White can then blockade and attack. A weakness is a " +
        "long game — the eval barely flickers while the target is fixed for keeps.",
      steps: [
        { san: "d4", note: "A solid central start." },
        { san: "d5", note: "Black answers symmetrically." },
        { san: "c4", note: "White challenges the d5-pawn — the heart of this plan." },
        { san: "e6", note: "Black supports d5 and prepares to develop." },
        { san: "Nc3", note: "Adding pressure to d5." },
        { san: "Nf6", note: "Defending the d5-pawn again." },
        { san: "cxd5", note: "White trades on d5 to fix the structure." },
        { san: "exd5", note: "Now the d5-pawn has lost its e-pawn neighbour — isolation looms." },
        { san: "Nf3", note: "Developing toward the blockade square on d4." },
        { san: "Be7", note: "Black develops, but the d5-pawn is a permanent worry." },
        { san: "Bf4", note: "Eyeing the queenside and controlling key dark squares." },
        { san: "O-O", keyIdea: "Fix the weakness, then pile on", highlights: ["d5"], note: "Black castles. The isolated d5-pawn is the target for the rest of the game." },
      ],
    },
    {
      type: "guessMove",
      id: "weak-pawns-guess",
      title: "Guess the Move: manufacture a target",
      blurb: "Predict the moves that saddle the enemy with a weak pawn.",
      orientation: "white",
      source: "Caro-Kann, Panov Attack",
      intro:
        "You're White. Predict the moves. The thread: trade in a way that leaves Black a pawn no other pawn can defend — then you'll have something to attack for the rest of the game.",
      moves: [
        "e4", "c6", "d4", "d5", "exd5", "cxd5", "c4", "Nf6", "Nc3", "Nc6", "Nf3", "e6", "cxd5",
      ],
      guessAt: [6, 12],
      notes: [
        undefined, undefined, undefined, undefined, undefined, undefined,
        "c4 strikes at d5 — the move that starts to fix Black's structure and aims to create a long-term target.",
        undefined, undefined, undefined, undefined, undefined,
        "Capture to leave Black an isolated d-pawn. It can't be defended by a pawn, so it becomes a target you blockade and attack.",
      ],
      successText:
        "You've manufactured a permanent weakness. Now the plan is timeless: blockade the square in front, then pile on the isolated pawn.",
    },
    {
      type: "plan",
      id: "weak-pawns-plan-apply",
      title: "Find the plan, then convert",
      blurb: "Target the weakness, then win.",
      fen: "5rk1/pp3ppp/8/3p4/3P4/8/PP3PPP/2R1R1K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "Black's d5-pawn is isolated and weak, and you're up material. What's the plan?",
      options: [
        "Blockade the pawn, attack it with the rooks down the file, and convert the extra material.",
        "Trade all the rooks to reach a king-and-pawn ending.",
        "Push your own d-pawn to trade the weakness off.",
      ],
      correctIndex: 0,
      explanation:
        "A weak pawn is only worth something if you attack it. Fix it, gang up on it with the rooks, and the extra exchange does the rest.",
      convert: {
        kind: "drill",
        drill: {
          fen: "5rk1/pp3ppp/8/3p4/3P4/8/PP3PPP/2R1R1K1 w - - 0 1",
          orientation: "white",
          objective: "checkmate",
          engineSkill: 2,
          instructions:
            "White to play. Pressure Black's isolated d5-pawn down the file with your rooks and convert the extra material into checkmate.",
          successText: "Converted — the weak pawn tied Black down while the extra force decided it.",
        },
      },
    },
  ],
};
