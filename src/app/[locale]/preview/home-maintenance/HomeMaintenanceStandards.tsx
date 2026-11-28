'use client';

import React from 'react';
import {
  ShieldCheck,
  Zap,
  Gauge,
  FileCheck2,
  CheckCircle2,
  Wrench,
  Activity,
  Layers
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';

interface MaintenancePillar {
  id: string;
  code: string;
  icon: typeof ShieldCheck;
  title: { ar: string; en: string };
  tagline: { ar: string; en: string };
  description: { ar: string; en: string };
  criteria: Array<{ ar: string; en: string }>;
}

const MAINTENANCE_PILLARS: MaintenancePillar[] = [
  {
    id: 'safety-isolation',
    code: 'SAFETY-01',
    icon: Zap,
    title: {
      ar: 'عزل مصادر الخطر وبروتوكول الفصل الآمن',
      en: 'Hazard Isolation & Lockout Safety Protocol'
    },
    tagline: {
      ar: 'فصل قواطع الكهرباء وصمامات المياه قبل أي تدخل يدوي',
      en: 'Zero-voltage verification & hydraulic line isolation prior to disassembly'
    },
    description: {
      ar: 'يلتزم الفنيون بفصل مصدر الطاقة الكهربائية والتأكد بجهاز القياس من انعدام الجهد تماما، مع إغلاق محابس المياه المعنية وتفريغ الضغط المتبقي قبل فك أي وصلات أو أجزاء ميكانيكية.',
      en: 'Technicians strictly verify zero-voltage state with calibrated test probes and close designated branch isolation valves to bleed residual hydraulic pressure before touching internal components.'
    },
    criteria: [
      {
        ar: 'فحص التأريض وسلامة عزل الأسلاك بمقياس الجهد قبل لمس أي لوحة كهربائية',
        en: 'CAT III voltage verification of panel chassis and neutral ground integrity'
      },
      {
        ar: 'تفريغ ضغط الدوائر الهيدروليكية والتأكد من إحكام إغلاق محابس المحاذاة',
        en: 'Controlled drainage of hydraulic lines avoiding pressure blast and water damage'
      },
      {
        ar: 'استخدام معدات حماية شخصية معتمدة (PPE) متوافقة مع معايير السلامة الصناعية',
        en: 'Certified insulated hand tools, dielectric footwear and splash safety goggles'
      }
    ]
  },
  {
    id: 'root-cause-audit',
    code: 'DIAG-02',
    icon: Gauge,
    title: {
      ar: 'التشخيص بالأجهزة وتوثيق السبب الجذري',
      en: 'Instrument-Verified Root Cause Diagnosis'
    },
    tagline: {
      ar: 'الاعتماد على القياس الرقمي بدل التخمين العشوائي',
      en: 'Empirical sensor data and diagnostic instruments eliminating guesswork'
    },
    description: {
      ar: 'لا يُقبل استبدال أي قطعة أو شحن وسيط تبريد بناءً على افتراضات سطحية؛ بل يتم قياس التيارات، الضغوط، فارق درجات الحرارة، وفحص استمرارية التوصيل لتوثيق العطل الفعلي بالأرقام.',
      en: 'Prohibiting speculative part swaps or premature refrigerant charging. Every fault must be substantiated with digital sensor telemetry, thermal differential readings, and circuit continuity logs.'
    },
    criteria: [
      {
        ar: 'قياس فارق درجات حرارة التبريد (Delta-T) ومعدل سحب أمبير الضاغط والمروحة',
        en: 'Documenting coil temperature drop and compressor run-amp draw against OEM ratings'
      },
      {
        ar: 'اختبار هبوط الضغط الهيدروليكي لتحديد وجود تسريب ميكانيكي غير ظاهر',
        en: 'Static gauge pressure hold testing isolating concealed wall plumbing micro-leaks'
      },
      {
        ar: 'فحص حراري بالأشعة تحت الحمراء لنقاط الاتصال الكهربائية لكشف نقاط السخونة',
        en: 'Infrared thermographic scans detecting loose terminal high-resistance hotspots'
      }
    ]
  },
  {
    id: 'transparent-scope',
    code: 'TRANSPARENCY-03',
    icon: FileCheck2,
    title: {
      ar: 'شفافية التسعير والموافقة المسبقة على النطاق',
      en: 'Itemized Scope of Work & Written Authorization'
    },
    tagline: {
      ar: 'فصل رسوم المعاينة عن تكلفة القطع والمصنعية',
      en: 'Distinct diagnostic assessment fee, transparent parts pricing & zero hidden extras'
    },
    description: {
      ar: 'توضيح رسوم الكشف بشكل منفصل، وتقديم مقايسة مكتوبة ومفصلة تفصل بين أجور الأيدي الفنية وتكلفة قطع الغيار الأصلية، مع حظر تنفيذ أي أعمال إضافية دون موافقة مسبقة من العميل.',
      en: 'Clear itemization of initial inspection fees, labor costs, and manufacturer-certified component pricing. No scope expansion or additional repairs proceed without explicit homeowner authorization.'
    },
    criteria: [
      {
        ar: 'تسليم مقايسة مفصلة قبل الشروع في فك القطع أو شراء المواد البديلة',
        en: 'Written scope estimate delivered prior to component uncoupling or material procurement'
      },
      {
        ar: 'تحديد القطع الإلزامية لاستعادة الوظيفة مقارنة بالتحسينات الوقائية الاختيارية',
        en: 'Explicit separation of mandatory repairs versus optional preventive upgrades'
      },
      {
        ar: 'تقديم فواتير رسمية موثقة لقطع الغيار الأصلية المستخدمة في الإصلاح',
        en: 'Official vendor receipt validation for genuine replacement parts and hardware'
      }
    ]
  },
  {
    id: 'digital-work-order',
    code: 'RECORD-04',
    icon: ShieldCheck,
    title: {
      ar: 'توثيق أمر العمل الرقمي وتسليم القطع التالفة',
      en: 'Digital Work Order & Replaced Parts Handover'
    },
    tagline: {
      ar: 'تقرير فني رقمي وضمان مكتوب على الأعمال المنفذة',
      en: 'Photographic defect log, parts return to client & structured workmanship warranty'
    },
    description: {
      ar: 'عند إتمام المهمة، يتسلم العميل تقرير صيانة رقمي يتضمن صور ما قبل وبعد الإصلاح، مع تسليم كافة القطع والمكونات القديمة المستبدلة، وضمان مدون على جودة التركيب والتشغيل.',
      en: 'Upon completion, the client receives a digital service report featuring before/after photographic logs, physical return of all replaced defective parts, and an explicit written workmanship warranty.'
    },
    criteria: [
      {
        ar: 'تسليم كافة القطع المستبدلة القديمة للعميل للتحقق من سلامة الاستبدال',
        en: 'Physical presentation and handover of all replaced defective parts to client'
      },
      {
        ar: 'إصدار أمر عمل رقمي مسجل برقم مرجعي يوثق تاريخ الزيارة والتفاصيل الفنية',
        en: 'Digital reference voucher detailing visit timestamp, technician identity, and work log'
      },
      {
        ar: 'ضمان مكتوب على جودة المصنعية وإحكام التوصيلات لمدة محددة تعاقديا',
        en: 'Clear contractual warranty window covering labor craftsmanship and joint seal integrity'
      }
    ]
  }
];

export function HomeMaintenanceStandards({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';

  return (
    <section
      data-sector-specific="maintenance-engineering-standards"
      className="py-20 sm:py-28 bg-[#0E1E31] text-white border-t border-[#1B324D] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-[#F7B347] text-xs font-black tracking-[.22em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-[#F7B347]" />
            {ar ? 'ميثاق الجودة والحوكمة الفنية' : 'FACILITY ENGINEERING CHARTER'}
          </p>
          <h2 className="font-black text-3xl sm:text-5xl mt-5 leading-tight tracking-tight text-white">
            {ar ? (
              <>
                معايير هندسية صارمة. <span className="text-[#F7B347]">أمان منزلك وسلامة عائلتك أولا.</span>
              </>
            ) : (
              <>
                Strict Engineering Governance. <span className="text-[#F7B347]">Home Safety & Transparent Execution.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[#CBD5E1] text-sm sm:text-base leading-8">
            {ar
              ? 'تعتمد خدمات الصيانة المنزلية الاحترافية على أربعة ركائز للحوكمة والسلامة الفنية، تضمن حماية العقار من الأخطار الكهربائية والتسريبات، وتمنحك فاتورة واضحة خالية من التكاليف المجهولة.'
              : 'Professional home maintenance operates on four foundational governance pillars ensuring electrical safety, hydraulic integrity, transparent itemized work orders, and accountable craftsmanship.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {MAINTENANCE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-[#13253B] border border-[#1B324D] rounded-3xl p-7 sm:p-9 hover:border-[#F7B347] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-[#1B324D]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0B1726] border border-[#1B324D] flex items-center justify-center text-[#F7B347]">
                        <Icon size={20} />
                      </div>
                      <span className="font-mono text-xs font-black text-[#F7B347]">
                        {pillar.code}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#CBD5E1]">
                      {ar ? 'معيار حوكمة' : 'Standard'}
                    </span>
                  </div>

                  <h3 className="font-black text-xl text-white mt-6 leading-snug">
                    {pillar.title[locale]}
                  </h3>
                  <p className="text-xs text-[#F7B347] font-bold mt-1 tracking-wide">
                    {pillar.tagline[locale]}
                  </p>
                  <p className="mt-4 text-sm text-[#CBD5E1] leading-7">
                    {pillar.description[locale]}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#1B324D] space-y-2.5">
                    {pillar.criteria.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                        <CheckCircle2 size={16} className="text-[#F7B347] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item[locale]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1B324D]/60 flex items-center justify-between text-xs font-mono text-[#CBD5E1]">
                  <span>{ar ? 'حالة الاعتماد:' : 'Compliance Status:'}</span>
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F7B347]" />
                    {ar ? 'إلزامي في كل زيارة' : 'Mandatory Protocol'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
