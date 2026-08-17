"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import Link from "next/link";
import {
  NotebookSpiralBinding,
  PaperclipElement,
  WashiTapeCenter,
  WashiTapeCorner,
  DoodleUnderline,
  DoodleStar,
  StampBadge,
  DoodleCircle,
} from "@/components/SketchElements";
import {
  Lock,
  ArrowLeft,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Code2,
  Cpu,
  Layers,
} from "lucide-react";

export default function BlockchainDocsPage() {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("0x3d0bc12948a7192837bc910283748293bc910293");
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="min-h-screen notebook-ruled notebook-doc-scope text-zinc-900 dark:text-zinc-100 transition-colors duration-250 flex flex-col font-sketch selection:bg-amber-300 selection:text-zinc-950 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-100">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b-2 border-zinc-900 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0D0E15] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-md">
        <WashiTapeCenter color="kraft" className="scale-125" />

        <div className="max-w-7xl mx-auto relative border-l-2 border-red-300/60 dark:border-red-500/30 pl-4 sm:pl-8 ml-1 sm:ml-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 text-xs font-sketch font-bold hover:bg-zinc-100 transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Manual</span>
            </Link>
            <StampBadge label="POLYGON AMOY 80002" variant="emerald" />
            <StampBadge label="SOLIDITY v0.8.20" variant="amber" />
            <StampBadge label="ERC-721 + ERC-2771" variant="sky" />
          </div>

          <h1 className="font-sketch text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            Polygon Amoy <span className="highlight-yellow px-2">Smart Contracts Architecture</span>
          </h1>
          <p className="font-sketch text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
            Immutable secondary commodity state transitions, decentralized escrow settlement, IPFS inspection hash pinning, and gasless ERC-2771 meta-transaction sponsorship on Polygon Amoy.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 relative">
        <NotebookSpiralBinding count={18} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pl-4 sm:pl-8">
          <aside className="lg:col-span-3">
            <DocsSidebar />
          </aside>

          <main className="lg:col-span-9 space-y-12 border-l-2 border-red-300/50 dark:border-red-500/20 pl-4 sm:pl-6">
            
            {/* SECTION 1: Deployment Details */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FEFCE8] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <PaperclipElement />

              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-amber-800 dark:text-amber-300 tracking-wider">
                  Chapter 7.1 // Network Parameters & Deployed Bytecode
                </span>
                <StampBadge label="LIVE TESTNET" variant="emerald" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Polygon Amoy (Chain ID: 80002)
              </h2>

              {/* Address Copy Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[3px_3px_0px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-sketch text-xs text-zinc-500 block uppercase font-bold">CircularChain Core Protocol Contract:</span>
                  <span className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-300 break-all">
                    0x3d0bc12948a7192837bc910283748293bc910293
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-zinc-950 font-sketch text-xs font-bold border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-1 shrink-0 hover:bg-amber-300"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? "Copied!" : "Copy Contract Address"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sketch text-xs">
                <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-300 dark:border-zinc-700">
                  <span className="text-zinc-500 block">RPC Endpoint:</span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">https://rpc-amoy.polygon.technology</span>
                </div>
                <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-300 dark:border-zinc-700">
                  <span className="text-zinc-500 block">Block Time:</span>
                  <span className="font-mono font-bold text-emerald-600">~2.1 Seconds</span>
                </div>
                <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-300 dark:border-zinc-700">
                  <span className="text-zinc-500 block">Average Gas Fee:</span>
                  <span className="font-mono font-bold text-amber-600">&lt; $0.001 (Sponsored)</span>
                </div>
              </div>
            </section>

            {/* SECTION 2: State Machine Lifecycle */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-[#FCFBF7] dark:bg-[#12131C] border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_#10B981] space-y-6">
              <WashiTapeCenter color="mint" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                  Chapter 7.2 // Finite State Machine Transitions
                </span>
                <StampBadge label="DETERMINISTIC ESCROW" variant="amber" />
              </div>

              <h2 className="font-sketch text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Material Lot On-Chain Lifecycle
              </h2>

              {/* State progression */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-sketch text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] space-y-1">
                  <span className="font-mono font-bold text-zinc-400 block">STATE 01</span>
                  <strong className="block text-zinc-900 dark:text-white text-sm">LISTED</strong>
                  <p className="font-sans text-[11px] text-zinc-600 dark:text-zinc-400">Agent 01 Vision proof & MCX price locked.</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] space-y-1">
                  <span className="font-mono font-bold text-amber-500 block">STATE 02</span>
                  <strong className="block text-zinc-900 dark:text-white text-sm">ESCROW LOCKED</strong>
                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400">Smelter locks purchase funds in smart contract.</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] space-y-1">
                  <span className="font-mono font-bold text-emerald-500 block">STATE 03</span>
                  <strong className="block text-zinc-900 dark:text-white text-sm">TRANSFERRED</strong>
                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400">Weighbridge mass confirmed; funds released via UPI.</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] space-y-1">
                  <span className="font-mono font-bold text-purple-500 block">STATE 04</span>
                  <strong className="block text-zinc-900 dark:text-white text-sm">EPR MINTED</strong>
                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400">Avoided carbon NFT minted & retired on CPCB ledger.</p>
                </div>
              </div>
            </section>

            {/* SECTION 3: Solidity Code Implementation */}
            <section className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-white/20 shadow-[4px_5px_0px_rgba(0,0,0,0.9)] space-y-6">
              <WashiTapeCenter color="yellow" />

              <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-300 dark:border-white/10 pb-3">
                <span className="font-sketch text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                  Chapter 7.3 // CircularChain.sol Interface
                </span>
                <span className="font-mono text-xs font-bold text-zinc-500">SOLIDITY v0.8.20</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#FEFCE8] dark:bg-black border-2 border-zinc-950 dark:border-white/20 font-sketch text-xs text-zinc-900 dark:text-zinc-100 shadow-[3px_4px_0px_rgba(0,0,0,0.85)] space-y-1 overflow-x-auto">
                <pre className="font-mono text-xs text-zinc-800 dark:text-zinc-200">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract CircularChainCore is ERC721, ERC2771Context {
    enum LotState { Listed, EscrowLocked, Transferred, EPRMinted, Retired }

    struct MaterialLot {
        uint256 lotId;
        address seller;       // Informal Collector
        address buyer;        // Enterprise Smelter
        uint256 massKg;
        uint256 purityBps;    // e.g. 9850 = 98.50%
        uint256 carbonOffsetKg;
        string ipfsProofHash; // Pinata CID
        LotState state;
    }

    mapping(uint256 => MaterialLot) public lots;

    event LotCreated(uint256 indexed lotId, address indexed seller, uint256 massKg);
    event EscrowLocked(uint256 indexed lotId, address indexed buyer);
    event OwnershipTransferred(uint256 indexed lotId, address indexed newOwner);

    constructor(address trustedForwarder) 
        ERC721("CircularChain Material Asset", "CCMAT")
        ERC2771Context(trustedForwarder) {}

    function listMaterial(
        uint256 massKg,
        uint256 purityBps,
        uint256 carbonOffsetKg,
        string calldata ipfsProofHash
    ) external returns (uint256 lotId) {
        lotId = uint256(keccak256(abi.encodePacked(_msgSender(), block.timestamp, massKg)));
        lots[lotId] = MaterialLot(lotId, _msgSender(), address(0), massKg, purityBps, carbonOffsetKg, ipfsProofHash, LotState.Listed);
        _safeMint(_msgSender(), lotId);
        emit LotCreated(lotId, _msgSender(), massKg);
    }
}`}
                </pre>
              </div>
            </section>

            {/* Navigation */}
            <div className="pt-4 border-t-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-between">
              <Link
                href="/docs/agents/agent-06"
                className="font-sketch text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Agent 06 CPCB EPR Shield</span>
              </Link>
              <Link
                href="/docs/api"
                className="font-sketch text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Next: Interactive REST API</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
