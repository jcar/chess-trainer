// Play vs Pip — a gentle ladder of winnable "games" so kids actually PLAY.
// Levels get a little harder (more help → less help), but every rung is winnable
// and the robot plays at its friendliest (engineSkill 0). Puzzle rungs are
// guaranteed solvable; drill rungs are real play. All engine-verified.

import type { Lesson } from "../../types";

export const l10: Lesson = {
  id: "kids-l10-play",
  title: "Play vs Pip",
  summary:
    "You've learned so much — now play! Climb Pip's ladder of games. Each level is winnable. Can you beat them all?",
  activities: [
    {
      id: "kids-l10-play-concept",
      type: "concept",
      title: "Let's Play!",
      blurb: "Climb Pip's ladder.",
      body: "You've learned so much! Now it's time to play me, Pip. Every level can be won, so climb the ladder and try to beat them all!",
    },
    {
      id: "pip-level-1-mate",
      type: "puzzle",
      title: "Level 1: Beat Pip in One!",
      blurb: "One move to win.",
      fen: "6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt: "Pip's king is trapped! Find checkmate in ONE move to win Level 1.",
      hints: ["The king can't escape its own pawns.", "Slide the rook to the back row."],
      successText: "Level 1 complete! That's a checkmate. On to the next level! 🎉",
      solution: ["d1d8"],
    },
    {
      id: "pip-level-2-race",
      type: "drill",
      title: "Level 2: Pawn Race!",
      blurb: "Promote to win.",
      fen: "8/P7/8/8/8/8/8/3k1K2 w - - 0 1",
      orientation: "white",
      objective: "promote",
      engineSkill: 0,
      instructions: "Race your pawn to the top of the board to make a queen and win! Tap the pawn and march it home.",
      successText: "Level 2 complete! Your pawn became a queen. 👑",
    },
    {
      id: "pip-level-3-power",
      type: "drill",
      title: "Level 3: Big Power Mate",
      blurb: "Queen + rook vs Pip.",
      fen: "4k3/8/8/8/8/8/3Q4/R3K3 w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 0,
      instructions: "You have a queen AND a rook — loads of power! Push Pip's king to the edge and checkmate. Take your time.",
      successText: "Level 3 complete! You played it out and won with your big army. 💪",
    },
    {
      id: "pip-level-4-queen",
      type: "drill",
      title: "Level 4: Queen Mate",
      blurb: "King + queen vs Pip.",
      fen: "8/8/8/8/3k4/8/4Q3/4K3 w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 0,
      instructions: "Just a queen and your king now. Use the queen to box Pip's king to the edge, bring your king up to help, and checkmate — don't stalemate!",
      successText: "Level 4 complete! King and queen is the win you'll use the most. ⭐",
    },
    {
      id: "pip-level-5-rook",
      type: "drill",
      title: "Level 5: Rook Mate",
      blurb: "The toughest level!",
      fen: "4k3/8/8/8/8/8/8/R3K3 w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 0,
      instructions: "The final level! Just a king and a rook. Walk your king up to help the rook trap Pip's king against the edge. You can do it!",
      successText: "LEVEL 5 COMPLETE! King and rook is a real champion's checkmate. You climbed the whole ladder! 🏆",
    },
    {
      id: "you-did-it",
      type: "quiz",
      title: "You're a Chess Player!",
      blurb: "One last question.",
      question: "You beat every level! What's the best way to get even better now?",
      options: [
        "Never play another game of chess again.",
        "Play lots of games with friends and family!",
        "Hide the chess set away in a closet.",
      ],
      correctIndex: 1,
      explanation: "You did it! The best way to improve is to play and have fun. Pip is so proud of you! 🌟",
    },
  ],
};
