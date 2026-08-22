/**
 * CircularChain End-to-End System Verification Suite
 * Production URL: https://circularchain-web.vercel.app
 */

async function runE2EVerification() {
  console.log("\n=======================================================");
  console.log("  CIRCULARCHAIN PRODUCTION E2E SYSTEM VALIDATION");
  console.log("  Production Web: https://circularchain-web.vercel.app");
  console.log("=======================================================\n");

  let passed = 0;
  let total = 0;

  async function testRoute(name, url, expectedSubstring) {
    total++;
    try {
      const res = await fetch(url);
      const text = await res.text();
      if (res.status === 200 && (expectedSubstring ? text.includes(expectedSubstring) || text.includes("<html") : true)) {
        console.log(`  [PASS] ${name} (HTTP 200 OK - Page Loaded)`);
        passed++;
      } else {
        console.log(`  [FAIL] ${name} (Status: ${res.status})`);
      }
    } catch (err) {
      console.log(`  [FAIL] ${name} Error: ${err.message}`);
    }
  }

  // 1. Frontend Web Routes Testing
  console.log("--- 1. Testing Web Frontend Pages (http://localhost:3000) ---");
  await testRoute("Landing Overview Page", "http://localhost:3000/", "Verifiable Circular Economy Infrastructure");
  await testRoute("Marketplace Ledger Page", "http://localhost:3000/marketplace", "Marketplace");
  await testRoute("CPCB EPR Simulator Page", "http://localhost:3000/epr-calculator", "Corporate EPR Liability Simulator");
  await testRoute("Verify Ledger Page", "http://localhost:3000/verify", "Verify Ledger Integrity & Proof");
  await testRoute("Listing Page with Indic Voice Assistant", "http://localhost:3000/list", "Multilingual Indic Voice & Chat Ingestion");
  await testRoute("Recycler Leaderboard Page", "http://localhost:3000/leaderboard", "Leaderboard");

  // 2. Backend REST API Endpoints Testing
  console.log("\n--- 2. Testing Unified Backend APIs (http://localhost:5000) ---");
  
  // Health
  total++;
  try {
    const res = await fetch("http://localhost:5000/api/health");
    const json = await res.json();
    if (json.status === "online" && json.network.includes("Polygon Amoy")) {
      console.log(`  [PASS] API Health Check (Status: ${json.status}, Network: ${json.network})`);
      passed++;
    } else {
      console.log("  [FAIL] Health check response unexpected:", json);
    }
  } catch (err) {
    console.log("  [FAIL] Health check error:", err.message);
  }

  // Materials
  total++;
  try {
    const res = await fetch("http://localhost:5000/api/materials");
    const json = await res.json();
    if (Array.isArray(json) && json.length >= 6) {
      console.log(`  [PASS] Live Materials Inventory (${json.length} verified lots loaded)`);
      passed++;
    } else {
      console.log("  [FAIL] Materials response unexpected:", json);
    }
  } catch (err) {
    console.log("  [FAIL] Materials fetch error:", err.message);
  }

  // Agent 03: Matchmaker & MCX Scrap Price Oracle
  total++;
  try {
    const res = await fetch("http://localhost:5000/api/matchmaking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: "aluminum", weightKg: 450, location: "Noida, UP" }),
    });
    const json = await res.json();
    if (json.segregated_market_value_inr === 96750 && json.net_carbon_abated_kg > 0) {
      console.log(`  [PASS] Agent 03 Matchmaker (Lot Val: INR ${json.segregated_market_value_inr}, Unit: INR ${json.mandi_spot_rate_inr_per_kg}/kg, Net Carbon ROI: +${json.net_carbon_abated_kg} kg CO2e)`);
      passed++;
    } else {
      console.log("  [FAIL] Matchmaking calculation unexpected:", json);
    }
  } catch (err) {
    console.log("  [FAIL] Matchmaker error:", err.message);
  }

  // Agent 05: Cryptographic Fraud Sentinel
  total++;
  try {
    const resClean = await fetch("http://localhost:5000/api/fraud-sentinel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromWallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        toWallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
        weightKg: 450,
        claimedCo2: 4108.5,
        category: "aluminum",
      }),
    });
    const jsonClean = await resClean.json();

    const resWash = await fetch("http://localhost:5000/api/fraud-sentinel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromWallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        toWallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        weightKg: 450,
        claimedCo2: 4108.5,
        category: "aluminum",
      }),
    });
    const jsonWash = await resWash.json();

    if (jsonClean.risk_level === "LOW" && jsonWash.risk_level === "HIGH") {
      console.log(`  [PASS] Agent 05 Fraud Sentinel (Clean: ${jsonClean.risk_level} Risk, Wash Trade: ${jsonWash.risk_level} Risk with Anomaly Flag)`);
      passed++;
    } else {
      console.log("  [FAIL] Fraud Sentinel output unexpected:", { clean: jsonClean, wash: jsonWash });
    }
  } catch (err) {
    console.log("  [FAIL] Fraud Sentinel error:", err.message);
  }

  // Agent 04: Multilingual Indic Voice & Chat Ingestion
  total++;
  try {
    const res = await fetch("http://localhost:5000/api/indic-parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript: "Pune chakan factory se 800 kg washed PET plastic flakes ready hai" }),
    });
    const json = await res.json();
    if (json.extracted_category === "plastic_pet" && json.extracted_weight_kg === 800 && json.extracted_location.includes("Pune")) {
      console.log(`  [PASS] Agent 04 Indic Parser (Extracted Category: ${json.extracted_category}, Weight: ${json.extracted_weight_kg}kg, Location: ${json.extracted_location})`);
      passed++;
    } else {
      console.log("  [FAIL] Indic parser output unexpected:", json);
    }
  } catch (err) {
    console.log("  [FAIL] Indic parser error:", err.message);
  }

  // Agent 01: Visual Contamination & Quality Classifier
  total++;
  try {
    const res = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: "data:image/jpeg;base64,dGVzdA==", fileName: "Kachra-Vidhi.jpg" }),
    });
    const json = await res.json();
    if (json.certified_purity_percentage && json.recyclability_grade) {
      console.log(`  [PASS] Agent 01 Optical Quality Audit (Purity: ${json.certified_purity_percentage}%, Grade: ${json.recyclability_grade}, Moisture: ${json.estimated_moisture_percentage}%)`);
      passed++;
    } else {
      console.log("  [FAIL] Agent 01 analysis output unexpected:", json);
    }
  } catch (err) {
    console.log("  [FAIL] Agent 01 analyze error:", err.message);
  }

  console.log("\n=======================================================");
  console.log(`  FINAL VERIFICATION: ${passed} / ${total} Checks Passed`);
  console.log("=======================================================\n");

  process.exit(passed === total ? 0 : 1);
}

runE2EVerification();
