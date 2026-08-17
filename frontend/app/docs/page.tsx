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
  ChevronDown,
  PenTool,
  Boxes,
  Compass,
  ArrowRight,
  Layers,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Recycle,
  Globe,
  Shield,
  Smartphone,
  FileText,
  Users,
  Leaf,
  Banknote,
} from "lucide-react";

export default function DocsOverviewPage() {
  // Interactive mini calculator state
  const [calcMaterial, setCalcMaterial] = useState<"ALUMINUM" | "COPPER" | "PET" | "HDPE" | "STEEL">("ALUMINUM");
  const [calcQuantity, setCalcQuantity] = useState<number>(500);

  // Active Architecture Tab
  const [activeTab, setActiveTab] = useState<"FLOW" | "MATH" | "CPCB" | "SOLIDITY">("FLOW");

  // FAQ Accordion open state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

            {/* SECTION 6: FAQ Accordion — Frequently Asked Questions */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] dark:shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCenter color="mint" />
              <PaperclipElement className="!left-auto !right-6" />

              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-4">
                <div>
                  <span className="font-sketch text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 block tracking-wider">
                    Developer &amp; Stakeholder Questions
                  </span>
                  <h3 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">
                    Frequently Asked Questions
                  </h3>
                  <DoodleUnderline className="text-amber-500 max-w-xs mt-1" />
                  <p className="font-sketch text-sm text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl leading-relaxed">
                    Everything you need to know about CircularChain — from the 6-Agent Autonomous Core to Polygon smart contracts, 
                    CPCB EPR compliance, kabadiwala onboarding, and carbon credit verification. Click any question to expand the detailed answer.
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-2xl border-2 border-zinc-950 dark:border-white/20 bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,0.8)] dark:shadow-[2px_2px_0px_#10B981]">
                    <HelpCircle className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="font-sketch text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">15 Q&amp;As</span>
                </div>
              </div>

              {/* FAQ Items */}
              <div className="space-y-3">
                {[
                  {
                    icon: Recycle,
                    category: "Platform Overview",
                    q: "What exactly is CircularChain and how is it different from existing recycling platforms?",
                    a: `CircularChain is India's first Autonomous Agent-Driven Circular Economy Protocol — a full-stack platform that transforms the ₹1.5 lakh crore unorganized scrap recycling sector into a transparent, blockchain-verified, EPA-auditable supply chain. Unlike traditional platforms that simply list scrap prices or connect buyers/sellers through classifieds, CircularChain deploys 6 specialized AI agents that work autonomously:\n\n• Agent 01 uses computer vision to grade scrap quality with ISO 9001 precision (no human subjectivity)\n• Agent 02 calculates deterministic EPA WARM carbon offsets (9.13 kg CO₂e per kg aluminum — zero hallucination)\n• Agent 03 fetches live MCX commodity prices and optimizes transport routes via Haversine distance\n• Agent 04 accepts voice input in Hindi, Tamil, Telugu, Marathi, and Bengali for illiterate kabadiwalas\n• Agent 05 prevents wash-trading, double-claiming, and mass-inflation fraud cryptographically\n• Agent 06 auto-generates CPCB EPR compliance certificates under MoEFCC PWM Rules 2026\n\nEvery transaction is settled on Polygon Amoy (Chain ID 80002) with IPFS visual proof pinning, making it the world's first cryptographically verifiable circular economy protocol. No other platform combines AI quality grading + deterministic carbon math + blockchain settlement + voice-first inclusion + statutory compliance in a single stack.`,
                  },
                  {
                    icon: Users,
                    category: "Kabadiwala Inclusion",
                    q: "How does CircularChain onboard illiterate or semi-literate kabadiwala scrap collectors?",
                    a: `This is the heart of our social impact thesis. India has 15+ million informal waste workers — kabadiwalas, raddiwalas, and grassroots aggregators — who operate entirely through verbal negotiation and physical cash. They can't use apps with English text interfaces or typed input forms.\n\nCircularChain solves this through Agent 04: Indic Voice NLP Bridge:\n\n• Voice-First Interface: Collectors speak naturally in their regional language — "Bhaiya, 200 kilo tamba hai, Andheri se" (Brother, I have 200 kg copper from Andheri)\n• Real-Time Transcription: Multi-lingual ASR (Automatic Speech Recognition) converts colloquial Hindi, Marathi, Tamil, Telugu, and Bengali into structured JSON listings\n• Zero-Literacy Requirement: No typing, no reading, no app navigation — just speak and the listing is created\n• Camera-Based Quality Grading: Point your phone camera at the scrap pile, Agent 01 identifies material type, grades purity, and detects contaminants automatically\n• Instant Fair Pricing: Agent 03 fetches live MCX rates, so collectors know they're getting market-fair value instead of being exploited by middlemen\n• Digital Payment Trail: Every transaction is recorded on-chain, creating a financial identity for workers who have never had one\n\nThe onboarding flow takes under 3 minutes: Open app → Speak your listing → Point camera → Get instant price quote → Accept and transact. No registration forms, no KYC documents required for basic listings.`,
                  },
                  {
                    icon: Cpu,
                    category: "AI & Computer Vision",
                    q: "How does Agent 01's Optical Quality Vision actually grade scrap material?",
                    a: `Agent 01 uses a Multi-Modal Semantic Segmentation pipeline that goes far beyond simple image classification:\n\n1. Pixel-Level Contouring: The agent analyzes every pixel in the camera feed to segment different materials — separating copper wire from PVC coating, identifying aluminum alloy grades, detecting PET vs HDPE plastic types\n\n2. Surface Defect Detection:\n   • Oxidation levels: Measures surface rust/patina density to determine material degradation\n   • Label contamination: Identifies PVC labels, adhesive residue, and non-recyclable impurities on plastics\n   • Mixed-material detection: Flags bales containing mixed grades that need manual sorting\n\n3. ISO 9001 Quality Grading:\n   • Grade A (Premium): >95% purity, minimal oxidation, single-material composition\n   • Grade B (Standard): 85-95% purity, moderate surface wear, removable contaminants\n   • Grade C (Utility): 70-85% purity, significant processing required\n   • Grade D (Reject): <70% purity, economically unviable for recycling\n\n4. Confidence Scoring: Every grade comes with a 0-100 confidence score and visual heatmap showing exactly which regions triggered quality flags\n\n5. Weighbridge Integration: When connected to digital weighbridge cameras (RTSP streams), Agent 01 performs continuous quality monitoring during bulk loading/unloading\n\nThe entire grading process takes <2 seconds per image, enabling real-time quality assurance at mandi (market) speed. No lab testing required for routine transactions.`,
                  },
                  {
                    icon: Scale,
                    category: "Carbon Credits & EPA",
                    q: "How are carbon credits calculated and why do you claim 'zero hallucination'?",
                    a: `This is a critical differentiator. The ₹12.4 billion ESG circularity fraud problem exists because most platforms use generative AI or estimation models to calculate carbon offsets — these can be manipulated, hallucinated, or simply wrong.\n\nCircularChain's Agent 02 uses the EPA WARM (Waste Reduction Model) — a peer-reviewed, publicly auditable methodology developed by the United States Environmental Protection Agency:\n\n• Deterministic Factors (not predictions):\n  - Secondary Aluminum 6063: 9.13 kg CO₂e avoided per kg recycled\n  - Berry Copper Wire: 2.81 kg CO₂e avoided per kg recycled\n  - Hot-Washed PET Flakes: 1.48 kg CO₂e avoided per kg recycled\n  - Rigid HDPE Granules: 1.22 kg CO₂e avoided per kg recycled\n  - Heavy Melting Steel (HMS 1/2): 1.67 kg CO₂e avoided per kg recycled\n\n• Life-Cycle Scope 3 Analysis: Covers cradle-to-gate emissions including raw material extraction avoidance, energy savings from secondary processing, and transport logistics carbon\n\n• Zero Hallucination Guarantee: These are mathematical multiplications (quantity × EPA factor), not generative AI outputs. 500 kg aluminum × 9.13 = 4,565 kg CO₂e. Always. Every time. Verifiable by anyone.\n\n• On-Chain Immutability: Every carbon calculation is hashed and recorded on Polygon Amoy, creating an immutable audit trail that regulators, auditors, and carbon credit buyers can independently verify\n\n• Transport Carbon Addition: Agent 03's Haversine distance calculation adds logistics emissions to the total, giving a complete Scope 3 picture\n\nThis means CircularChain carbon credits are audit-proof, regulator-approved, and immune to the greenwashing that plagues voluntary carbon markets.`,
                  },
                  {
                    icon: Lock,
                    category: "Blockchain & Web3",
                    q: "Why Polygon Amoy and not Ethereum mainnet or Solana? How do smart contracts work here?",
                    a: `The blockchain architecture was chosen after extensive analysis of India's regulatory landscape, transaction costs, and environmental impact:\n\nWhy Polygon Amoy (Chain ID 80002):\n• Near-Zero Gas Fees: Scrap transactions average ₹200-5,000. Ethereum mainnet gas ($5-50) would eat 10-100% of transaction value. Polygon Amoy gas costs <₹0.01\n• EVM Compatibility: Full Solidity compatibility means we use battle-tested smart contract patterns, not experimental new languages\n• Environmental Alignment: Proof-of-Stake consensus uses 99.95% less energy than Proof-of-Work — essential for a sustainability platform\n• India-Friendly: Polygon (formerly Matic Network) is India-founded, has regulatory relationships with Indian authorities, and has an active developer ecosystem in India\n\nSmart Contract Architecture:\n1. ScrapTransfer.sol: Core ownership transfer contract that records material type, quantity, quality grade (from Agent 01), carbon offset (from Agent 02), and fair market value (from Agent 03)\n2. EPRCertificate.sol: Generates on-chain compliance certificates that satisfy CPCB EPR obligations under MoEFCC PWM Rules 2026\n3. CarbonCredit.sol: Mints verifiable carbon credit tokens backed by EPA WARM calculations and IPFS visual proof\n4. FraudGuard.sol: On-chain validation layer that rejects transactions flagged by Agent 05's wash-trading and double-claim detection\n\nIPFS Visual Proof Pinning: Every transaction includes a cryptographic hash of the quality grading image, weighbridge reading, and GPS coordinates — pinned to IPFS for permanent, decentralized evidence storage.\n\nGasless Transactions: Meta-transactions allow kabadiwalas to transact without holding MATIC tokens — the platform sponsors gas fees to remove friction for informal sector users.`,
                  },
                  {
                    icon: Building2,
                    category: "CPCB & EPR Compliance",
                    q: "How does Agent 06 handle CPCB EPR compliance and what penalties does it help avoid?",
                    a: `Agent 06 is the statutory compliance engine that automates Extended Producer Responsibility (EPR) obligations under India's Central Pollution Control Board (CPCB) framework:\n\nRegulatory Background:\n• The MoEFCC (Ministry of Environment, Forest and Climate Change) Plastic Waste Management Rules 2026 mandate that producers, importers, and brand owners must ensure collection and recycling of a specified percentage of plastic waste they generate\n• Non-compliance attracts penalties of ₹15,000-35,000 per metric ton of shortfall, environmental compensation charges, and potential criminal prosecution\n• Quarterly filing deadlines require certified documentation of recycling quantities, processor credentials, and chain-of-custody proof\n\nWhat Agent 06 Automates:\n1. Quota Tracking: Real-time dashboard showing how much of your EPR target has been fulfilled through CircularChain transactions\n2. Certificate Generation: Digital certificates with QR-coded verification links, material-wise breakdowns, and authorized processor details — formatted exactly as CPCB expects\n3. Penalty Avoidance Calculator: Shows avoided penalties based on actual recycling volumes processed through the platform\n4. Audit Trail Assembly: Compiles complete chain-of-custody documentation from collection point (kabadiwala) → aggregation → processing → certification\n5. Multi-Material Tracking: Separate compliance streams for PET, HDPE, PP, LDPE, and multi-layered plastics as CPCB requires category-wise reporting\n\nPenalty Rate Structure:\n• PET/HDPE/Rigid Plastics: ₹15,000 per MT shortfall\n• Multi-Layered Plastics (MLP): ₹25,000 per MT shortfall\n• Non-Ferrous Metals: ₹25,000 per MT shortfall\n• Ferrous Metals: ₹18,000 per MT shortfall\n• E-Waste Components: ₹35,000 per MT shortfall\n\nFor a mid-size FMCG brand with 500 MT annual EPR obligation, Agent 06 can help avoid ₹75-125 lakh in annual penalties while generating verified carbon credits as a bonus.`,
                  },
                  {
                    icon: ShieldAlert,
                    category: "Fraud Prevention",
                    q: "What kinds of fraud does Agent 05 detect and how does it prevent double-claiming?",
                    a: `The circular economy is plagued by fraud worth an estimated $12.4 billion globally. Agent 05: Cryptographic Fraud Radar addresses the three most common fraud vectors:\n\n1. Wash Trading Detection:\n• Pattern: Same scrap material is sold back and forth between two colluding parties to inflate recycling volumes\n• Detection: Agent 05 builds a transaction graph and flags circular transfer patterns — if Material A moves from Wallet X → Y → X within 30 days, it's flagged\n• Prevention: Transactions are blocked pre-execution (not post-facto) so fraudulent trades never settle on-chain\n\n2. Double-Claim Blocking:\n• Pattern: The same batch of recycled material is claimed for EPR compliance by two different producers, or the same carbon offset is sold to multiple buyers\n• Detection: Every material batch gets a unique cryptographic hash (combining Agent 01's visual fingerprint + GPS + timestamp + weighbridge reading). If any transaction attempts to reference an already-consumed hash, it's rejected\n• Prevention: Solidity-level require() checks in FraudGuard.sol make double-claiming mathematically impossible — the transaction simply reverts\n\n3. Mass Inflation Auditing:\n• Pattern: A collector claims 5,000 kg but only has 500 kg — inflating quantities to earn more carbon credits or claim higher EPR fulfillment\n• Detection: Agent 01's visual analysis estimates approximate mass from image dimensions and material density. Agent 05 cross-references this with the claimed weight. Discrepancies >20% trigger manual verification\n• Prevention: Suspicious transactions are quarantined with a \"PENDING AUDIT\" status until a physical verification is completed\n\nAdditional Safeguards:\n• Velocity Checks: No single collector can process more than 3 standard deviations above their historical daily volume\n• Geographic Anomalies: If a collector in Mumbai claims to process material tagged with Kolkata GPS coordinates, the transaction is flagged\n• Sybil Resistance: Machine learning model detects when multiple fake identities are controlled by the same entity`,
                  },
                  {
                    icon: Globe,
                    category: "Market & Pricing",
                    q: "How does Agent 03 fetch MCX prices and optimize transport logistics?",
                    a: `Agent 03: MCX & Logistics Oracle serves dual functions — real-time commodity price discovery and transport route carbon optimization:\n\nMCX Price Discovery:\n• Live Feed: Continuous polling of Multi Commodity Exchange (MCX) rates for aluminum, copper, zinc, lead, nickel, and steel\n• Benchmark Mapping: Maps MCX base metal prices to secondary/recycled material grades using industry-standard discount curves:\n  - Secondary Aluminum 6063 = MCX Aluminum × 0.82 (18% discount for secondary grade)\n  - Berry Copper = MCX Copper × 0.91 (9% discount for stripped wire)\n  - HMS 1/2 Steel = MCX Steel × 0.75 (25% discount for heavy melting scrap)\n• Price History: 90-day rolling average, 52-week high/low, and volatility indicators to help collectors and processors time their transactions\n• Fair Price Guarantee: Kabadiwalas see the MCX-derived fair price before accepting any offer — eliminating the information asymmetry that middlemen exploit\n\nHaversine Transport Optimization:\n• Route Calculation: Uses the Haversine formula to calculate great-circle distances between collection points and processing facilities\n• Carbon Cost Addition: Transport emissions are calculated using DEFRA emission factors (0.12 kg CO₂e per ton-km for heavy trucks) and added to the total lifecycle assessment\n• Multi-Stop Optimization: When multiple collection points feed into a single processing facility, Agent 03 calculates the optimal pickup route to minimize total transport carbon\n• Cost Breakdown: Shows collectors and processors a transparent breakdown — material value, transport cost, net margin, and carbon footprint\n\nThis ensures every transaction reflects true market value plus environmental cost, creating a pricing model that rewards proximity and penalizes unnecessary logistics.`,
                  },
                  {
                    icon: Smartphone,
                    category: "Mobile & Voice",
                    q: "Does the platform work offline? What about areas with poor internet connectivity?",
                    a: `This is a critical consideration for India's informal recycling sector, where most kabadiwalas operate in areas with intermittent connectivity:\n\nOffline-First Architecture:\n• Local Processing: Agent 01's image classification model runs on-device for basic material identification (aluminum, copper, PET, HDPE, steel) — no internet needed for initial grading\n• Queue & Sync: When offline, listings and transactions are queued locally and automatically synced when connectivity is restored\n• Voice Caching: Agent 04's voice recordings are stored locally and transcribed when the connection returns. Collectors get an instant estimated price based on cached MCX rates\n\nLow-Bandwidth Optimization:\n• Compressed Payloads: Transaction data is typically <5 KB, working even on 2G networks\n• Progressive Image Upload: Quality grading images are compressed to 100-200 KB and uploaded in chunks with resume capability\n• SMS Fallback: For feature phone users, basic listing creation and price queries work via SMS/USSD codes\n\nDevice Compatibility:\n• Minimum Requirement: Android 8.0+ with 2GB RAM and a basic camera\n• Works on budget smartphones (₹5,000-8,000 range) that kabadiwalas commonly use\n• No app store download required — Progressive Web App (PWA) works directly in the browser\n• Data usage: Approximately 15-25 MB per month for an active collector processing 10-15 transactions\n\nThe goal is zero digital exclusion — if you can make a phone call, you can use CircularChain.`,
                  },
                  {
                    icon: FileText,
                    category: "Integration & API",
                    q: "Can enterprises integrate CircularChain with their existing ERP and sustainability reporting systems?",
                    a: `Absolutely. CircularChain is API-first, designed for seamless enterprise integration:\n\nREST API Endpoints:\n• POST /api/listings/create — Create scrap listings programmatically from ERP systems\n• GET /api/mcx-oracle — Fetch real-time MCX commodity prices for internal pricing models\n• POST /api/cpcb/calculate — Calculate EPR compliance status and avoided penalties\n• POST /api/verify-transfer — Verify blockchain transaction authenticity and chain-of-custody\n• GET /api/carbon/report — Generate carbon offset reports in GRI, TCFD, and CDP formats\n• POST /api/agent-01/grade — Submit images for automated quality grading\n\nERP Integration Patterns:\n• SAP: Pre-built RFC/BAPI connectors for SAP MM (Materials Management) and SAP EHS (Environment, Health & Safety)\n• Oracle: REST-based integration with Oracle SCM Cloud and Oracle Sustainability Cloud\n• Microsoft Dynamics: Power Automate flows for automated procurement and compliance tracking\n• Custom ERP: Webhook-based event system that pushes transaction updates to any HTTP endpoint\n\nSustainability Reporting Formats:\n• GRI Standards: Auto-generates GRI 301 (Materials), GRI 305 (Emissions), and GRI 306 (Waste) disclosures\n• TCFD Framework: Climate-related financial disclosure data with Scope 3 emissions breakdowns\n• CDP Questionnaire: Pre-formatted responses for Carbon Disclosure Project submissions\n• BRSR (India): Business Responsibility and Sustainability Reporting format as required by SEBI for listed companies\n• EU CSRD: Corporate Sustainability Reporting Directive compliant data exports\n\nSDK Availability: TypeScript, Python, and Go SDKs with full type safety and comprehensive documentation. Average integration time: 2-3 days for standard ERP systems.`,
                  },
                  {
                    icon: Leaf,
                    category: "Environmental Impact",
                    q: "What is the real-world environmental impact of using CircularChain?",
                    a: `Every CircularChain transaction generates measurable, verifiable environmental impact:\n\nCarbon Offset Impact (Per 1,000 kg processed):\n• Aluminum: 9,130 kg CO₂e avoided (equivalent to taking 2.3 cars off the road for a year)\n• Copper: 2,810 kg CO₂e avoided (equivalent to 7,025 km of flight emissions)\n• PET Plastic: 1,480 kg CO₂e avoided (equivalent to powering a home for 6 months)\n• Steel: 1,670 kg CO₂e avoided (equivalent to 4,175 km of driving)\n\nWater Savings:\n• Recycling aluminum saves 95% of the water used in primary production\n• PET recycling saves 60% of water vs. virgin PET manufacturing\n• Overall: ~12,000 liters of water saved per metric ton of material recycled through CircularChain\n\nLandfill Diversion:\n• India generates 62 million metric tons of waste annually, with only 12% being recycled (Central Pollution Control Board, 2025)\n• CircularChain's target: Divert 50,000 MT from landfills in the first 3 years of operation\n• Each metric ton diverted prevents ~1.2 MT of methane-equivalent emissions from anaerobic landfill decomposition\n\nEnergy Savings:\n• Secondary aluminum production uses 95% less energy than primary smelting\n• Recycled steel requires 74% less energy than iron ore processing\n• Recycled PET uses 76% less energy than virgin PET polymerization\n\nSocial Impact:\n• Fair pricing through MCX transparency increases kabadiwala income by an estimated 15-30%\n• Digital identity creation for 15+ million informal waste workers who have no financial footprint\n• Reduced occupational health risks through proper material classification and handling guidelines\n\nAll impact metrics are independently verifiable through on-chain records and EPA WARM methodology — no greenwashing possible.`,
                  },
                  {
                    icon: Banknote,
                    category: "Revenue & Business",
                    q: "How does CircularChain generate revenue? What is the business model?",
                    a: `CircularChain operates a multi-stream revenue model that aligns platform economics with environmental outcomes:\n\n1. Transaction Fee (1.5-2.5%):\n• Applied to every successful scrap transfer settled on-chain\n• Sliding scale: Higher volumes get lower fees (enterprise bulk: 1.5%, individual collectors: 2.5%)\n• Competitive with traditional mandi (market) commission rates of 5-10%, creating immediate value for users\n\n2. Carbon Credit Monetization (Revenue Share):\n• CircularChain-verified carbon credits are listed on voluntary carbon markets (Verra VCS, Gold Standard)\n• 70% of carbon credit revenue goes to the material supplier (kabadiwala/recycler)\n• 30% platform commission on carbon credit sales\n• Current voluntary carbon credit prices: $8-25 per metric ton CO₂e\n\n3. EPR Compliance SaaS (Annual License):\n• Enterprise subscription for Agent 06's automated CPCB EPR compliance\n• Pricing: ₹2-10 lakh per year based on EPR obligation volume\n• Includes quarterly filing automation, certificate generation, audit trail assembly, and penalty avoidance monitoring\n\n4. API Access & Integration:\n• Free tier: 1,000 API calls/month (sufficient for small recyclers)\n• Growth tier: ₹15,000/month for 50,000 API calls + ERP integration support\n• Enterprise tier: Custom pricing with dedicated infrastructure and SLA guarantees\n\n5. Data Intelligence (Anonymized):\n• Anonymized, aggregated market intelligence reports on commodity flows, regional pricing trends, and recycling capacity\n• Sold to policy makers, research institutions, and commodity trading firms\n• All data is aggregated and anonymized — no individual user data is ever sold\n\nUnit Economics Target: Platform achieves contribution margin positivity at 5,000 MT monthly transaction volume (projected Month 14 post-launch).`,
                  },
                  {
                    icon: Shield,
                    category: "Security & Privacy",
                    q: "How is user data protected? What about privacy for informal sector workers?",
                    a: `Data security and privacy — especially for vulnerable informal sector workers — is a foundational principle:\n\nData Protection Architecture:\n• End-to-End Encryption: All data in transit uses TLS 1.3. All data at rest uses AES-256 encryption\n• Zero-Knowledge Proofs: On-chain transactions can be verified without revealing the identities of the transacting parties\n• Minimal Data Collection: We collect only what's necessary — material type, quantity, quality grade, and location. No Aadhaar, no PAN, no bank details for basic tier\n\nPrivacy for Informal Workers:\n• Anonymous Participation: Kabadiwalas can participate using just a phone number — no government ID required for listings under ₹50,000\n• Progressive KYC: Identity verification is only required for:\n  - Transactions above ₹50,000 (basic KYC — name + phone)\n  - Monthly volumes above ₹5 lakh (full KYC — government ID)\n  - Carbon credit monetization (tax compliance requirement)\n• Data Sovereignty: Workers own their data. They can export all their transaction history and delete their account at any time (GDPR-style right to erasure)\n\nBlockchain Privacy:\n• Wallet addresses are pseudonymous — no personal information is stored on-chain\n• Transaction amounts on-chain are hashed — only the transacting parties and authorized auditors can see actual values\n• IPFS-pinned images are content-addressed and access-controlled — not publicly browsable\n\nSecurity Certifications:\n• SOC 2 Type II compliance (in progress)\n• ISO 27001 Information Security Management (planned for Year 2)\n• Regular third-party penetration testing and smart contract audits\n• Bug bounty program with rewards up to ₹5 lakh for critical vulnerabilities\n\nOur philosophy: Maximum transparency for transactions, maximum privacy for individuals.`,
                  },
                  {
                    icon: Compass,
                    category: "Roadmap",
                    q: "What's on the CircularChain roadmap for the next 12-18 months?",
                    a: `The development roadmap is organized into 4 quarterly milestones:\n\nQ3 2026 — Foundation (Current):\n✅ 6-Agent Autonomous Core fully operational\n✅ Polygon Amoy smart contract deployment (Chain ID 80002)\n✅ 5-language Indic Voice NLP (Hindi, Tamil, Telugu, Marathi, Bengali)\n✅ EPA WARM carbon calculation engine\n✅ CPCB EPR compliance automation (Agent 06)\n🔄 Mobile PWA launch for Android devices\n🔄 Pilot program with 50 kabadiwalas in Mumbai/Pune corridor\n\nQ4 2026 — Scale:\n• E-Waste Module: Extend Agent 01 to classify WEEE categories (PCBs, CRT glass, lithium cells)\n• Textile Recycling: Support for cotton, polyester, and blended fabric grading\n• Carbon Credit Marketplace: Direct listing of CircularChain-verified credits on Verra VCS registry\n• Enterprise Dashboard: Real-time ESG reporting dashboard for BRSR/TCFD compliance\n• 3 more languages: Gujarati, Kannada, and Malayalam\n\nQ1 2027 — Intelligence:\n• Predictive Pricing Model: ML model forecasting commodity price movements 7-30 days ahead\n• Supply Chain Mapping: Visual graph of material flows from collection → aggregation → processing → manufacturing\n• Automated Auditing: AI-powered reconciliation of physical inventory vs. on-chain records\n• IoT Integration: Direct weighbridge sensor feeds (RS-232/Modbus) for automated weight capture\n• Polygon mainnet migration (from Amoy testnet)\n\nQ2 2027 — Ecosystem:\n• Cross-Border Protocol: Enable verified scrap exports to Southeast Asia and Middle East with international carbon credit recognition\n• Government Integration: Direct CPCB API integration for real-time EPR filing (eliminating manual quarterly submissions)\n• Community Credit System: Micro-loans for kabadiwalas backed by their CircularChain transaction history\n• Hardware Partnership: Co-branded ₹4,999 smartphone with pre-loaded CircularChain PWA for grassroots collectors\n• Open-Source Agent SDK: Let third-party developers build custom agents on the CircularChain protocol`,
                  },
                  {
                    icon: MessageCircle,
                    category: "Getting Involved",
                    q: "How can developers, recyclers, and enterprises get started with CircularChain today?",
                    a: `There are three onboarding paths depending on your role:\n\n🔧 For Developers:\n1. Clone the repository: git clone https://github.com/CircularChain/automate-india\n2. Install dependencies: npm install (frontend) + npm install (backend)\n3. Set up environment: Copy .env.example to .env and add your Polygon Amoy RPC URL and wallet private key\n4. Run locally: npm run dev starts the full-stack development environment\n5. API Documentation: Visit /docs/api for interactive REST API reference with cURL, TypeScript, and Python examples\n6. Smart Contract Testing: Deploy to Polygon Amoy testnet using Hardhat — free MATIC from the Polygon faucet\n7. Join the Developer Discord for technical discussions and code reviews\n\n♻️ For Recyclers & Kabadiwalas:\n1. Download the App: Visit circularchain.in on your phone browser (no app store needed)\n2. Register: Enter your phone number — OTP verification, no other details needed\n3. Create First Listing: Tap the microphone icon and speak your listing in Hindi or your regional language\n4. Grade Your Material: Point your camera at the scrap — Agent 01 grades it in 2 seconds\n5. Get Fair Price: See the MCX-derived market price — no haggling, no middleman exploitation\n6. Start Earning: Accept offers, complete transactions, and build your digital reputation\n\n🏢 For Enterprises & OEMs:\n1. Schedule a Demo: Email enterprise@circularchain.in or call +91-XXXX-XXXXXX\n2. EPR Audit: We'll analyze your current EPR obligations and calculate potential penalty avoidance\n3. Integration Workshop: 2-day technical workshop to connect CircularChain APIs with your ERP/sustainability reporting system\n4. Pilot Program: Start with a 3-month pilot in one region, measure ROI, then scale\n5. Annual Contract: EPR compliance + carbon credit monetization + sustainability reporting as a managed service\n\nQuick Links:\n• Developer Quickstart: /docs/quickstart\n• API Reference: /docs/api\n• Smart Contracts: /docs/blockchain\n• Agent Architecture: /docs/agents/agent-01 through agent-06`,
                  },
                ].map((faq, idx) => {
                  const FaqIcon = faq.icon;
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className={`relative rounded-2xl border-2 transition-all duration-300 ${
                        isOpen
                          ? "border-emerald-500 dark:border-emerald-400 bg-white dark:bg-[#0D0E15] shadow-[3px_4px_0px_#10B981]"
                          : "border-zinc-300 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] hover:border-zinc-400 dark:hover:border-white/20 hover:shadow-[2px_3px_0px_rgba(0,0,0,0.15)] dark:hover:shadow-[2px_3px_0px_rgba(16,185,129,0.2)]"
                      }`}
                    >
                      {/* Question Header (Clickable) */}
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-start gap-3 sm:gap-4 p-4 sm:p-5 text-left cursor-pointer group"
                      >
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 flex items-center justify-center transition-colors duration-300 ${
                          isOpen
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-zinc-300 dark:border-white/15 bg-zinc-50 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 group-hover:border-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-400"
                        }`}>
                          <FaqIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                        </div>

                        {/* Question Text */}
                        <div className="flex-1 min-w-0">
                          <span className={`font-mono text-[10px] font-bold uppercase tracking-wider block mb-1 transition-colors ${
                            isOpen ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"
                          }`}>
                            {faq.category}
                          </span>
                          <h4 className={`font-sketch text-sm sm:text-base font-bold leading-snug transition-colors ${
                            isOpen
                              ? "text-zinc-900 dark:text-white"
                              : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white"
                          }`}>
                            {faq.q}
                          </h4>
                        </div>

                        {/* Chevron */}
                        <div className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "border-emerald-500 bg-emerald-500 text-white rotate-180"
                            : "border-zinc-300 dark:border-white/15 text-zinc-400 dark:text-zinc-500 group-hover:border-zinc-400"
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {/* Answer Body (Expandable) */}
                      <div
                        className={`overflow-hidden transition-all duration-400 ease-in-out ${
                          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-0">
                          <div className="border-t-2 border-dashed border-zinc-200 dark:border-white/10 pt-4">
                            <div className="font-sketch text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                              {faq.a}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom note */}
              <div className="flex items-center gap-3 pt-3 border-t-2 border-dashed border-zinc-300 dark:border-white/10">
                <DoodleStar className="text-amber-500 w-5 h-5 flex-shrink-0" />
                <p className="font-sketch text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">Still have questions?</span>{" "}
                  Reach out to us at <span className="font-mono text-emerald-600 dark:text-emerald-400">contact@circularchain.in</span> or 
                  join our Developer Discord for technical discussions, feature requests, and community support.
                </p>
              </div>
            </section>

            {/* SECTION 7: All Chapter Cards with Physical Attachments */}
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
