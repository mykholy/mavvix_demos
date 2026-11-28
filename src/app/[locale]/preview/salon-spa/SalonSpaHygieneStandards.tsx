import React from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  ShieldCheck,
  Sparkles,
  ClipboardCheck,
  HeartHandshake,
  CheckCircle2,
  FileText,
  AlertCircle
} from 'lucide-react';

interface SalonSpaHygieneStandardsProps {
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
    code: 'HYGIENE-01',
    icon: ShieldCheck,
    title: {
      ar: 'التعقيم بالأوتوكلاف والمعايير الطبية للأدوات',
      en: 'Autoclave Sterilization & Hospital-Grade Sanitation'
    },
    description: {
      ar: 'تخضع كافة الأدوات المعدنية والقصاصات والمبارد متعددة الاستخدام لدورات تعقيم حراري مضغوط مع عبوات مختومة تُفتح أمام العميل مباشرة.',
      en: 'All stainless steel tools, nippers, and reusables undergo clinical autoclave thermal cycles sealed in individual pouches opened exclusively in front of the client.'
    },
    criteria: {
      ar: [
        'أكياس تعقيم مختومة مع مؤشرات لونية لتأكيد اكتمال الدورة الحرارية',
        'مستلزمات أحادية الاستخدام (مبارد، بطانات، قفازات) لكل جلسة جديدة',
        'تطهير كيميائي مستمر للمقاعد ومساند الرأس وأحواض البديكير بعد كل استخدام'
      ],
      en: [
        'Sealed autoclave pouches with dynamic thermal cycle confirmation indicators',
        'Single-use disposables (emery boards, buffers, basin liners) per appointment',
        'Hospital-grade surface disinfection between clients for all chairs and headrests'
      ]
    }
  },
  {
    code: 'SKIN-02',
    icon: ClipboardCheck,
    title: {
      ar: 'استشارة فحص الحساسية واختبار المستحضرات',
      en: 'Patch-Testing Protocol & Dermal Sensitivity Profiling'
    },
    description: {
      ar: 'إجراء فحص الحساسية قبل 48 ساعة من صبغات الشعر أو التقشير الكيميائي الخفيف لضمان أمان الفروة والبشرة وتفادي أي رد فعل تحسسي.',
      en: 'Mandatory 48-hour patch testing for oxidative hair tints and mild botanical peels to guarantee scalp safety and preempt adverse dermal reactivity.'
    },
    criteria: {
      ar: [
        'سجل استبياني لحساسية المنتجات وسوابق الحساسية من الأمونيا والعطور',
        'اختبار موضعي على منطقة صغيرة خلف الأذن قبل صبغ الشعر الشامل',
        'استخدام تركيبات نباتية مهدئة خالية من البارابين ومسببات التهيج الشائعة'
      ],
      en: [
        'Detailed intake recording past sensitivities to ammonia, resorcinol, and fragrances',
        'Localized post-auricular test patch before any complete chemical application',
        'Prioritizing clean botanical formulations devoid of parabens and harsh irritants'
      ]
    }
  },
  {
    code: 'TRANSPARENCY-03',
    icon: FileText,
    title: {
      ar: 'شفافية قائمة الخدمات والوقت المحدد مسبقاً',
      en: 'Defined Service Menus & Unhurried Time Allocation'
    },
    description: {
      ar: 'تحديد خطوات كل خدمة بدقة متناهية مع توضيح وقت التنفيذ المتوقع، دون رسوم إضافية خفية أو بيع قسري للمنتجات أثناء الجلسة.',
      en: 'Transparent delineation of treatment steps, expected durations, and clear scope—free from concealed add-ons or intrusive in-session upselling.'
    },
    criteria: {
      ar: [
        'قائمة خدمات واضحة تبيّن المستحضرات المشمولة ونطاق التصفيف',
        'فترات زمنية مريحة تمنع الازدحام وتضمن وقت الاستشارة الكافي',
        'توضيح الفارق بين النتيجة التقديرية والتطابق المطلق مع صور الإلهام'
      ],
      en: [
        'Published service dossiers detailing included formulations and styling scopes',
        'Generous booking buffers preventing waiting room crowding and rushed steps',
        'Honest communication regarding the distinction between inspiration and outcome'
      ]
    }
  },
  {
    code: 'WELLNESS-04',
    icon: HeartHandshake,
    title: {
      ar: 'أخلاقيات العناية وعدم تقديم ادعاءات طبية',
      en: 'Ethical Wellness Boundaries & Non-Medical Governance'
    },
    description: {
      ar: 'نلتزم بنطاق العناية التجميلية والاسترخائية البحتة؛ ولا نقدم تشخيصاً أو علاجاً لأمراض جلدية أو مشاكل تساقط شعر مرضية دون إحالة طبية.',
      en: 'Strict boundary adherence to cosmetic grooming and sensory wellness, refraining from clinical diagnoses or therapeutic claims for dermatological disorders.'
    },
    criteria: {
      ar: [
        'إحالة فورية للعيادات الطبية الجلدية عند ملاحظة أي أعراض غير معتادة',
        'الامتناع عن ادعاءات علاج الثعلبة أو الأكزيما أو الصدفية بمستحضرات الصالون',
        'احترام الخصوصية الفردية وتوفير مساحات مريحة وهادئة لكل ضيفة'
      ],
      en: [
        'Immediate medical referral if unusual dermatological conditions are observed',
        'Zero therapeutic claims regarding alopecia, eczema, or scalp pathology',
        'Absolute privacy protection and quiet spatial serenity for every guest'
      ]
    }
  }
];

