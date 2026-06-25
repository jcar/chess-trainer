// Content-driven test helpers. We import the *actual kids module data* (and the
// same seeded-shuffle the app uses) so tests know the correct answer/order for
// every activity — no guessing, and the tests track the content automatically.
// These imports are pure data (Node-safe; no DOM/engine), reached by relative
// path so we don't need the app's "@/" alias in the Playwright tsconfig.

import { type Page, expect } from "@playwright/test";
import { chessForKids } from "../../src/content/modules/chess-for-kids";
import { seededOrder } from "../../src/lib/shuffle";
import type { Activity, Lesson } from "../../src/content/types";
import { clickSquare, playLine } from "./board";

export const KIDS_MODULE_ID = chessForKids.id;
export const KIDS_LESSONS: Lesson[] = chessForKids.lessons;

export function allActivities(): { lesson: Lesson; activity: Activity }[] {
  return KIDS_LESSONS.flatMap((lesson) =>
    lesson.activities.map((activity) => ({ lesson, activity })),
  );
}

export function activityUrl(id: string): string {
  return `/modules/${KIDS_MODULE_ID}/${id}/`;
}

/** Types backed by Stockfish — non-deterministic, so we only smoke-load them. */
export const ENGINE_TYPES = new Set<Activity["type"]>(["drill"]);

/** Types this solver doesn't auto-complete in v1 (engine or geometry-heavy). */
export const UNSOLVED_TYPES = new Set<Activity["type"]>([
  "drill",
  "target",
  "movemap",
  "openingDrill",
  "practiceSet",
  "reviewCheckpoint",
]);

async function clickOptionByText(page: Page, text: string) {
  await page
    .getByRole("button")
    .filter({ has: page.getByText(text, { exact: true }) })
    .first()
    .click();
}

/**
 * Drive an activity to completion using the content data as the answer key.
 * Does NOT click the forward control — the caller advances with
 * `[data-testid=advance]` afterwards (uniform across every type, including the
 * scene/concept self-advancing CTA). Returns false for types not auto-solved.
 */
export async function solveActivity(page: Page, activity: Activity): Promise<boolean> {
  switch (activity.type) {
    case "scene": {
      // Step through the lines; the final CTA *is* [data-testid=advance].
      for (let i = 0; i < activity.lines.length - 1; i++) {
        await page.getByRole("button", { name: "Next" }).click();
      }
      return true;
    }
    case "concept": {
      if (activity.check) {
        await clickOptionByText(page, activity.check.options[activity.check.correctIndex]);
      }
      return true; // advance link is the concept's own [data-testid=advance]
    }
    case "quiz":
      await clickOptionByText(page, activity.options[activity.correctIndex]);
      return true;
    case "sort":
      await clickOptionByText(page, activity.options[activity.correctIndex].label);
      return true;
    case "pictureQuiz": {
      const order = seededOrder(activity.options.length, activity.id);
      const pos = order.indexOf(activity.correctIndex);
      await page.getByTestId("picture-option").nth(pos).click();
      return true;
    }
    case "coordinate":
      for (const sq of activity.rounds) {
        await clickSquare(page, sq, activity.orientation);
        await page.waitForTimeout(150);
      }
      return true;
    case "puzzle":
      await playLine(page, activity.solution, activity.orientation);
      return true;
    case "replay":
      for (let i = 0; i < activity.steps.length; i++) {
        await page.getByRole("button", { name: "Next" }).click();
      }
      return true;
    default:
      return false;
  }
}

/** Solve, then advance to the next activity via the shared forward control. */
export async function solveAndAdvance(page: Page, activity: Activity) {
  const solved = await solveActivity(page, activity);
  expect(solved, `solveActivity should handle ${activity.type}`).toBeTruthy();
  await page.getByTestId("advance").click();
}
