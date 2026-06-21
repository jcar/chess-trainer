import type { Opening } from "./types";

// Scandinavian Defence — original prose; lines are standard public theory.
export const scandinavian: Opening = {
  id: "scandinavian",
  name: "Scandinavian Defence",
  eco: "B01",
  family: "1e4-other",
  trainerColor: "black",
  firstMoves: "1.e4 d5",
  character:
    "The most direct answer to 1.e4: Black challenges the king's pawn on the " +
    "very first move. After the centre is exchanged, the queen usually comes " +
    "out early to recapture, which breaks a beginner's rule — but here it is " +
    "well-timed, because the queen retreats to safety while Black completes " +
    "fast, harmonious development.",
  whitePlan:
    "Gain time by harassing Black's early queen with natural developing moves " +
    "like Nc3 and d4, build a broad pawn centre, and use the lead in " +
    "development to press for a lasting space advantage.",
  blackPlan:
    "Recapture on d5, tuck the queen onto a safe square, and develop quickly " +
    "and simply with ...Nf6, ...c6, ...Bf5 and a kingside castle, reaching a " +
    "solid, easy-to-play position with no weaknesses.",
  tabiyaFen:
    "rnb1kbnr/ppp1pppp/8/3q4/8/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 3",
  lines: [
    {
      label: "Main Line (3...Qa5)",
      sans: [
        "e4", "d5", "exd5", "Qxd5", "Nc3", "Qa5",
        "d4", "Nf6", "Nf3", "c6", "Bc4", "Bf5",
      ],
      notes: [
        "White takes the centre.",
        "The Scandinavian: Black challenges e4 at once.",
        "Capturing — there is no good way to defend the d5-pawn.",
        "Recapturing with the queen, the point of the opening.",
        "Developing with tempo by attacking the queen.",
        "The main retreat: the queen sits safely on a5, eyeing the c3-knight.",
        "Grabbing the full centre and opening lines.",
        "Developing to the best square and pressuring e4-ideas.",
        "Natural development, getting ready to castle.",
        "A useful move: it gives the queen the c7-square and supports ...d5 ideas.",
        "The Italian bishop comes out to an active diagonal.",
        "The light-squared bishop develops outside the pawn chain — a fine set-up.",
      ],
    },
    {
      label: "Modern (2...Nf6)",
      sans: [
        "e4", "d5", "exd5", "Nf6", "d4", "Nxd5",
        "Nf3", "g6", "Be2", "Bg7",
      ],
      notes: [
        "White takes the centre.",
        "The Scandinavian.",
        "Capturing the d5-pawn.",
        "The Modern approach: instead of the queen, the knight will recapture.",
        "Grabbing space and supporting a central build-up.",
        "Now the knight takes back, keeping the queen at home.",
        "Calm development.",
        "Preparing to fianchetto the dark-squared bishop.",
        "A modest, flexible developing move.",
        "The bishop eyes the long diagonal — a comfortable, sound set-up.",
      ],
    },
  ],
};
