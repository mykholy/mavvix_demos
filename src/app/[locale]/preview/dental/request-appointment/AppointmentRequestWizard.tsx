'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { LocalizedDentalService, LocalizedDentalPractitioner } from '@/lib/db/repositories';
import {
  Calendar, CheckCircle2, AlertCircle, Clock, MapPin,
  User, ArrowRight, ArrowLeft, ShieldAlert, Sparkles, HelpCircle
} from 'lucide-react';

interface Props {
  locale: Locale;
  services: LocalizedDentalService[];
  practitioners: LocalizedDentalPractitioner[];
  locations: any[];
}

export default function AppointmentRequestWizard({
  locale,
  services,
  practitioners,
  locations,
}: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const searchParams = useSearchParams();

  // URL prefilled params
  const initialService = searchParams.get('service') || (services[0]?.slug || 'service-01');
  const initialDoctor = searchParams.get('doctor') || 'any';
  const initialBranch = searchParams.get('branch') || 'north';

  // Wizard state
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [selectedDoctor, setSelectedDoctor] = useState<string>(initialDoctor);
  const [selectedBranch, setSelectedBranch] = useState<string>(initialBranch);
  const [preferredWindow, setPreferredWindow] = useState<string>('morning');
  const [preferredDay, setPreferredDay] = useState<string>('Sunday');

  // Contact inputs
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [generalNote, setGeneralNote] = useState<string>('');

  // Status & submission
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ id: string; refNumber: string } | null>(null);

  // Sync with searchParams on mount
  useEffect(() => {
    const s = searchParams.get('service');
    if (s) setSelectedService(s);
    const d = searchParams.get('doctor');
    if (d) setSelectedDoctor(d);
    const b = searchParams.get('branch');
    if (b) setSelectedBranch(b);
  }, [searchParams]);

  const currentServiceObj = services.find(s => s.slug === selectedService) || services[0];
  const currentDoctorObj = practitioners.find(d => d.slug === selectedDoctor);
  const currentBranchObj = locations.find(l => l.slug === selectedBranch) || locations[0];

  const windows = [
    { id: 'morning', label: isAr ? 'الفترة الصباحية (9:00 ص - 12:00 م)' : 'Morning Window (9:00 AM - 12:00 PM)' },
    { id: 'afternoon', label: isAr ? 'فترة بعد الظهر (12:00 م - 4:00 م)' : 'Afternoon Window (12:00 PM - 4:00 PM)' },
    { id: 'evening', label: isAr ? 'الفترة المسائية (4:00 م - 8:00 م)' : 'Evening Window (4:00 PM - 8:00 PM)' },
  ];

  const days = isAr
    ? ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!contactName.trim() || !contactPhone.trim()) {
      setErrorMsg(isAr ? 'يرجى إدخال الاسم ورقم الهاتف للمتابعة' : 'Please provide your name and phone number to continue.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/demo/dental', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'dental_appointment',
          payload: {
            serviceSlug: selectedService,
            serviceTitle: currentServiceObj?.title || selectedService,
            doctorSlug: selectedDoctor,
            doctorName: currentDoctorObj?.name || 'Any Available Specialist',
            branchSlug: selectedBranch,
            branchName: currentBranchObj?.name || selectedBranch,
            preferredDay,
            preferredWindow,
            guestName: contactName,
            guestPhone: contactPhone,
            guestEmail: contactEmail.trim(),
            generalNote: generalNote.trim()
          },
          lines: [
            {
              source_type: 'dental_service',
              source_id: currentServiceObj?.id || 'svc-01',
              quantity: 1,
              snapshot: { title: currentServiceObj?.title || 'Dental Consultation' },
              unit_price_cents: currentServiceObj?.base_price_cents || 45000,
              total_price_cents: currentServiceObj?.base_price_cents || 45000
            }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setReceipt({
        id: data.submissionId,
        refNumber: data.refNumber
      });
      setStep(4); // Receipt step
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If receipt is shown
  if (receipt) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#7AC7A5] shadow-lg max-w-2xl mx-auto space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-[#EDF5F2] text-[#193A39] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#2C5251]" />
        </div>

        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5251] bg-[#EDF5F2] px-3 py-1 rounded-full">
            {isAr ? 'تم استلام طلب الاستشارة التجريبي' : 'Simulated Request Received'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#193A39]">
            {isAr ? 'شكراً لاهتمامك بعيادة لومِن' : 'Thank You for Choosing Lumen'}
          </h2>
          <p className="text-xs sm:text-sm text-[#557874]">
            {isAr
              ? 'تم تسجيل طلب نافذة الاستشارة بنجاح داخل قاعدة بيانات العرض التجريبي.'
              : 'Your appointment consultation preference has been persisted to the demo database.'}
          </p>
        </div>

        {/* Reference & Details Box */}
        <div className="p-5 rounded-2xl bg-[#F8FBFA] border border-[#E0EBE7] space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#EAEFEF]">
            <span className="text-[#557874]">{isAr ? 'الرقم المرجعي للطلب:' : 'Reference ID:'}</span>
            <span className="font-mono font-bold text-[#193A39]">{receipt.refNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#557874]">{isAr ? 'الخدمة المطلوبة:' : 'Requested Service:'}</span>
            <span className="font-semibold text-[#193A39]">{currentServiceObj?.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#557874]">{isAr ? 'الفرع المفضل:' : 'Studio Location:'}</span>
            <span className="font-semibold text-[#193A39]">{currentBranchObj?.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#557874]">{isAr ? 'اليوم والفترة:' : 'Preferred Window:'}</span>
            <span className="font-semibold text-[#193A39]">{preferredDay} • {preferredWindow}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#557874]">{isAr ? 'المراجع:' : 'Patient Name:'}</span>
            <span className="font-semibold text-[#193A39]">{contactName} ({contactPhone})</span>
          </div>
        </div>

        {/* Honest Non-confirmation Disclaimer */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold">
              {isAr ? 'تنويه تجريبي: هذا ليس تأكيد حجز طبي فعلي' : 'Demo Notice: This is NOT a confirmed medical booking'}
            </h4>
            <p className="text-amber-800 leading-relaxed">
              {isAr
                ? 'هذا الطلب هو محاكاة برمجية ضمن نموذج مافيكس التجريبي لعيادات الأسنان. لم يتم تحصيل أي مبالغ مالية ولم يتم حجز مقعد سريري حقيقي.'
                : 'This is a simulated request recorded in the demonstration SQLite database. No actual appointment has been secured.'}
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/${locale}/preview/dental/patient-guide`}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#193A39] hover:bg-[#234B49] text-white text-xs font-semibold text-center transition-colors"
          >
            {isAr ? 'عرض دليل الزيارة الأولى' : 'Explore First-Visit Guide'}
          </Link>
          <Link
            href={`/${locale}/preview/dental`}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-[#CDE0D9] text-[#193A39] text-xs font-semibold text-center hover:bg-[#EDF5F2] transition-colors"
          >
            {isAr ? 'العودة للرئيسية' : 'Return to Home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E0EBE7] shadow-sm max-w-3xl mx-auto space-y-8">
      {/* Wizard Steps Header */}
      <div className="flex items-center justify-between border-b border-[#EAEFEF] pb-4">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s
                    ? 'bg-[#193A39] text-[#EDF5F2]'
                    : step > s
                    ? 'bg-[#7AC7A5] text-[#193A39]'
                    : 'bg-[#EDF5F2] text-[#557874]'
                }`}
              >
                {step > s ? '✓' : s}
              </div>
              <span className={`text-xs font-medium hidden sm:inline ${step === s ? 'text-[#193A39] font-bold' : 'text-[#557874]'}`}>
                {s === 1 && (isAr ? 'الخدمة والفرع' : 'Service & Branch')}
                {s === 2 && (isAr ? 'الطبيب والموعد' : 'Doctor & Window')}
                {s === 3 && (isAr ? 'بيانات المتابعة' : 'Contact Details')}
              </span>
              {s < 3 && <div className="w-4 h-0.5 bg-[#EAEFEF]" />}
            </div>
          ))}
        </div>
        <span className="text-xs font-mono text-[#557874]">
          {isAr ? `خطوة ${step} من 3` : `Step ${step} of 3`}
        </span>
      </div>

      {/* Safety Notice on Medical PII */}
      <div className="p-3.5 rounded-xl bg-[#EDF5F2] border border-[#D5E3DE] text-[#2C5251] text-xs flex items-center gap-2.5">
        <ShieldAlert className="w-4 h-4 text-[#2C5251] flex-shrink-0" />
        <span>
          {isAr
            ? 'لحماية خصوصيتك: هذا النموذج مخصص لاختيار تفضيل الموعد فقط؛ يرجى عدم كتابة أي أعراض أو تفاصيل طبية.'
            : 'Privacy safeguard: Use this form for logistical preferences only. Do not disclose medical symptoms or histories.'}
        </span>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: Service & Branch */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#193A39]">
              {isAr ? '1. اختر الخدمة أو الاستشارة المطلوبة' : '1. Choose Consultation or Service'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map(s => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setSelectedService(s.slug)}
                  className={`p-3.5 rounded-xl border text-left rtl:text-right transition-all flex flex-col justify-between ${
                    selectedService === s.slug
                      ? 'bg-[#F2F8F5] border-[#193A39] text-[#193A39] shadow-sm'
                      : 'bg-[#F8FBFA] border-[#E8F0ED] text-[#557874] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-serif text-xs font-bold text-[#193A39]">{s.title}</span>
                    <span className="text-[10px] font-semibold uppercase text-[#2C5251] bg-[#EDF5F2] px-1.5 py-0.5 rounded">
                      {s.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#557874] line-clamp-1">{s.summary}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#EAEFEF]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#193A39]">
              {isAr ? '2. اختر استوديو لومِن المفضل' : '2. Select Preferred Studio Branch'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {locations.map(loc => (
                <button
                  type="button"
                  key={loc.id}
                  onClick={() => setSelectedBranch(loc.slug)}
                  className={`p-3.5 rounded-xl border text-left rtl:text-right transition-all ${
                    selectedBranch === loc.slug
                      ? 'bg-[#F2F8F5] border-[#193A39] text-[#193A39] shadow-sm'
                      : 'bg-[#F8FBFA] border-[#E8F0ED] text-[#557874] hover:bg-white'
                  }`}
                >
                  <span className="font-serif text-xs font-bold text-[#193A39] block">{loc.name}</span>
                  <span className="text-[11px] text-[#557874] block mt-0.5">{loc.area}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-[#193A39] hover:bg-[#234B49] text-white text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <span>{isAr ? 'المتابعة لاختيار الطبيب والموعد' : 'Continue to Specialist & Window'}</span>
              <Arrow className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Doctor & Window */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#193A39]">
              {isAr ? '1. اختر الطبيب المتخصص (اختياري)' : '1. Select Practitioner (Optional)'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedDoctor('any')}
                className={`p-3.5 rounded-xl border text-left rtl:text-right transition-all ${
                  selectedDoctor === 'any'
                    ? 'bg-[#F2F8F5] border-[#193A39] text-[#193A39] shadow-sm'
                    : 'bg-[#F8FBFA] border-[#E8F0ED] text-[#557874] hover:bg-white'
                }`}
              >
                <span className="font-serif text-xs font-bold text-[#193A39] block">
                  {isAr ? 'أي طبيب متاح في الموعد' : 'Any Available Specialist'}
                </span>
                <span className="text-[11px] text-[#557874]">
                  {isAr ? 'أقرب نافذة استشارة مناسبة' : 'Fastest matching consultation window'}
                </span>
              </button>

              {practitioners.map(doc => (
                <button
                  type="button"
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc.slug)}
                  className={`p-3.5 rounded-xl border text-left rtl:text-right transition-all ${
                    selectedDoctor === doc.slug
                      ? 'bg-[#F2F8F5] border-[#193A39] text-[#193A39] shadow-sm'
                      : 'bg-[#F8FBFA] border-[#E8F0ED] text-[#557874] hover:bg-white'
                  }`}
                >
                  <span className="font-serif text-xs font-bold text-[#193A39] block">{doc.name}</span>
                  <span className="text-[11px] text-[#557874] block">{doc.focus}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#EAEFEF]">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#193A39]">
                {isAr ? '2. اليوم المفضل للاستشارة' : '2. Preferred Day of Week'}
              </label>
              <div className="flex flex-wrap gap-2">
                {days.map(d => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setPreferredDay(d)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      preferredDay === d
                        ? 'bg-[#193A39] text-[#EDF5F2]'
                        : 'bg-[#EDF5F2]/70 text-[#2C5251] hover:bg-[#EDF5F2]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#193A39]">
                {isAr ? '3. الفترة الزمنية المناسبة' : '3. Preferred Time Window'}
              </label>
              <div className="space-y-2">
                {windows.map(w => (
                  <button
                    type="button"
                    key={w.id}
                    onClick={() => setPreferredWindow(w.id)}
                    className={`w-full p-3 rounded-xl border text-left rtl:text-right text-xs font-medium transition-all ${
                      preferredWindow === w.id
                        ? 'bg-[#F2F8F5] border-[#193A39] text-[#193A39] font-bold'
                        : 'bg-[#F8FBFA] border-[#E8F0ED] text-[#557874] hover:bg-white'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-[#557874] hover:text-[#193A39]"
            >
              {isAr ? '← الخطوة السابقة' : '← Previous Step'}
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-xl bg-[#193A39] hover:bg-[#234B49] text-white text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <span>{isAr ? 'المتابعة لبيانات التواصل' : 'Continue to Contact Details'}</span>
              <Arrow className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Guest Contact & Submit */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#193A39] mb-1">
                {isAr ? 'الاسم بالكامل (أو اسم افتراضي للعرض)' : 'Full Name (or Demo Guest Name) *'}
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                placeholder={isAr ? 'مثال: سارة محمد (عرض تجريبي)' : 'e.g., Sarah Jenkins (Demo Guest)'}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5E3DE] bg-[#F8FBFA] text-xs text-[#193A39] focus:outline-none focus:ring-2 focus:ring-[#193A39]/20 focus:border-[#193A39]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#193A39] mb-1">
                  {isAr ? 'رقم الهاتف للتواصل *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  placeholder="+20 100 000 0000"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5E3DE] bg-[#F8FBFA] text-xs text-[#193A39] focus:outline-none focus:ring-2 focus:ring-[#193A39]/20 focus:border-[#193A39]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#193A39] mb-1">
                  {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email Address (Optional)'}
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  placeholder="demo@mavvix.test"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5E3DE] bg-[#F8FBFA] text-xs text-[#193A39] focus:outline-none focus:ring-2 focus:ring-[#193A39]/20 focus:border-[#193A39]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#193A39] mb-1">
                {isAr ? 'ملاحظات تنظيمية لوجستية (بدون تفاصيل طبية)' : 'Logistical Notes (No medical details)'}
              </label>
              <textarea
                rows={2}
                value={generalNote}
                onChange={e => setGeneralNote(e.target.value)}
                placeholder={isAr ? 'مثال: أفضل الحضور برفقة طفلي الصغير، أحتاج كرسي متحرك' : 'e.g., Requesting wheelchair access assistance upon arrival'}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D5E3DE] bg-[#F8FBFA] text-xs text-[#193A39] focus:outline-none focus:ring-2 focus:ring-[#193A39]/20 focus:border-[#193A39]"
              />
            </div>
          </div>

          {/* Summary Preview */}
          <div className="p-4 rounded-xl bg-[#F8FBFA] border border-[#E0EBE7] text-xs space-y-1.5">
            <h4 className="font-bold text-[#193A39]">{isAr ? 'ملخص طلب الاستشارة:' : 'Summary of Request:'}</h4>
            <div className="text-[#557874] flex justify-between">
              <span>{isAr ? 'الخدمة:' : 'Service:'}</span>
              <span className="font-semibold text-[#193A39]">{currentServiceObj?.title}</span>
            </div>
            <div className="text-[#557874] flex justify-between">
              <span>{isAr ? 'الفرع:' : 'Branch:'}</span>
              <span className="font-semibold text-[#193A39]">{currentBranchObj?.name}</span>
            </div>
            <div className="text-[#557874] flex justify-between">
              <span>{isAr ? 'التوقيت:' : 'Window:'}</span>
              <span className="font-semibold text-[#193A39]">{preferredDay} • {preferredWindow}</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-semibold text-[#557874] hover:text-[#193A39]"
            >
              {isAr ? '← الخطوة السابقة' : '← Previous Step'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-[#193A39] hover:bg-[#234B49] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow disabled:opacity-50"
            >
              <Calendar className="w-4 h-4 text-[#7AC7A5]" />
              <span>{isSubmitting ? (isAr ? 'جاري التسجيل...' : 'Recording...') : (isAr ? 'إرسال طلب الاستشارة التجريبي' : 'Send Simulated Request')}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
