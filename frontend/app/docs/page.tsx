"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import { CylinderCarousel } from "@/components/ui/cylinder-carousel";
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
  SketchChecklistItem,
} from "@/components/SketchElements";

const CAROUSEL_CARDS = [
  { src: "/carousel/card-01.png", title: "Secondary Aluminum 6063 Ingot", category: "Non-Ferrous", alt: "Aluminum Scrap Ingot" },
  { src: "/carousel/card-02.png", title: "Stripped Heavy Berry Copper", category: "High Purity", alt: "Copper Wire Bales" },
  { src: "/carousel/card-03.png", title: "Hot-Washed PET Bottle Flakes", category: "Polymers", alt: "PET Flakes" },
  { src: "/carousel/card-04.png", title: "Blue HDPE Reprocessed Granules", category: "Rigid Plastic", alt: "HDPE Granules" },
  { src: "/carousel/card-05.png", title: "Lithium Battery Black Mass", category: "Critical Minerals", alt: "EV Battery Black Mass" },
  { src: "/carousel/card-06.png", title: "Heavy Melting Steel (HMS 1/2)", category: "Ferrous Scrap", alt: "Heavy Steel Scrap" },
  { src: "/carousel/card-07.png", title: "Agent 01 Optical Vision Scan", category: "AI Computer Vision", alt: "Optical Quality Scan" },
  { src: "/carousel/card-08.png", title: "Grassroots Scrap Aggregation", category: "Social Inclusion", alt: "Kabadiwala Shop Depot" },
  { src: "/carousel/card-09.png", title: "Digital Weighbridge Telemetry", category: "Audit Trail", alt: "Weighbridge Scale" },
  { src: "/carousel/card-10.png", title: "Certified Secondary Smelting", category: "Zero-Landfill", alt: "Clean Smelting Plant" },
];

