import type { Locale } from '@/lib/i18n/config';
import {
  FileText,
  AlertTriangle,
  Lock,
  Compass,
  Check,
  ShieldCheck,
  Truck
} from 'lucide-react';
import Link from 'next/link';
import { routeLinePath } from '@/lib/verticals/logistics/data';

interface FreightStandard {
  code: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  icon: typeof FileText;
  description: { ar: string; en: string };
  checkpoints: { ar: string[]; en: string[] };
}

const STANDARDS: readonly FreightStandard[] = [
  {
    code: 'INCO-01',
    title: {
      ar: 'شروط التجارة الدولية وتحديد المسؤوليات',
      en: 'Incoterms & Scope Demarcation'
    },
    subtitle: {
      ar: 'فصل قاطع لنقاط انتقال المسؤولية ومخاطر النقل',
      en: 'Precise handover points defining risk, transit cost and insurance'
    },
    icon: Compass,
    description: {
      ar: 'نلتزم بالتحديد الدقيق لشروط التجارة الدولية (Incoterms 2020) مثل FOB و CIF و DAP و DDP. نضمن وضوح مسؤوليات التحميل، التخليص، ورسوم الموانئ المحلية قبل بدء أي رحلة شحن تجارية.',
      en: 'We insist on unequivocal Incoterms 2020 scoping (FOB, CIF, DAP, DDP). Every carrier quotation specifies exact points of risk handover, terminal handling liabilities, and local customs responsibilities prior to dispatch.'
    },
    checkpoints: {
      ar: [
        'تحديد دقيق لنقطة انتقال مخاطر التلف بين الشاحن والمستلم',
        'توضيح رسوم التحميل والتفريغ والمناولة المحلية في الموانئ',
        'عقد شحن تجاري مكتوب وموثق يمنع أي رسوم إضافية مفاجئة'
      ],
      en: [
        'Explicit risk-transfer milestones between consignor and consignee',
        'Transparent breakdown of origin terminal handling charges (THC) and drayage',
        'Written carrier contract preventing undisclosed post-arrival accessorial fees'
      ]
    }
  },
  {
    code: 'HAZ-02',
    title: {
      ar: 'فحص البضائع الخطرة وقيود الشحن',
      en: 'Dangerous Goods & Compliance Exclusion'
    },
    subtitle: {
      ar: 'استبعاد المواد المحظورة والامتثال للوائح السلامة الدولية',
      en: 'Zero undeclared hazmat; full compliance with IMO, IATA & ADR'
    },
    icon: AlertTriangle,
    description: {
      ar: 'نطبق إجراءات تدقيق صارمة لاستبعاد المواد الخطرة غير المصرح بها، بطاريات الليثيوم غير المعتمدة، والمواد القابلة للاشتعال، وفقاً لاتفاقيات IMDG البحرية ولوائح IATA الجوية ومعايير النقل البري الدولي.',
      en: 'We enforce stringent screening to exclude undeclared hazardous materials, uncertified lithium batteries, and restricted chemical consignments pursuant to IMO IMDG codes, IATA DGR, and ADR road conventions.'
    },
    checkpoints: {
      ar: [
        'حظر تام للبضائع الخطرة غير المصحوبة بشهادة MSDS معتمدة',
        'التحقق من التعبئة المعتمدة للأمم المتحدة (UN Packaging Standards)',
        'استبعاد المواد المحظورة أو الخاضعة لقيود التصدير المزدوج'
      ],
      en: [
        'Strict prohibition of hazardous cargo lacking certified manufacturer SDS',
        'Verification of UN-rated packaging specifications for all chemical freight',
        'Immediate rejection of restricted dual-use or embargoed commercial items'
      ]
    }
  },
  {
    code: 'SEC-03',
    title: {
      ar: 'أمان البيانات التجارية وسرية الشحنات',
      en: 'Commercial Privacy & Trade Secrets Security'
    },
    subtitle: {
      ar: 'حماية بوالص الشحن والفواتير من التسريب أو الاستخدام الإعلاني',
      en: 'Zero public exposure of bills of lading, manifests or invoices'
    },
    icon: Lock,
    description: {
      ar: 'بيانات سلاسل الإمداد تمثل أسراراً تجارية حساسة. لا يجمع نموذجنا العام مستندات حساسة أو فواتير، ونعزل تماماً معلومات الشاحنين والمستلمين عن أي أنظمة تتبع إعلانية أو وسطاء غير مصرح لهم.',
      en: 'Supply chain routes and cargo values represent proprietary enterprise assets. Our platform never requests commercial invoices or bills of lading in open forms, maintaining air-gapped isolation from advertising pixels.'
    },
    checkpoints: {
      ar: [
        'عدم جمع فواتير الشراء أو المستندات المصرفية عبر القنوات العامة',
        'عزل تام لبيانات العملاء والشحنات عن شبكات الإعلانات الرقمية',
        'التشفير الصارم لمعلومات التواصل وبيانات النقل الإدارية'
      ],
      en: [
        'Zero intake of commercial invoices or letters of credit via public web forms',
        'Complete isolation preventing logistics data forwarding to marketing networks',
        'End-to-end encrypted storage for administrative quote briefs and contact info'
      ]
    }
  },
  {
    code: 'OPS-04',
    title: {
      ar: 'شفافية المراحل التشغيلية وتوثيق التسليم',
      en: 'Operational Milestones & Chain of Custody'
    },
    subtitle: {
      ar: 'توثيق حقيقي لمراحل النقل دون تتبع زائف أو إحداثيات وهمية',
      en: 'Verifiable carrier handover timestamps and authentic chain of custody'
    },
    icon: ShieldCheck,
    description: {
      ar: 'نرفض تماماً تقديم شاشات تتبع GPS وهمية أو أرقام تتبع مصطنعة. نوفر شرحاً واقعياً للمراحل التشغيلية الفعلية، من الاستلام والوزن وحتى الإفراج الجمركي والتسليم النهائي بإشعار استلام رسمي (POD).',
      en: 'We strictly reject fabricated live GPS animations or simulated container coordinates. Operational tracking is tied to physical EDI milestones, verified bill of lading scans, and official Proof of Delivery (POD) signatures.'
    },
    checkpoints: {
      ar: [
        'المرجع الصادر يمثل رقم استفسار إداري ولا يعد تتبعاً وهمياً',
        'التتبع الفعلي يتطلب تكاملاً مؤكداً مع خطوط الملاحة وشركات الطيران',
        'اعتماد إشعار الاستلام المكتوب (Proof of Delivery) كمعيار لإتمام الرحلة'
      ],
      en: [
        'Generated reference numbers confirm administrative enquiry intake only',
        'Genuine tracking requires authenticated API integration with actual vessel/airline operators',
        'Final milestone established strictly by verified signed Proof of Delivery (POD)'
      ]
    }
  }
];

