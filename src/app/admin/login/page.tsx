'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  KeyRound,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@mavvix.demo');
  const [password, setPassword] = useState('MavvixDemo2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function performLogin(targetEmail: string, targetPass: string) {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, password: targetPass }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed / فشل التحقق من الحساب');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login error occurred / حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  }

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    performLogin(email, password);
  }

  function handleInstantDemoLogin() {
    setEmail('admin@mavvix.demo');
    setPassword('MavvixDemo2026!');
    performLogin('admin@mavvix.demo', 'MavvixDemo2026!');
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  return (
    <div className="min-h-screen bg-[#070D1B] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-slate-100 relative overflow-hidden selection:bg-mavvix-blue selection:text-white font-arabic" dir="rtl">
      {/* Background glowing ambient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <div className="flex justify-center mb-5">
          <div className="relative w-44 h-14 transition-transform hover:scale-105 duration-300">
            <Image
              src="/assets/mavvix/site-logo-dark-bg.png"
              alt="Mavvix Software"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-950/30 mb-3">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Mavvix Content Studio • لوحة التحكم المحمية</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          تسجيل الدخول إلى استوديو الإدارة
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
          إدارة بيانات القطاعات الثمانية، مراجعة استمارات العملاء، ومراقبة قاعدة بيانات SQLite.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-2 sm:px-4 relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl border border-slate-800/80 sm:px-10 space-y-6 ring-1 ring-white/5">
          
          {/* Quick 1-Click Access Pill */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 text-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                الدخول التجريبي الفوري (1-Click Access)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
                ADMIN ACCESS
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-5">
              اضغط الزر أدناه للدخول المباشر بحساب المدير التجريبي المعتمد تلقائيًا دون الحاجة لكتابة البيانات يدويًا:
            </p>
            <button
              type="button"
              id="instant-demo-login-btn"
              onClick={handleInstantDemoLogin}
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-lg shadow-blue-600/25 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-mavvix-blue via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-[0.99] transition-all disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4 text-cyan-300" />
              <span>{loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول الفوري بحساب المدير • 1-Click Login'}</span>
              <ArrowRight className="w-4 h-4 text-cyan-300 rotate-180" />
            </button>
          </div>

          {/* Credentials Display Badges */}
          <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>بيانات الدخول المعتمدة للديمو:</span>
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> نشط ومفعل
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono" dir="ltr">
              <div
                onClick={() => copyToClipboard('admin@mavvix.demo', 'email')}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors group"
                title="اضغط للنسخ"
              >
                <div className="truncate">
                  <span className="text-slate-500 block text-[10px]">Email</span>
                  <span className="text-white font-semibold">admin@mavvix.demo</span>
                </div>
                {copiedKey === 'email' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
                )}
              </div>

              <div
                onClick={() => copyToClipboard('MavvixDemo2026!', 'password')}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors group"
                title="اضغط للنسخ"
              >
                <div>
                  <span className="text-slate-500 block text-[10px]">Password</span>
                  <span className="text-white font-semibold">MavvixDemo2026!</span>
                </div>
                {copiedKey === 'password' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
                )}
              </div>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-[11px] text-slate-500 uppercase tracking-widest font-mono font-bold">
              أو الإدخال اليدوي
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                البريد الإلكتروني للإدارة (Admin Email)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  dir="ltr"
                  placeholder="admin@mavvix.demo"
                  className="block w-full pr-10 pl-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mavvix-blue focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                كلمة المرور (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  dir="ltr"
                  placeholder="••••••••••••"
                  className="block w-full pr-10 pl-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mavvix-blue focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-slate-700/60 rounded-xl shadow-sm text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-mavvix-blue transition-all disabled:opacity-50"
            >
              <span>{loading ? 'جاري التحقق...' : 'تسجيل الدخول اليدوي'}</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </form>

          {/* Links back to Showcase */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <Link
              href="/ar/showcase"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <span>→ العودة إلى معرض المنصات</span>
            </Link>
            <span className="text-[11px] text-slate-600 font-mono">SQLite Auth v2.0</span>
          </div>

        </div>
      </div>
    </div>
  );
}
