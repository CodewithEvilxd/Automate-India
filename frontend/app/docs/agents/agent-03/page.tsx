"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  Zap,
  TrendingUp,
  Truck,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  DollarSign,
} from "lucide-react";

export default function Agent03DocsPage() {
  const hubs = [
    { city: "Noida Industrial Area (UP)", specialty: "Non-Ferrous Metals & E-Waste PCB Smelting", radius: "120 km", carbonPenalty: "0.105 kg/km" },
    { city: "Pune Bhosari MIDC (Maharashtra)", specialty: "Automotive Aluminum 6063 & Sheet Metal", radius: "85 km", carbonPenalty: "0.105 kg/km" },
    { city: "Bengaluru Peenya (Karnataka)", specialty: "Lithium Black Mass & Battery Urban Mining", radius: "140 km", carbonPenalty: "0.105 kg/km" },
    { city: "Mandi Gobindgarh (Punjab)", specialty: "Heavy Melting Steel Scrap (HMS 1/2)", radius: "95 km", carbonPenalty: "0.105 kg/km" },
    { city: "Ahmedabad Vatva GIDC (Gujarat)", specialty: "PET Flakes & HDPE Granule Reprocessing", radius: "110 km", carbonPenalty: "0.105 kg/km" },
    { city: "Chennai Ambattur (Tamil Nadu)", specialty: "Telecom Infrastructure & Industrial E-Waste", radius: "130 km", carbonPenalty: "0.105 kg/km" },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFC] dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-3">
            <Link href="/docs" className="hover:text-emerald-500 transition-colors">
              Docs
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-500">6-Agent Core</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-orange-500 font-bold">Agent 03: MCX Oracle & Logistics</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Agent 03: MCX Oracle & Matchmaker
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed mt-2">
            Continuous Multi Commodity Exchange price discovery coupled with Haversine transport carbon optimization for 6 major Indian recycling corridors.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          <main className="lg:col-span-9 space-y-12">
            {/* Overview */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-500 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PRICE DISCOVERY & ROUTE MATH</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Eliminating Middleman Margin Arbitrage
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                Informal scrap collectors lose up to 40% of their material's true commodity value due to lack of real-time market transparency. <strong>Agent 03</strong> continuously polls the Multi Commodity Exchange (MCX) of India and key regional Mandis to provide live benchmark prices (e.g. Copper @ ₹760/kg, Aluminum @ ₹215/kg, Steel @ ₹42.50/kg).
              </p>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                Simultaneously, Agent 03 calculates the <strong>Net Carbon ROI</strong> of the transaction. If transporting a scrap lot emits more diesel carbon than the material saves by avoiding virgin refining, Agent 03 reroutes the lot to a closer secondary processor.
              </p>

              {/* Formula */}
              <div className="p-4 rounded-2xl bg-zinc-950 text-orange-400 font-mono text-xs space-y-2 my-4">
                <span className="text-zinc-500 text-[10px] uppercase font-bold block">Net Carbon Optimization Formula:</span>
                <code>Net_Carbon_Abated = Gross_EPA_Saved - (Distance_KM × Freight_Emission_Factor_0.105)</code>
              </div>
            </section>

            {/* Industrial Corridors */}
            <section className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
                6 Primary Indian Secondary Processing Hubs
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                {hubs.map((hub, idx) => (
                  <div key={idx} className="p-5 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-sm">
                      <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{hub.city}</span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                      <strong>Specialization:</strong> {hub.specialty}
                    </p>
                    <div className="flex justify-between items-center font-mono text-[11px] text-zinc-500 pt-1 border-t border-zinc-200 dark:border-white/10">
                      <span>Avg Transit: {hub.radius}</span>
                      <span className="text-orange-500 font-bold">{hub.carbonPenalty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Navigation Footer */}
            <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/docs/agents/agent-02"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-zinc-900 dark:text-white font-display text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 02 (Carbon Math)</span>
              </Link>

              <Link
                href="/docs/agents/agent-04"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>Next: Agent 04 (Indic Voice)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
