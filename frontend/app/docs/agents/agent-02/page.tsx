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
  DoodleScale,
  StampBadge,
  DoodleCircle,
} from "@/components/SketchElements";
import {
  Scale,
  ArrowLeft,
  ChevronRight,
  Calculator,
  Trees,
  Flame,
  Zap,
  Leaf,
  ShieldCheck,
} from "lucide-react";

export default function Agent02DocsPage() {
  return (
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        <WashiTapeCenter color="kraft" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-2 border-red-300/60 dark:border-red-500/30 pl-4 sm:pl-8 ml-1 sm:ml-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Manual</span>
            </Link>
            <StampBadge label="AGENT 02 DEEP SPEC" variant="emerald" />
            <StampBadge label="US EPA WARM v15" variant="amber" />
            <StampBadge label="ZERO LLM HALLUCINATION" variant="sky" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Agent 02: <span className="highlight-emerald px-2">EPA WARM Carbon Math Engine</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Deterministic Life-Cycle Assessment (LCA) carbon accounting with zero generative AI hallucination, calculating Scope 3 GHG abatement and urban tree-equivalent sequestration.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 relative">
        <NotebookSpiralBinding count={18} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pl-4 sm:pl-8">
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          <main className="lg:col-span-9 space-y-12 border-l-2 border-red-300/50 dark:border-red-500/20 pl-4 sm:pl-6">
            
            {/* SECTION 1: The Problem of LLM Hallucinations */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  Chapter 2.1 // Why Generative AI Fails ESG Audits
                </span>
                <StampBadge label="DETERMINISTIC PHYSICS" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                The Fatal Flaw of Stochastic Carbon Accounting
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                <p>
                  Most modern "sustainability platforms" prompt Large Language Models (LLMs) to write ESG reports. LLMs are non-deterministic next-token predictors—they have no understanding of physical mass balances, thermodynamic laws, or closed-boundary lifecycle models. In corporate audits, LLMs frequently hallucinate carbon factors off by 300% to 800%, exposing enterprises to massive regulatory SEC and CPCB enforcement penalties.
                </p>
                <p>
                  <strong>Agent 02 operates on strict deterministic mathematics.</strong> It rejects stochastic generation completely, executing hard-coded, peer-reviewed Life Cycle Assessment equations from the <strong>United States Environmental Protection Agency (US EPA) Waste Reduction Model (WARM Version 15)</strong>.
                </p>
              </div>
            </section>

            {/* SECTION 2: Life Cycle System Boundary & Equations */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCenter color="mint" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                  Chapter 2.2 // Cradle-to-Gate Life Cycle Equations
                </span>
                <StampBadge label="ISO 14040/14044 LCA" variant="amber" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                The Fundamental Life-Cycle Mass Balance
              </h2>

              <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                When a secondary scrap commodity is remelted, it avoids the extensive upstream energy expenditure of mining, chemical beneficiation, and electrolysis:
              </p>

              {/* Master Equation 1 */}
              <div className="p-5 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-3 font-sketch text-sm">
                <span className="font-bold text-xs uppercase text-amber-800 dark:text-amber-300 block">Equation 2.1: Net GHG Abatement per Batch</span>
                <div className="text-emerald-800 dark:text-emerald-300 text-sm sm:text-base font-mono font-bold tracking-wide overflow-x-auto py-1">
                  ΔGHG_Net (kg CO₂e) = M_Scrap × Purity_Factor × [EF_Virgin - EF_Secondary] - GHG_Logistics
                </div>
                <div className="font-sans text-xs text-zinc-700 dark:text-zinc-300 space-y-1 pt-2 border-t border-dashed border-zinc-300 dark:border-zinc-700">
                  <p>• <code>M_Scrap</code>: Verified physical gross mass from digital weighbridge telemetry (kg).</p>
                  <p>• <code>Purity_Factor</code>: Visual purity scalar $\rho \in [0.85, 1.00]$ certified by Agent 01.</p>
                  <p>• <code>EF_Virgin</code>: Emission factor of virgin primary extraction (e.g., 11.23 kg CO₂e/kg for Primary Alum).</p>
                  <p>• <code>EF_Secondary</code>: Remelting emission factor (e.g., 2.10 kg CO₂e/kg for Secondary Induction Furnace).</p>
                  <p>• <code>GHG_Logistics</code>: Freight transport emissions calculated by Agent 03 via Haversine distance.</p>
                </div>
              </div>

              {/* Master Equation 2: Tree Equivalency */}
              <div className="p-5 rounded-2xl bg-[#F0FDF4] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-3 font-sketch text-sm">
                <span className="font-bold text-xs uppercase text-emerald-800 dark:text-emerald-300 block">Equation 2.2: Urban Tree-Year Sequestration Equivalence</span>
                <div className="text-emerald-800 dark:text-emerald-300 text-sm sm:text-base font-mono font-bold tracking-wide overflow-x-auto py-1">
                  Trees_Equivalent = ΔGHG_Net (kg CO₂e) / 21.77 kg CO₂/tree-year
                </div>
                <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300">
                  Based on standard USDA Forest Service and EPA benchmarks where one mature 10-year urban deciduous tree sequestering an average of 48 lbs (21.77 kg) of atmospheric CO₂ annually.
                </p>
              </div>
            </section>

            {/* SECTION 3: Standard EPA WARM Emission Factor Matrix */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] space-y-6">
              <WashiTapeCenter color="yellow" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                  Chapter 2.3 // Statutory Emission Factor Database
                </span>
                <StampBadge label="EPA WARM v15 DATA" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Empirical Material Life-Cycle Factors
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sketch text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-zinc-950 dark:border-white/20 bg-zinc-100 dark:bg-zinc-800">
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Material Category</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Virgin Energy (kWh/MT)</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Recycled Energy (kWh/MT)</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Net CO₂e Saved (kg/kg)</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Tree-Years per MT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-b border-zinc-300 dark:border-zinc-800 font-sans text-xs text-zinc-800 dark:text-zinc-200">
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-emerald-600">Aluminum (6063 / Wire)</td>
                      <td className="p-3 font-mono">14,200 kWh</td>
                      <td className="p-3 font-mono">710 kWh (95% less)</td>
                      <td className="p-3 font-mono font-bold text-emerald-700">9.13 kg CO₂e</td>
                      <td className="p-3 font-mono font-bold text-emerald-700">419.4 Trees</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-amber-600">Copper (Berry / Heavy)</td>
                      <td className="p-3 font-mono">9,800 kWh</td>
                      <td className="p-3 font-mono">1,470 kWh (85% less)</td>
                      <td className="p-3 font-mono font-bold text-amber-700">4.85 kg CO₂e</td>
                      <td className="p-3 font-mono font-bold text-amber-700">222.8 Trees</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-sky-600">Brass (Honey / Rods)</td>
                      <td className="p-3 font-mono">8,200 kWh</td>
                      <td className="p-3 font-mono">1,640 kWh (80% less)</td>
                      <td className="p-3 font-mono font-bold text-sky-700">3.90 kg CO₂e</td>
                      <td className="p-3 font-mono font-bold text-sky-700">179.1 Trees</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-zinc-700 dark:text-zinc-300">Steel / HMS 1&2</td>
                      <td className="p-3 font-mono">5,400 kWh</td>
                      <td className="p-3 font-mono">1,890 kWh (65% less)</td>
                      <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-100">1.82 kg CO₂e</td>
                      <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-100">83.6 Trees</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-purple-600">HDPE / Rigid Plastic</td>
                      <td className="p-3 font-mono">22,000 kWh</td>
                      <td className="p-3 font-mono">3,300 kWh (85% less)</td>
                      <td className="p-3 font-mono font-bold text-purple-700">1.25 kg CO₂e</td>
                      <td className="p-3 font-mono font-bold text-purple-700">57.4 Trees</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Navigation */}
            <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/docs/agents/agent-01"
                className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 01 Optical Vision</span>
              </Link>
              <Link
                href="/docs/agents/agent-03"
                className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Next: Agent 03 MCX Oracle</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
