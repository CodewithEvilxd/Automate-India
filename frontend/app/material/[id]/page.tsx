"use client";

import { useState, useEffect, use } from "react";
import { ethers } from "ethers";
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
    setVerificationStep("Connecting MetaMask wallet to sign request...");

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
            dark: "#10140F",
            light: "#EDEAE0",
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
      <div className="min-h-screen bg-[#10140F] text-[#EDEAE0] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 font-mono text-xs text-[#8B9188]">
            <Loader2 className="animate-spin w-8 h-8 text-[#4E9B6F]" />
            <span>Decrypting on-chain manifest lot #{id}...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-[#10140F] text-[#EDEAE0] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Boxes className="w-12 h-12 text-[#8B9188] mb-4 opacity-50" />
          <h2 className="font-display text-xl font-bold text-[#EDEAE0] mb-2">
            Material Specimen Not Found
          </h2>
          <p className="text-[#8B9188] text-sm mb-6 max-w-sm">
            Lot #{id} does not exist in the circular economy ledger or has been archived.
          </p>
          <Link
            href="/marketplace"
            className="px-4 py-2 rounded-[4px] bg-[#232B22] border border-[#2E362C] text-[#EDEAE0] font-mono text-xs uppercase hover:bg-[#2E362C] transition-colors"
          >
            &larr; Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const isTransferred = material.status === "transferred" || success;

  return (
    <div className="min-h-screen bg-[#10140F] text-[#EDEAE0] flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="mb-6">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#8B9188] hover:text-[#4E9B6F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Industrial Marketplace</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image, Manifest Specs, Heatmap (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] overflow-hidden relative">
              <div className="aspect-[4/3] bg-[#10140F] relative overflow-hidden">
                {material.image_url ? (
                  <img
                    src={material.image_url}
                    alt={material.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#8B9188] manifest-grid">
                    <Boxes className="w-12 h-12 opacity-40" />
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <CategoryBadge category={material.category} />
                </div>

                {isTransferred && (
                  <div className="absolute inset-0 bg-[#10140F]/60 backdrop-blur-[2px] flex items-center justify-center p-4">
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

              <div className="p-3 bg-[#232B22] border-t border-[#2E362C] flex items-center justify-between font-mono text-[11px] text-[#8B9188]">
                <span>IPFS Pin: {material.ipfs_hash ? `${material.ipfs_hash.substring(0, 10)}...` : "Available"}</span>
                <span className="text-[#4E9B6F]">SPECIMEN VALIDATED</span>
              </div>
            </div>

            {/* Feature 2: Visual Contamination Heatmap */}
            <ContaminationHeatmap
              purityPercentage={97.2}
              contaminationType="Minor surface dust and light organic residues"
              contaminationPercentage={2.8}
              recyclabilityGrade="Grade A+ (Remelt Quality)"
              moistureLevel="Low (<1%)"
            />

            {/* Manifest Specs Card */}
            <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#2E362C] pb-2.5">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-[#4E9B6F]" />
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#EDEAE0] font-semibold">
                    On-Chain Lot Manifest
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-[#8B9188]">
                  POLYGON AMOY
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#8B9188]">Lot Reference:</span>
                  <span className="font-bold text-[#EDEAE0]">#{material.id}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#8B9188]">Current Owner:</span>
                  <div className="flex items-center gap-1.5">
                    <WalletBadge address={material.owner_wallet} reputationScore={3} />
                    <Link
                      href={`/org/${material.owner_wallet}`}
                      className="text-[#4E9B6F] hover:underline text-[11px] font-mono"
                    >
                      (View Org)
                    </Link>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#8B9188]">Logistics Hub:</span>
                  <span className="text-[#EDEAE0] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#4E9B6F]" />
                    {material.location || "Noida, UP"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#8B9188]">Ledger Status:</span>
                  <span
                    className={`font-semibold uppercase ${
                      isTransferred ? "text-[#4E9B6F]" : "text-[#D98A3D]"
                    }`}
                  >
                    {isTransferred ? "Settled (Transferred)" : "Open For Recycling"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#8B9188]">Smart Contract:</span>
                  <span className="text-[#8B9188] text-[11px]">MaterialRegistry.sol</span>
                </div>
              </div>
            </div>

            {/* Feature 4: On-Chain Fraud Sentinel Badge */}
            <FraudSentinelBadge
              fromWallet={material.owner_wallet}
              toWallet="0x90F79bf6EB2c4f870365E785982E1f101E93b906"
              weightKg={material.estimated_weight_kg}
              claimedCo2={material.co2_saved_kg}
              category={material.category}
            />
          </div>

          {/* Right Column: Title, Metrics, Price Oracle, Transfer Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="border-b border-[#2E362C] pb-5 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-[#4E9B6F] uppercase tracking-wider font-semibold">
                    Verified Industrial Lot
                  </span>
                  <span className="text-[#8B9188]">&bull;</span>
                  <span className="font-mono text-xs text-[#8B9188]">
                    Listed: {new Date(material.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEAE0] mb-3">
                  {material.title}
                </h1>
                <p className="text-[#8B9188] text-sm leading-relaxed font-sans">
                  {material.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-[#1B211A] border border-[#2E362C] rounded-[4px] p-3.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8B9188] block mb-1">
                    Category
                  </span>
                  <span className="font-mono text-sm font-bold text-[#EDEAE0] block truncate">
                    {material.category}
                  </span>
                </div>

                <div className="bg-[#1B211A] border border-[#2E362C] rounded-[4px] p-3.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8B9188] block mb-1">
                    Lot Mass
                  </span>
                  <span className="font-mono text-sm font-bold text-[#EDEAE0] block">
                    {material.estimated_weight_kg} kg
                  </span>
                </div>

                <div className="bg-[#1B211A] border border-[#2E362C] rounded-[4px] p-3.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8B9188] block mb-1">
                    Condition
                  </span>
                  <span className="font-mono text-sm font-bold text-[#EDEAE0] block">
                    {material.condition}
                  </span>
                </div>

                <div className="bg-[#1B211A] border border-[#4E9B6F]/40 bg-[#4E9B6F]/5 rounded-[4px] p-3.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#4E9B6F] block mb-1">
                    CO₂ Abated
                  </span>
                  <span className="font-mono text-sm font-bold text-[#4E9B6F] block font-data">
                    +{material.co2_saved_kg?.toFixed(1)} kg
                  </span>
                </div>
              </div>

              {/* Feature 1: AI Matchmaking & MCX Scrap Price Oracle */}
              <div className="mb-6">
                <MatchmakingCard
                  category={material.category}
                  weightKg={material.estimated_weight_kg}
                  location={material.location || "Noida, UP"}
                />
              </div>

              <div className="p-4 rounded-[4px] bg-[#1B211A] border border-[#2E362C] mb-6 flex items-start gap-3">
                <Leaf className="w-5 h-5 text-[#4E9B6F] shrink-0 mt-0.5" />
                <div className="font-mono text-xs text-[#8B9188] space-y-1">
                  <p className="text-[#EDEAE0] font-semibold">
                    Deterministic EPA WARM Carbon Abatement
                  </p>
                  <p>
                    Emissions savings are verified using fixed standard factors rather than generative estimates, ensuring defensible EPR compliance audit documentation.
                  </p>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-[#1B211A] border border-[#D98A3D] text-[#D98A3D] p-4 rounded-[4px] font-mono text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {!isTransferred && (
              <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#4E9B6F]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#EDEAE0] font-bold">
                      Ownership Transfer & ESG Minting
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#4E9B6F]">
                    AGENT 2 AUDIT
                  </span>
                </div>

                <p className="text-[#8B9188] text-xs font-sans">
                  Clicking request transfer will invoke AI Agent 2 to independently verify lot specifications before calling <code className="text-[#4E9B6F]">verifyAndTransfer()</code> on the Polygon blockchain.
                </p>

                {verifying && (
                  <div className="p-3 bg-[#10140F] border border-[#4E9B6F]/40 rounded-[4px] font-mono text-xs text-[#EDEAE0] flex items-center gap-3 animate-pulse">
                    <Loader2 className="animate-spin w-4 h-4 text-[#4E9B6F]" />
                    <span>{verificationStep}</span>
                  </div>
                )}

                <button
                  onClick={requestTransfer}
                  disabled={verifying}
                  className="w-full flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider font-bold py-4 px-6 rounded-[4px] bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(78,155,111,0.25)]"
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
              <div className="bg-[#1B211A] border-2 border-[#4E9B6F] rounded-[6px] p-6 shadow-2xl relative overflow-hidden space-y-5">
                <div className="absolute right-4 top-4 opacity-15 pointer-events-none">
                  <VerificationStamp txHash={txHash} size="lg" rotation={12} />
                </div>

                <div className="flex items-center justify-between border-b border-[#2E362C] pb-3">
                  <div className="flex items-center gap-2.5">
                    <FileCheck className="w-5 h-5 text-[#4E9B6F]" />
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#EDEAE0]">
                        Official Impact Certificate
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#4E9B6F]">
                        EPR COMPLIANCE AUDIT RECORD
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#4E9B6F] px-2 py-1 rounded bg-[#232B22] border border-[#4E9B6F]/40 font-bold">
                    AI Confidence: {aiConfidence || 98}%
                  </span>
                </div>

                <div className="bg-[#10140F] p-4 rounded-[4px] border border-[#2E362C] font-sans text-xs text-[#EDEAE0] leading-relaxed italic">
                  "{certificate || `This official EPR Impact Certificate confirms the on-chain transfer and responsible recycling diversion of ${material.estimated_weight_kg} kg of ${material.category} material, achieving a deterministic carbon abatement of ${material.co2_saved_kg?.toFixed(1)} kg CO2e pursuant to EPA WARM methodologies.`}"
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                  <div className="space-y-1.5 w-full sm:w-auto">
                    <div className="text-[#8B9188] text-[11px]">
                      Ledger Hash:
                    </div>
                    <a
                      href={`https://amoy.polygonscan.com/tx/${txHash || "0x..."}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#4E9B6F] hover:underline font-bold text-xs"
                    >
                      <span className="truncate max-w-[200px]">
                        {txHash || "0x9a4f20bc...onchain"}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {qrCodeDataUrl && (
                    <div className="flex items-center gap-3 bg-[#10140F] p-2.5 rounded-[4px] border border-[#2E362C]">
                      <img
                        src={qrCodeDataUrl}
                        alt="On-Chain Verification QR"
                        className="w-16 h-16 rounded-[2px]"
                      />
                      <div className="text-[10px] text-[#8B9188] font-mono leading-tight">
                        <span className="text-[#EDEAE0] font-bold block mb-1">
                          Scan to Audit
                        </span>
                        <span>Instant Polygonscan validation</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#2E362C] flex items-center justify-between">
                  <button
                    onClick={() => setIsReportOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-[#232B22] hover:bg-[#2E362C] border border-[#2E362C] text-[#EDEAE0] font-mono text-xs uppercase font-bold transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#4E9B6F]" />
                    <span>Print EPR Audit PDF</span>
                  </button>

                  <Link
                    href={`/verify`}
                    className="font-mono text-xs text-[#4E9B6F] hover:underline flex items-center gap-1"
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
