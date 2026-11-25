import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/security/auth';
import {
  LayoutDashboard,
  Layers,
  Inbox,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Building2,
  Factory,
  Home,
  HeartPulse,
  ShoppingBag,
  Palette,
  UtensilsCrossed,
  GraduationCap
} from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get('mavvix_admin_session')?.value;
  const admin = token ? verifySessionToken(token) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-32 h-8">
                <Image
                  src="/assets/mavvix/site-logo-dark-bg.png"
                  alt="Mavvix Software"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                STUDIO CMS
              </span>
            </Link>

            {admin && (
              <nav className="hidden md:flex items-center gap-4 ml-6 pl-6 border-l border-slate-800 text-xs">
                <Link href="/admin" className="text-slate-300 hover:text-white flex items-center gap-1.5 font-medium">
                  <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dashboard</span>
                </Link>
                <Link href="/admin/submissions" className="text-slate-300 hover:text-white flex items-center gap-1.5 font-medium">
                  <Inbox className="w-3.5 h-3.5 text-amber-400" />
                  <span>Submissions</span>
                </Link>
                <Link href="/admin/portfolio-requests" className="text-slate-300 hover:text-white flex items-center gap-1.5 font-medium">
                  <Inbox className="w-3.5 h-3.5 text-[#FB6935]" /><span>Industry Requests</span>
                </Link>
                <Link href="/ar/showcase" className="text-slate-400 hover:text-cyan-300 flex items-center gap-1">
                  <span>Showcase</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {admin ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 hidden sm:inline">
                  {admin.email} <span className="text-amber-400 font-mono">({admin.role})</span>
                </span>
                <form action="/api/admin/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-mavvix-blue text-white hover:bg-blue-600 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}

