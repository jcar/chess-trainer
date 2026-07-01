// Chapter 6 — The five ways a game can be drawn.
// Original prose.

import type { Lesson } from "../../types";

export const ch6: Lesson = {
  id: "ch6-draws",
  title: "7. Draws",
  summary:
    "Half a point is sometimes the best result available. Know every way a game can end in a draw — both to claim them and to avoid them when you're winning.",
  activities: [
    {
      id: "ch6-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Half a point, and how to get (or avoid) it.",
      body:
        "Not every game is won or lost — many are drawn, splitting the point. A draw can be your best friend when you're losing or a heartbreak when you're winning, so you need to know every way a game ends in a tie.\n\nWe'll cover all five draw rules, then practice the two that decide real games: not stalemating a won position, and reaching for the draw when you're in trouble.",
      points: [
        "Five ways to draw — know them to claim and to avoid them.",
        "Don't stalemate a won game.",
        "Down material? Look for a draw before you resign.",
      ],
    },
    {
      id: "ch6-draws-concept",
      type: "concept",
      title: "The ways a game is drawn",
      blurb: "Half a point — sometimes the best result.",
      body:
        "A draw splits the point, and it can be the goal or the disaster depending on which side you're on. There are several ways a game ends in a draw: stalemate (no legal move while not in check), insufficient material (neither side has enough to mate), threefold repetition (the same position occurs three times), the fifty-move rule (fifty moves with no pawn move and no capture), and agreement.\n\nThe diagram shows insufficient material: a lone king and knight can never force mate, so the game is an automatic draw the moment you reach it. The practical lesson cuts both ways — when you're losing, draw rules are lifelines (perpetual check forces a repetition and saves the game); when you're winning, don't hand your opponent a stalemate or let the king escape into endless checks.",
      points: [
        "Draws: stalemate, insufficient material, repetition, fifty-move, agreement.",
        "Perpetual check is a draw by repetition — a losing side's escape.",
        "When winning, take care not to stalemate or get checked forever.",
      ],
      diagrams: [
        {
          fen: "4k3/8/8/8/8/4N3/8/4K3 w - - 0 1",
          orientation: "white",
          caption: "King + knight vs a lone king: mate is impossible. Insufficient material — an automatic draw.",
        },
      ],
      check: {
        question: "Only a king and a single knight are left against a lone king. The game is:",
        options: ["An immediate draw by insufficient material", "A win for the knight's side", "Decided by the fifty-move rule only"],
        correctIndex: 0,
        explanation:
          "Neither side can force mate, so it's a draw the moment that material is all that remains. King + bishop vs king is the same. (King + pawn can promote, so it's not automatic.)",
      },
    },
    {
      id: "ch6-mate-no-stalemate",
      type: "drill",
      title: "Drill: mate — and don't stalemate",
      blurb: "Deliver the king-and-queen mate without handing over the draw.",
      fen: "8/8/8/3k4/8/8/4Q3/3K4 w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 1,
      instructions:
        "King and queen versus a lone king: a forced win, and the most famous stalemate trap in chess. Herd the enemy king to the edge — keep your queen a knight's-move away so it can never be captured — then bring your own king up to help and deliver mate. The trap this lesson warns about: until the very move you give mate, always leave the king one legal square. Take its last square away without giving check and it's stalemate — a draw, and half a point thrown away.",
      successText:
        "Checkmate, no stalemate. That's the whole idea: when you're winning, leave the king a square until the instant you mate it. Rush it and you hand your opponent a draw.",
    },
    {
      id: "ch6-recap",
      type: "concept",
      title: "Recap: claim it or dodge it",
      blurb: "Draws cut both ways.",
      body:
        "Five ways to draw: stalemate, insufficient material, threefold repetition, the fifty-move rule, and agreement. The two that decide real games are stalemate (never trap a lone king with no check when you're winning) and perpetual check (when you're losing, repeat checks the enemy king can't escape, and claim the draw).\n\nThe instinct for both — spotting a stalemate before you blunder it, and finding a saving perpetual — comes from playing real games. Put it to work against a live opponent.",
      points: [
        "Winning: leave the king a square; don't get checked forever.",
        "Losing: hunt for stalemate tricks or a perpetual check.",
        "A draw is half a point — sometimes the best result available.",
      ],
      practice: { tool: "play", label: "Play a game now" },
    },
  ],
};
