"use client";

import React, { useState } from "react";
import { Award, Check, Copy } from "lucide-react";

interface WalletBadgeProps {
  address: string;
  reputationScore?: number;
  showTrusted?: boolean;
  className?: string;
  truncate?: boolean;
}

export default function WalletBadge({
  address,
  reputationScore = 0,
  showTrusted = true,
  className = "",
  truncate = true,
}: WalletBadgeProps) {
  const [copied, setCopied] = useState(false);

  if (!address) return <span className="font-mono text-[#8B9188]">Unknown</span>;

  const displayAddr = truncate
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : address;

  const isTrusted = showTrusted && reputationScore >= 1;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        onClick={handleCopy}
        title={`Click to copy: ${address}`}
        className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#1B211A] text-[#EDEAE0] border border-[#2E362C] hover:border-[#4E9B6F]/50 transition-colors cursor-pointer"
      >
        <span>{displayAddr}</span>
        {copied ? (
          <Check className="w-3 h-3 text-[#4E9B6F]" />
        ) : (
          <Copy className="w-3 h-3 text-[#8B9188] hover:text-[#EDEAE0]" />
        )}
      </span>

      {isTrusted && (
        <span
          title={`Reputation Score: ${reputationScore} on-chain transfers`}
          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] bg-[#4E9B6F]/10 border border-[#4E9B6F]/40 text-[#4E9B6F] text-[10px] font-mono uppercase tracking-wider font-semibold"
        >
          <Award className="w-3 h-3" />
          <span>Trusted Partner</span>
        </span>
      )}
    </div>
  );
}
