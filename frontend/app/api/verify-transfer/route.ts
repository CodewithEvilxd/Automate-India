import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { prisma } from "@/lib/prisma";
import { verifyTransaction, generateCertificate } from "@/lib/ai-agents";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";

export async function POST(req: NextRequest) {
  try {
    const { materialId, buyerWallet } = await req.json();

    const material = await prisma.material.findUnique({
      where: { id: materialId }
    });

    if (!material) {
      return NextResponse.json({ error: "Material not found" }, { status: 404 });
    }

    if (material.status === "transferred") {
      return NextResponse.json({ error: "Material already transferred" }, { status: 400 });
    }

    const verification = await verifyTransaction(
      material.category, 
      material.estimated_weight_kg || 0, 
      material.condition || "Unknown", 
      material.co2_saved_kg || 0
    );

    if (!verification.verified) {
      return NextResponse.json({ 
        error: "Verification failed by AI Agent", 
        reason: verification.flag_reason 
      }, { status: 400 });
    }

    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
    const privateKey = process.env.PRIVATE_KEY;
    if (!rpcUrl || !privateKey) {
      throw new Error("RPC or Private Key missing on server");
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    const tx = await contract.verifyAndTransfer(materialId, buyerWallet);
    const receipt = await tx.wait();

    const certText = await generateCertificate(
      material.category,
      material.estimated_weight_kg || 0,
      material.co2_saved_kg || 0,
      receipt.hash,
      new Date().toISOString()
    );

    await prisma.transaction.create({
      data: {
        material_id: materialId,
        from_wallet: material.owner_wallet,
        to_wallet: buyerWallet,
        tx_hash: receipt.hash,
      }
    });

    await prisma.material.update({
      where: { id: materialId },
      data: {
        owner_wallet: buyerWallet,
        status: "transferred"
      }
    });

    return NextResponse.json({ 
      success: true, 
      txHash: receipt.hash, 
      certificate: certText,
      verification 
    });

  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
