// "Intermediate Chess" (Intermediate). Seven original lessons; every position
// engine-verified by `npm run validate`. Continues the Fundamentals module.

import type { Module } from "../../types";
import { ch9 } from "./ch9";
import { ch10 } from "./ch10";
import { ch11 } from "./ch11";
import { ch12 } from "./ch12";
import { ch13 } from "./ch13";
import { ch14 } from "./ch14";
import { ch15 } from "./ch15";

export const intermediate: Module = {
  id: "intermediate",
  title: "Intermediate Chess",
  description:
    "The improver's path: real opening repertoires, gambits, the endgames that decide games, sharper tactics, and the strategic ideas behind strong play.",
  level: "Intermediate",
  lessons: [ch9, ch10, ch11, ch12, ch13, ch14, ch15],
};
