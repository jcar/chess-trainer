// Shareable repertoires.
//
// A repertoire is only curated opening ids plus a resolved-choices map, so it
// fits in a URL — no backend, which matters because the app is a fully static
// export. Someone opens your link, sees your repertoire, and can adopt it.

import type { RepertoireData } from "./store";

/** The wire format. Short keys because this ends up in a query string. */
interface Wire {
  w: string[];
  b: string[];
  /** Choices as [nodeKey, san] pairs. */
  c: [string, string][];
}

function toBase64Url(s: string): string {
  const b64 =
    typeof window === "undefined"
      ? Buffer.from(s, "utf8").toString("base64")
      : window.btoa(unescape(encodeURIComponent(s)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  return typeof window === "undefined"
    ? Buffer.from(b64, "base64").toString("utf8")
    : decodeURIComponent(escape(window.atob(b64)));
}

export function encodeRepertoire(data: RepertoireData): string {
  const wire: Wire = {
    w: data.white,
    b: data.black,
    c: Object.entries(data.choices),
  };
  return toBase64Url(JSON.stringify(wire));
}

export function decodeRepertoire(
  token: string,
): Pick<RepertoireData, "white" | "black" | "choices"> | null {
  try {
    const wire = JSON.parse(fromBase64Url(token)) as Partial<Wire>;
    if (!Array.isArray(wire.w) || !Array.isArray(wire.b)) return null;
    const choices: Record<string, string> = {};
    for (const pair of wire.c ?? []) {
      if (Array.isArray(pair) && typeof pair[0] === "string" && typeof pair[1] === "string") {
        choices[pair[0]] = pair[1];
      }
    }
    return {
      white: wire.w.filter((x): x is string => typeof x === "string"),
      black: wire.b.filter((x): x is string => typeof x === "string"),
      choices,
    };
  } catch {
    return null;
  }
}

/**
 * The absolute URL for a shared repertoire. Built by hand, so it needs the base
 * path applied explicitly — Next only prefixes <Link>, fonts and static imports.
 */
export function shareUrl(data: RepertoireData, origin: string, basePath: string): string {
  const prefix = basePath.replace(/\/$/, "");
  return `${origin}${prefix}/repertoire/?r=${encodeRepertoire(data)}`;
}
