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

  const navLinks = [
    { href: "/", label: "Overview", icon: null },
    { href: "/marketplace", label: "Marketplace", icon: LayoutDashboard },
    { href: "/epr-calculator", label: "EPR Simulator", icon: Calculator },
    { href: "/verify", label: "Verify Ledger", icon: SearchCheck },
    { href: "/leaderboard", label: "Rankings", icon: Trophy },
    { href: "/docs", label: "Whitepaper & Docs", icon: BookOpen },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/80 dark:bg-[#09090B]/85 border-b border-zinc-200 dark:border-white/[0.08] transition-colors duration-250">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-zinc-300 dark:border-white/10 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform bg-black">
                  <img src="/logo-192.png" alt="CircularChain Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-base text-zinc-900 dark:text-white tracking-tight block">
                    Circular<span className="text-emerald-500">Chain</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400 ml-0.5 mb-0.5 shadow-sm shadow-orange-500/50" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block -mt-1 font-semibold">
                    Verifiable Industrial Ledger
                  </span>
                </div>
              </Link>

              {/* Nav Links */}
              <nav className="hidden md:flex items-center space-x-1 font-medium text-xs">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                        isActive
                          ? "bg-zinc-900 text-white dark:bg-white/10 dark:text-white font-semibold shadow-sm"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                      }`}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Action Bar */}
            <div className="flex items-center space-x-2 sm:space-x-2.5">
              {/* Mobile App Download Button */}
              <button
                onClick={() => setIsApkModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/[0.06] hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 font-sans text-xs font-semibold whitespace-nowrap transition-all shadow-sm group hover:scale-105"
                title="Download Android APK"
              >
                <Smartphone className="w-3.5 h-3.5 text-orange-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">App</span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  APK
                </span>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2 rounded-xl bg-zinc-100 dark:bg-white/[0.06] border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all hover:scale-105"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-zinc-700" />
                )}
              </button>

              {/* Wallet Button */}
              <button
                onClick={connectWallet}
                disabled={connecting}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/[0.06] hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 font-mono text-xs transition-all shadow-sm"
              >
                <Wallet className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                {account ? (
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-semibold">{truncatedAddr}</span>
                  </span>
                ) : (
                  <span>{connecting ? "Connecting..." : "Connect"}</span>
                )}
              </button>

              {/* List Material CTA */}
              <Link
                href="/list"
                className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-1.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all shadow-sm shadow-emerald-500/20 hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">List Material</span>
                <span className="sm:hidden">List</span>
              </Link>
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
