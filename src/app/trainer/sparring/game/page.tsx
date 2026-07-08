"use client";

// Sparring — the game. A real route so Back returns to setup. You play a full
// game from a random opening against the bot; while theory lasts the bot plays
// real, varied book moves (blind to you) and the coach names the opening + the
// theory move; when the book runs out it says so, shows the middlegame plan, and
// hands off to the engine with lighter move-quality coaching. Config (color, elo,
// adaptive, mode) rides in the query string.

import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Orientation } from "@/content/types";
import type { Opening } from "@/content/openings/types";
import { ChessGame, uciToMove, sanToUci, type SimpleMove } from "@/lib/chess/game";
import { getEngine } from "@/lib/chess/stockfish";
import { recordDailyActivity } from "@/lib/rewards/daily";
import { personaForElo } from "@/lib/play/opponents";
import { playRatingStore, type GameResult } from "@/lib/play/rating";
import { toCp, coachSeverity, reviewClass, praiseFor } from "@/lib/play/moveQuality";
import {
  initBook,
  advanceBook,
  inBook,
  theoryMoves,
  pickBotSan,
  identify,
  slipLine,
  type BookState,
} from "@/lib/openings/book";
import { lineKey } from "@/lib/trainer/lines";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { Board } from "@/components/board/Board";
import { EvalBar } from "@/components/board/EvalBar";
import { OpeningSummary } from "@/components/trainer/OpeningSummary";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClasses } from "@/components/ui/Button";
import { useToolBack } from "@/lib/nav/useToolBack";

const COACH_DEPTH = 10;
const REVIEW_DEPTH = 10;

interface Ply { fenBefore: string; fenAfter: string; uci: string; san: string; byLearner: boolean }
interface CoachTip {
  kind: "blunder" | "mistake" | "offbook";
  san: string;
  bestSan: string;
  bestUci: string;
  playedUci: string;
  fenBefore: string;
  fenAfter: string;
  bookBefore: BookState;
  theoryText: string;
  loss: number;
}
interface Flag { ply: number; moveLabel: string; san: string; bestSan: string; bestUci: string; playedUci: string; fenBefore: string; loss: number; klass: "blunder" | "mistake" | "inaccuracy" }
interface RatingChange { before: number; after: number; delta: number }

function applyMove(fen: string, m: SimpleMove) {
  const d = new ChessGame(fen).tryMove(m);
  return d.ok ? d : new ChessGame(fen).tryMove({ ...m, promotion: "q" });
}
function bestSanAt(fen: string, uci: string): string {
  if (!uci) return "?";
  const r = new ChessGame(fen).tryMove(uciToMove(uci));
  return r.san ?? uci;
}
function moveLabel(plyIndex: number): string {
  const full = Math.floor(plyIndex / 2) + 1;
  return plyIndex % 2 === 0 ? `${full}.` : `${full}...`;
}
function theoryList(sans: string[]): string {
  if (sans.length === 0) return "";
  if (sans.length === 1) return sans[0];
  if (sans.length === 2) return `${sans[0]} or ${sans[1]}`;
  return `${sans.slice(0, 2).join(", ")}, …`;
}

type Phase = "playing" | "gameover" | "reviewing" | "done";

export default function SparringGamePage() {
  return (
    <Suspense fallback={<main className="space-y-5" />}>
      <SparringGame />
    </Suspense>
  );
}

