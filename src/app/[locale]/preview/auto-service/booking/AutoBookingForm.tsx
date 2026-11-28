'use client';

import React, { useMemo, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { AUTO_SERVICE } from '@/lib/verticals/auto-service/data';
import { CheckCircle2, ArrowUpRight, AlertTriangle } from 'lucide-react';

export function AutoBookingForm({
  locale,
  initialService = ''
}: {
  locale: Locale;
  initialService?: string;
}) {
  const ar = locale === 'ar';
  const [serviceSlug, setServiceSlug] = useState(
    initialService || AUTO_SERVICE.services[0].slug
  );
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(String(new Date().getFullYear() - 3));
  const [category, setCategory] = useState('maintenance');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredWindow, setPreferredWindow] = useState('flexible');
  const [region, setRegion] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState('');
  const id = useRef<string | null>(null);

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || receipt) return;
    setError('');
    setBusy(true);
    try {
      if (!id.current) id.current = crypto.randomUUID();
      const query = new URLSearchParams(window.location.search);
      const utm = {
        source: query.get('utm_source') || '',
        medium: query.get('utm_medium') || '',
        campaign: query.get('utm_campaign') || '',
        content: query.get('utm_content') || '',
        term: query.get('utm_term') || ''
      };
      const res = await fetch('/api/portfolio/auto-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'auto_service_request',
          clientRequestId: id.current,
          serviceSlug,
          make,
          model,
          year: Number(year),
          category,
          preferredDate,
          preferredWindow,
          region,
          guestName,
          guestPhone,
          consent,
          honeypot: '',
          utm
        })
      });
      const body = await res.json();
      if (!res.ok || !body.success) throw new Error(body.code || 'REQUEST_FAILED');
      setReceipt(body.refNumber);
    } catch {
      setError(
        ar
          ? 'تعذر تسجيل الطلب. تأكد من البيانات وجرب مرة أخرى.'
          : 'Your request could not be saved. Check the details and try again.'
      );
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    'mt-2 block w-full rounded-xl bg-white border border-[#CBD5E1] px-4 py-3.5 text-[#0F172A] text-sm focus-visible:outline-2 focus-visible:outline-[#F95721]';
  const labelClass = 'block text-xs font-bold text-[#1E293B] uppercase tracking-wider';

  const options = {
    category: [
      ['maintenance', ar ? 'صيانة دورية وقائية' : 'Routine Maintenance'],
      ['inspection', ar ? 'كشف وفحص عطل' : 'Inspection / Diagnostics'],
      ['warning', ar ? 'لمبة تحذير بالطبلون' : 'Dashboard Warning Light'],
      ['safety', ar ? 'فرامل وعفشة وثبات' : 'Brakes & Suspension'],
      ['comfort', ar ? 'تكييف وحرارة المقصورة' : 'AC & Thermal Comfort'],
      ['other', ar ? 'استفسار ميكانيكي آخر' : 'Other Inquiry']
    ],
    time: [
      ['flexible', ar ? 'مرن / حسب جدول المركز' : 'Flexible / To Arrange'],
      ['morning', ar ? 'صباحًا (٩ ص – ١ م)' : 'Morning (9 AM – 1 PM)'],
      ['afternoon', ar ? 'بعد الظهر (١ م – ٥ م)' : 'Afternoon (1 PM – 5 PM)'],
      ['evening', ar ? 'مساءً (٥ م – ٨ م)' : 'Evening (5 PM – 8 PM)']
    ]
  };

  if (receipt) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-3xl bg-white p-8 sm:p-12 border-2 border-emerald-500 shadow-xl text-center"
      >
        <CheckCircle2 className="mx-auto text-emerald-600" size={48} />
        <h2 className="text-2xl font-black mt-4 text-[#0F172A]">
          {ar ? 'تم تسجيل الاستفسار بنجاح' : 'Inspection Request Recorded'}
        </h2>
        <p className="text-sm text-[#475569] mt-3 leading-7 max-w-lg mx-auto">
          {ar
            ? 'تم حفظ نموذج الطلب في تجربة الموقع التوضيحية بنجاح. لا يوجد موعد حقيقي مؤكد، ويلزم التواصل مع مشغّل الورشة عند تطبيق النظام فعليًا.'
            : 'Your request was saved in this showcase experience. This does not confirm a workshop booking, parts order, or commercial repair contract.'}
        </p>
        <div className="mt-6 rounded-xl p-4 bg-[#F8FAFC] border border-[#E2E8F0] inline-block">
          <p className="text-xs font-mono text-[#64748B] uppercase tracking-wider">
            {ar ? 'الرقم المرجعي المحفوظ' : 'REFERENCE NUMBER'}
          </p>
          <p className="text-xl font-mono font-bold text-[#0F172A] mt-1">{receipt}</p>
        </div>
        <div className="mt-8">
          <a
            href={ar ? 'https://mavvix.com/ar/contact' : 'https://mavvix.com/en/contact'}
            className="inline-flex gap-2 items-center rounded-full bg-[#F95721] text-black px-7 py-3.5 font-bold text-sm hover:bg-[#FF7A45] transition-colors focus-visible:outline-2 focus-visible:outline-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{ar ? 'محتاج موقع مماثل لنشاطك التجاري؟' : 'Discuss a Website for Your Business'}</span>
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2rem] p-6 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,.08)] space-y-7"
    >
      <div>
        <p className="text-[#9C320A] font-black text-xs tracking-[.2em] uppercase">
          SERVICE INTAKE / STEP 01
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-2">
          {ar ? 'أخبرنا عن سيارتك وطبيعة العطل' : 'Tell Us About Your Vehicle & Concern'}
        </h2>
        <p className="text-sm mt-2 leading-7 text-[#475569]">
          {ar
            ? 'اختر الخدمة ونوع السيارة والموعد المقترح لتجربة نموذج الفحص المرجعي؛ لا يتم تأكيد موعد ورشة حقيقي.'
            : 'Choose service, vehicle, and preferred time to test the intake flow. This is a design concept and does not book a physical workshop.'}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="auto-field-service" className={labelClass}>
            {ar ? 'الخدمة المطلوبة' : 'Requested Service'}
          </label>
          <select
            id="auto-field-service"
            aria-label={ar ? 'الخدمة المطلوبة' : 'Requested Service'}
            required
            className={inputClass}
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
          >
            {AUTO_SERVICE.services.map((s) => (
              <option value={s.slug} key={s.slug}>
                {s.title[locale]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="auto-field-category" className={labelClass}>
            {ar ? 'طبيعة الاستفسار' : 'Concern Category'}
          </label>
          <select
            id="auto-field-category"
            aria-label={ar ? 'طبيعة الاستفسار' : 'Concern Category'}
            className={inputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {options.category.map(([v, t]) => (
              <option value={v} key={v}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="auto-field-make" className={labelClass}>
            {ar ? 'الشركة المصنعة' : 'Vehicle Make'}
          </label>
          <select
            id="auto-field-make"
            aria-label={ar ? 'الشركة المصنعة' : 'Vehicle Make'}
            className={inputClass}
            value={make}
            onChange={(e) => setMake(e.target.value)}
          >
            {AUTO_SERVICE.brands.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="auto-field-model" className={labelClass}>
            {ar ? 'طراز السيارة' : 'Model'}
          </label>
          <input
            id="auto-field-model"
            aria-label={ar ? 'طراز السيارة' : 'Model'}
            required
            maxLength={70}
            minLength={2}
            placeholder={ar ? 'مثال: Corolla / Tucson' : 'e.g. Corolla / Tucson'}
            className={inputClass}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="auto-field-year" className={labelClass}>
            {ar ? 'سنة الصنع' : 'Model Year'}
          </label>
          <input
            id="auto-field-year"
            aria-label={ar ? 'سنة الصنع' : 'Model Year'}
            type="number"
            min="1980"
            max={new Date().getFullYear() + 1}
            required
            className={inputClass}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="auto-field-region" className={labelClass}>
            {ar ? 'المنطقة (بدون عنوان سكني)' : 'Service Area (City / District)'}
          </label>
          <input
            id="auto-field-region"
            aria-label={ar ? 'المنطقة (بدون عنوان سكني)' : 'Service Area (City / District)'}
            required
            maxLength={90}
            minLength={2}
            className={inputClass}
            placeholder={ar ? 'مثال: الرياض / القاهرة' : 'e.g. Riyadh / Cairo'}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="auto-field-date" className={labelClass}>
            {ar ? 'اليوم المفضل (اختياري)' : 'Preferred Date (Optional)'}
          </label>
          <input
            id="auto-field-date"
            aria-label={ar ? 'اليوم المفضل (اختياري)' : 'Preferred Date (Optional)'}
            type="date"
            min={minDate}
            className={inputClass}
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="auto-field-window" className={labelClass}>
            {ar ? 'الفترة الزمنية المفضلة' : 'Preferred Window'}
          </label>
          <select
            id="auto-field-window"
            aria-label={ar ? 'الفترة الزمنية المفضلة' : 'Preferred Window'}
            className={inputClass}
            value={preferredWindow}
            onChange={(e) => setPreferredWindow(e.target.value)}
          >
            {options.time.map(([v, t]) => (
              <option key={v} value={v}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="auto-field-name" className={labelClass}>
            {ar ? 'الاسم' : 'Contact Name'}
          </label>
          <input
            id="auto-field-name"
            aria-label={ar ? 'الاسم' : 'Contact Name'}
            required
            maxLength={100}
            minLength={2}
            autoComplete="name"
            className={inputClass}
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="auto-field-phone" className={labelClass}>
            {ar ? 'رقم الهاتف للتواصل' : 'Phone Number'}
          </label>
          <input
            id="auto-field-phone"
            aria-label={ar ? 'رقم الهاتف للتواصل' : 'Phone Number'}
            required
            type="tel"
            autoComplete="tel"
            pattern="[+0-9 ()-]{8,24}"
            className={inputClass}
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3 items-start">
        <input
          id="auto-booking-consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-gray-300 text-[#F95721] focus:ring-[#F95721]"
          checked={consent}
          required
          onChange={(e) => setConsent(e.target.checked)}
        />
        <label
          htmlFor="auto-booking-consent"
          className="text-xs leading-6 text-[#334155] cursor-pointer"
        >
          {ar
            ? 'أوافق على تسجيل بيانات التواصل المقدمة لغرض تجربة الطلب التوضيحية والمتابعة. لن أرسل رقم شاسيه أو وثائق حساسة.'
            : 'I consent to storing the provided contact details for this website demonstration workflow. No chassis VIN or sensitive paperwork is collected.'}
        </label>
      </div>

      <div className="rounded-xl bg-orange-50/80 p-4 text-xs leading-6 flex gap-3 text-[#9A3412] border border-orange-200">
        <AlertTriangle size={20} className="shrink-0 text-[#C2410C]" />
        <span>
          {ar
            ? 'تنبيه: هذا نموذج استكشافي ضمن باقة مافكس لمواقع السيارات، ولا يشكل حجزًا مؤكدًا بمركز صيانة فعلي أو ضمان تسعير.'
            : 'Notice: This is an illustrative demonstration from Mavvix; it does not constitute a confirmed garage appointment or binding quotation.'}
        </span>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 p-3 rounded-lg">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy || !consent}
        className="w-full rounded-xl bg-[#F95721] px-6 py-4 text-black font-black text-sm disabled:opacity-40 hover:bg-[#FF7A45] focus-visible:outline-2 focus-visible:outline-black transition-colors"
      >
        {busy
          ? ar
            ? 'جارٍ تسجيل الطلب...'
            : 'Saving request...'
          : ar
          ? 'سجّل طلب الفحص'
          : 'Save Inspection Request'}
      </button>
    </form>
  );
}
