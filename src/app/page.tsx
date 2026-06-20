"use client";

import Link from "next/link";
import { MODULES, getModuleActivities } from "@/content";
import type { Module } from "@/content/types";
import { useProgress } from "@/lib/progress/useProgress";
import { Card } from "@/components/ui/Card";
import { LevelChip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  ChevronRightIcon,
  StarIcon,
  PawnGlyph,
  CrownGlyph,
} from "@/components/icons";

// Medallion glyph + color tone per module.
function moduleEmblem(mod: Module): {
  Glyph: (p: { className?: string }) => React.ReactNode;
  tone: string;
} {
  if (mod.kidMode) return { Glyph: (p) => <StarIcon {...p} />, tone: "kid-teal" };
  if (mod.level === "Intermediate")
    return { Glyph: CrownGlyph, tone: "amber" };
  if (mod.level === "Advanced") return { Glyph: CrownGlyph, tone: "clay" };
  return { Glyph: PawnGlyph, tone: "sage" };
}

export default function HomePage() {
  const { moduleProgress } = useProgress();

  return (
    <main className="space-y-7">
      <section className="space-y-1.5 pt-1 text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-walnut-deep">
          Learn chess, beautifully.
        </h1>
        <p className="mx-auto max-w-md text-ink-soft">
          Hands-on lessons, guided puzzles, and friendly games — from a child&apos;s
          very first move to confident, clever play.
        </p>
      </section>

      <ul className="space-y-4">
        {MODULES.map((mod) => {
          const activityIds = getModuleActivities(mod).map((a) => a.id);
          const pct = Math.round(moduleProgress(activityIds) * 100);
          const { Glyph, tone } = moduleEmblem(mod);
          return (
            <li key={mod.id}>
              <Link href={`/modules/${mod.id}`} className="block">
                <Card interactive className="flex items-center gap-4 p-5">
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
                    style={{ backgroundColor: `var(--color-${tone})`, opacity: 1 }}
                  >
                    <span className="text-[#fffdf7]">
                      <Glyph className="h-7 w-7" />
                    </span>
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h2 className="font-display text-xl font-semibold tracking-tight text-walnut-deep">
                        {mod.title}
                      </h2>
                      <LevelChip module={mod} />
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-sm text-ink-soft">
                      {mod.description}
                    </p>
                    <ProgressBar
                      pct={pct}
                      tone={mod.kidMode ? "kid" : "sage"}
                      showLabel
                      className="mt-3"
                    />
                  </div>

                  <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
