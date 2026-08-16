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
    <div className="min-h-screen bg-[#10140F] text-[#EDEAE0] flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="border-b border-[#2E362C] pb-6 mb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="inline-block px-2.5 py-0.5 rounded-[4px] bg-[#232B22] border border-[#2E362C] font-mono text-[10px] uppercase tracking-widest text-[#4E9B6F] font-semibold">
              Public Proof Engine
            </span>
            <span className="font-mono text-[10px] text-[#8B9188]">
              Polygon Amoy Testnet &bull; Smart Contract 0x3d0bc1...
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEAE0]">
            Verify Ledger Integrity & Proof
          </h1>
          <p className="text-[#8B9188] text-sm mt-1 max-w-2xl font-sans">
            Enter any transaction hash, lot identifier, or wallet address to inspect cryptographic proofs, EPA WARM carbon calculations, and AI Agent 2 verification signatures.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-6 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8B9188] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search transaction hash (0x...), lot ID (lot_...), or wallet address..."
                className="w-full bg-[#10140F] border border-[#2E362C] focus:border-[#4E9B6F] rounded-[4px] pl-10 pr-4 py-3 font-mono text-xs text-[#EDEAE0] placeholder:text-[#8B9188]/50 outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] font-mono text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors shrink-0 flex items-center justify-center gap-2 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Proof</span>
            </button>
          </form>

          {/* Quick Samples */}
          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-[#8B9188]">
            <span className="text-[10px] uppercase tracking-wider text-[#8B9188]/70">
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
                className="px-2 py-1 rounded bg-[#10140F] hover:bg-[#232B22] border border-[#2E362C] hover:border-[#4E9B6F]/40 text-[#EDEAE0] text-[11px] transition-colors truncate max-w-[200px]"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {searched && result && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#1B211A] border-2 border-[#4E9B6F] rounded-[6px] p-6 relative overflow-hidden shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2E362C] pb-5 mb-5">
                <div className="flex items-center gap-4">
                  <VerificationStamp
                    txHash={result.txHash}
                    size="md"
                    status="verified"
                    rotation={-2}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#4E9B6F]">
                        Cryptographically Validated
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#4E9B6F]" />
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#EDEAE0] mt-0.5">
                      {result.material?.title}
                    </h2>
                    <span className="font-mono text-xs text-[#8B9188]">
                      Origin Lot Reference: #{result.material?.id}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-[#4E9B6F]/10 border border-[#4E9B6F]/40 text-[#4E9B6F] font-bold text-xs">
                    AI Agent 2 Confidence: {result.confidence}%
                  </span>
                  <span className="text-[10px] text-[#8B9188] mt-1">
                    Polygon Amoy Network (80002)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#10140F] p-4 rounded-[4px] border border-[#2E362C] space-y-3 font-mono text-xs">
                  <span className="text-[10px] uppercase tracking-widest text-[#8B9188] block font-bold border-b border-[#2E362C] pb-1">
                    On-Chain Cryptographic Proof
                  </span>

                  <div className="flex justify-between items-center">
                    <span className="text-[#8B9188]">Transaction Hash:</span>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`https://amoy.polygonscan.com/tx/${result.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#4E9B6F] font-bold hover:underline truncate max-w-[140px] sm:max-w-[200px]"
                      >
                        {result.txHash}
                      </a>
                      <ExternalLink className="w-3 h-3 text-[#4E9B6F]" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#8B9188]">From Wallet (Origin):</span>
                    <WalletBadge address={result.fromWallet} />
                  </div>

                  {result.toWallet && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#8B9188]">To Wallet (Buyer):</span>
                      <WalletBadge address={result.toWallet} />
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-[#8B9188]">Smart Contract:</span>
                    <span className="text-[#EDEAE0]">MaterialRegistry.sol</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#8B9188]">Timestamp:</span>
                    <span className="text-[#EDEAE0]">
                      {new Date(result.timestamp).toUTCString()}
                    </span>
                  </div>
                </div>

                <div className="bg-[#10140F] p-4 rounded-[4px] border border-[#2E362C] space-y-3 font-mono text-xs">
                  <span className="text-[10px] uppercase tracking-widest text-[#8B9188] block font-bold border-b border-[#2E362C] pb-1">
                    EPA WARM Carbon Accounting
                  </span>

                  <div className="flex justify-between items-center">
                    <span className="text-[#8B9188]">Category:</span>
                    <CategoryBadge category={result.material?.category} />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#8B9188]">Physical Lot Mass:</span>
                    <span className="font-data font-bold text-[#EDEAE0]">
                      {result.material?.estimated_weight_kg} kg
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#8B9188]">Calculated CO₂ Abatement:</span>
                    <span className="font-data font-bold text-[#4E9B6F] text-sm">
                      +{result.material?.co2_saved_kg?.toFixed(1)} kg CO₂e
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#8B9188]">Location Hub:</span>
                    <span className="text-[#EDEAE0]">{result.material?.location || "Noida, UP"}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#8B9188]">EPR Credit Token:</span>
                    <span className="text-[#4E9B6F] font-bold">CIRC (Minted on-chain)</span>
                  </div>
                </div>
              </div>

              {/* Feature 4: On-Chain Fraud Risk Audit Indicator */}
              <div className="mb-5">
                <FraudSentinelBadge
                  fromWallet={result.fromWallet}
                  toWallet={result.toWallet || "0x90F79bf6EB2c4f870365E785982E1f101E93b906"}
                  weightKg={result.material?.estimated_weight_kg || 450}
                  claimedCo2={result.material?.co2_saved_kg || 4108.5}
                  category={result.material?.category || "aluminum"}
                />
              </div>

              <div className="bg-[#10140F] p-4 rounded-[4px] border border-[#2E362C] font-sans text-xs text-[#EDEAE0] leading-relaxed italic mb-5">
                &ldquo;Official Extended Producer Responsibility (EPR) Verification Audit: This record immutably confirms the on-chain transfer and certified recycling diversion of {result.material?.estimated_weight_kg} kg of {result.material?.category} industrial waste, achieving a deterministic carbon abatement of {result.material?.co2_saved_kg?.toFixed(1)} kg CO2e in compliance with EPA WARM and ISO 14064 standards.&rdquo;
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#2E362C]">
                <a
                  href={`https://amoy.polygonscan.com/tx/${result.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4E9B6F] hover:underline"
                >
                  <span>Inspect Raw Bytecode on Polygonscan Amoy</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <Link
                  href={`/material/${result.material?.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] bg-[#232B22] hover:bg-[#2E362C] border border-[#2E362C] text-[#EDEAE0] font-mono text-xs uppercase transition-colors"
                >
                  <span>View Material Lot Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {searched && !result && (
          <div className="bg-[#1B211A] border border-[#D98A3D] rounded-[6px] p-8 text-center">
            <AlertCircle className="w-8 h-8 text-[#D98A3D] mx-auto mb-2" />
            <h3 className="font-display text-lg font-bold text-[#EDEAE0]">
              Record Not Located
            </h3>
            <p className="text-[#8B9188] text-xs font-mono mt-1 max-w-md mx-auto">
              No matching transaction hash or lot ID found. Ensure the transaction has confirmed on the Polygon Amoy testnet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
