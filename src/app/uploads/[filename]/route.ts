import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO || "Shamilkt07/CM-Interior";
    const githubBranch = process.env.GITHUB_BRANCH || "main";

    if (!githubToken) {
      return new NextResponse("Unauthorized: GITHUB_TOKEN is not configured", { status: 401 });
    }

    // 1. Get latest commit SHA to bypass GitHub Raw CDN caching
    let latestSha = githubBranch;
    try {
      const refRes = await fetch(
        `https://api.github.com/repos/${githubRepo}/git/refs/heads/${githubBranch}`,
        {
          headers: {
            Authorization: `token ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "CM-Interior-Image-Proxy-Ref",
          },
          cache: "no-store",
        }
      );
      if (refRes.ok) {
        const refData = await refRes.json();
        if (refData?.object?.sha) {
          latestSha = refData.object.sha;
        }
      }
    } catch (refError) {
      console.error("Failed to fetch branch reference in image proxy:", refError);
    }

    // 2. Fetch using the commit SHA for cache-busting
    const res = await fetch(
      `https://raw.githubusercontent.com/${githubRepo}/${latestSha}/public/uploads/${filename}`,
      {
        headers: {
          Authorization: `token ${githubToken}`,
          "User-Agent": "CM-Interior-Image-Proxy",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const contentType = res.headers.get("content-type") || "image/webp";
    const blob = await res.blob();

    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
