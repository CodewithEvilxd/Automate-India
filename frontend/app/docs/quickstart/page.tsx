"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  Rocket,
  Mic,
  Camera,
  ShieldCheck,
  Building2,
  Code2,
  Terminal,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Copy,
  Check,
  Smartphone,
  ExternalLink,
  Zap,
} from "lucide-react";

export default function QuickstartPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-3">
            <Link href="/docs" className="hover:text-emerald-500 transition-colors">
              Docs
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-500">Getting Started</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-emerald-500 font-bold">Quickstart Guide</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Participant & Developer Quickstart
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Get up and running with CircularChain in less than 3 minutes as a scrap aggregator, enterprise recycling buyer, or Web3 developer.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          {/* Detailed Content */}
          <main className="lg:col-span-9 space-y-12">
            {/* Persona 1: Scrap Aggregator */}
            <section className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <Mic className="w-3.5 h-3.5" />
                <span>TRACK 01: SCRAP COLLECTORS & AGGREGATORS</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                How to List Scrap with AI Vision & Indic Voice
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono font-bold text-xs">
                    01
                  </div>
                  <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-white">
                    Speak or Type
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Open <Link href="/list" className="text-emerald-500 font-semibold hover:underline">/list</Link> or the Android App. Tap the microphone and speak in Hindi or English (e.g. <em>"500 kg copper scrap Noida me"</em>).
                  </p>
                </div>

                <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono font-bold text-xs">
                    02
                  </div>
                  <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-white">
                    Visual Purity Scan
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Agent 01 scans your photo to detect surface oxidation, PVC label impurities, and moisture, automatically assigning Grade A+/A.
                  </p>
                </div>

                <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-mono font-bold text-xs">
                    03
                  </div>
                  <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-white">
                    Instant Valuation & Match
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Agent 03 computes live MCX spot value and matches your lot with the nearest verified smelting hub in your transit corridor.
                  </p>
                </div>
              </div>
            </section>

            {/* Persona 2: Enterprise OEM */}
            <section className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-500 dark:text-orange-400 uppercase tracking-widest">
                <Building2 className="w-3.5 h-3.5" />
                <span>TRACK 02: ENTERPRISE RECYCLERS & BRAND OWNERS</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                How to Procure Verified Feedstock & Settle On-Chain
              </h2>

              <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-zinc-500 uppercase font-bold">Step-by-Step Workflow:</span>
                  <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    <li>Connect your Web3 wallet (MetaMask or Coinbase) to the <strong>Polygon Amoy Testnet</strong>.</li>
                    <li>Browse verified industrial lots on <Link href="/marketplace" className="text-orange-500 font-semibold hover:underline">/marketplace</Link>.</li>
                    <li>Inspect the material's AI contamination heatmap, EPA WARM carbon certificate, and MCX price parity.</li>
                    <li>Click <strong>Request Transfer</strong>. Agent 02 mathematically re-audits the lot, Agent 05 runs anomaly checks, and the transaction is immutably settled on-chain.</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Persona 3: Developer API Quickstart */}
            <section className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <Code2 className="w-3.5 h-3.5" />
                <span>TRACK 03: DEVELOPER API INTEGRATION</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Developer API Integration
              </h2>

              <div className="rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 p-6 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold">Quick cURL Test:</span>
                  <button
                    onClick={() =>
                      copySnippet(
                        "curl -X GET https://circularchain-backend.onrender.com/api/mcx-oracle",
                        "quick-curl"
                      )
                    }
                    className="p-1.5 rounded-lg bg-zinc-200 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 flex items-center gap-1 text-[10px]"
                  >
                    {copiedText === "quick-curl" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedText === "quick-curl" ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-zinc-950 text-zinc-200 overflow-x-auto text-[11px]">
                  curl -X GET "https://circularchain-backend.onrender.com/api/mcx-oracle" \
  -H "Accept: application/json"
                </pre>
              </div>
            </section>

            {/* Navigation Footer */}
            <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/docs/solution-comparison"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-zinc-900 dark:text-white font-display text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Linear vs CircularChain</span>
              </Link>

              <Link
                href="/docs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>Back to Whitepaper Overview</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
