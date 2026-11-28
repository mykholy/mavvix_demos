import { ShieldCheck, Sparkles, Utensils, Feather, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { oasisPath } from '@/lib/verticals/boutique-hotel/data';

interface OasisHospitalityStandardsProps {
  locale: Locale;
}

export function OasisHospitalityStandards({ locale }: OasisHospitalityStandardsProps) {
  const isAr = locale === 'ar';

  const standards = [
    {
      code: 'HST-01',
      icon: Feather,
      titleAr: 'العمارة الحجرية والمواد الطبيعية',
      titleEn: 'Vernacular Architecture & Biophilic Craft',
      descAr:
        'بناء متناغم مع بيئة الواحة باستخدام الحجر الجيري والكرشيف وجذوع النخيل، مما يحقق عزلاً حرارياً طبيعياً وهواءً نقياً دون اعتماد مفرط على التكييف الصناعي.',
      descEn:
        'Architectural harmony rooted in traditional limestone, palm timber, and earthen plaster, maintaining natural thermal comfort and breathable sanctuaries.'
    },
    {
      code: 'HST-02',
      icon: Utensils,
      titleAr: 'مائدة المزرعة والطهي البطيء',
      titleEn: 'Zero-Kilometer Farm-to-Table Gastronomy',
      descAr:
        'قوائم طعام موسمية تتغير يومياً بما تجود به مزارع النخيل والزيتون المحلية. نعتمد على الفخار التراثي والطهي البطيء دون أي إضافات صناعية أو أطعمة مجمدة.',
      descEn:
        'Daily menus dictated by local grove harvests and artisan farmers, prepared in traditional terracotta tagines with cold-pressed olive oil and heirloom grains.'
    },
    {
      code: 'HST-03',
      icon: ShieldCheck,
      titleAr: 'الخصوصية التامة والحد الأدنى للبيانات',
      titleEn: 'Privacy by Design & Minimal Data Intake',
      descAr:
        'استقبال أولي خفيف لا يطلب أرقام بطاقات بنكية أو مسح جوازات سفر رقمياً. نحفظ تفضيلات الإقامة الأساسية فقط للمراجعة المباشرة من قبل الفندق الفعلي.',
      descEn:
        'Thoughtful non-invasive intake requiring zero digital passport scans or online payment details. We collect only coarse travel preferences for personal host review.'
    },
    {
      code: 'HST-04',
      icon: Sparkles,
      titleAr: 'الضيافة الإنسانية وحدود السكينة',
      titleEn: 'Human-Verified Hosting & Rest Boundaries',
      descAr:
        'ترحيب شخصي حقيقي من فريق ضيافة يقدر الهدوء. نلتزم بساعات صمت تضمن سكينة الفناء ومسابح الاسترخاء دون صخب أو مجموعات سياحية عابرة.',
      descEn:
        'Genuine personal hosting from caretakers dedicated to stillness. Strict calm-hours protect the courtyard sanctuary and thermal waters from disruption.'
    }
  ];

  return (
    <section
      data-sector-specific="oasis-hospitality-standards"
      className="bg-white py-16 sm:py-24 border-b border-[#D9CDBB]"
      aria-labelledby="standards-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#46543C] text-[#F5F0E6] text-xs font-bold tracking-widest uppercase">
            <ShieldCheck size={14} className="text-[#CBA676]" />
            <span>{isAr ? 'ميثاق الضيافة الأصيلة' : 'Slow Hospitality Governance'}</span>
          </div>
          <h2
            id="standards-heading"
            className="mt-4 font-serif text-3xl sm:text-5xl font-normal text-[#282A25] tracking-tight leading-tight"
          >
            {isAr ? (
              <>
                مبادئ الضيافة التي تحمي <span className="block italic text-[#46543C]">روح المكان وسكينة الضيوف</span>
              </>
            ) : (
              <>
                Hospitality Principles Preserving <span className="block italic text-[#46543C]">Sanctuary & Timeless Solitude</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[#334155] leading-8 text-base">
            {isAr
              ? 'نؤمن أن الفندق الصغير ليس مجرد مكان للمبيت، بل ملاذ إنساني يعيد للإنسان اتصاله بالطبيعة والتراث والإيقاع الهادئ.'
              : 'We believe a boutique sanctuary is not merely accommodation, but a human haven reconnecting travelers with architectural heritage and unhurried rest.'}
          </p>
        </div>

        {/* Standards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((std) => {
            const Icon = std.icon;
            return (
              <article
                key={std.code}
                className="bg-[#F5F0E6] border border-[#D9CDBB] p-6 flex flex-col justify-between hover:border-[#46543C] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#46543C] bg-[#E7DCC9] px-2.5 py-1 border border-[#D9CDBB]">
                      {std.code}
                    </span>
                    <Icon size={22} className="text-[#46543C]" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl text-[#282A25] leading-snug">
                    {isAr ? std.titleAr : std.titleEn}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#334155] leading-6">
                    {isAr ? std.descAr : std.descEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D9CDBB] flex items-center justify-between text-xs font-bold text-[#46543C]">
                  <span>{isAr ? 'معيار موثق' : 'Verified Standard'}</span>
                  <div className="w-2 h-2 rounded-full bg-[#46543C]" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-12 bg-[#282A25] text-[#F5F0E6] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-serif text-2xl text-white">
              {isAr ? 'هل تبحث عن إقامة خاصة أو مناسبة هادئة؟' : 'Seeking a Private Sabbatical or Intimate Gathering?'}
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-[#E7DCC9] leading-6">
              {isAr
                ? 'يقدم فريق الضيافة لدينا استشارات مخصصة لتنظيم الإقامات الممتدة والخلوات الإبداعية مع تأكيد مباشر من الفندق الفعلي.'
                : 'Our hosts provide personal consultations for extended writing stays and intimate retreats subject to property availability.'}
            </p>
          </div>
          <Link
            href={oasisPath(locale, 'stay')}
            className="shrink-0 inline-flex items-center gap-2 bg-[#CBA676] text-[#282A25] hover:bg-white transition-colors px-6 py-3.5 font-bold text-sm"
          >
            <span>{isAr ? 'تواصل مع فريق الاستضافة' : 'Connect with Hosts'}</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
