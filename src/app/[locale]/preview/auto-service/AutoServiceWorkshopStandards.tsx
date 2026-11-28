'use client';

import React from 'react';
import {
  ShieldCheck,
  Cpu,
  FileCheck2,
  PackageCheck,
  CheckCircle2,
  Wrench,
  Gauge,
  ClipboardList
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';

interface StandardPillar {
  id: string;
  code: string;
  icon: typeof ShieldCheck;
  title: { ar: string; en: string };
  tagline: { ar: string; en: string };
  description: { ar: string; en: string };
  criteria: Array<{ ar: string; en: string }>;
}

const WORKSHOP_PILLARS: StandardPillar[] = [
  {
    id: 'root-cause',
    code: 'DIAG-01',
    icon: Cpu,
    title: {
      ar: 'التحقق الفيزيائي من جذر العطل',
      en: 'Root-Cause Physical Verification'
    },
    tagline: {
      ar: 'الكود الحاسوبي بداية بحث وليس فاتورة قطع',
      en: 'Diagnostic codes initiate investigation, not automatic invoices'
    },
    description: {
      ar: 'لا يتم استبدال أي حساس أو قطعة ميكانيكية اعتمادًا على كود العطل وحده؛ يلزم اختبار الدائرة الكهربائية وقياس الضغوط الفيزيائية للتأكد من تلف القطعة فعليًا قبل فكها.',
      en: 'No sensor or mechanical assembly is condemned based solely on an OBD-II trouble code; electrical continuity, signal wave shape, and hydraulic pressure must physically verify component failure.'
    },
    criteria: [
      {
        ar: 'فحص الإشارة المباشرة بالأوسيلوسكوب واختبار سلامة خطوط التغذية والتأريض',
        en: 'Oscilloscope live signal waveform analysis and power/ground wire integrity testing'
      },
      {
        ar: 'قياس خلوص وسماكة القطع بمعدات قياس دقيقة ومقارنتها بدليل المصنع',
        en: 'Micrometer and dial gauge dimensional inspection referenced to factory service tolerances'
      },
      {
        ar: 'فصل الأعراض العارضة الناتجة عن تذبذب البطارية عن الأعطال الحقيقية',
        en: 'Filtering transient low-voltage artifact codes from persistent mechanical component failure'
      }
    ]
  },
  {
    id: 'oem-specs',
    code: 'OEM-02',
    icon: Gauge,
    title: {
      ar: 'مطابقة مواصفات المصنع الصارمة',
      en: 'Strict OEM Specification Matching'
    },
    tagline: {
      ar: 'المواصفة واللزوجة أهم من الاسم التجاري',
      en: 'Engine code viscosity & standards take precedence over branding'
    },
    description: {
      ar: 'استخدام درجات لزوجة السوائل (SAE/API/ACEA) ومعايير تبريد المحرك المعتمدة وفق كود المحرك الدقيق وسنة الصنع، مع الالتزام بعزوم الربط المحددة بمفتاح العزم (Torque Wrench).',
      en: 'Application of exact fluid viscosities (SAE/API/ACEA) and certified coolants matching engine serial code, alongside calibrated torque wrench tightening for every structural fastener.'
    },
    criteria: [
      {
        ar: 'مطابقة كود الزيت المحدد في كتالوج السيارة وليس مجرد زيت متاح بالورشة',
        en: 'Strict cross-referencing of manufacturer oil specification standards, not generic workshop stock'
      },
      {
        ar: 'استخدام فلاتر هواء وزيت بمواصفات حجز ميكرونية أصلية لحماية البساتم',
        en: 'Installation of high-efficiency micron-rated filter elements to safeguard cylinder walls'
      },
      {
        ar: 'ربط مسامير العجل والمحرك بعزم دوران مقنن ومعاير لمنع التواء الأقراص',
        en: 'Calibrated torque wrench application on lug nuts and cylinder heads to avert rotor distortion'
      }
    ]
  },
  {
    id: 'transparent-scope',
    code: 'TRAN-03',
    icon: ClipboardList,
    title: {
      ar: 'اعتماد النطاق الشفاف قبل بدء العمل',
      en: 'Itemized Transparent Scope Authorization'
    },
    tagline: {
      ar: 'لا مفاجآت في الفاتورة ولا أعمال غير متفق عليها',
      en: 'Zero unexpected invoice charges without prior written consent'
    },
    description: {
      ar: 'يحصل العميل على تقرير فحص مفصل يوضح البنود الضرورية للأمان، والبنود الموصى بها لاحقًا، مع توضيح وقت التوريد والتكلفة المحددة وموافقة العميل قبل بدء أي تفكيك.',
      en: 'Clients receive an itemized condition assessment separating urgent safety imperatives from elective preventive maintenance, accompanied by lead-times and fixed labor fees before work begins.'
    },
    criteria: [
      {
        ar: 'تصنيف الملاحظات إلى: حرجة للأمان، صيانة وقائية، أو مراقبة مستقبلية',
        en: 'Triaged report grading: Critical Safety, Preventive Maintenance, or Future Monitoring'
      },
      {
        ar: 'عرض خيارات قطع الغيار (أصلي / مكافئ معتمد) بفروق الضمان بوضوح',
        en: 'Transparent breakdown between Genuine OEM and certified Tier-1 OES parts with warranty terms'
      },
      {
        ar: 'التزام تام بعدم تنفيذ أي بند إضافي دون موافقة مسبقة وموثقة',
        en: 'Strict policy prohibiting additional work execution without prior recorded client sign-off'
      }
    ]
  },
  {
    id: 'digital-passport',
    code: 'PASS-04',
    icon: FileCheck2,
    title: {
      ar: 'التوثيق الرقمي وحق استلام القطع القديمة',
      en: 'Digital History & Replaced Parts Return'
    },
    tagline: {
      ar: 'سجل صيانة رقمي يحفظ قيمة سيارتك وشفافية الفحص',
      en: 'Documented maintenance pedigree preserving resale value and trust'
    },
    description: {
      ar: 'تسليم جميع الأجزاء والقطع المستبدلة للعميل لمعاينتها، مع إصدار سجل صيانة رقمي مفصل يوثق قراءة العداد وتاريخ العمل وأرقام القطع المستخدمة لدعم سجل ملكية السيارة.',
      en: 'Full entitlement to inspect and receive all replaced components upon vehicle handover, coupled with an auditable digital service record detailing odometer, date, and part serials.'
    },
    criteria: [
      {
        ar: 'حق العميل الكامل في استلام القطع القديمة والتأكد من أسباب استبدالها',
        en: 'Unconditional client right to inspect worn components and examine root causes of failure'
      },
      {
        ar: 'فاتورة ضريبية تفصيلية تفصل بين أجور الفحص والعمالة وتكلفة القطع',
        en: 'Itemized fiscal invoice clearly differentiating diagnostic fees, labor hours, and parts'
      },
      {
        ar: 'سجل رقمي يمكن الرجوع إليه عند بيع السيارة لإثبات جودة ودقة صيانتها',
        en: 'Persistent digital maintenance ledger that substantiates vehicle care at resale'
      }
    ]
  }
];

export function AutoServiceWorkshopStandards({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';

  return (
    <section
      data-sector-specific="auto-workshop-standards"
      className="py-20 sm:py-28 bg-[#121822] text-white border-t border-[#1E2736] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-[#F95721] text-xs font-black tracking-[.22em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-[#F95721]" />
            {ar ? 'ميثاق الجودة الهندسية' : 'AUTOMOTIVE ENGINEERING CHARTER'}
          </p>
          <h2 className="font-black text-3xl sm:text-5xl mt-5 leading-tight tracking-tight text-white">
            {ar ? (
              <>
                أربعة أركان للثقة. <span className="text-[#F95721]">وحماية استثمارك في سيارتك.</span>
              </>
            ) : (
              <>
                Four Pillars of Integrity. <span className="text-[#F95721]">Engineered Car Care.</span>
              </>
            )}
          </h2>
          <p className="mt-5 text-[#CBD5E1] text-sm sm:text-base leading-8">
            {ar
              ? 'نهجنا في هندسة تجربة الصيانة يقوم على إلغاء التخمين المكلف، وربط كل قرار بفحص ميكانيكي وحاسوبي موثق ومطابق لمواصفات الشركة المصنعة.'
              : 'Our automotive service philosophy replaces expensive guesswork with transparent diagnostics, documented physical verification, and strict manufacturer engineering adherence.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {WORKSHOP_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-[#171E29] border border-[#2A3649] p-8 rounded-[2rem] hover:border-[#F95721]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-[#2A3649]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#0F141C] border border-[#37475E] flex items-center justify-center text-[#F95721]">
                        <Icon size={24} />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-black text-[#F95721]">
                          {pillar.code}
                        </span>
                        <h3 className="font-black text-lg text-white">
                          {pillar.title[locale]}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs font-bold text-[#E2E8F0] uppercase tracking-wide">
                    {pillar.tagline[locale]}
                  </p>

                  <p className="mt-3 text-sm text-[#94A3B8] leading-7">
                    {pillar.description[locale]}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#2A3649]">
                  <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">
                    {ar ? 'معايير التحقق والتطبيق:' : 'Operational Verification Standards:'}
                  </p>
                  <ul className="space-y-2">
                    {pillar.criteria.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                        <CheckCircle2 size={15} className="text-[#F95721] shrink-0 mt-0.5" />
                        <span>{item[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
