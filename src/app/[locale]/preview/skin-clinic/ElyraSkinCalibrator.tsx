'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  Sparkles,
  ShieldCheck,
  ScanLine,
  Activity,
  Layers,
  Clock,
  AlertCircle,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import Link from 'next/link';
import { elyraPath } from '@/lib/verticals/skin-clinic/data';

interface PathwayOption {
  id: string;
  name: { ar: string; en: string };
  focusSubtitle: { ar: string; en: string };
  indicativeDuration: string;
  consultationScope: { ar: string; en: string };
  clinicalConsiderations: { ar: string[]; en: string[] };
  preparationSteps: { ar: string[]; en: string[] };
}

const DISCIPLINES: readonly PathwayOption[] = [
  {
    id: 'barrier-health',
    name: {
      ar: 'صحة الحاجز الجلدي والأمراض الالتهابية',
      en: 'Barrier Health & Inflammatory Dermatology'
    },
    focusSubtitle: {
      ar: 'حب الشباب، الوردية، الإكزيما وفرط التصبغ الالتهابي',
      en: 'Acne, Rosacea, Atopic Eczema & Post-Inflammatory Erythema'
    },
    indicativeDuration: '30-45 min',
    consultationScope: {
      ar: 'تقييم سريري شامل لحالة الحاجز الدهني المائي، وتحديد مسببات التهيج الموضعي وموازنة العلاجات الدوائية مع المستحضرات اللطيفة.',
      en: 'Comprehensive physical evaluation of the stratum corneum lipid barrier, identifying triggers and balancing topicals with medical guidance.'
    },
    clinicalConsiderations: {
      ar: [
        'فصل علاج البثور النشطة عن معالجة الآثار والندبات',
        'اختبار تحمل المكونات المقشرة والمستحضرات الدوائية',
        'مراعاة أنواع البشرة الحساسة والحاجز المتضرر'
      ],
      en: [
        'Differentiating active flares from structural scar recovery',
        'Tolerance staging for keratolytic and retinoid therapies',
        'Tailored protocols for reactive and compromised skin barriers'
      ]
    },
    preparationSteps: {
      ar: [
        'إيقاف المقشرات القوية أو مشتقات فيتامين أ لمدة 48 ساعة قبل الزيارة',
        'الحضور بدون مستحضرات تجميل لتسهيل الفحص المباشر',
        'تدوين قائمة المنتجات الموضعية المستخدمة حالياً'
      ],
      en: [
        'Discontinue aggressive exfoliants or topical retinoids 48 hours prior',
        'Arrive with clean, bare skin to facilitate direct visual evaluation',
        'Bring a concise list of current active skincare and medications'
      ]
    }
  },
  {
    id: 'photorejuvenation',
    name: {
      ar: 'التجديد الضوئي والتجميل الطبي غير الجراحي',
      en: 'Aesthetic Photorejuvenation & Non-Ablative Energy'
    },
    focusSubtitle: {
      ar: 'توحيد الملمس واللون، أجهزة الليزر الوعائي وتحفيز الكولاجين',
      en: 'Vascular Lasers, Fractional Texture & Collagen Biostimulation'
    },
    indicativeDuration: '45-60 min',
    consultationScope: {
      ar: 'استشارة متخصصة لمناقشة ملاءمة الإجراءات القائمة على الطاقة الضوئية والترددات الراديوية، مع تحديد فترات التعافي والتوقعات الواقعية.',
      en: 'Consultative assessment of energy-based modality suitability, downtime windows, phototype safety, and realistic aesthetic trajectories.'
    },
    clinicalConsiderations: {
      ar: [
        'مطابقة الطول الموجي الآمن مع نوع البشرة حسب مقياس فيتزباتريك',
        'تحديد فترات التعافي والابتعاد عن التسمير أو التعرض الشمسي',
        'مناقشة البدائل غير الجراحية والتكلفة والمتابعة قبل البدء'
      ],
      en: [
        'Wavelength matching calibrated to Fitzpatrick phototype risk',
        'Mandatory recovery timing and solar UV avoidance windows',
        'Clear informed consent regarding multi-session pacing and costs'
      ]
    },
    preparationSteps: {
      ar: [
        'الامتناع التام عن التسمير أو الحمامات الشمسية لمدة 4 أسابيع قبل الإجراء',
        'إبلاغ الطبيب عن أي تاريخ لندبات الجدرة أو الهربس البسيط',
        'تجنب العلاجات الكيميائية العميقة في الأسبوعين السابقين'
      ],
      en: [
        'Strict avoidance of solar tanning or self-tanners for 4 weeks prior',
        'Disclose any history of post-inflammatory hyperpigmentation or herpes',
        'Refrain from aggressive superficial chemical peels 14 days prior'
      ]
    }
  },
  {
    id: 'dermoscopy',
    name: {
      ar: 'الفحص المجهري للجلد والمتابعة الدورية للشامات',
      en: 'Dermoscopic Surveillance & Baseline Mole Mapping'
    },
    focusSubtitle: {
      ar: 'التصوير البصري المستقطب عالي الدقة للكشف المبكر والتوثيق',
      en: 'High-Resolution Polarized Optical Dermoscopy & Surveillance'
    },
    indicativeDuration: '30-40 min',
    consultationScope: {
      ar: 'فحص مجهري سطحي للآفات الصبغية والميلانينية باستخدام إضاءة مستقطبة لا تكشفها العين المجردة، بهدف التوثيق والمقارنة السريرية.',
      en: 'Microscopic optical examination of melanocytic lesions using cross-polarized surface lighting to document baseline patterns.'
    },
    clinicalConsiderations: {
      ar: [
        'التوثيق الرقمي المقارن للشامات المتغيرة أو المشبوهة',
        'تحديد ما إذا كانت الخزعة التشخيصية مطلوبة سريرياً',
        'وضع جدول فحص سنوي أو نصف سنوي وفقاً للتاريخ العائلي'
      ],
      en: [
        'Comparative optical tracking of atypical or evolving lesions',
        'Objective assessment for clinical necessity of diagnostic biopsy',
        'Custom surveillance recall intervals based on personal risk profile'
      ]
    },
    preparationSteps: {
      ar: [
        'إزالة طلاء الأظافر إذا كانت الشكوى تشمل الأظافر أو أطراف الأصابع',
        'ملاحظة أي شامات جديدة أو تغيرات في الحجم أو الحواف مسبقاً',
        'ارتداء ملابس مريحة يسهل خلعها لفحص الجلد بالكامل'
      ],
      en: [
        'Remove nail varnish if examining periungual or acral regions',
        'Note any evolving, bleeding, or asymmetrically bordered lesions',
        'Wear loose, easily removable clothing for full-body inspection'
      ]
    }
  },
  {
    id: 'restorative-care',
    name: {
      ar: 'العناية الترميمية ومتابعة ما بعد الإجراءات',
      en: 'Post-Procedural Healing & Restorative Regimens'
    },
    focusSubtitle: {
      ar: 'بروتوكولات التهدئة وتسريع التئام البشرة والترطيب الموضعي',
      en: 'Epithelial Healing, Biomimetic Lipids & Calming Protocols'
    },
    indicativeDuration: '20-30 min',
    consultationScope: {
      ar: 'متابعة مراحل تعافي البشرة بعد التقشير أو الليزر أو الوخز الدقيق، وتصميم روتين ترطيب واقٍ يمنع فرط التصبغ ويدعم التئام الأنسجة.',
      en: 'Targeted recovery oversight following peels, lasers or microneedling, establishing gentle barrier replenishment to prevent pigment rebound.'
    },
    clinicalConsiderations: {
      ar: [
        'الالتزام بالحماية الفيزيائية القصوى من الأشعة فوق البنفسجية (SPF 50+)',
        'تجنب نزع القشور السطحية أو فرك المنطقة المعالجة نهائياً',
        'استخدام دهانات دهنية حيوية خالية من العطور والمواد الحافظة'
      ],
      en: [
        'Strict mineral-based broad-spectrum UV protection (SPF 50+)',
        'Zero mechanical peeling or manipulation of healing epidermal crusts',
        'Fragrance-free biomimetic ceramide and centella formulations'
      ]
    },
    preparationSteps: {
      ar: [
        'إحضار تقرير الجلسة السابقة أو توضيح نوع الإجراء المنفذ وتاريخه',
        'الامتناع عن استخدام أي مياه شديدة السخونة أو غرف البخار',
        'الاستمرار على المرطب الموصوف من الطبيب المعالج فقط'
      ],
      en: [
        'Bring procedural documentation detailing laser settings or peel depth',
        'Strictly avoid saunas, strenuous sweat-inducing workouts, or hot baths',
        'Maintain only physician-approved neutral emollient barrier creams'
      ]
    }
  }
];

