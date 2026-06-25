// Deterministic stand-in for the Stockfish client, used ONLY in e2e tests so
// engine-backed flows (drills, play-vs-Pip) are reproducible. Inert in
// production: `getEngine()` only uses it when the localStorage flag below is set,
// which nothing but the test harness ever does.
//
// Behavior: it replies with the next move from a test-seeded queue of UCI moves
// (so a test can script a whole game), falling back to a deterministic legal move
// when the queue is empty. `analyze` returns a deterministic stub.

import { Chess } from "chess.js";
import type { Analysis, EngineLike } from "./stockfish";

/** localStorage key holding a JSON array of canned UCI replies. Presence of the
 *  key (even an empty array) enables the scripted engine. */
const FLAG_KEY = "chess-trainer:e2e:engine";

export function isScriptedEngineEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(FLAG_KEY) !== null;
  } catch {
    return false;
  }
}

function readQueue(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FLAG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

/** The lowest legal move by sorted UCI — deterministic, always legal. */
function firstLegalMove(fen: string): string | null {
  try {
    const g = new Chess(fen);
    const moves = g.moves({ verbose: true }) as {
      from: string;
      to: string;
      promotion?: string;
    }[];
    if (!moves.length) return null;
    return moves
      .map((m) => m.from + m.to + (m.promotion ?? ""))
      .sort()[0];
  } catch {
    return null;
  }
}

function isLegal(fen: string, uci: string): boolean {
  try {
    const g = new Chess(fen);
    g.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] });
    return true;
  } catch {
    return false;
  }
}

class ScriptedEngine implements EngineLike {
  private queue: string[];
  constructor(queue: string[]) {
    this.queue = [...queue];
  }

  /** Next canned reply that's legal here; else a deterministic legal move. */
  private next(fen: string): string | null {
    while (this.queue.length) {
      const m = this.queue.shift()!;
      if (isLegal(fen, m)) return m;
      // skip a canned move that doesn't apply to this position (defensive)
    }
    return firstLegalMove(fen);
  }

  async getBestMove(fen: string): Promise<string | null> {
    return this.next(fen);
  }

  async getMoveAtElo(fen: string): Promise<string | null> {
    return this.next(fen);
  }

  async analyze(fen: string): Promise<Analysis> {
    let mate: number | null = null;
    try {
      if (new Chess(fen).isCheckmate()) mate = 0;
    } catch {
      /* unparseable fen — leave as cp 0 */
    }
    return { cp: mate === null ? 0 : null, mate, bestMove: firstLegalMove(fen) };
  }

  dispose() {
    this.queue = [];
  }
}

export function createScriptedEngine(): EngineLike {
  return new ScriptedEngine(readQueue());
}
