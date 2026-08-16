import { ethers } from "ethers";

export const CONTRACT_ADDRESS = "0x3d0bc12948a7192837bc910283748293bc910293"; // Polygon Amoy testnet deployment address

export const CONTRACT_ABI = [
  "event MaterialListed(uint256 indexed id, address indexed owner, string category, uint256 co2Saved)",
  "event OwnershipTransferred(uint256 indexed id, address indexed from, address indexed to)",
  "event CreditMinted(address indexed to, uint256 amount, uint256 materialId)",
  "function listMaterial(string memory category, uint256 co2Saved) external returns (uint256)",
  "function verifyAndTransfer(uint256 id, address newOwner) external",
  "function materials(uint256) external view returns (address owner, string memory category, uint256 co2Saved, bool verified, bool exists)",
  "function reputationScore(address) external view returns (uint256)",
  "function balanceOf(address) external view returns (uint256)",
  "function nextId() external view returns (uint256)"
];

export function getContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
}

export function getReadOnlyContract() {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "https://polygon-amoy-bor-rpc.publicnode.com";
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}

export function getBackendSignerContract() {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "https://polygon-amoy-bor-rpc.publicnode.com";
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY is not defined in environment variables");
  }
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
}
