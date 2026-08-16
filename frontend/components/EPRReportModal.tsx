"use client";

import React, { useRef } from "react";
import { OrgProfile, MaterialItem } from "@/lib/demo-data";
import VerificationStamp from "@/components/VerificationStamp";
import { formatCategoryName } from "@/components/CategoryBadge";
import { Printer, X, FileCheck } from "lucide-react";

interface EPRReportModalProps {
  org: OrgProfile;
  materials?: MaterialItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function EPRReportModal({
  org,
  materials = [],
  isOpen,
  onClose,
}: EPRReportModalProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const reportDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="bg-[#232B22] border-b border-[#2E362C] px-6 py-3.5 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-[#4E9B6F]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#EDEAE0] font-bold">
              Official EPR Compliance Report
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] font-mono text-xs uppercase font-bold tracking-wider transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#8B9188] hover:text-[#EDEAE0] hover:bg-[#1B211A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={reportRef}
          className="p-8 sm:p-12 overflow-y-auto bg-[#10140F] text-[#EDEAE0] font-sans print:p-0 print:bg-white print:text-black"
        >
          <div className="border-b-2 border-[#4E9B6F] pb-6 mb-6 flex justify-between items-start">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#4E9B6F] font-bold block mb-1">
                EPR AUDIT MANIFEST &bull; ISO 14064 PROTOCOL
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#EDEAE0] print:text-black">
                CircularChain Material Audit
              </h1>
              <p className="font-mono text-xs text-[#8B9188] mt-0.5 print:text-gray-600">
                Verifiable Public Ledger Proof on Polygon Amoy (ChainID 80002)
              </p>
            </div>
            <div className="text-right font-mono text-xs text-[#8B9188] print:text-gray-600">
              <div>Date: {reportDate}</div>
              <div>Reg No: {org.epr_registration_no}</div>
              <div className="text-[#4E9B6F] font-bold print:text-green-700">
                Status: AUDIT VERIFIED
              </div>
            </div>
          </div>

          <div className="bg-[#1B211A] print:bg-gray-100 border border-[#2E362C] print:border-gray-300 rounded-[4px] p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <span className="text-[10px] uppercase text-[#8B9188] block">Audited Organization:</span>
              <span className="font-bold text-sm text-[#EDEAE0] print:text-black block mt-0.5">
                {org.org_name}
              </span>
              <span className="text-[#8B9188] text-[11px] block mt-1">
                Location: {org.location}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#8B9188] block">On-Chain Wallet Address:</span>
              <span className="font-data text-[11px] text-[#4E9B6F] print:text-green-800 break-all block mt-0.5">
                {org.wallet_address}
              </span>
              <span className="text-[#8B9188] text-[11px] block mt-1">
                Reputation Score: {org.reputation_score} / 100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 text-center font-mono">
            <div className="bg-[#1B211A] print:bg-gray-50 border border-[#2E362C] print:border-gray-200 p-4 rounded-[4px]">
              <span className="text-[10px] uppercase text-[#8B9188] block mb-1">
                Total CO₂e Abated
              </span>
              <span className="font-display text-2xl font-bold text-[#4E9B6F] print:text-green-700">
                {org.total_co2_abated_kg.toLocaleString()} kg
              </span>
            </div>
            <div className="bg-[#1B211A] print:bg-gray-50 border border-[#2E362C] print:border-gray-200 p-4 rounded-[4px]">
              <span className="text-[10px] uppercase text-[#8B9188] block mb-1">
                Total Waste Diverted
              </span>
              <span className="font-display text-2xl font-bold text-[#EDEAE0] print:text-black">
                {org.total_mass_recycled_kg.toLocaleString()} kg
              </span>
            </div>
            <div className="bg-[#1B211A] print:bg-gray-50 border border-[#2E362C] print:border-gray-200 p-4 rounded-[4px]">
              <span className="text-[10px] uppercase text-[#8B9188] block mb-1">
                Settled Transfers
              </span>
              <span className="font-display text-2xl font-bold text-[#D98A3D] print:text-amber-800">
                {org.completed_transfers} Lots
              </span>
            </div>
          </div>

          <div className="border-l-2 border-[#4E9B6F] pl-4 py-1 mb-8 text-xs text-[#8B9188] print:text-gray-700 italic leading-relaxed">
            &ldquo;This compliance documentation is generated via deterministic EPA WARM carbon factor calculations and verified by AI Multi-Modal Agents. All state changes are immutably signed to smart contract MaterialRegistry on Polygon Amoy, ensuring auditable traceability for Indian Extended Producer Responsibility (EPR) requirements.&rdquo;
          </div>

          <div className="flex justify-between items-end pt-6 border-t border-[#2E362C] print:border-gray-300">
            <div className="font-mono text-[10px] text-[#8B9188] print:text-gray-500 space-y-1">
              <div>Smart Contract: MaterialRegistry (CIRC)</div>
              <div>RPC Endpoint: polygon-amoy-bor-rpc.publicnode.com</div>
              <div>Generated via CircularChain Protocol v1.0</div>
            </div>

            <div className="flex items-center gap-4">
              <VerificationStamp
                txHash="0x8f2e9a4f20bc871239ab"
                size="md"
                status="verified"
                rotation={-3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
