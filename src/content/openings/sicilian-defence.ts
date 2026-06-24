import type { Opening } from "./types";

// Sicilian Defence — original prose; lines are standard public theory.
export const sicilianDefence: Opening = {
  id: "sicilian-defence",
  name: "Sicilian Defence",
  eco: "B20–B99",
  family: "1e4-other",
  trainerColor: "black",
  tier: "core",
  firstMoves: "1.e4 c5",
  character:
    "The most popular and ambitious answer to 1.e4. Instead of mirroring with " +
    "1...e5, Black strikes at the centre from the side and refuses a symmetrical " +
    "game. Black accepts an asymmetrical fight from the very first move and plays " +
    "for the full point rather than easy equality.",
  whitePlan:
    "Open the centre with an early d4, trade the c-pawn for Black's, and use the " +
    "space and lead in development to attack — often by castling and storming " +
    "the kingside while Black is busy on the other wing.",
  blackPlan:
    "Take on d4 to trade a flank pawn for a central pawn, then develop flexibly " +
    "and counterattack on the queenside with the half-open c-file, aiming for an " +
    "unbalanced position with real winning chances.",
  middlegamePlan:
    "In the Najdorf after ...e5, the d5-square is the whole battle: it's a hole in your " +
    "camp, so fight for control of it with ...Be6, ...Nbd7 and ...Rc8, and trade off the " +
    "pieces that want to occupy it. Your counterplay is the queenside — expand with " +
    "...b5–b4 to kick the c3-knight, pressure the half-open c-file, and aim for the freeing " +
    "...d5 break. Meanwhile White attacks on the kingside, so it's a race: don't drift, push " +
    "your queenside play while keeping d5 under control.",
  ideaQuiz: {
    question: "In the Najdorf after ...e5, what is the critical square for both sides?",
    options: [
      "d5 — the hole Black must fight to control.",
      "h7 — Black's main weakness to defend.",
      "a1 — the corner White targets.",
    ],
    correctIndex: 0,
    explanation:
      "Playing ...e5 gains space but leaves a hole on d5. Whoever controls d5 controls the game: Black contests it (...Be6, ...Nbd7, trading White's light pieces) while generating queenside counterplay. If White plants a piece on d5 unopposed, Black is in trouble.",
  },
  tabiyaFen:
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
  lines: [
    {
      label: "Open Sicilian — Najdorf",
      summary: "You play the flexible ...a6 and ...e5, fighting for the d5-hole while expanding on the queenside as White attacks the kingside.",
      sans: [
        "e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6",
        "Nc3", "a6", "Be2", "e5", "Nb3", "Be7", "O-O", "O-O",
      ],
      notes: [
        "White grabs the centre.",
        "The Sicilian: Black challenges from the wing instead of with ...e5.",
        "Developing and preparing the central break d4.",
        "A flexible move that supports a later ...e5 or ...e6.",
        "The defining Open Sicilian break, opening the position.",
        "Black trades the flank c-pawn for White's central d-pawn.",
        "Recapturing with the knight, which sits proudly in the centre.",
        "Developing and attacking the e4-pawn.",
        "Defending e4 and developing toward the centre.",
        "The Najdorf move: a tiny luft that controls b5 and prepares ...e5 or ...b5.",
        "A quiet, solid development of the bishop.",
        "Black seizes central space and chases the knight.",
        "Retreating to an active square that eyes the d5-hole and a5.",
        "Calm development, getting ready to castle.",
        "King safety.",
        "Black castles too; a rich, unbalanced middlegame lies ahead.",
      ],
      commonMistakes: [
        {
          ply: 5,
          move: "Nf6",
          why: "Take on d4 first. If you develop with ...Nf6 and let White play dxc5, you lose the point of the Sicilian — trading your flank c-pawn for White's central d-pawn. Capture: ...cxd4.",
        },
        {
          ply: 15,
          move: "Nxe4",
          why: "e4 is defended by the c3-knight — ...Nxe4 just drops a piece. Your counterplay comes from the queenside and the ...b5/...d5 breaks, not from grabbing e4. Castle and get organized.",
        },
      ],
    },
    {
      label: "Alapin Variation (2.c3)",
      summary: "White sidesteps the Open Sicilian, building a big pawn centre with c3 and d4; you hit it early with ...Nf6 and ...d6 to keep things fluid.",
      branch: { from: "Open Sicilian — Najdorf", atPly: 2, tryMove: "c3" },
      sans: [
        "e4", "c5", "c3", "Nf6", "e5", "Nd5", "d4", "cxd4",
        "Nf3", "e6", "cxd4", "d6",
      ],
      notes: [
        "White grabs the centre.",
        "The Sicilian.",
        "The Alapin: White prepares d4 supported by a pawn, avoiding the Open lines.",
        "Hitting the e4-pawn at once to provoke a decision.",
        "Pushing past and gaining space, kicking the knight.",
        "The knight hops to a good central square.",
        "Building the broad pawn centre the Alapin is after.",
        "Black strikes back, trading on d4.",
        "Developing and reinforcing the centre before recapturing.",
        "A solid move that prepares to undermine White's centre.",
        "Recapturing to keep the strong d4/e5 pawn duo.",
        "Challenging the e5-pawn and opening lines for Black's pieces.",
      ],
    },
    {
      label: "Najdorf — 6.Bg5 main line",
      summary: "White pins on g5 and storms with f4 and Qf3; you castle into a sharp race, defending e6/d6 while grabbing the c-file with ...Qc7.",
      sans: [
        "e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6",
        "Nc3", "a6", "Bg5", "e6", "f4", "Be7", "Qf3", "Qc7",
      ],
      notes: [
        "White grabs the centre.",
        "The Sicilian.",
        "Developing and preparing d4.",
        "A flexible move that keeps the ...e5 and ...e6 plans open.",
        "The Open Sicilian break.",
        "Trading the flank pawn for a central one.",
        "Recapturing into the centre.",
        "Developing and hitting e4.",
        "Defending e4 and developing.",
        "The Najdorf, controlling b5 and preparing freeing breaks.",
        "The sharpest try: pinning the knight to pressure e6 and d6.",
        "Reinforcing d5 and giving the queen and bishop air.",
        "Building toward a big kingside pawn storm.",
        "Calm development that unpins and readies castling.",
        "Centralising the queen behind the f-pawn before any e5 push.",
        "Eyeing the half-open c-file and getting off the pinned diagonal.",
      ],
    },
    {
      label: "Facing the Rossolimo (3.Bb5)",
      summary: "White avoids the Open lines by pinning the c6-knight; you fianchetto to g7 and play ...e5, accepting the structure and aiming for a sound, harmonious game.",
      sans: [
        "e4", "c5", "Nf3", "Nc6", "Bb5", "g6", "O-O", "Bg7",
        "Re1", "e5", "c3", "Nge7",
      ],
      notes: [
        "White grabs the centre.",
        "The Sicilian.",
        "Developing and preparing d4.",
        "Developing the knight to fight for d4.",
        "The Rossolimo: pinning toward the knight to avoid the Open lines.",
        "Preparing to fianchetto and sidestep doubled pawns.",
        "King safety first.",
        "Completing the fianchetto, eyeing the long diagonal.",
        "Supporting a later e5 and adding pressure to the centre.",
        "Grabbing central space and blunting the g7-bishop.",
        "Preparing d4 to challenge the centre.",
        "Developing the knight to e7, leaving c6 free and supporting d5.",
      ],
    },
  ],
};
