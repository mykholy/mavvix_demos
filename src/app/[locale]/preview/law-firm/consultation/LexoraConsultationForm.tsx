'use client';
import { useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { LEXORA, lexoraText } from '@/lib/verticals/law-firm/data';
import { Scale, ShieldCheck, LockKeyhole, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';

const jurisdictions = [
  ['egypt', 'مصر', 'Egypt'],
  ['saudi-arabia', 'السعودية', 'Saudi Arabia'],
  ['other', 'دولة أخرى (يلزم تأكيد الاختصاص)', 'Other (jurisdiction review required)']
] as const;

const clients = [
  ['individual', 'فرد', 'Individual'],
  ['business', 'شركة قائمة', 'Established company'],
  ['startup', 'مشروع ناشئ', 'Startup'],
  ['nonprofit', 'منظمة غير ربحية', 'Nonprofit']
] as const;

const channels = [
  ['phone', 'اتصال هاتفي', 'Phone call'],
  ['whatsapp', 'واتساب', 'WhatsApp'],
  ['email', 'بريد إلكتروني (تفضيل فقط؛ سيتم التواصل هاتفيًا)', 'Email preference (phone used to arrange)']
] as const;

const windows = [
  ['flexible', 'مرن', 'Flexible'],
  ['morning', 'صباحًا', 'Morning'],
  ['afternoon', 'بعد الظهر', 'Afternoon'],
  ['evening', 'مساءً', 'Evening']
] as const;

export function LexoraConsultationForm({
  locale,
  initialPractice = ''
}: {
  locale: Locale;
  initialPractice?: string;
}) {
  const ar = locale === 'ar';
  const [practiceSlug, setPracticeSlug] = useState(
    LEXORA.services.some(s => s.slug === initialPractice) ? initialPractice : LEXORA.services[0].slug
  );
  const [jurisdiction, setJurisdiction] = useState('egypt');
  const [clientType, setClientType] = useState('business');
  const [contactChannel, setContactChannel] = useState('phone');
  const [preferredWindow, setPreferredWindow] = useState('flexible');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const requestKey = useRef<string | null>(null);

  const input =
    'mt-2 block w-full rounded-sm border border-[#BFB0BD] bg-white px-4 py-3.5 text-sm text-[#251D34] focus-visible:outline-2 focus-visible:outline-[#735B2D]';
  const label = 'text-xs font-bold text-[#251D34] block';

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || reference || !consent) return;
    setBusy(true);
    setError('');
    try {
      if (!requestKey.current) requestKey.current = crypto.randomUUID();
      const utm = new URLSearchParams(window.location.search);
      const data = {
        flowType: 'legal_consultation_interest',
        clientRequestId: requestKey.current,
        practiceSlug,
        jurisdiction,
        clientType,
        contactChannel,
        preferredWindow,
        guestName,
        guestPhone,
        consent,
        honeypot: '',
        utm: {
          source: utm.get('utm_source') || '',
          medium: utm.get('utm_medium') || '',
          campaign: utm.get('utm_campaign') || ''
        }
      };
      const response = await fetch('/api/portfolio/law-firm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.code || 'REQUEST_FAILED');
      setReference(result.refNumber);
    } catch {
      setError(
        ar
          ? 'تعذر حفظ الاستفسار. راجع البيانات وحاول مرة أخرى.'
          : 'The request could not be saved. Check the fields and try again.'
      );
    } finally {
      setBusy(false);
    }
  }

  if (reference) {
    return (
      <div
        className="rounded-sm border-2 border-[#B79B6A] bg-white px-6 sm:px-12 py-10 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 size={48} className="text-[#397D58] mx-auto" />
        <h2 className="lexora-display text-3xl sm:text-4xl mt-6 text-[#251D34]">
          {ar ? 'تم حفظ الاستفسار في تجربة الموقع' : 'The example enquiry was recorded'}
        </h2>
        <p className="text-sm leading-8 text-[#3F314B] mt-5 max-w-xl mx-auto">
          {ar
            ? 'هذا رقم مرجعي داخل نظام Mavvix التجريبي، وليس قبول توكيل أو علاقة محامٍ وموكّل ولا موعدًا قانونيًا مؤكدًا.'
            : 'This is a reference in a Mavvix showcase. It does not establish representation, confidentiality privilege, a legal engagement or a confirmed consultation.'}
        </p>
        <p className="font-mono font-bold text-lg mt-8 bg-[#EFE8D8] text-[#251D34] p-5 rounded-sm">
          {reference}
        </p>
        <a
          href={ar ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex gap-3 items-center px-7 py-4 bg-[#251D34] text-white text-sm font-bold rounded-sm hover:bg-[#3F314B] transition-colors"
        >
          {ar ? 'محتاج موقع قانوني مماثل لشركتك؟' : 'Build a similar site for your firm'}
          <ArrowUpRight size={17} />
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-sm bg-[#FFFEFB] border border-[#D7CAB8] shadow-[0_16px_65px_rgba(37,29,52,.08)]"
    >
      <div className="bg-[#251D34] text-white p-7 sm:p-10">
        <div className="flex items-center gap-2 text-[#E7CF9A] text-xs font-bold tracking-widest">
          <Scale size={18} /> INITIAL ENQUIRY / NOT AN ENGAGEMENT
        </div>
        <h2 className="lexora-display mt-5 text-3xl sm:text-4xl">
          {ar ? 'استفسار أولي يحترم السرية' : 'A thoughtful first contact'}
        </h2>
        <p className="leading-8 text-[#EBDFE8] mt-4 text-sm">
          {ar
            ? 'نحتاج فقط معلومات تساعد على تحديد المجال والولاية القضائية؛ لا تكتب تفاصيل الدعوى أو الطرف الآخر أو رقم القضية.'
            : 'Only broad categorization is needed. Do not provide case details, counterparty names, documents, identification or deadlines.'}
        </p>
      </div>

      <div className="p-7 sm:p-10 space-y-8">
        <fieldset>
          <legend className="block text-sm font-bold text-[#251D34] mb-4">
            {ar ? '01 / ما مجال الاستفسار؟' : '01 / Select the general practice area'}
          </legend>
          <div className="grid sm:grid-cols-2 gap-3">
            {LEXORA.services.map(s => (
              <button
                type="button"
                key={s.slug}
                aria-pressed={practiceSlug === s.slug}
                aria-label={lexoraText(s.title, locale)}
                onClick={() => setPracticeSlug(s.slug)}
                className={
                  'text-start border-2 px-5 py-4 min-h-20 rounded-sm transition-colors ' +
                  (practiceSlug === s.slug
                    ? 'bg-[#251D34] border-[#251D34] text-white'
                    : 'border-[#DDD3C5] bg-white hover:bg-[#F2ECD9] text-[#251D34]')
                }
              >
                <span className="font-bold text-sm">{lexoraText(s.title, locale)}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid md:grid-cols-2 gap-5">
          <label htmlFor="lexora-jurisdiction" className={label}>
            {ar ? '02 / الدولة أو الاختصاص العام' : '02 / General jurisdiction'}
            <select
              id="lexora-jurisdiction"
              aria-label={ar ? 'الدولة أو الاختصاص العام' : 'General jurisdiction'}
              className={input}
              value={jurisdiction}
              onChange={e => setJurisdiction(e.target.value)}
            >
              {jurisdictions.map(([v, aa, en]) => (
                <option value={v} key={v}>
                  {ar ? aa : en}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="lexora-client-type" className={label}>
            {ar ? '03 / طبيعة جهة الاستفسار' : '03 / Client profile'}
            <select
              id="lexora-client-type"
              aria-label={ar ? 'طبيعة جهة الاستفسار' : 'Client profile'}
              className={input}
              value={clientType}
              onChange={e => setClientType(e.target.value)}
            >
              {clients.map(([v, aa, en]) => (
                <option value={v} key={v}>
                  {ar ? aa : en}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="lexora-contact-channel" className={label}>
            {ar ? '04 / طريقة التواصل المفضلة' : '04 / Preferred contact channel'}
            <select
              id="lexora-contact-channel"
              aria-label={ar ? 'طريقة التواصل المفضلة' : 'Preferred contact channel'}
              className={input}
              value={contactChannel}
              onChange={e => setContactChannel(e.target.value)}
            >
              {channels.map(([v, aa, en]) => (
                <option value={v} key={v}>
                  {ar ? aa : en}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="lexora-contact-window" className={label}>
            {ar ? '05 / فترة التواصل المناسبة' : '05 / Preferred contact window'}
            <select
              id="lexora-contact-window"
              aria-label={ar ? 'فترة التواصل المناسبة' : 'Preferred contact window'}
              className={input}
              value={preferredWindow}
              onChange={e => setPreferredWindow(e.target.value)}
            >
              {windows.map(([v, aa, en]) => (
                <option value={v} key={v}>
                  {ar ? aa : en}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="lexora-guest-name" className={label}>
            {ar ? 'الاسم للتواصل' : 'Contact name'}
            <input
              id="lexora-guest-name"
              aria-label={ar ? 'الاسم للتواصل' : 'Contact name'}
              required
              className={input}
              minLength={2}
              maxLength={100}
              autoComplete="name"
              value={guestName}
              onChange={e => setGuestName(e.target.value)}
            />
          </label>

          <label htmlFor="lexora-guest-phone" className={label}>
            {ar ? 'رقم هاتف للتواصل' : 'Contact phone'}
            <input
              id="lexora-guest-phone"
              aria-label={ar ? 'رقم هاتف للتواصل' : 'Contact phone'}
              required
              type="tel"
              pattern="[+0-9 ()-]{8,24}"
              className={input}
              autoComplete="tel"
              value={guestPhone}
              onChange={e => setGuestPhone(e.target.value)}
            />
          </label>
        </div>

        <div className="border-s-4 border-[#84662F] bg-[#F4EBD8] text-[#251D34] p-5 flex gap-3 items-start text-sm leading-8 rounded-sm">
          <AlertTriangle size={23} className="text-[#84662F] shrink-0 mt-1" />
          <span>
            {ar
              ? 'لا تنشأ علاقة محامٍ وموكل أو سرية مهنية بمجرد إرسال النموذج. عند وجود مهلة قضائية أو خطر قانوني عاجل اطلب مساعدة محامٍ مرخص مباشرة.'
              : 'Submitting does not create attorney-client privilege, representation or legal advice. For urgent legal deadlines, contact an appropriately qualified local lawyer promptly.'}
          </span>
        </div>

        <label htmlFor="lexora-consent-check" className="flex items-start gap-3 text-sm leading-8 text-[#251D34] cursor-pointer">
          <input
            id="lexora-consent-check"
            aria-label={ar ? 'الموافقة على الشروط والخصوصية' : 'Consent to enquiry terms and privacy'}
            required
            type="checkbox"
            className="accent-[#251D34] mt-2"
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
          />
          <span>
            {ar
              ? 'أوافق على حفظ بيانات التواصل الأساسية لهذا الاستفسار التوضيحي. لم أرسل معلومات سرية أو شخصية عن طرف ثالث.'
              : 'I consent to storing basic contact details for this illustrative enquiry. No confidential facts or third-party personal information is being provided.'}
          </span>
        </label>

        {error && <p role="alert" className="bg-red-50 text-red-800 p-4 text-sm rounded-sm">{error}</p>}

        <button
          disabled={busy || !consent}
          type="submit"
          className="w-full min-h-14 bg-[#251D34] hover:bg-[#45344B] disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 text-white font-bold text-sm transition-colors rounded-sm"
        >
          {busy
            ? ar
              ? 'جارٍ الحفظ...'
              : 'Saving...'
            : ar
            ? 'حفظ الاستفسار العام'
            : 'Save initial enquiry'}
        </button>
      </div>
    </form>
  );
}
