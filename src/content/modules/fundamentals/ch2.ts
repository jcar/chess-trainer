// Chapter 2 — Opening principles & playing White.
// Original prose; opening moves are standard theory (not copyrightable).

import type { Lesson } from "../../types";

export const ch2: Lesson = {
  id: "ch2-white-openings",
  title: "2. Starting the Game (White)",
  summary:
    "The three opening principles, two reliable ways to start as White, and the trap every beginner should know.",
  activities: [
    {
      id: "ch2-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "How to start a game the right way.",
      body:
        "A good opening doesn't try to win on move three — it gets you ready to play: pieces out, king safe, center claimed. Do that and you'll reach a healthy middlegame again and again, whoever you face.\n\nWe'll learn the three opening goals, walk through two reliable ways to start as White, and learn the famous early-mate trap so you can deliver it AND defend against it.",
      points: [
        "Three goals: control the center, develop, castle.",
        "Two complete White openings, move by move.",
        "Spot and stop the four-move mate.",
      ],
    },
    {
      id: "ch2-white-openings-concept",
      type: "concept",
      title: "How to start a game",
      blurb: "The three things every good opening does.",
      body:
        "The first few moves aren't about attacking — they're about getting ready. Three simple goals guide nearly every sound opening: fight for the center, develop your pieces, and get your king safe by castling. Pawns in the center give your pieces room to work, knights and bishops belong off the back rank, and a castled king is far safer than one stuck in the middle.\n\nThe diagram shows the principles in action after 1.e4 e5 2.Nf3 Nc6 3.Bc4: a pawn in the center, a knight and bishop developed, and the king a single move from castling. A common beginner mistake is to rush the queen out for early threats — it backfires, because the opponent develops while chasing your queen around for free.",
      points: [
        "Control the center, develop pieces, then castle.",
        "Develop knights and bishops before the queen.",
        "A move that develops AND makes a threat is ideal.",
      ],
      diagrams: [
        {
          fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
          orientation: "white",
          caption: "Center pawn on e4, knight and bishop developed, king ready to castle — the opening principles at work.",
        },
      ],
      check: {
        question: "What are the three goals of a good opening?",
        options: [
          "Control the center, develop your pieces, castle your king to safety",
          "Bring the queen out early, grab pawns, and trade queens",
          "Push the wing pawns, double the rooks, then attack",
        ],
        correctIndex: 0,
        explanation:
          "Center, develop, castle — in roughly that order. Knights and bishops come out before the queen, and the king gets tucked away by castling.",
      },
    },
    {
      id: "opening-principles",
      type: "quiz",
      title: "The three opening goals",
      blurb: "What you're trying to do in the first few moves.",
      question:
        "Which trio best captures the priorities of a good opening?",
      options: [
        "Attack the enemy king, grab pawns, trade off the queens.",
        "Control the center, develop pieces, castle to safety.",
        "Push the h-pawn, fianchetto both bishops, double the rooks.",
        "Bring the queen out early to create immediate threats.",
      ],
      correctIndex: 1,
      explanation:
        "Center, develop, castle. Fight for the central squares with pawns and pieces, get your knights and bishops off the back rank, and tuck your king away by castling. Everything else flows from these three.",
    },
    {
      id: "e4-italian",
      type: "replay",
      title: "A reliable 1.e4 opening",
      blurb: "The Italian Game, move by move.",
      orientation: "white",
      eval: true,
      source: "Italian Game",
      intro:
        "1.e4 stakes a claim in the center and opens lines for the bishop and queen. We'll follow the Italian Game — natural, principled development that any beginner can play. Watch the eval bar stay near even: when BOTH sides follow the principles, neither gets an edge — and that's exactly the point of a sound opening.",
      steps: [
        { san: "e4", keyIdea: "Center", note: "Occupy the center and free the light-squared bishop and queen." },
        { san: "e5", note: "Black mirrors, staking an equal claim in the center." },
        { san: "Nf3", keyIdea: "Develop (with a threat)", note: "Develop a knight AND attack the e5-pawn — development with a threat is ideal." },
        { san: "Nc6", note: "Black defends e5 and develops a knight too." },
        { san: "Bc4", note: "The bishop eyes f7 — the weakest square in Black's camp early on." },
        { san: "Bc5", note: "Black develops symmetrically, aiming at your own f2." },
        { san: "c3", note: "Preparing d4 to build a big center." },
        { san: "Nf6", note: "Black develops the last minor piece toward the center and eyes e4." },
        { san: "d3", note: "Solid: support e4 and open the dark-squared bishop." },
        { san: "O-O", note: "Black castles to safety. White will do the same — both sides have followed the principles." },
      ],
    },
    {
      id: "d4-queens-gambit",
      type: "replay",
      title: "A reliable 1.d4 opening",
      blurb: "The Queen's Gambit, move by move.",
      orientation: "white",
      eval: true,
      source: "Queen's Gambit Declined",
      intro:
        "1.d4 is the other great first move — a slower, more strategic game. The Queen's Gambit offers a pawn to pull Black's center pawn off the board. Same three principles, different road: claim the center, develop, and get ready to castle.",
      steps: [
        { san: "d4", note: "Claim the center with the queen's pawn, supported by the queen." },
        { san: "d5", note: "Black stakes a symmetrical claim." },
        { san: "c4", note: "The 'gambit': offer the c-pawn to deflect Black's d5-pawn and dominate the center." },
        { san: "e6", note: "The solid Queen's Gambit Declined — Black props up d5 instead of grabbing the pawn." },
        { san: "Nc3", note: "Develop, adding a second attacker to d5." },
        { san: "Nf6", note: "Black defends d5 again and develops." },
        { san: "Bg5", note: "Pin the f6-knight to the queen, increasing pressure on d5." },
        { san: "Be7", note: "Black breaks the pin and prepares to castle." },
        { san: "e3", note: "Open the last bishop; the center is solid and White is comfortably developed." },
      ],
    },
    {
      id: "scholars-mate",
      type: "puzzle",
      title: "Punish the careless developer",
      blurb: "The four-move mate, from the attacking side.",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 4",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt:
        "Black just played the knight to f6, ignoring a threat. White to play and checkmate in one.",
      hints: [
        "Your bishop on c4 and queen on h5 are both aimed at one square.",
        "f7 is defended only by the king — and your queen can capture it with support.",
      ],
      successText:
        "Checkmate! Qxf7# is 'Scholar's Mate'. The queen takes f7 with the bishop defending it, so the king can't recapture — and it has no escape. Learn it so you can both deliver it and, more importantly, defend against it.",
      solution: ["h5f7"],
    },
    {
      id: "development-order",
      type: "quiz",
      title: "Knights or queen first?",
      blurb: "A common beginner mistake.",
      question:
        "Why is bringing your queen out on move 2 or 3 usually a bad idea?",
      options: [
        "The rules don't let the queen move in the first few turns.",
        "The opponent develops with tempo by attacking your exposed queen.",
        "Giving check with the queen this early is against the rules.",
        "The queen is too valuable to risk moving at all.",
      ],
      correctIndex: 1,
      explanation:
        "An early queen becomes a target. Each time the opponent attacks it, they develop a piece 'for free' while you waste moves running away. Develop knights and bishops first; bring the queen out once it's safe.",
    },
    {
      id: "ch2-guess-principles",
      type: "guessMove",
      title: "Your turn: play the principles",
      blurb: "Predict White's moves using center, develop, castle.",
      orientation: "white",
      source: "Italian Game",
      intro:
        "You're White. Before each highlighted move, play what you think the principles call for — the app will check it. Ask yourself every time: am I fighting for the center, developing a piece, or getting my king safe?",
      moves: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d3", "d6", "O-O", "O-O",
      ],
      guessAt: [2, 4, 10],
      notes: [
        undefined, undefined,
        "Develop a knight — and it attacks the e5-pawn at the same time. Development with a threat is the dream.",
        undefined,
        "Develop the bishop to an active square, eyeing the f7 weak spot. Knights and bishops out before the queen.",
        undefined, undefined, undefined, undefined, undefined,
        "Castle! King tucked safely in the corner, rook ready for the center. All three principles done.",
      ],
      successText:
        "That's a healthy opening: center claimed, pieces developed, king castled. Play these three goals every game and you'll always reach a sound middlegame.",
    },
    {
      id: "ch2-recap",
      type: "concept",
      title: "Recap: a healthy opening",
      blurb: "Get ready, then play.",
      body:
        "Whatever your first move, the plan is the same: grab a share of the center, develop your knights and bishops toward it, castle, and connect your rooks — and don't go queen-hunting too early. Pick one 1.e4 and one 1.d4 setup you like and play them until they're automatic.\n\nThe fastest way to learn an opening is to play it. Start a game and put the three goals into practice.",
      points: [
        "Center, develop, castle — every game.",
        "Knights and bishops before the queen.",
        "Know Scholar's Mate so it never catches you.",
      ],
      practice: { tool: "play", label: "Play a game now" },
    },
  ],
};
