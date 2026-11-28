import { ShieldCheck, Wind, Cpu, FileCheck2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { voltPath } from '@/lib/verticals/solar-energy/data';

interface VoltEdgeEngineeringStandardsProps {
  locale: Locale;
}

export function VoltEdgeEngineeringStandards({ locale }: VoltEdgeEngineeringStandardsProps) {
  const isAr = locale === 'ar';

  const standards = [
    {
      code: 'STD-01',
      icon: Cpu,
      titleAr: 'مواصفات IEC 61215 / 61730 للألواح الفائقة (Tier 1)',
      titleEn: 'IEC 61215 / 61730 Tier-1 PV Module Standards',
      descAr:
        'اعتماد حصري لألواح كهروضوئية أحادية التبلور (Monocrystalline TOPCon) خاضعة لاختبارات التحمل الميكانيكي ومقاومة التدهور الكهربائي (PID / LID) والبيئات الصحراوية عالية الحرارة والغبار.',
      descEn:
        'Exclusive deployment of high-efficiency Monocrystalline TOPCon modules tested against mechanical stress, potential-induced degradation (PID/LID), and extreme arid ambient heat cycles.'
    },
    {
      code: 'STD-02',
      icon: Wind,
      titleAr: 'الحسابات الإنشائية ومقاومة الرياح والحريق',
      titleEn: 'Structural Wind-Load & Fire Safety Compliance',
      descAr:
        'تصميم هياكل التثبيت المصنوعة من الألومنيوم المؤكسد أو الفولاذ المجلفن بالغمس الساخن لتتحمل رياح تصل إلى 140 كم/ساعة، مع عزل كهربائي وحماية من القوس الكهربائي (Arc-Fault Protection) ومعايير مقاومة الحريق من الفئة A.',
      descEn:
        'Engineered anodized aluminum and hot-dip galvanized mounting structures rated for 140 km/h wind loads, complete with DC arc-fault circuit interrupters and Class-A fire spread mitigation.'
    },
    {
      code: 'STD-03',
      icon: FileCheck2,
      titleAr: 'حماية البيانات ودقة توصيف الأحمال',
      titleEn: 'Data Privacy & Measured Load Profiling',
      descAr:
        'نظام استيعاب أولي مبسط لا يشترط رفع فواتير رسمية أو بيانات حساسة. تتم النمذجة الهندسية بناءً على نطاقات استهلاك تقريبية دون مشاركة أي معلومات مع أطراف ثالثة أو شركات تمويل.',
      descEn:
        'Streamlined preliminary intake requiring no mandatory utility bill uploads or private records. Engineering simulations use coarse demand brackets with zero third-party disclosure.'
    },
    {
      code: 'STD-04',
      icon: ShieldCheck,
      titleAr: 'الشفافية الهندسية ونفي وعود العوائد الوهمية',
      titleEn: 'Transparent EPC Scope & Zero Deceptive ROI Claims',
      descAr:
        'إفصاح كامل عن نسب التدهور السنوي للألواح وتكاليف الصيانة الدورية وتغيير العواكس. لا نقدم أي ضمانات مالية ثابتة أو وعود استرداد مضللة دون مراجعة تعرفة الكهرباء المحلية والتشريعات المنظمة.',
      descEn:
        'Full disclosure of annual module degradation rates, inverter replacement cycles, and O&M costs. Strictly zero deceptive payback guarantees without verified local utility tariffs.'
    }
  ];

  return (
    <section
      data-sector-specific="voltedge-engineering-standards"
      className="bg-white py-16 sm:py-24 border-b border-[#D2DBCC]"
      aria-labelledby="standards-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12352D] text-[#C7DA59] text-xs font-bold tracking-widest uppercase">
            <ShieldCheck size={14} className="text-[#C7DA59]" />
            <span>{isAr ? 'معايير الحوكمة الهندسية' : 'Engineering Governance Standards'}</span>
          </div>
          <h2
            id="standards-heading"
            className="mt-4 text-3xl sm:text-5xl font-black text-[#12352D] tracking-tight leading-tight"
          >
            {isAr ? (
              <>
                هندسة معتمدة تضمن <span className="block text-[#264D43]">استدامة وأمان المنظومة على المدى الطويل</span>
              </>
            ) : (
              <>
                Rigorous Engineering Codes <span className="block text-[#264D43]">Safeguarding Long-Term Asset Integrity</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[#334155] leading-8 text-base">
            {isAr
              ? 'تلتزم دراسات وتصميمات VoltEdge Energy بأرقى الكودات الكهروتقنية الدولية واشتراطات السلامة والتحمل الإنشائي الميداني.'
              : 'VoltEdge Energy designs adhere strictly to international electrotechnical standards, structural wind dynamics, and conservative feasibility benchmarks.'}
          </p>
        </div>

        {/* Standards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((std) => {
            const Icon = std.icon;
            return (
              <article
                key={std.code}
                className="bg-[#F5F7F0] border border-[#D2DBCC] p-6 flex flex-col justify-between hover:border-[#12352D] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#264D43] bg-[#E0E9DB] px-2.5 py-1 border border-[#D2DBCC]">
                      {std.code}
                    </span>
                    <Icon size={22} className="text-[#12352D]" />
                  </div>
                  <h3 className="mt-5 font-black text-lg text-[#12352D] leading-snug">
                    {isAr ? std.titleAr : std.titleEn}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#334155] leading-6">
                    {isAr ? std.descAr : std.descEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D2DBCC] flex items-center justify-between text-xs font-bold text-[#12352D]">
                  <span>{isAr ? 'كود معتمد' : 'Verified Standard'}</span>
                  <div className="w-2 h-2 rounded-full bg-[#12352D]" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-[#12352D] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="text-xl font-bold text-white">
              {isAr ? 'هل تحتاج مراجعة هندسية لمخططات منشأتك؟' : 'Need an Independent Technical Audit for Your Facility?'}
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-[#E0E9DB] leading-6">
              {isAr
                ? 'فريق المهندسين المتخصص لدينا يقدم دراسات فنية أولية تحدد الجدوى الحقيقية دون أي ارتباط تجاري مسبق.'
                : 'Our certified engineering team provides objective preliminary assessments defining actual technical feasibility.'}
            </p>
          </div>
          <Link
            href={voltPath(locale, 'assessment')}
            className="shrink-0 inline-flex items-center gap-2 bg-[#C7DA59] text-[#12352D] hover:bg-white hover:text-[#12352D] transition-colors px-6 py-3.5 font-bold text-sm"
          >
            <span>{isAr ? 'ابدأ طلب المراجعة' : 'Start Preliminary Audit'}</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
