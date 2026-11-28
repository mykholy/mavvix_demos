'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FlaskConical,
  Clock,
  Droplet,
  ShieldAlert,
  ArrowUpRight,
  CheckCircle2,
  Sliders,
  ThermometerSnowflake,
  FileText,
  Building2
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { CLEARPATH, clearPath } from '@/lib/verticals/diagnostics-lab/data';

interface ClearPathTestCalibratorProps {
  locale: Locale;
}

type LabDiscipline = 'biochemistry' | 'hematology' | 'immunology' | 'molecular';
type FastingState = 'none' | 'fasting_8' | 'fasting_12';

interface DisciplineProfile {
  id: LabDiscipline;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  specimenAr: string;
  specimenEn: string;
  fastingAr: string;
  fastingEn: string;
  defaultFasting: FastingState;
  turnaroundAr: string;
  turnaroundEn: string;
  sampleTestsAr: string[];
  sampleTestsEn: string[];
}

const DISCIPLINES: DisciplineProfile[] = [
  {
    id: 'biochemistry',
    titleAr: 'الكيمياء الحيوية والأيض',
    titleEn: 'Clinical Biochemistry & Metabolism',
    descAr: 'تحاليل السكر التراكمي ووظائف الكبد والكلى والدهون الثلاثية والكهارل في الدم.',
    descEn: 'Enzymatic and photometric profiling of liver panels, renal function, lipid profiles, and HbA1c.',
    specimenAr: 'مصل دم (أنبوب غطاء ذهبي مع جل فاصل)',
    specimenEn: 'Serum (Gold-top tube with gel separator)',
    fastingAr: 'صيام 8 إلى 12 ساعة (مسموح بشرب الماء فقط)',
    fastingEn: 'Fasting 8-12 hours required (plain water permitted)',
    defaultFasting: 'fasting_8',
    turnaroundAr: '4 إلى 6 ساعات للعينات الروتينية',
    turnaroundEn: '4 to 6 hours for routine outpatient panels',
    sampleTestsAr: ['وظائف الكبد الكاملة', 'وظائف الكلى والكرياتينين', 'الدهون الكلية والكوليسترول'],
    sampleTestsEn: ['Comprehensive Liver Panel', 'Renal Function & Creatinine', 'Lipid Profile & Triglycerides']
  },
  {
    id: 'hematology',
    titleAr: 'أمراض الدم والتخثر',
    titleEn: 'Hematology & Coagulation Profiling',
    descAr: 'صورة الدم الكاملة (CBC)، سرعة الترسيب (ESR)، وزمن البروثرومبين وسيولة الدم (PT/INR).',
    descEn: 'Automated 5-part differential blood counts, erythrocyte sedimentation, and coagulation assays.',
    specimenAr: 'دم كامل مسحوب على مانع تجلط (EDTA أنبوب بنفسجي)',
    specimenEn: 'Whole blood with K2-EDTA (Lavender-top tube)',
    fastingAr: 'لا يشترط الصيام المسبق (تحليل دم روتيني)',
    fastingEn: 'No strict fasting required (random daytime draw)',
    defaultFasting: 'none',
    turnaroundAr: 'ساعتان إلى 4 ساعات',
    turnaroundEn: '2 to 4 hours post venipuncture',
    sampleTestsAr: ['صورة دم كاملة CBC', 'زمن البروثرومبين PT/INR', 'سرعة الترسيب ESR'],
    sampleTestsEn: ['Complete Blood Count (CBC)', 'Prothrombin Time (PT/INR)', 'Erythrocyte Sedimentation (ESR)']
  },
  {
    id: 'immunology',
    titleAr: 'الهرمونات والمناعة والأمصال',
    titleEn: 'Endocrinology & Immunoassays',
    descAr: 'فحوصات الغدة الدرقية، الفيتامينات (D, B12)، الهرمونات التناسلية، ومؤشرات الالتهاب.',
    descEn: 'Chemiluminescent immunoassays quantifying thyroid hormones, vitamin D, fertility axes, and serology.',
    specimenAr: 'مصل دم مبرد خالي من التحلل (Serum)',
    specimenEn: 'Refrigerated non-hemolyzed serum aliquot',
    fastingAr: 'يفضل سحب العينة صباحاً (قبل 10 صباحاً)',
    fastingEn: 'Morning draw recommended (diurnal hormone rhythm)',
    defaultFasting: 'fasting_8',
    turnaroundAr: '6 إلى 12 ساعة حسب نوع الهرمون',
    turnaroundEn: '6 to 12 hours depending on assay platform',
    sampleTestsAr: ['هرمونات الغدة الدرقية (TSH, Free T4)', 'فيتامين د (25-OH Vitamin D)', 'مؤشر الالتهاب C-Reactive Protein'],
    sampleTestsEn: ['Thyroid Panel (TSH, Free T4)', 'Vitamin D Total (25-OH)', 'High-Sensitivity CRP']
  },
  {
    id: 'molecular',
    titleAr: 'التشخيص الجزيئي والميكروبيولوجيا',
    titleEn: 'Molecular PCR & Microbiology',
    descAr: 'فحوصات تفاعل البوليميراز المتسلسل (PCR)، المزارع البكتيرية، واختبارات الحساسية للمضادات.',
    descEn: 'Real-time quantitative PCR amplification, sterile culture plating, and antibiotic sensitivity tests.',
    specimenAr: 'مسحة معقمة أو عينة بيولوجية في وسط ناقل مبرد',
    specimenEn: 'Sterile swab or biological specimen in cold viral transport media',
    fastingAr: 'قبل البدء في أي كورس مضادات حيوية',
    fastingEn: 'Must collect prior to initiating antibiotic therapy',
    defaultFasting: 'none',
    turnaroundAr: '24 إلى 48 ساعة لفترة نمو المزارع',
    turnaroundEn: '24 to 48 hours for bacterial incubation',
    sampleTestsAr: ['فحص PCR الجزيئي للأحماض النووية', 'مزرعة بكتيرية واختبار حساسية', 'مسحة حلق ومجاري تنفسية'],
    sampleTestsEn: ['Real-Time RT-PCR Assays', 'Bacterial Culture & Antibiogram', 'Sterile Respiratory Swab Panel']
  }
];

