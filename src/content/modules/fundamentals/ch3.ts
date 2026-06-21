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
      id: "ch3-black-openings-concept",
      type: "concept",
      title: "Playing the opening as Black",
      blurb: "Same principles, one move behind.",
      body:
        "Playing Black changes very little. You follow the same three goals — contest the center, develop, and castle — while accepting that White's extra move gives a small head start. That nudge of initiative is not a winning advantage; play soundly and you'll be perfectly fine.\n\nA great shortcut for beginners is a setup-based opening: you aim for the same healthy piece formation no matter what White does. That means far less to memorize and far fewer ways to go wrong early. Just stay alert for direct threats — answer those first, then steer toward your setup.",
      points: [
        "White's extra tempo is a small edge, not a winning one.",
        "Setup openings give you one repeatable formation to learn.",
        "Always meet a direct threat before following your plan.",
      ],
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
      intro:
        "The most classical answer to 1.e4 is 1...e5. Here's how Black develops naturally against the Ruy Lopez, one of White's most respected tries. (The board is shown from Black's side.)",
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
      intro:
        "Setup-based openings are great for beginners: you aim for the same piece formation regardless of White's moves. Here's the King's Indian structure against 1.d4.",
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
  ],
};
