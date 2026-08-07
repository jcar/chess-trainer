"use client";

// The Repertoire Chooser: five preference questions -> a coherent two-colour
// repertoire the learner can swap slot-by-slot before committing. Mirrors the
// /placement flow (intro -> quiz -> results, one pure scoring function, one
// store write). Static client route — prerenders fine under output: export.

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CheckIcon, ChevronRightIcon } from "@/components/icons";
import { RepertoirePlanView } from "@/components/repertoire/RepertoirePlanView";
import {
  CHOOSER_ITEMS,
  scoreRepertoire,
  type RepertoirePlan,
} from "@/lib/repertoire/chooser";
import { repertoireStore } from "@/lib/repertoire/store";
import { START_KEY } from "@/lib/repertoire/tree";

const BADGES = ["A", "B", "C", "D"];

export default function RepertoireChooserPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "quiz" | "results">("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [plan, setPlan] = useState<RepertoirePlan | null>(null);

  const total = CHOOSER_ITEMS.length;
  const item = CHOOSER_ITEMS[idx];

  function choose(optionIdx: number) {
    const next = { ...answers, [item.id]: optionIdx };
    setAnswers(next);
    if (idx + 1 < total) {
      setIdx(idx + 1);
    } else {
      setPlan(scoreRepertoire(next));
      setPhase("results");
    }
  }

  function confirm(p: RepertoirePlan) {
    repertoireStore.setRepertoire(p.white, p.black);
    // Commit White's first move as an explicit choice: a repertoire with, say,
    // both the London and the King's Gambit leaves the start position offering
    // two of OUR moves, and the tree must not pick one arbitrarily.
    repertoireStore.setChoice(START_KEY, p.firstMove);
    router.push("/repertoire");
  }

  if (phase === "intro") {
    return (
      <main className="space-y-6">
        <PageHeader
          backHref="/repertoire"
          backLabel="Repertoire"
          eyebrow="Build your repertoire"
          title="Choose your openings"
          subtitle="Five questions about how you like to play. We'll propose a complete repertoire for both colours — and you can swap any choice you already have opinions about."
        />
        <Card className="space-y-4 p-5">
          <ul className="space-y-2 text-sm text-ink-soft">
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-sage" /> No right answers — it&apos;s about your taste.
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-sage" /> Every recommendation is swappable afterwards.
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-sage" /> Be honest about theory — an unlearned repertoire beats nobody.
            </li>
          </ul>
          <button
            type="button"
            onClick={() => setPhase("quiz")}
            className={buttonClasses("primary", "lg")}
          >
            Start <ChevronRightIcon className="h-5 w-5" />
          </button>
        </Card>
      </main>
    );
  }

  if (phase === "results" && plan) {
    return (
      <main className="space-y-6">
        <PageHeader
          eyebrow="Your repertoire"
          title="Here's the plan"
          subtitle="Swap anything that doesn't fit, then lock it in to start drilling."
          backHref="/repertoire"
          backLabel="Repertoire"
        />
        <RepertoirePlanView
          plan={plan}
          onChange={setPlan}
          onConfirm={() => confirm(plan)}
        />
      </main>
    );
  }

  return (
    <main className="space-y-5">
      <div className="flex items-center gap-3">
        <ProgressBar
          pct={Math.round((idx / total) * 100)}
          tone="primary"
          className="min-w-0 flex-1"
        />
        <span className="shrink-0 font-mono text-xs text-ink-soft">
          {idx + 1} / {total}
        </span>
      </div>

      <div className="space-y-1.5">
        <p className="font-display text-lg font-semibold leading-snug text-ink">
          {item.question}
        </p>
        {item.help && <p className="text-sm text-ink-soft">{item.help}</p>}
      </div>

      <div className="space-y-2.5">
        {item.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => choose(i)}
            className="group flex w-full items-start gap-3.5 rounded-xl border border-line bg-card px-4 py-3 text-left transition hover:border-primary/55 hover:bg-primary/[0.05] active:scale-[0.99]"
          >
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/12 text-xs font-extrabold text-primary-strong transition group-hover:bg-primary/20">
              {BADGES[i]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] text-ink">{opt.label}</span>
              {opt.detail && (
                <span className="mt-0.5 block text-sm text-ink-soft">{opt.detail}</span>
              )}
            </span>
          </button>
        ))}
      </div>

      <Link
        href="/repertoire"
        className="inline-block text-sm text-ink-soft transition hover:text-ink"
      >
        Quit
      </Link>
    </main>
  );
}
