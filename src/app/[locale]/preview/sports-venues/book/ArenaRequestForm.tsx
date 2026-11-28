'use client';

import React, { useMemo, useRef, useState } from 'react';
import { ARENA, arenaText } from '@/lib/verticals/sports-venues/data';
import type { Locale } from '@/lib/i18n/config';
import { Trophy, CalendarDays, CheckCircle2, AlertTriangle, Clock3, Users } from 'lucide-react';

const sessionLabels = [
  ['casual', 'مباراة عادية', 'Casual game'],
  ['training', 'تدريب', 'Practice'],
  ['friendly', 'مباراة ودية', 'Friendly match'],
  ['league_interest', 'استفسار عن دوري', 'League interest only']
] as const;

export function ArenaRequestForm({
  locale,
  initialCourt = ''
}: {
  locale: Locale;
  initialCourt?: string;
}) {
  const ar = locale === 'ar';
  const chosen = ARENA.services.find((s) => s.slug === initialCourt) || ARENA.services[0];
  const [serviceSlug, setServiceSlug] = useState(chosen.slug);
  const court = useMemo(
    () => ARENA.services.find((s) => s.slug === serviceSlug) || ARENA.services[0],
    [serviceSlug]
  );
  const [duration, setDuration] = useState<number>(chosen.durations[0]);
  const [date, setDate] = useState('');
  const [start, setStart] = useState('18:30');
  const [region, setRegion] = useState('Cairo');
  const [sessionType, setSessionType] = useState('casual');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState('');
  const key = useRef<string | null>(null);

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const maxDate = useMemo(
    () => new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10),
    []
  );

  const field = 'block text-xs font-black uppercase tracking-wider text-[#12382D]';
  const input =
    'mt-2 w-full min-h-12 border-2 border-[#BECFC4] focus:border-[#10B981] bg-[#FFFDF7] rounded-xl px-4 py-3 text-[#122D26] text-sm focus-visible:outline-[#10B981]';

  function choose(slug: string) {
    const next = ARENA.services.find((s) => s.slug === slug);
    if (!next) return;
    setServiceSlug(next.slug);
    setDuration(next.durations[0]);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || receipt) return;
    setBusy(true);
    setError('');
    try {
      if (!key.current) key.current = crypto.randomUUID();
      const query = new URLSearchParams(window.location.search);
      const body = {
        flowType: 'sports_venue_request',
        clientRequestId: key.current,
        serviceSlug,
        courtSlug: undefined,
        sport: court.sport,
        players: court.players,
        durationMinutes: duration,
        preferredDate: date,
        preferredStart: start,
        region,
        sessionType,
        guestName: name,
        guestPhone: phone,
        consent,
        honeypot: '',
        utm: {
          source: query.get('utm_source') || '',
          medium: query.get('utm_medium') || '',
          campaign: query.get('utm_campaign') || ''
        }
      };
      const response = await fetch('/api/portfolio/sports-venues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw Error(result.code || 'REQUEST_NOT_SAVED');
      setReceipt(String(result.refNumber));
    } catch {
      setError(
        ar
          ? 'لم يتم حفظ الطلب. راجع اختيار الوقت والمدة والبيانات وحاول تاني.'
          : 'We could not save the request. Check court format, time, duration and contact details.'
      );
    } finally {
      setBusy(false);
    }
  }

  if (receipt)
    return (
      <section
        role="status"
        aria-live="polite"
        className="bg-[#102B26] text-white border-4 border-[#10B981] rounded-3xl p-7 sm:p-12 shadow-2xl"
      >
        <CheckCircle2 size={55} className="text-[#10B981]" />
        <h2 className="arena-display text-3xl sm:text-5xl font-black mt-7 text-white">
          {ar ? 'تم تسجيل الاستفسار بنجاح' : 'PREFERENCE RECORDED'}
        </h2>
        <p className="text-sm leading-8 mt-5 text-[#DFECE1] max-w-xl">
          {ar
            ? 'تم حفظ تفضيل موعد المباراة في تجربة الموقع التوضيحية بنجاح. لا يوجد ملعب فعلي أكد الحجز أو استلم مقابل مالي.'
            : 'This is an illustrative fixture request. No operating court has confirmed live calendar availability, payment, or facility rental.'}
        </p>
        <div className="mt-8 bg-[#0C1E1B] border border-[#275B40] text-white p-5 rounded-xl font-mono text-xl font-black inline-block">
          <p className="text-xs text-[#10B981] uppercase font-mono tracking-wider mb-1">
            {ar ? 'الرقم المرجعي المحفوظ' : 'BOOKING REFERENCE'}
          </p>
          <span>{receipt}</span>
        </div>
        <div className="mt-8">
          <a
            href={ar ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#10B981] text-black px-8 py-4 font-black text-sm rounded-xl hover:bg-[#22C55E] transition-colors focus-visible:outline-2 focus-visible:outline-white"
          >
            <span>{ar ? 'اطلب تنفيذ موقع لمجمعك الرياضي' : 'Build Your Venue Website'}</span>
          </a>
        </div>
      </section>
    );

  return (
    <form
      onSubmit={submit}
      className="bg-white border-2 border-[#C6D5CA] rounded-3xl shadow-[0_24px_70px_rgba(9,38,31,.1)] overflow-hidden"
    >
      <div className="bg-[#102B26] text-white px-6 sm:px-10 py-8">
        <p className="text-[#10B981] font-bold text-xs tracking-[.2em] uppercase">
          ARENA / GAME REQUEST
        </p>
        <h2 className="arena-display text-3xl sm:text-4xl font-black mt-3">
          {ar ? 'كوّن تفضيل مباراتك في خطوات منظمة' : 'BUILD YOUR GAME BRIEF'}
        </h2>
        <p className="text-[#DFECE1] leading-7 text-sm mt-3">
          {ar
            ? 'اختر الصيغة والموعد المفضل وبيانات التواصل لحفظ استفسار تجريبي بدون أي التزام مالي.'
            : 'Select a sport format, session timing, and contact details to record a non-binding fixture enquiry.'}
        </p>
      </div>

      <div className="p-6 sm:p-10 space-y-8">
        <fieldset>
          <legend className={field}>
            {ar ? '01 / نوع الرياضة وصيغة الملعب' : '01 / Sport & Court Format'}
          </legend>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            {ARENA.services.map((s) => (
              <button
                key={s.slug}
                type="button"
                aria-pressed={serviceSlug === s.slug}
                onClick={() => choose(s.slug)}
                className={`border-2 text-start p-4 min-h-[110px] rounded-2xl transition-all ${
                  serviceSlug === s.slug
                    ? 'bg-[#102B26] border-[#10B981] text-white shadow-md'
                    : 'bg-[#F5F8F4] border-[#CEDAD0] text-[#173F32] hover:border-[#10B981]/60'
                }`}
              >
                <span
                  className={`block font-black text-sm leading-6 ${
                    serviceSlug === s.slug ? 'text-white' : 'text-[#102B26]'
                  }`}
                >
                  {arenaText(s.title, locale)}
                </span>
                <span
                  className={`mt-2 text-xs font-mono font-bold block ${
                    serviceSlug === s.slug ? 'text-[#10B981]' : 'text-[#3E624E]'
                  }`}
                >
                  {s.sport === 'padel' ? 'PADEL' : 'FOOTBALL'} · {s.players}{' '}
                  {ar ? 'لاعب' : 'players'}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={field}>
              {ar ? '02 / سعة الفريق' : '02 / Group Size'}
            </label>
            <div className="mt-2 min-h-12 bg-[#E6EFE5] border border-[#B7D0C1] rounded-xl px-5 py-3 text-sm font-black flex items-center gap-3 text-[#102B26]">
              <Users size={18} className="text-[#10B981]" />
              <span>
                {court.players} {ar ? 'لاعب حسب صيغة اللعب' : 'players for this format'}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="arena-field-duration" className={field}>
              {ar ? '03 / المدة المطلوبة' : '03 / Requested Duration'}
            </label>
            <select
              id="arena-field-duration"
              aria-label={ar ? 'المدة المطلوبة' : 'Requested Duration'}
              required
              className={input}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              {court.durations.map((m) => (
                <option key={m} value={m}>
                  {m} {ar ? 'دقيقة' : 'min'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="arena-field-date" className={field}>
              {ar ? '04 / اليوم المفضل' : '04 / Preferred Date'}
            </label>
            <input
              id="arena-field-date"
              aria-label={ar ? 'اليوم المفضل' : 'Preferred Date'}
              required
              type="date"
              min={minDate}
              max={maxDate}
              className={input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="arena-field-time" className={field}>
              {ar ? '05 / وقت البدء المفضل' : '05 / Preferred Start Time'}
            </label>
            <select
              id="arena-field-time"
              aria-label={ar ? 'وقت البدء المفضل' : 'Preferred Start Time'}
              required
              className={input}
              value={start}
              onChange={(e) => setStart(e.target.value)}
            >
              {ARENA.windows.map((w) => (
                <option value={w} key={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="arena-field-region" className={field}>
              {ar ? '06 / منطقة الاستفسار' : '06 / Enquiry Region'}
            </label>
            <select
              id="arena-field-region"
              aria-label={ar ? 'منطقة الاستفسار' : 'Enquiry Region'}
              required
              className={input}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              {ARENA.regions.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="arena-field-purpose" className={field}>
              {ar ? '07 / طبيعة الجلسة' : '07 / Play Purpose'}
            </label>
            <select
              id="arena-field-purpose"
              aria-label={ar ? 'طبيعة الجلسة' : 'Play Purpose'}
              className={input}
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
            >
              {sessionLabels.map(([v, arabic, english]) => (
                <option value={v} key={v}>
                  {ar ? arabic : english}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="arena-field-name" className={field}>
              {ar ? 'اسم للتواصل' : 'Contact Name'}
            </label>
            <input
              id="arena-field-name"
              aria-label={ar ? 'اسم للتواصل' : 'Contact Name'}
              className={input}
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="arena-field-phone" className={field}>
              {ar ? 'رقم الهاتف للتواصل' : 'Contact Phone'}
            </label>
            <input
              id="arena-field-phone"
              aria-label={ar ? 'رقم الهاتف للتواصل' : 'Contact Phone'}
              className={input}
              required
              type="tel"
              autoComplete="tel"
              pattern="[+0-9 ()-]{8,24}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <input
            id="arena-booking-consent"
            className="accent-[#10B981] mt-1.5 h-4 w-4 rounded"
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <label
            htmlFor="arena-booking-consent"
            className="text-xs leading-6 text-[#173D32] cursor-pointer"
          >
            {ar
              ? 'أوافق على حفظ بيانات الطلب والتواصل داخل تجربة الموقع الاستعراضية. لا أرسل بيانات أطفال أو بطاقات بنكية.'
              : 'I consent to storing the entered contact details for this showcase enquiry, without payment or minors’ private information.'}
          </label>
        </div>

        <div className="flex gap-3 bg-[#FEF3C7] border-s-4 border-[#B45309] px-5 py-4 text-[#78350F] text-xs leading-6 rounded-r-xl">
          <AlertTriangle className="shrink-0 mt-0.5 text-[#B45309]" size={20} />
          <span>
            {ar
              ? 'تنبيه: المواعيد المعروضة أمثلة لتنسيق وقت الطلب فقط؛ لا يوجد ملعب مشغل يؤكد هنا حجزًا مؤكدًا أو يحصّل مقابل مالي.'
              : 'Notice: Selected times are illustrative preference requests. No operating venue has confirmed availability, equipment, or payment.'}
          </span>
        </div>

        {error && (
          <p role="alert" className="bg-red-50 text-red-800 rounded-xl p-4 text-xs">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !consent}
          className="w-full bg-[#10B981] text-black min-h-14 px-6 py-4 font-black text-sm rounded-xl hover:bg-[#22C55E] disabled:opacity-40 transition-colors focus-visible:outline-2 focus-visible:outline-black"
        >
          {busy
            ? ar
              ? 'جارٍ حفظ التفضيل...'
              : 'SAVING...'
            : ar
            ? 'سجّل تفضيل موعد المباراة'
            : 'SAVE MY TIME PREFERENCE'}
        </button>
      </div>
    </form>
  );
}
