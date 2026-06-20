// Chapter 11 — Intermediate openings for Black: Scandinavian, Caro-Kann, QGD.
// Original prose; opening lines are standard theory. Two lines per defense.

import type { Lesson } from "../../types";

export const ch11: Lesson = {
  id: "ch11-black-openings",
  title: "11. Black Defenses to Own",
  summary:
    "A reliable answer to 1.e4 (Scandinavian or Caro-Kann) and to 1.d4 (Queen's Gambit Declined) — each shown with a main line and a key variation, from Black's side.",
  activities: [
    {
      id: "scandi-qa5",
      type: "replay",
      title: "Scandinavian — 3...Qa5",
      blurb: "Grab the center immediately.",
      orientation: "black",
      intro:
        "1...d5 strikes at e4 at once. After the trade you recapture with the queen, then tuck it to a5 out of harm's way. Simple and solid.",
      steps: [
        { san: "e4", note: "White's first move." },
        { san: "d5", note: "The Scandinavian — challenge e4 immediately." },
        { san: "exd5", note: "White captures." },
        { san: "Qxd5", note: "You recapture with the queen, eyeing the center." },
        { san: "Nc3", note: "White develops with tempo, attacking your queen." },
        { san: "Qa5", note: "Retreat to a5 — active, and the queen pins nothing but stays safe." },
        { san: "d4", note: "White takes the center." },
        { san: "Nf6", note: "Develop and prepare ...c6, ...Bf5/...Bg4." },
        { san: "Nf3", note: "White develops." },
        { san: "c6", note: "A useful little move: a retreat square for the queen and support for ...d5 ideas. Black has an easy game." },
      ],
    },
    {
      id: "scandi-qd6",
      type: "replay",
      title: "Scandinavian — 3...Qd6 (modern)",
      blurb: "A flexible queen retreat.",
      orientation: "black",
      intro:
        "The modern treatment retreats the queen to d6, where it supports the kingside and stays nimble. Many strong players prefer it to ...Qa5.",
      steps: [
        { san: "e4", note: "White's move." },
        { san: "d5", note: "Scandinavian." },
        { san: "exd5", note: "Capture." },
        { san: "Qxd5", note: "Recapture." },
        { san: "Nc3", note: "Tempo on the queen." },
        { san: "Qd6", note: "The modern square — safe, and the queen eyes the kingside." },
        { san: "d4", note: "White builds the center." },
        { san: "Nf6", note: "Develop and prepare ...g6 or ...a6/...b5 setups." },
        { san: "Nf3", note: "White develops; Black has a sound, flexible structure." },
      ],
    },
    {
      id: "caro-classical",
      type: "replay",
      title: "Caro-Kann — Classical",
      blurb: "Solid, with a good bishop.",
      orientation: "black",
      intro:
        "The Caro-Kann supports ...d5 with ...c6, so that after trades your light-squared bishop gets OUT to f5 — the piece that's often bad in the French.",
      steps: [
        { san: "e4", note: "White's move." },
        { san: "c6", note: "The Caro-Kann — prepare ...d5 with pawn support." },
        { san: "d4", note: "White takes the center." },
        { san: "d5", note: "Now challenge e4 on your terms." },
        { san: "Nc3", note: "White defends e4." },
        { san: "dxe4", note: "Trade in the center." },
        { san: "Nxe4", note: "White recaptures." },
        { san: "Bf5", note: "The key Caro move — develop the 'problem' bishop OUTSIDE the pawn chain, hitting the knight." },
        { san: "Ng3", note: "White's knight steps back and attacks the bishop." },
        { san: "Bg6", note: "Retreat; the bishop is well-placed and Black has a sound, easy-to-play position." },
      ],
    },
    {
      id: "caro-advance",
      type: "replay",
      title: "Caro-Kann — Advance Variation",
      blurb: "When White pushes e5.",
      orientation: "black",
      intro:
        "If White grabs space with 3.e5, the difference from the French shines: you develop your light bishop to f5 BEFORE playing ...e6, so it never gets trapped behind the pawns.",
      steps: [
        { san: "e4", note: "White's move." },
        { san: "c6", note: "Caro-Kann." },
        { san: "d4", note: "Center." },
        { san: "d5", note: "Challenge it." },
        { san: "e5", note: "White grabs space and closes the center." },
        { san: "Bf5", note: "Out goes the good bishop — the whole point of the Caro." },
        { san: "Nf3", note: "White develops." },
        { san: "e6", note: "Only NOW close the pawn chain; your bishop is already free outside it." },
        { san: "Be2", note: "White develops; Black will continue ...Ne7, ...c5 to strike at the base of the chain." },
      ],
    },
    {
      id: "qgd-main",
      type: "replay",
      title: "Queen's Gambit Declined — main line",
      blurb: "The gold standard vs 1.d4.",
      orientation: "black",
      intro:
        "Decline the gambit by supporting d5 with ...e6. The QGD is rock-solid: a slightly passive light bishop in exchange for a fortress-like center.",
      steps: [
        { san: "d4", note: "White's move." },
        { san: "d5", note: "Stake your claim." },
        { san: "c4", note: "The Queen's Gambit — White offers the c-pawn." },
        { san: "e6", note: "Declined: support d5 rather than grab the pawn (which you couldn't keep anyway)." },
        { san: "Nc3", note: "White develops, adding pressure to d5." },
        { san: "Nf6", note: "Defend d5 and develop." },
        { san: "Bg5", note: "White pins the knight to increase pressure on d5." },
        { san: "Be7", note: "Break the pin and prepare to castle." },
        { san: "e3", note: "White opens the bishop." },
        { san: "O-O", note: "Castle. Black is solid; the plan is ...c6, ...Nbd7, and freeing with ...c5 or ...dxc4 and ...e5 in time." },
      ],
    },
    {
      id: "qgd-exchange",
      type: "replay",
      title: "Queen's Gambit Declined — Exchange",
      blurb: "When White trades on d5.",
      orientation: "black",
      intro:
        "If White trades with cxd5, you recapture with the e-pawn, opening lines for your pieces. Understand the resulting 'minority attack' structure and you'll be at home.",
      steps: [
        { san: "d4", note: "White's move." },
        { san: "d5", note: "Center." },
        { san: "c4", note: "Queen's Gambit." },
        { san: "e6", note: "Declined." },
        { san: "Nc3", note: "Develop." },
        { san: "Nf6", note: "Defend d5, develop." },
        { san: "cxd5", note: "The Exchange Variation." },
        { san: "exd5", note: "Recapture with the e-pawn — this opens your light bishop and the e-file." },
        { san: "Bg5", note: "White pins." },
        { san: "Be7", note: "Break the pin; Black has a clear, symmetrical structure to navigate." },
      ],
    },
    {
      id: "black-defense-idea",
      type: "quiz",
      title: "Choosing a defense",
      blurb: "What suits your style?",
      question:
        "Which statement best matches these defenses to their character?",
      options: [
        "All three are wild gambits.",
        "Scandinavian: simple and direct; Caro-Kann: solid with an active bishop; QGD: ultra-solid central fortress.",
        "They only work against weak opponents.",
        "They all hang a pawn on move two.",
      ],
      correctIndex: 1,
      explanation:
        "Pick by temperament: the Scandinavian is the easiest to learn, the Caro-Kann is solid yet frees the bishop, and the QGD is the time-tested fortress. Any of them gives Black a healthy game with clear plans.",
    },
  ],
};
