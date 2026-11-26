'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { LocalizedPortfolioService, LocalizedProject } from '@/lib/db/repositories';
import {
  Sparkles, CheckCircle2, AlertCircle, ArrowUpRight,
  ArrowRight, ArrowLeft, Send, Clock, Layers
} from 'lucide-react';

interface Props {
  locale: Locale;
  services: LocalizedPortfolioService[];
  cases: LocalizedProject[];
}

export default function ProjectBriefIntakeWizard({
  locale,
  services,
  cases
}: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const searchParams = useSearchParams();

  const prefillService = searchParams.get('service') || '';
  const prefillCase = searchParams.get('case') || '';

  const [step, setStep] = useState(1);

  // Form states
  const [selectedServiceSlug, setSelectedServiceSlug] = useState(prefillService || services[0]?.slug || 'brand-identity');
  const [referencedCaseSlug, setReferencedCaseSlug] = useState(prefillCase);
  const [projectGoal, setProjectGoal] = useState('');
  const [timelineWindow, setTimelineWindow] = useState('q1-2027');
  const [budgetBand, setBudgetBand] = useState('growth');

  // Contact info
  const [clientName, setClientName] = useState('');
  const [clientOrganization, setClientOrganization] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ id: string; refNumber: string } | null>(null);

  useEffect(() => {
    const s = searchParams.get('service');
    if (s) setSelectedServiceSlug(s);
    const c = searchParams.get('case');
    if (c) setReferencedCaseSlug(c);
  }, [searchParams]);

  const selectedServiceObj = services.find(s => s.slug === selectedServiceSlug) || services[0];

  const budgetBands = [
    { id: 'pilot', label: isAr ? 'استكشافي / استشارة محدودة (15k - 30k EGP)' : 'Pilot / Fractional Advisory (15k - 30k EGP)' },
    { id: 'growth', label: isAr ? 'مشروع هوية أو منصة متكاملة (40k - 80k EGP)' : 'Growth / Full System Execution (40k - 80k EGP)' },
    { id: 'enterprise', label: isAr ? 'تحول مؤسسي شامل أو عقد احتفاظ سنوي (90k+ EGP)' : 'Enterprise / Annual Retainer (90k+ EGP)' },
  ];

  const timelineWindows = [
    { id: 'immediate', label: isAr ? 'البدء الفوري (خلال شهر)' : 'Immediate (Within 4 weeks)' },
    { id: 'q1-2027', label: isAr ? 'الربع الأول 2027' : 'Q1 2027 Window' },
    { id: 'q2-2027', label: isAr ? 'الربع الثاني 2027' : 'Q2 2027 Planning' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!clientName.trim() || !clientEmail.trim()) {
      setErrorMessage(isAr ? 'يرجى إدخال الاسم والبريد الإلكتروني' : 'Please provide client name and email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/demo/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'portfolio_inquiry',
          payload: {
            serviceSlug: selectedServiceSlug,
            serviceName: selectedServiceObj?.name,
            referencedCaseSlug,
            projectGoal: projectGoal.trim() || 'Comprehensive strategic rebranding inquiry',
            timelineWindow,
            budgetBand,
            clientName,
            clientOrganization,
            clientEmail,
            clientPhone,
            submittedAt: new Date().toISOString()
          },
          lines: [
            {
              source_type: 'portfolio_service',
              source_id: selectedServiceObj?.id || 'port-svc-1',
              quantity: 1,
              unit_price_cents: 5000000,
              snapshot: {
                name: selectedServiceObj?.name,
                timeline: selectedServiceObj?.timeline
              }
            }
          ]
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit project brief');
      }

      setReceipt({
        id: data.submissionId,
        refNumber: data.refNumber
      });
      setStep(4);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Receipt State
  if (receipt) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0F0F10] shadow-xl max-w-2xl mx-auto space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-[#0F0F10] text-[#CCFF00] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="text-center space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#737068] bg-[#F6F5F2] px-3 py-1 rounded-full border border-[#E2E0D8]">
            {isAr ? 'تم استلام موجز المشروع التجريبي' : 'Simulated Project Brief Stored in SQLite'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0F10]">
            {isAr ? 'شكراً لاهتمامك بالتعاقد مع الاستوديو' : 'Brief Received for Advisory Review'}
          </h2>
          <p className="text-xs sm:text-sm text-[#57544C]">
            {isAr ? 'الرقم المرجعي للاستفسار:' : 'Inquiry Reference:'} <strong className="font-mono text-[#0F0F10]">{receipt.refNumber}</strong>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#F6F5F2] border border-[#E2E0D8] space-y-2.5 font-mono text-xs">
          <div className="flex justify-between border-b border-[#E2E0D8] pb-2">
            <span className="text-[#737068]">{isAr ? 'الخدمة المختارة:' : 'Service:'}</span>
            <span className="font-bold text-[#0F0F10]">{selectedServiceObj?.name}</span>
          </div>
          {referencedCaseSlug && (
            <div className="flex justify-between border-b border-[#E2E0D8] pb-2">
              <span className="text-[#737068]">{isAr ? 'دراسة الحالة المرجعية:' : 'Referenced Case:'}</span>
              <span className="font-bold text-[#0F0F10]">{referencedCaseSlug}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-[#E2E0D8] pb-2">
            <span className="text-[#737068]">{isAr ? 'الجدول الزمني المستهدف:' : 'Timeline Window:'}</span>
            <span className="font-bold text-[#0F0F10]">{timelineWindow}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#737068]">{isAr ? 'جهة الاتصال:' : 'Contact:'}</span>
            <span className="font-bold text-[#0F0F10]">{clientName} ({clientEmail})</span>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold">
              {isAr ? 'إشعار العرض التجريبي لمافيكس' : 'Mavvix Demonstrator Notice'}
            </h4>
            <p className="text-amber-800 leading-relaxed font-sans">
              {isAr
                ? 'هذا استفسار تمثيلي مسجل داخل قاعدة بيانات العرض التجريبي ولا يمثل حجز استشارة أو تعاقداً فعلياً.'
                : 'This submission represents a recorded demonstration scenario in our private SQLite database. No actual booking has occurred.'}
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
          <Link
            href={`/${locale}/preview/portfolio/work`}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F0F10] text-[#CCFF00] font-bold text-center"
          >
            {isAr ? 'استعراض المزيد من الأعمال' : 'Explore More Work'}
          </Link>
          <Link
            href={`/${locale}/preview/portfolio`}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-[#DDD9CE] text-[#0F0F10] font-bold text-center"
          >
            {isAr ? 'العودة للرئيسية' : 'Return Home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E0D8] shadow-sm max-w-3xl mx-auto space-y-8">
      {/* Wizard Step Progression */}
      <div className="flex items-center justify-between border-b border-[#E2E0D8] pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step === s
                    ? 'bg-[#0F0F10] text-[#CCFF00]'
                    : step > s
                    ? 'bg-[#EAE8E1] text-[#0F0F10]'
                    : 'bg-[#F6F5F2] text-[#737068]'
                }`}
              >
                {step > s ? '✓' : s}
              </div>
              <span className={`hidden sm:inline ${step === s ? 'font-bold text-[#0F0F10]' : 'text-[#737068]'}`}>
                {s === 1 && (isAr ? 'نطاق الخدمة' : 'Service Scope')}
                {s === 2 && (isAr ? 'الأهداف والجدول' : 'Goals & Timing')}
                {s === 3 && (isAr ? 'بيانات التواصل' : 'Contact Details')}
              </span>
              {s < 3 && <div className="w-4 h-0.5 bg-[#E2E0D8]" />}
            </div>
          ))}
        </div>
        <span className="text-[#737068]">
          Step {step} of 3
        </span>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: Select Service Scope */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-[#0F0F10]">
              {isAr ? '1. اختر حزمة التعاقد أو نطاق الخدمة' : '1. Select Desired Engagement Model'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map(svc => (
                <button
                  type="button"
                  key={svc.id}
                  onClick={() => setSelectedServiceSlug(svc.slug)}
                  className={`p-4 rounded-2xl border text-left rtl:text-right transition-all flex flex-col justify-between ${
                    selectedServiceSlug === svc.slug
                      ? 'bg-[#0F0F10] text-[#CCFF00] border-[#0F0F10] shadow-sm'
                      : 'bg-[#F6F5F2] border-[#E2E0D8] text-[#57544C] hover:bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-serif text-sm font-bold block">{svc.name}</span>
                    <span className="text-[11px] font-mono block opacity-80">{svc.timeline}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {cases.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-[#E2E0D8]">
              <label className="block font-mono text-xs font-bold uppercase tracking-widest text-[#0F0F10]">
                {isAr ? '2. هل تود الإشارة إلى دراسة حالة مرجعية؟ (اختياري)' : '2. Reference an Existing Case Study? (Optional)'}
              </label>
              <select
                aria-label={isAr ? 'دراسة حالة مرجعية' : 'Reference case study'}
            value={referencedCaseSlug}
                onChange={e => setReferencedCaseSlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F6F5F2] border border-[#DDD9CE] font-mono text-xs text-[#0F0F10] focus:outline-none"
              >
                <option value="">{isAr ? '— لا توجد دراسة محددة —' : '— No specific case reference —'}</option>
                {cases.map(c => (
                  <option key={c.id} value={c.slug}>
                    {c.title} ({c.project_type || 'Case'})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-[#0F0F10] hover:bg-[#262629] text-[#CCFF00] font-mono text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <span>{isAr ? 'المتابعة للأهداف والجدول' : 'Continue to Goals & Timing'}</span>
              <Arrow className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Goals, Budget & Timing */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-[#0F0F10]">
              {isAr ? '1. ما هو التحدي أو الهدف الرئيسي للمشروع؟' : '1. Primary Challenge or Project Ambition'}
            </label>
            <textarea
              rows={3}
              value={projectGoal}
              onChange={e => setProjectGoal(e.target.value)}
              placeholder={isAr ? 'مثال: نحتاج إلى إعادة هيكلة الهوية البصرية لدعم توسع إقليمي خلال الربع القادم...' : 'e.g., Establishing an authoritative visual system ahead of regional market expansion...'}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F6F5F2] border border-[#DDD9CE] text-xs text-[#0F0F10] focus:outline-none focus:ring-2 focus:ring-[#0F0F10]/20"
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-[#0F0F10]">
              {isAr ? '2. الميزانية التقديرية المخصصة (أمثلة استرشادية)' : '2. Indicative Budget Band (Sample)'}
            </label>
            <div className="space-y-2">
              {budgetBands.map(b => (
                <button
                  type="button"
                  key={b.id}
                  onClick={() => setBudgetBand(b.id)}
                  className={`w-full p-3 rounded-xl border text-left rtl:text-right font-mono text-xs transition-all ${
                    budgetBand === b.id
                      ? 'bg-[#0F0F10] text-[#CCFF00] border-[#0F0F10] font-bold'
                      : 'bg-[#F6F5F2] border-[#E2E0D8] text-[#57544C] hover:bg-white'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-[#0F0F10]">
              {isAr ? '3. موعد البدء المستهدف' : '3. Target Launch Window'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
              {timelineWindows.map(tw => (
                <button
                  type="button"
                  key={tw.id}
                  onClick={() => setTimelineWindow(tw.id)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    timelineWindow === tw.id
                      ? 'bg-[#0F0F10] text-[#CCFF00] font-bold border-[#0F0F10]'
                      : 'bg-[#F6F5F2] border-[#E2E0D8] text-[#57544C] hover:bg-white'
                  }`}
                >
                  {tw.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between font-mono text-xs">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[#737068] hover:text-[#0F0F10]"
            >
              {isAr ? '← الخطوة السابقة' : '← Previous Step'}
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-xl bg-[#0F0F10] hover:bg-[#262629] text-[#CCFF00] font-bold flex items-center gap-2 transition-colors"
            >
              <span>{isAr ? 'المتابعة لبيانات التواصل' : 'Continue to Contact'}</span>
              <Arrow className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Contact & Submit */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-bold text-[#0F0F10] mb-1">
                  {isAr ? 'اسم المسؤول *' : 'Client Representative Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder={isAr ? 'مثال: مروان خليل' : 'e.g. Marwan Khalil'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F6F5F2] border border-[#DDD9CE] text-xs text-[#0F0F10] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-[#0F0F10] mb-1">
                  {isAr ? 'اسم الشركة أو المؤسسة' : 'Company / Venture Name'}
                </label>
                <input
                  type="text"
                  value={clientOrganization}
                  onChange={e => setClientOrganization(e.target.value)}
                  placeholder="Studio Apex / Venture"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F6F5F2] border border-[#DDD9CE] text-xs text-[#0F0F10] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-bold text-[#0F0F10] mb-1">
                  {isAr ? 'البريد الإلكتروني المهني *' : 'Professional Email *'}
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  placeholder="founder@venture.test"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F6F5F2] border border-[#DDD9CE] text-xs text-[#0F0F10] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-[#0F0F10] mb-1">
                  {isAr ? 'رقم الهاتف' : 'Phone / WhatsApp'}
                </label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  placeholder="+20 100 000 0000"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F6F5F2] border border-[#DDD9CE] text-xs text-[#0F0F10] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Review Summary */}
          <div className="p-4 rounded-2xl bg-[#F6F5F2] border border-[#E2E0D8] space-y-1.5 font-mono text-xs">
            <span className="font-bold text-[#0F0F10] block">{isAr ? 'ملخص طلب الموجز:' : 'Brief Summary:'}</span>
            <div className="text-[#57544C] flex justify-between">
              <span>{isAr ? 'الخدمة:' : 'Service:'}</span>
              <strong className="text-[#0F0F10]">{selectedServiceObj?.name}</strong>
            </div>
            <div className="text-[#57544C] flex justify-between">
              <span>{isAr ? 'الميزانية:' : 'Budget:'}</span>
              <strong className="text-[#0F0F10]">{budgetBand}</strong>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between font-mono text-xs">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-[#737068] hover:text-[#0F0F10]"
            >
              {isAr ? '← الخطوة السابقة' : '← Previous Step'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-[#0F0F10] hover:bg-[#262629] text-[#CCFF00] font-bold flex items-center gap-2 transition-all shadow disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? (isAr ? 'جاري الإرسال...' : 'Sending...') : (isAr ? 'إرسال موجز المشروع (تجريبي)' : 'Submit Project Brief')}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

