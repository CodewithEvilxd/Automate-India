"use client";

import React, { useState } from "react";
import {
  X,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Smartphone,
  Globe,
  ArrowRight,
} from "lucide-react";
import { useWallet, POLYGON_AMOY_CHAIN_ID, POLYGON_AMOY_EXPLORER } from "@/context/WalletContext";
import { ethers } from "ethers";

export default function WalletModal() {
  const {
    account,
    balance,
    chainId,
    isConnecting,
    error,
    isModalOpen,
    closeModal,
    connectInjected,
    connectCustomAddress,
    switchToAmoy,
    disconnect,
    refreshBalance,
    isCorrectNetwork,
  } = useWallet();

  const [customAddress, setCustomAddress] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"auto" | "manual">("auto");
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isModalOpen) return null;

  const handleCopy = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    connectCustomAddress(customAddress);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshBalance();
    setIsRefreshing(false);
  };

  const isMetaMaskAvailable = typeof window !== "undefined" && !!(window as any).ethereum;

  const openMetaMaskMobile = () => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href.replace(/^https?:\/\//, "");
      window.open(`https://metamask.app.link/dapp/${currentUrl}`, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Card */}
      <div
        className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#12131C] border-2 border-zinc-900 dark:border-white/20 shadow-[6px_8px_0px_rgba(0,0,0,1)] dark:shadow-[6px_8px_0px_#10B981] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-zinc-900 dark:border-white/10 bg-zinc-50 dark:bg-[#181926]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-sketch text-xl font-bold text-zinc-900 dark:text-white">
                {account ? "Connected Web3 Wallet" : "Connect Real Web3 Wallet"}
              </h2>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Polygon Amoy Testnet (80002)
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-rose-500/10 border-2 border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-tight">{error}</span>
            </div>
          )}

          {account ? (
            /* CONNECTED STATE */
            <div className="space-y-5">
              {/* Status Badge */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-sketch font-bold text-xs text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                    Live Active Session
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700">
                  {chainId === POLYGON_AMOY_CHAIN_ID ? "Amoy 80002" : `Chain: ${chainId || "Custom"}`}
                </span>
              </div>

              {/* Address Box */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-sketch">
                  <span>Wallet Address</span>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">Persisted in Local Storage</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-bold text-zinc-900 dark:text-white break-all select-all">
                    {account}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 text-zinc-700 dark:text-zinc-200 transition-colors shrink-0 flex items-center gap-1 text-xs"
                    title="Copy full address"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Balance Box */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-amber-500/10 border-2 border-zinc-900 dark:border-white/10">
                <div>
                  <div className="text-xs font-sketch text-zinc-500 dark:text-zinc-400">
                    Live Amoy Balance
                  </div>
                  <div className="text-xl font-mono font-extrabold text-zinc-900 dark:text-white mt-0.5">
                    {balance !== null ? `${balance} MATIC` : "Loading..."}
                  </div>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 text-zinc-700 dark:text-zinc-300 transition-all active:scale-95"
                  title="Refresh Balance"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-emerald-500" : ""}`} />
                </button>
              </div>

              {/* Wrong Network Warning */}
              {!isCorrectNetwork && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-sketch font-bold text-amber-800 dark:text-amber-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                    <span>Wrong Network Detected</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    Please switch to Polygon Amoy Testnet (80002) to execute smart contract transactions.
                  </p>
                  <button
                    onClick={() => switchToAmoy()}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-amber-500 text-zinc-950 font-sketch font-bold text-xs hover:bg-amber-400 transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                  >
                    Switch to Polygon Amoy
                  </button>
                </div>
              )}

              {/* Actions: View Explorer & Disconnect */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`${POLYGON_AMOY_EXPLORER}/address/${account}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 text-xs font-sketch font-bold text-zinc-800 dark:text-zinc-200 transition-colors"
                >
                  <span>PolygonScan</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    disconnect();
                    closeModal();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-sketch font-bold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          ) : (
            /* DISCONNECTED STATE */
            <div className="space-y-5">
              {/* Tab Selector */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => setActiveTab("auto")}
                  className={`py-2 text-xs font-sketch font-bold rounded-xl transition-all ${
                    activeTab === "auto"
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200 dark:border-zinc-700"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  Browser / Injected
                </button>
                <button
                  onClick={() => setActiveTab("manual")}
                  className={`py-2 text-xs font-sketch font-bold rounded-xl transition-all ${
                    activeTab === "manual"
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200 dark:border-zinc-700"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  Enter Real Address
                </button>
              </div>

              {activeTab === "auto" ? (
                <div className="space-y-3">
                  {isMetaMaskAvailable ? (
                    <button
                      onClick={() => connectInjected()}
                      disabled={isConnecting}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#FCFBF7] dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-zinc-800 border-2 border-zinc-900 dark:border-white/20 transition-all shadow-[3px_4px_0px_rgba(0,0,0,1)] dark:shadow-[3px_4px_0px_#10B981] group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-600 font-bold text-lg">
                          🦊
                        </div>
                        <div>
                          <div className="font-sketch font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            Connect MetaMask / Extension
                          </div>
                          <div className="text-[11px] text-zinc-500 font-mono">
                            Auto-syncs live account & switches to Amoy
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500 transition-colors group-hover:translate-x-0.5" />
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 space-y-2">
                        <div className="flex items-center gap-2 font-sketch font-bold text-xs text-amber-800 dark:text-amber-300">
                          <Globe className="w-4 h-4 text-amber-500" />
                          <span>No Web3 Extension Detected</span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                          MetaMask or Trust Wallet extension is not installed in this browser.
                        </p>
                      </div>

                      {/* Mobile Deep Link */}
                      <button
                        onClick={openMetaMaskMobile}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-500 text-zinc-950 font-sketch font-bold text-sm hover:bg-emerald-400 transition-all border-2 border-zinc-900 shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Open in MetaMask Mobile App</span>
                      </button>

                      <p className="text-center text-[11px] text-zinc-500 font-mono">
                        Or click "Enter Real Address" above to connect directly.
                      </p>
                    </div>
                  )}

                  <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Real EVM connection — never connects dummy wallets.</span>
                  </div>
                </div>
              ) : (
                /* MANUAL REAL ADDRESS ENTRY */
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-sketch font-bold text-zinc-700 dark:text-zinc-300">
                      Paste Your Real EVM Address:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="0x..."
                        value={customAddress}
                        onChange={(e) => setCustomAddress(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white/20 text-xs font-mono text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                      {customAddress && (
                        <div className="absolute right-3 top-3">
                          {ethers.isAddress(customAddress.trim()) ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-500" />
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                      Your address will be checksum-validated and saved locally so you remain connected even after refreshing the page.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isConnecting || !ethers.isAddress(customAddress.trim())}
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-sketch font-bold text-sm transition-all border-2 border-zinc-900 shadow-[3px_4px_0px_rgba(0,0,0,1)] cursor-pointer"
                  >
                    {isConnecting ? "Connecting & Verifying..." : "Connect Real Address"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
