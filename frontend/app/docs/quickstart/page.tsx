"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  NotebookSpiralBinding,
  PaperclipElement,
  WashiTapeCenter,
  WashiTapeCorner,
  DoodleUnderline,
  DoodleStar,
  DoodleDatabase,
  DoodleCloud,
  DoodleLock,
  DoodleChip,
  DoodleShield,
  DoodleScale,
  StampBadge,
  DoodleCircle,
} from "@/components/SketchElements";
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
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      <div className="notebook-doc-scope flex-1 flex flex-col">

      {/* Header Banner */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        <WashiTapeCenter color="yellow" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-0 md:border-l-2 border-red-300/60 dark:border-red-500/30 pl-0 md:pl-8 ml-0 md:ml-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Manual</span>
            </Link>
            <StampBadge label="3-MINUTE ONBOARDING" variant="emerald" />
            <StampBadge label="3 PARTICIPANT ROLES" variant="amber" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Participant & <span className="highlight-yellow px-2">Developer Quickstart</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Get up and running with CircularChain in less than 3 minutes as an informal scrap aggregator, an institutional enterprise buyer, or a Web3 dApp developer.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1 relative overflow-x-clip">
        <NotebookSpiralBinding count={14} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pl-0 md:pl-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-12 border-l-0 md:border-l-2 border-red-300/50 dark:border-red-500/20 pl-0 md:pl-6">
            
            {/* ROLE 1: Informal Aggregator (Kabadiwala) */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  Path 01 // Grassroots Scrap Aggregator (Kabadiwala)
                </span>
                <StampBadge label="ZERO TYPING REQUIRED" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                How to List Scrap via Voice & Camera in 30 Seconds
              </h2>

              <p className="font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                You do not need to read English, know technical jargon, or fill out web forms. The CircularChain Mobile Collector APK works completely offline with regional Indic voice AI:
              </p>

              {/* 3 Steps Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sketch">
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] space-y-1.5">
                  <span className="text-xs font-bold text-emerald-600 block uppercase">Step 1</span>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Snap 2-Sec Photo</h4>
                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-300">
                    Agent 01 scans surface texture, detects contamination, and assigns ISO 9001 purity grade.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] space-y-1.5">
                  <span className="text-xs font-bold text-amber-600 block uppercase">Step 2</span>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Speak in Hindi/Tamil</h4>
                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-300">
                    Press mic and say: <em>"Bhaiya 400 kilo aluminum scrap hai, Mayapuri depot me."</em>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] space-y-1.5">
                  <span className="text-xs font-bold text-sky-600 block uppercase">Step 3</span>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Receive Instant UPI</h4>
                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-300">
                    Receive 100% fair MCX market value directly into your UPI or bank account on delivery.
                  </p>
                </div>
              </div>

              {/* Download APK Box */}
              <div className="p-4 rounded-2xl bg-amber-200/60 dark:bg-amber-500/10 border-2 border-amber-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <strong className="font-sketch text-base text-zinc-900 dark:text-white block">Download Android Field Collector APK (v2.4)</strong>
                  <span className="font-sans text-xs text-zinc-700 dark:text-zinc-300">Lightweight 3.8 MB package with offline SQLite sync.</span>
                </div>
                <a
                  href="/circularchain.apk"
                  className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-sketch text-xs font-bold shadow-[2px_2px_0px_#10B981] flex items-center gap-1.5 shrink-0"
                >
                  <span>Download APK</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>

            {/* ROLE 2: Enterprise OEM & Smelter */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#F0FDF4] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCenter color="mint" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-emerald-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                  Path 02 // Enterprise OEM & Certified Smelter
                </span>
                <StampBadge label="CPCB EPR COMPLIANCE" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Fulfilling Statutory Quotas & Claiming Avoided Carbon
              </h2>

              <p className="font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                Brand owners and smelting enterprises browse verified scrap listings, place bids, and automatically receive audited CPCB statutory compliance certificates:
              </p>

              <div className="space-y-3 font-sketch text-sm">
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs font-bold font-mono">1</div>
                  <div>
                    <strong className="block text-zinc-900 dark:text-white">Connect Enterprise ERP / Web Dashboard</strong>
                    <span className="font-sans text-xs text-zinc-600 dark:text-zinc-300">Access the verified marketplace portal to view live MCX prices and digital weighbridge lots.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs font-bold font-mono">2</div>
                  <div>
                    <strong className="block text-zinc-900 dark:text-white">Lock Escrow Purchase with Smart Contract</strong>
                    <span className="font-sans text-xs text-zinc-600 dark:text-zinc-300">Funds are held in trustless escrow until digital weighbridge weight and camera contour match specifications.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs font-bold font-mono">3</div>
                  <div>
                    <strong className="block text-zinc-900 dark:text-white">Download Automated CPCB Filing Package</strong>
                    <span className="font-sans text-xs text-zinc-600 dark:text-zinc-300">One-click export of quarterly EPR returns with immutable Polygon Amoy transaction hashes.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ROLE 3: Web3 & Systems Developer */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#EFF6FF] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCorner color="yellow" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-sky-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-sky-800 dark:text-sky-300 tracking-wider">
                  Path 03 // Web3 & Systems Developer API
                </span>
                <StampBadge label="POLYGON AMOY 80002" variant="sky" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Querying Live Commodity & Carbon Math APIs
              </h2>

              <p className="font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                Developers can integrate CircularChain’s deterministic carbon math and MCX price feeds directly into third-party dApps and ERPs:
              </p>

              {/* cURL Code Snippet */}
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 font-sketch text-sm space-y-2 shadow-[3px_3px_0px_rgba(0,0,0,0.85)]">
                <div className="flex items-center justify-between border-b border-dashed border-zinc-300 pb-2">
                  <span className="font-bold text-xs uppercase text-zinc-600 dark:text-zinc-400">cURL Request</span>
                  <button
                    onClick={() => copySnippet("curl -X GET https://circularchain-backend.onrender.com/api/mcx-oracle", "curl-1")}
                    className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    {copiedText === "curl-1" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText === "curl-1" ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <div className="text-emerald-700 dark:text-emerald-300 font-mono text-xs overflow-x-auto py-1">
                  curl -X GET https://circularchain-backend.onrender.com/api/mcx-oracle
                </div>
              </div>
            </section>

            {/* Navigation to Next Chapter */}
            <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/docs/solution-comparison"
                className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Solution Comparison</span>
              </Link>
              <Link
                href="/docs/agents/agent-01"
                className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Next: Agent 01 Optical Vision</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
  );
}
