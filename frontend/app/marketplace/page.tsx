import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DEMO_MATERIALS, DEMO_TRANSACTIONS } from "@/lib/demo-data";
import Navbar from "@/components/Navbar";
import DashboardStats from "@/components/DashboardStats";
import DashboardChart from "@/components/DashboardChart";
import RecentLedger from "@/components/RecentLedger";
import MarketplaceGrid from "@/components/MarketplaceGrid";
import { Boxes, Plus, SearchCheck, Trophy, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MarketplacePage() {
  let materials: any[] = [];
  let transactions: any[] = [];

  try {
    materials = await prisma.material.findMany({
      orderBy: { created_at: "desc" },
      include: {
        transactions: true,
      },
    });

    transactions = await prisma.transaction.findMany({
      orderBy: { timestamp: "desc" },
      take: 8,
      include: { material: true },
    });
  } catch (err: any) {
    materials = DEMO_MATERIALS;
    transactions = DEMO_TRANSACTIONS;
  }

  if (!materials || materials.length === 0) {
    materials = DEMO_MATERIALS;
    transactions = DEMO_TRANSACTIONS;
  }

  const totalCO2Saved = materials.reduce(
    (acc: number, curr: any) => acc + (curr.co2_saved_kg || 0),
    0
  );
  const totalWeightKg = materials.reduce(
    (acc: number, curr: any) => acc + (curr.estimated_weight_kg || 0),
    0
  );
  const totalListed = materials.length;
  const totalTransferred = materials.filter(
    (m: any) => m.status === "transferred"
  ).length;

  return (
    <div className="min-h-screen bg-[#10140F] text-[#EDEAE0] flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Page Intro / Manifest Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#2E362C] pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Link
                href="/"
                className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#8B9188] hover:text-[#4E9B6F] transition-colors mr-2"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Overview</span>
              </Link>
              <span className="inline-block px-2 py-0.5 rounded-[4px] bg-[#232B22] border border-[#2E362C] font-mono text-[10px] uppercase tracking-widest text-[#4E9B6F] font-semibold">
                Audit Trail &bull; Polygon Amoy
              </span>
              <span className="font-mono text-[10px] text-[#8B9188]">
                ISO 14064 &bull; EPA WARM Compliant
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#EDEAE0]">
              Industrial Materials Ledger
            </h1>
            <p className="text-[#8B9188] text-sm mt-1 max-w-2xl font-sans">
              Verifiable circular economy exchange. Waste volumes and carbon abatement verified on-chain and backed by AI multi-agent verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/verify"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-[4px] bg-[#1B211A] hover:bg-[#232B22] border border-[#2E362C] text-[#EDEAE0] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <SearchCheck className="w-3.5 h-3.5 text-[#4E9B6F]" />
              <span>Verify Tx</span>
            </Link>
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-[4px] bg-[#1B211A] hover:bg-[#232B22] border border-[#2E362C] text-[#EDEAE0] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <Trophy className="w-3.5 h-3.5 text-[#D98A3D]" />
              <span>Leaderboard</span>
            </Link>
            <Link
              href="/list"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>List Material Lot</span>
            </Link>
          </div>
        </div>

        {/* Top Stat Strip */}
        <DashboardStats
          initialCO2={totalCO2Saved}
          initialListed={totalListed}
          initialTransferred={totalTransferred}
          totalWeightKg={totalWeightKg}
        />

        {/* Analytics & Live Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <DashboardChart data={materials} />
          </div>

          <div className="lg:col-span-1">
            <RecentLedger transactions={transactions} />
          </div>
        </div>

        {/* Available Materials Marketplace Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between border-b border-[#2E362C] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Boxes className="w-5 h-5 text-[#4E9B6F]" />
              <h2 className="font-display text-2xl font-bold text-[#EDEAE0] tracking-tight">
                Marketplace Register & Logistics Directory
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#8B9188]">
              <span>Real-time inventory verified by Agent 1</span>
            </div>
          </div>

          <MarketplaceGrid initialMaterials={materials} />
        </div>
      </main>

      {/* Manifest Footer */}
      <footer className="border-t border-[#2E362C] bg-[#10140F] py-8 text-center font-mono text-xs text-[#8B9188]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4E9B6F]" />
            <span>CircularChain Industrial Ledger Protocol</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#4E9B6F] transition-colors">
              Protocol Overview
            </Link>
            <span>&bull;</span>
            <Link href="/verify" className="hover:text-[#4E9B6F] transition-colors">
              Verify On-Chain
            </Link>
            <span>&bull;</span>
            <Link href="/leaderboard" className="hover:text-[#4E9B6F] transition-colors">
              Recycler Leaderboard
            </Link>
            <span>&bull;</span>
            <span>Polygon Amoy (80002)</span>
          </div>
          <div className="text-[10px]">Extended Producer Responsibility (EPR) Documentation</div>
        </div>
      </footer>
    </div>
  );
}
