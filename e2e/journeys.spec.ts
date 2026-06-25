// Interactive breadth: for EVERY lesson in the kids module, start at its hook
// scene and play forward through each deterministic activity (solving + advancing
// via [data-testid=advance]) until we reach an engine/review activity the
// auto-solver can't drive. This exercises the scenes, in-character prompts,
// board taps, and navigation chaining across all six lands — not just Land 1.
//
// (land1.spec.ts remains the canonical full-lesson journey with the localStorage
// completion assertion; this spec trades that depth for module-wide breadth.)

import { test, expect } from "@playwright/test";
import {
  KIDS_LESSONS,
  activityUrl,
  solveActivity,
  SOLVABLE_TYPES,
} from "./helpers/content";

for (const lesson of KIDS_LESSONS) {
  test(`journey · ${lesson.id}`, async ({ page }) => {
    const acts = lesson.activities;
    await page.goto(activityUrl(acts[0].id));

    let played = 0;
    for (const a of acts) {
      // We should be on this activity (navigation chained here).
      await expect(
        page.getByRole("heading", { name: a.title }).first(),
      ).toBeVisible();

      // Stop once we hit an activity the deterministic solver can't complete
      // (engine drill, review checkpoint, target, etc.) — it still rendered.
      if (!SOLVABLE_TYPES.has(a.type)) break;

      await solveActivity(page, a);
      await expect(page.getByTestId("advance")).toBeVisible();
      await page.getByTestId("advance").click();
      played++;
    }

    // At minimum the hook scene played and advanced.
    expect(played, `${lesson.id} should play at least one activity`).toBeGreaterThan(0);
  });
}
