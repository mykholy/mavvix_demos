'use client';

import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { clearPath } from '@/lib/verticals/diagnostics-lab/data';
import Link from 'next/link';

export function CallbackForm({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [guestName, setName] = useState('');
  const [guestPhone, setPhone] = useState('');
  const [preferredWindow, setWindow] = useState('flexible');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const requestId = useRef<string | null>(null);
  const inFlight = useRef(false);

  const field =
    'mt-2 block min-h-12 w-full border border-[#8FAEB9] bg-white px-3 py-3 text-sm text-[#12334A] focus-visible:outline-2 focus-visible:outline-[#126B8A]';

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || reference || !consent) return;
    inFlight.current = true;
    setBusy(true);
    setError('');

    try {
      if (!requestId.current) requestId.current = crypto.randomUUID();
      const res = await fetch('/api/portfolio/diagnostics-lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          flowType: 'lab_contact_request',
          clientRequestId: requestId.current,
          guestName,
          guestPhone,
          preferredWindow,
          consent,
          honeypot: ''
        })
      });
      const d = await res.json();
      if (!res.ok || !d.success) throw Error('SAVE_FAILED');
      setReference(d.refNumber);
    } catch {
      setError(
        ar
          ? 'تعذر حفظ طلب التواصل. راجع بيانات الاتصال وحاول مرة أخرى.'
          : 'Could not save your request. Review contact details and retry.'
      );
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

  if (reference) {
    return (
      <div role="status" className="bg-[#E7F4F6] border border-[#C9DDE3] rounded-xl p-9 text-center">
        <CheckCircle2 size={48} className="mx-auto text-[#12334A]" />
        <h2 className="mt-6 font-black text-3xl text-[#12334A]">
          {ar ? 'تم حفظ طلب التواصل' : 'Callback request saved'}
        </h2>
        <p className="mt-5 break-all font-mono text-xl font-bold text-[#126B8A]">{reference}</p>
        <p className="mt-6 text-sm leading-8 text-[#334155]">
          {ar
            ? 'المرجع لا يؤكد زيارة أو اختباراً ولا يتيح تقريراً.'
            : 'The reference confirms no visit or test and opens no report.'}
        </p>
        <a
          href={'https://mavvix.com/' + locale + '/contact'}
          className="mt-7 inline-flex bg-[#12334A] text-white px-6 py-4 font-bold text-sm hover:bg-[#126B8A] transition-colors"
        >
          {ar ? 'اطلب موقع لمعملك' : 'Commission your website'}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-[#E7F4F6] border border-[#C9DDE3] rounded-xl overflow-hidden">
      <div className="bg-[#12334A] text-white p-7">
        <h2 className="font-black text-3xl">{ar ? 'بيانات التواصل' : 'Contact information'}</h2>
        <p className="mt-3 text-sm leading-7 text-[#D4EAF0]">
          {ar
            ? 'لا توجد أسئلة طبية أو حجز مؤكد.'
            : 'No clinical questions or confirmed appointments.'}
        </p>
      </div>
      <fieldset disabled={busy} className="min-w-0 p-6 sm:p-9 space-y-6">
        <label className="block text-sm font-bold text-[#12334A]">
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
        <label className="block text-sm font-bold text-[#12334A]">
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
        <label className="block text-sm font-bold text-[#12334A]">
          {ar ? 'الفترة المفضلة للتواصل' : 'Preferred callback window'}
          <select
            className={field}
            value={preferredWindow}
            aria-label={ar ? 'الفترة المفضلة للتواصل' : 'Preferred callback window'}
            onChange={(e) => setWindow(e.target.value)}
          >
            {[
              ['morning', 'صباحاً', 'Morning'],
              ['afternoon', 'بعد الظهر', 'Afternoon'],
              ['evening', 'مساءً', 'Evening'],
              ['flexible', 'مرنة', 'Flexible']
            ].map(([v, a, en]) => (
              <option key={v} value={v}>
                {ar ? a : en}
              </option>
            ))}
          </select>
        </label>
        <div className="bg-white p-4 flex gap-3 border border-[#C9DDE3] text-sm leading-7 text-[#12334A]">
          <ShieldCheck size={22} className="shrink-0 text-[#126B8A]" />
          {ar
            ? 'لا ترسل نتائج أو معلومات صحية أو عنواناً.'
            : 'Never submit results, health information or an address.'}
        </div>
        <label className="flex gap-3 text-sm leading-7 text-[#12334A]">
          <input
            type="checkbox"
            checked={consent}
            required
            aria-label={
              ar
                ? 'الموافقة على حفظ معلومات الاتصال الأساسية'
                : 'Consent to storing basic contact information'
            }
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-[#12334A]"
          />
          <span>
            {ar
              ? 'أوافق على حفظ معلومات الاتصال الأساسية لهذا الاستفسار التوضيحي، دون موعد أو خدمة طبية.'
              : 'I consent to storing basic contact information for this illustrative enquiry, without a medical appointment or service.'}{' '}
            <Link className="underline font-bold text-[#126B8A]" href={clearPath(locale, 'privacy')}>
              {ar ? 'الخصوصية' : 'Privacy'}
            </Link>
          </span>
        </label>
        {error && (
          <p role="alert" className="bg-red-50 text-red-800 p-4 text-sm font-bold border border-red-200">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy || !consent}
          className="w-full min-h-14 bg-[#12334A] text-white px-6 py-4 text-sm font-bold disabled:opacity-50 hover:bg-[#126B8A] transition-colors"
        >
          {busy
            ? ar
              ? 'جارٍ الحفظ'
              : 'Saving'
            : ar
            ? 'حفظ طلب التواصل'
            : 'Save callback request'}
        </button>
      </fieldset>
    </form>
  );
}
