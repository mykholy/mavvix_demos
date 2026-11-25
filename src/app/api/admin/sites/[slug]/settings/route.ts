import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/security/auth';
import { getSiteBySlug } from '@/lib/db/repositories';
import { execute } from '@/lib/db';

export async function POST(req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  try {
    const cookieStore = await cookies();
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
    const { nameAr, nameEn, themeUpdates } = body;

    let updatedTheme = site.theme_json || {};
    if (typeof updatedTheme === 'string') {
      try { updatedTheme = JSON.parse(updatedTheme); } catch { updatedTheme = {}; }
    }

    if (themeUpdates && typeof themeUpdates === 'object') {
      updatedTheme = { ...updatedTheme, ...themeUpdates };
    }

    const name_ar = nameAr || site.name_ar;
    const name_en = nameEn || site.name_en;
    const theme_str = JSON.stringify(updatedTheme);

    execute(
      `UPDATE demo_sites SET name_ar = ?, name_en = ?, theme_json = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?`,
      [name_ar, name_en, theme_str, slug]
    );

    // Audit log
    execute(
      `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, payload_before, payload_after)
       VALUES (?, ?, 'update_site_settings', 'demo_site', ?, ?, ?)`,
      [
        `audit-${Date.now()}`,
        admin.id,
        slug,
        JSON.stringify({ name_ar: site.name_ar, name_en: site.name_en }),
        JSON.stringify({ name_ar, name_en, themeUpdates })
      ]
    );

    return NextResponse.json({ success: true, message: 'Settings saved successfully / تم حفظ الإعدادات بنجاح' });
  } catch (error: any) {
    console.error('Error updating site settings:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
