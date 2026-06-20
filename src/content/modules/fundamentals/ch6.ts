// Chapter 6 — The five ways a game can be drawn.
// Original prose.

import type { Lesson } from "../../types";

export const ch6: Lesson = {
  id: "ch6-draws",
  title: "6. Draws",
  summary:
    "Half a point is sometimes the best result available. Know every way a game can end in a draw — both to claim them and to avoid them when you're winning.",
  activities: [
    {
      id: "stalemate-rule",
      type: "quiz",
      title: "Stalemate",
      blurb: "No move, no check.",
      question:
        "Stalemate occurs when the player to move:",
      options: [
        "Is in check and can escape.",
        "Has no legal move AND is not in check — the game is drawn.",
        "Has only a king left.",
        "Refuses to move.",
      ],
      correctIndex: 1,
      explanation:
        "Stalemate = no legal move while NOT in check. It's a draw, regardless of how much material either side has. A lone king with no safe square but no check is the most common case — and a lifeline when you're losing.",
    },
    {
      id: "insufficient-material",
      type: "quiz",
      title: "Insufficient material",
      blurb: "Nobody can ever mate.",
      question:
        "Which of these is an automatic draw because checkmate is impossible for either side?",
      options: [
        "King and rook vs king.",
        "King and two bishops vs king.",
        "King and knight vs king.",
        "King and pawn vs king.",
      ],
      correctIndex: 2,
      explanation:
        "King + knight vs king (and king + bishop vs king) is drawn by insufficient material — there's no way to force mate, so the game ends immediately. King+pawn can promote, and king+rook or two bishops can mate, so those are not automatic draws.",
    },
    {
      id: "threefold",
      type: "quiz",
      title: "Threefold repetition",
      blurb: "Same position, three times.",
      question:
        "A player may claim a draw by threefold repetition when:",
      options: [
        "The same moves are played three times in a row.",
        "The identical position (same pieces, same player to move, same rights) occurs three times during the game.",
        "Both players agree three times.",
        "Three pawns have been captured.",
      ],
      correctIndex: 1,
      explanation:
        "It's about the POSITION repeating three times (not necessarily consecutively) — same arrangement, same side to move, same castling/en-passant rights. A losing side often saves the game by giving 'perpetual check', repeating the position forever.",
    },
    {
      id: "fifty-move",
      type: "quiz",
      title: "The fifty-move rule",
      blurb: "Making no progress.",
      question:
        "The fifty-move rule allows a draw claim when, in the last 50 moves by each side:",
      options: [
        "No piece has been developed.",
        "No pawn has moved and no capture has been made.",
        "Neither king has castled.",
        "The clock has run low.",
      ],
      correctIndex: 1,
      explanation:
        "If 50 moves pass with no pawn move and no capture, either player can claim a draw — the position is going nowhere. It's why you must know how to convert basic mates efficiently before the counter runs out.",
    },
    {
      id: "perpetual-check",
      type: "quiz",
      title: "Perpetual check",
      blurb: "A losing side's best friend.",
      question:
        "You're down a lot of material but your queen can check the enemy king forever, and it can never escape the checks. What's the result?",
      options: [
        "You lose on material.",
        "A draw — perpetual check forces repetition (a threefold draw).",
        "You must stop checking and resign.",
        "You win by persistence.",
      ],
      correctIndex: 1,
      explanation:
        "Perpetual check is a draw: the position repeats and you claim threefold. When you're losing, look for it; when you're winning, make sure the enemy king has a hiding place so it can't be checked endlessly.",
    },
  ],
};
