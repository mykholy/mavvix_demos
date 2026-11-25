import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  Building,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function RealEstateContactPage(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-[#A8764F] uppercase tracking-widest block mb-1">
          COMMUNICATION & VIEWING INQUIRIES
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#25312D] tracking-tight font-serif">
          {isAr ? 'قنوات الاستشارة وحجز المعاينات' : 'Property Inquiries & Viewing Consultations'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {isAr
            ? 'تواصل مع مستشاري ميريديان السكنيين للحصول على معلومات تفصيلية حول خطط السداد أو طلب جولة معاينة خاصة.'
            : 'Connect with residential portfolio advisors for installment plan modeling and private site tour scheduling.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Demonstrative Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-[#25312D] uppercase tracking-wider font-mono border-b border-stone-100 pb-3">
              {isAr ? 'مركز المبيعات والتسويق (تجريبي)' : 'Demonstrative Sales Gallery'}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#A8764F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#25312D] block mb-0.5">{isAr ? 'صالة العرض الرئيسية' : 'Flagship Experience Center'}</span>
                  <span className="text-stone-600 leading-relaxed">
                    {isAr ? 'محور الأمل، العاصمة الإدارية الجديدة (عنوان توضيحي لديمو Mavvix)' : 'Al-Amal Axis, New Administrative Capital (Concept Demo Address)'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#A8764F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#25312D] block mb-0.5">{isAr ? 'استشارات المبيعات والملاك' : 'Client Relations & Inquiries'}</span>
                  <span className="text-stone-600 font-mono">inquiries@meridian-residences.demo</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#A8764F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#25312D] block mb-0.5">{isAr ? 'أوقات الزيارات الخاصة' : 'Private Viewing Hours'}</span>
                  <span className="text-stone-600">
                    {isAr ? 'يوميًا: 10:00 ص — 7:00 م (بميعاد مسبق)' : 'Daily: 10:00 AM — 7:00 PM (By Appointment)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <Link
                href={`/${locale}/preview/real-estate/viewing`}
                className="w-full bg-[#A8764F] hover:bg-[#8e613e] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>{isAr ? 'طلب موعد معاينة لوحدة' : 'Request Private Viewing'}</span>
              </Link>
            </div>
          </div>

          {/* Mavvix Commercial Box */}
          <div className="bg-[#25312D] text-white rounded-2xl p-6 border border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Real Commercial Development</span>
            </div>
            <h4 className="text-sm font-bold font-serif">
              {isAr ? 'هل تريد موقعًا رقميًا احترافيًا لشركتك العقارية؟' : 'Need a High-Conversion Platform for Your Agency?'}
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {isAr
                ? 'فريق Mavvix يطور منصات عقارية تفاعلية تضم مقارنات الوحدات، خرائط تفاعلية، وتكاملات CRM لإدارة المبيعات.'
                : 'Mavvix Software engineers bespoke luxury real-estate platforms, interactive floorplan inspectors, and CRM lead capture.'}
            </p>
            <a
              href={process.env.NEXT_PUBLIC_MAVVIX_SALES_URL || 'https://mavvix.com/'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 text-xs font-bold pt-1"
            >
              <span>{isAr ? 'تواصل مع فريق مبيعات Mavvix الرسمي' : 'Contact Official Mavvix Team'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Viewing & Inquiry Process Guide */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-8 sm:p-10 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-[#25312D] border-b border-stone-100 pb-3 font-serif">
            {isAr ? 'خطوات حجز ومعاينة الوحدات السكنية' : 'Viewing Protocol & Due Diligence Steps'}
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F5F0E6] border border-stone-200 space-y-1">
              <h4 className="font-bold text-[#25312D]">1. {isAr ? 'تحديد الوحدات المرشحة والمقارنة الفنية' : 'Candidate Shortlisting & Spec Audit'}</h4>
              <p className="text-stone-600 leading-relaxed">
                {isAr ? 'استعراض مخططات الأدوار، الأسعار الإجمالية، ونسب التحميل لاختيار حتى 3 وحدات.' : 'Compare layout efficiency, bedroom proportions, and price/m² valuations.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F0E6] border border-stone-200 space-y-1">
              <h4 className="font-bold text-[#25312D]">2. {isAr ? 'تنسيق موعد المعاينة الميدانية أو جولة الفيديو' : 'Tour Scheduling & Consultant Allocation'}</h4>
              <p className="text-stone-600 leading-relaxed">
                {isAr ? 'اختيار اليوم والفترة الزمنية المناسبة لمعاينة التشطيبات والإطلالة على الطبيعة.' : 'Select preferred morning/afternoon slot for in-person or live video tour.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F0E6] border border-stone-200 space-y-1">
              <h4 className="font-bold text-[#25312D]">3. {isAr ? 'تسليم جدول السداد والتدفقات المالية' : 'Payment Schedule & Financial Modeling'}</h4>
              <p className="text-stone-600 leading-relaxed">
                {isAr ? 'استلام نموذج خطة التقسيط موضحًا دفعات الصيانة والاستلام دون رسوم خفية.' : 'Itemized schedule detailing downpayment, equal installments, and maintenance fees.'}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">
              {isAr ? 'هل اخترت وحدتك السكنية؟' : 'Ready to request your tour?'}
            </span>
            <Link
              href={`/${locale}/preview/real-estate/viewing`}
              className="text-xs font-bold text-[#A8764F] hover:underline flex items-center gap-1 font-mono uppercase"
            >
              <span>{isAr ? 'ابدأ طلب المعاينة' : 'Schedule Viewing'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

