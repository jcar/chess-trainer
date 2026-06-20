// Friendly sound effects synthesized with the Web Audio API — no audio files to
// ship or load. Browser-only. The AudioContext is created lazily on the first
// call (which always comes from a user tap), satisfying iOS autoplay rules.

type SoundName =
  | "select"
  | "move"
  | "capture"
  | "success"
  | "tryAgain"
  | "step"
  | "star"
  | "fanfare";

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    // Safari suspends the context until a gesture resumes it.
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

/** Play one short tone with a smooth envelope. */
function tone(
  c: AudioContext,
  freq: number,
  startAt: number,
  durationMs: number,
  type: OscillatorType = "sine",
  peak = 0.18,
): void {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startAt);
  const dur = durationMs / 1000;
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(peak, startAt + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(startAt);
  osc.stop(startAt + dur + 0.02);
}

/** Play a named sound effect. Safe to call anywhere; no-ops if audio is off. */
export function playSound(name: SoundName): void {
  if (muted) return;
  const c = getCtx();
  if (!c) return;
  const t = c.currentTime;
  switch (name) {
    case "select":
      tone(c, 660, t, 80, "triangle", 0.12);
      break;
    case "move":
      tone(c, 440, t, 90, "sine", 0.15);
      break;
    case "capture":
      tone(c, 300, t, 70, "square", 0.12);
      tone(c, 200, t + 0.06, 110, "square", 0.12);
      break;
    case "step":
      tone(c, 520, t, 70, "sine", 0.1);
      break;
    case "success":
      // A happy little C–E–G–C arpeggio.
      tone(c, 523, t, 140, "triangle", 0.16);
      tone(c, 659, t + 0.13, 140, "triangle", 0.16);
      tone(c, 784, t + 0.26, 160, "triangle", 0.16);
      tone(c, 1047, t + 0.42, 240, "triangle", 0.18);
      break;
    case "tryAgain":
      // Gentle, non-scary downward "boop-boop".
      tone(c, 392, t, 130, "sine", 0.14);
      tone(c, 330, t + 0.12, 160, "sine", 0.14);
      break;
    case "star":
      // A bright little "ding!" when a star is earned.
      tone(c, 988, t, 90, "triangle", 0.16);
      tone(c, 1319, t + 0.08, 160, "triangle", 0.16);
      break;
    case "fanfare":
      // A short celebratory fanfare for finishing a lesson.
      tone(c, 523, t, 130, "triangle", 0.16);
      tone(c, 659, t + 0.12, 130, "triangle", 0.16);
      tone(c, 784, t + 0.24, 130, "triangle", 0.16);
      tone(c, 1047, t + 0.38, 200, "triangle", 0.18);
      tone(c, 1319, t + 0.56, 300, "triangle", 0.2);
      break;
  }
}

/** Resume the audio context from a user gesture (call on first tap). */
export function unlockAudio(): void {
  getCtx();
}

export function setMuted(value: boolean): void {
  muted = value;
}
export function isMuted(): boolean {
  return muted;
}
