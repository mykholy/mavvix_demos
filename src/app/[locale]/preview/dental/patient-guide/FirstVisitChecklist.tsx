'use client';

import React, { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n/config';
import { CheckSquare, Square, RotateCcw, Sparkles } from 'lucide-react';

interface Props {
  locale: Locale;
}

export default function FirstVisitChecklist({ locale }: Props) {
  const isAr = locale === 'ar';

  const defaultItems = [
    { id: 'item-1', label: isAr ? 'إحضار بطاقة هوية سارية أو إثبات شخصية' : 'Bring a valid government or student photo ID' },
    { id: 'item-2', label: isAr ? 'الوصول قبل الموعد بـ 10 دقائق للاسترخاء والترحيب' : 'Arrive 10 minutes prior to relax and settle in' },
    { id: 'item-3', label: isAr ? 'تنظيف الأسنان بالفرشاة قبل الحضور إن أمكن' : 'Brush teeth gently before arriving if convenient' },
    { id: 'item-4', label: isAr ? 'تدوين أي استفسارات أو تفضيلات تود مناقشتها مع الطبيب' : 'Note any general comfort preferences to share' },
    { id: 'item-5', label: isAr ? 'إحضار سماعات أذن إذا كنت تفضل الاستماع لموسيقاك المفضلة' : 'Bring headphones if you enjoy personal music playlists' },
    { id: 'item-6', label: isAr ? 'ارتداء ملابس مريحة وفضفاضة لجلسة استرخائية' : 'Wear loose, comfortable clothing for maximum ease' }
  ];

  const storageKey = 'lumen_dental_first_visit_checklist';
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore local storage read errors
    }
  }, []);

  const toggleItem = (id: string) => {
    const next = checkedIds.includes(id)
      ? checkedIds.filter(x => x !== id)
      : [...checkedIds, id];
    setCheckedIds(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch (e) {
      // Ignore write errors
    }
  };

  const resetChecklist = () => {
    setCheckedIds([]);
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {}
  };

  const completedCount = checkedIds.length;
  const progressPercent = Math.round((completedCount / defaultItems.length) * 100);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0EBE7] shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5251] bg-[#EDF5F2] px-3 py-1 rounded-full">
            {isAr ? 'قائمة تحضير تفاعلية' : 'Interactive Checklist'}
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#193A39] mt-2">
            {isAr ? 'قائمة الاستعداد للزيارة الأولى' : 'First Visit Preparation Checklist'}
          </h3>
          <p className="text-xs text-[#557874] mt-1">
            {isAr
              ? 'احفظ تقدمك محلياً في متصفحك دون الحاجة لتسجيل أي بيانات شخصية أو صحية.'
              : 'Track your preparation offline in your browser. No medical data or personal details required.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right rtl:text-left">
            <span className="text-xs font-semibold text-[#193A39]">{completedCount} / {defaultItems.length}</span>
            <span className="text-[11px] text-[#557874] block">{isAr ? 'خطوة جاهزة' : 'ready'}</span>
          </div>
          <button
            onClick={resetChecklist}
            title={isAr ? 'إعادة ضبط' : 'Reset'}
            className="p-2 rounded-xl text-[#557874] hover:text-[#193A39] hover:bg-[#EDF5F2] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-[#EDF5F2] overflow-hidden">
        <div
          className="h-full bg-[#7AC7A5] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {defaultItems.map(item => {
          const isDone = checkedIds.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-start gap-3 p-4 rounded-xl border text-left rtl:text-right transition-all ${
                isDone
                  ? 'bg-[#F2F8F5] border-[#7AC7A5] text-[#193A39]'
                  : 'bg-[#F8FBFA] border-[#E8F0ED] text-[#466662] hover:bg-white'
              }`}
            >
              {isDone ? (
                <CheckSquare className="w-5 h-5 text-[#2C5251] flex-shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-[#A0BCB6] flex-shrink-0 mt-0.5" />
              )}
              <span className={`text-xs font-medium leading-relaxed ${isDone ? 'line-through text-[#668B84]' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

