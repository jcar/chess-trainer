// Chapter 4 — Endgames I: the forced mates every player must know.
// Original prose; all positions engine-verified.

import type { Lesson } from "../../types";

export const ch4: Lesson = {
  id: "ch4-basic-mates",
  title: "4. Basic Checkmates",
  summary:
    "The mates you'll convert again and again: two rooks, king and queen, king and rook. Learn the technique, then deliver it against the engine.",
  activities: [
    {
      id: "why-king-helps",
      type: "quiz",
      title: "The king is a worker",
      blurb: "Why two rooks are easier than queen-and-king.",
      question:
        "Why can two rooks force checkmate without their king's help, while a lone queen cannot?",
      options: [
        "Rooks are worth more than a queen.",
        "Two rooks can cover two full ranks/files at once, fencing the king to the edge by themselves; one queen needs its king to guard escape squares and avoid stalemate.",
        "The queen isn't allowed to give checkmate alone.",
        "It's random which pieces can mate.",
      ],
      correctIndex: 1,
      explanation:
        "Two rooks 'ladder' the king to the edge, each covering a rank. A queen alone can check endlessly but can't trap the king without its own king nearby — and risks stalemate. That's why K+Q mate means bringing your king up.",
    },
    {
      id: "ladder-mate",
      type: "replay",
      title: "The two-rook ladder mate",
      blurb: "Rooks walk the king to the edge.",
      orientation: "white",
      startFen: "8/8/4k3/8/8/8/R7/1R4K1 w - - 0 1",
      intro:
        "Two rooks checkmate a lone king with no help from their own king. The 'ladder': one rook checks to push the king back a rank, the other takes over the next rank so it can't return.",
      steps: [
        { san: "Rb6+", note: "Check along the king's rank, forcing it backward toward the edge." },
        { san: "Ke7", note: "The king retreats. Now the other rook will fence off this rank." },
        { san: "Ra7+", note: "The ladder: the second rook claims the next rank with check." },
        { san: "Ke8", note: "The king is pushed to the back rank — out of room." },
        { san: "Rb8#", note: "Checkmate. Ra7 covers the 7th rank so there's no way down, and Rb8 covers the 8th." },
      ],
    },
    {
      id: "kq-vs-k-drill",
      type: "drill",
      title: "Drill: king and queen mate",
      blurb: "The most common winning endgame.",
      fen: "8/8/8/4k3/8/8/5Q2/4K3 w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 1,
      instructions:
        "King and queen versus a lone king. Use the queen to herd the king to the edge, then march YOUR king up to support the mate. Watch out: trapping the king with no check is stalemate — only a draw!",
      successText:
        "Checkmate delivered! The queen drives the king to the edge; your king provides the final support. This is the endgame you'll win most often.",
    },
    {
      id: "kr-vs-k-drill",
      type: "drill",
      title: "Drill: king and rook mate",
      blurb: "Harder than the queen — pure technique.",
      fen: "4k3/8/8/8/8/8/8/R3K3 w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 1,
      instructions:
        "King and rook versus king. The rook can't do it alone — use your king to take away squares, push the enemy king to the edge, and deliver mate with the rook along the back rank or file.",
      successText:
        "Well done! King and rook is a forced win, but it takes real coordination: the kings face off, and the rook delivers the blow. Master this and you'll never let a won game slip.",
    },
    {
      id: "two-rook-finish",
      type: "puzzle",
      title: "Finish the ladder",
      blurb: "One rook cuts off, the other mates.",
      fen: "7k/1R6/8/8/8/8/8/R3K3 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt:
        "White to play and checkmate in one. One rook already guards the 7th rank.",
      hints: [
        "The rook on b7 stops the king from escaping to g7 or h7.",
        "Bring the other rook to the back rank with check.",
      ],
      successText:
        "Checkmate! Ra8 delivers mate: the b7-rook covers the escape squares on the 7th rank, and the king can't reach the far rook to capture it. That's the ladder mate in its final form.",
      solution: ["a1a8"],
    },
  ],
};
