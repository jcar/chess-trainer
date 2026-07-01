// Chapter 8 — Beginner strategy: the ideas that guide moves when there's no tactic.
// "Learn → See → Try" template with legal teaching diagrams + checks. Original prose.

import type { Lesson } from "../../types";

export const ch8: Lesson = {
  id: "ch8-strategy",
  title: "10. Beginner Strategy",
  summary:
    "When nothing is forcing, strategy decides your move: target weaknesses, claim space, and know which pieces thrive in which positions.",
  activities: [
    {
      id: "ch8-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Choosing a move when nothing forces it.",
      body:
        "Most moves aren't forced by a check or capture — so what do you play? That's strategy: the slow ideas that pile up small advantages until they win.\n\nWe'll learn to hunt weak pawns, value space, and match your pieces to the position (bishops or knights?), then you'll pick the right plan on real boards.",
      points: [
        "Strategy guides you when there's no tactic.",
        "Target weaknesses, claim space, play your pieces' strengths.",
        "Learn the ideas, then choose the plan.",
      ],
    },
    {
      id: "ch8-strategy-concept",
      type: "concept",
      title: "Play toward weaknesses",
      blurb: "Find a target that can't run.",
      body:
        "When nothing is forcing, plans come from weaknesses — and the most reliable weakness is a pawn that no friendly pawn can defend. An 'isolated' pawn (no pawns on the files beside it) is the classic example: pieces must babysit it, and the square right in front of it becomes a hole you can plant a piece on.\n\nThe other half is space: pawns pushed further up the board give your pieces room to maneuver while the opponent's stay cramped. In the diagram, Black's d5-pawn is isolated — White's plan writes itself: blockade the square in front, then pile up on the pawn down the open c-file.",
      diagrams: [
        {
          fen: "r2q1rk1/pp3ppp/2n1bn2/3p4/8/2N1BN2/PP3PPP/R2Q1RK1 w - - 0 1",
          orientation: "white",
          caption: "Black's d5-pawn is isolated — no pawn on the c- or e-file can ever defend it. A lasting target.",
        },
      ],
      check: {
        question: "Why is Black's isolated d5-pawn a long-term weakness?",
        options: [
          "No pawn can defend it, so pieces must guard it — and d4 is a hole",
          "Isolated pawns can never be promoted",
          "It blocks Black's own king from castling",
        ],
        correctIndex: 0,
        explanation:
          "An isolated pawn must be defended by pieces (a chore), and the square in front of it can't be guarded by a pawn — so you blockade it and attack the pawn down the open file.",
      },
    },
    {
      id: "ch8-pieces-concept",
      type: "concept",
      title: "Match pieces to the position",
      blurb: "Bishops open, knights closed.",
      body:
        "Your pieces have personalities. Bishops love open positions with long, clear diagonals; knights prefer closed positions full of locked pawns they can hop over to reach squares a bishop can't. So when you choose what to trade and what to keep, read the pawn structure first.\n\nYour own pawns matter too: a bishop hemmed in by pawns sitting on its own color is a 'bad' bishop — keep your pawns on the opposite color to keep its diagonals open. The diagram is a closed position with locked chains, where the nimble knight outshines the blocked bishop.",
      diagrams: [
        {
          fen: "4k3/pp3ppp/2p1p3/2PpP3/3P4/8/PP3PPP/4K3 w - - 0 1",
          orientation: "white",
          caption: "Locked pawn chains — a closed position. Knights hop over the blockage; bishops get stuck behind it.",
        },
      ],
      check: {
        question: "In this closed position with locked pawn chains, which minor piece is usually stronger?",
        options: ["The knight — it hops over the locked pawns", "The bishop — it rakes the long diagonals", "They're always exactly equal"],
        correctIndex: 0,
        explanation:
          "Closed = knights. They jump over the blockage to reach squares the bishop, stuck behind its own pawns, never can. In open positions you'd want the bishop.",
      },
    },
    {
      id: "ch8-recap",
      type: "concept",
      title: "Recap: small edges add up",
      blurb: "A plan beats random moves.",
      body:
        "With no tactic on the board, let strategy choose: find a weakness to target (an isolated or backward pawn), grab space so your pieces breathe, and keep the pieces that suit the structure — bishops for open positions, knights for closed ones. When you're ahead, trade pieces and simplify; when behind, keep them on.\n\nStrategy clicks when you apply it in your own games. Go play, and on every quiet move ask: 'What's my plan, and what's the weakness?'",
      points: [
        "Find the weakness; that's where your plan comes from.",
        "Open → bishops, closed → knights; keep your pawns off your bishop's color.",
        "Ahead: trade pieces, keep pawns, simplify to win.",
      ],
      practice: { tool: "play", label: "Play a game now" },
    },
  ],
};
