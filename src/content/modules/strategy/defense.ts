// Strategy lesson — Defense, prophylaxis, and saving difficult positions. The
// curriculum otherwise assumes you're winning; this teaches how to hold worse
// positions and rescue lost ones. All prose original; positions are legal and
// illustrative (judgment exercises, not forced lines).

import type { Lesson } from "../../types";

export const defenseLesson: Lesson = {
  id: "defense",
  title: "Defense & Saving Lost Positions",
  summary:
    "Half of chess is played from the worse side. How to defend stubbornly, prevent the opponent's plan (prophylaxis), and find the saving resources — counterplay, fortresses, and the perpetual.",
  activities: [
    {
      type: "concept",
      id: "defense-concept",
      title: "The art of defense",
      blurb: "Worse positions are won and lost too.",
      body:
        "Nobody wins every position out of the opening — so the players who defend well score far more than their position 'deserves'. Good defense is active, not passive: look for counterplay, trade off the opponent's most dangerous attackers, and make the most resilient move rather than the one that simply delays.\n\nWhen you're truly lost, chess still offers escape hatches: a perpetual check (endless checks the opponent can't dodge), a fortress (a setup the stronger side can't break), or trading down to a drawn ending. And the best defense is often prophylaxis — spotting the opponent's plan and preventing it before it starts.",
      points: [
        "Defend actively: seek counterplay and trade the dangerous attackers.",
        "Know the saving resources: perpetual check, fortress, drawn endings.",
        "Prophylaxis: ask 'what does my opponent want?' and stop it.",
        "Give back material to blunt an attack — a pawn or the exchange is cheap if it kills the initiative.",
      ],
      diagrams: [
        {
          fen: "5rk1/pp3ppp/2p5/8/3P4/2P1r3/PP4PP/R4RK1 w - - 0 1",
          orientation: "white",
          caption:
            "Black's rook has barged to e3. Passive defence drifts — instead, defend actively: challenge the intruder, trade off the dangerous piece, and seek your own counterplay.",
        },
      ],
    },
    {
      type: "quiz",
      id: "defense-mindset",
      title: "How to defend",
      blurb: "Active vs passive.",
      question: "You're worse but not lost. What's the soundest defensive approach?",
      options: [
        "Sit completely passive and shuffle pieces, hoping the opponent goes wrong.",
        "Defend actively — create counterplay and trade off the opponent's most dangerous piece.",
        "Immediately sacrifice material to force complications at any cost.",
        "Offer a draw every move until the opponent accepts.",
      ],
      correctIndex: 1,
      explanation:
        "Passive defense lets the stronger side improve at leisure. Active defense — counterplay, and trading the piece doing the most damage — gives the opponent problems to solve and is how most worse positions are held.",
    },
    {
      type: "sort",
      id: "defense-counterplay",
      title: "Find the defensive idea",
      blurb: "You're under pressure — what now?",
      prompt:
        "Black's pieces are more active and you're on the back foot. Which plan gives you the best practical chances?",
      fen: "5rk1/pp3ppp/2p5/8/3P4/2P1r3/PP4PP/R4RK1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Activate — challenge the intruding rook and seek counterplay" },
        { label: "Sit passively on the back rank and wait" },
      ],
      correctIndex: 0,
      explanation:
        "The black rook on e3 is the troublemaker. Challenging or trading it (and getting your own rooks active) defuses the pressure. Passive waiting just lets Black bring up reinforcements — active defense is almost always better.",
    },
    {
      type: "sort",
      id: "defense-prophylaxis",
      title: "Prophylaxis: stop the plan",
      blurb: "Prevent before you cure.",
      prompt:
        "Black would love to play ...b5, gaining queenside space and freeing the position. What's the prophylactic move?",
      fen: "r1bq1rk1/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQ1RK1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "a4 — stop ...b5 before it ever happens" },
        { label: "Ignore it and push for an attack" },
      ],
      correctIndex: 0,
      explanation:
        "Prophylaxis means preventing the opponent's idea. Playing a4 takes the ...b5 break away, leaving Black without an easy plan. Reading what your opponent wants — and quietly stopping it — is a hallmark of strong play.",
    },
    {
      type: "quiz",
      id: "defense-resources",
      title: "Saving a lost position",
      blurb: "The escape hatches.",
      question: "You're losing on material. Which is a real saving resource?",
      options: [
        "Hoping the opponent simply forgets they are winning.",
        "A perpetual check or a fortress — forcing a draw the opponent can't escape or break.",
        "Capturing as many pawns as possible before the end.",
        "Always trading queens to reach an endgame.",
      ],
      correctIndex: 1,
      explanation:
        "Even lost positions have lifelines: a perpetual check (the opponent's king can never escape the checks) or a fortress (a setup the extra material can't break down). Steering toward these — or toward a drawn ending — saves half a point that the scoreboard never forgets.",
    },
    {
      type: "guessMove",
      id: "defense-guess",
      title: "Guess the Move: defend solidly",
      blurb: "Predict the moves of a rock-solid defence.",
      orientation: "black",
      source: "Caro-Kann Defence",
      intro:
        "You're Black, choosing a sound, resilient setup against 1.e4. Predict the moves. The thread: resolve the centre cleanly and develop your pieces to safe, active squares — especially the bishop, BEFORE it gets shut in.",
      moves: [
        "e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Bf5", "Ng3", "Bg6", "h4", "h6",
      ],
      guessAt: [5, 7],
      notes: [
        undefined, undefined, undefined, undefined, undefined,
        "Resolve the central tension cleanly — no loose pawns, no weaknesses. A solid defender removes targets before the opponent can use them.",
        undefined,
        "Develop the light-squared bishop OUTSIDE the pawn chain. This is the whole point of the Caro-Kann: you avoid the bad bishop that hems in similar defences.",
        undefined, undefined, undefined, undefined,
      ],
      successText:
        "A clean centre and an active, un-trapped bishop: that's the foundation of resilient defence — give the attacker nothing to bite on.",
    },
    {
      type: "concept",
      id: "defense-practice",
      title: "Now put it to the test",
      blurb: "Defense is sharpened by playing.",
      body:
        "You can't really drill defense with flashcards — it shows up when a real opponent presses you. Play games against a strong setting, hang on in the worse positions, and review where you cracked. Calculating the opponent's threats every move (checks, captures, threats) is the defender's core habit.",
      practice: { tool: "play", label: "Play a game & review it" },
    },
  ],
};
