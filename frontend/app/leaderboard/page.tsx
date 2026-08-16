"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import WalletBadge from "@/components/WalletBadge";
import { DEMO_ORGANIZATIONS } from "@/lib/demo-data";
import {
  Search,
  ArrowRight,
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
    <div className="min-h-screen bg-[#10140F] text-[#EDEAE0] flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="border-b border-[#2E362C] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-2.5 py-0.5 rounded-[4px] bg-[#232B22] border border-[#2E362C] font-mono text-[10px] uppercase tracking-widest text-[#4E9B6F] font-semibold">
                Circular Index &bull; Top Recyclers
              </span>
              <span className="font-mono text-[10px] text-[#8B9188]">
                EPR Verified Contributors
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEAE0]">
              Organization Leaderboard
            </h1>
            <p className="text-[#8B9188] text-sm mt-1 max-w-2xl font-sans">
              Ranked on-chain industrial participants by audited carbon abatement and verified material recycling volume across India.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8B9188] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search org or hub (e.g. Pune)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1B211A] border border-[#2E362C] focus:border-[#4E9B6F] rounded-[4px] pl-9 pr-3 py-2 font-mono text-xs text-[#EDEAE0] placeholder:text-[#8B9188]/50 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {filteredOrgs.slice(0, 3).map((org, index) => {
            const rankColors = [
              "border-[#D98A3D] text-[#D98A3D] bg-[#D98A3D]/10",
              "border-[#8B9188] text-[#EDEAE0] bg-[#8B9188]/10",
              "border-[#4E9B6F] text-[#4E9B6F] bg-[#4E9B6F]/10",
            ];

            return (
              <div
                key={org.wallet_address}
                className="bg-[#1B211A] border border-[#2E362C] hover:border-[#4E9B6F]/60 rounded-[6px] p-6 flex flex-col justify-between relative overflow-hidden transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center font-mono font-bold text-sm ${rankColors[index]}`}
                  >
                    #{index + 1}
                  </div>
                  <span className="font-mono text-[10px] text-[#4E9B6F] uppercase px-2 py-0.5 rounded bg-[#232B22] border border-[#2E362C]">
                    {org.location.split(",")[0]}
                  </span>
                </div>

                <div className="mb-5">
                  <h3 className="font-display font-bold text-lg text-[#EDEAE0] line-clamp-1 mb-1">
                    {org.org_name}
                  </h3>
                  <WalletBadge address={org.wallet_address} showTrusted={false} />
                </div>

                <div className="border-t border-[#2E362C] pt-3.5 space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center text-[#8B9188]">
                    <span>CO₂ Abated:</span>
                    <span className="font-data font-bold text-[#4E9B6F]">
                      +{org.total_co2_abated_kg.toLocaleString()} kg
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#8B9188]">
                    <span>Material Mass:</span>
                    <span className="font-data text-[#EDEAE0]">
                      {org.total_mass_recycled_kg.toLocaleString()} kg
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#8B9188]">
                    <span>Reputation:</span>
                    <span className="font-data text-[#D98A3D]">
                      {org.reputation_score} / 100
                    </span>
                  </div>
                </div>

                <Link
                  href={`/org/${org.wallet_address}`}
                  className="mt-4 pt-3 border-t border-[#2E362C] font-mono text-[11px] text-[#4E9B6F] hover:underline flex items-center justify-between"
                >
                  <span>View Full ESG Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] overflow-hidden">
          <div className="px-6 py-3.5 bg-[#232B22] border-b border-[#2E362C] flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#EDEAE0] font-bold">
            <span>Verified Recyclers Directory ({filteredOrgs.length})</span>
            <span className="text-[10px] text-[#8B9188]">Ranked by Abated CO₂e</span>
          </div>

          <div className="divide-y divide-[#2E362C] overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#10140F]/60 text-[#8B9188] uppercase text-[10px] tracking-wider border-b border-[#2E362C]">
                <tr>
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Organization</th>
                  <th className="px-6 py-3">Hub</th>
                  <th className="px-6 py-3 text-right">CO₂e Abated</th>
                  <th className="px-6 py-3 text-right">Lots Settled</th>
                  <th className="px-6 py-3 text-right">Reputation</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2E362C]">
                {filteredOrgs.map((org, idx) => (
                  <tr
                    key={org.wallet_address}
                    className="hover:bg-[#232B22]/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-[#EDEAE0]">
                      #{idx + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-bold text-[#EDEAE0] text-sm block">
                          {org.org_name}
                        </span>
                        <span className="text-[11px] text-[#8B9188]">
                          {org.wallet_address.substring(0, 8)}...
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#8B9188]">
                      {org.location}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-[#4E9B6F] font-data">
                      +{org.total_co2_abated_kg.toLocaleString()} kg
                    </td>
                    <td className="px-6 py-4 text-right text-[#EDEAE0]">
                      {org.completed_transfers} lots
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2 py-0.5 rounded bg-[#4E9B6F]/10 border border-[#4E9B6F]/40 text-[#4E9B6F] font-bold">
                        {org.reputation_score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/org/${org.wallet_address}`}
                        className="inline-flex items-center gap-1 text-[#4E9B6F] hover:underline"
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
