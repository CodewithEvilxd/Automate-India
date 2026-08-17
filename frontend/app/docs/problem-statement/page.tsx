"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import Image from "next/image";
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
  AlertTriangle,
  Building2,
  Scale,
  Cpu,
  ShieldAlert,
  TrendingDown,
  FileSpreadsheet,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  DollarSign,
  Flame,
  CheckCircle2,
  Layers,
  ChevronRight,
  PenTool,
} from "lucide-react";

export default function ProblemStatementPage() {
  return (
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      <div className="notebook-doc-scope flex-1 flex flex-col">

      {/* Header Banner */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        <WashiTapeCenter color="pink" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-2 border-red-300/60 dark:border-red-500/30 pl-4 sm:pl-8 ml-1 sm:ml-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Manual</span>
            </Link>
            <StampBadge label="CRITICAL FAILURE ANALYSIS" variant="rose" />
            <StampBadge label="$12.4B ESG AUDIT" variant="amber" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            The Global & National <span className="highlight-yellow px-2">Scrap Crisis</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            An exhaustive engineering and economic forensic audit of India’s $40B unorganized secondary scrap economy, multi-billion dollar ESG greenwashing fraud, and severe statutory CPCB non-compliance liabilities.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 relative">
        <NotebookSpiralBinding count={14} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pl-4 sm:pl-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-12 border-l-2 border-red-300/50 dark:border-red-500/20 pl-4 sm:pl-6">
            
            {/* Infographic Banner (Real Generated Infographic) */}
            <div className="relative p-4 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] overflow-hidden">
              <WashiTapeCenter color="kraft" />
              <div className="relative w-full h-[280px] sm:h-[380px] rounded-2xl overflow-hidden border border-zinc-300 dark:border-zinc-800">
                <Image
                  src="/docs/global_scrap_crisis.jpg"
                  alt="The Global Scrap Crisis Infographic"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sketch text-xs text-zinc-600 dark:text-zinc-400">
                <span>Figure 1.0 // Forensic Mapping of India’s Secondary Scrap Supply Chain Leakage</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">CPCB & MoEFCC Data 2026</span>
              </div>
            </div>

            {/* SECTION 1: Macro-Economic Reality */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  Section 01 // Macro-Economic Scale & Waste Flows
                </span>
                <StampBadge label="2.12B METRIC TONS" variant="amber" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                Global Waste vs Virgin Metal Extraction: <span className="highlight-yellow">The Energy Imbalance</span>
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                <p>
                  Every year, human civilization extracts over <strong>100 Billion metric tons of raw primary resources</strong> from the Earth’s crust. Mining virgin bauxite for primary aluminum consumes over <strong>14,000 kWh of electric energy per metric ton</strong> and generates massive open-pit red mud tailing ponds that poison regional water tables.
                </p>
                <p>
                  In contrast, remelting secondary aluminum scrap requires <DoodleCircle className="text-emerald-500">95% less energy</DoodleCircle> (only ~700 kWh/MT) and prevents <strong>9.13 metric tons of greenhouse gas emissions per ton recycled</strong>. Yet despite this overwhelming physical advantage, more than <strong>60% of recyclable metal and engineering plastics in developing economies are lost to landfills, open dumps, or crude backyard burning</strong>.
                </p>
              </div>

              {/* 3 Macro Statistics Sticky Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-sketch">
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] text-center space-y-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 block">62.8M MT</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 block font-bold">Annual Indian Municipal Waste</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] text-center space-y-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 block">90.4%</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 block font-bold">Informal Unorganized Share</span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] text-center space-y-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block">₹3,40,000 Cr</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 block font-bold">Unrealized Circular Value</span>
                </div>
              </div>
            </section>

            {/* SECTION 2: The 4 Deep Breakdown Pillars */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCenter color="pink" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-rose-700 dark:text-rose-400 tracking-wider">
                  Section 02 // The Four Structural Pillars of Failure
                </span>
                <StampBadge label="STRUCTURAL BREAKDOWN" variant="rose" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                Why the Current Linear Recycling System <span className="highlight-yellow">Is Broken</span>
              </h2>

              {/* Deep Forensic Breakdown Cards */}
              <div className="space-y-6">
                
                {/* Pillar 1 */}
                <div className="p-6 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sketch text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                      1. Informal Opacity & Predatory Middleman Arbitrage
                    </h3>
                    <DoodleShield className="text-rose-500" />
                  </div>
                  <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    India’s 5 Million waste pickers collect up to 150 kg of scrap daily. Because they lack access to real-time commodity indices (MCX / LME), local aggregators impose arbitrary <strong>30% to 45% moisture, dust, and tare weight deductions</strong>. Collectors are paid in untraceable cash at a fraction of true value, trapped in generational debt cycles.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="p-6 rounded-2xl bg-[#F0FDF4] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sketch text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                      2. $12.4 Billion Global ESG Greenwashing & Fake PDF Certificates
                    </h3>
                    <DoodleLock className="text-amber-500" />
                  </div>
                  <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Over 40% of Extended Producer Responsibility (EPR) credits traded across South Asia represent fictitious recycling volume ("paper round-tripping"). Intermediaries generate fake invoices for scrap that was never actually collected or smelted, allowing polluting multinationals to claim net-zero compliance on paper while real waste fills waterways.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="p-6 rounded-2xl bg-[#EFF6FF] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sketch text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                      3. GenAI Carbon Math Hallucinations in Enterprise Software
                    </h3>
                    <DoodleScale className="text-sky-500" />
                  </div>
                  <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Generic generative AI models hallucinate carbon offset calculations because they lack physical life-cycle boundary conditions. CircularChain replaces stochastic LLM outputs with deterministic <strong>EPA WARM v15 life-cycle equations</strong> tied directly to verified digital weighbridge mass.
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className="p-6 rounded-2xl bg-[#FDF2F8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sketch text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                      4. Massive CPCB Statutory Compliance Fines (FY 2026-27 Mandates)
                    </h3>
                    <DoodleChip className="text-rose-500" />
                  </div>
                  <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Under the <strong>Plastic Waste Management Rules 2026</strong> and <strong>E-Waste Rules 2022</strong>, brand owners must fulfill mandatory recycling quotas (70% in FY 25-26, 80% in FY 26-27). Non-compliance triggers non-negotiable Environmental Compensation (EC) penalties of up to <strong>₹25,000 per MT</strong> under Central Pollution Control Board statutory audits.
                  </p>
                </div>
              </div>
            </section>

            {/* Navigation to Next Chapter */}
            <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/docs/origin-story"
                className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Origin Story & Empathy</span>
              </Link>
              <Link
                href="/docs/solution-comparison"
                className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Next: Linear vs CircularChain Matrix</span>
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
