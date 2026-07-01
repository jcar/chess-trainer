// Strategy lesson 11 — Open files and the 7th rank. Original prose.

import type { Lesson } from "../../types";

export const openFilesLesson: Lesson = {
  id: "open-files",
  title: "Open Files & the 7th Rank",
  summary:
    "Rooks belong on open files — and a rook on the 7th rank is a monster.",
  activities: [
    {
      type: "concept",
      id: "open-files-concept",
      title: "Open files & the 7th rank",
      blurb: "Give your rooks a highway.",
      body:
        "Rooks are long-range pieces that do nothing stuck behind their own pawns. They belong on open or half-open files, where they can hit enemy pawns and invade. Doubling both rooks on a file concentrates that force so a single defender can't hold the line.\n\nThe payoff of an open file is invasion. A rook that reaches the enemy's 7th rank munches pawns from the side and pins the king to its back rank — a 'pig on the seventh' that earns its name.",
      points: [
        "Put rooks on open or half-open files for scope.",
        "Double rooks to overwhelm a single defender and force the breakthrough.",
        "A rook on the 7th rank attacks pawns from the side and traps the king.",
        "Grab the open file first — the side that controls it gets the invasion.",
      ],
      diagrams: [
        {
          fen: "6k1/R4ppp/8/8/8/8/5PPP/6K1 w - - 0 1",
          orientation: "white",
          caption:
            "A rook on the 7th rank — the 'pig on the seventh'. It chews pawns from the side and pins the king to its back rank. This is the payoff for winning an open file.",
        },
      ],
    },
    {
      type: "puzzle",
      id: "of-back-rank",
      title: "Back-rank mate",
      blurb: "Invade the open file.",
      fen: "6k1/5ppp/8/8/8/8/6PP/R5K1 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt:
        "White's rook controls the open a-file. Deliver mate in one.",
      hints: [
        "The enemy king has no luft (escape square).",
        "Invade the back rank.",
      ],
      successText:
        "Ra8# — the rook crashes in on the open file and the king, hemmed in by " +
        "its own pawns, has no escape.",
      solution: ["a1a8"],
    },
    {
      type: "replay",
      id: "of-demo",
      title: "Seizing the file",
      blurb: "A file opens; a rook pours through.",
      orientation: "white",
      eval: true,
      source: "Ruy Lopez",
      intro:
        "Watch how a single pawn trade pries open a file — and how the side " +
        "that grabs it first turns the open line into an invasion. An open file " +
        "is a road, not a knockout — the eval stays modest while control is built.",
      steps: [
        { san: "e4", note: "White claims the centre." },
        { san: "e5", note: "Black mirrors." },
        { san: "Nf3", note: "Develop, eyeing e5." },
        { san: "Nc6", note: "Black defends the pawn." },
        { san: "Bb5", note: "Pinning the knight, a quiet build-up." },
        { san: "Nf6", note: "Black develops in turn." },
        {
          san: "d4",
          note: "White strikes in the centre to open lines.",
        },
        {
          san: "exd4",
          note: "Black captures — and the e-file is about to open.",
        },
        {
          san: "e5",
          note: "White pushes, kicking the knight and clearing the e-file.",
        },
        {
          san: "Ne4",
          note: "The knight jumps away; both armies feel the open centre.",
        },
        {
          san: "O-O",
          note:
            "White castles — and the rook now sits ready to swing to the open " +
            "e-file, the highway to Black's camp.",
        },
        {
          san: "Be7",
          keyIdea: "Whoever grabs the file first invades",
          arrows: [{ from: "e1", to: "e8" }],
          note:
            "Black hurries to develop, but White already owns the open file. " +
            "Re1 next pressures the pinned knight and stamps control of the line.",
        },
      ],
    },
    {
      type: "guessMove",
      id: "open-files-guess",
      title: "Guess the Move: pry open a file",
      blurb: "Predict the trades that open a highway for the rooks.",
      orientation: "white",
      source: "Slav Defence, Exchange Variation",
      intro:
        "You're White. Predict the moves. The thread: a single well-timed pawn trade opens a file — and whoever grabs that file first gets the invasion.",
      moves: [
        "d4", "d5", "c4", "c6", "cxd5", "cxd5", "Nc3", "Nf6", "Nf3",
      ],
      guessAt: [2, 4],
      notes: [
        undefined, undefined,
        "Challenge d5 — this is the pawn whose exchange will open the c-file.",
        undefined,
        "Trade to open the c-file. Now it's a highway: get a rook to c1 before Black contests it, and the file is yours.",
        undefined, undefined, undefined, undefined,
      ],
      successText:
        "The c-file is open. The race is on to occupy it first — control the file, then invade down it to the 7th rank.",
    },
    {
      type: "plan",
      id: "open-files-plan-apply",
      title: "Find the plan, then convert",
      blurb: "Use the file, then finish.",
      fen: "6k1/5ppp/8/8/8/8/6PP/R5K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "You own the open a-file and Black's king is stuck on the back rank. How do you finish?",
      options: [
        "Invade down the open file to the back rank — it's mate.",
        "Bring the king up to help over many moves.",
        "Trade the rook for a pawn to simplify.",
      ],
      correctIndex: 0,
      explanation:
        "The open file is a road straight to the enemy back rank. Ra8 invades and, with the king fenced in by its own pawns, delivers checkmate — the ultimate payoff for controlling the file.",
      convert: {
        kind: "puzzle",
        puzzle: {
          fen: "6k1/5ppp/8/8/8/8/6PP/R5K1 w - - 0 1",
          orientation: "white",
          goal: { type: "mate", inMoves: 1 },
          prompt: "White to play. Use the open file to deliver mate in one.",
          successText: "Ra8# — the open file delivered the rook straight to the back rank for mate.",
          solution: ["a1a8"],
        },
      },
    },
  ],
};
