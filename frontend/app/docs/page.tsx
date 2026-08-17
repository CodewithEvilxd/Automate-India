"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import Image from "next/image";
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
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Rocket,
  ExternalLink,
  ChevronRight,
  Globe2,
  TrendingDown,
  Factory,
  Flame,
  FileSpreadsheet,
} from "lucide-react";

export default function DocsOverviewPage() {
  const chapters = [
    {
      title: "The Global & National Crisis",
      desc: "Deep-dive into $12.4B ESG circularity fraud, 90% unorganized kabadiwala sector exploitation, and strict CPCB penalty structures.",
      href: "/docs/problem-statement",
      icon: AlertTriangle,
      badge: "Critical",
      accent: "rose",
    },
    {
      title: "Linear vs CircularChain Protocol",
      desc: "Granular architectural comparison across Purity Testing, EPA Math, MCX Pricing, Informal Speech, and On-Chain Settlement.",
      href: "/docs/solution-comparison",
      icon: CheckCircle2,
      badge: "Architecture",
      accent: "emerald",
    },
    {
      title: "Developer & Recycler Quickstart",
      desc: "3-minute onboarding paths for informal scrap aggregators (voice & camera), enterprise OEMs, and Web3 developers.",
      href: "/docs/quickstart",
      icon: Rocket,
      badge: "Quickstart",
      accent: "emerald",
    },
    {
      title: "Agent 01: Optical Quality Vision",
      desc: "Multi-Modal semantic segmentation detecting surface oxidation, PVC label impurities, and assigning ISO 9001 grades.",
      href: "/docs/agents/agent-01",
      icon: Cpu,
      badge: "Agent 01",
      accent: "emerald",
    },
    {
      title: "Agent 02: EPA WARM Carbon Math",
      desc: "Deterministic life-cycle carbon math (9.13 kg CO₂e for Alum, 2.81 for Copper) with zero generative AI hallucination.",
      href: "/docs/agents/agent-02",
      icon: Scale,
      badge: "Agent 02",
      accent: "emerald",
    },
    {
      title: "Agent 03: MCX Oracle & Logistics",
      desc: "Continuous Multi Commodity Exchange price discovery coupled with Haversine transport carbon route optimization.",
      href: "/docs/agents/agent-03",
      icon: Zap,
      badge: "Agent 03",
      accent: "orange",
    },
    {
      title: "Agent 04: Indic Voice NLP Bridge",
      desc: "Multi-lingual speech recognition parsing colloquial Hindi, Tamil, Telugu, Marathi, and Bengali into structured listings.",
      href: "/docs/agents/agent-04",
      icon: Mic,
      badge: "Agent 04",
      accent: "emerald",
    },
    {
      title: "Agent 05: Cryptographic Fraud Radar",
      desc: "Pre-execution wash-trading detection, double-claim blocker, and anomalous mass inflation audits.",
      href: "/docs/agents/agent-05",
      icon: ShieldAlert,
      badge: "Agent 05",
      accent: "orange",
    },
    {
      title: "Agent 06: CPCB Statutory EPR Shield",
      desc: "Automated MoEFCC PWM Rules 2026 quota fulfillment, digital certificate generation, and avoided penalty calculations.",
      href: "/docs/agents/agent-06",
      icon: Building2,
      badge: "Agent 06",
      accent: "orange",
    },
    {
      title: "Polygon Amoy Smart Contracts",
      desc: "Decentralized ownership settlement, Solidity contract topology (80002), and IPFS visual proof pinning.",
      href: "/docs/blockchain",
      icon: Lock,
      badge: "Web3",
      accent: "emerald",
    },
    {
      title: "Interactive REST API Reference",
      desc: "Live interactive sandbox testing /api/mcx-oracle, /api/cpcb/calculate, and /api/verify-transfer in cURL, TS, and Python.",
      href: "/docs/api",
      icon: Code2,
      badge: "Developer",
      accent: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFC] dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Hero Header */}
      <div className="border-b border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0D0E15] py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Whitepaper & Technical Docs v2.4</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 dark:text-orange-400 border border-orange-500/20 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Agent AI Architecture</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/10 text-xs font-mono">
              CPCB FY 2026-27 Compliant
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Executive Summary & Problem Statement
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            A comprehensive breakdown of the global linear waste crisis, informal supply chain exploitation, $12.4B greenwashing fraud, and how CircularChain orchestrates autonomous multi-agent intelligence on blockchain to formalize the circular economy.
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
            {/* Infographic 1: Global Waste vs Circular Economy */}
            <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 glass-panel shadow-2xl relative">
              <div className="relative w-full aspect-video">
                <Image
                  src="/docs/global_scrap_crisis.jpg"
                  alt="Global Scrap Crisis Infographic"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4 bg-zinc-900/90 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Globe2 className="w-4 h-4" />
                  FIGURE 1.0: Global Extraction & Landfill Overflow vs Autonomous Secondary Refining
                </span>
                <span className="text-zinc-400 text-[11px]">EPA WARM v15 + MCX Benchmark Topology</span>
              </div>
            </div>

            {/* In-depth Problem Summary */}
            <section className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-rose-500 uppercase tracking-widest">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>THE GLOBAL CRISIS (WORLD PROBLEM ANALYSIS)</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                What is the Real-World Crisis and Why Does It Exist?
              </h2>

              <div className="prose dark:prose-invert max-w-none text-sm text-zinc-600 dark:text-zinc-300 space-y-4 leading-relaxed font-sans">
                <p>
                  Every year, the planet generates over <strong>2.12 Billion metric tons of solid waste</strong>, with heavy industrial scrap (aluminum, copper, steel, battery lithium black mass, and engineering polymers) representing both the most energy-intensive manufacturing burden and the largest environmental hazard.
                </p>
                <p>
                  Refining primary virgin metals from raw earth ore consumes monumental amounts of energy. For example, producing 1 ton of virgin aluminum from bauxite ore requires approximately <strong>14,000 to 17,000 kWh of electricity</strong> and releases over <strong>9,130 kg of CO₂ equivalent</strong> into the atmosphere. In contrast, recycling secondary scrap aluminum consumes <strong>95% less energy</strong>. Yet, worldwide, more than <strong>60% of recyclable metal and plastic scrap ends up in open landfills, illegal dump yards, or informal open-air burning pits</strong>.
                </p>
              </div>

              {/* 4 Pillars of Failure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3">
                  <div className="w-9 h-9 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
                    <Flame className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                    1. Toxic Informal Smelting & Health Hazards
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Without structured secondary supply chains, urban scrap in developing nations is processed in crude, unmonitored acid baths and backyard furnaces, releasing toxic dioxins, lead, and greenhouse gases directly into residential communities.
                  </p>
                </div>

                <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3">
                  <div className="w-9 h-9 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                    2. 40% Middleman Margin Exploitation
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Over 5 Million informal waste pickers and small scrap aggregators (kabadiwalas) operate without real-time price feeds. Intermediaries withhold MCX spot prices and deduct arbitrary 30-40% "impurity penalties" during manual weigh-ins.
                  </p>
                </div>

                <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3">
                  <div className="w-9 h-9 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                    3. $12.4B ESG Paper Greenwashing
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Corporations purchase unverified, duplicate paper certificates to falsely claim zero-landfill compliance. In reality, the physical scrap never moved to certified recycling facilities, leading to regulatory crackdowns.
                  </p>
                </div>

                <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                    4. Statutory CPCB Penalties for Non-Compliance
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Under India’s PWM Rules 2026 and BWMR, producers and brand owners face non-negotiable statutory fines up to <strong>₹25,000 per MT</strong> for missing recycling quotas, threatening corporate balance sheets.
                  </p>
                </div>
              </div>
            </section>

            {/* Infographic 2: AI Multi-Agent Solution Architecture */}
            <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 glass-panel shadow-2xl relative">
              <div className="relative w-full aspect-video">
                <Image
                  src="/docs/circularchain_ai_network.jpg"
                  alt="CircularChain AI Multi-Agent Network Architecture"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4 bg-zinc-900/90 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Cpu className="w-4 h-4" />
                  FIGURE 2.0: CircularChain 6-Agent Autonomous Orchestration & Polygon Settlement
                </span>
                <span className="text-orange-400 font-bold text-[11px]">Chain ID: 80002 (Polygon Amoy)</span>
              </div>
            </div>

            {/* How CircularChain Solves It */}
            <section className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE CIRCULARCHAIN PROTOCOL SOLUTION</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                How Our Multi-Agent Network Re-Architects the Economy
              </h2>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                CircularChain replaces manual, opaque, and corrupt intermediaries with six specialized, deterministic autonomous AI agents running continuously on cloud and mobile edge infrastructure:
              </p>

              {/* Agents Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold font-mono">
                    <Cpu className="w-4 h-4" />
                    <span>Agent 01: Vision</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Performs pixel-level contamination analysis and assigns ISO 9001 grades from camera images.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold font-mono">
                    <Scale className="w-4 h-4" />
                    <span>Agent 02: Carbon Math</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Applies deterministic EPA WARM v15 equations with zero generative AI hallucinations.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-orange-500 font-bold font-mono">
                    <Zap className="w-4 h-4" />
                    <span>Agent 03: MCX Oracle</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Stream live commodity spot prices and matches nearest secondary smelting transit hubs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold font-mono">
                    <Mic className="w-4 h-4" />
                    <span>Agent 04: Indic Voice</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Empowers grassroots collectors to list scrap hands-free in Hindi, Tamil, Telugu, and Marathi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-orange-500 font-bold font-mono">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Agent 05: Fraud Radar</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Blocks wash-trading, duplicate IPFS hashes, and anomalous mass inflation on-chain.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-orange-500 font-bold font-mono">
                    <Building2 className="w-4 h-4" />
                    <span>Agent 06: CPCB Shield</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Automates MoEFCC EPR quota compliance and quantifies avoided balance sheet fines.
                  </p>
                </div>
              </div>
            </section>

            {/* Chapters Navigation Section */}
            <section className="space-y-6 pt-4 border-t border-zinc-200 dark:border-white/10">
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white pb-1">
                Explore Dedicated Documentation Chapters
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapters.map((chap, idx) => {
                  const Icon = chap.icon;
                  return (
                    <Link
                      key={idx}
                      href={chap.href}
                      className="p-5 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:scale-[1.01] transition-all group flex flex-col justify-between space-y-3 shadow-sm"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
                            chap.accent === "rose"
                              ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                              : chap.accent === "orange"
                              ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                            chap.accent === "rose"
                              ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                              : chap.accent === "orange"
                              ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          }`}>
                            {chap.badge}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-display font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                            {chap.title}
                          </h4>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                            {chap.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform pt-1">
                        <span>Read Chapter</span>
                        <ChevronRight className="w-3.5 h-3.5" />
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
