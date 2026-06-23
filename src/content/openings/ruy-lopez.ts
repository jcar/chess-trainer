import type { Opening } from "./types";

// Ruy Lopez — original prose; lines are standard public theory.
export const ruyLopez: Opening = {
  id: "ruy-lopez",
  name: "Ruy Lopez",
  eco: "C60–C99",
  family: "1e4-e5",
  trainerColor: "white",
  tier: "core",
  firstMoves: "1.e4 e5 2.Nf3 Nc6 3.Bb5",
  character:
    "The oldest and most deeply respected of all 1.e4 e5 openings. Instead of " +
    "rushing, White prepares a slow, patient build-up, leaning on the knight " +
    "that defends Black's e5-pawn. It rewards understanding over memorization " +
    "and unfolds into one of the richest strategic battles in chess.",
  whitePlan:
    "Pin or pressure the c6-knight to undermine the e5-pawn, then complete " +
    "development with O-O, Re1, and c3, preparing the d4 break and a long, " +
    "patient squeeze.",
  blackPlan:
    "Kick the bishop with ...a6 and ...b5 to win space on the queenside, keep " +
    "e5 well defended, develop with ...Be7 and ...d6, and castle into a solid, " +
    "resilient set-up.",
  middlegamePlan:
    "In the Closed Ruy, the position is locked and patient. White's textbook plan: " +
    "reroute the queen's knight Nb1–d2–f1–g3 (the Chigorin maneuver), keep the centre " +
    "with c3, and prepare a well-timed d4 while eyeing the kingside (Nf5, or a later f4). " +
    "Don't rush d4 before e4 is safe — that's what Re1 and c3 are for. Black's counter is " +
    "...Na5 hitting the b3-bishop, then ...c5 expanding on the queenside; meet it calmly and " +
    "keep improving pieces. Whoever executes their plan more patiently usually wins.",
  ideaQuiz: {
    question: "Why does White almost always play c3 in the Closed Ruy?",
    options: [
      "To prepare the d4 break and give the bishop a retreat square on c2.",
      "To open the c-file for the rook immediately.",
      "To stop Black from ever playing ...b5.",
    ],
    correctIndex: 0,
    explanation:
      "c3 is the linchpin: it supports a future d2–d4 (White's main central break) and opens b1–c2 so the bishop can drop back to c2 after ...Na5, staying on the b1–h7 diagonal. It's not about the c-file — it's about d4 and keeping the good bishop.",
  },
  tabiyaFen:
    "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
  lines: [
    {
      label: "Closed Ruy Lopez (Morphy Defence)",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Bb5", "a6",
        "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5",
        "Bb3", "d6", "c3", "O-O",
      ],
      notes: [
        "White grabs the centre and opens lines for the bishop and queen.",
        "Black stakes an equal claim in the centre.",
        "Developing with an eye on the e5-pawn.",
        "Defending e5 with the knight.",
        "The Ruy Lopez bishop pressures the knight that guards e5.",
        "Putting the question to the bishop right away.",
        "Keeping the bishop on the long diagonal toward c6.",
        "Developing and attacking the e4-pawn.",
        "King safety first — White castles quickly.",
        "A modest, flexible square for the bishop.",
        "Reinforcing e4 and lining the rook up behind the e-file.",
        "Gaining queenside space and threatening the bishop.",
        "Retreating to a strong diagonal aimed again at f7.",
        "Solidly supporting e5 for the long game.",
        "Preparing the d4 break and a square on c2 for the bishop.",
        "Both sides are castled; now the slow strategic battle begins.",
      ],
      commonMistakes: [
        {
          ply: 8,
          move: "Nxe5",
          why: "Don't grab e5 — it's defended. After ...Nxe5 (the c6-knight recaptures) you've given a knight for a single pawn. The Ruy bishop PRESSURES the e5-defender; it doesn't win the pawn outright. Castle and build up instead.",
        },
        {
          ply: 12,
          move: "Bxb5",
          why: "When ...b5 hits the bishop, retreat — don't grab. Bxb5 axb5 hands over a bishop for one pawn. Drop back to b3, where the bishop keeps its strong diagonal aiming at f7.",
        },
      ],
    },
    {
      label: "Exchange Variation",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Bb5", "a6",
        "Bxc6", "dxc6", "O-O", "f6", "d4", "exd4", "Nxd4",
      ],
      notes: [
        "White takes the centre.",
        "Black answers in the centre.",
        "Developing toward the c6-knight.",
        "Defending e5.",
        "Pinning and pressuring the c6-knight.",
        "Questioning the bishop.",
        "Trading at once to damage Black's pawns.",
        "Recapturing toward the centre, doubling the c-pawns.",
        "King safety, with a long-term structural edge in mind.",
        "Reinforcing e5 the only solid way.",
        "Striking at the centre to open the position.",
        "Black captures to free the position.",
        "Recapturing, White heads for a healthier endgame structure.",
      ],
    },
    {
      label: "Berlin Defence",
      branch: { from: "Closed Ruy Lopez (Morphy Defence)", atPly: 5, tryMove: "Nf6" },
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6",
        "O-O", "Nxe4", "d4", "Nd6", "Bxc6", "dxc6",
        "dxe5", "Nf5",
      ],
      notes: [
        "White takes the centre.",
        "Black answers in the centre.",
        "Developing toward the e5-pawn.",
        "Defending e5.",
        "Pressuring the knight that guards e5.",
        "The Berlin: counterattacking e4 instead of defending the bishop.",
        "King safety, daring Black to grab the pawn.",
        "Black takes the bait and wins the centre pawn.",
        "Reopening lines and challenging the centre back.",
        "The knight retreats, blocking the bishop's diagonal.",
        "Trading off to damage Black's pawns before recapturing e5.",
        "Recapturing toward the centre, accepting doubled c-pawns.",
        "Regaining the pawn — heading for the famous queenless Berlin endgame.",
        "Repositioning the knight to a fine square eyeing d4 and h4.",
      ],
    },
  ],
};
