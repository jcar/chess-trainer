// Chapter 1 — Winning the game.
// Topic outline only; all prose original, all positions engine-verified.

import type { Lesson } from "../../types";

export const ch1: Lesson = {
  id: "ch1-winning",
  title: "1. Winning the Game",
  summary:
    "What it actually means to win — checkmate — plus the other ways a game ends. Then practice spotting and delivering mate.",
  activities: [
    {
      id: "how-a-game-ends",
      type: "quiz",
      title: "How do you win?",
      blurb: "What 'winning' really means.",
      question:
        "You win a game outright (not on the clock, not by resignation) when you do what?",
      options: [
        "Capture the opponent's king.",
        "Put the king in check with no legal way out — checkmate.",
        "Capture the opponent's queen.",
        "Occupy all four central squares.",
      ],
      correctIndex: 1,
      explanation:
        "The king is never actually captured. Checkmate means the king is in check and has no legal escape — it can't move to safety, the check can't be blocked, and the attacker can't be captured. The game ends instantly.",
    },
    {
      id: "check-mate-stalemate",
      type: "quiz",
      title: "Check, checkmate, or stalemate?",
      blurb: "Three words that are easy to mix up.",
      question:
        "It's your opponent's turn. Their king is NOT in check, but they have no legal move at all. What's the result?",
      options: [
        "They lose by checkmate.",
        "They must skip their turn.",
        "The game is a draw by stalemate.",
        "You win automatically.",
      ],
      correctIndex: 2,
      explanation:
        "No legal move + not in check = stalemate, which is a draw. Compare: no legal move + IN check = checkmate (a loss). The difference is whether the king is currently under attack. This is why you must be careful not to stalemate a lone king when you're winning.",
    },
    {
      id: "back-rank-mate-1",
      type: "puzzle",
      title: "Mate in one: the back rank",
      blurb: "A king trapped by its own pawns.",
      fen: "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt:
        "White to play and checkmate in one move. Look at the squares around the black king.",
      solution: ["a1a8"],
      hints: [
        "The black king can't step onto the 7th rank — its own pawns block f7, g7, and h7.",
        "Your rook controls a whole file. Which file delivers check on the back rank?",
      ],
      successText:
        "Checkmate! Ra8 is the classic 'back-rank mate'. The king is fenced in by its own pawns and can't leave the 8th rank, where the rook now checks it.",
    },
    {
      id: "queen-corner-mate-1",
      type: "puzzle",
      title: "Mate in one: queen and king",
      blurb: "The king does the quiet work.",
      fen: "k7/2Q5/2K5/8/8/8/8/8 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt:
        "White to play and checkmate in one. Your king is the key — it already guards the escape squares.",
      solution: ["c7b7"],
      hints: [
        "Your king on c6 covers b7, b6, and a7 for you.",
        "Bring the queen right next to the enemy king, onto a square your king defends.",
      ],
      successText:
        "Checkmate! Qb7 is protected by your king on c6, so the cornered king can't capture it — and every other square is covered. A queen needs the king's help to mate.",
    },
    {
      id: "rook-mate-2",
      type: "puzzle",
      title: "Mate in two: drive to the corner",
      blurb: "A king and rook finish the job.",
      fen: "k7/8/2K5/8/8/8/8/1R6 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 2 },
      prompt:
        "White to play and force checkmate in two moves. First take away the king's last bit of breathing room.",
      solution: ["c6c7", "a8a7", "b1a1"],
      hints: [
        "Step your king to c7. Now the black king has only one legal move.",
        "After the king is forced to a7, the rook delivers mate along the a-file.",
      ],
      successText:
        "Checkmate! Kc7 boxes the king so its only move is to a7, and then Ra1# pins it to the edge with your king covering every escape. King + rook always wins — the king does the cornering, the rook does the checking.",
    },
  ],
};
