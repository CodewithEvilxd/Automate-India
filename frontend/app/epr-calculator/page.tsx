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
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { DEMO_MATERIALS } from "@/lib/demo-data";

export default function EPRCalculatorPage() {
  const [industry, setIndustry] = useState("automotive");
  const [productionMT, setProductionMT] = useState<number>(350);
  const [materialCategory, setMaterialCategory] = useState("aluminum");
  const [companyName, setCompanyName] = useState("Tata Motors Ancillary Unit / NCR");
  const [isGenerated, setIsGenerated] = useState(false);

  // CPCB 2026 Mandate Target Percentages
  const CPCB_TARGETS: Record<string, number> = {
    aluminum: 0.75, // 75% recycling mandate
    steel: 0.70,    // 70%
    plastic_pet: 0.80, // 80% Category I Rigid
    plastic_hdpe: 0.70, // 70% Category II Flexible
    paper: 0.65,    // 65% Corrugated
    electronic: 0.85, // 85% Schedule I E-Waste
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

  const totalMatchingMassAvailable = matchingLots.reduce((acc, curr) => acc + curr.estimated_weight_kg, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#10140F] text-[#EDEAE0] flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Header */}
        <div className="border-b border-[#2E362C] pb-6 mb-8">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded bg-[#4E9B6F]/20 text-[#4E9B6F] border border-[#4E9B6F]/40 font-mono text-[10px] font-bold uppercase tracking-widest">
              CPCB EPR Compliance &bull; FY 2026-27
            </span>
            <span className="font-mono text-[10px] text-[#8B9188]">
              Central Pollution Control Board Rules 2022/2024
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEAE0]">
            Corporate EPR Liability Simulator
          </h1>
          <p className="text-[#8B9188] text-sm mt-1 max-w-2xl font-sans">
            Calculate your mandatory Indian Extended Producer Responsibility (EPR) recycling obligation and simulate 100% offset fulfillment with audited on-chain scrap lots.
          </p>
        </div>

        {/* Input Form & Instant Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Form Controls (5 cols) */}
          <div className="lg:col-span-5 bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-6 font-mono text-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#2E362C]">
              <Calculator className="w-4 h-4 text-[#4E9B6F]" />
              <span className="font-bold text-[#EDEAE0] uppercase tracking-wider text-xs">
                Enterprise Input Parameters
              </span>
            </div>

            <div>
              <label className="block text-[#8B9188] text-[10px] uppercase mb-1.5">
                Corporate Entity / Manufacturing Plant
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#10140F] border border-[#2E362C] focus:border-[#4E9B6F] rounded px-3 py-2 text-[#EDEAE0] font-sans text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8B9188] text-[10px] uppercase mb-1.5">
                Target Industry Sector
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-[#10140F] border border-[#2E362C] focus:border-[#4E9B6F] rounded px-3 py-2 text-[#EDEAE0] font-sans text-xs outline-none"
              >
                <option value="automotive">Automotive & Heavy Engineering</option>
                <option value="fmcg">FMCG & Consumer Packaging</option>
                <option value="electronics">Electronics & Telecom Equipment</option>
                <option value="construction">Infrastructure & Construction</option>
              </select>
            </div>

            <div>
              <label className="block text-[#8B9188] text-[10px] uppercase mb-1.5">
                Material Class (CPCB Schedule)
              </label>
              <select
                value={materialCategory}
                onChange={(e) => setMaterialCategory(e.target.value)}
                className="w-full bg-[#10140F] border border-[#2E362C] focus:border-[#4E9B6F] rounded px-3 py-2 text-[#EDEAE0] font-sans text-xs outline-none"
              >
                <option value="aluminum">Aluminum Scrap (Automotive/Architectural)</option>
                <option value="steel">Steel Scrap & Heavy Ferrous</option>
                <option value="plastic_pet">PET Plastic (Rigid Category I)</option>
                <option value="plastic_hdpe">HDPE Plastic (Flexible Category II)</option>
                <option value="paper">Corrugated Packaging (OCC Paper)</option>
                <option value="electronic">E-Waste (Schedule I IT & Telecom)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[#8B9188] text-[10px] uppercase">
                  Annual Material Consumption
                </label>
                <span className="font-bold text-[#4E9B6F] text-xs">{productionMT} MT</span>
              </div>
              <input
                type="range"
                min={20}
                max={2000}
                step={10}
                value={productionMT}
                onChange={(e) => setProductionMT(Number(e.target.value))}
                className="w-full accent-[#4E9B6F] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8B9188] mt-1">
                <span>20 MT</span>
                <span>1,000 MT</span>
                <span>2,000 MT</span>
              </div>
            </div>

            <div className="p-3 bg-[#10140F] border border-[#2E362C] rounded text-[11px] text-[#8B9188] font-sans">
              <span className="font-bold text-[#4E9B6F]">CPCB 2026 Mandate:</span> Under EPR rules, your industry must divert at least <span className="text-[#EDEAE0] font-bold">{(targetPct * 100).toFixed(0)}%</span> of total consumed mass via certified recycling ledgers.
            </div>
          </div>

          {/* Output Results & Official Audit Sheet (7 cols) */}
          <div className="lg:col-span-7 space-y-6 font-mono text-xs">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#1B211A] border border-[#2E362C] rounded-[6px]">
                <span className="text-[10px] text-[#8B9188] uppercase tracking-wider block mb-1">
                  Mandatory EPR Offset
                </span>
                <span className="font-display text-2xl font-bold text-[#EDEAE0] block">
                  {mandatoryLiabilityMT.toLocaleString("en-IN")} MT
                </span>
                <span className="text-[10px] text-[#4E9B6F] mt-1 block font-semibold">
                  {(targetPct * 100).toFixed(0)}% statutory requirement
                </span>
              </div>

              <div className="p-4 bg-[#1B211A] border border-[#2E362C] rounded-[6px]">
                <span className="text-[10px] text-[#8B9188] uppercase tracking-wider block mb-1">
                  Required CO₂ Abatement
                </span>
                <span className="font-display text-2xl font-bold text-[#4E9B6F] block">
                  {(requiredCarbonAbatementKg / 1000).toFixed(1)} MT
                </span>
                <span className="text-[10px] text-[#8B9188] mt-1 block">
                  EPA WARM Standard
                </span>
              </div>

              <div className="p-4 bg-[#1B211A] border border-[#2E362C] rounded-[6px]">
                <span className="text-[10px] text-[#8B9188] uppercase tracking-wider block mb-1">
                  Marketplace Lots Match
                </span>
                <span className="font-display text-2xl font-bold text-[#D98A3D] block">
                  {matchingLots.length} Lots
                </span>
                <span className="text-[10px] text-[#8B9188] mt-1 block">
                  {(totalMatchingMassAvailable / 1000).toFixed(1)} MT available
                </span>
              </div>
            </div>

            {/* Official EPR Filing Sheet Card */}
            <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] overflow-hidden">
              <div className="bg-[#232B22] px-5 py-3 border-b border-[#2E362C] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#4E9B6F]" />
                  <span className="font-bold text-xs uppercase tracking-widest text-[#EDEAE0]">
                    Form 1 &bull; CPCB Corporate EPR Filing Assessment
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#10140F] hover:bg-[#2E362C] border border-[#2E362C] text-[#EDEAE0] rounded text-[10px] font-bold uppercase transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
              </div>

              <div className="p-6 space-y-4 font-mono text-xs">
                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#2E362C]">
                  <div>
                    <span className="text-[#8B9188] block text-[9px] uppercase">Corporate Entity</span>
                    <span className="text-[#EDEAE0] font-bold text-xs">{companyName}</span>
                  </div>
                  <div>
                    <span className="text-[#8B9188] block text-[9px] uppercase">Filing Year & Jurisdiction</span>
                    <span className="text-[#EDEAE0] font-bold text-xs">FY 2026-2027 (CPCB India)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#2E362C]">
                  <div>
                    <span className="text-[#8B9188] block text-[9px] uppercase">Declared Consumption</span>
                    <span className="text-[#EDEAE0] font-bold text-xs">{productionMT} Metric Tonnes</span>
                  </div>
                  <div>
                    <span className="text-[#8B9188] block text-[9px] uppercase">Statutory EPR Offset Obligation</span>
                    <span className="text-[#4E9B6F] font-bold text-xs">{mandatoryLiabilityMT} MT ({mandatoryLiabilityKg.toLocaleString("en-IN")} kg)</span>
                  </div>
                </div>

                <div className="p-3 bg-[#10140F] border border-[#2E362C] rounded text-[11px] leading-relaxed font-sans text-[#8B9188]">
                  &ldquo;This corporate assessment confirms that <strong className="text-[#EDEAE0]">{companyName}</strong> requires an audited diversion of <strong className="text-[#4E9B6F]">{mandatoryLiabilityMT} MT</strong> of {materialCategory} scrap to maintain 100% CPCB regulatory compliance and abate <strong className="text-[#4E9B6F]">{requiredCarbonAbatementKg.toLocaleString("en-IN")} kg CO₂e</strong>.&rdquo;
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4E9B6F]" />
                    <span className="text-[10px] text-[#4E9B6F] font-semibold uppercase">
                      CircularChain On-Chain Ledger Verification Active
                    </span>
                  </div>
                  <Link
                    href="/marketplace"
                    className="inline-flex items-center gap-1.5 text-xs text-[#4E9B6F] hover:underline font-bold uppercase"
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

      {/* Footer */}
      <footer className="border-t border-[#2E362C] bg-[#10140F] py-8 text-center font-mono text-xs text-[#8B9188]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4E9B6F]" />
            <span>CircularChain Corporate EPR Simulator</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#4E9B6F] transition-colors">
              Overview
            </Link>
            <span>&bull;</span>
            <Link href="/marketplace" className="hover:text-[#4E9B6F] transition-colors">
              Marketplace
            </Link>
            <span>&bull;</span>
            <Link href="/verify" className="hover:text-[#4E9B6F] transition-colors">
              Verify
            </Link>
          </div>
          <div className="text-[10px]">Ministry of Environment, Forest and Climate Change (MoEFCC) Guidelines</div>
        </div>
      </footer>
    </div>
  );
}
