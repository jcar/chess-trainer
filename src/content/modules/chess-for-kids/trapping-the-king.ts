// Trapping the King — gentle checkmate on-ramps BEFORE the harder K+Q / K+R
// single-piece mates. Concept quiz + a "box the king" replay + a big mate-in-1
// practice set + an easy two-heavy-piece mate drill. All puzzles engine-verified.

import type { Lesson } from "../../types";

export const trappingTheKing: Lesson = {
  id: "kids-trapping-king",
  title: "Trapping the King",
  summary:
    "Checkmate is easy once you know the secret: push the enemy king to the edge, then trap it. Let's practice!",
  activities: [
    {
      id: "kids-trapping-king-concept",
      type: "concept",
      title: "The Checkmate Secret",
      blurb: "Push the king to the edge.",
      body: "Here's the secret to checkmate: push the enemy king to the edge of the board, where it has fewer places to run. Then you can trap it!",
    },
    {
      id: "trap-where",
      dialogue: {
        intro: { speaker: "nim", mood: "happy", text: "Which way do we chase the king, Caller? Toward the edge — pick it!" },
      },
      type: "quiz",
      title: "The checkmate secret",
      blurb: "Where do you trap the king?",
      question: "To checkmate the king, where do you want to push it?",
      options: [
        "Into the middle, where it has lots of room.",
        "To the EDGE or a CORNER, with fewer places to run.",
        "Right next to your own king to keep it close.",
      ],
      correctIndex: 1,
      explanation: "Push the king to the edge! In the middle it has 8 escape squares; in the corner it has only 3. Trapping is much easier at the edge.",
    },
    {
      id: "trap-box-replay",
      type: "replay",
      title: "Box in the King",
      blurb: "King + rook teamwork.",
      orientation: "white",
      startFen: "k7/8/2K5/8/8/8/8/1R6 w - - 0 1",
      intro: "Watch how your king and rook work together to trap the lonely king in the corner.",
      steps: [
        { san: "Kc7", note: "Walk your KING up close to take away escape squares. Now the black king is stuck on the edge!" },
        { san: "Ka7", note: "The black king has only one square to go to — it's almost trapped." },
        { san: "Ra1#", note: "Checkmate! The rook slides over and the king is boxed in with nowhere to run. Your king did the trapping; the rook did the mating." },
      ],
    },
    {
      id: "trap-mate-in-1",
      type: "practiceSet",
      title: "Checkmate in One!",
      blurb: "Find the mate. Win 4 to master!",
      intro: "Each puzzle has a checkmate in ONE move. The enemy king is already on the edge — finish it! Get 4 right to master it.",
      requiredCorrect: 4,
      items: [
        {
          fen: "6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
          orientation: "white",
          goal: { type: "mate", inMoves: 1 },
          prompt: "Slide the rook to the back row for mate!",
          solution: ["d1d8"],
        },
        {
          fen: "7k/1R6/8/8/8/8/8/R3K3 w - - 0 1",
          orientation: "white",
          goal: { type: "mate", inMoves: 1 },
          prompt: "Two rooks make a ladder — deliver mate!",
          solution: ["a1a8"],
        },
        {
          fen: "k7/2Q5/2K5/8/8/8/8/8 w - - 0 1",
          orientation: "white",
          goal: { type: "mate", inMoves: 1 },
          prompt: "Bring the queen close — your king guards her!",
          solution: ["c7b7"],
        },
        {
          fen: "1k6/ppp5/8/8/8/8/8/3R2K1 w - - 0 1",
          orientation: "white",
          goal: { type: "mate", inMoves: 1 },
          prompt: "Back-rank mate — the king is stuck behind its pawns!",
          solution: ["d1d8"],
        },
        {
          fen: "7k/R7/8/8/8/8/8/1R5K w - - 0 1",
          orientation: "white",
          goal: { type: "mate", inMoves: 1 },
          prompt: "One rook guards the 7th row — the other delivers mate!",
          solution: ["b1b8"],
        },
        {
          fen: "7k/8/5K2/8/8/8/6Q1/8 w - - 0 1",
          orientation: "white",
          goal: { type: "mate", inMoves: 1 },
          prompt: "Your king covers the escape — bring the queen in for mate!",
          solution: ["g2g7"],
        },
      ],
    },
    {
      id: "trap-qr-drill",
      type: "drill",
      title: "Your First Real Checkmate",
      blurb: "Queen + rook vs. the lonely king.",
      fen: "4k3/8/8/8/8/8/1Q6/R3K3 w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 0,
      instructions:
        "You have a queen AND a rook — tons of power! Use them to push the king to the edge (like a ladder) and checkmate. Take your time.",
      successText: "Checkmate! With a queen and rook it's like a ladder — one piece checks, the other guards. You did it!",
    },
  ],
};
