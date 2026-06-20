// Read-aloud for young children, using the browser's built-in Web Speech API
// (no network, no assets). Browser-only — every function no-ops on the server
// or where speech isn't supported.
//
// iOS/Safari only allows speech to start from a user gesture, so callers should
// invoke speak() from a tap handler (e.g. the SpeakButton).

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

/**
 * Speak the given text aloud. Cancels any in-progress speech first so taps feel
 * responsive. Rate/pitch are tuned to be clear and friendly for kids.
 */
export function speak(text: string): void {
  const s = synth();
  if (!s || !text.trim()) return;
  try {
    s.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voice = chooseVoice(s);
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? "en-US";
    u.rate = 0.92; // a touch slower for young listeners
    u.pitch = 1.08; // slightly brighter
    u.volume = 1;
    s.speak(u);
  } catch {
    // Speech is best-effort; never throw into the UI.
  }
}

export function stopSpeaking(): void {
  synth()?.cancel();
}
