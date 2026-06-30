import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/utils/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearSessionCookie(response);
  return response;
}
