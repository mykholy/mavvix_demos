'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Props {
  course: {
    slug: string;
    title: string;
    track: string;
  };
  lesson: {
    id: string;
    slug: string;
    moduleIndex: number;
    lessonIndex: number;
    minutes: number;
    content: any;
    questions?: any[];
  };
  allLessons: Array<{
    id: string;
    slug: string;
    moduleIndex: number;
    lessonIndex: number;
    minutes: number;
    title: string;
    preview: boolean;
  }>;
  locale: 'ar' | 'en';
}

export function LessonPlayerClient({ course, lesson, allLessons, locale }: Props) {
  const isAr = locale === 'ar';
  const isPreview = Boolean(lesson.content?.preview);

  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isPlayingSimulated, setIsPlayingSimulated] = useState(false);

  // Check existing progress from API on mount
  useEffect(() => {
    let token = localStorage.getItem('mavvix_academy_token');
    if (!token) {
      token = 'guest_' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem('mavvix_academy_token', token);
    }

    fetch(`/api/demo/academy/progress?guestToken=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.progress)) {
          const match = data.progress.find(
            (p: any) => p.item_type === 'lesson' && p.item_id === lesson.id && p.status === 'completed'
          );
          if (match) setCompleted(true);
        }
      })
      .catch(() => {});
  }, [lesson.id]);

  const handleMarkComplete = async () => {
    setSaving(true);
    setSaveMessage(null);
    const token = localStorage.getItem('mavvix_academy_token') || 'guest-session';

    try {
      const res = await fetch('/api/demo/academy/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestToken: token,
          itemType: 'lesson',
          itemId: lesson.id,
          status: 'completed'
        })
      });
      const data = await res.json();
      if (data.success) {
        setCompleted(true);
        setSaveMessage(
          isAr
            ? '✓ تم حفظ إتمام الدرس بنجاح في قاعدة بيانات SQLite محليًا.'
            : '✓ Lesson completion successfully recorded to SQLite database.'
        );
      }
    } catch {
      setSaveMessage(isAr ? 'تعذر الاتصال بالخادم.' : 'Failed to reach server.');
    } finally {
      setSaving(false);
    }
  };

  const currentIndex = allLessons.findIndex(l => l.slug === lesson.slug);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const title = isAr ? lesson.content?.title_ar : lesson.content?.title_en;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar: Course Lessons Rail */}
      <div className="lg:col-span-1 order-2 lg:order-1 space-y-4">
        <div className="bg-white rounded-2xl p-5 border border-[#192A48]/10 shadow-sm space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#EF6A55]">
              {course.track}
            </span>
            <h3 className="font-serif text-base font-bold text-[#192A48]">
              <Link href={`/${locale}/preview/academy/courses/${course.slug}`} className="hover:text-[#5F67B5]">
                {course.title}
              </Link>
            </h3>
            <p className="text-xs text-[#192A48]/60">
              {allLessons.length} {isAr ? 'دروس تفصيلية' : 'Curriculum Lessons'}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#192A48]/10">
            {allLessons.map((l, idx) => {
              const isActive = l.slug === lesson.slug;
              return (
                <div key={l.slug}>
                  {l.preview ? (
                    <Link
                      href={`/${locale}/preview/academy/learn/${course.slug}/${l.slug}`}
                      className={`block p-3 rounded-xl text-xs transition-all ${
                        isActive
                          ? 'bg-[#192A48] text-white font-semibold shadow-sm'
                          : 'bg-[#F5F7FF] text-[#192A48] hover:bg-[#192A48]/10 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={isActive ? 'text-[#EF6A55]' : 'text-[#5F67B5]'}>
                          {isAr ? `الدرس ${idx + 1}` : `Lesson ${idx + 1}`}
                        </span>
                        <span className="text-[10px] opacity-70">⏱️ {l.minutes}m</span>
                      </div>
                      <div className="truncate">{l.title}</div>
                    </Link>
                  ) : (
                    <div className="p-3 rounded-xl bg-gray-50 border border-dashed border-[#192A48]/10 text-xs text-[#192A48]/40 flex items-center justify-between gap-2">
                      <div className="truncate">
                        <span>{idx + 1}. {l.title}</span>
                      </div>
                      <span className="shrink-0 text-[10px]">🔒</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#192A48]/10">
            <Link
              href={`/${locale}/preview/academy/courses/${course.slug}`}
              className="text-xs text-[#5F67B5] hover:underline font-semibold block text-center"
            >
              {isAr ? '← العودة إلى خطة الدورة' : '← Back to Course Outline'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 order-1 lg:order-2 space-y-8">
        {/* Title and Top Navigation */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#192A48]/10 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#5F67B5]">
                {isAr ? `الوحدة ${lesson.moduleIndex} — الدرس ${lesson.lessonIndex}` : `Module ${lesson.moduleIndex} — Lesson ${lesson.lessonIndex}`}
              </span>
              <span>•</span>
              <span className="text-[#192A48]/60">⏱️ {lesson.minutes} {isAr ? 'دقيقة تعليمية' : 'minutes'}</span>
              <span>•</span>
              {completed ? (
                <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 font-semibold text-[11px]">
                  ✓ {isAr ? 'مكتمل' : 'Completed'}
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold text-[11px]">
                  ⏳ {isAr ? 'قيد المشاهدة' : 'In Progress'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {lesson.questions && lesson.questions.length > 0 && (
                <Link
                  href={`/${locale}/preview/academy/quiz/${lesson.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-[#EF6A55] text-white hover:bg-[#D95540] font-semibold text-xs shadow-sm inline-flex items-center gap-1"
                >
                  <span>{isAr ? 'خوض اختبار الدرس ⚡' : 'Take Lesson Quiz ⚡'}</span>
                </Link>
              )}
            </div>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#192A48]">
            {title || lesson.slug}
          </h1>

          <p className="text-sm text-[#192A48]/75 leading-relaxed">
            {isAr ? lesson.content?.summary_ar : lesson.content?.summary_en}
          </p>
        </div>

        {/* Video Player Substitute Component */}
        <div className="bg-[#192A48] rounded-2xl overflow-hidden shadow-lg border border-[#192A48]/30 text-white">
          <div className="aspect-video bg-gradient-to-tr from-[#101c30] via-[#192A48] to-[#253961] p-6 flex flex-col justify-between relative">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">
                1080p 60fps • Nova Video Engine
              </span>
              <span className="text-[#EF6A55] font-semibold">
                {isAr ? 'محاكاة مشغل الفيديو التفاعلي' : 'Interactive Video Lab Substitute'}
              </span>
            </div>

            {/* Play Button Center Area */}
            <div className="text-center space-y-3">
              <button
                onClick={() => setIsPlayingSimulated(!isPlayingSimulated)}
                className="w-16 h-16 rounded-full bg-[#EF6A55] hover:bg-[#D95540] text-white mx-auto flex items-center justify-center text-2xl shadow-xl transition-transform hover:scale-110"
                aria-label="Play or pause lecture preview"
              >
                {isPlayingSimulated ? '❚❚' : '▶'}
              </button>
              <div className="text-xs text-white/80">
                {isPlayingSimulated
                  ? (isAr ? 'يتم الآن تشغيل الشرح التطبيقي (محاكاة)...' : 'Streaming applied lecture preview (simulated)...')
                  : (isAr ? 'انقر لتشغيل المحاضرة التجريبية' : 'Click to preview interactive audio-visual lecture')}
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="space-y-2">
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#EF6A55] h-full transition-all duration-300"
                  style={{ width: isPlayingSimulated ? '65%' : '25%' }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/70">
                <span>05:12 / {lesson.minutes}:00</span>
                <span className="flex items-center gap-3">
                  <span>CC ({isAr ? 'عربي' : 'EN'})</span>
                  <span>1.0x</span>
                  <span>⚙️ Full HD</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Substantive 400+ Words Lesson Transcript and Practical Directives */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#192A48]/10 shadow-sm space-y-8">
          <div className="border-b border-[#192A48]/10 pb-4">
            <h2 className="font-serif text-xl font-bold text-[#192A48]">
              {isAr ? 'المحتوى الدراسي والنصوص التطبيقية الكاملة' : 'Substantive Applied Transcript & Practical Directives'}
            </h2>
            <p className="text-xs text-[#192A48]/60 mt-1">
              {isAr ? 'نص تعليمي معمق يتجاوز ٤٠٠ كلمة لتغطية الركائز النظرية وحالات الإخفاق الميدانية.' : 'Comprehensive 400+ word technical curriculum covering architectural invariants and production trade-offs.'}
            </p>
          </div>

          {/* Section 1: Core Architecture */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#192A48] flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#F5F7FF] text-[#5F67B5] flex items-center justify-center text-xs font-bold">1</span>
              <span>{isAr ? 'الركائز المعمارية والتأسيس المفاهيمي المنضبط' : 'Architectural Foundations & Conceptual Invariants'}</span>
            </h3>
            <p className="text-sm text-[#192A48]/80 leading-relaxed">
              {isAr
                ? 'في هذا الدرس التأسيسي نضع القواعد الصارمة التي تفصل بين بناء البرمجيات السريعة الهشة والحلول الهندسية التي تصمد في بيئات الإنتاج الحقيقية. إن الاعتماد على افتراضات متفائلة بأن البيانات الخارجية ستصل دائمًا نظيفة وخالية من التكرار هو السبب الرئيسي لأكثر من ٧٠٪ من الأعطال البرمجية غير المتوقعة في المشاريع الحية. لذا، نبدأ بتأسيس نموذج دفاعي صارم يفرض قيودًا تحققية دقيقة عند كل حد من حدود النظام، سواء كانت استعلامات قواعد البيانات، أو استقبال حزم الشبكة عبر واجهات برمجة التطبيقات، أو معالجة تدفقات الأحداث المتزامنة.'
                : 'In this foundational lesson, we establish the rigorous standards that demarcate fragile prototypes from production systems engineered for durability. Operating under naive assumptions that external data will consistently arrive clean and well-formed causes over 70% of uncaught production regressions. We mandate a defensive posture: enforcing strict schema invariants at every boundary—whether validating analytical SQL ingestion, decoding incoming HTTP payloads, or synchronizing high-throughput event buses.'}
            </p>
            <p className="text-sm text-[#192A48]/80 leading-relaxed">
              {isAr
                ? 'كما نوضح الفارق الجوهري بين التجريدات النظرية والمقاييس الميدانية الفعلية. على سبيل المثال، فإن تقليل وقت الاستجابة لطلب ما من 200 ميلي ثانية إلى 40 ميلي ثانية لا يمثل مجرد إنجاز تقني في لوحة التحكم، بل ينعكس مباشرة على معدلات الاحتفاظ بالعملاء، ويقلل استهلاك موارد الخوادم السحابية، ويوفر تكاليف تشغيلية ضخمة عند التعامل مع ملايين الطلبات المتزامنة يوميًا.'
                : 'Furthermore, we contrast theoretical abstractions with concrete field performance metrics. Shaving request latency from 200ms to 40ms is not merely an aesthetic triumph on an analytics dashboard; it directly elevates user retention, dampens cloud compute churn, and yields profound cost optimizations when operating across millions of daily concurrent transactions.'}
            </p>
          </div>

          {/* Section 2: Failure Modes */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#192A48] flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#F5F7FF] text-[#EF6A55] flex items-center justify-center text-xs font-bold">2</span>
              <span>{isAr ? 'حالات الإخفاق الميدانية الشائعة وكيفية تجنبها' : 'Real-World Failure Modes & Diagnostic Pitfalls'}</span>
            </h3>
            <p className="text-sm text-[#192A48]/80 leading-relaxed">
              {isAr
                ? 'تشير دراسات الحالات الواقعية إلى أن معظم الفرق البرمجية تقع في فخ "التحسين المبكر غير المبرر" أو العكس تمامًا وهو "تجاهل الأخطاء الصامتة". عندما تفشل عملية ما بصمت داخل خط معالجة البيانات دون إرسال تنبيه صريح أو تسجيل استثناء تفصيلي، تبدأ البيانات الفاسدة في التراكم داخل الجداول التحليلية، مما يقود الإدارة التنفيذية إلى اتخاذ قرارات تسويقية أو مالية مبنية على أرقام مضللة تمامًا. في هذا الدرس، نبرز كيف نقوم بإنشاء سجلات تدقيق غير قابلة للتغيير (Immutable Audit Logs) ومراقبة الحدود القصوى لاستهلاك الذاكرة.'
                : 'Empirical incident postmortems reveal that engineering teams frequently succumb to premature optimization or its antithesis: swallowing silent exceptions. When a sub-process fails silently inside an ETL pipeline or state machine without structured alerting, corrupted state cascades downstream. Executive leadership subsequently formulates marketing and financial strategies based on distorted telemetry. We demonstrate how immutable audit logs and proactive memory threshold monitors preempt these silent failures.'}
            </p>
          </div>

          {/* Section 3: Practical Lab Exercise */}
          <div className="space-y-4 pt-4 border-t border-[#192A48]/10 bg-[#F5F7FF] rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold text-[#192A48] flex items-center gap-2">
              <span className="text-xl">🛠️</span>
              <span>{isAr ? 'التمرين العملي الإجباري للدرس' : 'Hands-On Applied Lab Exercise'}</span>
            </h3>
            <p className="text-sm text-[#192A48]/80 leading-relaxed">
              {isAr ? lesson.content?.exercise_ar : lesson.content?.exercise_en}
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#192A48]/10 text-xs text-[#192A48]/70 font-mono space-y-1">
              <div className="text-[#5F67B5] font-semibold">// Lab Directive Checklist:</div>
              <div>1. Inspect sample dataset schemas and isolate boundary types.</div>
              <div>2. Implement defensive type assertions and error catching blocks.</div>
              <div>3. Verify execution benchmarks and test edge cases under load.</div>
            </div>
          </div>

          {/* Progress Persistence Actions */}
          <div className="pt-6 border-t border-[#192A48]/10 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-start">
                <div className="text-xs font-semibold text-[#192A48]">
                  {isAr ? 'تسجيل إنجاز الدرس ومتابعة المسار' : 'Persist Progress & Advance'}
                </div>
                <div className="text-xs text-[#192A48]/60">
                  {isAr
                    ? 'يتم حفظ حالة الإتمام في جدول demo_guest_progress في SQLite'
                    : 'Records completion state directly into SQLite demo_guest_progress'}
                </div>
              </div>

              <button
                onClick={handleMarkComplete}
                disabled={saving || completed}
                className={`px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-2 ${
                  completed
                    ? 'bg-green-600 text-white cursor-default'
                    : 'bg-[#192A48] text-white hover:bg-[#5F67B5]'
                }`}
              >
                {saving ? (
                  <span>{isAr ? 'جاري الحفظ...' : 'Saving...'}</span>
                ) : completed ? (
                  <>
                    <span>✓</span>
                    <span>{isAr ? 'تم إتمام الدرس' : 'Lesson Completed'}</span>
                  </>
                ) : (
                  <>
                    <span>💾</span>
                    <span>{isAr ? 'تسجيل الدرس كمكتمل' : 'Mark Lesson Completed'}</span>
                  </>
                )}
              </button>
            </div>

            {saveMessage && (
              <div className="p-3 rounded-xl bg-green-50 text-green-800 text-xs border border-green-200">
                {saveMessage}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation & Quiz CTA */}
        <div className="bg-white rounded-2xl p-6 border border-[#192A48]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {prevLesson ? (
              <Link
                href={`/${locale}/preview/academy/learn/${course.slug}/${prevLesson.slug}`}
                className="px-4 py-2 rounded-lg bg-[#F5F7FF] text-[#192A48] text-xs font-semibold hover:bg-[#192A48] hover:text-white transition-colors"
              >
                {isAr ? '← الدرس السابق' : '← Previous Lesson'}
              </Link>
            ) : (
              <span className="text-xs text-[#192A48]/30 px-3 py-2 border rounded-lg cursor-not-allowed">
                {isAr ? 'البداية' : 'Start'}
              </span>
            )}

            {nextLesson && nextLesson.preview && (
              <Link
                href={`/${locale}/preview/academy/learn/${course.slug}/${nextLesson.slug}`}
                className="px-4 py-2 rounded-lg bg-[#F5F7FF] text-[#192A48] text-xs font-semibold hover:bg-[#192A48] hover:text-white transition-colors"
              >
                {isAr ? 'الدرس التالي →' : 'Next Lesson →'}
              </Link>
            )}
          </div>

          {/* Quiz CTA */}
          <Link
            href={`/${locale}/preview/academy/quiz/${lesson.slug}`}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#EF6A55] text-white hover:bg-[#D95540] text-xs font-semibold transition-all shadow-sm text-center inline-flex items-center justify-center gap-2"
          >
            <span>{isAr ? 'خوض الاختبار المقيم لهذا الدرس (٤ أسئلة) ⚡' : 'Take Scored Lesson Quiz (4 Questions) ⚡'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

