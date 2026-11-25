import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getDentalServiceBySlug, getDentalPractitioners } from '@/lib/db/repositories';
import {
  Calendar, ShieldAlert, CheckCircle2, Clock, HelpCircle,
  UserCheck, ArrowRight, ArrowLeft, ArrowUpRight, Sparkles
} from 'lucide-react';

export async function generateMetadata(
  props: {
    params: Promise<{ locale: Locale; slug: string }>
  }
) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const service = getDentalServiceBySlug(slug, locale);
  if (!service) return { title: 'Treatment Not Found' };
  return {
    title: `${service.title} | Lumen Dental`,
    description: service.summary
  };
}

export default async function DentalServiceDetailPage(
  props: {
    params: Promise<{ locale: Locale; slug: string }>
  }
) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const service = getDentalServiceBySlug(slug, locale);
  if (!service) {
    notFound();
  }

  const practitioners = getDentalPractitioners(locale);
  const linkedDocIds = service.attributes?.linked_practitioner_ids || ['doc-01'];
  const associatedDocs = practitioners.filter(p => linkedDocIds.includes(p.id) || p.focus === service.category);

  const visitFlow = Array.isArray(service.body?.visit_flow) ? service.body.visit_flow : [
    isAr ? 'الترحيب والاستماع إلى أي مخاوف أو رغبات للمراجع' : 'Welcome and initial consultation regarding your goals',
    isAr ? 'الفحص المباشر باستخدام تصوير رقمي لطيف' : 'Gentle examination supported by low-dose digital diagnostics',
    isAr ? 'شرح التقرير والاتفاق على الخطة والخيارات البديلة' : 'Discussion of findings and collaborative roadmap selection'
  ];

  const faqs = Array.isArray(service.body?.faqs) ? service.body.faqs : [
    {
      q: isAr ? 'هل هذه الاستشارة ملائمة لحالتي؟' : 'Is this consultation suitable for my situation?',
      a: isAr ? 'يقوم أطباؤنا خلال الزيارة الأولى بتقييم دقيق يحدد أفضل مسار علاجي دون أي ضغط.' : 'Our practitioners conduct a careful initial assessment to recommend the most conservative pathway.'
    },
    {
      q: isAr ? 'كم يستغرق هذا الإجراء؟' : 'What is the anticipated duration?',
      a: isAr ? 'تستغرق جلسات الاستشارة المبدئية عادة من 30 إلى 45 دقيقة كاملة.' : 'Initial consultation sessions typically span 30 to 45 dedicated minutes.'
    }
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#557874]">
          <Link href={`/${locale}/preview/dental`} className="hover:text-[#193A39]">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/preview/dental/services`} className="hover:text-[#193A39]">
            {isAr ? 'العلاجات والخدمات' : 'Treatments'}
          </Link>
          <span>/</span>
          <span className="text-[#193A39] font-medium">{service.title}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E0EBE7] shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5251] bg-[#EDF5F2] px-3 py-1 rounded-full">
                {service.category}
              </span>
              <span className="text-xs font-mono text-[#557874]">
                ID: {service.slug}
              </span>
            </div>
            <span className="text-xs text-[#2C5251] font-medium bg-[#F0F7F4] px-2.5 py-1 rounded-md">
              {isAr ? 'رعاية مهدئة ومدروسة' : 'Evidence-Based Care'}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#193A39]">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-[#466662] leading-relaxed max-w-3xl">
            {service.summary}
          </p>

          <div className="pt-4 border-t border-[#EAEFEF] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-[#557874]">
              <Clock className="w-4 h-4 text-[#2C5251]" />
              <span>{isAr ? 'مدة الجلسة الاستشارية المتوقعة: 30 - 45 دقيقة' : 'Estimated duration: 30–45 minutes'}</span>
            </div>
            <Link
              href={`/${locale}/preview/dental/request-appointment?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#193A39] hover:bg-[#234B49] text-white text-xs sm:text-sm font-semibold transition-all shadow"
            >
              <Calendar className="w-4 h-4 text-[#7AC7A5]" />
              <span>{isAr ? 'طلب موعد لهذه الخدمة' : 'Request Appointment for this Service'}</span>
            </Link>
          </div>
        </div>

        {/* Clinical Boundary & Review Notice */}
        <div className="p-5 rounded-2xl bg-[#FFF9F2] border border-[#F4E3C8] text-[#7A4B1A] text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#C97825] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-[#945617]">
              {isAr ? 'إشعار المراجعة الطبية وحدود الخدمة' : 'Clinical Content Review & Non-diagnostic Boundary'}
            </h4>
            <p className="leading-relaxed">
              {isAr
                ? 'محتوى هذه الصفحة تعريفي ومخصص كنموذج عرض استعراضي لمنظومة مافيكس. لا يمثل تشخيصاً طبياً لحالتك الفردية ويخضع للمراجعة والاعتماد من قبل طبيب أسنان مرخص قبل أي تطبيق سريري.'
                : 'The descriptive content in this service dossier is an illustrative framework prepared for Mavvix platform demonstration. Suitability and procedures are determined strictly in-person by a licensed practitioner.'}
            </p>
          </div>
        </div>

        {/* Expected Visit Flow */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0EBE7] shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5251]">
              {isAr ? 'خطوات الزيارة المتوقعة' : 'Expected Clinical Flow'}
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#193A39]">
              {isAr ? 'ما الذي يحدث أثناء موعد الاستشارة؟' : 'What happens during your visit?'}
            </h2>
          </div>

          <div className="space-y-4">
            {visitFlow.map((step: string, idx: number) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FBFA] border border-[#EAEFEF]">
                <div className="w-8 h-8 rounded-full bg-[#193A39] text-[#EDF5F2] flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="pt-1">
                  <p className="text-xs sm:text-sm text-[#193A39] font-medium leading-relaxed">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Associated Practitioners */}
        {associatedDocs.length > 0 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5251]">
                {isAr ? 'المختصون المرتبطون' : 'Associated Specialists'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#193A39]">
                {isAr ? 'أطباء يقدمون هذه الخدمة' : 'Practitioners offering this care pathway'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {associatedDocs.map(doc => (
                <div key={doc.id} className="p-5 rounded-2xl bg-white border border-[#E0EBE7] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#EDF5F2] flex items-center justify-center font-serif text-lg font-bold text-[#193A39]">
                      {doc.name.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#193A39]">{doc.name}</h4>
                      <p className="text-xs text-[#557874]">{doc.focus}</p>
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/preview/dental/team/${doc.slug}`}
                    className="text-xs font-semibold text-[#193A39] hover:text-[#2C5251] inline-flex items-center gap-1"
                  >
                    <span>{isAr ? 'الملف' : 'Profile'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0EBE7] shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5251]">
              {isAr ? 'أسئلة شائعة' : 'Questions & Clarifications'}
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#193A39]">
              {isAr ? 'استفسارات حول هذا الإجراء' : 'Common questions about this treatment'}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-[#F8FBFA] border border-[#EAEFEF] space-y-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-[#193A39] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#2C5251]" />
                  <span>{f.q}</span>
                </h4>
                <p className="text-xs text-[#557874] leading-relaxed pl-6 rtl:pl-0 rtl:pr-6">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="text-center p-8 rounded-3xl bg-[#EDF5F2] border border-[#D5E3DE] space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#193A39]">
            {isAr ? 'هل ترغب في مناقشة هذا الإجراء في العيادة؟' : 'Ready to discuss this care plan in person?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#557874] max-w-lg mx-auto">
            {isAr
              ? 'اختر الفرع والوقت المناسب لك لإجراء استشارة مبدئية هادئة وشاملة.'
              : 'Select your preferred studio branch and time slot for a calm, non-pressured consultation.'}
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/preview/dental/request-appointment?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#193A39] hover:bg-[#234B49] text-white text-xs sm:text-sm font-semibold transition-all shadow"
            >
              <Calendar className="w-4 h-4 text-[#7AC7A5]" />
              <span>{isAr ? 'طلب موعد استشارة تجريبي' : 'Request Consultation Window'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

