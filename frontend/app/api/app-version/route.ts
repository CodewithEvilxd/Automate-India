import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    latest_version: "2.6.0",
    version_code: 26,
    min_supported_version: "2.0.0",
    is_critical: false,
    release_date: "2026-08-18",
    apk_download_url: "/circularchain.apk",
    apk_size_mb: "48.2 MB",
    title: "CircularChain v2.6.0 Upgrade Available",
    release_notes: [
      "⚡ Full Web3 Wallet connect/disconnect & custom address pasting",
      "👤 Real User Profile customizer (Enter your real name / enterprise)",
      "📍 All-India SPCB jurisdiction selector (DPCC, UPPCB, MPCB, GPCB, etc.)",
      "🔄 In-App OTA Auto-Updater with 1-tap download & install",
      "🤖 6-Agent Autonomous Radar & MCX Spot Oracle integration"
    ]
  });
}
