"use client";

// The Repertoire Lab drill session. Static client route — prerenders fine under
// output: export.

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import { DrillSession } from "@/components/repertoire/DrillSession";
import { useRepertoire } from "@/lib/repertoire/useRepertoire";
import { hasRepertoire } from "@/lib/repertoire/store";
import { buildDrillSession } from "@/lib/repertoire/drills";

export default function RepertoireDrillPage() {
  const { data, trees, srs } = useRepertoire();
  // Captured once at mount: Date.now() in render is impure (react-hooks/purity),
  // and a session should be a stable snapshot anyway.
  const [now] = useState(() => Date.now());
  const [seed] = useState(() => String(Date.now()));

  if (!hasRepertoire(data)) {
    return (
      <main className="space-y-6">
        <PageHeader
          backHref="/repertoire"
          backLabel="Repertoire"
          title="No repertoire yet"
        />
        <Card className="space-y-4 p-5">
          <p className="text-sm text-ink-soft">
            Choose your openings first — the drills work from the positions your
            repertoire actually reaches.
          </p>
          <Link href="/repertoire/choose" className={buttonClasses("primary", "lg")}>
            Build my repertoire
          </Link>
        </Card>
      </main>
    );
  }

  const items = buildDrillSession(trees, data, srs, now, seed);

  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/repertoire"
        backLabel="Repertoire"
        eyebrow="Drill"
        title="Positions, not lines"
        subtitle="Each one comes cold — sometimes by a move order you didn't learn it in."
      />
      <DrillSession items={items} />
    </main>
  );
}
