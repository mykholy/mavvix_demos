import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/security/auth';
import { updateSubmissionStatus } from '@/lib/db/repositories';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('mavvix_admin_session')?.value;
    const admin = token ? verifySessionToken(token) : null;

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'id and status required' }, { status: 400 });
    }

    updateSubmissionStatus(id, status);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error updating status' }, { status: 500 });
  }
}

