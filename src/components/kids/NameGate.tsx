"use client";

// First-run name prompt for the certificate / greeting. Empty default in the
// prefs store means this shows until the child enters a name (no SSR mismatch).

import { useState } from "react";
import { setKidsPrefs } from "@/lib/kids/prefs";
import { buttonClasses } from "@/components/ui/Button";
import { PipMascot } from "@/components/kids/PipMascot";

export function NameGate({ onDone }: { onDone?: () => void }) {
  const [name, setName] = useState("");

  function save() {
    const n = name.trim();
    if (!n) return;
    setKidsPrefs({ name: n });
    onDone?.();
  }

  return (
    <div className="space-y-5 text-center">
      <div className="flex justify-center">
        <PipMascot mood="cheer" size={72} says="What's your name?" />
      </div>
      <p className="text-lg text-ink-soft">Tell Pip your name for your certificate!</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
        className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={24}
          placeholder="Your name"
          aria-label="Your name"
          className="flex-1 rounded-2xl border border-line bg-card px-4 py-3 text-lg text-ink shadow-soft outline-none transition focus-visible:ring-2 focus-visible:ring-accent/50"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className={buttonClasses("primary", "lg", "disabled:opacity-40")}
        >
          Save
        </button>
      </form>
    </div>
  );
}
