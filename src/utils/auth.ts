import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET || "cm-interior-design-super-secret-key-default";
const SESSION_COOKIE_NAME = "admin_session";

export interface SessionPayload {
  username: string;
  createdAt: number;
}

export function encryptToken(payload: SessionPayload): string {
  const iv = crypto.randomBytes(16);
  // Ensure secret is 32 bytes
  const key = crypto.scryptSync(SECRET, "salt", 32);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(JSON.stringify(payload), "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decryptToken(token: string): SessionPayload | null {
  try {
    const parts = token.split(":");
    if (parts.length !== 2) return null;
    const [ivHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const key = crypto.scryptSync(SECRET, "salt", 32);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted) as SessionPayload;
  } catch {
    return null;
  }
}

export function getSession(req: NextRequest): SessionPayload | null {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  if (!cookie || !cookie.value) return null;
  
  const payload = decryptToken(cookie.value);
  if (!payload) return null;

  // Max age: 7 days
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - payload.createdAt > sevenDays) {
    return null;
  }

  return payload;
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}
