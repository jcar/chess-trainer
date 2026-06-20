// Playing Smart — the "your turn" thinking habits: is anything attacked? is my
// move safe? don't give pieces away. Sorts (judge a position) + a verified
// capture puzzle + routine quizzes.

import type { Lesson } from "../../types";

export const playingSmart: Lesson = {
  id: "kids-playing-smart",
  title: "Playing Smart",
  summary:
    "Before every move, be a detective! Check what's being attacked and whether your move is safe — so you don't give pieces away.",
  activities: [
    {
      id: "smart-routine",
      type: "quiz",
      title: "Before you move",
      blurb: "Pip's checklist.",
      question: "What should you check BEFORE you make your move?",
      options: [
        "Just move fast and hope for the best.",
        "Is anything being attacked? Is my move safe? Am I leaving a piece to be taken?",
        "Only look at your own king.",
      ],
      correctIndex: 1,
      explanation: "Be a detective! Every turn, look for attacks (yours and theirs) and make sure your move doesn't leave a piece to be captured for free. This one habit stops most beginner blunders.",
    },
    {
      id: "smart-is-knight-safe",
      type: "sort",
      title: "Is the knight safe?",
      blurb: "Look for attackers.",
      prompt: "Is the white knight safe where it is?",
      fen: "4k3/8/8/2p5/3N4/8/8/4K3 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Safe", emoji: "🙂" },
        { label: "Being attacked!", emoji: "⚠️" },
      ],
      correctIndex: 1,
      explanation: "Not safe! The black pawn on c5 attacks the knight on d4 (pawns capture diagonally). You'd want to move the knight or defend it.",
    },
    {
      id: "smart-is-it-safe-to-take",
      type: "sort",
      title: "Is it safe to take?",
      blurb: "Check the defenders!",
      prompt: "Can the white queen safely capture the pawn on d5?",
      fen: "5k2/8/4p3/3p4/8/8/8/3QK3 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Yes, take it!", emoji: "✅" },
        { label: "No — it's a trap", emoji: "🚫" },
      ],
      correctIndex: 1,
      explanation: "It's a trap! The black pawn on e6 guards d5. If the queen takes, the pawn takes the queen back — giving away your best piece for a pawn. Always check what's defending before you capture.",
    },
    {
      id: "smart-win-free-queen",
      type: "puzzle",
      title: "Win the free piece!",
      blurb: "This one really is free.",
      fen: "r4rk1/ppp2ppp/8/3q4/8/2b2N2/PPP2PPP/R2Q1RK1 w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 3 },
      prompt: "The black queen is sitting on a square nothing defends. Tap your queen and grab it!",
      hints: ["Look for an enemy piece that no friendly piece is guarding.", "Your queen can take it for free."],
      successText: "Free queen! You checked that it was undefended first — that's playing smart.",
      solution: ["d1d5"],
    },
    {
      id: "smart-attacked-what-do",
      type: "sort",
      title: "Your piece is attacked!",
      blurb: "What now?",
      prompt: "Your bishop is being attacked and can be taken for free next move. What should you do?",
      fen: "4k3/8/8/8/6p1/8/4B3/4K3 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Move it to safety", emoji: "🏃" },
        { label: "Leave it there", emoji: "😴" },
      ],
      correctIndex: 0,
      explanation: "Move it (or defend it)! When a piece is attacked and would be lost for free, don't just leave it — slide it to a safe square or protect it.",
    },
    {
      id: "smart-blunder-check",
      type: "quiz",
      title: "The last check",
      blurb: "One more look!",
      question: "You found a move you like. What's the LAST thing to do before you play it?",
      options: [
        "Play it instantly.",
        "Double-check: does this move leave any of my pieces able to be taken for free?",
        "Close your eyes.",
      ],
      correctIndex: 1,
      explanation: "Always do a quick blunder-check! Before you let go of the piece, make sure your move doesn't hang anything. This habit alone will win you lots of games.",
    },
  ],
};
