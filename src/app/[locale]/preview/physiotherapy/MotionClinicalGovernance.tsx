'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/i18n/config';
import { Activity, ShieldCheck, LockKeyhole, Scale, CheckCircle2, ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motionLabPhotos, MotionLabPhoto } from './media';

interface GovernancePillar {
  id: string;
  nameEn: string;
  nameAr: string;
  subtitleEn: string;
  subtitleAr: string;
  imageId: MotionLabPhoto['id'];
  icon: 'activity' | 'shield' | 'scale' | 'lock';
  thesisEn: string;
  thesisAr: string;
  standardsEn: string[];
  standardsAr: string[];
  clinicalEthicEn: string;
  clinicalEthicAr: string;
}

const PILLARS: GovernancePillar[] = [
  {
    id: 'kinetic_testing',
    nameEn: 'Evidence-Based Goniometry & Kinetic Evaluation',
    nameAr: 'التقييم الحركي القياسي والقياسات الزاوية الدقيقة',
    subtitleEn: 'Standardized range-of-motion protocols, kinematic angular measurement, and reproducible baselines',
    subtitleAr: 'بروتوكولات قياس الزوايا المفصلية المعيارية، والقياسات الحركية القابلة للمقارنة والتوثيق',
    imageId: 'gait_rehab',
    icon: 'activity',
    thesisEn: 'Effective rehabilitation requires quantitative measurement rather than visual estimation. We employ calibrated digital inclinometers and goniometric protocols to measure active and passive degrees of arc, establishing reproducible baselines to track objective progress over time.',
    thesisAr: 'التأهيل الحركي الناجح يبدأ بالقياس الكمي الدقيق بدلاً من التخمين البصري. نعتمد على أدوات قياس الزوايا والميول الرقمية المعايرة سريريًا لتحديد المدى الحركي النشط والسلبي، مما يوفر مرجعًا موضوعيًا لرصد التطور الفعلي.',
    standardsEn: [
      'Universal goniometer & digital inclinometer dual-verification',
      'Standardized joint positioning and anatomical landmark palpation',
      'Inter-tester reliability protocols compliant with AMA guides',
      'Formal documented range-of-motion progress tracking curves'
    ],
    standardsAr: [
      'فحص مزدوج باستخدام المنقلة الطبية القياسية ومقياس الميل الرقمي',
      'تثبيت وضعيات الفحص التشريحية الدقيقة وفق المعايير السريرية',
      'بروتوكولات قياس معتمدة وموثوقة تتوافق مع إرشادات الجمعيات الطبية',
      'توثيق منحنيات المدى الحركي عبر الجلسات في سجل المريض'
    ],
    clinicalEthicEn: 'Measured degrees of mobility, not vague qualitative claims.',
    clinicalEthicAr: 'درجات حركة مقاسة بالأرقام، لا أوصاف عامة غير دقيقة.'
  },
  {
    id: 'zero_overpromise',
    nameEn: 'Zero Medical Over-Promise & Honest Recovery Horizons',
    nameAr: 'الشفافية الكاملة وتجنب الوعود العلاجية الزائفة',
    subtitleEn: 'No guaranteed recovery countdowns, no miraculous cure claims, and strict diagnostic boundaries',
    subtitleAr: 'غياب الوعود الوهمية بالشفاء التام، عدم تحديد مواعيد تعافٍ قطعية، والتزام صارم بحدود التخصص',
    imageId: 'joint_mobility',
    icon: 'shield',
    thesisEn: 'Human biological healing does not adhere to marketing schedules. We explicitly reject fabricated success percentages or guarantees of pain elimination. Our clinical role is to structure safe functional movement pathways while qualified medical physicians oversee surgical and pharmaceutical diagnostics.',
    thesisAr: 'التئام الأنسجة البيولوجية يخضع لعوامل فسيولوجية فردية ولا يرتبط بجداول تسويقية. نرفض تمامًا أي ادعاء بنسب نجاح قطعية أو وعود بزوال الألم التام. دورنا هو بناء مسارات حركة آمنة ومنهجية مع توجيه الحالات التي تحتاج تدخلاً جراحيًا أو دوائيًا إلى الأطباء المختصين.',
    standardsEn: [
      'No marketing guarantees of rapid or permanent pain relief',
      'Transparent communication of biological tissue healing timelines',
      'Active referral back to orthopedic or neurological medical teams',
      'Patient-guided functional milestones over commercial visit quotas'
    ],
    standardsAr: [
      'الامتناع التام عن إطلاق وعود تسويقية بالتعافي الفوري',
      'شرح علمي وشفاف للمدد الطبيعية لالتئام الأوتار والأنسجة العضلية',
      'إحالة فورية للجهات الطبية المختصة عند ظهور أي مؤشرات تتجاوز العلاج الطبيعي',
      'ربط استمرار الجلسات بالأهداف الوظيفية وليس بحصص عددية مفروضة'
    ],
    clinicalEthicEn: 'Biological realities and clinical honesty above commercial marketing.',
    clinicalEthicAr: 'الصدق السريري واحترام طبيعة الجسد فوق أي اعتبارات تجارية.'
  },
  {
    id: 'force_dynamometry',
    nameEn: 'Objective Dynamometry & Force Attenuation Analysis',
    nameAr: 'قياس القوة العضلية بالمقاييس الرقمية وتحليل الأحمال',
    subtitleEn: 'Handheld digital force transducers, limb symmetry indexing, and rate of force development (RFD)',
    subtitleAr: 'محولات القوة الرقمية المحمولة، مؤشر التماثل بين الطرفين، ومعدل تصاعد القوة العضلية',
    imageId: 'biomechanics_lab',
    icon: 'scale',
    thesisEn: 'Manual muscle testing alone cannot detect subtle bilateral power deficits that lead to reinjury. By utilizing calibrated load-cell dynamometers, we quantify peak isometric torque and contralateral limb symmetry indices, ensuring athletes achieve verified safety thresholds before high-velocity loading.',
    thesisAr: 'الاختبارات اليدوية البسيطة قد تعجز عن اكتشاف فروق القوة الدقيقة بين الطرفين والتي قد تسبب تكرار الإصابة. باستخدام أجهزة قياس القوة الرقمية المعايرة، نقيس ذروة العزم العضلي بدقة ونسبة التماثل بين الجانبين، للتأكد من وصول الرياضي إلى مستويات الأمان المطلوبة.',
    standardsEn: [
      'Calibrated digital load-cell dynamometers with Newton accuracy',
      'Contralateral Limb Symmetry Index (LSI) target benchmarking',
      'Rate of Force Development (RFD) kinetic monitoring',
      'Standardized isometric test durations with 3-trial averaging'
    ],
    standardsAr: [
      'أجهزة ديناموميتر رقمية متطورة تقيس عزم العضلات بوحدة النيوتن',
      'مقارنة رقمية دقيقة لنسبة القوة بين الطرف المصاب والطرف السليم',
      'رصد سرعة توليد القوة اللحظية الضرورية للأنشطة الرياضية',
      'تطبيق متوسط ثلاث محاولات اختبار لضمان ثبات القراءات السريرية'
    ],
    clinicalEthicEn: 'Objective force data to prevent premature athletic return.',
    clinicalEthicAr: 'بيانات قوة موضوعية لمنع العودة المبكرة غير الآمنة للرياضة.'
  },
  {
    id: 'hipaa_safeguards',
    nameEn: 'Protected Health Data & Zero PHI Web Intake',
    nameAr: 'حماية البيانات الصحية والامتناع عن طلب السجلات عبر الويب',
    subtitleEn: 'Strict separation of public web enquiries from confidential Electronic Health Records (EHR)',
    subtitleAr: 'فصل تام بين استفسارات الموقع الإدارية العامة والسجلات الطبية المحمية',
    imageId: 'postural_balance',
    icon: 'lock',
    thesisEn: 'Public web forms are not secure medical portals. Motion Lab strictly forbids visitors from uploading radiology reports, operative summaries, or sensitive medical histories into marketing inquiry fields. Clinical records must exclusively be presented in person or inside certified encrypted healthcare systems.',
    thesisAr: 'نماذج المواقع الإلكترونية العامة ليست بيئة مناسبة للبيانات الطبية الحساسة. يلتزم المركز بعدم طلب أو تخزين تقارير الأشعة أو السجلات المرضية عبر نموذج الموقع، حيث تبقى هذه الملفات سرية ومحمية قانونياً ولا تُناقش إلا في المقابلة السريرية المباشرة.',
    standardsEn: [
      'Zero diagnostic upload fields in public consultation forms',
      'Intake restricted strictly to administrative timing and service categories',
      'Clear user warning against transmitting personal health identifiers (PHI)',
      'Compliant with international healthcare privacy and data protection ethics'
    ],
    standardsAr: [
      'خلو نموذج التواصل تمامًا من حقول رفع المستندات الطبية أو الأشعة',
      'قصر البيانات المطلوبة على تفضيلات المواعيد وأرقام التواصل بموافقة صريحة',
      'تنبيه بارز للمستخدم يوضح عدم إرسال أي تشخيصات خاصة عبر الإنترنت',
      'التزام بأرقى معايير خصوصية البيانات الصحية المعمول بها دولياً'
    ],
    clinicalEthicEn: 'Patient confidentiality preserved by design, not retrofitted.',
    clinicalEthicAr: 'حماية الخصوصية الصحية مبدأ أساسي في تصميم التجربة من البداية.'
  }
];

