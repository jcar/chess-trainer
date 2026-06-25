import type { Lesson } from "../../types";

// Pip's Challenge #3 — after openings, trapping the king, first mates, tricks,
// and pawn endgames. Final guardian (Blue Belt) before the play-vs-Pip finale.
// Mixes in earlier concepts for spaced review.
export const checkpoint3: Lesson = {
  id: "kids-checkpoint-3",
  title: "Pip's Challenge: Tricks & Tactics",
  summary: "Openings, tricks, and trapping the king — the final test before you play!",
  activities: [
    {
      id: "checkpoint-3",
      type: "reviewCheckpoint",
      title: "Pip's Final Challenge",
      blurb: "Good first moves, forks, pins, and trapping the king.",
      intro:
        "The biggest challenge yet! Ace Pip's questions to earn your Blue Belt and get ready to play.",
      masteryBar: 0.7,
      successText: "Incredible — you're ready for anything. Blue Belt earned! 🥋",
      items: [
        {
          conceptId: "opening-principles",
          question: "A great first move grabs the…",
          options: ["Center", "Corner", "Edge"],
          correctIndex: 0,
          explanation: "Control the center — it gives your pieces the most power!",
        },
        {
          conceptId: "opening-principles",
          question: "Early in the game you should…",
          options: [
            "Get knights and bishops out",
            "Bring the queen out alone",
            "Move only one pawn over and over",
          ],
          correctIndex: 0,
          explanation: "Develop your pieces and castle your king to safety.",
        },
        {
          conceptId: "fork",
          question: "A fork attacks…",
          options: ["Two pieces at once", "One pawn", "Nothing"],
          correctIndex: 0,
          explanation: "Two pieces at once — they can't both run away!",
        },
        {
          conceptId: "pin",
          question: "A pin means a piece…",
          options: [
            "Can't move without losing something bigger",
            "Moves two times",
            "Disappears",
          ],
          correctIndex: 0,
          explanation: "It's stuck — moving it would expose a bigger piece behind it.",
        },
        {
          conceptId: "tactic-spotting",
          question: "To find tricks, always look for…",
          options: ["Checks and captures", "Pretty squares", "The clock"],
          correctIndex: 0,
          explanation: "Checks and captures are where forks and skewers hide!",
        },
        {
          conceptId: "trap-to-edge",
          question: "To checkmate a lonely king, push it to the…",
          options: ["Edge or corner", "Center", "Square it started on"],
          correctIndex: 0,
          explanation: "Trap it on the edge, then your pieces deliver mate.",
        },
        {
          conceptId: "piece-values",
          question: "Should you trade your queen for a single pawn?",
          options: ["No way!", "Yes, always", "Only on Tuesdays"],
          correctIndex: 0,
          explanation: "Never give up your strongest piece for a weak one!",
        },
      ],
    },
  ],
};
