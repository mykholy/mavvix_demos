import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import {
  Factory,
  Cog,
  ShieldCheck,
  Globe,
  Layers,
  ArrowRight,
  ArrowLeft,
  FileCheck2
} from 'lucide-react';

interface Props {
  params: { locale: Locale };
}

export default function IndustrialAboutPage({ params }: Props) {
  const { locale } = params;
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block mb-1">
          MANUFACTURING PROFILE & GLOBAL SUPPLY
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#12243C] tracking-tight">
          {isAr ? 'عن مجموعة فيرولاين للصناعات المعدنية' : 'About Ferroline Industrial Group'}
        </h1>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {isAr
            ? 'منظومة توريد صناعي متطورة تربط بين التشكيل الدقيق وخطوط الجلفنة والمختبرات المعتمدة لتقديم حلول الصلب المطابقة للمواصفات العالمية.'
            : 'Engineered metallurgical supply chain providing structural steel forming, high-tensile fasteners, and full ASTM/DIN compliance for export.'}
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F4F6F6] text-amber-600 flex items-center justify-center font-bold">
            <Cog className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#12243C]">
            {isAr ? 'الدقة الأبعاد وتفاوتات التصنيع' : 'Dimensional Tolerance'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isAr
              ? 'نلتزم بفئات التفاوت الصارمة وفق معايير EN 10034 لضمان سهولة التركيب والتركيب الميكانيكي السريع في مواقع العمل.'
              : 'Strict adherence to EN 10034 tolerance classes ensuring seamless on-site mechanical alignment and zero field rework.'}
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F4F6F6] text-amber-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#12243C]">
            {isAr ? 'شهادات فحص الجودة (3.1)' : 'Type 3.1 Traceability'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isAr
              ? 'كل شحنة تصدير تصدر بشهادة تحليل كيميائي وميكانيكي موثقة برقم الصبة (Heat Number) لضمان الشفافية المطلقة.'
              : 'Certified EN 10204 Type 3.1 mill inspection documents providing complete chemical assay and mechanical break verification.'}
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F4F6F6] text-amber-600 flex items-center justify-center font-bold">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#12243C]">
            {isAr ? 'لوجستيات التعبئة والتصدير' : 'Export Logistics'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isAr
              ? 'أنماط تعبئة مخصصة للشحن البحري تشمل الصناديق الخشبية المعالجة والأغلفة العازلة للرطوبة لحماية الأسطح.'
              : 'Dedicated ocean freight packaging protocols including fumigated wooden crates and VCI moisture barrier wrapping.'}
          </p>
        </div>
      </div>

      {/* Concept Disclosure */}
      <div className="p-6 bg-stone-100 border border-stone-300 rounded-xl text-xs text-stone-600 text-center leading-relaxed">
        <strong>{isAr ? 'إشعار الشفافية التوضيحية:' : 'Concept Integrity Disclosure:'}</strong>{' '}
        {isAr
          ? 'شركة فيرولاين للصناعات نموذج أعمال تجريبي مصمم لعرض إمكانيات منصة Mavvix للحلول الرقمية للمصانع وشركات التوريد. كافة بيانات المنتجات تجريبية.'
          : 'Ferroline Industries is a fictional demonstrative catalog built to showcase Mavvix B2B procurement solutions. All product and mill records are synthetic.'}
      </div>
    </div>
  );
}

