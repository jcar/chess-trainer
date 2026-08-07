"use client";

// Repertoire health: what's covered, how deep you go cold, what you keep
// missing, and where the book runs out. Static client route.

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import {
  SlotCoverageList,
  DepthBars,
  WeakNodeList,
  GapList,
} from "@/components/repertoire/HealthWidgets";
import { useRepertoire } from "@/lib/repertoire/useRepertoire";
import { hasRepertoire } from "@/lib/repertoire/store";
import { slotCoverage } from "@/lib/repertoire/coverage";
import { weakestNodes } from "@/lib/repertoire/mastery";
import { findGaps, hasReplyData } from "@/lib/repertoire/gaps";
import { sharedPositions, transpositions } from "@/lib/repertoire/tree";

export default function RepertoireHealthPage() {
  const { data, trees, srs, store } = useRepertoire();
  const [copied, setCopied] = useState(false);

  if (!hasRepertoire(data)) {
    return (
      <main className="space-y-6">
        <PageHeader backHref="/repertoire" backLabel="Repertoire" title="No repertoire yet" />
        <Card className="space-y-4 p-5">
          <Link href="/repertoire/choose" className={buttonClasses("primary", "lg")}>
            Build my repertoire
          </Link>
        </Card>
      </main>
    );
  }

  const coverage = slotCoverage(trees, data, srs);
  const weak = weakestNodes(trees, data, srs, 8);
  const gaps = hasReplyData() ? findGaps(trees, data) : [];
  const shared = [
    ...sharedPositions(trees.white),
    ...sharedPositions(trees.black),
  ].filter((n) => n.minPly <= 10);
  const trans = [
    ...transpositions(trees.white),
    ...transpositions(trees.black),
  ];

  async function share() {
    const { shareUrl } = await import("@/lib/repertoire/share");
    const { BASE_PATH } = await import("@/lib/basePath");
    const url = shareUrl(data, window.location.origin, BASE_PATH);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copy your repertoire link:", url);
    }
  }

  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/repertoire"
        backLabel="Repertoire"
        eyebrow="Health"
        title="Where your repertoire stands"
        subtitle="Four things worth acting on. Everything else is a number that moves without telling you to do anything."
      />

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={share} className={buttonClasses("secondary", "md")}>
          {copied ? "Link copied" : "Share this repertoire"}
        </button>
        <Link href="/repertoire/print" className={buttonClasses("secondary", "md")}>
          Print sheet
        </Link>
      </div>

      <SlotCoverageList rows={coverage} />
      <DepthBars rows={coverage} />
      <WeakNodeList rows={weak} />
      <GapList gaps={gaps} onDismiss={(key) => store.suppressGap(key)} />

      {!hasReplyData() && (
        <Card className="p-4 text-sm text-ink-soft">
          Gap detection needs the precomputed engine replies — run{" "}
          <code className="font-mono text-xs">npx tsx scripts/build-repertoire-replies.ts</code>.
        </Card>
      )}

      {trans.length > 0 && (
        <Card className="space-y-3 p-5">
          <h2 className="font-display text-lg font-semibold text-ink">
            Positions you reach two ways
          </h2>
          <p className="text-sm text-ink-soft">
            Move-order twins in your repertoire — worth knowing you already
            understand the position when it arrives by the other route.
          </p>
          <ul className="space-y-2">
            {trans.slice(0, 6).map((n) => (
              <li key={n.key} className="rounded-xl bg-surface p-3">
                {n.paths.slice(0, 2).map((p, i) => (
                  <p key={i} className="font-mono text-xs text-ink-soft">
                    {p.join(" ")}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {shared.length > 0 && (
        <Card className="space-y-2 p-5">
          <h2 className="font-display text-lg font-semibold text-ink">
            Shared positions
          </h2>
          <p className="text-sm text-ink-soft">
            {shared.length} early positions appear in more than one of your
            openings — the overlap is why the repertoire is smaller to learn than
            it looks.
          </p>
        </Card>
      )}
    </main>
  );
}
