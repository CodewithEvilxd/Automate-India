# CircularChain — AI-Verified Circular Economy Ledger

**CircularChain** is an enterprise-grade, verifiable circular economy marketplace and industrial secondary raw material ledger engineered for **Automate India (NIET Chapter 2026)** across the **AI, Web3, Blockchain, and Sustainable Development** tracks.

---

## 1. Monorepo Architecture Overview

The repository follows a clean, decoupled 3-folder architecture:

```text
Automate-India/
├── backend/                  # Unified Express API, AI Engines, DB & Polygon Amoy Smart Contracts
│   ├── .env                  # Backend environment keys (DB, OpenAI, Pinata, Amoy RPC)
│   ├── contracts/            # MaterialRegistry.sol (Solidity 0.8.20 + CIRC token)
│   ├── prisma/               # schema.prisma (Postgres schema with location support)
│   ├── scripts/              # Hardhat deployment & test suite (test-backend.mjs)
│   ├── services/             # Core logic (AI Agents, EPA CO2 calculator, Price Oracle, Fraud Sentinel)
│   ├── server.ts             # REST API server (Port 5000)
│   ├── hardhat.config.cjs    # Hardhat network config (Polygon Amoy)
│   ├── tsconfig.json         # Strict TypeScript configuration
│   └── package.json          # Backend package scripts (npm test, npm run dev)
│
├── frontend/                 # Web Application (Next.js 16 App Router)
│   ├── .env                  # Frontend environment keys
│   ├── app/                  # Web routes (/overview, /marketplace, /epr-calculator, /verify, /list, /leaderboard)
│   ├── components/           # UI Components (ContaminationHeatmap, IndicVoiceAssistant, MatchmakingCard, etc.)
│   ├── lib/                  # AI agents, pricing index, EPA carbon math, and contract ABIs
│   ├── public/               # Static assets & icons
│   ├── package.json          # Frontend package scripts (npm run dev, npm run build)
│   └── tsconfig.json         # TypeScript configuration
│
└── mobile/                   # Cross-Platform Mobile App (Flutter)
    ├── .env                  # Mobile API URL configuration
    ├── lib/                  # Models, Screens (Marketplace, Camera Scan, Verify), Theme, Widgets
    ├── pubspec.yaml          # Flutter dependencies
    └── README.md             # Mobile setup & run guide
```

---

## 2. Five Enterprise AI & Blockchain Innovations

1. **Autonomous AI Matchmaking & MCX Indian Scrap Price Oracle (Agent 3):**
   - Live benchmark commodity valuation based on Indian MCX scrap indices (Aluminum ₹215/kg, Copper ₹760/kg, PET ₹48/kg, etc.).
   - Computes haul transport emissions penalty based on transit radius and outputs net verified carbon ROI.
   - Recommends certified nearest regional industrial buyers.

2. **Visual Contamination & Quality Grade Heatmap Analyzer (Agent 1):**
   - Multi-modal computer vision evaluating clean material purity %, identified contaminant impurities, and moisture fraction.
   - Assigns official industrial recyclability grades (*Grade A+ Remelt Quality, Grade A, Grade B, Grade C*).

3. **CPCB Extended Producer Responsibility (EPR) Liability Simulator (`/epr-calculator`):**
   - Interactive corporate liability calculator adhering to statutory Indian CPCB 2026 mandates (Plastic Category I/II/III, E-Waste Schedule I, Metal Scrap).
   - Generates official, printable **Form 1 CPCB Corporate EPR Filing Assessment Sheets** with PDF export.

4. **Autonomous On-Chain Fraud Sentinel & Anomaly Radar (Agent 5):**
   - Cryptographic fraud analyzer detecting circular wash-trading (identical sender/buyer wallet addresses), single-vehicle legal mass violations (>35 MT), and EPA WARM baseline variance anomalies.

5. **Multilingual Indic Voice & Chat Scrap Ingestion (`/list`):**
   - Integrated Web Speech API (`hi-IN`) and NLP parser for informal scrap aggregators and weighbridge operators.
   - Spoken Hindi/Hinglish descriptions (e.g. *"Noida sector 63 me 450 kilo aluminum scrap"*) are parsed into structured on-chain listing drafts with 1-click auto-fill.

---

## 3. Quick Start & Execution

### Run Backend API & Tests:
```bash
cd backend
npm run dev     # Starts API on http://localhost:5000
npm test        # Runs complete 9-point system & AI test suite
```

### Run Web Frontend:
```bash
cd frontend
npm run dev     # Starts web app on http://localhost:3000
npm run build   # Production compile (0 TypeScript errors)
```

### Run Flutter Mobile App:
```bash
cd mobile
flutter pub get
flutter run
```

---

## 4. On-Chain Ledger Specifications

- **Consensus Network:** Polygon Amoy Testnet (Chain ID `80002`)
- **Smart Contract:** `MaterialRegistry.sol` at `0x3d0bc12948a7192837bc910283748293bc910293`
- **Carbon Accounting:** EPA Waste Reduction Model (WARM) Deterministic Emission Factors & ISO 14064
- **Regulatory Jurisdiction:** Central Pollution Control Board (CPCB) India EPR Rules 2022/2026
