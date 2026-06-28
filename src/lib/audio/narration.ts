// Generic (non-character) read-aloud, the "narrator" voice. These builders are
// the SINGLE source of truth for the composed read-aloud strings so the app and
// the TTS extractor produce byte-identical text (and therefore matching clip
// keys). Relative imports only — this module is imported by the Node extract
// script as well as the app, so it must not rely on the "@/" path alias.

import type {
  Activity,
  ConceptActivity,
  MoveMapActivity,
  QuizActivity,
} from "../../content/types";
import { seededOrder } from "../shuffle";

/** Reserved "speaker" for generic narration clips (keys: narrator-<hash>). */
export const NARRATOR_ID = "narrator";
/** Gemini voice for the narrator (a warm storyteller). Tweak + regenerate. */
export const NARRATOR_VOICE = "Vindemiatrix";

/** Answer-option letters — must match QuizPlayer's rendering + read-aloud. */
const BADGES = ["A", "B", "C", "D"];

/** Activity header read-aloud: "Title. Blurb" (mirrors ActivityPlayer). */
export function headerSpeech(a: { title: string; blurb?: string }): string {
  return `${a.title}. ${a.blurb ?? ""}`;
}

/** Quiz question + lettered options in the (seeded) display order. */
export function quizReadAloud(a: QuizActivity): string {
  const order = seededOrder(a.options.length, a.id);
  return `${a.question}. ${order
    .map((origIdx, pos) => `${BADGES[pos]}. ${a.options[origIdx]}`)
    .join(". ")}`;
}

/** Concept card body + key points. */
export function conceptSpeech(a: ConceptActivity): string {
  return [a.body, ...(a.points ?? [])].join(". ");
}

/** "Meet the piece" intro + fun fact. */
export function moveMapSpeech(a: MoveMapActivity): string {
  return `${a.intro} ${a.funFact}`;
}

/**
 * Every static + composed-deterministic read-aloud string an activity speaks
 * through the generic `speak()` path, for the extractor to render. Mirrors what
 * the components pass to SpeakButton (no characterId). Runtime-dynamic strings
 * (live drill/feedback status, per-round coordinate prompts) are intentionally
 * omitted — those keep the Web Speech fallback.
 */
export function narrationStrings(a: Activity): string[] {
  const out: string[] = [headerSpeech(a)];
  switch (a.type) {
    case "quiz":
      out.push(quizReadAloud(a), a.explanation);
      break;
    case "sort":
      out.push(a.prompt, a.explanation);
      break;
    case "pictureQuiz":
      out.push(a.question, a.explanation);
      break;
    case "concept":
      out.push(conceptSpeech(a));
      if (a.check) out.push(a.check.question, a.check.explanation);
      break;
    case "replay":
      out.push(a.intro, ...a.steps.map((s) => s.note));
      break;
    case "movemap":
      out.push(moveMapSpeech(a));
      break;
    case "coordinate":
      out.push(a.successText);
      break;
    case "target":
      out.push(a.intro, a.successText);
      break;
    case "drill":
      out.push(a.instructions, a.successText);
      break;
    case "openingDrill":
      out.push(a.intro, a.successText);
      for (const n of a.notes ?? []) if (n) out.push(n);
      break;
    case "practiceSet":
      out.push(...a.items.map((i) => i.prompt));
      break;
    case "puzzle":
      out.push(a.prompt, a.successText);
      break;
    case "reviewCheckpoint":
      out.push(a.intro);
      for (const it of a.items) out.push(it.question, it.explanation);
      break;
    case "scene":
      break; // character dialogue — handled separately
    case "guessMove":
      out.push(a.intro, a.successText);
      for (const n of a.notes ?? []) if (n) out.push(n);
      break;
    case "plan":
      out.push(a.planQuestion, a.explanation);
      break;
  }
  return out.filter((s) => s != null && s.trim() !== "");
}
