import Link from "next/link";

// The Chess Trainer wordmark: a small knight mark in an accent-ringed primary
// badge, next to the name set in the bold display grotesk. Links home.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Chess Trainer — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary shadow-soft ring-1 ring-accent/40 transition group-active:scale-95">
        <KnightMark className="h-5 w-5 text-on-accent" />
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-primary-strong">
        Chess <span className="text-accent">Trainer</span>
      </span>
    </Link>
  );
}

// A compact, friendly knight silhouette (original mark).
function KnightMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M9.2 3.1c-.5.3-.7.9-.9 1.6-.6.2-1.4.6-2 1.4C5.1 7.5 4.6 9.2 4.6 11c0 .5.3.9.8 1l1.7.5c.3.1.6 0 .8-.2l.9-1c.3-.3.8-.3 1 .1.2.3.1.6-.1.9-.9 1-2.2 2-3.4 3.2-.9.9-1.5 1.9-1.7 3.1-.1.5.3 1 .8 1h10.6c.4 0 .8-.3.8-.8 0-3.2-.5-5.9-1.6-8.2-1-2.2-2.5-4-4.4-5.4.2-.5.2-1 0-1.5-.3-.7-1-1.1-1.7-1.1-.4 0-.8.1-1.1.3-.2-.2-.5-.3-.8-.3-.3 0-.6.1-.9.3z" />
      <rect x="6.4" y="20.2" width="11.2" height="1.9" rx=".9" />
    </svg>
  );
}