export function RouteLineFreightStandards({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';

  return (
    <section
      data-sector-specific="freight-governance-standards"
      className="bg-[#DDE6E9] py-16 sm:py-24 border-b border-[#B9C3C8]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-mono font-bold uppercase tracking-[.2em] text-[#31566C]">
            {ar ? '٠٦ / معايير الحوكمة والتشغيل اللوجستي' : '06 / LOGISTICS GOVERNANCE & COMPLIANCE'}
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#102A3A] leading-tight">
            {ar ? 'أربعة ركائز لضمان النقل التجاري الآمن' : 'Four pillars of freight integrity & compliance'}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#31566C]">
            {ar
              ? 'في قطاع الشحن الدولي، الدقة والامتثال للوائح الدولية هما أساس نجاح سلاسل الإمداد. نلتزم بأعلى معايير السلامة وتحديد المسؤوليات التعاقدية قبل تحرك أي شحنة.'
              : 'In international logistics, precision, safety compliance, and contractual transparency define resilient supply chains. Our governance model eliminates ambiguity before freight leaves the dock.'}
          </p>
        </div>

        {/* Standards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {STANDARDS.map((std) => {
            const Icon = std.icon;
            return (
              <div
                key={std.code}
                className="bg-white border-2 border-[#B9C3C8] border-t-4 border-t-[#102A3A] p-7 sm:p-9 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-[#F3B43F] bg-[#102A3A] px-3 py-1">
                      {std.code}
                    </span>
                    <div className="w-10 h-10 bg-[#DDE6E9] flex items-center justify-center text-[#102A3A]">
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="mt-5 font-black text-2xl text-[#102A3A]">
                    {std.title[locale]}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-[#31566C]">
                    {std.subtitle[locale]}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-[#4A6472]">
                    {std.description[locale]}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-[#DDE6E9]">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#102A3A] mb-3">
                    {ar ? 'ضوابط الالتزام الصارم' : 'Compliance Checkpoints'}
                  </p>
                  <ul className="space-y-2.5">
                    {std.checkpoints[locale].map((cp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#102A3A] leading-relaxed">
                        <Check size={14} className="text-[#31566C] shrink-0 mt-0.5" />
                        <span>{cp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-[#102A3A] text-white p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Truck size={32} className="text-[#F3B43F] shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                {ar ? 'الوضوح التعاقدي قبل حركة الشحنة' : 'Contractual clarity before cargo moves'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#D8E3E8] leading-relaxed max-w-2xl">
                {ar
                  ? 'إذا كانت شركتك تبحث عن حلول شحن تجارية منضبطة، اطلب دراسة متطلبات الشحنة واحصل على عرض سعر رسمي معتمد من الناقل الفعلي.'
                  : 'For structured, compliance-first commercial freight across ocean, air, and road corridors, submit your cargo specifications for a formal carrier quotation.'}
              </p>
            </div>
          </div>
          <Link
            href={routeLinePath(locale, 'quote')}
            className="shrink-0 inline-flex items-center gap-2 bg-[#F3B43F] text-[#102A3A] hover:bg-white px-7 py-4 text-sm font-black uppercase transition-colors"
          >
            {ar ? 'اطلب عرض شحن رسمي' : 'Request Freight Brief'}
          </Link>
        </div>
      </div>
    </section>
  );
}
