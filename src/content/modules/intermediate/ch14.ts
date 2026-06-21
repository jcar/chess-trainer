// Chapter 14 — Intermediate tactics. Puzzle positions are engine-verified
// (sound + unique). Original prose throughout.

import type { Lesson } from "../../types";

export const ch14: Lesson = {
  id: "ch14-tactics",
  title: "14. Sharper Tactics",
  summary:
    "Calculate forcing moves first, then learn the recurring weapons: the discovered attack, removing the defender, deflection — and the prettiest mate of all.",
  activities: [
    {
      id: "ch14-tactics-concept",
      type: "concept",
      title: "How to find tactics",
      blurb: "Forcing moves, then patterns.",
      body:
        "Tactics rarely appear out of nowhere — you find them by looking in the right place. Scan the forcing moves first: every check, every capture, and every direct threat. Because they limit the opponent's replies, they're both the easiest to calculate and the most likely to hide a combination.\n\nOnce you're hunting in the right spots, it's the recurring weapons that do the damage: the discovered attack (move one piece to unleash another), removing the defender (knock out the piece holding everything together), and deflection (force an overloaded piece off one of its two jobs). Learn the patterns and you'll spot them at a glance.",
      points: [
        "Always calculate checks, captures, and threats first.",
        "Discovered attacks fire two threats from a single move.",
        "Remove or deflect the defender, then collect what it was guarding.",
      ],
    },
    {
      id: "forcing-moves",
      type: "quiz",
      title: "Calculate forcing moves first",
      blurb: "Where to point your attention.",
      question:
        "When looking for a tactic, which moves should you calculate FIRST?",
      options: [
        "Quiet little pawn moves out on the wing that very slowly improve your pawn structure.",
        "Forcing moves: checks, captures, and threats that limit the opponent's replies.",
        "Only queen moves, since the queen is your most powerful attacker.",
        "Whichever move happens to look the prettiest on the board.",
      ],
      correctIndex: 1,
      explanation:
        "Checks, captures, and threats force the opponent's hand, so they're easiest to calculate and most likely to be tactics. Scan every check and capture before anything else — that habit alone finds most combinations.",
    },
    {
      id: "smothered-mate",
      type: "puzzle",
      title: "Smothered mate",
      blurb: "The king, trapped by its own army.",
      fen: "6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt:
        "White to play and checkmate in one. The black king is hemmed in by its own rook and pawns.",
      hints: [
        "The king on h8 can't move — every square around it is blocked by its own pieces.",
        "Only a knight can reach past those defenders to give check.",
      ],
      successText:
        "Checkmate! Nf7# is the 'smothered mate' — the king is suffocated by its own rook and pawns, and only the knight can deliver the blow. A pattern worth memorizing for life.",
      solution: ["g5f7"],
    },
    {
      id: "knight-fork-tactic",
      type: "puzzle",
      title: "Fork into the position",
      blurb: "A capture that forks two pieces.",
      fen: "r3k2r/ppp2ppp/4N3/3q4/8/8/PPP2PPP/R3K2R w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 3 },
      prompt:
        "White to play. Your knight can leap in with check and hit the queen at the same time — find it.",
      hints: [
        "Look for a knight move to c7 — it would check the king on e8.",
        "From c7, the knight also attacks the queen on d5.",
      ],
      successText:
        "Won the queen! Nxc7+ forks the king and the queen on d5. After the king moves, Nxd5 collects the queen. The knight is the ultimate forking piece — always check what it hits.",
      solution: ["e6c7", "e8f8", "c7d5"],
    },
    {
      id: "discovered-attack",
      type: "quiz",
      title: "Discovered attack",
      blurb: "Two threats from one move.",
      question:
        "A 'discovered attack' works by:",
      options: [
        "Moving a piece so the one behind it is unleashed on a target, often threatening too.",
        "Hiding your queen behind a pawn so the opponent cannot see where it is really aiming.",
        "Throwing every one of your pieces at the enemy king in a single coordinated assault.",
        "Castling on the queenside to swing the rook into the attack with an element of surprise.",
      ],
      correctIndex: 0,
      explanation:
        "You move a front piece and 'discover' the attack of the piece behind it. Because the moving piece can ALSO create a threat (even a check), the opponent often can't deal with both. A discovered CHECK is especially deadly — the moving piece can grab material with impunity.",
    },
    {
      id: "removing-the-defender",
      type: "quiz",
      title: "Removing the defender",
      blurb: "Knock out the guard.",
      question:
        "Your opponent's knight is the only thing defending a key mating square. The tactical idea is to:",
      options: [
        "Ignore the defending knight entirely and play on a completely different part of the board.",
        "Eliminate or chase away that defender so the now-undefended square or piece falls.",
        "Offer a draw, since a defended mating square cannot be exploited.",
        "Trade the queens off at once to simplify into a safer endgame.",
      ],
      correctIndex: 1,
      explanation:
        "'Removing the defender' (or 'removing the guard') means taking out the piece holding everything together. Capture it, deflect it, or attack it so it must move — then collect what it was defending.",
    },
    {
      id: "deflection",
      type: "quiz",
      title: "Deflection & overloading",
      blurb: "Too many jobs for one piece.",
      question:
        "A piece is 'overloaded' when it has two defensive duties at once. You exploit this by:",
      options: [
        "Piling on a third defensive job until the piece can no longer cope.",
        "Deflecting it — forcing it to handle one duty so it abandons the other.",
        "Trading it off for a mere pawn to remove it from the board.",
        "Leaving it alone and looking for a tactic somewhere else instead.",
      ],
      correctIndex: 1,
      explanation:
        "An overloaded piece can't be in two places at once. Deflection forces it away from one of its duties (often with a check or a capture it must answer), and you cash in on the square or piece it was forced to abandon — a classic back-rank theme.",
    },
  ],
};
