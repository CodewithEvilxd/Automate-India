import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    latest_version: "2.6.0",
    version_code: 26,
    min_supported_version: "2.0.0",
    is_critical: false,
    release_date: "2026-08-18",
    apk_download_url: "https://circularchain.vercel.app/circularchain.apk",
    apk_size_mb: "50.8 MB",
    title: "CircularChain v2.6.0 Upgrade Available",
    release_notes: [
      "⚡ Real Web3 Polygon Amoy RPC live sync & MetaMask deep linking",
      "📸 High-Definition scrap lot photography headers & verification stamps",
      "👤 Multi-user profile management with custom name & language selector",
      "📍 All-India SPCB hub jurisdictions (DPCC, UPPCB, MPCB, GPCB, etc.)",
      "🔄 Real-time OTA In-App Auto Updater with 1-tap download & install",
      "🤖 6-Agent Autonomous Radar & MCX Spot Oracle integration"
    ]
  });
}
