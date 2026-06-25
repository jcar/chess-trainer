// Chess for Kids — Lesson 8: your first checkmates (drills + ladder).

import type { Lesson } from "../../types";

export const l8: Lesson = {
  id: "kids-l8-first-mates",
  title: "8. Your First Checkmates",
  summary:
    "Now win for real! Practice the checkmates you'll use again and again — against the friendly robot.",
  activities: [
    {
      id: "kids-l8-first-mates-concept",
      type: "concept",
      check: {
        question: "To checkmate with a king and queen, you push the enemy king to the…",
        options: ["Edge of the board","Middle of the board","Square it started on"],
        correctIndex: 0,
        explanation: "Drive the lonely king to the edge, then your king helps the queen finish!",
      },
      title: "Time to Win!",
      blurb: "Your first checkmates.",
      body: "Now you get to win for real! Let's practice some easy checkmates you'll use over and over again.",
    },
    {
      id: "ladder-replay",
      dialogue: {
        intro: { speaker: "nim", mood: "happy", text: "Watch the two rooks climb like a ladder, pushing the king to the edge!" },
      },
      type: "replay",
      title: "The Two-Rook Ladder",
      blurb: "Two rooks walk the king to the edge.",
      orientation: "white",
      startFen: "8/8/4k3/8/8/8/R7/1R4K1 w - - 0 1",
      intro:
        "Two rooks can checkmate all by themselves! One rook checks, the other fences the king in. Watch the 'ladder'.",
      steps: [
        { san: "Rb6+", note: "Check! The king must go back a row." },
        { san: "Ke7", note: "It retreats." },
        { san: "Ra7+", note: "The other rook checks on the next row — the ladder climbs!" },
        { san: "Ke8", note: "The king is pushed to the edge." },
        { san: "Rb8#", note: "Checkmate! One rook covers the row below, the other gives check. No escape." },
      ],
    },
    {
      id: "kq-mate-drill",
      type: "drill",
      title: "Win with King and Queen",
      blurb: "The most common checkmate.",
      fen: "8/8/8/8/3k4/8/4Q3/4K3 w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 1,
      instructions:
        "Use your queen to push the king to the EDGE, then bring your king up to help. Then checkmate — but don't stalemate!",
      successText: "Checkmate! King and queen is the win you'll get the most. Great job!",
    },
    {
      id: "kr-mate-drill",
      type: "drill",
      title: "Win with King and Rook",
      blurb: "A little trickier.",
      fen: "4k3/8/8/8/8/8/8/R3K3 w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 1,
      instructions:
        "The rook can't do it alone — march your king up to help push the enemy king to the edge, then checkmate with the rook.",
      successText: "Checkmate! King and rook work as a team. You're getting strong!",
    },
    {
      id: "two-rook-drill",
      type: "drill",
      title: "Win with Two Rooks",
      blurb: "Do the ladder yourself!",
      fen: "4k3/8/8/8/8/8/4K3/R6R w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 1,
      instructions:
        "Use the ladder! One rook checks, the other holds a row, and walk the king to the edge for checkmate.",
      successText: "Checkmate! Two rooks are the easiest big mate — you climbed the ladder all by yourself!",
    },
    {
      id: "mate-in-2",
      type: "puzzle",
      title: "Checkmate in Two!",
      blurb: "A two-step finish.",
      fen: "k7/8/2K5/8/8/8/8/1R6 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 2 },
      prompt: "White to play and checkmate in TWO moves. First, take away the king's last square with YOUR king.",
      hints: ["Step your king to c7 — now the black king has only one move.", "After it goes to a7, the rook delivers mate."],
      successText: "Checkmate in two! Your king did the cornering and the rook finished the job.",
      solution: ["c6c7", "a8a7", "b1a1"],
    },
  ],
};
