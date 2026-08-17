"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Download,
  QrCode,
  CheckCircle2,
  Shield,
  Sparkles,
  Layers,
  X,
  ExternalLink,
  Cpu,
  Globe2,
} from "lucide-react";

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApkDownloadModal({ isOpen, onClose }: ApkDownloadModalProps) {
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloadStarted(true);
    const link = document.createElement("a");
    link.href = "/circularchain.apk";
    link.download = "CircularChain-v2.4.0.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadStarted(false), 6000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0E1117] border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Glowing Top Banner */}
        <div className="relative bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-purple-500/20 px-6 py-5 border-b border-zinc-200 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-500 dark:text-emerald-400 shadow-inner">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-extrabold text-lg text-zinc-900 dark:text-white tracking-tight">
                    CircularChain Mobile App
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    v2.4.0 APK
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                  AI Optical Vision Scanner · Multilingual Indic Voice · On-Chain Polygon Amoy
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-200/60 dark:bg-white/10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Direct Download & QR Code Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Direct APK Download Card */}
            <div className="flex flex-col justify-between p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Download className="w-4 h-4 text-emerald-500" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Direct APK Install
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
                  Download the compiled Android release package directly to your computer or Android phone.
                </p>
              </div>

              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
              >
                {downloadStarted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Downloading APK...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download APK (32 MB)
                  </>
                )}
              </button>
            </div>

            {/* QR Code Scan Card */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 text-center">
              <div className="flex items-center gap-2 mb-2">
                <QrCode className="w-4 h-4 text-sky-500" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Scan to Install
                </span>
              </div>

              {/* QR Code SVG / Visual Box */}
              <div className="w-28 h-28 p-2 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center mb-2">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://circularchain.in/circularchain.apk"
                  alt="QR Code for APK Download"
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                Scan with phone camera
              </span>
            </div>
          </div>

          {/* Key Features Matrix */}
          <div className="p-4 rounded-2xl bg-zinc-100/70 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.06]">
            <h4 className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Mobile Native Capabilities
            </h4>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>AI Vision Specimen Scanner</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Indic Voice NLP Ingestion</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Real-Time MCX Scrap Oracle</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Form 1 CPCB EPR Engine</span>
              </div>
            </div>
          </div>

          {/* Security & Installation Guide */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 pt-1 border-t border-zinc-200 dark:border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>SHA-256 Verified Release</span>
            </div>
            <span>Android 8.0 (API 26+) & Above</span>
          </div>
        </div>
      </div>
    </div>
  );
}
