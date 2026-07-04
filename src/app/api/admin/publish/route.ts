import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/utils/auth";
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

    // 2. Parse payload
    const { galleryItems, newImages } = await req.json();

    if (!Array.isArray(galleryItems)) {
      return NextResponse.json({ error: "Invalid gallery data format" }, { status: 400 });
    }

    const galleryJsonContent = JSON.stringify(galleryItems, null, 2);

    // 3. Write locally first (for local disk updates, will be ignored if read-only on Vercel)
    try {
      const jsonPath = path.join(process.cwd(), "src/data/gallery.json");
      fs.writeFileSync(jsonPath, galleryJsonContent, "utf-8");

      const uploadsDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Save images to local public/uploads directory
      if (newImages && Array.isArray(newImages)) {
        for (const img of newImages) {
          if (img.filename && img.base64) {
            const imgBuffer = Buffer.from(img.base64, "base64");
            const imgPath = path.join(uploadsDir, img.filename);
            fs.writeFileSync(imgPath, imgBuffer);
          }
        }
      }
    } catch (fsError) {
      console.warn("Failed to write files locally (this is expected in read-only serverless environments like Vercel):", fsError);
    }

    // 4. Git Sync (if GITHUB_TOKEN is available)
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO || "Shamilkt07/CM-Interior";
    const githubBranch = process.env.GITHUB_BRANCH || "main";

    if (!githubToken) {
      console.warn("GITHUB_TOKEN is missing. Skipping automatic GitHub sync.");
      return NextResponse.json({
        success: true,
        localOnly: true,
        message: "Changes saved locally. GitHub sync was skipped because GITHUB_TOKEN is unconfigured.",
      });
    }

    // GitHub API URL helpers
    const headers = {
      Authorization: `token ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "CM-Interior-CMS",
    };

    console.log(`Starting GitHub Git Database Sync on ${githubRepo} [branch: ${githubBranch}]...`);

    // Step A: Get reference for current branch
    const refRes = await fetch(
      `https://api.github.com/repos/${githubRepo}/git/refs/heads/${githubBranch}`,
      { headers, cache: "no-store" }
    );
    if (!refRes.ok) {
      const errorMsg = await refRes.text();
      throw new Error(`Failed to fetch branch reference: ${errorMsg}`);
    }
    const refData = await refRes.json();
    const parentCommitSha = refData.object.sha;

    // Step B: Get parent commit details to find the base tree SHA
    const commitRes = await fetch(
      `https://api.github.com/repos/${githubRepo}/git/commits/${parentCommitSha}`,
      { headers, cache: "no-store" }
    );
    if (!commitRes.ok) {
      const errorMsg = await commitRes.text();
      throw new Error(`Failed to fetch parent commit: ${errorMsg}`);
    }
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // Step C: Create blobs for new images and get their SHA on GitHub
    const treeItems = [];

    // Add updated gallery.json to tree items
    treeItems.push({
      path: "src/data/gallery.json",
      mode: "100644",
      type: "blob",
      content: galleryJsonContent,
    });

    // Create blobs for any uploaded images
    if (newImages && Array.isArray(newImages)) {
      for (const img of newImages) {
        if (img.filename && img.base64) {
          const blobRes = await fetch(
            `https://api.github.com/repos/${githubRepo}/git/blobs`,
            {
              method: "POST",
              headers,
              body: JSON.stringify({
                content: img.base64,
                encoding: "base64",
              }),
            }
          );
          if (!blobRes.ok) {
            const errorMsg = await blobRes.text();
            throw new Error(`Failed to create blob for image ${img.filename}: ${errorMsg}`);
          }
          const blobData = await blobRes.json();
          
          treeItems.push({
            path: `public/uploads/${img.filename}`,
            mode: "100644",
            type: "blob",
            sha: blobData.sha,
          });
        }
      }
    }

    // Step D: Create a new tree with the added items
    const treeRes = await fetch(
      `https://api.github.com/repos/${githubRepo}/git/trees`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: treeItems,
        }),
      }
    );
    if (!treeRes.ok) {
      const errorMsg = await treeRes.text();
      throw new Error(`Failed to create new tree: ${errorMsg}`);
    }
    const treeData = await treeRes.json();
    const newTreeSha = treeData.sha;

    // Step E: Create a new commit referencing the new tree and parent commit
    const newCommitRes = await fetch(
      `https://api.github.com/repos/${githubRepo}/git/commits`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          message: "Gallery updated via Admin Dashboard",
          tree: newTreeSha,
          parents: [parentCommitSha],
        }),
      }
    );
    if (!newCommitRes.ok) {
      const errorMsg = await newCommitRes.text();
      throw new Error(`Failed to create new commit: ${errorMsg}`);
    }
    const newCommitData = await newCommitRes.json();
    const newCommitSha = newCommitData.sha;

    // Step F: Update branch ref to point to the new commit (push)
    const updateRefRes = await fetch(
      `https://api.github.com/repos/${githubRepo}/git/refs/heads/${githubBranch}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          sha: newCommitSha,
          force: false,
        }),
      }
    );
    if (!updateRefRes.ok) {
      const errorMsg = await updateRefRes.text();
      throw new Error(`Failed to update branch reference: ${errorMsg}`);
    }

    console.log(`GitHub Sync complete! New Commit SHA: ${newCommitSha}`);

    return NextResponse.json({
      success: true,
      githubSynced: true,
      commitSha: newCommitSha,
      message: "Gallery changes successfully committed and pushed to GitHub.",
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Failed to publish gallery changes.";
    console.error("Publish API error:", error);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
