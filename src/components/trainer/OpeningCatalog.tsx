"use client";

// The Openings Trainer catalog: search across every opening, with a curated
// "Start here" section of Core picks followed by the full catalog in refined
// sections (the large 1.d4 family is split into themed groups). Each tile links
// to that opening's page and shows per-opening mastery as a ring.

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Opening } from "@/content/openings/types";
import type { SrsData } from "@/lib/srs/store";
import { allOpenings, masteryCounts } from "@/lib/trainer/lines";
import { CATALOG_SECTIONS, coreOpenings, matchesQuery } from "@/lib/trainer/catalog";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ChevronRightIcon, SearchIcon, StarIcon } from "@/components/icons";
import { MasteryRing } from "./MasteryRing";
import { OpeningSummary } from "./OpeningSummary";

export function OpeningCatalog() {
  const { srs } = useTrainer();
  const [query, setQuery] = useState("");
  const all = allOpenings();
  const results = useMemo(
    () => (query.trim() ? all.filter((o) => matchesQuery(o, query)) : null),
    [all, query],
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search openings — name, moves, or nickname…"
          aria-label="Search openings"
          className="w-full rounded-2xl border border-line bg-card py-3 pl-10 pr-10 text-sm text-ink shadow-soft outline-none transition focus-visible:ring-2 focus-visible:ring-accent/50"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-ink-soft transition hover:bg-ink/5 hover:text-ink"
          >
            ✕
          </button>
        )}
      </div>

      {results ? (
        results.length ? (
          <Section
            label={`${results.length} ${results.length === 1 ? "result" : "results"}`}
          >
            {results.map((o) => (
              <OpeningTile key={o.id} opening={o} srs={srs} />
            ))}
          </Section>
        ) : (
          <Card className="p-6 text-center text-ink-soft">
            No openings match “{query.trim()}”.
          </Card>
        )
      ) : (
        <>
          <Section label="Start here" hint="Recommended openings to learn first">
            {coreOpenings().map((o) => (
              <OpeningTile key={o.id} opening={o} srs={srs} />
            ))}
          </Section>

          <p className="border-t border-line pt-5 text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
            Browse all openings
          </p>

          {CATALOG_SECTIONS.map((sec) => {
            const list = all.filter(sec.match);
            if (!list.length) return null;
            return (
              <Section key={sec.label} label={sec.label}>
                {list.map((o) => (
                  <OpeningTile key={o.id} opening={o} srs={srs} />
                ))}
              </Section>
            );
          })}
        </>
      )}
    </div>
  );
}

function Section({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          {label}
        </h2>
        {hint && <p className="text-xs text-ink-soft">{hint}</p>}
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function OpeningTile({ opening: o, srs }: { opening: Opening; srs: SrsData }) {
  const c = masteryCounts(srs, [o.id]);
  return (
    <Card className="overflow-hidden">
      <Link
        href={`/trainer/${o.id}`}
        className="flex items-center gap-3 px-4 py-3 transition hover:bg-ink/5"
      >
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            {o.tier === "core" && (
              <StarIcon className="h-3.5 w-3.5 shrink-0 text-sage" />
            )}
            <span className="truncate font-semibold text-primary-strong">
              {o.name}
            </span>
          </span>
          <span className="block truncate font-mono text-xs text-ink-soft">
            {o.firstMoves}
          </span>
        </span>
        <Chip tone="neutral">
          {o.trainerColor === "white" ? "White" : "Black"}
        </Chip>
        <MasteryRing mastered={c.mastered} total={c.total} />
        <ChevronRightIcon className="h-4 w-4 shrink-0 text-ink-soft" />
      </Link>
      <OpeningSummary opening={o} triggerLabel="Strategy" embedded />
    </Card>
  );
}
