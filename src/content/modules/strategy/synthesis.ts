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
        "When winning, kill counterplay, then simplify to convert.",
      ],
    },
    {
      type: "quiz",
      id: "syn-exchange",
      title: "When material isn't everything",
      blurb: "The price of an imbalance.",
      question: "Why might you give up material for an imbalance?",
      options: [
        "To force an immediate draw.",
        "Because material never matters.",
        "Because activity, structure, or king safety can outweigh a pawn.",
      ],
      correctIndex: 2,
      explanation:
        "A pawn or even a piece can be a fair price for a lasting edge: more " +
        "active pieces, a better pawn structure, or a safer king. The exchange " +
        "pays off when what you get back is worth more over the whole game.",
    },
    {
      type: "sort",
      id: "syn-counterplay",
      title: "Kill the counterplay",
      blurb: "The winner's habit.",
      prompt: "You're winning. What's a key habit?",
      fen: "6k1/5ppp/8/8/8/5N2/1R3PPP/6K1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Prevent the opponent's counterplay first" },
        { label: "Attack on every move" },
      ],
      correctIndex: 0,
      explanation:
        "Lost positions are saved by counterplay. Before pressing your own " +
        "advantage, shut down the opponent's active ideas — a winning position " +
        "converts itself once they have nothing to do.",
    },
    {
      type: "quiz",
      id: "syn-plan",
      title: "Pick the right edge",
      blurb: "Many pluses, one plan.",
      question:
        "When you have several imbalances in your favour, you should:",
      options: [
        "Play the first checking move you see.",
        "Make a plan that uses the most important one.",
        "Offer a draw to be safe.",
      ],
      correctIndex: 1,
      explanation:
        "Strong play is purposeful. Identify which of your advantages matters " +
        "most — an open file, a weak enemy pawn, a great knight — and build a " +
        "plan around exploiting it, rather than reacting move to move.",
    },
    {
      type: "sort",
      id: "syn-convert",
      title: "Convert the exchange",
      blurb: "Up material, head for the ending.",
      prompt: "Up an exchange with a safe king — how do you convert?",
      fen: "6k1/5ppp/8/8/8/8/1R3PPP/4r1K1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Keep the queens on to attack" },
        { label: "Trade pieces and reach a winning endgame" },
      ],
      correctIndex: 1,
      explanation:
        "With a material edge and a safe king, simplify. Every trade brings you " +
        "closer to an endgame where the extra material decides — and removes the " +
        "opponent's chances of swindling you with complications.",
    },
    {
      type: "sort",
      id: "syn-apply2",
      title: "Is the sacrifice sound?",
      blurb: "Count what you get back.",
      prompt:
        "You can give up a bishop to smash open the castled king's pawn cover, with your queen and rook ready to pour in. Sound or not?",
      fen: "r2q1rk1/ppp2ppp/2n5/2b1N3/2B1P3/8/PPP2PPP/R2Q1RK1 w - - 0 12",
      orientation: "white",
      options: [
        { label: "Sound — the open king and your active pieces pay for it" },
        { label: "Unsound — never give up material" },
        { label: "Unsound — only sacrifice for a forced mate" },
      ],
      correctIndex: 0,
      explanation:
        "A sacrifice is justified when what you get back outweighs the material: " +
        "here a bare enemy king plus your attackers swarming in. Material is just " +
        "one imbalance — and a forced mate isn't required, only a payoff worth more.",
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
