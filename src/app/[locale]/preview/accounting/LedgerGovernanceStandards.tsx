import type { Locale } from '@/lib/i18n/config';
import {
  ShieldCheck,
  Scale,
  RefreshCcw,
  Lock,
  FileCheck2,
  CheckCircle2,
  Building,
  KeyRound
} from 'lucide-react';

interface GovernancePillar {
  code: string;
  icon: typeof ShieldCheck;
  title: { ar: string; en: string };
  category: { ar: string; en: string };
  description: { ar: string; en: string };
  protocols: { ar: string; en: string }[];
}

const GOVERNANCE_PILLARS: readonly GovernancePillar[] = [
  {
    code: 'ACC-01',
    icon: Scale,
    title: { ar: 'سلامة القيد المزدوج ودليل الحسابات', en: 'Double-Entry Ledger Integrity' },
    category: { ar: 'المعايير المحاسبية', en: 'Accounting Framework' },
    description: {
      ar: 'التزام صارم بنظام القيد المزدوج وتوحيد دليل الحسابات لمنع التداخل بين بنود التكاليف والمصروفات الرأسمالية والتشغيلية.',
      en: 'Rigid adherence to double-entry mechanics and standard chart of accounts to prevent misclassification of opex, capex, and liabilities.'
    },
    protocols: [
      { ar: 'توازن المدين والدائن في كل قيد تسوية', en: 'Strict debit-credit balance verification per entry' },
      { ar: 'توثيق السند والسبب المحاسبي لكل قيد يدوي', en: 'Corroborating document & rationale for manual journals' },
      { ar: 'مراجعة دورية لترحيل الحسابات وتصفير المؤقتة', en: 'Periodic ledger posting verification and clearing' }
    ]
  },
  {
    code: 'REC-02',
    icon: RefreshCcw,
    title: { ar: 'التسويات المصرفية والتحقق المستقل', en: 'Independent Bank & Statement Reconciliation' },
    category: { ar: 'الرقابة الداخلية', en: 'Internal Controls' },
    description: {
      ar: 'مطابقة دورية مستقلة بين الدفاتر المحاسبية وكشوف البنوك الرسمية لحصر الفروقات الزمنية والرسوم وتصحيح الأخطاء دون ترحيل معلقات.',
      en: 'Independent periodic reconciliation between accounting ledgers and bank statements, isolating timing differences and exceptions.'
    },
    protocols: [
      { ar: 'حصر فوري لجميع الشيكات والتحويلات تحت التحصيل', en: 'Immediate tracking of in-transit transfers and deposits' },
      { ar: 'سجل استثناءات معتمد للفروقات غير المفسرة', en: 'Documented exception queue for unexplained variances' },
      { ar: 'إقفال التسوية بتوقيع وتاريخ اعتماد المراجع', en: 'Reconciliation sign-off with timestamped reviewer approval' }
    ]
  },
  {
    code: 'PRV-03',
    icon: Lock,
    title: { ar: 'خصوصية البيانات وحظر المستندات السرية', en: 'Privacy-Minimal Scope & Zero Intake' },
    category: { ar: 'أمن المعلومات المالية', en: 'Data Governance' },
    description: {
      ar: 'عدم طلب أو جمع أو تخزين أي كشوف بنكية سرية أو أرقام تسجيل ضريبي أو ملفات رواتب شخصية عبر قنوات التسويق العامة.',
      en: 'Strict avoidance of collecting or storing confidential bank statements, tax IDs, or personal payroll records through public channels.'
    },
    protocols: [
      { ar: 'تحديد نطاقات حجم العمل دون طلب مبالغ الأرصدة', en: 'Volume-band inquiries without requesting private balances' },
      { ar: 'قنوات مشفرة معتمدة لتبادل الملفات في التنفيذ الفعلي', en: 'Authorized encrypted enterprise channels for real engagements' },
      { ar: 'توضيح حدود الاستشارة دون ادعاء تقديم خدمات تدقيق قانوني', en: 'Clear disclaimer that showcase forms do not bind statutory opinions' }
    ]
  },
  {
    code: 'AUD-04',
    icon: FileCheck2,
    title: { ar: 'مسار المراجعة وفصل الصلاحيات', en: 'Audit Trail & Separation of Duties' },
    category: { ar: 'حوكمة العمليات', en: 'Operational Governance' },
    description: {
      ar: 'فصل صلاحيات إدخال البيانات عن صلاحيات المراجعة والاعتماد، مع توفير مسار تدقيق رقمي متكامل لكل معاملة وتعديل محاسبي.',
      en: 'Separation of duties between preparation and authorization, paired with an immutable audit trail for every posted transaction.'
    },
    protocols: [
      { ar: 'نظام الصانع والمراجع (Maker-Checker Protocol)', en: 'Mandatory maker-checker dual authorization protocol' },
      { ar: 'حفظ سجل تاريخي لأي تعديل على القيود المرحلة', en: 'Immutable change log for reversed or amended entries' },
      { ar: 'أرشفة إلكترونية مفهرسة تسهل عمل المراجع الخارجي', en: 'Indexed workpaper archiving for external audit inspection' }
    ]
  }
];

