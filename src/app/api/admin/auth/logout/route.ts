import { NextResponse } from 'next/server';
import { revokeSession } from '@/lib/security/auth';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('mavvix_admin_session')?.value;
  if (token) {
    revokeSession(token);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete('mavvix_admin_session');
  return response;
}

