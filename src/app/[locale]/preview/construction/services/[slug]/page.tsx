import { notFound } from 'next/navigation';
import Link from 'next/link';
import { servicesData } from '../page';
import { getProjects } from '@/lib/db/repositories';
import type { Locale } from '@/lib/i18n/config';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calendar,
  Layers,
  Building
} from 'lucide-react';

interface Props {
  params: { locale: Locale; slug: string };
}

export default function ConstructionServiceDossierPage({ params }: Props) {
  const { locale, slug } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const service = servicesData.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  const projects = getProjects('construction', locale).slice(0, 2);

  const faqs = [
    {
      q: isAr ? 'ما هي المدة التقديرية لإعداد جداول التسعير والمقايسة؟' : 'What is the typical turnaround for initial BOQ pricing?',
      a: isAr ? 'يتم تقديم الدراسة الفنية المبدئية وجدول الكميات خلال 3 إلى 5 أيام عمل من استلام المخططات المعمارية ومحددات الموقع.' : 'Initial technical scoping and rate schedules are provided within 3–5 working days upon receiving architectural drawings.'
    },
    {
      q: isAr ? 'كيف يتم التعامل مع فروق أسعار الخامات أثناء فترة التنفيذ؟' : 'How are material price adjustments handled during execution?',
      a: isAr ? 'نعتمد بنود التحوط الهندسي وتوريد الخامات الأساسية مبكرًا وتخزينها في مستودعات معتمدة لتثبيت التكاليف التعاقدية.' : 'We implement advance material procurement and secure warehousing milestone gates to insulate the project from inflationary shocks.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-mono pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Link href={`/${locale}/preview/construction/services`} className="hover:text-[#D26A3B]">
            {isAr ? 'دليل الخدمات' : 'Services Directory'}
          </Link>
          <span>/</span>
          <span className="text-[#162327] font-bold">{service.title[locale]}</span>
        </div>

        <Link
          href={`/${locale}/preview/construction/services`}
          className="text-[#D26A3B] hover:underline font-bold"
        >
          {isAr ? 'العودة لكافة الخدمات' : 'All Services'}
        </Link>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D26A3B]/10 text-[#D26A3B] text-xs font-mono font-bold uppercase tracking-wider">
            <span>PACKAGE // {service.slug.toUpperCase()}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#162327] tracking-tight leading-tight">
            {service.title[locale]}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            {service.desc[locale]}
          </p>
        </div>

        {/* CTA Box */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 pb-2 border-b border-stone-100">
            {isAr ? 'تسعير هذه الحزمة' : 'Package Engagement'}
          </h3>

          <p className="text-xs text-stone-600 leading-relaxed">
            {isAr
              ? 'احصل على عرض سعر تجريبي فوري يوضح البنود والمخرجات عبر معالج التسعير التفاعلي.'
              : 'Generate an itemized simulated tender quotation using our interactive scope builder.'}
          </p>

          <Link
            href={`/${locale}/preview/construction/request-quote?service=${service.slug}`}
            className="w-full bg-[#D26A3B] hover:bg-[#b85629] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-sm"
          >
            <span>{isAr ? 'طلب تسعير هذه الخدمة' : 'Request Package Quote'}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Scope Inclusions / Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-base font-bold text-emerald-800 uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{isAr ? 'البنود المشمولة في نطاق التعاقد' : 'Guaranteed Scope Inclusions'}</span>
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
            {service.inclusions[locale].map((inc, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-base font-bold text-stone-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-stone-400" />
            <span>{isAr ? 'الاستبعادات الصريحة من الحزمة' : 'Explicit Scope Exclusions'}</span>
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
            {service.exclusions[locale].map((exc, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-stone-400 font-bold">•</span>
                <span>{exc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-[#162327] flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#D26A3B]" />
          <span>{isAr ? 'أسئلة شائعة حول الحزمة' : 'Technical Service FAQs'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#F2EFE9] p-5 rounded-xl border border-stone-300/80 space-y-2">
              <h4 className="font-bold text-[#162327]">{faq.q}</h4>
              <p className="text-stone-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Projects */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#162327]">
          {isAr ? 'مشروعات تم تنفيذها باستخدام هذه الحزمة' : 'Projects Delivered Under This Service'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/${locale}/preview/construction/projects/${p.slug}`}
              className="bg-white p-6 rounded-xl border border-stone-200 hover:border-[#D26A3B] transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-2">
                <span>{p.project_type}</span>
                <span>{p.area_m2} m²</span>
              </div>
              <h4 className="text-base font-bold text-[#162327] group-hover:text-[#D26A3B] transition-colors mb-2">
                {p.title}
              </h4>
              <p className="text-xs text-stone-600 line-clamp-2">
                {p.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

