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

export const chessForKids: Module = {
  id: "chess-for-kids",
  title: "Chess for Kids",
  description:
    "Brand new to chess? Start here! Tap, play, and learn — how the pieces move, how to checkmate, clever tricks, and your first games. Earn stars along the way!",
  level: "Beginner",
  kidMode: true,
  lessons: [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10],
};
