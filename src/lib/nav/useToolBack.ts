"use client";

// In-tool "back/quit" handler. Mirrors the browser Back (pops the sub-route so you
// return to the lobby/catalog), but falls back to navigating to `baseHref` when
// there's no in-app history to pop (deep link / refresh) so it never strands you.

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useToolBack(baseHref: string): () => void {
  const router = useRouter();
  return useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push(baseHref);
  }, [router, baseHref]);
}
