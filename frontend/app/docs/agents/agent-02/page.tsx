"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  Scale,
  Leaf,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  FileSpreadsheet,
  Calculator,
} from "lucide-react";

export default function Agent02DocsPage() {
  const epaCoefficients = [
    { material: "Secondary Aluminum (6063/Ingot)", epaFactor: "9.13 kg CO₂e/kg", baseline: "Virgin Bauxite Smelting", savings: "95% Energy Savings" },
    { material: "Secondary Copper (Heavy Berry/Wire)", epaFactor: "2.81 kg CO₂e/kg", baseline: "Primary Sulfide Ore Refining", savings: "85% Energy Savings" },
    { material: "Heavy Melting Steel (HMS 1/2)", epaFactor: "1.81 kg CO₂e/kg", baseline: "Blast Furnace Basic Oxygen Steel", savings: "74% Energy Savings" },
    { material: "PET Bottle Flakes (Hot Washed)", epaFactor: "1.50 kg CO₂e/kg", baseline: "Crude Virgin Naphtha Polymerization", savings: "70% Energy Savings" },
    { material: "HDPE Granules / Regrind", epaFactor: "1.35 kg CO₂e/kg", baseline: "Virgin Ethylene Polymerization", savings: "65% Energy Savings" },
    { material: "Corrugated Packaging (OCC 11)", epaFactor: "0.92 kg CO₂e/kg", baseline: "Virgin Kraft Chemical Pulping", savings: "60% Energy Savings" },
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
            <span className="text-zinc-500">6-Agent Core</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-emerald-500 font-bold">Agent 02: EPA WARM Carbon Math</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <Scale className="w-5 h-5" />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Agent 02: EPA WARM Carbon Engine
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed mt-2">
            Deterministic carbon accounting eliminating generative AI hallucinations through scientific US EPA WARM v15 life-cycle equations.
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
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SCIENTIFIC DETERMINISM</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Why GenAI Prompts Fail Carbon Audits
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                Most ESG platforms send prompts like <em>"Calculate carbon saved for 1000kg of copper"</em> to generic LLMs. Because generative models sample probabilities, the output varies on each API call—producing audit discrepancies that fail regulatory scrutiny under ISO 14064 standards.
              </p>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                <strong>Agent 02</strong> implements pure mathematical determinism using the <strong>United States Environmental Protection Agency Waste Reduction Model (EPA WARM v15)</strong> factors, ensuring that 1 kg of secondary aluminum always reliably offsets exactly 9.13 kg of CO₂ equivalent emissions.
              </p>
            </section>

            {/* EPA Life-Cycle Conversion Factors Table */}
            <section className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
                EPA WARM Life-Cycle Conversion Coefficients
              </h3>

              <div className="overflow-x-auto rounded-3xl border border-zinc-200 dark:border-white/10 glass-panel">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-zinc-100 dark:bg-white/[0.04] border-b border-zinc-200 dark:border-white/10 font-mono text-[11px] uppercase text-zinc-500 dark:text-zinc-400">
                    <tr>
                      <th className="p-4">Commodity / Material</th>
                      <th className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">EPA WARM Factor</th>
                      <th className="p-4">Virgin Extraction Baseline</th>
                      <th className="p-4 text-orange-500 font-bold">Energy Abatement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-white/[0.06] text-zinc-600 dark:text-zinc-300 font-mono">
                    {epaCoefficients.map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-4 font-bold text-zinc-900 dark:text-white font-sans">{row.material}</td>
                        <td className="p-4 font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{row.epaFactor}</td>
                        <td className="p-4 text-zinc-500 font-sans text-xs">{row.baseline}</td>
                        <td className="p-4 font-bold text-orange-500 text-xs">{row.savings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Verification Math */}
            <section className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
                Smart Contract Verification Function
              </h3>

              <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Before a lot can be transferred on-chain, Agent 02 validates that the claimed CO₂ savings precisely match the mass multiplied by the category factor within a 0.01% floating point tolerance:
                </p>

                <div className="p-4 rounded-2xl bg-zinc-950 text-zinc-200 font-mono text-xs overflow-x-auto">
                  <code className="text-emerald-400">
                    expectedCO2 = weightKg * EPA_FACTORS[category];<br />
                    isVerified = Math.abs(claimedCO2 - expectedCO2) &lt; 0.01;
                  </code>
                </div>
              </div>
            </section>

            {/* Navigation Footer */}
            <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/docs/agents/agent-01"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-zinc-900 dark:text-white font-display text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 01 (Vision Quality)</span>
              </Link>

              <Link
                href="/docs/agents/agent-03"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>Next: Agent 03 (MCX Oracle & Logistics)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
