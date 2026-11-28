'use client';
import { useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { BLOOM } from '@/lib/verticals/nursery/data';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

export function BloomAdmissionForm({
  locale,
  initialProgram = ''
}: {
  locale: Locale;
  initialProgram?: string;
}) {
  const ar = locale === 'ar';
  const chosen = BLOOM.services.find((p) => p.slug === initialProgram);
  const [age, setAge] = useState(
    chosen?.ageBand && chosen.ageBand !== 'all' ? chosen.ageBand : '2-3'
  );
  const [program, setProgram] = useState(chosen?.slug || 'curious-toddlers');
  const [requestType, setRequestType] = useState('visit');
  const [region, setRegion] = useState('Cairo');
  const [date, setDate] = useState('');
  const [preferredWindow, setPreferredWindow] = useState('flexible');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [ref, setRef] = useState('');
  const key = useRef<string | null>(null);

  const available = BLOOM.services.filter((p) => p.ageBand === 'all' || p.ageBand === age);

  function chooseAge(next: string) {
    setAge(next);
    if (
      !BLOOM.services.some(
        (p) => p.slug === program && (p.ageBand === 'all' || p.ageBand === next)
      )
    ) {
      setProgram(BLOOM.services.find((p) => p.ageBand === next)?.slug || 'story-language');
    }
  }

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || ref) return;
    setBusy(true);
    setError('');
    try {
      if (!key.current) key.current = crypto.randomUUID();
      const q = new URLSearchParams(window.location.search);
      const r = await fetch('/api/portfolio/nursery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'nursery_visit_interest',
          clientRequestId: key.current,
          ageBand: age,
          serviceSlug: program,
          requestType,
          region,
          preferredDate: date,
          preferredWindow,
          guestName: name,
          guestPhone: phone,
          consent,
          honeypot: '',
          utm: {
            source: q.get('utm_source') || '',
            medium: q.get('utm_medium') || '',
            campaign: q.get('utm_campaign') || ''
          }
        })
      });
      const b = await r.json();
      if (!r.ok || !b.success) throw Error(b.code || 'NOT_SAVED');
      setRef(b.refNumber);
    } catch {
      setError(
        ar
          ? 'تعذر حفظ الطلب. راجع الاختيارات والبيانات وحاول مرة أخرى.'
          : 'Unable to save your enquiry. Check the choices and contact details.'
      );
    } finally {
      setBusy(false);
    }
  }

  const field = 'block font-extrabold text-sm text-[#145960]';
  const input =
    'mt-2 block w-full bg-white border border-[#8DB2A8] rounded-xl px-4 py-3.5 text-sm text-[#145960] focus-visible:outline-[#145960]';

  if (ref)
    return (
      <div
        className="rounded-[2rem] bg-white border-2 border-[#145960] p-8 sm:p-12 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 size={48} className="mx-auto text-[#145960]" />
        <h2 className="bloom-display text-3xl mt-6">
          {ar ? 'تم حفظ استفسار ولي الأمر' : 'Your guardian enquiry is saved'}
        </h2>
        <p className="mt-5 leading-8 text-sm text-[#2E4844]">
          {ar
            ? 'رقم مرجعي فقط لتجربة الموقع. لم يُحجز مكان أو موعد حقيقي.'
            : 'A reference for the website experience only. No place or actual tour has been confirmed.'}
        </p>
        <p className="mt-7 bg-[#E9F4ED] p-4 rounded-2xl font-mono font-bold text-xl text-[#145960]">
          {ref}
        </p>
        <a
          href={ar ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'}
          className="inline-flex gap-2 rounded-full bg-[#145960] text-white px-7 py-4 mt-8 font-bold text-sm"
        >
          {ar ? 'اطلب موقعًا لحضانتك' : 'Build a site for your nursery'}
          <ArrowUpRight size={16} />
        </a>
      </div>
    );

  return (
    <form
      onSubmit={send}
      className="bg-white rounded-[2rem] border border-[#B6D1C5] overflow-hidden shadow-xl"
    >
      <div className="bg-[#F5C04E] p-7 sm:p-9">
        <p className="font-extrabold text-xs tracking-widest text-[#145960]">
          BLOOM / FAMILY ENQUIRY
        </p>
        <h2 className="bloom-display mt-4 text-3xl text-[#145960]">
          {ar ? 'تفضيلات زيارة أو قبول' : 'Prepare your visit preference'}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#2E4844]">
          {ar
            ? 'هذه رحلة توضيحية، بدون بيانات تعريفية للطفل.'
            : 'An illustrative journey, without identifying the child.'}
        </p>
      </div>
      <div className="p-6 sm:p-9 space-y-7">
        <fieldset>
          <legend className="font-extrabold text-sm mb-4 text-[#145960]">
            {ar ? 'الفئة العمرية (بدون تاريخ الميلاد)' : 'Age band (no birth date)'}
          </legend>
          <div className="grid sm:grid-cols-3 gap-3">
            {BLOOM.ageBands.map((a) => (
              <button
                type="button"
                key={a.id}
                onClick={() => chooseAge(a.id)}
                aria-pressed={age === a.id}
                className={
                  'rounded-2xl border-2 min-h-20 p-4 text-sm font-bold ' +
                  (age === a.id
                    ? 'bg-[#145960] border-[#145960] text-white'
                    : 'bg-[#E9F4ED] border-[#B6D1C5] text-[#145960]')
                }
              >
                {a[locale]}
              </button>
            ))}
          </div>
        </fieldset>

        <label htmlFor="bloom-program" className={field}>
          {ar ? 'البرنامج الذي يهمك' : 'Programme interest'}
          <select
            id="bloom-program"
            aria-label={ar ? 'البرنامج الذي يهمك' : 'Programme interest'}
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className={input}
          >
            {available.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title[locale]}
              </option>
            ))}
          </select>
        </label>

        <div className="grid sm:grid-cols-2 gap-5">
          <label htmlFor="bloom-request-type" className={field}>
            {ar ? 'نوع الاستفسار' : 'Enquiry type'}
            <select
              id="bloom-request-type"
              aria-label={ar ? 'نوع الاستفسار' : 'Enquiry type'}
              className={input}
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
            >
              <option value="visit">{ar ? 'زيارة' : 'Visit preference'}</option>
              <option value="admission">{ar ? 'استفسار قبول' : 'Admission enquiry'}</option>
              <option value="information">{ar ? 'معلومات البرنامج' : 'Programme information'}</option>
            </select>
          </label>

          <label htmlFor="bloom-region" className={field}>
            {ar ? 'المنطقة العامة' : 'General region'}
            <select
              id="bloom-region"
              aria-label={ar ? 'المنطقة العامة' : 'General region'}
              className={input}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              {['Cairo', 'Giza', 'Alexandria', 'Delta', 'Riyadh', 'Jeddah', 'Other'].map(
                (r) => (
                  <option key={r}>{r}</option>
                )
              )}
            </select>
          </label>

          <label htmlFor="bloom-date" className={field}>
            {ar ? 'تاريخ مفضل (اختياري)' : 'Preferred day (optional)'}
            <input
              id="bloom-date"
              aria-label={ar ? 'تاريخ مفضل (اختياري)' : 'Preferred day (optional)'}
              type="date"
              value={date}
              min={new Date().toISOString().slice(0, 10)}
              max={new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10)}
              className={input}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label htmlFor="bloom-window" className={field}>
            {ar ? 'الفترة المناسبة' : 'Preferred window'}
            <select
              id="bloom-window"
              aria-label={ar ? 'الفترة المناسبة' : 'Preferred window'}
              className={input}
              value={preferredWindow}
              onChange={(e) => setPreferredWindow(e.target.value)}
            >
              <option value="flexible">{ar ? 'مرن' : 'Flexible'}</option>
              <option value="morning">{ar ? 'صباحًا' : 'Morning'}</option>
              <option value="afternoon">{ar ? 'بعد الظهر' : 'Afternoon'}</option>
            </select>
          </label>

          <label htmlFor="bloom-name" className={field}>
            {ar ? 'اسم ولي الأمر فقط' : 'Guardian name only'}
            <input
              id="bloom-name"
              aria-label={ar ? 'اسم ولي الأمر فقط' : 'Guardian name only'}
              className={input}
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label htmlFor="bloom-phone" className={field}>
            {ar ? 'موبايل ولي الأمر' : 'Guardian phone'}
            <input
              id="bloom-phone"
              aria-label={ar ? 'موبايل ولي الأمر' : 'Guardian phone'}
              className={input}
              required
              type="tel"
              autoComplete="tel"
              pattern="[+0-9 ()-]{8,24}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>

        <label className="flex items-start gap-3 text-sm leading-8 text-[#2E4844]">
          <input
            type="checkbox"
            required
            className="accent-[#145960] mt-2"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>
            {ar
              ? 'أنا ولي أمر بالغ أو مقدم رعاية بالغ، وأوافق على حفظ بيانات تواصلي لهذا النموذج التوضيحي دون بيانات الطفل الخاصة.'
              : 'I am an adult guardian or caregiver and consent to storing my contact information for this example, without private child data.'}
          </span>
        </label>

        <p className="text-xs leading-7 bg-[#F4E5DD] rounded-2xl p-5 text-[#2E4844]">
          {ar
            ? 'لا ترسل صورًا أو مستندات أو سجلات طبية أو اسم الطفل. لا يوجد حجز أو تسجيل فعلي.'
            : 'Do not share photos, documents, medical records or the child’s name. No actual tour or enrollment is confirmed.'}
        </p>

        {error && (
          <p className="p-4 bg-red-50 text-red-700 text-sm rounded-xl" role="alert">
            {error}
          </p>
        )}

        <button
          disabled={busy || !consent}
          className="bg-[#145960] text-white w-full rounded-full py-4 text-sm font-extrabold disabled:opacity-50 hover:bg-[#1C6C75] transition-colors"
          type="submit"
        >
          {busy
            ? ar
              ? 'جارٍ الحفظ...'
              : 'Saving...'
            : ar
            ? 'احفظ استفسار الزيارة'
            : 'Save the visit enquiry'}
        </button>
      </div>
    </form>
  );
}
