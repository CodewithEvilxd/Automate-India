"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
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

      {/* Header Banner */}
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
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            CircularChain Documentation
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Welcome to the official CircularChain protocol documentation. Explore architectural specifications, deterministic EPA WARM carbon equations, CPCB EPR compliance automation, and on-chain settlement mechanisms.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          <main className="lg:col-span-9 space-y-10">
            {/* Executive Abstract */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PROTOCOL OVERVIEW</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Autonomous Circular Economy & Carbon Ledger Protocol
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                CircularChain operates as a decentralized, multi-agent network designed to solve the structural opacity, greenwashing, and digital exclusion in India’s $40B+ secondary scrap commodity market.
              </p>
            </section>

            {/* Structured Documentation Chapters Grid */}
            <section className="space-y-6">
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
                Documentation Chapters & Deep-Dives
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapters.map((chap, idx) => {
                  const Icon = chap.icon;
                  return (
                    <Link
                      key={idx}
                      href={chap.href}
                      className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:scale-[1.02] transition-all group flex flex-col justify-between space-y-4 shadow-sm"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                            chap.accent === "rose"
                              ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                              : chap.accent === "orange"
                              ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          }`}>
                            <Icon className="w-5 h-5" />
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
                          <h4 className="font-display font-bold text-base text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                            {chap.title}
                          </h4>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                            {chap.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
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
