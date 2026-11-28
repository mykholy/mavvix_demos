'use client';

import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { NOMAD_ROUTES } from '@/lib/verticals/travel-agency/data';
import { CheckCircle2, ShieldCheck, Compass, Send } from 'lucide-react';

const countryOf = (s: string) =>
  ['riyadh-city-break', 'jeddah-coast'].includes(s)
    ? 'saudi-arabia'
    : s === 'tailor-made-journey'
    ? 'flexible'
    : 'egypt';

export function NomadForm({
  locale,
  initial
}: {
  locale: Locale;
  initial: string;
}) {
  const ar = locale === 'ar';
  const first = NOMAD_ROUTES.services.find((j) => j.slug === initial) || NOMAD_ROUTES.services[0];
  const [serviceSlug, setService] = useState(first.slug);
  const [country, setCountry] = useState(countryOf(first.slug));
  const [duration, setDuration] = useState(first.days ?? 5);
  const [groupSize, setGroup] = useState(2);
  const [pace, setPace] = useState<'slow' | 'balanced' | 'active' | 'custom'>('balanced');
  const [budgetBand, setBudget] = useState<'economy' | 'comfort' | 'premium' | 'flexible'>('flexible');
  const [departureDate, setDate] = useState('');
  const [guestName, setName] = useState('');
  const [guestPhone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');

  const key = useRef<string | null>(null);
  const journey = NOMAD_ROUTES.services.find((j) => j.slug === serviceSlug) ?? first;

  const field =
    'mt-2 block min-h-12 w-full border border-[#B8AD97] bg-white px-3.5 py-3 text-sm text-[#18352E] font-medium focus-visible:outline-2 focus-visible:outline-[#944129]';
  const lab = 'block text-sm font-bold text-[#18352E]';

  function choose(slug: string) {
    const j = NOMAD_ROUTES.services.find((x) => x.slug === slug);
    if (!j) return;
    setService(slug);
    setCountry(countryOf(slug));
    setDuration(j.days ?? 5);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || reference || !consent) return;
    setBusy(true);
    setError('');

    try {
      if (!key.current) key.current = crypto.randomUUID();
      const u = new URLSearchParams(window.location.search);
      const r = await fetch('/api/portfolio/travel-agency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'travel_planning_request',
          clientRequestId: key.current,
          serviceSlug,
          country,
          duration,
          groupSize,
          pace,
          budgetBand,
          departureDate,
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
      const resData = await r.json();
      if (!r.ok || !resData.success) throw Error(resData.code || 'SAVE_FAILED');
      setReference(resData.refNumber);
    } catch {
      setError(
        ar
          ? 'تعذر حفظ الطلب. يرجى مراجعة الاختيارات وبيانات التواصل والمحاولة مجدداً.'
          : 'Could not save the request. Please review your choices and contact details, then retry.'
      );
    } finally {
      setBusy(false);
    }
  }

  if (reference) {
    return (
      <div role="status" className="border-2 border-[#18352E] bg-[#F4EBDD] p-8 sm:p-12 text-center shadow-lg">
        <CheckCircle2 size={56} className="mx-auto text-[#944129]" />
        <h2 className="mt-6 font-serif text-3xl font-medium text-[#18352E]">
          {ar ? 'تم تسجيل ملف متطلبات الرحلة بنجاح' : 'Travel Planning Enquiry Saved'}
        </h2>
        <div className="mt-6 inline-block bg-[#18352E] text-[#E0AB6A] px-6 py-3 font-mono text-xl font-bold tracking-widest break-all">
          {reference}
        </div>
        <p className="mt-6 leading-8 text-sm text-[#3D5249] max-w-lg mx-auto">
          {ar
            ? 'تنبيه: هذا الرقم مرجعي للتنسيق والتخطيط فقط، ولا يمثل حجزاً مؤكداً أو تذكرة طيران أو تأشيرة دخول.'
            : 'Notice: This reference is for itinerary calibration only; does not confirm a booking, flight, hotel or visa.'}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="inline-flex items-center gap-2 bg-[#18352E] px-6 py-3.5 text-white text-sm font-bold hover:bg-[#944129] transition-colors"
            href={ar ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'}
          >
            <span>{ar ? 'اطلب تصميم موقع لشركتك السياحية' : 'Commission a Travel Website with Mavvix'}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-[#B8AD97] bg-[#F4EBDD] shadow-sm">
      <div className="bg-[#18352E] p-7 sm:p-9 text-white">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E0AB6A] uppercase tracking-wider mb-2">
          <Compass size={16} />
          <span>{ar ? 'ملف تخطيط الرحلة المبدئي' : 'Planning Enquiry Brief'}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-medium">
          {ar ? 'تفضيلات ومحددات الرحلة' : 'Travel Preferences & Scope'}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#E2E7DF]">
          {ar
            ? 'نموذج استفسار إداري لدراسة رغبات السفر، وليس نظام حجز تذاكر تجاري.'
            : 'Administrative planning inquiry to calibrate itinerary preferences; not a live booking engine.'}
        </p>
      </div>

      <div className="p-6 sm:p-9 space-y-6">
        {/* Journey Dropdown */}
        <label htmlFor="nomad-form-journey" className={lab}>
          <span>{ar ? 'مسار الرحلة المطلوب' : 'Selected Journey Route'}</span>
          <select
            id="nomad-form-journey"
            aria-label={ar ? 'مسار الرحلة' : 'Journey Route'}
            className={field}
            value={serviceSlug}
            onChange={(e) => choose(e.target.value)}
          >
            {NOMAD_ROUTES.services.map((j) => (
              <option key={j.slug} value={j.slug}>
                {j.title[locale]} ({j.category.toUpperCase()})
              </option>
            ))}
          </select>
        </label>

        {/* Checkpoints summary for selected journey */}
        <div className="bg-[#FFF9F0] border border-[#DDD0BD] p-4">
          <p className="font-bold text-xs uppercase tracking-wider text-[#944129]">
            {ar ? 'محاور التجربة الأساسية لهذا المسار' : 'Core Focus Checkpoints for Selected Route'}
          </p>
          <div className="mt-3 space-y-1.5">
            {journey.checkpoints[locale].map((x) => (
              <p key={x} className="text-xs leading-6 text-[#3D5249] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#944129] shrink-0" />
                <span>{x}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Country */}
          <label htmlFor="nomad-form-country" className={lab}>
            <span>{ar ? 'الدولة / الوجهة' : 'Country / Region'}</span>
            <select
              id="nomad-form-country"
              aria-label={ar ? 'الدولة' : 'Country'}
              className={field}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {[
                ['egypt', 'مصر', 'Egypt'],
                ['saudi-arabia', 'المملكة العربية السعودية', 'Saudi Arabia'],
                ['flexible', 'مرنة / متعدد الدول', 'Flexible / Multi-Country']
              ]
                .filter(
                  ([v]) =>
                    journey.days === null ||
                    v === countryOf(journey.slug) ||
                    v === 'flexible'
                )
                .map(([v, a, en]) => (
                  <option key={v} value={v}>
                    {ar ? a : en}
                  </option>
                ))}
            </select>
          </label>

          {/* Group Size */}
          <label htmlFor="nomad-form-group-size" className={lab}>
            <span>{ar ? 'عدد المسافرين' : 'Travelers Count'}</span>
            <input
              id="nomad-form-group-size"
              aria-label={ar ? 'عدد المسافرين' : 'Travelers Count'}
              className={field}
              type="number"
              min={1}
              max={30}
              required
              value={groupSize}
              onChange={(e) => setGroup(Number(e.target.value))}
            />
          </label>

          {/* Duration */}
          <label htmlFor="nomad-form-duration" className={lab}>
            <span>{ar ? 'المدة بالأيام' : 'Duration in Days'}</span>
            <input
              id="nomad-form-duration"
              aria-label={ar ? 'المدة بالأيام' : 'Duration in Days'}
              className={field}
              type="number"
              min={1}
              max={30}
              required
              readOnly={journey.days !== null}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </label>

          {/* Preferred Date */}
          <label htmlFor="nomad-form-date" className={lab}>
            <span>{ar ? 'التاريخ المفضل للسفر (اختياري)' : 'Preferred Travel Date (Optional)'}</span>
            <input
              id="nomad-form-date"
              aria-label={ar ? 'تاريخ السفر' : 'Travel Date'}
              className={field}
              type="date"
              value={departureDate}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          {/* Pace */}
          <label htmlFor="nomad-form-pace" className={lab}>
            <span>{ar ? 'وتيرة الرحلة' : 'Travel Pace'}</span>
            <select
              id="nomad-form-pace"
              aria-label={ar ? 'وتيرة الرحلة' : 'Travel Pace'}
              className={field}
              value={pace}
              onChange={(e) => setPace(e.target.value as any)}
            >
              {[
                ['slow', 'هادئة (Slow Travel)', 'Slow'],
                ['balanced', 'متوازنة (Balanced)', 'Balanced'],
                ['active', 'نشطة (Active)', 'Active'],
                ['custom', 'مخصصة (Custom)', 'Custom']
              ].map(([v, a, en]) => (
                <option key={v} value={v}>
                  {ar ? a : en}
                </option>
              ))}
            </select>
          </label>

          {/* Budget */}
          <label htmlFor="nomad-form-budget" className={lab}>
            <span>{ar ? 'نطاق الميزانية المفضل' : 'Budget Scope Tier'}</span>
            <select
              id="nomad-form-budget"
              aria-label={ar ? 'نطاق الميزانية' : 'Budget Tier'}
              className={field}
              value={budgetBand}
              onChange={(e) => setBudget(e.target.value as any)}
            >
              {[
                ['economy', 'اقتصادي (فنادق 3 نجوم مريحة)', 'Economy'],
                ['comfort', 'مريح (فنادق 4 نجوم وبوتيك)', 'Comfort'],
                ['premium', 'متميز (فنادق 5 نجوم ومنتجعات)', 'Premium'],
                ['flexible', 'مرن / غير محدد', 'Flexible']
              ].map(([v, a, en]) => (
                <option key={v} value={v}>
                  {ar ? a : en}
                </option>
              ))}
            </select>
          </label>

          {/* Contact Name */}
          <label htmlFor="nomad-form-name" className={lab}>
            <span>{ar ? 'الاسم للتواصل والتنسيق' : 'Contact Full Name'}</span>
            <input
              id="nomad-form-name"
              aria-label={ar ? 'الاسم للتواصل' : 'Contact Name'}
              className={field}
              required
              minLength={2}
              maxLength={110}
              autoComplete="name"
              placeholder={ar ? 'الاسم الكامل' : 'Jane Doe'}
              value={guestName}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          {/* Contact Phone */}
          <label htmlFor="nomad-form-phone" className={lab}>
            <span>{ar ? 'رقم الهاتف المباشر (مع الكود الدولي)' : 'Contact Phone Number (with Country Code)'}</span>
            <input
              id="nomad-form-phone"
              aria-label={ar ? 'رقم الهاتف' : 'Contact Phone'}
              className={field}
              type="tel"
              required
              minLength={8}
              maxLength={24}
              autoComplete="tel"
              placeholder="+20 100 123 4567 / +966 50 123 4567"
              value={guestPhone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>

        {/* Privacy Advisory */}
        <div className="flex gap-3 border border-[#B8AD97] bg-[#FFF9F0] p-4 text-xs leading-6 text-[#3D5249]">
          <ShieldCheck size={20} className="shrink-0 text-[#944129] mt-0.5" />
          <span>
            {ar
              ? 'احترام تام للخصوصية: لا نطلب أي وثيقة سفر أو هوية شخصية أو بطاقة بنكية. الغرض هو تقدير معايير المسار فقط.'
              : 'Discretion protocol: Never submit passports, identity numbers or credit card details. Its sole purpose is itinerary calibration.'}
          </span>
        </div>

        {/* Consent Checkbox */}
        <label className="flex gap-3 text-xs leading-6 cursor-pointer text-[#18352E]">
          <input
            type="checkbox"
            checked={consent}
            required
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-[#18352E] w-4 h-4 shrink-0"
          />
          <span>
            {ar
              ? 'أوافق على حفظ بيانات التواصل الأساسية لغرض دراسة متطلبات الرحلة، دون أن يشكل ذلك حجزاً مؤكداً.'
              : 'I consent to storing basic contact data for travel planning calibration, acknowledging this is not a confirmed booking.'}
          </span>
        </label>

        {error && (
          <p role="alert" className="bg-red-50 p-4 text-red-900 border border-red-200 text-xs font-bold">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !consent}
          className="min-h-14 w-full bg-[#18352E] px-6 py-4 text-white text-sm font-bold disabled:opacity-50 hover:bg-[#944129] transition-colors flex items-center justify-center gap-2"
        >
          <Send size={16} />
          <span>
            {busy
              ? ar
                ? 'جارٍ الحفظ والمعالجة...'
                : 'Saving...'
              : ar
              ? 'حفظ وإرسال ملف استفسار الرحلة'
              : 'Submit Travel Planning Brief'}
          </span>
        </button>
      </div>
    </form>
  );
}
