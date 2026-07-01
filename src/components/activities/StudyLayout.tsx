import type { ReactNode } from "react";

// "The Study": the board sits on its stand as the centerpiece, with a ledger of
// prompt / feedback / controls beside it — like sitting at a real set. On wide
// screens it's two columns (board sticky on the left, ledger on the right); on
// phone/tablet-portrait it stacks (board on top, ledger below). Board players
// pass their <Board> as `board` and everything else as `ledger`.
//
// `stack` forces the single-column layout at every width — used by kid mode,
// which is calmer as one focused column.
//
// `controls` (the Back/Next/Reset row) is pinned BELOW a fixed-height,
// scroll-on-overflow annotation region, so the buttons never move when the note
// or feedback text above them changes length — a long annotation scrolls inside
// the panel instead of pushing the controls around. When `controls` is omitted,
// the ledger renders in normal flow (backward-compatible).
export function StudyLayout({
  board,
  ledger,
  controls,
  caption,
  stack = false,
}: {
  board: ReactNode;
  ledger: ReactNode;
  /** The control row (buttons); pinned below the fixed-height annotation region. */
  controls?: ReactNode;
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

  // The annotation region gets a fixed height (taller for kid mode's larger text)
  // + internal scroll only when controls are pinned beneath it.
  const bodyHeight = stack ? "h-[15rem]" : "h-[13rem]";
  const panel = (
    <div className="flex min-w-0 flex-col gap-3">
      <div
        className={
          controls
            ? `${bodyHeight} flex flex-col gap-4 overflow-y-auto pr-1`
            : "flex flex-col gap-4"
        }
      >
        {ledger}
      </div>
      {controls && <div className="shrink-0">{controls}</div>}
    </div>
  );

  if (stack) {
    return (
      <div className="flex flex-col gap-4">
        {stage}
        {panel}
      </div>
    );
  }
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-7">
      <div className="lg:sticky lg:top-4">{stage}</div>
      {panel}
    </div>
  );
}
