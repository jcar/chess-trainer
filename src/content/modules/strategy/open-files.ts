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
        "Doubling rooks multiplies pressure and forces a breakthrough.",
        "A rook on the 7th rank attacks pawns and traps the king.",
      ],
    },
    {
      type: "quiz",
      id: "of-rooks",
      title: "Where rooks belong",
      blurb: "Give your rooks scope.",
      question: "Where do rooks belong?",
      options: [
        "On the same file as the enemy king always.",
        "On open or half-open files where they have scope.",
        "Behind their own pawns for safety.",
      ],
      correctIndex: 1,
      explanation:
        "Rooks are long-range pieces that need open lines to do their work. " +
        "A rook stuck behind its own pawns sees nothing; placed on an open or " +
        "half-open file it can hit enemy pawns and invade.",
    },
    {
      type: "sort",
      id: "of-seventh",
      title: "Pig on the 7th",
      blurb: "Why the 7th rank is gold.",
      prompt: "Your rook reaches the enemy's 7th rank. Why is that great?",
      fen: "6k1/R4ppp/8/8/8/8/5PPP/6K1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "It attacks pawns and traps the king" },
        { label: "It threatens to promote" },
      ],
      correctIndex: 0,
      explanation:
        "A rook on the 7th rank sits right where the enemy pawns started, " +
        "munching them from the side, while pinning the enemy king to its back " +
        "rank. That double duty is why it's called a 'pig on the seventh.'",
    },
    {
      type: "quiz",
      id: "of-double",
      title: "Doubling rooks",
      blurb: "Two are better than one.",
      question: "What does 'doubling rooks' on a file achieve?",
      options: [
        "It is required before castling.",
        "It defends your back rank.",
        "It multiplies pressure and helps you invade.",
      ],
      correctIndex: 2,
      explanation:
        "Stacking both rooks on the same open file concentrates force: the " +
        "opponent can't hold the file with one defender, and you break through " +
        "to invade the 7th or 8th rank.",
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
      intro:
        "Watch how a single pawn trade pries open a file — and how the side " +
        "that grabs it first turns the open line into an invasion.",
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
          note:
            "Black hurries to develop, but White already owns the open file. " +
            "Re1 next pressures the pinned knight and stamps control of the line.",
        },
      ],
    },
  ],
};
