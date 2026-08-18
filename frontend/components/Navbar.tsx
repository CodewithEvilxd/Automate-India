"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ethers } from "ethers";
import {
  Plus,
  Layers,
  Wallet,
  Trophy,
  SearchCheck,
  LayoutDashboard,
  Calculator,
  Sun,
  Moon,
  Smartphone,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Menu,
  X,
  Store,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import ApkDownloadModal from "./ApkDownloadModal";
import WalletModal from "./WalletModal";
import { useWallet, POLYGON_AMOY_CHAIN_ID } from "@/context/WalletContext";
import { SpotlightNavbar } from "./ui/spotlight-navbar";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { account, balance, isConnecting, openModal, isCorrectNetwork, chainId } = useWallet();
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const truncatedAddr = account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : null;

  const navItems = [
    {
      label: "Overview",
      href: "/",
      icon: LayoutDashboard,
      desc: "Live multi-agent telemetry & MCX commodity feed",
    },
    {
      label: "Marketplace",
      href: "/marketplace",
      icon: Store,
      desc: "Verified secondary material lots & pricing",
      badge: "LIVE",
    },
    {
      label: "EPR Simulator",
      href: "/epr-calculator",
      icon: Calculator,
      desc: "CPCB statutory liability & credit calculator",
    },
    {
      label: "Verify Ledger",
      href: "/verify",
      icon: SearchCheck,
      desc: "Audit trail, QR verification & Polygonscan",
    },
    {
      label: "Rankings",
      href: "/leaderboard",
      icon: Trophy,
      desc: "Enterprise recycling leaderboards & ESG badges",
    },
    {
      label: "Whitepaper & Docs",
      href: "/docs",
      icon: BookOpen,
      desc: "6-agent architecture & technical blueprints",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/90 dark:bg-[#09090B]/90 border-b border-zinc-200 dark:border-white/[0.08] transition-colors duration-250 font-sans">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left: Logo & Brand */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Mobile Hamburger Toggle Button (Visible on < lg) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.06] border border-zinc-200 dark:border-white/10 transition-all cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-zinc-300 dark:border-white/10 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform bg-black shrink-0">
                  <img src="/logo-192.png" alt="CircularChain Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white tracking-tight block">
                    Circular<span className="text-emerald-500">Chain</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 dark:text-zinc-400 block -mt-1 font-semibold tracking-wider">
                    AUTONOMOUS PROTOCOL
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Spotlight Navbar (Hidden on < lg) */}
            <div className="hidden lg:flex items-center justify-center">
              <SpotlightNavbar items={navItems.map((n) => ({ label: n.label, href: n.href, badge: n.badge }))} />
            </div>

            {/* Right: Actions (Field APK, List Scrap, Theme, Wallet) */}
            <div className="flex items-center space-x-1.5 sm:space-x-2.5">
              
              {/* Field APK CTA (Hidden on small mobile screens, available in Hamburger Drawer) */}
              <button
                onClick={() => setIsApkModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold font-sans rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/20 transition-all cursor-pointer"
                title="Download Android APK"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden md:inline">Field APK</span>
              </button>

              {/* List Scrap CTA */}
              <Link
                href="/list"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold font-sans rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-102 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">List Scrap</span>
              </Link>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors border border-zinc-200 dark:border-white/10 cursor-pointer"
              >
                {theme === "dark" ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-700" />}
              </button>

              {/* Web3 Wallet Button (Real Connect & Modal) */}
              <button
                onClick={openModal}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-zinc-100 dark:bg-white/[0.08] hover:bg-zinc-200 dark:hover:bg-white/[0.14] text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/15 transition-all cursor-pointer shadow-sm active:scale-95"
                title={account ? `Connected: ${account}` : "Connect Real Web3 Wallet"}
              >
                {account ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                ) : (
                  <Wallet className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                )}
                <span className="max-w-[85px] sm:max-w-none truncate">
                  {isConnecting ? "Connecting..." : account ? truncatedAddr : "Connect Wallet"}
                </span>
                {account && balance && (
                  <span className="hidden xl:inline-block text-[10px] text-emerald-600 dark:text-emerald-400 font-sans border-l border-zinc-300 dark:border-zinc-700 pl-1.5">
                    {balance} MATIC
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer Overlay (< lg) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-start">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Sheet Panel */}
          <div className="relative w-full max-w-sm sm:max-w-md h-full bg-white dark:bg-[#09090B] border-r border-zinc-200 dark:border-white/10 shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-300">
            
            {/* Drawer Top Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl overflow-hidden border border-zinc-300 dark:border-white/10 bg-black flex items-center justify-center">
                  <img src="/logo-192.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-sm text-zinc-900 dark:text-white">
                    Circular<span className="text-emerald-500">Chain</span>
                  </span>
                  <span className="text-[9px] font-mono text-emerald-500 block font-bold">
                    POLYGON AMOY #80002
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.06] border border-zinc-200 dark:border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Pill */}
            <div className="p-4 bg-emerald-500/5 dark:bg-emerald-500/10 border-b border-emerald-500/15">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    6-Agent Radar Live
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  EPA 9.13 FACTOR
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="p-4 space-y-1.5 flex-1">
              <p className="text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 tracking-wider px-3 pb-1">
                PLATFORM SECTIONS
              </p>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-2xl transition-all group",
                      isActive
                        ? "bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold border border-emerald-500/30"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.05] border border-transparent"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          "p-2 rounded-xl transition-colors",
                          isActive
                            ? "bg-emerald-500 text-zinc-950"
                            : "bg-zinc-100 dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold">{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </Link>
                );
              })}
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 border-t border-zinc-200 dark:border-white/10 space-y-3 bg-zinc-50 dark:bg-zinc-900/50">
              
              {/* Field APK Download Banner */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsApkModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-transparent border border-emerald-500/30 text-left cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-emerald-500 text-zinc-950">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                      Download Field App (APK)
                    </span>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-mono">
                      v2.6.0 • Offline OCR & Voice AI
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Wallet & List Actions Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openModal();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-zinc-200 dark:bg-white/[0.08] hover:bg-zinc-300 dark:hover:bg-white/[0.14] text-xs font-mono font-bold text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/10 transition-all cursor-pointer truncate"
                >
                  {account ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  ) : (
                    <Wallet className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  )}
                  <span className="truncate">{account ? truncatedAddr : "Connect Wallet"}</span>
                </button>

                <Link
                  href="/list"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-zinc-950 transition-all shadow-md cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>List Scrap</span>
                </Link>
              </div>

              {/* Theme Selector */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-white/[0.06] text-xs text-zinc-500 dark:text-zinc-400">
                <span>Color Theme</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-200 dark:bg-white/[0.06] text-zinc-900 dark:text-white font-medium"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-zinc-700" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Field APK Download Modal */}
      <ApkDownloadModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />

      {/* Real Web3 Wallet Connect Modal */}
      <WalletModal />
    </>
  );
}
