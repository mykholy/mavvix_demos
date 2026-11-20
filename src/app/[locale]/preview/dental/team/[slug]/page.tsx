import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getDentalPractitionerBySlug, getDentalServices } from '@/lib/db/repositories';
import {
  Calendar, Award, Heart, BookOpen, Clock, AlertTriangle,
  ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck
} from 'lucide-react';

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string }
}) {
  const doc = getDentalPractitionerBySlug(slug, locale);
  if (!doc) return { title: 'Practitioner Not Found' };
  return {
    title: `${doc.name} | Lumen Dental`,
    description: doc.bio
  };
}

export default function DentalPractitionerDetailPage({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string }
}) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const doc = getDentalPractitionerBySlug(slug, locale);
  if (!doc) {
    notFound();
  }

  const allServices = getDentalServices(locale);
  const relevantServices = allServices.filter(s =>
    s.category.toLowerCase().includes(doc.focus.toLowerCase()) ||
    doc.focus.toLowerCase().includes(s.category.toLowerCase()) ||
    (s.attributes?.linked_practitioner_ids || []).includes(doc.id)
  );

  const qualifications = Array.isArray(doc.details?.qualifications)
    ? doc.details.qualifications
    : [
        isAr ? 'زمالة الدراسات العليا في طب الأسنان التحفظي' : 'Postgraduate Fellowship in Restorative Dentistry',
        isAr ? 'اعتماد بروتوكولات العناية المهدئة وتقليل قلق المراجعين' : 'Certified in Gentle Clinical Techniques & Patient De-escalation'
      ];

  const philosophy = doc.details?.philosophy || (
    isAr
      ? 'الاستماع الجيد والتفسير الواضح يمنحان المراجع شعوراً بالاطمئنان والتحكم في كل خطوة.'
      : 'Active listening and calm, unhurried communication ensure patients feel informed and in control throughout their treatment.'
  );

  const consultationDays = doc.details?.consultation_days || (
    isAr ? ['الأحد', 'الثلاثاء', 'الخميس'] : ['Sunday', 'Tuesday', 'Thursday']
  );

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#557874]">
          <Link href={`/${locale}/preview/dental`} className="hover:text-[#193A39]">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/preview/dental/team`} className="hover:text-[#193A39]">
            {isAr ? 'فريق الأطباء' : 'Clinical Team'}
          </Link>
          <span>/</span>
          <span className="text-[#193A39] font-medium">{doc.name}</span>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E0EBE7] shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#EDF5F2] to-[#D5E3DE] flex items-center justify-center font-serif text-3xl sm:text-4xl font-bold text-[#193A39] border border-[#C2D6CF]">
                {doc.name.slice(0, 2)}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5251] bg-[#EDF5F2] px-3 py-1 rounded-full">
                  {doc.focus}
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#193A39]">
                  {doc.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#557874]">
                  {doc.bio}
                </p>
              </div>
            </div>

            <Link
              href={`/${locale}/preview/dental/request-appointment?doctor=${doc.slug}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#193A39] hover:bg-[#234B49] text-white text-xs sm:text-sm font-semibold transition-all shadow"
            >
              <Calendar className="w-4 h-4 text-[#7AC7A5]" />
              <span>{isAr ? 'طلب موعد استشارة' : 'Request Consultation'}</span>
            </Link>
          </div>

          {/* Ethics / Fictional Persona Disclaimer */}
          <div className="p-4 rounded-xl bg-[#FFF9F2] border border-[#F4E3C8] text-[#7A4B1A] text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#C97825] flex-shrink-0 mt-0.5" />
            <span>
              {isAr
                ? 'تنويه الشفافية: هذا الملف التعريفي هو شخصية توضيحية خيالية مخصصة لعرض إمكانيات منصة مافيكس التقنية، ولا يمثل طبيباً أو ترخيصاً حقيقياً.'
                : 'Transparency Notice: This profile represents a fictional illustrative practitioner persona created for Mavvix platform demonstration. No real clinical licenses are claimed.'}
            </span>
          </div>

          {/* Grid of Attributes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#EAEFEF]">
            {/* Care Philosophy */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2C5251]">
                <Heart className="w-4 h-4 text-[#2C5251]" />
                <span>{isAr ? 'فلسفة الرعاية والتواصل' : 'Care Philosophy'}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#466662] leading-relaxed bg-[#F8FBFA] p-4 rounded-xl border border-[#EAEFEF]">
                "{philosophy}"
              </p>
            </div>

            {/* Qualifications & Consultation Days */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2C5251]">
                  <Award className="w-4 h-4 text-[#2C5251]" />
                  <span>{isAr ? 'مجالات التأهيل السريري' : 'Clinical Focus & Background'}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#557874]">
                  {qualifications.map((q: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2C5251] flex-shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-[#F0F7F4] border border-[#D5E3DE] text-xs text-[#2C5251]">
                <div className="flex items-center gap-2 font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isAr ? 'أيام الاستشارة المقترحة' : 'Consultation Windows'}</span>
                </div>
                <p className="text-[11px] text-[#466662]">
                  {consultationDays.join(' • ')} (9:00 AM - 4:00 PM)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Linked Services */}
        {relevantServices.length > 0 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5251]">
                {isAr ? 'الخدمات المرتبطة' : 'Linked Care Pathways'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#193A39]">
                {isAr ? 'إجراءات واستشارات يقدمها الطبيب' : 'Treatments & consultations by this practitioner'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relevantServices.map(s => (
                <div key={s.id} className="p-5 rounded-2xl bg-white border border-[#E0EBE7] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2C5251] bg-[#EDF5F2] px-2 py-0.5 rounded">
                      {s.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#193A39] mt-1">{s.title}</h4>
                    <p className="text-xs text-[#557874] line-clamp-1">{s.summary}</p>
                  </div>
                  <Link
                    href={`/${locale}/preview/dental/services/${s.slug}`}
                    className="text-xs font-semibold text-[#193A39] hover:text-[#2C5251] inline-flex items-center gap-1 flex-shrink-0 ml-4 rtl:ml-0 rtl:mr-4"
                  >
                    <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

