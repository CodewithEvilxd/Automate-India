"use client";

import React from "react";
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
  DoodleChip,
  DoodleShield,
  StampBadge,
  DoodleCircle,
} from "@/components/SketchElements";
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
  FileCode2,
} from "lucide-react";

export default function Agent01DocsPage() {
  return (
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        <WashiTapeCenter color="mint" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-2 border-red-300/60 dark:border-red-500/30 pl-4 sm:pl-8 ml-1 sm:ml-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Manual</span>
            </Link>
            <StampBadge label="AGENT 01 SPECIFICATION" variant="emerald" />
            <StampBadge label="ISO 9001 PURITY MASK" variant="amber" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Agent 01: <span className="highlight-emerald px-2">Optical Quality Vision</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Multi-Modal Computer Vision for autonomous scrap grading, pixel-level surface contamination heatmaps, and ISO 9001 quality certification.
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
                  Vision Pipeline Architecture
                </span>
                <StampBadge label="REAL-TIME INFERENCE" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Deterministic Surface Inspection: <DoodleCircle className="text-emerald-500">Zero Human Bias</DoodleCircle>
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                <p>
                  Agent 01 ingests high-resolution edge camera frames or smartphone uploads directly from scrap sorting yards. It executes a multi-stage convolutional and vision-transformer segmentation pipeline that isolates material contours, calculates oxidation levels, and identifies non-metallic foreign matter (such as PVC labels, dirt, grease, and rubber inserts).
                </p>
              </div>

              {/* 3 Core Processing Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sketch text-sm pt-2">
                <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] space-y-1">
                  <span className="text-xs font-bold text-emerald-600 uppercase block">Phase 1</span>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Contour Masking</h4>
                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-300">
                    Otsu adaptive thresholding and watershed segmentation to extract true scrap boundary from background yard concrete.
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] space-y-1">
                  <span className="text-xs font-bold text-amber-600 uppercase block">Phase 2</span>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Oxidation Heatmap</h4>
                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-300">
                    HSV/LAB color-space histogram analysis quantifying rust, surface tarnish, and oil contamination percentage.
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] space-y-1">
                  <span className="text-xs font-bold text-sky-600 uppercase block">Phase 3</span>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Grade Assignment</h4>
                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-300">
                    Maps computed purity ($\rho \in [0, 1]$) to ISO 9001 scrap grades (Grade A+: $\ge 98\%$, Grade A: $\ge 92\%$, Grade B: $\ge 85\%$).
                  </p>
                </div>
              </div>
            </section>

            {/* Code Output Card */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-4">
              <WashiTapeCenter color="mint" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                  Standard JSON Vision Output
                </span>
                <span className="font-mono text-xs text-zinc-500 font-bold">SCHEMA v2.4</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 font-sketch text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 shadow-[3px_4px_0px_rgba(0,0,0,0.85)] space-y-1 overflow-x-auto">
                <div className="text-zinc-500">// Output generated by Agent 01 Vision Kernel</div>
                <div>&#123;</div>
                <div className="pl-4">"materialType": <span className="text-emerald-700 dark:text-emerald-300">"ALUMINUM_6063"</span>,</div>
                <div className="pl-4">"purityScore": <span className="text-amber-700 dark:text-amber-300 font-bold">0.985</span>, <span className="text-zinc-500">// 98.5% Pure</span></div>
                <div className="pl-4">"qualityGrade": <span className="text-emerald-700 dark:text-emerald-300 font-bold">"GRADE_A_PLUS"</span>,</div>
                <div className="pl-4">"contaminationPercentage": <span className="text-rose-600 font-bold">1.5</span>,</div>
                <div className="pl-4">"ipfsHash": <span className="text-purple-700 dark:text-purple-300">"QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"</span></div>
                <div>&#125;</div>
              </div>
            </section>

            {/* Navigation */}
            <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/docs/quickstart"
                className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quickstart Guide</span>
              </Link>
              <Link
                href="/docs/agents/agent-02"
                className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Next: Agent 02 EPA Carbon Math</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
