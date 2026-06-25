// The living color map: when a land's lessons are complete, the quest map blooms
// it from grey to color, names the friend it woke, advances the belt, and moves
// "Murk is here!" onward. We seed progress (so we don't replay every lesson) and
// assert the map reflects it.

import { test, expect } from "@playwright/test";
import { KIDS_LESSONS, KIDS_MODULE_ID } from "./helpers/content";
import { LANDS } from "../src/content/kids/story";

const PROGRESS_KEY = "chess-trainer:progress:v1";

const lessonById = new Map(KIDS_LESSONS.map((l) => [l.id, l]));
const land1 = LANDS[0]; // The Square Kingdom (wakes Pip)
const land1ActivityIds = land1.lessonIds.flatMap(
  (id) => lessonById.get(id)?.activities.map((a) => a.id) ?? [],
);

test("completing Land 1 blooms it on the quest map", async ({ page }) => {
  const seed = Object.fromEntries(
    land1ActivityIds.map((id) => [id, { completed: true, score: 100, attempts: 1 }]),
  );
  await page.addInitScript(
    (arg: { key: string; val: string }) => {
      localStorage.setItem(arg.key, arg.val);
    },
    { key: PROGRESS_KEY, val: JSON.stringify(seed) },
  );

  await page.goto(`/modules/${KIDS_MODULE_ID}/`);

  // Land 1's friend is awake, the White Belt is earned, and the trickster has
  // moved on to the next land.
  await expect(page.getByText("Pip is awake!")).toBeVisible();
  await expect(page.getByText("White Belt").first()).toBeVisible();
  await expect(page.getByText("Begin your quest!")).toHaveCount(0);
  await expect(page.getByText("Murk is here!")).toBeVisible();
});
