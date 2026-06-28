// Strategy lesson 5 — Knights & Outposts. Original prose.

import type { Lesson } from "../../types";

export const knightsLesson: Lesson = {
  id: "knights",
  title: "Knights & Outposts",
  summary:
    "Knights need support points — a protected square in enemy territory is gold.",
  activities: [
    {
      type: "concept",
      id: "knights-concept",
      title: "Knights & outposts",
      blurb: "Find your knight a square it can't be kicked from.",
      body:
        "A knight is short-stepping, so it's strongest when it has a stable home deep in enemy territory. An outpost is an advanced square — often the 5th or 6th rank — that one of your pawns defends and that no enemy pawn can ever attack. A knight planted there can only be removed by trading a piece for it.\n\nKnights also outshine bishops in closed positions, where they hop over locked pawn chains to reach squares a bishop never could.",
      points: [
        "An outpost is a square your pawn guards and no enemy pawn can hit.",
        "A knight on an outpost is nearly impossible to dislodge.",
        "A knight on the 6th rank is often a winning advantage.",
        "Closed positions favour knights; they're also the best blockaders of passed pawns.",
      ],
      diagrams: [
        {
          fen: "4k3/pp3ppp/2p1p3/3pP3/2PP1P2/8/PP4PP/4K3 w - - 0 1",
          orientation: "white",
          caption:
            "Locked pawn chains — a knight's home turf. It can hop over the blockade to reach squares a bishop, stuck banging into pawns, never could.",
        },
      ],
    },
    {
      type: "quiz",
      id: "knights-outpost",
      title: "What is an outpost?",
      blurb: "A knight's dream square.",
      question: "What is a knight 'outpost'?",
      options: [
        "Any square on the opponent's half of the board.",
        "An advanced square, guarded by your pawn, safe from enemy pawns.",
        "The square a knight starts the game on.",
      ],
      correctIndex: 1,
      explanation:
        "An outpost is an advanced square — often on the 5th or 6th rank — that " +
        "one of your own pawns defends and that no enemy pawn can ever attack. " +
        "A knight parked there is untouchable.",
    },
    {
      type: "sort",
      id: "knights-closed",
      title: "Knight or bishop in a closed position?",
      blurb: "Locked pawns change everything.",
      prompt:
        "In a closed position with locked pawn chains, which piece is usually better?",
      fen: "4k3/pp3ppp/2p1p3/3pP3/2PP1P2/8/PP4PP/4K3 w - - 0 1",
      orientation: "white",
      options: [{ label: "The knight" }, { label: "The bishop" }],
      correctIndex: 0,
      explanation:
        "When pawns are locked, bishops bang into their own chains and have no " +
        "open diagonals. Knights, which can hop over everything, thrive — they " +
        "reroute to outposts the bishop can never reach.",
    },
    {
      type: "quiz",
      id: "knights-support",
      title: "Why outposts are so strong",
      blurb: "The pawn does the protecting.",
      question: "Why is a pawn-supported outpost so strong for a knight?",
      options: [
        "It lets the knight move twice in a row.",
        "Enemy pawns can't chase it, so it sits there for good.",
        "It makes the knight worth a full rook.",
      ],
      correctIndex: 1,
      explanation:
        "Because no enemy pawn can attack the square, the only way to remove the " +
        "knight is to trade a piece for it — usually a bishop, handing you the " +
        "bishop pair. So the knight simply stays, cramping and harassing for the " +
        "rest of the game.",
    },
    {
      type: "sort",
      id: "knights-apply1",
      title: "Route the knight to the outpost",
      blurb: "Plan the journey, not just the destination.",
      prompt:
        "The d5 square is a protected outpost no Black pawn can attack. What's the right plan for your knight on f3?",
      fen: "r1bq1rk1/pp3ppp/2np1n2/3Np3/4P3/2N2P2/PPP3PP/R1BQ1RK1 b - - 0 1",
      orientation: "white",
      options: [
        { label: "Manoeuvre a knight onto d5 and leave it there" },
        { label: "Swap both knights off as fast as you can" },
      ],
      correctIndex: 0,
      explanation:
        "An outpost is only worth having if you occupy it. Steer a knight to d5, where a pawn defends it and no enemy pawn can ever chase it away. Trading the knights off throws away the very piece best suited to that dream square.",
    },
    {
      type: "sort",
      id: "knights-apply2",
      title: "Keep the lock or open up?",
      blurb: "Match the pawns to your pieces.",
      prompt:
        "The pawns are locked and you have the knight while the opponent has the bishop. With a choice between a pawn break and keeping things closed, what suits you?",
      fen: "r3k2r/pp3ppp/2n1p3/2ppP3/2PP4/2N5/PP3PPP/R3K2R w KQkq - 0 1",
      orientation: "white",
      options: [
        { label: "Open the position with a pawn break" },
        { label: "Keep the position closed and locked" },
      ],
      correctIndex: 1,
      explanation:
        "Closed, locked pawns are a knight's home turf — it hops over the blockade to outposts the bishop can never reach. Keep the structure shut. Opening lines would hand the bishop the long, clear diagonals it craves and undo your advantage.",
    },
    {
      type: "puzzle",
      id: "knights-fork",
      title: "The knight forks the queen",
      blurb: "A knight's payoff.",
      fen: "3q3k/ppp5/8/6N1/8/8/PPP5/6K1 w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 4 },
      prompt: "White to play and win material with a knight fork.",
      hints: [
        "Find a knight check that also hits the queen.",
        "The fork square is f7.",
      ],
      successText:
        "Nf7+ forks the king and queen — after the king moves, Nxd8 wins the " +
        "queen. The knight's signature blow.",
      solution: ["g5f7", "h8g7", "f7d8"],
    },
    {
      type: "replay",
      id: "knights-outpost-demo",
      title: "Planting a knight",
      blurb: "Watch a knight settle onto a protected outpost.",
      orientation: "white",
      eval: true,
      source: "Open Sicilian — Sveshnikov",
      intro:
        "A great square is worth working for. Here White manoeuvres a knight to " +
        "a permanent outpost on d5, supported by a pawn and beyond the reach of " +
        "any Black pawn. The eval stays level — proof that the outpost is a slow, " +
        "structural trump, not a quick tactic.",
      steps: [
        { san: "e4", note: "White grabs the centre." },
        { san: "c5", note: "The Sicilian — Black fights for d4." },
        { san: "Nf3", note: "Developing toward the centre." },
        { san: "Nc6", note: "Black develops too." },
        { san: "d4", note: "Opening the position." },
        { san: "cxd4", note: "Black trades in the centre." },
        { san: "Nxd4", note: "White's knight reaches a fine central post." },
        {
          san: "Nf6",
          note: "Black attacks e4 and develops.",
        },
        { san: "Nc3", note: "Defending e4 and eyeing the d5 square." },
        {
          san: "e5",
          note:
            "Black gains space — but this pawn can never again guard d5, leaving " +
            "that square permanently weak.",
        },
        {
          san: "Ndb5",
          note: "The knight begins its journey toward the d5 hole.",
        },
        {
          san: "d6",
          note:
            "Black props up e5. Now d5 is a true outpost: no Black pawn can attack " +
            "it.",
        },
        {
          san: "Nd5",
          keyIdea: "An unkickable knight",
          highlights: ["d5"],
          arrows: [{ from: "d5", to: "f6" }, { from: "d5", to: "e7" }],
          note:
            "The knight lands on d5 — supported, central, and unkickable. From " +
            "here it dominates, and Black can only remove it by trading a piece.",
        },
      ],
    },
    {
      type: "guessMove",
      id: "knights-guess",
      title: "Guess the Move: keep the knight active",
      blurb: "Predict the moves that give a knight purpose.",
      orientation: "white",
      source: "Petroff Defence",
      intro:
        "You're White. Predict the knight moves. A knight is short-stepping, so every hop should take it toward a useful square — never just away from danger.",
      moves: [
        "e4", "e5", "Nf3", "Nf6", "Nxe5", "d6", "Nf3", "Nxe4", "d4", "d5", "Bd3", "Nc6",
      ],
      guessAt: [4, 6],
      notes: [
        undefined, undefined, undefined, undefined,
        "Grab the pawn — the knight stays active in the centre rather than shuffling backward.",
        undefined,
        "Retreat with care: Nf3 keeps the knight on a good square. (The greedy Nxf7?! hands Black a dangerous initiative for the pawn.)",
        undefined, undefined, undefined, undefined, undefined,
      ],
      successText:
        "Each knight move had a point — grab the centre, then retreat to a square that stays useful. That's how short-range pieces earn their keep.",
    },
    {
      type: "plan",
      id: "knights-plan-apply",
      title: "Find the plan, then convert",
      blurb: "Put the knight to work, then win.",
      fen: "3q3k/ppp5/8/6N1/8/8/PPP5/6K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "Your knight has reached an advanced square near the enemy king. What's the plan?",
      options: [
        "Look for the knight's signature blow — a fork that wins material outright.",
        "Retreat the knight to safety and play a long game.",
        "Trade the knight for a pawn to open lines.",
      ],
      correctIndex: 0,
      explanation:
        "An advanced, active knight is built for forks. Nf7+ hits the king and the queen at once; after the king moves, Nxd8 collects the queen. The knight's reward for reaching enemy lines.",
      convert: {
        kind: "puzzle",
        puzzle: {
          fen: "3q3k/ppp5/8/6N1/8/8/PPP5/6K1 w - - 0 1",
          orientation: "white",
          goal: { type: "win-material", minGain: 4 },
          prompt: "White to play and win material with a knight fork.",
          hints: ["A knight check that also hits the queen.", "The fork square is f7."],
          successText: "Nf7+ forks king and queen; after the king steps aside, Nxd8 wins the queen.",
          solution: ["g5f7", "h8g7", "f7d8"],
        },
      },
    },
    {
      type: "quiz",
      id: "knights-review",
      title: "Review: what makes an outpost",
      blurb: "The condition that matters.",
      question:
        "An advanced square becomes a true outpost for your knight only when...",
      options: [
        "No enemy pawn can ever attack it (and ideally your own pawn defends it).",
        "It sits anywhere on the opponent's half of the board.",
        "Your knight can reach it in one move.",
      ],
      correctIndex: 0,
      explanation:
        "A support point is only a support point if a pawn can't chase the knight away. Pawn-proof and ideally pawn-defended — that's what turns an advanced square into a permanent home.",
    },
  ],
};
