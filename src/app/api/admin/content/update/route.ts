import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/security/auth';
import { execute, queryOne } from '@/lib/db';
import crypto from 'node:crypto';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('mavvix_admin_session')?.value;
    const admin = token ? verifySessionToken(token) : null;

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!['owner', 'editor'].includes(admin.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { id, siteId, ownerType, ownerId, locale, title, summary, bodyJson } = await request.json();
    if (!id || !title) {
      return NextResponse.json({ error: 'id and title required' }, { status: 400 });
    }

    const update = execute(
      `UPDATE localized_content 
       SET title = ?, summary = ?, body_json = ?
       WHERE id = ?`,
      [title, summary || '', JSON.stringify(bodyJson || {}), id]
    );

    if (!update.changes) return NextResponse.json({ error: 'Content not found' }, { status: 404 });

    // Record in audit log
    const auditId = 'aud_' + crypto.randomUUID();
    execute(
      `INSERT INTO admin_audit_log (id, admin_id, site_id, action, entity_type, entity_id, metadata_json)
       VALUES (?, ?, ?, 'update_content', ?, ?, ?)`,
      [auditId, admin.id, siteId || null, ownerType || 'content', ownerId || id, JSON.stringify({ locale, title })]
    );

    return NextResponse.json({ success: true, message: 'Content updated and logged.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error updating content' }, { status: 500 });
  }
}

