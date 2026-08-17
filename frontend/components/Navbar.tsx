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
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import ApkDownloadModal from "./ApkDownloadModal";
import { SpotlightNavbar } from "./ui/spotlight-navbar";

export default function Navbar() {
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const eth = (window as any).ethereum;
      eth
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        })
        .catch(() => {});

      const handleAccountsChanged = (accounts: string[]) => {
        setAccount(accounts.length > 0 ? accounts[0] : null);
      };

      eth.on("accountsChanged", handleAccountsChanged);
      return () => {
        eth.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      alert("MetaMask is not installed. Connecting with verified Amoy demo wallet.");
      setAccount("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
      return;
    }
    setConnecting(true);
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
    } catch (e: any) {
      setAccount("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
    } finally {
      setConnecting(false);
    }
  };

  const truncatedAddr = account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : null;

  const navItems = [
    { label: "Overview", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "EPR Simulator", href: "/epr-calculator" },
    { label: "Verify Ledger", href: "/verify" },
    { label: "Rankings", href: "/leaderboard" },
    { label: "Whitepaper & Docs", href: "/docs" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/90 dark:bg-[#09090B]/90 border-b border-zinc-200 dark:border-white/[0.08] transition-colors duration-250 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-zinc-300 dark:border-white/10 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform bg-black">
                  <img src="/logo-192.png" alt="CircularChain Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-base text-zinc-900 dark:text-white tracking-tight block">
                    Circular<span className="text-emerald-500">Chain</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 block -mt-1 font-semibold">
                    AUTONOMOUS PROTOCOL
                  </span>
                </div>
              </Link>
            </div>

            {/* Vengeance UI Spotlight Navbar (Center) */}
            <div className="hidden lg:flex items-center justify-center">
              <SpotlightNavbar items={navItems} />
            </div>

            {/* Right Actions (APK Download, List Button, Theme Toggle, Wallet) */}
            <div className="flex items-center space-x-2.5">
              
              {/* Field APK CTA */}
              <button
                onClick={() => setIsApkModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold font-sans rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/20 transition-all cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Field APK</span>
              </button>

              {/* List Scrap CTA */}
              <Link
                href="/list"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold font-sans rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-102 cursor-pointer"
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
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
              </button>

              {/* MetaMask / Web3 Wallet Button */}
              <button
                onClick={connectWallet}
                disabled={connecting}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-zinc-100 dark:bg-white/[0.08] hover:bg-zinc-200 dark:hover:bg-white/[0.14] text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/15 transition-all cursor-pointer shadow-sm"
              >
                <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                <span>{connecting ? "Connecting..." : truncatedAddr || "Connect Wallet"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* APK Download Modal */}
      <ApkDownloadModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />
    </>
  );
}
