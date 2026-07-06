import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO || "Shamilkt07/CM-Interior";
    const githubBranch = process.env.GITHUB_BRANCH || "main";

    if (githubToken) {
      const res = await fetch(
        `https://raw.githubusercontent.com/${githubRepo}/${githubBranch}/src/data/gallery.json`,
        {
          headers: {
            Authorization: `token ${githubToken}`,
            Accept: "application/vnd.github.v3.raw",
            "User-Agent": "CM-Interior-Gallery",
          },
          cache: "no-store",
        }
      );
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
      console.warn("Failed to fetch gallery from GitHub, falling back to local file:", await res.text());
    }

    const jsonPath = path.join(process.cwd(), "src/data/gallery.json");
    const fileContent = fs.readFileSync(jsonPath, "utf-8");
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading gallery data:", error);
    return NextResponse.json({ error: "Failed to read gallery data" }, { status: 500 });
  }
}
