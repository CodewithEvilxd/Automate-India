"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  NotebookSpiralBinding,
  PaperclipElement,
  WashiTapeCenter,
  WashiTapeCorner,
  DoodleUnderline,
  DoodleStar,
  StampBadge,
  DoodleCircle,
} from "@/components/SketchElements";
import {
  Lock,
  ArrowLeft,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function BlockchainDocsPage() {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("0x3d0bc12948a7192837bc910283748293bc910293");
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        <WashiTapeCenter color="kraft" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-2 border-red-300/60 dark:border-red-500/30 pl-4 sm:pl-8 ml-1 sm:ml-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Manual</span>
            </Link>
            <StampBadge label="POLYGON AMOY 80002" variant="emerald" />
            <StampBadge label="SOLIDITY v0.8.20" variant="amber" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Polygon Amoy <span className="highlight-yellow px-2">Smart Contracts</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Decentralized ownership transfer, IPFS visual inspection pinning, and immutable EPR credit minting on the Polygon Amoy testnet.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 relative">
        <NotebookSpiralBinding count={12} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pl-4 sm:pl-8">
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          <main className="lg:col-span-9 space-y-12 border-l-2 border-red-300/50 dark:border-red-500/20 pl-4 sm:pl-6">
            
            {/* Overview Section */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  Contract Deployment Info
                </span>
                <StampBadge label="GASLESS SPONSORSHIP" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Verified Contract: <DoodleCircle className="text-emerald-500">Polygon Amoy Testnet</DoodleCircle>
              </h2>

              {/* Address Copy Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-sketch text-xs text-zinc-500 block uppercase font-bold">Contract Address (ERC-721 / EPR Ledger):</span>
                  <span className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-300 break-all">
                    0x3d0bc12948a7192837bc910283748293bc910293
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-zinc-950 font-sketch text-xs font-bold border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-1 shrink-0"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? "Copied Address!" : "Copy Address"}</span>
                </button>
              </div>

              {/* Solidity Struct Card */}
              <div className="p-5 rounded-2xl bg-[#FCFBF7] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 font-sketch text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-1 overflow-x-auto">
                <div className="text-zinc-500">// Solidity Struct Definition</div>
                <div><span className="text-purple-700 dark:text-purple-400 font-bold">struct</span> <span className="text-amber-800 dark:text-amber-300 font-bold">MaterialLot</span> &#123;</div>
                <div className="pl-4">uint256 lotId;</div>
                <div className="pl-4">address seller; <span className="text-zinc-500">// Kabadiwala</span></div>
                <div className="pl-4">address buyer; <span className="text-zinc-500">// Smelter</span></div>
                <div className="pl-4">uint256 massKg;</div>
                <div className="pl-4">uint256 purityBps;</div>
                <div className="pl-4">uint256 carbonOffsetKg;</div>
                <div className="pl-4">string ipfsImageProof;</div>
                <div>&#125;</div>
              </div>
            </section>

            {/* Navigation */}
            <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/docs/agents/agent-06"
                className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 06 CPCB EPR Shield</span>
              </Link>
              <Link
                href="/docs/api"
                className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Next: Interactive REST API</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
