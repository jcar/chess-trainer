import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress/useProgress";
import { withBasePath } from "@/lib/basePath";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chess Trainer",
  description: "Learn chess through hands-on, module-based practice.",
  // Absolute paths in metadata aren't auto-prefixed with basePath, so build them.
  manifest: withBasePath("/manifest.webmanifest"),
  icons: { icon: withBasePath("/icon.svg") },
  appleWebApp: { capable: true, title: "Chess Trainer", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#059669",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-neutral-100 text-neutral-900">
        <ProgressProvider>
          <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4 pb-[env(safe-area-inset-bottom)] pt-6">
            {children}
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
