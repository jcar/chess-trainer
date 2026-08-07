"use client";

// The drill loop. One position at a time from the `rn:` due queue, in three
// modes (see lib/repertoire/drills.ts). A miss never ends the session — it
// teaches, then requeues the position later by a DIFFERENT route, which is the
// bit that actually fixes move-order recall.

import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import Link from "next/link";
import { Board } from "@/components/board/Board";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CheckIcon, ChevronRightIcon } from "@/components/icons";
import { ChessGame } from "@/lib/chess/game";
import { recordNode } from "@/lib/repertoire/mastery";
import { MODE_LABEL, type DrillItem } from "@/lib/repertoire/drills";

const BADGES = ["A", "B", "C", "D"];
const BOT_MS = 420;

type Phase = "asking" | "right" | "wrong";

/** Opponent moves auto-play until it's our turn; returns the FEN we must answer. */
function positionAfter(sequence: string[], upTo: number): string {
  const game = new Chess();
  for (let i = 0; i < upTo && i < sequence.length; i++) {
    try {
      game.move(sequence[i]);
    } catch {
      break;
    }
  }
  return game.fen();
}

function Feedback({
  phase,
  item,
  wrongMove,
}: {
  phase: Phase;
  item: DrillItem;
  wrongMove: string | null;
}) {
  if (phase === "asking") return null;

  const taught =
    phase === "wrong" && wrongMove
      ? item.mistakes.find((m) => m.move === wrongMove)?.why
      : undefined;

  return (
    <Card
      className={`space-y-2 p-4 ${phase === "right" ? "border-sage/45" : "border-clay/45"}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Chip tone={phase === "right" ? "sage" : "clay"}>
          {phase === "right" ? "Correct" : `The move is ${item.answerSan}`}
        </Chip>
        <Chip tone="neutral">{MODE_LABEL[item.mode]}</Chip>
        {item.transposition && <Chip tone="primary">↩ transposition</Chip>}
      </div>

      {taught && <p className="text-sm leading-relaxed text-ink">{taught}</p>}
      {!taught && item.note && (
        <p className="text-sm leading-relaxed text-ink-soft">{item.note}</p>
      )}

      {item.mode === "shuffled" && (
        <p className="text-sm text-ink-soft">
          They played their moves in a different order than your line does — the
          position is the same one you know.
        </p>
      )}

      {item.transposition && item.routes.length > 1 && (
        <div className="space-y-1 rounded-xl bg-surface p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            You also reach this by
          </p>
          {item.routes.slice(0, 3).map((r, i) => (
            <p key={i} className="font-mono text-xs text-ink-soft">
              {r.join(" ")}
            </p>
          ))}
        </div>
      )}
    </Card>
  );
}

export function DrillSession({ items }: { items: DrillItem[] }) {
  const [queue, setQueue] = useState<DrillItem[]>(items);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("asking");
  const [wrongMove, setWrongMove] = useState<string | null>(null);
  const [done, setDone] = useState(0);
  const [correct, setCorrect] = useState(0);
  // For shuffled items: how many plies of the sequence have been played.
  const [played, setPlayed] = useState(0);

  const item = queue[idx];
  const isShuffled = item?.mode === "shuffled";

  // Auto-play the opponent's moves up to our turn.
  useEffect(() => {
    if (!item || item.mode !== "shuffled") return;
    const ourParity = item.color === "white" ? 0 : 1;
    if (played % 2 === ourParity) return; // our turn — wait for input
    if (played >= item.sequence.length) return;
    const t = setTimeout(() => setPlayed((p) => p + 1), BOT_MS);
    return () => clearTimeout(t);
  }, [item, played]);

  if (!item) {
    return (
      <Card className="space-y-4 p-5">
        <p className="font-display text-xl font-semibold text-ink">
          Nothing due right now
        </p>
        <p className="text-sm text-ink-soft">
          Your repertoire positions are all reviewed. Come back when the spacing
          brings them round again.
        </p>
        <Link href="/repertoire" className={buttonClasses("primary", "lg")}>
          Back to the Lab
        </Link>
      </Card>
    );
  }

  if (done >= queue.length) {
    const pct = queue.length ? Math.round((correct / queue.length) * 100) : 0;
    return (
      <Card className="space-y-4 p-5">
        <p className="font-display text-2xl font-semibold text-ink">
          {correct} / {queue.length} clean
        </p>
        <ProgressBar pct={pct} tone={pct >= 70 ? "sage" : "primary"} />
        <p className="text-sm text-ink-soft">
          Missed positions come back sooner — the spacing does the remembering
          for you.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/repertoire" className={buttonClasses("primary", "lg")}>
            Back to the Lab
          </Link>
          <Link href="/repertoire/health" className={buttonClasses("secondary", "lg")}>
            See what&apos;s weak
          </Link>
        </div>
      </Card>
    );
  }

  const fen = isShuffled ? positionAfter(item.sequence, played) : item.fen;

  function settle(good: boolean, played?: string) {
    recordNode(item.key, good);
    setWrongMove(good ? null : (played ?? null));
    setPhase(good ? "right" : "wrong");
    if (good) setCorrect((c) => c + 1);
  }

  function tryPlay(from: string, to: string): boolean {
    if (phase !== "asking") return false;
    const game = new ChessGame(fen);
    // Promotion is always to a queen here: no authored opening line promotes,
    // so a promotion in a drill is already off-book.
    const res = game.tryMove({ from, to, promotion: "q" });
    if (!res.ok) return false;
    settle(res.san === item.answerSan, res.san);
    return true;
  }

  function next() {
    const wasWrong = phase === "wrong";
    setPhase("asking");
    setWrongMove(null);
    setPlayed(0);
    setDone((d) => d + 1);
    if (wasWrong) {
      // Requeue this position later in the session, reached another way where
      // a second route exists.
      const again: DrillItem =
        item.routes.length > 1
          ? { ...item, route: item.routes[1], mode: "cold-start" }
          : { ...item, mode: "cold-start" };
      setQueue((q) => [...q, again]);
    }
    setIdx((i) => i + 1);
  }

  const total = queue.length;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <ProgressBar
          pct={Math.round((done / total) * 100)}
          tone="primary"
          className="min-w-0 flex-1"
        />
        <span className="shrink-0 font-mono text-xs text-ink-soft">
          {done + 1} / {total}
        </span>
      </div>

      {item.mode === "where-am-i" ? (
        <>
          <div className="mx-auto max-w-sm">
            <Board fen={item.fen} orientation={item.color} interactive={false} />
          </div>
          <p className="font-display text-lg font-semibold text-ink">
            Which opening is this?
          </p>
          <div className="space-y-2.5">
            {item.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                disabled={phase !== "asking"}
                onClick={() => settle(i === item.correctIndex, opt)}
                className={`group flex w-full items-center gap-3.5 rounded-xl border px-4 py-3 text-left text-[15px] transition disabled:opacity-60 ${
                  phase !== "asking" && i === item.correctIndex
                    ? "border-sage/55 bg-sage/10 text-ink"
                    : "border-line bg-card text-ink hover:border-primary/55 hover:bg-primary/[0.05]"
                }`}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/12 text-xs font-extrabold text-primary-strong">
                  {BADGES[i]}
                </span>
                <span className="min-w-0 flex-1">{opt}</span>
                {phase !== "asking" && i === item.correctIndex && (
                  <CheckIcon className="h-4 w-4 shrink-0 text-sage" />
                )}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto max-w-md">
            <Board
              fen={fen}
              orientation={item.color}
              interactive={phase === "asking"}
              onDrop={tryPlay}
              getLegalMoves={(sq) => new ChessGame(fen).legalDestinations(sq)}
              onMove={(from, to) => {
                tryPlay(from, to);
              }}
            />
          </div>
          <p className="font-display text-lg font-semibold text-ink">
            {phase === "asking"
              ? "Your move."
              : phase === "right"
                ? "That's your line."
                : "Not your move here."}
          </p>
          {phase === "asking" && (
            <p className="text-sm text-ink-soft">
              No opening name, no move list — just the position, the way a real
              game gives it to you.
            </p>
          )}
        </>
      )}

      <Feedback phase={phase} item={item} wrongMove={wrongMove} />

      {phase !== "asking" && (
        <button type="button" onClick={next} className={buttonClasses("primary", "lg")}>
          Next <ChevronRightIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
