// Engine-grounded annotation drafting for the Chess Strategy "masterclass".
//
// For every Strategy Lab (a `replay` with `eval: true`) and every `guessMove`
// game in the strategy module, this:
//   1. replays the SAN line and captures the position before each ply,
//   2. runs Stockfish (multi-PV) at each step to get the eval + top moves
//      (the "engine facts" — these never hallucinate),
//   3. (optionally) asks Gemini to draft an ORIGINAL instructive note for that
//      move, grounded in those facts + the lesson's strategic theme.
//
// Output is a DRAFT file (`scripts/strategy/draft-annotations.json`) for HUMAN
// REVIEW — it is never folded into content automatically. That review step is
// what keeps the shipped prose original and free of engine/LLM mistakes.
//
// Run:
//   npm run strategy:annotate                 # engine facts only (no API key)
//   GEMINI_API_KEYS=... npm run strategy:annotate   # + Gemini draft notes
//
// Engine facts are useful on their own; the Gemini step is additive.

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Chess } from "chess.js";
import { GoogleGenAI } from "@google/genai";
import { getModule } from "../../src/content";
import type { Module } from "../../src/content/types";

// Which module to annotate/fact-check (default strategy). e.g. `... annotate.ts intermediate`
const MODULE_ID = process.argv[2] ?? "strategy";
const found = getModule(MODULE_ID);
if (!found) throw new Error(`Unknown module "${MODULE_ID}".`);
const mod: Module = found;
import type { Activity } from "../../src/content/types";
import { getEngine, quitEngine, type Score } from "../lib/engine";

const here = dirname(fileURLToPath(import.meta.url));
const outPath = join(here, "draft-annotations.json");

const ANNOTATE_DEPTH = 18;
const TEXT_MODEL = process.env.TEXT_MODEL ?? "gemini-2.5-flash";

// The imbalance lens each lesson teaches through — fed to Gemini so a draft note
// stays on the lesson's strategic message (falls back to the lesson summary).
const THEME: Record<string, string> = {
  "weak-squares":
    "Weak squares and outposts: a hole is a square no enemy pawn can ever guard; a knight planted there is a permanent, unkickable trump. Weigh that long-term asset honestly against the opponent's dynamic compensation.",
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function scoreText(s: Score | undefined): string {
  if (!s) return "n/a";
  if ("mate" in s) return `mate in ${s.mate}`;
  const v = s.cp / 100;
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}`;
}

/** UCI → SAN in the given position (best-effort; returns UCI on failure). */
function uciToSan(fen: string, uci: string): string {
  try {
    const g = new Chess(fen);
    const m = g.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] });
    return m.san;
  } catch {
    return uci;
  }
}

interface StepFact {
  ply: number; // 0-based
  movePlayed: string; // SAN played in the game
  sideToMove: "White" | "Black";
  fenBefore: string;
  eval: string; // White-relative-ish from side-to-move; we report side-to-move POV
  topMoves: { san: string; eval: string }[];
  existingNote?: string;
  draftNote?: string; // filled if Gemini is available
}

interface JobOutput {
  activityId: string;
  type: "lab" | "guessMove";
  theme: string;
  source?: string;
  steps: StepFact[];
}

/** Collect the (fenBefore, movePlayed) sequence for a SAN line. */
function replaySteps(startFen: string | undefined, sans: string[]) {
  const g = startFen ? new Chess(startFen) : new Chess();
  const steps: { ply: number; fenBefore: string; movePlayed: string; side: "White" | "Black" }[] = [];
  for (let i = 0; i < sans.length; i++) {
    const fenBefore = g.fen();
    const side = g.turn() === "w" ? "White" : "Black";
    let san = sans[i];
    try {
      const m = g.move(sans[i]);
      san = m.san;
    } catch {
      console.warn(`  ! illegal move ${sans[i]} at ply ${i} — stopping line`);
      break;
    }
    steps.push({ ply: i, fenBefore, movePlayed: san, side });
  }
  return steps;
}

/** A minimal, resilient text client over @google/genai (key rotation + 429 backoff). */
class TextGen {
  private keys: string[];
  private ki = 0;
  private ai: GoogleGenAI | null = null;
  constructor() {
    this.keys = (process.env.GEMINI_API_KEYS ?? process.env.GEMINI_API_KEY ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (this.keys.length) this.ai = new GoogleGenAI({ apiKey: this.keys[0] });
  }
  get enabled() {
    return this.ai !== null;
  }
  private rotate() {
    this.ki = (this.ki + 1) % this.keys.length;
    this.ai = new GoogleGenAI({ apiKey: this.keys[this.ki] });
  }
  async draft(prompt: string): Promise<string | null> {
    if (!this.ai) return null;
    for (let attempt = 1; attempt <= 6; attempt++) {
      try {
        const resp = await this.ai.models.generateContent({
          model: TEXT_MODEL,
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        });
        const text = resp.text?.trim();
        await sleep(1200);
        return text ?? null;
      } catch (e) {
        const msg = String((e as Error).message ?? e);
        if (msg.includes("429") || msg.toLowerCase().includes("quota")) {
          if (this.keys.length > 1) this.rotate();
          await sleep(2000 * attempt);
          continue;
        }
        console.warn(`  ! Gemini error: ${msg}`);
        return null;
      }
    }
    return null;
  }
}

function buildPrompt(theme: string, fact: StepFact): string {
  const tops = fact.topMoves.map((t) => `${t.san} (${t.eval})`).join(", ");
  return [
    "You are drafting a one-sentence annotation for an adult chess masterclass.",
    "Write ORIGINAL prose in your own words. Do NOT quote any book.",
    "",
    `Lesson theme: ${theme}`,
    `Position (FEN): ${fact.fenBefore}`,
    `It is ${fact.sideToMove} to move; the move played was ${fact.movePlayed}.`,
    `Engine eval (side-to-move POV): ${fact.eval}. Engine's top moves: ${tops}.`,
    "",
    "Write ONE concise, instructive sentence (max ~28 words) explaining the move's",
    "strategic point, tied to the lesson theme where relevant. No move numbers, no",
    "engine jargon (don't say 'centipawns' or cite the eval number). Plain, vivid.",
  ].join("\n");
}

