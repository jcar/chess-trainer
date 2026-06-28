"use client";

// The chunky monospace arcade HUD: score, level, lives, your piece, and best.

interface Props {
  score: number;
  level: number;
  lives: number;
  maxLives: number;
  pieceGlyph: string;
  pieceName: string;
  modeLabel: string;
  best: number;
  moves: number;
  par: number;
  combo: number;
}

function Stat({ label, children, glow }: { label: string; children: React.ReactNode; glow?: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--arc-dim)" }}>
        {label}
      </span>
      <span className="font-mono text-lg font-bold tabular-nums" style={{ color: glow ?? "var(--arc-text)", textShadow: glow ? `0 0 10px ${glow}` : undefined }}>
        {children}
      </span>
    </div>
  );
}

export function ArcadeHud({ score, level, lives, maxLives, pieceGlyph, pieceName, modeLabel, best, moves, par, combo }: Props) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
      style={{ background: "var(--arc-panel)", border: "1px solid var(--arc-edge)" }}
    >
      <Stat label="Score" glow="var(--arc-cyan)">{score.toLocaleString()}</Stat>
      <Stat label="Level">{level}</Stat>
      <Stat label={`Moves`}>
        <span className="tabular-nums">{moves}</span>
        <span className="text-sm" style={{ color: "var(--arc-dim)" }}> /{par}</span>
      </Stat>
      {combo >= 1 && (
        <Stat label="Combo" glow="var(--arc-lime)">×{(1 + Math.min(combo, 8) * 0.25).toFixed(2).replace(/\.?0+$/, "")}</Stat>
      )}
      <Stat label="You">
        <span className="inline-flex items-center gap-1.5">
          <span style={{ color: "#bdf3ff", textShadow: "0 0 8px var(--arc-cyan)" }}>{pieceGlyph}</span>
          <span className="text-sm">{pieceName}</span>
        </span>
      </Stat>
      <Stat label="Lives" glow="var(--arc-magenta)">
        <span aria-label={`${lives} lives`}>
          {"♥".repeat(lives)}
          <span style={{ color: "var(--arc-edge)" }}>{"♥".repeat(Math.max(0, maxLives - lives))}</span>
        </span>
      </Stat>
      <div className="hidden text-right sm:block">
        <Stat label={modeLabel}>
          <span className="text-sm" style={{ color: "var(--arc-amber)" }}>Best {best.toLocaleString()}</span>
        </Stat>
      </div>
    </div>
  );
}