export function MotionClinicalGovernance({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [activePillarId, setActivePillarId] = useState<string>('kinetic_testing');

  const pillar = PILLARS.find(p => p.id === activePillarId) || PILLARS[0];
  const photo = motionLabPhotos.find(p => p.id === pillar.imageId) || motionLabPhotos[0];

  return (
    <section className="bg-[#E9F4EC] rounded-[2rem] border border-[#1D3934]/15 p-6 sm:p-10 lg:p-12 space-y-8" aria-labelledby="clinical-governance-heading">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1D3934]/10 pb-6">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-[#287459] font-bold">
            {isAr ? 'حوكمة الممارسة السريرية والشفافية' : 'Clinical Governance & Practice Ethics'}
          </span>
          <h2 id="clinical-governance-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#14352E]">
            {isAr ? 'أربعة مبادئ تحكم نهج التأهيل والحركة' : 'Four Tenets of Ethical Rehabilitation'}
          </h2>
        </div>
        <Link
          href={`/${locale}/preview/physiotherapy/services`}
          className="font-mono text-xs font-semibold text-[#14352E] hover:text-[#287459] inline-flex items-center gap-1.5"
        >
          <span>{isAr ? 'استعراض كافة التخصصات' : 'Explore All Services'}</span>
          <Arrow className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#D9ECE0] p-1.5 rounded-2xl border border-[#1D3934]/10">
        {PILLARS.map(p => {
          const active = p.id === activePillarId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePillarId(p.id)}
              className={`p-3 rounded-xl font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                active
                  ? 'bg-[#1D3934] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#14352E] hover:bg-white/60'
              }`}
              aria-label={isAr ? p.nameAr : p.nameEn}
            >
              {p.icon === 'activity' && <Activity className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#C2F0D2]' : 'text-[#287459]'}`} />}
              {p.icon === 'shield' && <ShieldCheck className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#C2F0D2]' : 'text-[#287459]'}`} />}
              {p.icon === 'scale' && <Scale className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#C2F0D2]' : 'text-[#287459]'}`} />}
              {p.icon === 'lock' && <LockKeyhole className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#C2F0D2]' : 'text-[#287459]'}`} />}
              <span className="truncate">{isAr ? p.nameAr : p.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Card */}
      <div className="bg-white rounded-3xl border border-[#1D3934]/15 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
        {/* Left: Thesis & Standards */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#287459] uppercase tracking-wider font-bold block">
              {isAr ? 'المعيار الأخلاقي السريري' : 'Governance Standard'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14352E]">
              {isAr ? pillar.nameAr : pillar.nameEn}
            </h3>
            <p className="font-mono text-xs text-[#14352E] font-medium">
              {isAr ? pillar.subtitleAr : pillar.subtitleEn}
            </p>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed font-sans">
            {isAr ? pillar.thesisAr : pillar.thesisEn}
          </p>

          <div className="p-4 rounded-2xl bg-[#E9F4EC]/60 border border-[#1D3934]/10 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14352E] block">
              {isAr ? 'ضوابط الممارسة والتوثيق المعتمدة:' : 'Clinical Verification Checkpoints:'}
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-sans">
              {(isAr ? pillar.standardsAr : pillar.standardsEn).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#287459] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/preview/physiotherapy/appointment`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1D3934] hover:bg-[#14352E] text-white text-xs font-mono font-semibold transition-all shadow-sm"
            >
              <span>{isAr ? 'بدء طلب استشارة أولية' : 'Start Assessment Enquiry'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C2F0D2]" />
            </Link>
            <div className="font-mono text-xs text-slate-700 font-semibold">
              {isAr ? pillar.clinicalEthicAr : pillar.clinicalEthicEn}
            </div>
          </div>
        </div>

        {/* Right: Curated Photo Showcase */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#1D3934]/15 bg-[#E9F4EC] shadow-inner group">
            <Image
              src={photo.url}
              alt={isAr ? photo.titleAr : photo.titleEn}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 inset-x-3 text-white font-mono text-[11px] flex justify-between items-end">
              <span className="truncate max-w-[80%]">{isAr ? photo.titleAr : photo.titleEn}</span>
              <span className="text-[#C2F0D2] font-bold uppercase">{photo.category}</span>
            </div>
          </div>
          <p className="text-[11px] font-mono text-slate-700 text-center font-medium">
            {photo.author} · {photo.license} ({photo.width}×{photo.height}px)
          </p>
        </div>
      </div>
    </section>
  );
}
