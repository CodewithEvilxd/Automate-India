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
    <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-5 font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2E362C] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#4E9B6F]" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#EDEAE0] font-semibold">
            Visual Contamination & Quality Audit
          </span>
        </div>
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
            isHighQuality
              ? "bg-[#4E9B6F]/20 text-[#4E9B6F] border border-[#4E9B6F]/40"
              : "bg-[#D98A3D]/20 text-[#D98A3D] border border-[#D98A3D]/40"
          }`}
        >
          {recyclabilityGrade}
        </span>
      </div>

      {/* Purity vs Contamination Bar */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-[11px]">
          <span className="text-[#8B9188] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#4E9B6F]" />
            <span>Material Purity</span>
          </span>
          <span className="font-bold text-[#4E9B6F]">{purityPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-[#10140F] border border-[#2E362C] h-2.5 rounded-full overflow-hidden flex">
          <div
            className="bg-[#4E9B6F] h-full transition-all duration-500"
            style={{ width: `${purityPercentage}%` }}
          />
          <div
            className="bg-[#D98A3D] h-full transition-all duration-500"
            style={{ width: `${contaminationPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-[#8B9188]">
          <span>Clean Fraction: {purityPercentage.toFixed(1)}%</span>
          <span className="text-[#D98A3D]">Contamination: {contaminationPercentage.toFixed(1)}%</span>
        </div>
      </div>

      {/* Contamination Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#2E362C]">
        <div className="p-2.5 bg-[#10140F] border border-[#2E362C] rounded">
          <span className="text-[#8B9188] block text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-[#D98A3D]" />
            <span>Identified Impurities</span>
          </span>
          <span className="text-[#EDEAE0] font-sans text-xs line-clamp-2">{contaminationType}</span>
        </div>

        <div className="p-2.5 bg-[#10140F] border border-[#2E362C] rounded">
          <span className="text-[#8B9188] block text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1">
            <Droplets className="w-3 h-3 text-[#4E9B6F]" />
            <span>Moisture Fraction</span>
          </span>
          <span className="text-[#EDEAE0] font-bold text-xs">{moistureLevel}</span>
        </div>
      </div>
    </div>
  );
}
