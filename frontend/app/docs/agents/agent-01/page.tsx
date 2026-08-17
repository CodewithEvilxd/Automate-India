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
  Binary,
  Microscope,
  Zap,
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
            <StampBadge label="AGENT 01 DEEP SPEC" variant="emerald" />
            <StampBadge label="YOLOv8 + ViT SEGMENTATION" variant="amber" />
            <StampBadge label="ISO 9001:2015 STANDARD" variant="sky" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Agent 01: <span className="highlight-emerald px-2">Optical Quality Vision Engine</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Multi-Modal Computer Vision and Deep Feature Extraction for autonomous scrap identification, pixel-level surface contamination heatmaps, and deterministic ISO 9001 physical purity certification.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 relative">
        <NotebookSpiralBinding count={18} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pl-4 sm:pl-8">
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          <main className="lg:col-span-9 space-y-12 border-l-2 border-red-300/50 dark:border-red-500/20 pl-4 sm:pl-6">
            
            {/* SECTION 1: Problem & Vision Hypothesis */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  Chapter 1.1 // The Subjectivity of Physical Inspection
                </span>
                <StampBadge label="SUB-100MS INFERENCE" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Why Human Eyeball Grading <DoodleCircle className="text-rose-500">Destroys Value</DoodleCircle>
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                <p>
                  In traditional scrap yards from Delhi's Mayapuri to Mumbai's Dharavi, scrap quality evaluation is performed entirely by naked-eye guesswork. Aggregators deliberately exploit this visual ambiguity by claiming that clean aluminum alloy extrusions (such as 6063 architectural sections) are "contaminated with 30% zinc, iron screws, or severe oxidation."
                </p>
                <p>
                  This enables middlemen to deduct <strong>25% to 45% tare penalties</strong> from the price paid to grassroots collectors. When the material is later sold to industrial smelters, the aggregator claims the exact opposite—declaring it to be "99% pure Grade A+ alloy" to capture an exorbitant arbitrage spread.
                </p>
                <p>
                  <strong>Agent 01 eliminates this human conflict entirely.</strong> By converting uncalibrated mobile smartphone photos and yard CCTV streams into an immutable, mathematically verifiable visual proof hash, quality becomes an objective physical property rather than a subjective negotiation point.
                </p>
              </div>
            </section>

            {/* SECTION 2: 4-Stage Deep Neural Pipeline */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCenter color="pink" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-rose-700 dark:text-rose-400 tracking-wider">
                  Chapter 1.2 // Multi-Modal Deep Neural Topology
                </span>
                <StampBadge label="4-STAGE SEGMENTATION" variant="amber" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                The 4-Stage Autonomous Vision Pipeline
              </h2>

              <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Agent 01 does not rely on simple classification heuristics. It executes a multi-layer deep feature extraction pipeline designed specifically for chaotic, unsegmented scrap environments:
              </p>

              {/* 4 Granular Processing Cards */}
              <div className="space-y-4">
                
                {/* Stage 1 */}
                <div className="p-5 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2">
                  <div className="flex items-center justify-between font-sketch">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      Stage 1: Semantic Foreground Isolation & Otsu Contour Thresholding
                    </h3>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">YOLOv8x-Seg</span>
                  </div>
                  <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Separates foreground scrap piles from concrete ground, mud, rubber tires, weighing scale pans, and human hands. Generates a polygon binary mask M(x,y) with sub-pixel boundary edge refinement.
                  </p>
                </div>

                {/* Stage 2 */}
                <div className="p-5 rounded-2xl bg-[#F0FDF4] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2">
                  <div className="flex items-center justify-between font-sketch">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      Stage 2: Vision Transformer (ViT-B/16) Alloy Feature Extraction
                    </h3>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">768-Dim Embeddings</span>
                  </div>
                  <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Passes isolated scrap patches into a self-attention transformer network fine-tuned on 140,000 industrial scrap specimens (including extruded 6063, cast ADC12, berry copper wire, HDPE blow-molded bottles, and PCB circuit boards). Captures microscopic specular reflectivity and ductile tear textures.
                  </p>
                </div>

                {/* Stage 3 */}
                <div className="p-5 rounded-2xl bg-[#EFF6FF] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2">
                  <div className="flex items-center justify-between font-sketch">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      Stage 3: CIELAB / HSV Color-Space Oxidation & Foreign Matter Profiling
                    </h3>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">ΔE* Colorimetry</span>
                  </div>
                  <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Computes Euclidean distance across CIE $L^*a^*b^*$ color space to identify iron rust ($Fe_2O_3$), copper patina ($Cu_2CO_3(OH)_2$), grease films, adhesive label residue, and dirt crusts. Calculates the exact foreign contamination surface ratio:
                  </p>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-300 dark:border-zinc-700 font-mono text-xs text-emerald-800 dark:text-emerald-300">
                    Contamination_Ratio = (Σ_pixels[ΔE &gt; Threshold]) / (Total_Scrap_Pixels)
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="p-5 rounded-2xl bg-[#FDF2F8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2">
                  <div className="flex items-center justify-between font-sketch">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      Stage 4: Deterministic ISO 9001:2015 Grade Mapping & Pinata IPFS Hashing
                    </h3>
                    <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300">ERC-721 Proof</span>
                  </div>
                  <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Maps the composite purity score $\rho \in [0.00, 1.00]$ to standard industrial scrap tiers and generates an immutable IPFS SHA-256 content identifier pinned permanently to decentralized storage.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: Standard ISO 9001 Grading Matrix Table */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] space-y-6">
              <WashiTapeCenter color="yellow" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                  Chapter 1.3 // ISO 9001 Scrap Quality Matrix
                </span>
                <StampBadge label="STATUTORY RECYCLER TIERS" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Standard Quality Classification Table
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sketch text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-zinc-950 dark:border-white/20 bg-zinc-100 dark:bg-zinc-800">
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Grade</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Purity Threshold</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Allowable Foreign Matter</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">MCX Price Factor</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Permitted Industrial Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-b border-zinc-300 dark:border-zinc-800 font-sans text-xs text-zinc-800 dark:text-zinc-200">
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-emerald-600">Grade A+</td>
                      <td className="p-3 font-mono font-bold">≥ 98.0%</td>
                      <td className="p-3">&lt; 2.0% (Zero oil/grease)</td>
                      <td className="p-3 font-mono font-bold text-emerald-700">100% of Spot</td>
                      <td className="p-3">Direct secondary induction smelting; extrusion billet forging</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-emerald-500">Grade A</td>
                      <td className="p-3 font-mono font-bold">92.0% - 97.9%</td>
                      <td className="p-3">2.0% - 8.0% (Minor surface dust)</td>
                      <td className="p-3 font-mono font-bold text-amber-700">94% of Spot</td>
                      <td className="p-3">Automotive casting (ADC12), structural alloy ingots</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-amber-600">Grade B</td>
                      <td className="p-3 font-mono font-bold">85.0% - 91.9%</td>
                      <td className="p-3">8.0% - 15.0% (Paint/label residue)</td>
                      <td className="p-3 font-mono font-bold text-amber-600">85% of Spot</td>
                      <td className="p-3">Secondary de-oxidizer blocks, low-spec re-rolling mills</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-rose-600">Reject</td>
                      <td className="p-3 font-mono font-bold">&lt; 85.0%</td>
                      <td className="p-3">&gt; 15.0% (Excess moisture/soil)</td>
                      <td className="p-3 font-mono font-bold text-rose-600">Settlement Blocked</td>
                      <td className="p-3">Requires mandatory pre-treatment, washing, or magnetic shredding</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: Live Payload & JSON Output Schema */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-4">
              <WashiTapeCenter color="kraft" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  Chapter 1.4 // Agent 01 REST API Response Schema
                </span>
                <span className="font-mono text-xs font-bold text-zinc-500">POST /api/analyze</span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 font-sketch text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 shadow-[3px_4px_0px_rgba(0,0,0,0.85)] space-y-1 overflow-x-auto">
                <div className="text-zinc-500">// 200 OK — Immutable Visual Inspection Certificate</div>
                <div>&#123;</div>
                <div className="pl-4">"agent": <span className="text-emerald-700 dark:text-emerald-300">"AGENT_01_OPTICAL_VISION"</span>,</div>
                <div className="pl-4">"status": <span className="text-emerald-700 dark:text-emerald-300 font-bold">"SUCCESS"</span>,</div>
                <div className="pl-4">"inferenceLatencyMs": <span className="text-amber-700 dark:text-amber-300 font-bold">78.4</span>,</div>
                <div className="pl-4">"analysis": &#123;</div>
                <div className="pl-8">"materialIdentified": <span className="text-emerald-700 dark:text-emerald-300">"ALUMINUM_6063_EXTRUSION"</span>,</div>
                <div className="pl-8">"confidence": <span className="text-amber-700 dark:text-amber-300 font-bold">0.9942</span>,</div>
                <div className="pl-8">"purityScore": <span className="text-amber-700 dark:text-amber-300 font-bold">0.9850</span>,</div>
                <div className="pl-8">"qualityGrade": <span className="text-emerald-700 dark:text-emerald-300 font-bold">"GRADE_A_PLUS"</span>,</div>
                <div className="pl-8">"surfaceContamination": &#123;</div>
                <div className="pl-12">"moisturePercentage": <span className="text-zinc-600 dark:text-zinc-400">0.4</span>,</div>
                <div className="pl-12">"oxidationRustPercentage": <span className="text-zinc-600 dark:text-zinc-400">0.8</span>,</div>
                <div className="pl-12">"nonMetallicDebrisPercentage": <span className="text-zinc-600 dark:text-zinc-400">0.3</span></div>
                <div className="pl-8">&#125;,</div>
                <div className="pl-8">"ipfsProofHash": <span className="text-purple-700 dark:text-purple-300">"QmZtmD2qtQgKc5tZ4mS6tP2H1oB7eK9fP1uN2b3m7y8w9"</span>,</div>
                <div className="pl-8">"boundingPolygon": <span className="text-zinc-500">[[124, 88], [412, 92], [420, 380], [118, 372]]</span></div>
                <div className="pl-4">&#125;</div>
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
                <span>Next: Agent 02 EPA WARM Carbon Math</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
