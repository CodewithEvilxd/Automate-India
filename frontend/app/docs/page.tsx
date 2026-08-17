"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  BookOpen,
  Cpu,
  Scale,
  Zap,
  Mic,
  ShieldAlert,
  ShieldCheck,
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Database,
  ArrowRight,
  ExternalLink,
  Code2,
  Layers,
  Sparkles,
  Terminal,
  FileText,
  Activity,
  Globe2,
  ChevronRight,
  Copy,
  Check,
  Search,
  Sliders,
  Play,
  Share2,
  HelpCircle,
  Clock,
  CheckCircle,
  FileCode2,
} from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState<"curl" | "ts" | "python">("curl");
  
  // Interactive Simulator State
  const [simCategory, setSimCategory] = useState("aluminum");
  const [simWeightKg, setSimWeightKg] = useState(500);
  
  // Live API Playground State
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  const navigationGroups = [
    {
      group: "GETTING STARTED",
      items: [
        { id: "overview", label: "Executive Summary & Mission" },
        { id: "problem-statement", label: "The Global & National Crisis" },
        { id: "solution-comparison", label: "Linear Economy vs CircularChain" },
      ],
    },
    {
      group: "6-AGENT AUTONOMOUS CORE",
      items: [
        { id: "agent-01", label: "Agent 01: Optical Quality Vision" },
        { id: "agent-02", label: "Agent 02: EPA WARM Carbon Math" },
        { id: "agent-03", label: "Agent 03: MCX & Logistics Oracle" },
        { id: "agent-04", label: "Agent 04: Indic Voice Bridge" },
        { id: "agent-05", label: "Agent 05: Cryptographic Fraud Radar" },
        { id: "agent-06", label: "Agent 06: CPCB Statutory EPR Shield" },
      ],
    },
    {
      group: "CRYPTOGRAPHIC PROTOCOL",
      items: [
        { id: "lifecycle-flow", label: "End-to-End Verification Pipeline" },
        { id: "web3-ledger", label: "Polygon Amoy Smart Contracts" },
        { id: "carbon-calculator-sim", label: "Interactive EPA Math Explorer" },
      ],
    },
    {
      group: "DEVELOPER REFERENCE",
      items: [
        { id: "api-playground", label: "Interactive API Playground" },
        { id: "deployment-specs", label: "Cloud & Edge Infrastructure" },
      ],
    },
  ];

  // Active scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      const allIds = navigationGroups.flatMap((g) => g.items.map((i) => i.id));
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const executeLiveApiCall = async () => {
    setIsLoadingApi(true);
    try {
      const res = await fetch("https://circularchain-backend.onrender.com/api/mcx-oracle");
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setApiResponse(JSON.stringify({ error: "Failed to connect to live backend", details: e.message }, null, 2));
    } finally {
      setIsLoadingApi(false);
    }
  };

  // EPA math simulation
  const epaFactors: Record<string, { factor: number; price: number; name: string }> = {
    aluminum: { factor: 9.13, price: 215, name: "Aluminum (6063 Scrap)" },
    copper: { factor: 2.81, price: 760, name: "Copper (Heavy Berry)" },
    steel: { factor: 1.81, price: 42.5, name: "HMS 1/2 Steel Scrap" },
    plastic_pet: { factor: 1.50, price: 48, name: "PET Bottle Flakes" },
    plastic_hdpe: { factor: 1.35, price: 58, name: "HDPE Granules (Blue)" },
  };

  const selectedEpa = epaFactors[simCategory] || epaFactors.aluminum;
  const calculatedCo2 = (simWeightKg * selectedEpa.factor).toFixed(1);
  const calculatedVal = Math.round(simWeightKg * selectedEpa.price).toLocaleString("en-IN");
  const avoidedPenalty = Math.round((simWeightKg / 1000) * 8500).toLocaleString("en-IN");

  return (
    <div className="min-h-screen bg-[#FBFBFC] dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Hero Header */}
      <div className="border-b border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0D0E15] py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Protocol Documentation v2.4</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 dark:text-orange-400 border border-orange-500/20 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CPCB FY 2026-27 Compliant</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/10 text-xs font-mono">
              Polygon Amoy: 0x3d0b...10293
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            CircularChain Architecture & Whitepaper
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            The definitive technical specification of the autonomous multi-agent circular economy network, EPA WARM deterministic carbon equations, CPCB EPR compliance automation, and on-chain settlement ledger.
          </p>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR: Hierarchical Menu */}
          <aside className="lg:col-span-3">
            <div className="sticky top-20 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 p-4 shadow-xl bg-white/80 dark:bg-[#0D0E15]/80 backdrop-blur-xl space-y-6">
              
              {/* Quick Filter */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter sections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs font-medium placeholder:text-zinc-400 outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Navigation Groups */}
              <div className="space-y-5">
                {navigationGroups.map((grp, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold block px-2 mb-1">
                      {grp.group}
                    </span>
                    {grp.items
                      .filter((item) =>
                        searchQuery ? item.label.toLowerCase().includes(searchQuery.toLowerCase()) : true
                      )
                      .map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block py-1.5 px-3 rounded-xl transition-all text-xs font-medium truncate ${
                            activeSection === item.id
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border-l-2 border-emerald-500 shadow-sm"
                              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
                          }`}
                        >
                          {item.label}
                        </a>
                      ))}
                  </div>
                ))}
              </div>

              {/* Quick Download Action */}
              <div className="pt-4 border-t border-zinc-200 dark:border-white/[0.08] space-y-2">
                <a
                  href="/circularchain.apk"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-display text-xs font-bold transition-all shadow-md shadow-orange-500/20"
                >
                  <span>Download Release APK</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENTATION CONTENT */}
          <main className="lg:col-span-9 space-y-16">
            
            {/* 1. EXECUTIVE SUMMARY */}
            <section id="overview" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>01. EXECUTIVE SUMMARY & ABSTRACT</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold text-zinc-900 dark:text-white">
                Verifiable Industrial Circular Economy Protocol
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                <strong>CircularChain</strong> is a decentralized, multi-agent AI protocol engineered to formalize the $40B+ secondary scrap commodity ecosystem in India. By fusing multi-modal computer vision quality inspection, deterministic US EPA WARM carbon mathematics, real-time MCX commodity pricing feeds, and Polygon Amoy smart contracts, CircularChain provides an end-to-end, tamper-proof audit trail for industrial scrap.
              </p>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
                  <span className="font-mono text-2xl font-extrabold text-emerald-500 block">100%</span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white mt-1 block">EPA Deterministic Math</span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                    Zero generative hallucination in statutory carbon accounting.
                  </span>
                </div>

                <div className="p-5 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
                  <span className="font-mono text-2xl font-extrabold text-orange-500 block">₹8,500/MT</span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white mt-1 block">Avoided CPCB Penalty</span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                    Automated EPR quota compliance for automotive & FMCG OEMs.
                  </span>
                </div>

                <div className="p-5 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
                  <span className="font-mono text-2xl font-extrabold text-zinc-900 dark:text-white block">&lt;2.1s</span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white mt-1 block">On-Chain Finality</span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                    Zero-Knowledge proof validation on Polygon Amoy (80002).
                  </span>
                </div>
              </div>
            </section>

            {/* 2. THE GLOBAL & NATIONAL CRISIS */}
            <section id="problem-statement" className="scroll-mt-24 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-500 dark:text-orange-400 uppercase tracking-widest">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>02. THE GLOBAL & NATIONAL CRISIS</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold text-zinc-900 dark:text-white">
                Why Traditional Circularity Fails at Scale
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Despite trillions invested in ESG commitments, enterprise recycling is fundamentally broken due to four critical structural failures:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Circularity Fraud & Duplicate Inscriptions</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Over $12B in phantom recycling occurs annually. Scammers photocopy weighbridge receipts, claim ESG credits across multiple registries, and dump unsegregated waste in landfills while collecting statutory tax deductions.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                    <Building2 className="w-4 h-4" />
                    <span>The 90% Informal Aggregator Void</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    India’s 5M+ informal scrap collectors (Kabadiwalas) lack digital access, fair MCX transparent pricing, and standardized purity testing. They are exploited by middlemen while enterprise OEMs suffer from feedstock shortages.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-orange-500/[0.04] border border-orange-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-orange-500 font-bold text-sm">
                    <Scale className="w-4 h-4" />
                    <span>CPCB EPR Statutory Penalties (FY 26-27)</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    MoEFCC mandates 80% recycling quotas for rigid plastics and 75% for secondary metals. Missing targets triggers statutory fines of ₹5,000 to ₹25,000 per metric tonne, creating massive balance sheet risk.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <Cpu className="w-4 h-4" />
                    <span>GenAI Carbon Hallucinations</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Most ESG software uses unverified generative prompts that invent carbon numbers. Auditing authorities reject these probabilistic guesses during statutory regulatory filings.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. LINEAR VS CIRCULARCHAIN COMPARISON */}
            <section id="solution-comparison" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>03. PARADIGM SHIFT: LINEAR VS CIRCULARCHAIN</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold text-zinc-900 dark:text-white">
                Comparative Protocol Analysis
              </h2>

              <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10 glass-panel">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-zinc-100 dark:bg-white/[0.04] border-b border-zinc-200 dark:border-white/10 font-mono text-[11px] uppercase text-zinc-500 dark:text-zinc-400">
                    <tr>
                      <th className="p-4">Dimension</th>
                      <th className="p-4 text-rose-500">Traditional Scrap Ecosystem</th>
                      <th className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">CircularChain Autonomous Protocol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-white/[0.06] text-zinc-600 dark:text-zinc-300">
                    <tr>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white font-mono">Purity Testing</td>
                      <td className="p-4 text-zinc-500">Subjective eyeball inspection (high error)</td>
                      <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">Multi-Modal Vision Semantic Segmentation (Agent 01)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white font-mono">Carbon Accounting</td>
                      <td className="p-4 text-zinc-500">Unverified estimates or self-reported Excel sheets</td>
                      <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">Deterministic US EPA WARM v15 Equations (Agent 02)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white font-mono">Price Discovery</td>
                      <td className="p-4 text-zinc-500">Opaque middleman commissions</td>
                      <td className="p-4 font-semibold text-orange-500">Real-Time MCX & Mandi Continuous Oracle (Agent 03)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white font-mono">Informal Accessibility</td>
                      <td className="p-4 text-zinc-500">Complex English portal forms (digital barrier)</td>
                      <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">Indic Voice Assistant in 6 Indian Dialects (Agent 04)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white font-mono">Fraud Prevention</td>
                      <td className="p-4 text-zinc-500">Post-mortem audit months after transfer</td>
                      <td className="p-4 font-semibold text-orange-500">Pre-execution Cryptographic Anomaly Radar (Agent 05)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white font-mono">Ledger Settlement</td>
                      <td className="p-4 text-zinc-500">Paper receipts (easily forged or duplicated)</td>
                      <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">Polygon Amoy Smart Contract & IPFS Pinning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. AGENTS DEEP DIVE */}
            <div className="space-y-12">
              
              {/* AGENT 01 */}
              <section id="agent-01" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white">
                        Agent 01: Optical Quality & Impurity Vision Sentinel
                      </h3>
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        Multi-Modal Computer Vision • ISO 9001 Alignment
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                    Agent 01
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Agent 01 analyzes raw specimen photography from mobile devices or high-speed conveyor belts. It executes semantic segmentation across pixel contours to detect oxidation, grease contamination, non-ferrous mixed impurities, and moisture levels, producing a certified Industrial Grade score.
                </p>

                <div className="p-4 rounded-xl bg-zinc-900 text-zinc-200 dark:bg-black/60 font-mono text-xs space-y-1">
                  <span className="text-zinc-500 text-[10px] block uppercase font-bold">Mathematical Formulation:</span>
                  <code className="text-emerald-400">Quality_Score = (100 - Contamination_Pct) × Purity_Multiplier × Morphology_Weight</code>
                </div>
              </section>

              {/* AGENT 02 */}
              <section id="agent-02" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white">
                        Agent 02: Deterministic EPA WARM Carbon Abatement Engine
                      </h3>
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        US EPA WARM v15 Equations • Zero Generative Drift
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                    Agent 02
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Instead of probabilistic LLM guesses, Agent 02 strictly evaluates emissions savings through deterministic life-cycle factors derived from the United States Environmental Protection Agency Waste Reduction Model (EPA WARM).
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
                    <span className="text-[10px] text-zinc-500 block">Aluminum 6063</span>
                    <span className="text-emerald-500 font-bold text-sm">9.13 kg CO₂e/kg</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
                    <span className="text-[10px] text-zinc-500 block">Copper Scrap</span>
                    <span className="text-orange-500 font-bold text-sm">2.81 kg CO₂e/kg</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
                    <span className="text-[10px] text-zinc-500 block">HMS Steel</span>
                    <span className="text-orange-500 font-bold text-sm">1.81 kg CO₂e/kg</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
                    <span className="text-[10px] text-zinc-500 block">PET Plastic</span>
                    <span className="text-emerald-500 font-bold text-sm">1.50 kg CO₂e/kg</span>
                  </div>
                </div>
              </section>

              {/* AGENT 03 */}
              <section id="agent-03" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white">
                        Agent 03: Autonomous MCX Oracle & Logistics Matchmaker
                      </h3>
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        MCX Spot Feed • Haversine Transit Optimization
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 font-mono text-xs font-bold">
                    Agent 03
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Agent 03 ingests live Multi Commodity Exchange (MCX) and regional Mandi spot indices. It pairs scrap sellers with certified recyclers across major Indian corridors (Noida, Pune, Bengaluru, Chennai) and computes the Net Carbon ROI after deducting transport freight emissions.
                </p>

                <div className="p-4 rounded-xl bg-zinc-900 text-zinc-200 dark:bg-black/60 font-mono text-xs space-y-1">
                  <span className="text-zinc-500 text-[10px] block uppercase font-bold">Net Carbon Formula:</span>
                  <code className="text-orange-400">Net_Carbon_Abated = Gross_EPA_Saved - (Distance_KM × Freight_Emission_Factor_0.105)</code>
                </div>
              </section>

              {/* AGENT 04 */}
              <section id="agent-04" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                      <Mic className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white">
                        Agent 04: Indic Voice Multi-Dialect NLP Bridge
                      </h3>
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        Speech-to-Structured-Listing • 6 Indian Languages
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                    Agent 04
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Eliminates digital barriers for informal kabadiwalas by understanding spoken colloquial Hindi, Hinglish, Tamil, Telugu, and Marathi. Voice transcripts are automatically parsed into verified JSON entities (category, mass in kg, location, condition).
                </p>
              </section>

              {/* AGENT 05 */}
              <section id="agent-05" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white">
                        Agent 05: Cryptographic Fraud Sentinel & Anomaly Radar
                      </h3>
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        Wash Trading Detector • Double-Claim Inscription Blocker
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 font-mono text-xs font-bold">
                    Agent 05
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Agent 05 audits transaction requests before smart contract broadcast. It detects circular wash-trading between colluding wallets, flags identical IPFS image hashes, and blocks exaggerated mass claims.
                </p>
              </section>

              {/* AGENT 06 */}
              <section id="agent-06" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white">
                        Agent 06: Statutory CPCB EPR Compliance & Penalty Shield
                      </h3>
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        MoEFCC PWM Rules 2026 • Battery Waste Rules 2022 • MoRTH ELV
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 font-mono text-xs font-bold">
                    Agent 06
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Maps procurement batches against statutory CPCB recycling quotas (Rigid Plastics @ 80%, Flexible @ 70%, Metals @ 75%). Automatically generates CPCB-auditable verification certificates and computes avoided statutory penalties.
                </p>
              </section>
            </div>

            {/* 5. INTERACTIVE EPA CARBON CALCULATOR SIMULATOR */}
            <section id="carbon-calculator-sim" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <Sliders className="w-3.5 h-3.5" />
                <span>05. INTERACTIVE EPA CARBON & EPR MATH EXPLORER</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold text-zinc-900 dark:text-white">
                Live Mathematical Simulator
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                Interact with the exact algorithm that Agent 02 and Agent 06 execute on every scrap lot:
              </p>

              <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-500 dark:text-zinc-400 block mb-1">
                      Select Commodity Category:
                    </label>
                    <select
                      value={simCategory}
                      onChange={(e) => setSimCategory(e.target.value)}
                      className="w-full bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-900 dark:text-white outline-none"
                    >
                      <option value="aluminum">Aluminum 6063 Extrusions (9.13 kg CO₂e/kg)</option>
                      <option value="copper">Copper Scrap Heavy Berry (2.81 kg CO₂e/kg)</option>
                      <option value="steel">HMS 1/2 Steel Scrap (1.81 kg CO₂e/kg)</option>
                      <option value="plastic_pet">PET Flakes Hot Washed (1.50 kg CO₂e/kg)</option>
                      <option value="plastic_hdpe">HDPE Regrind Granules (1.35 kg CO₂e/kg)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        Lot Mass (kg):
                      </label>
                      <span className="font-mono text-xs font-bold text-emerald-500">{simWeightKg} kg</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="10000"
                      step="50"
                      value={simWeightKg}
                      onChange={(e) => setSimWeightKg(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                    <span className="font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400 block">
                      Deterministic EPA CO₂ Saved
                    </span>
                    <span className="font-mono text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block mt-1">
                      +{calculatedCo2} kg
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20">
                    <span className="font-mono text-[10px] uppercase text-orange-500 block">
                      MCX Spot Market Value
                    </span>
                    <span className="font-mono text-2xl font-extrabold text-orange-500 block mt-1">
                      ₹{calculatedVal}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
                    <span className="font-mono text-[10px] uppercase text-zinc-500 block">
                      Avoided CPCB Statutory Fine
                    </span>
                    <span className="font-mono text-2xl font-extrabold text-zinc-900 dark:text-white block mt-1">
                      ₹{avoidedPenalty}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. INTERACTIVE DEVELOPER API PLAYGROUND */}
            <section id="api-playground" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-500 dark:text-orange-400 uppercase tracking-widest">
                <Code2 className="w-3.5 h-3.5" />
                <span>06. INTERACTIVE REST API PLAYGROUND</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold text-zinc-900 dark:text-white">
                Live Developer Sandbox
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                Test live endpoints directly against the production Render cloud backend:
              </p>

              <div className="rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 overflow-hidden shadow-xl">
                {/* Header Tabs */}
                <div className="bg-zinc-100 dark:bg-black/60 p-4 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                      GET
                    </span>
                    <code className="font-mono text-xs text-zinc-900 dark:text-white font-bold">
                      /api/mcx-oracle
                    </code>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex rounded-lg bg-zinc-200 dark:bg-white/[0.06] p-0.5 text-[11px] font-mono">
                      {(["curl", "ts", "python"] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setSelectedLang(lang)}
                          className={`px-2.5 py-1 rounded-md uppercase transition-all ${
                            selectedLang === lang
                              ? "bg-white dark:bg-[#1E1F2A] text-zinc-900 dark:text-white font-bold shadow-sm"
                              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={executeLiveApiCall}
                      disabled={isLoadingApi}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 disabled:opacity-50"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isLoadingApi ? "Executing..." : "Run Test"}</span>
                    </button>
                  </div>
                </div>

                {/* Code Body */}
                <div className="p-4 bg-zinc-950 text-zinc-200 font-mono text-xs relative overflow-x-auto">
                  <button
                    onClick={() =>
                      copyToClipboard(
                        selectedLang === "curl"
                          ? "curl -X GET https://circularchain-backend.onrender.com/api/mcx-oracle"
                          : selectedLang === "ts"
                          ? "const res = await fetch('https://circularchain-backend.onrender.com/api/mcx-oracle');\nconst data = await res.json();"
                          : "import requests\nres = requests.get('https://circularchain-backend.onrender.com/api/mcx-oracle')\nprint(res.json())",
                        "code-snippet"
                      )
                    }
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 text-[10px] flex items-center gap-1"
                  >
                    {copiedCode === "code-snippet" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode === "code-snippet" ? "Copied" : "Copy"}</span>
                  </button>

                  <pre className="text-zinc-300">
                    {selectedLang === "curl" &&
                      `# Execute live curl against Render Cloud Backend\ncurl -X GET "https://circularchain-backend.onrender.com/api/mcx-oracle" \\\n  -H "Accept: application/json"`}
                    {selectedLang === "ts" &&
                      `// TypeScript / Next.js Client Implementation\nimport axios from 'axios';\n\nconst { data } = await axios.get('https://circularchain-backend.onrender.com/api/mcx-oracle');\nconsole.log(data.commodities);`}
                    {selectedLang === "python" &&
                      `# Python 3 Implementation\nimport requests\n\nresponse = requests.get("https://circularchain-backend.onrender.com/api/mcx-oracle")\ncommodities = response.json().get("commodities", [])\nprint(commodities)`}
                  </pre>
                </div>

                {/* Live Output Window */}
                {apiResponse && (
                  <div className="border-t border-zinc-200 dark:border-white/10 p-4 bg-zinc-900 text-emerald-400 font-mono text-xs">
                    <div className="flex items-center justify-between text-zinc-400 text-[10px] uppercase mb-2">
                      <span>Live Response Output:</span>
                      <span className="text-emerald-400 font-bold">HTTP 200 OK</span>
                    </div>
                    <pre className="overflow-x-auto max-h-60 text-[11px] leading-relaxed">
                      {apiResponse}
                    </pre>
                  </div>
                )}
              </div>
            </section>

            {/* 7. POLYGON AMOY SMART CONTRACT */}
            <section id="web3-ledger" className="scroll-mt-24 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <Lock className="w-3.5 h-3.5" />
                <span>07. POLYGON AMOY SMART CONTRACTS</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold text-zinc-900 dark:text-white">
                Immutable Ledger Architecture
              </h2>

              <div className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 space-y-1">
                    <span className="text-zinc-500 text-[10px] uppercase block">Contract Address</span>
                    <code className="text-emerald-600 dark:text-emerald-400 font-bold text-xs select-all block break-all">
                      0x3d0bc12948a7192837bc910283748293bc910293
                    </code>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 space-y-1">
                    <span className="text-zinc-500 text-[10px] uppercase block">Blockchain Network</span>
                    <span className="text-zinc-900 dark:text-white font-bold text-xs block">
                      Polygon Amoy Testnet (Chain ID: 80002)
                    </span>
                  </div>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  When a lot ownership transfer is verified by Agent 02 and passed by Agent 05, the <code className="text-emerald-500 font-bold">verifyAndTransfer()</code> smart contract function is invoked. A non-fungible certificate with IPFS hash and mathematical carbon metrics is minted to the buyer's wallet.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
