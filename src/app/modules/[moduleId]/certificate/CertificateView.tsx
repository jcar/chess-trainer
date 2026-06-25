"use client";

// The certificate route: prompts for a name on first run, then shows the
// printable diploma reflecting the child's belt + stars.

import { notFound } from "next/navigation";
import { getModule } from "@/content";
import { useProgress } from "@/lib/progress/useProgress";
import { selectBelt } from "@/lib/kids/belts";
import { useKidsPrefs } from "@/lib/kids/prefs";
import { useToday } from "@/lib/rewards/daily";
import { PageHeader } from "@/components/ui/PageHeader";
import { buttonClasses } from "@/components/ui/Button";
import { NameGate } from "@/components/kids/NameGate";
import { Certificate } from "@/components/kids/Certificate";

export function CertificateView({ moduleId }: { moduleId: string }) {
  const mod = getModule(moduleId);
  const { snapshot, totalStarsKid } = useProgress();
  const prefs = useKidsPrefs();
  const today = useToday();

  if (!mod || !mod.kidMode) notFound();

  const data = snapshot();
  const allIds = mod.lessons.flatMap((l) => l.activities.map((a) => a.id));
  const stars = totalStarsKid(allIds);
  const belt = selectBelt(data);

  return (
    <main className="space-y-6">
      <div className="print:hidden">
        <PageHeader
          backHref={`/modules/${mod.id}`}
          backLabel="Back to the journey"
          title="Your Certificate"
        />
      </div>

      {!prefs.name ? (
        <NameGate />
      ) : (
        <div className="space-y-5">
          <Certificate
            name={prefs.name}
            stars={stars}
            beltName={belt.earned?.name ?? "White Belt"}
            date={today}
          />
          <div className="flex justify-center print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className={buttonClasses("primary", "lg")}
            >
              Print my certificate
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
