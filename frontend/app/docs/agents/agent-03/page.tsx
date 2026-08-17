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
  Zap,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  MapPin,
  Truck,
  Activity,
  Compass,
} from "lucide-react";

export default function Agent03DocsPage() {
  return (
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      <div className="notebook-doc-scope flex-1 flex flex-col">

      {/* Header Banner */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        <WashiTapeCenter color="yellow" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-2 border-red-300/60 dark:border-red-500/30 pl-4 sm:pl-8 ml-1 sm:ml-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Manual</span>
            </Link>
            <StampBadge label="AGENT 03 DEEP SPEC" variant="amber" />
            <StampBadge label="MCX INDIA 60S INTERVAL" variant="emerald" />
            <StampBadge label="HAVERSINE LOGISTICS ROUTING" variant="sky" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Agent 03: <span className="highlight-yellow px-2">MCX & Logistics Oracle</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Real-Time Multi Commodity Exchange (MCX) spot index integration, secondary scrap discount formulas, and Haversine transport carbon routing optimization.
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
            
            {/* SECTION 1: The Problem of Middleman Arbitrage */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  Chapter 3.1 // Asymmetric Information in Scrap Mandis
                </span>
                <StampBadge label="PRICE DISCOVERY" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Eliminating the 40% Middleman Information Gap
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                <p>
                  Industrial smelters purchase secondary scrap based on the <strong>Multi Commodity Exchange of India (MCX)</strong> and London Metal Exchange (LME) daily settlement prices. However, grassroots scrap aggregators and kabadiwalas have zero access to live financial ticker feeds.
                </p>
                <p>
                  When copper prices surge on global exchanges, middlemen conceal the price hike from collectors for weeks, capturing massive unearned profits. Conversely, when spot prices drop by 2%, middlemen immediately slash collector payments by 15%, claiming "extreme market collapse."
                </p>
                <p>
                  <strong>Agent 03 democratizes price discovery.</strong> It maintains a sub-minute synchronized WebSocket pipeline to MCX spot feeds, calculates standard secondary discount spreads, and delivers transparent, unmanipulated spot valuation directly into the mobile app in regional languages.
                </p>
              </div>
            </section>

            {/* SECTION 2: Secondary Scrap Spread & Valuation Equations */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCenter color="mint" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                  Chapter 3.2 // Valuation Formulation & Secondary Spreads
                </span>
                <StampBadge label="REAL-TIME ORACLE" variant="amber" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Secondary Scrap Mathematical Pricing Formula
              </h2>

              <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Secondary scrap trades at an established empirical discount relative to 99.99% pure primary virgin cathodes/ingots to account for remelting slag loss:
              </p>

              {/* Formula Card */}
              <div className="p-5 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-3 font-sketch text-sm">
                <span className="font-bold text-xs uppercase text-amber-800 dark:text-amber-300 block">Equation 3.1: True Net Payout Formulation</span>
                <div className="text-amber-800 dark:text-amber-300 text-sm sm:text-base font-mono font-bold tracking-wide overflow-x-auto py-1">
                  Net_Payout (₹) = Mass_Kg × [P_MCX × Spread_Factor × Purity_Score] - Logistics_Deduction
                </div>
                <div className="font-sans text-xs text-zinc-700 dark:text-zinc-300 space-y-1 pt-2 border-t border-dashed border-zinc-300 dark:border-zinc-700">
                  <p>• <code>P_MCX</code>: Live spot price per kg polled from MCX India.</p>
                  <p>• <code>Spread_Factor</code>: Material secondary ratio (e.g. Copper Berry @ 0.94, Alum 6063 @ 0.88, HMS 1 Steel @ 0.82).</p>
                  <p>• <code>Purity_Score</code>: Certified visual purity $\rho \in [0.85, 1.00]$ from Agent 01.</p>
                </div>
              </div>
            </section>

            {/* SECTION 3: Haversine Freight & Transport Carbon Routing */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] space-y-6">
              <WashiTapeCenter color="yellow" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                  Chapter 3.3 // Haversine Distance & Freight Carbon
                </span>
                <StampBadge label="BS-VI DIESEL CORRIDOR" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Logistics Carbon Footprint Calculation
              </h2>

              <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Agent 03 computes great-circle geographic distance between the collection depot $(\phi_1, \lambda_1)$ and the certified smelter $(\phi_2, \lambda_2)$ to calculate transport freight deductions and logistics CO₂ penalties:
              </p>

              {/* Haversine Formula Card */}
              <div className="p-5 rounded-2xl bg-[#EFF6FF] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-3 font-sketch text-sm">
                <span className="font-bold text-xs uppercase text-sky-800 dark:text-sky-300 block">Equation 3.2: Great-Circle Haversine Geodesic</span>
                <div className="text-sky-800 dark:text-sky-300 text-sm sm:text-base font-mono font-bold tracking-wide overflow-x-auto py-1">
                  d (km) = 2R × arcsin( √( sin²(Δφ/2) + cos(φ₁)cos(φ₂)sin²(Δλ/2) ) )
                </div>
                <div className="text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-mono font-bold pt-2 border-t border-dashed border-zinc-300">
                  Logistics_CO2 (kg) = d × (Mass_Kg / 1000) × 0.105 kg CO₂e/ton-km
                </div>
                <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300">
                  Where R = 6,371 km (Earth mean radius), and 0.105 kg CO₂e/ton-km is the standardized BS-VI heavy commercial freight emission factor.
                </p>
              </div>
            </section>

            {/* Navigation */}
            <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/docs/agents/agent-02"
                className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 02 EPA Carbon Math</span>
              </Link>
              <Link
                href="/docs/agents/agent-04"
                className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Next: Agent 04 Indic Voice Bridge</span>
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
