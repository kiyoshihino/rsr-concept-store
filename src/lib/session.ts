// Session utilities using Web Crypto API — Edge & Node.js compatible
const encoder = new TextEncoder();

export interface SessionPayload {
  userId: string;
  role: string;
  email: string;
  name: string;
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET not configured");

  const key = await getKey(secret);
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const sigB64 = Buffer.from(sig).toString("base64url");

  return `${data}.${sigB64}`;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const secret = process.env.AUTH_SECRET;
    if (!secret) return null;

    const [data, sig] = token.split(".");
    if (!data || !sig) return null;

    const key = await getKey(secret);
    const sigBytes = Buffer.from(sig, "base64url");
    const valid = await crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(data));

    if (!valid) return null;

    return JSON.parse(Buffer.from(data, "base64url").toString()) as SessionPayload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "rsr_session";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};
