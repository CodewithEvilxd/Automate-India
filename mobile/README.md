# CircularChain — Mobile Application

The `mobile/` directory contains the cross-platform mobile application for **CircularChain**, designed for on-site industrial plant operators, scrap aggregators, and ESG auditors.

---

## 1. Key Mobile Capabilities

1. **On-Site AI Camera Scanning (`camera_scan_screen.dart`):**
   - Take photos of industrial scrap (aluminum, plastic regrind, OCC cardboard, e-waste).
   - Sends image base64 to `/api/analyze` (Agent 1) to auto-fill material category, mass estimate, and condition grade in real-time.
2. **Offline-First Marketplace & Registry (`marketplace_screen.dart`):**
   - Browse verified inventory with search, category filtering, and regional hub filters.
3. **Instant On-Chain Verification (`verify_audit_screen.dart`):**
   - Scan physical QR codes or paste Polygon Amoy transaction hashes to view cryptographic proof without logging in.
4. **Mobile EPR Compliance Viewer (`material_detail_screen.dart`):**
   - Inspect EPR certificates and view audited CO₂ abatement.

---

## 2. Architecture & Directory Tree

```text
mobile/
├── lib/
│   ├── main.dart                      # App entry point & navigation router
│   ├── theme/
│   │   └── app_theme.dart             # Industrial Ledger design tokens (Ink, Surface, Moss, Bone)
│   ├── models/
│   │   ├── material_model.dart        # Material Lot data entity
│   │   ├── organization_model.dart    # Org profile entity
│   │   └── verification_proof.dart    # On-chain proof entity
│   ├── services/
│   │   ├── api_service.dart           # HTTP Client connecting to Next.js Backend REST APIs
│   │   └── blockchain_service.dart    # Polygon Amoy RPC queries
│   ├── screens/
│   │   ├── marketplace_screen.dart    # Main inventory feed & search
│   │   ├── camera_scan_screen.dart    # AI Camera classification & lot creation
│   │   ├── material_detail_screen.dart# Specimen manifest & transfer request
│   │   ├── verify_audit_screen.dart   # Zero-knowledge verification & QR scanner
│   │   └── organization_screen.dart   # Org ESG stats & EPR certificate export
│   └── widgets/
│       ├── verification_stamp_widget.dart # Mobile circular rotated ink stamp
│       └── category_badge_widget.dart     # Material category icons & badges
├── pubspec.yaml                       # Flutter dependencies & assets
└── README.md                          # This documentation
```

---

## 3. Connecting to the Backend Service

In `lib/services/api_service.dart`, set the backend baseUrl:
* **Android Emulator:** `http://10.0.2.2:3000/api`
* **iOS Simulator / Web:** `http://localhost:3000/api`
* **Physical Device:** `http://<YOUR_LOCAL_IP>:3000/api` or Production domain
