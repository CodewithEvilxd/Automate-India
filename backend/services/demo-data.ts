export interface MaterialItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  ipfs_hash?: string;
  category: string;
  estimated_weight_kg: number;
  co2_saved_kg: number;
  condition: string;
  location: string;
  owner_wallet: string;
  owner_name?: string;
  status: "listed" | "transferred";
  created_at: Date;
  transactions?: any[];
  is_dummy?: boolean;
}

export interface OrgProfile {
  wallet_address: string;
  org_name: string;
  location: string;
  reputation_score: number;
  total_co2_abated_kg: number;
  total_mass_recycled_kg: number;
  total_lots_listed: number;
  completed_transfers: number;
  is_trusted_partner: boolean;
  member_since: string;
  epr_registration_no: string;
  verified_categories: string[];
  is_dummy?: boolean;
}

export const DEMO_MATERIALS: MaterialItem[] = [
  {
    id: "lot_al_01",
    title: "Structural 6061-T6 Aluminum Extrusion Offcuts",
    description: "Clean mill-finish aluminum fabrication scrap, sorted and bundled for secondary remelting. Zero contamination, ready for direct furnace charge.",
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    category: "aluminum",
    estimated_weight_kg: 450,
    co2_saved_kg: 4108.5,
    condition: "Good (Uncontaminated)",
    location: "Pune, MH",
    owner_wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    owner_name: "Apex Auto Castings Ltd",
    status: "transferred",
    created_at: new Date(Date.now() - 86400000 * 2),
    is_dummy: false,
    transactions: [
      {
        id: "tx_01",
        tx_hash: "0x8f2e9a4f20bc871239ab1e6d45901234c91a78de90bc1234567890abcdef1234",
        timestamp: new Date(Date.now() - 3600000 * 4),
        to_wallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
      },
    ],
  },
  {
    id: "lot_cu_02",
    title: "Mill-Grade Bright Bare Berry Copper Cable Wire (99.9% Cu)",
    description: "High-grade electrolytic copper cable scrap, unalloyed stripped wire, zero tinning, certified 99.9% purity for high-conductivity smelting.",
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmCopper9999887766554433221100aabbccddeeffgghh",
    category: "copper",
    estimated_weight_kg: 850,
    co2_saved_kg: 2388.5,
    condition: "New",
    location: "Sanand, GJ",
    owner_wallet: "0x3d0bc12948a7192837bc910283748293bc910293",
    owner_name: "Gujarat Non-Ferrous Alloys Ltd",
    status: "listed",
    created_at: new Date(Date.now() - 86400000 * 1),
    is_dummy: false,
    transactions: [],
  },
  {
    id: "lot_pet_03",
    title: "Post-Consumer Clean Hot-Washed Clear PET Bottle Flakes",
    description: "Hot-washed and optically sorted transparent PET bottle flake, IV > 0.72. Meets food-grade rPET fiber and preform extrusion standards.",
    image_url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmZtmD2qt8fJpq3CLDH8TGjNj8ybsnodL6YfP3w5nF2y",
    category: "plastic_pet",
    estimated_weight_kg: 800,
    co2_saved_kg: 1200.0,
    condition: "Good",
    location: "Noida, UP",
    owner_wallet: "0x53d284357ec70cE289De0F60957835613a81e472",
    owner_name: "GreenPolymer Tech India",
    status: "listed",
    created_at: new Date(Date.now() - 86400000 * 1),
    is_dummy: false,
    transactions: [],
  },
  {
    id: "lot_hdpe_04",
    title: "Industrial Grade Crushed HDPE Chemical Drum Regrind",
    description: "Blue and white high-density polyethylene regrind from clean chemical drums, triple rinsed and shredded to 10mm mesh.",
    image_url: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmU7i8JkH9tqL3pM8xV4k7yR2bN1w9eF5d6c8a3s2z",
    category: "plastic_hdpe",
    estimated_weight_kg: 620,
    co2_saved_kg: 868.0,
    condition: "Fair",
    location: "Ahmedabad, GJ",
    owner_wallet: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    owner_name: "Gujarat Polymer Recyclers",
    status: "listed",
    created_at: new Date(Date.now() - 86400000 * 3),
    is_dummy: false,
    transactions: [],
  },
  {
    id: "lot_steel_05",
    title: "Shredded Heavy Melting Steel Scrap (HMS 1/2 Structural)",
    description: "Density min 0.8 MT/m3, free of excessive rust and non-metallic inclusions, sheared to 60cm length, ideal for induction furnace.",
    image_url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmSteel1234567890abcdefghijklmnopqrstuvwxyz",
    category: "steel",
    estimated_weight_kg: 3500,
    co2_saved_kg: 6335.0,
    condition: "Good",
    location: "Gurugram, HR",
    owner_wallet: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    owner_name: "Bharat Ferrous Alloys & Metals",
    status: "listed",
    created_at: new Date(Date.now() - 86400000 * 4),
    is_dummy: false,
    transactions: [],
  },
  {
    id: "lot_paper_06",
    title: "Baled OCC Corrugated Cardboard Packaging Waste (OCC #11)",
    description: "High-density export-grade Old Corrugated Containers (OCC 11), moisture < 12%, minimal outthrows, wire tied for bulk repulping.",
    image_url: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmP6f7G8h9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z",
    category: "paper",
    estimated_weight_kg: 1200,
    co2_saved_kg: 1080.0,
    condition: "Good",
    location: "Bengaluru, KA",
    owner_wallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    owner_name: "GreenFiber Packaging Solutions",
    status: "transferred",
    created_at: new Date(Date.now() - 86400000 * 4),
    is_dummy: false,
    transactions: [
      {
        id: "tx_04",
        tx_hash: "0x3d0bc12948a7192837bc910283748293bc910293847291038472910384729103",
        timestamp: new Date(Date.now() - 3600000 * 12),
        to_wallet: "0x53d284357ec70cE289De0F60957835613a81e472",
      },
    ],
  },
  {
    id: "lot_ewaste_07",
    title: "Decommissioned Server & Telecom PCB Circuit Boards",
    description: "High-grade gold-plated telecommunication base station motherboards and backplanes, de-potted for certified hydrometallurgical recovery.",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmA1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u",
    category: "electronic",
    estimated_weight_kg: 320,
    co2_saved_kg: 1760.0,
    condition: "Recyclable",
    location: "Chennai, TN",
    owner_wallet: "0x3d0bc12948a7192837bc910283748293bc910293",
    owner_name: "Coromandel E-Waste Precious Recovery",
    status: "listed",
    created_at: new Date(Date.now() - 86400000 * 6),
    is_dummy: false,
    transactions: [],
  },
];

