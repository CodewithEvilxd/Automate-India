import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Boxes,
  Leaf,
  Scale,
  FileCheck,
  SearchCheck,
  Trophy,
  Plus,
  Terminal,
  Activity,
  Layers,
  CheckCircle2,
  Lock,
  Share2,
  ExternalLink,
  MapPin,
  FileText,
  Calculator,
  Mic,
  TrendingUp,
  ShieldAlert
} from "lucide-react";
import { CONTRACT_ADDRESS } from "@/lib/contract";

export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#10140F] text-[#EDEAE0] flex flex-col selection:bg-[#4E9B6F]/30 selection:text-[#EDEAE0]">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section className="relative border-b border-[#2E362C] overflow-hidden py-16 sm:py-24 lg:py-28">
          {/* Subtle industrial grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B211A_1px,transparent_1px),linear-gradient(to_bottom,#1B211A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              {/* Protocol Spec Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#1B211A] border border-[#2E362C] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#4E9B6F] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#4E9B6F] font-semibold">
                  Protocol Specification // ISO 14064 // CPCB 2026 Mandate // Polygon Amoy
                </span>
              </div>

              {/* Primary Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#EDEAE0] leading-[1.08] mb-6">
                Verifiable Circular Economy Infrastructure
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#8B9188] font-sans leading-relaxed mb-10 max-w-2xl">
                Transform industrial scrap into cryptographically audited secondary raw materials. Powered by multi-modal AI computer vision, MCX price discovery oracle, on-chain fraud sentinels, and CPCB EPR compliance automation.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/marketplace"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md hover:shadow-[#4E9B6F]/20"
                >
                  <span>Launch Marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/epr-calculator"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[4px] bg-[#1B211A] hover:bg-[#232B22] border border-[#2E362C] hover:border-[#4E9B6F]/40 text-[#EDEAE0] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  <Calculator className="w-4 h-4 text-[#4E9B6F]" />
                  <span>CPCB EPR Simulator</span>
                </Link>

                <Link
                  href="/verify"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[4px] bg-[#1B211A] hover:bg-[#232B22] border border-[#2E362C] hover:border-[#4E9B6F]/40 text-[#EDEAE0] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  <SearchCheck className="w-4 h-4 text-[#4E9B6F]" />
                  <span>Verify Any Transaction</span>
                </Link>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-[#2E362C]/60 font-mono">
              <div className="p-4 bg-[#1B211A]/60 border border-[#2E362C] rounded-[4px]">
                <span className="text-[10px] uppercase tracking-widest text-[#8B9188] block mb-1">
                  Abatement Formula
                </span>
                <span className="text-sm sm:text-base font-bold text-[#EDEAE0] block">
                  EPA WARM Standard
                </span>
                <span className="text-[10px] text-[#4E9B6F] block mt-0.5">Deterministic 1:1 Math</span>
              </div>

              <div className="p-4 bg-[#1B211A]/60 border border-[#2E362C] rounded-[4px]">
                <span className="text-[10px] uppercase tracking-widest text-[#8B9188] block mb-1">
                  Consensus Network
                </span>
                <span className="text-sm sm:text-base font-bold text-[#EDEAE0] block">
                  Polygon Amoy
                </span>
                <span className="text-[10px] text-[#8B9188] block mt-0.5">Chain ID: 80002</span>
              </div>

              <div className="p-4 bg-[#1B211A]/60 border border-[#2E362C] rounded-[4px]">
                <span className="text-[10px] uppercase tracking-widest text-[#8B9188] block mb-1">
                  AI Architecture
                </span>
                <span className="text-sm sm:text-base font-bold text-[#EDEAE0] block">
                  6-Agent Pipeline
                </span>
                <span className="text-[10px] text-[#4E9B6F] block mt-0.5">Vision + Verifier + Oracle</span>
              </div>

              <div className="p-4 bg-[#1B211A]/60 border border-[#2E362C] rounded-[4px]">
                <span className="text-[10px] uppercase tracking-widest text-[#8B9188] block mb-1">
                  Compliance Output
                </span>
                <span className="text-sm sm:text-base font-bold text-[#EDEAE0] block">
                  CPCB & ISO 14064
                </span>
                <span className="text-[10px] text-[#D98A3D] block mt-0.5">Printable Form 1 Audit Sheet</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. THE INDUSTRIAL PROBLEM VS CIRCULARCHAIN PROTOCOL                      */}
        {/* ========================================================================= */}
        <section className="py-20 border-b border-[#2E362C] bg-[#10140F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#2E362C] gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#4E9B6F] font-semibold block mb-1">
                  System Rationale
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#EDEAE0] tracking-tight">
                  The Problem with Industrial Recycling Today
                </h2>
              </div>
              <p className="text-xs font-mono text-[#8B9188] max-w-md">
                Over 72% of secondary material transactions in developing markets suffer from unverified documentation and carbon greenwashing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Legacy Approach */}
              <div className="p-8 bg-[#1B211A] border border-[#7D3C3C]/40 rounded-[6px]">
                <div className="flex items-center gap-2 mb-4 font-mono text-xs text-[#E57373] uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#E57373]" />
                  <span>Legacy Recycling Supply Chain</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#EDEAE0] mb-4">
                  Manual Slips & Unverified ESG Claims
                </h3>
                <ul className="space-y-3.5 text-sm text-[#8B9188] font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="font-mono text-xs text-[#E57373] mt-0.5">&bull;</span>
                    <span>Paper weighbridge slips easily falsified by scrap aggregators.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-mono text-xs text-[#E57373] mt-0.5">&bull;</span>
                    <span>Double-counting of carbon credits across multiple corporate buyers.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-mono text-xs text-[#E57373] mt-0.5">&bull;</span>
                    <span>Auditors take weeks to verify physical manifests for regulatory compliance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-mono text-xs text-[#E57373] mt-0.5">&bull;</span>
                    <span>Zero visual proof of material purity, contamination, or moisture fraction.</span>
                  </li>
                </ul>
              </div>

              {/* CircularChain Approach */}
              <div className="p-8 bg-[#1B211A] border border-[#4E9B6F]/40 rounded-[6px]">
                <div className="flex items-center gap-2 mb-4 font-mono text-xs text-[#4E9B6F] uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#4E9B6F]" />
                  <span>CircularChain Protocol</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#EDEAE0] mb-4">
                  Autonomous AI Verification + On-Chain Proof
                </h3>
                <ul className="space-y-3.5 text-sm text-[#EDEAE0]/90 font-sans">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4E9B6F] shrink-0 mt-0.5" />
                    <span>Multi-modal GPT-4o vision verifies material purity, recyclability grade, and moisture.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4E9B6F] shrink-0 mt-0.5" />
                    <span>Deterministic EPA WARM emission factors calculate exact kg CO₂ abated.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4E9B6F] shrink-0 mt-0.5" />
                    <span>Every transfer is permanently recorded on Polygon Amoy with on-chain fraud sentinel checks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4E9B6F] shrink-0 mt-0.5" />
                    <span>Instant export of ISO 14064 / Indian CPCB EPR compliance audit certificates.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. 4-STAGE AUTONOMOUS VERIFICATION PIPELINE                              */}
        {/* ========================================================================= */}
        <section className="py-20 border-b border-[#2E362C] bg-[#141A13]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[#4E9B6F] font-semibold block mb-2">
                Execution Workflow
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#EDEAE0] tracking-tight mb-4">
                The 4-Stage Verification Pipeline
              </h2>
              <p className="text-sm text-[#8B9188] font-sans">
                How CircularChain converts a physical specimen photo into a settled, carbon-audited on-chain asset.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stage 1 */}
              <div className="p-6 bg-[#1B211A] border border-[#2E362C] rounded-[6px] hover:border-[#4E9B6F]/50 transition-colors">
                <div className="font-mono text-xs text-[#8B9188] uppercase tracking-widest mb-3 flex items-center justify-between">
                  <span>Stage 01</span>
                  <Cpu className="w-4 h-4 text-[#4E9B6F]" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#EDEAE0] mb-2">
                  AI Vision Classifier
                </h3>
                <p className="text-xs text-[#8B9188] leading-relaxed mb-4">
                  Plant operator uploads specimen photo. Agent 1 analyzes visual density, category, condition grade, and estimates mass in kg.
                </p>
                <div className="p-2.5 bg-[#10140F] border border-[#2E362C] rounded font-mono text-[10px] text-[#4E9B6F]">
                  Agent 1: GPT-4o Multi-Modal
                </div>
              </div>

              {/* Stage 2 */}
              <div className="p-6 bg-[#1B211A] border border-[#2E362C] rounded-[6px] hover:border-[#4E9B6F]/50 transition-colors">
                <div className="font-mono text-xs text-[#8B9188] uppercase tracking-widest mb-3 flex items-center justify-between">
                  <span>Stage 02</span>
                  <Leaf className="w-4 h-4 text-[#4E9B6F]" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#EDEAE0] mb-2">
                  EPA WARM Carbon Math
                </h3>
                <p className="text-xs text-[#8B9188] leading-relaxed mb-4">
                  Applies strict EPA Waste Reduction Model emission factors (e.g. Aluminum 9.13x, PET 1.50x) to calculate net CO₂ abatement.
                </p>
                <div className="p-2.5 bg-[#10140F] border border-[#2E362C] rounded font-mono text-[10px] text-[#4E9B6F]">
                  Formula: Weight &times; Factor (kg CO₂e)
                </div>
              </div>

              {/* Stage 3 */}
              <div className="p-6 bg-[#1B211A] border border-[#2E362C] rounded-[6px] hover:border-[#4E9B6F]/50 transition-colors">
                <div className="font-mono text-xs text-[#8B9188] uppercase tracking-widest mb-3 flex items-center justify-between">
                  <span>Stage 03</span>
                  <ShieldCheck className="w-4 h-4 text-[#D98A3D]" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#EDEAE0] mb-2">
                  Agent 2 Verifier & Audit
                </h3>
                <p className="text-xs text-[#8B9188] leading-relaxed mb-4">
                  Upon purchase request, Agent 2 audits transaction plausibility. Backend verifier signs on-chain transfer on Polygon Amoy.
                </p>
                <div className="p-2.5 bg-[#10140F] border border-[#2E362C] rounded font-mono text-[10px] text-[#D98A3D]">
                  Dual-Wallet Verifier Pattern
                </div>
              </div>

              {/* Stage 4 */}
              <div className="p-6 bg-[#1B211A] border border-[#2E362C] rounded-[6px] hover:border-[#4E9B6F]/50 transition-colors">
                <div className="font-mono text-xs text-[#8B9188] uppercase tracking-widest mb-3 flex items-center justify-between">
                  <span>Stage 04</span>
                  <FileCheck className="w-4 h-4 text-[#4E9B6F]" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#EDEAE0] mb-2">
                  EPR Impact Certificate
                </h3>
                <p className="text-xs text-[#8B9188] leading-relaxed mb-4">
                  Agent 4 generates a formal ISO 14064 legal statement. Buyers can print and export official PDF certificates for regulators.
                </p>
                <div className="p-2.5 bg-[#10140F] border border-[#2E362C] rounded font-mono text-[10px] text-[#4E9B6F]">
                  Agent 4: ISO 14064 Compliance
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ENTERPRISE CAPABILITIES MATRIX (WITH 5 SIH MODULES)                   */}
        {/* ========================================================================= */}
        <section className="py-20 border-b border-[#2E362C] bg-[#10140F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <span className="font-mono text-xs uppercase tracking-widest text-[#4E9B6F] font-semibold block mb-2">
                Enterprise Architecture
              </span>
              <h2 className="font-display text-3xl font-bold text-[#EDEAE0] tracking-tight mb-3">
                Built for Plant Operators, Recyclers & ESG Auditors
              </h2>
              <p className="text-sm text-[#8B9188] font-sans">
                Six deep-tech modules replacing opaque scrap supply chains with real-time verifiable intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-6 bg-[#1B211A] border border-[#2E362C] rounded-[6px]">
                <div className="w-9 h-9 rounded bg-[#10140F] border border-[#2E362C] flex items-center justify-center mb-4 text-[#4E9B6F]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#EDEAE0] mb-2">
                  MCX Scrap Price Oracle & Matchmaker
                </h3>
                <p className="text-xs text-[#8B9188] leading-relaxed">
                  Real-time Indian commodity index pricing (Aluminum ₹215/kg, Copper ₹760/kg) with carbon haul penalty optimization.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 bg-[#1B211A] border border-[#2E362C] rounded-[6px]">
                <div className="w-9 h-9 rounded bg-[#10140F] border border-[#2E362C] flex items-center justify-center mb-4 text-[#4E9B6F]">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#EDEAE0] mb-2">
                  Visual Contamination & Quality Heatmap
                </h3>
                <p className="text-xs text-[#8B9188] leading-relaxed">
                  GPT-4o Vision optical density scanner evaluating clean fraction %, contamination impurities, and moisture levels.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 bg-[#1B211A] border border-[#2E362C] rounded-[6px]">
                <div className="w-9 h-9 rounded bg-[#10140F] border border-[#2E362C] flex items-center justify-center mb-4 text-[#4E9B6F]">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#EDEAE0] mb-2">
                  CPCB Corporate EPR Liability Simulator
                </h3>
                <p className="text-xs text-[#8B9188] leading-relaxed">
                  Simulate mandatory Indian EPR obligations under 2026 rules with 1-click Form 1 compliance audit export.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 bg-[#1B211A] border border-[#2E362C] rounded-[6px]">
                <div className="w-9 h-9 rounded bg-[#10140F] border border-[#2E362C] flex items-center justify-center mb-4 text-[#E57373]">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#EDEAE0] mb-2">
                  On-Chain Fraud Sentinel & Anomaly Radar
                </h3>
                <p className="text-xs text-[#8B9188] leading-relaxed">
                  Detects circular wash trading, legal gross vehicle weight limits (&gt;35MT), and EPA WARM baseline variance anomalies.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-6 bg-[#1B211A] border border-[#2E362C] rounded-[6px]">
                <div className="w-9 h-9 rounded bg-[#10140F] border border-[#2E362C] flex items-center justify-center mb-4 text-[#D98A3D]">
                  <Mic className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#EDEAE0] mb-2">
                  Multilingual Indic Voice & Chat Ingestion
                </h3>
                <p className="text-xs text-[#8B9188] leading-relaxed">
                  Ground aggregators can speak Hindi or Hinglish to automatically extract scrap material, mass, and location into on-chain lots.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-6 bg-[#1B211A] border border-[#2E362C] rounded-[6px]">
                <div className="w-9 h-9 rounded bg-[#10140F] border border-[#2E362C] flex items-center justify-center mb-4 text-[#4E9B6F]">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#EDEAE0] mb-2">
                  Polygon Amoy Blockchain Verification
                </h3>
                <p className="text-xs text-[#8B9188] leading-relaxed">
                  Every lot transaction is cryptographically signed and stored with immutable proof on the Polygon testnet ledger.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CALL TO ACTION SECTION                                                 */}
        {/* ========================================================================= */}
        <section className="py-20 bg-[#141A13] relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="p-10 sm:p-14 bg-[#1B211A] border border-[#2E362C] rounded-[8px] relative overflow-hidden">
              <span className="font-mono text-xs uppercase tracking-widest text-[#4E9B6F] font-semibold block mb-3">
                Automate India &bull; NIET 2026 Chapter
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#EDEAE0] tracking-tight mb-4">
                Experience the Autonomous Verifiable Ledger
              </h2>
              <p className="text-sm text-[#8B9188] max-w-xl mx-auto font-sans mb-8 leading-relaxed">
                Explore live tokenized lots, simulate corporate CPCB EPR offsets, or list new materials using Hindi voice commands.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/marketplace"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-md"
                >
                  <span>Enter Marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/epr-calculator"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#10140F] hover:bg-[#232B22] border border-[#2E362C] text-[#EDEAE0] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  <Calculator className="w-4 h-4 text-[#4E9B6F]" />
                  <span>Simulate EPR Compliance</span>
                </Link>

                <Link
                  href="/list"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#10140F] hover:bg-[#232B22] border border-[#2E362C] text-[#EDEAE0] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#4E9B6F]" />
                  <span>List Specimen Lot</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Manifest Footer */}
      <footer className="border-t border-[#2E362C] bg-[#10140F] py-8 text-center font-mono text-xs text-[#8B9188]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4E9B6F]" />
            <span>CircularChain Industrial Protocol</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#4E9B6F] transition-colors">
              Overview
            </Link>
            <span>&bull;</span>
            <Link href="/marketplace" className="hover:text-[#4E9B6F] transition-colors">
              Marketplace
            </Link>
            <span>&bull;</span>
            <Link href="/epr-calculator" className="hover:text-[#4E9B6F] transition-colors">
              EPR Simulator
            </Link>
            <span>&bull;</span>
            <Link href="/verify" className="hover:text-[#4E9B6F] transition-colors">
              Verify On-Chain
            </Link>
            <span>&bull;</span>
            <Link href="/leaderboard" className="hover:text-[#4E9B6F] transition-colors">
              Leaderboard
            </Link>
          </div>
          <div className="text-[10px]">ISO 14064 / EPA WARM Emission Abatement Standard &bull; CPCB Rules 2026</div>
        </div>
      </footer>
    </div>
  );
}
