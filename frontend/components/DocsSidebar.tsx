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
  Rocket,
  Compass,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface DocNavGroup {
  group: string;
  items: {
    href: string;
    label: string;
    badge?: string;
    icon?: any;
  }[];
}

export const DOC_NAVIGATION: DocNavGroup[] = [
  {
    group: "GETTING STARTED",
    items: [
      { href: "/docs", label: "Executive Summary & Mission", icon: BookOpen },
      { href: "/docs/origin-story", label: "Origin Story & Empathy Map", badge: "Story", icon: Heart },
      { href: "/docs/problem-statement", label: "The Global & National Crisis", badge: "Critical", icon: AlertTriangle },
      { href: "/docs/solution-comparison", label: "Linear vs CircularChain Protocol", icon: CheckCircle2 },
      { href: "/docs/quickstart", label: "Developer & Recycler Quickstart", badge: "New", icon: Rocket },
    ],
  },
  {
    group: "6-AGENT AUTONOMOUS CORE",
    items: [
      { href: "/docs/agents/agent-01", label: "Agent 01: Optical Quality Vision", icon: Cpu },
      { href: "/docs/agents/agent-02", label: "Agent 02: EPA WARM Carbon Math", icon: Scale },
      { href: "/docs/agents/agent-03", label: "Agent 03: MCX & Logistics Oracle", icon: Zap },
      { href: "/docs/agents/agent-04", label: "Agent 04: Indic Voice Bridge", icon: Mic },
      { href: "/docs/agents/agent-05", label: "Agent 05: Cryptographic Fraud Radar", icon: ShieldAlert },
      { href: "/docs/agents/agent-06", label: "Agent 06: CPCB Statutory EPR Shield", icon: Building2 },
    ],
  },
  {
    group: "CRYPTOGRAPHIC PROTOCOL",
    items: [
      { href: "/docs/blockchain", label: "Polygon Amoy Smart Contracts", icon: Lock },
    ],
  },
  {
    group: "DEVELOPER REFERENCE",
    items: [
      { href: "/docs/api", label: "Interactive REST API Reference", icon: Code2 },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Find currently active item
  const currentItem = DOC_NAVIGATION.flatMap((g) => g.items).find(
    (i) => i.href === pathname
  ) || DOC_NAVIGATION[0].items[0];

  return (
    <aside className="w-full">
      <div className="sticky top-20 rounded-3xl bg-white/95 dark:bg-[#101118]/95 border-2 border-zinc-900 dark:border-white/20 shadow-[4px_4px_0px_#10B981] dark:shadow-[4px_4px_0px_rgba(16,185,129,0.3)] p-4 sm:p-5 backdrop-blur-xl space-y-4 sm:space-y-6">
        
        {/* Mobile Accordion Toggle Header (< lg) */}
        <div className="lg:hidden flex items-center justify-between pb-2 border-b-2 border-dashed border-zinc-300 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-sketch font-bold text-sm text-zinc-900 dark:text-white">
              Current: <span className="text-emerald-600 dark:text-emerald-400">{currentItem.label}</span>
            </span>
          </div>

          <button
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-sketch cursor-pointer"
          >
            <span>{mobileExpanded ? "Close" : "Chapters"}</span>
            {mobileExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Desktop Header (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center justify-between pb-3 border-b-2 border-dashed border-zinc-300 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-sketch font-bold text-base text-zinc-900 dark:text-white">
              Field Notebook
            </span>
          </div>
          <span className="font-sketch text-xs text-zinc-500 font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-500/30">
            SPEC v2.6
          </span>
        </div>

        {/* Collapsible Content Container for Mobile / Always Visible on Desktop */}
        <div className={`${mobileExpanded ? "block" : "hidden"} lg:block space-y-5`}>
          
          {/* Quick Filter */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notebook chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-100/80 dark:bg-white/[0.04] border-2 border-zinc-300 dark:border-white/10 rounded-2xl pl-9 pr-3 py-2 text-xs font-mono placeholder:text-zinc-400 outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-black transition-all"
            />
          </div>

          {/* Navigation Groups */}
          <div className="space-y-4">
            {DOC_NAVIGATION.map((grp, idx) => {
              const filteredItems = grp.items.filter((item) =>
                searchQuery ? item.label.toLowerCase().includes(searchQuery.toLowerCase()) : true
              );

              if (filteredItems.length === 0) return null;

              return (
                <div key={idx} className="space-y-1">
                  <span className="font-sketch text-xs text-emerald-600 dark:text-emerald-400 font-bold block px-2 tracking-wide">
                    [ {grp.group} ]
                  </span>
                  {filteredItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon || BookOpen;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileExpanded(false)}
                        className={`flex items-center justify-between py-2 px-3 rounded-xl transition-all text-xs font-sans font-semibold ${
                          isActive
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border-2 border-emerald-500 shadow-[2px_2px_0px_#10B981] transform -rotate-0.5"
                            : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.04] hover:translate-x-1"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase shrink-0 ${
                              item.badge === "Critical"
                                ? "bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30"
                                : item.badge === "Story"
                                ? "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30"
                                : "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30"
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
          <div className="pt-3 border-t-2 border-dashed border-zinc-300 dark:border-white/10 space-y-2">
            <a
              href="/circularchain.apk"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-sketch text-xs sm:text-sm font-bold transition-all border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              <span>Field Collector APK</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </aside>
  );
}
