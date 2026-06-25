// "Walk the Pawn Home" — a gentle king-and-pawn endgame lesson for kids. Pip is a
// pawn, so this is his dream: march to the end and become a QUEEN! Teaches the one
// big idea — your king leads the way in front of the pawn. The drill is engine-
// verified winning (reused from the Endgame Trainer), played at the friendliest level.

import type { Lesson } from "../../types";

export const pawnPower: Lesson = {
  id: "kids-pawn-power",
  title: "Walk the Pawn Home",
  summary:
    "Pip's big dream: walk a pawn all the way to the other side and turn it into a QUEEN! The secret is letting your king lead the way.",
  activities: [
    {
      id: "kids-pawn-power-concept",
      type: "concept",
      title: "Pip's big dream: become a Queen!",
      blurb: "Your king is the pawn's bodyguard.",
      body:
        "Here's Pip's favorite secret: if a pawn reaches the very last row on the other side, it turns into a QUEEN! 👑\n\nBut the enemy king will try to stand in the way. The trick? Your OWN king goes first, like a bodyguard, walking in FRONT of the pawn to clear a path. Then the little pawn follows safely behind, step by step, all the way home. King leads, pawn follows!",
      points: [
        "Reach the last row and your pawn becomes a queen! 👑",
        "Your KING leads — walk it in front of the pawn.",
        "The pawn follows behind, one square at a time.",
      ],
    },
    {
      id: "kids-pawn-power-where",
      dialogue: {
        intro: { speaker: "pip", mood: "happy", text: "This part is close to my heart, Caller — help me find where a pawn becomes a queen!" },
      },
      type: "sort",
      title: "Where should your king go?",
      blurb: "Lead the way!",
      prompt: "You want to walk your pawn home. Where should your king go?",
      fen: "8/8/8/4k3/8/8/4P3/4K3 w - - 0 1",
      orientation: "white",
      options: [
        { label: "In FRONT of the pawn, leading the way", emoji: "👑" },
        { label: "Far away in the corner", emoji: "🏃" },
      ],
      correctIndex: 0,
      explanation:
        "Your king leads in FRONT of the pawn, clearing a path and pushing the enemy king aside. The pawn follows safely behind!",
    },
    {
      id: "kids-pawn-power-drill",
      type: "drill",
      title: "Make a Queen!",
      blurb: "Walk the pawn all the way home.",
      fen: "4k3/8/4K3/4P3/8/8/8/8 w - - 0 1",
      orientation: "white",
      objective: "promote",
      engineSkill: 0,
      instructions:
        "Walk your pawn to the top row to make a Queen! 👑 Lead with your KING — march it ahead to push the other king out of the way, then bring the pawn home behind it.",
      successText:
        "You did it — a brand new Queen! 👑 Leading with your king is how every pawn gets home. Pip is so proud!",
    },
    {
      id: "kids-pawn-power-quiz",
      type: "quiz",
      title: "What does a pawn become?",
      blurb: "The happy ending.",
      question: "When your pawn reaches the very last row, what can it turn into?",
      options: [
        "Nothing — it just stops there.",
        "A Queen (or another big piece) — the most powerful piece! 👑",
        "It disappears off the board.",
      ],
      correctIndex: 1,
      explanation:
        "A pawn that reaches the end turns into a Queen (you can even pick a rook, bishop, or knight — but the queen is strongest!). That's why walking a pawn home can win the game.",
    },
  ],
};
