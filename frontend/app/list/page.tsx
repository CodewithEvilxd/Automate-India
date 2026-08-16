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
    setAnalysisStep("Transmitting image to Agent 1 (Vision Classifier)...");

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;

          setAnalysisStep("Vision model extracting material category & mass...");

          const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageBase64: base64 }),
          });

          const data = await res.json();
          if (data.error) throw new Error(data.error);

          setAnalysisStep("Applying EPA WARM carbon factor calculations...");

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
      setErrorMsg("Please upload a specimen photo before listing.");
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
          "MetaMask is required to sign on-chain transactions. Please install MetaMask."
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
      <div className="min-h-screen bg-[#10140F] text-[#EDEAE0] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-[#1B211A] border border-[#4E9B6F] p-8 md:p-12 rounded-[6px] text-center max-w-lg w-full relative overflow-hidden shadow-2xl">
            <div className="flex justify-center mb-6">
              <VerificationStamp
                txHash={createdTx}
                size="lg"
                status="verified"
                rotation={-2}
                className="animate-stamp"
              />
            </div>

            <span className="font-mono text-xs uppercase tracking-widest text-[#4E9B6F] font-bold block mb-2">
              On-Chain Registration Confirmed
            </span>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#EDEAE0] mb-3">
              Material Lot #{createdId} Registered
            </h2>

            <p className="text-[#8B9188] text-sm mb-6 leading-relaxed">
              Your material is now immutably logged on the Polygon Amoy blockchain. Buyers can inspect the verified specifications and initiate EPR-compliant transfer.
            </p>

            <div className="bg-[#10140F] border border-[#2E362C] rounded-[4px] p-4 text-left font-mono text-xs space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-[#8B9188]">Category:</span>
                <span className="text-[#EDEAE0] font-bold">{formData.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B9188]">Lot Mass:</span>
                <span className="text-[#EDEAE0]">{formData.estimated_weight_kg} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B9188]">Calculated CO₂:</span>
                <span className="text-[#4E9B6F] font-bold">+{calculatedCO2.toFixed(1)} kg CO₂e</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B9188]">Tx Hash:</span>
                <a
                  href={`https://amoy.polygonscan.com/tx/${createdTx}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4E9B6F] hover:underline truncate max-w-[180px]"
                >
                  {createdTx || "0x..."}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/material/${createdId}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[4px] bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] font-mono text-xs uppercase font-bold tracking-wider transition-colors"
              >
                <span>Inspect Material Lot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center py-3 px-4 rounded-[4px] bg-[#232B22] hover:bg-[#2E362C] text-[#EDEAE0] font-mono text-xs uppercase tracking-wider transition-colors border border-[#2E362C]"
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
    <div className="min-h-screen bg-[#10140F] text-[#EDEAE0] flex flex-col pb-28">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="mb-8 border-b border-[#2E362C] pb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-[#8B9188] mb-2">
            <Link href="/" className="hover:text-[#4E9B6F] transition-colors">
              Overview
            </Link>
            <span>/</span>
            <Link href="/marketplace" className="hover:text-[#4E9B6F] transition-colors">
              Marketplace
            </Link>
            <span>/</span>
            <span className="text-[#EDEAE0]">New Material Entry</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEAE0]">
            List Industrial Material
          </h1>
          <p className="text-[#8B9188] text-sm mt-1 max-w-2xl font-sans">
            Upload specimen photography of reusable industrial scrap or use the multilingual Indic voice assistant. AI Agent 1 classifies material composition and computes EPA WARM carbon abatement.
          </p>
        </div>

        {/* Feature 5: Indic Multilingual Voice Ingestion */}
        <IndicVoiceAssistant onParsed={handleIndicParsed} />

        {errorMsg && (
          <div className="bg-[#1B211A] border border-[#D98A3D] text-[#D98A3D] p-4 rounded-[4px] mb-8 font-mono text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-6">
            <div className="flex items-center justify-between border-b border-[#2E362C] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#4E9B6F]" />
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#EDEAE0] font-semibold">
                  1. Material Specimen Photography
                </h2>
              </div>
              <span className="font-mono text-[10px] text-[#8B9188]">
                IPFS IMMUTABLE STORAGE
              </span>
            </div>

            <div className="border-2 border-dashed border-[#2E362C] hover:border-[#4E9B6F]/60 rounded-[4px] p-4 transition-colors bg-[#10140F]/60 relative">
              {previewUrl ? (
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-full md:w-56 h-44 bg-[#10140F] rounded-[4px] overflow-hidden border border-[#2E362C] relative shrink-0">
                    <img
                      src={previewUrl}
                      alt="Uploaded Specimen"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-[#10140F]/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-mono text-[#4E9B6F] border border-[#2E362C]">
                      READY FOR AI
                    </div>
                  </div>

                  <div className="flex-1 w-full flex flex-col justify-between py-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FileCheck className="w-4 h-4 text-[#4E9B6F]" />
                        <span className="font-mono text-xs font-bold text-[#EDEAE0] truncate max-w-xs">
                          {file?.name || "specimen_image.jpg"}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-[#8B9188]">
                        Size: {file ? (file.size / 1024).toFixed(1) : 0} KB &bull; Type: {file?.type}
                      </p>
                      <p className="text-xs text-[#8B9188] mt-2 font-sans">
                        Image will be pinned to IPFS via Pinata protocol upon transaction confirmation.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#2E362C]">
                      <label className="cursor-pointer font-mono text-xs px-3 py-1.5 rounded-[4px] bg-[#232B22] hover:bg-[#2E362C] text-[#EDEAE0] border border-[#2E362C] transition-colors">
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
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold px-4 py-1.5 rounded-[4px] bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] transition-all disabled:opacity-50 shadow-[0_0_12px_rgba(78,155,111,0.2)]"
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
                <div className="py-10 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-dashed border-[#2E362C] bg-[#1B211A] flex items-center justify-center mb-3">
                    <UploadCloud className="w-5 h-5 text-[#4E9B6F]" />
                  </div>
                  <label className="cursor-pointer font-mono text-xs font-bold uppercase tracking-wider text-[#4E9B6F] hover:text-[#64B587] px-4 py-2 rounded-[4px] bg-[#232B22] border border-[#2E362C] transition-colors">
                    <span>Select Specimen File</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="font-mono text-[11px] text-[#8B9188] mt-2">
                    Supports high-resolution PNG, JPG, WEBP (Max 10MB)
                  </p>
                </div>
              )}
            </div>

            {analyzing && (
              <div className="mt-4 p-3 rounded-[4px] bg-[#232B22] border border-[#4E9B6F]/40 font-mono text-xs text-[#EDEAE0] flex items-center gap-3 animate-pulse">
                <Loader2 className="animate-spin w-4 h-4 text-[#4E9B6F]" />
                <span>{analysisStep}</span>
              </div>
            )}
          </div>

          {/* Feature 2: Contamination & Quality Audit Preview */}
          <ContaminationHeatmap
            purityPercentage={qualityMetrics.purityPercentage}
            contaminationType={qualityMetrics.contaminationType}
            contaminationPercentage={qualityMetrics.contaminationPercentage}
            recyclabilityGrade={qualityMetrics.recyclabilityGrade}
            moistureLevel={qualityMetrics.moistureLevel}
          />

          <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#2E362C] pb-3 mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#4E9B6F]" />
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#EDEAE0] font-semibold">
                  2. Lot Description & Origin
                </h2>
              </div>
              <span className="font-mono text-[10px] text-[#8B9188]">
                GENERAL INFORMATION
              </span>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#8B9188] mb-1.5">
                Material Lot Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Clean Sorted High-Density Polyethylene Crushed Drums"
                className={`w-full bg-[#10140F] border rounded-[4px] px-3.5 py-2.5 text-sm text-[#EDEAE0] placeholder:text-[#8B9188]/40 focus:outline-none focus:border-[#4E9B6F] transition-colors ${
                  revealedFields.titleDesc ? "border-[#4E9B6F]/60" : "border-[#2E362C]"
                }`}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#8B9188] mb-1.5">
                Detailed Composition & Source
              </label>
              <textarea
                required
                rows={3}
                placeholder="Provide physical condition, previous industrial usage, and packaging state..."
                className={`w-full bg-[#10140F] border rounded-[4px] px-3.5 py-2.5 text-sm text-[#EDEAE0] placeholder:text-[#8B9188]/40 focus:outline-none focus:border-[#4E9B6F] transition-colors ${
                  revealedFields.titleDesc ? "border-[#4E9B6F]/60" : "border-[#2E362C]"
                }`}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#2E362C] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4E9B6F]" />
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#EDEAE0] font-semibold">
                  3. AI Classification & Physical Fingerprint
                </h2>
              </div>
              <span className="font-mono text-[10px] text-[#4E9B6F] px-2 py-0.5 rounded bg-[#232B22] border border-[#2E362C]">
                AGENT 1 VISION ENGINE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#8B9188] mb-1.5 flex items-center justify-between">
                  <span>Material Category</span>
                  {revealedFields.category && (
                    <span className="text-[#4E9B6F] text-[10px]">AI EXTRACTED</span>
                  )}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. plastic_hdpe, aluminum"
                  className={`w-full bg-[#10140F] border rounded-[4px] px-3.5 py-2.5 font-mono text-sm text-[#EDEAE0] focus:outline-none focus:border-[#4E9B6F] transition-colors ${
                    revealedFields.category ? "border-[#4E9B6F] text-[#4E9B6F]" : "border-[#2E362C]"
                  }`}
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#8B9188] mb-1.5 flex items-center justify-between">
                  <span>Est. Weight (kg)</span>
                  {revealedFields.weight && (
                    <span className="text-[#4E9B6F] text-[10px]">AI ESTIMATED</span>
                  )}
                </label>
                <input
                  type="number"
                  required
                  min="0.1"
                  step="0.1"
                  placeholder="e.g. 250"
                  className={`w-full bg-[#10140F] border rounded-[4px] px-3.5 py-2.5 font-mono text-sm text-[#EDEAE0] focus:outline-none focus:border-[#4E9B6F] transition-colors ${
                    revealedFields.weight ? "border-[#4E9B6F] text-[#EDEAE0]" : "border-[#2E362C]"
                  }`}
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
                <label className="block font-mono text-xs uppercase tracking-wider text-[#8B9188] mb-1.5 flex items-center justify-between">
                  <span>Condition Grade</span>
                  {revealedFields.condition && (
                    <span className="text-[#4E9B6F] text-[10px]">INSPECTED</span>
                  )}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Recyclable, Good, Fair"
                  className={`w-full bg-[#10140F] border rounded-[4px] px-3.5 py-2.5 font-mono text-sm text-[#EDEAE0] focus:outline-none focus:border-[#4E9B6F] transition-colors ${
                    revealedFields.condition ? "border-[#4E9B6F]" : "border-[#2E362C]"
                  }`}
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#8B9188] mb-1.5">
                  Logistics Region / City Hub
                </label>
                <select
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full bg-[#10140F] border border-[#2E362C] focus:border-[#4E9B6F] rounded-[4px] px-3.5 py-2.5 font-mono text-sm text-[#EDEAE0] focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Noida, UP">Noida / NCR, UP</option>
                  <option value="Pune, MH">Pune / Mumbai, MH</option>
                  <option value="Gurugram, HR">Gurugram / Manesar, HR</option>
                  <option value="Ahmedabad, GJ">Ahmedabad / Sanand, GJ</option>
                  <option value="Bengaluru, KA">Bengaluru / Peenya, KA</option>
                  <option value="Chennai, TN">Chennai / Sriperumbudur, TN</option>
                  <option value="Hyderabad, TS">Hyderabad, TS</option>
                </select>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-[4px] bg-[#10140F] border border-[#2E362C] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Leaf className="w-5 h-5 text-[#4E9B6F] shrink-0" />
                <div>
                  <span className="font-mono text-xs font-semibold text-[#EDEAE0] block">
                    EPA WARM Deterministic Factor Preview
                  </span>
                  <span className="font-mono text-[11px] text-[#8B9188]">
                    {formData.category
                      ? `Category: ${formData.category} &bull; Mass: ${formData.estimated_weight_kg} kg`
                      : "Awaiting material category input"}
                  </span>
                </div>
              </div>

              <div className="font-mono text-right shrink-0">
                <span className="text-[10px] text-[#8B9188] uppercase block">
                  Estimated CO₂ Abatement
                </span>
                <span className="text-sm md:text-base font-bold text-[#4E9B6F]">
                  +{calculatedCO2.toFixed(1)} kg CO₂e
                </span>
              </div>
            </div>
          </div>

          {/* Feature 1: AI Matchmaking & MCX Price Discovery Preview */}
          {formData.category && formData.estimated_weight_kg > 0 && (
            <MatchmakingCard
              category={formData.category}
              weightKg={formData.estimated_weight_kg}
              location={formData.location}
            />
          )}

          <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1B211A]/95 backdrop-blur-md border-t border-[#2E362C] py-4 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#4E9B6F] shrink-0" />
                <div className="font-mono text-xs">
                  <span className="text-[#EDEAE0] font-semibold block">
                    Ready for On-Chain Minting &bull; Polygon Amoy
                  </span>
                  <span className="text-[#8B9188] text-[11px]">
                    Smart contract: MaterialRegistry &bull; Token: CIRC
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/"
                  className="font-mono text-xs text-[#8B9188] hover:text-[#EDEAE0] transition-colors py-2.5 px-4 rounded-[4px]"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={submitting || !file}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider font-bold py-3 px-8 rounded-[4px] bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(78,155,111,0.25)]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4" />
                      <span>Minting to Blockchain...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>List Material Lot</span>
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
