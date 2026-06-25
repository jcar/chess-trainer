// Engine-backed flows, made deterministic by the scripted test engine. With an
// empty reply queue the engine plays a fixed first-legal move, so the White
// (learner) move lists below — precomputed against that exact opponent — drive
// each drill to a real checkmate. This is the first real coverage of DrillPlayer's
// engine-reply loop + win detection (kids drills AND the Endgame Trainer).

import { test, expect } from "@playwright/test";
import { useScriptedEngine } from "./helpers/engine";
import { clickSquare, type Orientation } from "./helpers/board";
import { activityUrl } from "./helpers/content";

/** Tap a list of learner moves (UCI from→to), waiting for the scripted engine's
 *  reply + board animation to settle between each. */
async function tapMoves(
  page: import("@playwright/test").Page,
  moves: string[],
  orientation: Orientation,
) {
  for (const uci of moves) {
    await clickSquare(page, uci.slice(0, 2), orientation);
    await clickSquare(page, uci.slice(2, 4), orientation);
    await page.waitForTimeout(350);
  }
}

// Precomputed (chess.js) White mating lines vs the scripted engine's first-legal
// replies. Stable as long as that fallback (sorted-UCI first move) is unchanged.
const KIDS_KQ = ["e1d2", "e2d3", "d3b5", "d2c3", "b5b2"];
const ENDGAME_KQ = [
  "d1d6", "e1d2", "d2c3", "c3c4", "c4b5", "b5c6",
  "c6c7", "c7d8", "d8e8", "d6c7", "e8f7", "c7h2",
];

test("kids K+Q drill: learner mates the scripted engine → win", async ({ page }) => {
  await useScriptedEngine(page); // empty queue → deterministic first-legal defender
  await page.goto(activityUrl("kq-mate-drill"));
  await expect(
    page.getByRole("heading", { name: "Win with King and Queen" }).first(),
  ).toBeVisible();

  await tapMoves(page, KIDS_KQ, "white");

  // Checkmate by the learner completes the drill → the forward control appears.
  await expect(page.getByTestId("advance")).toBeVisible();
});

test("Endgame Trainer K+Q: learner mates the scripted engine → position won", async ({ page }) => {
  await useScriptedEngine(page);
  await page.goto("/endgames");
  await page.getByRole("button", { name: "King + Queen vs King" }).click();
  await expect(
    page.getByRole("heading", { name: "King + Queen vs King" }).first(),
  ).toBeVisible();

  await tapMoves(page, ENDGAME_KQ, "white");

  await expect(page.getByText("Position won!")).toBeVisible();
});

test("Play & Review: the scripted engine replies and the review screen renders", async ({ page }) => {
  await useScriptedEngine(page);
  await page.goto("/play");
  await page.getByRole("button", { name: "Start game" }).click();
  await expect(page.getByText(/Your move/)).toBeVisible();

  // Play 1.e4; the scripted opponent replies (getMoveAtElo), turn returns to us.
  await clickSquare(page, "e2", "white");
  await clickSquare(page, "e4", "white");
  await expect(page.getByText(/Your move/)).toBeVisible();

  // End and review (exercises analyze() over the game).
  await page.getByRole("button", { name: "End game & review" }).click();
  await page.getByRole("button", { name: "Review my game" }).click();
  await expect(page.getByRole("heading", { name: "Game review" })).toBeVisible();
  // The move list includes our move and the engine's reply.
  await expect(page.getByText("e4").first()).toBeVisible();
});

test("engine harness has teeth: an unfinished drill is not reported as a win", async ({ page }) => {
  await useScriptedEngine(page);
  await page.goto(activityUrl("kq-mate-drill"));
  await tapMoves(page, KIDS_KQ.slice(0, 2), "white"); // partial line — no mate
  await expect(page.getByTestId("advance")).toHaveCount(0);
});
