"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Calculator,
  ShieldCheck,
  Building2,
  FileCheck,
  Printer,
  Boxes,
  ArrowRight,
  TrendingUp,
  Leaf,
  Scale,
  Sparkles,
  Award,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { DEMO_MATERIALS } from "@/lib/demo-data";

export default function EPRCalculatorPage() {
  const [industry, setIndustry] = useState("automotive");
  const [productionMT, setProductionMT] = useState<number>(350);
  const [materialCategory, setMaterialCategory] = useState("aluminum");
  const [companyName, setCompanyName] = useState("Tata Motors Ancillary Unit / NCR");

  // CPCB 2026 Mandate Target Percentages
  const CPCB_TARGETS: Record<string, number> = {
    aluminum: 0.75,
    steel: 0.70,
    plastic_pet: 0.80,
    plastic_hdpe: 0.70,
    paper: 0.65,
    electronic: 0.85,
  };

  const targetPct = CPCB_TARGETS[materialCategory] || 0.70;
  const mandatoryLiabilityMT = Math.round(productionMT * targetPct * 10) / 10;
  const mandatoryLiabilityKg = mandatoryLiabilityMT * 1000;

  // EPA WARM Carbon Abatement Goal
  const emissionFactors: Record<string, number> = {
    aluminum: 9.13,
    steel: 1.81,
    plastic_pet: 1.50,
    plastic_hdpe: 1.35,
    paper: 3.42,
    electronic: 5.50,
  };

  const factor = emissionFactors[materialCategory] || 2.0;
  const requiredCarbonAbatementKg = Math.round(mandatoryLiabilityKg * factor);

  // Matching lots in current inventory
  const matchingLots = DEMO_MATERIALS.filter((m) =>
    m.category.toLowerCase().includes(materialCategory.replace("plastic_", ""))
  );

  const totalMatchingMassAvailable = matchingLots.reduce(
    (acc, curr) => acc + curr.estimated_weight_kg,
    0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Header */}
        <div className="border-b border-zinc-200 dark:border-white/10 pb-6 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Central Pollution Control Board (CPCB) • FY 2026-27 Mandate</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Corporate EPR Liability Simulator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1 max-w-2xl font-normal leading-relaxed">
            Calculate your statutory recycling quota under Indian Plastic & E-Waste Management Rules and match verified secondary scrap lots to achieve 100% audited compliance.
          </p>
        </div>

        {/* Input Form & Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Controls Panel (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl glass-panel p-6 border border-zinc-200 dark:border-white/10 shadow-xl space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-white/[0.06]">
              <Calculator className="w-4 h-4 text-emerald-500" />
              <span className="font-display font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider">
                Enterprise Input Parameters
              </span>
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 text-[11px] font-medium mb-1.5">
                Corporate Entity / Manufacturing Plant Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-zinc-900 dark:text-white text-xs outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 text-[11px] font-medium mb-1.5">
                Industrial Sector
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-zinc-900 dark:text-white text-xs outline-none cursor-pointer"
              >
                <option value="automotive">Automotive & Precision Engineering</option>
                <option value="fmcg">FMCG & Rigid/Flexible Packaging</option>
                <option value="electronics">Electronics & Telecom Infrastructure</option>
                <option value="construction">Industrial Infrastructure & Metals</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 text-[11px] font-medium mb-1.5">
                Material Class (CPCB Statutory Schedule)
              </label>
              <select
                value={materialCategory}
                onChange={(e) => setMaterialCategory(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-zinc-900 dark:text-white text-xs outline-none cursor-pointer font-medium"
              >
                <option value="aluminum">Aluminum Scrap (Automotive/Architectural 6063)</option>
                <option value="steel">Steel Scrap & Heavy Melting Ferrous (HMS 1/2)</option>
                <option value="plastic_pet">PET Plastic (Category I - Rigid Containers)</option>
                <option value="plastic_hdpe">HDPE Plastic (Category II - Flexible Packaging)</option>
                <option value="paper">Corrugated Packaging (OCC Grade 11 Paper)</option>
                <option value="electronic">E-Waste (Schedule I IT & Telecom PCBs)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-zinc-600 dark:text-zinc-400 text-[11px] font-medium">
                  Annual Material Consumption
                </label>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {productionMT} Metric Tonnes
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={2000}
                step={10}
                value={productionMT}
                onChange={(e) => setProductionMT(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500 font-mono mt-1">
                <span>20 MT</span>
                <span>1,000 MT</span>
                <span>2,000 MT</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Statutory Quota:</span> Under CPCB 2026 norms, your enterprise is mandated to recycle at least{" "}
              <strong className="text-zinc-900 dark:text-white font-mono">{(targetPct * 100).toFixed(0)}%</strong> of consumed mass through verified on-chain channels.
            </div>
          </div>

          {/* Results Panel & Form 1 Sheet (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 shadow-lg">
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  Mandatory EPR Offset
                </span>
                <span className="font-display text-2xl font-extrabold text-zinc-900 dark:text-white block">
                  {mandatoryLiabilityMT.toLocaleString("en-IN")} MT
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-1 block font-semibold">
                  {(targetPct * 100).toFixed(0)}% statutory quota
                </span>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 shadow-lg">
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  Required Carbon Abatement
                </span>
                <span className="font-display text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block">
                  {(requiredCarbonAbatementKg / 1000).toFixed(1)} MT
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-1 block">
                  EPA WARM Standard
                </span>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 shadow-lg">
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  Matching Ledger Lots
                </span>
                <span className="font-display text-2xl font-extrabold text-amber-500 block">
                  {matchingLots.length} Available
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-1 block">
                  {(totalMatchingMassAvailable / 1000).toFixed(1)} MT supply
                </span>
              </div>
            </div>

            {/* Official Form 1 Certificate Assessment Card */}
            <div className="rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 shadow-2xl overflow-hidden">
              <div className="bg-zinc-100 dark:bg-white/[0.03] px-6 py-4 border-b border-zinc-200 dark:border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-white">
                    Form 1 • Official CPCB Corporate EPR Assessment Sheet
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-white/10 hover:bg-zinc-100 dark:hover:bg-white/15 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Assessment</span>
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-zinc-200 dark:border-white/[0.06]">
                  <div>
                    <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] uppercase font-mono">
                      Corporate Entity
                    </span>
                    <span className="text-zinc-900 dark:text-white font-bold text-sm">
                      {companyName}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] uppercase font-mono">
                      Statutory Jurisdiction
                    </span>
                    <span className="text-zinc-900 dark:text-white font-bold text-sm">
                      CPCB India (MoEFCC Guidelines)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-zinc-200 dark:border-white/[0.06]">
                  <div>
                    <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] uppercase font-mono">
                      Annual Material Volume
                    </span>
                    <span className="text-zinc-900 dark:text-white font-bold font-mono text-sm">
                      {productionMT} MT
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] uppercase font-mono">
                      Statutory Diversion Obligation
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm">
                      {mandatoryLiabilityMT} MT ({mandatoryLiabilityKg.toLocaleString("en-IN")} kg)
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 italic">
                  &ldquo;This corporate assessment certifies that <strong className="text-zinc-900 dark:text-white not-italic">{companyName}</strong> is obligated to divert at least <strong className="text-emerald-600 dark:text-emerald-400 not-italic">{mandatoryLiabilityMT} MT</strong> of {materialCategory} scrap into certified secondary processing facilities to fulfill 100% CPCB statutory compliance and abate <strong className="text-emerald-600 dark:text-emerald-400 not-italic">{requiredCarbonAbatementKg.toLocaleString("en-IN")} kg CO₂e</strong>.&rdquo;
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold uppercase">
                      Audited Polygon Amoy Consensus Ready
                    </span>
                  </div>
                  <Link
                    href="/marketplace"
                    className="inline-flex items-center gap-1 text-xs text-zinc-900 dark:text-white hover:underline font-bold"
                  >
                    <span>Browse Matching Lots</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
