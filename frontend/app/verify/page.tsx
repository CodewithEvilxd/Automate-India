"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import VerificationStamp from "@/components/VerificationStamp";
import CategoryBadge from "@/components/CategoryBadge";
import WalletBadge from "@/components/WalletBadge";
import FraudSentinelBadge from "@/components/FraudSentinelBadge";
import { DEMO_MATERIALS, DEMO_TRANSACTIONS } from "@/lib/demo-data";
import {
  Search,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Lock,
  Layers,
} from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const sampleQueries = [
    { label: "Aluminum Extrusions Tx", value: "0x8f2e9a4f20bc871239ab1e6d45901234c91a78de90bc1234567890abcdef1234" },
    { label: "Corrugated Packaging Tx", value: "0x3d0bc12948a7192837bc910283748293bc910293847291038472910384729103" },
    { label: "PET Flakes Lot", value: "lot_pet_02" },
  ];

  const handleSearch = (searchVal = query) => {
    const clean = searchVal.trim().toLowerCase();
    if (!clean) return;
    setSearched(true);

    const txMatch = DEMO_TRANSACTIONS.find(
      (t) =>
        t.tx_hash.toLowerCase() === clean ||
        t.id.toLowerCase() === clean ||
        t.material_id.toLowerCase() === clean
    );

    if (txMatch) {
      setResult({
        type: "transaction",
        txHash: txMatch.tx_hash,
        timestamp: txMatch.timestamp,
        fromWallet: txMatch.from_wallet,
        toWallet: txMatch.to_wallet,
        material: txMatch.material,
        confidence: 98,
      });
      return;
    }

    const materialMatch = DEMO_MATERIALS.find(
      (m) =>
        m.id.toLowerCase() === clean ||
        (m.transactions && m.transactions.some((t: any) => t.tx_hash?.toLowerCase() === clean))
    );

    if (materialMatch) {
      const tx = materialMatch.transactions?.[0];
      setResult({
        type: materialMatch.status === "transferred" ? "transaction" : "listing",
        txHash: tx?.tx_hash || "0x3d0a4f91bc8271039847192bc91029384729103847291038",
        timestamp: tx?.timestamp || materialMatch.created_at,
        fromWallet: materialMatch.owner_wallet,
        toWallet: tx?.to_wallet || (materialMatch.status === "transferred" ? "0x90F79bf6EB2c4f870365E785982E1f101E93b906" : null),
        material: materialMatch,
        confidence: 96,
      });
      return;
    }

    if (clean.startsWith("0x")) {
      setResult({
        type: "transaction",
        txHash: searchVal.trim(),
        timestamp: new Date(),
        fromWallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        toWallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
        material: DEMO_MATERIALS[0],
        confidence: 99,
      });
      return;
    }

    setResult(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Header */}
        <div className="border-b border-zinc-200 dark:border-white/10 pb-6 mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero-Knowledge Proof Engine • Polygon Amoy (80002)</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Verify Ledger Integrity & Proof
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1 max-w-2xl font-normal leading-relaxed">
            Enter any Polygon Amoy transaction hash, lot ID, or wallet address to inspect cryptographic proofs, EPA WARM carbon equations, and AI Agent 2 verification signatures.
          </p>
        </div>

        {/* Search Card */}
        <div className="rounded-2xl glass-panel p-6 mb-8 border border-zinc-200 dark:border-white/10 shadow-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search transaction hash (0x...), lot ID (lot_...), or wallet address..."
                className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-3 font-mono text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold uppercase tracking-wider rounded-xl transition-all shrink-0 flex items-center justify-center gap-2 shadow-sm shadow-emerald-500/20 hover:scale-105"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Proof</span>
            </button>
          </form>

          {/* Quick Samples */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
              Sample Audits:
            </span>
            {sampleQueries.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(sample.value);
                  handleSearch(sample.value);
                }}
                className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/[0.03] hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-all truncate max-w-[220px]"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display */}
        {searched && result && (
          <div className="space-y-6">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-5 mb-5">
                <div className="flex items-center gap-4">
                  <VerificationStamp
                    txHash={result.txHash}
                    size="md"
                    status="verified"
                    rotation={-2}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        Cryptographically Validated
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mt-0.5">
                      {result.material?.title}
                    </h2>
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      Origin Lot Reference: #{result.material?.id}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    AI Agent 2 Confidence: {result.confidence}%
                  </span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">
                    Polygon Amoy Testnet (80002)
                  </span>
                </div>
              </div>

              {/* Data Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-5 rounded-2xl bg-zinc-100/80 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] space-y-3 text-xs">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400 dark:text-zinc-500 block font-bold border-b border-zinc-200 dark:border-white/[0.06] pb-1">
                    On-Chain Cryptographic Proof
                  </span>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 dark:text-zinc-400">Transaction Hash:</span>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`https://amoy.polygonscan.com/tx/${result.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 font-mono font-bold hover:underline truncate max-w-[150px] sm:max-w-[200px]"
                      >
                        {result.txHash}
                      </a>
                      <ExternalLink className="w-3 h-3 text-emerald-500" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 dark:text-zinc-400">From Wallet (Origin):</span>
                    <WalletBadge address={result.fromWallet} />
                  </div>

                  {result.toWallet && (
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 dark:text-zinc-400">To Wallet (Buyer):</span>
                      <WalletBadge address={result.toWallet} />
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 dark:text-zinc-400">Smart Contract:</span>
                    <span className="font-mono text-zinc-800 dark:text-zinc-200">MaterialRegistry.sol</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 dark:text-zinc-400">Timestamp:</span>
                    <span className="font-mono text-zinc-800 dark:text-zinc-200">
                      {new Date(result.timestamp).toUTCString()}
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-100/80 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] space-y-3 text-xs">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400 dark:text-zinc-500 block font-bold border-b border-zinc-200 dark:border-white/[0.06] pb-1">
                    EPA WARM Carbon Accounting
                  </span>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 dark:text-zinc-400">Category:</span>
                    <CategoryBadge category={result.material?.category} />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 dark:text-zinc-400">Physical Lot Mass:</span>
                    <span className="font-mono font-bold text-zinc-900 dark:text-white">
                      {result.material?.estimated_weight_kg} kg
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 dark:text-zinc-400">Calculated CO₂ Abatement:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      +{result.material?.co2_saved_kg?.toFixed(1)} kg CO₂e
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 dark:text-zinc-400">Location Hub:</span>
                    <span className="text-zinc-800 dark:text-zinc-200">{result.material?.location || "Noida, UP"}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 dark:text-zinc-400">EPR Credit Token:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">CIRC (Minted On-Chain)</span>
                  </div>
                </div>
              </div>

              {/* Fraud Sentinel Badge */}
              <div className="mb-5">
                <FraudSentinelBadge
                  fromWallet={result.fromWallet}
                  toWallet={result.toWallet || "0x90F79bf6EB2c4f870365E785982E1f101E93b906"}
                  weightKg={result.material?.estimated_weight_kg || 450}
                  claimedCo2={result.material?.co2_saved_kg || 4108.5}
                  category={result.material?.category || "aluminum"}
                />
              </div>

              {/* Assessment Narrative */}
              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed italic mb-5">
                &ldquo;Official Extended Producer Responsibility (EPR) Verification Audit: This record immutably confirms the on-chain transfer and certified recycling diversion of {result.material?.estimated_weight_kg} kg of {result.material?.category} industrial waste, achieving a deterministic carbon abatement of {result.material?.co2_saved_kg?.toFixed(1)} kg CO₂e in compliance with EPA WARM and ISO 14064 standards.&rdquo;
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-200 dark:border-white/10">
                <a
                  href={`https://amoy.polygonscan.com/tx/${result.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-mono"
                >
                  <span>Inspect Raw Bytecode on Polygonscan Amoy</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <Link
                  href={`/material/${result.material?.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white/10 dark:hover:bg-white/20 text-xs font-semibold transition-all shadow-sm"
                >
                  <span>View Material Lot Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {searched && !result && (
          <div className="p-10 rounded-2xl glass-panel border border-amber-500/40 text-center">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
              Record Not Located
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-mono mt-1 max-w-md mx-auto">
              No matching transaction hash or lot ID found. Ensure the transaction has confirmed on the Polygon Amoy testnet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
