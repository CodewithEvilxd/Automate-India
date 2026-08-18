"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  Store,
  Calculator,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Layers,
      match: (path: string) => path === "/",
    },
    {
      label: "Market",
      href: "/marketplace",
      icon: Store,
      match: (path: string) => path.startsWith("/marketplace") || path.startsWith("/material"),
    },
    {
      label: "EPR Calc",
      href: "/epr-calculator",
      icon: Calculator,
      match: (path: string) => path.startsWith("/epr-calculator"),
    },
    {
      label: "Verify",
      href: "/verify",
      icon: ShieldCheck,
      match: (path: string) => path.startsWith("/verify"),
    },
    {
      label: "Docs",
      href: "/docs",
      icon: BookOpen,
      match: (path: string) => path.startsWith("/docs"),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden pointer-events-auto">
      {/* Background with glassmorphism blur and subtle top border */}
      <div className="mx-auto max-w-md px-3 pb-2 pt-1">
        <nav className="flex items-center justify-around rounded-2xl bg-white/90 dark:bg-[#121215]/90 backdrop-blur-2xl border border-zinc-200/90 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] py-1.5 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.match(pathname);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400 font-bold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                )}
              >
                {/* Active Pill Indicator */}
                {isActive && (
                  <span className="absolute -top-1 w-6 h-1 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                )}

                <div
                  className={cn(
                    "p-1 rounded-lg transition-transform duration-200",
                    isActive
                      ? "bg-emerald-500/15 dark:bg-emerald-500/20 scale-110"
                      : "group-hover:scale-105"
                  )}
                >
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 leading-none font-sans">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
