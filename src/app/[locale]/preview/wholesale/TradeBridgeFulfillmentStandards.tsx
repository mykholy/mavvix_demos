import type { Locale } from '@/lib/i18n/config';
import {
  ShieldCheck,
  Boxes,
  Truck,
  CheckCircle2,
  FileCheck2,
  Scale,
  Award,
  BadgeCheck,
  Building2
} from 'lucide-react';

interface StandardPillar {
  number: string;
  titleAr: string;
  titleEn: string;
  headlineAr: string;
  headlineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: typeof Boxes;
  standardsAr: string[];
  standardsEn: string[];
}

const PILLARS: StandardPillar[] = [
  {
    number: '01',
    titleAr: 'اكتمال الكراتين وحظر التجزئة',
    titleEn: 'Master Carton Integrity & MOQ',
    headlineAr: 'البيع بالكرتونة الكاملة فقط لحماية سلامة المنتج والتكلفة',
    headlineEn: 'Full carton procurement only to guarantee unit integrity and bulk pricing',
    descriptionAr:
      'تلتزم منظومة التوريد بالبيع بوحدة الكرتونة الأصلية من المصنع؛ لا يُسمح بفتح الكراتين أو التجزئة الفردية للحفاظ على كفاءة التخزين وثبات أسعار الجملة للشركات.',
    descriptionEn:
      'All procurement transactions strictly operate on sealed master cartons direct from manufacturing plants. Broken-pack retail splitting is prohibited to maintain warehouse efficiency and true wholesale unit economics.',
    icon: Boxes,
    standardsAr: [
      'أختام المصنع الأصلية وسلامة التغليف الخارجي',
      'تطبيق الحدود الدنيا المحددة لكل صنف (MOQ) دون استثناء',
      'باركود تجاري معياري (ITF-14 / GS1) على كل كرتونة ماستر'
    ],
    standardsEn: [
      'Intact manufacturer factory seals and corrugated outer strength',
      'Strict adherence to defined Minimum Order Quantities (MOQ)',
      'Standardized carton barcodes (ITF-14 / GS1) on all master packs'
    ]
  },
  {
    number: '02',
    titleAr: 'المعايير القياسية لرص المنصات',
    titleEn: 'Export-Grade Palletization & CBM',
    headlineAr: 'رص هندسي وتغليف حراري يتحمل مخاطر الشحن وسلاسل الإمداد',
    headlineEn: 'Engineered pallet stacking and stretch wrapping built for transit durability',
    descriptionAr:
      'تُجهّز طلبيات الجملة التي تتجاوز حمولة الكراتين الفردية على منصات شحن خشبية معالجة حراريًا (يوروباليت 80×120 سم أو 100×120 سم) مع زوايا كرتونية مقواة وتغليف استريتش مانع للانزلاق.',
    descriptionEn:
      'Bulk orders exceeding single carton limits are consolidated on heat-treated pallets (Euro 80x120cm or Industrial 100x120cm), protected by reinforced cardboard angle boards and anti-slip stretch film.',
    icon: Truck,
    standardsAr: [
      'منصات خشبية معالجة حراريًا ومطابقة لمعيار ISPM-15 الدولي',
      'زوايا كرتونية مقواة لحماية حواف الكراتين من الضغط أثناء الربط',
      'ارتفاع رص لا يتجاوز 1.8 متر للحفاظ على ثبات الشاحنة أثناء المناورة'
    ],
    standardsEn: [
      'Heat-treated wooden pallets compliant with international ISPM-15 rules',
      'Reinforced edge corner-boards protecting cartons against strap compression',
      'Maximum stack height capped at 1.8m for transit stability and safety'
    ]
  },
  {
    number: '03',
    titleAr: 'تدقيق الموردين وتتبع الدفعات',
    titleEn: 'Supplier Vetting & Lot Traceability',
    headlineAr: 'التحقق النظامي من المصانع وربط كل توريد برقم دفعة إنتاجية',
    headlineEn: 'Formal factory qualification and complete production lot traceability',
    descriptionAr:
      'يمر كل مورد مسجل بفحص شامل للسجل التجاري والبطاقة الضريبية وشهادات الجودة (ISO / سلامة الغذاء لمستهلكات الضيافة)، مع توثيق أرقام التشغيلات الإنتاجية (Lot Numbers) على كل شحنة.',
    descriptionEn:
      'Every onboarded supplier undergoes verification including commercial registers, tax credentials, and ISO quality certs. Food-contact items carry food-grade compliance documentation with traceable lot codes.',
    icon: BadgeCheck,
    standardsAr: [
      'التحقق من التراخيص الصناعية والتسجيل التجاري والضريبي المعتمد',
      'شهادات مطابقة سلامة الغذاء (FDA / SFDA / هيئة سلامة الغذاء المصرية)',
      'سجل تتبع كامل لتواريخ الإنتاج والانتهاء وأرقام الدفعات'
    ],
    standardsEn: [
      'Verification of active industrial licensing and tax authority status',
      'Food-contact compliance certs for all catering and hospitality packaging',
      'End-to-end traceability of production dates, expiry, and batch lot numbers'
    ]
  },
  {
    number: '04',
    titleAr: 'عروض أسعار مكتوبة ومحددة الصلاحية',
    titleEn: 'Non-Binding RFQ & Written Quotes',
    headlineAr: 'وضوح مالي كامل دون التزامات مسبقة أو دفعات عشوائية',
    headlineEn: 'Complete commercial clarity with defined quote validity and no upfront risks',
    descriptionAr:
      'طلب عرض السعر (RFQ) هو خطوة استطلاعية غير ملزمة للطرفين؛ يصدر المورد عرضًا رسميًا مكتوبًا يوضح الأسعار المحدثة حسب أسعار المواد الخام، وفترة الصلاحية، وشروط السداد والتسليم المعتمدة.',
    descriptionEn:
      'The RFQ process represents a non-binding exploratory scope request. Formal responses provide written quotes with transparent price validity periods aligned with raw material commodity indices and verified freight terms.',
    icon: FileCheck2,
    standardsAr: [
      'صلاحية سعرية محددة بوضوح (عادة من 7 إلى 14 يوم عمل)',
      'تحديد شروط التسليم بوضوح (تسليم أرض المصنع Ex-Works أو بمخزن العميل DDP)',
      'شروط دفع تجارية واضحة مع إمكانية التسهيلات الائتمانية للمنشآت المعتمدة'
    ],
    standardsEn: [
      'Time-stamped price validity windows (typically 7–14 business days)',
      'Explicit Incoterms delivery scope (Ex-Works factory gate vs. DDP customer warehouse)',
      'Structured payment milestones with enterprise credit terms for qualified accounts'
    ]
  }
];

