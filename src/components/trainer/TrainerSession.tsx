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
import { OpeningSummary } from "./OpeningSummary";

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

  // #1 Opponent-branch framing: if this line is an authored deviation, say so.
  const branch = item.line.branch;
  const branchIntro = branch
    ? `Same opening — the opponent plays ${branch.tryMove} (move ${Math.floor(branch.atPly / 2) + 1}) instead of the main line. Find your reply.`
    : `Your move as ${color === "white" ? "White" : "Black"}. Play your repertoire move.`;

  const [ply, setPly] = useState(firstPly);
  const [clean, setClean] = useState(true);
  const [wrongCount, setWrongCount] = useState(0);
  const [arrowHint, setArrowHint] = useState<{ from: string; to: string }[]>([]);
  const [feedback, setFeedback] = useState<Feedback>({ kind: "info", text: branchIntro });

  const finished = ply >= sans.length;
  const currentFen = fens[Math.min(ply, sans.length)];
  const learnerToMove =
    !finished && new ChessGame(currentFen).turn === learnerTurn;

  // The opponent's reply is APPENDED below the learner's note (never replaces
  // it), so the "why" behind the learner's own move stays readable at their own
  // pace until they move again.
  const opponentLabel = color === "white" ? "Black" : "White";
  function replyLine(san: string, note?: string) {
    return note
      ? `${opponentLabel} replies ${san} — ${note}`
      : `${opponentLabel} replies ${san}.`;
  }

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
      // #3 Teaching feedback: if this wrong move is an authored common mistake,
      // explain WHY it's wrong; otherwise escalate to a nudge toward "Show me".
      const mistake = item.line.commonMistakes?.find(
        (m) => m.ply === ply && m.move === res.san,
      );
      const n = wrongCount + 1;
      setWrongCount(n);
      setFeedback({
        kind: "error",
        text: mistake
          ? mistake.why
          : n >= 2
            ? "Still not your repertoire move — tap “Show me” to see the move and why it's played."
            : "Not your repertoire move here. Think about your plan, try again, or use Show me.",
      });
      return false;
    }
    // Correct.
    setWrongCount(0);
    setArrowHint([]);
    const note = item.line.notes?.[ply]; // the WHY behind the learner's move
    const next = ply + 1;
    if (next >= sans.length) {
      // Learner played the final move. Show the why and wait — the finished
      // state renders a Continue button, so the note can be read in full.
      setPly(next);
      setFeedback({
        kind: "success",
        text: [note, "Line complete!"].filter(Boolean).join("\n\n"),
      });
      return true;
    }
    const nextIsOpponent = new ChessGame(fens[next]).turn !== learnerTurn;
    if (nextIsOpponent) {
      // Show the learner's why immediately; the opponent's reply lands on the
      // board after a beat and its note is APPENDED below — the why is never
      // wiped, and the combined text stays until the learner's next move.
      setPly(next);
      setFeedback({ kind: "info", text: note ?? "Good." });
      setTimeout(() => {
        const after = next + 1;
        const reply = replyLine(sans[next], item.line.notes?.[next]);
        setPly(after);
        if (after >= sans.length) {
          setFeedback({
            kind: "success",
            text: [note, reply, "Line complete!"].filter(Boolean).join("\n\n"),
          });
        } else {
          setFeedback({
            kind: "info",
            text: [note, reply].filter(Boolean).join("\n\n"),
          });
        }
      }, 600);
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
        {branch && <Chip tone="amber">Deviation</Chip>}
        <span className="text-xs text-ink-soft">{item.line.label}</span>
      </div>

      <OpeningSummary opening={item.opening} />

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

      {/* Reserve height so a shorter message (or the opponent's reply beat)
          doesn't shrink the page and clamp the scroll — the cause of the
          "bounce up then back down" when scrolled down mid-drill. */}
      <div
        className={`min-h-[6rem] whitespace-pre-line rounded-2xl p-4 text-sm leading-relaxed ${feedbackCls}`}
      >
        {feedback.text}
      </div>

      {/* Stable-height row so the button mounting/unmounting never shifts layout. */}
      <div className="flex min-h-[2.75rem] justify-end">
        {finished ? (
          <button
            type="button"
            onClick={() => onDone(clean)}
            className={buttonClasses("primary", "md")}
          >
            Continue
          </button>
        ) : learnerToMove ? (
          <button
            type="button"
            onClick={showMe}
            className={buttonClasses("secondary", "md")}
          >
            Show me
          </button>
        ) : null}
      </div>
    </div>
  );
}
