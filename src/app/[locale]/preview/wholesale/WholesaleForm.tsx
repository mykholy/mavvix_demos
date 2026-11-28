'use client';

import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { Locale } from '@/lib/i18n/config';
import Link from 'next/link';
import { CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { TRADEBRIDGE, tradePath } from '@/lib/verticals/wholesale/data';

type Line = { serviceSlug: string; cartons: string };

const choices = {
  country: [
    ['egypt', 'مصر', 'Egypt'],
    ['saudi-arabia', 'السعودية', 'Saudi Arabia'],
    ['uae', 'الإمارات', 'UAE'],
    ['other', 'أخرى', 'Other']
  ],
  buyerType: [
    ['retailer', 'تجزئة', 'Retailer'],
    ['hospitality', 'ضيافة', 'Hospitality'],
    ['office', 'مكتب', 'Office'],
    ['distributor', 'موزع', 'Distributor'],
    ['other', 'أخرى', 'Other']
  ],
  deliveryPreference: [
    ['delivery', 'توصيل', 'Delivery'],
    ['collection', 'استلام', 'Collection'],
    ['undecided', 'غير محدد', 'Undecided']
  ],
  category: [
    ['packaging', 'التغليف', 'Packaging'],
    ['hospitality', 'الضيافة', 'Hospitality'],
    ['office', 'المكاتب', 'Office'],
    ['operations', 'التشغيل', 'Operations']
  ],
  supplierType: [
    ['manufacturer', 'مصنع', 'Manufacturer'],
    ['distributor', 'موزع', 'Distributor'],
    ['importer', 'مستورد', 'Importer'],
    ['other', 'أخرى', 'Other']
  ],
  coverage: [
    ['local', 'محلي', 'Local'],
    ['national', 'داخل الدولة', 'National'],
    ['regional', 'إقليمي', 'Regional'],
    ['unknown', 'غير محدد', 'Unknown']
  ]
};

export function WholesaleForm({
  locale,
  mode,
  initialItem
}: {
  locale: Locale;
  mode: 'buyer' | 'supplier';
  initialItem: string;
}) {
  const ar = locale === 'ar';
  const buyer = mode === 'buyer';
  const [lines, setLines] = useState<Line[]>([{ serviceSlug: initialItem, cartons: '2' }]);
  const [organization, setOrg] = useState('');
  const [country, setCountry] = useState('egypt');
  const [buyerType, setBuyer] = useState('retailer');
  const [deliveryPreference, setDelivery] = useState('undecided');
  const [category, setCategory] = useState('packaging');
  const [supplierType, setSupplier] = useState('manufacturer');
  const [coverage, setCoverage] = useState('unknown');
  const [guestName, setName] = useState('');
  const [guestPhone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const request = useRef<string | null>(null);
  const inFlight = useRef(false);

  const field =
    'mt-2 block min-h-12 w-full bg-white border border-[#A89F95] px-3 py-3 text-sm text-[#26323B] focus-visible:outline-2 focus-visible:outline-[#B9442E] rounded-sm';

  const choose = (
    label: string,
    value: string,
    set: (s: string) => void,
    opts: string[][]
  ) => (
    <label className="block text-sm font-bold text-[#213044]">
      {label}
      <select
        aria-label={label}
        className={field}
        value={value}
        onChange={e => set(e.target.value)}
      >
        {opts.map(([v, a, e]) => (
          <option key={v} value={v}>
            {ar ? a : e}
          </option>
        ))}
      </select>
    </label>
  );

  const evaluated = lines.map(l => ({
    item: TRADEBRIDGE.services.find(s => s.slug === l.serviceSlug),
    cartons: Number(l.cartons),
    raw: l.cartons
  }));

  const totalCartons = evaluated.reduce(
    (sum, l) => sum + (Number.isFinite(l.cartons) ? l.cartons : 0),
    0
  );

  const totalUnits = evaluated.reduce(
    (sum, l) =>
      sum + (l.item && Number.isFinite(l.cartons) ? l.cartons * l.item.unitsPerCarton : 0),
    0
  );

  const valid =
    lines.length >= 1 &&
    lines.length <= 8 &&
    new Set(lines.map(l => l.serviceSlug)).size === lines.length &&
    evaluated.every(
      l =>
        l.item &&
        l.raw !== '' &&
        Number.isInteger(l.cartons) &&
        l.cartons >= l.item.minCartons &&
        l.cartons <= l.item.maxCartons
    ) &&
    totalCartons <= 2000;

  function update(i: number, next: Partial<Line>) {
    setLines(old => old.map((l, index) => (index === i ? { ...l, ...next } : l)));
  }

  function add() {
    const next = TRADEBRIDGE.services.find(s => !lines.some(l => l.serviceSlug === s.slug));
    if (next) setLines(old => [...old, { serviceSlug: next.slug, cartons: String(next.minCartons) }]);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || reference || !consent || (buyer && !valid)) return;
    inFlight.current = true;
    setBusy(true);
    setError('');

    try {
      if (!request.current) request.current = crypto.randomUUID();
      const common = {
        clientRequestId: request.current,
        organization,
        country,
        guestName,
        guestPhone,
        consent,
        honeypot: ''
      };
      const payload = buyer
        ? {
            ...common,
            flowType: 'wholesale_rfq',
            buyerType,
            deliveryPreference,
            lines: lines.map(l => ({ serviceSlug: l.serviceSlug, cartons: Number(l.cartons) }))
          }
        : {
            ...common,
            flowType: 'wholesale_supplier_interest',
            category,
            supplierType,
            coverage
          };

      const res = await fetch('/api/portfolio/wholesale', {
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
          ? 'تعذر حفظ الطلب. راجع البيانات والكميات وحاول مرة أخرى.'
          : 'Could not save the enquiry. Review contact details and quantities, then retry.'
      );
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

  if (reference) {
    return (
      <div role="status" className="bg-[#F8F4EF] border border-[#D9D2CA] p-9 text-center rounded-sm">
        <CheckCircle2 size={48} className="mx-auto text-[#B9442E]" />
        <h2 className="mt-6 text-3xl font-black text-[#213044]">
          {ar ? 'تم حفظ الطلب للمراجعة' : 'Enquiry saved for review'}
        </h2>
        <p className="mt-5 font-mono font-bold text-xl break-all text-[#213044] bg-[#EFE8DD] p-4 rounded-sm inline-block">
          {reference}
        </p>
        <p className="mt-6 text-sm leading-8 text-[#26323B] max-w-lg mx-auto">
          {ar
            ? 'هذا رقم مرجعي داخل تجربة مافكس؛ لا يمثل سعراً أو أمر شراء أو دفعاً أو عقد مورد.'
            : 'This reference is within a Mavvix showcase. It confirms no price, purchase order, payment or supplier contract.'}
        </p>
        <Link
          href={tradePath(locale, 'catalogue')}
          className="mt-7 inline-flex bg-[#B9442E] hover:bg-[#9B3320] text-white px-6 py-4 font-bold text-sm rounded-sm transition-colors"
        >
          {ar ? 'استكشف الكتالوج' : 'Explore catalogue'}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white border border-[#D9D2CA] rounded-sm shadow-sm">
      <div className="bg-[#213044] text-white p-7">
        <h2 className="text-3xl font-black">
          {buyer
            ? ar
              ? 'الأصناف والكميات'
              : 'Items and quantities'
            : ar
            ? 'بيانات المورد الأولية'
            : 'Supplier scope'}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#F8F4EF]">
          {ar
            ? 'طلب استطلاعي غير ملزم دون دفع مالي أو توريد مؤكد.'
            : 'Non-binding enquiry, no payment or confirmed supply.'}
        </p>
      </div>

      <fieldset disabled={busy} className="min-w-0 p-6 sm:p-9 space-y-6">
        {buyer ? (
          <>
            <div className="space-y-4">
              {lines.map((l, i) => (
                <div key={i} data-rfq-line className="bg-[#F8F4EF] border border-[#D9D2CA] p-4 rounded-sm">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-[#213044]">
                      {ar ? 'الصنف' : 'Item'} {i + 1}
                    </h3>
                    <button
                      type="button"
                      disabled={lines.length === 1}
                      onClick={() => setLines(old => old.filter((_, n) => n !== i))}
                      aria-label={(ar ? 'حذف الصنف ' : 'Remove item ') + (i + 1)}
                      className="p-2 border border-[#D9D2CA] text-[#B9442E] hover:bg-[#EFE8DD] disabled:opacity-40 transition-colors rounded-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {choose(
                    (ar ? 'اختر الصنف ' : 'Select item ') + (i + 1),
                    l.serviceSlug,
                    v => update(i, { serviceSlug: v, cartons: '2' }),
                    TRADEBRIDGE.services
                      .filter(s => s.slug === l.serviceSlug || !lines.some(x => x.serviceSlug === s.slug))
                      .map(s => [s.slug, s.title.ar, s.title.en])
                  )}

                  <label className="mt-4 block text-sm font-bold text-[#213044]">
                    {(ar ? 'عدد الكراتين للصنف ' : 'Cartons for item ') + (i + 1)}
                    <input
                      aria-label={(ar ? 'عدد الكراتين للصنف ' : 'Cartons for item ') + (i + 1)}
                      className={field}
                      type="number"
                      required
                      min={evaluated[i].item?.minCartons || 2}
                      max={evaluated[i].item?.maxCartons || 1000}
                      step="1"
                      value={l.cartons}
                      onChange={e => update(i, { cartons: e.target.value })}
                    />
                  </label>
                  <p className="mt-3 text-xs leading-7 text-[#4A5568]">
                    {ar ? 'وحدات الكرتونة التوضيحية:' : 'Illustrative units/carton:'}{' '}
                    <strong>{evaluated[i].item?.unitsPerCarton || 0}</strong>
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              data-add-rfq-line
              disabled={lines.length >= 8}
              onClick={add}
              aria-label={ar ? 'أضف صنفاً جديداً لطلب العرض' : 'Add another item line to RFQ'}
              className="inline-flex gap-2 items-center border border-[#B9442E] text-[#B9442E] hover:bg-[#FBEBE8] px-4 py-3 text-sm font-bold rounded-sm disabled:opacity-40 transition-colors"
            >
              <Plus size={18} />
              {ar ? 'أضف صنفاً' : 'Add item'}
            </button>

            <div aria-live="polite" className="bg-[#EFE8DD] p-5 text-sm leading-8 rounded-sm text-[#213044]">
              <p data-total-cartons className="font-bold">
                {ar ? 'إجمالي الكراتين:' : 'Total cartons:'} {totalCartons}
              </p>
              <p data-total-units className="font-bold">
                {ar ? 'إجمالي الوحدات التوضيحي:' : 'Illustrative units:'} {totalUnits}
              </p>
              {!valid && (
                <p className="text-red-800 font-bold mt-2">
                  {ar
                    ? 'راجع نطاق الكميات وعدم التكرار والحد الإجمالي 2000 كرتونة.'
                    : 'Review quantities, duplicate lines and the 2000-carton overall limit.'}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {choose(ar ? 'نوع المشتري' : 'Buyer type', buyerType, setBuyer, choices.buyerType)}
              {choose(
                ar ? 'تفضيل التسليم' : 'Delivery preference',
                deliveryPreference,
                setDelivery,
                choices.deliveryPreference
              )}
            </div>
          </>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {choose(ar ? 'الفئة' : 'Category', category, setCategory, choices.category)}
            {choose(ar ? 'نوع المورد' : 'Supplier type', supplierType, setSupplier, choices.supplierType)}
            {choose(ar ? 'التغطية' : 'Coverage', coverage, setCoverage, choices.coverage)}
          </div>
        )}

        <label className="block text-sm font-bold text-[#213044]">
          {ar ? 'اسم المنشأة' : 'Organization'}
          <input
            aria-label={ar ? 'اسم المنشأة' : 'Organization'}
            className={field}
            required
            minLength={2}
            maxLength={100}
            autoComplete="organization"
            value={organization}
            onChange={e => setOrg(e.target.value)}
          />
        </label>

        {choose(ar ? 'الدولة' : 'Country', country, setCountry, choices.country)}

        <label className="block text-sm font-bold text-[#213044]">
          {ar ? 'الاسم للتواصل' : 'Contact name'}
          <input
            aria-label={ar ? 'الاسم للتواصل' : 'Contact name'}
            className={field}
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            value={guestName}
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label className="block text-sm font-bold text-[#213044]">
          {ar ? 'رقم الهاتف' : 'Phone'}
          <input
            aria-label={ar ? 'رقم الهاتف' : 'Phone'}
            className={field}
            type="tel"
            required
            minLength={8}
            maxLength={24}
            autoComplete="tel"
            value={guestPhone}
            onChange={e => setPhone(e.target.value)}
          />
        </label>

        <label className="flex gap-3 text-sm leading-7 text-[#213044] cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            required
            aria-label={ar ? 'الموافقة على الشروط وحفظ البيانات' : 'Consent to terms and data processing'}
            onChange={e => setConsent(e.target.checked)}
            className="mt-1 accent-[#B9442E]"
          />
          <span>
            {ar
              ? 'أوافق على حفظ بيانات الاتصال ونطاق الطلب للمراجعة فقط.'
              : 'I consent to saving contact and scope for review only.'}{' '}
            <Link href={tradePath(locale, 'terms')} className="underline font-bold hover:text-[#B9442E]">
              {ar ? 'الشروط' : 'Terms'}
            </Link>
          </span>
        </label>

        {error && (
          <p role="alert" className="bg-red-50 text-red-800 p-4 text-sm rounded-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !consent || (buyer && !valid)}
          className="w-full min-h-14 bg-[#B9442E] hover:bg-[#9B3320] text-white px-6 py-4 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed rounded-sm transition-colors"
        >
          {busy
            ? ar
              ? 'جارٍ الحفظ...'
              : 'Saving...'
            : ar
            ? 'حفظ الطلب'
            : 'Save enquiry'}
        </button>
      </fieldset>
    </form>
  );
}
