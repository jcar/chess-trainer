import type { HTMLAttributes } from "react";

// A warm surface card. `interactive` adds a subtle lift on hover/press (for
// tappable cards / links).
export function Card({
  interactive = false,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={`rounded-2xl border border-line bg-card shadow-soft ${
        interactive
          ? "transition hover:shadow-lift active:scale-[0.99]"
          : ""
      } ${className}`}
      {...props}
    />
  );
}
