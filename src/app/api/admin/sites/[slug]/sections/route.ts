import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/security/auth';
import { getSiteBySlug } from '@/lib/db/repositories';
import { getPageByRouteKey, savePageSections } from '@/lib/db/cms';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const site = getSiteBySlug(slug);
    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const routeKey = searchParams.get('routeKey') || '/';

    const res = getPageByRouteKey(slug, routeKey);
    if (!res) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ page: res.page, sections: res.sections });
  } catch (error: any) {
    console.error('Error fetching sections:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('mavvix_admin_session')?.value;
    const admin = token ? verifySessionToken(token) : null;

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { pageId, sections } = body;

    if (!pageId || !Array.isArray(sections)) {
      return NextResponse.json({ error: 'Invalid payload: pageId and sections array required' }, { status: 400 });
    }

    savePageSections(pageId, sections);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving sections:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
