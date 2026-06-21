"use client";

// Play & Review — play a full game against the engine at an adjustable strength,
// then get a post-game review that flags your biggest mistakes (eval swings) and
// shows the better move. Reuses the board + ChessGame + the engine client (now
// with analyze()). A no-params static route.

import { useState } from "react";
import type { Orientation } from "@/content/types";
import { ChessGame, uciToMove, type SimpleMove } from "@/lib/chess/game";
import { getEngine } from "@/lib/chess/stockfish";
import { recordDailyActivity } from "@/lib/rewards/daily";
import { Board } from "@/components/board/Board";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClasses } from "@/components/ui/Button";

const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const STRENGTHS = [
  { label: "Easy", skill: 3 },
  { label: "Medium", skill: 9 },
  { label: "Hard", skill: 16 },
];
const REVIEW_DEPTH = 10;

interface Ply {
  fenBefore: string;
  fenAfter: string;
  uci: string;
  san: string;
  byLearner: boolean;
}
interface Flag {
  ply: number;
  moveLabel: string;
  san: string;
  bestSan: string;
  bestUci: string;
  playedUci: string;
  fenBefore: string;
  loss: number;
  klass: "blunder" | "mistake" | "inaccuracy";
}

function toCp(r: { cp: number | null; mate: number | null }): number {
  if (r.mate != null) return r.mate > 0 ? 100000 - r.mate : -100000 - r.mate;
  return r.cp ?? 0;
}
function applyMove(fen: string, m: SimpleMove) {
  const d = new ChessGame(fen).tryMove(m);
  return d.ok ? d : new ChessGame(fen).tryMove({ ...m, promotion: "q" });
}
function moveLabel(plyIndex: number): string {
  const full = Math.floor(plyIndex / 2) + 1;
  return plyIndex % 2 === 0 ? `${full}.` : `${full}...`;
}

type Phase = "setup" | "playing" | "gameover" | "reviewing" | "done";

