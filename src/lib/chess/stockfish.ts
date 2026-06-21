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

/** Approximate sub-1320-Elo play by limiting search depth + skill (the engine
 *  has no native Elo setting below 1320). Shallower search = weaker, beatable
 *  by beginners. Heuristic — tuned for "feels about right", not exact Elo. */
function weakConfigForElo(elo: number): { skill: number; depth: number } {
  if (elo <= 700) return { skill: 0, depth: 1 };
  if (elo <= 1000) return { skill: 1, depth: 2 };
  return { skill: 2, depth: 4 }; // ~1100 up to the 1320 native floor
}

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
      // Ensure a prior Elo-limited game doesn't leave UCI_LimitStrength on (it
      // would cap this skill-based move at 1320).
      this.send("setoption name UCI_LimitStrength value false");
      this.send(`setoption name Skill Level value ${clampedSkill}`);
      this.send(`position fen ${fen}`);
      this.send(`go movetime ${moveTimeMs}`);
    });
  }

  /**
   * Ask for a move at a target Elo rating (for Play & Review's opponent ladder).
   * Ratings ≥ 1320 use the engine's native UCI_Elo limiter (calibrated). Weaker
   * ratings are APPROXIMATED by capping search depth + skill, since the engine
   * cannot natively limit below 1320 Elo. Returns UCI or null.
   */
  async getMoveAtElo(
    fen: string,
    elo: number,
    moveTimeMs = 600,
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

      const e = Math.round(elo);
      if (e >= 1320) {
        this.send("setoption name UCI_LimitStrength value true");
        this.send(`setoption name UCI_Elo value ${Math.min(3190, e)}`);
        this.send("setoption name Skill Level value 20");
        this.send(`position fen ${fen}`);
        this.send(`go movetime ${moveTimeMs}`);
      } else {
        // Below the native floor: throttle search so beginners can win.
        const { skill, depth } = weakConfigForElo(e);
        this.send("setoption name UCI_LimitStrength value false");
        this.send(`setoption name Skill Level value ${skill}`);
        this.send(`position fen ${fen}`);
        this.send(`go depth ${depth}`);
      }
    });
  }

  /**
   * Analyze a position at full strength to a fixed depth. Returns the evaluation
   * from the SIDE-TO-MOVE's perspective (cp = centipawns, or mate-in-N) plus the
   * best move. Used by Play & Review.
   */
  async analyze(
    fen: string,
    depth = 12,
  ): Promise<{ cp: number | null; mate: number | null; bestMove: string | null }> {
    await this.ensureWorker();

    return new Promise((resolve) => {
      let cp: number | null = null;
      let mate: number | null = null;
      let best: string | null = null;
      const onLine = (line: string) => {
        if (line.startsWith("info")) {
          const sm = line.match(/score (cp|mate) (-?\d+)/);
          if (sm) {
            if (sm[1] === "cp") {
              cp = Number(sm[2]);
              mate = null;
            } else {
              mate = Number(sm[2]);
              cp = null;
            }
          }
          const pv = line.match(/ pv (\S+)/);
          if (pv) best = pv[1];
        } else if (line.startsWith("bestmove")) {
          this.listeners.delete(onLine);
          const bm = line.split(" ")[1];
          if (bm && bm !== "(none)") best = bm;
          resolve({ cp, mate, bestMove: best });
        }
      };
      this.listeners.add(onLine);
      // Full strength for analysis — clear any Elo limit left by a rated game.
      this.send("setoption name UCI_LimitStrength value false");
      this.send("setoption name Skill Level value 20");
      this.send(`position fen ${fen}`);
      this.send(`go depth ${depth}`);
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
