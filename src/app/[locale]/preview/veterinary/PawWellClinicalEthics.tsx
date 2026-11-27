'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/i18n/config';
import { Stethoscope, ShieldAlert, HeartPulse, LockKeyhole, CheckCircle2, ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PAWWELL_PHOTOS, PawWellPhoto } from './media';
import { pawPath } from '@/lib/verticals/veterinary/data';

interface EthicsPillar {
  id: string;
  nameEn: string;
  nameAr: string;
  subtitleEn: string;
  subtitleAr: string;
  imageId: PawWellPhoto['id'];
  icon: 'stethoscope' | 'shield' | 'heart' | 'lock';
  thesisEn: string;
  thesisAr: string;
  standardsEn: string[];
  standardsAr: string[];
  clinicalEthicEn: string;
  clinicalEthicAr: string;
}

const PILLARS: EthicsPillar[] = [
  {
    id: 'in_person_exam',
    nameEn: 'Hands-On Clinical Examination Before Any Advice',
    nameAr: 'الفحص السريري المباشر قبل أي استنتاج',
    subtitleEn: 'Digital forms cannot palpate, auscultate, or measure rectal temperature',
    subtitleAr: 'المواقع الإلكترونية لا تستطيع الفحص بالأيدي أو التسمع بالسماعة أو قياس الحرارة',
    imageId: 'vet_exam_dog',
    icon: 'stethoscope',
    thesisEn: 'Veterinary medicine is fundamentally hands-on. Animals cannot verbalize pain, which makes physical palpation of abdomen, orthoscopic examination of ears, dental staging, and cardiopulmonary auscultation mandatory before any care plan is discussed.',
    thesisAr: 'الطب البيطري ممارسة سريرية مباشرة بالأيدي. الحيوانات الأليفة لا تعبر بالكلمات عن الألم، مما يجعل الفحص البدني للبطن، فحص الأذن بالمنظار، وتقييم الأسنان وتسمع ضربات القلب خطوة لا غنى عنها قبل أي تقييم علاجي.',
    standardsEn: [
      'Comprehensive head-to-tail physical inspection protocol',
      'Dual-side thoracic cardiopulmonary auscultation',
      'Abdominal palpation for organomegaly or localized tenderness',
      'Peripheral lymph node assessment and oral mucous membrane evaluation'
    ],
    standardsAr: [
      'بروتوكول فحص بدني شامل من مقدمة الأنف حتى طرف الذيل',
      'تسمع الرئتين والقلب من الجانبين لاستبعاد النفخات القلبية',
      'جس البطن لاستبعاد تضخم الأعضاء أو وجود ألم موضعي',
      'فحص الغدد اللمفاوية السطحية ولون الأغشية المخاطية'
    ],
    clinicalEthicEn: 'Hands-on clinical touch, never remote guesswork.',
    clinicalEthicAr: 'فحص سريري مباشر بالأيدي، لا تخمين من وراء الشاشات.'
  },
  {
    id: 'zero_overpromise',
    nameEn: 'Zero Medical Over-Promise & Honest Prognosis',
    nameAr: 'الشفافية الكاملة وتجنب الوعود العلاجية الزائفة',
    subtitleEn: 'No miracle cure claims, no invented success percentages, and strict diagnostic limits',
    subtitleAr: 'غياب الادعاءات الخيالية بالشفاء التام، عدم وضع نسب نجاح تسويقية، والالتزام بحدود التشخيص',
    imageId: 'feline_checkup',
    icon: 'shield',
    thesisEn: 'Every animal responds uniquely based on age, genetics, and environment. We explicitly reject marketing-driven recovery percentages or guarantees. Branded veterinary flagships must build credibility through transparent owner education and thorough laboratory confirmation.',
    thesisAr: 'تستجيب الحيوانات للعلاج بشكل فردي يختلف حسب السلالة والسن والبيئة. نرفض تمامًا نسب الشفاء التسويقية الخيالية أو الوعود القطعية. بناء الثقة في الممارسة البيطرية يعتمد على مصارحة المربي وتوثيق الفحوصات المخبرية.',
    standardsEn: [
      'Evidence-based differential diagnosis with documented laboratory tiers',
      'Explicit written client consent prior to general anesthesia or surgery',
      'Transparent itemized procedure estimates without hidden add-ons',
      'Zero commercial marketing kickbacks on prescription pharmaceutical lines'
    ],
    standardsAr: [
      'تشخيص تفريقي مبني على الأدلة والفحوصات المعملية الموثقة',
      'موافقة خطية واضحة ومسبقة من المربي قبل التخدير أو التدخل الجراحي',
      'عروض تكلفة مفصلة وشفافة للإجراءات بدون رسوم خفية',
      'غياب أي عمولات تسويقية على الأدوية البيطرية المصروفة'
    ],
    clinicalEthicEn: 'Honest medical realities over persuasive marketing fiction.',
    clinicalEthicAr: 'حقائق سريرية صادقة أهم من الوعود التسويقية.'
  },
  {
    id: 'emergency_triage',
    nameEn: 'Immediate Emergency Triage & Critical Red Flags',
    nameAr: 'الفرز السريع والخطوط الحمراء للحالات الحرجة',
    subtitleEn: 'Clear identification of acute signs requiring emergency 24/7 care, not a web form',
    subtitleAr: 'تحديد دقيق للأعراض الحادة التي تتطلب الذهاب الفوري للمستشفى دون انتظار نموذج',
    imageId: 'surgical_suite',
    icon: 'heart',
    thesisEn: 'A website intake form is asynchronous and administrative. Critical signs like urethral blockage in male cats, persistent vomiting, severe respiratory distress, or vehicular trauma demand immediate emergency hospital intervention without a second of digital delay.',
    thesisAr: 'نموذج الاستفسار في الموقع أداة تنظيمية غير فورية. الحالات الحرجة مثل انحباس البول عند ذكور القطط، القيء المستمر، صعوبة التنفس، أو حوادث الاصطدام تتطلب التوجه الفوري إلى طوارئ العيادات المجهزة دون إضاعة دقيقة في انتظار رد.',
    standardsEn: [
      'Prominent red-flag emergency notice visible on every booking path',
      'Clear triage instructions advising immediate physical hospital transfer',
      'Strict prohibition of asynchronous advice for acute respiratory distress',
      'Guidance for emergency pet stabilization and safe transit handling'
    ],
    standardsAr: [
      'تنبيه طوارئ بارز بلون تحذيري وواضح في كافة مسارات الموقع',
      'إرشادات فرز عاجلة توجه بالانتقال الفوري إلى أقرب مشفى بيطري',
      'منع تقديم أي استشارات مؤجلة في حالات ضيق التنفس الحاد',
      'إرشادات تثبيت ونقل الحيوان المصاب برفق وأمان إلى الطوارئ'
    ],
    clinicalEthicEn: 'Critical triage clarity that saves animal lives.',
    clinicalEthicAr: 'فرز عاجل وواضح ينقذ أرواح الكائنات الضعيفة.'
  },
  {
    id: 'guardian_privacy',
    nameEn: 'Guardian Data Minimization & Privacy Protection',
    nameAr: 'حماية خصوصية المربي وتقليل البيانات الشخصية',
    subtitleEn: 'Zero collection of microchip numbers, residential addresses, or invasive pet files',
    subtitleAr: 'عدم طلب أرقام الشرائح الإلكترونية أو العناوين التفصيلية أو الملفات الطبية الحساسة',
    imageId: 'clinical_lab',
    icon: 'lock',
    thesisEn: 'Public concept demos must never become surveillance funnels. We deliberately restrict public forms to general species, broad age bands, and consented contact details, keeping microchip registries and clinical dossiers safely within certified veterinary management platforms.',
    thesisAr: 'المواقع التعريفية يجب ألا تتحول إلى أدوات لجمع البيانات الحساسة. نكتفي بنوع الحيوان وفئته العمرية العامة وبيانات التواصل بموافقة المربي، بينما تبقى السجلات الطبية وأرقام الشرائح في أنظمة العيادات المعتمدة والمرخصة.',
    standardsEn: [
      'Zero storage of pet microchip IDs, pedigrees, or medical history files',
      'Granular consent checkboxes compliant with data protection directives',
      'Nonbinding administrative reference generation with idempotency keys',
      'Secure server-side validation strictly enforcing authorized schema'
    ],
    standardsAr: [
      'عدم جمع أرقام الشرائح الإلكترونية أو سجلات التطعيم التفصيلية في نموذج عام',
      'موافقة صريحة على شروط التواصل واستخدام البيانات الإدارية',
      'توليد أرقام مراجع طلب غير ملزمة وغير مؤكدة لمواعيد العيادات',
      'فحص أمني دقيق في الخادم يمنع إرسال أي حقول تشخيصية غير مصرح بها'
    ],
    clinicalEthicEn: 'Respecting pet guardian privacy through strict data minimization.',
    clinicalEthicAr: 'احترام خصوصية مربي الحيوانات الأليفة بحصر البيانات في الضروري.'
  }
];