export default function PlayPage() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [color, setColor] = useState<Orientation>("white");
  const [skill, setSkill] = useState(9);
  const [fen, setFen] = useState(START);
  const [history, setHistory] = useState<Ply[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");
  const [progress, setProgress] = useState({ n: 0, total: 0 });
  const [flags, setFlags] = useState<Flag[]>([]);
  const [accuracy, setAccuracy] = useState(0);
  const [selected, setSelected] = useState<Flag | null>(null);
  const [plainView, setPlainView] = useState<string | null>(null);

  const learnerTurn = color === "white" ? "w" : "b";

  async function engineReply(curFen: string, hist: Ply[]) {
    setBusy(true);
    const best = await getEngine().getBestMove(curFen, skill, 500);
    if (!best) {
      setBusy(false);
      return;
    }
    const res = applyMove(curFen, uciToMove(best));
    if (!res.ok) {
      setBusy(false);
      return;
    }
    const nextHist = [
      ...hist,
      { fenBefore: curFen, fenAfter: res.fen, uci: best, san: res.san ?? best, byLearner: false },
    ];
    setHistory(nextHist);
    setFen(res.fen);
    setBusy(false);
    if (res.status === "checkmate") finish("Checkmate — the engine won. Review your game to see where it slipped.");
    else if (res.status === "stalemate" || res.status === "draw") finish("Draw.");
  }

  function finish(msg: string) {
    setResult(msg);
    setPhase("gameover");
    recordDailyActivity();
  }

  function start(c: Orientation, s: number) {
    setColor(c);
    setSkill(s);
    setFen(START);
    setHistory([]);
    setResult("");
    setFlags([]);
    setSelected(null);
    setPhase("playing");
    if (c === "black") void engineReply(START, []);
  }

  function handleMove(from: string, to: string): boolean {
    if (phase !== "playing" || busy) return false;
    if (new ChessGame(fen).turn !== learnerTurn) return false;
    const res = applyMove(fen, { from, to });
    if (!res.ok) return false;
    const nextHist = [
      ...history,
      { fenBefore: fen, fenAfter: res.fen, uci: res.uci ?? `${from}${to}`, san: res.san ?? "", byLearner: true },
    ];
    setHistory(nextHist);
    setFen(res.fen);
    if (res.status === "checkmate") {
      finish("Checkmate — you won! Review to see your best moments and any slips.");
      return true;
    }
    if (res.status === "stalemate" || res.status === "draw") {
      finish("Draw.");
      return true;
    }
    void engineReply(res.fen, nextHist);
    return true;
  }

  async function runReview() {
    setPhase("reviewing");
    const learnerPlies = history.filter((p) => p.byLearner);
    setProgress({ n: 0, total: learnerPlies.length });
    const engine = getEngine();
    const found: Flag[] = [];
    let good = 0;
    let done = 0;
    for (let i = 0; i < history.length; i++) {
      const p = history[i];
      if (!p.byLearner) continue;
      // Don't flag opening-book moves (first ~4 of each side) — eval noise.
      if (i < 8) {
        good++;
        done++;
        setProgress({ n: done, total: learnerPlies.length });
        continue;
      }
      const before = await engine.analyze(p.fenBefore, REVIEW_DEPTH);
      const after = await engine.analyze(p.fenAfter, REVIEW_DEPTH);
      const bestCp = toCp(before); // learner to move at fenBefore
      const playedCp = -toCp(after); // opponent to move at fenAfter → flip
      const loss = bestCp - playedCp;
      const bestUci = before.bestMove ?? "";
      const bestSan = bestUci
        ? new ChessGame(p.fenBefore).tryMove(uciToMove(bestUci)).san ?? bestUci
        : "?";
      let klass: Flag["klass"] | null = null;
      if (loss >= 300) klass = "blunder";
      else if (loss >= 150) klass = "mistake";
      else if (loss >= 70) klass = "inaccuracy";
      if (klass) {
        found.push({
          ply: i,
          moveLabel: moveLabel(i),
          san: p.san,
          bestSan,
          bestUci,
          playedUci: p.uci,
          fenBefore: p.fenBefore,
          loss,
          klass,
        });
      } else {
        good++;
      }
      done++;
      setProgress({ n: done, total: learnerPlies.length });
    }
    found.sort((a, b) => b.loss - a.loss);
    setFlags(found.slice(0, 8));
    setAccuracy(
      learnerPlies.length ? Math.round((good / learnerPlies.length) * 100) : 100,
    );
    setSelected(found[0] ?? null);
    setPhase("done");
  }

  // ---- Render ----
  if (phase === "setup") {
    return (
      <main className="space-y-6">
        <PageHeader
          backHref="/"
          backLabel="Home"
          eyebrow="Play"
          title="Play & Review"
          subtitle="Play a full game against the engine, then get a review that flags your biggest mistakes and shows the better move."
        />
        <Card className="space-y-4 p-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brass">Your color</p>
            <div className="flex gap-2">
              {(["white", "black"] as Orientation[]).map((c) => (
                <Pick key={c} active={color === c} onClick={() => setColor(c)}>
                  {c === "white" ? "White" : "Black"}
                </Pick>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brass">Engine strength</p>
            <div className="flex gap-2">
              {STRENGTHS.map((s) => (
                <Pick key={s.skill} active={skill === s.skill} onClick={() => setSkill(s.skill)}>
                  {s.label}
                </Pick>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => start(color, skill)} className={buttonClasses("primary", "lg")}>
            Start game
          </button>
        </Card>
      </main>
    );
  }

  if (phase === "reviewing") {
    return (
      <main className="space-y-5">
        <PageHeader eyebrow="Review" title="Analyzing your game…" />
        <Card className="space-y-3 p-6 text-center">
          <p className="text-ink-soft">Checking each of your moves with the engine.</p>
          <ProgressBar pct={progress.total ? (progress.n / progress.total) * 100 : 0} />
          <p className="text-sm text-ink-soft">{progress.n} / {progress.total}</p>
        </Card>
      </main>
    );
  }

  if (phase === "done") {
    const flag = selected;
    const boardFen = flag ? flag.fenBefore : plainView;
    const flagByPly = (i: number) => flags.find((f) => f.ply === i);
    return (
      <main className="space-y-5">
        <PageHeader
          eyebrow="Review"
          title="Game review"
          right={
            <button type="button" onClick={() => setPhase("setup")} className="text-sm font-medium text-ink-soft transition hover:text-ink">
              New game
            </button>
          }
        />
        <Card className="flex items-center justify-between p-4">
          <span className="font-display text-lg font-semibold text-walnut-deep">Accuracy</span>
          <Chip tone={accuracy >= 80 ? "sage" : accuracy >= 60 ? "amber" : "clay"}>{accuracy}%</Chip>
        </Card>

        {boardFen ? (
          <Board
            fen={boardFen}
            orientation={color}
            interactive={false}
            arrows={
              flag
                ? [
                    { from: flag.playedUci.slice(0, 2), to: flag.playedUci.slice(2, 4), color: "#b0604a" },
                    { from: flag.bestUci.slice(0, 2), to: flag.bestUci.slice(2, 4), color: "#5e7e58" },
                  ]
                : []
            }
          />
        ) : (
          <Card className="p-6 text-center text-ink-soft">
            {flags.length ? "Tap a move below to review the position." : "No big mistakes flagged — clean game! 🎉"}
          </Card>
        )}

        {flag && (
          <div className="rounded-2xl bg-surface p-3 text-sm shadow-soft">
            <span className="font-mono text-ink">{flag.moveLabel} {flag.san}</span>
            <span className="text-ink-soft"> — better was </span>
            <span className="font-semibold text-sage">{flag.bestSan}</span>
            <span className="text-clay"> (red = your move, green = engine&apos;s best)</span>
          </div>
        )}

        {flags.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brass">Key moments</p>
            {flags.map((f) => (
              <button key={f.ply} type="button" onClick={() => { setSelected(f); setPlainView(null); }} className="block w-full text-left">
                <Card interactive className={`flex items-center gap-3 p-3 ${selected?.ply === f.ply ? "ring-2 ring-walnut" : ""}`}>
                  <span className="font-mono text-sm text-ink-soft">{f.moveLabel}</span>
                  <span className="min-w-0 flex-1">
                    <span className="font-semibold text-walnut-deep">{f.san}</span>
                    <span className="text-ink-soft"> → better: {f.bestSan}</span>
                  </span>
                  <Chip tone={f.klass === "blunder" ? "clay" : f.klass === "mistake" ? "amber" : "neutral"}>
                    {f.klass === "blunder" ? "??" : f.klass === "mistake" ? "?" : "?!"}
                  </Chip>
                </Card>
              </button>
            ))}
          </div>
        )}

        {/* Full move list — click any move to step through the game */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brass">Move list</p>
          <Card className="flex flex-wrap items-center gap-x-2 gap-y-1 p-4 font-mono text-sm">
            {history.map((p, i) => {
              const f = flagByPly(i);
              const active = (flag && flag.ply === i) || (!flag && plainView === p.fenAfter);
              const mark = f ? (f.klass === "blunder" ? "??" : f.klass === "mistake" ? "?" : "?!") : "";
              return (
                <span key={i} className="inline-flex items-center">
                  {i % 2 === 0 && <span className="mr-1 text-ink-soft/60">{Math.floor(i / 2) + 1}.</span>}
                  <button
                    type="button"
                    onClick={() => {
                      if (f) { setSelected(f); setPlainView(null); }
                      else { setSelected(null); setPlainView(p.fenAfter); }
                    }}
                    className={`rounded px-1 ${active ? "bg-walnut text-[#fffdf7]" : "text-ink hover:bg-line"} ${f ? "font-semibold" : ""}`}
                  >
                    {p.san}{mark}
                  </button>
                </span>
              );
            })}
          </Card>
        </div>
      </main>
    );
  }

  // playing / gameover
  return (
    <main className="space-y-5">
      <PageHeader
        eyebrow={phase === "gameover" ? "Game over" : "Playing"}
        title="Play & Review"
        right={
          <button type="button" onClick={() => setPhase("setup")} className="text-sm font-medium text-ink-soft transition hover:text-ink">
            New game
          </button>
        }
      />
      <Board
        fen={fen}
        orientation={color}
        interactive={phase === "playing" && !busy}
        onDrop={phase === "playing" && !busy ? handleMove : undefined}
        getLegalMoves={
          phase === "playing" && !busy && new ChessGame(fen).turn === learnerTurn
            ? (sq) => new ChessGame(fen).legalDestinations(sq)
            : undefined
        }
        onMove={phase === "playing" && !busy ? (f, t) => void handleMove(f, t) : undefined}
      />

      <div className="rounded-2xl bg-surface p-4 text-sm text-ink-soft shadow-soft">
        {phase === "gameover"
          ? result
          : busy
            ? "Engine is thinking…"
            : `Your move (${color}). Drag or tap a piece.`}
      </div>

      <div className="flex flex-wrap gap-3">
        {phase === "playing" && (
          <button type="button" onClick={() => finish("You ended the game. Let's review it.")} className={buttonClasses("secondary", "md")}>
            End game &amp; review
          </button>
        )}
        {phase === "gameover" && (
          <>
            <button type="button" onClick={runReview} className={buttonClasses("primary", "lg")}>
              Review my game
            </button>
            <button type="button" onClick={() => setPhase("setup")} className={buttonClasses("secondary", "lg")}>
              New game
            </button>
          </>
        )}
      </div>
    </main>
  );
}

function Pick({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        active ? "border-walnut bg-walnut text-[#fffdf7]" : "border-line bg-card text-ink-soft hover:border-walnut/40"
      }`}
    >
      {children}
    </button>
  );
}