export function ElyraSkinCalibrator({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [selectedId, setSelectedId] = useState<string>('barrier-health');
  const [phototype, setPhototype] = useState<string>('III');

  const current = DISCIPLINES.find((d) => d.id === selectedId) || DISCIPLINES[0];

  return (
    <section
      data-sector-specific="skin-consultation-calibrator"
      className="bg-[#F7F3EF] py-16 sm:py-24 border-y border-[#E2D7DC]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#754458]">
            {ar ? '٠٢ / معايرة مسارات الاستشارة الجلدية' : '02 / CLINICAL PATHWAY CALIBRATOR'}
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#352B39]">
            {ar ? 'اختر مسار التقييم المناسب لبشرتك' : 'Select your clinical assessment pathway'}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#50434F]">
            {ar
              ? 'تتطلب كل حالة استشارية بروتوكول تحضير خاص وإرشادات فحص مسبقة لضمان دقة الرأي الطبي. استكشف متطلبات الفحص ومدته المتوقعة قبل طلب التواصل الإداري.'
              : 'Every clinical question requires thoughtful preparation and tailored examination criteria. Explore preparatory steps, typical timing, and ethical boundaries before scheduling administrative contact.'}
          </p>
        </div>

        {/* Discipline Navigation Tabs */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DISCIPLINES.map((d) => {
            const active = d.id === selectedId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedId(d.id)}
                aria-pressed={active}
                className={`p-5 text-start transition-all rounded-t-2xl border ${
                  active
                    ? 'bg-[#352B39] text-white border-[#352B39] shadow-md'
                    : 'bg-white text-[#352B39] border-[#D6C9CD] hover:border-[#86566B]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono font-bold ${
                      active ? 'text-[#DCE6DA]' : 'text-[#754458]'
                    }`}
                  >
                    {d.indicativeDuration}
                  </span>
                  {active && <CheckCircle2 size={16} className="text-[#DCE6DA]" />}
                </div>
                <h3 className="mt-3 font-serif text-lg leading-snug font-semibold">
                  {d.name[locale]}
                </h3>
                <p
                  className={`mt-2 text-xs leading-relaxed line-clamp-2 ${
                    active ? 'text-[#E8DFE2]' : 'text-[#6B5A69]'
                  }`}
                >
                  {d.focusSubtitle[locale]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Discipline Detailed Console */}
        <div className="mt-8 bg-white border border-[#D6C9CD] rounded-t-3xl overflow-hidden shadow-sm">
          <div className="p-6 sm:p-10">
            {/* Top Row: Scope & Phototype Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 pb-8 border-b border-[#E8DFE2]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEE3E7] text-[#754458] text-xs font-bold rounded-full mb-3">
                  <Activity size={14} />
                  <span>{current.focusSubtitle[locale]}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#352B39]">
                  {current.name[locale]}
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#50434F]">
                  {current.consultationScope[locale]}
                </p>
              </div>

              {/* Phototype Calibration Card */}
              <div className="bg-[#F7F3EF] border border-[#E2D7DC] p-5 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-[#754458] uppercase">
                    {ar ? 'مقياس فيتزباتريك للبشرة' : 'FITZPATRICK PHOTOTYPE'}
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-white border border-[#D6C9CD] text-[#352B39]">
                    Type {phototype}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#6B5A69]">
                  {ar
                    ? 'يساعد تصنيف تفاعل البشرة مع الأشعة في تحديد درجات أمان العلاجات الضوئية والتقشير.'
                    : 'Phototype staging guides laser wavelength selection and reduces post-inflammatory pigment risk.'}
                </p>

                {/* Phototype buttons */}
                <div className="mt-4 grid grid-cols-6 gap-1.5">
                  {['I', 'II', 'III', 'IV', 'V', 'VI'].map((pt) => {
                    const isSelected = pt === phototype;
                    return (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => setPhototype(pt)}
                        aria-label={`Fitzpatrick Type ${pt}`}
                        className={`py-2 text-xs font-mono font-bold transition-colors ${
                          isSelected
                            ? 'bg-[#352B39] text-white'
                            : 'bg-white text-[#352B39] border border-[#D6C9CD] hover:border-[#86566B]'
                        }`}
                      >
                        {pt}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-[11px] text-[#754458] leading-tight">
                  {ar
                    ? 'ملاحظة: هذا التصنيف توضيحي؛ التقييم الفعلي يجري بملاحظة الطبيب داخل العيادة.'
                    : 'Clinical note: Illustrative staging; actual melanin reactivity verified in clinic.'}
                </p>
              </div>
            </div>

            {/* Bottom Row: Clinical Considerations & Pre-Visit Protocol */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Considerations */}
              <div>
                <div className="flex items-center gap-2 text-[#754458] font-bold text-sm uppercase tracking-wide">
                  <ShieldCheck size={18} />
                  <span>{ar ? 'اعتبارات الرعاية السريرية' : 'Clinical Governance Standards'}</span>
                </div>
                <ul className="mt-4 space-y-3">
                  {current.clinicalConsiderations[locale].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#352B39] leading-relaxed"
                    >
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#754458] mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preparation Steps */}
              <div>
                <div className="flex items-center gap-2 text-[#754458] font-bold text-sm uppercase tracking-wide">
                  <CalendarCheck size={18} />
                  <span>{ar ? 'إرشادات التحضير قبل الزيارة' : 'Pre-Visit Preparation Steps'}</span>
                </div>
                <ul className="mt-4 space-y-3">
                  {current.preparationSteps[locale].map((step, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#352B39] leading-relaxed"
                    >
                      <CheckCircle2 size={16} className="text-[#86566B] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Strict Non-Binding Boundary Banner */}
            <div className="mt-8 bg-[#EEE3E7] border border-[#D6C9CD] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-[#754458] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#352B39] leading-relaxed">
                  {ar
                    ? 'هذا النموذج توضيحي للأغراض الاستكشافية. لا يحفظ تشخيصاً أو حجزاً أو صوراً طبية. التقييم يتطلب لقاءً مباشراً مع طبيب جلدية مؤهل.'
                    : 'This tool is educational and non-binding. It stores no diagnosis, medical records, or photographs. True clinical care requires an in-person assessment by a licensed physician.'}
                </p>
              </div>
              <Link
                href={elyraPath(locale, 'contact')}
                className="shrink-0 inline-flex items-center gap-2 bg-[#352B39] text-white px-5 py-3 text-xs font-bold hover:bg-[#754458] transition-colors"
              >
                {ar ? 'طلب تواصل إداري' : 'Administrative Callback'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
