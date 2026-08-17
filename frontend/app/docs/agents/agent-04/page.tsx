"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  Mic,
  Globe2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Volume2,
  Smartphone,
} from "lucide-react";

export default function Agent04DocsPage() {
  const languageSamples = [
    {
      language: "Hindi / Hinglish",
      phrase: '"Bhaiya 450 kilo aluminium extrusion ka scrap hai Noida Sector 62 me"',
      extracted: { category: "aluminum", massKg: 450, location: "Noida Sector 62", condition: "clean" },
    },
    {
      language: "Tamil",
      phrase: '"Noida la 250 kilo copper scrap irukku, nalla condition"',
      extracted: { category: "copper", massKg: 250, location: "Noida", condition: "Grade A" },
    },
    {
      language: "Telugu",
      phrase: '"Noida lo 600 kg PET bottle flakes unnayyi"',
      extracted: { category: "plastic_pet", massKg: 600, location: "Noida", condition: "hot washed" },
    },
    {
      language: "Marathi",
      phrase: '"Noida madhe 300 kilo steel scrap ahe"',
      extracted: { category: "steel", massKg: 300, location: "Noida", condition: "HMS 1/2" },
    },
  ];

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
            <span className="text-emerald-500 font-bold">Agent 04: Indic Voice Bridge</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <Mic className="w-5 h-5" />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Agent 04: Indic Voice NLP Bridge
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed mt-2">
            Multi-lingual vernacular speech parsing allowing informal waste pickers and scrap aggregators to list materials hands-free in 6 Indian languages.
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
                <span>INFORMAL SECTOR INCLUSION</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Eliminating English Digital Barriers
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                India's 5M+ informal scrap collectors do not use English desktop dashboards. <strong>Agent 04</strong> integrates directly into the Flutter Android app and web browser, processing raw audio streams into structured listing payloads in real time.
              </p>
            </section>

            {/* Language Extraction Examples */}
            <section className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
                Live Speech-to-Entity Extraction Samples
              </h3>

              <div className="space-y-4">
                {languageSamples.map((sample, idx) => (
                  <div key={idx} className="p-5 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">{sample.language}</span>
                      <span className="text-zinc-500 text-[10px]">Entity Recognition</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 font-sans italic text-zinc-700 dark:text-zinc-300 text-xs">
                      {sample.phrase}
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                      {JSON.stringify(sample.extracted, null, 2)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Navigation Footer */}
            <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/docs/agents/agent-03"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-zinc-900 dark:text-white font-display text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 03 (MCX Oracle)</span>
              </Link>

              <Link
                href="/docs/agents/agent-05"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>Next: Agent 05 (Fraud Radar)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