export function SalonSpaHygieneStandards({ locale }: SalonSpaHygieneStandardsProps) {
  const ar = locale === 'ar';

  return (
    <div
      data-sector-specific="velora-hygiene-standards"
      className="bg-[#FCF8F5] rounded-3xl border border-[#E8D9D6] p-6 sm:p-10 lg:p-12 shadow-[0_16px_50px_rgba(75,40,52,0.05)]"
    >
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#854D5C]">
          <ShieldCheck size={15} className="text-[#A46D7B]" />
          {ar ? 'ميثاق الجودة والسلامة والتعقيم' : 'Hygiene & Quality Governance Charter'}
        </div>
        <h3 className="velora-display text-2xl sm:text-4xl font-semibold text-[#4B2834] mt-3">
          {ar ? 'أربعة أركان تحمي راحتك وسلامتك في كل تفصيلة' : 'Four Pillars Protecting Your Wellbeing & Peace of Mind'}
        </h3>
        <p className="text-sm text-[#704E59] leading-7 mt-3">
          {ar
            ? 'في عالم الجمال الراقي، تبدأ التجربة الاستثنائية من النظافة الجراحية، الصراحة التامة في الاستشارة، واحترام الخصوصية الفردية دون مساومة.'
            : 'Exceptional beauty rituals begin with clinical sanitation discipline, transparent consultations, and uncompromising respect for your tranquility.'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.code}
              className="bg-white rounded-2xl border border-[#E9DBD8] p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="font-mono text-xs font-extrabold text-[#854D5C] bg-[#F7ECE8] px-2.5 py-1 rounded-md">
                    {pillar.code}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#F7ECE8] text-[#854D5C] flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-[#4B2834]">
                  {ar ? pillar.title.ar : pillar.title.en}
                </h4>

                <p className="text-xs text-[#704E59] leading-6 mt-3">
                  {ar ? pillar.description.ar : pillar.description.en}
                </p>

                <div className="mt-5 pt-5 border-t border-[#F0E2DE] space-y-2">
                  {(ar ? pillar.criteria.ar : pillar.criteria.en).map((crit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#563440] leading-5">
                      <CheckCircle2 size={13} className="text-[#854D5C] shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F4E6E3] flex items-center justify-between text-[11px] text-[#704E59]">
                <span>{ar ? 'معيار ملزم ومُراقب' : 'Audited Protocol'}</span>
                <span className="font-bold text-[#854D5C]">{ar ? 'معتمد 100%' : '100% Compliant'}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-[#F4E6E3] border border-[#E6D4D0] flex items-start gap-3 text-xs leading-6 text-[#563440]">
        <AlertCircle size={16} className="text-[#854D5C] shrink-0 mt-1" />
        <p>
          {ar
            ? 'تنبيه توضيحي: تعرض هذه المعايير النموذج التشغيلي المقترح لمواقع صالونات التجميل المطورة بواسطة مافكس؛ ويتعين على كل صالون فعلي اعتماد بروتوكولاته الصحية المحلية المرخصة.'
            : 'Demonstration Notice: These governance standards reflect the recommended operational framework engineered by Mavvix; commissioned production sites adhere to locally certified health regulations.'}
        </p>
      </div>
    </div>
  );
}
