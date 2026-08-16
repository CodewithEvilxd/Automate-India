"use client";

import React from "react";
import { ShieldCheck, AlertTriangle, Droplets, CheckCircle2, Layers } from "lucide-react";

interface ContaminationHeatmapProps {
  purityPercentage?: number;
  contaminationType?: string;
  contaminationPercentage?: number;
  recyclabilityGrade?: string;
  moistureLevel?: string;
}

export default function ContaminationHeatmap({
  purityPercentage = 97.4,
  contaminationType = "Minor surface dust and light oxidation",
  contaminationPercentage = 2.6,
  recyclabilityGrade = "Grade A+ (Remelt Quality)",
  moistureLevel = "Low (<1%)",
}: ContaminationHeatmapProps) {
  const isHighQuality = purityPercentage >= 90;

  return (
    <div className="rounded-2xl glass-panel p-6 border border-zinc-200 dark:border-white/10 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.06] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-500" />
          <span className="font-display text-xs uppercase tracking-wider text-zinc-900 dark:text-white font-bold">
            Optical Contamination & Quality Audit
          </span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
            isHighQuality
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
          }`}
        >
          {recyclabilityGrade}
        </span>
      </div>

      {/* Purity vs Contamination Bar */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Certified Material Purity</span>
          </span>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
            {purityPercentage.toFixed(1)}%
          </span>
        </div>

        <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden flex p-0.5 border border-zinc-300 dark:border-white/5 shadow-inner">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-700"
            style={{ width: `${purityPercentage}%` }}
          />
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-700 ml-0.5"
            style={{ width: `${contaminationPercentage}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
          <span>Clean Usable Fraction: {purityPercentage.toFixed(1)}%</span>
          <span className="text-amber-600 dark:text-amber-400 font-semibold">
            Impurities: {contaminationPercentage.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Contamination Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-zinc-200 dark:border-white/[0.06] text-xs">
        <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
          <span className="text-zinc-500 dark:text-zinc-400 block text-[10px] uppercase font-mono tracking-wider mb-1 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-500" />
            <span>Identified Impurities</span>
          </span>
          <span className="text-zinc-900 dark:text-white font-medium line-clamp-2">
            {contaminationType}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
          <span className="text-zinc-500 dark:text-zinc-400 block text-[10px] uppercase font-mono tracking-wider mb-1 flex items-center gap-1">
            <Droplets className="w-3 h-3 text-emerald-500" />
            <span>Moisture Fraction</span>
          </span>
          <span className="text-zinc-900 dark:text-white font-bold font-mono">
            {moistureLevel}
          </span>
        </div>
      </div>
    </div>
  );
}
