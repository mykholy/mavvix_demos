'use client';

import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { LUMA_EVENTS } from '@/lib/verticals/events/data';
import { CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';

const fields = [
  {
    key: 'country',
    ar: 'الدولة',
    en: 'Country',
    options: [
      ['egypt', 'مصر', 'Egypt'],
      ['saudi-arabia', 'المملكة العربية السعودية', 'Saudi Arabia'],
      ['flexible', 'مرنة / دولة أخرى', 'Flexible / Other']
    ]
  },
  {
    key: 'guestBand',
    ar: 'نطاق الحضور المتوقع',
    en: 'Target Guest Attendance',
    options: [
      ['under-50', 'أقل من 50 ضيفاً', 'Under 50 guests'],
      ['50-149', '50–149 ضيفاً', '50–149 guests'],
      ['150-299', '150–299 ضيفاً', '150–299 guests'],
      ['300-499', '300–499 ضيفاً', '300–499 guests'],
      ['500-plus', '500 ضيف فأكثر', '500+ guests']
    ]
  },
  {
    key: 'venueStatus',
    ar: 'حالة اختيار وتأكيد المكان',
    en: 'Venue Readiness Status',
    options: [
      ['selected', 'تم اختيار القاعة والتعاقد معها', 'Selected & Contracted'],
      ['shortlisted', 'خيارات مبدئية قيد المفاضلة', 'Shortlisted Options'],
      ['not-selected', 'لم يتم الاختيار (مطلوب استكشاف)', 'Not Selected (Scouting Required)']
    ]
  },
  {
    key: 'budgetBand',
    ar: 'نطاق الميزانية ومستوى التجهيز',
    en: 'Production Budget Scope',
    options: [
      ['essential', 'أساسي (تجهيزات قياسية)', 'Essential (Standard AV)'],
      ['standard', 'نموذجي (إضاءة مسرحية متكاملة)', 'Standard (Full Stage Lighting)'],
      ['premium', 'متميز (شاشات LED وبث وهياكل)', 'Premium (LED Screens & Staging)'],
      ['flexible', 'مرن / مفصل (تصميم معماري كامل)', 'Flexible / Custom Architecture']
    ]
  }
] as const;

type Prefs = Record<typeof fields[number]['key'], string>;

export function LumaForm({
  locale,
  initial
}: {
  locale: Locale;
  initial: string;
}) {
  const ar = locale === 'ar';
  const [serviceSlug, setService] = useState(initial);
  const [prefs, setPrefs] = useState<Prefs>({
    country: 'egypt',
    guestBand: '50-149',
    venueStatus: 'not-selected',
    budgetBand: 'flexible'
  });
  const [eventDate, setDate] = useState('');
  const [guestName, setName] = useState('');
  const [guestPhone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');

  const key = useRef<string | null>(null);
  const service = LUMA_EVENTS.services.find((s) => s.slug === serviceSlug) ?? LUMA_EVENTS.services[0];

  const field =
    'mt-2 block min-h-12 w-full border border-[#AD979B] bg-white px-3.5 py-3 text-sm text-[#291C2D] focus-visible:outline-2 focus-visible:outline-[#874F63] font-medium';
  const label = 'block text-sm font-bold text-[#291C2D]';

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || reference || !consent) return;
    setBusy(true);
    setError('');

    try {
      if (!key.current) key.current = crypto.randomUUID();
      const u = new URLSearchParams(window.location.search);
      const res = await fetch('/api/portfolio/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'event_planning_request',
          clientRequestId: key.current,
          serviceSlug,
          eventType: service.category,
          ...prefs,
          eventDate,
          guestName,
          guestPhone,
          consent,
          honeypot: '',
          utm: {
            source: (u.get('utm_source') || '').slice(0, 100),
            medium: (u.get('utm_medium') || '').slice(0, 100),
            campaign: (u.get('utm_campaign') || '').slice(0, 100)
          }
        })
      });

      const d = await res.json();
      if (!res.ok || !d.success) throw Error('SAVE_FAILED');
      setReference(d.refNumber);
    } catch {
      setError(
        ar
          ? 'تعذر حفظ الاستفسار. يرجى مراجعة البيانات المدخلة والمحاولة مجدداً.'
          : 'Could not save the planning enquiry. Please review your selections and try again.'
      );
    } finally {
      setBusy(false);
    }
  }

  if (reference) {
    return (
      <div role="status" className="border-2 border-[#291C2D] bg-[#F1E4DF] p-8 sm:p-12 text-center shadow-lg">
        <CheckCircle2 size={56} className="mx-auto text-[#874F63]" />
        <h2 className="mt-6 font-serif text-3xl font-medium text-[#291C2D]">
          {ar ? 'تم تسجيل ملف متطلبات الفعالية بنجاح' : 'Event Planning Brief Recorded'}
        </h2>
        <div className="mt-6 inline-block bg-[#291C2D] text-[#DCB8A6] px-6 py-3 font-mono text-xl font-bold tracking-widest break-all">
          {reference}
        </div>
        <p className="mt-6 text-sm leading-8 text-[#5A4650] max-w-lg mx-auto">
          {ar
            ? 'تنبيه: هذا الرقم مرجعي للتنسيق والتخطيط فقط، ولا يمثل حجزاً معتمداً لقاعة أو تعاقداً مع موردين.'
            : 'Notice: This reference is for planning coordination only; does not represent a confirmed venue booking or vendor contract.'}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="inline-flex items-center gap-2 bg-[#291C2D] text-white px-6 py-3.5 text-sm font-bold hover:bg-[#874F63] transition-colors"
            href={'https://mavvix.com/' + locale + '/contact'}
          >
            <span>{ar ? 'اطلب موقعاً لشركتك من مافكس' : 'Commission Your Website with Mavvix'}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-[#D8C7C4] bg-[#F1E4DF] shadow-sm">
      <div className="bg-[#291C2D] text-white p-7 sm:p-9">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#DCB8A6] uppercase tracking-wider mb-2">
          <Sparkles size={16} />
          <span>{ar ? 'ملف التخطيط المبدئي' : 'Planning Enquiry Dossier'}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-medium">
          {ar ? 'متطلبات وتجهيزات الفعالية' : 'Event Requirements & Staging'}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#ECDDD8]">
          {ar
            ? 'استفسار تخطيط إداري لدراسة نطاق الفعالية، وليس حجزاً تجارياً ملزماً.'
            : 'Administrative planning inquiry to calibrate event scope; not a live commercial booking.'}
        </p>
      </div>

      <div className="p-6 sm:p-9 space-y-6">
        {/* Service / Experience Dropdown */}
        <label className={label}>
          <span>{ar ? 'نوع الفعالية أو التجربة' : 'Event Experience Format'}</span>
          <select
            className={field}
            value={serviceSlug}
            onChange={(e) => setService(e.target.value)}
            aria-label={ar ? 'نوع الفعالية' : 'Event Format'}
          >
            {LUMA_EVENTS.services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title[locale]} ({s.category.toUpperCase()})
              </option>
            ))}
          </select>
        </label>

        {/* Checkpoints summary for selected service */}
        <div className="bg-[#FCF7F1] border border-[#D8C7C4] p-4">
          <p className="font-bold text-xs uppercase tracking-wider text-[#874F63]">
            {ar ? 'محاور المراجعة الأساسية لهذه الفعالية' : 'Core Checkpoints for Selected Format'}
          </p>
          <div className="mt-3 space-y-1.5">
            {service.checkpoints[locale].map((x) => (
              <p key={x} className="text-xs leading-6 text-[#5A4650] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#874F63] shrink-0" />
                <span>{x}</span>
              </p>
            ))}
          </div>
        </div>

        {/* 4 Standard Select Inputs */}
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((f) => (
            <label key={f.key} className={label}>
              <span>{ar ? f.ar : f.en}</span>
              <select
                className={field}
                value={prefs[f.key]}
                onChange={(e) =>
                  setPrefs((p) => ({
                    ...p,
                    [f.key]: e.target.value
                  }))
                }
                aria-label={ar ? f.ar : f.en}
              >
                {f.options.map(([v, a, en]) => (
                  <option key={v} value={v}>
                    {ar ? a : en}
                  </option>
                ))}
              </select>
            </label>
          ))}

          {/* Date Picker */}
          <label className={label}>
            <span>{ar ? 'التاريخ المفضل للفعالية (اختياري)' : 'Preferred Event Date (Optional)'}</span>
            <input
              className={field}
              type="date"
              value={eventDate}
              onChange={(e) => setDate(e.target.value)}
              aria-label={ar ? 'التاريخ المفضل للفعالية' : 'Preferred Event Date'}
            />
          </label>

          {/* Contact Name */}
          <label className={label}>
            <span>{ar ? 'الاسم للتواصل والتنسيق' : 'Contact Full Name'}</span>
            <input
              className={field}
              required
              minLength={2}
              maxLength={110}
              autoComplete="name"
              placeholder={ar ? 'الاسم الثلاثي' : 'Jane Doe'}
              value={guestName}
              onChange={(e) => setName(e.target.value)}
              aria-label={ar ? 'الاسم للتواصل' : 'Contact Name'}
            />
          </label>

          {/* Contact Phone */}
          <label className={label + ' sm:col-span-2'}>
            <span>{ar ? 'رقم الهاتف المباشر (مع المفتاح الدولي)' : 'Contact Phone Number (with Country Code)'}</span>
            <input
              className={field}
              type="tel"
              required
              minLength={8}
              maxLength={24}
              autoComplete="tel"
              placeholder="+20 100 123 4567 / +966 50 123 4567"
              value={guestPhone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label={ar ? 'رقم الهاتف' : 'Contact Phone'}
            />
          </label>
        </div>

        {/* Discretion & Privacy Notice */}
        <div className="flex gap-3 p-4 bg-[#FCF7F1] border border-[#D8C7C4] text-xs leading-6 text-[#5A4650]">
          <ShieldCheck size={20} className="shrink-0 text-[#874F63] mt-0.5" />
          <span>
            {ar
              ? 'احترام تام للخصوصية: لا يجمع هذا النموذج أسماء الضيوف، قوائم الشخصيات، أو أي بيانات بنكية. الغرض هو تقدير المتطلبات الفنية والإنتاجية فقط.'
              : 'Discretion protocol: This form never collects guest lists, VIP rosters, or payment info. Its sole purpose is technical and logistical calibration.'}
          </span>
        </div>

        {/* Consent Checkbox */}
        <label className="flex gap-3 text-xs leading-6 cursor-pointer text-[#291C2D]">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-[#291C2D] w-4 h-4 shrink-0"
          />
          <span>
            {ar
              ? 'أوافق على حفظ بيانات التواصل الأساسية لغرض دراسة متطلبات الفعالية، مع العلم بأن هذا الاستفسار لا يشكل حجزاً ملزماً.'
              : 'I consent to storing basic contact details for event planning calibration, acknowledging that this does not constitute a confirmed booking.'}
          </span>
        </label>

        {error && (
          <p role="alert" className="bg-red-50 text-red-900 border border-red-200 p-4 text-xs font-bold">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !consent}
          className="w-full min-h-14 bg-[#291C2D] text-white px-6 py-4 text-sm font-bold disabled:opacity-50 hover:bg-[#874F63] transition-colors flex items-center justify-center gap-2"
        >
          <Send size={16} />
          <span>
            {busy
              ? ar
                ? 'جارٍ الحفظ والمعالجة...'
                : 'Saving...'
              : ar
              ? 'حفظ وإرسال ملف المتطلبات'
              : 'Submit Planning Brief'}
          </span>
        </button>
      </div>
    </form>
  );
}
