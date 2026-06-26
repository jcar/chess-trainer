// Chapter 8 — Beginner strategy: the ideas that guide moves when there's no tactic.
// "Learn → See → Try" template with legal teaching diagrams + checks. Original prose.

import type { Lesson } from "../../types";

export const ch8: Lesson = {
  id: "ch8-strategy",
  title: "9. Beginner Strategy",
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
      id: "pawn-weaknesses",
      type: "quiz",
      title: "Pawn weaknesses",
      blurb: "Pawns can't move backward.",
      question:
        "Why is an 'isolated' pawn (no friendly pawns on the files beside it) often a weakness?",
      options: [
        "It is permanently barred from ever promoting to a queen.",
        "No pawn can defend it, and the square in front is an enemy outpost.",
        "It always ends up blocking your own king's escape squares.",
        "An isolated pawn is worth zero points in any trade.",
      ],
      correctIndex: 1,
      explanation:
        "An isolated pawn can't be defended by another pawn, so pieces must babysit it, and the square in front of it is a hole the opponent can occupy. Doubled and isolated pawns are classic long-term targets.",
    },
    {
      id: "space-advantage",
      type: "quiz",
      title: "Space",
      blurb: "Room to maneuver.",
      question:
        "What practical benefit does a space advantage (pawns further up the board) usually give?",
      options: [
        "It guarantees a forced checkmate later in the game.",
        "Your pieces maneuver freely while the opponent's are cramped.",
        "It wins a pawn immediately by force in the middlegame.",
        "It permanently prevents the opponent from castling.",
      ],
      correctIndex: 1,
      explanation:
        "Space lets your pieces reposition freely while the cramped side struggles to find good squares. Space isn't a direct win, but it makes everything else easier — and the cramped side often seeks to trade pieces for relief.",
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
      id: "open-vs-closed",
      type: "quiz",
      title: "Open vs. closed positions",
      blurb: "Bishops vs. knights.",
      question:
        "In a wide-open position with few pawns and long, clear diagonals, which minor piece tends to be stronger?",
      options: [
        "The knight, because it can jump over other pieces.",
        "The bishop, because it rakes long open diagonals from afar.",
        "They are always exactly equal regardless of structure.",
        "Neither — only the rooks really matter in open positions.",
      ],
      correctIndex: 1,
      explanation:
        "Open positions favor bishops, which love long, unobstructed diagonals. Closed positions (locked pawn chains) favor knights, which hop over the blockage and reach squares bishops can't. Match your plan to the structure.",
    },
    {
      id: "good-vs-bad-bishop",
      type: "quiz",
      title: "Good bishop, bad bishop",
      blurb: "Don't trap your own bishop.",
      question:
        "What makes a bishop a 'bad' bishop?",
      options: [
        "It happens to be the wrong color for the position.",
        "Its own pawns are fixed on its color, blocking its diagonals.",
        "It has not captured anything for the whole game.",
        "It started the game on the queenside, not the kingside.",
      ],
      correctIndex: 1,
      explanation:
        "A 'bad' bishop is hemmed in by its own pawns sitting on its color. Try to place your pawns on the opposite color to your bishop, keeping its diagonals open — and aim to trade off your bad bishop for a good enemy piece.",
    },
    {
      id: "trade-when-ahead",
      type: "quiz",
      title: "Simplify when ahead",
      blurb: "Turning an edge into a win.",
      question:
        "You're up a clean piece. As a general rule, which trades do you want?",
      options: [
        "Trade off the pawns and keep all the pieces on the board.",
        "Trade pieces, not pawns, to reach a winning endgame.",
        "Avoid every trade for the rest of the game.",
        "Trade away your extra piece as fast as you possibly can.",
      ],
      correctIndex: 1,
      explanation:
        "When ahead in material, trade PIECES to reduce the opponent's attacking chances and reach a simple, winning endgame — but keep pawns, since they're what you'll promote. When behind, do the opposite: keep pieces on and seek complications.",
    },
    {
      id: "ch8-apply-plan",
      type: "sort",
      title: "No tactics — what's the plan?",
      blurb: "Play toward the weakness.",
      prompt:
        "Nothing is forcing. Black has a weak, isolated d5-pawn and the c-file is open. What's White's plan?",
      fen: "r2q1rk1/pp3ppp/2n1bn2/3p4/8/2N1BN2/PP3PPP/R2Q1RK1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Blockade d4 and pile up on the d5-pawn" },
        { label: "Push the kingside pawns at once" },
        { label: "Trade everything into a draw" },
      ],
      correctIndex: 0,
      explanation:
        "Plans come from weaknesses. Park a knight on the d4 outpost (in front of the isolated pawn so it can't advance), then attack d5 with rooks down the open file. Random pawn pushes or mass trades throw away the edge.",
    },
    {
      id: "ch8-apply-piece",
      type: "sort",
      title: "Open or closed?",
      blurb: "Match the piece to the structure.",
      prompt:
        "The pawns are locked in long chains (a closed position). You can keep either your knight or your bishop — which do you want?",
      fen: "4k3/pp3ppp/2p1p3/2PpP3/3P4/8/PP3PPP/4K3 w - - 0 1",
      orientation: "white",
      options: [
        { label: "The knight" },
        { label: "The bishop" },
        { label: "It makes no difference" },
      ],
      correctIndex: 0,
      explanation:
        "Closed positions favor knights — they hop over the locked pawns to reach squares a bishop (stuck behind its own chain) never can. In open positions you'd want the bishop instead.",
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
