import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CircularChain — AI-Verified Circular Economy Ledger",
  description: "An industrial circular economy marketplace with AI vision verification, deterministic EPA WARM carbon accounting, and public Polygon Amoy ledger verification.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col bg-[#10140F] text-[#EDEAE0] antialiased selection:bg-[#4E9B6F]/30 selection:text-[#EDEAE0]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
