// Chapter 5 — Mating Material: which pieces can force mate, the famous
// exceptions, and how NOT to stalemate a won game. "Learn → See → Try" template
// with legal teaching diagrams + checks and a worked-example ladder replay.
// Original prose; positions engine-verified.

import type { Lesson } from "../../types";

export const ch5: Lesson = {
  id: "ch5-more-mates",
  title: "5. Mating Material",
  summary:
    "Not every advantage can force mate. See which pieces can finish the job, the famous exception, and how to avoid throwing away a win by stalemate — then mate with two rooks yourself.",
  activities: [
    {
      id: "ch5-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "How much force does mate take?",
      body:
        "Being a piece up doesn't always mean you can win. Some material can force checkmate against a lone king; some simply can't. Knowing the difference tells you what to keep when you trade pieces in a winning game.\n\nWe'll look at what mates and what doesn't, meet the famous two-knight exception, learn the one trap that throws away won games — stalemate — and then you'll deliver a two-rook mate yourself.",
      points: [
        "Queen, rook, or two bishops can force mate; a lone minor can't.",
        "Two knights vs a lone king is the famous non-win.",
        "Stalemate is how winners blow it — we'll learn to avoid it.",
      ],
    },
    {
      id: "ch5-more-mates-concept",
      type: "concept",
      title: "Which material can mate",
      blurb: "Not every advantage is enough.",
      body:
        "To force mate you must control enough squares to trap the king at the edge. A queen, a rook, or two bishops can do it (and bishop + knight can too, though that one is notoriously hard). A single bishop or a single knight cannot — there just aren't enough squares covered, so the king always slips away and the game is a draw.\n\nIn the diagram, White has a lone bishop. No matter how perfectly White plays, the bishop and king can never corner a lone king. Keep this in mind when simplifying: trade down to a rook, a queen, or a pawn that can promote — not to a single minor piece.",
      diagrams: [
        {
          fen: "4k3/8/8/8/8/8/3B4/4K3 w - - 0 1",
          orientation: "white",
          caption: "King + a single bishop can never force mate — the lone king always escapes. Draw.",
        },
      ],
      check: {
        question: "King and ONE bishop versus a lone king. With best play, the result is:",
        options: ["A draw — not enough force to mate", "A forced win for the bishop's side", "An automatic stalemate"],
        correctIndex: 0,
        explanation:
          "A lone bishop (or lone knight) can't control enough squares to trap a king. It's a draw. You need a rook, queen, two bishops, or bishop + knight to force mate.",
      },
    },
    {
      id: "ch5-two-knights-concept",
      type: "concept",
      title: "The two-knight surprise",
      blurb: "Two pieces up — still a draw.",
      body:
        "Here's the fact that surprises everyone: king and TWO knights cannot force mate against a lone king. You can give check, you can chase, but every forcing attempt either lets the king escape or produces stalemate — a draw.\n\n(If the defender also has a pawn, it can sometimes become a win, because the pawn gives the king a move and avoids the stalemate. But bare king versus two knights is a draw with best play.)",
      diagrams: [
        {
          fen: "4k3/8/8/8/8/8/3NN3/4K3 w - - 0 1",
          orientation: "white",
          caption: "Two knights vs a lone king: there's always an escape or a stalemate. Not a forced win.",
        },
      ],
      check: {
        question: "King and two knights versus a bare king is generally:",
        options: ["A draw — it can't be forced", "An easy win like king and rook", "Illegal under the rules"],
        correctIndex: 0,
        explanation:
          "Two knights can't force mate against a lone king — best defense always escapes or is stalemated. A famous and useful oddity.",
      },
    },
    {
      id: "ch5-stalemate-concept",
      type: "concept",
      title: "The winner's trap: stalemate",
      blurb: "No move, no check, no win.",
      body:
        "Even with a queen or rook to spare, there's one way to throw it all away: stalemate. If the lone king has no legal move while it is NOT in check, the game is an instant draw — and your whole advantage vanishes.\n\nLook at the diagram: it's Black's move, the king is not in check, but every square is covered. White stalemated a totally won position. The cure is a habit: before each move when you're winning, ask 'after this, does my opponent still have a legal move?' Leave the king one escape square until the moment you actually mate.",
      diagrams: [
        {
          fen: "k7/8/K7/8/8/8/8/1R6 b - - 0 1",
          orientation: "white",
          caption: "Black to move, NOT in check, but no legal square (a7/b7/b8 all covered). Stalemate — a wasted win.",
        },
      ],
    },
    {
      id: "two-rook-drill",
      type: "drill",
      title: "Drill: mate with two rooks",
      blurb: "Walk the ladder yourself.",
      fen: "4k3/8/8/8/8/8/4K3/R6R w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 1,
      instructions:
        "Two rooks versus a lone king. Use the ladder from Chapter 4: one rook holds a rank/file while the other checks, walking the king to the edge. Your king isn't needed. Drive the king to a back rank and mate.",
      successText:
        "Checkmate! Two rooks are the easiest heavy-piece mate — they fence the king to the edge by themselves. Notice you never needed your king's help.",
    },
    {
      id: "ch5-recap",
      type: "concept",
      title: "Recap: keep enough force",
      blurb: "What to keep, what to avoid.",
      body:
        "When you simplify a winning game, keep mating material: a queen, a rook, two bishops, or a pawn that can promote. Don't trade down to a lone knight or bishop — that's only a draw. And whenever you're winning, watch for stalemate: leave the lone king a square until the move you actually mate.\n\nThe surest way to make all of this automatic is reps against a real opponent. Practice converting winning endgames in the Endgame Trainer.",
      points: [
        "Keep a queen, rook, two bishops, or a promoting pawn.",
        "Lone bishop, lone knight, or two knights vs a bare king = draw.",
        "Always leave an escape square until the mating move.",
      ],
      practice: { tool: "endgames", label: "Practice endgames now" },
    },
  ],
};
