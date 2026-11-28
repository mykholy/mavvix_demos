import { ShieldCheck, Cpu, ThermometerSnowflake, FileCheck2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { clearPath } from '@/lib/verticals/diagnostics-lab/data';

interface ClearPathClinicalGovernanceProps {
  locale: Locale;
}

export function ClearPathClinicalGovernance({ locale }: ClearPathClinicalGovernanceProps) {
  const isAr = locale === 'ar';

  const standards = [
    {
      code: 'LAB-01',
      icon: Cpu,
      titleAr: 'معايير ISO 15189 وضوابط الجودة التحليلية',
      titleEn: 'ISO 15189 Analytical Quality & Calibration',
      descAr:
        'إجراء معايرة يومية لجميع أجهزة التحليل الآلية باستخدام محاليل قياسية معتمدة وتطبيق قواعد Westgard لضمان دقة القراءات وإلغاء أي خطأ عشوائي أو منهجي.',
      descEn:
        'Strict daily calibration across all high-throughput analyzers using certified multi-level controls and Westgard multi-rules to eliminate analytical bias.'
    },
    {
      code: 'LAB-02',
      icon: ThermometerSnowflake,
      titleAr: 'سلسلة التبريد المنضبطة والباركود الموحد',
      titleEn: 'Temperature-Monitored Cold-Chain & Barcoding',
      descAr:
        'نقل العينات في حافظات حرارية مراقبة إلكترونياً بين 2 إلى 8 درجات مئوية، مع تشفير باركود إيجابي فريد لكل أنبوب يمنع أي التباس في هوية المريض أو الفحص.',
      descEn:
        'Continuous cold-chain transport logging between 2°C and 8°C paired with primary tube barcode accessioning ensuring unbroken chain-of-custody.'
    },
    {
      code: 'LAB-03',
      icon: FileCheck2,
      titleAr: 'الحد الأدنى للبيانات وحظر السجلات الطبية',
      titleEn: 'Data Minimization & Zero Medical History Storage',
      descAr:
        'استقبال استفسارات إدارية فقط لتنسيق المواعيد وسحب العينات. لا يطلب الموقع أي تفاصيل تشخيصية أو أعراض مرضية، ولا يتم حفظ أي نتائج سريرية عبر الويب.',
      descEn:
        'Pure administrative callback coordination. The portal neither requests nor stores clinical symptoms, medical charts, or patient laboratory reports.'
    },
    {
      code: 'LAB-04',
      icon: ShieldCheck,
      titleAr: 'الفصل الصارم بين الفحص والاستشارة الطبية',
      titleEn: 'Clinical Practice Boundary & Physician Rule',
      descAr:
        'المختبر جهة تحليلية تقدم بيانات رقمية دقيقة للطبيب المعالج. لا يقدم الموقع أي تشخيصات آلية أو تفسيرات علاجية، ويجب مراجعة الطبيب المختص دائماً.',
      descEn:
        'The laboratory provides objective analytical metrics exclusively. We offer zero automated interpretations or prescribing; consult your licensed clinician.'
    }
  ];

  return (
    <section
      data-sector-specific="clearpath-clinical-governance"
      className="bg-white py-16 sm:py-24 border-b border-[#B8DCE2]"
      aria-labelledby="governance-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12334A] text-white text-xs font-bold tracking-widest uppercase">
            <ShieldCheck size={14} className="text-[#38BDF8]" />
            <span>{isAr ? 'حوكمة الجودة المخبرية' : 'Laboratory Quality Governance'}</span>
          </div>
          <h2
            id="governance-heading"
            className="mt-4 text-3xl sm:text-5xl font-black text-[#12334A] tracking-tight leading-tight"
          >
            {isAr ? (
              <>
                بروتوكولات تحليلية صارمة <span className="block text-[#126B8A]">تضمن أمان البيانات ودقة النتائج</span>
              </>
            ) : (
              <>
                Rigorous Diagnostic Protocols <span className="block text-[#126B8A]">Safeguarding Accuracy & Patient Trust</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[#334155] leading-8 text-base">
            {isAr
              ? 'تلتزم ClearPath Diagnostics بأعلى الكودات المخبرية الدولية لإدارة العينات وضبط الجودة دون المساومة على خصوصية المرضى.'
              : 'ClearPath Diagnostics adheres strictly to international clinical laboratory accreditation standards, daily quality control protocols, and data protection.'}
          </p>
        </div>

        {/* Standards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((std) => {
            const Icon = std.icon;
            return (
              <article
                key={std.code}
                className="bg-[#E7F4F6] border border-[#B8DCE2] p-6 flex flex-col justify-between hover:border-[#12334A] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#126B8A] bg-white px-2.5 py-1 border border-[#B8DCE2]">
                      {std.code}
                    </span>
                    <Icon size={22} className="text-[#12334A]" />
                  </div>
                  <h3 className="mt-5 font-black text-lg text-[#12334A] leading-snug">
                    {isAr ? std.titleAr : std.titleEn}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#334155] leading-6">
                    {isAr ? std.descAr : std.descEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#B8DCE2] flex items-center justify-between text-xs font-bold text-[#12334A]">
                  <span>{isAr ? 'بروتوكول معتمد' : 'Audited Protocol'}</span>
                  <div className="w-2 h-2 rounded-full bg-[#126B8A]" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-[#12334A] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="text-xl font-bold text-white">
              {isAr ? 'هل تحتاج تنسيقاً لسحب عينات منزلية أو فحص مؤسسي؟' : 'Need Phlebotomy Scheduling or Corporate Health Coordination?'}
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-[#E0F2FE] leading-6">
              {isAr
                ? 'فريق الدعم الإداري لدينا جاهز لتنسيق مواعيد الفروع والسحب المبرد دون طلب أي بيانات طبية عبر الإنترنت.'
                : 'Our administrative desk assists with branch appointments and cold-chain home visits without requesting sensitive medical data.'}
            </p>
          </div>
          <Link
            href={clearPath(locale, 'contact')}
            className="shrink-0 inline-flex items-center gap-2 bg-[#126B8A] text-white hover:bg-[#38BDF8] hover:text-[#12334A] transition-colors px-6 py-3.5 font-bold text-sm"
          >
            <span>{isAr ? 'طلب معاودة اتصال' : 'Request Callback'}</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
