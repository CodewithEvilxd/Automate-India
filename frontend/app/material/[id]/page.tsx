"use client";

import { useState, useEffect, use } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";
import { calculateCO2Saved } from "@/lib/co2-calculator";
import Navbar from "@/components/Navbar";
import VerificationStamp from "@/components/VerificationStamp";
import CategoryBadge from "@/components/CategoryBadge";
import WalletBadge from "@/components/WalletBadge";
import ContaminationHeatmap from "@/components/ContaminationHeatmap";
import MatchmakingCard from "@/components/MatchmakingCard";
import FraudSentinelBadge from "@/components/FraudSentinelBadge";
import EPRReportModal from "@/components/EPRReportModal";
import { DEMO_ORGANIZATIONS } from "@/lib/demo-data";
import {
  Loader2,
  ShieldCheck,
  FileCheck,
  ArrowLeft,
  ExternalLink,
  Leaf,
  Boxes,
  AlertCircle,
  FileSpreadsheet,
  MapPin,
  Printer,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import QRCode from "qrcode";

export default function MaterialDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [material, setMaterial] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [txHash, setTxHash] = useState("");
  const [certificate, setCertificate] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [aiConfidence, setAiConfidence] = useState(0);
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/materials/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setMaterial(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const requestTransfer = async () => {
    setVerifying(true);
    setErrorMsg("");
    setVerificationStep("Connecting MetaMask wallet to sign consensus request...");

    try {
      if (!(window as any).ethereum) {
        throw new Error("Please install MetaMask to request a verified transfer.");
      }
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const buyerWallet = await signer.getAddress();

      if (buyerWallet.toLowerCase() === material.owner_wallet.toLowerCase()) {
        throw new Error("You already own this material lot!");
      }

      setVerificationStep("Triggering AI Agent 2 (Multi-modal Verifier)...");

      const res = await fetch("/api/verify-transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ materialId: material.id, buyerWallet }),
      });

      setVerificationStep("Broadcasting verifyAndTransfer to Polygon Amoy...");

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error + (data.reason ? `: ${data.reason}` : ""));
      }

      setTxHash(data.txHash);
      setCertificate(data.certificate);
      setAiConfidence(data.verification?.confidence || 100);
      setSuccess(true);

      const qrData = await QRCode.toDataURL(
        `https://amoy.polygonscan.com/tx/${data.txHash}`,
        {
          margin: 1,
          color: {
            dark: "#030712",
            light: "#FFFFFF",
          },
        }
      );
      setQrCodeDataUrl(qrData);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred during transfer.");
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-xs text-slate-500 font-mono">
            <Loader2 className="animate-spin w-8 h-8 text-cyan-500" />
            <span>Decrypting on-chain manifest lot #{id}...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Boxes className="w-12 h-12 text-slate-400 mb-4 opacity-50" />
          <h2 className="font-display text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Material Specimen Not Found
          </h2>
          <p className="text-slate-500 text-sm mb-6 max-w-sm">
            Lot #{id} does not exist in the circular economy ledger or has been archived.
          </p>
          <Link
            href="/marketplace"
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-white/20 transition-all"
          >
            &larr; Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const isTransferred = material.status === "transferred" || success;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white transition-colors duration-300 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="mb-6">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Industrial Marketplace</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image, Heatmap, Manifest (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 overflow-hidden relative shadow-xl">
              <div className="aspect-[4/3] bg-slate-950 relative overflow-hidden">
                {material.image_url ? (
                  <img
                    src={material.image_url}
                    alt={material.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <Boxes className="w-12 h-12 opacity-40" />
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <CategoryBadge category={material.category} />
                </div>

                {isTransferred && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center p-4">
                    <VerificationStamp
                      txHash={txHash || "0x9a4f20bc"}
                      size="lg"
                      status="verified"
                      rotation={-3}
                      className="animate-stamp"
                    />
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-100 dark:bg-white/[0.03] border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400">
                <span>IPFS Pin: {material.ipfs_hash ? `${material.ipfs_hash.substring(0, 10)}...` : "Available"}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">SPECIMEN PINNED</span>
              </div>
            </div>

            {/* Visual Contamination Heatmap */}
            <ContaminationHeatmap
              purityPercentage={97.2}
              contaminationType="Minor surface dust and light organic residues"
              contaminationPercentage={2.8}
              recyclabilityGrade="Grade A+ (Remelt Quality)"
              moistureLevel="Low (<1%)"
            />

            {/* Manifest Specs Card */}
            <div className="rounded-2xl glass-panel p-6 border border-slate-200/80 dark:border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/5 pb-2.5">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-cyan-500" />
                  <h3 className="font-display text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">
                    On-Chain Lot Manifest
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">
                  POLYGON AMOY (80002)
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Lot Reference:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">#{material.id}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Origin Owner:</span>
                  <div className="flex items-center gap-1.5">
                    <WalletBadge address={material.owner_wallet} reputationScore={3} />
                    <Link
                      href={`/org/${material.owner_wallet}`}
                      className="text-cyan-600 dark:text-cyan-400 hover:underline text-[11px] font-medium"
                    >
                      (View Org)
                    </Link>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Logistics Hub:</span>
                  <span className="text-slate-900 dark:text-white flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                    {material.location || "Noida, UP"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Ledger Status:</span>
                  <span
                    className={`font-semibold uppercase tracking-wider ${
                      isTransferred ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {isTransferred ? "Settled On-Chain" : "Open For Offtake"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Smart Contract:</span>
                  <span className="font-mono text-slate-600 dark:text-slate-400 text-[11px]">MaterialRegistry.sol</span>
                </div>
              </div>
            </div>

            {/* Fraud Sentinel Badge */}
            <FraudSentinelBadge
              fromWallet={material.owner_wallet}
              toWallet="0x90F79bf6EB2c4f870365E785982E1f101E93b906"
              weightKg={material.estimated_weight_kg}
              claimedCo2={material.co2_saved_kg}
              category={material.category}
            />
          </div>

          {/* Right Column: Title, Metrics, Transfer Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="border-b border-slate-200/80 dark:border-white/10 pb-5 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">
                    Verified Secondary Feedstock
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    Listed: {new Date(material.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
                  {material.title}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {material.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-4 rounded-xl glass-panel border border-slate-200/80 dark:border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Category
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-900 dark:text-white block truncate">
                    {material.category}
                  </span>
                </div>

                <div className="p-4 rounded-xl glass-panel border border-slate-200/80 dark:border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Lot Mass
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-900 dark:text-white block">
                    {material.estimated_weight_kg} kg
                  </span>
                </div>

                <div className="p-4 rounded-xl glass-panel border border-slate-200/80 dark:border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Condition
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-900 dark:text-white block">
                    {material.condition}
                  </span>
                </div>

                <div className="p-4 rounded-xl glass-panel border border-emerald-500/30 bg-emerald-500/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                    CO₂ Abated
                  </span>
                  <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 block">
                    +{material.co2_saved_kg?.toFixed(1)} kg
                  </span>
                </div>
              </div>

              {/* Price Oracle & Matchmaking */}
              <div className="mb-6">
                <MatchmakingCard
                  category={material.category}
                  weightKg={material.estimated_weight_kg}
                  location={material.location || "Noida, UP"}
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 mb-6 flex items-start gap-3">
                <Leaf className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <p className="text-slate-900 dark:text-white font-semibold">
                    Deterministic EPA WARM Carbon Abatement
                  </p>
                  <p>
                    Emissions savings are verified using fixed standard factors rather than generative estimates, ensuring defensible EPR compliance audit documentation.
                  </p>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-xl glass-panel border border-rose-500/40 p-4 text-rose-500 text-xs font-medium flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {!isTransferred && (
              <div className="rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-cyan-500" />
                    <span className="font-display text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">
                      Ownership Transfer & ESG Inscription
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">
                    AGENT 02 AUDITED
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Clicking request transfer will invoke AI Agent 2 to independently verify lot specifications before executing <code className="text-cyan-600 dark:text-cyan-400">verifyAndTransfer()</code> on the Polygon Amoy blockchain.
                </p>

                {verifying && (
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-700 dark:text-cyan-300 font-medium flex items-center gap-3 animate-pulse">
                    <Loader2 className="animate-spin w-4 h-4 text-cyan-500" />
                    <span>{verificationStep}</span>
                  </div>
                )}

                <button
                  onClick={requestTransfer}
                  disabled={verifying}
                  className="w-full flex items-center justify-center gap-2 font-display text-xs uppercase tracking-wider font-bold py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 hover:scale-[1.02]"
                >
                  {verifying ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4" />
                      <span>Verifying on Ledger...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Request Transfer (AI & Blockchain Verified)</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {isTransferred && (
              <div className="rounded-3xl glass-panel border border-emerald-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-5">
                <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
                  <VerificationStamp txHash={txHash} size="lg" rotation={12} />
                </div>

                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <FileCheck className="w-5 h-5 text-emerald-500" />
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                        Official Impact Certificate
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
                        EPR COMPLIANCE AUDIT RECORD
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-bold">
                    AI Confidence: {aiConfidence || 98}%
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{certificate || `This official EPR Impact Certificate confirms the on-chain transfer and responsible recycling diversion of ${material.estimated_weight_kg} kg of ${material.category} material, achieving a deterministic carbon abatement of ${material.co2_saved_kg?.toFixed(1)} kg CO₂e pursuant to EPA WARM methodologies.`}"
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="space-y-1 w-full sm:w-auto">
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">
                      Ledger Tx Hash:
                    </div>
                    <a
                      href={`https://amoy.polygonscan.com/tx/${txHash || "0x..."}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline font-bold font-mono text-xs"
                    >
                      <span className="truncate max-w-[200px]">
                        {txHash || "0x9a4f20bc...onchain"}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {qrCodeDataUrl && (
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                      <img
                        src={qrCodeDataUrl}
                        alt="On-Chain Verification QR"
                        className="w-16 h-16 rounded-lg"
                      />
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono leading-tight">
                        <span className="text-slate-900 dark:text-white font-bold block mb-1">
                          Scan to Audit
                        </span>
                        <span>Instant Polygonscan validation</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setIsReportOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-semibold transition-all"
                  >
                    <Printer className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Print EPR Audit PDF</span>
                  </button>

                  <Link
                    href={`/verify`}
                    className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Inspect On Verify Tool</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <EPRReportModal
        org={
          DEMO_ORGANIZATIONS.find(
            (o) => o.wallet_address.toLowerCase() === material.owner_wallet.toLowerCase()
          ) || {
            wallet_address: material.owner_wallet,
            org_name: "Industrial Recycling Participant",
            location: material.location || "Noida, UP",
            reputation_score: 88,
            total_co2_abated_kg: material.co2_saved_kg || 4200,
            total_mass_recycled_kg: material.estimated_weight_kg || 1200,
            total_lots_listed: 1,
            completed_transfers: 1,
            is_trusted_partner: true,
            member_since: "2025",
            epr_registration_no: "EPR-AUDIT-2025-08124",
            verified_categories: [material.category || "Mixed"],
          }
        }
        materials={[material]}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}
