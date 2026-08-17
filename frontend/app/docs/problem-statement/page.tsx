"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  AlertTriangle,
  Building2,
  Scale,
  Cpu,
  ShieldAlert,
  TrendingDown,
  FileSpreadsheet,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  DollarSign,
  Flame,
  CheckCircle2,
  Layers,
  ChevronRight,
} from "lucide-react";

import Image from "next/image";

export default function ProblemStatementPage() {
  return (
    <div className="min-h-screen bg-[#FBFBFC] dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/10 dark:bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-3">
            <Link href="/docs" className="hover:text-emerald-500 transition-colors">
              Docs
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-500">Getting Started</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-rose-500 font-bold">The Global & National Crisis</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            The Global & National Scrap Crisis
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            An in-depth investigation into the structural failures of India’s secondary commodity markets, multi-billion dollar ESG circularity fraud, and CPCB statutory compliance liabilities.
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

          {/* Detailed Content */}
          <main className="lg:col-span-9 space-y-12">
            {/* Infographic Banner */}
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
              <div className="p-3.5 bg-zinc-900/90 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-zinc-300">
                <span className="text-emerald-400 font-bold">
                  INFOGRAPHIC 1.0: Real-World Breakdown of Linear Landfill Crisis vs Secondary Circularity
                </span>
                <span className="text-zinc-400 text-[11px]">2.12B Tonnes Global Waste Baseline</span>
              </div>
            </div>

            {/* Section 1: Executive Overview */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-rose-500 uppercase tracking-widest">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>EXECUTIVE PROBLEM DEFINITION</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                The Anatomy of a Broken Supply Chain
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                Over <strong>90% of India's annual recyclable waste</strong>—encompassing over 4.2 million tonnes of plastics, 1.8 million tonnes of aluminum extrusions, and 1.2 million tonnes of electronic waste—is handled exclusively through unorganized, informal aggregation chains.
              </p>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                While enterprise OEMs and brand owners face aggressive government recycling mandates, they are unable to source verifiable secondary raw materials. Concurrently, informal aggregators who collect the vast majority of recyclable materials are excluded from institutional pricing and fair market value.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20">
                  <span className="font-mono text-3xl font-extrabold text-rose-500 block">90%+</span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white mt-1 block">Informal Sector Dependency</span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                    Collected without standardized purity testing or digital audit trails.
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20">
                  <span className="font-mono text-3xl font-extrabold text-amber-500 block">₹8,500</span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white mt-1 block">Penalty per MT for Metals</span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                    Statutory CPCB fines levied on OEMs failing FY 2026-27 recycling targets.
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-orange-500/[0.04] border border-orange-500/20">
                  <span className="font-mono text-3xl font-extrabold text-orange-500 block">$12.4B</span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white mt-1 block">Global Circularity Fraud</span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                    Lost annually to duplicate certificates and unverified paper claims.
                  </span>
                </div>
              </div>
            </section>

            {/* Section 2: Four Systemic Failures */}
            <section className="space-y-6">
              <h2 className="font-display text-2xl font-extrabold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
                The 4 Systemic Vectors of Failure
              </h2>

              {/* Failure 1 */}
              <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-mono font-bold text-xs">
                    01
                  </div>
                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                    Circularity Fraud & Phantom Recycling Lots
                  </h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  In the traditional market, verification relies on paper weighbridge receipts and self-declared bills of lading. Scammers routinely photocopy a single legitimate scrap delivery, generate multiple duplicate ESG certificates, and sell the same carbon offset to multiple corporate buyers. 
                </p>
                <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-black/40 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block mb-1">Audit Risk:</span>
                  Double-counting cannot be detected by conventional accounting firms without unified cryptographic hash trees and on-chain verification stamps.
                </div>
              </div>

              {/* Failure 2 */}
              <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-mono font-bold text-xs">
                    02
                  </div>
                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                    Digital Exclusion & Middleman Exploitation
                  </h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  India’s 5 million+ grassroot scrap collectors speak regional dialects (Hindi, Marathi, Tamil, Telugu) and lack formal desktop computers or complex ERP software. Unscrupulous middlemen buy high-grade copper or aluminum scrap at 30–50% below MCX market rates, keeping the margin and excluding workers from fair economic participation.
                </p>
              </div>

              {/* Failure 3 */}
              <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-mono font-bold text-xs">
                    03
                  </div>
                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                    Strict Statutory CPCB Regulations (FY 2026-27)
                  </h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  The Ministry of Environment, Forest and Climate Change (MoEFCC) has enforced rigid mandatory quotas:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
                    <span className="text-zinc-500 text-[10px] block">Rigid Plastics (Cat I)</span>
                    <span className="font-bold text-emerald-500 text-sm">80% Recycling Quota</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
                    <span className="text-zinc-500 text-[10px] block">Secondary Aluminum/Metals</span>
                    <span className="font-bold text-orange-500 text-sm">75% Mandated Target</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
                    <span className="text-zinc-500 text-[10px] block">Non-Compliance Fines</span>
                    <span className="font-bold text-rose-500 text-sm">₹5,000 – ₹25,000/MT</span>
                  </div>
                </div>
              </div>

              {/* Failure 4 */}
              <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono font-bold text-xs">
                    04
                  </div>
                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                    Probabilistic GenAI Carbon Hallucinations
                  </h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  When ESG companies use standard generative LLM prompts (e.g. <em>"estimate carbon saved for 500kg aluminum"</em>), the model outputs non-deterministic numbers (varying from 3,000kg to 6,000kg CO₂e across different runs). This breaks statutory compliance standards which require peer-reviewed, reproducible conversion formulas.
                </p>
              </div>
            </section>

            {/* Navigation Footer */}
            <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/docs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-zinc-900 dark:text-white font-display text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Executive Summary</span>
              </Link>

              <Link
                href="/docs/solution-comparison"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>Next: Linear vs CircularChain</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
