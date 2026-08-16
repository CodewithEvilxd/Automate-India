import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const pinataJwt = process.env.PINATA_JWT;
    if (!pinataJwt) {
      return NextResponse.json({ error: "Pinata JWT is missing" }, { status: 500 });
    }

    const formData = new FormData();
    formData.append("file", file);
    
    const pinataMetadata = JSON.stringify({
      name: file.name,
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    });
    formData.append("pinataOptions", pinataOptions);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pinataJwt}`,
      },
      body: formData,
    });

    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.error || "Failed to upload to Pinata");
    }

    return NextResponse.json({ ipfsHash: resData.IpfsHash });
  } catch (error: any) {
    console.error("Pinata Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
