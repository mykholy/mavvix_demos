'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { LocalizedCourse } from '@/lib/db/repositories';

interface Props {
  courses: LocalizedCourse[];
  locale: 'ar' | 'en';
}

export function EnrollmentInterestClient({ courses, locale }: Props) {
  const isAr = locale === 'ar';
  const searchParams = useSearchParams();

  const prefilledCourse = searchParams.get('course') || '';
  const prefilledTrack = searchParams.get('track') || '';

  const [courseSlug, setCourseSlug] = useState<string>(prefilledCourse);
  const [track, setTrack] = useState<string>(prefilledTrack);
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [careerGoal, setCareerGoal] = useState<string>('career_transition');
  const [learningPace, setLearningPace] = useState<string>('part_time');
  const [backgroundNotes, setBackgroundNotes] = useState<string>('');

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/demo/academy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowType: 'academy_interest',
          payload: {
            courseSlug,
            track,
            guestName,
            guestEmail,
            guestPhone,
            careerGoal,
            learningPace,
            backgroundNotes,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setServerError(
          data.error ||
            (isAr
              ? 'حدث خطأ أثناء معالجة طلب الاهتمام بالالتحاق.'
              : 'An error occurred while recording your enrollment interest.')
        );
      } else {
        setReceipt({
          refNumber: data.refNumber || `MVX-ACA-${Math.floor(100000 + Math.random() * 900000)}`,
          courseSlug,
          track,
          guestName,
          guestEmail,
          guestPhone,
          careerGoal,
          learningPace,
          submittedAt: new Date().toISOString(),
        });
      }
    } catch {
      setServerError(isAr ? 'تعذر الاتصال بالخادم.' : 'Failed to communicate with server.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setReceipt(null);
    setServerError(null);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setBackgroundNotes('');
  };

  // If receipt is displayed
  if (receipt) {
    const selectedCourseObj = courses.find(c => c.slug === receipt.courseSlug);

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-green-200 shadow-lg space-y-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 mx-auto flex items-center justify-center text-3xl font-bold">
            ✓
          </div>
          <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
            {isAr ? 'تم تسجيل الاهتمام تجريبيًا' : 'Simulated Enrollment Interest Recorded'}
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#192A48]">
            {isAr ? 'إشعار استلام طلب الالتحاق' : 'Enrollment Intake Receipt'}
          </h2>
          <p className="text-sm text-[#192A48]/70">
            {isAr
              ? 'تم حفظ طلبك بنجاح في قاعدة بيانات SQLite محليًا كطلب تجريبي.'
              : 'Your submission was safely persisted into SQLite demo_submissions as an applied concept record.'}
          </p>
        </div>

        {/* Receipt Details Card */}
        <div className="p-6 rounded-2xl bg-[#F5F7FF] border border-[#192A48]/10 space-y-4 font-mono text-xs text-[#192A48]">
          <div className="flex items-center justify-between pb-3 border-b border-[#192A48]/10">
            <span className="text-[#192A48]/80">{isAr ? 'رقم المرجع التجريبي:' : 'Reference Code:'}</span>
            <span className="font-bold text-[#5F67B5]">{receipt.refNumber}</span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-[#192A48]/10">
            <span className="text-[#192A48]/80">{isAr ? 'المنهج المختار:' : 'Selected Course:'}</span>
            <span className="font-bold text-[#192A48]">
              {selectedCourseObj ? selectedCourseObj.title : receipt.courseSlug || receipt.track || 'General Track'}
            </span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-[#192A48]/10">
            <span className="text-[#192A48]/80">{isAr ? 'اسم المتعلم:' : 'Applicant Name:'}</span>
            <span className="font-bold text-[#192A48]">{receipt.guestName}</span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-[#192A48]/10">
            <span className="text-[#192A48]/80">{isAr ? 'بيانات التواصل:' : 'Contact Detail:'}</span>
            <span>{receipt.guestEmail || receipt.guestPhone}</span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-[#192A48]/10">
            <span className="text-[#192A48]/80">{isAr ? 'الهدف المهني:' : 'Career Goal:'}</span>
            <span className="capitalize">{receipt.careerGoal}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#192A48]/80">{isAr ? 'وقت التسجيل:' : 'Timestamp:'}</span>
            <span className="text-[11px] text-[#192A48]/80">{receipt.submittedAt.slice(0, 19)}</span>
          </div>
        </div>

        {/* Ethical Transparency Disclaimer */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-1">
          <div className="font-semibold">{isAr ? 'تنويه الشفافية الأخلاقية:' : 'Ethical Demo Notice:'}</div>
          <div>
            {isAr
              ? 'هذا الإيصال هو محاكاة برمجية تجريبية داخل نموذج أكاديمية نوفا بواسطة Mavvix. لم يتم فرض أي التزام مالي أو توقيع عقد تعليمي ملزم.'
              : 'This receipt is a software simulation generated by the Mavvix Nova Learning demo platform. No tuition invoice or legal contract has been executed.'}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#192A48]/20 text-[#192A48] hover:bg-gray-50 text-xs font-semibold transition-colors"
          >
            {isAr ? 'تسجيل طلب آخر ↺' : 'Submit Another Request ↺'}
          </button>

          <Link
            href={`/${locale}/preview/academy/courses`}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#192A48] text-white hover:bg-[#5F67B5] text-xs font-semibold text-center transition-colors shadow-sm"
          >
            {isAr ? 'العودة لدليل المناهج' : 'Browse All Curricula'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Form Intro Dossier */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#192A48]/10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#192A48]/5 text-[#192A48] text-xs font-semibold">
          <span>{isAr ? 'تسجيل الاهتمام الأكاديمي' : 'Prospective Learner Intake'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#192A48]">
          {isAr ? 'تسجيل الاهتمام بالالتحاق بالبرامج التطبيقية' : 'Register Applied Enrollment Interest'}
        </h1>
        <p className="text-sm text-[#192A48]/75 leading-relaxed">
          {isAr
            ? 'سجل اهتمامك بأحد مناهجنا التقنية أو مساراتنا المهنية. سيتم حفظ بياناتك وتفضيلاتك في قاعدة بيانات العرض التجريبي لتلقي التوجيه الأكاديمي المناسب.'
            : 'Indicate your interest in an applied curriculum or specialized track. Your submission will be recorded into our demo database to simulate intake evaluation.'}
        </p>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
          <span>⚠️</span>
          <span>{serverError}</span>
        </div>
      )}

      {/* Main Intake Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-8 sm:p-10 border border-[#192A48]/10 shadow-sm space-y-6"
      >
        {/* Course / Track Selection */}
        <div className="space-y-2">
          <label htmlFor="course-select" className="block text-xs font-semibold text-[#192A48]">
            {isAr ? 'المنهج الدراسي المطلوب *' : 'Selected Curriculum *'}
          </label>
          <select
            id="course-select"
            value={courseSlug}
            onChange={e => setCourseSlug(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#192A48]/20 focus:outline-none focus:ring-2 focus:ring-[#5F67B5] text-sm text-[#192A48]"
            required
          >
            <option value="">{isAr ? '— اختر منهجًا تطبيقيًا —' : '— Select a Curriculum —'}</option>
            {courses.map(c => (
              <option key={c.slug} value={c.slug}>
                [{c.track.toUpperCase()}] {c.title}
              </option>
            ))}
            {/* Journey 3 edge-case option to verify server rejection */}
            <option value="invalid-choice">
              {isAr ? '⚠️ [خيار تجريبي غير صالح - لاختبار التحقق من الخلل]' : '⚠️ [Invalid Choice - Test Edge-Case Rejection]'}
            </option>
          </select>
          <p className="text-[11px] text-[#192A48]/80">
            {isAr
              ? 'اختر المنهج الذي ترغب في دراسته، أو جرب اختيار الخيار التجريبي لاختبار التحقق من الأخطاء.'
              : 'Choose your desired curriculum or select the invalid option to verify error handling.'}
          </p>
        </div>

        {/* Guest Name */}
        <div className="space-y-2">
          <label htmlFor="guest-name" className="block text-xs font-semibold text-[#192A48]">
            {isAr ? 'الاسم الكامل *' : 'Full Name *'}
          </label>
          <input
            id="guest-name"
            type="text"
            value={guestName}
            onChange={e => setGuestName(e.target.value)}
            placeholder={isAr ? 'مثال: سارة محمود' : 'e.g., Sarah Mahmoud'}
            className="w-full px-4 py-3 rounded-xl border border-[#192A48]/20 focus:outline-none focus:ring-2 focus:ring-[#5F67B5] text-sm text-[#192A48]"
            required
          />
        </div>

        {/* Contact Info (Email and Phone) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="guest-email" className="block text-xs font-semibold text-[#192A48]">
              {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
            </label>
            <input
              id="guest-email"
              type="email"
              value={guestEmail}
              onChange={e => setGuestEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl border border-[#192A48]/20 focus:outline-none focus:ring-2 focus:ring-[#5F67B5] text-sm text-[#192A48]"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="guest-phone" className="block text-xs font-semibold text-[#192A48]">
              {isAr ? 'رقم الهاتف (اختياري)' : 'Phone Number (Optional)'}
            </label>
            <input
              id="guest-phone"
              type="tel"
              value={guestPhone}
              onChange={e => setGuestPhone(e.target.value)}
              placeholder="+20 100 000 0000"
              className="w-full px-4 py-3 rounded-xl border border-[#192A48]/20 focus:outline-none focus:ring-2 focus:ring-[#5F67B5] text-sm text-[#192A48]"
            />
          </div>
        </div>

        {/* Career Goal & Pace */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="career-goal" className="block text-xs font-semibold text-[#192A48]">
              {isAr ? 'الهدف المهني الأساسي' : 'Primary Career Goal'}
            </label>
            <select
              id="career-goal"
              value={careerGoal}
              onChange={e => setCareerGoal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#192A48]/20 focus:outline-none focus:ring-2 focus:ring-[#5F67B5] text-sm text-[#192A48]"
            >
              <option value="career_transition">{isAr ? 'التحول الوظيفي لمجال جديد' : 'Career Transition'}</option>
              <option value="skill_upgrade">{isAr ? 'تطوير وتعميق المهارات الحالية' : 'Deepening Current Skills'}</option>
              <option value="architecture_mastery">{isAr ? 'إتقان معمارية النظم المتقدمة' : 'Advanced Systems Mastery'}</option>
              <option value="freelance_consulting">{isAr ? 'العمل الاستشاري الحر' : 'Freelancing & Consulting'}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="learning-pace" className="block text-xs font-semibold text-[#192A48]">
              {isAr ? 'وتيرة التعلم المفضلة' : 'Preferred Pace'}
            </label>
            <select
              id="learning-pace"
              value={learningPace}
              onChange={e => setLearningPace(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#192A48]/20 focus:outline-none focus:ring-2 focus:ring-[#5F67B5] text-sm text-[#192A48]"
            >
              <option value="part_time">{isAr ? 'دوام جزئي مرن (٨-١٠ ساعات أسبوعيًا)' : 'Part-Time Flexible (8-10 hrs/wk)'}</option>
              <option value="intensive">{isAr ? 'مكثف كامل (٢٥-٣٠ ساعة أسبوعيًا)' : 'Intensive Cohort (25-30 hrs/wk)'}</option>
            </select>
          </div>
        </div>

        {/* Background & Expectations */}
        <div className="space-y-2">
          <label htmlFor="background-notes" className="block text-xs font-semibold text-[#192A48]">
            {isAr ? 'ملاحظات عن خلفيتك التقنية وتطلعاتك (اختياري)' : 'Technical Background & Notes (Optional)'}
          </label>
          <textarea
            id="background-notes"
            rows={3}
            value={backgroundNotes}
            onChange={e => setBackgroundNotes(e.target.value)}
            placeholder={isAr ? 'أخبرنا عن خبرتك السابقة وما تأمل في بنائه...' : 'Briefly describe your programming background and what you plan to build...'}
            className="w-full px-4 py-3 rounded-xl border border-[#192A48]/20 focus:outline-none focus:ring-2 focus:ring-[#5F67B5] text-sm text-[#192A48]"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-[#192A48]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#192A48]/80">
            {isAr ? '* كافة الحقول المعلمة بالنجمة إلزامية' : '* Required fields are enforced'}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#B74132] hover:bg-[#D95540] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span>{isAr ? 'جاري الإرسال...' : 'Submitting...'}</span>
            ) : (
              <span>{isAr ? 'تسجيل الاهتمام وإصدار الإيصال ⚡' : 'Register Interest & Generate Receipt ⚡'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

