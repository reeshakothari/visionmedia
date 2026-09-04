import "server-only";
import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";

// Credentials live only in environment variables — this repo is public, so
// they must never be committed. Set ADMIN_USERNAME and ADMIN_PASSWORD locally
// in .env.local and in the Vercel project's environment variables.
const USERNAME = process.env.ADMIN_USERNAME ?? "";
const PASSWORD = process.env.ADMIN_PASSWORD ?? "";

export const SESSION_COOKIE = "vm_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function sha256(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(a: string, b: string) {
  // Hash both sides first so the comparison is always over equal-length
  // buffers and doesn't leak length information.
  return timingSafeEqual(sha256(a), sha256(b));
}

export function credentialsConfigured() {
  return Boolean(USERNAME && PASSWORD);
}

/** The session cookie value — only derivable by someone who knows the password. */
export function sessionToken() {
  return createHash("sha256").update(`vision-media-admin:${USERNAME}:${PASSWORD}`).digest("hex");
}

export function verifyCredentials(username: string, password: string) {
  if (!credentialsConfigured()) return false;
  const userOk = safeEqual(username, USERNAME);
  const passOk = safeEqual(password, PASSWORD);
  return userOk && passOk;
}

export async function isAuthenticated() {
  if (!credentialsConfigured()) return false;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return safeEqual(token, sessionToken());
}
