// Chess for Kids — Beware the Four-Move Trap (Scholar's Mate): spot it, defend
// it, and punish a careless attacker. Engine-verified puzzles. Champions' Road
// (Nim coaches; Murk taunts).

import type { Lesson } from "../../types";

export const scholarsMate: Lesson = {
  id: "kids-scholars-mate",
  title: "Beware the Four-Move Trap!",
  summary:
    "There's a sneaky trap that wins in just four moves — Scholar's Mate. Learn to see it coming, defend against it, and punish anyone who tries it carelessly.",
  activities: [
    {
      id: "kids-scholars-mate-concept",
      type: "concept",
      title: "The Four-Move Trap",
      blurb: "Guard the f7 square!",
      check: {
        question: "Which square does the four-move trap attack?",
        options: ["f7", "a1", "d4"],
        correctIndex: 0,
        explanation: "f7 is the weak spot — at the start, only the king guards it!",
      },
      body:
        "There's a famous trap called Scholar's Mate. The attacker points a bishop and the queen at one square — f7 — because at the start of the game only the king guards it.\n\nIf you're not watching, it's checkmate in four moves! But it's easy to stop once you know the secret: guard f7 and don't let the queen come crashing in. Let's learn to see it, stop it, and turn it around.",
    },
    {
      id: "scholars-trap-replay",
      type: "replay",
      title: "Watch the Trap Spring",
      blurb: "See how it works.",
      dialogue: {
        intro: {
          speaker: "nim",
          text: "Boing! Watch closely, Caller — see how the bishop and queen gang up on f7!",
          mood: "happy",
        },
      },
      orientation: "white",
      intro: "Here's the trap in action. Watch the bishop and queen both aim at f7 — and the careless knight move that lets it happen.",
      steps: [
        { san: "e4", note: "White opens the center." },
        { san: "e5", note: "Black does the same." },
        { san: "Bc4", note: "The bishop points straight at f7. Sneaky!" },
        { san: "Bc5", note: "Black copies — but doesn't notice the danger." },
        { san: "Qh5", note: "Now the queen aims at f7 too. Two attackers, one defender!" },
        { san: "Nf6", note: "A careless move — it does NOT defend f7!" },
        { san: "Qxf7#", note: "Checkmate! The queen takes f7, guarded by the bishop. Game over in four moves." },
      ],
    },
    {
      id: "scholars-defend",
      type: "sort",
      title: "Stop the Trap!",
      blurb: "How does Black survive?",
      prompt: "White's queen and bishop both attack f7 — checkmate is threatened! What is Black's best defense?",
      fen: "rnbqk1nr/pppp1ppp/8/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3",
      orientation: "white",
      options: [
        { label: "Play Qe7 to guard f7", emoji: "🛡️" },
        { label: "Ignore it and move a rook pawn", emoji: "😴" },
      ],
      correctIndex: 0,
      explanation:
        "Qe7 brings a second guard to f7, so the queen can't crash in. Now Black is fine — and White's queen is out too early and can be chased. Always meet the threat on f7!",
    },
    {
      id: "scholars-punish",
      type: "puzzle",
      title: "Punish the Careless Move!",
      blurb: "Checkmate in one.",
      dialogue: {
        intro: {
          speaker: "nim",
          text: "They left f7 wide open, Caller — finish it in one move!",
          mood: "happy",
        },
        onWrong: {
          speaker: "murk",
          text: "Hee! That's not the mate. Look at f7 again!",
          mood: "sly",
        },
      },
      fen: "rnbqk2r/pppp1ppp/5n2/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt: "Black just played a careless knight move and left f7 undefended. Deliver checkmate in one!",
      hints: ["Your queen and bishop both hit f7.", "Take the f7 pawn with your queen — the bishop guards it."],
      successText: "Checkmate! Qxf7# — the queen captures, the bishop defends her, and the king can't escape. That's the four-move trap!",
      solution: ["h5f7"],
    },
    {
      id: "scholars-avoid",
      type: "quiz",
      title: "Never Fall For It",
      blurb: "Pip's safety rule.",
      question: "What's the best way to make sure you never lose to the four-move trap?",
      options: [
        "Watch the f7 square and meet any threat to it before developing carelessly.",
        "Bring your own queen out super early to race the other player to f7 first.",
        "Move only your rook pawns for the first several moves of every single game.",
      ],
      correctIndex: 0,
      explanation:
        "Keep an eye on f7, develop your knights and bishop to guard it (a knight to f6 and the queen or a piece covering f7), and meet the threat before it lands. See it coming, and the trap can never get you.",
    },
  ],
};