async function main() {
  const engine = getEngine();
  const gen = new TextGen();
  console.log(
    gen.enabled
      ? `Gemini drafting ON (model ${TEXT_MODEL}).`
      : "Gemini drafting OFF (no GEMINI_API_KEYS) — emitting engine facts only.",
  );

  const jobs: { activity: Activity; type: "lab" | "guessMove" }[] = [];
  for (const lesson of mod.lessons) {
    for (const a of lesson.activities) {
      if (a.type === "replay" && a.eval) jobs.push({ activity: a, type: "lab" });
      else if (a.type === "guessMove") jobs.push({ activity: a, type: "guessMove" });
    }
  }
  console.log(`Found ${jobs.length} annotation job(s).`);

  const out: JobOutput[] = [];
  for (const { activity, type } of jobs) {
    const lessonId =
      mod.lessons.find((l) => l.activities.some((x) => x.id === activity.id))?.id ?? "";
    const theme = THEME[lessonId] ?? mod.lessons.find((l) => l.id === lessonId)?.summary ?? "";

    let startFen: string | undefined;
    let sans: string[];
    let existingNotes: (string | undefined)[];
    let source: string | undefined;
    if (type === "lab" && activity.type === "replay") {
      startFen = activity.startFen;
      sans = activity.steps.map((s) => s.san);
      existingNotes = activity.steps.map((s) => s.note);
      source = activity.source;
    } else if (activity.type === "guessMove") {
      startFen = activity.startFen;
      sans = activity.moves;
      existingNotes = activity.notes ?? [];
      source = activity.source;
    } else {
      continue;
    }

    console.log(`\n• ${activity.id} (${type}) — ${sans.length} plies`);
    const replayed = replaySteps(startFen, sans);
    const steps: StepFact[] = [];

    for (const r of replayed) {
      const { lines } = await engine.analyze(r.fenBefore, { depth: ANNOTATE_DEPTH, multiPV: 3 });
      const topMoves = lines.map((l) => ({
        san: uciToSan(r.fenBefore, l.move),
        eval: scoreText(l.score),
      }));
      const fact: StepFact = {
        ply: r.ply,
        movePlayed: r.movePlayed,
        sideToMove: r.side,
        fenBefore: r.fenBefore,
        eval: scoreText(lines[0]?.score),
        topMoves,
        existingNote: existingNotes[r.ply],
      };
      if (gen.enabled) {
        fact.draftNote = (await gen.draft(buildPrompt(theme, fact))) ?? undefined;
      }
      steps.push(fact);
      process.stdout.write(".");
    }
    process.stdout.write("\n");
    out.push({ activityId: activity.id, type, theme, source, steps });
  }

  quitEngine();
  writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`\n✓ Wrote ${out.length} job(s) to ${outPath} — review before folding notes into content.`);
}

void main();
