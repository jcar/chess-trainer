// Chapter — Piece Vision & Safe Moves. The beginner foundation the book makes
// central: SEEING what attacks and defends what, and not handing material away.
// This is the DEFENSIVE / awareness half (don't blunder, read the opponent);
// the OFFENSIVE "calculate forcing moves to find combinations" method lives in
// the Intermediate module (ch14), so the two don't overlap.
// "Learn → See → Try" template; concept diagrams are legal and engine-checked.

import type { Lesson } from "../../types";

export const pieceVision: Lesson = {
  id: "fund-piece-vision",
  title: "8. Piece Vision & Safe Moves",
  summary:
    "The habit that wins more games than any opening: see what attacks what, never hang a piece, and always ask what your opponent is up to before you move.",
  activities: [
    {
      id: "fund-piece-vision-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Stop losing pieces for free.",
      body:
        "Most beginner games aren't lost to deep strategy — they're lost to a piece left hanging for nothing. The cure is 'piece vision': seeing, on every move, what attacks what and what's defended. It's the single most valuable habit in chess.\n\nWe'll train your eye to spot loose pieces (yours and theirs), judge whether a capture is actually safe, and read what your opponent's last move is threatening. Build this habit and your results jump before you've learned a single new opening.",
      points: [
        "See what attacks what — every move, both sides.",
        "Never hand over a piece for free.",
        "Before you move, ask what your opponent wants.",
      ],
    },
    {
      id: "fund-piece-vision-concept",
      type: "concept",
      title: "Piece vision: what attacks what",
      blurb: "Read the board before you move.",
      body:
        "Piece vision is the habit of scanning, every move, which pieces attack which — and whether each attacked piece is defended. A piece that is attacked and NOT defended is 'hanging': free to take.\n\nIn the diagram, White's rook looks straight up the open e-file at Black's bishop on e5. Nothing defends that bishop, so it's hanging — White just plays Rxe5 and wins it for nothing. Train your eye to find loose pieces like this on every single move.",
      diagrams: [
        {
          fen: "4k3/8/8/4b3/8/8/8/4R1K1 w - - 0 1",
          orientation: "white",
          arrows: [{ from: "e1", to: "e5" }],
          caption: "The rook attacks the e5-bishop up the open file, and nothing defends it — the bishop is hanging.",
        },
      ],
      check: {
        question: "A piece is 'hanging' when it is:",
        options: [
          "Attacked and not defended — free to capture",
          "Sitting on the edge of the board",
          "The same color as the square it stands on",
        ],
        correctIndex: 0,
        explanation:
          "Hanging = attacked AND undefended. Spotting hanging pieces — your opponent's to win them, your own to save them — is the heart of piece vision.",
      },
    },
    {
      id: "fund-pv-dont-hang",
      type: "concept",
      title: "Don't hang your OWN pieces",
      blurb: "Vision protects you too.",
      body:
        "Piece vision points both ways. Before you commit to a move, look at your OWN pieces: is anything attacked and undefended? It's heartbreaking to lose a rook because you were busy with your own plan and never noticed it was under fire.\n\nIn the diagram, the black bishop attacks White's rook on e1, and no white piece defends it — your rook is hanging. You can't ignore it: move the rook to safety or defend it. Checking your own loose pieces before every move prevents most beginner blunders.",
      diagrams: [
        {
          fen: "6k1/8/8/8/1b6/8/8/4R1K1 w - - 0 1",
          orientation: "white",
          arrows: [{ from: "b4", to: "e1" }],
          caption: "The bishop attacks White's undefended rook on e1 — it's your piece that's hanging now.",
        },
      ],
    },
    {
      id: "fund-pv-opponent-wants",
      type: "concept",
      title: "What does your opponent want?",
      blurb: "Their last move had a point.",
      body:
        "Half of staying safe is reading the other side. Every time your opponent moves, pause and ask: 'What does that move threaten? What does my opponent want to do next?' Most blunders are simply walking into a threat you never looked for.\n\nIn the diagram, Black has just played the bishop to b4, lining it up against your undefended rook on e1. The threat is ...Bxe1, winning the rook next move. Because you asked what Black wanted, you can deal with it now — move the rook, defend it, or block the line — instead of being surprised.",
      diagrams: [
        {
          fen: "6k1/8/8/8/1b6/8/8/4R1K1 w - - 0 1",
          orientation: "white",
          arrows: [{ from: "b4", to: "e1" }],
          caption: "Black just played ...Bb4. The threat: ...Bxe1 wins the rook. Spot it before it happens.",
        },
      ],
      check: {
        question: "Your opponent makes a move. The first question to ask yourself is:",
        options: [
          "What does this move threaten — what do they want next?",
          "How many pieces does each side have left?",
          "Is it an even or an odd move number?",
        ],
        correctIndex: 0,
        explanation:
          "'What does my opponent want?' surfaces threats before they cost you material. Find the threat first; then meet it, or play your own move if it's faster.",
      },
    },
    {
      id: "fund-pv-win-it",
      type: "puzzle",
      title: "Your turn: spot the double attack",
      blurb: "One knight leap hits two pieces at once.",
      fen: "4r1k1/p4p2/5bp1/5q1p/6N1/7P/r4B2/1R3QK1 w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 2 },
      solution: ["g4h6", "g8g7", "h6f5"],
      prompt:
        "White to move. Piece vision isn't only about single attacks — look for a square where your knight hits TWO black pieces at the same time.",
      hints: [
        "Your knight on g4 is looking for a fork — one square that attacks two things.",
        "Jump to h6: it gives check to the king AND eyes the black queen.",
        "Nh6+ forks king and queen. The king must step aside, then Nxf5+ wins the queen.",
      ],
      successText:
        "Nh6+ attacks the king and the queen at once — a fork. The king has to move, and the queen falls. Seeing one move create two threats is piece vision at its sharpest.",
    },
    {
      id: "fund-piece-vision-recap",
      type: "concept",
      title: "The safe-move habit",
      blurb: "Three questions, every move.",
      body:
        "Make this routine automatic and you'll stop losing games to single blunders. Before every move, run three quick questions: 'What is my opponent threatening?', 'What's hanging — theirs to win, mine to save?', and 'After my move, is anything of mine left undefended?'\n\nIt feels slow at first and becomes instant with practice. The fastest way to wire it in is to play — and to actually pause and ask before each move.",
      points: [
        "What does my opponent want? (read their last move)",
        "What's hanging — for me to take, or to lose?",
        "Is my move safe — what can be captured after it?",
      ],
      practice: { tool: "play", label: "Play a game now" },
    },
  ],
};
