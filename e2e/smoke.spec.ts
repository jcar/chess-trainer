// Broad smoke pass: every activity in the kids module must load and render
// without a runtime crash. Data-driven from the real module content, so new
// activities are covered automatically. (Interaction depth lives in land1.spec.)

import { test, expect } from "@playwright/test";
import { allActivities, activityUrl } from "./helpers/content";

for (const { lesson, activity } of allActivities()) {
  test(`loads · ${lesson.id} · ${activity.id} (${activity.type})`, async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await page.goto(activityUrl(activity.id));

    // The activity header (its title) renders → the page mounted, not the Next
    // dev error overlay.
    await expect(
      page.getByRole("heading", { name: activity.title }).first(),
    ).toBeVisible();

    // No uncaught exceptions while mounting/rendering this activity.
    expect(pageErrors, `runtime errors on ${activity.id}`).toEqual([]);
  });
}
