import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/security/auth';
import { getSiteBySlug } from '@/lib/db/repositories';
import { getSitePages, createCustomPage, updateCustomPage, deleteCustomPage } from '@/lib/db/cms';

export async function GET(req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  try {
    const { slug } = params;
    const site = getSiteBySlug(slug);
    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const pages = getSitePages(slug);
    return NextResponse.json({ pages });
  } catch (error: any) {
    console.error('Error fetching pages:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('mavvix_admin_session')?.value;
    const admin = token ? verifySessionToken(token) : null;

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = params;
    const site = getSiteBySlug(slug);
    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const body = await req.json();
    const newPage = createCustomPage(slug, body);
    return NextResponse.json({ success: true, page: newPage });
  } catch (error: any) {
    console.error('Error creating custom page:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('mavvix_admin_session')?.value;
    const admin = token ? verifySessionToken(token) : null;

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { pageId, ...updates } = body;
    if (!pageId) {
      return NextResponse.json({ error: 'Missing pageId' }, { status: 400 });
    }

    updateCustomPage(pageId, updates);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating custom page:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('mavvix_admin_session')?.value;
    const admin = token ? verifySessionToken(token) : null;

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const pageId = searchParams.get('pageId');
    if (!pageId) {
      return NextResponse.json({ error: 'Missing pageId' }, { status: 400 });
    }

    deleteCustomPage(pageId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting custom page:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