export function TradeBridgeFulfillmentStandards({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';

  return (
    <section
      data-sector-specific="tradebridge-fulfillment-standards"
      aria-label={ar ? 'معايير التوريد والامتثال اللوجستي للجملة' : 'Wholesale Fulfillment & Logistics Standards'}
      className="bg-[#213044] text-white py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[#F3C2B4] text-xs font-bold tracking-[.18em] uppercase">
            <ShieldCheck size={16} />
            <span>{ar ? 'معايير سلاسل الإمداد والتوريد' : 'WHOLESALE SUPPLY CHAIN STANDARDS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-5 leading-tight tracking-tight">
            {ar ? (
              <>
                أربعة أركان حوكمة <span className="text-[#F3C2B4]">تضمن موثوقية التوريد واستقرار أعمالك.</span>
              </>
            ) : (
              <>
                Four fulfillment pillars <span className="text-[#F3C2B4]">anchoring wholesale integrity.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-8 text-[#E2E8F0]">
            {ar
              ? 'تعتمد صفقات الجملة الناجحة على الانضباط اللوجستي الصارم؛ لا مكان للطلبيات العشوائية أو نقص الكراتين. نضع معايير واضحة لحماية المشتري والمورد على السواء.'
              : 'Enterprise procurement thrives on disciplined logistics: zero carton tampering, certified pallet stacking, and verifiable lot traceability designed to safeguard commercial buyers.'}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {PILLARS.map(p => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className="bg-[#2B3C52] border border-[#3F536E] p-7 sm:p-9 rounded-sm flex flex-col justify-between hover:border-[#D45D42] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-[#3F536E]">
                    <div className="flex items-center gap-3">
                      <span className="p-2.5 bg-[#213044] border border-[#4A627E] rounded-sm text-[#F3C2B4]">
                        <Icon size={22} />
                      </span>
                      <h3 className="font-bold text-base sm:text-lg text-white">
                        {ar ? p.titleAr : p.titleEn}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-[#F3C2B4] font-bold">
                      {p.number} / 04
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white mt-5 leading-snug">
                    {ar ? p.headlineAr : p.headlineEn}
                  </h4>

                  <p className="mt-3 text-xs sm:text-sm leading-7 text-[#D2D9E2]">
                    {ar ? p.descriptionAr : p.descriptionEn}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#3F536E]">
                  <span className="text-[11px] font-bold text-[#F3C2B4] uppercase tracking-wider block mb-3">
                    {ar ? 'معايير الالتزام اللوجستي:' : 'Mandatory Logistics Standards:'}
                  </span>
                  <ul className="space-y-2">
                    {(ar ? p.standardsAr : p.standardsEn).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs leading-6 text-[#E2E8F0]">
                        <CheckCircle2 size={15} className="text-[#48BB78] shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Bar */}
        <div className="mt-12 bg-[#2B3C52] border border-[#3F536E] p-6 sm:p-8 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="p-3 bg-[#213044] rounded-sm text-[#F3C2B4] shrink-0">
              <Building2 size={28} />
            </span>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white">
                {ar ? 'منظومة توريد B2B معتمدة للشركات' : 'Verified B2B Enterprise Supply Architecture'}
              </h4>
              <p className="text-xs text-[#D2D9E2] mt-1 leading-6">
                {ar
                  ? 'هذا النموذج التجريبي من مافكس يوضح الهيكلية المتكاملة لمنصات ومواقع تجارة الجملة الحديثة في مصر والسعودية والإمارات.'
                  : 'This commercial showcase by Mavvix demonstrates exemplary digital architecture for leading B2B wholesale platforms in Egypt, KSA, and the UAE.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