export function ClearPathTestCalibrator({ locale }: ClearPathTestCalibratorProps) {
  const isAr = locale === 'ar';
  const [selectedDiscipline, setSelectedDiscipline] = useState<LabDiscipline>('biochemistry');
  const [collectionMethod, setCollectionMethod] = useState<'branch' | 'home'>('branch');

  const currentProfile =
    DISCIPLINES.find((d) => d.id === selectedDiscipline) || DISCIPLINES[0];

  return (
    <section
      data-sector-specific="clearpath-test-calibrator"
      className="bg-[#E7F4F6] border-y border-[#B8DCE2] py-16 sm:py-24"
      aria-labelledby="calibrator-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12334A] text-white text-xs font-bold tracking-widest uppercase">
            <FlaskConical size={14} className="text-[#38BDF8]" />
            <span>{isAr ? 'دليل إعداد العينات المخبرية' : 'Specimen Preparation Calibrator'}</span>
          </div>
          <h2
            id="calibrator-heading"
            className="mt-4 text-3xl sm:text-5xl font-black text-[#12334A] tracking-tight leading-tight"
          >
            {isAr ? (
              <>
                اشتراطات دقة التحليل <span className="block text-[#126B8A]">وإرشادات الصيام وسلسلة العينات</span>
              </>
            ) : (
              <>
                Pre-Analytical Protocol <span className="block text-[#126B8A]">& Specimen Fasting Guidelines</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[#1E293B] leading-8 text-base">
            {isAr
              ? 'اختر التخصص المخبري للاطلاع على نوع الأنبوب المعتمد، واشتراطات الصيام المسبق، والمدة الزمنية القياسية لصدور التقرير المخبري.'
              : 'Select a diagnostic discipline to review required collection tubes, pre-test fasting protocols, and laboratory turnaround benchmarks.'}
          </p>
        </div>

        {/* Calibrator Console */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#B8DCE2] p-6 sm:p-8 space-y-8 shadow-sm">
            {/* Step 1: Discipline Select */}
            <div>
              <label className="block text-xs font-bold text-[#12334A] uppercase tracking-wider mb-3">
                {isAr ? '01 / التخصص المخبري والتحليلي' : '01 / Diagnostic Discipline'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DISCIPLINES.map((d) => {
                  const active = d.id === selectedDiscipline;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDiscipline(d.id)}
                      className={`text-start p-4 border transition-all ${
                        active
                          ? 'border-[#12334A] bg-[#12334A] text-white shadow-sm'
                          : 'border-[#B8DCE2] bg-[#E7F4F6] text-[#12334A] hover:border-[#12334A]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${active ? 'text-[#38BDF8]' : 'text-[#12334A]'}`}>
                          {isAr ? d.titleAr : d.titleEn}
                        </span>
                        {active && <CheckCircle2 size={16} className="text-[#38BDF8]" />}
                      </div>
                      <p className={`mt-2 text-xs leading-5 line-clamp-2 ${active ? 'text-[#E0F2FE]' : 'text-[#334155]'}`}>
                        {isAr ? d.descAr : d.descEn}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Collection Mode Preference */}
            <div>
              <label className="block text-xs font-bold text-[#12334A] uppercase tracking-wider mb-3">
                {isAr ? '02 / مسار سحب العينة' : '02 / Specimen Collection Pathway'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'branch',
                    icon: Building2,
                    titleAr: 'زيارة فرع المختبر',
                    titleEn: 'Laboratory Branch Visit',
                    subAr: 'سحب مباشر في غرفة سحب معقمة',
                    subEn: 'Immediate draw in cleanroom phlebotomy'
                  },
                  {
                    id: 'home',
                    icon: ThermometerSnowflake,
                    titleAr: 'خدمة السحب المنزلي المبرد',
                    titleEn: 'Cold-Chain Home Phlebotomy',
                    subAr: 'أخصائي معتمد وحافظة تبريد مراقبة',
                    subEn: 'Certified phlebotomist with cold-box'
                  }
                ].map((m) => {
                  const active = collectionMethod === m.id;
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setCollectionMethod(m.id as 'branch' | 'home')}
                      className={`text-start p-4 border transition-all ${
                        active
                          ? 'border-[#126B8A] bg-[#E7F4F6] text-[#12334A]'
                          : 'border-[#B8DCE2] bg-white text-[#334155] hover:border-[#126B8A]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={18} className="text-[#126B8A]" />
                        <span className="text-sm font-bold text-[#12334A]">
                          {isAr ? m.titleAr : m.titleEn}
                        </span>
                      </div>
                      <div className="text-xs text-[#334155] mt-1.5 leading-5">
                        {isAr ? m.subAr : m.subEn}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Specimen Requirements Breakdown */}
            <div className="bg-[#E7F4F6] p-5 border border-[#B8DCE2] space-y-4">
              <div className="text-xs font-bold text-[#12334A] uppercase tracking-wider">
                {isAr ? '03 / الاشتراطات ما قبل التحليل' : '03 / Pre-Analytical Protocols'}
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-[#12334A] block mb-1">
                    {isAr ? 'اشتراط الصيام المسبق:' : 'Fasting Requirement:'}
                  </span>
                  <span className="text-[#1E293B] leading-5 block">
                    {isAr ? currentProfile.fastingAr : currentProfile.fastingEn}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[#12334A] block mb-1">
                    {isAr ? 'نوع العينة والأنبوب:' : 'Specimen & Tube Type:'}
                  </span>
                  <span className="text-[#1E293B] leading-5 block">
                    {isAr ? currentProfile.specimenAr : currentProfile.specimenEn}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Protocol Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#12334A] text-white p-7 sm:p-9 border border-[#12334A] space-y-6">
            <div>
              <p className="text-[#38BDF8] text-xs font-bold tracking-widest uppercase">
                {isAr ? 'بروتوكول المعالجة التحليلية' : 'Diagnostic Protocol Overview'}
              </p>
              <h3 className="mt-2 text-2xl font-black text-white">
                {isAr ? currentProfile.titleAr : currentProfile.titleEn}
              </h3>
              <p className="mt-2 text-xs text-[#E0F2FE] leading-5">
                {isAr ? currentProfile.descAr : currentProfile.descEn}
              </p>
            </div>

            {/* Turnaround Time Display */}
            <div className="bg-[#1A4562] p-5 border border-[#275B80]">
              <div className="flex items-center gap-2 text-xs text-[#38BDF8] font-bold uppercase tracking-wider">
                <Clock size={15} />
                <span>{isAr ? 'الزمن التحليلي المتوقع للتقرير' : 'Target Turnaround Time (TAT)'}</span>
              </div>
              <div className="mt-2 font-mono text-2xl sm:text-3xl font-bold text-white">
                {isAr ? currentProfile.turnaroundAr : currentProfile.turnaroundEn}
              </div>
              <p className="mt-2 text-[11px] text-[#E0F2FE] leading-5">
                {isAr
                  ? 'يبدأ احتساب التوقيت من لحظة استلام العينة في وحدة الباركود المركزية وحتى المراجعة الطبية النهائية.'
                  : 'Time measured from accessioning at central intake to final pathologist medical sign-off.'}
              </p>
            </div>

            {/* Common Diagnostic Tests in Discipline */}
            <div>
              <div className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider mb-2">
                {isAr ? 'نماذج الفحوصات المدرجة في هذا التخصص' : 'Representative Assays'}
              </div>
              <ul className="space-y-2 text-xs text-[#E0F2FE]">
                {(isAr ? currentProfile.sampleTestsAr : currentProfile.sampleTestsEn).map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#38BDF8] shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-binding Medical Disclaimer */}
            <div className="border-t border-[#275B80] pt-4 flex gap-3 text-xs leading-5 text-[#E0F2FE]">
              <ShieldAlert size={18} className="text-[#38BDF8] shrink-0 mt-0.5" />
              <p>
                {isAr
                  ? 'هذا الدليل استرشادي لتوضيح شروط سحب العينات فقط. لا يقدم الموقع أي استشارات طبية أو تشخيصات أو نتائج تحاليل. يجب الرجوع للطبيب المعالج دائماً.'
                  : 'Administrative pre-analytical reference only. This website provides no medical diagnoses, consultations, or patient test results. Consult your licensed physician.'}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={clearPath(locale, 'contact')}
                className="w-full bg-[#126B8A] text-white hover:bg-[#38BDF8] hover:text-[#12334A] transition-colors py-4 px-6 font-bold text-sm flex items-center justify-center gap-3"
              >
                <span>{isAr ? 'طلب معاودة اتصال إداري' : 'Request Administrative Callback'}</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
