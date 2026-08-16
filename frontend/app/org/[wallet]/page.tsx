"use client";

import { useState, use } from "react";
import Navbar from "@/components/Navbar";
import VerificationStamp from "@/components/VerificationStamp";
import CategoryBadge from "@/components/CategoryBadge";
import WalletBadge from "@/components/WalletBadge";
import EPRReportModal from "@/components/EPRReportModal";
import { DEMO_ORGANIZATIONS, DEMO_MATERIALS, OrgProfile } from "@/lib/demo-data";
import {
  Building2,
  MapPin,
  Calendar,
  Award,
  Leaf,
  Scale,
  FileCheck,
  ShieldCheck,
  Boxes,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function OrgProfilePage({
  params,
}: {
  params: Promise<{ wallet: string }>;
}) {
  const { wallet } = use(params);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const org: OrgProfile =
    DEMO_ORGANIZATIONS.find(
      (o) => o.wallet_address.toLowerCase() === wallet.toLowerCase()
    ) || {
      wallet_address: wallet,
      org_name: "Industrial Recycling Partner",
      location: "Noida, NCR",
      reputation_score: 85,
      total_co2_abated_kg: 4250.0,
      total_mass_recycled_kg: 3100.0,
      total_lots_listed: 6,
      completed_transfers: 5,
      is_trusted_partner: true,
      member_since: "January 2025",
      epr_registration_no: "EPR-IN-2025-09941",
      verified_categories: ["aluminum", "plastic_pet", "paper"],
    };

  const orgMaterials = DEMO_MATERIALS.filter(
    (m) => m.owner_wallet.toLowerCase() === wallet.toLowerCase()
  );

  const displayMaterials = orgMaterials.length > 0 ? orgMaterials : DEMO_MATERIALS.slice(0, 3);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="mb-6">
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Recycler Leaderboard</span>
          </Link>
        </div>

        {/* Profile Banner Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 mb-8 border border-zinc-200 dark:border-white/10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 flex items-center justify-center shrink-0">
                <Building2 className="w-8 h-8 text-emerald-500" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    EPR Certified Participant
                  </span>
                  {org.is_trusted_partner && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono uppercase font-bold flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Trusted Partner
                    </span>
                  )}
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                  {org.org_name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{org.location}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Joined {org.member_since}</span>
                  </div>
                  <span>•</span>
                  <div className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
                    CPCB Reg: {org.epr_registration_no}
                  </div>
                </div>

                <div className="mt-3">
                  <WalletBadge address={org.wallet_address} />
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsReportOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs uppercase font-bold tracking-wider transition-all shadow-md shadow-emerald-500/20 hover:scale-105"
              >
                <FileCheck className="w-4 h-4" />
                <span>Export EPR Compliance PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* ESG Metrics 4-Col Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="rounded-2xl glass-panel p-6 border border-zinc-200 dark:border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-2 font-mono text-xs uppercase">
              <span>Audited CO₂e Abated</span>
              <Leaf className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="font-display text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              +{org.total_co2_abated_kg.toLocaleString("en-IN")} kg
            </div>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block font-mono">
              EPA WARM standard equations
            </span>
          </div>

          <div className="rounded-2xl glass-panel p-6 border border-zinc-200 dark:border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-2 font-mono text-xs uppercase">
              <span>Physical Mass Diverted</span>
              <Scale className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
            </div>
            <div className="font-display text-3xl font-extrabold text-zinc-900 dark:text-white">
              {org.total_mass_recycled_kg.toLocaleString("en-IN")} kg
            </div>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block font-mono">
              Secondary feedstock diversion
            </span>
          </div>

          <div className="rounded-2xl glass-panel p-6 border border-zinc-200 dark:border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-2 font-mono text-xs uppercase">
              <span>Settled Transfers</span>
              <ShieldCheck className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-display text-3xl font-extrabold text-amber-500">
              {org.completed_transfers} Lots
            </div>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block font-mono">
              Verified by AI Agent 2 on-chain
            </span>
          </div>

          <div className="rounded-2xl glass-panel p-6 border border-zinc-200 dark:border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-2 font-mono text-xs uppercase">
              <span>Trust & Reputation</span>
              <Award className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="font-display text-3xl font-extrabold text-zinc-900 dark:text-white">
              {org.reputation_score} <span className="text-sm font-mono text-zinc-400">/ 100</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 block font-semibold font-mono">
              EPR Verified Recycler Rating
            </span>
          </div>
        </div>

        {/* Contributed Lots Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Boxes className="w-5 h-5 text-emerald-500" />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                Secondary Material Lots Contributed by {org.org_name}
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {displayMaterials.length} Lots in Registry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayMaterials.map((item) => {
              const isTransferred = item.status === "transferred";
              const latestTx = item.transactions?.[0]?.tx_hash;

              return (
                <Link
                  href={`/material/${item.id}`}
                  key={item.id}
                  className="group rounded-2xl glass-panel glass-panel-hover border border-zinc-200 dark:border-white/10 overflow-hidden flex flex-col"
                >
                  <div className="aspect-[16/10] bg-[#121215] relative overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <CategoryBadge category={item.category} />
                    </div>
                    {isTransferred && (
                      <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-[2px] flex items-center justify-center p-3">
                        <VerificationStamp
                          txHash={latestTx}
                          size="sm"
                          status="verified"
                          rotation={-3}
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 line-clamp-1 mb-1 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs line-clamp-2 mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-200 dark:border-white/[0.06] font-mono text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-zinc-500 dark:text-zinc-400">Mass:</span>
                        <span className="text-zinc-900 dark:text-white font-bold">{item.estimated_weight_kg} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 dark:text-zinc-400">CO₂ Saved:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{item.co2_saved_kg.toFixed(1)} kg</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <EPRReportModal
        org={org}
        materials={displayMaterials}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}
