// Deep journey: play Lesson 1 of the Square Kingdom end to end — through its
// injected story scenes and every activity type in it (scene, concept+check,
// coordinate, sort, replay, quiz) — proving the play loop, the board pixel
// helper (the coordinate game), navigation chaining, and completion wiring all
// work together. Then assert every activity in the lesson is recorded complete.

import { test, expect } from "@playwright/test";
import {
  KIDS_LESSONS,
  activityUrl,
  solveActivity,
} from "./helpers/content";

const PROGRESS_KEY = "chess-trainer:progress:v1";
const lesson = KIDS_LESSONS.find((l) => l.id === "kids-l1-board");

test("Square Kingdom · Lesson 1 · full journey", async ({ page }) => {
  expect(lesson, "kids-l1-board lesson should exist").toBeTruthy();
  const acts = lesson!.activities;

  // Sanity: withStory wrapped the lesson in a hook + resolve scene.
  expect(acts[0].type).toBe("scene");
  expect(acts[acts.length - 1].type).toBe("scene");

  await page.goto(activityUrl(acts[0].id));

  for (const a of acts) {
    // We're on the expected activity.
    await expect(
      page.getByRole("heading", { name: a.title }).first(),
    ).toBeVisible();

    // Story scenes wire a per-line read-aloud (voice) button.
    if (a.type === "scene") {
      await expect(
        page.getByRole("button", { name: "Read aloud" }).first(),
      ).toBeVisible();
    }

    await solveActivity(page, a);
    await expect(page.getByTestId("advance")).toBeVisible();
    await page.getByTestId("advance").click();
  }

  // Every activity in the lesson is now recorded complete.
  const raw = await page.evaluate((k) => localStorage.getItem(k), PROGRESS_KEY);
  expect(raw, "progress should be persisted").toBeTruthy();
  const data = JSON.parse(raw!) as Record<string, { completed?: boolean }>;
  for (const a of acts) {
    expect(data[a.id]?.completed, `${a.id} should be complete`).toBe(true);
  }
});
