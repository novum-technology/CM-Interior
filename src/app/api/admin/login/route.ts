import { NextResponse, NextRequest } from "next/server";
import { encryptToken, setSessionCookie } from "@/utils/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    
    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;

    // In production, block default credentials for safety
    if (process.env.NODE_ENV === "production" && (!envUser || !envPass)) {
      return NextResponse.json(
        { error: "Server authentication credentials are not configured on Vercel." },
        { status: 500 }
      );
    }

    const correctUser = envUser || "admin";
    const correctPass = envPass || "password123";

    if (username === correctUser && password === correctPass) {
      const token = encryptToken({
        username,
        createdAt: Date.now(),
      });
      const response = NextResponse.json({ success: true });
      setSessionCookie(response, token);
      return response;
    }

    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
