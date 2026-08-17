"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem, index: number) => void;
}

export function SpotlightNavbar({
  items = [
    { label: "Overview", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "EPR Simulator", href: "/epr-calculator" },
    { label: "Verify Ledger", href: "/verify" },
    { label: "Rankings", href: "/leaderboard" },
    { label: "Whitepaper & Docs", href: "/docs" },
  ],
  className,
  onItemClick,
}: SpotlightNavbarProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  
  // Compute active index based on current URL
  const getActiveIndexFromPath = () => {
    const idx = items.findIndex((item) => {
      if (item.href === "/") return pathname === "/";
      return pathname.startsWith(item.href);
    });
    return idx !== -1 ? idx : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getActiveIndexFromPath());
  const [hoverX, setHoverX] = useState<number | null>(null);

  // Sync active index on route change
  useEffect(() => {
    setActiveIndex(getActiveIndexFromPath());
  }, [pathname]);

  // Spring animation helper
  const animateValue = (
    from: number,
    to: number,
    duration: number,
    onUpdate: (val: number) => void
  ) => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / duration;
      if (elapsed >= 1) {
        onUpdate(to);
        return;
      }
      // Ease out cubic
      const progress = 1 - Math.pow(1 - elapsed, 3);
      const current = from + (to - from) * progress;
      onUpdate(current);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const currentAmbienceX = useRef(0);
  const currentSpotlightX = useRef(0);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      currentSpotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;
        animateValue(currentSpotlightX.current, targetX, 250, (val) => {
          currentSpotlightX.current = val;
          nav.style.setProperty("--spotlight-x", `${val}px`);
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  // Handle the Ambience (Active Item) Movement
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;
    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;
      animateValue(currentAmbienceX.current, targetX, 300, (val) => {
        currentAmbienceX.current = val;
        nav.style.setProperty("--ambience-x", `${val}px`);
      });
    }
  }, [activeIndex, pathname]);

  return (
    <div className={cn("relative flex items-center justify-center font-sans", className)}>
      <nav
        ref={navRef}
        className={cn(
          "relative h-10 rounded-full transition-all duration-300 overflow-hidden",
          "bg-zinc-100/90 dark:bg-white/[0.05] border border-zinc-200/90 dark:border-white/10 shadow-sm backdrop-blur-xl"
        )}
      >
        {/* Content */}
        <ul className="relative flex items-center h-full px-1.5 gap-0.5 z-[10]">
          {items.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <li key={idx} className="relative h-full flex items-center justify-center">
                <Link
                  href={item.href}
                  data-index={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    onItemClick?.(item, idx);
                  }}
                  className={cn(
                    "px-3.5 py-1.5 text-xs font-semibold font-sans tracking-tight transition-colors duration-200 rounded-full flex items-center gap-1.5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50",
                    isActive
                      ? "text-zinc-950 dark:text-white font-bold"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 uppercase">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 1. The Moving Spotlight (Follows Mouse) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300"
          style={{
            opacity: hoverX !== null ? 1 : 0,
            background: `
              radial-gradient(
                120px circle at var(--spotlight-x, 50%) 100%,
                var(--spotlight-color, rgba(16, 185, 129, 0.15)) 0%,
                transparent 70%
              )
            `,
          }}
        />

        {/* 2. The Active State Ambience (Stays on Active) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
          style={{
            background: `
              radial-gradient(
                60px circle at var(--ambience-x, 50%) 0%,
                var(--ambience-color, #10B981) 0%,
                transparent 100%
              )
            `,
          }}
        />
      </nav>

      {/* Dynamic CSS Variables */}
      <style jsx>{`
        nav {
          --spotlight-color: rgba(16, 185, 129, 0.15);
          --ambience-color: #10b981;
        }
        :global(.dark) nav {
          --spotlight-color: rgba(16, 185, 129, 0.25);
          --ambience-color: #34d399;
        }
      `}</style>
    </div>
  );
}
