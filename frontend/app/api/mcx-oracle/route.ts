import { NextResponse } from "next/server";

export interface CommodityOracleData {
  symbol: string;
  name: string;
  category: string;
  unitPriceINR: number;
  unit: string;
  dayChangePercent: number;
  trend: "up" | "down";
  benchmarkExchange: string;
  lastUpdated: string;
  historical7Day: number[];
}

const COMMODITY_INDEX: Record<string, CommodityOracleData> = {
  aluminum: {
    symbol: "ALUM-6063",
    name: "Aluminum Extrusions (6063 Scrap)",
    category: "Non-Ferrous Metals",
    unitPriceINR: 215.0,
    unit: "kg",
    dayChangePercent: 2.4,
    trend: "up",
    benchmarkExchange: "MCX India Spot (Mumbai)",
    lastUpdated: new Date().toISOString(),
    historical7Day: [208.5, 210.0, 209.2, 212.0, 213.5, 214.2, 215.0],
  },
  copper: {
    symbol: "CU-BERRY",
    name: "Copper Scrap (Heavy Berry No. 1)",
    category: "Non-Ferrous Metals",
    unitPriceINR: 760.0,
    unit: "kg",
    dayChangePercent: 1.8,
    trend: "up",
    benchmarkExchange: "MCX India Continuous",
    lastUpdated: new Date().toISOString(),
    historical7Day: [742.0, 745.5, 750.0, 752.0, 755.0, 758.0, 760.0],
  },
  plastic_pet: {
    symbol: "PET-WASH",
    name: "PET Bottle Flakes (Hot Washed Clear)",
    category: "Plastics Category I",
    unitPriceINR: 48.0,
    unit: "kg",
    dayChangePercent: 3.1,
    trend: "up",
    benchmarkExchange: "Indian Polymer Exchange (IPex)",
    lastUpdated: new Date().toISOString(),
    historical7Day: [45.0, 45.8, 46.2, 46.5, 47.0, 47.5, 48.0],
  },
  plastic_hdpe: {
    symbol: "HDPE-BLU",
    name: "HDPE Regrind Granules (Blue Drums)",
    category: "Plastics Category II",
    unitPriceINR: 58.0,
    unit: "kg",
    dayChangePercent: -0.5,
    trend: "down",
    benchmarkExchange: "IPex Gujarat Hub",
    lastUpdated: new Date().toISOString(),
    historical7Day: [59.5, 59.0, 58.8, 58.5, 58.2, 58.0, 58.0],
  },
  steel: {
    symbol: "HMS-1-2",
    name: "Heavy Melting Steel Scrap (HMS 1/2)",
    category: "Ferrous Metals",
    unitPriceINR: 42.5,
    unit: "kg",
    dayChangePercent: 0.9,
    trend: "up",
    benchmarkExchange: "SteelMint Mandi Gobindgarh",
    lastUpdated: new Date().toISOString(),
    historical7Day: [41.2, 41.5, 41.8, 42.0, 42.1, 42.3, 42.5],
  },
  paper: {
    symbol: "OCC-11",
    name: "Old Corrugated Containers (OCC 11)",
    category: "Paper & Packaging",
    unitPriceINR: 14.5,
    unit: "kg",
    dayChangePercent: 1.2,
    trend: "up",
    benchmarkExchange: "Indian Paper Manufacturers Index",
    lastUpdated: new Date().toISOString(),
    historical7Day: [13.8, 14.0, 14.1, 14.2, 14.3, 14.4, 14.5],
  },
  electronic: {
    symbol: "PCB-IND",
    name: "Industrial Telecom Circuit Boards (Gold/Copper Rich)",
    category: "E-Waste Schedule I",
    unitPriceINR: 340.0,
    unit: "kg",
    dayChangePercent: 4.5,
    trend: "up",
    benchmarkExchange: "International Precious Metal Feedstock",
    lastUpdated: new Date().toISOString(),
    historical7Day: [315.0, 320.0, 325.0, 330.0, 332.0, 336.0, 340.0],
  },
  battery_lithium: {
    symbol: "LI-NMC",
    name: "Lithium-Ion Black Mass (NMC/LFP Scrap)",
    category: "Battery Waste (BWMR)",
    unitPriceINR: 850.0,
    unit: "kg",
    dayChangePercent: 5.2,
    trend: "up",
    benchmarkExchange: "Battery Materials Index India",
    lastUpdated: new Date().toISOString(),
    historical7Day: [790.0, 805.0, 815.0, 825.0, 835.0, 842.0, 850.0],
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (category && COMMODITY_INDEX[category.toLowerCase()]) {
    return NextResponse.json({
      success: true,
      commodity: COMMODITY_INDEX[category.toLowerCase()],
    });
  }

  return NextResponse.json({
    success: true,
    commodities: Object.values(COMMODITY_INDEX),
  });
}
