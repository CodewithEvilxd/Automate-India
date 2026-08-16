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
  location?: string;
  owner_wallet: string;
  owner_name?: string;
  status: "listed" | "transferred";
  created_at: string | Date;
  transactions?: any[];
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
}

export const DEMO_ORGANIZATIONS: OrgProfile[] = [
  {
    wallet_address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    org_name: "Apex Metal Recyclers Pvt Ltd",
    location: "Pune / Chakan Industrial Hub, MH",
    reputation_score: 98,
    total_co2_abated_kg: 14250.0,
    total_mass_recycled_kg: 18500.0,
    total_lots_listed: 24,
    completed_transfers: 22,
    is_trusted_partner: true,
    member_since: "August 2024",
    epr_registration_no: "EPR-MH-2024-00891",
    verified_categories: ["aluminum", "steel", "copper"],
  },
  {
    wallet_address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    org_name: "EcoPlast Polymer Solutions",
    location: "Noida / Greater Noida Hub, UP",
    reputation_score: 94,
    total_co2_abated_kg: 8940.5,
    total_mass_recycled_kg: 12400.0,
    total_lots_listed: 18,
    completed_transfers: 16,
    is_trusted_partner: true,
    member_since: "November 2024",
    epr_registration_no: "EPR-UP-2024-01442",
    verified_categories: ["plastic_pet", "plastic_hdpe", "plastic_pp"],
  },
  {
    wallet_address: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    org_name: "GreenFiber Corrugated & Paper",
    location: "Gurugram / Manesar Auto Belt, HR",
    reputation_score: 91,
    total_co2_abated_kg: 7120.0,
    total_mass_recycled_kg: 9500.0,
    total_lots_listed: 14,
    completed_transfers: 12,
    is_trusted_partner: true,
    member_since: "December 2024",
    epr_registration_no: "EPR-HR-2024-02319",
    verified_categories: ["paper", "cardboard"],
  },
  {
    wallet_address: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    org_name: "Bharat Silicon & E-Waste Recovery",
    location: "Bengaluru / Peenya Cluster, KA",
    reputation_score: 89,
    total_co2_abated_kg: 5600.0,
    total_mass_recycled_kg: 4200.0,
    total_lots_listed: 9,
    completed_transfers: 8,
    is_trusted_partner: true,
    member_since: "January 2025",
    epr_registration_no: "EPR-KA-2025-00412",
    verified_categories: ["electronic", "metals"],
  },
  {
    wallet_address: "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    org_name: "Gujarat Cullet Glass Processors",
    location: "Ahmedabad / Sanand GIDC, GJ",
    reputation_score: 86,
    total_co2_abated_kg: 3450.0,
    total_mass_recycled_kg: 15200.0,
    total_lots_listed: 11,
    completed_transfers: 9,
    is_trusted_partner: false,
    member_since: "February 2025",
    epr_registration_no: "EPR-GJ-2025-00109",
    verified_categories: ["glass"],
  },
];

