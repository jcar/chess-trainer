// Strategy lesson 4 — Good Bishops & Bad Bishops. Original prose.

import type { Lesson } from "../../types";

export const bishopsLesson: Lesson = {
  id: "bishops",
  title: "Good Bishops & Bad Bishops",
  summary:
    "A bishop is only as good as its diagonals — keep your pawns off its colour.",
  activities: [
    {
      type: "concept",
      id: "bishops-concept",
      title: "Good and bad bishops",
      blurb: "A bishop is only as good as its diagonals.",
      body:
        "A bishop lives on diagonals, so its value depends on how open those diagonals are. A bishop blocked in by its own pawns — pawns fixed on the same colour it travels — is a 'bad' bishop with nowhere to go. A bishop with clear lines and real targets is a 'good' one.\n\nThe practical rule follows from this: keep your pawns on the opposite colour to your bishop. If you're stuck with a bad bishop, free it with a pawn break or trade it off.",
      points: [
        "Pawns on the bishop's colour block its diagonals.",
        "Place your pawns on the opposite colour to your bishop.",
        "A bad bishop won't improve on its own — free it or trade it.",
      ],
      diagrams: [
        {
          fen: "4k3/3p1p2/4p3/3pB3/3P1P2/4P3/8/4K3 w - - 0 1",
          orientation: "white",
          caption:
            "White's bishop sits OUTSIDE its pawn chain on an open diagonal — a good bishop. Black's would-be bishop is hemmed by pawns on d5/e6/f7 (its own colour) — the textbook bad bishop.",
        },
      ],
    },
    {
      type: "replay",
      id: "bishops-good-demo",
      title: "The better bishop",
      blurb: "Watch one side end up with the superior bishop.",
      orientation: "white",
      eval: true,
      source: "Queen's Gambit Declined",
      intro:
        "Here's how a small choice in the opening can leave you with a far better " +
        "bishop than your opponent. Watch how White keeps his pawns off the light " +
        "squares while Black's bishop gets walled in. The eval stays calm — a good-vs-bad " +
        "bishop is a slow, structural edge, not an instant attack.",
      steps: [
        { san: "d4", note: "White claims the centre." },
        { san: "d5", note: "Black answers symmetrically." },
        { san: "c4", note: "The Queen's Gambit — pressuring d5." },
        {
          san: "e6",
          note:
            "Black supports d5 — but this pawn sits on a light square, the same " +
            "colour as Black's light-squared bishop on c8.",
        },
        { san: "Nc3", note: "Developing and adding pressure to d5." },
        { san: "Nf6", note: "Black develops naturally." },
        {
          san: "Bg5",
          note:
            "White's dark-squared bishop comes out to an open, active diagonal.",
        },
        {
          san: "Be7",
          note: "Black's dark-squared bishop is fine, but the c8 bishop is the problem.",
        },
        { san: "e3", note: "Opening a path for White's light-squared bishop." },
        {
          san: "c6",
          note:
            "Black bolsters d5 again — another pawn on a light square, hemming " +
            "in the c8 bishop even more.",
        },
        {
          san: "Bd3",
          note:
            "White's light-squared bishop sits on an open diagonal aimed at the " +
            "kingside.",
        },
        {
          san: "Nbd7",
          keyIdea: "A bishop buried behind its own pawns",
          highlights: ["c8", "c6", "d5", "e6"],
          note:
            "Black's c8 bishop is now a classic bad bishop: its own pawns on e6, " +
            "d5, and c6 block its only diagonals. White's bishops both roam freely " +
            "— the better minor pieces are White's.",
        },
      ],
    },
    {
      type: "guessMove",
      id: "bishops-guess",
      title: "Guess the Move: place the bishops",
      blurb: "Predict where the bishops belong.",
      orientation: "white",
      source: "Queen's Gambit Declined",
      intro:
        "You're White. Predict the bishop moves. The question behind each: which diagonal gives this bishop the most scope — and keeps your pawns off its colour?",
      moves: [
        "d4", "d5", "c4", "e6", "Nc3", "Nf6", "Bg5", "Be7", "e3", "O-O", "Bd3",
      ],
      guessAt: [6, 10],
      notes: [
        undefined, undefined, undefined, undefined, undefined, undefined,
        "The dark-squared bishop steps to its most active diagonal, pinning the f6-knight — a good bishop with a clear target.",
        undefined, undefined, undefined,
        "The light-squared bishop takes an open diagonal toward Black's king. Note White's pawns sit on dark squares, off this bishop's colour.",
      ],
      successText:
        "Both bishops developed to open diagonals, pawns kept off their colours — that's how you end up with the better minor pieces.",
    },
    {
      type: "plan",
      id: "bishops-plan-apply",
      title: "Find the plan, then convert",
      blurb: "Back your bishops, then bring home the point.",
      fen: "2b2rk1/pp3ppp/2p1p3/3p4/3P1B2/3B4/PP3PPP/2R1R1K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "Your two bishops rake open diagonals; Black's c8-bishop is buried behind its own pawns. What's the plan?",
      options: [
        "Keep the bishops, open lines, and let the pair dominate while you convert the extra material.",
        "Trade your active bishops off to simplify the position.",
        "Lock the centre with pawn moves to make the position closed.",
      ],
      correctIndex: 0,
      explanation:
        "Two good bishops on an open board are a powerful team — never trade them for Black's passive piece, and never close the lines they thrive on. Open up and convert.",
      convert: {
        kind: "drill",
        drill: {
          fen: "2b2rk1/pp3ppp/2p1p3/3p4/3P1B2/3B4/PP3PPP/2R1R1K1 w - - 0 1",
          orientation: "white",
          objective: "checkmate",
          engineSkill: 2,
          instructions:
            "White to play. Keep the board open for your two bishops, invade with the rooks, and convert the extra material into checkmate.",
          successText: "Converted — the bishop pair on open lines is overwhelming.",
        },
      },
    },
  ],
};
