import type { Opening } from "./types";

// King's Indian Defence — original prose; lines are standard public theory.
export const kingsIndian: Opening = {
  id: "kings-indian",
  name: "King's Indian Defence",
  eco: "E60–E99",
  family: "1d4",
  trainerColor: "black",
  tier: "core",
  firstMoves: "1.d4 Nf6 2.c4 g6",
  character:
    "A fighting, hypermodern defence. Rather than occupying the centre at once, " +
    "Black fianchettoes the bishop on g7, lets White build a big pawn centre, " +
    "and then counterattacks it — usually with ...e5. Black concedes space to " +
    "launch a kingside attack, and the result is sharp, double-edged chess " +
    "where both sides race on opposite wings.",
  whitePlan:
    "Build and hold the broad d4/c4/e4 pawn centre, gain queenside space with " +
    "moves like b4 and c5, and attack where there is more room while keeping " +
    "the centre under control.",
  blackPlan:
    "Fianchetto with ...g6 and ...Bg7, castle, and strike at White's centre " +
    "with ...e5 (or ...c5); when the centre locks, storm the kingside with " +
    "...f5, ...f4 and a pawn avalanche toward the white king.",
  middlegamePlan:
    "The King's Indian is a race on opposite wings. Once ...e5 meets d5 and the centre " +
    "LOCKS, Black attacks the king: play ...f5 (then ...f4), reroute the f6-knight " +
    "(...Ne8 or ...Nd7) so the f-pawn can roll, lift a rook (...Rf6–h6), and throw ...g5–g4 " +
    "at the white king. White counters on the queenside with c5 and b4–b5, opening the " +
    "c-file. Whoever's attack arrives first wins — so don't defend passively; push your " +
    "kingside pawns and pieces at maximum speed.",
  ideaQuiz: {
    question: "The centre locks (White's d5 against Black's e5). Where does Black attack?",
    options: [
      "The kingside — ...f5, ...f4 and a pawn storm at the white king.",
      "The queenside, racing White's own play there.",
      "The centre, by trading everything off into a draw.",
    ],
    correctIndex: 0,
    explanation:
      "When the centre is closed, you attack where you have more room and toward the enemy king. White's space points him queenside (c5, b4–b5); Black's ...e5/...f5 setup points at the king, so Black storms the kingside with ...f5–f4 and ...g5–g4. It's a pure opposite-wing race — speed and pawns, not passive defence.",
  },
  tabiyaFen:
    "rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  lines: [
    {
      label: "Classical Variation",
      sans: [
        "d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6",
        "Nf3", "O-O", "Be2", "e5", "O-O", "Nc6",
      ],
      notes: [
        "White takes the centre.",
        "Hypermodern: developing first, leaving the centre to White for now.",
        "Grabbing more central space.",
        "Preparing the fianchetto.",
        "Natural development.",
        "Completing the fianchetto — the bishop rakes the long diagonal.",
        "Building the big classical centre.",
        "Restraining e5 and opening the bishop's diagonal.",
        "Developing and supporting the centre.",
        "King safety; the kingside attack will come later.",
        "A flexible, classical developing move.",
        "The thematic counterstrike — challenging White's centre head-on.",
        "Castling into the coming battle.",
        "Piling pressure on d4 and inviting the central tension to resolve.",
      ],
      commonMistakes: [
        {
          ply: 7,
          move: "d5",
          why: "In the King's Indian Black plays ...d6, not ...d5. After ...d5 exd5 White gets a big centre with tempo. The whole idea is to let White build the centre and strike it LATER with ...e5. (If you want ...d5, that's a different opening — the Grünfeld — played a move earlier.)",
        },
        {
          ply: 11,
          move: "b6",
          why: "Don't drift. The King's Indian lives on the central strike — slow moves like ...b6 let White's space simply suffocate you. Hit the centre now with ...e5 (the move that unlocks your whole kingside plan).",
        },
      ],
    },
    {
      label: "Fianchetto Variation",
      branch: { from: "Classical Variation", atPly: 4, tryMove: "Nf3" },
      sans: [
        "d4", "Nf6", "c4", "g6", "Nf3", "Bg7", "g3", "O-O",
        "Bg2", "d6", "O-O", "Nbd7",
      ],
      notes: [
        "White takes the centre.",
        "Developing in hypermodern style.",
        "Claiming more space.",
        "Preparing the fianchetto.",
        "Developing flexibly, delaying e4.",
        "Completing the fianchetto.",
        "White fianchettoes too — a calmer, very solid set-up.",
        "King safety first.",
        "The bishops glare at each other down the long diagonal.",
        "Restraining the centre and freeing the bishop.",
        "Castling.",
        "Developing the knight to support an eventual ...e5 break.",
      ],
    },
    {
      label: "Sämisch Variation",
      branch: { from: "Classical Variation", atPly: 8, tryMove: "f3" },
      sans: [
        "d4", "Nf6", "c4", "g6", "Nc3", "Bg7",
        "e4", "d6", "f3", "O-O", "Be3", "e5",
      ],
      notes: [
        "White takes the centre.",
        "Hypermodern: developing first.",
        "Grabbing more central space.",
        "Preparing the fianchetto.",
        "Natural development.",
        "Completing the fianchetto along the long diagonal.",
        "Building the big classical centre.",
        "Restraining e5 and opening the bishop's diagonal.",
        "The Sämisch: a rock-solid pawn shield for e4 that also clamps the g4-square.",
        "King safety; the wing battle is coming.",
        "Reinforcing d4 and preparing a queenside expansion or a kingside pawn storm.",
        "The thematic counterstrike, challenging White's broad centre at once.",
      ],
    },
  ],
};