export const DEMO_TRANSACTIONS = [
  {
    id: "tx_01",
    material_id: "lot_al_01",
    from_wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to_wallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    tx_hash: "0x8f2e9a4f20bc871239ab1e6d45901234c91a78de90bc1234567890abcdef1234",
    timestamp: new Date(Date.now() - 3600000 * 4),
    material: DEMO_MATERIALS[0],
  },
  {
    id: "tx_04",
    material_id: "lot_paper_04",
    from_wallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    to_wallet: "0x53d284357ec70cE289De0F60957835613a81e472",
    tx_hash: "0x3d0bc12948a7192837bc910283748293bc910293847291038472910384729103",
    timestamp: new Date(Date.now() - 3600000 * 12),
    material: DEMO_MATERIALS[3],
  },
];

export const DEMO_ORGANIZATIONS: OrgProfile[] = [
  {
    wallet_address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    org_name: "Apex Auto Castings Ltd [DEMO]",
    location: "Pune, Maharashtra",
    reputation_score: 94,
    total_co2_abated_kg: 8420.5,
    total_mass_recycled_kg: 980.0,
    total_lots_listed: 12,
    completed_transfers: 9,
    is_trusted_partner: true,
    member_since: "March 2025",
    epr_registration_no: "EPR-MH-2025-08491",
    verified_categories: ["aluminum", "steel"],
    is_dummy: true,
  },
  {
    wallet_address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    org_name: "Ecofab Packaging Solutions [DEMO]",
    location: "Gurugram, Haryana",
    reputation_score: 88,
    total_co2_abated_kg: 5640.0,
    total_mass_recycled_kg: 6200.0,
    total_lots_listed: 18,
    completed_transfers: 14,
    is_trusted_partner: true,
    member_since: "April 2025",
    epr_registration_no: "EPR-HR-2025-01923",
    verified_categories: ["paper", "cardboard"],
    is_dummy: true,
  },
  {
    wallet_address: "0x53d284357ec70cE289De0F60957835613a81e472",
    org_name: "GreenPolymer Tech India [DEMO]",
    location: "Noida, Uttar Pradesh",
    reputation_score: 79,
    total_co2_abated_kg: 4890.0,
    total_mass_recycled_kg: 3400.0,
    total_lots_listed: 8,
    completed_transfers: 6,
    is_trusted_partner: true,
    member_since: "May 2025",
    epr_registration_no: "EPR-UP-2025-04512",
    verified_categories: ["plastic_pet", "plastic_hdpe"],
    is_dummy: true,
  },
  {
    wallet_address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    org_name: "Gujarat Polymer Recyclers [DEMO]",
    location: "Ahmedabad, Gujarat",
    reputation_score: 65,
    total_co2_abated_kg: 3120.0,
    total_mass_recycled_kg: 2200.0,
    total_lots_listed: 6,
    completed_transfers: 4,
    is_trusted_partner: true,
    member_since: "June 2025",
    epr_registration_no: "EPR-GJ-2025-07821",
    verified_categories: ["plastic_hdpe"],
    is_dummy: true,
  },
  {
    wallet_address: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4df",
    org_name: "Circtronics E-Waste Refiners [DEMO]",
    location: "Bengaluru, Karnataka",
    reputation_score: 72,
    total_co2_abated_kg: 2840.0,
    total_mass_recycled_kg: 810.0,
    total_lots_listed: 5,
    completed_transfers: 3,
    is_trusted_partner: true,
    member_since: "August 2025",
    epr_registration_no: "EPR-KA-2025-03290",
    verified_categories: ["electronic"],
    is_dummy: true,
  },
  {
    wallet_address: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    org_name: "Coromandel Silica & Glass Corp [DEMO]",
    location: "Chennai, Tamil Nadu",
    reputation_score: 58,
    total_co2_abated_kg: 1420.0,
    total_mass_recycled_kg: 4700.0,
    total_lots_listed: 4,
    completed_transfers: 2,
    is_trusted_partner: false,
    member_since: "September 2025",
    epr_registration_no: "EPR-TN-2025-09142",
    verified_categories: ["glass"],
    is_dummy: true,
  },
];
