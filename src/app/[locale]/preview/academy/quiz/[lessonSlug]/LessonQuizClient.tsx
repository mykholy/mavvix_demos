'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: string;
  prompt: { ar: string; en: string };
  answers: { ar: string[]; en: string[] };
  correct_index: number;
  explanation: { ar: string; en: string };
}

interface Props {
  lessonSlug: string;
  courseSlug: string;
  lessonTitle: string;
  questions: Question[];
  locale: 'ar' | 'en';
}

export function LessonQuizClient({
  lessonSlug,
  courseSlug,
  lessonTitle,
  questions,
  locale,
}: Props) {
  const isAr = locale === 'ar';

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [scorePercent, setScorePercent] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [persisting, setPersisting] = useState(false);
  const [persistSuccess, setPersistSuccess] = useState(false);

  // Check if previously scored
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
            (p: any) => p.item_type === 'quiz' && p.item_id === lessonSlug
          );
          if (match && typeof match.score === 'number') {
            setScorePercent(match.score);
            setCorrectCount(Math.round((match.score / 100) * questions.length));
            setSubmitted(true);
            setPersistSuccess(true);
          }
        }
      })
      .catch(() => {});
  }, [lessonSlug, questions.length]);

  const handleSelect = (questionId: string, answerIndex: number) => {
    if (submitted) return; // Locked once evaluated
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex,
    }));
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Journey 3 validation: Check that all questions are answered
    const unanswered = questions.filter(q => selectedAnswers[q.id] === undefined);
    if (unanswered.length > 0) {
      setErrorMsg(
        isAr
          ? `يرجى الإجابة عن كافة الأسئلة قبل التقييم. لديك (${unanswered.length}) أسئلة متبقية.`
          : `Please answer all questions before submitting. You have (${unanswered.length}) unanswered question(s).`
      );
      return;
    }

    // Evaluate score
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct_index) {
        correct++;
      }
    });

    const percent = Math.round((correct / questions.length) * 100);
    setCorrectCount(correct);
    setScorePercent(percent);
    setSubmitted(true);

    // Persist score in SQLite demo_guest_progress table via API
    setPersisting(true);
    const token = localStorage.getItem('mavvix_academy_token') || 'guest-session';
    try {
      const res = await fetch('/api/demo/academy/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestToken: token,
          itemType: 'quiz',
          itemId: lessonSlug,
          status: 'completed',
          score: percent,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPersistSuccess(true);
      }
    } catch {
      // Non-blocking UI
    } finally {
      setPersisting(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setErrorMsg(null);
    setScorePercent(null);
    setPersistSuccess(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Quiz Header Dossier */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#192A48]/10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="px-3 py-1 rounded-full bg-[#192A48]/5 text-[#192A48] font-semibold">
            {isAr ? 'اختبار تقييمي فوري' : 'Deterministic Scored Assessment'}
          </span>
          <span className="text-[#192A48]/60">
            {questions.length} {isAr ? 'أسئلة معيارية' : 'Curated Questions'}
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#192A48]">
          {isAr ? `اختبار الفهم التطبيقي: ${lessonTitle}` : `Applied Competency Quiz: ${lessonTitle}`}
        </h1>

        <p className="text-sm text-[#192A48]/75 leading-relaxed">
          {isAr
            ? 'يقيس هذا الاختبار استيعابك للمفاهيم الأساسية، والقدرة على تجنب الأخطاء الشائعة، والتعامل مع حالات الإخفاق الميدانية. التقييم فوري ومحدد رياضيًا.'
            : 'This assessment evaluates your grasp of core architectural invariants, error recovery patterns, and diagnostic rigor. Evaluation is deterministic and immediate.'}
        </p>

        {/* Evaluation Banner when submitted */}
        {submitted && scorePercent !== null && (
          <div
            className={`p-6 rounded-2xl border transition-all ${
              scorePercent >= 75
                ? 'bg-green-50 border-green-200 text-green-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider">
                  {isAr ? 'نتيجة التقييم الفوري' : 'Assessment Evaluation'}
                </div>
                <div className="font-serif text-3xl font-bold">
                  {scorePercent}%{' '}
                  <span className="text-base font-normal">
                    ({correctCount} / {questions.length} {isAr ? 'إجابات صحيحة' : 'correct'})
                  </span>
                </div>
                <p className="text-xs opacity-90">
                  {scorePercent >= 75
                    ? isAr
                      ? 'تهانينا! لقد حققت نسبة النجاح المطلوبة وأظهرت استيعابًا متينًا لمفاهيم الدرس.'
                      : 'Excellent! You satisfied the mastery benchmark (>=75%) and demonstrated solid comprehension.'
                    : isAr
                      ? 'درجة دون الحد الأدنى للإتقان (٧٥٪). راجع التفسيرات أدناه ثم أعد المحاولة لتثبيت الفهم.'
                      : 'Score below the 75% benchmark. Review explanations below and retry to reinforce understanding.'}
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap gap-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-800 shadow-sm transition-colors"
                >
                  {isAr ? 'إعادة الاختبار ↺' : 'Retake Quiz ↺'}
                </button>
                <Link
                  href={`/${locale}/preview/academy/enrollment-interest?course=${courseSlug}`}
                  className="px-4 py-2 rounded-xl bg-[#EF6A55] text-white hover:bg-[#D95540] text-xs font-semibold shadow-sm transition-colors"
                >
                  {isAr ? 'تسجيل الاهتمام بالبرنامج' : 'Register Enrollment'}
                </Link>
              </div>
            </div>

            {persistSuccess && (
              <div className="mt-4 pt-3 border-t border-green-200/50 text-[11px] text-green-700 flex items-center gap-1.5">
                <span>✓</span>
                <span>
                  {isAr
                    ? 'تم حفظ درجتك بنجاح في قاعدة بيانات SQLite محليًا (جدول demo_guest_progress).'
                    : 'Your score was saved in local SQLite demo_guest_progress table.'}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message Box */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
          <span>⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Quiz Form Questions */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, qIndex) => {
          const prompt = isAr ? q.prompt.ar : q.prompt.en;
          const answers = isAr ? q.answers.ar : q.answers.en;
          const selected = selectedAnswers[q.id];
          const isUnanswered = selected === undefined;
          const isCorrect = submitted && selected === q.correct_index;
          const isWrong = submitted && selected !== q.correct_index;
          const explanation = isAr ? q.explanation.ar : q.explanation.en;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl p-6 sm:p-8 border transition-all ${
                submitted
                  ? isCorrect
                    ? 'border-green-300 bg-green-50/20'
                    : 'border-red-300 bg-red-50/20'
                  : errorMsg && isUnanswered
                    ? 'border-red-400 ring-2 ring-red-100'
                    : 'border-[#192A48]/10'
              }`}
            >
              <div className="space-y-4">
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#5F67B5]">
                    <span>{isAr ? `السؤال ${qIndex + 1}` : `Question ${qIndex + 1}`}</span>
                    <span className="text-[#192A48]/30">•</span>
                    <span className="text-[#192A48]/60">{isAr ? 'اختيار من متعدد' : 'Multiple Choice'}</span>
                  </div>

                  {submitted && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isCorrect
                        ? (isAr ? '✓ إجابة صحيحة' : '✓ Correct')
                        : (isAr ? '✗ إجابة غير صحيحة' : '✗ Incorrect')}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#192A48] leading-snug">
                  {prompt}
                </h3>

                {/* Answer Options */}
                <div className="space-y-2.5 pt-2">
                  {answers.map((answerText, aIndex) => {
                    const isOptionSelected = selected === aIndex;
                    const isOptionTheCorrectAnswer = submitted && aIndex === q.correct_index;

                    let optionBorder = 'border-[#192A48]/15 hover:border-[#5F67B5]';
                    let optionBg = 'bg-[#F5F7FF]';

                    if (submitted) {
                      if (isOptionTheCorrectAnswer) {
                        optionBorder = 'border-green-500 ring-2 ring-green-200';
                        optionBg = 'bg-green-100/60 font-semibold';
                      } else if (isOptionSelected && !isCorrect) {
                        optionBorder = 'border-red-500';
                        optionBg = 'bg-red-100/60 line-through text-red-800';
                      } else {
                        optionBg = 'bg-gray-50 opacity-60';
                      }
                    } else if (isOptionSelected) {
                      optionBorder = 'border-[#5F67B5] ring-2 ring-[#5F67B5]/20';
                      optionBg = 'bg-[#192A48]/5 font-semibold';
                    }

                    return (
                      <label
                        key={aIndex}
                        onClick={() => handleSelect(q.id, aIndex)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${optionBorder} ${optionBg}`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          value={aIndex}
                          checked={isOptionSelected}
                          onChange={() => handleSelect(q.id, aIndex)}
                          disabled={submitted}
                          className="w-4 h-4 text-[#5F67B5] focus:ring-[#5F67B5]"
                        />
                        <span className="flex-1 text-[#192A48] leading-relaxed">{answerText}</span>
                        {submitted && isOptionTheCorrectAnswer && (
                          <span className="text-green-700 text-xs font-bold shrink-0">
                            ✓ {isAr ? 'الإجابة المعتمدة' : 'Correct'}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>

                {/* Explanation Box when submitted */}
                {submitted && explanation && (
                  <div className="mt-4 p-4 rounded-xl bg-white border border-[#192A48]/10 text-xs text-[#192A48]/80 space-y-1">
                    <div className="font-semibold text-[#192A48] flex items-center gap-1.5">
                      <span>💡</span>
                      <span>{isAr ? 'التفسير والتعليل العلمي:' : 'Technical Rationale:'}</span>
                    </div>
                    <p className="leading-relaxed">{explanation}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Submit Action Bar */}
        {!submitted ? (
          <div className="bg-white rounded-2xl p-6 border border-[#192A48]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#192A48]/70">
              {Object.keys(selectedAnswers).length} {isAr ? 'من' : 'of'} {questions.length}{' '}
              {isAr ? 'أسئلة تمت الإجابة عليها' : 'questions answered'}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/${locale}/preview/academy/learn/${courseSlug}/${lessonSlug}`}
                className="px-4 py-2.5 rounded-xl border border-[#192A48]/20 text-[#192A48] hover:bg-gray-50 text-xs font-semibold text-center w-full sm:w-auto"
              >
                {isAr ? '← العودة للدرس' : '← Back to Lesson'}
              </Link>
              <button
                type="submit"
                disabled={persisting}
                className="px-6 py-2.5 rounded-xl bg-[#EF6A55] hover:bg-[#D95540] text-white text-xs font-semibold shadow-md transition-all w-full sm:w-auto text-center"
              >
                {persisting
                  ? (isAr ? 'جاري التقييم...' : 'Evaluating...')
                  : (isAr ? 'اعتماد الإجابات وتقييم النتيجة ⚡' : 'Submit for Scored Evaluation ⚡')}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-[#192A48]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/${locale}/preview/academy/learn/${courseSlug}/${lessonSlug}`}
              className="text-xs font-semibold text-[#5F67B5] hover:underline"
            >
              {isAr ? '← العودة إلى محتوى الدرس' : '← Return to Lesson Content'}
            </Link>

            <Link
              href={`/${locale}/preview/academy/courses/${courseSlug}`}
              className="px-5 py-2.5 rounded-xl bg-[#192A48] text-white hover:bg-[#5F67B5] text-xs font-semibold transition-colors shadow-sm"
            >
              {isAr ? 'متابعة الدورة التعليمية' : 'Continue Course Curriculum'}
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}

