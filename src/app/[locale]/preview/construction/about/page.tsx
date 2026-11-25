import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  Compass,
  HardHat,
  Ruler,
  FileCheck2,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function ConstructionAboutPage(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const teamRoles = [
    {
      title: isAr ? 'رئيس مهندسي المشروعات' : 'Principal Project Engineer',
      desc: isAr ? 'إدارة المخططات التنفيذية واعتماد جداول المواصفات ومطابقة اختبارات الجودة الميدانية.' : 'Directing technical drawing approvals, structural compliance, and site quality hold-points.'
    },
    {
      title: isAr ? 'مدير هندسة التكاليف والمناقصات' : 'Head of Commercial & Estimating',
      desc: isAr ? 'إعداد دراسات المقايسات وتحليل مخاطر التوريد والهندسة القيمية لحماية ميزانيات العملاء.' : 'Leading quantity surveying, procurement hedging models, and value-engineering optimization.'
    },
    {
      title: isAr ? 'مدير الإشراف الميداني والسلامة' : 'Site Operations & Safety Director',
      desc: isAr ? 'متابعة مسارات التنفيذ اليومية، تطبيق معايير السلامة المهنية، وضمان مطابقة الجداول.' : 'Managing daily trade labor coordination, OSHA-standard site safety, and milestone sign-offs.'
    }
  ];

  const faqs = [
    {
      q: isAr ? 'هل تقدم أطلس خدمات التصميم المعماري والتنفيذ معًا (Design-Build)؟' : 'Does Atlas provide integrated Design-Build delivery?',
      a: isAr ? 'نعم، نوفر نموذج التعاقد الموحد المتكامل الذي يشمل إعداد المخططات التنفيذية، استخراج الرخص، والتنفيذ الكامل حتى تسليم المفتاح.' : 'Yes, we provide single-source turnkey delivery integrating architectural production drawings, statutory permits, and site execution.'
    },
    {
      q: isAr ? 'كيف يتم احتساب الدفعات ومستخلصات الأعمال؟' : 'How are payment milestones and contractor invoices structured?',
      a: isAr ? 'تعتمد المستخلصات بنسبة 100% على الإنجاز الفعلي ومحاضر الاستلام المعتمدة من الاستشاري المشرف، دون أي دفعات مبهمة غير مرتبطة بمخرجات.' : 'Invoices are strictly tied to audited milestone deliverables and consultant inspection approvals.'
    },
    {
      q: isAr ? 'ما هي الضمانات المقدمة بعد التسليم النهائي؟' : 'What post-handover warranties are provided?',
      a: isAr ? 'نوفر ضمانًا عشريًا على الهيكل الإنشائي والأساسات، وضمانًا تشغيليًا لمدة سنة كاملة على الأعمال الكهروميكانيكية والتشطيبات مع صيانة دورية.' : 'We provide statutory decennial structural warranties plus a comprehensive 12-month defects liability period covering all MEP and architectural finishes.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-[#D26A3B] uppercase tracking-widest block mb-1">
          STUDIO PROFILE & OPERATING STANDARDS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#162327] tracking-tight">
          {isAr ? 'عن أطلس للبناء والتطوير الهندسي' : 'About Atlas Structures & Contracting'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {isAr
            ? 'فلسفتنا ترتكز على الشفافية الإنشائية؛ نعتبر أن المقاولات الناجحة تبدأ بوضوح المسؤوليات والمواصفات قبل وضع حجر الأساس.'
            : 'Our engineering philosophy centers on structural transparency and disciplined milestone governance without ambiguity.'}
        </p>
      </div>

      {/* Core Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F2EFE9] text-[#D26A3B] flex items-center justify-center font-bold">
            <Ruler className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#162327]">
            {isAr ? 'دقة القياس والتوصيف' : 'Precise Specification'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isAr
              ? 'لا نعتمد على التقديرات الجزافية؛ كل بند يتم توصيفه فنيًا وربطه باختبارات المعامل المعتمدة وجداول الأسعار المحددة.'
              : 'Zero guesswork. Every item in our bill of quantities is technically qualified and tied to certified laboratory test protocols.'}
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F2EFE9] text-[#D26A3B] flex items-center justify-center font-bold">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#162327]">
            {isAr ? 'حماية ميزانية العميل' : 'Budget Protection'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isAr
              ? 'نطبق نماذج التوريد المسبق والهندسة القيمية لتحييد مخاطر التضخم وتجنب طلبات تعديل الأسعار أثناء سير العمل.'
              : 'Advance procurement and value engineering insulate clients from inflationary swings and mid-execution variation orders.'}
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F2EFE9] text-[#D26A3B] flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#162327]">
            {isAr ? 'التسليم الموثق (As-Built)' : 'Documented Handover'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isAr
              ? 'نسلم العميل ملفًا شاملاً يضم المخططات التنفيذية الفعلية وكتيبات الصيانة الدورية وشهادات الضمان الصريح.'
              : 'Comprehensive close-out dossiers with full as-built CAD drawings, maintenance manuals, and certified warranties.'}
          </p>
        </div>
      </div>

      {/* Illustrative Professional Disciplines */}
      <div className="bg-[#162327] text-white rounded-2xl p-8 sm:p-12 space-y-8">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-2">
            ENGINEERING ROLES & LEADERSHIP
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {isAr ? 'الهيكل التنظيمي لإدارة المشروعات' : 'Project Governance & Engineering Teams'}
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm max-w-xl mt-1">
            {isAr
              ? 'كل موقع مشروع يخضع لإشراف طاقم هندسي متكامل يضمن دقة التنفيذ والمطابقة اللحظية للمواصفات.'
              : 'Every site is managed by a multidisciplinary team dedicated to QA hold-points and schedule compliance.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamRoles.map((r, idx) => (
            <div key={idx} className="bg-stone-900/80 p-6 rounded-xl border border-stone-800 space-y-2">
              <span className="font-mono text-amber-400 text-xs font-bold">ROLE // 0{idx + 1}</span>
              <h4 className="text-base font-bold text-white">{r.title}</h4>
              <p className="text-xs text-stone-400 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive FAQs */}
      <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-mono font-bold text-[#D26A3B] uppercase tracking-widest block mb-1">
            COMMON QUESTIONS
          </span>
          <h2 className="text-2xl font-black text-[#162327]">
            {isAr ? 'الأسئلة الشائعة حول التعاقد والتنفيذ' : 'Frequently Asked Contracting Questions'}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-[#F2EFE9] p-6 rounded-xl border border-stone-300/80 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#162327] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#D26A3B] shrink-0" />
                <span>{f.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Concept Notice Disclaimer */}
      <div className="p-6 bg-stone-100 border border-stone-300 rounded-xl text-xs text-stone-600 text-center leading-relaxed">
        <strong>{isAr ? 'إشعار الشفافية التوضيحية:' : 'Concept Integrity Disclosure:'}</strong>{' '}
        {isAr
          ? 'شركة أطلس للبناء نموذج أعمال تجريبي مصمم لعرض إمكانيات منصة Mavvix للحلول الرقمية. لا يتم تمثيل عملاء أو جهات حكومية حقيقية.'
          : 'Atlas Structures is a concept demonstration website created to showcase Mavvix digital contracting solutions. No actual client entities or commercial warranties are implied.'}
      </div>
    </div>
  );
}

