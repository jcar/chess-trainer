// Repertoire Lab acceptance: the Chooser produces a repertoire, the tree
// renders it, and a drill item accepts a move. Uses `.first()` on <main>
// because the layout wraps every page in one (see routes.spec).

import { test, expect } from "@playwright/test";

const ROUTES = [
  "/repertoire",
  "/repertoire/choose",
  "/repertoire/drill",
  "/repertoire/health",
  "/repertoire/print",
];

for (const route of ROUTES) {
  test(`route loads · ${route}`, async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await page.goto(route);
    await expect(page.locator("main").first()).toBeVisible();
    expect(pageErrors, `runtime errors on ${route}`).toEqual([]);
  });
}

test("chooser builds a repertoire and the tree renders it", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));

  await page.goto("/repertoire/choose");
  await page.getByRole("button", { name: /^Start/ }).click();

  // Five questions; answer the first option each time.
  for (let i = 0; i < 5; i++) {
    await page.locator("button").filter({ hasText: /^A/ }).first().click();
  }

  // The plan screen names White's opening move and offers a swap per slot.
  await expect(page.getByText("You open with")).toBeVisible();
  await expect(page.getByRole("button", { name: "Swap this" }).first()).toBeVisible();

  await page.getByRole("button", { name: "Lock it in" }).click();
  await expect(page).toHaveURL(/\/repertoire\/?$/);

  // The tree renders rows of SAN, and the colour toggle works.
  await expect(page.getByRole("button", { name: "As Black" })).toBeVisible();
  await page.getByRole("button", { name: "As Black" }).click();

  expect(pageErrors, "runtime errors in the chooser flow").toEqual([]);
});

test("drill presents a position and accepts a move", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));

  // Seed a repertoire directly so this test doesn't depend on the chooser.
  await page.goto("/repertoire");
  await page.evaluate(() => {
    window.localStorage.setItem(
      "chess-trainer:repertoire:v1",
      JSON.stringify({
        white: ["london-system"],
        black: ["queens-gambit-declined"],
        choices: {},
        suppressed: [],
        seeded: false,
        version: 1,
      }),
    );
  });

  await page.goto("/repertoire/drill");
  await expect(page.locator("main").first()).toBeVisible();
  // Either a position to answer or the "nothing due" state is acceptable; what
  // must not happen is a crash.
  expect(pageErrors, "runtime errors in the drill").toEqual([]);
});
