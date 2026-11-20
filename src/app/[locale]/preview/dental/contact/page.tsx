import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import {
  MapPin, Phone, Mail, Clock, ShieldCheck,
  ChevronRight, ArrowRight, ArrowLeft, AlertCircle, Building2
} from 'lucide-react';

export const metadata = {
  title: 'Contact & Commercial Inquiries | Lumen Dental',
  description: 'Reach our fictional clinic coordination desk or contact Mavvix to commission a custom healthcare website.'
};

export default function DentalContactPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold tracking-wider text-[#2C5251] uppercase bg-[#EDF5F2] px-3 py-1 rounded-full">
            {isAr ? 'قنوات التواصل' : 'Communication & Inquiries'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#193A39]">
            {isAr ? 'تواصل معنا ومع مافيكس' : 'Contact Lumen & Mavvix'}
          </h1>
          <p className="text-sm sm:text-base text-[#466662] leading-relaxed">
            {isAr
              ? 'نموذج للتواصل يوضح الفصل التام بين الاستفسارات التوضيحية للعيادة وبين طلب شراء هذا النظام البرمجي من شركة مافيكس.'
              : 'Clear communication channels separating simulated clinic patient inquiries from genuine commercial platform commissioning by Mavvix.'}
          </p>
        </div>

        {/* Two-Column Grid: Left: Demonstrative Clinic Info; Right: Genuine Mavvix Commercial Opportunity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Fictional Clinic Coordination (Simulated) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0EBE7] shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#2C5251] bg-[#EDF5F2] px-2.5 py-1 rounded-full">
                {isAr ? 'بيانات توضيحية للعيادة' : 'Simulated Clinic Desk'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#193A39]">
                {isAr ? 'مكتب استقبال لومِن' : 'Lumen Reception Desk'}
              </h2>
              <p className="text-xs text-[#557874] leading-relaxed">
                {isAr
                  ? 'قنوات تواصل توضيحية لخدمة المراجعين وتنسيق المواعيد في الاستوديوهات.'
                  : 'Demonstrative channels for studio coordination and patient guidance.'}
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#466662]">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FBFA] border border-[#EAEFEF]">
                <MapPin className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#193A39]">{isAr ? 'المقر الرئيسي (استوديو الشيخ زايد)' : 'Central Studio (Sheikh Zayed)'}</h4>
                  <p className="text-[#557874] mt-0.5">{isAr ? 'مبنى النيل الطبي — الجيزة (عنوان توضيحي)' : 'Executive Medical Suites, Giza (Illustrative)'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FBFA] border border-[#EAEFEF]">
                <Clock className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#193A39]">{isAr ? 'ساعات الاستقبال' : 'Operating Hours'}</h4>
                  <p className="text-[#557874] mt-0.5">{isAr ? 'السبت إلى الخميس: 9:00 ص - 8:00 م' : 'Saturday – Thursday: 9:00 AM – 8:00 PM'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FBFA] border border-[#EAEFEF]">
                <Phone className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#193A39]">{isAr ? 'رقم الهاتف الموحد' : 'Dedicated Line'}</h4>
                  <p className="text-[#557874] mt-0.5">+20 2 0000 0111 (Demo line)</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/${locale}/preview/dental/request-appointment`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#EDF5F2] hover:bg-[#E0EBE7] text-[#193A39] text-xs font-semibold transition-colors"
              >
                <span>{isAr ? 'طلب نافذة موعد تجريبية' : 'Submit Demo Request'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Genuine Mavvix Commercial Offering */}
          <div className="bg-[#193A39] text-[#EDF5F2] rounded-3xl p-6 sm:p-8 shadow-lg space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7AC7A5] text-[11px] font-semibold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'خدمات مافيكس للقطاع الطبي' : 'Mavvix Commercial Agency'}</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-white">
                {isAr ? 'هل تريد موقعاً مماثلاً لعيادتك أو مركزك الطبي؟' : 'Ready to Elevate Your Clinic’s Digital Presence?'}
              </h2>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {isAr
                  ? 'تصمم مافيكس وتبني منصات طبية راقية تجمع بين تجربة المستخدم المهدئة، والتوافق الصارم مع خصوصية بيانات المرضى، وإدارة المحتوى الديناميكية ثنائية اللغة.'
                  : 'Mavvix delivers turnkey, privacy-compliant medical and dental digital platforms designed to build patient trust, elevate brand reputation, and streamline consultation requests.'}
              </p>

              <div className="space-y-2 pt-2 text-xs text-[#A6D4C3]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7AC7A5]" />
                  <span>{isAr ? 'تصميم مخصص فائق الأناقة دون قوالب جاهزة' : '100% bespoke design crafted for healthcare'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7AC7A5]" />
                  <span>{isAr ? 'لوحة تحكم كاملة للمحتوى والأطباء والفروع' : 'Full multi-branch CMS with doctor scheduling'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7AC7A5]" />
                  <span>{isAr ? 'ثنائي اللغة (عربي / إنجليزي) متوافق مع محركات البحث' : 'Bilingual Arabic/English with enterprise SEO'}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <a
                href={process.env.NEXT_PUBLIC_MAVVIX_SALES_URL || 'https://mavvix.com/contact'}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#7AC7A5] hover:bg-[#68B794] text-[#193A39] text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>{isAr ? 'تواصل مع فريق مبيعات مافيكس' : 'Commission This Solution'}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

