// Chapter 5 — Endgames II: which material can mate, and the two-rook conversion.
// Original prose; positions engine-verified.

import type { Lesson } from "../../types";

export const ch5: Lesson = {
  id: "ch5-more-mates",
  title: "5. Mating Material",
  summary:
    "Not every advantage can force mate. Learn which pieces can finish the job, the famous exception, and how to avoid throwing away a win by stalemate.",
  activities: [
    {
      id: "ch5-more-mates-concept",
      type: "concept",
      title: "Which material can mate",
      blurb: "Not every advantage is enough to win.",
      body:
        "Being up a piece doesn't always mean you can force checkmate against a lone king. A queen, a rook, or two bishops can do it; a single bishop or a single knight simply can't — there aren't enough squares to control. The famous oddity is two knights, which also cannot force mate against a bare king. Knowing this tells you how much force to keep when simplifying a won game.\n\nEven with winning material, there's one classic way to throw it all away: stalemate. If you trap the lone king so it has no legal move while it is NOT in check, the game is an instant draw. Before every move when you're winning, ask whether the opponent will still have a legal reply — leave an escape square until the moment you actually mate.",
      points: [
        "Queen, rook, or two bishops can force mate; a lone minor can't.",
        "Two knights vs a lone king is NOT a forced win.",
        "Beware stalemate — leave the king a square until you mate.",
      ],
    },
    {
      id: "which-material-mates",
      type: "quiz",
      title: "Can you force mate?",
      blurb: "Bare king versus...",
      question:
        "Against a lone king (and nothing else), which of these CANNOT force checkmate?",
      options: [
        "King and queen versus the lone king.",
        "King and rook versus the lone king.",
        "King and a single bishop, nothing more.",
        "King and two bishops versus the lone king.",
      ],
      correctIndex: 2,
      explanation:
        "A lone bishop (or a lone knight) can't force mate — there simply isn't enough control of squares. King+queen, king+rook, and king+two-bishops all win. King + bishop + knight wins too, but it's notoriously hard.",
    },
    {
      id: "two-knights-exception",
      type: "quiz",
      title: "The famous exception",
      blurb: "Two knights and a king...",
      question:
        "King and TWO knights versus a lone king is generally:",
      options: [
        "An easy forced win, like king and rook.",
        "Not a forced win against best defense by Black.",
        "Always a forced win in under ten moves.",
        "Illegal to play out under the rules of chess.",
      ],
      correctIndex: 1,
      explanation:
        "Two knights can't force mate against a lone king: every attempt either lets the king escape or produces stalemate. (With an extra enemy pawn on the board it can become winnable.) A surprising and useful fact.",
    },
    {
      id: "stalemate-danger",
      type: "quiz",
      title: "The winner's trap",
      blurb: "How to throw away a won game.",
      question:
        "You're up a queen against a lone king. What's the single biggest way to blow it?",
      options: [
        "Checking the king too often as you herd it.",
        "Stalemating the king — no legal move while NOT in check.",
        "Promoting one of your extra pawns to a second queen.",
        "Trading your queen to capture the enemy king outright.",
      ],
      correctIndex: 1,
      explanation:
        "Stalemate is the classic blunder when winning. Before each move, ask: 'If I play this, does my opponent still have a legal move?' Leave the king an escape square until the moment you actually deliver checkmate.",
    },
    {
      id: "two-rook-drill",
      type: "drill",
      title: "Drill: mate with two rooks",
      blurb: "The ladder, against a live opponent.",
      fen: "4k3/8/8/8/8/8/4K3/R6R w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 1,
      instructions:
        "Two rooks versus a lone king. Use the 'ladder': one rook holds a rank/file while the other checks, walking the king to the edge. Your king isn't even needed. Drive the king to a back rank and mate.",
      successText:
        "Checkmate! Two rooks are the easiest heavy-piece mate — they fence the king to the edge by themselves. Notice you never needed your king's help.",
    },
    {
      id: "lone-minor-quiz",
      type: "quiz",
      title: "A piece up — but a draw?",
      blurb: "When an extra piece isn't enough.",
      question:
        "Your opponent has only a king. You have a king and one knight (no pawns). The result with best play is:",
      options: [
        "You win by force with careful technique.",
        "A draw — a single knight can't force mate.",
        "You lose despite being a piece ahead.",
        "An automatic stalemate ends it at once.",
      ],
      correctIndex: 1,
      explanation:
        "It's a draw. A lone knight (like a lone bishop) cannot corner and mate a king. This is why, when simplifying a winning game, you must keep enough force — a rook, a queen, or a pawn that can promote.",
    },
  ],
};
