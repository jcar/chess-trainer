// Chapter 15 — Intermediate strategy: the positional ideas behind strong moves.
// Original prose.

import type { Lesson } from "../../types";

export const ch15: Lesson = {
  id: "ch15-strategy",
  title: "13. Positional Strategy",
  summary:
    "When there's no tactic, strategy decides: where pieces belong, which files and squares matter, and how to turn small edges into wins.",
  activities: [
    {
      id: "ch15-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Choosing moves with no tactic.",
      body:
        "Most positions are quiet — no check or capture is forcing your hand. Strategy is what guides those moves: knowing where pieces belong, which squares and files matter, and how to turn a small edge into a win.\n\nWe'll cover the concrete building blocks — outposts, open files and the 7th rank, the bishop pair, the isolated queen's pawn, and smart trading — then you'll choose plans on real positions.",
      points: [
        "Strategy decides the quiet, non-forcing moves.",
        "Outposts, open files, bishop pair, IQP, good trades.",
        "Always play with a plan.",
      ],
    },
    {
      id: "ch15-strategy-concept",
      type: "concept",
      title: "When there's no tactic, strategy decides",
      blurb: "Play for small, lasting edges.",
      body:
        "Most moves in a game aren't forced — there's no check or capture demanding attention. In those quiet moments, strategy decides the game: knowing where your pieces belong, which files and squares matter, and how to nurse a small edge until it becomes a win.\n\nThe diagram shows the most coveted square in chess: a knight outpost. The knight on d5 is guarded by the e4-pawn, and no black pawn can ever attack it — so it sits there dominating, untouchable. Outposts, rooks on open files and the 7th rank, and structures like the isolated queen's pawn are the building blocks. The bishop pair matters too: a lone bishop only ever covers one color, so keeping both — especially in an open position — is a lasting edge. And the isolated queen's pawn is double-edged: its owner attacks with the extra space and outposts, while the defender blockades it and steers toward an endgame where it's simply weak. Above all, have a plan: find the imbalances and ask, 'What's my worst piece, and how do I improve it?'",
      points: [
        "Outposts, open files, and the 7th rank are where pieces come alive.",
        "Trade with a reason: simplify when ahead, free a cramped position.",
        "A move without a plan is wasted — target a weakness or fix your worst piece.",
      ],
      diagrams: [
        {
          fen: "6k1/pp3ppp/8/3N4/4P3/8/PP3PPP/6K1 w - - 0 1",
          orientation: "white",
          caption: "A knight outpost: d5 is guarded by the e4-pawn and no black pawn can ever hit it. The knight dominates.",
        },
      ],
      check: {
        question: "What makes d5 an ideal outpost for the knight?",
        options: [
          "It's guarded by a pawn and no enemy pawn can attack it",
          "It's on the edge of the board with an open view",
          "It's close to White's own king for defense",
        ],
        correctIndex: 0,
        explanation:
          "An outpost is an advanced square defended by your pawn and safe from enemy pawns. A knight planted there can't be chased away and dominates the position.",
      },
    },
    {
      id: "ch15-find-plan",
      type: "plan",
      title: "Apply it: seize the file, then convert",
      blurb: "Quiet position — pick the plan, then execute it.",
      fen: "2rq1rk1/pp2bppp/2n1pn2/8/2B5/2N1PN2/PP3PPP/2RQ1RK1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "No tactic is available. The d-file is open and your pieces are ready. What is the most purposeful plan for White?",
      options: [
        "Contest and seize the open d-file, aiming to invade the back ranks with a rook.",
        "Shuffle the king back and forth and wait.",
        "Trade every piece as fast as possible, with no goal.",
      ],
      correctIndex: 0,
      explanation:
        "An open file is a highway. Double rooks (and the queen) on the d-file, fight for control, and invade — a rook that reaches the enemy's back rank can be decisive, as you'll now show.",
      convert: {
        kind: "puzzle",
        puzzle: {
          fen: "6k1/5ppp/8/8/8/8/6PP/R5K1 w - - 0 1",
          orientation: "white",
          goal: { type: "mate", inMoves: 1 },
          prompt: "Your rook owns the open file straight to the back rank. Finish in one.",
          successText:
            "Ra8# — controlling the open file delivered the rook to the back rank for mate. That's the payoff for seizing the file.",
          solution: ["a1a8"],
        },
      },
    },
    {
      id: "ch15-recap",
      type: "concept",
      title: "Recap: play with a plan",
      blurb: "Small edges, chosen on purpose.",
      body:
        "When nothing is forcing, let the position choose your move: park knights on outposts, seize open files and the 7th rank with rooks, value the bishop pair in open play, handle the IQP correctly, and trade only with a reason. Tie it together with the simplest question in chess — 'What's my worst piece, and how do I improve it?'\n\nStrategy turns into skill only over the board. Go play, and on each quiet move name your plan before you touch a piece.",
      points: [
        "Pieces come alive on outposts, open files, and the 7th rank.",
        "Trade with a purpose; respect the bishop pair and the IQP.",
        "Every quiet move: what's the plan, what's my worst piece?",
      ],
      practice: { tool: "play", label: "Play a game now" },
    },
  ],
};
