// Chapter 3 — Playing the opening with Black.
// Original prose; opening moves are standard theory.

import type { Lesson } from "../../types";

export const ch3: Lesson = {
  id: "ch3-black-openings",
  title: "3. Starting the Game (Black)",
  summary:
    "The same principles apply when you're a move behind: meet 1.e4 and 1.d4 with sound, easy-to-learn systems — and punish White if they overreach.",
  activities: [
    {
      id: "ch3-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Starting strong a move behind.",
      body:
        "You'll play Black in half your games, so you need answers to 1.e4 and 1.d4 that don't require memorizing reams of theory. Good news: the same three goals apply, and a setup-based opening lets you aim for the same healthy formation no matter what White does.\n\nWe'll meet 1.e4 with classical development, learn a flexible setup against 1.d4, and punish White when an early queen overreaches.",
      points: [
        "Black uses the same principles — center, develop, castle.",
        "A repeatable setup means far less to memorize.",
        "Punish White's loose pieces with a fork.",
      ],
    },
    {
      id: "ch3-black-openings-concept",
      type: "concept",
      title: "Playing the opening as Black",
      blurb: "Same principles, one move behind.",
      body:
        "Playing Black changes very little. You follow the same three goals — contest the center, develop, and castle — while accepting that White's extra move gives a small head start. That nudge of initiative is not a winning advantage; play soundly and you'll be perfectly fine.\n\nA great shortcut for beginners is a setup-based opening: you aim for the same healthy piece formation no matter what White does. The diagram shows one such formation, the King's Indian — knight on f6, bishop fianchettoed on g7, king castled. Far less to memorize, and far fewer ways to go wrong early. Just stay alert for direct threats — answer those first, then steer toward your setup.",
      points: [
        "White's extra tempo is a small edge, not a winning one.",
        "Setup openings give you one repeatable formation to learn.",
        "Always meet a direct threat before following your plan.",
      ],
      diagrams: [
        {
          fen: "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP3PPP/R1BQKB1R w KQ - 1 6",
          orientation: "black",
          caption: "Black's King's Indian setup: knight on f6, bishop fianchettoed on g7, king safely castled — one formation to learn.",
        },
      ],
      check: {
        question: "You're Black, so you move second. How much of a disadvantage is that?",
        options: [
          "A small head start for White — not a winning edge",
          "A losing disadvantage you must immediately attack to undo",
          "None at all — Black is actually favored",
        ],
        correctIndex: 0,
        explanation:
          "White's extra tempo is a nudge of initiative, nothing more. Play soundly — contest the center, develop, castle — and you'll reach a fine game.",
      },
    },
    {
      id: "meeting-first-moves",
      type: "quiz",
      title: "Responding as Black",
      blurb: "You move second — does that change the plan?",
      question:
        "As Black, what's the soundest general approach to the opening?",
      options: [
        "Copy White's moves forever to keep the game equal.",
        "Use the same principles, accepting White's small head start.",
        "Attack at once on the wing before developing pieces.",
        "Keep all your pieces at home until White commits.",
      ],
      correctIndex: 1,
      explanation:
        "Black plays by the same rules. White's extra tempo gives a nudge of initiative, not a winning advantage. Contest the center, develop smoothly, get your king safe, and you'll be fine.",
    },
    {
      id: "ruy-lopez-black",
      type: "replay",
      title: "Meeting 1.e4 with ...e5",
      blurb: "Classical development against the Ruy Lopez.",
      orientation: "black",
      eval: true,
      source: "Ruy López",
      intro:
        "The most classical answer to 1.e4 is 1...e5. Here's how Black develops naturally against the Ruy Lopez, one of White's most respected tries. (The board is shown from Black's side.) Watch the eval: it barely favours White — the second move is only a tiny head start when you develop soundly.",
      steps: [
        { san: "e4", note: "White takes the center." },
        { san: "e5", note: "You answer in the center — symmetric and sound." },
        { san: "Nf3", note: "White attacks e5." },
        { san: "Nc6", note: "You defend e5 and develop. Always answer threats while developing." },
        { san: "Bb5", note: "The Ruy Lopez: White pins... actually pressures your knight, eyeing e5 indirectly." },
        { san: "a6", note: "The Morphy move — question the bishop. It must decide to take or retreat." },
        { san: "Ba4", note: "White keeps the bishop on the diagonal." },
        { san: "Nf6", note: "You develop and hit e4 right back. Black is comfortable and ready to castle." },
      ],
    },
    {
      id: "kings-indian-setup",
      type: "replay",
      title: "A setup you can play against anything",
      blurb: "The King's Indian fianchetto structure.",
      orientation: "black",
      eval: true,
      source: "King's Indian Defence",
      intro:
        "Setup-based openings are great for beginners: you aim for the same piece formation regardless of White's moves. Here's the King's Indian structure against 1.d4. White gets more space (the eval nudges White's way), but Black's setup is solid and ready to strike back later.",
      steps: [
        { san: "d4", note: "White claims the center." },
        { san: "Nf6", note: "Develop and control e4 instead of occupying the center immediately." },
        { san: "c4", note: "White grabs more space." },
        { san: "g6", note: "Prepare to fianchetto — the bishop will rake the long diagonal from g7." },
        { san: "Nc3", note: "White develops." },
        { san: "Bg7", note: "The fianchettoed bishop eyes the center and queenside from afar." },
        { san: "e4", note: "White builds a big pawn center — which Black will challenge later with ...e5 or ...c5." },
        { san: "d6", note: "Support the coming central break and open your bishop's diagonal." },
        { san: "Nf3", note: "White develops the kingside knight." },
        { san: "O-O", note: "Castle. Black has a compact, flexible setup that's hard to go wrong with." },
      ],
    },
    {
      id: "black-fork-punish",
      type: "puzzle",
      title: "Punish the loose queen",
      blurb: "White's queen wandered — make it pay.",
      fen: "r3k2r/ppp2ppp/8/8/1Q6/4n3/PPP2PPP/R3K2R b KQkq - 0 1",
      orientation: "black",
      goal: { type: "win-material", minGain: 3 },
      prompt:
        "Black to play. White's king and queen are awkwardly placed — find the knight move that wins the queen.",
      hints: [
        "Look for a square where your knight attacks the white king AND the queen at once.",
        "A check the opponent must answer lets you grab the queen next move.",
      ],
      successText:
        "Won the queen! Nc2+ forks the king on e1 and the queen on b4. White must deal with the check, and then ...Nxb4 collects the queen. This is a 'fork' — one piece attacking two targets.",
      solution: ["e3c2", "e1f1", "c2b4"],
    },
    {
      id: "building-blocks",
      type: "quiz",
      title: "Why setup openings work",
      blurb: "The appeal of a repeatable structure.",
      question:
        "What's the main practical advantage of a setup-based opening for a beginner?",
      options: [
        "It forces a winning checkmate against White around move 10.",
        "You reach one setup each game, so there's less to memorize.",
        "It wins a clean extra pawn by force during the opening.",
        "It lets you safely skip castling and keep your king central.",
      ],
      correctIndex: 1,
      explanation:
        "Setup openings reduce memorization: you learn one healthy formation (pawns and piece squares) and steer toward it. You still must watch for direct threats, but you're rarely lost in the opening.",
    },
    {
      id: "ch3-guess-principles",
      type: "guessMove",
      title: "Your turn: develop as Black",
      blurb: "Predict Black's moves using the same three principles.",
      orientation: "black",
      source: "Italian Game",
      intro:
        "You're Black now. White is developing soundly — match them. Before each highlighted move, play what the principles call for: contest the center, develop a piece, get your king safe.",
      moves: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "d3", "Be7", "O-O", "O-O",
      ],
      guessAt: [3, 5, 9],
      notes: [
        undefined, undefined, undefined,
        "Defend the e5-pawn AND develop a knight in one move — answer the threat while improving your position.",
        undefined,
        "Develop the other knight and hit White's e4-pawn right back. Black keeps pace move for move.",
        undefined, undefined, undefined,
        "Castle. Same three principles as White, just one tempo behind — and you're perfectly healthy.",
      ],
      successText:
        "You played the opening like White does, a move behind: center contested, pieces out, king safe. That's all it takes to survive — and thrive — as Black.",
    },
    {
      id: "ch3-recap",
      type: "concept",
      title: "Recap: comfortable as Black",
      blurb: "One plan, fewer worries.",
      body:
        "As Black you play by the same three goals, just a move behind. Pick a reliable answer to 1.e4 (classical ...e5 is great) and a setup you can steer for against 1.d4, and you'll rarely be lost out of the opening — while loose White pieces give you targets to punish.\n\nThe best way to trust an opening is to play it from the Black side a few times. Jump into a game and steer for your setup.",
      points: [
        "Same goals as White, accepting a small head start.",
        "Learn one setup; meet direct threats first.",
        "Watch for forks when White's queen wanders.",
      ],
      practice: { tool: "play", label: "Play a game now" },
    },
  ],
};
