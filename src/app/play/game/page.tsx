"use client";

// Play & Review — the game itself, a real route (/play/game) so Back returns to
// setup (/play) instead of leaving. Config comes from the query string (color,
// elo, adaptive, coach, optional fen). The playing/gameover/reviewing/done phases
// stay component state — Back must not rewind a move.

import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Orientation } from "@/content/types";
import { ChessGame, uciToMove, type SimpleMove } from "@/lib/chess/game";
import { getEngine } from "@/lib/chess/stockfish";
import { recordDailyActivity } from "@/lib/rewards/daily";
import { personaForElo } from "@/lib/play/opponents";
import { playRatingStore, type GameResult } from "@/lib/play/rating";
import { Board } from "@/components/board/Board";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClasses } from "@/components/ui/Button";
import { useToolBack } from "@/lib/nav/useToolBack";

const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const REVIEW_DEPTH = 10;
const COACH_DEPTH = 10;

interface RatingChange { before: number; after: number; delta: number }
interface CoachTip { severity: "blunder" | "mistake"; san: string; bestSan: string; bestUci: string; playedUci: string; fenBefore: string; fenAfter: string; loss: number }
interface Ply { fenBefore: string; fenAfter: string; uci: string; san: string; byLearner: boolean }
interface Flag { ply: number; moveLabel: string; san: string; bestSan: string; bestUci: string; playedUci: string; fenBefore: string; loss: number; klass: "blunder" | "mistake" | "inaccuracy" }

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

type Phase = "playing" | "gameover" | "reviewing" | "done";

export default function PlayGamePage() {
  return (
    <Suspense fallback={<main className="space-y-5" />}>
      <PlayGameView />
    </Suspense>
  );
}

