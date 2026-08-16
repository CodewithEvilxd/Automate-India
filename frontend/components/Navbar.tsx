"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ethers } from "ethers";
import { Plus, RefreshCw, Wallet, Trophy, SearchCheck, LayoutDashboard, Calculator } from "lucide-react";

export default function Navbar() {
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const pathname = usePathname();

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
      alert("MetaMask is not installed. Please install MetaMask to connect your wallet.");
      return;
    }
    setConnecting(true);
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
    } catch (e: any) {
      console.error(e);
    } finally {
      setConnecting(false);
    }
  };

  const truncatedAddr = account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : null;

  return (
    <nav className="border-b border-[#2E362C] bg-[#10140F]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-[#1B211A] border border-[#2E362C] group-hover:border-[#4E9B6F] rounded-[4px] flex items-center justify-center transition-colors">
                <RefreshCw className="w-5 h-5 text-[#4E9B6F]" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-[#EDEAE0] tracking-tight block">
                  CircularChain
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#8B9188] block -mt-1">
                  Verifiable Industrial Ledger
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1 font-mono text-xs">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-[4px] transition-colors ${
                  pathname === "/"
                    ? "bg-[#1B211A] text-[#4E9B6F] font-bold border border-[#2E362C]"
                    : "text-[#8B9188] hover:text-[#EDEAE0]"
                }`}
              >
                Overview
              </Link>
              <Link
                href="/marketplace"
                className={`px-3 py-1.5 rounded-[4px] transition-colors flex items-center gap-1.5 ${
                  pathname === "/marketplace"
                    ? "bg-[#1B211A] text-[#4E9B6F] font-bold border border-[#2E362C]"
                    : "text-[#8B9188] hover:text-[#EDEAE0]"
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Marketplace</span>
              </Link>
              <Link
                href="/epr-calculator"
                className={`px-3 py-1.5 rounded-[4px] transition-colors flex items-center gap-1.5 ${
                  pathname === "/epr-calculator"
                    ? "bg-[#1B211A] text-[#4E9B6F] font-bold border border-[#2E362C]"
                    : "text-[#8B9188] hover:text-[#EDEAE0]"
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>EPR Simulator</span>
              </Link>
              <Link
                href="/verify"
                className={`px-3 py-1.5 rounded-[4px] transition-colors flex items-center gap-1.5 ${
                  pathname === "/verify"
                    ? "bg-[#1B211A] text-[#4E9B6F] font-bold border border-[#2E362C]"
                    : "text-[#8B9188] hover:text-[#EDEAE0]"
                }`}
              >
                <SearchCheck className="w-3.5 h-3.5" />
                <span>Verify Ledger</span>
              </Link>
              <Link
                href="/leaderboard"
                className={`px-3 py-1.5 rounded-[4px] transition-colors flex items-center gap-1.5 ${
                  pathname === "/leaderboard"
                    ? "bg-[#1B211A] text-[#4E9B6F] font-bold border border-[#2E362C]"
                    : "text-[#8B9188] hover:text-[#EDEAE0]"
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Leaderboard</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={connectWallet}
              disabled={connecting}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-[#1B211A] hover:bg-[#232B22] border border-[#2E362C] hover:border-[#4E9B6F]/40 text-[#EDEAE0] font-mono text-xs transition-colors"
            >
              <Wallet className="w-3.5 h-3.5 text-[#8B9188]" />
              {account ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4E9B6F]" />
                  <span>{truncatedAddr}</span>
                </span>
              ) : (
                <span>{connecting ? "Connecting..." : "Connect Wallet"}</span>
              )}
            </button>

            <Link
              href="/list"
              className="inline-flex items-center gap-1.5 bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] px-4 py-1.5 rounded-[4px] font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List Material</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