export function LedgerGovernanceStandards({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';

  return (
    <section
      data-sector-specific="ledger-governance-standards"
      className="py-20 sm:py-28 bg-[#F4F2EC] text-[#1C3343] border-y border-[#D6E0DE]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-[#176C72] text-xs font-bold tracking-[.2em] uppercase flex items-center gap-3">
            <span className="w-8 h-px bg-[#176C72]" />
            {ar ? 'أركان الحوكمة والرقابة المالية' : 'FINANCIAL GOVERNANCE & CONTROL PILLARS'}
          </p>
          <h2 className="ledger-display font-black text-3xl sm:text-5xl mt-5 text-[#1C3343] leading-tight">
            {ar ? (
              <>
                أربعة أركان حوكمة. <span className="text-[#176C72]">لحماية أرقامك وقراراتك.</span>
              </>
            ) : (
              <>
                Four Governance Pillars. <span className="text-[#176C72]">Protecting Every Figure.</span>
              </>
            )}
          </h2>
          <p className="mt-5 text-[#455F6C] text-sm sm:text-base leading-8">
            {ar
              ? 'الخدمة المحاسبية الاحترافية لا تقاس فقط بسرعة تسجيل القيود، بل بقوة منظومة الرقابة الداخلية، سلامة مسار التدقيق، والتزام أعلى معايير سرية البيانات.'
              : 'Professional accounting excellence is anchored in rigorous internal controls, uncompromised audit trails, and strict data confidentiality protocols.'}
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GOVERNANCE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.code}
                className="bg-white border border-[#CBD9D7] p-7 flex flex-col justify-between hover:shadow-lg hover:border-[#176C72] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#E3ECEB]">
                    <span className="font-mono text-xs font-bold text-[#176C72] tracking-wider">
                      {pillar.code}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#5A7C85] bg-[#EBF4F3] px-2.5 py-1">
                      {pillar.category[locale]}
                    </span>
                  </div>

                  <div className="mt-6">
                    <div className="w-12 h-12 bg-[#E6F3F1] text-[#15858C] flex items-center justify-center mb-5">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-[#1C3343] leading-snug">
                      {pillar.title[locale]}
                    </h3>
                    <p className="text-xs text-[#455F6C] leading-relaxed mt-3">
                      {pillar.description[locale]}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-[#E8EFF0]">
                  <p className="text-[11px] font-bold text-[#176C72] uppercase tracking-wider mb-3">
                    {ar ? 'بروتوكولات التطبيق' : 'Control Protocols'}
                  </p>
                  <ul className="space-y-2">
                    {pillar.protocols.map((proto, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#3B5460]">
                        <CheckCircle2 size={14} className="text-[#15858C] shrink-0 mt-0.5" />
                        <span className="leading-snug">{proto[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
