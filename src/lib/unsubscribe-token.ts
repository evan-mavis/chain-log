import crypto from "node:crypto";

function getSecret(): string {
  const secret = process.env.EMAIL_UNSUBSCRIBE_SECRET;
  if (!secret) {
    throw new Error("Missing EMAIL_UNSUBSCRIBE_SECRET env var");
  }
  return secret;
}

function base64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function hmac(input: string): string {
  const secret = getSecret();
  const mac = crypto.createHmac("sha256", secret).update(input).digest();
  return base64url(mac);
}

export function signUnsubscribeToken(
  userId: string,
  ttlSeconds = 60 * 60 * 24 * 30,
): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = `${userId}.${exp}`;
  const sig = hmac(payload);
  return `${base64url(payload)}.${sig}`;
}

export function verifyUnsubscribeToken(
  token: string,
): { userId: string } | null {
  try {
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return null;
    const payload = Buffer.from(
      payloadB64.replace(/-/g, "+").replace(/_/g, "/"),
      "base64",
    ).toString("utf8");
    const expected = hmac(payload);
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)))
      return null;
    const [userId, expStr] = payload.split(".");
    const exp = Number(expStr);
    if (!userId || !Number.isFinite(exp)) return null;
    if (Math.floor(Date.now() / 1000) > exp) return null;
    return { userId };
  } catch {
    return null;
  }
}
