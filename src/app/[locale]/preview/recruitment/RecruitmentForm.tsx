'use client';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { Locale } from '@/lib/i18n/config';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { TALENTYX, talentPath } from '@/lib/verticals/recruitment/data';

const choices = {
  country: [
    ['egypt', 'مصر', 'Egypt'],
    ['saudi-arabia', 'السعودية', 'Saudi Arabia'],
    ['uae', 'الإمارات', 'UAE'],
    ['other', 'أخرى', 'Other']
  ],
  sector: [
    ['technology', 'التقنية', 'Technology'],
    ['finance', 'المالية', 'Finance'],
    ['operations', 'العمليات', 'Operations'],
    ['commercial', 'التجارة', 'Commercial'],
    ['people', 'الموارد البشرية', 'People'],
    ['other', 'أخرى', 'Other']
  ],
  headcount: [
    ['1', '1', '1'],
    ['2-5', '2–5', '2–5'],
    ['6-20', '6–20', '6–20'],
    ['21-plus', '21 أو أكثر', '21+'],
    ['unknown', 'غير محدد', 'Unknown']
  ],
  engagement: [
    ['permanent', 'دائم', 'Permanent'],
    ['contract', 'تعاقدي', 'Contract'],
    ['advisory', 'استشارات', 'Advisory'],
    ['unknown', 'غير محدد', 'Unknown']
  ],
  timeline: [
    ['within-month', 'خلال شهر', 'Within a month'],
    ['1-3-months', '1–3 أشهر', '1–3 months'],
    ['later', 'لاحقاً', 'Later'],
    ['unknown', 'غير محدد', 'Unknown']
  ],
  workPreference: [
    ['onsite', 'في الموقع', 'On-site'],
    ['hybrid', 'هجين', 'Hybrid'],
    ['remote', 'عن بعد', 'Remote'],
    ['flexible', 'مرن', 'Flexible']
  ],
  experienceBand: [
    ['entry', 'مبتدئ', 'Entry'],
    ['mid', 'متوسط', 'Mid'],
    ['senior', 'متقدم', 'Senior'],
    ['flexible', 'مرن', 'Flexible']
  ]
};

