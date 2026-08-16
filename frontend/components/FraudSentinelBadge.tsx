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
    <div className="rounded-2xl glass-panel p-5 border border-slate-200/80 dark:border-white/10 shadow-lg text-xs">
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/5 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          {isClean ? (
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          )}
          <span className="font-display text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">
            Agent 05 • Real-Time Fraud Sentinel
          </span>
        </div>

        <span
          className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${
            isClean
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
              : isModerate
              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
              : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30"
          }`}
        >
          Anomaly Risk: {audit.risk_level} ({audit.risk_score}%)
        </span>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-xs mb-2 leading-relaxed">
        {audit.security_audit_summary}
      </p>

      {audit.anomaly_flags.length > 0 && (
        <div className="mt-2 space-y-1 bg-rose-500/10 p-3 rounded-xl border border-rose-500/30 text-rose-600 dark:text-rose-400 text-[11px]">
          {audit.anomaly_flags.map((flag, idx) => (
            <div key={idx} className="flex items-start gap-1.5 font-medium">
              <AlertOctagon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{flag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
