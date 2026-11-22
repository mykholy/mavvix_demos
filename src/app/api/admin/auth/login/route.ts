import { NextResponse } from 'next/server';
import { verifyCredentials, createAdminSession } from '@/lib/security/auth';
import { checkRateLimit, getRequestIdentity } from '@/lib/security/rate-limit';

export async function POST(request: Request) {
  try {
    const rate = checkRateLimit('login:' + getRequestIdentity(request), 5, 10 * 60_000);
    if (!rate.allowed) return NextResponse.json({ error: 'Please retry later' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
    const body = await request.json();
    const { email, password } = body;

    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password || email.length > 254 || password.length > 200) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const admin = verifyCredentials(email, password);
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const { token, expiresAt } = createAdminSession(admin.id);

    const response = NextResponse.json({
      success: true,
      user: { id: admin.id, email: admin.email, role: admin.role },
    });

    response.cookies.set({
      name: 'mavvix_admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(expiresAt),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: 'Authentication temporarily unavailable' }, { status: 500 });
  }
}

