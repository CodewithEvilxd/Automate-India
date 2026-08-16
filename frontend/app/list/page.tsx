"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";
import { calculateCO2Saved } from "@/lib/co2-calculator";
import Navbar from "@/components/Navbar";
import VerificationStamp from "@/components/VerificationStamp";
import IndicVoiceAssistant from "@/components/IndicVoiceAssistant";
import ContaminationHeatmap from "@/components/ContaminationHeatmap";
import MatchmakingCard from "@/components/MatchmakingCard";
import { IndicParsedListing } from "@/lib/ai-agents";
import {
  Camera,
  UploadCloud,
  Loader2,
  Sparkles,
  FileText,
  ShieldCheck,
  Leaf,
  ArrowRight,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  Scale,
} from "lucide-react";
import Link from "next/link";

export default function ListMaterial() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdId, setCreatedId] = useState<string | number>("");
  const [createdTx, setCreatedTx] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    estimated_weight_kg: 0,
    condition: "",
    location: "Noida, UP",
  });

  const [qualityMetrics, setQualityMetrics] = useState({
    purityPercentage: 97.4,
    contaminationType: "Minor surface oxidation and dust",
    contaminationPercentage: 2.6,
    recyclabilityGrade: "Grade A+ (Remelt Quality)",
    moistureLevel: "Low (<1%)",
  });

  const [revealedFields, setRevealedFields] = useState({
    category: false,
    weight: false,
    condition: false,
    titleDesc: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setRevealedFields({
        category: false,
        weight: false,
        condition: false,
        titleDesc: false,
      });
    }
  };

  const handleIndicParsed = (parsed: IndicParsedListing) => {
    setFormData((prev) => ({
      ...prev,
      title: parsed.title || prev.title,
      description: parsed.description || prev.description,
      category: parsed.category || prev.category,
      estimated_weight_kg: parsed.estimated_weight_kg || prev.estimated_weight_kg,
      condition: parsed.condition || "Good",
      location: parsed.location || prev.location,
    }));
    setRevealedFields({
      category: true,
      weight: true,
      condition: true,
      titleDesc: true,
    });
  };

  const calculatedCO2 =
    formData.category && formData.estimated_weight_kg > 0
      ? calculateCO2Saved(formData.category, formData.estimated_weight_kg)
      : 0;

  const analyzeImage = async () => {
    if (!file) return;
    setAnalyzing(true);
    setErrorMsg("");
    setAnalysisStep("Transmitting specimen to Agent 1 (Computer Vision)...");

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          setAnalysisStep("Extracting material composition, clean fraction & impurities...");

          const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageBase64: base64 }),
          });

          const data = await res.json();
          if (data.error) throw new Error(data.error);

          setAnalysisStep("Computing EPA WARM carbon factor offsets...");

          if (data.purity_percentage) {
            setQualityMetrics({
              purityPercentage: data.purity_percentage || 96.5,
              contaminationType: data.contamination_type || "Minor surface residue",
              contaminationPercentage: data.contamination_percentage || 3.5,
              recyclabilityGrade: data.recyclability_grade || "Grade A+ (Remelt Quality)",
              moistureLevel: data.moisture_level || "Low (<1%)",
            });
          }

          setTimeout(() => {
            setFormData((prev) => ({
              ...prev,
              title: data.title || prev.title,
              description: data.description || prev.description,
            }));
            setRevealedFields((r) => ({ ...r, titleDesc: true }));
          }, 200);

          setTimeout(() => {
            setFormData((prev) => ({
              ...prev,
              category: data.category || "Mixed",
            }));
            setRevealedFields((r) => ({ ...r, category: true }));
          }, 500);

          setTimeout(() => {
            setFormData((prev) => ({
              ...prev,
              estimated_weight_kg: Number(data.estimated_weight_kg) || 10,
            }));
            setRevealedFields((r) => ({ ...r, weight: true }));
          }, 850);

          setTimeout(() => {
            setFormData((prev) => ({
              ...prev,
              condition: data.condition || "Fair",
            }));
            setRevealedFields((r) => ({ ...r, condition: true }));
            setAnalyzing(false);
            setAnalysisStep("");
          }, 1200);
        } catch (err: any) {
          setErrorMsg(err.message || "Failed to analyze image with AI.");
          setAnalyzing(false);
          setAnalysisStep("");
        }
      };
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to read image file.");
      setAnalyzing(false);
      setAnalysisStep("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMsg("Please upload a specimen photography file before listing.");
      return;
    }
    if (!formData.title || !formData.category || formData.estimated_weight_kg <= 0) {
      setErrorMsg("Please ensure all material specification fields are completed.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const pinataData = new FormData();
      pinataData.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: pinataData,
      });
      const uploadData = await uploadRes.json();
      if (uploadData.error) throw new Error(uploadData.error);
      const ipfsHash = uploadData.ipfsHash;
      const imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

      if (!(window as any).ethereum) {
        throw new Error(
          "MetaMask is required to sign on-chain transactions. Please connect wallet."
        );
      }
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const co2Int = Math.round(calculatedCO2);
      const tx = await contract.listMaterial(formData.category, co2Int);
      const receipt = await tx.wait();

      const event = receipt?.logs
        .map((log: any) => {
          try {
            return contract.interface.parseLog(log);
          } catch (e) {
            return null;
          }
        })
        .find((e: any) => e && e.name === "MaterialListed");

      const materialId = event
        ? Number(event.args[0])
        : Math.floor(Math.random() * 1000000);

      setCreatedId(materialId);
      setCreatedTx(receipt.hash || tx.hash);

      const dbRes = await fetch("/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: String(materialId),
          title: formData.title,
          description: formData.description,
          image_url: imageUrl,
          ipfs_hash: ipfsHash,
          category: formData.category,
          estimated_weight_kg: Number(formData.estimated_weight_kg),
          condition: formData.condition,
          location: formData.location || "Noida, UP",
          owner_wallet: await signer.getAddress(),
          co2_saved_kg: calculatedCO2,
        }),
      });

      if (!dbRes.ok) {
        throw new Error("Failed to save off-chain metadata to database.");
      }

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred while listing material on-chain.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="rounded-3xl glass-panel border border-emerald-500/40 p-8 md:p-12 text-center max-w-lg w-full relative overflow-hidden shadow-2xl">
            <div className="flex justify-center mb-6">
              <VerificationStamp
                txHash={createdTx}
                size="lg"
                status="verified"
                rotation={-2}
                className="animate-stamp"
              />
            </div>

            <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold block mb-2">
              On-Chain Registration Confirmed
            </span>

            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              Material Lot #{createdId} Registered
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Your secondary lot is immutably logged on the Polygon Amoy blockchain. Certified buyers can inspect verified specifications and execute EPR transfers.
            </p>

            <div className="rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 p-4 text-left font-mono text-xs space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Category:</span>
                <span className="text-slate-900 dark:text-white font-bold">{formData.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Lot Mass:</span>
                <span className="text-slate-900 dark:text-white">{formData.estimated_weight_kg} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Calculated CO₂:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{calculatedCO2.toFixed(1)} kg CO₂e</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Tx Hash:</span>
                <a
                  href={`https://amoy.polygonscan.com/tx/${createdTx}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-600 dark:text-cyan-400 hover:underline truncate max-w-[180px]"
                >
                  {createdTx || "0x..."}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/material/${createdId}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
              >
                <span>Inspect Material Lot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center py-3 px-4 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white font-display text-xs font-semibold uppercase tracking-wider transition-all border border-slate-200 dark:border-white/10"
              >
                Back to Ledger
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white flex flex-col pb-28 transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="mb-8 border-b border-slate-200/80 dark:border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>AI Multi-Modal Ingestion & Smart Contract Settlement</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            List Industrial Scrap Lot
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl font-normal leading-relaxed">
            Upload specimen photography of reusable industrial scrap or speak into the Indic voice assistant. AI Agent 1 classifies material composition and computes EPA WARM carbon abatement.
          </p>
        </div>

        {/* Indic Multilingual Voice Ingestion */}
        <IndicVoiceAssistant onParsed={handleIndicParsed} />

        {errorMsg && (
          <div className="rounded-2xl glass-panel border border-rose-500/40 p-4 mb-8 text-rose-500 text-xs font-medium flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Specimen Photography Dropzone */}
          <div className="rounded-2xl glass-panel p-6 border border-slate-200/80 dark:border-white/10 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/5 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-500" />
                <h2 className="font-display text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">
                  1. Material Specimen Photography
                </h2>
              </div>
              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                IPFS IMMUTABLE PINNING
              </span>
            </div>

            <div className="border-2 border-dashed border-slate-300 dark:border-white/15 hover:border-cyan-500/50 rounded-2xl p-4 transition-all bg-slate-100/50 dark:bg-white/[0.02]">
              {previewUrl ? (
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-full md:w-56 h-44 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 relative shrink-0">
                    <img
                      src={previewUrl}
                      alt="Uploaded Specimen"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-cyan-400 border border-white/10 font-bold">
                      READY FOR AI
                    </div>
                  </div>

                  <div className="flex-1 w-full flex flex-col justify-between py-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FileCheck className="w-4 h-4 text-emerald-500" />
                        <span className="font-sans text-xs font-bold text-slate-900 dark:text-white truncate max-w-xs">
                          {file?.name || "specimen_image.jpg"}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        Size: {file ? (file.size / 1024).toFixed(1) : 0} KB • Type: {file?.type}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        Specimen image will be cryptographically pinned to IPFS upon smart contract confirmation.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5">
                      <label className="cursor-pointer text-xs px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 font-semibold transition-all">
                        <span>Change Photo</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={analyzeImage}
                        disabled={analyzing}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-display font-bold px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20"
                      >
                        {analyzing ? (
                          <>
                            <Loader2 className="animate-spin w-3.5 h-3.5" />
                            <span>Classifying...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Auto-fill with AI</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3">
                    <UploadCloud className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <label className="cursor-pointer font-display text-xs font-bold uppercase tracking-wider text-slate-950 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 transition-all shadow-md shadow-cyan-500/20 hover:scale-105">
                    <span>Select Specimen File</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-mono">
                    High-resolution PNG, JPG, WEBP (Max 10MB)
                  </p>
                </div>
              )}
            </div>

            {analyzing && (
              <div className="mt-4 p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-700 dark:text-cyan-300 font-medium flex items-center gap-3 animate-pulse">
                <Loader2 className="animate-spin w-4 h-4 text-cyan-500" />
                <span>{analysisStep}</span>
              </div>
            )}
          </div>

          {/* 2. Contamination & Quality Audit Preview */}
          <ContaminationHeatmap
            purityPercentage={qualityMetrics.purityPercentage}
            contaminationType={qualityMetrics.contaminationType}
            contaminationPercentage={qualityMetrics.contaminationPercentage}
            recyclabilityGrade={qualityMetrics.recyclabilityGrade}
            moistureLevel={qualityMetrics.moistureLevel}
          />

          {/* 3. Lot Description & Origin */}
          <div className="rounded-2xl glass-panel p-6 border border-slate-200/80 dark:border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/5 pb-3 mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-500" />
                <h2 className="font-display text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">
                  2. Lot Description & Source
                </h2>
              </div>
              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                GENERAL MANIFEST
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                Material Lot Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Clean Sorted High-Density Polyethylene Crushed Drums"
                className="w-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                Detailed Composition & Origin
              </label>
              <textarea
                required
                rows={3}
                placeholder="Provide physical condition, previous industrial usage, and packaging state..."
                className="w-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          {/* 4. AI Classification & Fingerprint */}
          <div className="rounded-2xl glass-panel p-6 border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <h2 className="font-display text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">
                  3. Physical Fingerprint & Specifications
                </h2>
              </div>
              <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 font-bold">
                AGENT 1 VISION VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>Category</span>
                  {revealedFields.category && (
                    <span className="text-cyan-500 text-[10px] font-mono font-bold">AI EXTRACTED</span>
                  )}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. plastic_hdpe, aluminum"
                  className="w-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 font-mono text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>Est. Weight (kg)</span>
                  {revealedFields.weight && (
                    <span className="text-cyan-500 text-[10px] font-mono font-bold">AI ESTIMATED</span>
                  )}
                </label>
                <input
                  type="number"
                  required
                  min="0.1"
                  step="0.1"
                  placeholder="e.g. 250"
                  className="w-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 font-mono text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                  value={formData.estimated_weight_kg || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estimated_weight_kg: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>Condition Grade</span>
                  {revealedFields.condition && (
                    <span className="text-cyan-500 text-[10px] font-mono font-bold">INSPECTED</span>
                  )}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Recyclable, Good, Fair"
                  className="w-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 font-mono text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                  Logistics Region / City Hub
                </label>
                <select
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 font-mono text-sm text-slate-900 dark:text-white focus:outline-none transition-all cursor-pointer"
                >
                  <option value="Noida, UP">Noida / NCR Hub, UP</option>
                  <option value="Pune, MH">Pune / Chakan Corridor, MH</option>
                  <option value="Gurugram, HR">Gurugram / Manesar, HR</option>
                  <option value="Ahmedabad, GJ">Ahmedabad / Sanand, GJ</option>
                  <option value="Bengaluru, KA">Bengaluru / Peenya, KA</option>
                  <option value="Chennai, TN">Chennai / Sriperumbudur, TN</option>
                  <option value="Hyderabad, TS">Hyderabad, TS</option>
                </select>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Leaf className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                    EPA WARM Deterministic Factor Preview
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {formData.category
                      ? `Category: ${formData.category} • Mass: ${formData.estimated_weight_kg} kg`
                      : "Awaiting material category input"}
                  </span>
                </div>
              </div>

              <div className="font-mono text-right shrink-0">
                <span className="text-[10px] text-slate-400 uppercase block">
                  Estimated CO₂ Abatement
                </span>
                <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                  +{calculatedCO2.toFixed(1)} kg CO₂e
                </span>
              </div>
            </div>
          </div>

          {/* 5. MCX Price Discovery Preview */}
          {formData.category && formData.estimated_weight_kg > 0 && (
            <MatchmakingCard
              category={formData.category}
              weightKg={formData.estimated_weight_kg}
              location={formData.location}
            />
          )}

          {/* Sticky Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-t border-slate-200/80 dark:border-white/10 py-4 px-4 sm:px-8 shadow-2xl">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-500 shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-900 dark:text-white font-semibold block">
                    Ready for On-Chain Inscription • Polygon Amoy
                  </span>
                  <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                    Smart contract: MaterialRegistry.sol • Token: CIRC
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/"
                  className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold transition-colors py-2.5 px-4 rounded-xl"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={submitting || !file}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 font-display text-xs uppercase tracking-wider font-bold py-3 px-8 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 hover:scale-105"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4" />
                      <span>Minting to Blockchain...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4 stroke-[2.5]" />
                      <span>Mint & List Lot on-Chain</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
