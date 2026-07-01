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
      id: "ch4-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Convert a winning game into a win.",
      body:
        "Winning material is only half the battle — you still have to deliver mate. A handful of basic checkmates come up again and again, and each is a forced win once the technique is in your hands.\n\nWe'll see how two rooks mate alone, why a single queen or rook needs your king's help, then you'll deliver each one against the engine.",
      points: [
        "Three mates to own: two rooks, king + queen, king + rook.",
        "All work by fencing the king to the edge.",
        "Watch each, then do each.",
      ],
    },
    {
      id: "ch4-basic-mates-concept",
      type: "concept",
      title: "Finishing a won game",
      blurb: "The mates you must know cold.",
      body:
        "Being ahead in material means nothing if you can't deliver the final blow. A few basic checkmates come up again and again — two rooks, king and queen, and king and rook — and each is a forced win once you know the technique. The common thread is fencing the lone king to the edge of the board, where it runs out of squares.\n\nTwo rooks can do this by themselves, 'laddering' the king back one rank at a time. A single heavy piece, though, needs help: your own king must march up to take away escape squares so the queen or rook can mate. In the diagram, the two kings stand face-to-face — that 'opposition' is what lets the rook deliver mate along the back rank.",
      points: [
        "Two rooks ladder the king to the edge on their own.",
        "King + queen and king + rook need YOUR king's help.",
        "Drive the king to an edge, then deliver mate.",
      ],
      diagrams: [
        {
          fen: "4k2R/8/4K3/8/8/8/8/8 b - - 0 1",
          orientation: "white",
          caption: "King + rook mate: the kings face off (opposition), and the rook checks along the back rank. Mate.",
        },
      ],
      check: {
        question: "In the diagram, what stops the black king from escaping the rook's check to e7 or d7?",
        options: [
          "White's king on e6 covers those squares",
          "The rook on h8 covers them",
          "Nothing — it isn't actually mate",
        ],
        correctIndex: 0,
        explanation:
          "The rook covers the 8th rank; White's king on e6 covers e7, d7, and f7. Rook + king together leave no escape — that's why a lone heavy piece needs the king's help.",
      },
    },
    {
      id: "ladder-mate",
      type: "replay",
      title: "The two-rook ladder mate",
      blurb: "Rooks walk the king to the edge.",
      orientation: "white",
      startFen: "8/8/4k3/8/8/8/R7/1R4K1 w - - 0 1",
      intro:
        "Two rooks checkmate a lone king with no help from their own king. The 'ladder' (also called the 'lawnmower'): one rook checks to push the king back a rank, the other takes over the next rank so it can't return.",
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
    {
      id: "ch4-recap",
      type: "concept",
      title: "Recap: never let a win slip",
      blurb: "Edge, escort, mate.",
      body:
        "Every basic mate is the same idea: drive the lone king to an edge, then deliver the final check with no escape. Two rooks do it alone by laddering; the queen and the rook each need your king marched up alongside to cover the escape squares. And always watch for stalemate when you're a queen or rook ahead.\n\nThese only become automatic with reps. Convert winning king-and-piece endings in the Endgame Trainer until they're second nature.",
      points: [
        "Drive the king to the edge; bring your king up to help.",
        "Two rooks ladder alone; queen/rook need the king's escort.",
        "Don't stalemate — leave a square until the mating move.",
      ],
      practice: { tool: "endgames", label: "Practice endgames now" },
    },
  ],
};
