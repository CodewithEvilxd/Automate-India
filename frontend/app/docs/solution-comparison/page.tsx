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
      traditional: "Manual eyeball inspection; subjective tare deductions (20-40%); arbitrary dispute settlement.",
      circularchain: "Agent 01 Multi-Modal Semantic Segmentation; OpenCV contour masking with certified ISO 9001 Grade A+/A/B ratings.",
      agent: "Agent 01",
      tapeColor: "mint" as const,
    },
    {
      feature: "Scope 3 Carbon Math",
      traditional: "Self-reported arbitrary spreadsheets or stochastic GenAI hallucinations without boundary physics.",
      circularchain: "Agent 02 Deterministic US EPA WARM v15 Equations; immutable life-cycle conversion coefficients (9.13 kg CO₂e for Alum).",
      agent: "Agent 02",
      tapeColor: "kraft" as const,
    },
    {
      feature: "Commodity Price Discovery",
      traditional: "Opaque predatory middleman quotes; informal collectors lose up to 45% of real market spot value.",
      circularchain: "Agent 03 Real-Time MCX & Mandi Continuous Oracle polling spot indices every 60s with Haversine transport carbon deductions.",
      agent: "Agent 03",
      tapeColor: "yellow" as const,
    },
    {
      feature: "Informal Sector Accessibility",
      traditional: "Desktop-only English web ERP portals (SAP/Oracle) requiring literacy and typing.",
      circularchain: "Agent 04 Multi-Lingual Speech NLP supporting colloquial Hindi, Tamil, Telugu, Marathi, and Bengali voice notes.",
      agent: "Agent 04",
      tapeColor: "pink" as const,
    },
    {
      feature: "Fraud & Double-Count Prevention",
      traditional: "Post-facto paper audits after money is wired; zero cryptographic visual inspection proof.",
      circularchain: "Agent 05 Pre-Execution Anomaly Radar blocking identical IPFS perceptual hashes and circular wash-trading.",
      agent: "Agent 05",
      tapeColor: "mint" as const,
    },
    {
      feature: "Statutory CPCB EPR Filing",
      traditional: "Manual paperwork liaison taking 3-6 months with high risk of ₹25,000/MT non-compliance penalties.",
      circularchain: "Agent 06 Automated CPCB Portal Integration with cryptographically signed certificates fulfilling PWM Rules 2026.",
      agent: "Agent 06",
      tapeColor: "yellow" as const,
    },
    {
      feature: "Settlement & Trust Architecture",
      traditional: "Unrecorded cash payments, delayed 60-day credit terms, and opaque verbal receipts.",
      circularchain: "Polygon Amoy Smart Contracts (Chain ID: 80002) with atomic state settlement and Pinata IPFS visual proof hashing.",
      agent: "Web3",
      tapeColor: "kraft" as const,
    },
  ];

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
            <StampBadge label="ARCHITECTURAL MATRIX" variant="emerald" />
            <StampBadge label="10X ADVANTAGE" variant="amber" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Linear vs <span className="highlight-emerald px-2">CircularChain Protocol</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            A point-by-point architectural and operational comparison contrasting traditional informal scrap recycling against CircularChain’s autonomous multi-agent cryptographic protocol.
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
            
            {/* Architectural Overview Card */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-4">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                  Comparative Analysis Blueprint
                </span>
                <StampBadge label="PARADIGM SHIFT" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                From Broken Paper Ledgers to <DoodleCircle className="text-emerald-500">Autonomous Settlement</DoodleCircle>
              </h2>

              <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Traditional circular supply chains rely on disconnected spreadsheets, cash handoffs, and verbal negotiations that invite corruption. CircularChain introduces a <strong>zero-trust, verifiable state machine</strong> where physical material mass is validated by computer vision, priced by commodity oracles, and settled on Polygon Amoy smart contracts.
              </p>
            </section>

            {/* Granular Comparison Cards */}
            <div className="space-y-6">
              {comparisonItems.map((item, idx) => (
                <div
                  key={idx}
                  className="relative p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.85)] dark:shadow-[4px_5px_0px_#10B981] space-y-4"
                >
                  <WashiTapeCenter color={item.tapeColor} />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-dashed border-zinc-200 dark:border-white/10 pb-3">
                    <h3 className="font-sketch text-xl font-bold text-zinc-900 dark:text-white">
                      {item.feature}
                    </h3>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 font-bold uppercase">
                      {item.agent}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Traditional Failure */}
                    <div className="p-4 rounded-2xl bg-[#FEE2E2]/60 dark:bg-rose-950/20 border-2 border-rose-400 dark:border-rose-500/30 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-sketch text-xs font-bold uppercase">
                        <XCircle className="w-4 h-4" />
                        <span>Traditional Linear Method</span>
                      </div>
                      <p className="font-sans text-xs text-zinc-800 dark:text-zinc-200 leading-snug">
                        {item.traditional}
                      </p>
                    </div>

                    {/* CircularChain Advantage */}
                    <div className="p-4 rounded-2xl bg-[#DCFCE7]/70 dark:bg-emerald-950/20 border-2 border-emerald-500 space-y-1.5 shadow-[2px_2px_0px_#10B981]">
                      <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-sketch text-xs font-bold uppercase">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>CircularChain Autonomous Protocol</span>
                      </div>
                      <p className="font-sans text-xs text-zinc-900 dark:text-zinc-100 leading-snug font-medium">
                        {item.circularchain}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation to Next Chapter */}
            <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/docs/problem-statement"
                className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Problem Statement</span>
              </Link>
              <Link
                href="/docs/quickstart"
                className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Next: Developer & Recycler Quickstart</span>
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
