"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MaterialItem } from "@/lib/demo-data";
import CategoryBadge from "@/components/CategoryBadge";
import VerificationStamp from "@/components/VerificationStamp";
import {
  Search,
  ArrowUpDown,
  MapPin,
  Boxes,
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
} from "lucide-react";

interface MarketplaceGridProps {
  initialMaterials: MaterialItem[];
}

export default function MarketplaceGrid({
  initialMaterials,
}: MarketplaceGridProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"co2" | "weight" | "newest">("co2");

  const categories = [
    { label: "All Materials", value: "all" },
    { label: "Aluminum & Non-Ferrous", value: "aluminum" },
    { label: "PET Plastic (Cat I)", value: "plastic_pet" },
    { label: "HDPE Plastic (Cat II)", value: "plastic_hdpe" },
    { label: "Heavy Ferrous / Steel", value: "steel" },
    { label: "Corrugated OCC Paper", value: "paper" },
    { label: "E-Waste / Telecom PCB", value: "electronic" },
  ];

  const regions = [
    { label: "All Hubs (India)", value: "all" },
    { label: "Noida / NCR Hub", value: "noida" },
    { label: "Pune / Chakan Corridor", value: "pune" },
    { label: "Gurugram / Manesar", value: "gurugram" },
    { label: "Ahmedabad / Sanand", value: "ahmedabad" },
    { label: "Bengaluru / Peenya", value: "bengaluru" },
    { label: "Chennai / Sriperumbudur", value: "chennai" },
  ];

  const filteredAndSortedMaterials = useMemo(() => {
    return initialMaterials
      .filter((item) => {
        const matchSearch =
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.id.toLowerCase().includes(search.toLowerCase()) ||
          (item.location && item.location.toLowerCase().includes(search.toLowerCase())) ||
          (item.owner_name && item.owner_name.toLowerCase().includes(search.toLowerCase()));

        if (!matchSearch) return false;

        if (selectedCategory !== "all") {
          if (!item.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
            return false;
          }
        }

        if (selectedRegion !== "all") {
          if (!item.location?.toLowerCase().includes(selectedRegion.toLowerCase())) {
            return false;
          }
        }

        if (selectedStatus !== "all") {
          if (item.status !== selectedStatus) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "co2") {
          return (b.co2_saved_kg || 0) - (a.co2_saved_kg || 0);
        }
        if (sortBy === "weight") {
          return (b.estimated_weight_kg || 0) - (a.estimated_weight_kg || 0);
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [initialMaterials, search, selectedCategory, selectedRegion, selectedStatus, sortBy]);

  // Price calculation helper
  const getEstimatedValue = (cat: string, weight: number) => {
    const priceMap: Record<string, number> = {
      aluminum: 215,
      steel: 42.5,
      copper: 760,
      plastic_pet: 48,
      plastic_hdpe: 58,
      paper: 14.5,
      electronic: 340,
    };
    const rate = priceMap[cat.toLowerCase()] || 30;
    return Math.round(rate * weight);
  };

  return (
    <div className="space-y-8">
      {/* Search & Control Center */}
      <div className="rounded-2xl glass-panel p-5 sm:p-6 border border-slate-200/80 dark:border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by lot title, category, city hub (e.g. Noida, Pune), or lot ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2.5 font-sans text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto font-mono text-xs shrink-0">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-cyan-500 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 font-sans text-xs focus:outline-none cursor-pointer"
            >
              <option value="co2">Highest CO₂ Impact (EPA Math)</option>
              <option value="weight">Heaviest Lot Mass (kg)</option>
              <option value="newest">Recently Registered</option>
            </select>
          </div>
        </div>

        {/* Filter Pills & Selectors */}
        <div className="pt-3 border-t border-slate-200/60 dark:border-white/5 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Logistics Hub:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              {regions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Status:</span>
            <div className="inline-flex rounded-lg border border-slate-200 dark:border-white/10 p-0.5 bg-slate-100 dark:bg-white/[0.03]">
              <button
                onClick={() => setSelectedStatus("all")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  selectedStatus === "all"
                    ? "bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All Lots
              </button>
              <button
                onClick={() => setSelectedStatus("listed")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  selectedStatus === "listed"
                    ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Open Lots
              </button>
              <button
                onClick={() => setSelectedStatus("transferred")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  selectedStatus === "transferred"
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Settled
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Meta Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Displaying</span>
          <span className="text-slate-900 dark:text-white font-bold font-mono">
            {filteredAndSortedMaterials.length}
          </span>
          <span>verified secondary material lots</span>
        </div>

        {(search || selectedCategory !== "all" || selectedRegion !== "all" || selectedStatus !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
              setSelectedRegion("all");
              setSelectedStatus("all");
            }}
            className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Material Lot Cards */}
      {filteredAndSortedMaterials.length === 0 ? (
        <div className="text-center py-20 rounded-2xl glass-panel border border-dashed border-slate-300 dark:border-white/10">
          <Boxes className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3 opacity-60" />
          <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-200">
            No matching material lots found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 max-w-sm mx-auto">
            Try adjusting your search query, material category, or logistics cluster.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedMaterials.map((item) => {
            const isTransferred = item.status === "transferred";
            const latestTx = item.transactions?.[0]?.tx_hash;
            const estimatedValue = getEstimatedValue(item.category, item.estimated_weight_kg || 100);

            return (
              <Link
                href={`/material/${item.id}`}
                key={item.id}
                className="group rounded-2xl glass-panel glass-panel-hover border border-slate-200/80 dark:border-white/10 overflow-hidden flex flex-col relative"
              >
                {/* Image Aspect Box */}
                <div className="aspect-[16/10] bg-slate-900 relative overflow-hidden">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-950">
                      <Boxes className="w-8 h-8 opacity-40 mb-1" />
                      <span className="font-mono text-xs">Specimen Pinned</span>
                    </div>
                  )}

                  {/* Badges Over Image */}
                  <div className="absolute top-3 left-3">
                    <CategoryBadge category={item.category} />
                  </div>

                  <div className="absolute top-3 right-3 font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-white flex items-center gap-1 shadow-lg">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{item.location || "Noida, UP"}</span>
                  </div>

                  {/* Settled Stamp Overlay */}
                  {isTransferred && (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center p-4">
                      <VerificationStamp
                        txHash={latestTx}
                        size="md"
                        status="verified"
                        rotation={-3}
                        className="animate-stamp"
                      />
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                        ₹{estimatedValue.toLocaleString("en-IN")}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        MCX Benchmark
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Metrics Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                      <span className="text-[11px] font-medium">Physical Mass:</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {item.estimated_weight_kg} kg
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                      <span className="text-[11px] font-medium">EPA Carbon Saved:</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        +{item.co2_saved_kg?.toFixed(1)} kg CO₂e
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 pt-1">
                      <span className="text-[11px] font-medium">Origin Plant:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[160px]">
                        {item.owner_name || "Certified Partner"}
                      </span>
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[11px]">
                    <span
                      className={`font-semibold uppercase tracking-wider ${
                        isTransferred
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      &bull; {isTransferred ? "Settled On Ledger" : "Ready For Offtake"}
                    </span>
                    <span className="font-display font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                      Inspect Lot &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
