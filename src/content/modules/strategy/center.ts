// Chess Strategy — Lesson 8: The Center. Original prose.

import type { Lesson } from "../../types";

export const centerLesson: Lesson = {
  id: "center",
  title: "The Center",
  summary:
    "Control the centre — but know the difference between a strong centre and an overextended one.",
  activities: [
    {
      type: "concept",
      id: "center-concept",
      title: "Owning the center",
      blurb: "Strong centre, or overextended one?",
      body:
        "Central control matters because pieces in the middle reach both wings in a move or two — a centralized knight fights for the whole board, a rim knight does little. But a big pawn centre is only strong while it's intact and supported.\n\nPush those pawns too far and they overextend: gaps open behind them and the proud centre becomes a row of targets. Against an enemy centre, the classic answer is a pawn break that challenges it before it can grow.",
      points: [
        "Central pieces influence both sides of the board.",
        "A big centre is strong only while it's supported and can't be undermined.",
        "An overextended centre is weak, not strong — gaps open behind it.",
        "Meet a big centre with a timely pawn break before it grows.",
      ],
      diagrams: [
        {
          fen: "rnbqkb1r/ppp1pppp/5n2/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
          orientation: "white",
          arrows: [{ from: "c4", to: "d5" }],
          caption:
            "White contests the centre with c4 against d5. The fight for the central squares is the opening's main business — whoever controls them reaches both wings fastest.",
        },
      ],
    },
    {
      type: "replay",
      id: "center-demo",
      title: "Hitting the centre",
      blurb: "Build it, then break it.",
      orientation: "white",
      eval: true,
      source: "French Defence",
      intro:
        "White builds a broad pawn centre; Black waits, then strikes at it with a " +
        "well-timed break to free the position. Watch the eval breathe as the centre " +
        "is built, advanced, and then challenged.",
      steps: [
        { san: "e4", note: "White claims the first central square." },
        { san: "e6", note: "Black prepares to challenge with ...d5 later." },
        { san: "d4", note: "Now White has the classic two-pawn centre." },
        { san: "d5", note: "Black hits the centre at once instead of letting it grow." },
        { san: "Nc3", note: "Defending e4 and developing toward the centre." },
        { san: "Nf6", note: "Adding a second attacker to the e4-pawn." },
        { san: "e5", note: "White pushes past — gaining space but committing the centre." },
        { san: "Nfd7", note: "The knight reroutes to hit the head of the pawn chain." },
        { san: "f4", note: "White over-protects e5, building a big advanced centre." },
        { san: "c5", keyIdea: "Strike the base of the chain", highlights: ["d4", "c5"], note: "The break! Black strikes at the base of the chain." },
        { san: "Nf3", note: "Developing and bracing the d4-pawn." },
        { san: "Nc6", note: "Piling on d4 — the centre is now the main battleground." },
      ],
    },
    {
      type: "guessMove",
      id: "center-guess",
      title: "Guess the Move: build the centre",
      blurb: "Predict the moves that claim the middle.",
      orientation: "white",
      source: "Caro-Kann, Advance Variation",
      intro:
        "You're White. Predict the central pawn moves. The thread: stake out the centre, then advance it for space — just keep it supported so it doesn't become a target.",
      moves: [
        "e4", "c6", "d4", "d5", "e5", "Bf5", "Nf3", "e6", "Be2",
      ],
      guessAt: [2, 4],
      notes: [
        undefined, undefined,
        "Build the classic two-pawn centre — maximum central control before Black challenges it.",
        undefined,
        "Advance and claim space, gaining a protected, cramping centre. The point: keep it supported so it stays a strength, not a row of targets.",
        undefined, undefined, undefined, undefined,
      ],
      successText:
        "Centre built and advanced with support — that's how a pawn centre becomes a lasting space edge instead of a liability.",
    },
    {
      type: "plan",
      id: "center-plan-apply",
      title: "Find the plan, then convert",
      blurb: "Use the centre, then bring it home.",
      fen: "5rk1/ppp2ppp/8/3PP3/8/8/PP3PPP/2R1R1K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "You have a strong, supported pawn centre and an extra exchange. What's the plan?",
      options: [
        "Use the central pawns as a battering ram and the open file to invade, then convert.",
        "Trade the central pawns off as fast as possible.",
        "Shuffle the king and wait.",
      ],
      correctIndex: 0,
      explanation:
        "A healthy centre cramps Black and supports your invasion down the open file. Advance it with care and convert the extra material.",
      convert: {
        kind: "drill",
        drill: {
          fen: "5rk1/ppp2ppp/8/3PP3/8/8/PP3PPP/2R1R1K1 w - - 0 1",
          orientation: "white",
          objective: "checkmate",
          engineSkill: 2,
          instructions:
            "White to play. Use your central pawns and the open file to invade with the rooks and convert into checkmate.",
          successText: "Converted — a strong centre plus the extra exchange decides it.",
        },
      },
    },
  ],
};
