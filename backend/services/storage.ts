import fs from "fs";
import path from "path";
import { MaterialItem, DEMO_MATERIALS, DEMO_ORGANIZATIONS } from "./demo-data.js";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "materials_store.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize store if not exists
if (!fs.existsSync(STORE_FILE)) {
  fs.writeFileSync(STORE_FILE, JSON.stringify(DEMO_MATERIALS, null, 2));
}

export function getAllMaterials(): MaterialItem[] {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const data = fs.readFileSync(STORE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn("Storage read fallback:", e);
  }
  return DEMO_MATERIALS;
}

export function getMaterialById(id: string): MaterialItem | undefined {
  const materials = getAllMaterials();
  return materials.find((m) => m.id === id);
}

export function saveMaterial(newMaterial: MaterialItem): MaterialItem {
  const materials = getAllMaterials();
  const existingIndex = materials.findIndex((m) => m.id === newMaterial.id);
  if (existingIndex >= 0) {
    materials[existingIndex] = newMaterial;
  } else {
    materials.unshift(newMaterial);
  }
  fs.writeFileSync(STORE_FILE, JSON.stringify(materials, null, 2));
  return newMaterial;
}

export function updateMaterialStatus(id: string, buyerWallet: string, txHash: string): MaterialItem | null {
  const materials = getAllMaterials();
  const item = materials.find((m) => m.id === id);
  if (item) {
    item.status = "transferred";
    item.owner_wallet = buyerWallet;
    if (!item.transactions) item.transactions = [];
    item.transactions.push({
      id: "tx_" + Date.now(),
      material_id: id,
      from_wallet: item.owner_wallet,
      to_wallet: buyerWallet,
      tx_hash: txHash,
      timestamp: new Date(),
    });
    fs.writeFileSync(STORE_FILE, JSON.stringify(materials, null, 2));
    return item;
  }
  return null;
}
