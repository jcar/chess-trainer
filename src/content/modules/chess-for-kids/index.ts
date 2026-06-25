// "Chess for Kids" (absolute beginner). Original, kid-friendly content guided by
// "Pip the pawn" (an original character). Every puzzle is engine-verified by
// `npm run validate`.

import type { Module } from "../../types";
import { l1 } from "./l1";
import { l2 } from "./l2";
import { l3 } from "./l3";
import { l4 } from "./l4";
import { l5 } from "./l5";
import { l6 } from "./l6";
import { l7 } from "./l7";
import { l8 } from "./l8";
import { l9 } from "./l9";
import { l10 } from "./l10";
import { arcade } from "./arcade";
import { goodFirstMoves } from "./good-first-moves";
import { playingSmart } from "./playing-smart";
import { trappingTheKing } from "./trapping-the-king";
import { pawnPower } from "./pawn-power";
import { checkpoint1 } from "./checkpoint-1";
import { checkpoint2 } from "./checkpoint-2";
import { checkpoint3 } from "./checkpoint-3";
import { withStory } from "../../kids/withStory";

export const chessForKids: Module = {
  id: "chess-for-kids",
  title: "Chess for Kids",
  description:
    "Brand new to chess? Start here! Tap, play, and learn — how the pieces move, how to checkmate, clever tricks, and your first games. Earn stars along the way!",
  level: "Beginner",
  kidMode: true,
  // Order: board & movement → arcade fun → capturing → playing smart →
  // check/mate → special moves → draws → openings → trapping & first mates →
  // tricks → walk the pawn home → play vs Pip.
  // Each lesson is wrapped with its story hook/resolve scenes (withStory) so the
  // play itself becomes the "Pip & the Grey" adventure. Lessons without an
  // episode pass through unchanged.
  lessons: [
    l1,
    l2,
    l3,
    arcade,
    checkpoint1,
    l4,
    playingSmart,
    l5,
    l6,
    l7,
    checkpoint2,
    goodFirstMoves,
    trappingTheKing,
    l8,
    l9,
    pawnPower,
    checkpoint3,
    l10,
  ].map(withStory),
};
