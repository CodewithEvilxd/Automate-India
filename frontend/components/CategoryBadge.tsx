import React from "react";
import {
  Layers,
  Container,
  FileText,
  Sparkles,
  Cpu,
  Scissors,
  Boxes,
  RefreshCw,
} from "lucide-react";

export function getCategoryIcon(category: string, className = "w-3.5 h-3.5") {
  const norm = (category || "").toLowerCase();
  if (norm.includes("aluminum") || norm.includes("steel") || norm.includes("metal")) {
    return <Layers className={className} />;
  }
  if (norm.includes("plastic") || norm.includes("pet") || norm.includes("hdpe")) {
    return <Container className={className} />;
  }
  if (norm.includes("paper") || norm.includes("cardboard")) {
    return <FileText className={className} />;
  }
  if (norm.includes("glass")) {
    return <Sparkles className={className} />;
  }
  if (norm.includes("electronic") || norm.includes("e-waste")) {
    return <Cpu className={className} />;
  }
  if (norm.includes("textile") || norm.includes("fabric")) {
    return <Scissors className={className} />;
  }
  if (norm.includes("mixed")) {
    return <Boxes className={className} />;
  }
  return <RefreshCw className={className} />;
}

export function formatCategoryName(category: string): string {
  const map: Record<string, string> = {
    aluminum: "Aluminum",
    steel: "Structural Steel",
    plastic_pet: "Plastic (PET)",
    plastic_hdpe: "Plastic (HDPE)",
    plastic: "Plastic",
    paper: "Paper / Fiber",
    glass: "Cullet Glass",
    electronic: "Electronics",
    textile: "Textiles",
    mixed: "Mixed Recyclables",
  };
  return map[category?.toLowerCase()] || category || "Recyclable";
}

export default function CategoryBadge({
  category,
  className = "",
}: {
  category: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-xs font-mono tracking-wide uppercase bg-[#232B22] text-[#EDEAE0] border border-[#2E362C] ${className}`}
    >
      <span className="text-[#4E9B6F]">{getCategoryIcon(category)}</span>
      <span>{formatCategoryName(category)}</span>
    </span>
  );
}
