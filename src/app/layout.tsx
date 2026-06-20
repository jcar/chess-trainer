import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress/useProgress";
import { withBasePath } from "@/lib/basePath";
import { Wordmark } from "@/components/brand/Wordmark";

// UI / body
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display / titles — warm serif. Limit weights for a lean static export.
const fraunces = Fraunces({
  variable: "--font-fraunces",
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
  appleWebApp: { capable: true, title: "Chess Trainer", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#faf5ec",
  width: "device-width",
  initialScale: 1,
  // Allow the board to use full width without accidental zoom on double-tap.
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-ink">
        <ProgressProvider>
          <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4 pb-[max(env(safe-area-inset-bottom),1.5rem)]">
            <header className="flex items-center justify-center py-4">
              <Wordmark />
            </header>
            <div className="flex-1 pb-8">{children}</div>
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
