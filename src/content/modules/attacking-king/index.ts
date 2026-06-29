// "Attacking the Castled King" module — how to break open a castled king: the
// classic sacrifices (the Greek gift), the weak squares (f7, g7, h7), pawn
// storms, and opposite-side castling races.
//
// All prose is original. The Greek-gift Lab is a legal, engine-checked line whose
// eval bar tells the story; every "deliver the blow" puzzle is engine-verified
// (sound + unique) by `npm run validate`. Patterns are public chess knowledge.

import type { Lesson, Module } from "../../types";

const overview: Lesson = {
  id: "ak-overview",
  title: "When to attack the king",
  summary: "An attack on the king isn't a mood — it's a decision you earn with open lines, extra attackers, and a weakened shelter.",
  activities: [
    {
      type: "concept",
      id: "ak-overview-concept",
      title: "The attacker's checklist",
      blurb: "Earn the attack before you launch it.",
      body:
        "Throwing pieces at the king only works when the position has earned it. Before you sacrifice, run the checklist: do you have OPEN or half-open lines pointing at the king? More ATTACKERS in the area than the defender has defenders? A lead in development or space so reinforcements arrive first? And is the king's pawn SHELTER weakened or about to be?\n\nThe targets are always the same squares. f7 and h7 are guarded only by the king early on — the natural landing spots for a bishop or knight. g7 is the soft spot once a king fianchettoes. And remember: before the sacrifice lands, it often pays to REMOVE a defender first (trade off the f6-knight, deflect the g7-bishop).",
      points: [
        "Attack when you have open lines, more attackers than defenders, and a weakened shelter.",
        "The weak squares: f7 and h7 (guarded only by the king) and g7 (the fianchetto hole).",
        "Remove or deflect the king's defenders before the blow lands.",
        "Opposite-side castling = a pawn-storm race; speed beats material.",
      ],
      diagrams: [
        {
          fen: "r1bq1rk1/ppp2ppp/2n2n2/3p4/3P4/3B1N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
          orientation: "white",
          arrows: [
            { from: "d3", to: "h7" },
            { from: "f3", to: "g5" },
          ],
          caption:
            "The attacking set-up: a bishop on d3 aimed at h7 and a knight ready to leap to g5. When the defenders thin out, this battery strikes.",
        },
      ],
    },
  ],
};

const greekGift: Lesson = {
  id: "ak-greek-gift",
  title: "The Greek Gift",
  summary: "Bxh7+ — the most famous sacrifice in chess. Give a bishop to rip open the king, then pour the pieces in.",
  activities: [
    {
      type: "concept",
      id: "ak-greek-gift-concept",
      title: "The classic bishop sacrifice",
      blurb: "Bxh7+ and the attack pours in.",
      body:
        "The Greek gift is the model king-attack sacrifice: Bxh7+!. After Kxh7, the knight jumps in with Ng5+ and the queen swings to h5 — three pieces crashing onto the exposed king. The bishop is gone, but the king's shelter is gone with it.\n\nIt isn't automatic — it works when the conditions are right: the king has castled with pawns on f7/g7/h7, there's NO black knight on f6 to defend h7, your knight can reach g5, and your queen can reach h5 (or g4/h4 quickly). Tick those boxes and the gift is a knockout. Miss one and you're just down a piece.",
      points: [
        "Bxh7+ Kxh7, then Ng5+ and Qh5 — three attackers on the bare king.",
        "Needs: pawns on f7/g7/h7, no ...Nf6 defender, and fast Ng5 + Qh5.",
        "If the conditions aren't met, it's just a lost bishop — check first.",
      ],
      diagrams: [
        {
          fen: "r1bq1rk1/pp1nbppp/2p1p3/3pP3/3P4/3B1N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
          orientation: "white",
          arrows: [{ from: "d3", to: "h7" }],
          caption:
            "All the boxes are ticked: bishop bearing on h7, knight ready for g5, no black knight defending f6/h7. Bxh7+ is winning.",
        },
      ],
      check: {
        question: "What's the single most important thing to check before playing the Greek gift Bxh7+?",
        options: [
          "That Black has no knight on f6 to defend h7, and your knight/queen can follow up fast.",
          "That you are ahead on material already.",
          "That it is move 20 or later in the game.",
        ],
        correctIndex: 0,
        explanation:
          "A defender on f6 (or a slow follow-up) turns the gift into a blunder. Confirm there's no ...Nf6, and that Ng5+ and Qh5 arrive in time, before you sacrifice.",
      },
    },
    {
      type: "replay",
      id: "ak-greek-gift-lab",
      title: "Strategy Lab: the gift crashes through",
      blurb: "Watch the sacrifice — and the eval bar — do their work.",
      orientation: "white",
      eval: true,
      source: "Greek Gift Sacrifice",
      startFen: "r1bq1rk1/pp1nbppp/2p1p3/3pP3/3P4/3B1N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
      intro:
        "White is already comfortable, but the Greek gift is a knockout. Watch the eval bar dip as White gives the bishop — then climb to mate as the attackers arrive. The sacrifice trades material for an unstoppable attack.",
      steps: [
        { san: "Bxh7+", keyIdea: "The Greek gift", note: "The classic bishop sacrifice — White rips open the king's shelter. The point is the attack, not the bishop." },
        { san: "Kxh7", note: "Black accepts. (Declining leaves White a clean pawn up and still attacking.)" },
        { san: "Ng5+", note: "The knight leaps in with check — the essential follow-up. The king must run." },
        { san: "Kg8", note: "Back into the corner. (...Kg6 walks into Qg4 and the h-pawn; ...Kh6 meets Nxf7+ ideas.)" },
        { san: "Qh5", keyIdea: "Third attacker arrives", note: "Threatening Qh7#. Bishop, knight, and now the queen — more attackers than the lone king has defenders." },
        { san: "Re8", note: "Black tries to make luft for the king via f8 — but it doesn't stop the mating net." },
        { san: "Qh7+", note: "Driving the king into the open." },
        { san: "Kf8", note: "The king's own bishop on e7 and rook on e8 block its only escapes." },
        { san: "Qh8#", keyIdea: "Crashed through", note: "Checkmate. Three pieces against a bare king — and the king's own pieces slammed the back door. That's the Greek gift." },
      ],
    },
    {
      type: "puzzle",
      id: "ak-greek-gift-finish",
      title: "Deliver the gift's finish",
      blurb: "The king is exposed — land the blow.",
      fen: "5rk1/5pp1/8/6NQ/8/8/8/6K1 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt:
        "The king has been dragged into the open and the knight on g5 covers f7. White to play and mate in one.",
      hints: ["The knight on g5 defends the h7-square.", "Bring the queen right up to the king."],
      successText:
        "Qh7# — the Greek gift's payoff. The queen mates on h7, defended by the knight, and the king's own pieces block every escape.",
      solution: ["h5h7"],
    },
  ],
};

