import React from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Activity,
  Dumbbell,
  Clock,
  Layers,
  HeartPulse
} from 'lucide-react';

interface FitnessFacilityStandardsProps {
  locale: Locale;
}

interface StandardPillar {
  code: string;
  icon: React.ElementType;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  criteria: { ar: string[]; en: string[] };
}

const PILLARS: StandardPillar[] = [
  {
    code: 'BIOMECHANICS-01',
    icon: Dumbbell,
    title: {
      ar: 'أولوية التكنيك الميكانيكي ومكافحة الأوزان المتهورة',
      en: 'Form-First Biomechanics & Zero Ego Lifting'
    },
    description: {
      ar: 'لا نكافئ الرفع الخاطئ أو الشدة على حساب المفاصل؛ يُلزم كل متدرب بإتقان نمط الحركة الميكانيكي السليم قبل إضافة أي وزن زائد على البار.',
      en: 'Kinetic integrity precedes load. Athletes are required to demonstrate strict spinal alignment and joint tracking before progressive overload is sanctioned.'
    },
    criteria: {
      ar: [
        'فحص حركي مجاني في أول زيارة لتقييم عمق القرفصاء وثبات الكتف',
        'تدريب المدربين على التدخل الفوري لتصحيح زوايا الرفع الخاطئة',
        'تحديد أوزان التدريب وفق معدل الجهد المدرك (RPE) وليس الأرقام الوهمية'
      ],
      en: [
        'Mandatory movement assessment on first arrival checking squat and hip hinge',
        'Coaches empowered to adjust or scale weights immediately upon form breakdown',
        'Targeting Rate of Perceived Exertion (RPE) instead of arbitrary maximums'
      ]
    }
  },
  {
    code: 'SAFETY-02',
    icon: ShieldCheck,
    title: {
      ar: 'اختبارات أحمال المعدات وسلامة أرضية الصالة',
      en: 'Equipment Load Certification & Floor Safety'
    },
    description: {
      ar: 'تخضع كافة أجهزة الكابلات والبارات والمنصات المطاطية لصيانة دورية معتمدة لمنع انقطاع الأسلاك وتوفير عزل صوتي وامتصاص للصدمات.',
      en: 'Pulleys, cables, Olympic barbells and shock-absorbent drop platforms undergo scheduled stress certification to eliminate mechanical failure and slip hazards.'
    },
    criteria: {
      ar: [
        'فحص دوري شهري لكابلات أجهزة السحب ومقابض الكيتل بل والأقفال',
        'أرضيات مطاطية عالية الكثافة تمتص صدمات إسقاط الأوزان وتحمي المفاصل',
        'مسارات حركة واسعة ومحددة تمنع التعثر أو التزاحم أثناء الرفعات'
      ],
      en: [
        'Monthly tensile load audits on steel cable rigs and collar clamps',
        'High-density vulcanized rubber platforms absorbing kinetic drop forces',
        'Spacious, unobstructed transit corridors around all lifting stations'
      ]
    }
  },
  {
    code: 'TRANSPARENCY-03',
    icon: Clock,
    title: {
      ar: 'شفافية الجدول الرياضي وعدم اختراع مدربين وهميين',
      en: 'Real Timetable Clarity & Verified Coaching Staff'
    },
    description: {
      ar: 'يعرض الموقع التخصصات التدريبية المتاحة بصدق؛ ولا نضع أسماء مدربين أو شهادات غير حقيقية أو ندعي وجود حصص دون مشغّل فعلي للنادي.',
      en: 'Genuine program scopes without fabricated coach rosters. Real staff credentials and slots are only published once approved by the active gym operator.'
    },
    criteria: {
      ar: [
        'توضيح أن المواعيد ونماذج الحصص تجريبية وتنتظر اعتماد المشغّل',
        'الامتناع عن نشر صور مدربين أجانب أو ادعاء أبطال وهميين',
        'تحديد السعة القصوى لكل حصة لمنع التكدس وضمان جودة الإشراف'
      ],
      en: [
        'Explicit notice that timetable slots are illustrative until operator approval',
        'Zero stock photography presented as real local club staff or athletes',
        'Strict capacity caps per session to guarantee personalized coaching'
      ]
    }
  },
  {
    code: 'RECOVERY-04',
    icon: HeartPulse,
    title: {
      ar: 'برمجة التموج الدوري والاستشفاء العصبي العضلي',
      en: 'Periodization Governance & Deload Management'
    },
    description: {
      ar: 'التدريب الذكي يتضمن فترات خفض الأحمال (Deload) وأيام راحة مدروسة لمنع الإجهاد العصبي المزمن والإصابات الناتجة عن فرط التمرين.',
      en: 'Systemic fatigue management incorporating strategic deload phases and active recovery protocols to optimize neuromuscular adaptation.'
    },
    criteria: {
      ar: [
        'برامج تدريبية تتضمن أسابيع خفض أحمال منتظمة كل 4 إلى 6 أسابيع',
        'توجيهات غذائية وترطيبية واستشفائية مصاحبة لكل شدة تدريبية',
        'احترام الحدود الصحية والامتناع عن وصف المكملات أو الهرمونات غير القانونية'
      ],
      en: [
        'Structured 4-to-6 week periodized blocks with scheduled deload intervals',
        'Post-workout hydration and recovery guidelines tailored to session load',
        'Zero promotion of unverified supplements or illegal performance substances'
      ]
    }
  }
];

