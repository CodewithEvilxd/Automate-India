"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import WalletBadge from "@/components/WalletBadge";
import { DEMO_ORGANIZATIONS } from "@/lib/demo-data";
import {
  Search,
  ArrowRight,
  Trophy,
  Award,
  ShieldCheck,
  TrendingUp,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");

  const filteredOrgs = DEMO_ORGANIZATIONS.filter(
    (org) =>
      org.org_name.toLowerCase().includes(search.toLowerCase()) ||
      org.location.toLowerCase().includes(search.toLowerCase()) ||
      org.wallet_address.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => b.total_co2_abated_kg - a.total_co2_abated_kg);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white transition-colors duration-300 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Header */}
        <div className="border-b border-slate-200/80 dark:border-white/10 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>National Circular Index • Top Recyclers</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Recycler Leaderboard & ESG Ratings
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl font-normal leading-relaxed">
              Audited ranking of certified industrial recycling plants, secondary smelters, and aggregators across India by verified CO₂e abatement.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search plant name or hub (Pune, Noida)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Top 3 Podium Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {filteredOrgs.slice(0, 3).map((org, index) => {
            const rankBadges = [
              { color: "text-amber-500 border-amber-500/40 bg-amber-500/10", label: "Gold Tier #1" },
              { color: "text-slate-400 border-slate-400/40 bg-slate-400/10", label: "Silver Tier #2" },
              { color: "text-orange-500 border-orange-500/40 bg-orange-500/10", label: "Bronze Tier #3" },
            ];

            return (
              <div
                key={org.wallet_address}
                className="rounded-3xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-xl hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${rankBadges[index].color}`}
                    >
                      {rankBadges[index].label}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-500" />
                      <span>{org.location.split(",")[0]}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white line-clamp-1 mb-1">
                    {org.org_name}
                  </h3>
                  <WalletBadge address={org.wallet_address} showTrusted={false} />
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                    <span>CO₂e Abated:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      +{org.total_co2_abated_kg.toLocaleString("en-IN")} kg
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                    <span>Material Diverted:</span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-white">
                      {org.total_mass_recycled_kg.toLocaleString("en-IN")} kg
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                    <span>Trust Rating:</span>
                    <span className="font-mono font-bold text-amber-500">
                      {org.reputation_score} / 100
                    </span>
                  </div>
                </div>

                <Link
                  href={`/org/${org.wallet_address}`}
                  className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5 text-xs text-cyan-600 dark:text-cyan-400 font-semibold hover:underline flex items-center justify-between"
                >
                  <span>Inspect Plant ESG Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Directory Table */}
        <div className="rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-slate-100 dark:bg-white/[0.04] border-b border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            <span>Verified Recycler Registry ({filteredOrgs.length})</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Consensus EPA Abatement Rank
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-white/[0.02] text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-white/5">
                <tr>
                  <th className="px-6 py-3 font-mono">Rank</th>
                  <th className="px-6 py-3">Facility Name</th>
                  <th className="px-6 py-3">Industrial Hub</th>
                  <th className="px-6 py-3 text-right">CO₂e Abated</th>
                  <th className="px-6 py-3 text-right">Lots Settled</th>
                  <th className="px-6 py-3 text-right">Trust Score</th>
                  <th className="px-6 py-3 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-white/5">
                {filteredOrgs.map((org, idx) => (
                  <tr
                    key={org.wallet_address}
                    className="hover:bg-slate-100/50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">
                      #{idx + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm block">
                          {org.org_name}
                        </span>
                        <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                          {org.wallet_address.substring(0, 8)}...
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {org.location}
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      +{org.total_co2_abated_kg.toLocaleString("en-IN")} kg
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-700 dark:text-slate-300">
                      {org.completed_transfers} lots
                    </td>
                    <td className="px-6 py-4 text-right font-mono">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold">
                        {org.reputation_score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/org/${org.wallet_address}`}
                        className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
                      >
                        <span>Profile</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
