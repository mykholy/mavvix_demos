import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface Props {
  params: { locale: Locale };
}

export default function ConstructionContactPage({ params }: Props) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-[#D26A3B] uppercase tracking-widest block mb-1">
          COMMUNICATION & INQUIRIES
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#162327] tracking-tight">
          {isAr ? 'قنوات التواصل والتسعير الهندسية' : 'Contact & Project Scoping'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {isAr
            ? 'سواء كنت بصدد طرح مناقصة جديدة، أو ترغب في تدقيق جداول كميات مشروعك الحالي، يمكنك استعراض قنوات التواصل المعتمدة أو بدء معالج التسعير المباشر.'
            : 'Whether issuing a new commercial tender or seeking value-engineering audits, connect with our estimation team or launch the scope builder.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Demonstrative Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-[#162327] uppercase tracking-wider font-mono border-b border-stone-100 pb-3">
              {isAr ? 'بيانات الاستوديو التجريبية' : 'Demonstrative Office Dossier'}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D26A3B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#162327] block mb-0.5">{isAr ? 'المقر الإداري الرئيسي' : 'Administrative Headquarters'}</span>
                  <span className="text-stone-600 leading-relaxed">
                    {isAr ? 'القاهرة الجديدة، التجمع الخامس — القطاع الإداري (عنوان توضيحي لديمو Mavvix)' : 'New Cairo, Sector 5 Administrative District (Demo Concept Address)'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D26A3B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#162327] block mb-0.5">{isAr ? 'المراسلات الهندسية والمناقصات' : 'Engineering & Tender Inquiries'}</span>
                  <span className="text-stone-600 font-mono">tenders@atlas-structures.demo</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#D26A3B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#162327] block mb-0.5">{isAr ? 'ساعات العمل والمتابعة الفنية' : 'Operating Hours'}</span>
                  <span className="text-stone-600">
                    {isAr ? 'الأحد — الخميس: 9:00 ص — 5:00 م' : 'Sunday — Thursday: 9:00 AM — 5:00 PM'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <Link
                href={`/${locale}/preview/construction/request-quote`}
                className="w-full bg-[#D26A3B] hover:bg-[#b85629] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-sm"
              >
                <span>{isAr ? 'الانتقال لمعالج تسعير المناقصات' : 'Tender Scoping Wizard'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Transparent Sales CTA to Mavvix */}
          <div className="bg-[#162327] text-white rounded-2xl p-6 border border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Real Commercial Inquiries</span>
            </div>
            <h4 className="text-sm font-bold">
              {isAr ? 'هل ترغب في بناء موقع أعمال احترافي لشركتك؟' : 'Looking for a Bespoke Website for Your Firm?'}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {isAr
                ? 'فريق Mavvix يقدم حلولاً رقمية وتطوير مواقع وتطبيقات للشركات والمصانع والمؤسسات الكبرى بأعلى معايير هندسة البرمجيات.'
                : 'Mavvix Software engineers production-grade digital platforms, web portals, and ERP integrations for enterprises across the region.'}
            </p>
            <a
              href={process.env.NEXT_PUBLIC_MAVVIX_SALES_URL || 'https://mavvix.com/'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs font-bold pt-1"
            >
              <span>{isAr ? 'تواصل مع فريق مبيعات Mavvix الرسمي' : 'Contact Official Mavvix Team'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Inquiry Guide & Scoping Process */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-8 sm:p-10 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-[#162327] border-b border-stone-100 pb-3">
            {isAr ? 'دليل إعداد مستندات الطرح والمناقصة' : 'Tender Scoping & Qualification Guidelines'}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {isAr
              ? 'للحصول على دراسة سعرية دقيقة وجدول كميات مفصل، نوصي بتجهيز المستندات التالية قبل بدء دراسة المشروع:'
              : 'To enable accurate BOQ takeoff and realistic schedule estimation, please prepare the following baseline documentation:'}
          </p>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F2EFE9] border border-stone-300/80 space-y-1">
              <h4 className="font-bold text-[#162327]">1. {isAr ? 'المخططات المعمارية المعتمدة (Architectural CAD/PDF)' : 'Approved Architectural CAD / PDF'}</h4>
              <p className="text-stone-600 leading-relaxed">
                {isAr ? 'المساقط الأفقية والقطاعات والواجهات بمقياس رسم واضح توضح توزيع الفراغات.' : 'Plan layouts, elevations, and sections with definitive dimensioning.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F2EFE9] border border-stone-300/80 space-y-1">
              <h4 className="font-bold text-[#162327]">2. {isAr ? 'تقرير فحص التربة والمحددات الإنشائية (Soil & Structural Report)' : 'Geotechnical Soil & Foundation Report'}</h4>
              <p className="text-stone-600 leading-relaxed">
                {isAr ? 'خاص بالمشروعات الإنشائية الجديدة لتحديد نوع الأساسات وعمق الحفر المطلوب.' : 'Essential for new builds to determine piling depth, shoring, and sub-grade waterproofing.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F2EFE9] border border-stone-300/80 space-y-1">
              <h4 className="font-bold text-[#162327]">3. {isAr ? 'توصيف رغبات التشطيب وقائمة المواد (Finish Specifications)' : 'Client Finish Schedule & Preferences'}</h4>
              <p className="text-stone-600 leading-relaxed">
                {isAr ? 'تحديد نوعيات الأرضيات والدهانات والعوازل المرغوبة لإعداد بدائل الهندسة القيمية.' : 'Desired surface materials, acoustic ratings, and lighting fixtures.'}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">
              {isAr ? 'هل تريد ملء هذه البيانات خطوة بخطوة؟' : 'Ready to step through our wizard?'}
            </span>
            <Link
              href={`/${locale}/preview/construction/request-quote`}
              className="text-xs font-bold text-[#D26A3B] hover:underline flex items-center gap-1"
            >
              <span>{isAr ? 'ابدأ المعالج التفاعلي' : 'Start Wizard'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

