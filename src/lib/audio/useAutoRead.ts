"use client";

// Auto-play read-aloud for kid mode. Speaks `text` when it first appears and
// whenever it changes, IF the child's read-aloud preference is on (default).
// SpeakButton stays as a manual "replay". The effect only calls speech (a side
// effect — never setState), so it satisfies react-hooks/set-state-in-effect.

import { useEffect, useRef } from "react";
import type { CharacterId } from "@/content/kids/characters";
import { speak, speakAs, stopSpeaking } from "@/lib/audio/speech";
import { useKidsPrefs } from "@/lib/kids/prefs";

interface Options {
  /** Read in a character's voice; omit for the narrator voice. */
  characterId?: CharacterId;
  /** Gate to kid mode (pass `kidMode`). Defaults to true for kid-only screens. */
  enabled?: boolean;
}

export function useAutoRead(text: string | undefined, opts: Options = {}): void {
  const { readAloud } = useKidsPrefs();
  const { characterId, enabled = true } = opts;
  const active = enabled && readAloud;
  const lastSpoken = useRef<string | null>(null);

  useEffect(() => {
    if (!active) return;
    const t = text?.trim();
    if (!t || lastSpoken.current === t) return;
    lastSpoken.current = t;
    if (characterId) speakAs(t, characterId);
    else speak(t);
  }, [text, active, characterId]);

  // Stop any clip when leaving the screen so audio doesn't bleed across routes.
  useEffect(() => () => stopSpeaking(), []);
}
