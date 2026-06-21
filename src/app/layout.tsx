import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress/useProgress";
import { withBasePath } from "@/lib/basePath";
import { Wordmark } from "@/components/brand/Wordmark";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// UI / body
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display / titles — bold geometric grotesk (modern, cool-tech).
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Monospace for SAN/notation.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chess Trainer",
  description: "Learn chess through hands-on, guided practice.",
  // Absolute paths in metadata aren't auto-prefixed with basePath, so build them.
  manifest: withBasePath("/manifest.webmanifest"),
  icons: { icon: withBasePath("/icon.svg") },
  appleWebApp: { capable: true, title: "Chess Trainer", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // `cover` makes env(safe-area-inset-*) report real values on notched phones.
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
  ],
};

// Runs before paint: apply the saved theme so there's no flash of the wrong one.
// Dark is the default (the :root variables), so we only need to opt into light.
const NO_FLASH = `try{if(localStorage.getItem('chess-trainer:theme')==='light'){document.documentElement.setAttribute('data-theme','light')}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-ink">
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        <ProgressProvider>
          <div className="mx-auto flex min-h-dvh max-w-2xl flex-col pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[env(safe-area-inset-top)] pb-[max(env(safe-area-inset-bottom),1.25rem)]">
            <header className="flex items-center justify-between py-2.5 sm:py-3">
              <Wordmark />
              <ThemeToggle />
            </header>
            <div className="flex-1 pb-6 sm:pb-8">{children}</div>
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
