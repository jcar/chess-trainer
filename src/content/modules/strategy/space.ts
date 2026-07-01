// Chess Strategy — Lesson 7: Space & Prophylaxis. Original prose.

import type { Lesson } from "../../types";

export const spaceLesson: Lesson = {
  id: "space",
  title: "Space & Prophylaxis",
  summary:
    "More space means more room for your pieces — but watch the enemy's plans before you push.",
  activities: [
    {
      type: "concept",
      id: "space-concept",
      title: "Space & prophylaxis",
      blurb: "More room — used carefully.",
      body:
        "A space advantage means freedom of movement: your pieces regroup easily while the cramped side's pieces trip over each other. The flip side is that the cramped player wants to trade, since each exchange frees up squares for the pieces that remain.\n\nGaining space means pushing pawns, but pawns can't move backward — push too far and they overextend, leaving holes behind them. That's where prophylaxis comes in: before charging ahead, ask what the opponent wants and quietly take it away.",
      points: [
        "Space gives your pieces room; cramp the enemy.",
        "More space? Keep pieces on. Short on space? Trade pieces for breathing room.",
        "Beware the dark side of space — push too far and you leave holes behind.",
        "Block before you punch: stop the enemy's break before launching your own.",
      ],
      diagrams: [
        {
          fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R b KQkq - 0 6",
          orientation: "white",
          caption:
            "White's pawns on c4/d4/e3 grant more central space; Black's pieces are bunched and short of squares. The cramped side will look to trade — each swap frees the pieces that remain.",
        },
      ],
    },
    {
      type: "replay",
      id: "space-demo",
      title: "The big squeeze",
      blurb: "Clamping the position.",
      orientation: "white",
      eval: true,
      source: "English Opening",
      intro:
        "Watch White grab space with a queenside pawn clamp, leaving Black's " +
        "pieces with almost nowhere to go. Space rarely spikes the eval — its value " +
        "is the cramped, planless position it forces on the other side.",
      steps: [
        { san: "c4", note: "White stakes a claim on the queenside straight away." },
        { san: "e5", note: "Black grabs a share of the centre." },
        { san: "Nc3", note: "A developing move that supports a later d-pawn or b-pawn push." },
        { san: "Nf6", note: "Black develops naturally." },
        { san: "Nf3", note: "Eyeing e5 and preparing to fight for the centre." },
        { san: "Nc6", note: "Defending the e5-pawn." },
        { san: "a3", note: "Quiet but useful — it prepares to expand with b4." },
        { san: "d6", note: "Black props up the centre but stays passive." },
        { san: "b4", note: "The clamp begins: White gains queenside space." },
        { san: "Be7", note: "Black just develops; there's no easy break in sight." },
        { san: "b5", note: "The squeeze tightens — the knight on c6 is shoved back." },
        { san: "Nb8", keyIdea: "Space cramps the enemy pieces", highlights: ["b5", "c4"], note: "The knight retreats home. White's space advantage is real and lasting." },
      ],
    },
    {
      type: "guessMove",
      id: "space-guess",
      title: "Guess the Move: grab the space",
      blurb: "Predict the moves that annex territory.",
      orientation: "white",
      source: "King's Indian Defence",
      intro:
        "You're White. Predict the moves. The thread: stake out the centre, then clamp — with more space, you'll keep pieces on and let the cramp do the work.",
      moves: [
        "d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6", "Nf3", "O-O", "Be2", "e5", "d5",
      ],
      guessAt: [6, 12],
      notes: [
        undefined, undefined, undefined, undefined, undefined, undefined,
        "Build the broad centre — claiming territory and freedom of movement before Black is set up.",
        undefined, undefined, undefined, undefined, undefined,
        "Clamp! Pushing past gains queenside space and locks the centre. With more room, you avoid trades and squeeze.",
      ],
      successText:
        "Centre staked, space clamped: now the cramped side strains for room while your pieces glide behind the pawns.",
    },
    {
      type: "plan",
      id: "space-plan-apply",
      title: "Find the plan, then convert",
      blurb: "Use the squeeze, then win.",
      fen: "5rk1/5ppp/8/1PpP4/2P5/8/5PPP/2R1R1K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "Your queenside pawns clamp the position and you're up material. What's the plan?",
      options: [
        "Keep the clamp, use the open file your space created, and convert the extra material.",
        "Rush every pawn forward as fast as possible.",
        "Trade all the rooks to reach a pawn ending.",
      ],
      correctIndex: 0,
      explanation:
        "Space plus an extra exchange is decisive. Don't overpush the pawns (that's the dark side of space) — use the room and the open file to invade and convert.",
      convert: {
        kind: "drill",
        drill: {
          fen: "5rk1/5ppp/8/1PpP4/2P5/8/5PPP/2R1R1K1 w - - 0 1",
          orientation: "white",
          objective: "checkmate",
          engineSkill: 2,
          instructions:
            "White to play. Use your space and the open file to invade with the rooks and convert the extra material into checkmate.",
          successText: "Converted — space plus material is an easy squeeze.",
        },
      },
    },
  ],
};
