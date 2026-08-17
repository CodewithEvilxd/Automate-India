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
  StampBadge,
  DoodleCircle,
} from "@/components/SketchElements";
import {
  Code2,
  ArrowLeft,
  ChevronRight,
  Copy,
  Check,
  Play,
  Terminal,
} from "lucide-react";

export default function ApiDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        <WashiTapeCenter color="mint" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-2 border-red-300/60 dark:border-red-500/30 pl-4 sm:pl-8 ml-1 sm:ml-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Manual</span>
            </Link>
            <StampBadge label="LIVE REST API" variant="emerald" />
            <StampBadge label="OPENAPI SPEC" variant="amber" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Interactive <span className="highlight-emerald px-2">REST API Reference</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Directly test live endpoints for MCX price discovery, EPA WARM life-cycle calculation, and on-chain transfer verification.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 relative">
        <NotebookSpiralBinding count={12} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pl-4 sm:pl-8">
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          <main className="lg:col-span-9 space-y-12 border-l-2 border-red-300/50 dark:border-red-500/20 pl-4 sm:pl-6">
            
            {/* Endpoint 1: MCX Oracle */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-4">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                  GET /api/mcx-oracle
                </span>
                <StampBadge label="PUBLIC ENDPOINT" variant="emerald" />
              </div>

              <h3 className="font-sketch text-xl font-bold text-zinc-900 dark:text-white">
                1. Fetch Real-Time MCX Commodity Spot Prices
              </h3>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 font-sketch text-xs space-y-2 shadow-[2px_2px_0px_rgba(0,0,0,0.85)]">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-mono">cURL Query</span>
                  <button
                    onClick={() => copyCode("curl -X GET https://circularchain-backend.onrender.com/api/mcx-oracle", "api-1")}
                    className="flex items-center gap-1 font-mono font-bold text-emerald-700 dark:text-emerald-400"
                  >
                    {copiedId === "api-1" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === "api-1" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="text-emerald-800 dark:text-emerald-300 font-mono overflow-x-auto py-1">
                  curl -X GET https://circularchain-backend.onrender.com/api/mcx-oracle
                </div>
              </div>
            </section>

            {/* Endpoint 2: CPCB Calculator */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-4">
              <WashiTapeCenter color="mint" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  POST /api/cpcb/calculate
                </span>
                <StampBadge label="CALCULATION ENGINE" variant="amber" />
              </div>

              <h3 className="font-sketch text-xl font-bold text-zinc-900 dark:text-white">
                2. Calculate Statutory EPR Target & Avoided Fine
              </h3>

              <div className="p-4 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 font-sketch text-xs space-y-2 shadow-[2px_2px_0px_rgba(0,0,0,0.85)]">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-mono">Payload Sample</span>
                  <button
                    onClick={() => copyCode(JSON.stringify({ category: "CAT_I_RIGID_PLASTIC", targetTonnage: 100 }, null, 2), "api-2")}
                    className="flex items-center gap-1 font-mono font-bold text-emerald-700 dark:text-emerald-400"
                  >
                    {copiedId === "api-2" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === "api-2" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <pre className="text-zinc-900 dark:text-zinc-100 font-mono text-xs overflow-x-auto py-1">
                  {`{\n  "category": "CAT_I_RIGID_PLASTIC",\n  "targetTonnage": 100\n}`}
                </pre>
              </div>
            </section>

            {/* Navigation */}
            <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/docs/blockchain"
                className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Polygon Amoy Contracts</span>
              </Link>
              <Link
                href="/docs"
                className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Back to Field Manual Home</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