const weakSquares: Lesson = {
  id: "ak-weak-squares",
  title: "The Weak Squares: f7, g7, h7",
  summary: "Every castled king has soft spots. Learn to spot them and aim every piece at the weakest one.",
  activities: [
    {
      type: "concept",
      id: "ak-weak-squares-concept",
      title: "Aim at the soft spot",
      blurb: "f7, g7, h7 — the king's weak points.",
      body:
        "A castled king has three recurring weaknesses. f7 (or f2) is defended only by the king itself — the target of the Italian bishop and countless sacrifices. h7 is the Greek-gift square. And g7 is the soft spot when the king has fianchettoed: once the dark-squared bishop leaves g7, the dark squares around the king (f6, h6, g7) become holes.\n\nA pawn that reaches f6 is especially deadly: it jams the king's shelter and supports a queen landing on g7 — Lolli's mate. When you see a weakened square near the enemy king, point your pieces at it and look for the sacrifice that opens the door.",
      points: [
        "f7 and h7 are guarded only by the king — natural sacrifice squares.",
        "g7 is the fianchetto's weakness once the bishop is gone or deflected.",
        "A pawn on f6 jams the king and supports a queen mate on g7.",
      ],
      diagrams: [
        {
          fen: "r1bq1rk1/ppp1ppbp/2np1np1/8/3PP3/2N1BN2/PPPQ1PPP/R3KB1R w KQ - 0 1",
          orientation: "white",
          arrows: [{ from: "d2", to: "h6" }],
          caption:
            "Black has fianchettoed: the g6-pawn and the bishop on g7 guard the dark squares. Trade or deflect that bishop and f6/h6/g7 become holes — White's queen and dark-squared bishop will swarm them.",
        },
      ],
      check: {
        question: "Why does a pawn reaching f6 make the g7-square so dangerous for the defender?",
        options: [
          "It supports a queen landing on g7 with mate, and jams the king's escape.",
          "It attacks the enemy queen.",
          "It promotes on the next move.",
        ],
        correctIndex: 0,
        explanation:
          "A pawn on f6 defends g7, so a queen can land there supported and untouchable — Lolli's mate — while the pawn also blocks the king's shelter. f6 is a thorn in the king's side.",
      },
    },
    {
      type: "puzzle",
      id: "ak-lollis-mate",
      title: "Deliver Lolli's mate",
      blurb: "The f6-pawn does the heavy lifting.",
      fen: "6k1/5p1p/5P1Q/8/8/8/8/6K1 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt:
        "Your pawn on f6 jams the king and guards g7. White to play and mate in one.",
      hints: ["The f6-pawn defends the g7-square.", "Land the queen on g7, right next to the king."],
      successText:
        "Qg7# — Lolli's mate. The humble f6-pawn supports the queen, the king can't capture it, and there's no escape.",
      solution: ["h6g7"],
    },
  ],
};

