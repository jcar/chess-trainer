"use client";

// The neon arcade board — a custom CSS grid (not react-chessboard) for full
// control of glow, threat lanes, the crown, and oscillating "movers". Renders the
// current enemy positions (solid) plus faint GHOSTS where movers are about to slide
// (the threat/markers are judged against that next config, so it's fully telegraphed).

import { GLYPH, key, samePos, type Placed, type Pos } from "@/lib/arcade/gauntlet";

interface Props {
  size: number;
  player: Pos;
  playerGlyph: string;
  crown: Pos;
  enemies: Placed[]; // solid, where guards are now
  ghosts: Placed[]; // faint, where movers are heading next
  threat: Set<string>;
  safe: Set<string>; // reachable + survives the shift (cyan dot)
  danger: Set<string>; // reachable but will be hit (red ring)
  onTap: (pos: Pos) => void;
  disabled?: boolean;
}

export function ArcadeBoard({ size, player, playerGlyph, crown, enemies, ghosts, threat, safe, danger, onTap, disabled }: Props) {
  const cells: React.ReactNode[] = [];
  for (let y = size - 1; y >= 0; y--) {
    for (let x = 0; x < size; x++) {
      const k = key({ x, y });
      const dark = (x + y) % 2 === 0;
      const isPlayer = samePos(player, { x, y });
      const enemy = enemies.find((e) => e.pos.x === x && e.pos.y === y);
      const ghost = !enemy && ghosts.find((g) => g.pos.x === x && g.pos.y === y);
      const isCrown = samePos(crown, { x, y });
      const threatened = threat.has(k);
      const reachSafe = safe.has(k);
      const reachDanger = danger.has(k);
      const tappable = !disabled && (reachSafe || reachDanger);

      cells.push(
        <button
          key={k}
          type="button"
          disabled={!tappable}
          onClick={() => tappable && onTap({ x, y })}
          aria-label={`${String.fromCharCode(97 + x)}${y + 1}`}
          data-cell={k}
          data-reach={reachSafe ? "safe" : reachDanger ? "danger" : undefined}
          data-crown={isCrown ? "1" : undefined}
          data-enemy={enemy ? "1" : undefined}
          data-player={isPlayer ? "1" : undefined}
          className="relative flex items-center justify-center"
          style={{
            aspectRatio: "1 / 1",
            background: dark ? "#0a1224" : "#0f1a34",
            boxShadow: threatened
              ? "inset 0 0 14px rgba(255,69,181,0.55), inset 0 0 0 1px rgba(255,69,181,0.5)"
              : "inset 0 0 0 1px rgba(34,227,255,0.05)",
            cursor: tappable ? "pointer" : "default",
            fontSize: "clamp(1rem, 6.5vw, 2rem)",
            lineHeight: 1,
          }}
        >
          {threatened && !isPlayer && !enemy && !isCrown && (
            <span aria-hidden className="absolute inset-0" style={{ background: "rgba(255,69,181,0.06)" }} />
          )}
          {isCrown && !isPlayer && (
            <span aria-hidden style={{ filter: "drop-shadow(0 0 8px var(--arc-amber))" }}>👑</span>
          )}
          {/* faint preview of a mover's next square */}
          {ghost && !isCrown && !isPlayer && (
            <span aria-hidden style={{ color: "#ff6bc1", opacity: 0.3 }}>{GLYPH[ghost.piece]}</span>
          )}
          {enemy && (
            <span aria-hidden style={{ color: "#ff6bc1", textShadow: "0 0 8px rgba(255,69,181,0.8)", opacity: 0.92 }}>
              {GLYPH[enemy.piece]}
            </span>
          )}
          {isPlayer && (
            <span aria-hidden style={{ color: "#bdf3ff", textShadow: "0 0 10px var(--arc-cyan), 0 0 22px var(--arc-cyan)" }}>
              {playerGlyph}
            </span>
          )}
          {reachSafe && !isCrown && (
            <span aria-hidden className="absolute" style={{ width: "26%", height: "26%", borderRadius: "9999px", background: "var(--arc-cyan)", boxShadow: "0 0 8px var(--arc-cyan)", opacity: 0.85 }} />
          )}
          {reachDanger && (
            <span aria-hidden className="absolute" style={{ width: "62%", height: "62%", borderRadius: "9999px", border: "2px solid #ff4d6d", boxShadow: "0 0 9px rgba(255,77,109,0.8)" }} />
          )}
        </button>,
      );
    }
  }

  return (
    <div className="arcade-scanlines relative mx-auto select-none" style={{ width: "min(92vw, 30rem)" }}>
      <div
        className="grid overflow-hidden rounded-xl"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          border: "2px solid var(--arc-edge)",
          boxShadow: "0 0 34px rgba(34,227,255,0.16), inset 0 0 30px rgba(0,0,0,0.6)",
        }}
      >
        {cells}
      </div>
    </div>
  );
}
