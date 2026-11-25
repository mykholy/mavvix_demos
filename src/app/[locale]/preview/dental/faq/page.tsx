import React from 'react';
import { Locale } from '@/lib/i18n/config';
import DentalFaqClient from './DentalFaqClient';
import { ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Patient FAQ & Clinic Policies | Lumen Dental',
  description: 'Common questions regarding gentle consultations, clinic sterilization protocols, pediatric care, and pricing transparency.'
};

export default async function DentalFaqPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const isAr = locale === 'ar';

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-semibold tracking-wider text-[#2C5251] uppercase bg-[#EDF5F2] px-3 py-1 rounded-full">
            {isAr ? 'مركز الإجابات والمعلومات' : 'Patient Help Center'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#193A39]">
            {isAr ? 'الأسئلة الشائعة والسياسات' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-sm sm:text-base text-[#466662] leading-relaxed">
            {isAr
              ? 'إجابات مباشرة ومفصلة حول تجربة الزيارة في لومِن، وسياسات المواعيد، وتقنيات التعقيم ووسائل تقليل القلق السريري.'
              : 'Clear answers concerning consultation flow, anxiety reduction protocols, hygiene standards, and fee transparency.'}
          </p>
        </div>

        {/* Safety Caveat */}
        <div className="p-4 rounded-xl bg-[#FFF9F2] border border-[#F4E3C8] text-[#7A4B1A] text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#C97825] flex-shrink-0 mt-0.5" />
          <span>
            {isAr
              ? 'تنويه: الإجابات الواردة أدناه هي إرشادات عامة ولا تمثل مشورة طبية شخصية. في حال وجود طوارئ أو ألم حاد يرجى التوجه لأقرب مركز طوارئ فموي مجهز.'
              : 'Safety note: FAQ answers represent general administrative and comfort guidance. For acute dental trauma or severe discomfort, please consult an urgent medical care provider.'}
          </span>
        </div>

        {/* Interactive FAQ Component */}
        <DentalFaqClient locale={locale} />
      </div>
    </div>
  );
}

