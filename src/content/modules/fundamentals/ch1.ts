// Chapter 1 — Winning the Game.
// "Learn → See → Try" template: each idea gets a visual concept beat (board
// diagram + a check) before practice. Original prose; puzzles engine-verified,
// concept diagrams legal.

import type { Lesson } from "../../types";

export const ch1: Lesson = {
  id: "ch1-winning",
  title: "1. Winning the Game",
  summary:
    "What it actually means to win — checkmate — and the other ways a game ends. See checkmate and stalemate on the board, then deliver mate yourself.",
  activities: [
    {
      id: "ch1-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "How games are won, drawn, and lost.",
      body:
        "You can't win until you know what winning IS. The goal of chess isn't to capture the king — it's to TRAP it: that's checkmate, and it ends the game on the spot.\n\nWe'll look at checkmate and its sneaky cousin stalemate (a draw) on the board, learn the other ways a game can end, and then you'll deliver a few mates yourself.",
      points: [
        "Win by checkmate — trapping the enemy king.",
        "Stalemate is a DRAW, not a win — don't fall for it.",
        "See it, then do it.",
      ],
    },
    {
      id: "ch1-checkmate-concept",
      type: "concept",
      title: "Checkmate: the king is trapped",
      blurb: "In check, with no way out.",
      body:
        "A king is in 'check' when it's attacked. Checkmate is check with no legal escape: the king can't move to a safe square, the check can't be blocked, and the attacker can't be captured. The game ends instantly — the king is never actually taken.\n\nIn the diagram, the rook checks the king along the back rank. The king would love to run forward, but its own pawns sit on f7, g7, and h7 — every escape is gone.",
      diagrams: [
        {
          fen: "R5k1/5ppp/8/8/8/8/8/6K1 b - - 0 1",
          orientation: "white",
          caption: "The rook checks along the 8th rank; the king's own pawns block every escape. Checkmate.",
        },
      ],
      check: {
        question: "The king is in check and has no legal move. What is this?",
        options: ["Checkmate — the game is over and White wins", "Stalemate — a draw", "Just a normal check"],
        correctIndex: 0,
        explanation:
          "Check + no legal escape = checkmate. The king can't move (its pawns block it), the check can't be blocked, and the rook can't be captured. Game over.",
      },
    },
    {
      id: "ch1-stalemate-concept",
      type: "concept",
      title: "Stalemate: the winner's trap",
      blurb: "No move — but no check.",
      body:
        "Stalemate looks like checkmate but is a DRAW. It happens when the player to move has no legal move AND is not in check. A heartbreaking way to throw away a winning position.\n\nIn the diagram it's Black to move. The king on a8 isn't in check — but every square it could go to (a7, b7, b8) is covered by the queen. With no legal move and no check, the game is drawn.",
      diagrams: [
        {
          fen: "k7/8/1QK5/8/8/8/8/8 b - - 0 1",
          orientation: "white",
          caption: "Black to move: not in check, but no legal move anywhere. Stalemate — a draw.",
        },
      ],
      check: {
        question: "It's Black's move. The king is NOT in check but has no legal move. Result?",
        options: ["A draw by stalemate", "Black loses by checkmate", "White wins automatically"],
        correctIndex: 0,
        explanation:
          "No legal move + NOT in check = stalemate, a draw. The fix here was to leave the king one escape square (e.g. Qc7), or bring the king closer first, and mate next move.",
      },
    },
    {
      id: "back-rank-mate-1",
      type: "puzzle",
      title: "Try it: the back-rank mate",
      blurb: "Deliver the mate you just saw.",
      fen: "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt:
        "White to play and checkmate in one move. The king is fenced in by its own pawns.",
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
      title: "Try it: queen and king",
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
      title: "Try it: drive to the corner",
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
    {
      id: "ch1-recap",
      type: "concept",
      title: "Recap: the ways a game ends",
      blurb: "Win, lose, or draw.",
      body:
        "You win by checkmate — and you can also win if your opponent resigns or runs out of time. Not every game is decided on the board: a game can be drawn by stalemate, by agreement, or by a few other rules you'll meet in the Draws chapter.\n\nThe big takeaway: checkmate traps the king, stalemate (no move, no check) is only a draw, and a lone king is mated by driving it to the edge with your king's help.",
      points: [
        "Checkmate = trapped king → you win. Resignation and flag-fall win too.",
        "Stalemate (no move, not in check) = draw — leave an escape square until you mate.",
        "Drive the lone king to the edge; the king helps the queen or rook finish.",
      ],
    },
  ],
};
