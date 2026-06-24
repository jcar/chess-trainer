"use client";

// Opening drill ("guess the move"): the learner reproduces one side of a known
// opening line. On the learner's turn the board is interactive (drag or
// tap-to-move); the move is validated against the book move by SAN, wrong moves
// are rejected with a gentle retry + a "Show me" arrow hint, and the opponent's
// replies are auto-played. This generalizes PuzzlePlayer's validate-the-move
// mechanic to a one-color line, and is the seed of the standalone openings
// trainer (both read the same line data in src/content/openings/).

import { useMemo, useState } from "react";
import type { OpeningDrillActivity } from "@/content/types";
import { ChessGame, buildReplayFens, replayMoveSquares } from "@/lib/chess/game";
import { Board } from "@/components/board/Board";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";
import { buttonClasses } from "@/components/ui/Button";

interface Props {
  activity: OpeningDrillActivity;
  onComplete: (score: number) => void;
  onAttempt?: () => void;
  kidMode?: boolean;
}

type Feedback = { kind: "info" | "error" | "success"; text: string };

export function OpeningDrillPlayer({
  activity,
  onComplete,
  onAttempt,
  kidMode = false,
}: Props) {
  // Precompute the position and the from/to squares at every ply.
  const fens = useMemo(
    () => buildReplayFens(activity.line, activity.startFen),
    [activity],
  );
  const moveSquares = useMemo(
    () => replayMoveSquares(activity.line, activity.startFen),
    [activity],
  );
  const learnerTurn = activity.learnerColor === "white" ? "w" : "b";

  // The first ply where it's the learner's move (skip any leading opponent
  // moves, e.g. White's 1.e4 when training Black). Derived, not cleared.
  const firstPly = useMemo(() => {
    for (let i = 0; i < activity.line.length; i++) {
      if (new ChessGame(fens[i]).turn === learnerTurn) return i;
    }
    return activity.line.length;
  }, [fens, activity.line.length, learnerTurn]);

  const [ply, setPly] = useState(firstPly);
  const [feedback, setFeedback] = useState<Feedback>({
    kind: "info",
    text: activity.intro,
  });
  const [arrowHint, setArrowHint] = useState<{ from: string; to: string }[]>([]);

  const done = ply >= activity.line.length;
  const currentFen = fens[Math.min(ply, activity.line.length)];
  const learnerToMove = !done && new ChessGame(currentFen).turn === learnerTurn;

  // The opponent's reply is APPENDED below the learner's note (never replaces
  // it), so the "why" behind the learner's own move stays readable until they
  // move again (or, at line end, until they tap the footer's Next).
  const opponentLabel = activity.learnerColor === "white" ? "Black" : "White";
  function replyLine(san: string, note?: string) {
    return note
      ? `${opponentLabel} replies ${san} — ${note}`
      : `${opponentLabel} replies ${san}.`;
  }

  function sound(name: Parameters<typeof playSound>[0]) {
    if (kidMode) playSound(name);
  }

  function finish(atPly: number, lead?: string) {
    setPly(atPly);
    setFeedback({
      kind: "success",
      text: [lead, activity.successText].filter(Boolean).join("\n\n"),
    });
    sound("success");
    onComplete(100);
  }

  function showMe() {
    if (done) return;
    const sq = moveSquares[ply];
    if (!sq) return;
    sound("select");
    setArrowHint([sq]);
    setTimeout(() => setArrowHint([]), 2200);
  }

  function reset() {
    setPly(firstPly);
    setArrowHint([]);
    setFeedback({ kind: "info", text: activity.intro });
  }

  function handleMove(from: string, to: string): boolean {
    if (done) return false;
    if (new ChessGame(currentFen).turn !== learnerTurn) return false;

    const expectedSan = activity.line[ply];
    let res = new ChessGame(currentFen).tryMove({ from, to });
    if (!res.ok) res = new ChessGame(currentFen).tryMove({ from, to, promotion: "q" });

    if (!res.ok) {
      onAttempt?.();
      sound("tryAgain");
      setFeedback({ kind: "error", text: "That move isn't legal here. Try again." });
      return false;
    }
    if (res.san !== expectedSan) {
      onAttempt?.();
      sound("tryAgain");
      setFeedback({
        kind: "error",
        text: "Legal, but not the main line here. Find the book move — or use Show me.",
      });
      return false;
    }

    // Correct book move.
    setArrowHint([]);
    sound(res.san.includes("x") ? "capture" : "move");
    const note = activity.notes?.[ply];
    const next = ply + 1;

    if (next >= activity.line.length) {
      finish(next, note);
      return true;
    }

    const nextIsOpponent =
      new ChessGame(fens[next]).turn !== learnerTurn;
    if (nextIsOpponent) {
      setPly(next); // show the position after the learner's move first
      setFeedback({ kind: "info", text: note ?? "Good — that's the move." });
      setTimeout(() => {
        const after = next + 1;
        const reply = replyLine(activity.line[next], activity.notes?.[next]);
        setPly(after);
        sound(activity.line[next].includes("x") ? "capture" : "move");
        if (after >= activity.line.length) {
          finish(after, [note, reply].filter(Boolean).join("\n\n"));
        } else {
          setFeedback({
            kind: "info",
            text: [note, reply].filter(Boolean).join("\n\n"),
          });
        }
      }, 550);
    } else {
      setPly(next);
      setFeedback({ kind: "info", text: note ?? "Your move." });
    }
    return true;
  }

  // When it's the learner's turn and the opponent just replied, arrow that reply.
  const lastMoveArrow =
    learnerToMove && ply > 0 && moveSquares[ply - 1]
      ? [moveSquares[ply - 1]]
      : [];

  const feedbackCls =
    feedback.kind === "success"
      ? "bg-sage/10 text-sage"
      : feedback.kind === "error"
        ? "bg-clay/10 text-clay"
        : "bg-surface text-ink-soft shadow-soft";

  return (
    <div className="space-y-4">
      <Board
        fen={currentFen}
        orientation={activity.orientation}
        interactive={learnerToMove}
        onDrop={learnerToMove ? handleMove : undefined}
        getLegalMoves={
          learnerToMove
            ? (square) => new ChessGame(currentFen).legalDestinations(square)
            : undefined
        }
        onMove={learnerToMove ? (from, to) => void handleMove(from, to) : undefined}
        onSelect={kidMode ? () => playSound("select") : undefined}
        arrows={[...lastMoveArrow, ...arrowHint]}
        highlightSquares={arrowHint.flatMap((a) => [a.from, a.to])}
      />

      <div
        className={`flex items-start gap-3 rounded-2xl p-4 leading-relaxed ${kidMode ? "text-lg" : "text-sm"} ${feedbackCls}`}
      >
        <p className="flex-1 whitespace-pre-line">{feedback.text}</p>
        {kidMode && <SpeakButton text={feedback.text} size="sm" />}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className={buttonClasses("secondary", kidMode ? "kid" : "md")}
          >
            Reset
          </button>
          {!done && (
            <button
              type="button"
              onClick={showMe}
              className={buttonClasses("accent", kidMode ? "kid" : "md")}
            >
              Show me
            </button>
          )}
        </div>
        <span className={kidMode ? "text-base font-bold text-ink-soft" : "text-sm text-ink-soft"}>
          {Math.min(ply, activity.line.length)} / {activity.line.length}
        </span>
      </div>
    </div>
  );
}
