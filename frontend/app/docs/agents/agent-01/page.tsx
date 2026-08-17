"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Eye,
  Scan,
  Sparkles,
  FileCode2,
} from "lucide-react";

export default function Agent01DocsPage() {
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
            <span className="text-zinc-500">6-Agent Core</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-emerald-500 font-bold">Agent 01: Optical Quality Vision</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <Cpu className="w-5 h-5" />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Agent 01: Optical Quality Vision
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed mt-2">
            Multi-Modal Computer Vision for autonomous scrap grading, pixel-level surface contamination heatmaps, and ISO 9001 quality certification.
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
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SPECIFICATION & OBJECTIVES</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                How Agent 01 Replaces Manual Eye-Ball Inspection
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                In secondary metal and plastic recycling, adulteration (e.g., iron rivets in aluminum scrap, moisture in cardboard, PVC caps in PET flakes) is the primary cause of furnace damage and dispute. <strong>Agent 01</strong> executes real-time semantic segmentation on specimen photos to generate certified quality grades with zero human bias.
              </p>

              {/* Visual Pipeline Flow Diagram */}
              <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4 bg-zinc-900/40 text-white">
                <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                  VISUAL INGESTION & QUALITY PIPELINE
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-zinc-400 text-[10px] block">Stage 1</span>
                    <span className="text-emerald-400 font-bold">1. Capture & Upload</span>
                    <p className="text-[11px] text-zinc-400 font-sans">Mobile camera photo sent to backend or edge inference.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-zinc-400 text-[10px] block">Stage 2</span>
                    <span className="text-emerald-400 font-bold">2. Contour Masking</span>
                    <p className="text-[11px] text-zinc-400 font-sans">Pixel-level semantic segmentation of impurities.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-zinc-400 text-[10px] block">Stage 3</span>
                    <span className="text-orange-400 font-bold">3. Heatmap Scoring</span>
                    <p className="text-[11px] text-zinc-400 font-sans">Contamination percentage calculated vs ISO 9001 specs.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-zinc-400 text-[10px] block">Stage 4</span>
                    <span className="text-emerald-400 font-bold">4. IPFS Pinning</span>
                    <p className="text-[11px] text-zinc-400 font-sans">Image hash pinned to Pinata IPFS as evidence.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Mathematical Scoring Formula */}
            <section className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
                Mathematical Purity Function
              </h3>
              
              <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The certified quality grade is calculated deterministically based on three primary computer vision outputs:
                </p>

                <div className="p-4 rounded-2xl bg-zinc-950 text-emerald-400 font-mono text-xs space-y-2">
                  <span className="text-zinc-500 text-[10px] block uppercase font-bold">Formula:</span>
                  <code className="text-emerald-400 block select-all">
                    Quality_Score = (100 - Contamination_Pct) × Purity_Multiplier × Morphology_Weight
                  </code>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
                    <span className="text-zinc-500 text-[10px] block">Grade A+ (Premium)</span>
                    <span className="font-bold text-emerald-500 text-sm">Contamination &lt; 3.0%</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
                    <span className="text-zinc-500 text-[10px] block">Grade A (Standard)</span>
                    <span className="font-bold text-emerald-500 text-sm">Contamination 3.0% - 8.0%</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
                    <span className="text-zinc-500 text-[10px] block">Grade B (Remelt Required)</span>
                    <span className="font-bold text-orange-500 text-sm">Contamination 8.0% - 15.0%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Navigation Footer */}
            <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/docs/quickstart"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-zinc-900 dark:text-white font-display text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quickstart Guide</span>
              </Link>

              <Link
                href="/docs/agents/agent-02"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>Next: Agent 02 (EPA Carbon Math)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
