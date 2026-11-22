/**
 * Per-process safeguard for low-volume concept websites.
 * Always complement with trusted reverse-proxy or edge-level rate limiting.
 */
type Window = { count: number; resetAt: number };
const windows = new Map<string, Window>();
export function checkRateLimit(key: string, max = 8, intervalMs = 60_000) {
  const now = Date.now();
  if (windows.size > 10000) {
    for (const [k, v] of windows) if (v.resetAt < now) windows.delete(k);
  }
  const existing = windows.get(key);
  const current = !existing || existing.resetAt < now ? { count: 0, resetAt: now + intervalMs } : existing;
  current.count += 1;
  windows.set(key, current);
  return { allowed: current.count <= max, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
}
export function getRequestIdentity(request: Request) {
  // Only trust proxy-managed headers on your own hosting environment.
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'shared';
  return ip.slice(0, 128);
}
