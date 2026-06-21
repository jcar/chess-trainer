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
      id: "ch6-draws-concept",
      type: "concept",
      title: "The ways a game is drawn",
      blurb: "Half a point — sometimes the best result.",
      body:
        "A draw splits the point, and it can be the goal or the disaster depending on which side you're on. There are several ways a game ends in a draw: stalemate (no legal move while not in check), insufficient material (neither side has enough to mate), threefold repetition (the same position occurs three times), the fifty-move rule (fifty moves with no pawn move and no capture), and agreement.\n\nThe practical lesson cuts both ways. When you're losing, these rules are lifelines — perpetual check, where you check the enemy king forever, forces a repetition and saves the game. When you're winning, you must avoid handing your opponent a draw: keep the king out of stalemate and don't let it escape into endless checks.",
      points: [
        "Draws: stalemate, insufficient material, repetition, fifty-move, agreement.",
        "Perpetual check is a draw by repetition — a losing side's escape.",
        "When winning, take care not to stalemate or get checked forever.",
      ],
    },
    {
      id: "stalemate-rule",
      type: "quiz",
      title: "Stalemate",
      blurb: "No move, no check.",
      question:
        "Stalemate occurs when the player to move:",
      options: [
        "Is in check but still has a square to escape to.",
        "Has no legal move AND is not in check — a draw.",
        "Has only a lone king left on the board.",
        "Simply refuses to make any move at all.",
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
        "The very same sequence of moves is repeated three times in a row.",
        "The identical position occurs three times, with the same side to move.",
        "Both players offer and accept a draw on three separate turns.",
        "A total of three pawns have been captured during the game.",
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
        "No minor or major piece has been developed at all.",
        "No pawn has moved and no capture has been made.",
        "Neither king has castled in the entire game.",
        "Both players' clocks have run dangerously low.",
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
        "You lose, since the opponent is far ahead on material.",
        "A draw — perpetual check forces a threefold repetition.",
        "You must stop checking and resign the lost position.",
        "You win, because your persistence wears the opponent down.",
      ],
      correctIndex: 1,
      explanation:
        "Perpetual check is a draw: the position repeats and you claim threefold. When you're losing, look for it; when you're winning, make sure the enemy king has a hiding place so it can't be checked endlessly.",
    },
  ],
};
