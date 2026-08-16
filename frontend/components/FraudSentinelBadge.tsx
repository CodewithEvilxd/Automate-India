"use client";

import React, { useMemo } from "react";
import { ShieldCheck, ShieldAlert, AlertOctagon, CheckCircle2, Lock } from "lucide-react";
import { auditOnChainFraudRisk } from "@/lib/ai-agents";

interface FraudSentinelBadgeProps {
  fromWallet: string;
  toWallet: string;
  weightKg: number;
  claimedCo2: number;
  category: string;
}

export default function FraudSentinelBadge({
  fromWallet,
  toWallet,
  weightKg,
  claimedCo2,
  category,
}: FraudSentinelBadgeProps) {
  const audit = useMemo(() => {
    return auditOnChainFraudRisk(fromWallet, toWallet, weightKg, claimedCo2, category);
  }, [fromWallet, toWallet, weightKg, claimedCo2, category]);

  const isClean = audit.risk_level === "LOW";
  const isModerate = audit.risk_level === "MODERATE";

  return (
    <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#2E362C] pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          {isClean ? (
            <ShieldCheck className="w-4 h-4 text-[#4E9B6F]" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-[#E57373]" />
          )}
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#EDEAE0] font-semibold">
            On-Chain Fraud Sentinel
          </span>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
            isClean
              ? "bg-[#4E9B6F]/20 text-[#4E9B6F] border border-[#4E9B6F]/40"
              : isModerate
              ? "bg-[#D98A3D]/20 text-[#D98A3D] border border-[#D98A3D]/40"
              : "bg-[#E57373]/20 text-[#E57373] border border-[#E57373]/40"
          }`}
        >
          Risk: {audit.risk_level} ({audit.risk_score}%)
        </span>
      </div>

      <p className="text-[#8B9188] font-sans text-xs mb-2">{audit.security_audit_summary}</p>

      {audit.anomaly_flags.length > 0 && (
        <div className="mt-2 space-y-1 bg-[#10140F] p-2.5 rounded border border-[#E57373]/40 text-[#E57373] text-[11px]">
          {audit.anomaly_flags.map((flag, idx) => (
            <div key={idx} className="flex items-start gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{flag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
