// Stockfish (WASM) client. Loads the single-threaded build served from
// /public/stockfish as a Web Worker and speaks UCI to it. Single-threaded means
// no SharedArrayBuffer, so no cross-origin-isolation headers are required.
//
// Used by the DrillPlayer to get the engine's reply, and available for hints.
// Browser-only — guard calls behind `typeof window !== "undefined"`.

import { withBasePath } from "@/lib/basePath";

// The worker is a hand-built absolute URL, so it must include the deploy base
// path (Next does not auto-prefix raw `new Worker("/...")` strings). The worker
// loads its sibling .wasm relative to its own URL, so both live in the same dir.
const ENGINE_URL = withBasePath("/stockfish/stockfish-18-lite-single.js");

/** UCI skill levels run 0 (weakest) to 20 (full strength). */
export type SkillLevel = number;

class StockfishEngine {
  private worker: Worker | null = null;
  private ready: Promise<void> | null = null;
  private listeners = new Set<(line: string) => void>();

  private ensureWorker(): Promise<void> {
    if (this.ready) return this.ready;

    this.ready = new Promise<void>((resolve, reject) => {
      try {
        const worker = new Worker(ENGINE_URL);
        this.worker = worker;
        worker.onmessage = (e: MessageEvent) => {
          const line = typeof e.data === "string" ? e.data : String(e.data);
          this.listeners.forEach((l) => l(line));
        };
        worker.onerror = (e) => reject(e);

        // Handshake: send `uci`, wait for `uciok`, then `isready`/`readyok`.
        const onLine = (line: string) => {
          if (line === "uciok") {
            this.send("isready");
          } else if (line === "readyok") {
            this.listeners.delete(onLine);
            resolve();
          }
        };
        this.listeners.add(onLine);
        this.send("uci");
      } catch (err) {
        reject(err);
      }
    });

    return this.ready;
  }

  private send(cmd: string) {
    this.worker?.postMessage(cmd);
  }

  /**
   * Ask the engine for the best move in `fen` at the given skill level.
   * Returns a UCI move string ("e2e4") or null if none (game over).
   */
  async getBestMove(
    fen: string,
    skill: SkillLevel = 5,
    moveTimeMs = 500,
  ): Promise<string | null> {
    await this.ensureWorker();

    return new Promise<string | null>((resolve) => {
      const onLine = (line: string) => {
        if (line.startsWith("bestmove")) {
          this.listeners.delete(onLine);
          const move = line.split(" ")[1];
          resolve(move && move !== "(none)" ? move : null);
        }
      };
      this.listeners.add(onLine);

      const clampedSkill = Math.max(0, Math.min(20, Math.round(skill)));
      this.send(`setoption name Skill Level value ${clampedSkill}`);
      this.send(`position fen ${fen}`);
      this.send(`go movetime ${moveTimeMs}`);
    });
  }

  /** Tear down the worker (e.g. when leaving a drill). */
  dispose() {
    this.worker?.terminate();
    this.worker = null;
    this.ready = null;
    this.listeners.clear();
  }
}

// One shared engine per page. Drills reuse it; creating/destroying a worker per
// move would be wasteful and slow.
let singleton: StockfishEngine | null = null;

export function getEngine(): StockfishEngine {
  if (!singleton) singleton = new StockfishEngine();
  return singleton;
}
