"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  Code2,
  Terminal,
  Play,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function ApiDocsPage() {
  const [selectedLang, setSelectedLang] = useState<"curl" | "ts" | "python">("curl");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  const copySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const executeLiveApiCall = async () => {
    setIsLoadingApi(true);
    try {
      const res = await fetch("https://circularchain-backend.onrender.com/api/mcx-oracle");
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setApiResponse(JSON.stringify({ error: "Failed to connect to live backend", details: e.message }, null, 2));
    } finally {
      setIsLoadingApi(false);
    }
  };

  const endpoints = [
    {
      method: "GET",
      path: "/api/mcx-oracle",
      desc: "Fetches live continuous Indian scrap commodity spot prices and percentage changes.",
      curl: 'curl -X GET "https://circularchain-backend.onrender.com/api/mcx-oracle"',
      response: '{\n  "success": true,\n  "commodities": [\n    {\n      "symbol": "CU-BERRY",\n      "name": "Copper Scrap (Heavy Berry No. 1)",\n      "unitPriceINR": 760.0,\n      "unit": "kg",\n      "change": "+1.8%",\n      "trend": "up"\n    }\n  ]\n}',
    },
    {
      method: "POST",
      path: "/api/cpcb/calculate",
      desc: "Calculates statutory CPCB recycling targets, avoided penalties, and mandatory PCR percentages for FY 2026-27.",
      curl: 'curl -X POST "https://circularchain-backend.onrender.com/api/cpcb/calculate" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"category": "aluminum", "procuredMassKg": 5000}\'',
      response: '{\n  "category": "aluminum",\n  "procuredMassKg": 5000,\n  "targetRecycledKg": 3750,\n  "co2AbatedKg": 45650,\n  "avoidedPenaltyINR": 42500\n}',
    },
    {
      method: "POST",
      path: "/api/verify-transfer",
      desc: "Executes Agent 02 mathematical verification, Agent 05 fraud auditing, and anchors ownership transfer on Polygon Amoy.",
      curl: 'curl -X POST "https://circularchain-backend.onrender.com/api/verify-transfer" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"materialId": "lot_alum_01", "buyerWallet": "0x90F79bf6EB2c4f870365E785982E1f101E93b906"}\'',
      response: '{\n  "success": true,\n  "txHash": "0x3d0a4f91bc8271039847192bc910293847291038",\n  "verification": { "verified": true },\n  "fraudAudit": { "passed": true, "risk_score": 5 }\n}',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFC] dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-3">
            <Link href="/docs" className="hover:text-emerald-500 transition-colors">
              Docs
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-500">Developer Reference</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-orange-500 font-bold">Interactive REST API</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Code2 className="w-5 h-5" />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Interactive REST API Reference
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed mt-2">
            Production REST endpoints for autonomous MCX pricing, CPCB compliance calculations, and Polygon Amoy on-chain settlement.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          <main className="lg:col-span-9 space-y-12">
            {/* Live Interactive Playground */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-500 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LIVE SANDBOX TESTER</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Live Cloud API Sandbox
              </h2>

              <div className="rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 overflow-hidden shadow-xl">
                <div className="bg-zinc-100 dark:bg-black/60 p-4 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                      GET
                    </span>
                    <code className="font-mono text-xs text-zinc-900 dark:text-white font-bold">
                      /api/mcx-oracle
                    </code>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex rounded-lg bg-zinc-200 dark:bg-white/[0.06] p-0.5 text-[11px] font-mono">
                      {(["curl", "ts", "python"] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setSelectedLang(lang)}
                          className={`px-2.5 py-1 rounded-md uppercase transition-all ${
                            selectedLang === lang
                              ? "bg-white dark:bg-[#1E1F2A] text-zinc-900 dark:text-white font-bold shadow-sm"
                              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={executeLiveApiCall}
                      disabled={isLoadingApi}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 disabled:opacity-50"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isLoadingApi ? "Executing..." : "Run Test"}</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950 text-zinc-200 font-mono text-xs relative overflow-x-auto">
                  <pre className="text-zinc-300">
                    {selectedLang === "curl" &&
                      `curl -X GET "https://circularchain-backend.onrender.com/api/mcx-oracle" \\\n  -H "Accept: application/json"`}
                    {selectedLang === "ts" &&
                      `import axios from 'axios';\n\nconst { data } = await axios.get('https://circularchain-backend.onrender.com/api/mcx-oracle');\nconsole.log(data.commodities);`}
                    {selectedLang === "python" &&
                      `import requests\n\nresponse = requests.get("https://circularchain-backend.onrender.com/api/mcx-oracle")\nprint(response.json())`}
                  </pre>
                </div>

                {apiResponse && (
                  <div className="border-t border-zinc-200 dark:border-white/10 p-4 bg-zinc-900 text-emerald-400 font-mono text-xs">
                    <div className="flex items-center justify-between text-zinc-400 text-[10px] uppercase mb-2">
                      <span>Live Response Output:</span>
                      <span className="text-emerald-400 font-bold">HTTP 200 OK</span>
                    </div>
                    <pre className="overflow-x-auto max-h-60 text-[11px] leading-relaxed">
                      {apiResponse}
                    </pre>
                  </div>
                )}
              </div>
            </section>

            {/* Endpoints Directory */}
            <section className="space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
                All Core API Endpoints
              </h3>

              <div className="space-y-4 font-mono text-xs">
                {endpoints.map((ep, idx) => (
                  <div key={idx} className="p-6 rounded-3xl glass-panel border border-zinc-200 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          ep.method === "GET" ? "bg-emerald-500/20 text-emerald-500" : "bg-orange-500/20 text-orange-500"
                        }`}>
                          {ep.method}
                        </span>
                        <code className="text-zinc-900 dark:text-white font-bold text-xs">{ep.path}</code>
                      </div>
                      <button
                        onClick={() => copySnippet(ep.curl, ep.path)}
                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 text-[10px]"
                      >
                        {copiedText === ep.path ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedText === ep.path ? "Copied" : "Copy cURL"}</span>
                      </button>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 font-sans text-xs">{ep.desc}</p>
                    <pre className="p-3.5 rounded-2xl bg-zinc-950 text-zinc-300 overflow-x-auto text-[11px]">
                      {ep.response}
                    </pre>
                  </div>
                ))}
              </div>
            </section>

            {/* Navigation Footer */}
            <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/docs/blockchain"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/10 text-zinc-900 dark:text-white font-display text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Polygon Amoy Contracts</span>
              </Link>

              <Link
                href="/docs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-display text-xs font-bold shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <span>Back to Overview</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
