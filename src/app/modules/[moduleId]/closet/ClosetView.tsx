"use client";

// Pip's Closet: spend your stars and belts on board themes and Pip outfits.
// Unlocked items can be chosen (saved to kids prefs); locked items show how to
// earn them. Everything is derived — choosing just updates the prefs store.

import { notFound } from "next/navigation";
import { getModule } from "@/content";
import { useProgress } from "@/lib/progress/useProgress";
import { selectBelt } from "@/lib/kids/belts";
import {
  BOARD_THEMES,
  PIP_OUTFITS,
  type CosmeticCtx,
} from "@/lib/kids/cosmetics";
import { useKidsPrefs, setKidsPrefs } from "@/lib/kids/prefs";
import { PipMascot } from "@/components/kids/PipMascot";
import { PageHeader } from "@/components/ui/PageHeader";
import { LockIcon, CheckIcon } from "@/components/icons";

export function ClosetView({ moduleId }: { moduleId: string }) {
  const mod = getModule(moduleId);
  const { snapshot, totalStarsKid } = useProgress();
  const prefs = useKidsPrefs();

  if (!mod || !mod.kidMode) notFound();

  const data = snapshot();
  const allIds = mod.lessons.flatMap((l) => l.activities.map((a) => a.id));
  const ctx: CosmeticCtx = {
    totalStars: totalStarsKid(allIds),
    beltIndex: selectBelt(data).index,
  };

  return (
    <main className="space-y-7">
      <PageHeader
        backHref={`/modules/${mod.id}`}
        backLabel="Back to the journey"
        title="Pip's Closet"
        subtitle={`You have ${ctx.totalStars} stars to spend. Earn more to unlock new looks!`}
      />

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          Board themes
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {BOARD_THEMES.map((t) => {
            const unlocked = t.unlock(ctx);
            const chosen = prefs.boardThemeId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                disabled={!unlocked}
                onClick={() => setKidsPrefs({ boardThemeId: t.id })}
                className={`flex flex-col items-center gap-2 rounded-2xl border-4 p-3 text-center transition active:scale-[0.98] ${
                  chosen
                    ? "border-sage bg-sage/10"
                    : unlocked
                      ? "border-line bg-card hover:border-kid-teal/50"
                      : "border-dashed border-line bg-surface"
                }`}
              >
                {/* mini board swatch */}
                <span className="grid grid-cols-4 overflow-hidden rounded-lg" aria-hidden>
                  {Array.from({ length: 16 }, (_, i) => {
                    const darkSq = (Math.floor(i / 4) + i) % 2 === 1;
                    return (
                      <span
                        key={i}
                        className="h-5 w-5"
                        style={{ backgroundColor: darkSq ? t.dark : t.light }}
                      />
                    );
                  })}
                </span>
                <span className="text-sm font-bold text-primary-strong">{t.name}</span>
                {chosen ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-sage">
                    <CheckIcon className="h-4 w-4" /> Wearing
                  </span>
                ) : unlocked ? (
                  <span className="text-xs font-semibold text-kid-teal">Choose</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-ink-soft/70">
                    <LockIcon className="h-3.5 w-3.5" /> {t.req}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          Pip&apos;s outfits
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PIP_OUTFITS.map((o) => {
            const unlocked = o.unlock(ctx);
            const chosen = prefs.pipOutfitId === o.id;
            return (
              <button
                key={o.id}
                type="button"
                disabled={!unlocked}
                onClick={() => setKidsPrefs({ pipOutfitId: o.id })}
                className={`flex flex-col items-center gap-1.5 rounded-2xl border-4 p-3 text-center transition active:scale-[0.98] ${
                  chosen
                    ? "border-sage bg-sage/10"
                    : unlocked
                      ? "border-line bg-card hover:border-kid-teal/50"
                      : "border-dashed border-line bg-surface"
                }`}
              >
                <span className="grid h-16 w-16 place-items-center">
                  {/* preview the accessory above a small head */}
                  <span className="text-3xl" aria-hidden>
                    {o.accessory || "🙂"}
                  </span>
                </span>
                <span className="text-sm font-bold text-primary-strong">{o.name}</span>
                {chosen ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-sage">
                    <CheckIcon className="h-4 w-4" /> Wearing
                  </span>
                ) : unlocked ? (
                  <span className="text-xs font-semibold text-kid-teal">Choose</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-ink-soft/70">
                    <LockIcon className="h-3.5 w-3.5" /> {o.req}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex justify-center pt-2">
          <PipMascot mood="cheer" size={84} says="How do I look?" />
        </div>
      </section>
    </main>
  );
}
