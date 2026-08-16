"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MaterialItem } from "@/lib/demo-data";
import CategoryBadge from "@/components/CategoryBadge";
import WalletBadge from "@/components/WalletBadge";
import VerificationStamp from "@/components/VerificationStamp";
import {
  Search,
  ArrowUpDown,
  MapPin,
  Boxes,
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
    { label: "All Categories", value: "all" },
    { label: "Aluminum / Metal", value: "aluminum" },
    { label: "Plastic (PET)", value: "plastic_pet" },
    { label: "Plastic (HDPE)", value: "plastic_hdpe" },
    { label: "Paper / Fiber", value: "paper" },
    { label: "Cullet Glass", value: "glass" },
    { label: "Electronics", value: "electronic" },
  ];

  const regions = [
    { label: "All Regions (India)", value: "all" },
    { label: "Noida / NCR", value: "noida" },
    { label: "Pune / Mumbai", value: "pune" },
    { label: "Gurugram / Haryana", value: "gurugram" },
    { label: "Ahmedabad / Gujarat", value: "ahmedabad" },
    { label: "Bengaluru / Karnataka", value: "bengaluru" },
    { label: "Chennai / Tamil Nadu", value: "chennai" },
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

  return (
    <div className="space-y-6">
      <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-[#8B9188] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by material title, category, city hub (e.g. Noida, Pune), or lot ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#10140F] border border-[#2E362C] focus:border-[#4E9B6F] rounded-[4px] pl-10 pr-4 py-2.5 font-mono text-xs text-[#EDEAE0] placeholder:text-[#8B9188]/50 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto font-mono text-xs shrink-0">
            <span className="text-[#8B9188] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-[#10140F] border border-[#2E362C] focus:border-[#4E9B6F] rounded-[4px] px-3 py-2 text-[#EDEAE0] font-mono text-xs focus:outline-none cursor-pointer"
            >
              <option value="co2">Highest CO₂ Impact</option>
              <option value="weight">Heaviest Mass (kg)</option>
              <option value="newest">Newest Listed</option>
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-[#2E362C] flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#8B9188]">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#10140F] border border-[#2E362C] rounded-[4px] px-2.5 py-1 text-[#EDEAE0] focus:border-[#4E9B6F] focus:outline-none cursor-pointer text-xs"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8B9188]">Location Hub:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-[#10140F] border border-[#2E362C] rounded-[4px] px-2.5 py-1 text-[#EDEAE0] focus:border-[#4E9B6F] focus:outline-none cursor-pointer text-xs"
            >
              {regions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-[#8B9188]">Status:</span>
            <div className="inline-flex rounded-[4px] border border-[#2E362C] p-0.5 bg-[#10140F]">
              <button
                onClick={() => setSelectedStatus("all")}
                className={`px-2 py-0.5 rounded-[2px] text-[11px] transition-colors ${
                  selectedStatus === "all"
                    ? "bg-[#232B22] text-[#EDEAE0] font-bold"
                    : "text-[#8B9188] hover:text-[#EDEAE0]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedStatus("listed")}
                className={`px-2 py-0.5 rounded-[2px] text-[11px] transition-colors ${
                  selectedStatus === "listed"
                    ? "bg-[#232B22] text-[#D98A3D] font-bold"
                    : "text-[#8B9188] hover:text-[#EDEAE0]"
                }`}
              >
                Open Lots
              </button>
              <button
                onClick={() => setSelectedStatus("transferred")}
                className={`px-2 py-0.5 rounded-[2px] text-[11px] transition-colors ${
                  selectedStatus === "transferred"
                    ? "bg-[#232B22] text-[#4E9B6F] font-bold"
                    : "text-[#8B9188] hover:text-[#EDEAE0]"
                }`}
              >
                Settled
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-[#2E362C] pb-3">
        <div className="flex items-center gap-2 font-mono text-xs text-[#8B9188]">
          <span>Displaying</span>
          <span className="text-[#EDEAE0] font-bold">
            {filteredAndSortedMaterials.length}
          </span>
          <span>verified material lots</span>
        </div>

        {(search || selectedCategory !== "all" || selectedRegion !== "all" || selectedStatus !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
              setSelectedRegion("all");
              setSelectedStatus("all");
            }}
            className="font-mono text-xs text-[#4E9B6F] hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {filteredAndSortedMaterials.length === 0 ? (
        <div className="text-center py-16 bg-[#1B211A] rounded-[6px] border border-[#2E362C] border-dashed manifest-grid">
          <Boxes className="w-10 h-10 text-[#8B9188] mx-auto mb-3 opacity-50" />
          <h3 className="font-display text-lg font-bold text-[#EDEAE0]">
            No matching material lots found
          </h3>
          <p className="text-[#8B9188] text-xs font-mono mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords, category, or logistics region filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedMaterials.map((item) => {
            const isTransferred = item.status === "transferred";
            const latestTx = item.transactions?.[0]?.tx_hash;

            return (
              <Link
                href={`/material/${item.id}`}
                key={item.id}
                className="group bg-[#1B211A] border border-[#2E362C] hover:border-[#4E9B6F]/60 rounded-[6px] overflow-hidden flex flex-col transition-all duration-200"
              >
                <div className="aspect-[16/10] bg-[#10140F] relative overflow-hidden border-b border-[#2E362C]">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#8B9188] manifest-grid">
                      <Boxes className="w-8 h-8 opacity-40 mb-1" />
                      <span className="font-mono text-xs">No Specimen Photo</span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3">
                    <CategoryBadge category={item.category} />
                  </div>

                  <div className="absolute top-3 right-3 font-mono text-[10px] px-2 py-0.5 rounded-[4px] bg-[#10140F]/90 backdrop-blur-sm border border-[#2E362C] text-[#EDEAE0] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#4E9B6F]" />
                    <span>{item.location || "Noida, UP"}</span>
                  </div>

                  {isTransferred && (
                    <div className="absolute inset-0 bg-[#10140F]/65 backdrop-blur-[2px] flex items-center justify-center p-4">
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

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#EDEAE0] group-hover:text-[#4E9B6F] transition-colors line-clamp-1 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[#8B9188] text-xs line-clamp-2 mb-4 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#2E362C] space-y-2 font-mono text-xs">
                    <div className="flex justify-between items-center text-[#8B9188]">
                      <span className="text-[11px] uppercase tracking-wider">Lot Mass:</span>
                      <span className="font-data font-semibold text-[#EDEAE0]">
                        {item.estimated_weight_kg} kg
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[#8B9188]">
                      <span className="text-[11px] uppercase tracking-wider">CO₂ Impact:</span>
                      <span className="font-data font-bold text-[#4E9B6F]">
                        +{item.co2_saved_kg?.toFixed(1)} kg CO₂e
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[#8B9188] pt-1">
                      <span className="text-[11px] uppercase tracking-wider">Origin Org:</span>
                      <span className="text-[#EDEAE0] font-semibold truncate max-w-[150px]">
                        {item.owner_name || "Industrial Partner"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#2E362C]/60 flex items-center justify-between font-mono text-[11px]">
                    <span
                      className={`uppercase tracking-wider font-semibold ${
                        isTransferred ? "text-[#4E9B6F]" : "text-[#D98A3D]"
                      }`}
                    >
                      &bull; {isTransferred ? "Settled on-chain" : "Active lot"}
                    </span>
                    <span className="text-[#8B9188] group-hover:text-[#EDEAE0] flex items-center gap-1 transition-colors">
                      Inspect &rarr;
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
