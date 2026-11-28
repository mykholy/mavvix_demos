'use client';

import React from 'react';
import {
  ShieldCheck,
  UserCheck2,
  FileX2,
  Scale,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface TalentyxEthicalStandardsProps {
  locale: string;
}

export default function TalentyxEthicalStandards({ locale }: TalentyxEthicalStandardsProps) {
  const isAr = locale === 'ar';

  const pillars = [
    {
      icon: UserCheck2,
      tag: '01 / HUMAN OVERSIGHT',
      titleAr: 'تقييم بشري إلزامي وانعدام الفرز الآلي',
      titleEn: 'Mandatory Human Review & Zero Blackbox AI',
      descAr:
        'نرفض استخدام خوارزميات الاستبعاد الآلي أو أدوات التصنيف الإقصائي للطلبات. كل ملف وظيفي ورغبة تواصل تخضع لمراجعة متخصصة من مستشار توظيف بشري مؤهل لضمان العدالة والفرص المتكافئة.',
      descEn:
        'We strictly prohibit automated candidate rejection algorithms or opaque screening blackboxes. Every role profile and contact enquiry is individually reviewed by experienced talent advisors.',
      pointsAr: [
        'انعدام أدوات الفرز الإقصائي للكلمات المفتاحية',
        'مراجعة شاملة للسياق الوظيفي ومسار التطور المهني',
        'حق الحصول على إيضاحات حول معايير الاختيار'
      ],
      pointsEn: [
        'Zero algorithmic keyword disqualification filters',
        'Holistic contextual review of career progression',
        'Transparent feedback on role selection criteria'
      ]
    },
    {
      icon: Scale,
      tag: '02 / OBJECTIVE CRITERIA',
      titleAr: 'تقييم مستند للمهارات ومصفوفة الكفاءات',
      titleEn: 'Skills-First & Anti-Bias Competency Matrices',
      descAr:
        'تستند مراحل المقابلات إلى بطاقات تقييم معيارية مصممة خصيصاً لكل دور وظيفي، تركز على حل المشكلات والإنجازات السابقة الموثقة بعيداً عن التحيزات الشخصية أو الاعتبارات غير المهنية.',
      descEn:
        'Interviews and candidate assessments are governed by structured rubrics tied directly to proven deliverables and technical capabilities, eliminating subjective bias.',
      pointsAr: [
        'بطاقات تقييم موحدة لكافة المرشحين لنفس الدور',
        'تركيز كامل على الكفاءة الفنية والقدرة على التنفيذ',
        'فصل كامل للتقييم الفني عن اعتبارات التفاوض المالي'
      ],
      pointsEn: [
        'Standardized scorecards across all candidate rounds',
        'Rigorous emphasis on technical mastery and delivery',
        'Separation of competency scoring from compensation'
      ]
    },
    {
      icon: FileX2,
      tag: '03 / DATA MINIMIZATION',
      titleAr: 'تقليل البيانات وانعدام حفظ السير الذاتية العامة',
      titleEn: 'Strict Data Minimization & No Public CV Storage',
      descAr:
        'لحماية خصوصية المرشحين وأصحاب العمل، لا نطلب رفع ملفات السير الذاتية (CVs)، أو أرقام الهويات وجوازات السفر، أو المستندات الحساسة عبر النماذج العامة على الموقع.',
      descEn:
        'To protect privacy and prevent identity exposure, our public intake does not collect uploaded CVs, passport copies, national ID numbers, or sensitive financial documents.',
      pointsAr: [
        'لا يوجد رفع لملفات PDF أو Word في الواجهة العامة',
        'حصر المدخلات في قنوات التواصل المباشرة وتفضيلات الدور',
        'امتثال كامل لتشريعات حماية البيانات وحق الإتلاف الفوري'
      ],
      pointsEn: [
        'Zero public file uploads or unencrypted resume intake',
        'Input bounded strictly to verified phone and email',
        'Full GDPR & regional data protection compliance'
      ]
    },
    {
      icon: ShieldCheck,
      tag: '04 / ETHICAL BOUNDARIES',
      titleAr: 'وضوح النطاق الاستشاري وانعدام الوعود الزائفة',
      titleEn: 'Transparent Scope & Non-Binding Advisory',
      descAr:
        'نلتزم بالشفافية المطلقة مع الشركات والباحثين عن عمل: أرقام المرجع الصادرة عن الموقع تمثل تسجيل اهتمام استشاري فقط، ولا تشكل وظائف شاغرة معلنة أو عروض توظيف رسمية ملزمة.',
      descEn:
        'We practice total transparency: website reference numbers denote mutual exploratory interest and talent scoping only; they do not constitute active job vacancies or legal offers.',
      pointsAr: [
        'انعدام فرض أي رسوم تسجيل على المرشحين الأفراد',
        'عدم تقديم وعود توظيف خيالية أو ضمانات وهمية',
        'إشعار خطي واضح بحدود المسؤولية قبل كل تعاقد'
      ],
      pointsEn: [
        'Zero candidate fees or intake charges of any kind',
        'No false placement guarantees or exaggerated promises',
        'Written engagement scopes approved prior to representation'
      ]
    }
  ];

  return (
    <section
      data-sector-specific="ethical-governance"
      className="py-16 sm:py-24 bg-[#17243E] text-white border-b border-[#2B3A58]"
      aria-label={isAr ? 'مبادئ الحوكمة والعدالة التوظيفية' : 'Ethical Recruitment & Governance Standards'}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F2F4E] border border-[#2B3A58] text-[#C6D4FF] text-xs font-mono font-bold tracking-wider uppercase">
            <Lock size={14} className="text-[#C6D4FF]" />
            <span>{isAr ? 'ميثاق النزاهة والحوكمة المهنية' : 'Talent Ethics & Governance Charter'}</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {isAr ? (
              <>
                معايير أخلاقية صارمة <span className="text-[#C6D4FF]">لحماية الطرفين.</span>
              </>
            ) : (
              <>
                Strict Governance Built on <span className="text-[#C6D4FF]">Fairness & Integrity.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A0B0D0] leading-relaxed">
            {isAr
              ? 'تلتزم تالنتكس بممارسات استقطاب مهنية عادلة تفصل بين الرغبة الاستكشافية والالتزامات التعاقدية، وتضمن حماية خصوصية بيانات الأفراد وموثوقية خطط الشركات.'
              : 'Talentyx operates under an uncompromising ethical framework designed to ensure fair candidate evaluation, rigorous enterprise data privacy, and zero misleading recruitment practices.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#1A2844] rounded-2xl p-7 sm:p-9 border border-[#2B3A58] flex flex-col justify-between hover:border-[#3549A5] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-[#1F2F4E] rounded-xl text-[#C6D4FF] border border-[#2B3A58]">
                      <Icon size={26} />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#A0B0D0] tracking-wider">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>

                  <p className="mt-3 text-sm text-[#C4D0E5] leading-relaxed">
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#2B3A58]/80">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A0B0D0] block mb-3">
                      {isAr ? 'ضمانات التنفيذ الميداني:' : 'Operational Safeguards:'}
                    </span>
                    <ul className="space-y-2">
                      {(isAr ? pillar.pointsAr : pillar.pointsEn).map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-xs text-[#E8EEFF]">
                          <CheckCircle2 size={15} className="text-[#3549A5] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal Intake Boundary Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#141C2E] border border-[#2B3A58] flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-[#A0B0D0]">
          <AlertCircle size={24} className="text-[#C6D4FF] shrink-0" />
          <div className="leading-relaxed">
            <span className="font-bold text-white block sm:inline mr-2">
              {isAr ? 'إخلاء مسؤولية تنظيمي:' : 'Regulatory Boundary Notice:'}
            </span>
            {isAr
              ? 'موقع تالنتكس هو منصة استعراض وعرض تجريبي لممارسات الموارد البشرية والتوظيف. لا يمثل وكالة توظيف مرخصة لممارسة أعمال استقدام العمالة المنزلية أو تحصيل عمولات توظيف من الأفراد. جميع متطلبات التوظيف الفعلية تخضع للأنظمة العمالية السارية في دولة التعاقد.'
              : 'Talentyx represents a conceptual commercial showcase of bespoke human capital and talent acquisition workflows. It is not an employment agency charging candidate placement commissions. All contractual recruitment engagements are conducted under valid commercial licenses and prevailing labor legislation.'}
          </div>
        </div>
      </div>
    </section>
  );
}
