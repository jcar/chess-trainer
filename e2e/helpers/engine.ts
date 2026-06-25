// Enable the deterministic scripted engine (src/lib/chess/scriptedEngine.ts) for
// a test by seeding its localStorage flag before the app loads. With an empty
// queue the engine plays a deterministic first-legal move; pass canned UCI
// replies to script the opponent precisely.

import type { Page } from "@playwright/test";

const FLAG_KEY = "chess-trainer:e2e:engine";

export async function useScriptedEngine(page: Page, cannedMoves: string[] = []) {
  await page.addInitScript(
    (arg: { key: string; val: string }) => {
      window.localStorage.setItem(arg.key, arg.val);
    },
    { key: FLAG_KEY, val: JSON.stringify(cannedMoves) },
  );
}
