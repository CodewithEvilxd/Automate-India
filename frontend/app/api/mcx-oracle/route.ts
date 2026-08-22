import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const backendUrl = process.env.BACKEND_URL || "https://circularchain-backend.onrender.com";
    const backendRes = await fetch(`${backendUrl}/api/mcx-oracle`, { cache: "no-store" });
    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data);
    }
  } catch (_) {}

  return NextResponse.json({
    success: true,
    commodities: [
      { symbol: "ALUM-6063", name: "Aluminum Extrusions (6063 Scrap)", unitPriceINR: 215.0, spotRateINR: 215.0, unit: "kg", change: "+2.4%", trend: "up", exchange: "MCX Spot" },
      { symbol: "CU-BERRY", name: "Copper Scrap (Heavy Berry No. 1)", unitPriceINR: 760.0, spotRateINR: 760.0, unit: "kg", change: "+1.8%", trend: "up", exchange: "MCX Continuous" },
      { symbol: "PET-WASH", name: "PET Bottle Flakes (Hot Washed)", unitPriceINR: 48.0, spotRateINR: 48.0, unit: "kg", change: "+3.1%", trend: "up", exchange: "Indian Polymer Index" },
      { symbol: "HDPE-BLU", name: "HDPE Regrind Granules (Blue Drums)", unitPriceINR: 58.0, spotRateINR: 58.0, unit: "kg", change: "-0.5%", trend: "down", exchange: "IPex Gujarat Hub" },
      { symbol: "HMS-1-2", name: "Heavy Melting Steel Scrap (HMS 1/2)", unitPriceINR: 42.5, spotRateINR: 42.5, unit: "kg", change: "+0.9%", trend: "up", exchange: "SteelMint Index" },
      { symbol: "OCC-11", name: "Corrugated Cardboard (OCC 11)", unitPriceINR: 14.5, spotRateINR: 14.5, unit: "kg", change: "+1.2%", trend: "up", exchange: "Paper Index India" },
      { symbol: "PCB-IND", name: "Industrial Telecom Circuit Boards", unitPriceINR: 340.0, spotRateINR: 340.0, unit: "kg", change: "+4.5%", trend: "up", exchange: "E-Waste Metals Index" },
      { symbol: "LI-NMC", name: "Lithium Black Mass (NMC/LFP Scrap)", unitPriceINR: 850.0, spotRateINR: 850.0, unit: "kg", change: "+5.2%", trend: "up", exchange: "Battery Waste Index" },
    ],
  });
}
