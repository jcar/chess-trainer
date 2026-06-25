"use client";

// A "New badge!" toast that slides in, holds, and fades out via CSS (no timers /
// effects — keyed by a counter so it remounts and replays, like Confetti). Render
// it once near the top of a kid screen; bump `fireKey` and pass the badge to show.

interface Props {
  fireKey: number;
  emoji: string;
  title: string;
}

export function BadgeToast({ fireKey, emoji, title }: Props) {
  if (fireKey <= 0) return null;
  return (
    <div
      key={fireKey}
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 [animation:kidToast_3.4s_ease-in-out_forwards]"
    >
      <div className="flex items-center gap-3 rounded-2xl bg-card px-5 py-3 shadow-lift ring-2 ring-amber">
        <span className="text-3xl" aria-hidden>
          {emoji}
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-amber">
            New badge!
          </p>
          <p className="font-display text-lg font-bold text-primary-strong">{title}</p>
        </div>
      </div>
    </div>
  );
}
