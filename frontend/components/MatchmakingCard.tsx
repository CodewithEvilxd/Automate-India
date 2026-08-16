"use client";

import React, { useMemo } from "react";
import { TrendingUp, Truck, MapPin, DollarSign, ShieldCheck, ArrowRight, Zap } from "lucide-react";
import { calculatePriceAndMatch } from "@/lib/ai-agents";
import Link from "next/link";

interface MatchmakingCardProps {
  category: string;
  weightKg: number;
  location?: string;
}

export default function MatchmakingCard({
  category,
  weightKg,
  location = "Noida, UP",
}: MatchmakingCardProps) {
  const match = useMemo(() => {
    return calculatePriceAndMatch(category, weightKg, location);
  }, [category, weightKg, location]);

  return (
    <div className="rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-zinc-100 dark:bg-white/[0.03] px-6 py-3.5 border-b border-zinc-200 dark:border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="font-display text-xs uppercase tracking-wider text-zinc-900 dark:text-white font-bold">
            Agent 03 • Autonomous MCX Price Oracle & Matchmaking
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
          MCX Benchmark Sync
        </span>
      </div>

      <div className="p-6 space-y-4 text-xs">
        {/* Estimated Value Banner */}
        <div className="p-4 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
              Estimated Lot Commodity Value
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-amber-500">
                ₹{match.estimated_lot_value_inr.toLocaleString("en-IN")}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 font-mono text-xs">
                (₹{match.unit_price_inr_per_kg}/kg)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span className="uppercase">Index Trend: {match.price_trend}</span>
          </div>
        </div>

        {/* Logistics & Net Carbon Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-mono mb-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>Optimal Secondary Hub</span>
            </div>
            <span className="text-zinc-900 dark:text-white font-bold text-sm block">{match.nearest_processing_hub}</span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5 block">
              Transit Radius: {match.estimated_transport_km} km
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-mono mb-1">
              <Truck className="w-3.5 h-3.5 text-amber-500" />
              <span>Net Carbon Abated</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm block">
              +{match.net_carbon_abated_kg.toFixed(1)} kg CO₂e
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5 block">
              Transport Penalty: -{match.transport_carbon_penalty_kg} kg
            </span>
          </div>
        </div>

        {/* Matched Buyer Recommendation */}
        <div className="p-4 rounded-xl bg-zinc-100 dark:bg-white/[0.02] border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
              Recommended Certified Buyer
            </span>
            <span className="text-zinc-900 dark:text-white font-bold text-sm block mt-0.5">
              {match.suggested_buyer_name}
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate block">
              {match.suggested_buyer_wallet}
            </span>
          </div>

          <Link
            href={`/org/${match.suggested_buyer_wallet}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold uppercase tracking-wider transition-all shrink-0 self-start sm:self-center shadow-md shadow-emerald-500/20 hover:scale-105"
          >
            <span>View Buyer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
