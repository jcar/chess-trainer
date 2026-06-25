// Route smoke: the kids module's supporting pages (home, journey map, story
// recap, trophy room, closet, certificate) must load without a runtime crash.
// The activity routes are covered by smoke.spec; these are the surrounding pages
// (rewards, cosmetics, recap) that no other spec touches.

import { test, expect } from "@playwright/test";
import { KIDS_MODULE_ID } from "./helpers/content";

const ROUTES = [
  "/",
  `/modules/${KIDS_MODULE_ID}/`,
  `/modules/${KIDS_MODULE_ID}/story`,
  `/modules/${KIDS_MODULE_ID}/stickers`,
  `/modules/${KIDS_MODULE_ID}/closet`,
  `/modules/${KIDS_MODULE_ID}/certificate`,
];

for (const route of ROUTES) {
  test(`route loads · ${route}`, async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    expect(pageErrors, `runtime errors on ${route}`).toEqual([]);
  });
}
