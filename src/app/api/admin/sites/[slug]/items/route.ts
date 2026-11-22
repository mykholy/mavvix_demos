import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/security/auth';
import { getSiteBySlug } from '@/lib/db/repositories';
import { updateDomainItem, createDomainItem, deleteDomainItem } from '@/lib/db/cms';

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('mavvix_admin_session')?.value;
    const admin = token ? verifySessionToken(token) : null;

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized / غير مصرح' }, { status: 401 });
    }

    const { slug } = params;
    const site = getSiteBySlug(slug);
    if (!site) {
      return NextResponse.json({ error: 'Site not found / الموقع غير موجود' }, { status: 404 });
    }

    const body = await req.json();
    const { action = 'create', itemId, itemData } = body;

    if (action === 'create') {
      const res = createDomainItem(slug, itemData);
      return NextResponse.json({ success: true, item: res });
    } else if (action === 'update') {
      if (!itemId) return NextResponse.json({ error: 'Missing itemId' }, { status: 400 });
      updateDomainItem(slug, itemId, itemData);
      return NextResponse.json({ success: true });
    } else if (action === 'delete') {
      if (!itemId) return NextResponse.json({ error: 'Missing itemId' }, { status: 400 });
      deleteDomainItem(slug, itemId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Error handling items API:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

