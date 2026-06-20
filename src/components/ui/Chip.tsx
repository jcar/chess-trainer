import type { Module } from "@/content/types";

type Tone = "sage" | "amber" | "clay" | "kid" | "neutral";

const TONE: Record<Tone, string> = {
  sage: "bg-sage/15 text-sage",
  amber: "bg-amber/15 text-amber",
  clay: "bg-clay/15 text-clay",
  kid: "bg-kid-teal/15 text-kid-teal",
  neutral: "bg-ink/8 text-ink-soft",
};

export function Chip({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** The level chip for a module (kid modules show their age band in kid tone). */
export function LevelChip({ module: mod }: { module: Module }) {
  if (mod.kidMode) return <Chip tone="kid">Ages 5–8</Chip>;
  const tone: Tone =
    mod.level === "Beginner"
      ? "sage"
      : mod.level === "Intermediate"
        ? "amber"
        : "clay";
  return <Chip tone={tone}>{mod.level}</Chip>;
}
