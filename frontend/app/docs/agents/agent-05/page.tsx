"use client";

import React from "react";
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
  DoodleShield,
  DoodleLock,
  StampBadge,
  DoodleCircle,
} from "@/components/SketchElements";
import {
  ShieldAlert,
  ArrowLeft,
  ChevronRight,
  Fingerprint,
  FileWarning,
  Activity,
  Network,
} from "lucide-react";

export default function Agent05DocsPage() {
  return (
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      <div className="notebook-doc-scope flex-1 flex flex-col">

      {/* Header Banner */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        <WashiTapeCenter color="mint" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-0 md:border-l-2 border-red-300/60 dark:border-red-500/30 pl-0 md:pl-8 ml-0 md:ml-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Manual</span>
            </Link>
            <StampBadge label="AGENT 05 DEEP SPEC" variant="rose" />
            <StampBadge label="PRE-SETTLEMENT RADAR" variant="emerald" />
            <StampBadge label="HAMMING DISTANCE ≤ 5" variant="amber" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Agent 05: <span className="highlight-emerald px-2">Cryptographic Fraud Radar</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Pre-Execution Anomaly Sentinel blocking double-claimed IPFS visual inspection hashes, circular wash-trading graph cycles, and weighbridge mass spoofing before smart contract state settlement.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1 relative overflow-x-clip">
        <NotebookSpiralBinding count={18} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pl-0 md:pl-8">
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          <main className="lg:col-span-9 space-y-12 border-l-0 md:border-l-2 border-red-300/50 dark:border-red-500/20 pl-0 md:pl-6">
            
            {/* SECTION 1: The Multi-Billion Dollar Greenwashing Reality */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  Chapter 5.1 // The Anatomy of Circular Fraud
                </span>
                <StampBadge label="ZERO COMPROMISE" variant="rose" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                How Secondary Markets Are Manipulated
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                <p>
                  Circularity fraud in South Asia takes three primary forms:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Image Re-upload (Duplicate Billing)</strong>: A single truckload of copper scrap is photographed at multiple angles, generating 5 separate PDF invoices sold to 5 different brand owners claiming ESG credits.
                  </li>
                  <li>
                    <strong>Wash-Trading Cycles</strong>: Shell recycling aggregators pass fictitious invoices in circular loops ($A \to B \to C \to A$) without moving a single kilogram of physical metal, inflating statutory EPR fulfillment numbers.
                  </li>
                  <li>
                    <strong>Weighbridge Tare Tampering</strong>: Truck drivers carry hidden water ballast tanks dumped immediately after gross weighing, artificially inflating scrap mass by up to 35%.
                  </li>
                </ol>
                <p>
                  <strong>Agent 05 is the gatekeeper.</strong> If any fraud signature is detected, the transaction is rejected at the API layer with cryptographic evidence logged on-chain.
                </p>
              </div>
            </section>

            {/* SECTION 2: 3 Core Algorithmic Defenses */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCenter color="pink" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-rose-700 dark:text-rose-400 tracking-wider">
                  Chapter 5.2 // Three Core Sentinel Algorithms
                </span>
                <StampBadge label="MATHEMATICAL GATES" variant="amber" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                The Sentinel Mathematical Engine
              </h2>

              <div className="space-y-4">
                
                {/* Gate 1: Perceptual Hash */}
                <div className="p-5 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2">
                  <div className="flex items-center justify-between font-sketch">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      1. Perceptual Image Hashing (pHash) & Hamming Distance
                    </h3>
                    <span className="text-xs font-mono font-bold text-rose-600">Gate 1</span>
                  </div>
                  <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Computes discrete cosine transform (DCT) frequency fingerprints of every uploaded scrap photo. Measures bitwise Hamming distance against the global registry of historical lots:
                  </p>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-300 dark:border-zinc-700 font-mono text-xs text-rose-700 dark:text-rose-400">
                    If Hamming_Distance(pHash_New, pHash_History) ≤ 5 → TRIGGER IMMEDIATE FRAUD LOCKOUT
                  </div>
                </div>

                {/* Gate 2: Graph Cycle Traversal */}
                <div className="p-5 rounded-2xl bg-[#F0FDF4] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2">
                  <div className="flex items-center justify-between font-sketch">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      2. Directed Acyclic Graph (DAG) Wash-Trading Cycle Detection
                    </h3>
                    <span className="text-xs font-mono font-bold text-emerald-600">Gate 2</span>
                  </div>
                  <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Maintains a real-time adjacency graph $G = (V, E)$ of wallet addresses and depot IDs. Executes Tarjan's strongly connected components algorithm before every trade to detect circular transaction loops.
                  </p>
                </div>

                {/* Gate 3: Statistical Telemetry Outlier */}
                <div className="p-5 rounded-2xl bg-[#EFF6FF] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2">
                  <div className="flex items-center justify-between font-sketch">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      3. Digital Weighbridge Telemetry Z-Score Outlier Analysis
                    </h3>
                    <span className="text-xs font-mono font-bold text-sky-600">Gate 3</span>
                  </div>
                  <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Compares visual volume contours from Agent 01 against reported weighbridge mass using density constants ($Z = |M - \rho V| / \sigma$). If $Z &gt; 2.5$, physical tamper inspection is flagged.
                  </p>
                </div>
              </div>
            </section>

            {/* Navigation */}
            <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/docs/agents/agent-04"
                className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 04 Indic Voice Bridge</span>
              </Link>
              <Link
                href="/docs/agents/agent-06"
                className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Next: Agent 06 CPCB EPR Shield</span>
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
