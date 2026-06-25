// Pip's Chess Quest — light, original narrative that frames the journey: Pip the
// pawn marches across a kingdom, passes the guardians (review checkpoints), and
// reaches the crown (promotion). Prose-as-data so it's easy to edit and feeds the
// quest map, story beats, and the certificate. Grouping follows the module's
// actual lesson order.

import type { CharacterId } from "./characters";
import type { SceneBackdropId } from "../types";

export interface Land {
  id: string;
  name: string;
  tagline: string;
  lessonIds: string[];
  /** The friend Pip wakes by restoring this land (shown on the map as it blooms). */
  wakes: CharacterId;
  /** The story backdrop for this land (matches the lands' scenes). */
  backdrop: SceneBackdropId;
}

export const LANDS: Land[] = [
  {
    id: "square-kingdom",
    name: "The Square Kingdom",
    tagline: "Where Pip wakes and learns the board.",
    wakes: "pip",
    backdrop: "kingdom",
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
    tagline: "Sir Rookwell teaches capturing, safety, and checkmate.",
    wakes: "rookwell",
    backdrop: "meadow",
    lessonIds: [
      "kids-l4-capturing-values",
      "kids-playing-smart",
      "kids-l5-check-mate",
    ],
  },
  {
    id: "castle-heights",
    name: "Castle Heights",
    tagline: "Bishop Belle shows special moves and sneaky draws.",
    wakes: "belle",
    backdrop: "heights",
    lessonIds: ["kids-l6-special-moves", "kids-l7-draws", "kids-checkpoint-2"],
  },
  {
    id: "champions-road",
    name: "Champions' Road",
    tagline: "Nim leaps in: openings, trapping the king, first mates.",
    wakes: "nim",
    backdrop: "road",
    lessonIds: [
      "kids-good-first-moves",
      "kids-scholars-mate",
      "kids-trapping-king",
      "kids-more-mates",
      "kids-l8-first-mates",
    ],
  },
  {
    id: "trickster-forest",
    name: "Trickster Forest",
    tagline: "Queen Aurora's tricks: forks, pins, skewers, and pawn power.",
    wakes: "aurora",
    backdrop: "forest",
    lessonIds: ["kids-l9-tricks", "kids-pawn-power", "kids-checkpoint-3"],
  },
  {
    id: "pips-arena",
    name: "Pip's Arena",
    tagline: "Wake King Cedric — play, win, and earn your crown!",
    wakes: "cedric",
    backdrop: "throne",
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
    "The kingdom turned grey and its pieces fell asleep. Help Pip wake them, land by land, and bring the colors back!",
  crown:
    "Pip reached the far side, woke King Cedric, and became a QUEEN — and so did you. The Grey is gone. You're a real chess player now! 👑",
};
