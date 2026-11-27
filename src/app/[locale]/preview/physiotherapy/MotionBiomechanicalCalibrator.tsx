'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { Activity, Clock, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, ArrowUpRight, Compass, HeartPulse, Footprints, Target, Move } from 'lucide-react';

interface MovementPathway {
  id: string;
  nameEn: string;
  nameAr: string;
  badgeEn: string;
  badgeAr: string;
  summaryEn: string;
  summaryAr: string;
  feeEgp: number;
  clinicalMilestones: {
    titleEn: string;
    titleAr: string;
    protocolEn: string;
    protocolAr: string;
  }[];
  suitabilityEn: string[];
  suitabilityAr: string[];
}

const PATHWAYS: MovementPathway[] = [
  {
    id: 'spine-posture',
    nameEn: 'Spine & Postural Kinetic Stability',
    nameAr: 'استقرار العمود الفقري والتوازن القوامي',
    badgeEn: 'Postural & Axial Biomechanics',
    badgeAr: 'الميكانيكا الحيوية المحورية والقوامية',
    summaryEn: 'Structured assessment of cervical and lumbar segmental mobility, deep core stabilizer endurance, and seated workplace spinal load distribution.',
    summaryAr: 'تقييم منهجي لمدى حركة فقرات العنق وأسفل الظهر، قدرة عضلات الجذع العميقة على التحمل، وتوزيع أحمال الجلوس المكتبي.',
    feeEgp: 750,
    clinicalMilestones: [
      {
        titleEn: 'Cervical & Thoraco-Lumbar Range-of-Motion Goniometry',
        titleAr: 'قياس المدى الحركي لفقرات العنق والظهر بالمنقلة السريرية',
        protocolEn: 'Objective degree-of-arc measurements for flexion, extension, and axial rotation.',
        protocolAr: 'قياس درجات الانحناء والدوران المحوري بالزوايا الدقيقة لتحديد التفاوت الحركي.'
      },
      {
        titleEn: 'Deep Stabilizer Core Endurance & Pressure Biofeedback',
        titleAr: 'تحمل العضلات المثبتة العميقة والتغذية الحيوية بالضغط',
        protocolEn: 'Transverse abdominis and multifidus recruitment verified with stabilizer cuff biofeedback.',
        protocolAr: 'اختبار تفعيل العضلات المستعرضة البطنية ومثبتات الفقرات باستخدام وسادة قياس الضغط.'
      },
      {
        titleEn: 'Ergonomic Desk & Workstation Kinetic Load Audit',
        titleAr: 'تدقيق الأحمال الحركية للجلوس المكتبي وبيئة العمل',
        protocolEn: 'Customized workstation geometry adjustments to reduce passive cervical shear forces.',
        protocolAr: 'ضبط زوايا الجلوس وارتفاع الشاشة لتقليل قوى القص الميكانيكية على فقرات الرقبة.'
      }
    ],
    suitabilityEn: ['Chronic desk workers with neck/shoulder tension', 'Post-lumbar strain functional recovery', 'Individuals seeking evidence-based posture coaching'],
    suitabilityAr: ['أصحاب المهن المكتبية الذين يعانون من تشنج الرقبة والكتفين', 'مرحلة التعافي الوظيفي بعد إجهاد أسفل الظهر', 'الراغبون في تحسين التوازن القوامي بمعايير علمية']
  },
  {
    id: 'athletic-return',
    nameEn: 'Athletic Kinetic Chain & Return-to-Play',
    nameAr: 'السلسلة الحركية الرياضية والعودة التدريجية للملاعب',
    badgeEn: 'Sports Performance & Recovery',
    badgeAr: 'التأهيل الرياضي المتقدم واستعادة الأداء',
    summaryEn: 'Graded functional rehabilitation for runners, football players, and strength athletes focusing on deceleration mechanics, plyometric force attenuation, and limb symmetry.',
    summaryAr: 'تأهيل وظيفي متدرج للعدائين ولاعبي كرة القدم ورياضيي القوة يركز على ميكانيكا امتصاص الصدمات، تماثل القوة بين الطرفين، واستعادة الرشاقة الحركية.',
    feeEgp: 950,
    clinicalMilestones: [
      {
        titleEn: 'Limb Symmetry Index (LSI) & Handheld Dynamometry',
        titleAr: 'مؤشر تماثل الأطراف وقياس القوة العضلية بالمقياس الرقمي',
        protocolEn: 'Quantifying isometric quadriceps-to-hamstring ratio with target >90% contralateral symmetry.',
        protocolAr: 'تحديد نسبة القوة بين العضلات الرباعية والخلفية ومقارنتها بالطرف السليم بنسبة فوق ٩٠٪.'
      },
      {
        titleEn: 'Force Attenuation & Landing Biomechanics Screening',
        titleAr: 'فحص ميكانيكا الهبوط وامتصاص القوى الصدمية',
        protocolEn: 'Slow-motion 2D video kinematic capture assessing knee valgus angle during single-leg drop jump.',
        protocolAr: 'تصوير حركي بطيء لرصد زاوية انحراف الركبة إلى الداخل أثناء القفز والهبوط أحادي الساق.'
      },
      {
        titleEn: 'Sport-Specific Energy Systems & Agility Deceleration Drills',
        titleAr: 'تدريبات الرشاقة وتغيير الاتجاه المتوافقة مع نوع الرياضة',
        protocolEn: 'Graduated multi-directional shuttle runs with heart-rate and perceived exertion telemetry.',
        protocolAr: 'تمارين تغيير الاتجاه الميدانية المتدرجة مع قياس معدل نبضات القلب والجهد البدني.'
      }
    ],
    suitabilityEn: ['Post-ACL or ankle sprain functional return phase', 'Overuse tendinopathy in runners and court athletes', 'Pre-season athletic movement screening'],
    suitabilityAr: ['مرحلة التأهيل المتقدم بعد إصابات الرباط الصليبي والكاحل', 'التهابات الأوتار الناتجة عن الإجهاد المتكرر للعدائين', 'فحوصات الجاهزية الحركية الرياضية قبل انطلاق الموسم']
  },
  {
    id: 'joint-mobility',
    nameEn: 'Joint Arthrokinematics & Manual Mobilization',
    nameAr: 'حركيات المفاصل والعلاج اليدوي المفصلي المتخصص',
    badgeEn: 'Manual Therapy & Capsular Mechanics',
    badgeAr: 'العلاج اليدوي وميكانيكا المحفظة المفصلية',
    summaryEn: 'Targeted Maitland and Kaltenborn passive accessory joint glides, soft-tissue myofascial release, and progressive active assisted range expansion.',
    summaryAr: 'انزلاقات مفصلية مساعدة وفق بروتوكولات ميتلاند وكالتنبورن، تحرير الأنسجة العضلية واللفافية، واستعادة المدى الحركي النشط تدريجيًا.',
    feeEgp: 800,
    clinicalMilestones: [
      {
        titleEn: 'End-Feel & Capsular Restriction Differential Evaluation',
        titleAr: 'تقييم ملمس نهاية الحركة والقيود المحفظية السريرية',
        protocolEn: 'Distinguishing between physiological muscle guarding and mechanical joint capsule stiffness.',
        protocolAr: 'التمييز السريري الدقيق بين الشد العضلي الدفاعي والالتصاقات الميكانيكية في المحفظة.'
      },
      {
        titleEn: 'Low-Grade Maitland Accessory Joint Glide Oscillations',
        titleAr: 'انزلاقات مفصلية تذبذبية متدرجة لتسكين الألم وزيادة المدى',
        protocolEn: 'Grade I-III targeted translational glides to stimulate mechanoreceptors and restore arthrokinematics.',
        protocolAr: 'تطبيق درجات الضغط اليدوي المحسوبة لتحفيز المستقبلات العصبية المفصلية واستعادة الليونة.'
      },
      {
        titleEn: 'Active-Assisted Neuromuscular Joint Loading Integration',
        titleAr: 'دمج التحميل العصبي العضلي الإيجابي في المدى الحركي الجديد',
        protocolEn: 'End-range isometric loading to lock in neuroplastic adaptations and prevent relapse.',
        protocolAr: 'تدريبات ثبات عضلي في أقصى المدى الحركي لترسيخ التكيف العصبي ومنع تيبس المفصل مجددًا.'
      }
    ],
    suitabilityEn: ['Adhesive capsulitis (frozen shoulder) recovery stages', 'Post-immobilization joint stiffness after cast or brace', 'Osteoarthritic joint stiffness requiring gentle kinetic maintenance'],
    suitabilityAr: ['مراحل استعادة الحركة في حالات الكتف المتجمد', 'تيبس المفاصل بعد فك الجبس أو الدعامات الحركية', 'خشونة المفاصل التي تتطلب تحريكًا علاجيًا لطيفًا ومستمرًا']
  }
];

