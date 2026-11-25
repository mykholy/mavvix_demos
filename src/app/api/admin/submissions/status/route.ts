import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/security/auth';
import { updateSubmissionStatus } from '@/lib/db/repositories';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('mavvix_admin_session')?.value;
    const admin = token ? verifySessionToken(token) : null;

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!['owner', 'editor'].includes(admin.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { id, status } = await request.json();
    if (typeof id !== 'string' || id.length > 100 || !['simulated','reviewed','archived','rejected'].includes(status)) {
      return NextResponse.json({ error: 'id and status required' }, { status: 400 });
    }

    const result = updateSubmissionStatus(id, status);
    if (!result.changes) return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error updating status' }, { status: 500 });
  }
}

