"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Cpu,
  Scale,
  Zap,
  Mic,
  ShieldCheck,
  Building2,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Sparkles,
  Lock,
  Layers,
  TrendingUp,
} from "lucide-react";

export default function SolutionComparisonPage() {
  const comparisonItems = [
    {
      feature: "Material Quality Verification",
      traditional: "Manual subjective eyeball inspection; frequent adulteration disputes and grade misrepresentation.",
      circularchain: "Agent 01 Multi-Modal Semantic Segmentation; pixel-level contamination analysis with certified ISO 9001 Grade A+/A/B outputs.",
      accent: "emerald",
    },
    {
      feature: "Carbon Abatement Mathematics",
      traditional: "Self-reported spreadsheet estimations or hallucinated LLM generative text.",
      circularchain: "Agent 02 Deterministic US EPA WARM v15 Equations; immutable scientific life-cycle conversion factors.",
      accent: "emerald",
    },
    {
      feature: "Commodity Price Discovery",
      traditional: "Opaque middleman quotes with 30-50% margins deducted from grassroots collectors.",
      circularchain: "Agent 03 Real-Time MCX & Mandi Continuous Oracle with automated secondary market discount calculation.",
      accent: "orange",
    },
    {
      feature: "Informal Sector Access",
      traditional: "Complex English web portal forms requiring desktops, excluding unorganized workers.",
      circularchain: "Agent 04 Multi-Lingual Speech Processing supporting vernacular Hindi, Tamil, Telugu, Marathi, and Bengali.",
      accent: "emerald",
    },
    {
      feature: "Fraud & Double-Count Prevention",
      traditional: "Post-audit checks after funds are transferred; zero cryptographic protection against duplicate invoices.",
      circularchain: "Agent 05 Pre-Execution Anomaly Radar blocking identical IPFS hashes and circular wash trading.",
      accent: "orange",
    },
    {
      feature: "Statutory EPR Certification",
      traditional: "Manual liaison with regional pollution control boards taking 3-6 months.",
      circularchain: "Agent 06 Automated CPCB Rule Schedule Mapping with instant auditable digital certificates.",
      accent: "orange",
    },
    {
      feature: "Ownership Transfer Settlement",
      traditional: "Paper bills of lading easily destroyed, lost, or forged.",
      circularchain: "Polygon Amoy Smart Contract verifyAndTransfer() with IPFS pinned decentralized visual proof.",
      accent: "emerald",
    },
  ];

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
            <span className="text-emerald-500 font-bold">Linear vs CircularChain</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Linear Economy vs CircularChain Protocol
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            A granular comparison detailing why autonomous multi-agent AI coupled with cryptographic smart contracts outperforms traditional scrap recycling models.
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
            {/* Overview */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL ADVANTAGES</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                How CircularChain Solves Every Vulnerability
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                Traditional recycling workflows suffer from high human latency, unverified claims, and financial leakage. CircularChain substitutes subjective manual verification with autonomous mathematical validation across every touchpoint.
              </p>
            </section>

            {/* Comparison Cards */}
            <section className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
                Feature-by-Feature Operational Breakdown
              </h3>

              <div className="space-y-4">
                {comparisonItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.06] pb-3">
                      <span className="font-display font-bold text-sm text-zinc-900 dark:text-white">
                        {item.feature}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          item.accent === "emerald"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-orange-500/10 text-orange-500"
                        }`}
                      >
                        Step 0{idx + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Traditional */}
                      <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-rose-500 font-bold">
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>Traditional Model</span>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {item.traditional}
                        </p>
                      </div>

                      {/* CircularChain */}
                      <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>CircularChain Protocol</span>
                        </div>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                          {item.circularchain}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Navigation Footer */}
            <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/docs/problem-statement"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-zinc-900 dark:text-white font-display text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>The Global Crisis</span>
              </Link>

              <Link
                href="/docs/quickstart"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>Next: Quickstart Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
