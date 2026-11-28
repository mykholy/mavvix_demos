'use client';

import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { Locale } from '@/lib/i18n/config';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { VOLTEDGE, voltPath } from '@/lib/verticals/solar-energy/data';

const expected: Record<string, string> = {
  'residential-solar': 'home',
  'commercial-rooftop': 'commercial',
  'industrial-solar': 'factory',
  'agricultural-solar': 'farm'
};

const groups = {
  siteType: [
    ['home', 'منزل', 'Home'],
    ['commercial', 'منشأة تجارية', 'Commercial'],
    ['factory', 'مصنع', 'Factory'],
    ['farm', 'مزرعة', 'Farm'],
    ['other', 'أخرى', 'Other']
  ],
  consumptionBand: [
    ['under-500', 'أقل من 500', 'Under 500'],
    ['500-1999', '500–1999', '500–1999'],
    ['2000-9999', '2000–9999', '2000–9999'],
    ['10000-plus', '10000 أو أكثر', '10000+'],
    ['unknown', 'غير معروف', 'Unknown']
  ],
  gridType: [
    ['connected', 'متصلة', 'Connected'],
    ['unreliable', 'غير مستقرة', 'Unreliable'],
    ['offgrid', 'خارج الشبكة', 'Off-grid'],
    ['unknown', 'غير معروف', 'Unknown']
  ],
  spaceType: [
    ['roof', 'سطح', 'Roof'],
    ['land', 'أرض', 'Land'],
    ['both', 'كلاهما', 'Both'],
    ['unknown', 'غير معروف', 'Unknown']
  ],
  country: [
    ['egypt', 'مصر', 'Egypt'],
    ['saudi-arabia', 'السعودية', 'Saudi Arabia'],
    ['uae', 'الإمارات', 'UAE'],
    ['other', 'أخرى', 'Other']
  ]
};

