"use client";

// Openings Trainer catalog — pick an opening; each opens its own route
// (/trainer/<id>) so Back returns to the catalog. Fully static (embedded data).

import { PageHeader } from "@/components/ui/PageHeader";
import { OpeningCatalog } from "@/components/trainer/OpeningCatalog";

export default function TrainerPage() {
  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/"
        backLabel="Home"
        eyebrow="Trainer"
        title="Openings Trainer"
        subtitle="Pick an opening and drill it line by line until it's second nature."
      />
      <OpeningCatalog />
    </main>
  );
}