export function RecruitmentForm({
  locale,
  mode,
  initialService,
  initialRole
}: {
  locale: Locale;
  mode: 'employer' | 'candidate';
  initialService: string;
  initialRole: string;
}) {
  const ar = locale === 'ar';
  const employer = mode === 'employer';
  const [serviceSlug, setService] = useState(initialService);
  const [roleSlug, setRole] = useState(initialRole);
  const [sector, setSector] = useState('technology');
  const [country, setCountry] = useState('egypt');
  const [organization, setOrg] = useState('');
  const [headcount, setHead] = useState('unknown');
  const [engagement, setEngage] = useState('unknown');
  const [timeline, setTimeline] = useState('unknown');
  const [workPreference, setWork] = useState('flexible');
  const [experienceBand, setExperience] = useState('flexible');
  const [guestName, setName] = useState('');
  const [guestPhone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const request = useRef<string | null>(null);
  const inFlight = useRef(false);

  const field =
    'mt-2 block min-h-12 w-full bg-white border border-[#A7B3C9] rounded-lg px-3 py-3 text-sm text-[#17243E] focus-visible:outline-2 focus-visible:outline-[#3549A5]';

  const choose = (label: string, value: string, set: (s: string) => void, opts: string[][]) => (
    <label className="block text-sm font-bold">
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

  const role = TALENTYX.roles.find((r) => r.slug === roleSlug);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || reference || !consent || (!employer && !role)) return;
    inFlight.current = true;
    setBusy(true);
    setError('');

    try {
      if (!request.current) request.current = crypto.randomUUID();
      const common = {
        clientRequestId: request.current,
        guestName,
        guestPhone,
        country,
        consent,
        honeypot: ''
      };

      const payload = employer
        ? {
            ...common,
            flowType: 'employer_hiring_brief',
            serviceSlug,
            organization,
            sector,
            headcount,
            engagement,
            timeline
          }
        : {
            ...common,
            flowType: 'candidate_career_interest',
            roleSlug,
            sector: role?.sector,
            workPreference,
            experienceBand
          };

      const res = await fetch('/api/portfolio/recruitment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify(payload)
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
      <div role="status" className="bg-[#E8EEFF] rounded-xl p-9 text-center">
        <CheckCircle2 size={48} className="mx-auto text-[#3549A5]" />
        <h2 className="mt-6 text-3xl font-black">{ar ? 'تم حفظ الطلب للمراجعة' : 'Enquiry saved for review'}</h2>
        <p className="mt-5 break-all font-mono text-xl font-bold">{reference}</p>
        <p className="mt-6 text-sm leading-8">
          {ar
            ? 'لا يمثل المرجع وظيفة أو مقابلة أو تعييناً أو اتفاقاً.'
            : 'This reference confirms no vacancy, interview, placement or agreement.'}
        </p>
        <Link
          href={talentPath(locale, employer ? 'services' : 'roles')}
          className="mt-7 inline-flex bg-[#3549A5] text-white px-6 py-4 rounded-lg font-bold text-sm"
        >
          {ar ? 'استكشف المزيد' : 'Explore more'}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl overflow-hidden bg-white border border-[#D8DFED]">
      <div className="bg-[#17243E] text-white p-7">
        <h2 className="text-3xl font-black">
          {employer ? (ar ? 'نطاق التوظيف' : 'Hiring scope') : ar ? 'التفضيلات المهنية' : 'Career preferences'}
        </h2>
        <p className="mt-3 leading-7 text-sm text-[#E8EEFF]">
          {ar ? 'تواصل توضيحي غير ملزم فقط.' : 'Nonbinding illustrative contact only.'}
        </p>
      </div>

      <fieldset disabled={busy} className="min-w-0 p-6 sm:p-9 space-y-6">
        {employer ? (
          <>
            {choose(
              ar ? 'الخدمة المطلوبة' : 'Service',
              serviceSlug,
              setService,
              TALENTYX.services.filter((s) => s.category !== 'candidate').map((s) => [s.slug, s.title.ar, s.title.en])
            )}

            <label className="block text-sm font-bold">
              {ar ? 'اسم المنشأة' : 'Organization'}
              <input
                className={field}
                required
                minLength={2}
                maxLength={100}
                autoComplete="organization"
                value={organization}
                onChange={(e) => setOrg(e.target.value)}
                aria-label={ar ? 'اسم المنشأة' : 'Organization'}
              />
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              {choose(ar ? 'القطاع' : 'Sector', sector, setSector, choices.sector)}
              {choose(ar ? 'الدولة' : 'Country', country, setCountry, choices.country)}
              {choose(ar ? 'عدد الأدوار التقريبي' : 'Hiring volume', headcount, setHead, choices.headcount)}
              {choose(ar ? 'نموذج العمل' : 'Engagement', engagement, setEngage, choices.engagement)}
              {choose(ar ? 'الجدول المفضل' : 'Preferred timeline', timeline, setTimeline, choices.timeline)}
            </div>
          </>
        ) : (
          <>
            {choose(
              ar ? 'الدور التوضيحي (ليس وظيفة شاغرة)' : 'Illustrative role (not a vacancy)',
              roleSlug,
              setRole,
              TALENTYX.roles.map((r) => [r.slug, r.title.ar, r.title.en])
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              {choose(ar ? 'الدولة' : 'Country', country, setCountry, choices.country)}
              {choose(ar ? 'بيئة العمل' : 'Work preference', workPreference, setWork, choices.workPreference)}
              {choose(ar ? 'نطاق الخبرة' : 'Experience band', experienceBand, setExperience, choices.experienceBand)}
            </div>
          </>
        )}

        <label className="block text-sm font-bold">
          {ar ? 'الاسم للتواصل' : 'Contact name'}
          <input
            className={field}
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            value={guestName}
            onChange={(e) => setName(e.target.value)}
            aria-label={ar ? 'الاسم للتواصل' : 'Contact name'}
          />
        </label>

        <label className="block text-sm font-bold">
          {ar ? 'رقم الهاتف' : 'Phone'}
          <input
            className={field}
            type="tel"
            required
            minLength={8}
            maxLength={24}
            autoComplete="tel"
            value={guestPhone}
            onChange={(e) => setPhone(e.target.value)}
            aria-label={ar ? 'رقم الهاتف' : 'Phone'}
          />
        </label>

        <label className="flex gap-3 text-sm leading-7">
          <input
            type="checkbox"
            checked={consent}
            required
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-[#3549A5]"
            aria-label={
              ar
                ? 'أوافق على حفظ بيانات الاتصال والتفضيلات للمراجعة فقط.'
                : 'I consent to saving contact details and preferences for review only.'
            }
          />
          <span>
            {ar ? 'أوافق على حفظ بيانات الاتصال والتفضيلات للمراجعة فقط.' : 'I consent to saving contact details and preferences for review only.'}{' '}
            <Link href={talentPath(locale, 'privacy')} className="underline">
              {ar ? 'الخصوصية' : 'Privacy'}
            </Link>
          </span>
        </label>

        {error && (
          <p role="alert" className="bg-red-50 text-red-800 p-4 text-sm rounded-lg">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !consent}
          className="w-full min-h-14 bg-[#3549A5] hover:bg-[#2A3A85] text-white rounded-lg px-6 py-4 text-sm font-bold disabled:opacity-70 transition-colors"
        >
          {busy ? (ar ? 'جارٍ الحفظ' : 'Saving') : ar ? 'حفظ الطلب' : 'Save enquiry'}
        </button>
      </fieldset>
    </form>
  );
}
