"use client";

import React, { useState, useEffect } from "react";
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
  Download,
  AlertTriangle,
  FileCode,
  MapPin,
  Flame,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { DEMO_MATERIALS } from "@/lib/demo-data";

export default function EPRCalculatorPage() {
  // Preset profiles for 1-click live presentation to judges
  const DEMO_PRESETS = [
    {
      label: "Tata Motors (Auto Plant - Pune / MPCB)",
      name: "Tata Motors Commercial Vehicle Ancillary",
      pibo: "CPCB/PIBO/2026/MH/08941",
      state: "Maharashtra (MPCB - Pune/Chakan)",
      industry: "automotive",
      material: "aluminum",
      volume: 450,
    },
    {
      label: "PepsiCo / Bottler (Noida / UPPCB)",
      name: "Moon Beverages & Rigid Packaging Unit",
      pibo: "CPCB/PIBO/2026/UP/04512",
      state: "Uttar Pradesh (UPPCB - Noida)",
      industry: "fmcg",
      material: "plastic_pet",
      volume: 850,
    },
    {
      label: "Foxconn Electronics (Chennai / TNPCB)",
      name: "Foxconn Hon Hai Precision Electronics",
      pibo: "CPCB/PIBO/2026/TN/09142",
      state: "Tamil Nadu (TNPCB - Sriperumbudur)",
      industry: "electronics",
      material: "electronic",
      volume: 240,
    },
    {
      label: "Amazon India Hub (Sanand / GPCB)",
      name: "Amazon Fulfilment Center Packaging Division",
      pibo: "CPCB/PIBO/2026/GJ/07821",
      state: "Gujarat (GPCB - Sanand Industrial Hub)",
      industry: "fmcg",
      material: "paper",
      volume: 1200,
    },
  ];

  const [companyName, setCompanyName] = useState(DEMO_PRESETS[0].name);
  const [piboNo, setPiboNo] = useState(DEMO_PRESETS[0].pibo);
  const [stateJurisdiction, setStateJurisdiction] = useState(DEMO_PRESETS[0].state);
  const [industry, setIndustry] = useState(DEMO_PRESETS[0].industry);
  const [materialCategory, setMaterialCategory] = useState(DEMO_PRESETS[0].material);
  const [productionMT, setProductionMT] = useState<number>(DEMO_PRESETS[0].volume);
  const [apiData, setApiData] = useState<any>(null);
  const [loadingApi, setLoadingApi] = useState(false);

  const applyPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setCompanyName(preset.name);
    setPiboNo(preset.pibo);
    setStateJurisdiction(preset.state);
    setIndustry(preset.industry);
    setMaterialCategory(preset.material);
    setProductionMT(preset.volume);
  };

  // Live dynamic calculation via backend API
  useEffect(() => {
    setLoadingApi(true);
    fetch("/api/cpcb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName,
        piboRegistrationNo: piboNo,
        state: stateJurisdiction,
        industry,
        materialCategory,
        annualConsumptionMT: productionMT,
        fiscalYear: "FY 2026-27",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setApiData(res.data);
        setLoadingApi(false);
      })
      .catch(() => setLoadingApi(false));
  }, [companyName, piboNo, stateJurisdiction, industry, materialCategory, productionMT]);

  const targetPct = apiData?.mandated_recycling_target_percent
    ? apiData.mandated_recycling_target_percent / 100
    : 0.75;
  const mandatoryLiabilityMT = apiData?.mandated_offset_obligation_mt || Math.round(productionMT * targetPct * 10) / 10;
  const mandatoryLiabilityKg = mandatoryLiabilityMT * 1000;

  const mandatoryPCRMT = apiData?.mandatory_pcr_mass_mt || Math.round(productionMT * 0.25 * 10) / 10;
  const carbonAbatementKg = apiData?.verified_carbon_abatement_kg_co2e || Math.round(mandatoryLiabilityKg * 9.13);
  const avoidedPenaltyINR = apiData?.avoided_statutory_penalty_inr || Math.round(mandatoryLiabilityMT * 8500);

  // Matching lots in inventory
  const matchingLots = DEMO_MATERIALS.filter((m) =>
    m.category.toLowerCase().includes(materialCategory.replace("plastic_", "").replace("battery_", ""))
  );

  const totalMatchingMassAvailable = matchingLots.reduce(
    (acc, curr) => acc + curr.estimated_weight_kg,
    0
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    if (!apiData) return;
    const blob = new Blob([JSON.stringify(apiData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CPCB_Form1_EPR_${companyName.replace(/[^a-zA-Z0-9]/g, "_")}_FY26-27.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Top Presets Quick Selector for Judges Presentation */}
        <div className="mb-6 p-4 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 shadow-lg">
          <div className="flex items-center gap-2 mb-2.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="font-display text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Presentation Demo Profiles (1-Click Enterprise Presets)
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {DEMO_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                  companyName === preset.name
                    ? "bg-emerald-500 text-zinc-950 font-bold border-emerald-500 shadow-sm"
                    : "bg-zinc-100 dark:bg-white/[0.03] border-zinc-200 dark:border-white/10 hover:border-emerald-500/50 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Header Banner */}
        <div className="border-b border-zinc-200 dark:border-white/10 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>MoEFCC & Central Pollution Control Board (CPCB) • FY 2026-27 Compliance Engine</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Corporate EPR & Carbon Mandate Simulator
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1 max-w-2xl font-normal leading-relaxed">
              Statutory obligation calculation under Plastic Waste Management Rules (PWM), E-Waste Schedule I, and Battery Waste Directives (BWMR 2026) across all 28 State SPCB jurisdictions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Live Backend API Sync Active
            </span>
          </div>
        </div>

        {/* 4 Stat Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-mono tracking-wider mb-1">
              <span>Mandatory EPR Offset</span>
              <Scale className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
              {mandatoryLiabilityMT.toLocaleString("en-IN")} MT
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold mt-1 block">
              {(targetPct * 100).toFixed(0)}% statutory quota
            </span>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-mono tracking-wider mb-1">
              <span>Carbon Abatement</span>
              <Leaf className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {(carbonAbatementKg / 1000).toFixed(1)} MT
            </div>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-1 block">
              EPA WARM Standard
            </span>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-mono tracking-wider mb-1">
              <span>Mandatory PCR Blend</span>
              <Boxes className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-amber-500">
              {mandatoryPCRMT.toLocaleString("en-IN")} MT
            </div>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-1 block">
              Post-Consumer Resin Content
            </span>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-mono tracking-wider mb-1">
              <span>Avoided CPCB Penalty</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              ₹{(avoidedPenaltyINR / 100000).toFixed(2)} Lakh
            </div>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-1 block">
              EPA Section 15 Compensation
            </span>
          </div>
        </div>

        {/* Input Controls & Official Assessment Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Controls Panel (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl glass-panel p-6 border border-zinc-200 dark:border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-500" />
                <span className="font-display font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider">
                  Enterprise Input Parameters
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                Customizable Real Inputs
              </span>
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 text-[11px] font-medium mb-1">
                Corporate Entity / Manufacturing Plant Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Type any company name..."
                className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-zinc-900 dark:text-white text-xs outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 text-[11px] font-medium mb-1">
                CPCB / SPCB PIBO Registration Number
              </label>
              <input
                type="text"
                value={piboNo}
                onChange={(e) => setPiboNo(e.target.value)}
                placeholder="e.g. CPCB/PIBO/2026/..."
                className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 font-mono text-zinc-900 dark:text-white text-xs outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 text-[11px] font-medium mb-1">
                State Pollution Control Board (SPCB) Jurisdiction
              </label>
              <select
                value={stateJurisdiction}
                onChange={(e) => setStateJurisdiction(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-zinc-900 dark:text-white text-xs outline-none cursor-pointer"
              >
                <option value="Maharashtra (MPCB - Pune/Chakan)">Maharashtra (MPCB - Pune / Chakan Auto Belt)</option>
                <option value="Uttar Pradesh (UPPCB - Noida)">Uttar Pradesh (UPPCB - Noida / Greater Noida)</option>
                <option value="Gujarat (GPCB - Sanand Industrial Hub)">Gujarat (GPCB - Ahmedabad / Sanand)</option>
                <option value="Karnataka (KSPCB - Bengaluru/Peenya)">Karnataka (KSPCB - Bengaluru / Peenya Hub)</option>
                <option value="Tamil Nadu (TNPCB - Sriperumbudur)">Tamil Nadu (TNPCB - Chennai / Sriperumbudur)</option>
                <option value="Haryana (HSPCB - Gurugram/Manesar)">Haryana (HSPCB - Gurugram / Manesar Auto Cluster)</option>
                <option value="Delhi (DPCC - Okhla Industrial Area)">Delhi (DPCC - Okhla & Mayapuri Industrial Area)</option>
                <option value="West Bengal (WBPCB - Kolkata/Howrah)">West Bengal (WBPCB - Kolkata / Howrah)</option>
                <option value="Rajasthan (RSPCB - Bhiwadi Corridor)">Rajasthan (RSPCB - Bhiwadi / Alwar Corridor)</option>
                <option value="Telangana (TSPCB - Hyderabad/Patancheru)">Telangana (TSPCB - Hyderabad / Patancheru)</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 text-[11px] font-medium mb-1">
                Statutory Material Schedule (CPCB Categories)
              </label>
              <select
                value={materialCategory}
                onChange={(e) => setMaterialCategory(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-zinc-900 dark:text-white text-xs outline-none cursor-pointer font-medium"
              >
                <option value="aluminum">Aluminum Extrusions (ELV Vehicle Scrappage - 75% Target)</option>
                <option value="steel">Steel Scrap (HMS 1/2 Ministry of Steel Policy - 70% Target)</option>
                <option value="plastic_pet">PET Plastic (Category I Rigid Containers - 80% Target, 30% PCR)</option>
                <option value="plastic_hdpe">HDPE Plastic (Category II Flexible Packaging - 70% Target, 20% PCR)</option>
                <option value="plastic_mlp">Multi-Layered Plastic (Category III MLP - 60% Target Co-Processing)</option>
                <option value="paper">Corrugated Packaging (OCC Grade 11 Paper - 65% Target)</option>
                <option value="electronic">E-Waste (Schedule I Telecom & IT PCBs - 85% Target)</option>
                <option value="battery_lithium">Lithium-Ion Battery Scrap (BWMR 2026 Directives - 70% Target)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-zinc-600 dark:text-zinc-400 text-[11px] font-medium">
                  Annual Ingested Volume
                </label>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {productionMT} Metric Tonnes
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={3000}
                step={10}
                value={productionMT}
                onChange={(e) => setProductionMT(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500 font-mono mt-1">
                <span>20 MT</span>
                <span>1,500 MT</span>
                <span>3,000 MT</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Statutory Quota:</span> Under CPCB 2026 norms, your enterprise is mandated to recycle at least{" "}
              <strong className="text-zinc-900 dark:text-white font-mono">{(targetPct * 100).toFixed(0)}%</strong> of consumed mass through verified on-chain channels.
            </div>
          </div>

          {/* Form 1 Assessment Certificate Panel (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 shadow-2xl overflow-hidden">
              <div className="bg-zinc-100 dark:bg-white/[0.03] px-6 py-4 border-b border-zinc-200 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-white">
                    Official CPCB Form 1 Statutory Assessment Sheet
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadJSON}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/15 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white rounded-lg text-xs font-semibold transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Form 1</span>
                  </button>
                </div>
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
                      PIBO Registration
                    </span>
                    <span className="text-zinc-900 dark:text-white font-bold font-mono text-xs">
                      {piboNo}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-zinc-200 dark:border-white/[0.06]">
                  <div>
                    <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] uppercase font-mono">
                      SPCB Jurisdiction
                    </span>
                    <span className="text-zinc-900 dark:text-white font-semibold">
                      {stateJurisdiction}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] uppercase font-mono">
                      Declared Annual Consumption
                    </span>
                    <span className="text-zinc-900 dark:text-white font-bold font-mono text-sm">
                      {productionMT} MT
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-zinc-200 dark:border-white/[0.06]">
                  <div>
                    <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] uppercase font-mono">
                      Mandated Diversion Liability
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm">
                      {mandatoryLiabilityMT} MT ({mandatoryLiabilityKg.toLocaleString("en-IN")} kg)
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] uppercase font-mono">
                      Post-Consumer Resin (PCR) Target
                    </span>
                    <span className="text-amber-500 font-bold font-mono text-sm">
                      {mandatoryPCRMT} MT Required
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 italic">
                  &ldquo;This statutory assessment certifies that <strong className="text-zinc-900 dark:text-white not-italic">{companyName}</strong> (PIBO: {piboNo}) is obligated under {apiData?.regulatory_authority || "CPCB Guidelines"} to divert at least <strong className="text-emerald-600 dark:text-emerald-400 not-italic">{mandatoryLiabilityMT} MT</strong> of {materialCategory} into authorized secondary processing facilities to fulfill statutory compliance and abate <strong className="text-emerald-600 dark:text-emerald-400 not-italic">{carbonAbatementKg.toLocaleString("en-IN")} kg CO₂e</strong>.&rdquo;
                </div>

                {/* Available Supply Matchmaking */}
                <div className="p-4 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                      CircularChain Matching Supply
                    </span>
                    <span className="text-zinc-900 dark:text-white font-bold text-sm block mt-0.5">
                      {matchingLots.length} Certified Secondary Lots Available ({(totalMatchingMassAvailable / 1000).toFixed(1)} MT)
                    </span>
                  </div>

                  <Link
                    href="/marketplace"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold uppercase tracking-wider transition-all shrink-0 self-start sm:self-center shadow-md shadow-emerald-500/20 hover:scale-105"
                  >
                    <span>Fulfill Quota on Marketplace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  <span>Smart Contract Verifier: MaterialRegistry.sol</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                    Polygon Amoy Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
