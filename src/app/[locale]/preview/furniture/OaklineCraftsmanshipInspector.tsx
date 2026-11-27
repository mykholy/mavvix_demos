'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  Ruler,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Sparkles,
  TreePine,
  Flame,
  Award,
  Maximize2
} from 'lucide-react';

interface CraftStandard {
  id: string;
  code: string;
  category: 'joinery' | 'finishing' | 'timber' | 'hardware' | 'sustainability';
  nameAr: string;
  nameEn: string;
  metricLabel: string;
  metricValue: string;
  descriptionAr: string;
  descriptionEn: string;
  ruleAr: string;
  ruleEn: string;
  authority: string;
}

const CRAFT_STANDARDS: CraftStandard[] = [
  {
    id: 'craft-01',
    code: 'JOINERY // M&T-01',
    category: 'joinery',
    nameAr: 'التعشيقات الخشبية الميكانيكية (نقر ولسان)',
    nameEn: 'Interlocking Mortise & Tenon Joinery',
    metricLabel: 'Joint Tolerance',
    metricValue: '±0.15 mm Machine Fit',
    descriptionAr: 'كل هيكل كرسي وطاولة يُجمَّع بتعشيقات خشبية محكمة بدون مسامير سطحية أو زوايا معدنية ضعيفة، لضمان استقرار المفصل تحت الأحمال الديناميكية المستمرة.',
    descriptionEn: 'Load-bearing timber frames utilize precision-milled mortise and tenon joinery reinforced with hardwood dowels, avoiding superficial screws and flimsy brackets.',
    ruleAr: 'اختبار صلابة المفصل حتى 350 كجم ضغط جانبي دون فك أو تخلخل في البنية.',
    ruleEn: 'Joint structural shear testing certified up to 350 kg lateral stress without micro-fracture.',
    authority: 'Architectural Woodwork Institute (AWI Premium Tier)'
  },
  {
    id: 'craft-02',
    code: 'FINISH // OIL-03',
    category: 'finishing',
    nameAr: 'التشطيب بالزيت العضوي والشمع الطبيعي',
    nameEn: 'Multi-Stage Natural Hardwax Oil & Beeswax',
    metricLabel: 'VOC Content',
    metricValue: '0.0 g/L (Food Safe)',
    descriptionAr: 'معالجة يدوية بثلاث طبقات من الزيوت النباتية العضوية وشمع العسل تبرز عمق ألياف الخشب مع إبقائه حيًا يتنفس دون طبقة بلاستيكية خشنة.',
    descriptionEn: 'Hand-rubbed three-coat organic vegetable oil and beeswax finish that enhances natural grain depth while allowing the wood to breathe naturally.',
    ruleAr: 'مقاومة السوائل حتى 4 ساعات متواصلة (الماء، القهوة، الشاي) مع إمكانية تجديد السطح موضعيًا.',
    ruleEn: '4-hour continuous fluid resistance (water, coffee, olive oil) with spot-repairable patina.',
    authority: 'EN 71-3 Safety & DIN 68861-1C Stain Standard'
  },
  {
    id: 'craft-03',
    code: 'TIMBER // KILN-02',
    category: 'timber',
    nameAr: 'التجفيف الحراري البطيء وثبات الرطوبة',
    nameEn: 'Slow Kiln-Dried Moisture Equilibrium',
    metricLabel: 'Moisture Range',
    metricValue: '7% ± 1% Equilibrium',
    descriptionAr: 'يخضع الخشب الصلب لدورات تجفيف حراري بطيئة تمتد لأسابيع في أفران متطورة، لضبط نسبة الرطوبة الداخلية ومنع التقوس أو الانكماش في المناخات الجافة.',
    descriptionEn: 'Selected solid hardwoods undergo multi-week slow kiln conditioning to achieve internal moisture equilibrium, eliminating warping, cupping, or checking.',
    ruleAr: 'مقياس رطوبة رقمي لكل لوح خشب صلب قبل دخول مرحلة التقطيع والتشكيل.',
    ruleEn: 'Digital pin-probe moisture verification across every solid slab prior to dimensioning.',
    authority: 'NHLA Certified Hardwood Kiln Protocol'
  },
  {
    id: 'craft-04',
    code: 'AESTHETICS // GRAIN-04',
    category: 'timber',
    nameAr: 'مطابقة العروق الخشبية المتصلة (بوكماتش)',
    nameEn: 'Continuous Bookmatched Grain Sequencing',
    metricLabel: 'Pattern Continuity',
    metricValue: 'Flitched Single-Log Flow',
    descriptionAr: 'واجهات الأدراج وأسطح طاولات الطعام تُنتقى من نفس الجذع الخشبي لضمان استمرارية حركة العروق وتناسق درجات اللون الطبيعية على كامل مساحة القطعة.',
    descriptionEn: 'Dining table tops and credenza drawer frontages are milled sequentially from single timber flitches to achieve unbroken visual grain continuity.',
    ruleAr: 'مطابقة بصرية وفوتوغرافية متصلة لواجهات القطعة قبل الاعتماد والتجميع النهائي.',
    ruleEn: 'Photographic grain alignment sign-off across all facade panels before glue-up.',
    authority: 'Bespoke Atelier Master Joiner Standard'
  },
  {
    id: 'craft-05',
    code: 'HARDWARE // BLUM-05',
    category: 'hardware',
    nameAr: 'منظومات الفتح والإغلاق المخفية فائقة التحمل',
    nameEn: 'Concealed Heavy-Duty Undermount Runners',
    metricLabel: 'Cycle Durability',
    metricValue: '100,000 Verified Cycles',
    descriptionAr: 'جميع الأدراج ووحدات التخزين مجهزة بمجاري حركة سفلية مخفية ألمانية الصنع مع نظام إخماد صامت وسعة تحميل تصل إلى 40 كجم للدرج الواحد.',
    descriptionEn: 'Integrated concealed undermount drawer slides with progressive silent damping, full-extension travel, and 40kg dynamic load capacity per drawer.',
    ruleAr: 'حركة هادئة خالية من الاهتزاز مع ضبط ثلاثي الأبعاد للمحاذاة الرأسية والأفقية.',
    ruleEn: 'Vibration-free glide with 3D tool-free front adjustment for microscopic reveal gaps.',
    authority: 'LGA Tested Quality German Benchmark'
  },
  {
    id: 'craft-06',
    code: 'ETHICS // FSC-06',
    category: 'sustainability',
    nameAr: 'استدامة الأخشاب ومصادر الغابات المعتمدة',
    nameEn: 'FSC-Certified Regenerative Hardwood',
    metricLabel: 'Chain of Custody',
    metricValue: '100% Chain-of-Custody',
    descriptionAr: 'نستخدم فقط الأخشاب الصلبة المحصودة من غابات أوروبية وأمريكية معتمدة بيئيًا تضمن زراعة أشجار بديلة والحفاظ على التنوع الحيوي للأجيال القادمة.',
    descriptionEn: 'All timber species are legally and ethically procured from certified sustainable forests operating under strict replanting and biodiversity charters.',
    ruleAr: 'توثيق كود التتبع وحيازة الشهادة المعتمدة لكل دفعة توريد خامات خشبية.',
    ruleEn: 'Full supply chain custody documentation provided with every commissioned piece.',
    authority: 'Forest Stewardship Council (FSC-C102934)'
  }
];

