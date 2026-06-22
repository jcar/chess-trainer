// Chapter 7 — Attacking, defending, and basic tactics.
// Original prose; all puzzle positions engine-verified for soundness + uniqueness.

import type { Lesson } from "../../types";

export const ch7: Lesson = {
  id: "ch7-tactics",
  title: "8. Tactics: Winning Material",
  summary:
    "Before strategy comes 'piece vision' — seeing what attacks what. Then the bread-and-butter tactics: the fork, the skewer, and simply taking what's hanging.",
  activities: [
    {
      id: "ch7-tactics-concept",
      type: "concept",
      title: "Winning material with tactics",
      blurb: "See what attacks what, then pounce.",
      body:
        "Most games at the beginner level are decided by material — and material is won with tactics. It all starts with 'piece vision': before every move, see which pieces attack which, and whether each one is defended. Pieces have rough values (pawn 1, knight and bishop 3, rook 5, queen 9), so a trade that gives you more than you give up is a win.\n\nThe simplest tactic is just grabbing a piece that's hanging — undefended and attacked. From there come the classics: the fork, where one piece attacks two targets at once (the knight is the great forker), and the skewer, where a check forces a valuable piece to step aside so you win what was behind it. Always ask 'if I take, what recaptures?' before you grab.",
      points: [
        "Values: pawn 1, knight/bishop 3, rook 5, queen 9.",
        "Fork = one piece hits two targets; skewer = win the piece behind a check.",
        "Before any capture, check what defends the target.",
      ],
    },
    {
      id: "piece-values",
      type: "quiz",
      title: "What's it worth?",
      blurb: "The currency of trades.",
      question:
        "Using the standard point values, which trade WINS material for you?",
      options: [
        "Giving up a rook (5) to capture a bishop (3).",
        "Giving up a knight (3) to capture a rook (5).",
        "Giving up a queen (9) to capture a rook (5).",
        "Giving up a bishop (3) to capture a knight (3).",
      ],
      correctIndex: 1,
      explanation:
        "Pawn 1, knight 3, bishop 3, rook 5, queen 9. Trading a knight (3) for a rook (5) is 'winning the exchange' — a clear material gain. The others lose material or are even.",
    },
    {
      id: "fork-tactic",
      type: "puzzle",
      title: "The fork",
      blurb: "One piece, two targets.",
      fen: "r3k2r/ppp2ppp/4N3/1q6/8/8/PPP2PPP/R3K2R w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 3 },
      prompt:
        "White to play. Your knight can attack the king and the queen at the same moment — find it.",
      hints: [
        "A knight on c7 would check the king on e8.",
        "From c7, what else does the knight attack?",
      ],
      successText:
        "Won the queen! Nc7+ forks the king and the queen on b5. The king must move out of check, and then Nxb5 wins the queen. The knight is the great forking piece.",
      solution: ["e6c7", "e8d7", "c7b5"],
    },
    {
      id: "skewer-tactic",
      type: "puzzle",
      title: "The skewer",
      blurb: "Check the king, win what's behind it.",
      fen: "r7/8/8/k7/8/8/8/4R1K1 w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 3 },
      prompt:
        "White to play. The black king and rook sit on the same file. Use a check to win the rook.",
      hints: [
        "Check the king along the a-file — it must step aside.",
        "Once the king moves off the file, the rook behind it is yours.",
      ],
      successText:
        "Won the rook! Ra1+ skewers the king to the rook: the king must move off the a-file, and then Rxa8 collects the rook. A skewer is like a fork on a line — the valuable piece is forced to step out of the way.",
      solution: ["e1a1", "a5b6", "a1a8"],
    },
    {
      id: "hanging-piece",
      type: "puzzle",
      title: "Piece vision: take what's free",
      blurb: "The simplest tactic of all.",
      fen: "r4rk1/ppp2ppp/8/3q4/8/2b2N2/PPP2PPP/R2Q1RK1 w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 3 },
      prompt:
        "White to play. Black's queen has wandered to a square where nothing defends it. Punish it.",
      hints: [
        "Scan the board: which black piece is undefended and attacked?",
        "Your queen can capture the biggest prize for free.",
      ],
      successText:
        "Won the queen! Qxd5 simply takes the undefended queen. Half of all tactics are just seeing that a piece is hanging — train your eye to check every capture, every move.",
      solution: ["d1d5"],
    },
    {
      id: "hanging-vs-defended",
      type: "quiz",
      title: "Before you grab it...",
      blurb: "Is that pawn really free?",
      question:
        "Your bishop can capture an enemy pawn. Before you take it, what's the most important thing to check?",
      options: [
        "Whether the pawn is sitting on a light square or a dark one.",
        "Whether the pawn is defended — so you don't lose the bishop for it.",
        "Whether you are on an even-numbered move of the game.",
        "Whether your opponent has already castled their king to safety.",
      ],
      correctIndex: 1,
      explanation:
        "Always ask 'if I take, what recaptures?' Capturing a defended pawn with a bishop loses a 3-point piece for 1 point. Good piece vision means seeing both attackers AND defenders before every capture.",
    },
  ],
};
