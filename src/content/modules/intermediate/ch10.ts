// Chapter 10 — Intermediate openings for White: London, Vienna, Alapin Sicilian.
// Original prose; opening lines are standard theory. Two lines per opening.

import type { Lesson } from "../../types";

export const ch10: Lesson = {
  id: "ch10-white-openings",
  title: "10. White Openings to Own",
  summary:
    "Three dependable weapons for White — the London System, the Vienna, and the Alapin against the Sicilian — each with a main line and a key variation.",
  activities: [
    {
      id: "london-main",
      type: "replay",
      title: "London System — main setup",
      blurb: "Same plan against almost anything.",
      orientation: "white",
      intro:
        "The London is a 'system': you aim for the same setup — pawns d4/e3/c3, bishop out to f4 before locking it in, knights to d2 and f3. Easy to learn, hard to break.",
      steps: [
        { san: "d4", note: "Claim the center." },
        { san: "d5", note: "Black answers in the center." },
        { san: "Nf3", note: "Develop the kingside knight." },
        { san: "Nf6", note: "Black develops." },
        { san: "Bf4", note: "The London move — get the bishop OUTSIDE the pawn chain before playing e3." },
        { san: "e6", note: "Black opens the bishop, accepting a slightly passive but solid setup." },
        { san: "e3", note: "Now support d4 and open the f1-bishop, with the c1-bishop already developed." },
        { san: "c5", note: "Black strikes at the d4-pawn — the standard freeing break." },
        { san: "c3", note: "Reinforce d4. The London triangle (d4-e3-c3) is rock solid." },
        { san: "Nc6", note: "Black develops and adds pressure to d4." },
        { san: "Nbd2", note: "The queenside knight develops behind the f3-knight, keeping the structure flexible." },
        { san: "Bd6", note: "Black challenges the strong f4-bishop." },
        { san: "Bg3", note: "Sidestep the trade; the bishop stays active on g3, eyeing the kingside." },
      ],
    },
    {
      id: "london-vs-kid",
      type: "replay",
      title: "London — vs. a kingside fianchetto",
      blurb: "When Black plays ...g6.",
      orientation: "white",
      intro:
        "If Black fianchettoes with ...g6 and ...Bg7, the London still works — but keep your dark-squared bishop healthy and prepare h3 so it's never trapped after ...Nh5.",
      steps: [
        { san: "d4", note: "Center." },
        { san: "Nf6", note: "Black heads for a King's-Indian-style setup." },
        { san: "Bf4", note: "Bishop out early, as always in the London." },
        { san: "g6", note: "Black prepares to fianchetto." },
        { san: "Nf3", note: "Develop." },
        { san: "Bg7", note: "The bishop eyes your center and queenside." },
        { san: "e3", note: "Solidify and open your light bishop." },
        { san: "O-O", note: "Black castles." },
        { san: "Be2", note: "Modest but sound development." },
        { san: "d6", note: "Black opens the g7-bishop's diagonal and prepares ...e5 or ...Nbd7." },
        { san: "O-O", note: "King safety. White has an easy, harmonious position. A useful follow-up is h3, which stops ...Nh5 from hitting the f4-bishop and makes a luft." },
      ],
    },
    {
      id: "vienna-main",
      type: "replay",
      title: "Vienna Game — quiet main line",
      blurb: "1.e4 with an early Nc3.",
      orientation: "white",
      intro:
        "The Vienna starts 1.e4 e5 2.Nc3 — developing while keeping the f-pawn free to advance later. Here's the calm, principled version.",
      steps: [
        { san: "e4", note: "Center." },
        { san: "e5", note: "Symmetry." },
        { san: "Nc3", note: "The Vienna: develop the knight and eye d5, keeping f2-f4 in reserve." },
        { san: "Nc6", note: "Black develops." },
        { san: "Bc4", note: "Aim at the f7 weak spot." },
        { san: "Nf6", note: "Black develops and hits e4." },
        { san: "d3", note: "Defend e4 solidly and open the c1-bishop." },
        { san: "Bc5", note: "Black mirrors, targeting f2." },
        { san: "Nf3", note: "Complete development; White has a comfortable Italian-like game." },
      ],
    },
    {
      id: "vienna-gambit",
      type: "replay",
      title: "Vienna Gambit — the aggressive line",
      blurb: "Strike with f4.",
      orientation: "white",
      intro:
        "The point of 2.Nc3 is that f4 doesn't lose the e-pawn with check. The Vienna Gambit offers sharp, attacking play.",
      steps: [
        { san: "e4", note: "Center." },
        { san: "e5", note: "Symmetry." },
        { san: "Nc3", note: "Vienna." },
        { san: "Nf6", note: "Black develops and pressures e4." },
        { san: "f4", note: "The gambit! Because the knight guards e4, this is sound." },
        { san: "d5", note: "Black's best — counterstrike in the center rather than grabbing on f4." },
        { san: "fxe5", note: "Take the e-pawn." },
        { san: "Nxe4", note: "Black regains the pawn by capturing on e4." },
        { san: "Nf3", note: "Develop and prepare to fight for the initiative in a lively position." },
      ],
    },
    {
      id: "alapin-main",
      type: "replay",
      title: "Alapin Sicilian — 2.c3 vs ...d5",
      blurb: "Meet the Sicilian by building a center.",
      orientation: "white",
      intro:
        "Tired of memorizing Sicilian theory? The Alapin (2.c3) prepares d4 to build a big center. Against 2...d5, you reach an easy, IQP-style game.",
      steps: [
        { san: "e4", note: "Center." },
        { san: "c5", note: "The Sicilian." },
        { san: "c3", note: "The Alapin: prepare d2-d4 with pawn support." },
        { san: "d5", note: "A principled try — Black hits the center before White completes it." },
        { san: "exd5", note: "Capture." },
        { san: "Qxd5", note: "Black recaptures with the queen." },
        { san: "d4", note: "Build the center with tempo — the queen will be hit by Nf3 ideas later." },
        { san: "Nc6", note: "Black develops." },
        { san: "Nf3", note: "Develop and prepare to chase the queen with tempo; White has easy play." },
      ],
    },
    {
      id: "alapin-nf6",
      type: "replay",
      title: "Alapin Sicilian — 2.c3 vs ...Nf6",
      blurb: "When Black attacks e4.",
      orientation: "white",
      intro:
        "Black's other main try is 2...Nf6, hitting e4. White gains space by pushing the pawn and gets a comfortable French-like center.",
      steps: [
        { san: "e4", note: "Center." },
        { san: "c5", note: "Sicilian." },
        { san: "c3", note: "Alapin." },
        { san: "Nf6", note: "Attacking e4 immediately." },
        { san: "e5", note: "Push! The knight must move and White grabs central space." },
        { san: "Nd5", note: "The knight hops to its best square." },
        { san: "d4", note: "Build the broad center." },
        { san: "cxd4", note: "Black trades to relieve the tension." },
        { san: "Nf3", note: "Develop and prepare to recapture on d4, with a pleasant space edge." },
      ],
    },
    {
      id: "white-opening-idea",
      type: "quiz",
      title: "Why these openings?",
      blurb: "The practical thread.",
      question:
        "What do the London, Vienna, and Alapin have in common as practical choices?",
      options: [
        "They all force checkmate quickly.",
        "Each gives White a clear, repeatable plan with limited forced theory to memorize.",
        "They all sacrifice a piece on move 3.",
        "They can only be played against beginners.",
      ],
      correctIndex: 1,
      explanation:
        "All three are 'understanding over memorization' openings: a known structure and plan you can steer toward against most replies. That's exactly what makes them great practical weapons for improving players.",
    },
  ],
};
