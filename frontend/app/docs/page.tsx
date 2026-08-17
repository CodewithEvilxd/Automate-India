"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import Image from "next/image";
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
  BookOpen,
  Cpu,
  Scale,
  Zap,
  Mic,
  ShieldAlert,
  Building2,
  Lock,
  Code2,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Rocket,
  ChevronRight,
  PenTool,
  Layers,
} from "lucide-react";

export default function DocsOverviewPage() {
  const chapters = [
    {
      title: "The Global & National Crisis",
      desc: "Deep-dive into $12.4B ESG circularity fraud, 90% unorganized kabadiwala sector exploitation, and strict CPCB penalty structures.",
      href: "/docs/problem-statement",
      icon: AlertTriangle,
      badge: "Critical",
      attachType: "paperclip",
      tilt: "rotate-0.5",
    },
    {
      title: "Linear vs CircularChain Protocol",
      desc: "Granular architectural comparison across Purity Testing, EPA Math, MCX Pricing, Informal Speech, and On-Chain Settlement.",
      href: "/docs/solution-comparison",
      icon: CheckCircle2,
      badge: "Architecture",
      attachType: "tape-center",
      tilt: "-rotate-0.5",
    },
    {
      title: "Developer & Recycler Quickstart",
      desc: "3-minute onboarding paths for informal scrap aggregators (voice & camera), enterprise OEMs, and Web3 developers.",
      href: "/docs/quickstart",
      icon: Rocket,
      badge: "Quickstart",
      attachType: "tape-corner",
      tilt: "rotate-0.5",
    },
    {
      title: "Agent 01: Optical Quality Vision",
      desc: "Multi-Modal semantic segmentation detecting surface oxidation, PVC label impurities, and assigning ISO 9001 grades.",
      href: "/docs/agents/agent-01",
      icon: Cpu,
      badge: "Agent 01",
      attachType: "paperclip",
      tilt: "-rotate-0.5",
    },
    {
      title: "Agent 02: EPA WARM Carbon Math",
      desc: "Deterministic life-cycle carbon math (9.13 kg CO₂e for Alum, 2.81 for Copper) with zero generative AI hallucination.",
      href: "/docs/agents/agent-02",
      icon: Scale,
      badge: "Agent 02",
      attachType: "tape-center",
      tilt: "rotate-0.5",
    },
    {
      title: "Agent 03: MCX Oracle & Logistics",
      desc: "Continuous Multi Commodity Exchange price discovery coupled with Haversine transport carbon route optimization.",
      href: "/docs/agents/agent-03",
      icon: Zap,
      badge: "Agent 03",
      attachType: "tape-corner",
      tilt: "-rotate-0.5",
    },
    {
      title: "Agent 04: Indic Voice NLP Bridge",
      desc: "Multi-lingual speech recognition parsing colloquial Hindi, Tamil, Telugu, Marathi, and Bengali into structured listings.",
      href: "/docs/agents/agent-04",
      icon: Mic,
      badge: "Agent 04",
      attachType: "paperclip",
      tilt: "rotate-0.5",
    },
    {
      title: "Agent 05: Cryptographic Fraud Radar",
      desc: "Pre-execution wash-trading detection, double-claim blocker, and anomalous mass inflation audits.",
      href: "/docs/agents/agent-05",
      icon: ShieldAlert,
      badge: "Agent 05",
      attachType: "tape-center",
      tilt: "-rotate-0.5",
    },
    {
      title: "Agent 06: CPCB Statutory EPR Shield",
      desc: "Automated MoEFCC PWM Rules 2026 quota fulfillment, digital certificate generation, and avoided penalty calculations.",
      href: "/docs/agents/agent-06",
      icon: Building2,
      badge: "Agent 06",
      attachType: "tape-corner",
      tilt: "rotate-0.5",
    },
    {
      title: "Polygon Amoy Smart Contracts",
      desc: "Decentralized ownership settlement, Solidity contract topology (80002), and IPFS visual proof pinning.",
      href: "/docs/blockchain",
      icon: Lock,
      badge: "Web3",
      attachType: "paperclip",
      tilt: "-rotate-0.5",
    },
    {
      title: "Interactive REST API Reference",
      desc: "Live interactive sandbox testing /api/mcx-oracle, /api/cpcb/calculate, and /api/verify-transfer in cURL, TS, and Python.",
      href: "/docs/api",
      icon: Code2,
      badge: "Developer",
      attachType: "tape-center",
      tilt: "rotate-0.5",
    },
  ];

  return (
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Scribely Sketchpad Header Banner */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-amber-50/70 dark:bg-[#0D0E15]/80 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_#10B981]">
              <PenTool className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Architectural Field Notes v2.4</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-300 dark:bg-amber-500/20 text-zinc-950 dark:text-amber-300 border-2 border-zinc-950 text-xs font-sketch font-bold">
              <span>6 Autonomous AI Agents</span>
            </span>
            <span className="font-handwriting text-base text-zinc-600 dark:text-zinc-400">
              Handwritten System Architecture
            </span>
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            CircularChain <span className="highlight-yellow px-2">Blueprint & Field Manual</span>
          </h1>
          <p className="font-handwriting text-xl sm:text-2xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            The definitive technical specification for formalizing India’s $40B+ secondary scrap economy using deterministic computer vision, EPA carbon math, and Polygon smart contracts.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          {/* Main Sketchpad Area */}
          <main className="lg:col-span-9 space-y-12">
            
            {/* EXACT MATCH: 3-Column Sticky Note Sketchpad from Reference Image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Note 1: ML Model (with Paperclip on top-left) */}
              <div className="relative p-6 rounded-3xl bg-white dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_#10B981] transform -rotate-0.5 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between min-h-[220px]">
                <PaperclipElement />
                <div className="space-y-3">
                  <div className="w-fit">
                    <h3 className="font-sketch text-xl font-bold text-zinc-900 dark:text-white">
                      ML Models:
                    </h3>
                    <DoodleUnderline className="text-zinc-950 dark:text-white" />
                  </div>

                  <ul className="space-y-1.5 font-sketch text-sm text-zinc-700 dark:text-zinc-300 leading-snug">
                    <li>• Tool-calling Multi-Agent LLM</li>
                    <li>• Vision Contamination Masking</li>
                    <li>• EPA WARM v15 Carbon Math</li>
                    <li>• Fraud Risk Anomaly Radar</li>
                  </ul>
                </div>

                <div className="flex justify-end pt-2">
                  <DoodleStar className="text-amber-500" />
                </div>
              </div>

              {/* Note 2: Database (with Washi Tape on top-center) */}
              <div className="relative p-6 rounded-3xl bg-white dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_#F59E0B] transform rotate-0.5 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between min-h-[220px]">
                <WashiTapeCenter />
                <div className="space-y-3">
                  <div className="w-fit">
                    <h3 className="font-sketch text-xl font-bold text-zinc-900 dark:text-white">
                      Data & State:
                    </h3>
                    <DoodleUnderline className="text-zinc-950 dark:text-white" />
                  </div>

                  <ul className="space-y-1.5 font-sketch text-sm text-zinc-700 dark:text-zinc-300 leading-snug">
                    <li>• PostgreSQL / Prisma ORM</li>
                    <li>• Redis Event & MCX Oracle Bus</li>
                    <li>• Local SQLite / Room Cache</li>
                    <li>• Pinata IPFS Evidence Storage</li>
                  </ul>
                </div>

                <div className="flex justify-end pt-2">
                  <DoodleDatabase className="text-emerald-500" />
                </div>
              </div>

              {/* Note 3: Cloud / Ledger (with Diagonal Washi Tape on top-right) */}
              <div className="relative p-6 rounded-3xl bg-white dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_#10B981] transform -rotate-0.5 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between min-h-[220px]">
                <WashiTapeCorner />
                <div className="space-y-3">
                  <div className="w-fit">
                    <h3 className="font-sketch text-xl font-bold text-zinc-900 dark:text-white">
                      Cloud / Ledger:
                    </h3>
                    <DoodleUnderline className="text-zinc-950 dark:text-white" />
                  </div>

                  <ul className="space-y-1.5 font-sketch text-sm text-zinc-700 dark:text-zinc-300 leading-snug">
                    <li>• Polygon Amoy (Chain ID: 80002)</li>
                    <li>• Render Cloud Auto-Scaling</li>
                    <li>• Flutter Android Mobile Layer</li>
                    <li>• Phone-first Hindi Voice Input</li>
                  </ul>
                </div>

                <div className="flex justify-end pt-2">
                  <DoodleCloud className="text-sky-500" />
                </div>
              </div>
            </div>

            {/* 3D Cylinder Specimen Carousel Styled as an Interactive Specimen Turntable */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#12131C]/95 border-2 border-zinc-950 dark:border-white/20 shadow-[4px_4px_0px_#10B981] overflow-hidden backdrop-blur-xl">
              
              <WashiTapeCenter />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-dashed border-zinc-200 dark:border-white/10">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-sketch text-xs font-bold uppercase mb-1 border border-emerald-300">
                    <span>3D Specimen Turntable</span>
                  </div>
                  <h3 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                    10 Verified Secondary Material Streams
                  </h3>
                </div>
                <span className="font-handwriting text-lg text-emerald-700 dark:text-emerald-400 font-bold">
                  (Drag or rotate in 3D ↺)
                </span>
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

              <div className="mt-4 pt-3 border-t-2 border-dashed border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-handwriting text-base text-zinc-600 dark:text-zinc-400">
                <span>Verified by Agent 01 pixel contouring & ISO 9001 quality grade</span>
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  Polygon Amoy Testnet (80002)
                </span>
              </div>
            </div>

            {/* Scribely Note Box: Why the World is Failing */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-amber-50/90 dark:bg-[#14151F] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-6">
              <PaperclipElement />
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 font-sketch text-xs uppercase tracking-widest text-rose-600 dark:text-rose-400 font-bold">
                  <span>Critical Problem Statement Analysis</span>
                </div>
                <span className="font-handwriting text-sm text-zinc-500">Case Study 2026-27</span>
              </div>

              <h2 className="font-sketch text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                From Chaos to Clarity: <span className="highlight-yellow">Why Linear Recycling Fails</span>
                <DoodleUnderline className="text-rose-500 max-w-sm" />
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <p>
                  Every year, over <strong>2.12 Billion metric tons of solid industrial waste</strong> are generated globally. While recycling secondary aluminum requires <strong>95% less energy</strong> than mining virgin bauxite ore, more than <strong>60% of recyclable metal and plastic scrap ends up in open landfills, toxic backyard burning pits, or fraudulent paper ledger schemes</strong>.
                </p>
              </div>

              {/* 4 Sketch Sticky Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                
                {/* Sticky Note 1 */}
                <div className="relative p-5 rounded-2xl bg-white dark:bg-zinc-900/90 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(244,63,94,0.3)] transform -rotate-0.5 hover:rotate-0 transition-transform duration-300 space-y-2">
                  <div className="flex items-center gap-2 font-sketch text-base font-bold text-rose-600 dark:text-rose-400">
                    <span>1. Toxic Smelting & Health Hazards</span>
                  </div>
                  <p className="font-handwriting text-lg text-zinc-800 dark:text-zinc-200 leading-snug">
                    Unregulated scrap in developing nations is melted in crude backyard acid baths, releasing lethal dioxins and lead into groundwater and communities.
                  </p>
                </div>

                {/* Sticky Note 2 */}
                <div className="relative p-5 rounded-2xl bg-white dark:bg-zinc-900/90 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(245,158,11,0.3)] transform rotate-0.5 hover:rotate-0 transition-transform duration-300 space-y-2">
                  <div className="flex items-center gap-2 font-sketch text-base font-bold text-amber-600 dark:text-amber-400">
                    <span>2. 40% Middleman Margin Cuts</span>
                  </div>
                  <p className="font-handwriting text-lg text-zinc-800 dark:text-zinc-200 leading-snug">
                    5M+ informal kabadiwalas get arbitrary deductions on manual weigh scales with zero real-time MCX market transparency.
                  </p>
                </div>

                {/* Sticky Note 3 */}
                <div className="relative p-5 rounded-2xl bg-white dark:bg-zinc-900/90 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(244,63,94,0.3)] transform rotate-0.5 hover:rotate-0 transition-transform duration-300 space-y-2">
                  <div className="flex items-center gap-2 font-sketch text-base font-bold text-rose-600 dark:text-rose-400">
                    <span>3. $12.4B ESG Paper Greenwashing</span>
                  </div>
                  <p className="font-handwriting text-lg text-zinc-800 dark:text-zinc-200 leading-snug">
                    Companies buy fake, duplicate PDF certificates while actual scrap rots in landfills without ever reaching a real smelter.
                  </p>
                </div>

                {/* Sticky Note 4 */}
                <div className="relative p-5 rounded-2xl bg-white dark:bg-zinc-900/90 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(16,185,129,0.3)] transform -rotate-0.5 hover:rotate-0 transition-transform duration-300 space-y-2">
                  <div className="flex items-center gap-2 font-sketch text-base font-bold text-emerald-600 dark:text-emerald-400">
                    <span>4. Statutory CPCB Quota Penalties</span>
                  </div>
                  <p className="font-handwriting text-lg text-zinc-800 dark:text-zinc-200 leading-snug">
                    Failing FY 2026-27 recycling targets incurs non-negotiable fines up to ₹25,000/MT under Indian environmental law.
                  </p>
                </div>
              </div>
            </section>

            {/* Scribely Sketch Cards Directory with Paperclips & Washi Tape */}
            <section className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-zinc-900 dark:border-white/10 pb-3">
                <div>
                  <h3 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                    Field Manual Chapters & Agent Blueprints
                  </h3>
                  <DoodleUnderline className="text-emerald-500 max-w-xs" />
                </div>
                <span className="font-handwriting text-base text-zinc-500 font-bold">
                  Click any chapter card to open deep-dive
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {chapters.map((chap, idx) => {
                  const Icon = chap.icon;
                  return (
                    <Link
                      key={idx}
                      href={chap.href}
                      className={`relative p-6 rounded-3xl bg-white dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_#10B981] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group flex flex-col justify-between space-y-4 transform ${chap.tilt}`}
                    >
                      {/* Dynamic Attachment Element */}
                      {chap.attachType === "paperclip" && <PaperclipElement />}
                      {chap.attachType === "tape-center" && <WashiTapeCenter />}
                      {chap.attachType === "tape-corner" && <WashiTapeCorner />}

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
                          <p className="font-handwriting text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-snug mt-1">
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
