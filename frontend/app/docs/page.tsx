"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import { CylinderCarousel } from "@/components/ui/cylinder-carousel";
import {
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
  DoodleConnectorArrow,
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
} from "lucide-react";

export default function DocsOverviewPage() {
  // Interactive mini calculator state
  const [calcMaterial, setCalcMaterial] = useState<"ALUMINUM" | "COPPER" | "PET" | "HDPE" | "STEEL">("ALUMINUM");
  const [calcQuantity, setCalcQuantity] = useState<number>(500);

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
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Realistic Notebook Top Header Banner with Washi Tape & Stamp */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        
        {/* Top washi tape on the whole header */}
        <WashiTapeCenter color="kraft" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-2 border-red-300/50 dark:border-red-500/30 pl-4 sm:pl-8 ml-1 sm:ml-4">
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

      {/* Main Content Layout with Notebook Red Left Margin Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          {/* Main Technical Content Canvas */}
          <main className="lg:col-span-9 space-y-12 border-l-2 border-red-300/40 dark:border-red-500/20 pl-4 sm:pl-6">
            
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

            {/* SECTION 2: Interactive 3D Specimen Turntable (Ruled Paper Card with Washi Tape) */}
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

            {/* SECTION 3: Deep Technical Context & Mathematical Framework */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEF9C3]/50 dark:bg-[#14151F] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] space-y-6">
              <PaperclipElement />
              
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 font-sketch text-xs uppercase tracking-widest text-rose-700 dark:text-rose-400 font-bold">
                  <span>Section 01 // Executive Problem Statement & Market Reality</span>
                </div>
                <StampBadge label="CRITICAL STUDY" variant="rose" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                The Four Structural Crises of <span className="highlight-yellow">Global Circularity</span>
                <DoodleUnderline className="text-rose-500 max-w-sm" />
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                <p>
                  Industrial circularity in emerging economies is fractured across four structural vectors. In India, over <strong>90% of scrap collection is managed by 5 Million informal kabadiwalas and waste pickers</strong> who operate entirely on cash transactions, verbal negotiations, and uncalibrated mechanical beam scales.
                </p>
                <p>
                  Meanwhile, Fortune 500 manufacturing corporations and Brand Owners face aggressive statutory mandates under the <strong>MoEFCC Plastic Waste Management Rules 2026</strong> and <strong>E-Waste Management Rules 2022</strong>. Failure to fulfill recycling targets triggers non-negotiable Environmental Compensation (EC) fines of up to <strong>₹25,000 per Metric Ton</strong>.
                </p>
              </div>

              {/* 4 In-Depth Technical Vulnerability Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                
                {/* Vulnerability 1 */}
                <div className="relative p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(244,63,94,0.4)] transform -rotate-0.5 hover:rotate-0 transition-transform duration-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-sketch text-base font-bold text-rose-700 dark:text-rose-400">
                      01. Informal Asymmetry & Margin Loss
                    </span>
                    <DoodleShield className="text-rose-500" />
                  </div>
                  <p className="font-sketch text-sm text-zinc-800 dark:text-zinc-200 leading-snug">
                    Informal aggregators lack real-time access to Multi Commodity Exchange (MCX) spot indices. Middlemen impose arbitrary 35-40% moisture and tare weight deductions, capturing all the value while collectors work in unsafe environments.
                  </p>
                </div>

                {/* Vulnerability 2 */}
                <div className="relative p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(245,158,11,0.4)] transform rotate-0.5 hover:rotate-0 transition-transform duration-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-sketch text-base font-bold text-amber-700 dark:text-amber-400">
                      02. $12.4B Global Greenwashing Fraud
                    </span>
                    <DoodleLock className="text-amber-500" />
                  </div>
                  <p className="font-sketch text-sm text-zinc-800 dark:text-zinc-200 leading-snug">
                    Over 40% of EPR certificates traded in South Asia represent fictitious recycling volume ("paper round-tripping"). Without immutable cryptographic visual proofs, single batches are billed across multiple corporate balance sheets.
                  </p>
                </div>

                {/* Vulnerability 3 */}
                <div className="relative p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(244,63,94,0.4)] transform rotate-0.5 hover:rotate-0 transition-transform duration-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-sketch text-base font-bold text-rose-700 dark:text-rose-400">
                      03. GenAI Carbon Math Hallucinations
                    </span>
                    <DoodleScale className="text-rose-500" />
                  </div>
                  <p className="font-sketch text-sm text-zinc-800 dark:text-zinc-200 leading-snug">
                    Standard AI chatbots hallucinate Scope 3 carbon offsets because they lack physical life-cycle boundary conditions. CircularChain uses deterministic EPA WARM v15 lifecycle matrices with <DoodleCircle className="text-rose-500">Zero Hallucination</DoodleCircle>.
                  </p>
                </div>

                {/* Vulnerability 4 */}
                <div className="relative p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(16,185,129,0.4)] transform -rotate-0.5 hover:rotate-0 transition-transform duration-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-sketch text-base font-bold text-emerald-700 dark:text-emerald-400">
                      04. CPCB Statutory Compliance Shield
                    </span>
                    <DoodleChip className="text-emerald-500" />
                  </div>
                  <p className="font-sketch text-sm text-zinc-800 dark:text-zinc-200 leading-snug">
                    Under Indian PWM Rules, producers must fulfill 70% recycling quotas in FY 2025-26, rising to 80% in FY 2026-27. CircularChain generates pre-verified CPCB audit packages that eliminate statutory penalty exposure.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: Deterministic Mathematical Formulations & EPA WARM Engine */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCenter color="mint" />
              
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 font-sketch text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">
                  <span>Section 02 // Mathematical Formulations & Life-Cycle Equations</span>
                </div>
                <StampBadge label="EPA WARM v15 RIGOR" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                Deterministic Carbon Accounting <span className="highlight-emerald">Physics & Math</span>
              </h2>

              <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                CircularChain implements the United States Environmental Protection Agency’s <strong>Waste Reduction Model (EPA WARM v15)</strong> Life-Cycle Analysis (LCA) parameters combined with the <strong>Haversine Transport Carbon Penalty Model</strong>.
              </p>

              {/* Hand-Drawn Lined Paper Equation Card */}
              <div className="p-6 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[3px_4px_0px_rgba(0,0,0,0.85)] dark:shadow-[3px_4px_0px_#10B981] space-y-4">
                <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400 border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-2">
                  <span className="font-sketch font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                    Equation 1.1: Net Life-Cycle Scope 3 Carbon Offset
                  </span>
                  <span className="font-sketch text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-300">
                    Deterministic LCA
                  </span>
                </div>

                <div className="py-2 text-emerald-800 dark:text-emerald-300 text-base sm:text-lg font-sketch font-bold tracking-wide overflow-x-auto">
                  CO2e_Net = (Mass_Lot × Purity_Grade × E_Avoided) - (Distance_KM × Fleet_Carbon_Intensity)
                </div>

                <div className="text-zinc-800 dark:text-zinc-300 text-xs font-sketch space-y-1.5 pt-2 border-t-2 border-dashed border-amber-300 dark:border-white/10">
                  <p className="font-bold text-zinc-950 dark:text-white">Where:</p>
                  <ul className="space-y-1 text-zinc-700 dark:text-zinc-300">
                    <li>• <strong className="text-zinc-950 dark:text-white">Mass_Lot:</strong> Certified digital weighbridge mass in metric tons (MT).</li>
                    <li>• <strong className="text-zinc-950 dark:text-white">Purity_Grade:</strong> OpenCV segmented contamination mask factor ($\rho \in [0.0, 1.0]$).</li>
                    <li>• <strong className="text-zinc-950 dark:text-white">E_Avoided:</strong> Baseline Virgin Extraction Footprint minus Secondary Remelting Footprint.</li>
                    <li>• <strong className="text-zinc-950 dark:text-white">Fleet_Carbon_Intensity:</strong> 0.105 kg CO₂e / MT-km for BS-VI diesel freight corridors.</li>
                  </ul>
                </div>
              </div>

              {/* Baseline Material Constants Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sketch border-2 border-zinc-950 dark:border-white/20 rounded-2xl overflow-hidden shadow-[3px_4px_0px_rgba(0,0,0,0.85)]">
                  <thead className="bg-[#FEFCE8] dark:bg-white/10 text-zinc-900 dark:text-white border-b-2 border-zinc-950 dark:border-white/20">
                    <tr>
                      <th className="p-3">Material Stream</th>
                      <th className="p-3">Virgin Footprint (kg CO₂e/kg)</th>
                      <th className="p-3">Secondary Footprint (kg CO₂e/kg)</th>
                      <th className="p-3">Net Avoided (kg CO₂e/kg)</th>
                      <th className="p-3">Energy Reduction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-white/10 bg-white dark:bg-zinc-900/50">
                    <tr>
                      <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">Aluminum 6063 Scrap</td>
                      <td className="p-3 font-mono">9.63</td>
                      <td className="p-3 font-mono">0.50</td>
                      <td className="p-3 font-bold font-mono text-emerald-700 dark:text-emerald-400">9.13 kg CO₂e</td>
                      <td className="p-3 text-emerald-700 font-bold"><DoodleCircle className="text-emerald-500">95.0% Less Energy</DoodleCircle></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-amber-700 dark:text-amber-400">Berry Copper Wire</td>
                      <td className="p-3 font-mono">3.41</td>
                      <td className="p-3 font-mono">0.60</td>
                      <td className="p-3 font-bold font-mono text-amber-700 dark:text-amber-400">2.81 kg CO₂e</td>
                      <td className="p-3 text-emerald-700 font-bold">85.0% Less Energy</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-sky-700 dark:text-sky-400">PET Bottle Flakes</td>
                      <td className="p-3 font-mono">2.15</td>
                      <td className="p-3 font-mono">0.67</td>
                      <td className="p-3 font-bold font-mono text-sky-700 dark:text-sky-400">1.48 kg CO₂e</td>
                      <td className="p-3 text-emerald-700 font-bold">70.0% Less Energy</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-indigo-700 dark:text-indigo-400">Rigid HDPE Granules</td>
                      <td className="p-3 font-mono">1.89</td>
                      <td className="p-3 font-mono">0.67</td>
                      <td className="p-3 font-bold font-mono text-indigo-700 dark:text-indigo-400">1.22 kg CO₂e</td>
                      <td className="p-3 text-emerald-700 font-bold">65.0% Less Energy</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-zinc-700 dark:text-zinc-300">Heavy Melting Steel (HMS)</td>
                      <td className="p-3 font-mono">2.27</td>
                      <td className="p-3 font-mono">0.60</td>
                      <td className="p-3 font-bold font-mono text-zinc-700 dark:text-zinc-300">1.67 kg CO₂e</td>
                      <td className="p-3 text-emerald-700 font-bold">75.0% Less Energy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: Interactive Live EPA & Penalty Simulator */}
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

            {/* SECTION 6: 6-Agent Autonomous Architecture Protocol */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />
              
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 font-sketch text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">
                  <span>Section 04 // 6-Agent Autonomous Core Topology</span>
                </div>
                <StampBadge label="AUTONOMOUS ORCHESTRATION" variant="emerald" />
              </div>

              <div>
                <h2 className="font-sketch text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                  The 6-Agent Autonomous Orchestration Pipeline
                </h2>
                <DoodleUnderline className="text-emerald-500 max-w-sm" />
              </div>

              <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Rather than relying on a single monolithic language model, CircularChain deploys <strong>six specialized autonomous agents</strong> that coordinate through a centralized event broker and cryptographic validation gates.
              </p>

              {/* Agent Orchestration Flow Diagram Cards */}
              <div className="space-y-4">
                
                {/* Agent 1 & 4 Input Layer */}
                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border-2 border-zinc-950 dark:border-white/10 shadow-[2px_3px_0px_rgba(0,0,0,0.8)] space-y-3">
                  <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-200 dark:border-zinc-800 pb-2">
                    <span className="font-sketch text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
                      Layer 1: Multimodal Physical Ingestion (Field Edge)
                    </span>
                    <span className="font-sketch text-xs text-zinc-500">P2P Mobile / Camera OCR</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="p-4 bg-[#FEFCE8] dark:bg-zinc-800/80 rounded-2xl border-2 border-zinc-950 dark:border-white/10">
                      <strong className="font-sketch text-base block text-zinc-900 dark:text-white">Agent 01: Optical Quality Vision</strong>
                      <p className="font-sketch text-xs text-zinc-700 dark:text-zinc-300 mt-1">
                        Runs real-time pixel contour segmentation and oxidation scoring. Generates ISO 9001 purity grades ($\rho \in [0, 1]$) from camera captures.
                      </p>
                    </div>
                    <div className="p-4 bg-[#FEFCE8] dark:bg-zinc-800/80 rounded-2xl border-2 border-zinc-950 dark:border-white/10">
                      <strong className="font-sketch text-base block text-zinc-900 dark:text-white">Agent 04: Indic Voice NLP Bridge</strong>
                      <p className="font-sketch text-xs text-zinc-700 dark:text-zinc-300 mt-1">
                        Transcribes colloquial Hindi, Tamil, and Bengali mandi voice notes into structured JSON scrap listings with zero typing required.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Agent 2 & 3 Valuation & LCA Layer */}
                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border-2 border-zinc-950 dark:border-white/10 shadow-[2px_3px_0px_rgba(0,0,0,0.8)] space-y-3">
                  <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-200 dark:border-zinc-800 pb-2">
                    <span className="font-sketch text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
                      Layer 2: Valuation, Logistics & Life-Cycle Math
                    </span>
                    <span className="font-sketch text-xs text-zinc-500">Deterministic Arithmetic</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="p-4 bg-[#F0FDF4] dark:bg-zinc-800/80 rounded-2xl border-2 border-zinc-950 dark:border-white/10">
                      <strong className="font-sketch text-base block text-zinc-900 dark:text-white">Agent 02: EPA WARM Carbon Math</strong>
                      <p className="font-sketch text-xs text-zinc-700 dark:text-zinc-300 mt-1">
                        Applies EPA WARM v15 emission factors to calculate verified Scope 3 GHG avoidance and tree-equivalent preservation metrics.
                      </p>
                    </div>
                    <div className="p-4 bg-[#F0FDF4] dark:bg-zinc-800/80 rounded-2xl border-2 border-zinc-950 dark:border-white/10">
                      <strong className="font-sketch text-base block text-zinc-900 dark:text-white">Agent 03: MCX & Logistics Oracle</strong>
                      <p className="font-sketch text-xs text-zinc-700 dark:text-zinc-300 mt-1">
                        Polls live MCX spot market pricing every 60s and calculates optimal haulage routes with Haversine transport carbon deductions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Agent 5 & 6 Settlement & Compliance Layer */}
                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border-2 border-zinc-950 dark:border-white/10 shadow-[2px_3px_0px_rgba(0,0,0,0.8)] space-y-3">
                  <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-200 dark:border-zinc-800 pb-2">
                    <span className="font-sketch text-xs font-bold uppercase text-rose-700 dark:text-rose-400">
                      Layer 3: Fraud Sentinel & Statutory Compliance Shield
                    </span>
                    <span className="font-sketch text-xs text-zinc-500">Polygon Amoy & CPCB EPR</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="p-4 bg-[#FDF2F8] dark:bg-zinc-800/80 rounded-2xl border-2 border-zinc-950 dark:border-white/10">
                      <strong className="font-sketch text-base block text-zinc-900 dark:text-white">Agent 05: Cryptographic Fraud Radar</strong>
                      <p className="font-sketch text-xs text-zinc-700 dark:text-zinc-300 mt-1">
                        Scans visual hash collations and weighbridge timestamps to block double-claiming and circular wash-trading before smart contract execution.
                      </p>
                    </div>
                    <div className="p-4 bg-[#FDF2F8] dark:bg-zinc-800/80 rounded-2xl border-2 border-zinc-950 dark:border-white/10">
                      <strong className="font-sketch text-base block text-zinc-900 dark:text-white">Agent 06: CPCB Statutory EPR Shield</strong>
                      <p className="font-sketch text-xs text-zinc-700 dark:text-zinc-300 mt-1">
                        Maps tonnage against MoEFCC Producer Responsibility Obligations (PRO) and generates cryptographically signed CPCB filing certificates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: Smart Contract Architecture & Solidity Topology */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCorner color="yellow" />
              
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 font-sketch text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">
                  <span>Section 05 // Polygon Amoy Solidity Topology</span>
                </div>
                <StampBadge label="POLYGON AMOY 80002" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                On-Chain Provenance & IPFS Settlement
              </h2>

              <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Ownership transfer, visual inspection hashes, and EPR credit issuance are executed atomically on the <strong>Polygon Amoy testnet</strong>. Every scrap lot is represented by an immutable on-chain record:
              </p>

              {/* Hand-Drawn Blueprint Code Index Card */}
              <div className="p-6 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 font-sketch text-sm text-zinc-900 dark:text-zinc-100 shadow-[3px_4px_0px_rgba(0,0,0,0.85)] space-y-2 overflow-x-auto">
                <div className="text-zinc-500">// SPDX-License-Identifier: MIT</div>
                <div><span className="text-purple-700 dark:text-purple-400 font-bold">struct</span> <span className="text-amber-800 dark:text-amber-300 font-bold">MaterialLot</span> &#123;</div>
                <div className="pl-4">uint256 lotId;</div>
                <div className="pl-4">address seller; <span className="text-zinc-500">// Informal Collector / Aggregator</span></div>
                <div className="pl-4">address buyer; <span className="text-zinc-500">// Certified Smelter / Brand Owner</span></div>
                <div className="pl-4">uint256 massKg; <span className="text-zinc-500">// Certified digital weighbridge mass</span></div>
                <div className="pl-4">uint256 purityBps; <span className="text-zinc-500">// Agent 01 score (e.g. 9850 = 98.5%)</span></div>
                <div className="pl-4">uint256 carbonOffsetKg; <span className="text-zinc-500">// EPA WARM net avoidance</span></div>
                <div className="pl-4">string ipfsImageProof; <span className="text-zinc-500">// Pinata IPFS visual proof CID</span></div>
                <div className="pl-4">bool eprCertificateIssued;</div>
                <div>&#125;</div>
              </div>
            </section>

            {/* SECTION 8: All Chapter Cards with Physical Attachments */}
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
  );
}
