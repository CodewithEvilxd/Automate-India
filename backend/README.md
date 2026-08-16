# CircularChain — Backend Service & Unified API Architecture

The `backend/` domain contains the complete server-side business logic, AI vision auditing pipeline, deterministic EPA WARM carbon calculations, PostgreSQL database ORM, and Solidity smart contracts for **CircularChain**.

This backend serves both the **Web Frontend** (`frontend/`) and the **Mobile Application** (`mobile/`).

---

## 1. Directory Structure

```text
backend/
├── contracts/               # Solidity Smart Contracts (Polygon Amoy testnet)
│   └── MaterialRegistry.sol # ERC-20 CircularCredit + Material Registry
├── scripts/                 # Hardhat deployment scripts
│   └── deploy.cjs           # Deployment script to Polygon Amoy
├── prisma/                  # Relational database schema & migrations
│   └── schema.prisma        # User, Material, and Transaction models
├── services/                # Reusable business logic & integration clients
│   ├── ai-agents.ts         # Agent 1 (Vision), Agent 2 (Verifier), Agent 4 (EPR Certificate)
│   ├── ai-client.ts         # OpenAI GPT-4o multi-modal client wrapper
│   ├── co2-calculator.ts    # Deterministic EPA WARM emission factor calculator
│   ├── contract.ts          # ethers.js Polygon Amoy provider & verifier wallet signers
│   ├── demo-data.ts         # Seeded demo inventory, organizations & transaction history
│   └── prisma.ts            # Global Prisma Client instance with resilience fallback
└── README.md                # This documentation
```

---

## 2. Unified REST API Endpoints (Web & Mobile)

| Endpoint | Method | Purpose | Consumed By |
| :--- | :--- | :--- | :--- |
| `/api/analyze` | `POST` | AI Vision classification (Agent 1) on base64 specimen photo | Web Form, Mobile Camera Scanner |
| `/api/materials` | `GET` | Fetch all listed and settled material lots | Web Marketplace, Mobile Marketplace |
| `/api/materials` | `POST` | Create a new material lot record off-chain after blockchain receipt | Web Form, Mobile App |
| `/api/materials/[id]` | `GET` | Fetch detailed lot manifest, specs & transaction history | Web Detail Page, Mobile Detail Screen |
| `/api/upload` | `POST` | Upload & pin specimen photo to IPFS via Pinata | Web & Mobile App |
| `/api/verify-transfer`| `POST` | AI Agent 2 audit + Backend signer blockchain transfer + Agent 4 cert | Web & Mobile Transfer Actions |

---

## 3. Multi-Agent AI Pipeline

* **Agent 1 (Vision Classifier):** Analyzes base64 specimen photography and extracts material category, mass in kg, and condition grade.
* **Agent 2 (Multi-Modal Verifier):** Cross-audits transaction plausibility before the backend signer triggers `verifyAndTransfer()` on-chain.
* **Agent 4 (EPR Certificate Generator):** Generates formal ISO 14064 / Indian EPR compliance legal statement for audit trails.

---

## 4. Smart Contract Architecture

* **Network:** Polygon Amoy Testnet (Chain ID `80002`)
* **Contract:** `MaterialRegistry.sol`
* **Address:** `0x3d0bc12948a7192837bc910283748293bc910293`
* **Dual-Wallet Pattern:**
  1. *User Wallet:* Signs `listMaterial()` via MetaMask / Mobile Web3.
  2. *Backend Verifier Wallet:* Holds sole permission to execute `verifyAndTransfer()` after AI Agent 2 auditing.
