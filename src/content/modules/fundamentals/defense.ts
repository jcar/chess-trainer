// Chapter — Defending: how to meet threats and save tough positions.
// "Learn → See → Try" template with legal teaching diagrams + checks. Original
// prose. The escape puzzle is rules-verified (chess.js) by `npm run validate`.

import type { Lesson } from "../../types";

export const defense: Lesson = {
  id: "fund-defense",
  title: "10. Defending",
  summary:
    "Attacks get the glory, but knowing how to defend wins just as many games. Learn the three replies to a check, how to spot the one move that holds, and how to trade and tidy your way out of trouble.",
  activities: [
    {
      id: "fund-defense-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Calm hands save games.",
      body:
        "Half of chess is being attacked — and the player who defends calmly keeps the points a panicked player throws away. Defense is a real, trainable skill, not just luck.\n\nWe'll start with the three ways to answer a check, build the habit of spotting the opponent's threat, and learn how trading and tidying steer you out of danger. Then you'll read a king's safety and escape a check yourself.",
      points: [
        "Answer a check: move, block, or capture.",
        "Every move, ask: 'What is my opponent threatening?'",
        "When worse, trade attackers and head for a quiet position.",
      ],
    },
    {
      id: "fund-defense-concept",
      type: "concept",
      title: "Answering a check",
      blurb: "Only ever three ways.",
      body:
        "When your king is in check you must answer it immediately, and there are only ever three ways: MOVE the king to a safe square, BLOCK the check by interposing a piece on the line, or CAPTURE the piece giving check. If none is possible, it's checkmate. (You may not castle out of check, and you can never simply ignore it.)\n\nIn the diagram, the bishop on b6 checks the king down the long diagonal. There's no black-squared piece to block with and nothing can take the bishop — so here only the first option works: step the king off the diagonal.",
      diagrams: [
        {
          fen: "6k1/8/1b6/8/8/8/6PP/6K1 w - - 0 1",
          orientation: "white",
          caption: "The bishop checks along the a7–g1 diagonal. No block, no capture — the king must move.",
        },
      ],
      check: {
        question: "Which of these is NOT a legal way to answer a check?",
        options: [
          "Castle your king to safety",
          "Capture the piece giving check",
          "Block the check by interposing a piece",
        ],
        correctIndex: 0,
        explanation:
          "The three legal replies are move, block, or capture. You may NOT castle out of check. If none of the three is available, it's checkmate.",
      },
    },
    {
      id: "def-three-replies",
      type: "quiz",
      title: "Meeting a check",
      blurb: "Only three ways.",
      question: "When your king is in check, what are your only possible responses?",
      options: [
        "Castle out of it, push a pawn, or simply offer to trade the queens off.",
        "Move the king, block the check with a piece, or capture the checking piece.",
        "Ignore it for one move, then deal with the check on your following turn.",
        "Always move the king — blocking and capturing are against the rules in check.",
      ],
      correctIndex: 1,
      explanation:
        "A check must be answered immediately, and there are exactly three legal ways: move the king to a safe square, interpose a piece to block the line, or capture the piece giving check. (You can't castle out of check.) If none is possible, it's checkmate.",
    },
    {
      id: "def-threat-first",
      type: "quiz",
      title: "Spot the threat",
      blurb: "Always ask what they want.",
      question: "What's the single most useful defensive habit on every move?",
      options: [
        "Make your own plan and never waste time worrying about the opponent.",
        "Before moving, ask what the opponent threatens if you do nothing.",
        "Trade a pair of pieces every single turn to keep the game simple.",
        "Always retreat your most valuable piece to the safety of the back rank.",
      ],
      correctIndex: 1,
      explanation:
        "Most blunders are walking into a threat you never looked for. After your opponent moves, ask 'if I do nothing, what's his idea?' Find the threat first — then you can meet it, or play your own move if it's faster.",
    },
    {
      id: "def-only-move",
      type: "quiz",
      title: "The only move",
      blurb: "Sometimes there's just one.",
      question: "In a sharp position, you find a single move that holds everything together. What should you do?",
      options: [
        "Distrust it and quickly play a safer-looking move somewhere else instead.",
        "Play it — in tough spots the defense often hangs on one precise 'only move'.",
        "Offer a draw at once, since needing an only move means the game is lost.",
        "Move the king regardless, because the king is always the piece in danger.",
      ],
      correctIndex: 1,
      explanation:
        "Defense is often about precision, not options. When one move holds and the rest lose, that 'only move' is the whole game — calculate it, trust it, and play it. Training to find only-moves is what separates tough defenders from the rest.",
    },
    {
      id: "fund-defense-shelter-concept",
      type: "concept",
      title: "Keep your king sheltered",
      blurb: "Pawns are the king's armor.",
      body:
        "Most attacks succeed only because the defender's king got exposed. The pawns in front of a castled king — f2, g2, h2 (or f7, g7, h7) — are its armor. Pushing them or letting them be traded tears open lines straight to the king, so leave them put unless you have a concrete reason.\n\nWhen you're under fire, the surest defense is subtraction: trade off the opponent's most dangerous attacking pieces. An attack needs attackers — every one you swap off takes the sting out of it and brings you closer to a safe, quiet endgame.",
      diagrams: [
        {
          fen: "6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1",
          orientation: "white",
          caption: "An intact f–g–h pawn shield with no open lines pointing in: this king is safe. Keep it that way.",
        },
      ],
      check: {
        question: "You're defending and your king is castled behind f/g/h pawns. What keeps it safest?",
        options: [
          "Leave the pawn shield intact and trade off the attackers",
          "Push the f, g, and h pawns up to chase the attackers away",
          "March the king out toward the center for more squares",
        ],
        correctIndex: 0,
        explanation:
          "Keep the shield intact and reduce the attacking force by trading. Pushing the shield pawns opens lines to your own king — exactly what the attacker wants.",
      },
    },
    {
      id: "def-trade-attackers",
      type: "quiz",
      title: "Trade the attackers",
      blurb: "Fewer pieces, fewer threats.",
      question: "Your king is under attack and you're on the defensive. What's a sound general plan?",
      options: [
        "Open more lines near your king so your pieces have room to move around.",
        "Trade off the opponent's attacking pieces to take the sting out of the attack.",
        "Push all the pawns in front of your king forward to chase the attackers away.",
        "Leave your king in the center, where it has the most squares to run to.",
      ],
      correctIndex: 1,
      explanation:
        "An attack needs attackers. Every piece you trade off (especially the opponent's most active one) makes the assault weaker — exchanging into a quiet position or an endgame is the defender's best friend. Avoid opening lines and pushing the pawns that shield your king.",
    },
    {
      id: "def-king-safe-sort",
      type: "sort",
      title: "Apply it: is the king safe?",
      blurb: "Read the king's shelter.",
      prompt: "Look at White's king. Is its shelter healthy and safe, or exposed?",
      fen: "6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Safe — castled, with an intact pawn shield in front" },
        { label: "Exposed — the pawns are gone and it's wide open" },
      ],
      correctIndex: 0,
      explanation:
        "The king sits behind an unbroken f2–g2–h2 pawn shield with no open lines pointing at it — exactly the safe shelter you defend. Keep those pawns intact; pushing them or trading them is what opens a king up.",
    },
    {
      id: "def-escape-puzzle",
      type: "puzzle",
      title: "Get out of check!",
      blurb: "Step the king to safety.",
      fen: "6k1/8/1b6/8/8/8/6PP/6K1 w - - 0 1",
      orientation: "white",
      goal: { type: "escape" },
      prompt: "The bishop on b6 is checking your king along the long diagonal. Step the king off the diagonal to safety.",
      hints: ["The check comes down the a1–g1 diagonal.", "Move the king to a square that diagonal doesn't touch."],
      successText: "Saved! Kf1 steps off the checking diagonal. When in check, the simplest reply is often just to move the king to safety.",
      solution: ["g1f1"],
    },
    {
      id: "fund-defense-recap",
      type: "concept",
      title: "Recap: defend like a pro",
      blurb: "Don't panic — work the checklist.",
      body:
        "Under fire, run the checklist: answer a check by move/block/capture, ask what the opponent threatens before every move, keep your king's pawn shield intact, and trade off attackers to reach calm water. When only one move holds, trust it and play it.\n\nDefense is sharpened the same way attack is — by playing. Test your nerve against a live opponent and practice finding the move that holds.",
      points: [
        "Check? Move, block, or capture — never castle out of it.",
        "Find the threat first; keep the king's pawns intact.",
        "Trade attackers and steer for a quiet, holdable position.",
      ],
      practice: { tool: "play", label: "Play a game now" },
    },
  ],
};
