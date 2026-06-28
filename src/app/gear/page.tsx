// Chess Gear Guide — a curated, on-brand page of recommended sets, boards, and
// books. A no-params static route; a plain server component (no hooks needed,
// satisfies output: export). Monetized with Amazon Associates affiliate links
// (see gear-data.ts). External https links are NOT run through withBasePath —
// that's only for internal, app-root-relative absolute strings.

import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import { GEAR_CATEGORIES, amazonLink } from "./gear-data";

export const metadata: Metadata = {
  title: "Gear Guide",
  description: "Our favorite chess sets, boards, and books — hand-picked for new and growing players.",
};

export default function GearGuidePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        backHref="/"
        backLabel="Home"
        eyebrow="Recommended"
        title="Chess Gear Guide"
        subtitle="A few things we genuinely love — to take your chess off the screen and onto a real board."
      />

      {/* Affiliate disclosure (FTC) — clear and up front. */}
      <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
        Chess Hall is free, and we&apos;d like to keep it that way. Some links below are
        affiliate links: if you buy through them, we may earn a small commission at
        no extra cost to you. It helps keep the Hall open — thank you.
      </p>

      {GEAR_CATEGORIES.map((cat) => (
        <section key={cat.title} className="space-y-3">
          <h2 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
            {cat.title}
            <span className="h-px flex-1 bg-line" />
          </h2>
          <p className="-mt-1 text-sm text-ink-soft">{cat.blurb}</p>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {cat.items.map((item) => {
              const live = item.asin !== "TODO";
              return (
                <Card key={item.name} className="flex h-full flex-col gap-2 p-5">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {item.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{item.why}</p>
                  <div className="mt-auto pt-2">
                    {live ? (
                      <a
                        href={amazonLink(item.asin)}
                        target="_blank"
                        rel="noopener noreferrer sponsored nofollow"
                        className={buttonClasses("accent", "md")}
                      >
                        View on Amazon
                      </a>
                    ) : (
                      <span className="text-xs font-medium uppercase tracking-wider text-ink-soft/70">
                        Pick coming soon
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