export function AssessmentForm({
  locale,
  initialSolution
}: {
  locale: Locale;
  initialSolution: string;
}) {
  const ar = locale === 'ar';
  const [serviceSlug, setSolution] = useState(initialSolution);
  const [siteType, setSite] = useState(expected[initialSolution] || 'commercial');
  const [consumptionBand, setConsumption] = useState('unknown');
  const [gridType, setGrid] = useState('unknown');
  const [spaceType, setSpace] = useState('unknown');
  const [country, setCountry] = useState('egypt');
  const [guestName, setName] = useState('');
  const [guestPhone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const request = useRef<string | null>(null);
  const inFlight = useRef(false);

  const compatible = !expected[serviceSlug] || expected[serviceSlug] === siteType || siteType === 'other';
  const field =
    'mt-2 block min-h-12 w-full bg-white border border-[#9EAE9C] px-3 py-3 text-sm text-[#182720] focus-visible:outline-2 focus-visible:outline-[#12352D]';

  const choose = (label: string, value: string, set: (s: string) => void, opts: string[][]) => (
    <label className="block text-sm font-bold text-[#182720]">
      {label}
      <select
        className={field}
        value={value}
        onChange={(e) => set(e.target.value)}
        aria-label={label}
      >
        {opts.map(([v, a, e]) => (
          <option key={v} value={v}>
            {ar ? a : e}
          </option>
        ))}
      </select>
    </label>
  );

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || reference || !consent || !compatible) return;
    inFlight.current = true;
    setBusy(true);
    setError('');
    try {
      if (!request.current) request.current = crypto.randomUUID();
      const res = await fetch('/api/portfolio/solar-energy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({
          flowType: 'solar_assessment_request',
          clientRequestId: request.current,
          serviceSlug,
          siteType,
          consumptionBand,
          gridType,
          spaceType,
          country,
          guestName,
          guestPhone,
          consent,
          honeypot: ''
        })
      });
      const d = await res.json();
      if (!res.ok || !d.success) throw Error(d.code || 'SAVE_FAILED');
      setReference(d.refNumber);
    } catch {
      setError(
        ar
          ? 'تعذر حفظ الطلب. راجع البيانات وحاول مرة أخرى.'
          : 'Could not save the enquiry. Review details and retry.'
      );
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

  if (reference) {
    return (
      <div role="status" className="bg-[#E0E9DB] border border-[#D2DBCC] p-9 text-center">
        <CheckCircle2 className="mx-auto text-[#12352D]" size={48} />
        <h2 className="mt-6 text-3xl font-black text-[#12352D]">
          {ar ? 'تم حفظ طلب الدراسة' : 'Assessment request saved'}
        </h2>
        <p className="mt-5 break-all font-mono text-xl font-bold text-[#12352D]">{reference}</p>
        <p className="mt-6 text-sm leading-8 text-[#264D43]">
          {ar
            ? 'المرجع لا يؤكد سعراً أو معاينة أو تصميماً هندسياً.'
            : 'The reference confirms no quote, survey or engineered system.'}
        </p>
        <Link
          href={voltPath(locale, 'solutions')}
          className="mt-7 inline-flex bg-[#12352D] text-white px-6 py-4 font-bold text-sm"
        >
          {ar ? 'استكشف الحلول' : 'Explore solutions'}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white border border-[#D2DBCC]">
      <div className="bg-[#12352D] text-white p-7">
        <h2 className="text-3xl font-black">
          {ar ? 'بيانات المشروع الأولية' : 'Initial project details'}
        </h2>
        <p className="mt-3 text-sm text-[#E0E9DB] leading-7">
          {ar ? 'طلب دراسة فقط، دون ضمان أو سعر.' : 'Preliminary review only, no guarantee or quote.'}
        </p>
      </div>
      <fieldset disabled={busy} className="min-w-0 p-6 sm:p-9 space-y-6">
        {choose(
          ar ? 'الحل المطلوب' : 'Solution preference',
          serviceSlug,
          setSolution,
          VOLTEDGE.services.map((s) => [s.slug, s.title.ar, s.title.en])
        )}
        <div className="grid sm:grid-cols-2 gap-4">
          {choose(ar ? 'نوع الموقع' : 'Site type', siteType, setSite, groups.siteType)}
          {choose(ar ? 'الدولة' : 'Country', country, setCountry, groups.country)}
          {choose(
            ar ? 'الاستهلاك الشهري (كيلوواط ساعة)' : 'Monthly usage (kWh)',
            consumptionBand,
            setConsumption,
            groups.consumptionBand
          )}
          {choose(ar ? 'حالة الشبكة' : 'Grid conditions', gridType, setGrid, groups.gridType)}
          {choose(ar ? 'المساحة المتاحة' : 'Available space', spaceType, setSpace, groups.spaceType)}
        </div>
        {!compatible && (
          <p role="alert" className="bg-red-50 text-red-800 p-4 text-sm font-bold border border-red-200">
            {ar ? 'اختر حلاً يناسب نوع الموقع.' : 'Choose a solution matching your site type.'}
          </p>
        )}
        <label className="block text-sm font-bold text-[#182720]">
          {ar ? 'الاسم للتواصل' : 'Contact name'}
          <input
            className={field}
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            aria-label={ar ? 'الاسم للتواصل' : 'Contact name'}
            value={guestName}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block text-sm font-bold text-[#182720]">
          {ar ? 'رقم الهاتف' : 'Phone'}
          <input
            className={field}
            type="tel"
            required
            minLength={8}
            maxLength={24}
            autoComplete="tel"
            aria-label={ar ? 'رقم الهاتف' : 'Phone'}
            value={guestPhone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="flex gap-3 text-sm leading-7 text-[#182720]">
          <input
            type="checkbox"
            checked={consent}
            required
            aria-label={
              ar
                ? 'الموافقة على حفظ البيانات دون التزام'
                : 'Consent to storing data without obligation'
            }
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-[#12352D]"
          />
          <span>
            {ar
              ? 'أوافق على حفظ بيانات الاتصال ونطاق المشروع للمراجعة، دون سعر أو التزام.'
              : 'I consent to storing contact details and scope for review, without a quote or obligation.'}{' '}
            <Link href={voltPath(locale, 'about')} className="underline font-bold text-[#12352D]">
              {ar ? 'عن التصميم' : 'About this concept'}
            </Link>
          </span>
        </label>
        {error && (
          <p role="alert" className="bg-red-50 text-red-800 p-4 text-sm font-bold border border-red-200">
            {error}
          </p>
        )}
        <button
          disabled={busy || !consent || !compatible}
          type="submit"
          className="w-full min-h-14 bg-[#12352D] text-white px-6 py-4 font-bold text-sm disabled:opacity-70 hover:bg-[#183F36] transition-colors"
        >
          {busy
            ? ar
              ? 'جارٍ الحفظ'
              : 'Saving'
            : ar
            ? 'حفظ طلب الدراسة'
            : 'Save assessment request'}
        </button>
      </fieldset>
    </form>
  );
}
