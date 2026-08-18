import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import MobileBottomNav from "@/components/MobileBottomNav";

export const metadata: Metadata = {
  title: "CircularChain — Autonomous Circular Economy & Carbon Ledger Protocol",
  description: "Enterprise circular economy marketplace powered by autonomous multi-agent AI, real-time MCX commodity oracles, CPCB EPR compliance automation, and Polygon Amoy on-chain verification.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark overflow-x-hidden" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased selection:bg-emerald-500/20 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100 overflow-x-hidden pb-16 lg:pb-0" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <MobileBottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
