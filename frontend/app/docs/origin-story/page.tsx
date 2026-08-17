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
  DoodleDatabase,
  DoodleCloud,
  DoodleLock,
  DoodleChip,
  DoodleShield,
  DoodleScale,
  StampBadge,
  DoodleCircle,
} from "@/components/SketchElements";
import {
  BookOpen,
  Heart,
  Compass,
  Lightbulb,
  Target,
  PenTool,
  ChevronRight,
  ArrowLeft,
  Users,
  Mic,
  Eye,
  Scale as ScaleIcon,
  ShieldCheck,
  Flame,
} from "lucide-react";

export default function OriginStoryPage() {
  return (
    <div className="min-h-screen notebook-ruled text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      <div className="notebook-doc-scope flex-1 flex flex-col">

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
            <StampBadge label="DESIGN THINKING MANIFESTO" variant="rose" />
            <StampBadge label="FIELD CASE STUDY" variant="amber" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Origin Story & <span className="highlight-yellow px-2">Empathy Map</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            How a visit to India’s unorganized scrap mandis led to the birth of CircularChain: Bridging the empathy gap between 5 Million informal waste collectors and institutional global carbon markets.
          </p>
        </div>
      </div>

      {/* Main Content Layout with Notebook Spiral */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 relative">
        <NotebookSpiralBinding count={12} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pl-4 sm:pl-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12 border-l-2 border-red-300/50 dark:border-red-500/20 pl-4 sm:pl-6">
            
            {/* SECTION 1: The Spark - How Did I Get This Idea? */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] dark:shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                    Chapter 01 // The Origin Spark
                  </span>
                </div>
                <StampBadge label="MAYAPURI & DHARAVI FIELDWORK" variant="amber" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                How Did I Get This Idea? <span className="highlight-yellow">The Mayapuri Epiphany</span>
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                <p>
                  The idea for CircularChain was not born inside an air-conditioned conference room or an enterprise boardroom. It was born on a sweltering afternoon in <strong>Mayapuri (Asia’s largest industrial scrap market in Delhi)</strong> and the winding recycling alleys of <strong>Dharavi (Mumbai)</strong>.
                </p>
                <p>
                  Standing inside a cramped scrap depot, I watched a 52-year-old informal scrap collector named <em>Rameshji</em> bring in 140 kilograms of carefully sorted copper motor windings and aluminum sheet scrap on a wooden handcart. He had spent four days collecting and segregating this material with bare hands.
                </p>
                <p>
                  When it came time to settle, the depot middleman placed the copper on a rusty mechanical beam scale, glanced at a handwritten notebook, and announced: <em>"Bhaiya, rate gir gaya hai. Aur 20% moisture aur kachra kaat ke dunga."</em> (The market dropped, and I will deduct 20% for moisture and dust).
                </p>
                <p>
                  Rameshji had no internet smartphone, no access to the Multi Commodity Exchange (MCX) live ticker, and no mathematical tool to verify whether the deduction was fair. He was forced to accept ₹480/kg for Berry Copper that was trading at ₹820/kg on the spot market. In less than 30 seconds, <strong>over 40% of his weekly earnings were wiped out by informational asymmetry</strong>.
                </p>
              </div>

              {/* Callout Quote Box */}
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2">
                <span className="font-sketch text-xs font-bold text-rose-600 dark:text-rose-400 block uppercase">
                  The Irony of Modern Climate Tech
                </span>
                <p className="font-sketch text-base sm:text-lg text-zinc-900 dark:text-white leading-snug">
                  "Fortune 500 corporations spend millions of dollars buying fraudulent paper PDF carbon credits from greenwashing brokers, while the real human beings actually sweating in 45°C heat to prevent 10 tons of toxic bauxite mining get robbed on manual weigh scales."
                </p>
              </div>
            </section>

            {/* SECTION 2: Empathy Mapping - The 5 Million Forgotten Recyclers */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCenter color="mint" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span className="font-sketch text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                    Chapter 02 // Human-Centered Empathy Map
                  </span>
                </div>
                <StampBadge label="5 MILLION WORKERS" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                Empathy Mapping: <span className="highlight-emerald">Understanding the Informal Sector</span>
              </h2>

              <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Before writing a single line of Solidity smart contract or PyTorch code, we spent four months mapping the cognitive, economic, and emotional reality of grassroots waste pickers, local kabadiwalas, and authorized smelting managers.
              </p>

              {/* 4-Quadrant Empathy Map Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                
                {/* Quadrant 1: SAYS */}
                <div className="p-5 rounded-2xl bg-[#FEFCE8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2">
                  <span className="font-sketch text-xs font-bold text-amber-800 dark:text-amber-300 uppercase block">
                    1. WHAT THEY SAY (Explicit Verbal Needs)
                  </span>
                  <ul className="space-y-1.5 font-sketch text-sm text-zinc-800 dark:text-zinc-200">
                    <li>• "Hume typing nahi aati, English me app samajh nahi aati."</li>
                    <li>• "Seth bolta hai MCX gir gaya, hum kaise check karein?"</li>
                    <li>• "Hume turant cash ya UPI chahiye, 30-din credit term nahi chalega."</li>
                  </ul>
                </div>

                {/* Quadrant 2: THINKS */}
                <div className="p-5 rounded-2xl bg-[#EFF6FF] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2">
                  <span className="font-sketch text-xs font-bold text-sky-800 dark:text-sky-300 uppercase block">
                    2. WHAT THEY THINK (Internal Anxieties)
                  </span>
                  <ul className="space-y-1.5 font-sketch text-sm text-zinc-800 dark:text-zinc-200">
                    <li>• "Agar phone me galat button dabaya toh mere paise fas jayenge."</li>
                    <li>• "Badi companies hume sirf kachra uthane wala samajhti hain, insaan nahi."</li>
                    <li>• "Police aur local inspectors bina paper ke maal zabt kar lete hain."</li>
                  </ul>
                </div>

                {/* Quadrant 3: DOES */}
                <div className="p-5 rounded-2xl bg-[#F0FDF4] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2">
                  <span className="font-sketch text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase block">
                    3. WHAT THEY DO (Observed Physical Actions)
                  </span>
                  <ul className="space-y-1.5 font-sketch text-sm text-zinc-800 dark:text-zinc-200">
                    <li>• Segregate metal alloys using hand magnets, spark testing, and visual scratch marks.</li>
                    <li>• Negotiate through informal phone calls and audio voice WhatsApp notes in Hindi/Tamil.</li>
                    <li>• Rely on physical diaries and cash pouches with zero digital paper trail.</li>
                  </ul>
                </div>

                {/* Quadrant 4: FEELS */}
                <div className="p-5 rounded-2xl bg-[#FDF2F8] dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/10 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] space-y-2">
                  <span className="font-sketch text-xs font-bold text-rose-800 dark:text-rose-300 uppercase block">
                    4. WHAT THEY FEEL (Emotional States)
                  </span>
                  <ul className="space-y-1.5 font-sketch text-sm text-zinc-800 dark:text-zinc-200">
                    <li>• Dignity deficit: Treated as informal outcasts despite saving the planet.</li>
                    <li>• Constant financial insecurity from arbitrary middleman cuts.</li>
                    <li>• Pride in being self-employed masters of material sorting chemistry.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 3: Define the Problem - The 4 Structural Failure Pillars */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEF9C3]/40 dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#F59E0B] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                    Chapter 03 // Define the Core Problem
                  </span>
                </div>
                <StampBadge label="PROBLEM FORMULATION" variant="amber" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                Defining the Problem: <span className="highlight-yellow">The Triple Breakdown</span>
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                <p>
                  When we synthesized our fieldwork into a formal engineering problem statement, we identified three interconnected systemic breakdowns:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sketch text-sm pt-2">
                  <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                    <strong className="text-base text-rose-600 dark:text-rose-400 block">Pillar 1: The UI Barrier</strong>
                    <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 mt-1">
                      Traditional enterprise ERPs (SAP, Oracle) require English literacy, complex keyboards, and desktop laptops that informal recyclers can never use.
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                    <strong className="text-base text-amber-600 dark:text-amber-400 block">Pillar 2: Verification Void</strong>
                    <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 mt-1">
                      Without computer vision pixel contouring, scrap quality and contamination can only be judged subjectively, enabling rampant fraud.
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                    <strong className="text-base text-emerald-600 dark:text-emerald-400 block">Pillar 3: The Greenwash Trap</strong>
                    <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 mt-1">
                      Corporations trade unverifiable PDF certificates because there is no cryptographic bridge connecting physical weighbridge telemetry to smart contracts.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: Ideate & Idea Generation - The 3 Iteration Cycles */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCorner color="kraft" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-emerald-600" />
                  <span className="font-sketch text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                    Chapter 04 // Ideation & Architecture Evolution
                  </span>
                </div>
                <StampBadge label="3 ITERATION CYCLES" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                Ideate: How the Protocol <span className="highlight-emerald">Evolved Through Failure</span>
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <p>
                  CircularChain was not built in a single weekend. It survived three major architectural pivots before arriving at the current 6-Agent Autonomous protocol:
                </p>

                {/* 3 Iteration Boxes */}
                <div className="space-y-4 pt-2">
                  
                  {/* Iteration 1 */}
                  <div className="p-5 rounded-2xl bg-[#FEE2E2]/60 dark:bg-rose-950/20 border-2 border-rose-400 dark:border-rose-500/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-sketch text-sm font-bold text-rose-800 dark:text-rose-300 uppercase">
                        Iteration 1: The B2B Web Marketplace (FAILED ✗)
                      </span>
                      <span className="font-mono text-[10px] text-rose-600 font-bold">Q1 2025</span>
                    </div>
                    <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300">
                      <strong>Hypothesis:</strong> Build a Next.js e-commerce portal where aggregators list scrap with price tables.<br />
                      <strong>Why It Failed:</strong> Informal collectors never logged into web dashboards. Typing material specifications was a non-starter.
                    </p>
                  </div>

                  {/* Iteration 2 */}
                  <div className="p-5 rounded-2xl bg-[#FEF3C7]/60 dark:bg-amber-950/20 border-2 border-amber-400 dark:border-amber-500/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-sketch text-sm font-bold text-amber-800 dark:text-amber-300 uppercase">
                        Iteration 2: Form-Based Android Mobile App (FAILED ✗)
                      </span>
                      <span className="font-mono text-[10px] text-amber-600 font-bold">Q3 2025</span>
                    </div>
                    <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300">
                      <strong>Hypothesis:</strong> Give collectors an Android app with 15 dropdown fields for grade, tare weight, and moisture.<br />
                      <strong>Why It Failed:</strong> Aggregators abandoned the app within 2 minutes. They complained: <em>"It takes too long to fill forms while 5 trucks are waiting."</em>
                    </p>
                  </div>

                  {/* Iteration 3 */}
                  <div className="p-5 rounded-2xl bg-[#DCFCE7]/70 dark:bg-emerald-950/20 border-2 border-emerald-500 space-y-1.5 shadow-[3px_3px_0px_#10B981]">
                    <div className="flex items-center justify-between">
                      <span className="font-sketch text-sm font-bold text-emerald-900 dark:text-emerald-300 uppercase">
                        Iteration 3: 6-Agent Autonomous Protocol (BREAKTHROUGH ✓)
                      </span>
                      <span className="font-mono text-[10px] text-emerald-600 font-bold">Q1 2026</span>
                    </div>
                    <p className="font-sans text-xs text-zinc-800 dark:text-zinc-200">
                      <strong>The Breakthrough:</strong> Zero text typing. The collector speaks naturally in Hindi/Tamil (Agent 04) and snaps a 2-second photo of the scrap (Agent 01). Behind the scenes, Agent 02 computes EPA carbon math, Agent 03 pulls MCX prices, Agent 05 blocks fraud, and Agent 06 mints a Polygon Amoy smart contract atomically!
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: The Project Concept & Architectural Vision */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-emerald-600" />
                  <span className="font-sketch text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                    Chapter 05 // Project Concept & Core Vision
                  </span>
                </div>
                <StampBadge label="CIRCULARITY EQUALITY" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                Project Concept: <span className="highlight-yellow">Waste as a Cryptographic Asset</span>
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <p>
                  CircularChain fundamentally redefines scrap materials not as dirty trash, but as <strong>high-value, verifiable, tradeable circular assets</strong> with immutable environmental pedigree:
                </p>
                <ul className="space-y-2 font-sketch text-sm text-zinc-800 dark:text-zinc-200 pl-2">
                  <li>• <strong className="text-emerald-700 dark:text-emerald-400">Social Empowerment:</strong> Informal kabadiwalas gain 100% pricing transparency, UPI escrow security, and institutional recognition.</li>
                  <li>• <strong className="text-amber-700 dark:text-amber-400">Deterministic Carbon Science:</strong> Scope 3 GHG avoidance calculated via EPA WARM v15 formulas with zero stochastic LLM hallucination.</li>
                  <li>• <strong className="text-sky-700 dark:text-sky-400">CPCB Statutory Shield:</strong> Brand owners and OEMs fulfill mandatory recycling quotas without exposure to ₹25,000/MT fines.</li>
                  <li>• <strong className="text-purple-700 dark:text-purple-400">Cryptographic Provenance:</strong> Every batch is pinned to IPFS and settled on Polygon Amoy (80002).</li>
                </ul>
              </div>

              {/* Navigation to Next Chapter */}
              <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
                <Link
                  href="/docs"
                  className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Executive Summary</span>
                </Link>
                <Link
                  href="/docs/problem-statement"
                  className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Next: Problem Statement Deep-Dive</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  </div>
  );
}
