import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  Factory,
  Building2,
  Cpu,
  Flame,
  Pipette,
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

interface Props {
  params: { locale: Locale };
}

export default function IndustrialIndustriesPage({ params }: Props) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const industries = [
    {
      id: 'construction',
      title: isAr ? 'المقاولات والهياكل الإنشائية الثقيلة' : 'Heavy Construction & Infrastructure',
      desc: isAr ? 'توريد قطاعات الصلب المعتمدة، الكمرات، والجمالونات للجسور والمباني الشاهقة والمستودعات.' : 'Certified heavy beams, column assemblies, and structural sections for bridges, high-rises, and logistics hubs.',
      icon: Building2,
      skus: ['FERRO-304-40', 'FERRO-BEAM-200', 'FERRO-TRUSS-50']
    },
    {
      id: 'machinery',
      title: isAr ? 'تصنيع الآلات والمعدات الميكانيكية' : 'OEM Machinery & Equipment Manufacturing',
      desc: isAr ? 'محاور دوران، مسامير شد عالية المقاومة فئة 8.8 و 10.9، وأجزاء ميكانيكية مخرطة بدقة CNC.' : 'High-tensile fasteners (Grade 8.8/10.9), precision shafts, and CNC turned transmission components.',
      icon: Cpu,
      skus: ['FERRO-FAST-88', 'FERRO-BOLT-M16', 'FERRO-PIN-12']
    },
    {
      id: 'hvac',
      title: isAr ? 'التكييف المركزي وشبكات التهوية الصناعية' : 'Industrial HVAC & Ventilation Systems',
      desc: isAr ? 'ألواح صلب مجلفن مقاوم للتآكل، مجاري هواء مطابقة لمعايير SMACNA، ودعامات تعليق.' : 'SMACNA compliant galvanized steel duct sheets, structural brackets, and vibration-isolated hangers.',
      icon: Flame,
      skus: ['FERRO-SHT-GALV', 'FERRO-DUCT-100', 'FERRO-BRK-HVAC']
    },
    {
      id: 'piping',
      title: isAr ? 'خطوط أنابيب البتروكيماويات والضغط العالي' : 'Pressure Piping & Petrochemical Flow',
      desc: isAr ? 'مواسير غير ملحومة (Seamless)، فلنجات مطروقة، ومحابس صناعية مطابقة لمواصفات ASME/ASTM.' : 'Seamless alloy pipes, forged flanges, and heavy valves compliant with ASME B31.3 standards.',
      icon: Pipette,
      skus: ['FERRO-PIPE-SCH40', 'FERRO-FLG-PN16', 'FERRO-VLV-BALL']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-1">
          CROSS-SECTOR APPLICATION MATRICES
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#12243C] tracking-tight">
          {isAr ? 'القطاعات الصناعية والتطبيقات الهندسية' : 'Served Industries & Application Environments'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {isAr
            ? 'نصمم ونورد حلول التشكيل والتوريدات المعدنية لتلائم البيئات الأكثر تطلبًا من المنشآت الإنشائية الكبرى وحتى خطوط البتروكيماويات.'
            : 'Engineering alloy configurations mapped to demanding industrial environments, from structural civil works to high-pressure chemical plants.'}
        </p>
      </div>

      {/* Industries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {industries.map((ind) => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.id}
              className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:border-stone-400 transition-all group"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#F4F6F6] text-amber-600 group-hover:bg-[#12243C] group-hover:text-amber-400 flex items-center justify-center transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-widest">
                      SECTOR // {ind.id.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-[#12243C] group-hover:text-amber-600 transition-colors">
                      {ind.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  {ind.desc}
                </p>

                <div className="p-4 bg-[#F4F6F6] rounded-xl border border-stone-200 space-y-2 text-xs font-mono">
                  <span className="text-stone-400 block text-[11px] uppercase">
                    {isAr ? 'عينات الـ SKUs المعتمدة في هذا القطاع:' : 'Certified Industry SKUs:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ind.skus.map((sku) => (
                      <Link
                        key={sku}
                        href={`/${locale}/preview/industrial/rfq?sku=${sku}`}
                        className="bg-white px-2.5 py-1 rounded border border-stone-300 font-bold text-amber-700 hover:border-amber-600 text-[11px]"
                      >
                        {sku}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <Link
                  href={`/${locale}/preview/industrial/products?category=${ind.id === 'construction' ? 'profiles' : ind.id === 'machinery' ? 'fasteners' : 'piping'}`}
                  className="text-xs font-bold text-[#12243C] hover:text-amber-600 flex items-center gap-1.5"
                >
                  <span>{isAr ? 'عرض منتجات هذا القطاع' : 'Browse Sector SKUs'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/${locale}/preview/industrial/rfq`}
                  className="text-xs font-bold bg-[#DE9E37] hover:bg-[#c98e2f] text-slate-950 px-4 py-2 rounded-lg transition-all"
                >
                  {isAr ? 'طلب تسعير (RFQ)' : 'Request RFQ'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

