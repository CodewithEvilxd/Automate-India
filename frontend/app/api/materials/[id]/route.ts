import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEMO_MATERIALS } from "@/lib/demo-data";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    try {
      const material = await prisma.material.findUnique({
        where: { id: id },
        include: { transactions: true },
      });

      if (material) {
        return NextResponse.json(material);
      }
    } catch (dbErr) {
      console.warn("Database lookup failed, checking fallback data:", dbErr);
    }

    const demoItem = DEMO_MATERIALS.find((m) => m.id === id);
    if (demoItem) {
      return NextResponse.json(demoItem);
    }

    return NextResponse.json({ error: "Material lot not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
