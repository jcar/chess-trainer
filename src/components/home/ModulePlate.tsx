"use client";

// A single module "plate" on the home page: crest + progress ring, title,
// description, level chip, and a hover "Enter" affordance. Extracted from the
// home page so the learning-path stage bands can render it without duplicating
// ~40 lines each. `highlighted` draws a soft accent ring on the module the
// "Recommended next" card points at, so the plate and the anchor agree.

import Link from "next/link";
import type { Module } from "@/content/types";
import { getModuleActivities } from "@/content";
import { useProgress } from "@/lib/progress/useProgress";
import { Card } from "@/components/ui/Card";
import { LevelChip } from "@/components/ui/Chip";
import { CHARACTER_IMAGES } from "@/lib/art/portraitManifest";
import { withBasePath } from "@/lib/basePath";
import { ChevronRightIcon, StarIcon, PawnGlyph, CrownGlyph, PuzzleIcon } from "@/components/icons";

/** Crest glyph + color tone per module. */
function moduleEmblem(mod: Module): {
  Glyph: (p: { className?: string }) => React.ReactNode;
  tone: string;
} {
  if (mod.kidMode) return { Glyph: (p) => <StarIcon {...p} />, tone: "kid-teal" };
  if (mod.id === "strategy") return { Glyph: PuzzleIcon, tone: "accent" };
  if (mod.level === "Intermediate") return { Glyph: CrownGlyph, tone: "amber" };
  if (mod.level === "Advanced") return { Glyph: CrownGlyph, tone: "clay" };
  return { Glyph: PawnGlyph, tone: "sage" };
}

/** A thin progress ring (the rank-up indicator on each plate). */
function ProgressRing({ pct, tone }: { pct: number; tone: string }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
  return (
    <span className="relative grid h-11 w-11 shrink-0 place-items-center">
      <svg width="44" height="44" className="-rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" stroke="var(--line)" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke={`var(--color-${tone})`}
          strokeWidth="4"
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset .6s cubic-bezier(.2,.7,.3,1)" }}
        />
      </svg>
      <span className="absolute font-mono text-[10px] font-semibold text-ink-soft">{pct}%</span>
    </span>
  );
}

interface Props {
  module: Module;
  /** Stagger delay for the entrance animation. */
  delayMs?: number;
  /** Draw a "Next" accent ring (the recommended module). */
  highlighted?: boolean;
}

export function ModulePlate({ module: mod, delayMs = 0, highlighted = false }: Props) {
  const { moduleProgress } = useProgress();
  const pct = Math.round(moduleProgress(getModuleActivities(mod).map((a) => a.id)) * 100);
  const { Glyph, tone } = moduleEmblem(mod);

  return (
    <Link
      href={`/modules/${mod.id}`}
      className="group block rise"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <Card
        interactive
        className={`relative flex h-full flex-col gap-3 overflow-hidden p-5 ${
          highlighted ? "ring-2 ring-accent" : ""
        }`}
      >
        <span className="plate-motif" aria-hidden />
        {highlighted && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-on-accent">
            Next
          </span>
        )}
        <div className="flex items-start justify-between gap-3">
          {mod.kidMode && CHARACTER_IMAGES.pip ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={withBasePath(`/images/characters/${CHARACTER_IMAGES.pip}`)}
              alt=""
              aria-hidden
              className="h-12 w-12 shrink-0 rounded-2xl object-cover shadow-soft ring-2 ring-white/70"
            />
          ) : (
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-on-accent shadow-soft"
              style={{ backgroundColor: `var(--color-${tone})` }}
            >
              <Glyph className="h-7 w-7" />
            </span>
          )}
          <ProgressRing pct={pct} tone={tone} />
        </div>
        <div className="relative">
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
            {mod.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{mod.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-1">
          <LevelChip module={mod} />
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-strong opacity-0 transition group-hover:opacity-100">
            Enter <ChevronRightIcon className="h-4 w-4" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
