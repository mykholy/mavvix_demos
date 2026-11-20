import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getEditorialPosts } from '@/lib/db/repositories';
import FirstVisitChecklist from './FirstVisitChecklist';
import {
  FileText, ShieldCheck, HeartHandshake, CheckCircle2,
  Clock, ArrowRight, ArrowLeft, AlertCircle, Sparkles
} from 'lucide-react';

export const metadata = {
  title: 'First-Visit Patient Guide | Lumen Dental Studio',
  description: 'Practical guidance for your first dental consultation. Interactive non-PII checklist, hygiene standards, and care policies.'
};

export default function DentalPatientGuidePage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const articles = getEditorialPosts('dental', locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold tracking-wider text-[#2C5251] uppercase bg-[#EDF5F2] px-3 py-1 rounded-full">
            {isAr ? 'دليل إرشادي للمراجعين' : 'Care & Comfort Guide'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#193A39]">
            {isAr ? 'الاستعداد للزيارة الأولى' : 'Preparing for Your First Consultation'}
          </h1>
          <p className="text-sm sm:text-base text-[#466662] leading-relaxed">
            {isAr
              ? 'نهدف إلى إزالة أي ارتباك أو قلق قبل زيارتك. تعرف على خطوات استقبالك، وما ننصح بإحضاره، وكيفية تنظيم وقتك معنا بكل هدوء.'
              : 'Our mission is to remove all logistical anxiety prior to your arrival. Review our recommended steps, arrival guidelines, and patient comfort standards.'}
          </p>
        </div>

        {/* Signature Interactive Checklist */}
        <FirstVisitChecklist locale={locale} />

        {/* What to Expect / Arrival Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0EBE7] shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#EDF5F2] flex items-center justify-center text-[#193A39]">
              <HeartHandshake className="w-5 h-5 text-[#2C5251]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#193A39]">
              {isAr ? 'ما الذي نضمنه لراحتك؟' : 'What We Guarantee'}
            </h3>
            <ul className="space-y-2.5 text-xs text-[#557874] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                <span>{isAr ? 'وقت كافٍ للاستماع وشرح جميع التساؤلات دون استعجال.' : 'Generous time to listen, discuss, and answer every question.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                <span>{isAr ? 'عدم إجراء أي تدخل سريري أو مالي دون موافقتك الصريحة المسبقة.' : 'Zero clinical or financial actions without explicit advance agreement.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                <span>{isAr ? 'بيئة صوتية هادئة تعزل ضوضاء المعدات وتساعد على الاسترخاء.' : 'Acoustically insulated suites isolating mechanical equipment noise.'}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0EBE7] shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#EDF5F2] flex items-center justify-center text-[#193A39]">
              <ShieldCheck className="w-5 h-5 text-[#2C5251]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#193A39]">
              {isAr ? 'بروتوكول التعقيم والنظافة' : 'Sterilization Standards'}
            </h3>
            <ul className="space-y-2.5 text-xs text-[#557874] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                <span>{isAr ? 'تعقيم حراري رقمي معتمد من الدرجة الطبية الفائقة (Class B Autoclave).' : 'Hospital-grade Class B autoclaving with barcode verification.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                <span>{isAr ? 'أدوات فحص فردية تُفتح أمام المراجع مباشرة داخل الغرفة.' : 'Individual sterile instrument packs unsealed in patient presence.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                <span>{isAr ? 'فلاتر هواء HEPA لتنقية مستمرة لبيئة العيادة.' : 'Medical HEPA air filtration operating continuously across all suites.'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Informational Patient Articles (8 Articles Seeded) */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5251]">
              {isAr ? 'المقالات التثقيفية' : 'Educational Articles'}
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#193A39]">
              {isAr ? 'مقالات وأدلة صحة الفم والأسنان' : 'Oral Wellness Guides & Articles'}
            </h2>
            <p className="text-xs text-[#557874]">
              {isAr ? 'مقالات تثقيفية عامة خاضعة للمراجعة الطبية (8 مقالات)' : 'General patient education subject to clinical review (8 articles)'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles.map(article => (
              <div
                key={article.id}
                className="bg-white p-5 rounded-2xl border border-[#E0EBE7] hover:border-[#7AC7A5] hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#557874] mb-2">
                    <span className="font-medium text-[#2C5251] bg-[#EDF5F2] px-2 py-0.5 rounded">
                      {article.category || 'General Guide'}
                    </span>
                    <span>300+ words</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#193A39] mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#557874] line-clamp-2 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0F5F3]">
                  <Link
                    href={`/${locale}/preview/dental/patient-guide/${article.slug}`}
                    className="text-xs font-semibold text-[#193A39] hover:text-[#2C5251] inline-flex items-center gap-1.5"
                  >
                    <span>{isAr ? 'قراءة الدليل' : 'Read Article'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

