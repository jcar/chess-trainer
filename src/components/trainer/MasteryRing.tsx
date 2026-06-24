// A compact circular progress gauge for a tile: how many of an opening's lines
// you've mastered. The ring fills proportionally (accent while partial, sage when
// complete) with the count centred and an accessible "n of N lines mastered"
// label. Renders nothing when there are no lines.

interface Props {
  mastered: number;
  total: number;
  className?: string;
}

const R = 15;
const C = 2 * Math.PI * R;

export function MasteryRing({ mastered, total, className = "" }: Props) {
  if (total <= 0) return null;
  const frac = Math.max(0, Math.min(1, mastered / total));
  const filled = frac * C;
  const complete = mastered >= total;
  const label = `${mastered} of ${total} ${total === 1 ? "line" : "lines"} mastered`;

  return (
    <span
      className={`relative inline-block h-9 w-9 shrink-0 ${className}`}
      role="img"
      aria-label={label}
      title={label}
    >
      <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
        <circle
          cx="18"
          cy="18"
          r={R}
          fill="none"
          strokeWidth="3"
          stroke="currentColor"
          className="text-ink/12"
        />
        {mastered > 0 && (
          <circle
            cx="18"
            cy="18"
            r={R}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            stroke="currentColor"
            strokeDasharray={`${filled} ${C - filled}`}
            className={complete ? "text-sage" : "text-accent"}
          />
        )}
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[10px] font-bold tabular-nums text-ink-soft">
        {mastered}/{total}
      </span>
    </span>
  );
}
