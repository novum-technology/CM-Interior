import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), "src/data/gallery.json");
    const fileContent = fs.readFileSync(jsonPath, "utf-8");
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading gallery data:", error);
    return NextResponse.json({ error: "Failed to read gallery data" }, { status: 500 });
  }
}
