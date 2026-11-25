import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { Sparkles, Scissors, Leaf, HeartHandshake, ArrowRight, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Our Story & Natural Linen Craft | Noria Atelier',
  description: 'Learn about Noria Atelier’s philosophy: Egyptian natural linen, architectural proportions, and mindful living.'
};

export default async function EcommerceStoryPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Fold */}
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C7D73]">
            {isAr ? 'عن الدار والحرفية' : 'Atelier Narrative'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1715] leading-tight">
            {isAr ? 'أزياء تولد من نقاء الأرض وحكمة الخياطة' : 'Garments Born from Earth and Tailoring Wisdom'}
          </h1>
          <p className="text-base sm:text-lg text-[#695E57] leading-relaxed">
            {isAr
              ? 'تأسست نوريا أتيليه كفكرة ترفض الاستهلاك السريع، وتستعيد جمال الأنسجة الطبيعية المصرية التي تعيش لسنوات وتزداد أصالة مع كل ارتداء.'
              : 'Noria Atelier was conceived in resistance to ephemeral fashion cycles, reclaiming the tactile integrity of Egyptian flax linen and timeless drape.'}
          </p>
        </div>

        {/* Narrative Modules */}
        <div className="space-y-8 text-xs sm:text-sm text-[#524842] leading-relaxed font-serif">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBE5DF] space-y-4 shadow-sm font-sans">
            <div className="w-10 h-10 rounded-xl bg-[#F7EFEA] text-[#C89B8C] flex items-center justify-center font-bold">
              <Leaf className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1715]">
              {isAr ? '1. احترام الألياف الطبيعية' : '1. Reverence for Untamed Fibers'}
            </h2>
            <p className="leading-relaxed text-[#695E57]">
              {isAr
                ? 'نختار خيوط الكتان المصري المزروع في دلتا النيل، ونعالجها بدون مبيضات كيميائية ضارة. نترك الألياف تتنفس طبيعياً لنضمن نعومة الملمس وتهوية استثنائية تناسب الأجواء الحارة والمعتدلة.'
                : 'We source raw flax woven along the Nile Delta, washed mechanically with natural enzymes rather than aggressive chemical bleach. The resulting fabric retains its organic breathability, creating garments that cool during midday heat and insulate softly in the evening.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBE5DF] space-y-4 shadow-sm font-sans">
            <div className="w-10 h-10 rounded-xl bg-[#F7EFEA] text-[#C89B8C] flex items-center justify-center font-bold">
              <Scissors className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1715]">
              {isAr ? '2. القصات الهندسية الهادئة' : '2. Architectural Restraint'}
            </h2>
            <p className="leading-relaxed text-[#695E57]">
              {isAr
                ? 'نستوحي تصاميمنا من فنون العمارة وبساطة النسب المتوازنة. لا نعتمد على الزخارف الصاخبة، بل نركز على انسيابية الكتف، وسقوط القماش، وعمق الجيوب، ليتحرك الفستان أو القميص بحرية تامة مع جسدك.'
                : 'Our design language draws inspiration from architectural volumes and proportional balance. Eschewing loud graphics, our atelier obsesses over seam angles, collar drop, and pocket depth—ensuring effortless freedom of movement throughout the day.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBE5DF] space-y-4 shadow-sm font-sans">
            <div className="w-10 h-10 rounded-xl bg-[#F7EFEA] text-[#C89B8C] flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1715]">
              {isAr ? '3. الشفافية الحقيقية دون ادعاءات زائفة' : '3. Honest Craftsmanship'}
            </h2>
            <p className="leading-relaxed text-[#695E57]">
              {isAr
                ? 'لا نروج لشهادات استدامة وهمية؛ التزامنا يظهر في عدد القطع المحدود (24 تصميماً فقط في الموسم)، وفي حياكة متينة تضمن ألا تتمزق الدرزات، وفي توفير إرشادات عناية واضحة لإطالة عمر كل قطعة.'
                : 'We avoid fabricated greenwashing claims. Our sustainability manifests in low-volume intentional production (24 designs per season), reinforced French seams, and honest care advice that protects your wardrobe investment.'}
            </p>
          </div>
        </div>

        {/* CTA to collections */}
        <div className="text-center p-8 rounded-3xl bg-[#1A1715] text-white space-y-4">
          <h3 className="font-serif text-2xl font-bold">
            {isAr ? 'استكشف تشكيلات نوريا أتيليه' : 'Explore Current Collections'}
          </h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto">
            {isAr
              ? 'تصفح قطع الكتان والملابس اليومية المصممة بعناية لترافقك في كافة تفاصيل يومك.'
              : 'Browse our signature linen tunics, dresses, and wardrobe essentials.'}
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/preview/ecommerce/collections`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C89B8C] hover:bg-[#B88777] text-[#1A1715] text-xs font-bold transition-colors"
            >
              <span>{isAr ? 'تسوق التشكيلات' : 'Shop Collections'}</span>
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

