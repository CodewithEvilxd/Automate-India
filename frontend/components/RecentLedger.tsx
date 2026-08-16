import React from "react";
import VerificationStamp from "@/components/VerificationStamp";
import { formatCategoryName, getCategoryIcon } from "@/components/CategoryBadge";
import { ArrowUpRight, Clock, FileSpreadsheet, ShieldCheck } from "lucide-react";

interface RecentLedgerProps {
  transactions: any[];
}

export default function RecentLedger({ transactions }: RecentLedgerProps) {
  return (
    <div className="bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-6 h-80 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-[#2E362C] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-[#4E9B6F]" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#EDEAE0] font-semibold">
            Verified Transfer Ledger
          </h3>
        </div>
        <span className="font-mono text-[10px] text-[#8B9188]">
          LIVE LOG
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
        {!transactions || transactions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <ShieldCheck className="w-8 h-8 text-[#8B9188]/40 mb-2" />
            <p className="font-mono text-xs text-[#8B9188] max-w-[240px]">
              No activity recorded yet — verified transfers will appear here as ledger entries.
            </p>
          </div>
        ) : (
          transactions.map((tx) => {
            const timeAgo = tx.timestamp
              ? new Date(tx.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Recent";

            const cat = tx.material?.category || "Material";
            const co2 = tx.material?.co2_saved_kg || 0;

            return (
              <div
                key={tx.id}
                className="group flex items-center justify-between p-2.5 rounded-[4px] bg-[#10140F] border border-[#2E362C] hover:border-[#4E9B6F]/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <VerificationStamp
                    txHash={tx.tx_hash}
                    size="sm"
                    status="verified"
                    rotation={-2}
                    className="shrink-0 scale-90"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#4E9B6F]">
                        {getCategoryIcon(cat, "w-3 h-3")}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#EDEAE0] truncate">
                        {formatCategoryName(cat)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 font-mono text-[10px] text-[#8B9188]">
                      <span>Lot #{tx.material_id?.substring?.(0, 6) || tx.material_id}</span>
                      <span>•</span>
                      <span className="text-[#4E9B6F] font-semibold">
                        +{co2.toFixed(1)} kg CO₂e
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 ml-3 font-mono">
                  <a
                    href={`https://amoy.polygonscan.com/tx/${tx.tx_hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-0.5 text-[11px] text-[#8B9188] hover:text-[#4E9B6F] transition-colors"
                  >
                    <span>
                      {tx.tx_hash ? `${tx.tx_hash.substring(0, 4)}...${tx.tx_hash.substring(tx.tx_hash.length - 3)}` : "0x..."}
                    </span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <span className="text-[9px] text-[#8B9188]/70 flex items-center gap-1 mt-0.5">
                    <Clock className="w-2.5 h-2.5" /> {timeAgo}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="border-t border-[#2E362C] pt-2 mt-2 flex items-center justify-between font-mono text-[10px] text-[#8B9188]">
        <span>Public Audit Trail</span>
        <a
          href="https://amoy.polygonscan.com"
          target="_blank"
          rel="noreferrer"
          className="text-[#4E9B6F] hover:underline"
        >
          Amoy Explorer &rarr;
        </a>
      </div>
    </div>
  );
}
