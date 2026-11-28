'use client';
import { useRef, useState } from 'react';
import { PULSE, pulseText } from '@/lib/verticals/fitness/data';
import type { Locale } from '@/lib/i18n/config';
import { ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

const EXPERIENCE = [
  ['beginner', 'مبتدئ', 'Beginner'],
  ['returning', 'راجع للتمرين', 'Returning'],
  ['intermediate', 'خبرة متوسطة', 'Intermediate']
] as const;

const GOALS = [
  ['general_fitness', 'نشاط عام', 'General activity'],
  ['strength_skill', 'تعلم القوة', 'Learn strength'],
  ['mobility', 'تحسين جودة الحركة', 'Movement practice'],
  ['group_motivation', 'تجربة جماعية', 'Group motivation'],
  ['exploring', 'استكشاف', 'Exploring']
] as const;

const REQUESTS = [
  ['trial', 'طلب تجربة حصة', 'Trial preference'],
  ['class_interest', 'استفسار كلاس', 'Class enquiry'],
  ['membership_interest', 'اهتمام بعضوية', 'Membership interest'],
  ['private_intro', 'جلسة تعريف فردية', 'Intro consultation preference']
] as const;

const SLOTS = [
  ['flexible', 'مرن', 'Flexible'],
  ['morning', 'صباحًا', 'Morning'],
  ['afternoon', 'بعد الظهر', 'Afternoon'],
  ['evening', 'مساءً', 'Evening']
] as const;

export function PulseTrialForm({
  locale,
  defaultClass = ''
}: {
  locale: Locale;
  defaultClass?: string;
}) {
  const ar = locale === 'ar';
  const first = PULSE.services.find((x) => x.slug === defaultClass) || PULSE.services[0];
  const initialLevel = (first.levels.includes('beginner')
    ? 'beginner'
    : first.levels[0]) as (typeof EXPERIENCE)[number][0];
  const [level, setLevel] = useState<(typeof EXPERIENCE)[number][0]>(initialLevel);
  const [serviceSlug, setServiceSlug] = useState(first.slug);
  const [goal, setGoal] = useState('general_fitness'),
    [requestType, setRequestType] = useState('trial'),
    [daysPerWeek, setDaysPerWeek] = useState(3);
  const [preferredDate, setPreferredDate] = useState(''),
    [preferredWindow, setPreferredWindow] = useState('flexible');
  const [region, setRegion] = useState('Cairo'),
    [guestName, setGuestName] = useState(''),
    [guestPhone, setGuestPhone] = useState(''),
    [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false),
    [ref, setRef] = useState(''),
    [error, setError] = useState('');
  const key = useRef<string | null>(null);
  const classes = PULSE.services.filter((s) => s.levels.includes(level));

  function selectLevel(next: (typeof EXPERIENCE)[number][0]) {
    setLevel(next);
    if (!PULSE.services.find((s) => s.slug === serviceSlug)?.levels.includes(next)) {
      setServiceSlug(PULSE.services.find((s) => s.levels.includes(next))!.slug);
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || ref) return;
    setBusy(true);
    setError('');
    try {
      if (!key.current) key.current = crypto.randomUUID();
      const query = new URLSearchParams(window.location.search);
      const response = await fetch('/api/portfolio/fitness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'fitness_trial_interest',
          clientRequestId: key.current,
          serviceSlug,
          level,
          goal,
          requestType,
          daysPerWeek,
          preferredDate,
          preferredWindow,
          region,
          guestName,
          guestPhone,
          consent,
          honeypot: '',
          utm: {
            source: query.get('utm_source') || '',
            medium: query.get('utm_medium') || '',
            campaign: query.get('utm_campaign') || ''
          }
        })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw Error(data.code || 'REQUEST_FAILED');
      setRef(String(data.refNumber));
    } catch {
      setError(
        ar
          ? 'تعذر حفظ الاستفسار. راجع مستوى الحصة والبيانات وحاول ثانية.'
          : 'Could not save this enquiry. Check the class level and your details.'
      );
    } finally {
      setBusy(false);
    }
  }

  if (ref)
    return (
      <section
        className="border-4 border-[#141421] bg-[#E0FE61] text-[#141421] px-6 py-12 sm:p-14 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 size={53} className="mx-auto" />
        <h2 className="pulse-display text-3xl sm:text-5xl mt-7">
          {ar ? 'طلبك اتحفظ' : 'REQUEST RECORDED.'}
        </h2>
        <p className="mt-5 text-sm leading-8 max-w-lg mx-auto">
          {ar
            ? 'ده رقم مرجعي داخل تجربة موقع مافكس. مفيش حصة مؤكدة أو عضوية نشطة أو مدرب تم تعيينه.'
            : 'This is a Mavvix portfolio request reference. No coach, trial class, membership, access card or payment was actually confirmed.'}
        </p>
        <p className="mt-8 bg-[#141421] text-[#E0FE61] p-5 font-mono text-xl font-bold">{ref}</p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={ar ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'}
          className="inline-flex items-center gap-3 bg-[#141421] text-white px-7 py-4 mt-8 text-sm font-black hover:bg-black"
        >
          {ar ? 'اعمل موقع زي ده لجيمك' : 'Build a site for your gym'}
          <ArrowUpRight size={18} />
        </a>
      </section>
    );

  const labelClass = 'block font-black text-sm text-[#141421]';
  const inputClass =
    'mt-2 w-full rounded-none border-2 border-[#A7A6B7] bg-white px-4 py-3.5 text-sm text-[#141421] focus-visible:outline-2 focus-visible:outline-[#4F2BAE]';

  return (
    <form onSubmit={submit} className="border-2 border-[#141421] bg-white overflow-hidden">
      <div className="bg-[#141421] text-white px-6 py-8 sm:px-10">
        <p className="uppercase text-xs font-black tracking-[.2em] text-[#E0FE61]">
          PULSE / JOIN THE MOVEMENT
        </p>
        <h2 className="pulse-display text-3xl sm:text-5xl mt-4">
          {ar ? 'اختار الحصة اللي تناسبك' : 'FIND YOUR TRAINING START.'}
        </h2>
        <p className="mt-4 text-sm leading-8 text-[#E4E3EF]">
          {ar
            ? 'المعلومات هنا تساعد في تجهيز استفسار فقط. لا نجمع تاريخ صحي أو نتائج أو مقاييس جسم.'
            : 'A structured enquiry only. No health details, weight, measurements or medical screening are collected.'}
        </p>
      </div>
      <div className="p-6 sm:p-10 space-y-8">
        <fieldset>
          <legend className={labelClass}>
            {ar ? '01 / مستوى خبرتك' : '01 / Your experience level'}
          </legend>
          <div className="grid sm:grid-cols-3 gap-2 mt-4">
            {EXPERIENCE.map(([v, arText, en]) => (
              <button
                key={v}
                type="button"
                aria-pressed={level === v}
                onClick={() => selectLevel(v)}
                className={
                  'min-h-14 text-sm font-bold border-2 px-4 text-center ' +
                  (level === v
                    ? 'bg-[#141421] text-[#E0FE61] border-[#141421]'
                    : 'border-[#CBCAD2] text-[#141421] hover:bg-[#F1EFFC]')
                }
              >
                {ar ? arText : en}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="pulse-program-select" className={labelClass}>
            {ar ? '02 / نوع الحصة' : '02 / Program you want to explore'}
          </label>
          <select
            id="pulse-program-select"
            aria-label={ar ? 'نوع الحصة أو البرنامج' : 'Program you want to explore'}
            required
            className={inputClass}
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
          >
            {classes.map((s) => (
              <option key={s.slug} value={s.slug}>
                {pulseText(s.title, locale)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pulse-goal-select" className={labelClass}>
              {ar ? '03 / هدف عام (مش تقييم طبي)' : '03 / General motivation'}
            </label>
            <select
              id="pulse-goal-select"
              aria-label={ar ? 'الهدف العام من التدريب' : 'General motivation'}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className={inputClass}
            >
              {GOALS.map(([v, arText, en]) => (
                <option value={v} key={v}>
                  {ar ? arText : en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pulse-request-type-select" className={labelClass}>
              {ar ? '04 / طبيعة الاستفسار' : '04 / Enquiry preference'}
            </label>
            <select
              id="pulse-request-type-select"
              aria-label={ar ? 'طبيعة الاستفسار' : 'Enquiry preference'}
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className={inputClass}
            >
              {REQUESTS.map(([v, arText, en]) => (
                <option value={v} key={v}>
                  {ar ? arText : en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pulse-days-select" className={labelClass}>
              {ar ? '05 / كم يوم تقدر تخصص في الأسبوع؟' : '05 / Your available days per week'}
            </label>
            <select
              id="pulse-days-select"
              aria-label={ar ? 'الأيام المتاحة أسبوعياً' : 'Available days per week'}
              className={inputClass}
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((x) => (
                <option value={x} key={x}>
                  {x} {ar ? 'يوم' : 'day(s)'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pulse-date-input" className={labelClass}>
              {ar ? '06 / اليوم المفضل (اختياري)' : '06 / Preferred date (optional)'}
            </label>
            <input
              id="pulse-date-input"
              aria-label={ar ? 'اليوم المفضل للحصة التجريبية' : 'Preferred trial date'}
              type="date"
              className={inputClass}
              min={new Date().toISOString().slice(0, 10)}
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="pulse-window-select" className={labelClass}>
              {ar ? '07 / الفترة المناسبة' : '07 / Preferred window'}
            </label>
            <select
              id="pulse-window-select"
              aria-label={ar ? 'الفترة المناسبة' : 'Preferred time window'}
              className={inputClass}
              value={preferredWindow}
              onChange={(e) => setPreferredWindow(e.target.value)}
            >
              {SLOTS.map(([v, arText, en]) => (
                <option value={v} key={v}>
                  {ar ? arText : en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pulse-region-select" className={labelClass}>
              {ar ? '08 / المنطقة العامة' : '08 / General region'}
            </label>
            <select
              id="pulse-region-select"
              aria-label={ar ? 'المنطقة العامة' : 'General region'}
              className={inputClass}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              {PULSE.regions.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pulse-name-input" className={labelClass}>
              {ar ? 'الاسم' : 'Contact name'}
            </label>
            <input
              id="pulse-name-input"
              aria-label={ar ? 'الاسم للتواصل' : 'Contact name'}
              required
              minLength={2}
              maxLength={110}
              autoComplete="name"
              className={inputClass}
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="pulse-phone-input" className={labelClass}>
              {ar ? 'الموبايل' : 'Mobile phone'}
            </label>
            <input
              id="pulse-phone-input"
              aria-label={ar ? 'رقم الموبايل للتواصل' : 'Mobile phone'}
              required
              type="tel"
              pattern="[+0-9 ()-]{8,24}"
              autoComplete="tel"
              className={inputClass}
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="p-5 border-s-4 border-[#5939B3] bg-[#F1EFFD] flex items-start gap-3">
          <AlertCircle className="shrink-0 mt-1 text-[#5939B3]" size={20} />
          <p className="text-sm leading-8 text-[#141421]">
            {ar
              ? 'الجدول توضيحي ولا يعرض وقتًا متاحًا فعليًا. اختيار عضوية هنا لا يصدر بطاقة دخول ولا يستقبل دفع.'
              : 'All timetable slots are examples. Selecting membership interest does not activate access or collect money.'}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="pulse-consent-check"
            type="checkbox"
            className="mt-2 accent-[#141421]"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <label htmlFor="pulse-consent-check" className="text-sm leading-8 text-[#141421] cursor-pointer">
            {ar
              ? 'أوافق على حفظ بيانات التواصل لهذا النموذج التوضيحي فقط، ولن أرسل أي تفاصيل طبية أو خاصة.'
              : 'I consent to saving these contact details for this illustrative enquiry. I will not submit medical or private health information.'}
          </label>
        </div>

        {error && (
          <p role="alert" className="bg-red-50 text-red-700 p-4 text-sm font-bold">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !consent}
          className="bg-[#141421] text-[#E0FE61] hover:bg-black px-8 min-h-14 w-full text-sm font-black disabled:opacity-50 transition-colors shadow-md"
        >
          {busy
            ? ar
              ? 'جاري حفظ الطلب'
              : 'Saving request...'
            : ar
            ? 'احفظ طلب تجربة الحصة'
            : 'SAVE TRAINING INTEREST'}
        </button>
      </div>
    </form>
  );
}
