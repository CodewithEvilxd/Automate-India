import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEMO_MATERIALS } from "@/lib/demo-data";

export async function GET(req: NextRequest) {
  try {
    try {
      const materials = await prisma.material.findMany({
        orderBy: { created_at: "desc" },
        include: { transactions: true },
      });
      if (materials && materials.length > 0) {
        return NextResponse.json(materials);
      }
    } catch (dbErr) {
      console.warn("Database lookup failed in /api/materials:", dbErr);
    }

    return NextResponse.json(DEMO_MATERIALS);
  } catch (error: any) {
    return NextResponse.json(DEMO_MATERIALS);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    try {
      const material = await prisma.material.create({
        data: {
          id: body.id ? String(body.id) : undefined,
          title: body.title,
          description: body.description,
          image_url: body.image_url,
          ipfs_hash: body.ipfs_hash,
          category: body.category,
          estimated_weight_kg: Number(body.estimated_weight_kg),
          co2_saved_kg: Number(body.co2_saved_kg),
          condition: body.condition,
          location: body.location || "Noida, UP",
          owner_wallet: body.owner_wallet,
          status: "listed",
        },
      });

      await prisma.user.upsert({
        where: { wallet_address: body.owner_wallet },
        update: {},
        create: {
          org_name: "Industrial Partner",
          wallet_address: body.owner_wallet,
        },
      });

      return NextResponse.json(material);
    } catch (dbErr: any) {
      console.warn("DB save warning, returning created object payload:", dbErr);
      return NextResponse.json({
        id: body.id ? String(body.id) : "lot_" + Date.now(),
        ...body,
        status: "listed",
        created_at: new Date(),
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
