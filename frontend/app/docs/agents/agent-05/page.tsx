"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Fingerprint,
} from "lucide-react";

export default function Agent05DocsPage() {
  const fraudTests = [
    { name: "Circular Wash-Trading Test", rule: "Flags transactions if wallet A and wallet B execute rapid reciprocal transfers within 48 hours.", riskWeight: "+45 Risk Points" },
    { name: "Duplicate IPFS Hash Match", rule: "Scans on-chain registry for identical visual evidence hashes (blocks re-inscription of same physical lot).", riskWeight: "+80 Risk Points (Immediate Block)" },
    { name: "Anomalous Mass Claim", rule: "Audits mass against transport category (e.g. >5,000 kg listed on non-commercial small transport vehicle).", riskWeight: "+35 Risk Points" },
    { name: "EPA Mathematical Inconsistency", rule: "Blocks lots where claimed carbon savings exceed deterministic EPA WARM equations by >0.1%.", riskWeight: "+90 Risk Points (Immediate Block)" },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFC] dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-3">
            <Link href="/docs" className="hover:text-emerald-500 transition-colors">
              Docs
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-500">6-Agent Core</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-orange-500 font-bold">Agent 05: Cryptographic Fraud Radar</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Agent 05: Cryptographic Fraud Sentinel
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed mt-2">
            Pre-execution cryptographic auditing detecting wash trading, duplicate invoice minting, and anomalous ESG inflation before smart contract settlement.
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
            {/* Overview */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-500 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INTEGRITY & COLLUSION DETECTION</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                How Agent 05 Stops Greenwashing at the Protocol Level
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                In unverified ESG registries, unscrupulous participants generate circular trades between shell companies to inflate their reported recycling volumes. <strong>Agent 05</strong> acts as an autonomous on-chain sentinel, analyzing wallet graphs, IPFS visual hashes, and weighbridge telemetry before transactions can be broadcast.
              </p>
            </section>

            {/* Audit Rules */}
            <section className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
                4-Point Pre-Execution Audit Rules
              </h3>

              <div className="space-y-4 text-xs">
                {fraudTests.map((test, idx) => (
                  <div key={idx} className="p-5 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-zinc-900 dark:text-white">{test.name}</span>
                      <span className="font-mono text-[10px] font-bold text-orange-500 uppercase">{test.riskWeight}</span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs">{test.rule}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Navigation Footer */}
            <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/docs/agents/agent-04"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-zinc-900 dark:text-white font-display text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 04 (Indic Voice)</span>
              </Link>

              <Link
                href="/docs/agents/agent-06"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>Next: Agent 06 (CPCB EPR Shield)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
