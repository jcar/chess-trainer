"use client";

// The trainer session loop: drill each due line as guess-the-move, record mastery
// (clean recall = no wrong move and no "Show me"), and interleave a "why"
// checkpoint every few cards. Drill mechanic adapted from OpeningDrillPlayer, but
// it reports whether the recall was clean so the store can advance mastery.

import { useMemo, useState } from "react";
import type { TrainerLine } from "@/lib/trainer/lines";
import { ChessGame, buildReplayFens, replayMoveSquares } from "@/lib/chess/game";
import { Board } from "@/components/board/Board";
import { buttonClasses } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { WhyCheckpoint } from "./WhyCheckpoint";

interface Props {
  queue: TrainerLine[];
  recordLineResult: (key: string, clean: boolean) => void;
  onExit: () => void;
}

const WHY_EVERY = 3; // show a "why" checkpoint after every N drilled lines

export function TrainerSession({ queue, recordLineResult, onExit }: Props) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"drill" | "why">("drill");
  const [cleanCount, setCleanCount] = useState(0);

  const done = idx >= queue.length;
  const current = queue[idx];

  function afterDrill(clean: boolean) {
    recordLineResult(current.key, clean);
    if (clean) setCleanCount((c) => c + 1);
    // Interleave a "why" checkpoint, except right at the very end.
    const isLast = idx + 1 >= queue.length;
    if (!isLast && (idx + 1) % WHY_EVERY === 0) {
      setPhase("why");
    } else {
      setIdx((i) => i + 1);
    }
  }

  function afterWhy() {
    setPhase("drill");
    setIdx((i) => i + 1);
  }

  if (done) {
    return (
      <div className="space-y-5 text-center">
        <p className="font-display text-2xl font-semibold text-primary-strong">
          Session complete!
        </p>
        <p className="text-ink-soft">
          You drilled {queue.length} {queue.length === 1 ? "line" : "lines"} —{" "}
          {cleanCount} clean {cleanCount === 1 ? "recall" : "recalls"}.
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onExit}
            className={buttonClasses("primary", "lg")}
          >
            Back to trainer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm text-ink-soft">
          <span className="font-semibold">
            {idx + 1} / {queue.length}
          </span>
          <button
            type="button"
            onClick={onExit}
            className="font-medium transition hover:text-ink"
          >
            End session
          </button>
        </div>
        <ProgressBar pct={(idx / queue.length) * 100} />
      </div>

      {phase === "drill" ? (
        <LineDrill key={`${current.key}-${idx}`} item={current} onDone={afterDrill} />
      ) : (
        <WhyCheckpoint opening={current.opening} onContinue={afterWhy} />
      )}
    </div>
  );
}

type Feedback = { kind: "info" | "error" | "success"; text: string };

function LineDrill({
  item,
  onDone,
}: {
  item: TrainerLine;
  onDone: (clean: boolean) => void;
}) {
  const sans = item.line.sans;
  const startFen = item.line.startFen;
  const color = item.opening.trainerColor;
  const learnerTurn = color === "white" ? "w" : "b";

  const fens = useMemo(() => buildReplayFens(sans, startFen), [sans, startFen]);
  const moveSquares = useMemo(
    () => replayMoveSquares(sans, startFen),
    [sans, startFen],
  );

  const firstPly = useMemo(() => {
    for (let i = 0; i < sans.length; i++) {
      if (new ChessGame(fens[i]).turn === learnerTurn) return i;
    }
    return sans.length;
  }, [fens, sans.length, learnerTurn]);

  const [ply, setPly] = useState(firstPly);
  const [clean, setClean] = useState(true);
  const [arrowHint, setArrowHint] = useState<{ from: string; to: string }[]>([]);
  const [feedback, setFeedback] = useState<Feedback>({
    kind: "info",
    text: `Your move as ${color === "white" ? "White" : "Black"}. Play your repertoire move.`,
  });

  const finished = ply >= sans.length;
  const currentFen = fens[Math.min(ply, sans.length)];
  const learnerToMove =
    !finished && new ChessGame(currentFen).turn === learnerTurn;

  function showMe() {
    if (finished) return;
    const sq = moveSquares[ply];
    if (!sq) return;
    setClean(false);
    setArrowHint([sq]);
    setTimeout(() => setArrowHint([]), 2200);
  }

  function handleMove(from: string, to: string): boolean {
    if (finished || new ChessGame(currentFen).turn !== learnerTurn) return false;
    const expected = sans[ply];
    let res = new ChessGame(currentFen).tryMove({ from, to });
    if (!res.ok)
      res = new ChessGame(currentFen).tryMove({ from, to, promotion: "q" });
    if (!res.ok) {
      setClean(false);
      setFeedback({ kind: "error", text: "Not a legal move here. Try again." });
      return false;
    }
    if (res.san !== expected) {
      setClean(false);
      setFeedback({
        kind: "error",
        text: "Not your repertoire move. Try again — or use Show me.",
      });
      return false;
    }
    // Correct.
    setArrowHint([]);
    const next = ply + 1;
    if (next >= sans.length) {
      setPly(next);
      setFeedback({ kind: "success", text: "Line complete!" });
      // Defer so the final position renders before we advance the session.
      setTimeout(() => onDone(clean), 550);
      return true;
    }
    const note = item.line.notes?.[ply];
    const nextIsOpponent = new ChessGame(fens[next]).turn !== learnerTurn;
    if (nextIsOpponent) {
      setPly(next);
      setFeedback({ kind: "info", text: note ?? "Good." });
      setTimeout(() => {
        const after = next + 1;
        setPly(after);
        if (after >= sans.length) {
          setFeedback({ kind: "success", text: "Line complete!" });
          setTimeout(() => onDone(clean), 550);
        } else {
          setFeedback({
            kind: "info",
            text: item.line.notes?.[next] ?? "Your move.",
          });
        }
      }, 420);
    } else {
      setPly(next);
      setFeedback({ kind: "info", text: note ?? "Your move." });
    }
    return true;
  }

  // Tint the opponent's just-played move (cool slate) so it's clear what changed.
  const lastMove =
    learnerToMove && ply > 0 && moveSquares[ply - 1]
      ? { ...moveSquares[ply - 1], mine: false }
      : undefined;

  const feedbackCls =
    feedback.kind === "success"
      ? "bg-sage/10 text-sage"
      : feedback.kind === "error"
        ? "bg-clay/10 text-clay"
        : "bg-surface text-ink-soft shadow-soft";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Chip tone="neutral">{item.opening.name}</Chip>
        <span className="text-xs text-ink-soft">{item.line.label}</span>
      </div>

      <Board
        fen={currentFen}
        orientation={color}
        interactive={learnerToMove}
        onDrop={learnerToMove ? handleMove : undefined}
        getLegalMoves={
          learnerToMove
            ? (square) => new ChessGame(currentFen).legalDestinations(square)
            : undefined
        }
        onMove={learnerToMove ? (f, t) => void handleMove(f, t) : undefined}
        arrows={arrowHint}
        lastMove={lastMove}
        highlightSquares={arrowHint.flatMap((a) => [a.from, a.to])}
      />

      <div className={`rounded-2xl p-4 text-sm leading-relaxed ${feedbackCls}`}>
        {feedback.text}
      </div>

      {learnerToMove && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={showMe}
            className={buttonClasses("secondary", "md")}
          >
            Show me
          </button>
        </div>
      )}
    </div>
  );
}
