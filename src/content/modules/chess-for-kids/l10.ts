// Chess for Kids — Lesson 10: Play! (capstone games).

import type { Lesson } from "../../types";

export const l10: Lesson = {
  id: "kids-l10-play",
  title: "10. Play!",
  summary:
    "You've learned so much — now play! Race a pawn to the end and win a game against the friendly robot.",
  activities: [
    {
      id: "pawn-race",
      type: "drill",
      title: "Pawn Race!",
      blurb: "Get your pawn to the end first.",
      fen: "8/P7/8/8/8/8/8/3k1K2 w - - 0 1",
      orientation: "white",
      objective: "promote",
      engineSkill: 1,
      instructions:
        "Race your pawn up the board! Tap the pawn and march it to the very top to make a queen and win.",
      successText: "You promoted — you win the race! A pawn that reaches the end becomes a mighty queen.",
    },
    {
      id: "play-the-robot",
      type: "drill",
      title: "Beat the Friendly Robot",
      blurb: "Play a game and checkmate!",
      fen: "8/8/8/8/3k4/8/4Q3/4K3 w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 1,
      instructions:
        "You have a king and queen against the robot's lonely king. Play it out and checkmate — remember, push to the edge and bring your king to help!",
      successText: "Checkmate — you beat the robot! You're a real chess player now. 🎉",
    },
    {
      id: "you-did-it",
      type: "quiz",
      title: "You're a chess player!",
      blurb: "One last question.",
      question: "What's the BEST thing to do now that you've learned to play chess?",
      options: [
        "Never play again.",
        "Play lots of games with friends and family — and have fun!",
        "Hide all the chess sets.",
      ],
      correctIndex: 1,
      explanation: "You did it! The best way to get even better is to play and have fun. Well done — Pip is so proud of you! 🌟",
    },
  ],
};
