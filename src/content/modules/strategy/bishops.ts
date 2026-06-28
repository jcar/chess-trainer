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
      type: "quiz",
      id: "bishops-bad",
      title: "What is a bad bishop?",
      blurb: "Not all bishops are created equal.",
      question: "What makes a bishop 'bad'?",
      options: [
        "It is worth fewer points than a good bishop.",
        "Its own pawns sit on its colour, blocking its diagonals.",
        "It has not captured anything yet.",
      ],
      correctIndex: 1,
      explanation:
        "A 'bad' bishop is one whose own pawns are stuck on the same colour of " +
        "square it travels on. Those pawns block its diagonals, so it has no open " +
        "lines and ends up shuffling behind its own army doing nothing.",
    },
    {
      type: "sort",
      id: "bishops-fix",
      title: "Freeing a bad bishop",
      blurb: "What to do with a piece that's boxed in.",
      prompt:
        "You have a bad bishop hemmed in by your pawns. What's the plan?",
      fen: "4k3/3p1p2/4p3/3pB3/3P1P2/4P3/8/4K3 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Trade it off, or free it with a pawn break" },
        { label: "Keep it home to defend" },
      ],
      correctIndex: 0,
      explanation:
        "A bad bishop won't get better on its own. Either swap it for an enemy " +
        "piece, or push a pawn break to open a diagonal so the bishop can finally " +
        "breathe. Hiding it at home just leaves you a piece short.",
    },
    {
      type: "quiz",
      id: "bishops-pawns",
      title: "Pawns and your bishop",
      blurb: "A simple rule of thumb.",
      question:
        "Where should you usually place your pawns relative to your bishop?",
      options: [
        "On the same colour as the bishop.",
        "On the opposite colour to the bishop.",
        "All on the edge of the board.",
      ],
      correctIndex: 1,
      explanation:
        "Put your pawns on the opposite colour to your bishop. Then the pawns " +
        "and the bishop guard different squares, the diagonals stay clear, and " +
        "the bishop has room to roam.",
    },
    {
      type: "sort",
      id: "bishops-which-good",
      title: "Spot the good bishop",
      blurb: "One bishop is free, the other is stuck.",
      prompt: "Which bishop is the 'good' one?",
      fen: "4k3/pp3ppp/2p5/3p4/3P4/2P5/PP2BPPP/4K1B1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "The one with open diagonals" },
        { label: "The one behind its own pawns" },
      ],
      correctIndex: 0,
      explanation:
        "The good bishop is the active one, with open diagonals and real targets. " +
        "A bishop stuck behind its own fixed pawns may look safe, but it can't " +
        "influence the game.",
    },
    {
      type: "sort",
      id: "bishops-apply1",
      title: "Where to put the pawn break",
      blurb: "Free the bishop, don't bury it.",
      prompt:
        "Your bishop is boxed in by pawns on its own colour. Which pawn move helps it most?",
      fen: "4k3/5p2/3pp3/3p4/3P1B2/3KP3/5P2/8 w - - 0 1",
      orientation: "white",
      options: [
        { label: "A break that opens a diagonal for the bishop" },
        { label: "A push that fixes another pawn on the bishop's colour" },
      ],
      correctIndex: 0,
      explanation:
        "A bad bishop only improves when its diagonals open. Choose the pawn break that clears a line in front of it, not a push that adds yet another pawn on its colour — that would wall the bishop in even more and deepen the problem you are trying to solve.",
    },
    {
      type: "sort",
      id: "bishops-apply2",
      title: "Trade it or keep it?",
      blurb: "Your bad bishop, their good one.",
      prompt:
        "You're stuck with a bad bishop and can swap it for the opponent's active, well-placed bishop. Do it?",
      fen: "4k3/pp3p2/2p1p3/3pP3/3P4/2P5/PP3B2/4K1b1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Keep your bishop and play around it" },
        { label: "Trade — swap your worst piece for their best" },
      ],
      correctIndex: 1,
      explanation:
        "Trading a bad bishop for the enemy's good one is almost always a fine deal: you shed your weakest piece and remove their strongest in a single move. Clinging to a bishop that has no future just leaves you effectively playing a piece down.",
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
    {
      type: "quiz",
      id: "bishops-review",
      title: "Review: pawns and bishops",
      blurb: "The rule that keeps a bishop good.",
      question:
        "You have a bishop and a choice of where to fix your pawns. To keep the bishop strong, you should place your pawns...",
      options: [
        "On the opposite colour to your bishop, leaving its diagonals open.",
        "On the same colour as your bishop, to support it.",
        "All on the same file as your bishop.",
      ],
      correctIndex: 0,
      explanation:
        "Pawns on the bishop's own colour block its diagonals and turn it bad. Keep them on the opposite colour and the bishop stays mobile with clear lines.",
    },
  ],
};