export function PawWellClinicalEthics({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [activePillarId, setActivePillarId] = useState<string>('in_person_exam');

  const activePillar = PILLARS.find(p => p.id === activePillarId) || PILLARS[0];
  const photo = PAWWELL_PHOTOS.find(img => img.id === activePillar.imageId) || PAWWELL_PHOTOS[0];

  return (
    <div className="bg-[#24463D] text-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(36,70,61,0.25)] space-y-10">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#17362D] border border-[#F3B98E]/30 text-xs font-mono font-bold uppercase tracking-widest text-[#F3B98E]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#F3B98E]" />
          <span>{isAr ? 'ميثاق الحوكمة والأخلاقيات البيطرية السريرية' : 'Veterinary Clinical Ethics & Governance Standards'}</span>
        </div>
        <h2 className="paw-display text-3xl sm:text-5xl font-black text-[#FDF6EC] leading-tight">
          {isAr ? 'أربعة مبادئ أخلاقية تحمي صحة أليفك' : 'Four Pillars of Veterinary Integrity'}
        </h2>
        <p className="text-[#DEE8DD] text-sm sm:text-base leading-relaxed">
          {isAr
            ? 'المواقع الطبية الراقية لا تقدم وعودًا تسويقية رنانة، بل تحترم حدود التخصص والمسؤولية الأخلاقية أمام صحة الحيوانات الضعيفة.'
            : 'World-class veterinary digital flagships prioritize clinical honesty, strict diagnostic limits, and ethical guardian protection over commercial marketing exaggerations.'}
        </p>
      </div>

      {/* 4 Pillars Tab Switcher */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {PILLARS.map(p => {
          const active = activePillarId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePillarId(p.id)}
              aria-pressed={active}
              aria-label={isAr ? p.nameAr : p.nameEn}
              className={`p-4 sm:p-5 rounded-2xl border-2 text-start transition-all ${
                active
                  ? 'bg-[#F3B98E] text-[#24463D] border-[#F3B98E] shadow-lg scale-[1.02]'
                  : 'bg-[#17362D] text-[#DEE8DD] border-[#2E554B] hover:border-[#F3B98E]/50 hover:bg-[#1D4036]'
              }`}
            >
              <div className={`text-[11px] font-mono font-bold uppercase ${active ? 'text-[#17362D]' : 'text-[#E2ECE3]'}`}>
                PILLAR // 0{PILLARS.indexOf(p) + 1}
              </div>
              <div className="font-extrabold text-sm sm:text-base mt-2 line-clamp-2 leading-snug">
                {isAr ? p.nameAr : p.nameEn}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Detailed Display */}
      <div className="bg-[#17362D] border border-[#2E554B] rounded-3xl p-6 sm:p-8 lg:p-10 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left: Content & Standards */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#F3B98E] font-bold uppercase tracking-wider">
              {isAr ? activePillar.subtitleAr : activePillar.subtitleEn}
            </span>
            <h3 className="paw-display text-2xl sm:text-3xl font-black text-[#FDF6EC]">
              {isAr ? activePillar.nameAr : activePillar.nameEn}
            </h3>
            <p className="text-sm sm:text-base text-[#D4E3D5] leading-relaxed">
              {isAr ? activePillar.thesisAr : activePillar.thesisEn}
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-black text-[#F3B98E] uppercase tracking-wider">
              {isAr ? 'معايير التطبيق السريري المعتمدة' : 'Verified Clinical Practice Standards'}
            </div>
            <ul className="space-y-2.5">
              {(isAr ? activePillar.standardsAr : activePillar.standardsEn).map((std, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#E2ECE3] bg-[#24463D]/70 p-3 rounded-xl border border-[#2E554B]">
                  <CheckCircle2 className="w-4 h-4 text-[#F3B98E] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{std}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#24463D] border-s-4 border-[#F3B98E] text-xs sm:text-sm text-[#F3B98E] font-bold">
            {isAr ? activePillar.clinicalEthicAr : activePillar.clinicalEthicEn}
          </div>
        </div>

        {/* Right: Media Showcase */}
        <div className="relative rounded-2xl overflow-hidden border border-[#2E554B] shadow-2xl min-h-[300px] sm:min-h-[420px] bg-[#122B24]">
          <Image
            src={photo.src}
            alt={isAr ? photo.altAr : photo.altEn}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17362D] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-[#17362D]/90 backdrop-blur-md border border-[#2E554B] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-extrabold text-xs sm:text-sm text-white truncate">
                {isAr ? photo.titleAr : photo.titleEn}
              </div>
              <div className="text-[11px] text-[#A5C2B4] truncate">
                {photo.author} · {photo.license}
              </div>
            </div>
            <Link
              href={pawPath(locale, 'services')}
              className="shrink-0 px-3 py-1.5 rounded-full bg-[#F3B98E] text-[#24463D] text-xs font-black inline-flex items-center gap-1.5 hover:bg-white transition-colors"
            >
              <span>{isAr ? 'الدليل' : 'Guides'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
