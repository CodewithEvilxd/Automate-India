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
    <div className="min-h-screen bg-[#10140F] text-[#EDEAE0] flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="mb-6">
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#8B9188] hover:text-[#4E9B6F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Recycler Leaderboard</span>
          </Link>
        </div>

        <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-[4px] bg-[#232B22] border border-[#2E362C] flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7 text-[#4E9B6F]" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-[#4E9B6F] font-bold uppercase tracking-wider">
                    EPR Certified Participant
                  </span>
                  {org.is_trusted_partner && (
                    <span className="px-2 py-0.5 rounded bg-[#4E9B6F]/10 border border-[#4E9B6F]/40 text-[#4E9B6F] text-[10px] font-mono uppercase font-bold flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Trusted Partner
                    </span>
                  )}
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#EDEAE0]">
                  {org.org_name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-2 font-mono text-xs text-[#8B9188]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8B9188]" />
                    <span>{org.location}</span>
                  </div>
                  <span>&bull;</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8B9188]" />
                    <span>Joined {org.member_since}</span>
                  </div>
                  <span>&bull;</span>
                  <div className="text-[#EDEAE0]">
                    Reg: {org.epr_registration_no}
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
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] font-mono text-xs uppercase font-bold tracking-wider transition-colors shadow-sm"
              >
                <FileCheck className="w-4 h-4" />
                <span>Export EPR Compliance Report (PDF)</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-[#1B211A] border border-[#2E362C] p-6 rounded-[6px]">
            <div className="flex items-center justify-between text-[#8B9188] mb-2 font-mono text-xs uppercase">
              <span>Audited CO₂e Abated</span>
              <Leaf className="w-4 h-4 text-[#4E9B6F]" />
            </div>
            <div className="font-display text-3xl font-bold text-[#4E9B6F]">
              +{org.total_co2_abated_kg.toLocaleString()} kg
            </div>
            <span className="font-mono text-[10px] text-[#8B9188] mt-1 block">
              EPA WARM emission factor methodology
            </span>
          </div>

          <div className="bg-[#1B211A] border border-[#2E362C] p-6 rounded-[6px]">
            <div className="flex items-center justify-between text-[#8B9188] mb-2 font-mono text-xs uppercase">
              <span>Physical Mass Diverted</span>
              <Scale className="w-4 h-4 text-[#EDEAE0]" />
            </div>
            <div className="font-display text-3xl font-bold text-[#EDEAE0]">
              {org.total_mass_recycled_kg.toLocaleString()} kg
            </div>
            <span className="font-mono text-[10px] text-[#8B9188] mt-1 block">
              Diverted from industrial landfills
            </span>
          </div>

          <div className="bg-[#1B211A] border border-[#2E362C] p-6 rounded-[6px]">
            <div className="flex items-center justify-between text-[#8B9188] mb-2 font-mono text-xs uppercase">
              <span>Settled Transfers</span>
              <ShieldCheck className="w-4 h-4 text-[#D98A3D]" />
            </div>
            <div className="font-display text-3xl font-bold text-[#D98A3D]">
              {org.completed_transfers} Lots
            </div>
            <span className="font-mono text-[10px] text-[#8B9188] mt-1 block">
              Verified by AI Agent 2 on-chain
            </span>
          </div>

          <div className="bg-[#1B211A] border border-[#2E362C] p-6 rounded-[6px]">
            <div className="flex items-center justify-between text-[#8B9188] mb-2 font-mono text-xs uppercase">
              <span>Trust & Reputation</span>
              <Award className="w-4 h-4 text-[#4E9B6F]" />
            </div>
            <div className="font-display text-3xl font-bold text-[#EDEAE0]">
              {org.reputation_score} <span className="text-sm font-mono text-[#8B9188]">/ 100</span>
            </div>
            <span className="font-mono text-[10px] text-[#4E9B6F] mt-1 block font-semibold">
              EPR Verified Partner Rating
            </span>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between border-b border-[#2E362C] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Boxes className="w-5 h-5 text-[#4E9B6F]" />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#EDEAE0]">
                Material Lots Contributed by {org.org_name}
              </h2>
            </div>
            <span className="font-mono text-xs text-[#8B9188]">
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
                  className="group bg-[#1B211A] border border-[#2E362C] hover:border-[#4E9B6F]/60 rounded-[6px] overflow-hidden flex flex-col transition-colors"
                >
                  <div className="aspect-[16/10] bg-[#10140F] relative overflow-hidden border-b border-[#2E362C]">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <CategoryBadge category={item.category} />
                    </div>
                    {isTransferred && (
                      <div className="absolute inset-0 bg-[#10140F]/60 backdrop-blur-[2px] flex items-center justify-center p-3">
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
                      <h3 className="font-display font-bold text-base text-[#EDEAE0] group-hover:text-[#4E9B6F] line-clamp-1 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#8B9188] text-xs line-clamp-2 mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#2E362C] font-mono text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[#8B9188]">Mass:</span>
                        <span className="text-[#EDEAE0] font-bold">{item.estimated_weight_kg} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8B9188]">CO₂ Saved:</span>
                        <span className="text-[#4E9B6F] font-bold">+{item.co2_saved_kg.toFixed(1)} kg</span>
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
