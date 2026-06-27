"use client";

// Settings — opened from the gear in the crest rail (and the phone dock). Holds
// the theme control and a "reset all progress" action. Reset clears every
// chess-trainer:* localStorage key (lessons, stars, ratings, streaks, Pip's quest
// rewards) EXCEPT the theme, then reloads to a fresh Hall.

import { useState } from "react";
import { useTheme, type Theme } from "@/lib/theme/useTheme";
import { withBasePath } from "@/lib/basePath";
import { SettingsIcon } from "@/components/icons";

const KEEP = new Set(["chess-trainer:theme"]);

function resetEverything() {
  try {
    for (const k of Object.keys(window.localStorage)) {
      if (k.startsWith("chess-trainer:") && !KEEP.has(k)) {
        window.localStorage.removeItem(k);
      }
    }
  } catch {
    /* ignore — private mode etc. */
  }
  // Full reload so every store re-initialises from the cleared storage.
  window.location.assign(withBasePath("/"));
}

export function SettingsMenu({ variant = "rail" }: { variant?: "rail" | "dock" }) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const { theme, set } = useTheme();

  function close() {
    setOpen(false);
    setConfirming(false);
  }

  return (
    <>
      {variant === "dock" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Settings"
          className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1 text-ink-soft transition active:scale-95"
        >
          <SettingsIcon className="h-[21px] w-[21px]" />
          <span className="text-[10px] font-semibold tracking-tight">Settings</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Settings"
          title="Settings"
          className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-card text-ink-soft transition hover:border-primary/40 hover:text-ink"
        >
          <SettingsIcon className="h-5 w-5" />
        </button>
      )}

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Settings" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button type="button" aria-label="Close settings" onClick={close} className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm rounded-3xl border border-line bg-card p-6 shadow-lift">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-ink">Settings</h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft transition hover:bg-line/50 hover:text-ink"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Appearance */}
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">Appearance</p>
              <div className="mt-2 inline-flex rounded-xl border border-line bg-surface p-1">
                {(["light", "dark"] as Theme[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set(t)}
                    aria-pressed={theme === t}
                    className={`rounded-lg px-5 py-1.5 text-sm font-semibold capitalize transition ${
                      theme === t ? "bg-primary text-on-accent shadow-soft" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset progress */}
            <div className="mt-6 border-t border-line pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">Progress</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Erase all progress on this device — lessons, stars, ratings, streaks, and Pip&apos;s quest rewards. This can&apos;t be undone.
              </p>
              {confirming ? (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={resetEverything}
                    className="flex-1 rounded-xl bg-[var(--color-clay)] px-4 py-2.5 text-sm font-bold text-white shadow-soft transition hover:brightness-110"
                  >
                    Yes, erase everything
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(false)}
                    className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-ink-soft transition hover:text-ink"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirming(true)}
                  className="mt-3 w-full rounded-xl border border-[var(--color-clay)]/45 px-4 py-2.5 text-sm font-bold text-[var(--color-clay)] transition hover:bg-[var(--color-clay)]/10"
                >
                  Reset all progress
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
