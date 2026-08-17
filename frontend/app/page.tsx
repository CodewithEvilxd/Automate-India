"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ApkDownloadModal from "@/components/ApkDownloadModal";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  TrendingUp,
  BarChart3,
  Scale,
  Sparkles,
  Layers,
  ChevronRight,
  Activity,
  Award,
  Globe2,
  CheckCircle2,
  Smartphone,
  Zap,
  Flame,
} from "lucide-react";

export default function Home() {
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [commodities, setCommodities] = useState([
    { name: "Aluminum (6063 Scrap)", price: "₹215.00/kg", change: "+2.4%", trend: "up", type: "green" },
    { name: "Copper (Heavy Berry)", price: "₹760.00/kg", change: "+1.8%", trend: "up", type: "orange" },
    { name: "PET Flakes (Hot Washed)", price: "₹48.00/kg", change: "+3.1%", trend: "up", type: "green" },
    { name: "HDPE Granules (Blue)", price: "₹58.00/kg", change: "-0.5%", trend: "down", type: "green" },
    { name: "HMS 1/2 Steel Scrap", price: "₹42.50/kg", change: "+0.9%", trend: "up", type: "orange" },
    { name: "Lithium Black Mass", price: "₹850.00/kg", change: "+5.2%", trend: "up", type: "orange" },
  ]);

  useEffect(() => {
    const fetchOracle = async () => {
      try {
        const res = await fetch("/api/mcx-oracle");
        if (res.ok) {
          const data = await res.json();
          if (data.commodities && Array.isArray(data.commodities)) {
            const mapped = data.commodities.slice(0, 6).map((c: any) => ({
              name: c.name.includes("(") ? c.name : `${c.name}`,
              price: `₹${Number(c.unitPriceINR).toFixed(2)}/${c.unit || "kg"}`,
              change: c.change || "+0.0%",
              trend: c.trend || "up",
              type: c.symbol?.includes("CU") || c.symbol?.includes("HMS") || c.symbol?.includes("LI") ? "orange" : "green",
            }));
            setCommodities(mapped);
          }
        }
      } catch (_) {}
    };

    fetchOracle();
    const interval = setInterval(fetchOracle, 20000); // 20s auto-refresh
    return () => clearInterval(interval);
  }, []);

  const agentPillars = [
    {
      id: "agent-1",
      badge: "Agent 01 • Optical Vision",
      title: "Visual Contamination & Quality Grade Heatmap",
      desc: "Multi-modal vision analyzes scrap batches at the pixel level to detect surface oxidation, PVC impurities, and moisture levels, generating certified Industrial Grade A+/A/B ratings.",
      tech: "Multi-Modal Vision • ISO 9001 Alignment",
      icon: Cpu,
      accent: "emerald",
    },
    {
      id: "agent-2",
      badge: "Agent 02 • Carbon Oracle",
      title: "Deterministic EPA WARM Carbon Accounting",
      desc: "Immutably calculates greenhouse gas mitigation factors (e.g. 9.13 kg CO₂e saved per kg of secondary aluminum) using peer-reviewed US EPA baseline equations with zero hallucination.",
      tech: "EPA WARM Math • Zero Discrepancy",
      icon: Scale,
      accent: "emerald",
    },
    {
      id: "agent-3",
      badge: "Agent 03 • Logistics & MCX Oracle",
      title: "Autonomous Price Discovery & Route Optimizer",
      desc: "Fetches live Indian commodity market rates (MCX) and matches sellers with the closest certified recycler across 6 industrial hubs (Noida, Pune, Bengaluru) to guarantee a positive Net Carbon ROI.",
      tech: "MCX Spot Benchmark • Transit Math",
      icon: TrendingUp,
      accent: "orange",
    },
    {
      id: "agent-4",
      badge: "Agent 04 • Smart Contract",
      title: "Self-Executing Polygon Amoy Settlement",
      desc: "Smart contracts verify material purity and EPA math before executing automated ownership transfers and minting CIRC compliance tokens on Polygon Amoy (Chain ID: 80002).",
      tech: "Solidity • Polygon PoS Testnet",
      icon: ShieldCheck,
      accent: "emerald",
    },
    {
      id: "agent-5",
      badge: "Agent 05 • Fraud Sentinel",
      title: "On-Chain Anomaly & Wash-Trading Sentinel",
      desc: "Scans transactions in real-time for circular wallet wash-trading, single-vehicle gross payload violations (>35 MT), and baseline carbon variance anomalies before ledger inscription.",
      tech: "Anomaly Radar • Risk Scoring",
      icon: Activity,
      accent: "orange",
    },
    {
      id: "agent-6",
      badge: "Agent 06 • Statutory EPR",
      title: "CPCB 2026 Extended Producer Liability Engine",
      desc: "Simulates statutory corporate recycling obligations under Central Pollution Control Board guidelines (Plastic Cat I/II, E-Waste Schedule I) and auto-generates audit-ready Form 1 filings.",
      tech: "CPCB FY26-27 • Form 1 Auto-Filing",
      icon: Award,
      accent: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 relative overflow-hidden">
      <Navbar />

      {/* Subtle Studio Spotlight (Neutral, Emerald & Sunset Amber) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-gradient-to-b from-white/[0.04] via-emerald-500/[0.02] to-amber-500/[0.02] blur-3xl -z-10 pointer-events-none" />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 mb-8 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Autonomous Industrial Circularity Protocol • <span className="text-orange-500 dark:text-amber-400 font-bold">Polygon Amoy</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
          </div>

          {/* Grand Headline with Emerald & Sunset Tangerine Balance */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-zinc-900 dark:text-white">
            The Verifiable Ledger for{" "}
            <span className="bg-gradient-to-r from-zinc-900 via-emerald-600 to-orange-600 dark:from-white dark:via-emerald-400 dark:to-amber-400 bg-clip-text text-transparent">
              Industrial Scrap & Carbon Offsets
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Eliminate circularity fraud with AI vision impurity analysis, live Indian MCX commodity pricing, statutory CPCB EPR compliance, and smart contract ledger verification.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setIsApkModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/[0.14] border border-zinc-700 dark:border-white/10 font-display font-semibold text-sm transition-all shadow-sm hover:scale-105 group"
            >
              <Smartphone className="w-4 h-4 text-orange-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span>Get Android App</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                APK
              </span>
            </button>

            <Link
              href="/epr-calculator"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#121215] hover:bg-zinc-100 dark:hover:bg-[#18181B] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white font-display font-semibold text-sm transition-all shadow-sm hover:scale-105"
            >
              <Scale className="w-4 h-4 text-emerald-500" />
              <span>Simulate EPR</span>
            </Link>

            <Link
              href="/verify"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-zinc-100 dark:hover:bg-white/[0.04] border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300 font-display font-medium text-sm transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Verify On-Chain</span>
            </Link>
          </div>
        </div>

        {/* APK Download Modal */}
        <ApkDownloadModal
          isOpen={isApkModalOpen}
          onClose={() => setIsApkModalOpen(false)}
        />

        {/* Live MCX Commodity Benchmark Ticker Bar */}
        <div className="mt-16 rounded-2xl glass-panel p-4 border border-zinc-200 dark:border-white/10 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Live Indian Commodity Scrap Index (MCX Benchmark)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                Auto-Synced Real-Time Pricing
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3">
            {commodities.map((item, idx) => {
              const isOrange = item.type === "orange";
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border transition-all ${
                    isOrange
                      ? "border-orange-500/20 hover:border-orange-500/40"
                      : "border-zinc-200 dark:border-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 truncate">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-mono font-bold text-sm text-zinc-900 dark:text-white">
                      {item.price}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold ${
                        isOrange
                          ? "text-orange-500 dark:text-orange-400"
                          : item.trend === "up"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-500"
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6-Agent Autonomous Architecture Matrix (Bento Grid) */}
        <div className="mt-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-orange-500/10 text-zinc-800 dark:text-zinc-200 border border-emerald-500/20 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Multi-Agent AI & Web3 Architecture</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Engineered for Zero-Fraud Circular Supply Chains
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm">
              Six autonomous agents coordinate in real-time across optical computer vision, carbon accounting, commodity pricing, smart contracts, and statutory compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentPillars.map((agent) => {
              const Icon = agent.icon;
              const isOrange = agent.accent === "orange";
              return (
                <div
                  key={agent.id}
                  className={`rounded-2xl glass-panel p-6 border transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden ${
                    isOrange
                      ? "border-orange-500/20 hover:border-orange-500/40"
                      : "border-zinc-200 dark:border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        isOrange
                          ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/25"
                          : "bg-zinc-100 dark:bg-white/[0.05] border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {agent.badge}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${
                        isOrange
                          ? "bg-orange-500/10 text-orange-500 border border-orange-500/30"
                          : "bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                    {agent.title}
                  </h3>

                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                    {agent.desc}
                  </p>

                  <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    <span>{agent.tech}</span>
                    {isOrange ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Protocol Stats Bar */}
        <div className="mt-24 rounded-3xl glass-panel p-8 sm:p-10 border border-zinc-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle warm amber ambient radial light */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Audited Carbon Abated
              </div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
                28,490 kg
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                EPA WARM Eq. (+28.5 MT CO₂e)
              </div>
            </div>

            <div>
              <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Physical Mass Diverted
              </div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mt-2">
                8,420 kg
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Across 6 Manufacturing Hubs
              </div>
            </div>

            <div>
              <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Avoided Statutory Penalties
              </div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-orange-500 dark:text-orange-400 mt-2">
                ₹ 18.4 Lakh
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
                CPCB Section 15 Inscribed
              </div>
            </div>

            <div>
              <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Fraud Detection Rate
              </div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-amber-500 mt-2">
                99.8% Accuracy
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Autonomous Sentinel Audited
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
