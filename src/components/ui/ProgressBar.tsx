export function ProgressBar({
  pct,
  tone = "sage",
  showLabel = false,
  className = "",
}: {
  pct: number; // 0–100
  tone?: "sage" | "kid";
  showLabel?: boolean;
  className?: string;
}) {
  const fill = tone === "kid" ? "bg-kid-teal" : "bg-sage";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
        <div
          className={`h-full rounded-full ${fill} transition-all`}
          style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
        />
      </div>
      {showLabel && (
        <span className="w-10 text-right text-xs font-semibold text-ink-soft">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
