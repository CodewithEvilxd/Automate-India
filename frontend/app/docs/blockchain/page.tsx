"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  Lock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Database,
  Layers,
  Fingerprint,
} from "lucide-react";

export default function BlockchainDocsPage() {
  return (
    <div className="min-h-screen bg-[#FBFBFC] dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-3">
            <Link href="/docs" className="hover:text-emerald-500 transition-colors">
              Docs
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-500">Cryptographic Protocol</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-emerald-500 font-bold">Polygon Amoy Smart Contracts</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Polygon Amoy Smart Contracts
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed mt-2">
            Decentralized auditability, IPFS visual proof anchoring, and smart contract ownership transfer protocol on Polygon Amoy (Chain ID: 80002).
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
            {/* Contract Info Card */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ON-CHAIN SPECIFICATION</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Live Deployment & Contract Topology
              </h2>

              <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 space-y-1">
                    <span className="text-zinc-500 text-[10px] uppercase block">Contract Address</span>
                    <code className="text-emerald-600 dark:text-emerald-400 font-bold text-xs select-all block break-all">
                      0x3d0bc12948a7192837bc910283748293bc910293
                    </code>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 space-y-1">
                    <span className="text-zinc-500 text-[10px] uppercase block">Network Specs</span>
                    <span className="text-zinc-900 dark:text-white font-bold text-xs block">
                      Polygon Amoy Testnet (Chain ID: 80002)
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 text-zinc-300 font-mono text-xs overflow-x-auto space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Key Solidity Function:</span>
                  <code className="text-emerald-400 block">
                    function verifyAndTransfer(string calldata materialId, address buyer) external returns (bytes32 txHash)
                  </code>
                </div>
              </div>
            </section>

            {/* Navigation Footer */}
            <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/docs/agents/agent-06"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-zinc-900 dark:text-white font-display text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 06 (CPCB EPR)</span>
              </Link>

              <Link
                href="/docs/api"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>Next: REST API Reference</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