export const DEMO_MATERIALS: MaterialItem[] = [
  {
    id: "lot_al_01",
    title: "Industrial Clean Aluminum Extrusion Offcuts",
    description: "Series 6063 architectural aluminum extrusion scrap. Zero anodization, cleaned, cut to 1m lengths. Immediate remelt quality for rolling mills.",
    image_url: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    category: "aluminum",
    estimated_weight_kg: 450.0,
    co2_saved_kg: 4108.5,
    condition: "Good",
    location: "Pune, MH",
    owner_wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    owner_name: "Apex Metal Recyclers Pvt Ltd",
    status: "transferred",
    created_at: new Date(Date.now() - 3600 * 1000 * 48),
    transactions: [
      {
        id: "tx_01",
        material_id: "lot_al_01",
        from_wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        to_wallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
        tx_hash: "0x8f2e9a4f20bc871239ab1e6d45901234c91a78de90bc1234567890abcdef1234",
        timestamp: new Date(Date.now() - 3600 * 1000 * 24),
      },
    ],
  },
  {
    id: "lot_pet_02",
    title: "Optical Grade Cold-Washed Clear PET Flakes",
    description: "Post-industrial washed PET bottle preform regrind. Moisture < 0.8%, PVC contamination < 50ppm. Suitable for thermoforming sheet and strapping.",
    image_url: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmZtmD2qt8fJpq3CLDHjdSDhgD4F6nxmQUgBeQQvPtx6rC",
    category: "plastic_pet",
    estimated_weight_kg: 820.0,
    co2_saved_kg: 1230.0,
    condition: "New",
    location: "Noida, UP",
    owner_wallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    owner_name: "EcoPlast Polymer Solutions",
    status: "listed",
    created_at: new Date(Date.now() - 3600 * 1000 * 18),
    transactions: [],
  },
  {
    id: "lot_card_03",
    title: "Baled Double-Wall Corrugated OCC Packaging",
    description: "High-density hydraulic compressed cardboard bales from warehouse return logistics. Dry stored, strapped with galvanized steel wire.",
    image_url: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM49wbHs3j5ekHPX4LTXY",
    category: "paper",
    estimated_weight_kg: 1200.0,
    co2_saved_kg: 4104.0,
    condition: "Fair",
    location: "Gurugram, HR",
    owner_wallet: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    owner_name: "GreenFiber Corrugated & Paper",
    status: "transferred",
    created_at: new Date(Date.now() - 3600 * 1000 * 72),
    transactions: [
      {
        id: "tx_02",
        material_id: "lot_card_03",
        from_wallet: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
        to_wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        tx_hash: "0x3d0bc12948a7192837bc910283748293bc910293847291038472910384729103",
        timestamp: new Date(Date.now() - 3600 * 1000 * 36),
      },
    ],
  },
  {
    id: "lot_hdpe_04",
    title: "Sorted Blue HDPE Drum Flakes & Regrind",
    description: "Shredded 200L chemical and shipping drums (degreased and triple hot washed). Density 0.955 g/cm³, melt flow index 0.35. Excellent for extrusion pipe manufacture.",
    image_url: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmdXGt8yHnC1ZcQ3U7X8D9wT6Y1o2i3u4a5s6d7f8g9h0",
    category: "plastic_hdpe",
    estimated_weight_kg: 650.0,
    co2_saved_kg: 877.5,
    condition: "Good",
    location: "Ahmedabad, GJ",
    owner_wallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    owner_name: "EcoPlast Polymer Solutions",
    status: "listed",
    created_at: new Date(Date.now() - 3600 * 1000 * 6),
    transactions: [],
  },
  {
    id: "lot_glass_05",
    title: "Color-Sorted Green & Amber Cullet Glass",
    description: "Crushed container glass, size fraction 10mm–25mm. Ferrous metals and label organic contamination mechanically removed via air classification.",
    image_url: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmaBCdeFGHIJ1234567890klmnopqrstuvwxyzABCDEF1234",
    category: "glass",
    estimated_weight_kg: 2100.0,
    co2_saved_kg: 588.0,
    condition: "Fair",
    location: "Chennai, TN",
    owner_wallet: "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    owner_name: "Gujarat Cullet Glass Processors",
    status: "listed",
    created_at: new Date(Date.now() - 3600 * 1000 * 12),
    transactions: [],
  },
  {
    id: "lot_ewaste_06",
    title: "Dismantled Telecom Circuit Boards (Grade B PCB)",
    description: "Depopulated server backplanes and high-density telecom motherboards. Gold fingers intact, ready for precious metal hydrometallurgical recovery.",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    ipfs_hash: "QmZyXwVuTsRqPoNmLkJiHgFeDcBa9876543210zyxwvuts",
    category: "electronic",
    estimated_weight_kg: 180.0,
    co2_saved_kg: 990.0,
    condition: "Good",
    location: "Bengaluru, KA",
    owner_wallet: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    owner_name: "Bharat Silicon & E-Waste Recovery",
    status: "listed",
    created_at: new Date(Date.now() - 3600 * 1000 * 3),
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
    timestamp: new Date(Date.now() - 3600 * 1000 * 24),
    material: DEMO_MATERIALS[0],
  },
  {
    id: "tx_02",
    material_id: "lot_card_03",
    from_wallet: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    to_wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    tx_hash: "0x3d0bc12948a7192837bc910283748293bc910293847291038472910384729103",
    timestamp: new Date(Date.now() - 3600 * 1000 * 36),
    material: DEMO_MATERIALS[2],
  },
];
