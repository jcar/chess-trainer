// Pip's Chess Quest — light, original narrative that frames the journey: Pip the
// pawn marches across a kingdom, passes the guardians (review checkpoints), and
// reaches the crown (promotion). Prose-as-data so it's easy to edit and feeds the
// quest map, story beats, and the certificate. Grouping follows the module's
// actual lesson order.

export interface Land {
  id: string;
  name: string;
  tagline: string;
  lessonIds: string[];
}

export const LANDS: Land[] = [
  {
    id: "square-kingdom",
    name: "The Square Kingdom",
    tagline: "Where Pip learns the board and meets the pieces.",
    lessonIds: [
      "kids-l1-board",
      "kids-l2-straight-diagonal",
      "kids-l3-king-knight-pawn",
      "kids-arcade",
      "kids-checkpoint-1",
    ],
  },
  {
    id: "battle-meadow",
    name: "Battle Meadow",
    tagline: "Capturing, staying safe, and the all-important checkmate.",
    lessonIds: [
      "kids-l4-capturing-values",
      "kids-playing-smart",
      "kids-l5-check-mate",
    ],
  },
  {
    id: "castle-heights",
    name: "Castle Heights",
    tagline: "Special moves and the sneaky ways a game can tie.",
    lessonIds: ["kids-l6-special-moves", "kids-l7-draws", "kids-checkpoint-2"],
  },
  {
    id: "champions-road",
    name: "Champions' Road",
    tagline: "Great openings, trapping the king, and your first real mates.",
    lessonIds: [
      "kids-good-first-moves",
      "kids-trapping-king",
      "kids-l8-first-mates",
    ],
  },
  {
    id: "trickster-forest",
    name: "Trickster Forest",
    tagline: "Forks, pins, skewers — and walking a pawn all the way home.",
    lessonIds: ["kids-l9-tricks", "kids-pawn-power", "kids-checkpoint-3"],
  },
  {
    id: "pips-arena",
    name: "Pip's Arena",
    tagline: "Everything you've learned — now play, and win the crown!",
    lessonIds: ["kids-l10-play"],
  },
];

export interface Guardian {
  lessonId: string;
  name: string;
  line: string;
}

export const GUARDIANS: Guardian[] = [
  {
    lessonId: "kids-checkpoint-1",
    name: "the Gatekeeper",
    line: "Answer my riddles about the board and the pieces, and the kingdom is yours to cross!",
  },
  {
    lessonId: "kids-checkpoint-2",
    name: "the Knight of the Heights",
    line: "Show me you know how to win and stay safe, and I'll raise the drawbridge!",
  },
  {
    lessonId: "kids-checkpoint-3",
    name: "the Forest Sage",
    line: "Prove your tricks and tactics are sharp, and the path to the arena opens!",
  },
];

export function landForLesson(lessonId: string): Land | undefined {
  return LANDS.find((l) => l.lessonIds.includes(lessonId));
}

export function guardianFor(lessonId: string): Guardian | undefined {
  return GUARDIANS.find((g) => g.lessonId === lessonId);
}

export const STORY = {
  intro:
    "Pip the pawn dreams of becoming a queen. Help Pip cross the kingdom, one land at a time!",
  crown:
    "Pip reached the far side and became a QUEEN — and so did you. You're a real chess player now! 👑",
};
