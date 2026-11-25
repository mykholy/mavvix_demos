import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  Factory,
  Cog,
  Layers,
  Scale,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Flame,
  FileCheck2
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function IndustrialProcessPage(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const processes = [
    {
      step: '01',
      title: isAr ? 'استلام المواد الخام وفحص المنشأ' : 'Raw Billet Inflow & Spectrometry',
      desc: isAr ? 'فحص سبائك الصلب ولفائف الصاج بالمطياف الضوئي للتحقق من نسب الكربون والمنجنيز وتطابق شهادات 3.1.' : 'Optical emission spectrometry verifying carbon, manganese, and sulfur ratios matching certified mill heat numbers.',
      specs: isAr ? ['تحليل كيميائي فوري', 'اختبار الشد الأولي', 'فحص عيوب السطح'] : ['Direct chemical assay', 'Initial yield tensile test', 'Surface eddy current scan']
    },
    {
      step: '02',
      title: isAr ? 'الدرفلة والتشكيل الميكانيكي المستمر' : 'Continuous Roll Forming & Stamping',
      desc: isAr ? 'خطوط تشكيل مؤتمتة متعددة المحطات لإنتاج القطاعات الهندسية مع التحكم في الإجهادات المتبقية.' : 'Multi-stand automated cold roll tooling ensuring precise geometric radius and minimal residual stress.',
      specs: isAr ? ['تفاوت زوايا ±0.5°', 'سمك حتى 6 مم', 'سرعة سحب 30 م/دقيقة'] : ['Angular tolerance ±0.5°', 'Thickness up to 6.0mm', 'Line speed 30 m/min']
    },
    {
      step: '03',
      title: isAr ? 'المعالجة السطحية والجلفنة بالغمس الساخن' : 'Hot-Dip Galvanizing & Passivation',
      desc: isAr ? 'أحواض غمر زنك منصهر بدرجة نقاء 99.9% لتكوين طبقة حماية بينية ملتحمة كيميائيًا بالحديد.' : 'Molten zinc immersion conforming to ASTM A123, producing metallurgically bonded zinc-iron alloy barrier.',
      specs: isAr ? ['سماكة طلاء 85+ ميكرون', 'مقاومة رذاذ الملح 1000 ساعة', 'فحص الالتصاق'] : ['Coating 85+ microns', '1,000 hrs salt spray tested', 'Adhesion peel resistance']
    },
    {
      step: '04',
      title: isAr ? 'مختبر فحص الجودة والتسليم النهائي' : 'Mechanical Testing & Final QA Release',
      desc: isAr ? 'اختبارات الشد الهيدروليكي، اختبار الصدمة شاربي (Charpy V-notch)، وتوثيق شهادات المنشأ الرسمية.' : 'Full hydraulic tensile break, low-temperature impact tests, and issuance of formal EN 10204 Type 3.1 dossiers.',
      specs: isAr ? ['شهادة EN 10204 3.1', 'رمز تتبع حراري Heat No', 'تغليف تصدير بحري'] : ['EN 10204 3.1 Certificate', 'Heat number trace stamp', 'Moisture-barrier export pack']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-1">
          PRODUCTION PROTOCOLS & QUALITY CONTROLS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#12243C] tracking-tight">
          {isAr ? 'خطوط الإنتاج ومعايير ضبط الجودة' : 'Manufacturing Processes & QA Infrastructure'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {isAr
            ? 'نعتمد منظومة تصنيع متكاملة تضمن تتبع كل دفعة إنتاج من السبيكة الخام وحتى التغليف والتصدير.'
            : 'Traceable manufacturing architecture ensuring metallurgical integrity from virgin billet to port delivery.'}
        </p>
      </div>

      {/* Production Process Steps */}
      <div className="space-y-6">
        {processes.map((p) => (
          <div
            key={p.step}
            className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm flex flex-col lg:flex-row items-start justify-between gap-8 hover:border-stone-400 transition-all"
          >
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-[#12243C] text-amber-400 font-mono font-black text-sm flex items-center justify-center">
                  {p.step}
                </span>
                <h3 className="text-xl font-bold text-[#12243C]">
                  {p.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {p.desc}
              </p>
            </div>

            {/* Spec Box */}
            <div className="w-full lg:w-80 bg-[#F4F6F6] border border-stone-300 rounded-xl p-5 space-y-3 shrink-0">
              <span className="text-[11px] font-mono font-bold text-amber-700 uppercase tracking-wider block">
                {isAr ? 'المحددات المعيارية:' : 'Quality Parameters:'}
              </span>
              <ul className="space-y-2 text-xs text-stone-700 font-mono">
                {p.specs.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Procurement CTA */}
      <div className="text-center pt-8 border-t border-stone-300">
        <h3 className="text-xl font-bold text-[#12243C] mb-3">
          {isAr ? 'هل تحتاج إلى تصنيع بمواصفات خاصة أو طلب كميات تصدير؟' : 'Need Custom Tolerances or Volume Export Pricing?'}
        </h3>
        <Link
          href={`/${locale}/preview/industrial/rfq`}
          className="inline-flex items-center gap-2 bg-[#DE9E37] hover:bg-[#c98e2f] text-slate-950 text-xs font-black px-6 py-3.5 rounded-xl uppercase tracking-wider shadow-sm transition-all"
        >
          <span>{isAr ? 'بدء طلب عروض الأسعار (RFQ)' : 'Open Commercial RFQ Basket'}</span>
          <Arrow className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

