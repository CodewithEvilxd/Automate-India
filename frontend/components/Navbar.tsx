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
  ShieldCheck,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
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
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/70 dark:bg-slate-950/75 border-b border-slate-200/80 dark:border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-amber-500/20 border border-cyan-500/30 dark:border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-all">
                <Layers className="w-5 h-5 text-cyan-600 dark:text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
              <div>
                <span className="font-display font-extrabold text-lg text-slate-900 dark:text-white tracking-tight block">
                  Circular<span className="text-cyan-600 dark:text-cyan-400">Chain</span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 block -mt-1 font-semibold">
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
                        ? "bg-slate-900 text-white dark:bg-white/10 dark:text-cyan-400 font-semibold shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
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
          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all hover:scale-105"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Wallet Button */}
            <button
              onClick={connectWallet}
              disabled={connecting}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-mono text-xs transition-all shadow-sm"
            >
              <Wallet className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              {account ? (
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold">{truncatedAddr}</span>
                </span>
              ) : (
                <span>{connecting ? "Connecting..." : "Connect Wallet"}</span>
              )}
            </button>

            {/* List Material CTA */}
            <Link
              href="/list"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 px-4 py-1.5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 hover:scale-102"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>List Material</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
