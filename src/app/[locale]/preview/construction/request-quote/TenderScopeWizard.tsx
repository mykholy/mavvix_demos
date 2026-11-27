'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Building,
  Ruler,
  Layers,
  FileText,
  ShieldCheck,
  Printer,
  Compass
} from 'lucide-react';

interface Props {
  locale: Locale;
  initialRef?: string;
  initialService?: string;
  initialArea?: string;
}

export function TenderScopeWizard({ locale, initialRef, initialService, initialArea }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  const [step, setStep] = useState(1);
  const [sector, setSector] = useState(initialRef?.includes('office') ? 'commercial' : 'residential');
  const [projectStage, setProjectStage] = useState('new_tender');
  const [services, setServices] = useState<string[]>(
    initialService ? [initialService, 'value-engineering'] : ['fit-out', 'mep']
  );
  const [areaM2, setAreaM2] = useState<number>(initialArea ? parseInt(initialArea, 10) : 450);
  const [timeline, setTimeline] = useState('3_months');
  const [budgetBand, setBudgetBand] = useState('medium');
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [projectNotes, setProjectNotes] = useState('Requires acoustic isolation and strict milestone delivery.');

  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<{ id: string; refNumber: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function toggleService(id: string) {
    if (services.includes(id)) {
      if (services.length > 1) {
        setServices(services.filter((s) => s !== id));
      }
    } else {
      setServices([...services, id]);
    }
  }

  async function handleSubmit() {
    setError(null);
    if (areaM2 <= 0 || isNaN(areaM2)) {
      setError(isAr ? 'يجب إدخال مساحة صالحة أكبر من الصفر' : 'Gross area must be a positive number');
      return;
    }
    if (services.length < 2) {
      setError(isAr ? 'يجب اختيار خدمتين على الأقل لإعداد مقايسة دقيقة' : 'Select at least 2 services for valid scoping');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        sector,
        projectStage,
        services,
        areaM2,
        timeline,
        budgetBand,
        clientName,
        clientContact,
        projectNotes,
        referenceCase: initialRef || null,
      };

      const res = await fetch('/api/demo/construction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'construction_quote',
          payload,
          lines: services.map((s) => ({
            source_type: 'service',
            source_id: s,
            quantity: 1,
            unit_price_cents: areaM2 * 25000,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setReceipt({ id: data.submissionId, refNumber: data.refNumber });
      setStep(6); // Receipt step
    } catch (err: any) {
      setError(err.message || 'Error recording submission');
    } finally {
      setSubmitting(false);
    }
  }

  // Receipt View
  if (receipt) {
    return (
      <div className="bg-white border-2 border-stone-800 rounded-2xl p-8 sm:p-12 shadow-xl space-y-8 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest block">
                {isAr ? 'تم تسجيل المناقصة بنجاح' : 'Simulated Tender Scoped'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#162327]">
                {isAr ? 'إيصال طلب تسعير تجريبي (Demo Receipt)' : 'Simulated Demo Tender Receipt'}
              </h2>
            </div>
          </div>

          <div className="text-start sm:text-end font-mono">
            <span className="text-[11px] text-stone-600 block uppercase">{isAr ? 'رقم المرجع التجريبي' : 'Reference Code'}</span>
            <span className="text-lg font-black text-[#D97935]">{receipt.refNumber}</span>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>{isAr ? 'تنويه بيئة العرض التوضيحية:' : 'Concept Demo Disclosure:'}</strong>{' '}
            {isAr
              ? 'تم حفظ هذا الطلب في قاعدة بيانات SQLite المحلية بنجاح ومتاح للمراجعة في لوحة التحكم (Admin Studio). لم يتم إرسال أي مراسلات خارجية أو التزامات تعاقدية.'
              : 'This request has been persisted to the local SQLite database and is immediately visible in the Admin Studio queue. No real contractor or third-party was contacted.'}
          </div>
        </div>

        {/* Summary Table */}
        <div className="bg-[#F2EFE9] rounded-xl p-6 border border-stone-300/80 space-y-4 text-xs">
          <h3 className="font-bold text-[#162327] uppercase tracking-wider text-xs border-b border-stone-300 pb-2">
            {isAr ? 'ملخص النطاق الهندسي المسجل' : 'Audited Scope Specifications'}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-stone-600 block mb-0.5">{isAr ? 'القطاع' : 'Sector'}</span>
              <span className="font-bold capitalize text-[#162327]">{sector}</span>
            </div>
            <div>
              <span className="text-stone-600 block mb-0.5">{isAr ? 'المساحة التقريبية' : 'Gross Area'}</span>
              <span className="font-bold text-[#162327] font-mono">{areaM2} m²</span>
            </div>
            <div>
              <span className="text-stone-600 block mb-0.5">{isAr ? 'الجدول الزمني المستهدف' : 'Target Timeline'}</span>
              <span className="font-bold text-[#162327]">{timeline.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="text-stone-600 block mb-0.5">{isAr ? 'اسم جهة الطلب' : 'Client Identity'}</span>
              <span className="font-bold text-[#162327]">{clientName}</span>
            </div>
            <div>
              <span className="text-stone-600 block mb-0.5">{isAr ? 'البريد المسجل' : 'Contact Email'}</span>
              <span className="font-bold text-[#162327]">{clientContact}</span>
            </div>
            <div>
              <span className="text-stone-600 block mb-0.5">{isAr ? 'تاريخ التسجيل' : 'Timestamp'}</span>
              <span className="font-bold text-stone-700">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-300">
            <span className="text-stone-600 block mb-1 font-bold">{isAr ? 'الخدمات المشمولة في النطاق:' : 'Included Services:'}</span>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <span key={s} className="bg-white border border-stone-300 px-2.5 py-1 rounded text-stone-800 font-semibold uppercase text-[11px]">
                  {s.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
          <Link
            href="/admin/submissions"
            className="bg-[#162327] hover:bg-black text-white px-5 py-3 rounded-xl transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'تحقق من الطلب في لوحة التحكم (Admin Studio)' : 'Verify in Admin Studio Queue'}</span>
          </Link>

          <Link
            href={`/${locale}/preview/construction/projects`}
            className="text-[#D97935] hover:underline flex items-center gap-1"
          >
            <span>{isAr ? 'العودة لمشاريع الأطلس' : 'Return to Project Atlas'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 sm:p-10 space-y-8">
      {/* Step Indicators */}
      <div className="flex items-center justify-between pb-6 border-b border-stone-200 text-xs font-mono">
        {[
          { num: 1, label: isAr ? 'القطاع' : 'Sector' },
          { num: 2, label: isAr ? 'الخدمات والمساحة' : 'Scope & Area' },
          { num: 3, label: isAr ? 'المحددات' : 'Constraints' },
          { num: 4, label: isAr ? 'الجهة' : 'Identity' },
          { num: 5, label: isAr ? 'المراجعة' : 'Review' },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                step === s.num
                  ? 'bg-[#D97935] text-white'
                  : step > s.num
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              {s.num}
            </div>
            <span className={`hidden sm:inline ${step === s.num ? 'text-[#162327] font-bold' : 'text-stone-600'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Step 1: Building Sector & Project Stage */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#162327]">
            {isAr ? 'الخطوة 1: حدد قطاع المشروع ومرحلة الطرح' : 'Step 1: Select Building Sector & Engagement Stage'}
          </h2>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-3">
              {isAr ? 'قطاع المشروع' : 'Project Typology'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'residential', label: isAr ? 'سكني وفيلات' : 'Residential' },
                { id: 'commercial', label: isAr ? 'تجاري ومكاتب' : 'Commercial' },
                { id: 'industrial', label: isAr ? 'صناعي ومصانع' : 'Industrial' },
                { id: 'hospitality', label: isAr ? 'ضيافة وفنادق' : 'Hospitality' },
              ].map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setSector(sec.id)}
                  className={`p-4 rounded-xl border text-xs font-bold transition-all text-center ${
                    sector === sec.id
                      ? 'bg-[#162327] text-white border-[#162327]'
                      : 'bg-[#F2EFE9] text-stone-700 border-stone-300 hover:border-stone-400'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-3">
              {isAr ? 'مرحلة المشروع الحالية' : 'Current Project Stage'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'new_tender', label: isAr ? 'طرح جديد / بدون مقاول' : 'New Tender / Unawarded' },
                { id: 'design_complete', label: isAr ? 'المخططات جاهزة للمقايسة' : 'Drawings Ready for BOQ' },
                { id: 'renovation', label: isAr ? 'تجديد وإحلال منشأة قائمة' : 'Renovation / Retrofit' },
              ].map((stg) => (
                <button
                  key={stg.id}
                  type="button"
                  onClick={() => setProjectStage(stg.id)}
                  className={`p-4 rounded-xl border text-xs font-bold transition-all text-center ${
                    projectStage === stg.id
                      ? 'bg-[#162327] text-white border-[#162327]'
                      : 'bg-[#F2EFE9] text-stone-700 border-stone-300 hover:border-stone-400'
                  }`}
                >
                  {stg.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Scope Services & Area (m²) */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#162327]">
            {isAr ? 'الخطوة 2: حدد الخدمات الإنشائية والمساحة التقديرية' : 'Step 2: Scoped Services & Gross Area (m²)'}
          </h2>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
              {isAr ? 'المساحة الإجمالية للمشروع (متر مربع)' : 'Approximate Gross Area (m²)'}
            </label>
            <div className="relative max-w-xs">
              <input
                type="number"
                min="50"
                value={areaM2}
                onChange={(e) => setAreaM2(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-3 bg-[#F2EFE9] border border-stone-300 rounded-xl text-base font-bold text-[#162327] font-mono focus:outline-none focus:ring-2 focus:ring-[#D26A3B]"
              />
              <span className="absolute inset-y-0 right-4 rtl:left-4 rtl:right-auto flex items-center text-xs text-stone-600 font-mono">
                m²
              </span>
            </div>
            <p className="text-[11px] text-stone-600 mt-1">
              {isAr ? 'يجب إدخال مساحة صالحة لحساب متطلبات الأعمال وتوزيع البنود.' : 'Required for accurate BOQ material and labor allocation.'}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-3">
              {isAr ? 'الخدمات الهندسية المطلوبة (اختر اثنتين على الأقل)' : 'Required Engineering Packages (Select 2+)'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'fit-out', title: isAr ? 'تشطيبات وتجهيزات المقرات' : 'Commercial Fit-Out' },
                { id: 'structural', title: isAr ? 'التنفيذ الإنشائي والخرسانات' : 'Civil & Structural' },
                { id: 'mep', title: isAr ? 'الأعمال الكهروميكانيكية (MEP)' : 'MEP Infrastructure' },
                { id: 'value-engineering', title: isAr ? 'الهندسة القيمية وضبط التكاليف' : 'Value Engineering & BOQ' },
              ].map((srv) => (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => toggleService(srv.id)}
                  className={`p-4 rounded-xl border text-xs font-bold text-start flex items-center justify-between transition-all ${
                    services.includes(srv.id)
                      ? 'bg-[#162327] text-white border-[#162327]'
                      : 'bg-[#F2EFE9] text-stone-700 border-stone-300 hover:border-stone-400'
                  }`}
                >
                  <span>{srv.title}</span>
                  {services.includes(srv.id) && <CheckCircle2 className="w-4 h-4 text-[#D97935]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Constraints & Timeline */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#162327]">
            {isAr ? 'الخطوة 3: الجدول الزمني ومحددات الموقع' : 'Step 3: Timeline & Site Constraints'}
          </h2>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-3">
              {isAr ? 'الجدول الزمني المستهدف للتسليم' : 'Target Completion Window'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: '1_to_3_months', label: isAr ? 'عاجل (1 — 3 أشهر)' : 'Fast-track (1 — 3 months)' },
                { id: '3_to_6_months', label: isAr ? 'قياسي (3 — 6 أشهر)' : 'Standard (3 — 6 months)' },
                { id: '6_plus_months', label: isAr ? 'مشروع كبير (6+ أشهر)' : 'Phased (6+ months)' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTimeline(t.id)}
                  className={`p-4 rounded-xl border text-xs font-bold transition-all text-center ${
                    timeline === t.id
                      ? 'bg-[#162327] text-white border-[#162327]'
                      : 'bg-[#F2EFE9] text-stone-700 border-stone-300 hover:border-stone-400'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
              {isAr ? 'ملاحظات حول قيود الموقع (دخول المعدات، ساعات العمل)' : 'Site Constraints Notes'}
            </label>
            <textarea
              rows={3}
              value={projectNotes}
              onChange={(e) => setProjectNotes(e.target.value)}
              className="w-full p-3 bg-[#F2EFE9] border border-stone-300 rounded-xl text-xs text-[#162327] focus:outline-none focus:ring-2 focus:ring-[#D26A3B]"
            />
          </div>
        </div>
      )}

      {/* Step 4: Client Identity & Verification */}
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#162327]">
            {isAr ? 'الخطوة 4: بيانات جهة الطلب التجريبية' : 'Step 4: Contact & Identity (Demo Mode)'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                {isAr ? 'اسم الشركة أو المالك' : 'Client / Entity Name'}
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 bg-[#F2EFE9] border border-stone-300 rounded-xl text-xs font-bold text-[#162327] focus:outline-none focus:ring-2 focus:ring-[#D26A3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                {isAr ? 'البريد الإلكتروني' : 'Contact Email'}
              </label>
              <input
                type="email"
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
                className="w-full px-4 py-3 bg-[#F2EFE9] border border-stone-300 rounded-xl text-xs font-bold text-[#162327] focus:outline-none focus:ring-2 focus:ring-[#D26A3B]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Review & Submit */}
      {step === 5 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#162327]">
            {isAr ? 'الخطوة 5: مراجعة تفاصيل المناقصة وتأكيد الإرسال' : 'Step 5: Review Scope & Confirm Simulated Tender'}
          </h2>

          <div className="bg-[#F2EFE9] rounded-xl p-6 border border-stone-300/80 space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-stone-600 block mb-0.5">{isAr ? 'القطاع' : 'Sector'}</span>
                <span className="font-bold text-[#162327] capitalize">{sector}</span>
              </div>
              <div>
                <span className="text-stone-600 block mb-0.5">{isAr ? 'المساحة' : 'Gross Area'}</span>
                <span className="font-bold text-[#162327] font-mono">{areaM2} m²</span>
              </div>
              <div>
                <span className="text-stone-600 block mb-0.5">{isAr ? 'المرحلة' : 'Stage'}</span>
                <span className="font-bold text-[#162327]">{projectStage}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-300">
              <span className="text-stone-600 block mb-1 font-bold">{isAr ? 'الخدمات المحددة:' : 'Selected Packages:'}</span>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <span key={s} className="bg-white px-2 py-0.5 rounded border border-stone-300 font-bold uppercase text-[11px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 flex items-center gap-1.5 transition-colors"
          >
            <BackArrow className="w-3.5 h-3.5" />
            <span>{isAr ? 'السابق' : 'Back'}</span>
          </button>
        ) : <div />}

        {step < 5 ? (
          <button
            type="button"
            onClick={() => {
              if (step === 2 && (areaM2 <= 0 || isNaN(areaM2))) {
                setError(isAr ? 'يرجى إدخال مساحة صالحة' : 'Valid gross area required');
                return;
              }
              if (step === 2 && services.length < 2) {
                setError(isAr ? 'يرجى اختيار خدمتين على الأقل' : 'Select at least 2 services');
                return;
              }
              setError(null);
              setStep(step + 1);
            }}
            className="px-6 py-2.5 rounded-lg bg-[#D97935] hover:bg-[#b85629] text-white text-xs font-bold flex items-center gap-2 transition-all uppercase tracking-wider"
          >
            <span>{isAr ? 'متابعة' : 'Next Step'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            disabled={submitting}
            onClick={handleSubmit}
            className="px-8 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all uppercase tracking-wider disabled:opacity-50 shadow-md"
          >
            <span>{submitting ? (isAr ? 'جاري التسجيل في SQLite...' : 'Recording in SQLite...') : (isAr ? 'تأكيد وحفظ المناقصة التجريبية' : 'Submit Simulated Tender')}</span>
            <Arrow className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

