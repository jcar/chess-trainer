// Pure helpers for the "living color map" (Pip & the Grey). As the child
// completes lessons, each land on the quest map blooms from grey back to color.
// No storage, no effects — everything is derived from a "is this lesson done?"
// predicate at render time, so it animates simply via a CSS filter transition.

import type { Land } from "@/content/kids/story";

/** Fraction (0..1) of a land's lessons that are complete. */
export function landFraction(
  land: Land,
  isLessonDone: (lessonId: string) => boolean,
): number {
  if (land.lessonIds.length === 0) return 0;
  const done = land.lessonIds.filter(isLessonDone).length;
  return done / land.lessonIds.length;
}

/** A CSS `filter` value that drains color as `fraction` drops toward 0. A fully
 *  complete land (1) shows full color; an untouched land (0) is mostly grey. */
export function bloomFilter(fraction: number): string {
  const grey = Math.round((1 - fraction) * 100);
  const sat = (0.55 + 0.45 * fraction).toFixed(2);
  return `grayscale(${grey}%) saturate(${sat})`;
}

/** True once at least one lesson in the land is done (the friend has woken). */
export function isAwake(fraction: number): boolean {
  return fraction > 0;
}
