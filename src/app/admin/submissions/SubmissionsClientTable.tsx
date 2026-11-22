'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Archive, Clock, Eye, X, Printer, MessageCircle, Mail, ExternalLink } from 'lucide-react';

interface Props {
  initialSubmissions: any[];
  currentSite?: string;
}

export function SubmissionsClientTable({ initialSubmissions, currentSite }: Props) {
  const router = useRouter();
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [selectedSub, setSelectedSub] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(id: string, newStatus: string) {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/submissions/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setSubmissions(prev =>
          prev.map(s => s.id === id ? { ...s, status: newStatus } : s)
        );
        if (selectedSub && selectedSub.id === id) {
          setSelectedSub({ ...selectedSub, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="space-y-4 font-arabic" dir="rtl">
      {/* Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {submissions.length === 0 ? (
          <div className="text-center py-16">
            <Clock className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-white">قائمة الاستمارات فارغة</h3>
            <p className="text-xs text-slate-400 mt-1">
              لم يتم العثور على استمارات تطابق التصفية الحالية.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-mono">رقم المرجع</th>
                  <th className="py-3.5 px-4">المنصة</th>
                  <th className="py-3.5 px-4">نوع الطلب</th>
                  <th className="py-3.5 px-4">اسم العميل</th>
                  <th className="py-3.5 px-4">الحالة</th>
                  <th className="py-3.5 px-4">التاريخ</th>
                  <th className="py-3.5 px-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {submissions.map((s) => {
                  const p = s.payload || {};
                  const customerName = p.name || p.contactName || p.fullName || p.guestName || 'عميل تجريبي';
                  return (
                    <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-300" dir="ltr">
                        {p.refNumber || s.id.slice(0, 12)}
                      </td>
                      <td className="py-3.5 px-4 font-semibold capitalize">{s.site_slug}</td>
                      <td className="py-3.5 px-4 font-medium">{s.flow_type.replace(/_/g, ' ')}</td>
                      <td className="py-3.5 px-4 font-medium text-white">{customerName}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          s.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]" dir="ltr">
                        {new Date(s.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-center space-x-1.5 rtl:space-x-reverse">
                        <button
                          onClick={() => setSelectedSub(s)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white transition-colors text-[11px] font-semibold border border-slate-700"
                        >
                          معاينة الطلب
                        </button>
                        {s.status !== 'reviewed' && (
                          <button
                            disabled={updatingId === s.id}
                            onClick={() => updateStatus(s.id, 'reviewed')}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-white transition-colors"
                            title="تأكيد المراجعة"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {s.status !== 'archived' && (
                          <button
                            disabled={updatingId === s.id}
                            onClick={() => updateStatus(s.id, 'archived')}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title="أرشفة"
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Structured Modal with Print to PDF & WhatsApp */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 no-print">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400" dir="ltr">
                  REF #{selectedSub.payload?.refNumber || selectedSub.id.slice(0, 12)}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  تفاصيل الاستمارة / أمر العمل التجريبي
                </h3>
                <p className="text-xs text-slate-400">
                  المنصة: {selectedSub.site_slug} • نوع المعاملة: {selectedSub.flow_type}
                </p>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">اسم العميل</span>
                <span className="text-white font-semibold text-sm">
                  {selectedSub.payload?.name || selectedSub.payload?.contactName || selectedSub.payload?.fullName || selectedSub.payload?.guestName || 'عميل تجريبي'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">رقم الهاتف</span>
                <span className="text-white font-semibold font-mono" dir="ltr">
                  {selectedSub.payload?.phone || selectedSub.payload?.phoneE164 || 'غير مسجل'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">البريد الإلكتروني</span>
                <span className="text-white font-semibold font-mono" dir="ltr">
                  {selectedSub.payload?.email || 'customer@example.com'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">تاريخ التقديم</span>
                <span className="text-white font-mono" dir="ltr">
                  {new Date(selectedSub.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                البيانات الفنية ومحتوى الطلب:
              </h4>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2 font-mono">
                {Object.entries(selectedSub.payload || {}).map(([key, value]: [string, any]) => {
                  if (typeof value === 'object') return null;
                  return (
                    <div key={key} className="flex items-center justify-between py-1 border-b border-slate-900 last:border-0">
                      <span className="text-slate-400">{key}:</span>
                      <span className="text-cyan-300 font-semibold">{String(value)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 no-print">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>طباعة / تصدير PDF</span>
                </button>

                {selectedSub.payload?.phone && (
                  <a
                    href={`https://wa.me/${String(selectedSub.payload.phone).replace(/\D/g, '')}?text=${encodeURIComponent(
                      `أهلًا ${selectedSub.payload.name || ''}، معك فريق ${selectedSub.site_slug} بخصوص طلبك رقم (${selectedSub.payload?.refNumber || selectedSub.id.slice(0, 8)}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 text-xs font-bold transition-all shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>واتساب</span>
                  </a>
                )}

                {selectedSub.payload?.email && (
                  <a
                    href={`mailto:${selectedSub.payload.email}?subject=${encodeURIComponent(
                      `Reference #${selectedSub.payload?.refNumber || selectedSub.id.slice(0, 8)}`
                    )}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>إيميل</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                {selectedSub.status !== 'reviewed' && (
                  <button
                    onClick={() => updateStatus(selectedSub.id, 'reviewed')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
                  >
                    تأكيد المراجعة ✓
                  </button>
                )}
                <button
                  onClick={() => setSelectedSub(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
