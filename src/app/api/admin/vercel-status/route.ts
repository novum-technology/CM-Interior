import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/utils/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate session
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const commitSha = searchParams.get("commitSha");

    if (!commitSha) {
      return NextResponse.json({ error: "Missing commitSha parameter" }, { status: 400 });
    }

    const vercelToken = process.env.VERCEL_TOKEN;
    const projectId = process.env.VERCEL_PROJECT_ID;
    const teamId = process.env.VERCEL_TEAM_ID;

    // Graceful fallback if Vercel API is not configured
    if (!vercelToken || !projectId) {
      return NextResponse.json({
        success: true,
        configured: false,
        status: "READY", // fallback to READY state so client finishes publish workflow
        message: "Vercel credentials not configured. Pushed changes will auto-deploy on Vercel.",
      });
    }

    // Step A: Fetch deployments from Vercel REST API
    const url = new URL("https://api.vercel.com/v6/deployments");
    url.searchParams.append("projectId", projectId);
    if (teamId) {
      url.searchParams.append("teamId", teamId);
    }
    url.searchParams.append("limit", "15"); // only inspect latest 15 deployments

    const headers = {
      Authorization: `Bearer ${vercelToken}`,
    };

    const res = await fetch(url.toString(), { headers, cache: "no-store" });
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Vercel Deployments API error: ${errorText}`);
      return NextResponse.json({
        success: true,
        configured: false,
        status: "READY",
        message: "Failed to poll Vercel API. Deployment is likely running in the background.",
      });
    }

    const data = await res.json();
    const deployments = data.deployments || [];

    interface VercelDeployment {
      status: string;
      url?: string;
      meta?: {
        githubCommitSha?: string;
      };
    }

    // Step B: Match deployment by githubCommitSha meta property
    const matchingDeployment = deployments.find((d: VercelDeployment) => {
      const metaCommit = d.meta?.githubCommitSha;
      return metaCommit && (metaCommit === commitSha || metaCommit.startsWith(commitSha));
    });

    if (!matchingDeployment) {
      return NextResponse.json({
        success: true,
        configured: true,
        status: "QUEUED", // If not found yet, it's queued or initializing
      });
    }

    // Map Vercel statuses to standard statuses (BUILDING, READY, ERROR)
    const vercelStatus = matchingDeployment.status;
    let clientStatus = "BUILDING";

    if (vercelStatus === "READY") {
      clientStatus = "READY";
    } else if (vercelStatus === "ERROR" || vercelStatus === "CANCELED" || vercelStatus === "FAILED") {
      clientStatus = "ERROR";
    } else if (vercelStatus === "INITIALIZING" || vercelStatus === "QUEUED") {
      clientStatus = "BUILDING";
    }

    return NextResponse.json({
      success: true,
      configured: true,
      status: clientStatus,
      vercelStatus: vercelStatus,
      url: matchingDeployment.url ? `https://${matchingDeployment.url}` : null,
    });
  } catch (error) {
    console.error("Vercel status API error:", error);
    return NextResponse.json({ error: "Failed to query Vercel deployment status." }, { status: 500 });
  }
}