export default function OaklineCraftsmanshipInspector({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [activeId, setActiveId] = useState<string>(CRAFT_STANDARDS[0].id);
  const activeStandard = CRAFT_STANDARDS.find((s) => s.id === activeId) || CRAFT_STANDARDS[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D8CCBD] shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8CCBD]">
        <div>
          <span className="text-xs font-mono font-bold text-[#7E5322] uppercase tracking-widest block mb-1">
            WOODCRAFT INTEGRITY & JOINERY SCIENCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#30271F] tracking-tight">
            {isAr ? 'معايير الصناعة الخشبية والتعشيقات المعمارية' : 'Woodcraft Standards & Architectural Joinery'}
          </h2>
          <p className="text-[#65513D] text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? 'الأثاث الراقي ليس مظهرًا خارجيًا فقط، بل هندسة داخلية تضمن تماسك الأخشاب الطبيعية وثباتها عبر العقود.'
              : 'Authentic furniture is rooted in structural joinery, controlled moisture equilibrium, and non-toxic tactile finishes.'}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-[#FAF6EF] px-3.5 py-2 rounded-xl border border-[#D8CCBD] text-xs font-mono text-[#7E5322] font-semibold">
          <Award className="w-4 h-4 text-[#BA9062]" />
          <span>FSC TIMBER • AWI PREMIUM • DIN 68861</span>
        </div>
      </div>

      {/* Grid of Craft Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CRAFT_STANDARDS.map((item) => {
          const isSelected = item.id === activeStandard.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#30271F] text-white border-[#BA9062] shadow-lg ring-1 ring-[#BA9062]/40'
                  : 'bg-[#FAF6EF] text-[#30271F] border-[#D8CCBD] hover:border-[#BA9062] hover:bg-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                    isSelected ? 'bg-white/10 text-[#DAB48B]' : 'bg-[#EDE5D7] text-[#7E5322]'
                  }`}>
                    {item.code}
                  </span>
                  <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-amber-300' : 'text-[#7E5322]'}`}>
                    {item.metricValue}
                  </span>
                </div>

                <h3 className={`text-base font-serif font-bold leading-snug ${isSelected ? 'text-white' : 'text-[#30271F]'}`}>
                  {isAr ? item.nameAr : item.nameEn}
                </h3>

                <p className={`text-xs leading-relaxed ${isSelected ? 'text-[#E4D6C5]' : 'text-[#65513D]'}`}>
                  {isAr ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>

              <div className={`mt-5 pt-4 border-t text-xs space-y-1.5 ${
                isSelected ? 'border-white/15 text-[#E4D6C5]' : 'border-[#D8CCBD] text-[#65513D]'
              }`}>
                <div className="flex items-center justify-between text-[11px]">
                  <span>{isAr ? 'المرجعية المعيارية:' : 'Governing Standard:'}</span>
                  <span className={`font-semibold ${isSelected ? 'text-white' : 'text-[#30271F]'}`}>{item.authority}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected standard detail drawer */}
      <div className="bg-[#30271F] text-white p-6 sm:p-8 rounded-2xl border border-[#4A3B2F] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#DAB48B] text-xs font-mono font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>{isAr ? 'قاعدة الجودة التعاقدية المعتمدة' : 'Contractual Quality Gate & Tolerance'}</span>
          </div>
          <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
            {isAr ? activeStandard.nameAr : activeStandard.nameEn} ({activeStandard.code})
          </h4>
          <p className="text-xs sm:text-sm text-[#E4D6C5] max-w-3xl leading-relaxed">
            {isAr ? activeStandard.ruleAr : activeStandard.ruleEn}
          </p>
        </div>

        <div className="bg-black/40 px-5 py-4 rounded-xl border border-white/10 shrink-0 text-center sm:text-start space-y-1">
          <span className="text-[10px] font-mono text-[#DAB48B] uppercase block">
            {activeStandard.metricLabel}
          </span>
          <span className="text-base sm:text-lg font-mono font-bold text-white block">
            {activeStandard.metricValue}
          </span>
          <span className="text-[10px] text-stone-300 block">
            {activeStandard.authority}
          </span>
        </div>
      </div>
    </div>
  );
}
