"use client";

// The neon "cabinet screen" — a self-contained dark panel with glow + scanlines
// that hosts the arcade lobby and games. The .arcade-cabinet class defines the
// --arc-* palette (globals.css); nothing here leaks into the Midnight Club theme.

export function ArcadeShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="arcade-cabinet arcade-scanlines relative overflow-hidden rounded-3xl p-5 sm:p-7"
      style={{
        background:
          "radial-gradient(130% 80% at 50% -10%, rgba(34,227,255,0.10), transparent 55%), var(--arc-bg)",
        border: "1px solid var(--arc-edge)",
        boxShadow: "0 0 44px rgba(34,227,255,0.10), inset 0 0 60px rgba(0,0,0,0.5)",
        minHeight: "32rem",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
