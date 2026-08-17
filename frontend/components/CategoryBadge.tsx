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
  Zap,
} from "lucide-react";

export function getCategoryIcon(category: string, className = "w-3.5 h-3.5") {
  const norm = (category || "").toLowerCase();
  if (norm.includes("copper") || norm.includes("steel") || norm.includes("metal")) {
    return <Layers className={className} />;
  }
  if (norm.includes("aluminum")) {
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
  if (norm.includes("electronic") || norm.includes("e-waste") || norm.includes("battery")) {
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
    copper: "Copper (Heavy Berry)",
    steel: "Structural Steel",
    plastic_pet: "Plastic (PET)",
    plastic_hdpe: "Plastic (HDPE)",
    plastic: "Plastic",
    paper: "Paper / OCC",
    glass: "Cullet Glass",
    electronic: "Electronics",
    battery_lithium: "Lithium Black Mass",
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
  const norm = (category || "").toLowerCase();

  // Tasteful Dual-Tone Palettes: Emerald (Eco/Plastics) & Warm Amber/Orange (Metals/E-Waste/High-Value)
  let badgeColor = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  let iconColor = "text-emerald-500";

  if (norm.includes("copper") || norm.includes("steel") || norm.includes("metal")) {
    badgeColor = "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/25";
    iconColor = "text-orange-500";
  } else if (norm.includes("electronic") || norm.includes("e-waste") || norm.includes("battery")) {
    badgeColor = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25";
    iconColor = "text-amber-500";
  } else if (norm.includes("paper") || norm.includes("cardboard")) {
    badgeColor = "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20";
    iconColor = "text-amber-400";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono tracking-wide uppercase border ${badgeColor} ${className}`}
    >
      <span className={iconColor}>{getCategoryIcon(category)}</span>
      <span>{formatCategoryName(category)}</span>
    </span>
  );
}
