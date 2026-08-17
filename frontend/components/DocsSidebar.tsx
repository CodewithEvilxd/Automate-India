"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Scale,
  Zap,
  Mic,
  ShieldAlert,
  Building2,
  ExternalLink,
  Code2,
  Lock,
  Layers,
  Sparkles,
  Play,
  Rocket,
} from "lucide-react";

export interface DocNavGroup {
  group: string;
  items: {
    href: string;
    label: string;
    badge?: string;
  }[];
}

export const DOC_NAVIGATION: DocNavGroup[] = [
  {
    group: "GETTING STARTED",
    items: [
      { href: "/docs", label: "Executive Summary & Mission" },
      { href: "/docs/problem-statement", label: "The Global & National Crisis", badge: "Critical" },
      { href: "/docs/solution-comparison", label: "Linear vs CircularChain Protocol" },
      { href: "/docs/quickstart", label: "Developer & Recycler Quickstart", badge: "New" },
    ],
  },
  {
    group: "6-AGENT AUTONOMOUS CORE",
    items: [
      { href: "/docs#agent-01", label: "Agent 01: Optical Quality Vision" },
      { href: "/docs#agent-02", label: "Agent 02: EPA WARM Carbon Math" },
      { href: "/docs#agent-03", label: "Agent 03: MCX & Logistics Oracle" },
      { href: "/docs#agent-04", label: "Agent 04: Indic Voice Bridge" },
      { href: "/docs#agent-05", label: "Agent 05: Cryptographic Fraud Radar" },
      { href: "/docs#agent-06", label: "Agent 06: CPCB Statutory EPR Shield" },
    ],
  },
  {
    group: "CRYPTOGRAPHIC PROTOCOL",
    items: [
      { href: "/docs#carbon-calculator-sim", label: "Interactive EPA Math Explorer" },
      { href: "/docs#web3-ledger", label: "Polygon Amoy Smart Contracts" },
    ],
  },
  {
    group: "DEVELOPER REFERENCE",
    items: [
      { href: "/docs#api-playground", label: "Interactive API Playground" },
      { href: "/docs#deployment", label: "Cloud & Edge Topology" },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <aside className="w-full">
      <div className="sticky top-20 rounded-2xl glass-panel border border-zinc-200 dark:border-white/10 p-4 shadow-xl bg-white/80 dark:bg-[#0D0E15]/80 backdrop-blur-xl space-y-6">
        {/* Quick Filter */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs font-medium placeholder:text-zinc-400 outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Navigation Groups */}
        <div className="space-y-5">
          {DOC_NAVIGATION.map((grp, idx) => {
            const filteredItems = grp.items.filter((item) =>
              searchQuery ? item.label.toLowerCase().includes(searchQuery.toLowerCase()) : true
            );

            if (filteredItems.length === 0) return null;

            return (
              <div key={idx} className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold block px-2 mb-1">
                  {grp.group}
                </span>
                {filteredItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between py-1.5 px-3 rounded-xl transition-all text-xs font-medium ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border-l-2 border-emerald-500 shadow-sm"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                            item.badge === "Critical"
                              ? "bg-rose-500/20 text-rose-500"
                              : "bg-orange-500/20 text-orange-500"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Quick APK CTA */}
        <div className="pt-4 border-t border-zinc-200 dark:border-white/[0.08] space-y-2">
          <a
            href="/circularchain.apk"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-display text-xs font-bold transition-all shadow-md shadow-orange-500/20"
          >
            <span>Download Release APK</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </aside>
  );
}
