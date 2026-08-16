import React from "react";
import Navbar from "@/components/Navbar";
import MarketplaceGrid from "@/components/MarketplaceGrid";
import { DEMO_MATERIALS } from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";
import { Layers } from "lucide-react";

export const dynamic = "force-dynamic";

async function getMaterials() {
  try {
    const dbMaterials = await prisma.material.findMany({
      orderBy: { created_at: "desc" },
    });
    if (dbMaterials && dbMaterials.length > 0) {
      return dbMaterials as any;
    }
  } catch (e) {
    console.warn("Using fallback demo materials for marketplace.");
  }
  return DEMO_MATERIALS;
}

export default async function MarketplacePage() {
  const materials = await getMaterials();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Consensus Secondary Materials Exchange</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Industrial Scrap & Secondary Lots
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-xl">
              Browse AI-verified industrial feedstock with certified EPA carbon abatement metrics and on-chain ownership lineage.
            </p>
          </div>
        </div>

        <MarketplaceGrid initialMaterials={materials} />
      </main>
    </div>
  );
}
