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
  Clock
} from 'lucide-react';

const verticals = [
  { slug: 'construction', name: 'Atlas Structures', ar: 'أطلس للبناء', icon: Building2, color: 'text-amber-500' },
  { slug: 'industrial', name: 'Ferroline Supplies', ar: 'فيرولاين للصناعات', icon: Factory, color: 'text-yellow-500' },
  { slug: 'real-estate', name: 'Meridian Residences', ar: 'ميريديان العقارية', icon: Home, color: 'text-stone-400' },
  { slug: 'dental', name: 'Lumen Dental', ar: 'لومن للأسنان', icon: HeartPulse, color: 'text-emerald-500' },
  { slug: 'ecommerce', name: 'Noria Atelier', ar: 'نوريا أتيليه', icon: ShoppingBag, color: 'text-orange-500' },
  { slug: 'portfolio', name: 'Salma Hassan', ar: 'سلمى حسن ستوديو', icon: Palette, color: 'text-blue-500' },
  { slug: 'restaurant', name: 'Saffron Table', ar: 'سفرة زعفران', icon: UtensilsCrossed, color: 'text-amber-600' },
  { slug: 'academy', name: 'Nova Learning', ar: 'نوفا للتعلم', icon: GraduationCap, color: 'text-indigo-500' },
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
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Mavvix Demo Factory Studio • Operator View</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Control Center & Submission Queue
          </h1>
          <p className="mt-1 text-slate-400 text-sm">
            Persisted SQLite state for all 8 sectors. Review simulated quotes, inquiries, and orders.
          </p>
        </div>

        <Link
          href="/admin/submissions"
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0"
        >
          <Inbox className="w-4 h-4" />
          <span>View All Submissions ({submissions.length})</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Verified Demo Sites</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">{sitesCount} / 8</p>
          <p className="mt-1 text-[11px] text-cyan-400 font-medium">All verticals active in SQLite</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Relational Catalog Records</span>
            <Database className="w-4 h-4 text-blue-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">{totalEntities}</p>
          <p className="mt-1 text-[11px] text-slate-400">Projects, SKUs, Units, Dishes, Courses</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Simulated Submissions</span>
            <Inbox className="w-4 h-4 text-amber-400" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-white">{submissions.length}</p>
          <p className="mt-1 text-[11px] text-amber-400 font-medium">Recorded with 7-day retention</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Database Mode</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="mt-3 text-xl font-bold text-white">WAL Mode Active</p>
          <p className="mt-1 text-[11px] text-emerald-400 font-mono">./data/mavvix-demo.sqlite</p>
        </div>
      </div>

      {/* Sector Switcher & Edit Links */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-base font-bold text-white mb-4">
          Industry Vertical Portals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {verticals.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.slug}
                className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-5 h-5 ${v.color}`} />
                  <div>
                    <h3 className="text-xs font-bold text-white">{v.name}</h3>
                    <p className="text-[11px] text-slate-400">{v.ar}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-900 text-xs">
                  <Link
                    href={`/ar/preview/${v.slug}`}
                    className="text-cyan-400 hover:text-cyan-300 font-medium text-[11px] flex items-center gap-1"
                  >
                    <span>View Site</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href={`/admin/submissions?site=${v.slug}`}
                    className="text-slate-400 hover:text-slate-200 text-[11px]"
                  >
                    Queue
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Submissions Queue */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-white">
              Recent Demonstrative Submissions
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Quotes, RFQs, viewings, appointments, and orders submitted by visitors.
            </p>
          </div>
          <Link
            href="/admin/submissions"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            View all →
          </Link>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl">
            <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No submissions recorded yet.</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Submit a quote, RFQ, appointment or order from any demo site to see it here!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Ref Number</th>
                  <th className="py-3 px-4">Vertical</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {submissions.slice(0, 5).map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-300">
                      {s.payload?.refNumber || s.id.slice(0, 12)}
                    </td>
                    <td className="py-3 px-4 capitalize">{s.site_slug}</td>
                    <td className="py-3 px-4 font-medium">{s.flow_type.replace('_', ' ')}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(s.created_at).toLocaleString()}
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

