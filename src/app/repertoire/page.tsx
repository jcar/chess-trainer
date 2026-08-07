"use client";

// The Repertoire Lab home: your repertoire as a position-keyed tree, plus the
// entry points to drilling and health. Static client route (no params) —
// prerenders fine under output: export.

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";
import { ChevronRightIcon } from "@/components/icons";
import { RepertoireTree } from "@/components/repertoire/RepertoireTree";
import { useRepertoire, pickTree } from "@/lib/repertoire/useRepertoire";
import { hasRepertoire } from "@/lib/repertoire/store";
import { repertoireCounts } from "@/lib/repertoire/mastery";
import { transpositions } from "@/lib/repertoire/tree";
import type { Orientation } from "@/content/types";

export default function RepertoirePage() {
  const { data, trees, srs } = useRepertoire();
  const [color, setColor] = useState<Orientation>("white");
  // Date.now() is impure in render; capture once at mount like /placement does.
  const [now] = useState(() => Date.now());

  if (!hasRepertoire(data)) {
    return (
      <main className="space-y-6">
        <PageHeader
          backHref="/"
          backLabel="Home"
          eyebrow="Repertoire Lab"
          title="Your openings, by position"
          subtitle="Most opening training drills lines from move 1. Real games only ever hand you a position — so this trains positions, spots transpositions, and shows you where your repertoire runs out."
        />
        <Card className="space-y-4 p-5">
          <p className="text-sm text-ink-soft">
            Start by choosing a repertoire for both colours. Five questions, and
            you can swap anything you already have opinions about.
          </p>
          <Link href="/repertoire/choose" className={buttonClasses("primary", "lg")}>
            Build my repertoire <ChevronRightIcon className="h-5 w-5" />
          </Link>
          <p className="text-sm text-ink-soft">
            Prefer to browse first?{" "}
            <Link href="/trainer" className="text-primary-strong underline">
              See all 31 openings
            </Link>
            .
          </p>
        </Card>
      </main>
    );
  }

  const counts = repertoireCounts(trees, data, srs, now);
  const tree = pickTree(trees, color);
  const transCount = transpositions(tree).length;
  const ids = color === "white" ? data.white : data.black;

  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/"
        backLabel="Home"
        eyebrow="Repertoire Lab"
        title="Your repertoire"
        subtitle={`${counts.total} positions you're responsible for — ${counts.known} known cold, ${counts.due} due for review.`}
        right={
          <Link href="/repertoire/choose" className={buttonClasses("ghost", "md")}>
            Rebuild
          </Link>
        }
      />

      <div className="flex flex-wrap gap-3">
        <Link href="/repertoire/drill" className={buttonClasses("primary", "lg")}>
          {counts.due > 0 ? `Drill — ${counts.due} due` : "Drill positions"}
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
        <Link href="/repertoire/health" className={buttonClasses("secondary", "lg")}>
          Health
        </Link>
        <Link href="/repertoire/print" className={buttonClasses("secondary", "lg")}>
          Print sheet
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(["white", "black"] as Orientation[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            className={buttonClasses(color === c ? "accent" : "ghost", "md")}
          >
            As {c === "white" ? "White" : "Black"}
          </button>
        ))}
        <span className="ml-auto flex flex-wrap gap-2">
          <Chip tone="sage">{counts.known} known</Chip>
          <Chip tone="primary">{counts.learning} learning</Chip>
          <Chip tone="neutral">{counts.fresh} new</Chip>
          {transCount > 0 && <Chip tone="primary">↩ {transCount} transpositions</Chip>}
        </span>
      </div>

      {ids.length === 0 ? (
        <Card className="p-5 text-sm text-ink-soft">
          You haven&apos;t picked anything for this colour yet —{" "}
          <Link href="/repertoire/choose" className="text-primary-strong underline">
            run the Chooser
          </Link>
          .
        </Card>
      ) : (
        <RepertoireTree tree={tree} color={color} choices={data.choices} srs={srs} />
      )}
    </main>
  );
}
