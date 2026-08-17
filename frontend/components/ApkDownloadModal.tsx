"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Download,
  QrCode,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  X,
  Cpu,
  Layers,
  ArrowDownToLine,
  Mic,
  Zap,
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

    setTimeout(() => setDownloadStarted(false), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#0C0D12] text-white border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Header */}
        <div className="p-6 pb-4 flex items-start justify-between border-b border-white/[0.08]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 shadow-inner">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg tracking-tight text-white">
                  CircularChain for Android
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  v2.4.0
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                AI Vision Scrap Grading · Indic Voice · Polygon Amoy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.06] hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {/* Direct Download & QR Code Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Left Card: One-Click Download */}
            <div className="flex flex-col justify-between p-4.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 transition-all">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                  <ArrowDownToLine className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct Install</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Universal Android release package with hardware acceleration.
                </p>
              </div>

              <div>
                <div className="text-[11px] font-mono text-zinc-500 mb-2 flex items-center justify-between">
                  <span>File size:</span>
                  <span className="text-zinc-300 font-semibold">49.1 MB</span>
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
                >
                  {downloadStarted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download APK</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Card: Scan QR Code */}
            <div className="flex flex-col items-center justify-center p-4.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                <span>Scan with Camera</span>
              </div>

              {/* QR Image Box */}
              <div className="w-28 h-28 p-2 bg-white rounded-xl shadow-md flex items-center justify-center mb-2">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://circularchain.in/circularchain.apk"
                  alt="Download APK QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="text-[10px] font-mono text-zinc-500">
                Instant install on your phone
              </span>
            </div>
          </div>

          {/* Native Mobile Capabilities */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2.5 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-amber-400" /> Core Capabilities
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">AI Vision Scanner</span>
              </div>
              <div className="flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Indic Voice NLP</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">MCX Scrap Oracle</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">CPCB Form 1 Ledger</span>
              </div>
            </div>
          </div>

          {/* Security & OS Info Footer */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SHA-256 Signed Release</span>
            </div>
            <span>Android 8.0+ Supported</span>
          </div>
        </div>
      </div>
    </div>
  );
}
