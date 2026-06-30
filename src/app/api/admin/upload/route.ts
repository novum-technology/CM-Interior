import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/utils/auth";
import sharp from "sharp";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate session
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Check file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file format. Please upload JPEG, PNG, WebP, or GIF." }, { status: 400 });
    }

    // Convert file to array buffer and then Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Optimize image using sharp
    // Convert to WebP, resize if it's wider than 1200px (preserve aspect ratio), set quality 80
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // Create a clean filename
    const sanitizedTitle = file.name
      .toLowerCase()
      .replace(/\.[^/.]+$/, "") // remove extension
      .replace(/[^a-z0-9]+/g, "-") // replace special chars
      .substring(0, 30); // truncate
    const filename = `${sanitizedTitle}-${Date.now()}.webp`;

    // 4. Save file locally (useful for local development)
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const localFilePath = path.join(uploadsDir, filename);
    fs.writeFileSync(localFilePath, optimizedBuffer);

    // 5. Convert to Base64 to return to client (for GitHub sync)
    const base64Data = optimizedBuffer.toString("base64");

    return NextResponse.json({
      success: true,
      imageUrl: `/uploads/${filename}`,
      filename: filename,
      base64: base64Data, // Return base64 so client can store it in draft and publish to GitHub
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Image processing failed." }, { status: 500 });
  }
}
