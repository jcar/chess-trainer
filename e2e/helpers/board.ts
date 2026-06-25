// Board interaction helpers. react-chessboard v5 renders no per-square DOM
// nodes, so we click computed pixel positions inside the board wrapper
// ([data-chessboard] in src/components/board/Board.tsx). The wrapper has no
// padding and the board is a clean 8x8 square grid, so a square's center is
// (col+0.5, row+0.5) of an eighth of the box — flipped for black orientation.

import { type Page, expect } from "@playwright/test";

export type Orientation = "white" | "black";

const FILES = "abcdefgh";

async function squareCenter(page: Page, square: string, orientation: Orientation) {
  const board = page.locator("[data-chessboard]").first();
  await expect(board).toBeVisible();
  const box = await board.boundingBox();
  if (!box) throw new Error(`board has no bounding box (square ${square})`);

  const file = FILES.indexOf(square[0]); // a..h -> 0..7
  const rank = Number(square[1]); // 1..8
  if (file < 0 || rank < 1 || rank > 8) throw new Error(`bad square "${square}"`);

  let col = file;
  let row = 8 - rank;
  if (orientation === "black") {
    col = 7 - file;
    row = rank - 1;
  }
  return {
    x: box.x + (col + 0.5) * (box.width / 8),
    y: box.y + (row + 0.5) * (box.height / 8),
  };
}

/** Tap a single named square. */
export async function clickSquare(page: Page, square: string, orientation: Orientation) {
  const { x, y } = await squareCenter(page, square, orientation);
  await page.mouse.click(x, y);
}

/**
 * Play a UCI solution line by tap-to-move. Learner moves are the even indices
 * (tap from-square then to-square); the odd-indexed opponent replies auto-play
 * from the activity's fixed solution, so we just wait for the board to settle
 * (board animation is ~200ms). Promotions like "e7e8q" work: the player matches
 * on from+to and plays the full promotion move itself.
 */
export async function playLine(page: Page, uci: string[], orientation: Orientation) {
  for (let i = 0; i < uci.length; i += 2) {
    const move = uci[i];
    await clickSquare(page, move.slice(0, 2), orientation);
    await clickSquare(page, move.slice(2, 4), orientation);
    await page.waitForTimeout(450);
  }
}
