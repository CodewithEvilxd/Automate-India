const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("Deploying MaterialRegistry...");
  
  const MaterialRegistry = await hre.ethers.getContractFactory("MaterialRegistry");
  const registry = await MaterialRegistry.deploy();

  await registry.waitForDeployment();
  const address = await registry.getAddress();
  
  console.log(`MaterialRegistry deployed to: ${address}`);

  // Copy ABI and address to backend services file
  const artifact = require("../artifacts/contracts/MaterialRegistry.sol/MaterialRegistry.json");
  
  const contractCode = `export const CONTRACT_ADDRESS = "${address}";\n` +
    `export const CONTRACT_ABI = ${JSON.stringify(artifact.abi, null, 2)};\n`;

  fs.mkdirSync("./backend/services", { recursive: true });
  fs.writeFileSync("./backend/services/contract.ts", contractCode);
  console.log("Saved ABI and address to backend/services/contract.ts");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
