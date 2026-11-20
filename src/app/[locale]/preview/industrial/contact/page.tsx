import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  Factory,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';

interface Props {
  params: { locale: Locale };
}

export default function IndustrialContactPage({ params }: Props) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-1">
          COMMERCIAL PROCUREMENT CHANNELS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#12243C] tracking-tight">
          {isAr ? 'قنوات التوريد والتواصل التجاري' : 'Industrial Sourcing & Commercial Contact'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {isAr
            ? 'تواصل مع فريق مبيعات التصدير أو المهندسين الاستشاريين لمناقشة متطلبات التوريد والتفاوتات الخاصة.'
            : 'Direct inquiry routes for commercial export contracting, bulk order delivery, and customized technical specs.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-[#12243C] uppercase tracking-wider font-mono border-b border-stone-100 pb-3">
              {isAr ? 'بيانات المكاتب والمصنع (تجريبي)' : 'Demonstrative Facility Inquiries'}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#12243C] block mb-0.5">{isAr ? 'مجمع الصناعات والمستودعات المركزية' : 'Central Manufacturing & Logistics Complex'}</span>
                  <span className="text-stone-600 leading-relaxed">
                    {isAr ? 'المنطقة الصناعية الثالثة، مدينة العاشر من رمضان (عنوان توضيحي لديمو Mavvix)' : 'Industrial Zone 3, 10th of Ramadan City (Concept Demo Address)'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#12243C] block mb-0.5">{isAr ? 'إدارة التصدير والمناقصات' : 'Export & Commercial Sourcing'}</span>
                  <span className="text-stone-600 font-mono">export@ferroline-industrial.demo</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#12243C] block mb-0.5">{isAr ? 'أوقات العمل واستلام الشحنات' : 'Receiving & Sourcing Hours'}</span>
                  <span className="text-stone-600">
                    {isAr ? 'الأحد — الخميس: 8:00 ص — 4:00 م' : 'Sunday — Thursday: 8:00 AM — 4:00 PM'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <Link
                href={`/${locale}/preview/industrial/rfq`}
                className="w-full bg-[#DE9E37] hover:bg-[#c98e2f] text-slate-950 text-xs font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-sm"
              >
                <PackageCheck className="w-4 h-4" />
                <span>{isAr ? 'فتح سلة طلب عروض الأسعار' : 'Open RFQ Basket'}</span>
              </Link>
            </div>
          </div>

          {/* Mavvix Commercial Box */}
          <div className="bg-[#12243C] text-white rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Real Commercial Development</span>
            </div>
            <h4 className="text-sm font-bold">
              {isAr ? 'هل تريد موقعًا رقميًا متقدمًا لمصنعك أو شركتك؟' : 'Need an Advanced Industrial Catalog for Your Factory?'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr
                ? 'فريق Mavvix يطور كتالوجات رقمية متصلة بقواعد بيانات ERP وحسابات دقيقة للـ MOQ وسلات تسعير B2B.'
                : 'Mavvix Software engineers advanced B2B digital catalogs, ERP-connected quoting workflows, and multi-currency commerce.'}
            </p>
            <a
              href={process.env.NEXT_PUBLIC_MAVVIX_SALES_URL || 'https://mavvix.com/'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs font-bold pt-1"
            >
              <span>{isAr ? 'تواصل مع فريق Mavvix الرسمي' : 'Contact Official Mavvix Team'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Sourcing Protocol Guide */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-8 sm:p-10 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-[#12243C] border-b border-stone-100 pb-3">
            {isAr ? 'خطوات اعتماد طلبات التصدير والتوريد' : 'Commercial Procurement Protocols'}
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F4F6F6] border border-stone-200 space-y-1">
              <h4 className="font-bold text-[#12243C]">1. {isAr ? 'تحديد كود الـ SKU وكميات الحد الأدنى (MOQ)' : 'SKU Identification & MOQ Verification'}</h4>
              <p className="text-stone-600 leading-relaxed">
                {isAr ? 'تحديد كود المنتج الدقيق وكمية التوريد المطلوبة مع مراعاة حزم التعبئة القياسية.' : 'Ensure item quantities align with packaging pack multiples.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F6F6] border border-stone-200 space-y-1">
              <h4 className="font-bold text-[#12243C]">2. {isAr ? 'إصدار عرض السعر المبدئي وجدول الشحن (Proforma RFQ)' : 'Proforma Quotation & Shipping Schedule'}</h4>
              <p className="text-stone-600 leading-relaxed">
                {isAr ? 'إعداد تسعير رسمي بناء على ميناء الوصول المعتمد ونوع الحاويات والتأمين البحري.' : 'Issuing FOB/CIF commercial terms matching port requirements.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F6F6] border border-stone-200 space-y-1">
              <h4 className="font-bold text-[#12243C]">3. {isAr ? 'الفحص المعملي وإصدار شهادات 3.1 (Inspection & Release)' : 'Mill Inspection & Type 3.1 Release'}</h4>
              <p className="text-stone-600 leading-relaxed">
                {isAr ? 'إرفاق شهادة الفحص الميكانيكي والتحليل الكيميائي مع كل بوليصة شحن.' : 'Certified mechanical and chemical test reports issued with shipping manifest.'}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500 font-mono">
              {isAr ? 'هل جهزت قائمة طلباتك؟' : 'Ready to submit your items?'}
            </span>
            <Link
              href={`/${locale}/preview/industrial/rfq`}
              className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 font-mono uppercase"
            >
              <span>{isAr ? 'الانتقال لسلة الـ RFQ' : 'Launch RFQ Basket'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

