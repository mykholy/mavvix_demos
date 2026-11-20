'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LocalizedRestaurantBranch } from '@/lib/db/repositories';

export function TableBookingWizard({
  branches,
  slots,
  locale,
}: {
  branches: LocalizedRestaurantBranch[];
  slots: any[];
  locale: 'ar' | 'en';
}) {
  const isAr = locale === 'ar';
  const searchParams = useSearchParams();

  const preselectedBranch = searchParams.get('branch') || branches[0]?.id || 'rest-branch-1';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [branchId, setBranchId] = useState(preselectedBranch);
  const [partySize, setPartySize] = useState<number>(2);
  const [seatingPreference, setSeatingPreference] = useState<'indoor' | 'courtyard' | 'private'>('courtyard');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<any | null>(null);

  const selectedBranch = branches.find(b => b.id === branchId) || branches[0];
  const branchSlots = slots.filter(s => s.owner_id === branchId);

  // Filter slots for the current branch and set default slot if not set
  React.useEffect(() => {
    const available = branchSlots.find(s => s.status === 'available');
    if (available && (!selectedSlotId || !branchSlots.some(s => s.id === selectedSlotId))) {
      setSelectedSlotId(available.id);
    }
  }, [branchId]);

  const handleStep1Next = () => {
    setValidationError(null);
    if (!partySize || partySize < 1 || partySize > 8) {
      setValidationError(isAr ? 'عدد الضيوف يجب أن يكون بين ١ و ٨ أفراد.' : 'Party size must be between 1 and 8 guests.');
      return;
    }
    setStep(2);
  };

  const handleStep2Next = () => {
    setValidationError(null);
    if (!selectedSlotId) {
      setValidationError(isAr ? 'يرجى اختيار نافذة وقت متاحة للحجز.' : 'Please select an available dining slot.');
      return;
    }
    const chosen = branchSlots.find(s => s.id === selectedSlotId);
    if (chosen && chosen.status !== 'available') {
      setValidationError(isAr ? 'هذا الموعد محجوز بالكامل، يرجى اختيار موعد آخر.' : 'Selected slot is unavailable. Please select another time window.');
      return;
    }
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!partySize || partySize < 1 || partySize > 8) {
      setValidationError(isAr ? 'عدد الضيوف يجب أن يكون بين ١ و ٨ أفراد.' : 'Party size must be between 1 and 8 guests.');
      return;
    }

    setSubmitting(true);

    const slotObj = branchSlots.find(s => s.id === selectedSlotId);

    const payload = {
      branchId,
      branchName: selectedBranch.name,
      partySize,
      seatingPreference,
      date,
      slotId: selectedSlotId,
      timeSlot: slotObj ? slotObj.starts_at : '19:00',
      guestName,
      guestPhone,
      guestNotes,
    };

    try {
      const res = await fetch('/api/demo/restaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'restaurant_table',
          payload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit table request');
      }

      setReceipt({
        refNumber: data.refNumber,
        submissionId: data.submissionId,
        order: data.order,
        branch: selectedBranch.name,
        time: slotObj ? slotObj.starts_at : '19:00',
        date,
        partySize,
      });
    } catch (err: any) {
      setValidationError(err.message || 'Error recording table request');
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#321F18]/15 p-8 sm:p-12 shadow-xl space-y-8 text-start">
        <div className="text-center space-y-2 border-b border-[#321F18]/10 pb-6">
          <span className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-2xl mx-auto">
            ✓
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#BA5C34] block">
            {isAr ? 'حالة الطلب: قيد المراجعة التوضيحية (REQUESTED)' : 'STATUS: REQUESTED (DEMO ONLY)'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#321F18]">
            {isAr ? 'تم استلام طلب حجز الطاولة التجريبي' : 'Table Request Received in SQLite'}
          </h2>
          <p className="text-xs text-[#321F18]/70 max-w-md mx-auto leading-relaxed">
            {receipt.order?.confirmationNote || (isAr
              ? 'طلب حجز تجريبي استعراضي — لا يمثل تأكيدًا نهائيًا ولا يحجز مقعدًا حقيقيًا.'
              : 'Demonstrative table request — recorded in SQLite as REQUESTED, not an active booking.')}
          </p>
        </div>

        {/* Receipt Details Box */}
        <div className="p-6 rounded-2xl bg-[#FAF3E6] border border-[#321F18]/10 space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-[#321F18]/60">{isAr ? 'الرقم المرجعي:' : 'Reference Number:'}</span>
            <span className="font-mono font-bold text-[#BA5C34] text-sm">{receipt.refNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#321F18]/60">{isAr ? 'الفرع المحدد:' : 'Selected Pavilion:'}</span>
            <span className="font-semibold text-[#321F18]">{receipt.branch}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#321F18]/60">{isAr ? 'تاريخ الحجز:' : 'Date:'}</span>
            <span className="font-semibold text-[#321F18]">{receipt.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#321F18]/60">{isAr ? 'وقت الجلسة:' : 'Time Window:'}</span>
            <span className="font-semibold text-[#321F18]">{receipt.time}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#321F18]/60">{isAr ? 'عدد الضيوف:' : 'Party Size:'}</span>
            <span className="font-semibold text-[#321F18]">{receipt.partySize} {isAr ? 'أفراد' : 'guests'}</span>
          </div>
        </div>

        {/* Commercial Banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
          <p className="font-semibold">
            {isAr ? 'ميزات نظام حجوزات مافيكس للمطاعم' : 'Mavvix Restaurant Reservation Engine'}
          </p>
          <p className="text-[11px] text-amber-800">
            {isAr
              ? 'يدعم النظام تحديد سعة الطاولات الحية، رسائل التأكيد عبر WhatsApp، وتخصيص الجلسات الداخلية والخارجية.'
              : 'Our commercial platform supports live seating capacity grids, automated WhatsApp guest confirmations, and floor plans.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/${locale}/preview/restaurant/menu`}
            className="w-full sm:w-1/2 py-3.5 rounded-xl bg-[#BA5C34] text-white text-center font-semibold text-xs hover:bg-[#9E4A28] transition-colors"
          >
            {isAr ? 'استكشف قائمة الطعام' : 'Explore Menu'}
          </Link>
          <button
            type="button"
            onClick={() => {
              setReceipt(null);
              setStep(1);
            }}
            className="w-full sm:w-1/2 py-3.5 rounded-xl bg-[#FAF3E6] border border-[#321F18]/20 text-[#321F18] text-center font-semibold text-xs hover:bg-[#FAF3E6]/70 transition-colors"
          >
            {isAr ? 'إجراء حجز تجريبي آخر' : 'Submit Another Request'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#321F18]/15 p-8 sm:p-12 shadow-xl space-y-8 text-start">
      {/* Step Indicator */}
      <div className="flex items-center justify-between border-b border-[#321F18]/10 pb-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#BA5C34]">
            {isAr ? `الخطوة ${step} من ٣` : `Step ${step} of 3`}
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#321F18] mt-1">
            {step === 1 && (isAr ? 'اختيار الفرع وعدد الضيوف' : 'Pavilion & Party Size')}
            {step === 2 && (isAr ? 'الموعد وتوقيت الجلسة' : 'Date & Dining Slot')}
            {step === 3 && (isAr ? 'بيانات الضيف والملاحظات' : 'Guest Details & Submission')}
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map(s => (
            <span
              key={s}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                s === step
                  ? 'bg-[#BA5C34] text-white'
                  : s < step
                  ? 'bg-[#8B8B52] text-white'
                  : 'bg-[#FAF3E6] text-[#321F18]/40'
              }`}
            >
              {s < step ? '✓' : s}
            </span>
          ))}
        </div>
      </div>

      {validationError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
          {validationError}
        </div>
      )}

      {/* Step 1: Branch & Party Size */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Branch Radio Cards */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
              {isAr ? 'اختر فرع سفرة زعفران:' : 'Select Dining Pavilion:'}
            </label>
            <div className="space-y-2.5">
              {branches.map(b => (
                <label
                  key={b.id}
                  className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    branchId === b.id
                      ? 'border-[#BA5C34] bg-[#FAF3E6]/60 shadow-sm'
                      : 'border-[#321F18]/15 hover:border-[#BA5C34]/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="branch"
                      value={b.id}
                      checked={branchId === b.id}
                      onChange={() => setBranchId(b.id)}
                      className="accent-[#BA5C34] mt-1"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#321F18]">{b.name}</h4>
                      <p className="text-xs text-[#321F18]/60 mt-0.5">{b.address}</p>
                      <span className="text-[11px] text-[#8B8B52] block mt-1">{b.seating}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#BA5C34] whitespace-nowrap">
                    {b.district}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Party Size (1 to 8) */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
                {isAr ? 'عدد الضيوف (الحد الأقصى ٨):' : 'Party Size (Max 8):'}
              </label>
              <span className="text-xs font-mono font-bold text-[#BA5C34]">
                {partySize} {isAr ? 'أفراد' : 'guests'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <button
                  key={num}
                  type="button"
                  id={`party-size-${num}`}
                  onClick={() => setPartySize(num)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    partySize === num
                      ? 'bg-[#321F18] text-white border-[#321F18]'
                      : 'bg-white border-[#321F18]/20 text-[#321F18] hover:border-[#BA5C34]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#8B8B52]">
              {isAr
                ? '* للمجموعات التي تزيد عن ٨ ضيوف، يرجى التنسيق المباشر لمأدبة خاصة.'
                : '* For parties larger than 8, please request a private banquet inquiry.'}
            </p>
          </div>

          {/* Seating Preference */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
              {isAr ? 'تفضيل مكان الجلوس:' : 'Seating Preference:'}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'courtyard', label: isAr ? 'فناء مشجر' : 'Courtyard' },
                { id: 'indoor', label: isAr ? 'صالة داخلية' : 'Indoor Lounge' },
                { id: 'private', label: isAr ? 'صالون عائلي' : 'Family Salon' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSeatingPreference(opt.id as any)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    seatingPreference === opt.id
                      ? 'bg-[#BA5C34] text-white border-[#BA5C34]'
                      : 'bg-white border-[#321F18]/15 text-[#321F18] hover:border-[#BA5C34]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="pt-4 border-t border-[#321F18]/10">
            <button
              type="button"
              id="step1-next-btn"
              onClick={handleStep1Next}
              className="w-full py-4 rounded-2xl bg-[#BA5C34] text-white hover:bg-[#9E4A28] font-semibold text-sm transition-all shadow-md shadow-[#BA5C34]/20 flex items-center justify-center gap-2"
            >
              <span>{isAr ? 'متابعة لاختيار التاريخ والموعد' : 'Proceed to Date & Slot'}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Date & Available Time Slot */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Date Picker */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
              {isAr ? 'تاريخ الزيارة المرغوب:' : 'Select Dining Date:'}
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#321F18]/20 text-xs focus:outline-none focus:border-[#BA5C34] text-[#321F18] bg-white font-mono"
            />
          </div>

          {/* Slots Matrix */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
                {isAr ? 'فترات الجلسات التجريبية المتاحة في هذا الفرع:' : 'Sample Available Slots at Pavilion:'}
              </label>
              <span className="text-[11px] text-[#8B8B52]">
                {branchSlots.filter(s => s.status === 'available').length} {isAr ? 'فترات متاحة' : 'slots available'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {branchSlots.map(slot => {
                const isAvailable = slot.status === 'available';
                const isSelected = selectedSlotId === slot.id;

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!isAvailable}
                    id={`slot-btn-${slot.id}`}
                    onClick={() => isAvailable && setSelectedSlotId(slot.id)}
                    className={`p-3.5 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1 transition-all ${
                      !isAvailable
                        ? 'bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed opacity-60'
                        : isSelected
                        ? 'bg-[#321F18] text-white border-[#321F18] shadow-md'
                        : 'bg-white border-[#321F18]/20 text-[#321F18] hover:border-[#BA5C34]'
                    }`}
                  >
                    <span className="text-sm">{slot.starts_at}</span>
                    <span className={`text-[10px] ${!isAvailable ? 'text-zinc-400' : isSelected ? 'text-[#FAF3E6]' : 'text-emerald-700'}`}>
                      {isAvailable ? (isAr ? 'متاح للحجز' : 'Open') : (isAr ? 'مكتمل' : 'Booked')}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-[#8B8B52]">
              {isAr
                ? '* الفترات المعطلة تمثل طاولات مكتملة الحجز في السيناريو التوضيحي.'
                : '* Disabled slots represent fully booked tables in our demonstration scenario.'}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="pt-4 border-t border-[#321F18]/10 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-xl border border-[#321F18]/20 text-xs font-semibold text-[#321F18] hover:bg-[#FAF3E6] transition-colors"
            >
              {isAr ? '← السابق' : '← Back'}
            </button>

            <button
              type="button"
              id="step2-next-btn"
              onClick={handleStep2Next}
              className="flex-1 py-4 rounded-2xl bg-[#BA5C34] text-white hover:bg-[#9E4A28] font-semibold text-sm transition-all shadow-md shadow-[#BA5C34]/20 flex items-center justify-center gap-2"
            >
              <span>{isAr ? 'متابعة لبيانات الضيف' : 'Proceed to Guest Details'}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Guest Details & Submit */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
              {isAr ? 'اسم الضيف الكريم (تجريبي):' : 'Guest Name (Demo):'}
            </label>
            <input
              type="text"
              required
              value={guestName}
              onChange={e => setGuestName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#321F18]/20 text-xs focus:outline-none focus:border-[#BA5C34] text-[#321F18]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
              {isAr ? 'رقم الهاتف للتواصل (تجريبي):' : 'Phone Number (Demo):'}
            </label>
            <input
              type="text"
              required
              value={guestPhone}
              onChange={e => setGuestPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#321F18]/20 text-xs focus:outline-none focus:border-[#BA5C34] text-[#321F18]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#321F18] uppercase tracking-wider block">
              {isAr ? 'ملاحظات خاصة (حساسيات، مناسبة عائلية، إلخ):' : 'Special Notes (Allergies, Occasions):'}
            </label>
            <textarea
              rows={3}
              value={guestNotes}
              onChange={e => setGuestNotes(e.target.value)}
              placeholder={isAr ? 'مثال: نحتفل بذكرى خاصة، أو نفضل طاولة قريبة من النافورة...' : 'e.g. celebrating an anniversary, need a quiet corner...'}
              className="w-full px-4 py-3 rounded-xl border border-[#321F18]/20 text-xs focus:outline-none focus:border-[#BA5C34] text-[#321F18]"
            />
          </div>

          {/* Request Summary Box */}
          <div className="p-4 rounded-2xl bg-[#FAF3E6] border border-[#321F18]/10 text-xs space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-[#BA5C34] block">
              {isAr ? 'ملخص الحجز التجريبي:' : 'Reservation Request Summary:'}
            </span>
            <p className="font-semibold text-[#321F18]">
              {selectedBranch.name} • {partySize} {isAr ? 'ضيوف' : 'guests'} • {date} • {branchSlots.find(s => s.id === selectedSlotId)?.starts_at}
            </p>
            <p className="text-[11px] text-[#8B8B52]">
              {isAr ? `تفضيل الجلسة: ${seatingPreference}` : `Seating style: ${seatingPreference}`}
            </p>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-[#321F18]/10 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-3 rounded-xl border border-[#321F18]/20 text-xs font-semibold text-[#321F18] hover:bg-[#FAF3E6] transition-colors"
            >
              {isAr ? '← السابق' : '← Back'}
            </button>

            <button
              type="submit"
              id="submit-table-request-btn"
              disabled={submitting}
              className="flex-1 py-4 rounded-2xl bg-[#BA5C34] text-white hover:bg-[#9E4A28] disabled:opacity-50 font-semibold text-sm transition-all shadow-md shadow-[#BA5C34]/20 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>{isAr ? 'جارٍ تسجيل طلب الحجز...' : 'Recording Table Request...'}</span>
              ) : (
                <>
                  <span>{isAr ? 'تأكيد إرسال طلب الحجز التجريبي' : 'Submit Demo Table Request'}</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

