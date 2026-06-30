import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/utils/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = getSession(req);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, username: session.username });
}
