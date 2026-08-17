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
  StampBadge,
  DoodleCircle,
} from "@/components/SketchElements";
import {
  Mic,
  ArrowLeft,
  ChevronRight,
  Globe,
  Radio,
  Volume2,
  Cpu,
  Languages,
} from "lucide-react";

export default function Agent04DocsPage() {
  return (
    <div className="min-h-screen notebook-ruled notebook-doc-scope text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sketch selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        <WashiTapeCenter color="pink" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-2 border-red-300/60 dark:border-red-500/30 pl-4 sm:pl-8 ml-1 sm:ml-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Manual</span>
            </Link>
            <StampBadge label="AGENT 04 DEEP SPEC" variant="rose" />
            <StampBadge label="5 INDIC REGIONAL LANGUAGES" variant="emerald" />
            <StampBadge label="MANDI SLANG NER" variant="amber" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Agent 04: <span className="highlight-yellow px-2">Indic Voice NLP Bridge</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Multi-Lingual Speech Recognition and Named Entity Recognition (NER) fine-tuned on scrap mandi vernacular, transforming raw voice notes in Hindi, Tamil, Telugu, Marathi, and Bengali into structured listings with zero typing.
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
            
            {/* SECTION 1: The Literacy & Typing Barrier */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  Chapter 4.1 // The Digital Divide in Informal Waste
                </span>
                <StampBadge label="ZERO TYPING UX" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Breaking the English Form & Literacy Barrier
              </h2>

              <div className="space-y-4 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                <p>
                  Over 78% of India's 5 Million informal waste collectors and local kabadiwalas have limited formal English literacy. When enterprise ERPs and web marketplaces demand that users type dropdown categories (e.g. <em>"Non-Ferrous &gt; Heavy Copper &gt; Berry Scrap"</em>), the application is abandoned within seconds.
                </p>
                <p>
                  However, these exact collectors possess extraordinary verbal domain mastery. They negotiate prices rapidly in their mother tongue using traditional mandi trade terms that no generic Silicon Valley voice assistant understands.
                </p>
                <p>
                  <strong>Agent 04 bridges this linguistic divide.</strong> It allows anyone to simply hold a single button on their phone, speak naturally in their local dialect, and have their scrap parsed, priced, and listed automatically.
                </p>
              </div>
            </section>

            {/* SECTION 2: Mandi Scrap Vernacular Lexicon */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] space-y-6">
              <WashiTapeCenter color="mint" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                  Chapter 4.2 // Vernacular Slang & Dialect Lexicon
                </span>
                <StampBadge label="14,000+ MANDI TERMS" variant="amber" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Supported Regional Mandi Terminology
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sketch text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-zinc-950 dark:border-white/20 bg-zinc-100 dark:bg-zinc-800">
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Language</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Colloquial Mandi Slang</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Mapped Technical Standard</th>
                      <th className="p-3 font-bold text-zinc-900 dark:text-white">Base Purity Mapping</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-b border-zinc-300 dark:border-zinc-800 font-sans text-xs text-zinc-800 dark:text-zinc-200">
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-rose-600">Hindi</td>
                      <td className="p-3 font-mono font-bold">"Laal Tamba" / "Berry Wire"</td>
                      <td className="p-3">IS 407 Heavy Electrolytic Copper</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">99.0% Pure</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-rose-600">Hindi / Punjabi</td>
                      <td className="p-3 font-mono font-bold">"Silky Aluminum Section"</td>
                      <td className="p-3">IS 733 Extruded 6063 Architectural Alloy</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">98.5% Pure</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-sky-600">Tamil</td>
                      <td className="p-3 font-mono font-bold">"Pithalai Pathiram" (பித்தளை)</td>
                      <td className="p-3">IS 1264 Honey Brass Cast Utensils</td>
                      <td className="p-3 font-mono font-bold text-sky-600">94.0% Pure</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-amber-600">Marathi</td>
                      <td className="p-3 font-mono font-bold">"Pikela Loha" / "Patra"</td>
                      <td className="p-3">IS 2062 HMS-1 Heavy Melting Steel</td>
                      <td className="p-3 font-mono font-bold text-amber-600">91.0% Pure</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 font-sketch font-bold text-purple-600">Bengali</td>
                      <td className="p-3 font-mono font-bold">"Kalo Batri Sisa" (সীসা)</td>
                      <td className="p-3">IS 1332 Lead-Acid Battery Ingot</td>
                      <td className="p-3 font-mono font-bold text-purple-600">95.0% Pure</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: Live Audio Transcription & Extraction Flow */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-4">
              <WashiTapeCenter color="yellow" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  Chapter 4.3 // Real-Time Acoustic Inference Pipeline
                </span>
                <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">&lt; 800ms Stream</span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 font-sketch text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 shadow-[3px_4px_0px_rgba(0,0,0,0.85)] space-y-2">
                <span className="text-zinc-500 block uppercase font-bold text-xs">// Spoken Audio Input:</span>
                <p className="italic text-sm text-zinc-900 dark:text-white bg-amber-50 dark:bg-zinc-800 p-3 rounded-xl border border-amber-200 dark:border-zinc-700">
                  "Arre bhaiya Mayapuri phase 2 godown se bol raha hu, 850 kilo silky aluminum section hai, truck ready hai."
                </p>

                <span className="text-zinc-500 block uppercase font-bold text-xs pt-2">// Structured Entity Extraction (JSON):</span>
                <pre className="text-emerald-800 dark:text-emerald-300 font-mono text-xs overflow-x-auto p-3 bg-zinc-50 dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-800">
{`{
  "detectedLanguage": "hi-IN",
  "confidence": 0.988,
  "extractedEntities": {
    "materialStandard": "ALUMINUM_6063_EXTRUSION",
    "quantityKg": 850,
    "location": "Mayapuri Phase 2 Depot, New Delhi",
    "logisticsReadiness": "IMMEDIATE_DISPATCH"
  },
  "instantQuoteInr": 178500.00
}`}
                </pre>
              </div>
            </section>

            {/* Navigation */}
            <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/docs/agents/agent-03"
                className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 03 MCX Oracle</span>
              </Link>
              <Link
                href="/docs/agents/agent-05"
                className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Next: Agent 05 Fraud Radar</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