const pawnStorm: Lesson = {
  id: "ak-pawn-storm",
  title: "Pawn Storms & Opposite Castling",
  summary: "When the kings castle on opposite wings, it's a race: hurl your pawns at their king and don't look back.",
  activities: [
    {
      type: "concept",
      id: "ak-pawn-storm-concept",
      title: "Race to the king",
      blurb: "Open a file with your pawns.",
      body:
        "When both sides castle on the SAME wing, pushing the pawns in front of your own king is risky — you're exposing yourself. But when the kings castle on OPPOSITE wings, those same pawn pushes become a battering ram: you storm the pawns toward the enemy king while your own king sits safely on the other side.\n\nThe goal is to open a file (or diagonal) leading to the king — h4-h5xg6 to pry open the h-file is the classic. In these races, TIME is everything: every tempo spent defending is a tempo your opponent uses to mate you first. Don't grab pawns, don't shuffle — push, open lines, and attack faster than they do.",
      points: [
        "Opposite-side castling → storm your pawns at the enemy king.",
        "The aim is to open a file or diagonal to the king (e.g. h4–h5xg6).",
        "It's a race — don't waste a single tempo on defence.",
      ],
      diagrams: [
        {
          fen: "r1bq1rk1/pp3ppp/2nppn2/8/3NP1PP/2N1B3/PPPQ1P2/2KR3R w - - 0 1",
          orientation: "white",
          arrows: [
            { from: "g4", to: "g5" },
            { from: "h4", to: "h5" },
          ],
          caption:
            "Opposite-side castling: White's king is safe on c1 while the g- and h-pawns storm toward Black's king. g5 and h5 will pry open lines for the rooks on d1/h1.",
        },
      ],
      check: {
        question: "Why are pawn storms much safer with opposite-side castling than same-side?",
        options: [
          "Your advancing pawns don't expose your own king, which is castled on the other wing.",
          "Pawns move faster on the queenside.",
          "The opponent isn't allowed to push pawns back.",
        ],
        correctIndex: 0,
        explanation:
          "When you castle on opposite wings, pushing the pawns in front of the ENEMY king leaves your own king untouched. Same-side, those pushes would expose you too — so you'd hold back.",
      },
    },
  ],
};

const gym: Lesson = {
  id: "ak-gym",
  title: "The Attacking Gym",
  summary: "Put it together: spot the weakened king and deliver the blow, then drill king-attacks against the clock.",
  activities: [
    {
      type: "concept",
      id: "ak-gym-concept",
      title: "Finish the attack",
      blurb: "Spot the weakness, land the blow.",
      body:
        "You've learned where kings are weak and how to break them open. The last skill is converting — seeing the finishing blow when the king is finally exposed. Deliver the mates below, then keep drilling king-attacks and sacrifices in the Tactics Trainer until they're instinct.",
      points: [
        "Each position is a king-attack you've learned — find the finish.",
        "Recognize the weak square, then deliver the blow.",
        "Build the instinct with volume in the Tactics Trainer.",
      ],
    },
    {
      type: "practiceSet",
      id: "ak-gym-set",
      title: "Land the blow",
      blurb: "Finish each attack on the exposed king.",
      intro: "Two classic finishes against a broken-open king. Deliver the mate in each.",
      requiredCorrect: 2,
      items: [
        {
          fen: "5rk1/5pp1/8/6NQ/8/8/8/6K1 w - - 0 1",
          orientation: "white",
          solution: ["h5h7"],
          goal: { type: "mate", inMoves: 1 },
          prompt: "Mate in one — the knight covers f7 and h7.",
        },
        {
          fen: "6k1/5p1p/5P1Q/8/8/8/8/6K1 w - - 0 1",
          orientation: "white",
          solution: ["h6g7"],
          goal: { type: "mate", inMoves: 1 },
          prompt: "Mate in one — the f6-pawn supports the queen.",
        },
      ],
    },
    {
      type: "concept",
      id: "ak-gym-practice",
      title: "Drill the attack",
      blurb: "Sacrifices become instinct with reps.",
      body:
        "The more attacking sacrifices you see, the faster you'll spot them over the board. Drill the 'sacrifice' theme in the Tactics Trainer — you'll start to feel when a king is ripe for the taking.",
      points: [
        "King-attacks reward pattern recognition — keep solving.",
        "Watch for the weak squares (f7/g7/h7) in your own games.",
      ],
      practice: { tool: "tactics", theme: "sacrifice", maxDifficulty: 2, label: "Drill sacrifices now" },
    },
  ],
};

export const attackingKing: Module = {
  id: "attacking-king",
  title: "Attacking the Castled King",
  description:
    "How to break open a castled king: the Greek gift sacrifice, the weak squares (f7, g7, h7), pawn storms, and opposite-side castling races. See the attacks land, then deliver them.",
  level: "Intermediate",
  lessons: [overview, greekGift, weakSquares, pawnStorm, gym],
};
