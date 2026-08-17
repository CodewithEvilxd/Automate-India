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
} from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const sections = [
    { id: "overview", label: "Executive Summary & Abstract" },
    { id: "problem-statement", label: "The Global & National Crisis" },
    { id: "system-architecture", label: "Multi-Agent System Architecture" },
    { id: "agent-01", label: "Agent 01: Optical Quality Sentinel" },
    { id: "agent-02", label: "Agent 02: EPA WARM Carbon Engine" },
    { id: "agent-03", label: "Agent 03: MCX Oracle & Matchmaking" },
    { id: "agent-04", label: "Agent 04: Indic Voice Bridge" },
    { id: "agent-05", label: "Agent 05: Cryptographic Fraud Sentinel" },
    { id: "agent-06", label: "Agent 06: CPCB Statutory Compliance" },
    { id: "web3-ledger", label: "Polygon Amoy On-Chain Ledger" },
    { id: "api-reference", label: "Developer REST API Reference" },
    { id: "deployment", label: "Production Cloud Infrastructure" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
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
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans">
      <Navbar />

      {/* Hero Banner */}
      <div className="border-b border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0C0D12] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Protocol Whitepaper v2.4</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 dark:text-orange-400 border border-orange-500/20 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CPCB FY 2026-27 Compliant</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/10 text-xs font-mono">
              Polygon Amoy: 0x3d0b...10293
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            CircularChain Protocol Architecture
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            A comprehensive technical whitepaper outlining the problem formulation, multi-agent AI verification mechanics, deterministic EPA WARM carbon equations, CPCB EPR compliance automation, and Polygon Amoy on-chain settlement protocol.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 p-5 shadow-lg bg-white/70 dark:bg-[#0C0D12]/70 backdrop-blur-xl">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold block mb-3">
                TABLE OF CONTENTS
              </span>
              <nav className="space-y-1 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className={`block py-1.5 px-3 rounded-lg transition-all font-medium truncate ${
                      activeSection === sec.id
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border-l-2 border-emerald-500"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-white/[0.08]">
                <a
                  href="/circularchain.apk"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-display text-xs font-bold transition-all shadow-sm shadow-orange-500/20"
                >
                  <span>Download Android APK</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>

          {/* Detailed Documentation Body */}
          <main className="lg:col-span-9 space-y-16">
            {/* SECTION 1: EXECUTIVE SUMMARY */}
            <section id="overview" className="scroll-mt-24">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                <span>01. EXECUTIVE SUMMARY</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-4">
                Autonomous Circular Economy & Carbon Accounting Protocol
              </h2>
              <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed space-y-4">
                <p>
                  <strong>CircularChain</strong> is an enterprise-grade, decentralized industrial recycling protocol designed to solve the structural opacity, ESG greenwashing, and supply-chain fragmentation in India’s scrap and secondary commodity markets.
                </p>
                <p>
                  By synthesizing <strong>Multi-Modal Vision Inspection (Agent 01)</strong>, <strong>Deterministic EPA WARM Carbon Mathematics (Agent 02)</strong>, <strong>Real-Time MCX Commodity Oracles (Agent 03)</strong>, <strong>Indic Speech Processing (Agent 04)</strong>, <strong>Cryptographic Fraud Auditing (Agent 05)</strong>, and <strong>Statutory CPCB EPR Automation (Agent 06)</strong> with <strong>Polygon Amoy On-Chain Settlement</strong>, CircularChain creates an airtight, verifiable chain-of-custody for recyclable materials.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 not-prose">
                  <div className="p-4 rounded-xl glass-panel border border-zinc-200 dark:border-white/10">
                    <span className="font-mono text-2xl font-extrabold text-emerald-500 block">
                      100%
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
                      Mathematical EPA Determinism (No GenAI Hallucination)
                    </span>
                  </div>
                  <div className="p-4 rounded-xl glass-panel border border-zinc-200 dark:border-white/10">
                    <span className="font-mono text-2xl font-extrabold text-orange-500 block">
                      ₹8,500/MT
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
                      Avoided Statutory CPCB Penalties per Lot
                    </span>
                  </div>
                  <div className="p-4 rounded-xl glass-panel border border-zinc-200 dark:border-white/10">
                    <span className="font-mono text-2xl font-extrabold text-zinc-900 dark:text-white block">
                      &lt;2.1s
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
                      On-Chain Settlement on Polygon Amoy Ledger
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: PROBLEM STATEMENT */}
            <section id="problem-statement" className="scroll-mt-24">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-500 dark:text-orange-400 uppercase tracking-widest mb-2">
                <span>02. THE GLOBAL & NATIONAL CRISIS</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-4">
                Why Does Industrial Circularity Fail Today?
              </h2>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-xs">
                  <div className="flex items-center gap-2.5 mb-2">
                    <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                    <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-white">
                      Crisis 1: Multi-Billion Dollar Circularity Fraud & "Greenwashing"
                    </h3>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Across global supply chains, secondary material recycling is plagued by falsified weighbridge slips, duplicate ESG certificates, and phantom recycling lot creation. Companies claim carbon tax offsets and green credits for material that was never melted or was landfilled, creating systemic compliance liability.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Building2 className="w-5 h-5 text-amber-500 shrink-0" />
                    <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-white">
                      Crisis 2: The 90% Informal Recycling Sector in India
                    </h3>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Over 90% of India's plastic, aluminum, and electronic scrap is collected by the unorganized informal sector (kabadiwalas, local aggregators). Due to language barriers, lack of standardized quality grading, and absence of formal banking, they are exploited with sub-par rates while institutional buyers (Tata, Foxconn, Reliance) cannot source verified feedstock.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Scale className="w-5 h-5 text-emerald-500 shrink-0" />
                    <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-white">
                      Crisis 3: Statutory CPCB EPR Penalties (FY 2026-27 Mandates)
                    </h3>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    The Central Pollution Control Board (CPCB) and MoEFCC have mandated strict <strong>Extended Producer Responsibility (EPR)</strong> targets (up to 80% recycling & 30% Post-Consumer Recycled content). Non-compliance results in severe environmental compensation fines (up to ₹8,500/MT for metals, ₹5,000/MT for plastics, ₹25,000/MT for battery waste). Enterprises lack automated, audit-ready compliance tools.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: SYSTEM ARCHITECTURE */}
            <section id="system-architecture" className="scroll-mt-24">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                <span>03. MULTI-AGENT AI ARCHITECTURE</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-4">
                The 6-Agent Autonomous Engine
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8">
                CircularChain separates responsibilities into 6 specialized autonomous micro-agents. Each agent executes a deterministic sub-routine, producing verified cryptographic artifacts that are orchestrated prior to smart contract inscription.
              </p>

              {/* SECTION 4: AGENT 1 */}
              <div id="agent-01" className="scroll-mt-28 p-6 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4 mb-8">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                        Agent 01: Optical Quality & Impurity Vision Sentinel
                      </h3>
                      <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">
                        Multi-Modal Computer Vision • ISO 9001 Grade Standard
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold uppercase">
                    Agent 01
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  Agent 01 consumes high-resolution camera feeds from mobile or industrial sorting lines. It executes semantic segmentation to detect contamination artifacts (surface oxidation on metals, PVC labels in PET flakes, moisture levels) and automatically assigns a certified quality grade (Grade A+ / A / B).
                </p>

                <div className="p-4 rounded-xl bg-zinc-100 dark:bg-black/40 font-mono text-xs text-zinc-800 dark:text-zinc-200 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">Mathematical Quality Function:</span>
                  <code>Quality_Score = (100 - Contamination_Pct) × Purity_Multiplier × Morphology_Weight</code>
                </div>
              </div>

              {/* SECTION 5: AGENT 2 */}
              <div id="agent-02" className="scroll-mt-28 p-6 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4 mb-8">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                        Agent 02: Deterministic EPA WARM Carbon Abatement Engine
                      </h3>
                      <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">
                        US EPA WARM v15 Equations • Zero Generative Hallucination
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold uppercase">
                    Agent 02
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  Unlike generative AI models that hallucinate arbitrary carbon statistics, Agent 02 strictly evaluates emissions savings through deterministic life-cycle factors derived from the <strong>United States Environmental Protection Agency Waste Reduction Model (EPA WARM)</strong>.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
                    <span className="text-[10px] text-zinc-500 block">Aluminum Factor</span>
                    <span className="text-emerald-500 font-bold">9.13 kg CO₂e/kg</span>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
                    <span className="text-[10px] text-zinc-500 block">Copper Factor</span>
                    <span className="text-orange-500 font-bold">2.81 kg CO₂e/kg</span>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
                    <span className="text-[10px] text-zinc-500 block">Steel Factor</span>
                    <span className="text-orange-500 font-bold">1.81 kg CO₂e/kg</span>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
                    <span className="text-[10px] text-zinc-500 block">PET Plastic Factor</span>
                    <span className="text-emerald-500 font-bold">1.50 kg CO₂e/kg</span>
                  </div>
                </div>
              </div>

              {/* SECTION 6: AGENT 3 */}
              <div id="agent-03" className="scroll-mt-28 p-6 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4 mb-8">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                        Agent 03: Autonomous MCX Price Discovery & Logistics Matchmaker
                      </h3>
                      <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">
                        MCX Spot Ingestion • Haversine Transit Carbon Minimizer
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-500 font-mono text-[10px] font-bold uppercase">
                    Agent 03
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  Agent 03 ingests live Multi Commodity Exchange (MCX) and regional Mandi spot indices (e.g. Copper Heavy Berry @ ₹760/kg, Aluminum 6063 @ ₹215/kg). It pairs scrap sellers with certified recyclers across major Indian corridors (Noida, Pune, Bengaluru, Chennai) and computes the Net Carbon ROI after deducting transport freight emissions.
                </p>

                <div className="p-4 rounded-xl bg-zinc-100 dark:bg-black/40 font-mono text-xs text-zinc-800 dark:text-zinc-200 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">Net Carbon Formula:</span>
                  <code>Net_Carbon_Abated = Gross_EPA_Saved - (Distance_KM × Freight_Emission_Factor_0.105)</code>
                </div>
              </div>

              {/* SECTION 7: AGENT 4 */}
              <div id="agent-04" className="scroll-mt-28 p-6 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4 mb-8">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                      <Mic className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                        Agent 04: Indic Voice Multi-Dialect Bridge
                      </h3>
                      <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">
                        Vernacular Scrap NLP • Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold uppercase">
                    Agent 04
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  To eliminate digital exclusion in the informal sector, Agent 04 allows scrap collectors to speak in colloquial vernacular Hindi, Hinglish, Tamil, Telugu, or Marathi (e.g. <em>"Bhaiya 450 kilo aluminium ka scrap hai Noida Sector 62 me"</em>). It extracts structured JSON entities (category, mass in kg, location, condition) in real time.
                </p>
              </div>

              {/* SECTION 8: AGENT 5 */}
              <div id="agent-05" className="scroll-mt-28 p-6 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4 mb-8">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                        Agent 05: Cryptographic Fraud Sentinel & Anomaly Radar
                      </h3>
                      <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">
                        Wash Trading Detector • Double-Claim Inscription Blocker
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-500 font-mono text-[10px] font-bold uppercase">
                    Agent 05
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  Agent 05 monitors all transaction requests before smart contract submission. It checks for duplicate IPFS visual hashes, rapid circular trades between affiliated wallets, unrealistic mass claims (&gt;50 tonnes on non-commercial vehicles), and anomalous carbon inflation.
                </p>
              </div>

              {/* SECTION 9: AGENT 6 */}
              <div id="agent-06" className="scroll-mt-28 p-6 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-4 mb-8">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                        Agent 06: Statutory CPCB EPR Compliance & Penalty Shield
                      </h3>
                      <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">
                        MoEFCC PWM Rules 2026 • Battery Waste Rules 2022 • MoRTH ELV
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-500 font-mono text-[10px] font-bold uppercase">
                    Agent 06
                  </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  Agent 06 maps procurement batches against statutory CPCB recycling quotas (Category I Rigid Plastics @ 80%, Category II Flexible @ 70%, Secondary Metals @ 75%). It automatically generates CPCB-auditable verification certificates and calculates avoided statutory penalties.
                </p>
              </div>
            </section>

            {/* SECTION 10: WEB3 & SMART CONTRACTS */}
            <section id="web3-ledger" className="scroll-mt-24">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                <span>04. ON-CHAIN LEDGER</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-4">
                Polygon Amoy Smart Contract Architecture
              </h2>
              <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>
                  Every lot listed, verified, and settled on CircularChain is permanently anchored to the Polygon Amoy testnet.
                </p>

                <div className="p-4 rounded-xl bg-zinc-100 dark:bg-black/50 border border-zinc-200 dark:border-white/10 font-mono text-xs space-y-2">
                  <div className="flex justify-between items-center text-zinc-500">
                    <span>CONTRACT SPECIFICATIONS</span>
                    <span className="text-emerald-500 font-bold">SOLIDITY 0.8.20</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Deployed Address:</span>{" "}
                    <code className="text-emerald-500 font-bold select-all">
                      0x3d0bc12948a7192837bc910283748293bc910293
                    </code>
                  </div>
                  <div>
                    <span className="text-zinc-400">Network:</span>{" "}
                    <span className="text-zinc-900 dark:text-white font-bold">Polygon Amoy Testnet (Chain ID: 80002)</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Block Explorer:</span>{" "}
                    <a
                      href="https://amoy.polygonscan.com/address/0x3d0bc12948a7192837bc910283748293bc910293"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline inline-flex items-center gap-1"
                    >
                      <span>amoy.polygonscan.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: REST API REFERENCE */}
            <section id="api-reference" className="scroll-mt-24">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-500 dark:text-orange-400 uppercase tracking-widest mb-2">
                <span>05. DEVELOPER REST API</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-4">
                API Reference & Endpoints
              </h2>

              <div className="space-y-4">
                {[
                  {
                    method: "GET",
                    path: "/api/mcx-oracle",
                    desc: "Returns real-time Indian scrap commodity spot prices and percentage trends.",
                    response: '{\n  "success": true,\n  "commodities": [\n    {\n      "symbol": "CU-BERRY",\n      "name": "Copper Scrap (Heavy Berry No. 1)",\n      "unitPriceINR": 760.0,\n      "unit": "kg",\n      "change": "+1.8%",\n      "trend": "up"\n    }\n  ]\n}',
                  },
                  {
                    method: "POST",
                    path: "/api/cpcb/calculate",
                    desc: "Computes statutory CPCB recycling targets and avoided penalties for FY 2026-27.",
                    response: '{\n  "category": "aluminum",\n  "procuredMassKg": 10000,\n  "targetRecycledKg": 7500,\n  "co2AbatedKg": 91300,\n  "avoidedPenaltyINR": 85000\n}',
                  },
                  {
                    method: "POST",
                    path: "/api/verify-transfer",
                    desc: "Triggers AI Agent 2 verification, Agent 5 fraud audit, and executes smart contract transfer.",
                    response: '{\n  "success": true,\n  "txHash": "0x3d0a...8472",\n  "verification": { "verified": true },\n  "fraudAudit": { "passed": true, "risk_score": 5 }\n}',
                  },
                ].map((ep, idx) => (
                  <div key={idx} className="rounded-xl glass-panel border border-zinc-200 dark:border-white/10 p-4 font-mono text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          ep.method === "GET" ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-orange-500/20 text-orange-500"
                        }`}>
                          {ep.method}
                        </span>
                        <code className="text-zinc-900 dark:text-white font-bold">{ep.path}</code>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`https://circularchain-backend.onrender.com${ep.path}`, ep.path)}
                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 text-[10px]"
                      >
                        {copiedEndpoint === ep.path ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedEndpoint === ep.path ? "Copied" : "Copy URL"}</span>
                      </button>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 font-sans text-xs mb-3">{ep.desc}</p>
                    <pre className="p-3 rounded-lg bg-zinc-900 text-zinc-200 dark:bg-black/60 overflow-x-auto text-[11px]">
                      {ep.response}
                    </pre>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 12: DEPLOYMENT */}
            <section id="deployment" className="scroll-mt-24">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                <span>06. DEPLOYMENT TOPOLOGY</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-4">
                Production Infrastructure
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-5 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase block">Cloud Backend Service</span>
                  <span className="font-bold text-zinc-900 dark:text-white text-sm block">Render Web Service</span>
                  <a
                    href="https://circularchain-backend.onrender.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 text-xs"
                  >
                    <span>circularchain-backend.onrender.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-5 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase block">Next.js Edge Frontend</span>
                  <span className="font-bold text-zinc-900 dark:text-white text-sm block">Vercel Edge Network</span>
                  <a
                    href="https://circularchain-web.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline inline-flex items-center gap-1 text-xs"
                  >
                    <span>circularchain-web.vercel.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
