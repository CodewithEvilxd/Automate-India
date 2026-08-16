import React from "react";

interface VerificationStampProps {
  txHash?: string;
  size?: "sm" | "md" | "lg";
  status?: "verified" | "pending" | "empty";
  rotation?: number;
  className?: string;
}

export default function VerificationStamp({
  txHash,
  size = "md",
  status = "verified",
  rotation = 3,
  className = "",
}: VerificationStampProps) {
  const displayHash = txHash
    ? txHash.length > 14
      ? `${txHash.substring(0, 6)}...${txHash.substring(txHash.length - 4)}`
      : txHash
    : "ON-CHAIN";

  const sizeClasses = {
    sm: "w-16 h-16 text-[8px]",
    md: "w-24 h-24 text-[10px]",
    lg: "w-36 h-36 text-[12px]",
  };

  const centerTextSize = {
    sm: "text-[7px]",
    md: "text-[9px]",
    lg: "text-[11px]",
  };

  const isVerified = status === "verified";
  const isPending = status === "pending";

  const colorScheme = isVerified
    ? "border-[#4E9B6F] text-[#4E9B6F] shadow-[0_0_15px_rgba(78,155,111,0.15)]"
    : isPending
    ? "border-[#D98A3D] text-[#D98A3D] shadow-[0_0_15px_rgba(217,138,61,0.15)]"
    : "border-[#8B9188]/40 text-[#8B9188]/60";

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      className={`relative inline-flex items-center justify-center rounded-full border-2 border-solid bg-[#1B211A]/90 backdrop-blur-sm select-none transition-all duration-300 ${sizeClasses[size]} ${colorScheme} ${className}`}
      title={txHash ? `Verified On-Chain: ${txHash}` : "CircularChain Ledger Stamp"}
    >
      <div className="absolute inset-[3px] rounded-full border border-dashed border-current opacity-80 pointer-events-none flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center p-1 leading-tight">
          <span className="font-mono uppercase tracking-widest text-[6px] md:text-[7px] font-bold opacity-75">
            {isPending ? "VERIFYING" : "LEDGER"}
          </span>
          <span
            className={`font-mono font-bold tracking-wider my-0.5 uppercase ${centerTextSize[size]}`}
          >
            {isPending ? "PENDING" : displayHash}
          </span>
          <span className="font-mono uppercase tracking-tighter text-[5px] md:text-[6px] opacity-70">
            {isVerified ? "POLYGON AMOY" : isPending ? "AGENT 2" : "UNVERIFIED"}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
    </div>
  );
}
