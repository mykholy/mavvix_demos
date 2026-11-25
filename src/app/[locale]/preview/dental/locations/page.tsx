import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getDentalLocations } from '@/lib/db/repositories';
import {
  MapPin, Clock, Phone, CheckCircle2, Calendar,
  ArrowRight, ArrowLeft, Shield, Sparkles, AlertCircle
} from 'lucide-react';

export const metadata = {
  title: 'Clinic Locations & Studios | Lumen Dental',
  description: 'Explore our three calming studio locations across Sheikh Zayed, Heliopolis, and New Cairo.'
};

export default async function DentalLocationsPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const locations = getDentalLocations(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Fold */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold tracking-wider text-[#2C5251] uppercase bg-[#EDF5F2] px-3 py-1 rounded-full">
            {isAr ? 'شبكة الفروع التخصصية' : 'Studios & Locations'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#193A39]">
            {isAr ? 'فروع واستوديوهات لومِن' : 'Lumen Clinical Studios'}
          </h1>
          <p className="text-sm sm:text-base text-[#466662] leading-relaxed">
            {isAr
              ? 'ثلاثة مواقع مصممة بعناية فائقة لتوفير بيئة علاجية مريحة وخالية من التوتر، مجهزة بأحدث تقنيات التصوير الرقمي ونظم التعقيم فائقة الدقة.'
              : 'Three restorative environments engineered for calm consultations, state-of-the-art low-dose digital imaging, and certified sterilization standards.'}
          </p>
        </div>

        {/* Fictional Concept Disclaimer */}
        <div className="p-4 rounded-xl bg-[#EDF5F2] border border-[#D5E3DE] text-[#2C5251] text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-[#2C5251] flex-shrink-0" />
          <span>
            {isAr
              ? 'تنويه: هذه الفروع هي نماذج تخيلية استعراضية لعرض قدرات منصة مافيكس للمراكز الطبية متعددة الفروع، ولا تمثل مواقع عيادات فعلية.'
              : 'Notice: These branch studios represent demonstrative multi-location concept models for Mavvix showcase and do not represent physical medical facilities.'}
          </span>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {locations.map(loc => (
            <div
              key={loc.id}
              className="bg-white rounded-3xl border border-[#E0EBE7] p-6 sm:p-8 hover:shadow-lg hover:border-[#7AC7A5] transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5251] bg-[#EDF5F2] px-3 py-1 rounded-full">
                    {loc.area}
                  </span>
                  <span className="text-[11px] font-mono text-[#557874]">{loc.slug}</span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#193A39]">
                  {loc.name}
                </h2>

                <div className="space-y-2.5 text-xs text-[#557874]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#2C5251] flex-shrink-0 mt-0.5" />
                    <span>{loc.hours}</span>
                  </div>
                </div>

                {/* Features & Amenities */}
                <div className="pt-4 border-t border-[#EAEFEF] space-y-2">
                  <h4 className="text-xs font-bold text-[#193A39] uppercase tracking-wider">
                    {isAr ? 'تجهيزات الفرع ومرافقه:' : 'Studio Amenities:'}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#466662]">
                    {loc.features.map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2C5251] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#EAEFEF]">
                <Link
                  href={`/${locale}/preview/dental/request-appointment?branch=${loc.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#193A39] hover:bg-[#234B49] text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#7AC7A5]" />
                  <span>{isAr ? 'طلب موعد في هذا الفرع' : 'Request Appointment at this Branch'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Floorplan & Environmental Architecture Visualization */}
        <div className="bg-[#193A39] text-[#EDF5F2] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7AC7A5]">
              {isAr ? 'التصميم البيئي والمعماري' : 'Environmental Architecture'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {isAr ? 'مساحات مصممة هندسياً لتقليل التحفيز الحسي' : 'Engineered for Low Sensory Overload'}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {isAr
                ? 'تتميز جميع استوديوهات لومِن بتصميمات خالية من الروائح الطبية الحادة، واستخدام الإضاءة غير المباشرة المتوافقة مع الإيقاع الحيوي، وتوزيع المسافات لمنع التداخل بين المراجعين.'
                : 'All Lumen studios feature circadian indirect illumination, advanced olfactory neutralization, and private acoustic layouts to replace clinical tension with genuine calm.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