function SparringGame() {
  const params = useSearchParams();
  const back = useToolBack("/trainer/sparring");
  const { recordLineResult } = useTrainer();

  const color: Orientation = params.get("color") === "black" ? "black" : "white";
  const gameElo = useMemo(() => {
    const e = Number(params.get("elo"));
    return Number.isFinite(e) && e > 0 ? e : 1500;
  }, [params]);
  const gameAdaptive = params.get("adaptive") === "1";
  const practice = params.get("mode") !== "game";

  const learnerTurn = color === "white" ? "w" : "b";

  const [phase, setPhase] = useState<Phase>("playing");
  const [fen, setFen] = useState(new ChessGame().fen);
  const [history, setHistory] = useState<Ply[]>([]);
  const [book, setBook] = useState<BookState>(() => initBook());
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(false);
  const [coaching, setCoaching] = useState<CoachTip | null>(null);
  const [verdict, setVerdict] = useState("");
  const [middlegame, setMiddlegame] = useState<{ opening: Opening | null } | null>(null);
  const [usedTakeback, setUsedTakeback] = useState(false);
  const [result, setResult] = useState("");
  const [ratingChange, setRatingChange] = useState<RatingChange | null>(null);
  // Review
  const [progress, setProgress] = useState({ n: 0, total: 0 });
  const [flags, setFlags] = useState<Flag[]>([]);
  const [accuracy, setAccuracy] = useState(0);
  const [selected, setSelected] = useState<Flag | null>(null);
  // The opening we've been identified as (for the middlegame plan + review recap).
  const [faced, setFaced] = useState<Opening | null>(null);

  const id = identify(book);
  const stillBook = inBook(book);

  function fireMiddlegame(opening: Opening | null | undefined) {
    if (middlegame) return;
    setMiddlegame({ opening: opening ?? faced });
  }

  function finish(msg: string, outcome?: GameResult) {
    setResult(msg);
    setCoaching(null);
    if (gameAdaptive && outcome && !usedTakeback) setRatingChange(playRatingStore.record(gameElo, outcome));
    setPhase("gameover");
    recordDailyActivity();
  }

  async function botReply(curFen: string, hist: Ply[], curBook: BookState) {
    setBusy(true);
    const theory = theoryMoves(curBook);
    let uci: string | null = null;
    if (theory.length > 0) {
      const san = pickBotSan(curBook);
      uci = san ? sanToUci(curFen, san) : null;
    }
    if (!uci) uci = await getEngine().getMoveAtElo(curFen, gameElo, 500);
    if (!uci) { setBusy(false); return; }
    const res = applyMove(curFen, uciToMove(uci));
    if (!res.ok) { setBusy(false); return; }
    const bookAfter = advanceBook(curBook, res.san ?? "");
    setHistory([...hist, { fenBefore: curFen, fenAfter: res.fen, uci, san: res.san ?? uci, byLearner: false }]);
    setFen(res.fen);
    setBook(bookAfter);
    setBusy(false);
    const whoBot = identify(bookAfter).opening;
    if (whoBot) setFaced(whoBot);
    if (inBook(curBook) && !inBook(bookAfter)) fireMiddlegame(identify(curBook).opening);
    if (res.status === "checkmate") finish("Checkmate — the bot won. Review to see where it turned.", "loss");
    else if (res.status === "stalemate" || res.status === "draw") finish("Draw.", "draw");
  }

  async function coachStep(args: {
    before: string; res: { fen: string; uci?: string; san?: string };
    hist: Ply[]; plyIndex: number; bookBefore: BookState; bookAfter: BookState;
    wasInBook: boolean; inBookMove: boolean; theorySans: string[];
  }) {
    const { before, res, hist, plyIndex, bookBefore, bookAfter, wasInBook, inBookMove, theorySans } = args;
    setChecking(true);
    setBusy(true);
    const engine = getEngine();
    const beforeA = await engine.analyze(before, COACH_DEPTH);
    const bestCp = toCp(beforeA);
    const bestUci = beforeA.bestMove ?? "";
    const playedUci = res.uci ?? "";
    let loss = 0;
    if (bestUci && bestUci !== playedUci) {
      const afterA = await engine.analyze(res.fen, COACH_DEPTH);
      loss = bestCp - -toCp(afterA);
    }
    setChecking(false);

    // Book status line for this move.
    let bookMsg = "";
    if (wasInBook && inBookMove) {
      const who = identify(bookAfter);
      bookMsg = who.opening
        ? `📖 In book — the ${who.opening.name}${who.line ? ` · ${who.line.label}` : ""}.`
        : "📖 Book move — still in theory.";
    } else if (wasInBook && !inBookMove) {
      bookMsg = `Off book. Theory here was ${theoryList(theorySans)}.`;
    }

    const severity = coachSeverity(loss, plyIndex);
    const leftBookInaccurate = wasInBook && !inBookMove && loss >= 70;
    const shouldPause = practice && (severity !== null || leftBookInaccurate);

    if (shouldPause) {
      setVerdict(bookMsg);
      setCoaching({
        kind: severity ?? "offbook",
        san: res.san ?? "",
        bestSan: bestSanAt(before, bestUci),
        bestUci,
        playedUci,
        fenBefore: before,
        fenAfter: res.fen,
        bookBefore,
        theoryText: theorySans.length ? theoryList(theorySans) : "",
        loss,
      });
      setBusy(false);
      return;
    }

    const quality = severity === "blunder" ? "Blunder — best was " + bestSanAt(before, bestUci)
      : severity === "mistake" ? "Mistake — better was " + bestSanAt(before, bestUci)
        : praiseFor(loss);
    setVerdict([bookMsg, quality].filter(Boolean).join("  ·  "));
    await botReply(res.fen, hist, bookAfter);
  }

  function handleMove(from: string, to: string): boolean {
    if (phase !== "playing" || busy || coaching) return false;
    if (new ChessGame(fen).turn !== learnerTurn) return false;
    const before = fen;
    const res = applyMove(before, { from, to });
    if (!res.ok) return false;

    const plyIndex = history.length;
    const theory = theoryMoves(book);
    const wasInBook = inBook(book);
    const playedNorm = (res.san ?? "").replace(/[+#!?]/g, "");
    const inBookMove = theory.some((t) => t.san.replace(/[+#!?]/g, "") === playedNorm);
    const slip = wasInBook && !inBookMove ? slipLine(book, color) : null;

    const bookAfter = advanceBook(book, res.san ?? "");
    const nextHist: Ply[] = [...history, { fenBefore: before, fenAfter: res.fen, uci: res.uci ?? `${from}${to}`, san: res.san ?? "", byLearner: true }];
    setHistory(nextHist);
    setFen(res.fen);
    setBook(bookAfter);
    setVerdict("");
    const whoAfter = identify(bookAfter).opening;
    if (whoAfter) setFaced(whoAfter);

    // Feed a missed theory move on OUR side back to the classic Trainer's SRS.
    if (slip) recordLineResult(lineKey(slip.openingId, slip.color, slip.label), false);
    if (wasInBook && !inBook(bookAfter)) fireMiddlegame(identify(book).opening);

    if (res.status === "checkmate") { finish("Checkmate — you won! Review your game.", "win"); return true; }
    if (res.status === "stalemate" || res.status === "draw") { finish("Draw.", "draw"); return true; }

    void coachStep({
      before, res, hist: nextHist, plyIndex, bookBefore: book, bookAfter,
      wasInBook, inBookMove, theorySans: theory.map((t) => t.san),
    });
    return true;
  }

  function takeBack() {
    if (!coaching) return;
    setHistory((h) => h.slice(0, -1));
    setFen(coaching.fenBefore);
    setBook(coaching.bookBefore);
    setUsedTakeback(true);
    setCoaching(null);
    setVerdict(coaching.theoryText ? `Try again — theory here was ${coaching.theoryText}.` : "Try again.");
  }

  async function playOn() {
    if (!coaching) return;
    const c = coaching;
    setCoaching(null);
    await botReply(c.fenAfter, history, book);
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
      const loss = toCp(before) - -toCp(after);
      const bestUci = before.bestMove ?? "";
      const klass = reviewClass(loss);
      if (klass) found.push({ ply: i, moveLabel: moveLabel(i), san: p.san, bestSan: bestSanAt(p.fenBefore, bestUci), bestUci, playedUci: p.uci, fenBefore: p.fenBefore, loss, klass });
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

  // If the learner is Black, let the bot open (book move) after mount.
  const opened = useRef(false);
  useEffect(() => {
    if (opened.current) return;
    opened.current = true;
    if (learnerTurn === "w") return;
    const t = setTimeout(() => void botReply(fen, [], book), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Review screens ----
  if (phase === "reviewing") {
    return (
      <main className="space-y-5">
        <PageHeader eyebrow="Sparring · Review" title="Analyzing your game…" />
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
    return (
      <main className="space-y-5">
        <PageHeader
          eyebrow="Sparring · Review"
          title="Game review"
          right={<button type="button" onClick={back} className="text-sm font-medium text-ink-soft transition hover:text-ink">New game</button>}
        />
        {faced && (
          <Card className="flex items-center gap-2 p-4 text-sm text-ink-soft">
            <Chip tone="primary">Opening</Chip>
            You faced the <span className="font-semibold text-primary-strong">{faced.name}</span>.
          </Card>
        )}
        <Card className="flex items-center justify-between p-4">
          <span className="font-display text-lg font-semibold text-primary-strong">Accuracy</span>
          <Chip tone={accuracy >= 80 ? "sage" : accuracy >= 60 ? "amber" : "clay"}>{accuracy}%</Chip>
        </Card>

        {flag ? (
          <Board
            fen={flag.fenBefore}
            orientation={color}
            interactive={false}
            arrows={[
              { from: flag.playedUci.slice(0, 2), to: flag.playedUci.slice(2, 4), color: "#ef4444" },
              { from: flag.bestUci.slice(0, 2), to: flag.bestUci.slice(2, 4), color: "#22c55e" },
            ]}
          />
        ) : (
          <Card className="p-6 text-center text-ink-soft">No big mistakes flagged — clean game! 🎉</Card>
        )}
        {flag && (
          <div className="rounded-2xl bg-surface p-3 text-sm shadow-soft">
            <span className="font-mono text-ink">{flag.moveLabel} {flag.san}</span>
            <span className="text-ink-soft"> — better was </span>
            <span className="font-semibold text-sage">{flag.bestSan}</span>
            <span className="text-clay"> (red = your move, green = best)</span>
          </div>
        )}
        {flags.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Key moments</p>
            {flags.map((f) => (
              <button key={f.ply} type="button" onClick={() => setSelected(f)} className="block w-full text-left">
                <Card interactive className={`flex items-center gap-3 p-3 ${selected?.ply === f.ply ? "ring-2 ring-primary" : ""}`}>
                  <span className="font-mono text-sm text-ink-soft">{f.moveLabel}</span>
                  <span className="min-w-0 flex-1"><span className="font-semibold text-primary-strong">{f.san}</span><span className="text-ink-soft"> → better: {f.bestSan}</span></span>
                  <Chip tone={f.klass === "blunder" ? "clay" : f.klass === "mistake" ? "amber" : "neutral"}>
                    {f.klass === "blunder" ? "??" : f.klass === "mistake" ? "?" : "?!"}
                  </Chip>
                </Card>
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={back} className={buttonClasses("primary", "lg")}>Spar again</button>
          <Link href="/trainer" className={buttonClasses("secondary", "lg")}>Back to Trainer</Link>
        </div>
      </main>
    );
  }

  // ---- Playing / gameover ----
  const lastPly = history.length ? history[history.length - 1] : null;
  const statusLine = phase === "gameover"
    ? result
    : checking ? "Coach is checking your move…"
      : busy ? "Bot is thinking…"
        : new ChessGame(fen).turn === learnerTurn ? `Your move (${color}). Drag or tap a piece.` : "…";

  return (
    <main className="space-y-5">
      <PageHeader
        eyebrow={phase === "gameover" ? "Sparring · Game over" : "Sparring"}
        title="Sparring"
        right={<button type="button" onClick={back} className="text-sm font-medium text-ink-soft transition hover:text-ink">New game</button>}
      />

      <div className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
        <Chip tone={gameAdaptive ? "sage" : "neutral"}>{gameAdaptive ? "Adaptive · " : ""}{gameElo < 1320 ? "~" : ""}{gameElo}</Chip>
        <span>vs {personaForElo(gameElo)}</span>
        <Chip tone={practice ? "amber" : "neutral"}>{practice ? "Practice" : "Game"}</Chip>
        {stillBook ? (
          <Chip tone="primary">{id.opening ? `📖 ${id.opening.name}` : "📖 In book"}</Chip>
        ) : (
          <Chip tone="neutral">Middlegame</Chip>
        )}
      </div>

      <div className="flex items-stretch gap-2">
        <EvalBar fen={fen} orientation={color} />
        <div className="min-w-0 flex-1">
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
        </div>
      </div>

      {middlegame && phase === "playing" && (
        <Card className="space-y-2 border-2 border-accent/40 p-4">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden>📖</span>
            <span className="font-display text-base font-semibold text-primary-strong">Out of book — into the middlegame</span>
          </div>
          <p className="text-sm text-ink-soft">
            {middlegame.opening?.middlegamePlan
              ? middlegame.opening.middlegamePlan
              : "You're past prepared theory. Play on principles: finish developing, keep your king safe, and look for a plan around the pawn structure."}
          </p>
          <button type="button" onClick={() => setMiddlegame(null)} className="self-start text-xs font-semibold text-accent">Got it</button>
        </Card>
      )}

      {coaching ? (
        <Card className="space-y-3 border-2 border-accent/40 p-4">
          <div className="flex items-center gap-2">
            <Chip tone={coaching.kind === "blunder" ? "clay" : coaching.kind === "mistake" ? "amber" : "primary"}>
              {coaching.kind === "blunder" ? "Blunder" : coaching.kind === "mistake" ? "Mistake" : "Off book"}
            </Chip>
            <span className="font-mono text-ink">{coaching.san}</span>
          </div>
          <p className="text-sm text-ink-soft">
            {coaching.kind === "offbook"
              ? <>That leaves theory{coaching.theoryText ? <> (book was <span className="font-semibold text-ink">{coaching.theoryText}</span>)</> : ""} and gives up some ground. </>
              : coaching.kind === "blunder" ? "That drops material or misses a big chance. " : "That gives up some of your advantage. "}
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
          {verdict || statusLine}
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

      {id.opening && phase === "playing" && <OpeningSummary opening={id.opening} triggerLabel="Plans & ideas for this opening" />}

      <div className="flex flex-wrap gap-3">
        {phase === "playing" && (
          <button type="button" onClick={() => finish("You ended the game. Let's review it.")} className={buttonClasses("secondary", "md")}>End &amp; review</button>
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
