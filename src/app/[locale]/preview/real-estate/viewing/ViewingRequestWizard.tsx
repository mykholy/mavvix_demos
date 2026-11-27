'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { LocalizedPropertyUnit } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Calendar,
  Clock,
  Video,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Building,
  Home
} from 'lucide-react';

interface Props {
  allUnits: LocalizedPropertyUnit[];
  locale: Locale;
  initialUnitSlug?: string;
}

export function ViewingRequestWizard({ allUnits, locale, initialUnitSlug }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [selectedUnitSlug, setSelectedUnitSlug] = useState<string>(
    initialUnitSlug || allUnits[0]?.slug || ''
  );
  const [preferredDay, setPreferredDay] = useState('tuesday');
  const [preferredTime, setPreferredTime] = useState('afternoon_2pm');
  const [viewingMode, setViewingMode] = useState<'in_person' | 'live_video'>('in_person');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('Interested in garden views and cash vs installment options.');

  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<{ id: string; refNumber: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedUnit = allUnits.find((u) => u.slug === selectedUnitSlug) || allUnits[0];

  async function handleViewingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!selectedUnit) {
      setError(isAr ? 'يرجى اختيار وحدة سكنية صالحة' : 'Please select a valid property unit');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        unitSlug: selectedUnit.slug,
        unitTitle: selectedUnit.title,
        priceEgp: selectedUnit.price_cents / 100,
        preferredDay,
        preferredTime,
        viewingMode,
        clientName,
        clientEmail,
        clientPhone,
        notes,
      };

      const res = await fetch('/api/demo/real-estate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'real_estate_viewing',
          payload,
          lines: [
            {
              source_type: 'property_unit',
              source_id: selectedUnit.slug,
              quantity: 1,
              unit_price_cents: selectedUnit.price_cents,
              snapshot: { title: selectedUnit.title, area_m2: selectedUnit.area_m2 },
            },
          ],
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Viewing request submission failed');
      }

      setReceipt({ id: data.submissionId, refNumber: data.refNumber });
    } catch (err: any) {
      setError(err.message || 'Error recording viewing request');
    } finally {
      setSubmitting(false);
    }
  }

  // Receipt View (Journey 1 Outcome)
  if (receipt) {
    return (
      <div className="bg-white border-2 border-stone-800 rounded-2xl p-8 sm:p-12 shadow-xl space-y-8 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest block">
                {isAr ? 'تم تسجيل طلب المعاينة' : 'Simulated Viewing Requested'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#25312D] font-serif">
                {isAr ? 'إيصال طلب معاينة تجريبي (Demo Request Only)' : 'Simulated Viewing Request Receipt'}
              </h2>
            </div>
          </div>

          <div className="text-start sm:text-end font-mono">
            <span className="text-[11px] text-stone-600 block uppercase">{isAr ? 'كود المرجع' : 'Viewing Ref Code'}</span>
            <span className="text-lg font-black text-[#805333]">{receipt.refNumber}</span>
          </div>
        </div>

        {/* Mandatory Explicit Disclosure: REQUEST ONLY */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-0.5 text-sm">
              {isAr ? 'طلب معاينة مبدئي (REQUEST ONLY — وليس حجزًا نهائيًا):' : 'REQUEST ONLY — No Final Booking Implied:'}
            </strong>
            {isAr
              ? 'تم تسجيل رغبتك في المعاينة محليًا داخل قاعدة بيانات SQLite وهي متاحة للمراجعة في لوحة التحكم (Admin Studio). لم يتم حجز الوحدة ولم يتم إجراء اتصالات هاتفية.'
              : 'Your viewing preference is recorded in the local SQLite database and viewable in Admin Studio. No unit has been blocked and no actual calls will be placed.'}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-[#F5F0E6] rounded-xl p-6 border border-stone-300 space-y-4 text-xs font-mono">
          <h3 className="font-bold text-[#25312D] uppercase tracking-wider text-xs border-b border-stone-300 pb-2 font-sans">
            {isAr ? 'تفاصيل الموعد والوحدة المطلوبة' : 'Audited Viewing Preference'}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-stone-600 block mb-0.5 font-sans">{isAr ? 'الوحدة السكنية' : 'Property Unit'}</span>
              <span className="font-bold text-[#25312D]">{selectedUnit.title}</span>
            </div>
            <div>
              <span className="text-stone-600 block mb-0.5 font-sans">{isAr ? 'المساحة' : 'Area'}</span>
              <span className="font-bold text-[#25312D]">{selectedUnit.area_m2} m²</span>
            </div>
            <div>
              <span className="text-stone-600 block mb-0.5 font-sans">{isAr ? 'السعر' : 'Price'}</span>
              <span className="font-bold text-[#805333]">{(selectedUnit.price_cents / 100).toLocaleString()} EGP</span>
            </div>
            <div>
              <span className="text-stone-600 block mb-0.5 font-sans">{isAr ? 'اليوم المفضل' : 'Preferred Day'}</span>
              <span className="font-bold text-[#25312D] capitalize">{preferredDay}</span>
            </div>
            <div>
              <span className="text-stone-600 block mb-0.5 font-sans">{isAr ? 'الفترة' : 'Time Slot'}</span>
              <span className="font-bold text-[#25312D]">{preferredTime.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="text-stone-600 block mb-0.5 font-sans">{isAr ? 'نمط المعاينة' : 'Tour Mode'}</span>
              <span className="font-bold text-emerald-700 capitalize">{viewingMode.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
          <Link
            href="/admin/submissions"
            className="bg-[#25312D] hover:bg-black text-white px-5 py-3 rounded-xl transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>{isAr ? 'التحقق من الطلب في لوحة التحكم (Admin Studio)' : 'Verify in Admin Studio'}</span>
          </Link>

          <Link
            href={`/${locale}/preview/real-estate/properties`}
            className="text-[#805333] hover:underline flex items-center gap-1"
          >
            <span>{isAr ? 'العودة لدليل العقارات' : 'Return to Properties'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleViewingSubmit} className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 sm:p-10 space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Property Unit Selector */}
      <div>
        <label className="block text-xs font-bold text-[#25312D] uppercase tracking-wider mb-2 font-mono">
          {isAr ? 'الوحدة السكنية المستهدفة للمعاينة' : 'Target Property Unit'}
        </label>
        <select
          aria-label={isAr ? 'الوحدة السكنية' : 'Target property unit'}
            value={selectedUnitSlug}
          onChange={(e) => setSelectedUnitSlug(e.target.value)}
          className="w-full p-3 bg-[#F5F0E6] border border-stone-300 rounded-xl text-xs font-bold text-[#25312D] font-mono focus:outline-none focus:ring-2 focus:ring-[#A8764F]"
        >
          {allUnits.map((u) => (
            <option key={u.id} value={u.slug}>
              {u.title} — {u.area_m2} m² • {(u.price_cents / 100).toLocaleString()} EGP ({u.unit_type})
            </option>
          ))}
        </select>
      </div>

      {/* Viewing Preferences: Day, Time, Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-600 mb-2">
            {isAr ? 'اليوم المفضل' : 'Preferred Day'}
          </label>
          <select
            aria-label={isAr ? 'اليوم المفضل' : 'Preferred day'}
            value={preferredDay}
            onChange={(e) => setPreferredDay(e.target.value)}
            className="w-full p-2.5 bg-[#F5F0E6] border border-stone-300 rounded-lg text-xs font-bold text-[#25312D]"
          >
            <option value="sunday">{isAr ? 'الأحد' : 'Sunday'}</option>
            <option value="tuesday">{isAr ? 'الثلاثاء' : 'Tuesday'}</option>
            <option value="thursday">{isAr ? 'الخميس' : 'Thursday'}</option>
            <option value="saturday">{isAr ? 'السبت' : 'Saturday'}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-600 mb-2">
            {isAr ? 'الفترة الزمنية' : 'Time Slot'}
          </label>
          <select
            aria-label={isAr ? 'الفترة الزمنية' : 'Time slot'}
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            className="w-full p-2.5 bg-[#F5F0E6] border border-stone-300 rounded-lg text-xs font-bold text-[#25312D]"
          >
            <option value="morning_10am">{isAr ? 'صباحًا (10:00 ص)' : 'Morning (10:00 AM)'}</option>
            <option value="afternoon_2pm">{isAr ? 'بعد الظهر (2:00 م)' : 'Afternoon (2:00 PM)'}</option>
            <option value="evening_5pm">{isAr ? 'مساءً (5:00 م)' : 'Evening (5:00 PM)'}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-600 mb-2">
            {isAr ? 'نمط المعاينة' : 'Tour Mode'}
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setViewingMode('in_person')}
              className={`p-2.5 rounded-lg border font-bold text-center transition-all ${
                viewingMode === 'in_person'
                  ? 'bg-[#25312D] text-white border-[#25312D]'
                  : 'bg-[#F5F0E6] text-stone-700 border-stone-300'
              }`}
            >
              {isAr ? 'معاينة ميدانية' : 'In-Person'}
            </button>
            <button
              type="button"
              onClick={() => setViewingMode('live_video')}
              className={`p-2.5 rounded-lg border font-bold text-center transition-all ${
                viewingMode === 'live_video'
                  ? 'bg-[#25312D] text-white border-[#25312D]'
                  : 'bg-[#F5F0E6] text-stone-700 border-stone-300'
              }`}
            >
              {isAr ? 'فيديو مباشر' : 'Video Tour'}
            </button>
          </div>
        </div>
      </div>

      {/* Guest Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200">
        <div>
          <label className="block text-xs font-bold text-stone-600 mb-1">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
          <input
            type="text"
            required
            aria-label={isAr ? 'الاسم الكامل' : 'Full name'}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full p-2.5 bg-[#F5F0E6] border border-stone-300 rounded-lg text-xs font-bold text-[#25312D]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-600 mb-1">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
          <input
            type="email"
            required
            aria-label={isAr ? 'البريد الإلكتروني' : 'Email address'}
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full p-2.5 bg-[#F5F0E6] border border-stone-300 rounded-lg text-xs font-bold text-[#25312D]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-600 mb-1">{isAr ? 'رقم الهاتف' : 'Phone Number'}</label>
          <input
            type="tel"
            required
            aria-label={isAr ? 'رقم الهاتف' : 'Phone number'}
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="w-full p-2.5 bg-[#F5F0E6] border border-stone-300 rounded-lg text-xs font-bold text-[#25312D]"
          />
        </div>
      </div>

      {/* Notice Disclosure */}
      <div className="p-3 bg-stone-100 rounded-lg text-[11px] text-stone-600 leading-relaxed">
        <strong>{isAr ? 'ملاحظة:' : 'Note:'}</strong>{' '}
        {isAr
          ? 'هذا الإرسال يمثل طلب تفضيل موعد تجريبي ولا ينشئ حجزًا مؤكدًا أو التزامًا ماليًا.'
          : 'This submission represents an intake preference request for demonstration and creates no financial commitment.'}
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
        <Link
          href={`/${locale}/preview/real-estate/properties`}
          className="text-xs text-stone-600 hover:text-[#25312D]"
        >
          ← {isAr ? 'العودة للوحدات' : 'Back to listings'}
        </Link>

        <button
          type="submit"
          disabled={submitting}
          className="bg-[#805333] hover:bg-[#8e613e] text-white font-bold text-xs px-8 py-3.5 rounded-xl uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
        >
          <Calendar className="w-4 h-4" />
          <span>{submitting ? (isAr ? 'جاري التسجيل...' : 'Recording in SQLite...') : (isAr ? 'تأكيد طلب المعاينة التجريبي' : 'Submit Viewing Request')}</span>
          <Arrow className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}

