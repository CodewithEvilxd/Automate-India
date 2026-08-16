# CircularChain — Web Frontend Architecture

The Web Frontend domain powers the **CircularChain Industrial Verification Ledger** user interface, built with Next.js 16 (App Router), Tailwind CSS, Google Fonts (`Fraunces`, `Inter`, `IBM Plex Mono`), and ethers.js.

---

## 1. Directory Structure

```text
frontend/ (and root app/ + components/)
├── components/
│   ├── CategoryBadge.tsx       # Distinct material category icons & clean formatting
│   ├── DashboardChart.tsx      # Recharts carbon abatement bar chart with manifest graph paper grid
│   ├── DashboardStats.tsx      # Manifest metric strip with live ethers.js blockchain event listeners
│   ├── EPRReportModal.tsx      # Official ISO 14064 / EPR Audit PDF Print & Export modal
│   ├── MarketplaceGrid.tsx     # Client search bar, category filter, region filter & sort selector
│   ├── Navbar.tsx              # Brand header with MetaMask wallet connection & navigation tabs
│   ├── RecentLedger.tsx        # Audit ledger row feed featuring VerificationStamp & Polygonscan links
│   ├── VerificationStamp.tsx   # Signature circular rotated ink stamp badge
│   └── WalletBadge.tsx         # Monospace wallet addresses with copy button & Trusted Partner badge
│
├── app/
│   ├── leaderboard/            # Organization Recycler Leaderboard (Ranked by CO2e abated)
│   ├── list/                   # Material listing form with AI Vision auto-fill & preview
│   ├── material/[id]/          # Lot manifest inspection, blockchain transfer & EPR Certificate
│   ├── org/[wallet]/           # Public Organization ESG Profile with full audit history
│   ├── verify/                 # Public zero-knowledge "Verify Any Transaction" tool
│   ├── globals.css             # Industrial color tokens, font imports, manifest grid CSS
│   ├── layout.tsx              # Root HTML wrapper
│   └── page.tsx                # Main Dashboard with Live Stats, Chart & Marketplace Grid
└── README.md                   # This documentation
```

---

## 2. Design System: Industrial Verification Ledger

* **Color Tokens:**
  * `--color-ink`: `#10140F` (Main background)
  * `--color-surface`: `#1B211A` (Card background)
  * `--color-surface-raised`: `#232B22` (Subheader & hover)
  * `--color-border`: `#2E362C` (1px hairline borders)
  * `--color-moss`: `#4E9B6F` (Verified / CO2 accent)
  * `--color-amber`: `#D98A3D` (Attention / In-progress)
  * `--color-bone`: `#EDEAE0` (Primary text)
  * `--color-muted`: `#8B9188` (Secondary mono text)

* **Typography:**
  * `Fraunces` (Heavy-weight slab-serif for manifest headers)
  * `Inter` (Humanist sans-serif for UI body)
  * `IBM Plex Mono` (Monospaced font for hashes, addresses, weights, and CO2 values)
