// Strategy lesson 1 — evaluating a position by its imbalances and forming a plan.
// All prose original.

import type { Lesson } from "../../types";

export const imbalancesLesson: Lesson = {
  id: "imbalances",
  title: "How to Think: Imbalances & Plans",
  summary:
    "Evaluate a position by its imbalances, then make a plan that uses them.",
  activities: [
    {
      type: "concept",
      id: "imbalances-concept",
      title: "Think in imbalances",
      blurb: "How strong players size up a position.",
      body:
        "An imbalance is any way the two sides differ. Strong players don't memorize moves; they read these differences and let them point to a plan. Run the same checklist every time — the Imbalance Scan:\n\n• the minor pieces (your bishops vs their knights), • the pawn structure, • space, • material, • control of a key file or square, • a lead in development, • the initiative, • king safety. Whichever imbalance is biggest tells you which part of the board is yours and what to aim at. If you remember nothing else, just find the imbalances and try to use them.",
      points: [
        "An imbalance is any difference between the sides, not just material.",
        "The scan: minor pieces, pawns, space, material, files/squares, development, initiative, king safety.",
        "Good plans grow out of the biggest imbalance you find.",
        "A useful question when stuck: what is my worst-placed piece?",
      ],
      diagrams: [
        {
          fen: "r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
          orientation: "white",
          caption:
            "Material is dead level — so the game is decided by the quieter imbalances: who has the better minor piece, more space, the safer king, and the more active pieces.",
        },
      ],
    },
    {
      type: "replay",
      id: "imbalances-plan-demo",
      title: "Spotting the plan",
      blurb: "Turn a small edge into a clear plan.",
      orientation: "white",
      eval: true,
      source: "Italian Game",
      intro:
        "Watch a quiet opening reach a position with one clear imbalance. Notice how the edge — better development and a target — suggests the plan all by itself. Keep an eye on the eval bar: a lead in development is real, even when the score is still near level.",
      steps: [
        { san: "e4", note: "Stake a claim in the centre and open lines for the bishop and queen." },
        { san: "e5", note: "Black answers symmetrically, contesting the centre." },
        { san: "Nf3", note: "Develop with a threat to the e5-pawn." },
        { san: "Nc6", note: "Black defends e5 and develops a piece." },
        { san: "Bc4", note: "The bishop eyes f7, Black's only weakly-guarded square." },
        { san: "Nf6", note: "Black develops and counter-attacks e4." },
        { san: "d3", note: "Quietly defend e4 and keep the bishop's diagonal open." },
        { san: "Bc5", note: "Black mirrors, and both sides are ready to castle." },
        { san: "O-O", note: "White tucks the king away and connects toward the rooks." },
        { san: "d6", note: "Black props up e5 but spends a tempo doing it." },
        { san: "Bg5", note: "Pin the knight to add pressure on Black's centre." },
        {
          san: "h6",
          keyIdea: "Let the imbalance choose the plan",
          highlights: ["f7"],
          note: "Now read the imbalances: White is fully developed and castled, while Black still has loose pieces and a slightly weak f7. The plan writes itself — keep developing, pile up on the centre and f7, and use the lead in development before Black catches up.",
          arrows: [{ from: "c4", to: "f7" }],
        },
      ],
    },
    {
      type: "guessMove",
      id: "imbalances-guess",
      title: "Guess the Move: press the lead",
      blurb: "Predict the moves that turn a head start into pressure.",
      orientation: "white",
      source: "Italian Game, Giuoco Piano",
      intro:
        "You're White. Play the opening forward; at two points, predict the move before it's revealed. The thread to follow: a lead in development wants the centre opened, not kept closed.",
      moves: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d4", "exd4", "cxd4", "Bb4+", "Nc3",
      ],
      guessAt: [6, 8],
      notes: [
        undefined, undefined, undefined, undefined, undefined, undefined,
        "Quietly preparing d4 — the move that opens the centre while you're the better-developed side.",
        undefined,
        "Strike! Opening the centre is exactly what a development lead wants — closed lines would only let Black catch up.",
        undefined, undefined, undefined, undefined,
      ],
      successText:
        "That's the imbalance speaking: ahead in development, you open lines so your ready pieces outgun Black's sleeping ones.",
    },
    {
      type: "plan",
      id: "imbalances-plan-apply",
      title: "Find the plan, then convert",
      blurb: "Read the imbalances, pick the plan, and bring home the point.",
      fen: "5rk1/ppp2ppp/8/3N4/8/8/PPP2PPP/2R1R1K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "Run the imbalance scan: you're up material, you own the only open file, and your knight dominates from d5. What's the plan?",
      options: [
        "Use the open file and the strong knight together — bring a rook to the 7th and let the pieces work — then convert the extra material.",
        "Trade both rooks at once to reach a quiet knight ending.",
        "Shuffle your king and wait for Black to find a plan.",
      ],
      correctIndex: 0,
      explanation:
        "Stack your advantages: the open file is a highway for the rooks, the d5-knight is untouchable, and you're up material. Activate everything and the win plays itself.",
      convert: {
        kind: "drill",
        drill: {
          fen: "5rk1/ppp2ppp/8/3N4/8/8/PPP2PPP/2R1R1K1 w - - 0 1",
          orientation: "white",
          objective: "checkmate",
          engineSkill: 2,
          instructions:
            "White to play. Use the open file and the dominant knight to invade and convert your material edge into checkmate.",
          successText: "Converted — active pieces plus an extra exchange make the win routine.",
        },
      },
    },
  ],
};
