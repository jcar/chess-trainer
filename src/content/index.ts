// Module registry. To add a new module: create a file under `modules/`,
// export a `Module`, import it here, and add it to `MODULES`. Nothing else in
// the app needs to change — routing, progress, and activity players are generic.

import type { Activity, Lesson, Module } from "./types";
import { chessForKids } from "./modules/chess-for-kids";
import { fundamentals } from "./modules/fundamentals";
import { intermediate } from "./modules/intermediate";
import { checkmatePatterns } from "./modules/checkmate-patterns";
import { attackingKing } from "./modules/attacking-king";
import { masterGames } from "./modules/master-games";
import { essentialEndgames } from "./modules/essential-endgames";
import { openings } from "./modules/openings";
import { strategy } from "./modules/strategy";

// Order = easiest first: absolute beginner → beginner → intermediate → mating
// patterns → attacking the king → master games → essential endgames → openings
// → strategy.
export const MODULES: Module[] = [
  chessForKids,
  fundamentals,
  intermediate,
  checkmatePatterns,
  attackingKing,
  masterGames,
  essentialEndgames,
  openings,
  strategy,
];

export function getModule(moduleId: string): Module | undefined {
  return MODULES.find((m) => m.id === moduleId);
}

/** Flattened list of a module's activities, in lesson then activity order. */
export function getModuleActivities(mod: Module): Activity[] {
  return mod.lessons.flatMap((lesson) => lesson.activities);
}

export function findActivity(
  moduleId: string,
  activityId: string,
): { module: Module; lesson: Lesson; activity: Activity } | undefined {
  const mod = getModule(moduleId);
  if (!mod) return undefined;
  for (const lesson of mod.lessons) {
    const activity = lesson.activities.find((a) => a.id === activityId);
    if (activity) return { module: mod, lesson, activity };
  }
  return undefined;
}

/** The next activity in the module after `activityId`, or undefined if last. */
export function getNextActivity(
  mod: Module,
  activityId: string,
): Activity | undefined {
  const all = getModuleActivities(mod);
  const idx = all.findIndex((a) => a.id === activityId);
  if (idx === -1 || idx === all.length - 1) return undefined;
  return all[idx + 1];
}

export type { Module, Lesson, Activity };
