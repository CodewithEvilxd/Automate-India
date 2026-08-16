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
    <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] overflow-hidden font-mono text-xs">
      {/* Header */}
      <div className="bg-[#232B22] px-5 py-3 border-b border-[#2E362C] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#D98A3D]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#EDEAE0] font-semibold">
            Agent 3 &bull; AI Price Oracle & Matchmaking
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#4E9B6F]/20 text-[#4E9B6F] text-[10px] font-bold uppercase tracking-wider">
          MCX Benchmark
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Estimated Value Banner */}
        <div className="p-4 bg-[#10140F] border border-[#2E362C] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#8B9188] uppercase tracking-wider block">
              Estimated Lot Commodity Value
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#EDEAE0]">
                &#8377;{match.estimated_lot_value_inr.toLocaleString("en-IN")}
              </span>
              <span className="text-[#8B9188] text-xs">
                (&#8377;{match.unit_price_inr_per_kg}/kg)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#4E9B6F]">
            <TrendingUp className="w-4 h-4" />
            <span className="uppercase font-semibold">Price Trend: {match.price_trend}</span>
          </div>
        </div>

        {/* Logistics & Net Carbon Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-[#10140F] border border-[#2E362C] rounded">
            <div className="flex items-center gap-1.5 text-[#8B9188] text-[10px] uppercase mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#4E9B6F]" />
              <span>Optimal Routing Hub</span>
            </div>
            <span className="text-[#EDEAE0] font-bold text-xs block">{match.nearest_processing_hub}</span>
            <span className="text-[10px] text-[#8B9188] mt-0.5 block">
              Transit Radius: {match.estimated_transport_km} km
            </span>
          </div>

          <div className="p-3 bg-[#10140F] border border-[#2E362C] rounded">
            <div className="flex items-center gap-1.5 text-[#8B9188] text-[10px] uppercase mb-1">
              <Truck className="w-3.5 h-3.5 text-[#D98A3D]" />
              <span>Net Carbon Abated</span>
            </div>
            <span className="text-[#4E9B6F] font-bold text-xs block">
              +{match.net_carbon_abated_kg.toFixed(1)} kg CO₂e
            </span>
            <span className="text-[10px] text-[#8B9188] mt-0.5 block">
              Transport Penalty: -{match.transport_carbon_penalty_kg} kg
            </span>
          </div>
        </div>

        {/* Matched Buyer Recommendation */}
        <div className="p-3.5 bg-[#10140F] border border-[#4E9B6F]/40 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#8B9188] uppercase tracking-wider block">
              Recommended Certified Buyer
            </span>
            <span className="text-[#EDEAE0] font-bold text-xs block mt-0.5">
              {match.suggested_buyer_name}
            </span>
            <span className="text-[10px] text-[#8B9188] truncate block">
              {match.suggested_buyer_wallet}
            </span>
          </div>

          <Link
            href={`/org/${match.suggested_buyer_wallet}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] font-mono text-xs font-bold uppercase tracking-wider transition-colors shrink-0 self-start sm:self-center"
          >
            <span>View Buyer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
