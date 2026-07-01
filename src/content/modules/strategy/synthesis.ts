// Strategy lesson 13 — Material, sacrifice and putting it together. Original prose.

import type { Lesson } from "../../types";

export const synthesisLesson: Lesson = {
  id: "synthesis",
  title: "Material, Sacrifice & Putting It Together",
  summary:
    "Trade material for other imbalances when it pays — then convert by planning and stopping counterplay.",
  activities: [
    {
      type: "concept",
      id: "synthesis-concept",
      title: "Putting it all together",
      blurb: "Material is just one imbalance.",
      body:
        "Material is only one of the imbalances you weigh. A pawn — sometimes a piece — can be a fair price for more active pieces, a better structure, or a safer king, when what you get back is worth more over the whole game. When several advantages are yours, don't drift move to move: pick the most important one and build a plan around it.\n\nConverting a winning position takes one more habit — shut down the opponent's counterplay first, then simplify toward an ending where your edge decides.",
      points: [
        "Trade material for an imbalance when the payoff is greater.",
        "Many pluses? Make a plan around the most important one.",
        "Master the will to win a won game — don't relax once you're ahead.",
        "When winning, kill counterplay first, then simplify to convert.",
      ],
      diagrams: [
        {
          fen: "r2q1rk1/ppp2ppp/2n5/2b1N3/2B1P3/8/PPP2PPP/R2Q1RK1 w - - 0 12",
          orientation: "white",
          caption:
            "Real positions stack imbalances: White's active knight on e5 and bishop on c4 versus Black's pieces and structure. The skill is naming the biggest factor and building one plan around it — not drifting move to move.",
        },
      ],
    },
    {
      type: "replay",
      id: "syn-demo",
      title: "A sacrifice for the long game",
      blurb: "A small give-up for a lasting edge.",
      orientation: "white",
      eval: true,
      source: "Ruy Lopez, Exchange Variation",
      intro:
        "Material is only one imbalance. Watch White invest a pawn to wreck " +
        "Black's structure and seize lasting activity — the kind of edge that " +
        "lingers long after the sacrifice. Notice the eval returns to level — yet " +
        "the position is not equal, because the damaged pawns endure.",
      steps: [
        { san: "e4", note: "White takes the centre." },
        { san: "e5", note: "Black answers symmetrically." },
        { san: "Nf3", note: "Develop and pressure e5." },
        { san: "Nc6", note: "Black defends the pawn." },
        { san: "Bb5", note: "The pin — a quiet, structural opening." },
        { san: "a6", note: "Black questions the bishop." },
        {
          san: "Bxc6",
          note:
            "White gives up the bishop pair on purpose — to damage Black's pawns.",
        },
        {
          san: "dxc6",
          note: "Black recaptures with doubled, weakened queenside pawns.",
        },
        {
          san: "Nxe5",
          note:
            "White grabs the pawn — and after ...Qd4 it returns, but the " +
            "structural damage is what counts.",
        },
        {
          san: "Qd4",
          note: "Black forks the knight and e4, regaining the pawn.",
        },
        {
          san: "Nf3",
          note: "The knight retreats; material is even again.",
        },
        {
          san: "Qxe4+",
          keyIdea: "Structure outlasts a pawn",
          highlights: ["c6", "c7"],
          note:
            "Black restores material — but Black's doubled, isolated c-pawns are " +
            "a long-term weakness. White's plan: trade into an endgame and target " +
            "them. The brief pawn investment bought a lasting structural edge.",
        },
      ],
    },
    {
      type: "guessMove",
      id: "synthesis-guess",
      title: "Guess the Move: pay for activity",
      blurb: "Predict a gambit that trades a pawn for lasting pressure.",
      orientation: "black",
      source: "Benko Gambit",
      intro:
        "You're Black, and you're about to invest a pawn — not for a quick trick, but for permanent queenside activity. Predict the moves. The thread: material is just one imbalance; lasting pressure can be worth more.",
      moves: [
        "d4", "Nf6", "c4", "c5", "d5", "b5", "cxb5", "a6", "bxa6", "Bxa6",
      ],
      guessAt: [5, 9],
      notes: [
        undefined, undefined, undefined, undefined, undefined,
        "The gambit! Offering a pawn to blast open the a- and b-files. You won't win it back soon — you're buying long-term queenside pressure instead.",
        undefined, undefined, undefined,
        "Recapture by developing the bishop onto a long open diagonal. Down a pawn, but the half-open files and active pieces are real, lasting compensation.",
      ],
      successText:
        "A pawn for the initiative on the queenside — the essence of synthesis: weigh material against the other imbalances and pay when the return is greater.",
    },
    {
      type: "plan",
      id: "synthesis-plan-apply",
      title: "Find the plan, then convert",
      blurb: "Weigh the imbalances, then win.",
      fen: "5rk1/p1p2ppp/2p5/8/8/5N2/PP3PPP/2R1R1K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "You're up material and Black's queenside pawns are shattered (doubled and weak). With several edges at once, what's the plan?",
      options: [
        "Pick the biggest factor — your extra material — kill any counterplay, and simplify toward a winning ending.",
        "Chase the smallest weakness while ignoring your own king.",
        "Trade into a same-coloured pawn race and hope.",
      ],
      correctIndex: 0,
      explanation:
        "With many pluses, build the plan around the most important one and convert cleanly: neutralise counterplay first, then trade down so your extra material decides.",
      convert: {
        kind: "drill",
        drill: {
          fen: "5rk1/p1p2ppp/2p5/8/8/5N2/PP3PPP/2R1R1K1 w - - 0 1",
          orientation: "white",
          objective: "checkmate",
          engineSkill: 2,
          instructions:
            "White to play. Use the open file and your extra material, shut down Black's counterplay, and convert into checkmate.",
          successText: "Converted — biggest edge first, counterplay snuffed out, point banked.",
        },
      },
    },
    {
      type: "concept",
      id: "synthesis-practice",
      title: "Now put it together",
      blurb: "Strategy is learned by playing.",
      body:
        "You can't drill strategy with flashcards — it lives in real games. Play a full game, try to read the imbalances and make a plan, then run the review to see where your plan held up and where it slipped. That play → review loop is how positional understanding actually grows.",
      points: [
        "Pick a plan from the imbalances, not from memory.",
        "Review every game — the mistakes are the lesson.",
      ],
      practice: { tool: "play", label: "Play a game & review it" },
    },
  ],
};
