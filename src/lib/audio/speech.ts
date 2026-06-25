// Read-aloud for young children, using the browser's built-in Web Speech API
// (no network, no assets). Browser-only — every function no-ops on the server
// or where speech isn't supported.
//
// iOS/Safari only allows speech to start from a user gesture, so callers should
// invoke speak() from a tap handler (e.g. the SpeakButton).

import { CHARACTERS, type CharacterId } from "@/content/kids/characters";
import { withBasePath } from "@/lib/basePath";
import { dialogueKey } from "@/lib/audio/dialogueKey";
import { CLIP_FILES } from "@/lib/audio/clipManifest";

// A pre-generated clip currently playing (so a new line / stop can interrupt it).
let currentAudio: HTMLAudioElement | null = null;

function stopAudio(): void {
  if (currentAudio) {
    try {
      currentAudio.pause();
    } catch {
      /* ignore */
    }
    currentAudio = null;
  }
}

function synth(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  return window.speechSynthesis ?? null;
}

export function speechSupported(): boolean {
  return synth() !== null && typeof window.SpeechSynthesisUtterance !== "undefined";
}

/** Pick a pleasant English voice if one is available. */
function chooseVoice(s: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = s.getVoices();
  if (!voices.length) return null;
  // Prefer a local en-US/en-GB voice; fall back to any English, then anything.
  return (
    voices.find((v) => /^en[-_]/i.test(v.lang) && v.localService) ??
    voices.find((v) => /^en[-_]/i.test(v.lang)) ??
    voices[0]
  );
}

/** Speak with explicit pitch/rate shaping (shared by speak + speakAs). */
function speakWith(text: string, pitch: number, rate: number): void {
  const s = synth();
  if (!s || !text.trim()) return;
  try {
    const u = new SpeechSynthesisUtterance(text);
    const voice = chooseVoice(s);
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? "en-US";
    u.rate = rate;
    u.pitch = pitch;
    u.volume = 1;
    // Chrome drops a speak() that immediately follows cancel(), so only cancel
    // when something is actually playing/queued (the common case — advancing a
    // line after the previous one finished — then needs no cancel at all and
    // plays cleanly). Done synchronously to stay inside the iOS user gesture.
    if (s.speaking || s.pending) s.cancel();
    s.speak(u);
    // Nudge Chrome out of the occasional post-cancel "stalled" state.
    s.resume();
  } catch {
    // Speech is best-effort; never throw into the UI.
  }
}

/**
 * Speak the given text aloud. Cancels any in-progress speech first so taps feel
 * responsive. Rate/pitch are tuned to be clear and friendly for kids.
 */
export function speak(text: string): void {
  speakWith(text, 1.08, 0.92); // slightly brighter, a touch slower for kids
}

/**
 * Speak a character's line (Pip & the Grey). If a pre-generated Gemini voice clip
 * exists for this exact line (keyed by speaker + text), play that natural audio;
 * otherwise fall back to the Web Speech voice (re-shaped per character via
 * pitch/rate). The clip path is the only difference — every character-dialogue
 * caller already routes through here.
 */
export function speakAs(text: string, characterId: CharacterId): void {
  const v = CHARACTERS[characterId].voice;
  const file = CLIP_FILES[dialogueKey(characterId, text)];

  if (file && typeof window !== "undefined") {
    try {
      synth()?.cancel(); // stop any Web Speech in flight
      stopAudio();
      const audio = new Audio(withBasePath(`/audio/dialogue/${file}`));
      currentAudio = audio;
      // If the clip can't load/play (missing file, autoplay denied), fall back.
      audio.play().catch(() => {
        if (currentAudio === audio) currentAudio = null;
        speakWith(text, v.pitch, v.rate);
      });
      return;
    } catch {
      /* fall through to Web Speech */
    }
  }
  speakWith(text, v.pitch, v.rate);
}

export function stopSpeaking(): void {
  synth()?.cancel();
  stopAudio();
}
