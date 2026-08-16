import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "CircularChain — Autonomous Circular Economy & Carbon Ledger Protocol",
  description: "Enterprise circular economy marketplace powered by autonomous multi-agent AI, real-time MCX commodity oracles, CPCB EPR compliance automation, and Polygon Amoy on-chain verification.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased selection:bg-cyan-500/30 selection:text-cyan-200" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
