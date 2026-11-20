import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { queryOne, execute } from '../db';

export interface AdminUser {
  id: string;
  email: string;
  role: 'owner' | 'editor' | 'viewer';
  active: number;
}

export function hashPassword(plainText: string): string {
  return bcrypt.hashSync(plainText, 10);
}

export function verifyPassword(plainText: string, hash: string): boolean {
  return bcrypt.compareSync(plainText, hash);
}

export function verifyCredentials(email: string, plainText: string): AdminUser | null {
  const user = queryOne<AdminUser & { password_hash: string }>(
    'SELECT id, email, password_hash, role, active FROM admin_users WHERE email = ? AND active = 1',
    [email.toLowerCase().trim()]
  );

  if (!user) return null;
  const valid = verifyPassword(plainText, user.password_hash);
  if (!valid) return null;

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    active: user.active,
  };
}

export function createAdminSession(adminId: string): { sessionId: string; token: string; expiresAt: string } {
  const sessionId = 'sess_' + crypto.randomUUID();
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  
  // 7 days expiration
  const expiresDate = new Date();
  expiresDate.setDate(expiresDate.getDate() + 7);
  const expiresAt = expiresDate.toISOString();

  execute(
    'INSERT INTO admin_sessions (id, admin_id, token_hash, expires_at) VALUES (?, ?, ?, ?)',
    [sessionId, adminId, tokenHash, expiresAt]
  );

  return { sessionId, token: rawToken, expiresAt };
}

export function verifySessionToken(rawToken: string): AdminUser | null {
  if (!rawToken) return null;
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  const row = queryOne<AdminUser>(
    `SELECT u.id, u.email, u.role, u.active 
     FROM admin_sessions s
     JOIN admin_users u ON u.id = s.admin_id
     WHERE s.token_hash = ? AND s.expires_at > CURRENT_TIMESTAMP AND u.active = 1`,
    [tokenHash]
  );

  return row || null;
}

export function revokeSession(rawToken: string): void {
  if (!rawToken) return;
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  execute('DELETE FROM admin_sessions WHERE token_hash = ?', [tokenHash]);
}