function PlayGameView() {
  const params = useSearchParams();
  const back = useToolBack("/play");

  const startFen = useMemo(() => {
    const f = params.get("fen");
    if (f) { try { new ChessGame(f); return f; } catch { /* ignore */ } }
    return START;
  }, [params]);
  const color: Orientation = params.get("color") === "black" ? "black" : "white";
  const gameElo = useMemo(() => {
    const e = Number(params.get("elo"));
    return Number.isFinite(e) && e > 0 ? e : 1100;
  }, [params]);
  const gameAdaptive = params.get("adaptive") !== "0";

  const [phase, setPhase] = useState<Phase>("playing");
  const [ratingChange, setRatingChange] = useState<RatingChange | null>(null);
  const [fen, setFen] = useState(startFen);
  const [history, setHistory] = useState<Ply[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");
  const [coach, setCoach] = useState(params.get("coach") !== "0");
  const [coaching, setCoaching] = useState<CoachTip | null>(null);
  const [checking, setChecking] = useState(false);
  const [praise, setPraise] = useState("");
  const [usedTakeback, setUsedTakeback] = useState(false);
  const [progress, setProgress] = useState({ n: 0, total: 0 });
  const [flags, setFlags] = useState<Flag[]>([]);
  const [accuracy, setAccuracy] = useState(0);
  const [selected, setSelected] = useState<Flag | null>(null);
  const [plainView, setPlainView] = useState<string | null>(null);

  const learnerTurn = color === "white" ? "w" : "b";

  async function engineReply(curFen: string, hist: Ply[], elo: number) {
    setBusy(true);
    const best = await getEngine().getMoveAtElo(curFen, elo, 500);
    if (!best) { setBusy(false); return; }
    const res = applyMove(curFen, uciToMove(best));
    if (!res.ok) { setBusy(false); return; }
    const nextHist = [...hist, { fenBefore: curFen, fenAfter: res.fen, uci: best, san: res.san ?? best, byLearner: false }];
    setHistory(nextHist);
    setFen(res.fen);
    setBusy(false);
    if (res.status === "checkmate") finish("Checkmate — the engine won. Review your game to see where it slipped.", "loss");
    else if (res.status === "stalemate" || res.status === "draw") finish("Draw.", "draw");
  }

  async function coachCheck(fenBefore: string, res: { fen: string; uci?: string; san?: string }, hist: Ply[], plyIndex: number) {
    setChecking(true);
    setBusy(true);
    const engine = getEngine();
    const before = await engine.analyze(fenBefore, COACH_DEPTH);
    const bestCp = toCp(before);
    const bestUci = before.bestMove ?? "";
    const playedUci = res.uci ?? "";
    let loss = 0;
    if (bestUci && bestUci !== playedUci) {
      const after = await engine.analyze(res.fen, COACH_DEPTH);
      loss = bestCp - -toCp(after);
    }
    setChecking(false);
    const severity: CoachTip["severity"] | null =
      loss >= 300 ? "blunder" : plyIndex >= 8 && loss >= 150 ? "mistake" : null;
    if (severity) {
      const bestSan = bestUci ? new ChessGame(fenBefore).tryMove(uciToMove(bestUci)).san ?? bestUci : "?";
      setPraise("");
      setCoaching({ severity, san: res.san ?? "", bestSan, bestUci, playedUci, fenBefore, fenAfter: res.fen, loss });
      setBusy(false);
      return;
    }
    setPraise(loss <= 20 ? "Best move ✓" : loss <= 70 ? "Good move ✓" : "");
    await engineReply(res.fen, hist, gameElo);
  }

  function takeBack() {
    if (!coaching) return;
    setHistory((h) => h.slice(0, -1));
    setFen(coaching.fenBefore);
    setUsedTakeback(true);
    setCoaching(null);
    setPraise("");
  }

  async function playOn() {
    if (!coaching) return;
    const fenAfter = coaching.fenAfter;
    setCoaching(null);
    await engineReply(fenAfter, history, gameElo);
  }

  function finish(msg: string, outcome?: GameResult) {
    setResult(msg);
    setCoaching(null);
    setPraise("");
    if (gameAdaptive && outcome && !usedTakeback) setRatingChange(playRatingStore.record(gameElo, outcome));
    else setRatingChange(null);
    setPhase("gameover");
    recordDailyActivity();
  }

  function handleMove(from: string, to: string): boolean {
    if (phase !== "playing" || busy || coaching) return false;
    if (new ChessGame(fen).turn !== learnerTurn) return false;
    const res = applyMove(fen, { from, to });
    if (!res.ok) return false;
    const plyIndex = history.length;
    const nextHist = [...history, { fenBefore: fen, fenAfter: res.fen, uci: res.uci ?? `${from}${to}`, san: res.san ?? "", byLearner: true }];
    setHistory(nextHist);
    setFen(res.fen);
    setPraise("");
    if (res.status === "checkmate") { finish("Checkmate — you won! Review to see your best moments and any slips.", "win"); return true; }
    if (res.status === "stalemate" || res.status === "draw") { finish("Draw.", "draw"); return true; }
    if (coach) void coachCheck(fen, res, nextHist, plyIndex);
    else void engineReply(res.fen, nextHist, gameElo);
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
      if (i < 8) { good++; done++; setProgress({ n: done, total: learnerPlies.length }); continue; }
      const before = await engine.analyze(p.fenBefore, REVIEW_DEPTH);
      const after = await engine.analyze(p.fenAfter, REVIEW_DEPTH);
      const bestCp = toCp(before);
      const playedCp = -toCp(after);
      const loss = bestCp - playedCp;
      const bestUci = before.bestMove ?? "";
      const bestSan = bestUci ? new ChessGame(p.fenBefore).tryMove(uciToMove(bestUci)).san ?? bestUci : "?";
      let klass: Flag["klass"] | null = null;
      if (loss >= 300) klass = "blunder";
      else if (loss >= 150) klass = "mistake";
      else if (loss >= 70) klass = "inaccuracy";
      if (klass) found.push({ ply: i, moveLabel: moveLabel(i), san: p.san, bestSan, bestUci, playedUci: p.uci, fenBefore: p.fenBefore, loss, klass });
      else good++;
      done++;
      setProgress({ n: done, total: learnerPlies.length });
    }
    found.sort((a, b) => b.loss - a.loss);
    setFlags(found.slice(0, 8));
    setAccuracy(learnerPlies.length ? Math.round((good / learnerPlies.length) * 100) : 100);
    setSelected(found[0] ?? null);
    setPhase("done");
  }

  // Auto-start: if it's the opponent's move in the starting position, let it open.
  // Deferred to a task so the engine call (and its state updates) runs outside the
  // effect body — same async kick-off the old "Start" button did.
  const opened = useRef(false);
  useEffect(() => {
    if (opened.current) return;
    opened.current = true;
    if (new ChessGame(startFen).turn === learnerTurn) return;
    const t = setTimeout(() => void engineReply(startFen, [], gameElo), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Render ----
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
          right={<button type="button" onClick={back} className="text-sm font-medium text-ink-soft transition hover:text-ink">New game</button>}
        />
        <Card className="flex items-center justify-between p-4">
          <span className="font-display text-lg font-semibold text-primary-strong">Accuracy</span>
          <Chip tone={accuracy >= 80 ? "sage" : accuracy >= 60 ? "amber" : "clay"}>{accuracy}%</Chip>
        </Card>

        <Card className="space-y-3 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Practice your weak spots</p>
          <p className="text-sm text-ink-soft">
            {flags.length
              ? "Most slips at this level are tactical. Sharpen your pattern recognition so you spot these in time — then drill the endgames where games are won and lost."
              : "Clean game! Keep the edge with a few reps — tactics for sharpness, endgames for technique."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tactics" className={buttonClasses("primary", "md")}>Train tactics</Link>
            <Link href="/endgames" className={buttonClasses("secondary", "md")}>Drill endgames</Link>
          </div>
        </Card>

        {boardFen ? (
          <Board
            fen={boardFen}
            orientation={color}
            interactive={false}
            arrows={flag ? [
              { from: flag.playedUci.slice(0, 2), to: flag.playedUci.slice(2, 4), color: "#ef4444" },
              { from: flag.bestUci.slice(0, 2), to: flag.bestUci.slice(2, 4), color: "#22c55e" },
            ] : []}
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
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Key moments</p>
            {flags.map((f) => (
              <button key={f.ply} type="button" onClick={() => { setSelected(f); setPlainView(null); }} className="block w-full text-left">
                <Card interactive className={`flex items-center gap-3 p-3 ${selected?.ply === f.ply ? "ring-2 ring-primary" : ""}`}>
                  <span className="font-mono text-sm text-ink-soft">{f.moveLabel}</span>
                  <span className="min-w-0 flex-1">
                    <span className="font-semibold text-primary-strong">{f.san}</span>
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

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Move list</p>
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
                    onClick={() => { if (f) { setSelected(f); setPlainView(null); } else { setSelected(null); setPlainView(p.fenAfter); } }}
                    className={`rounded px-2 py-1 ${active ? "bg-primary text-on-accent" : "text-ink hover:bg-line"} ${f ? "font-semibold" : ""}`}
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
  const lastPly = history.length ? history[history.length - 1] : null;
  return (
    <main className="space-y-5">
      <PageHeader
        eyebrow={phase === "gameover" ? "Game over" : "Playing"}
        title="Play & Review"
        right={<button type="button" onClick={back} className="text-sm font-medium text-ink-soft transition hover:text-ink">New game</button>}
      />
      <div className="flex items-center gap-2 text-sm text-ink-soft">
        <Chip tone={gameAdaptive ? "sage" : "neutral"}>{gameAdaptive ? "Adaptive · " : ""}{gameElo < 1320 ? "~" : ""}{gameElo}</Chip>
        <span>vs {personaForElo(gameElo)}</span>
        {usedTakeback && <Chip tone="amber">Practice</Chip>}
        {phase === "playing" && (
          <button type="button" onClick={() => setCoach((c) => !c)} className="ml-auto rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft transition hover:border-primary/40">
            Coach {coach ? "on" : "off"}
          </button>
        )}
      </div>
      <Board
        fen={fen}
        orientation={color}
        interactive={phase === "playing" && !busy && !coaching}
        onDrop={phase === "playing" && !busy && !coaching ? handleMove : undefined}
        getLegalMoves={
          phase === "playing" && !busy && !coaching && new ChessGame(fen).turn === learnerTurn
            ? (sq) => new ChessGame(fen).legalDestinations(sq)
            : undefined
        }
        onMove={phase === "playing" && !busy && !coaching ? (f, t) => void handleMove(f, t) : undefined}
        lastMove={lastPly && !coaching ? { from: lastPly.uci.slice(0, 2), to: lastPly.uci.slice(2, 4), mine: lastPly.byLearner } : undefined}
        arrows={coaching ? [
          { from: coaching.playedUci.slice(0, 2), to: coaching.playedUci.slice(2, 4), color: "#ef4444" },
          { from: coaching.bestUci.slice(0, 2), to: coaching.bestUci.slice(2, 4), color: "#22c55e" },
        ] : undefined}
      />

      {coaching ? (
        <Card className="space-y-3 border-2 border-accent/40 p-4">
          <div className="flex items-center gap-2">
            <Chip tone={coaching.severity === "blunder" ? "clay" : "amber"}>{coaching.severity === "blunder" ? "Blunder" : "Mistake"}</Chip>
            <span className="font-mono text-ink">{coaching.san}</span>
          </div>
          <p className="text-sm text-ink-soft">
            {coaching.severity === "blunder" ? "That drops material or misses a big chance. " : "That gives up some of your advantage. "}
            A stronger move was <span className="font-semibold text-sage">{coaching.bestSan}</span>.
            <span className="text-clay"> (red = your move, green = better)</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={takeBack} className={buttonClasses("primary", "md")}>Take it back</button>
            <button type="button" onClick={() => void playOn()} className={buttonClasses("secondary", "md")}>Play on</button>
          </div>
        </Card>
      ) : (
        <div className="flex min-h-[3.75rem] items-center rounded-2xl bg-surface p-4 text-sm text-ink-soft shadow-soft">
          {phase === "gameover" ? result : checking ? "Coach is checking your move…" : busy ? (praise ? `${praise} — opponent is thinking…` : "Engine is thinking…") : `Your move (${color}). Drag or tap a piece.`}
        </div>
      )}

      {phase === "gameover" && ratingChange && (
        <Card className="flex items-center justify-between p-4">
          <span className="font-display text-base font-semibold text-primary-strong">Your rating</span>
          <span className="flex items-center gap-2 text-sm">
            <span className="text-ink-soft">{ratingChange.before}</span>
            <span aria-hidden>→</span>
            <span className="font-bold text-primary-strong">{ratingChange.after}</span>
            <Chip tone={ratingChange.delta >= 0 ? "sage" : "clay"}>{ratingChange.delta >= 0 ? "+" : ""}{ratingChange.delta}</Chip>
          </span>
        </Card>
      )}

      {phase === "gameover" && gameAdaptive && !ratingChange && usedTakeback && (
        <Card className="p-4 text-sm text-ink-soft">Practice game — you used a take-back, so your rating is unchanged.</Card>
      )}

      <div className="flex flex-wrap gap-3">
        {phase === "playing" && (
          <button type="button" onClick={() => finish("You ended the game. Let's review it.")} className={buttonClasses("secondary", "md")}>End game &amp; review</button>
        )}
        {phase === "gameover" && (
          <>
            <button type="button" onClick={runReview} className={buttonClasses("primary", "lg")}>Review my game</button>
            <button type="button" onClick={back} className={buttonClasses("secondary", "lg")}>New game</button>
          </>
        )}
      </div>
    </main>
  );
}
