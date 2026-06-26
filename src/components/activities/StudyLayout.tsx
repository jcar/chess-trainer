import type { ReactNode } from "react";

// "The Study": the board sits on its stand as the centerpiece, with a ledger of
// prompt / feedback / controls beside it — like sitting at a real set. On wide
// screens it's two columns (board sticky on the left, ledger on the right); on
// phone/tablet-portrait it stacks (board on top, ledger below). Board players
// pass their <Board> as `board` and everything else as `ledger`.
//
// `stack` forces the single-column layout at every width — used by kid mode,
// which is calmer as one focused column.
export function StudyLayout({
  board,
  ledger,
  caption,
  stack = false,
}: {
  board: ReactNode;
  ledger: ReactNode;
  /** A small engraved line under the board, e.g. "White to move". */
  caption?: string;
  stack?: boolean;
}) {
  const stage = (
    <>
      {board}
      {caption && (
        <p className="mt-2.5 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
          {caption}
        </p>
      )}
    </>
  );
  if (stack) {
    return (
      <div className="flex flex-col gap-4">
        {stage}
        {ledger}
      </div>
    );
  }
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-7">
      <div className="lg:sticky lg:top-4">{stage}</div>
      <div className="flex min-w-0 flex-col gap-4">{ledger}</div>
    </div>
  );
}