import {
  Cpu,
  Scale,
  Zap,
  Mic,
  ShieldAlert,
  Building2,
  Lock,
  Code2,
  AlertTriangle,
  CheckCircle2,
  Rocket,
  ChevronRight,
  PenTool,
  Boxes,
  Compass,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";

export default function DocsOverviewPage() {
  // Interactive mini calculator state
  const [calcMaterial, setCalcMaterial] = useState<"ALUMINUM" | "COPPER" | "PET" | "HDPE" | "STEEL">("ALUMINUM");
  const [calcQuantity, setCalcQuantity] = useState<number>(500);

  // Active Architecture Tab
  const [activeTab, setActiveTab] = useState<"FLOW" | "MATH" | "CPCB" | "SOLIDITY">("FLOW");

  const MATERIAL_FACTORS = {
    ALUMINUM: { name: "Secondary Aluminum 6063", epaFactor: 9.13, mcxPrice: 242.5, cpcbTarget: "70%", penaltyRate: 25000 },
    COPPER: { name: "Berry Copper Wire", epaFactor: 2.81, mcxPrice: 875.0, cpcbTarget: "80%", penaltyRate: 35000 },
    PET: { name: "Hot-Washed PET Flakes", epaFactor: 1.48, mcxPrice: 78.0, cpcbTarget: "60%", penaltyRate: 15000 },
    HDPE: { name: "Rigid HDPE Granules", epaFactor: 1.22, mcxPrice: 94.0, cpcbTarget: "60%", penaltyRate: 15000 },
    STEEL: { name: "Heavy Melting Steel (HMS 1/2)", epaFactor: 1.67, mcxPrice: 46.5, cpcbTarget: "75%", penaltyRate: 18000 },
  };

  const selectedFactor = MATERIAL_FACTORS[calcMaterial];
  const totalCarbonOffset = ((calcQuantity * selectedFactor.epaFactor) / 1000).toFixed(2);
  const totalMarketValue = (calcQuantity * selectedFactor.mcxPrice).toLocaleString("en-IN");
  const totalAvoidedPenalty = ((calcQuantity / 1000) * selectedFactor.penaltyRate).toLocaleString("en-IN");

  const chapters = [
    {
      title: "The Global & National Crisis",
      desc: "Deep-dive into $12.4B ESG circularity fraud, 90% unorganized kabadiwala sector exploitation, and strict CPCB penalty structures.",
      href: "/docs/problem-statement",
      icon: AlertTriangle,
      badge: "Critical",
      attachType: "paperclip",
      tapeColor: "pink" as const,
      tilt: "rotate-0.5",
    },
    {
      title: "Linear vs CircularChain Protocol",
      desc: "Granular architectural comparison across Purity Testing, EPA Math, MCX Pricing, Informal Speech, and On-Chain Settlement.",
      href: "/docs/solution-comparison",
      icon: CheckCircle2,
      badge: "Architecture",
      attachType: "tape-center",
      tapeColor: "mint" as const,
      tilt: "-rotate-0.5",
    },
    {
      title: "Developer & Recycler Quickstart",
      desc: "3-minute onboarding paths for informal scrap aggregators (voice & camera), enterprise OEMs, and Web3 developers.",
      href: "/docs/quickstart",
      icon: Rocket,
      badge: "Quickstart",
      attachType: "tape-corner",
      tapeColor: "yellow" as const,
      tilt: "rotate-0.5",
    },
    {
      title: "Agent 01: Optical Quality Vision",
      desc: "Multi-Modal semantic segmentation detecting surface oxidation, PVC label impurities, and assigning ISO 9001 grades.",
      href: "/docs/agents/agent-01",
      icon: Cpu,
      badge: "Agent 01",
      attachType: "paperclip",
      tapeColor: "mint" as const,
      tilt: "-rotate-0.5",
    },
    {
      title: "Agent 02: EPA WARM Carbon Math",
      desc: "Deterministic life-cycle carbon math (9.13 kg CO₂e for Alum, 2.81 for Copper) with zero generative AI hallucination.",
      href: "/docs/agents/agent-02",
      icon: Scale,
      badge: "Agent 02",
      attachType: "tape-center",
      tapeColor: "kraft" as const,
      tilt: "rotate-0.5",
    },
    {
      title: "Agent 03: MCX Oracle & Logistics",
      desc: "Continuous Multi Commodity Exchange price discovery coupled with Haversine transport carbon route optimization.",
      href: "/docs/agents/agent-03",
      icon: Zap,
      badge: "Agent 03",
      attachType: "tape-corner",
      tapeColor: "yellow" as const,
      tilt: "-rotate-0.5",
    },
    {
      title: "Agent 04: Indic Voice NLP Bridge",
      desc: "Multi-lingual speech recognition parsing colloquial Hindi, Tamil, Telugu, Marathi, and Bengali into structured listings.",
      href: "/docs/agents/agent-04",
      icon: Mic,
      badge: "Agent 04",
      attachType: "paperclip",
      tapeColor: "pink" as const,
      tilt: "rotate-0.5",
    },
    {
      title: "Agent 05: Cryptographic Fraud Radar",
      desc: "Pre-execution wash-trading detection, double-claim blocker, and anomalous mass inflation audits.",
      href: "/docs/agents/agent-05",
      icon: ShieldAlert,
      badge: "Agent 05",
      attachType: "tape-center",
      tapeColor: "mint" as const,
      tilt: "-rotate-0.5",
    },
    {
      title: "Agent 06: CPCB Statutory EPR Shield",
      desc: "Automated MoEFCC PWM Rules 2026 quota fulfillment, digital certificate generation, and avoided penalty calculations.",
      href: "/docs/agents/agent-06",
      icon: Building2,
      badge: "Agent 06",
      attachType: "tape-corner",
      tapeColor: "kraft" as const,
      tilt: "rotate-0.5",
    },
    {
      title: "Polygon Amoy Smart Contracts",
      desc: "Decentralized ownership settlement, Solidity contract topology (80002), and IPFS visual proof pinning.",
      href: "/docs/blockchain",
      icon: Lock,
      badge: "Web3",
      attachType: "paperclip",
      tapeColor: "yellow" as const,
      tilt: "-rotate-0.5",
    },
    {
      title: "Interactive REST API Reference",
      desc: "Live interactive sandbox testing /api/mcx-oracle, /api/cpcb/calculate, and /api/verify-transfer in cURL, TS, and Python.",
      href: "/docs/api",
      icon: Code2,
      badge: "Developer",
      attachType: "tape-center",
      tapeColor: "mint" as const,
      tilt: "rotate-0.5",
    },
  ];

  return (
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      <div className="notebook-doc-scope flex-1 flex flex-col">

      {/* Realistic Notebook Top Header Banner with Washi Tape & Stamp */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        
        {/* Top washi tape on the whole header */}
        <WashiTapeCenter color="kraft" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-2 border-red-300/60 dark:border-red-500/30 pl-4 sm:pl-8 ml-1 sm:ml-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_#10B981]">
              <PenTool className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Architectural Field Notes v2.4</span>
            </span>
            <StampBadge label="VERIFIED PROTOCOL SPEC" variant="emerald" />
            <StampBadge label="CPCB 2026 COMPLIANT" variant="amber" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            CircularChain <span className="highlight-yellow px-2">Architectural Whitepaper</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            The definitive engineering protocol for transforming India’s <DoodleCircle className="text-amber-500">$40B+ Scrap Economy</DoodleCircle> into a deterministic, verifiable on-chain circularity exchange using 6 autonomous AI agents, EPA WARM life-cycle carbon math, MCX price oracles, and Polygon Amoy smart contracts.
          </p>
        </div>
      </div>

      {/* Main Content Layout with Punched Spiral Rings & Red Margin Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 relative">
        
        {/* Left Spiral Rings Effect */}
        <NotebookSpiralBinding count={10} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pl-4 sm:pl-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          {/* Main Technical Content Canvas */}
          <main className="lg:col-span-9 space-y-12 border-l-2 border-red-300/50 dark:border-red-500/20 pl-4 sm:pl-6">
            
            {/* SECTION 1: 3-Column Sticky Architecture Notes (User's Exact Blueprint Pattern) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Note 1: ML Model */}
              <div className="relative p-6 rounded-3xl bg-[#FEFCE8] dark:bg-[#15161E] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] dark:shadow-[4px_5px_0px_#10B981] transform -rotate-0.5 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between min-h-[250px]">
                <PaperclipElement />
                <div className="space-y-3">
                  <div className="w-fit">
                    <h3 className="font-sketch text-xl font-bold text-zinc-900 dark:text-white">
                      ML Models:
                    </h3>
                    <DoodleUnderline className="text-zinc-950 dark:text-white" />
                  </div>

                  <ul className="space-y-1.5 font-sketch text-sm text-zinc-800 dark:text-zinc-200 leading-snug">
                    <li>• Tool-calling Multi-Agent LLM</li>
                    <li>• BGE-M3 Multilingual Embeddings</li>
                    <li>• OpenCV Pixel Contour Masking</li>
                    <li>• EPA WARM v15 Carbon Math</li>
                    <li>• Simulation & Routing Engine</li>
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-dashed border-amber-300 dark:border-white/10">
                  <span className="font-mono text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300">[ AGENTS 01 & 02 ]</span>
                  <DoodleStar className="text-amber-500" />
                </div>
              </div>

              {/* Note 2: Database */}
              <div className="relative p-6 rounded-3xl bg-[#F0FDF4] dark:bg-[#15161E] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] dark:shadow-[4px_5px_0px_#F59E0B] transform rotate-0.5 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between min-h-[250px]">
                <WashiTapeCenter color="mint" />
                <div className="space-y-3">
                  <div className="w-fit">
                    <h3 className="font-sketch text-xl font-bold text-zinc-900 dark:text-white">
                      Database:
                    </h3>
                    <DoodleUnderline className="text-zinc-950 dark:text-white" />
                  </div>

                  <ul className="space-y-1.5 font-sketch text-sm text-zinc-800 dark:text-zinc-200 leading-snug">
                    <li>• PostgreSQL / PostGIS Spatial</li>
                    <li>• Redis Event Bus & MCX Stream</li>
                    <li>• Local SQLite / Room Cache</li>
                    <li>• Pinata IPFS Cryptographic Hash</li>
                    <li>• Object Blob Storage (S3/GCS)</li>
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-dashed border-emerald-300 dark:border-white/10">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">[ AGENT 03 ORACLE ]</span>
                  <DoodleDatabase className="text-emerald-500" />
                </div>
              </div>

              {/* Note 3: Cloud / Edge */}
              <div className="relative p-6 rounded-3xl bg-[#EFF6FF] dark:bg-[#15161E] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] dark:shadow-[4px_5px_0px_#10B981] transform -rotate-0.5 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between min-h-[250px]">
                <WashiTapeCorner color="yellow" />
                <div className="space-y-3">
                  <div className="w-fit">
                    <h3 className="font-sketch text-xl font-bold text-zinc-900 dark:text-white">
                      Cloud / Edge:
                    </h3>
                    <DoodleUnderline className="text-zinc-950 dark:text-white" />
                  </div>

                  <ul className="space-y-1.5 font-sketch text-sm text-zinc-800 dark:text-zinc-200 leading-snug">
                    <li>• Cloud APIs & Processing</li>
                    <li>• Polygon Amoy (Chain ID: 80002)</li>
                    <li>• Offline Mobile SQLite Layer</li>
                    <li>• Phone-First Voice Interface</li>
                    <li>• Edge Camera OCR Ingestion</li>
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-dashed border-sky-300 dark:border-white/10">
                  <span className="font-mono text-[10px] uppercase font-bold text-sky-800 dark:text-sky-300">[ AGENTS 05 & 06 ]</span>
                  <DoodleCloud className="text-sky-500" />
                </div>
              </div>
            </div>

            {/* SECTION 2: Interactive 3D Specimen Turntable */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] overflow-hidden backdrop-blur-xl">
              <WashiTapeCenter color="kraft" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-dashed border-zinc-300 dark:border-white/10">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-sketch text-xs font-bold uppercase mb-1 border border-emerald-300">
                    <Boxes className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>3D Physical Specimen Turntable</span>
                  </div>
                  <h3 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                    10 Verified Secondary Material Streams
                  </h3>
                </div>
                <StampBadge label="100% REAL INDUSTRIAL SAMPLES" variant="emerald" />
              </div>

              {/* Cylinder Component */}
              <div className="w-full relative py-2">
                <CylinderCarousel
                  images={CAROUSEL_CARDS}
                  animationDuration={28}
                  cardWidth={230}
                  className="py-2"
                />
              </div>

              <div className="mt-4 pt-3 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sketch text-sm text-zinc-600 dark:text-zinc-400">
                <span>Contour segmented by Agent 01 • Certified ISO 9001 Secondary Scrap</span>
                <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                  Polygon Amoy Testnet (80002)
                </span>
              </div>
            </div>

            {/* SECTION 3: Interactive Tabbed Technical Inspector */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCenter color="mint" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-4">
                <div>
                  <span className="font-sketch text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 block tracking-wider">
                    Interactive Protocol Inspector
                  </span>
                  <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                    Autonomous Multi-Agent Architecture
                  </h2>
                </div>

                {/* Tab buttons */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "FLOW", label: "Agent Flowchart" },
                    { id: "MATH", label: "EPA Math Proof" },
                    { id: "CPCB", label: "CPCB 2026 Mandates" },
                    { id: "SOLIDITY", label: "Polygon Contract" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-xl font-sketch text-xs font-bold border-2 transition-all ${
                        activeTab === tab.id
                          ? "bg-amber-400 text-zinc-950 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] transform -rotate-1"
                          : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-white/10 hover:border-zinc-500"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab 1: Flowchart Architecture */}
              {activeTab === "FLOW" && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-4">
                    <span className="font-sketch font-bold text-sm text-zinc-900 dark:text-white block border-b border-dashed border-amber-300 pb-2">
                      Autonomous 6-Agent Sequential Execution Pipeline
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-950">
                        <span className="font-mono text-[10px] uppercase font-bold text-emerald-600 block">01. INGESTION LAYER</span>
                        <h4 className="font-sketch text-base font-bold mt-1">Agents 01 & 04</h4>
                        <p className="font-sans text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                          Camera pixel segmentation masks impurities + Indic voice parses raw Hindi mandi speech.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-950">
                        <span className="font-mono text-[10px] uppercase font-bold text-amber-600 block">02. VALUATION & LCA</span>
                        <h4 className="font-sketch text-base font-bold mt-1">Agents 02 & 03</h4>
                        <p className="font-sans text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                          Applies EPA WARM v15 lifecycle math + polls live MCX spot indices every 60 seconds.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-950">
                        <span className="font-mono text-[10px] uppercase font-bold text-rose-600 block">03. SETTLEMENT & EPR</span>
                        <h4 className="font-sketch text-base font-bold mt-1">Agents 05 & 06</h4>
                        <p className="font-sans text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                          Cryptographic wash-trading fraud radar + automated CPCB EPR certificate issuance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: EPA Math Proof */}
              {activeTab === "MATH" && (
                <div className="p-6 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-3 font-sketch text-sm">
                  <div className="flex items-center justify-between border-b border-dashed border-amber-300 pb-2">
                    <span className="font-bold text-base">Mathematical Proof: EPA WARM v15 Life-Cycle Boundary</span>
                    <StampBadge label="ZERO HALLUCINATION" variant="emerald" />
                  </div>
                  <div className="py-2 text-emerald-800 dark:text-emerald-300 text-base sm:text-lg font-bold tracking-wide">
                    CO2e_Net = (Mass_Lot × Purity_Grade × E_Avoided) - (Distance_KM × Fleet_Carbon_Intensity)
                  </div>
                  <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    By calculating virgin bauxite mining avoidance (9.63 kg CO₂e/kg) minus secondary electric induction furnace smelting (0.50 kg CO₂e/kg), secondary aluminum achieves a deterministic net reduction factor of <strong>9.13 kg CO₂e per kg</strong>.
                  </p>
                </div>
              )}

              {/* Tab 3: CPCB Mandates */}
              {activeTab === "CPCB" && (
                <div className="p-6 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-3">
                  <span className="font-sketch font-bold text-base block border-b border-dashed border-amber-300 pb-2">
                    CPCB Plastic & E-Waste Recycling Quotas (FY 2025 - FY 2027)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                    <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-300 dark:border-white/10">
                      <strong className="font-sketch text-sm block text-zinc-900 dark:text-white">Rigid Category I Plastics</strong>
                      <p className="text-zinc-600 dark:text-zinc-300 mt-1">70% mandatory recycling quota in FY 25-26, rising to 80% in FY 26-27 with ₹15,000/MT Environmental Compensation penalties.</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-300 dark:border-white/10">
                      <strong className="font-sketch text-sm block text-zinc-900 dark:text-white">Non-Ferrous Metals (Alum & Copper)</strong>
                      <p className="text-zinc-600 dark:text-zinc-300 mt-1">100% digital weighbridge audit trail required under MoEFCC regulations with ₹25,000 to ₹35,000/MT non-compliance fines.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Solidity Smart Contract */}
              {activeTab === "SOLIDITY" && (
                <div className="p-6 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2 font-sketch text-xs sm:text-sm overflow-x-auto">
                  <div className="text-zinc-500">// Polygon Amoy Testnet (Chain ID: 80002)</div>
                  <div><span className="text-purple-700 dark:text-purple-400 font-bold">struct</span> <span className="text-amber-800 dark:text-amber-300 font-bold">MaterialLot</span> &#123;</div>
                  <div className="pl-4">uint256 lotId;</div>
                  <div className="pl-4">address seller; <span className="text-zinc-500">// Kabadiwala / Collector</span></div>
                  <div className="pl-4">address buyer; <span className="text-zinc-500">// Certified Smelter / OEM</span></div>
                  <div className="pl-4">uint256 massKg; <span className="text-zinc-500">// Certified Digital Weight</span></div>
                  <div className="pl-4">uint256 purityBps; <span className="text-zinc-500">// Agent 01 Score (9850 = 98.5%)</span></div>
                  <div className="pl-4">uint256 carbonOffsetKg; <span className="text-zinc-500">// EPA WARM LCA Math</span></div>
                  <div className="pl-4">string ipfsImageProof; <span className="text-zinc-500">// IPFS CID Visual Proof</span></div>
                  <div>&#125;</div>
                </div>
              )}
            </section>

            {/* SECTION 4: Interactive Live EPA & Penalty Simulator */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEF9C3]/40 dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#F59E0B] space-y-6">
              <WashiTapeCorner color="kraft" />
              
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 font-sketch text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
                  <span>Section 03 // Interactive Life-Cycle Calculator Simulator</span>
                </div>
                <StampBadge label="LIVE CALCULATION" variant="amber" />
              </div>

              <div>
                <h3 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                  Live Valuation & Carbon Math Sandbox
                </h3>
                <p className="font-sketch text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Adjust material stream and batch volume to simulate real-time MCX valuation, avoided CPCB penalty, and net Scope 3 carbon offsets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Input Controls */}
                <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[2px_3px_0px_rgba(0,0,0,0.8)]">
                  <div>
                    <label className="font-sketch text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 block mb-1.5">
                      Select Material Stream
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(Object.keys(MATERIAL_FACTORS) as Array<keyof typeof MATERIAL_FACTORS>).map((mat) => (
                        <button
                          key={mat}
                          onClick={() => setCalcMaterial(mat)}
                          className={`py-2 px-2.5 rounded-xl font-sketch text-xs font-bold border-2 transition-all ${
                            calcMaterial === mat
                              ? "bg-amber-400 text-zinc-950 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                              : "bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-white/10 hover:border-zinc-500"
                          }`}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-sketch text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300">
                        Batch Quantity (Kilograms)
                      </label>
                      <span className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        {calcQuantity.toLocaleString()} kg ({ (calcQuantity / 1000).toFixed(2) } MT)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="10000"
                      step="50"
                      value={calcQuantity}
                      onChange={(e) => setCalcQuantity(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Real-time Computed Results */}
                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[3px_4px_0px_#10B981] flex flex-col justify-between space-y-4">
                  <div>
                    <span className="font-sketch text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-wider block font-bold">
                      Target Stream: {selectedFactor.name}
                    </span>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/30">
                        <span className="font-sketch text-xs text-emerald-800 dark:text-emerald-300 block uppercase font-bold">Net Carbon Offset</span>
                        <span className="font-sketch text-xl font-extrabold text-emerald-900 dark:text-emerald-100 mt-1 block">
                          {totalCarbonOffset} <span className="text-xs font-normal">MT CO₂e</span>
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-500/30">
                        <span className="font-sketch text-xs text-amber-800 dark:text-amber-300 block uppercase font-bold">MCX Spot Valuation</span>
                        <span className="font-sketch text-xl font-extrabold text-amber-900 dark:text-amber-100 mt-1 block">
                          ₹{totalMarketValue}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t-2 border-dashed border-zinc-200 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-sketch text-xs text-rose-600 dark:text-rose-400 block uppercase font-bold">Avoided CPCB Statutory Penalty</span>
                      <span className="font-sketch text-base font-bold text-rose-700 dark:text-rose-300">
                        ₹{totalAvoidedPenalty} (Saved by OEM)
                      </span>
                    </div>
                    <span className="font-sketch text-xs bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 px-2 py-1 rounded-md font-bold">
                      Target: {selectedFactor.cpcbTarget}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: Interactive Recycler & OEM Readiness Checklist */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <div>
                  <span className="font-sketch text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 block tracking-wider">
                    Interactive Field Protocol Checklist
                  </span>
                  <h3 className="font-sketch text-2xl font-extrabold text-zinc-900 dark:text-white">
                    Recycler & Enterprise Onboarding Checklist
                  </h3>
                </div>
                <StampBadge label="CLICK TO AUDIT" variant="emerald" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SketchChecklistItem
                  label="Connect Weighbridge Camera Stream"
                  detail="Live RTSP or mobile camera feed analyzed by Agent 01 pixel contouring."
                  defaultChecked={true}
                />
                <SketchChecklistItem
                  label="Calibrate Mandi Voice Language"
                  detail="Set regional dialect (Hindi, Marathi, Tamil, Bengali) in Agent 04 NLP."
                  defaultChecked={true}
                />
                <SketchChecklistItem
                  label="Bind Polygon Amoy Wallet (80002)"
                  detail="Connect corporate or collector wallet for gasless smart contract minting."
                  defaultChecked={true}
                />
                <SketchChecklistItem
                  label="Verify EPA WARM Life-Cycle Output"
                  detail="Deterministic Scope 3 GHG avoidance certified with zero GenAI hallucination."
                  defaultChecked={false}
                />
                <SketchChecklistItem
                  label="Automate CPCB EPR Quarterly Filing"
                  detail="Generate digital certificate packages compliant with PWM Rules 2026."
                  defaultChecked={false}
                />
                <SketchChecklistItem
                  label="Activate Anti-Fraud Anomaly Sentinel"
                  detail="Agent 05 hash radar scans visual collations to prevent double claiming."
                  defaultChecked={false}
                />
              </div>
            </section>

            {/* SECTION 6: All Chapter Cards with Physical Attachments */}
            <section className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-zinc-900 dark:border-white/10 pb-3">
                <div>
                  <h3 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                    Field Manual Chapters & Deep-Dives
                  </h3>
                  <DoodleUnderline className="text-emerald-500 max-w-xs" />
                </div>
                <span className="font-sketch text-sm text-zinc-500 font-bold">
                  [ Select Any Chapter Below for Full Specification ]
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {chapters.map((chap, idx) => {
                  const Icon = chap.icon;
                  return (
                    <Link
                      key={idx}
                      href={chap.href}
                      className={`relative p-6 rounded-3xl bg-white dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] dark:shadow-[4px_5px_0px_#10B981] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group flex flex-col justify-between space-y-4 transform ${chap.tilt}`}
                    >
                      {/* Physical Attachment Element */}
                      {chap.attachType === "paperclip" && <PaperclipElement />}
                      {chap.attachType === "tape-center" && <WashiTapeCenter color={chap.tapeColor} />}
                      {chap.attachType === "tape-corner" && <WashiTapeCorner color={chap.tapeColor} />}

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-2xl border-2 border-zinc-950 flex items-center justify-center bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase border border-zinc-950 bg-amber-100 dark:bg-amber-500/20 text-zinc-950 dark:text-amber-300">
                            {chap.badge}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-sketch font-bold text-lg text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {chap.title}
                          </h4>
                          <p className="font-sketch text-sm text-zinc-700 dark:text-zinc-300 leading-snug mt-1">
                            {chap.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 font-sketch text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t-2 border-dashed border-zinc-200 dark:border-white/10">
                        <span>Read Blueprint Chapter</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  </div>
  );
}
