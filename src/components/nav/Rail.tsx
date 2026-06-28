"use client";

// The crest rail — the app's primary navigation. You move between ROOMS, not
// pages. On tablet/desktop it's a slim vertical rail down the left edge; on phone
// it collapses to a bottom dock. Replaces the old top navbar.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/brand/Wordmark";
import { SettingsMenu } from "@/components/nav/SettingsMenu";
import { PuzzleIcon, OpeningDrillIcon, PlayIcon, CrownGlyph, ArcadeIcon } from "@/components/icons";

type Item = {
  href: string;
  label: string;
  Icon: (p: { className?: string }) => React.ReactNode;
  exact?: boolean;
};

// A 2×2 board glyph for "the Hall" (home).
function HallGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="1.2" />
      <rect x="13" y="3" width="8" height="8" rx="1.2" opacity=".45" />
      <rect x="3" y="13" width="8" height="8" rx="1.2" opacity=".45" />
      <rect x="13" y="13" width="8" height="8" rx="1.2" />
    </svg>
  );
}

const NAV: Item[] = [
  { href: "/", label: "Hall", Icon: HallGlyph, exact: true },
  { href: "/arcade", label: "Arcade", Icon: ArcadeIcon },
  { href: "/tactics", label: "Tactics", Icon: PuzzleIcon },
  { href: "/trainer", label: "Openings", Icon: OpeningDrillIcon },
  { href: "/play", label: "Play", Icon: PlayIcon },
  { href: "/endgames", label: "Endgames", Icon: CrownGlyph },
];

function active(pathname: string, item: Item): boolean {
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}

export function Rail() {
  const pathname = usePathname() || "/";
  const items = NAV.map((it) => ({ ...it, on: active(pathname, it) }));

  return (
    <>
      {/* Tablet / desktop: vertical crest rail */}
      <aside className="sticky top-0 z-30 hidden h-dvh w-[74px] shrink-0 flex-col items-center gap-1 border-r border-line bg-[var(--rail)] py-3.5 pl-[env(safe-area-inset-left)] sm:flex">
        <Wordmark compact />
        <nav className="mt-4 flex flex-col items-center gap-2">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              title={it.label}
              aria-label={it.label}
              aria-current={it.on ? "page" : undefined}
              className={`group relative grid h-12 w-12 place-items-center rounded-xl transition ${
                it.on
                  ? "bg-primary/12 text-primary-strong"
                  : "text-ink-soft hover:bg-line/50 hover:text-ink"
              }`}
            >
              {it.on && (
                <span className="absolute -left-3 top-2.5 bottom-2.5 w-[3px] rounded-full bg-primary" />
              )}
              <it.Icon className="h-[22px] w-[22px]" />
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <SettingsMenu />
        </div>
      </aside>

      {/* Phone: bottom dock */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-line bg-[var(--rail)]/95 px-1.5 pb-[max(env(safe-area-inset-bottom),0.4rem)] pt-1.5 backdrop-blur sm:hidden">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            aria-label={it.label}
            aria-current={it.on ? "page" : undefined}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1 transition ${
              it.on ? "text-primary-strong" : "text-ink-soft"
            }`}
          >
            <it.Icon className="h-[21px] w-[21px]" />
            <span className="text-[10px] font-semibold tracking-tight">{it.label}</span>
          </Link>
        ))}
        <SettingsMenu variant="dock" />
      </nav>
    </>
  );
}
