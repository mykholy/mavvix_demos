import React from 'react';
import Link from 'next/link';
import { getAcademyInstructors } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';

export const metadata = {
  title: 'Faculty & Practitioners | Nova Learning',
  description: 'Production engineers, UX architects, data scientists, and growth strategists leading applied curricula.',
};

export default async function InstructorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const loc = locale as Locale;

  const instructors = getAcademyInstructors(loc);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#192A48]/10 text-[#192A48] text-xs font-semibold">
          <span>{isAr ? 'هيئة التدريس والخبراء' : 'Faculty & Industry Practitioners'}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#192A48]">
          {isAr ? 'الخبراء وهيئة التدريس' : 'Instructors & Field Experts'}
        </h1>
        <p className="text-base text-[#192A48]/75 leading-relaxed">
          {isAr
            ? 'لا يعتمد التدريس في أكاديمية نوفا على الأكاديميين النظريين، بل يقوده مهندسون ومصممون واستشاريون متمرسون ينقلون تجاربهم الإنتاجية الحية وأخطاء المشاريع الواقعية إلى قاعات التعلم.'
            : 'Instruction at Nova Learning is delivered by seasoned practitioners who build and scale production systems daily. Explore their engineering philosophies, research backgrounds, and active curricula.'}
        </p>

        {/* Fictional Disclaimer Alert */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-3">
          <span className="text-base shrink-0">ℹ️</span>
          <div>
            <span className="font-semibold">
              {isAr ? 'تنويه الشفافية: ' : 'Transparency Notice: '}
            </span>
            {isAr
              ? 'كافة الشخصيات والبيانات الوظيفية المعروضة في هذا الدليل هي شخصيات استشارية افتراضية طُوّرت لأغراض العرض التجريبي لأكاديمية نوفا بواسطة Mavvix، ولا تمثل التزامات توظيف فعلية.'
              : 'All instructor profiles and bios in this directory are fictional professional personas engineered for the Mavvix Nova Learning concept demo.'}
          </div>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {instructors.map(ins => (
          <div
            key={ins.slug}
            className="bg-white rounded-2xl border border-[#192A48]/10 p-6 space-y-5 hover:border-[#5F67B5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Avatar & Track */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-16 h-16 rounded-2xl bg-[#192A48] text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                  {ins.name.charAt(0)}
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#F5F7FF] text-[#192A48] text-xs font-semibold uppercase tracking-wider">
                  {ins.track}
                </span>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-[#192A48]">
                  <Link href={`/${locale}/preview/academy/instructors/${ins.slug}`} className="hover:text-[#5F67B5]">
                    {ins.name}
                  </Link>
                </h2>
                <p className="text-xs text-[#EF6A55] font-medium mt-1 leading-snug">{ins.title}</p>
              </div>

              <p className="text-xs text-[#192A48]/75 leading-relaxed line-clamp-3">
                {ins.bio}
              </p>

              <div className="text-xs text-[#192A48]/60 pt-2 border-t border-[#192A48]/10">
                <span className="font-semibold text-[#192A48]">{isAr ? 'فلسفة التدريب: ' : 'Pedagogy: '}</span>
                <span className="line-clamp-2">{ins.pedagogy}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#192A48]/10 flex items-center justify-between text-xs">
              <span className="text-[#192A48]/50">
                {ins.experienceYears} {isAr ? 'سنوات خبرة' : 'yrs experience'}
              </span>
              <Link
                href={`/${locale}/preview/academy/instructors/${ins.slug}`}
                className="font-semibold text-[#5F67B5] hover:text-[#EF6A55]"
              >
                {isAr ? 'الملف الكامل ←' : 'Full Dossier →'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

