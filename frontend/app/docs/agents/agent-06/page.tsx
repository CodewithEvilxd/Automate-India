"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  Building2,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  FileText,
} from "lucide-react";

export default function Agent06DocsPage() {
  const cpcbSchedules = [
    { schedule: "Category I: Rigid Plastic Packaging", mandate: "80% Minimum Recycling Quota + 30% Mandatory PCR Content", penalty: "₹5,000 per MT Environmental Compensation" },
    { schedule: "Category II: Flexible Plastic Packaging", mandate: "70% Minimum Recycling Quota + 20% Mandatory PCR Content", penalty: "₹5,000 per MT Environmental Compensation" },
    { schedule: "Category III: Multi-Layered Plastic (MLP)", mandate: "60% Co-Processing / Waste-to-Energy Mandate", penalty: "₹7,000 per MT Environmental Compensation" },
    { schedule: "Schedule I: Automotive & Extrusion Aluminum", mandate: "75% Secondary Metal Scrappage Target (MoRTH ELV)", penalty: "₹8,500 per MT Environmental Compensation" },
    { schedule: "Schedule II: EV Lithium Battery Waste (BWMR)", mandate: "70% Critical Mineral Recovery (Lithium, Cobalt, Nickel)", penalty: "₹25,000 per MT Environmental Compensation" },
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
            <span className="text-orange-500 font-bold">Agent 06: CPCB Statutory EPR Shield</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Building2 className="w-5 h-5" />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Agent 06: CPCB Statutory EPR Shield
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed mt-2">
            Automated Extended Producer Responsibility (EPR) quota mapping, CPCB-auditable certification, and avoidance of statutory Environmental Compensation penalties for FY 2026-27.
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
                <span>STATUTORY EPR AUTOMATION</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Protecting Enterprise Balance Sheets Against CPCB Fines
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                Under the <strong>Plastic Waste Management (PWM) Rules</strong>, <strong>Battery Waste Management Rules (BWMR 2022)</strong>, and <strong>National Secondary Metals Scrappage Policy</strong>, Indian producers, importers, and brand owners (PIBOs) are legally mandated to fulfill statutory recycling quotas. Missing targets triggers non-negotiable Environmental Compensation fines.
              </p>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                <strong>Agent 06</strong> parses every procured lot on CircularChain, applies official CPCB formulas, generates compliance certificates, and computes the exact statutory penalty amount avoided by the enterprise.
              </p>
            </section>

            {/* Official Schedules & Fines */}
            <section className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
                CPCB FY 2026-27 Statutory Quota & Fine Schedule
              </h3>

              <div className="space-y-3 font-sans text-xs">
                {cpcbSchedules.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-display font-bold text-sm text-zinc-900 dark:text-white">{item.schedule}</span>
                      <span className="font-mono text-xs font-bold text-rose-500">{item.penalty}</span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                      <strong>Mandated Target:</strong> {item.mandate}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Navigation Footer */}
            <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/docs/agents/agent-05"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-zinc-900 dark:text-white font-display text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 05 (Fraud Sentinel)</span>
              </Link>

              <Link
                href="/docs/blockchain"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>Next: Polygon Amoy Ledger</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
