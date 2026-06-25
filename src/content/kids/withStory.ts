// Composition layer for "Pip & the Grey": wrap a lesson's activities with its
// story HOOK (before) and RESOLVE (after) scenes, if the lesson has an episode.
// Applied once in the chess-for-kids module assembly (lessons.map(withStory)) so
// the individual lesson files stay focused on chess content.

import type { Lesson } from "../types";
import { EPISODES } from "./episodes";

export function withStory(lesson: Lesson): Lesson {
  const ep = EPISODES[lesson.id];
  if (!ep) return lesson;
  return {
    ...lesson,
    activities: [ep.hook, ...lesson.activities, ep.resolve],
  };
}
