import { NextResponse } from 'next/server';
import { saveGuestProgress, getGuestProgress } from '@/lib/db/repositories';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const guestToken = searchParams.get('guestToken') || '';
    if (guestToken.length < 12 || guestToken.length > 128) return NextResponse.json({ error: 'Invalid progress token' }, { status: 400 });
    const progress = getGuestProgress(guestToken);
    return NextResponse.json({ success: true, progress });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error fetching progress' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { guestToken, itemType, itemId, status, score } = body;

    if (typeof guestToken !== 'string' || guestToken.length < 12 || guestToken.length > 128 || typeof itemId !== 'string' || itemId.length > 128 || !itemType || !itemId) {
      return NextResponse.json({ error: 'Missing itemType or itemId' }, { status: 400 });
    }

    if (!['lesson', 'quiz'].includes(itemType)) {
      return NextResponse.json({ error: 'itemType must be lesson or quiz' }, { status: 400 });
    }

    if (!['completed', 'in_progress'].includes(status || 'completed')) return NextResponse.json({ error: 'Invalid status' }, { status: 422 });
    const result = saveGuestProgress(guestToken, itemType, itemId, status || 'completed', score);

    return NextResponse.json({
      success: true,
      saved: result,
      message: 'Progress recorded in SQLite demo_guest_progress table.'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error saving progress' }, { status: 500 });
  }
}

