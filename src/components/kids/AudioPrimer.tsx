"use client";

// Primes the audio pipeline on the very first user interaction of the session so
// that auto-read (useAutoRead) can play without a tap on every screen. Renders
// nothing. The listener removes itself after the first gesture. (Adding an event
// listener in an effect is lint-safe — no setState in the effect.)

import { useEffect } from "react";
import { primeAudio } from "@/lib/audio/speech";

export function AudioPrimer() {
  useEffect(() => {
    const onFirst = () => {
      primeAudio();
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
    window.addEventListener("pointerdown", onFirst, { once: true });
    window.addEventListener("keydown", onFirst, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
  }, []);
  return null;
}
