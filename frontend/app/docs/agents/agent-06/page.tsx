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
  StampBadge,
  DoodleCircle,
} from "@/components/SketchElements";
import {
  Building2,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  FileCheck,
  AlertOctagon,
  Scale,
} from "lucide-react";

export default function Agent06DocsPage() {
  return (
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      <div className="notebook-doc-scope flex-1 flex flex-col">

      {/* Header Banner */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        <WashiTapeCenter color="kraft" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-0 md:border-l-2 border-red-300/60 dark:border-red-500/30 pl-0 md:pl-8 ml-0 md:ml-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Manual</span>
            </Link>
            <StampBadge label="AGENT 06 DEEP SPEC" variant="emerald" />
            <StampBadge label="CPCB PWM RULES 2026" variant="amber" />
            <StampBadge label="₹25,000/MT PENALTY SHIELD" variant="rose" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Agent 06: <span className="highlight-emerald px-2">CPCB Statutory EPR Shield</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Automated MoEFCC Plastic & E-Waste Management Rules 2026 statutory quota tracking, cryptographically signed audit package compilation, and Environmental Compensation penalty avoidance calculation.
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
            
            {/* SECTION 1: Statutory Mandates & Environmental Compensation (EC) */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  Chapter 6.1 // The Legal Reality of Indian EPR
                </span>
                <StampBadge label="MANDATORY FY 2026-27" variant="rose" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Statutory Quota Enforcement & Massive Financial Penalties
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                <p>
                  Under the <strong>Plastic Waste Management (Amendment) Rules 2026</strong> and <strong>E-Waste Management Rules 2022</strong> promulgated by the Ministry of Environment, Forest and Climate Change (MoEFCC), Producer, Importer, and Brand Owners (PIBOs) are legally required to fulfill mandatory recycling quotas (70% in FY 25-26, scaling to 80% in FY 26-27).
                </p>
                <p>
                  Failure to meet these statutory targets on the centralized Central Pollution Control Board (CPCB) portal triggers non-negotiable <strong>Environmental Compensation (EC) penalties of up to ₹25,000 per metric ton</strong> of unfulfilled liability, alongside potential cancellation of manufacturing licenses.
                </p>
                <p>
                  <strong>Agent 06 automates statutory defense.</strong> It matches verified incoming scrap lots directly to registered enterprise PIBO obligations, calculating liability fulfillment in real-time and compiling cryptographically signed audit packages ready for instant CPCB portal submission.
                </p>
              </div>
            </section>

            {/* SECTION 2: Statutory Category Quotas & Penalty Formula */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] space-y-6">
              <WashiTapeCenter color="yellow" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                  Chapter 6.2 // CPCB Category Matrix & Fine Formulations
                </span>
                <StampBadge label="PWM RULES 2026" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Statutory Plastic & E-Waste EPR Categories
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sketch text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-zinc-950 dark:border-white/20 bg-zinc-100 dark:bg-zinc-800">
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">CPCB Category</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Material Scope</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">FY 25-26 Target</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">FY 26-27 Target</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Statutory Default Fine</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-b border-zinc-300 dark:border-zinc-800 font-sans text-xs text-zinc-800 dark:text-zinc-200">
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-emerald-600">Category I</td>
                      <td className="p-3">Rigid Plastic (HDPE drums, PET bottles, PP crates)</td>
                      <td className="p-3 font-mono font-bold text-amber-600">70% of Sales</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">80% of Sales</td>
                      <td className="p-3 font-mono font-bold text-rose-600">₹20,000 / MT</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-amber-600">Category II</td>
                      <td className="p-3">Flexible Packaging (LDPE pouches, shrink wraps)</td>
                      <td className="p-3 font-mono font-bold text-amber-600">70% of Sales</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">80% of Sales</td>
                      <td className="p-3 font-mono font-bold text-rose-600">₹22,000 / MT</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-sky-600">Category III</td>
                      <td className="p-3">Multi-Layered Plastic (MLP laminate packaging)</td>
                      <td className="p-3 font-mono font-bold text-amber-600">70% of Sales</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">80% of Sales</td>
                      <td className="p-3 font-mono font-bold text-rose-600">₹25,000 / MT</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-purple-600">E-Waste Lead/PCB</td>
                      <td className="p-3">Lead-Acid Batteries, Server PCBs, Telecom Scrap</td>
                      <td className="p-3 font-mono font-bold text-amber-600">80% of EOL</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">90% of EOL</td>
                      <td className="p-3 font-mono font-bold text-rose-600">₹35,000 / MT</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Fine Formula Card */}
              <div className="p-5 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2 font-sketch text-sm">
                <span className="font-bold text-xs uppercase text-rose-700 dark:text-rose-400 block">Equation 6.1: Environmental Compensation (EC) Penalty Formula</span>
                <div className="text-rose-700 dark:text-rose-400 text-sm sm:text-base font-mono font-bold tracking-wide overflow-x-auto py-1">
                  EC_Fine (₹) = Max(0, [Statutory_Target_MT - Verified_Recycled_MT]) × Fine_Rate_Per_MT
                </div>
              </div>
            </section>

            {/* Navigation */}
            <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/docs/agents/agent-05"
                className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 05 Fraud Radar</span>
              </Link>
              <Link
                href="/docs/blockchain"
                className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Next: Polygon Amoy Smart Contracts</span>
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
