"use client";

import Link from "next/link";
import { useShowSupport } from "@/lib/prefs/support";

// A slim, quiet site footer rendered below page content on every route. Holds
// the Gear Guide link, the "Support the Hall" donation link, and a one-line
// affiliate disclosure. Kept deliberately understated — it's a side note, not a
// call to action that competes with the learning content. Gated behind the
// "Support links" toggle in Settings (OFF by default).

// The donation page. Owner fills this in (e.g. https://ko-fi.com/yourname).
// External link, so it is NOT run through withBasePath.
const SUPPORT_URL = "https://ko-fi.com/REPLACE";

export function SiteFooter() {
  const show = useShowSupport();
  if (!show) return null;

  return (
    <footer className="mt-12 border-t border-line pt-5 text-center text-sm text-ink-soft">
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <Link href="/gear" className="font-medium transition hover:text-ink">
          Gear Guide
        </Link>
        <span aria-hidden className="text-line">
          ·
        </span>
        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium transition hover:text-ink"
        >
          Support the Hall
        </a>
      </nav>
      <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-ink-soft/70">
        Gear Guide links may be affiliate links — we may earn a small commission at
        no extra cost to you, which helps keep Chess Hall free.
      </p>
    </footer>
  );
}
