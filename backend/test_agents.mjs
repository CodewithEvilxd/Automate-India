// Comprehensive 9-Point Multi-Agent & Platform Verification Test
const BACKEND = 'http://localhost:5000/api';

async function runComprehensiveTestSuite() {
  console.log('===============================================================');
  console.log(' CIRCULARCHAIN COMPREHENSIVE MULTI-AGENT & PLATFORM TEST SUITE');
  console.log('===============================================================');

  const results = [];

  // TEST 1: Agent 01 - Optical Vision on Mixed Contaminated Scrap
  try {
    const res = await fetch(BACKEND + '/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: 'data:image/jpeg;base64,dummy', fileName: 'Kachra-Vidhi.jpg' })
    });
    const data = await res.json();
    const passed = data.primary_category === 'mixed' && data.certified_purity_percentage === 58.4 && data.constituents_breakdown.length > 0;
    results.push({
      test: 'Agent 01 (Optical Vision - Mixed Contaminated)',
      status: passed ? 'PASS' : 'FAIL',
      details: 'Category: ' + data.primary_category + ', Purity: ' + data.certified_purity_percentage + '%, Grade: ' + data.recyclability_grade
    });
  } catch (e) {
    results.push({ test: 'Agent 01 (Optical Vision)', status: 'FAIL', details: e.message });
  }

  // TEST 2: Agent 01 - Optical Vision on Pure Copper Berry
  try {
    const res = await fetch(BACKEND + '/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: 'data:image/jpeg;base64,dummy', fileName: 'copper_berry_scrap.jpg' })
    });
    const data = await res.json();
    const passed = data.primary_category === 'copper' && data.certified_purity_percentage > 98;
    results.push({
      test: 'Agent 01 (Optical Vision - Copper Berry)',
      status: passed ? 'PASS' : 'FAIL',
      details: 'Category: ' + data.primary_category + ', Purity: ' + data.certified_purity_percentage + '%'
    });
  } catch (e) {
    results.push({ test: 'Agent 01 (Copper)', status: 'FAIL', details: e.message });
  }

  // TEST 3: Agent 02 - EPA WARM Carbon LCA
  try {
    const res = await fetch(BACKEND + '/matchmaking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: 'aluminum', weightKg: 1000, location: 'Noida Sector 63' })
    });
    const data = await res.json();
    const passed = data.net_carbon_abated_kg > 0 && data.transport_carbon_penalty_kg > 0;
    results.push({
      test: 'Agent 02 (EPA WARM & ISO 14064 Carbon LCA)',
      status: passed ? 'PASS' : 'FAIL',
      details: 'Net Abated: ' + data.net_carbon_abated_kg + ' kg CO2e, Freight: ' + data.transport_carbon_penalty_kg + ' kg'
    });
  } catch (e) {
    results.push({ test: 'Agent 02 (Carbon LCA)', status: 'FAIL', details: e.message });
  }

  // TEST 4: Agent 03 - Live MCX Mandi Pricing & Arbitrage
  try {
    const res = await fetch(BACKEND + '/mcx-oracle');
    const data = await res.json();
    const passed = data.success && data.commodities.length >= 8;
    const alum = data.commodities.find(c => c.key === 'aluminum' || c.symbol.includes('ALUM'));
    results.push({
      test: 'Agent 03 (Live MCX Commodity Price Stream)',
      status: passed ? 'PASS' : 'FAIL',
      details: data.commodities.length + ' Commodities Live (Aluminum Spot: INR ' + (alum ? alum.spotRateINR || alum.unitPriceINR : 215) + '/kg)'
    });
  } catch (e) {
    results.push({ test: 'Agent 03 (MCX Oracle)', status: 'FAIL', details: e.message });
  }

  // TEST 5: Agent 04 - Indic Multilingual Voice NLP
  try {
    const res = await fetch(BACKEND + '/indic-parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript: 'bhaiya 350 kilo saaf tamba ka wire scrap hai chakan pune me' })
    });
    const data = await res.json();
    const passed = data.extracted_category === 'copper' && data.extracted_weight_kg === 350 && data.extracted_location.includes('Pune');
    results.push({
      test: 'Agent 04 (Indic Voice Mandi NLP Bridge)',
      status: passed ? 'PASS' : 'FAIL',
      details: 'Category: ' + data.extracted_category + ', Mass: ' + data.extracted_weight_kg + ' kg, Location: ' + data.extracted_location
    });
  } catch (e) {
    results.push({ test: 'Agent 04 (Indic Voice)', status: 'FAIL', details: e.message });
  }

  // TEST 6: Agent 05 - Cryptographic Fraud Radar Sentinel
  try {
    const res = await fetch(BACKEND + '/fraud-sentinel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromWallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        toWallet: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
        weightKg: 450,
        claimedCo2: 4108.5,
        category: 'aluminum'
      })
    });
    const data = await res.json();
    const passed = data.is_approved === true && data.risk_score < 25;
    results.push({
      test: 'Agent 05 (Cryptographic Fraud Radar Sentinel)',
      status: passed ? 'PASS' : 'FAIL',
      details: 'Risk Score: ' + data.risk_score + '/100, Approved: ' + data.is_approved + ', pHash: ' + data.phash_fingerprint
    });
  } catch (e) {
    results.push({ test: 'Agent 05 (Fraud Sentinel)', status: 'FAIL', details: e.message });
  }

  // TEST 7: Agent 06 - Statutory CPCB EPR Compliance
  try {
    const res = await fetch(BACKEND + '/cpcb/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName: 'Reliance Industries Limited', materialCategory: 'plastic_pet', annualConsumptionMT: 2500 })
    });
    const data = await res.json();
    const passed = data.success && data.data.avoided_statutory_penalty_inr > 0;
    results.push({
      test: 'Agent 06 (Statutory CPCB EPR Penalty Shield)',
      status: passed ? 'PASS' : 'FAIL',
      details: 'Mandated Offset: ' + data.data.mandated_offset_obligation_mt + ' MT, Penalty Saved: INR ' + data.data.avoided_statutory_penalty_inr.toLocaleString()
    });
  } catch (e) {
    results.push({ test: 'Agent 06 (CPCB EPR)', status: 'FAIL', details: e.message });
  }

  // TEST 8: 6-Agent Unified Consensus Orchestration
  try {
    const res = await fetch(BACKEND + '/agents/orchestrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: 'data:image/jpeg;base64,dummy', fileName: 'Kachra-Vidhi.jpg', location: 'Noida, UP' })
    });
    const data = await res.json();
    const passed = data.success && data.consensus.consensus_block_id.startsWith('CONSENSUS-');
    results.push({
      test: 'Multi-Agent Autonomous Consensus Orchestrator',
      status: passed ? 'PASS' : 'FAIL',
      details: 'Block ID: ' + data.consensus.consensus_block_id + ', Network: ' + data.consensus.on_chain_smart_contract.network
    });
  } catch (e) {
    results.push({ test: 'Multi-Agent Orchestration', status: 'FAIL', details: e.message });
  }

  // TEST 9: Mobile App In-App OTA Version Endpoint
  try {
    const res = await fetch(BACKEND + '/app-version');
    const data = await res.json();
    const passed = Boolean(data.latest_version && data.apk_download_url);
    results.push({
      test: 'Mobile APK In-App Continuous Delivery OTA',
      status: passed ? 'PASS' : 'FAIL',
      details: 'Version: ' + data.latest_version + ', Code: ' + data.version_code + ', APK: ' + data.apk_download_url
    });
  } catch (e) {
    results.push({ test: 'Mobile OTA Endpoint', status: 'FAIL', details: e.message });
  }

  console.table(results);
  const allPassed = results.every(r => r.status === 'PASS');
  console.log('\n===============================================================');
  console.log(allPassed ? 'ALL 9 CORE SUBSYSTEM TESTS PASSED (100% SUCCESS)' : 'SOME TESTS FAILED');
  console.log('===============================================================');
}

runComprehensiveTestSuite();
