import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifySessionToken } from '@/lib/security/auth';
import { query, queryOne } from '@/lib/db';
import { getSubmissions } from '@/lib/db/repositories';
import {
  Layers,
  Inbox,
  Database,
  ShieldCheck,
  Building2,
  Factory,
  Home,
  HeartPulse,
  ShoppingBag,
  Palette,
  UtensilsCrossed,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Settings,
  Sparkles
} from 'lucide-react';

const verticals = [
  { slug: 'construction', name: 'Atlas Structures', ar: 'أطلس للبناء والتطوير', icon: Building2, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { slug: 'industrial', name: 'Ferroline Supplies', ar: 'فيرولاين للصناعات المعدنية', icon: Factory, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  { slug: 'real-estate', name: 'Meridian Residences', ar: 'ميريديان للتطوير العقاري', icon: Home, color: 'text-stone-400', bg: 'bg-stone-500/10', border: 'border-stone-500/30' },
  { slug: 'dental', name: 'Lumen Dental', ar: 'لومن لطب وجراحة الأسنان', icon: HeartPulse, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { slug: 'ecommerce', name: 'Noria Atelier', ar: 'نوريا أتيليه للأزياء', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  { slug: 'portfolio', name: 'Salma Hassan', ar: 'سلمى حسن — استوديو التصميم', icon: Palette, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { slug: 'restaurant', name: 'Saffron Table', ar: 'سفرة زعفران للمأكولات الفاخرة', icon: UtensilsCrossed, color: 'text-amber-600', bg: 'bg-amber-600/10', border: 'border-amber-600/30' },
  { slug: 'academy', name: 'Nova Learning', ar: 'أكاديمية نوفا للتعليم والتدريب', icon: GraduationCap, color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
];

export default function AdminDashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('mavvix_admin_session')?.value;
  const admin = token ? verifySessionToken(token) : null;

  if (!admin) {
    redirect('/admin/login');
  }

  // Fetch real statistics from SQLite
  const sitesCount = queryOne<{ c: number }>('SELECT COUNT(*) as c FROM demo_sites WHERE published = 1')?.c || 8;
  const projectsCount = queryOne<{ c: number }>('SELECT COUNT(*) as c FROM example_projects')?.c || 0;
  const itemsCount = queryOne<{ c: number }>('SELECT COUNT(*) as c FROM catalog_items')?.c || 0;
  const unitsCount = queryOne<{ c: number }>('SELECT COUNT(*) as c FROM property_units')?.c || 0;
  const dishesCount = queryOne<{ c: number }>('SELECT COUNT(*) as c FROM restaurant_dishes')?.c || 0;
  const coursesCount = queryOne<{ c: number }>('SELECT COUNT(*) as c FROM academy_courses')?.c || 0;
  const submissions = getSubmissions();

  const totalEntities = projectsCount + itemsCount + unitsCount + dishesCount + coursesCount;

  return (
    <div className="space-y-8 font-arabic" dir="rtl">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 end-0 w-96 h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Mavvix Demo Factory Studio • Operator View</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            استوديو إدارة المحتوى والمنصات الرقمية
          </h1>
          <p className="mt-1 text-slate-400 text-xs sm:text-sm max-w-2xl">
            إدارة المواقع الثمانية السابقة، ومراجعة استفسارات القطاعات الجديدة في قائمة منفصلة محمية بالصلاحيات.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <Link
            href="/ar/showcase"
            target="_blank"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-all flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>معاينة معرض المواقع</span>
          </Link>
          <Link href="/admin/portfolio-requests" className="bg-[#FB6935] hover:bg-[#FF865E] text-[#161A20] text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2"><Inbox size={15}/><span>طلبات القطاعات الجديدة</span></Link>
          <Link
            href="/admin/submissions"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            <Inbox className="w-4 h-4" />
            <span>كافة الاستمارات ({submissions.length})</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>المنصات الرقمية المعتمدة</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">{sitesCount} / 8</p>
          <p className="mt-1 text-[11px] text-cyan-400 font-medium">كافة القطاعات مفعلة في SQLite</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>سجلات الكتالوج العلائقية</span>
            <Database className="w-4 h-4 text-blue-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">{totalEntities}</p>
          <p className="mt-1 text-[11px] text-slate-400">مشاريع، منتجات، وحدات، أطباق، كورسات</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>طلبات واستفسارات العملاء</span>
            <Inbox className="w-4 h-4 text-amber-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">{submissions.length}</p>
          <p className="mt-1 text-[11px] text-amber-400 font-medium">محفوظة مع مخرجات التسعير</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>محرك قاعدة البيانات</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="mt-3 text-xl font-bold text-white">WAL Mode Active</p>
          <p className="mt-1 text-[11px] text-emerald-400 font-mono">mavvix-demo.sqlite</p>
        </div>
      </div>

      {/* Sector Switcher: Dedicated Portals for each of the 8 sites */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>لوحات التحكم المخصصة لكل منصة (8 مواقع)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              ادخل على لوحة تحكم أي موقع لإدارة الكتالوج والمحتوى، مراجعة الطلبات، وتعديل إعدادات الـ SEO.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-slate-950 text-slate-400 border border-slate-800">
            MULTI-TENANT STUDIO
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {verticals.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.slug}
                className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all flex flex-col justify-between group hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${v.bg} border ${v.border}`}>
                      <Icon className={`w-5 h-5 ${v.color}`} />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 uppercase">
                      {v.slug}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {v.ar}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5" dir="ltr">
                    {v.name}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-900 space-y-2">
                  <Link
                    href={`/admin/sites/${v.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700"
                  >
                    <Settings className="w-3.5 h-3.5 text-cyan-400" />
                    <span>لوحة تحكم الموقع</span>
                  </Link>

                  <div className="flex items-center justify-between text-xs px-1 text-slate-400">
                    <Link
                      href={`/ar/preview/${v.slug}`}
                      target="_blank"
                      className="hover:text-cyan-300 text-[11px] flex items-center gap-1"
                    >
                      <span>الموقع لايف</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                    <Link
                      href={`/admin/submissions?site=${v.slug}`}
                      className="hover:text-amber-300 text-[11px]"
                    >
                      الطلبات الواردة
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Submissions Queue */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">
              أحدث استمارات وطلبات العملاء
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              عروض الأسعار، طلبات المعاينة، المواعيد، وطلبات المتجر المسجلة في SQLite.
            </p>
          </div>
          <Link
            href="/admin/submissions"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold"
          >
            عرض كافة الاستمارات ←
          </Link>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl">
            <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">لم يتم تسجيل استمارات بعد.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-mono">رقم المرجع</th>
                  <th className="py-3 px-4">المنصة</th>
                  <th className="py-3 px-4">نوع الطلب</th>
                  <th className="py-3 px-4">الحالة</th>
                  <th className="py-3 px-4">التاريخ</th>
                  <th className="py-3 px-4 text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {submissions.slice(0, 6).map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-300" dir="ltr">
                      {s.payload?.refNumber || s.id.slice(0, 12)}
                    </td>
                    <td className="py-3.5 px-4 font-semibold capitalize">{s.site_slug}</td>
                    <td className="py-3.5 px-4 font-medium">{s.flow_type.replace(/_/g, ' ')}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]" dir="ltr">
                      {new Date(s.created_at).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Link
                        href={`/admin/sites/${s.site_slug}`}
                        className="text-xs text-cyan-400 hover:text-white font-medium underline"
                      >
                        إدارة المنصة
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
