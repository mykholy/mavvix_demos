import { NextResponse } from 'next/server';
import { verifyCredentials, createAdminSession } from '@/lib/security/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
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
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

