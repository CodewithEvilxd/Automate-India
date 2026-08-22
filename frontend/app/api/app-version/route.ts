import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    latest_version: "2.6.0",
    version_code: 26,
    min_supported_version: "2.0.0",
    is_critical: false,
    release_date: "2026-08-22",
    apk_download_url: "https://circularchain-web.vercel.app/circularchain.apk",
    apk_size_mb: "50.85 MB",
    title: "CircularChain Field APK v2.6.0 Upgrade Available",
    release_notes: [
      "Real Web3 Polygon Amoy RPC live sync and MetaMask deep linking",
      "High-Definition scrap lot photography headers and verification stamps",
      "Multi-user profile management with custom name and language selector",
      "All-India SPCB hub jurisdictions (DPCC, UPPCB, MPCB, GPCB)",
      "Real-time OTA In-App Auto Updater with 1-tap download and install",
      "6-Agent Autonomous Consensus Mesh and MCX Spot Oracle integration"
    ]
  });
}
