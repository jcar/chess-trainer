"use client";

// Knight's Gauntlet — pilot a piece to the crown, dodging enemy threat lanes.
// Escalating seeded levels, 3 lives, local high scores. Daily Run (shared seed)
// or Free Play (random). All state lives here; no effects set state.

import { useMemo, useState } from "react";
import {
  generateLevel,
  threatSquares,
  reachable,
  key,
  samePos,
  GLYPH,
  PIECE_NAME,
  type Pos,
} from "@/lib/arcade/gauntlet";
import { dailySeed, randomSeed, dailyLabel } from "@/lib/arcade/rng";
import { arcadeScoreStore, useArcadeScores } from "@/lib/arcade/scores";
import { playSound, unlockAudio } from "@/lib/audio/sounds";
import { Confetti } from "@/components/kids/Confetti";
import { ArcadeBoard } from "@/components/arcade/ArcadeBoard";
import { ArcadeHud } from "@/components/arcade/ArcadeHud";

const MAX_LIVES = 3;
const clearBonus = (level: number) => 100 + (level - 1) * 25;

type Phase = "intro" | "playing" | "over";

export function GauntletGame({ onExit }: { onExit: () => void }) {
  const scores = useArcadeScores();
  const [phase, setPhase] = useState<Phase>("intro");
  const [seed, setSeed] = useState(1);
  const [daily, setDaily] = useState(true);
  const [levelNum, setLevelNum] = useState(1);
  const [player, setPlayer] = useState<Pos>({ x: 0, y: 0 });
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const [confettiKey, setConfettiKey] = useState(0);

  const level = useMemo(() => generateLevel(seed, levelNum), [seed, levelNum]);
  const occupied = useMemo(() => new Set(level.enemies.map((e) => key(e.pos))), [level]);
  const threat = useMemo(() => threatSquares(level), [level]);
  const { safe, danger } = useMemo(() => {
    const s = new Set<string>();
    const d = new Set<string>();
    for (const m of reachable(level.piece, player, occupied)) {
      const k = key(m);
      (threat.has(k) ? d : s).add(k);
    }
    return { safe: s, danger: d };
  }, [level, player, occupied, threat]);

  function startRun(isDaily: boolean) {
    unlockAudio();
    const s = isDaily ? dailySeed() : randomSeed();
    const lvl = generateLevel(s, 1);
    setSeed(s);
    setDaily(isDaily);
    setLevelNum(1);
    setPlayer(lvl.start);
    setLives(MAX_LIVES);
    setScore(0);
    setPhase("playing");
    playSound("levelup");
  }

  function handleTap(pos: Pos) {
    unlockAudio();
    const k = key(pos);
    if (!safe.has(k) && !danger.has(k)) return;

    if (danger.has(k)) {
      // Zapped — lose a life, reset to the level start (or end the run).
      playSound("zap");
      setShakeKey((n) => n + 1);
      const next = lives - 1;
      if (next <= 0) {
        setLives(0);
        setPhase("over");
        playSound("gameover");
        arcadeScoreStore.record(score, levelNum, daily);
      } else {
        setLives(next);
        setPlayer(level.start);
      }
      return;
    }

    if (samePos(pos, level.crown)) {
      // Level cleared!
      const gained = clearBonus(levelNum);
      const nextNum = levelNum + 1;
      const nextLevel = generateLevel(seed, nextNum);
      setScore((s) => s + gained);
      setLevelNum(nextNum);
      setPlayer(nextLevel.start);
      setConfettiKey((n) => n + 1);
      playSound("levelup");
      return;
    }

    // Ordinary safe step.
    setPlayer(pos);
    playSound("move");
  }

  const modeLabel = daily ? `Daily ${dailyLabel()}` : "Free Play";
  const best = daily ? scores.dailyBest : scores.bestScore;

  // ---- Intro ----
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-md text-center">
        <h2 className="font-display text-3xl font-extrabold tracking-tight" style={{ color: "var(--arc-cyan)", textShadow: "0 0 16px rgba(34,227,255,0.5)" }}>
          Knight&apos;s Gauntlet
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--arc-dim)" }}>
          Pilot your piece to the 👑, dodging the glowing enemy lanes. Tap a{" "}
          <span style={{ color: "var(--arc-cyan)" }}>cyan dot</span> to move safely; a{" "}
          <span style={{ color: "#ff6b8a" }}>red ring</span> means that square is under fire.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => startRun(true)}
            className="rounded-xl px-5 py-3 font-display text-lg font-bold transition active:scale-95"
            style={{ background: "var(--arc-cyan)", color: "#04121a", boxShadow: "0 0 22px rgba(34,227,255,0.4)" }}
          >
            ▶ Daily Run — {dailyLabel()}
          </button>
          <button
            type="button"
            onClick={() => startRun(false)}
            className="rounded-xl px-5 py-3 font-display text-lg font-bold transition active:scale-95"
            style={{ border: "2px solid var(--arc-magenta)", color: "var(--arc-magenta)" }}
          >
            🎲 Free Play
          </button>
        </div>
        <p className="mt-5 font-mono text-xs" style={{ color: "var(--arc-dim)" }}>
          Best {scores.bestScore.toLocaleString()} · reached Level {scores.bestLevel}
        </p>
        <button type="button" onClick={onExit} className="mt-6 font-mono text-xs underline" style={{ color: "var(--arc-dim)" }}>
          ← Back to arcade
        </button>
      </div>
    );
  }

  // ---- Game over ----
  if (phase === "over") {
    const newBest = score > 0 && score >= scores.bestScore;
    return (
      <div className="arcade-win mx-auto max-w-md text-center">
        <h2 className="font-display text-3xl font-extrabold tracking-tight" style={{ color: "var(--arc-magenta)", textShadow: "0 0 16px rgba(255,69,181,0.5)" }}>
          Game Over
        </h2>
        <p className="mt-3 font-mono text-5xl font-bold tabular-nums" style={{ color: "var(--arc-cyan)", textShadow: "0 0 18px rgba(34,227,255,0.5)" }}>
          {score.toLocaleString()}
        </p>
        <p className="mt-1 font-mono text-sm" style={{ color: "var(--arc-dim)" }}>
          reached Level {levelNum}
          {newBest && <span style={{ color: "var(--arc-amber)" }}> · NEW BEST! ★</span>}
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => startRun(daily)}
            className="rounded-xl px-5 py-3 font-display text-lg font-bold transition active:scale-95"
            style={{ background: "var(--arc-cyan)", color: "#04121a", boxShadow: "0 0 22px rgba(34,227,255,0.4)" }}
          >
            ↻ Play Again
          </button>
          <button type="button" onClick={onExit} className="font-mono text-xs underline" style={{ color: "var(--arc-dim)" }}>
            ← Back to arcade
          </button>
        </div>
      </div>
    );
  }

  // ---- Playing ----
  return (
    <div className="mx-auto max-w-md space-y-4">
      <Confetti fireKey={confettiKey} />
      <ArcadeHud
        score={score}
        level={levelNum}
        lives={lives}
        maxLives={MAX_LIVES}
        pieceGlyph={GLYPH[level.piece]}
        pieceName={PIECE_NAME[level.piece]}
        modeLabel={modeLabel}
        best={best}
      />
      <div key={shakeKey} className={shakeKey > 0 ? "arcade-shake" : undefined}>
        <ArcadeBoard
          level={level}
          player={player}
          threat={threat}
          safe={safe}
          danger={danger}
          onTap={handleTap}
        />
      </div>
      <div className="flex items-center justify-between font-mono text-xs" style={{ color: "var(--arc-dim)" }}>
        <span>Reach the 👑 — you are the {PIECE_NAME[level.piece]}</span>
        <button type="button" onClick={onExit} className="underline">Quit</button>
      </div>
    </div>
  );
}