export function FitnessFacilityStandards({ locale }: FitnessFacilityStandardsProps) {
  const ar = locale === 'ar';

  return (
    <div
      data-sector-specific="pulse-facility-standards"
      className="bg-[#181628] rounded-none border-2 border-[#2D2A42] p-6 sm:p-10 lg:p-12 text-white shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
    >
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#E0FE61]">
          <ShieldCheck size={15} />
          {ar ? 'ميثاق الجودة والأمان الرياضي' : 'ATHLETIC GOVERNANCE & SAFETY CHARTER'}
        </div>
        <h3 className="pulse-display text-3xl sm:text-5xl font-black text-white mt-3 leading-tight tracking-tight">
          {ar ? 'أربعة مبادئ تحمي جسمك وتضمن استمرارية تطورك' : 'FOUR PILLARS SAFEGUARDING YOUR LONGEVITY.'}
        </h3>
        <p className="text-sm text-[#D4D1E2] leading-7 mt-3">
          {ar
            ? 'في النادي الرياضي الحقيقي، القوة الحقيقية تُقاس بالاستدامة وجودة التكنيك، وليس بالمبالغات التسويقية أو الإصابات المتكررة.'
            : 'Sustainable strength requires engineering discipline: verified mechanical form, certified equipment load limits, and honest fatigue management.'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.code}
              className="bg-[#141421] border-2 border-[#2F2C47] p-6 sm:p-8 flex flex-col justify-between hover:border-[#E0FE61] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="font-mono text-xs font-black text-[#E0FE61] bg-[#1E1C30] px-2.5 py-1 border border-[#3A3756]">
                    {pillar.code}
                  </span>
                  <div className="w-10 h-10 bg-[#1E1C30] text-[#E0FE61] flex items-center justify-center border border-[#3A3756]">
                    <Icon size={20} />
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-black text-white">
                  {ar ? pillar.title.ar : pillar.title.en}
                </h4>

                <p className="text-xs text-[#C8C5DB] leading-6 mt-3 font-medium">
                  {ar ? pillar.description.ar : pillar.description.en}
                </p>

                <div className="mt-5 pt-5 border-t border-[#26243A] space-y-2">
                  {(ar ? pillar.criteria.ar : pillar.criteria.en).map((crit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#E5E3F2] leading-5">
                      <CheckCircle2 size={13} className="text-[#E0FE61] shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#26243A] flex items-center justify-between text-[11px] font-mono text-[#8F8CA4]">
                <span>{ar ? 'بروتوكول ملزم ومعتمد' : 'Audited Standard'}</span>
                <span className="font-bold text-[#E0FE61]">{ar ? 'جاهزية 100%' : '100% Verified'}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-[#1F1D33] border-s-4 border-[#E0FE61] flex items-start gap-3 text-xs leading-6 text-[#E0DFED]">
        <AlertCircle size={16} className="text-[#E0FE61] shrink-0 mt-1" />
        <p>
          {ar
            ? 'تنبيه توضيحي: توضح هذه المعايير النموذج التشغيلي الهندسي المقترح لمواقع النوادي الرياضية المطورة من مافكس؛ ويلتزم كل نادي فعلي بتطبيق اشتراطات السلامة والترخيص الرياضي المعتمدة.'
            : 'Demonstration Notice: These athletic standards define the operational framework designed by Mavvix; production commissioned gyms implement their locally approved health and fitness licensing protocols.'}
        </p>
      </div>
    </div>
  );
}
