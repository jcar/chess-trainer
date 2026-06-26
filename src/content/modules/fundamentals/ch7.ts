// Chapter 8 — Tactics: Winning Material.
// Pilot of the new "Learn → See → Try" teaching template: each idea gets a
// visual concept beat (board diagram + a quick check-for-understanding), a worked
// example where useful, then practice. Original prose; every puzzle position is
// engine-verified for soundness + uniqueness, and concept diagrams are legal.

import type { Lesson } from "../../types";

export const ch7: Lesson = {
  id: "ch7-tactics",
  title: "8. Tactics: Winning Material",
  summary:
    "Tactics win games. Learn to SEE what attacks what, then the three you'll use every game: take what's hanging, the fork, and the skewer.",
  activities: [
    // ---- Objective ----
    {
      id: "ch7-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Three tactics that win material.",
      body:
        "Most games between beginners are decided by who wins more material — and material is won with tactics: short, forcing sequences that win a piece or pawn.\n\nIn this lesson you'll build 'piece vision' (seeing what attacks what), then learn the three workhorse tactics: taking a hanging piece, the fork, and the skewer. We'll show each one on the board, then you'll try it yourself.",
      points: [
        "Tactics = short, forcing moves that win material.",
        "We'll learn: hanging pieces, forks, and skewers.",
        "See the idea, then practice it.",
      ],
    },

    // ---- Learn: piece vision + values (with a diagram + check) ----
    {
      id: "ch7-vision",
      type: "concept",
      title: "Piece vision: see what's attacked",
      blurb: "Every move: what hits what?",
      body:
        "Before every move, scan the board: which pieces attack which, and is each one defended? A piece that is attacked and undefended is 'hanging' — and taking it for free is the simplest tactic of all.\n\nTo judge a trade, use the rough point values. Winning a piece for nothing, or trading a smaller piece for a bigger one, puts material in the bank.",
      points: [
        "Values: pawn 1, knight 3, bishop 3, rook 5, queen 9.",
        "Hanging = attacked AND undefended → take it for free.",
        "Look for loose enemy pieces before anything fancy.",
      ],
      diagrams: [
        {
          fen: "4k3/8/8/4b3/8/8/8/4R1K1 w - - 0 1",
          orientation: "white",
          arrows: [{ from: "e1", to: "e5" }],
          caption: "The rook attacks the bishop on e5 — and nothing defends it.",
        },
      ],
      check: {
        question: "In the diagram, which black piece is hanging (attacked and undefended)?",
        options: ["The bishop on e5", "The king on e8", "Nothing is hanging"],
        correctIndex: 0,
        explanation:
          "The rook on e1 attacks up the open e-file and hits the bishop on e5, which no black piece defends — so White just takes it for free with Rxe5.",
      },
    },
    {
      id: "piece-values",
      type: "quiz",
      title: "What's it worth?",
      blurb: "The currency of trades.",
      question: "Using the standard point values, which trade WINS material for you?",
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
      id: "hanging-piece",
      type: "puzzle",
      title: "Try it: take what's free",
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

    // ---- Learn → See → Try: the fork ----
    {
      id: "ch7-fork-concept",
      type: "concept",
      title: "The fork",
      blurb: "One piece, two targets.",
      body:
        "A fork is a single piece attacking two targets at once. The opponent can only save one — so you win the other. The knight is the great forker because it jumps to squares no other piece guards, but any piece can fork.\n\nForks are deadliest with check: if one of the two targets is the king, the opponent MUST answer the check, leaving the second target to be captured next move.",
      points: [
        "Fork = one piece attacks two things; only one can escape.",
        "The knight is the classic forker.",
        "A fork WITH check is strongest — the king must move first.",
      ],
      diagrams: [
        {
          fen: "6k1/2r5/5r2/3N4/8/8/8/6K1 w - - 0 1",
          orientation: "white",
          arrows: [
            { from: "d5", to: "c7" },
            { from: "d5", to: "f6" },
          ],
          caption: "The knight on d5 attacks both rooks at once — one of them will fall.",
        },
      ],
      check: {
        question: "Why can't Black save both rooks in the diagram?",
        options: [
          "Black can only move one piece per turn, so the other rook stays hanging.",
          "Rooks are not allowed to move backward.",
          "The knight has Black's king in check.",
        ],
        correctIndex: 0,
        explanation:
          "A fork hits two pieces at once. Black moves one rook to safety, and the knight simply captures the other. One move can't save two pieces.",
      },
    },
    {
      id: "ch7-fork-demo",
      type: "replay",
      title: "See it: the royal fork",
      blurb: "Watch a fork win the queen.",
      startFen: "2q1k3/8/8/8/2N5/8/8/4K3 w - - 0 1",
      orientation: "white",
      intro:
        "White's knight is a jump away from forking the king and queen. Watch how the check forces the win.",
      steps: [
        { san: "Nd6+", note: "The knight leaps to d6 — check! It attacks the king AND the queen on c8. A 'royal fork'." },
        { san: "Kf8", note: "Black MUST answer the check. The king steps aside — but the queen can't be saved too." },
        { san: "Nxc8", note: "The knight grabs the queen. The fork worked because the check had to be dealt with first." },
      ],
    },
    {
      id: "fork-tactic",
      type: "puzzle",
      title: "Try it: the fork",
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

    // ---- Learn → Try: the skewer ----
    {
      id: "ch7-skewer-concept",
      type: "concept",
      title: "The skewer",
      blurb: "Hit the front, win the back.",
      body:
        "A skewer is like a fork along a straight line. You attack a valuable piece (often the king with a check); when it is forced to step aside, you capture the piece that was lined up behind it.\n\nRooks, bishops, and queens skewer — any piece that attacks along a line. Look for an enemy king and a juicy piece sharing a rank, file, or diagonal.",
      points: [
        "Skewer = attack the front piece; win the one behind it.",
        "A check is the perfect skewer — the king must move.",
        "Watch for king + piece on the same line.",
      ],
      diagrams: [
        {
          fen: "r7/8/8/k7/8/8/8/4R1K1 w - - 0 1",
          orientation: "white",
          arrows: [
            { from: "e1", to: "a1" },
            { from: "a1", to: "a8" },
          ],
          caption: "King and rook share the a-file: check the king, then take the rook behind it.",
        },
      ],
      check: {
        question: "In a skewer, what makes the back piece fall?",
        options: [
          "The front piece is forced to move (often out of check), exposing the one behind.",
          "The back piece is always pinned and can never move.",
          "Both pieces are captured on the same move.",
        ],
        correctIndex: 0,
        explanation:
          "A skewer attacks the front piece on a line. When it must step aside — especially a king escaping check — the piece lined up behind it is left to be captured.",
      },
    },
    {
      id: "skewer-tactic",
      type: "puzzle",
      title: "Try it: the skewer",
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

    // ---- Apply + recap ----
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
    {
      id: "ch7-practice",
      type: "concept",
      title: "Recap, then train your eyes",
      blurb: "Spot tactics fast — with practice.",
      body:
        "You've got the three big ones: take what's HANGING, FORK two targets with one piece, and SKEWER a piece to win what's behind it. The thread through all of them is piece vision — before every move, look at every check and capture.\n\nTactics only win games if you SEE them in time, and that's pattern recognition built by reps. Train a stream of beginner-friendly tactics; the ones you miss come back until they click.",
      points: [
        "Hanging piece, fork, skewer — your everyday material-winners.",
        "Every move: scan checks and captures first.",
        "Sharpen it with reps in the Tactics Trainer.",
      ],
      practice: { tool: "tactics", maxDifficulty: 1, label: "Train tactics now" },
    },
  ],
};