export function MotionBiomechanicalCalibrator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [activePathwayId, setActivePathwayId] = useState<string>('spine-posture');
  const [durationMinutes, setDurationMinutes] = useState<number>(45); // 30, 45, 60

  const pathway = PATHWAYS.find(p => p.id === activePathwayId) || PATHWAYS[0];

  // Duration multiplier
  const adjustedFee = durationMinutes === 30
    ? Math.round(pathway.feeEgp * 0.75)
    : durationMinutes === 60
    ? Math.round(pathway.feeEgp * 1.25)
    : pathway.feeEgp;

  return (
    <section className="bg-white rounded-[2rem] border border-[#1D3934]/15 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8" aria-labelledby="biomechanical-calibrator-heading">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1D3934]/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#287459] font-bold">
            <Activity className="w-4 h-4 text-[#287459]" />
            <span>{isAr ? 'مخطط التقييم الحركي والمسار الوظيفي' : 'Biomechanical Pathway & Session Calibrator'}</span>
          </div>
          <h2 id="biomechanical-calibrator-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#14352E]">
            {isAr ? 'اختر مجال الحركة وحدد مدة الجلسة التقييمية' : 'Calibrate Your Functional Movement Pathway'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl font-sans leading-relaxed">
            {isAr
              ? 'حدد مجال الاهتمام الوظيفي ومدّة الاستشارة الأولية للتعرف على محاور الفحص السريري، البروتوكولات المتبعة، والتكلفة التقديرية الشفافة بالجنيه المصري.'
              : 'Select your primary movement focus and preferred session duration to preview clinical evaluation protocols, objective tests, and transparent demonstration fee benchmarks.'}
          </p>
        </div>

        {/* Duration Switcher */}
        <div className="flex items-center gap-2 bg-[#E9F4EC] p-1.5 rounded-2xl border border-[#1D3934]/15 font-mono text-xs">
          <span className="px-3 text-[#14352E] font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#287459]" />
            <span>{isAr ? 'المدة:' : 'Session:'}</span>
          </span>
          {[
            { mins: 30, labelEn: '30m Focused', labelAr: '٣٠ دقيقة مركزة' },
            { mins: 45, labelEn: '45m Standard', labelAr: '٤٥ دقيقة شاملة' },
            { mins: 60, labelEn: '60m Extended', labelAr: '٦٠ دقيقة متعمقة' }
          ].map(opt => (
            <button
              key={opt.mins}
              type="button"
              onClick={() => setDurationMinutes(opt.mins)}
              className={`px-3 py-2 rounded-xl font-bold transition-all text-xs ${
                durationMinutes === opt.mins
                  ? 'bg-[#1D3934] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#14352E] hover:bg-white'
              }`}
              aria-label={isAr ? opt.labelAr : opt.labelEn}
            >
              {isAr ? opt.labelAr : opt.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Pathway Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PATHWAYS.map(p => {
          const selected = p.id === activePathwayId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePathwayId(p.id)}
              className={`p-4 rounded-2xl border text-left rtl:text-right transition-all flex flex-col justify-between space-y-3 ${
                selected
                  ? 'bg-[#E9F4EC] border-[#1D3934] ring-2 ring-[#1D3934]/20 shadow-sm'
                  : 'bg-white border-[#1D3934]/10 hover:border-[#287459]/40 hover:bg-[#E9F4EC]/40'
              }`}
              aria-label={isAr ? p.nameAr : p.nameEn}
            >
              <div className="space-y-1.5">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                  selected ? 'text-[#287459]' : 'text-slate-700'
                }`}>
                  {isAr ? p.badgeAr : p.badgeEn}
                </span>
                <h3 className="font-serif text-base font-bold text-[#14352E] leading-snug">
                  {isAr ? p.nameAr : p.nameEn}
                </h3>
              </div>
              <div className="pt-2 border-t border-[#1D3934]/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700">{durationMinutes} {isAr ? 'دقيقة' : 'Minutes'}</span>
                <span className="font-bold text-[#14352E]">{adjustedFee} EGP</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Calibrated Detail Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Protocols & Clinical Milestones */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#287459] font-bold block">
              {isAr ? 'بروتوكول التقييم السريري والقياس الموضوعي' : 'Clinical Assessment Protocol & Kinematic Benchmarks'}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14352E]">
              {isAr ? pathway.nameAr : pathway.nameEn}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {isAr ? pathway.summaryAr : pathway.summaryEn}
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#14352E] block uppercase tracking-wider">
              {isAr ? 'محاور الفحص السريري أثناء الجلسة:' : 'Assessment Examination Checkpoints:'}
            </span>
            <div className="space-y-3">
              {pathway.clinicalMilestones.map((mod, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#E9F4EC]/60 border border-[#1D3934]/10 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#1D3934] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#14352E]">
                      {isAr ? mod.titleAr : mod.titleEn}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-700 ps-7 leading-relaxed font-sans">
                    {isAr ? mod.protocolAr : mod.protocolEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Suitability */}
          <div className="p-4 rounded-xl bg-white border border-[#1D3934]/15 space-y-2">
            <span className="font-mono text-xs font-bold text-[#14352E] block uppercase tracking-wider">
              {isAr ? 'الحالات والمواقف الوظيفية الأكثر استفادة من هذا المسار:' : 'Clinical Profile Suitability Indicators:'}
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-sans">
              {(isAr ? pathway.suitabilityAr : pathway.suitabilityEn).map((prereq, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#287459] shrink-0 mt-0.5" />
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Investment & Request Dossier */}
        <div className="lg:col-span-5 bg-[#14352E] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-[#1D3934]">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs text-[#C2F0D2]">
            <span className="uppercase tracking-widest font-bold">
              {isAr ? 'بيانات الجلسة الاستشارية' : 'Consultation Session Dossier'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-bold">
              {durationMinutes} {isAr ? 'دقيقة' : 'Minutes'}
            </span>
          </div>

          {/* Session Metrics */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[11px] text-slate-300 block">{isAr ? 'نوع التقييم:' : 'Evaluation Type:'}</span>
              <span className="font-serif text-base font-bold text-white block truncate">{pathway.id}</span>
              <span className="text-[10px] text-[#C2F0D2]">{isAr ? 'فحص سريري كامل' : 'Full Clinical ROM'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[11px] text-slate-300 block">{isAr ? 'المتابعة المقترحة:' : 'Review Model:'}</span>
              <span className="font-serif text-base font-bold text-white block truncate">{isAr ? 'فردي مخصص' : 'One-on-One'}</span>
              <span className="text-[10px] text-[#C2F0D2]">{isAr ? 'أخصائي معتمد' : 'Licensed PT'}</span>
            </div>
          </div>

          {/* Fee Calculation */}
          <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs">
            <div className="flex justify-between text-slate-300">
              <span>{isAr ? 'رسوم الجلسة التقييمية التجريبية:' : 'Demonstration Session Fee:'}</span>
              <span className="font-bold text-white text-sm">{adjustedFee} EGP</span>
            </div>
            <div className="pt-2 border-t border-white/10 text-end">
              <span className="font-serif text-3xl font-bold text-[#C2F0D2]">
                {adjustedFee}
              </span>
              <span className="text-xs text-white/80 ms-1 font-mono">EGP</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed pt-1">
              {isAr
                ? 'الرسوم استعراضية لتوضيح هيكل التسعير. لا يتم تحصيل مبالغ حقيقية، ولا يتطلب النموذج تقديم بيانات صحية حساسة.'
                : 'Concept demonstration pricing. No actual payment collected. The form strictly collects administrative timing preferences.'}
            </p>
          </div>

          {/* CTA Actions */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <Link
              href={`/${locale}/preview/physiotherapy/appointment?pathway=${pathway.id}&duration=${durationMinutes}`}
              className="w-full inline-flex items-center justify-between px-6 py-4 rounded-xl bg-[#287459] hover:bg-[#1D5E48] text-white font-mono text-xs font-bold transition-all shadow-md group"
              aria-label={isAr ? 'طلب موعد تقييم أولي بهذا المسار' : 'Request assessment appointment for this pathway'}
            >
              <span>{isAr ? 'طلب موعد تقييم أولي بهذا المسار' : 'Request Initial Assessment'}</span>
              <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C2F0D2]" />
              <span>{isAr ? 'خصوصية تامة دون جمع سجلات طبية في الموقع' : 'Privacy-first. No medical history collected online'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
