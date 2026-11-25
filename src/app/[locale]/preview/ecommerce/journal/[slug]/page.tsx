import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getEditorialPostBySlug, getCatalogItems } from '@/lib/db/repositories';
import { ArrowRight, ArrowLeft, Clock, BookOpen, Sparkles } from 'lucide-react';

export async function generateMetadata(
  props: {
    params: Promise<{ locale: Locale; slug: string }>
  }
) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const post = getEditorialPostBySlug('ecommerce', slug, locale);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: `${post.title} | Noria Style Journal`,
    description: post.summary
  };
}

export default async function EcommerceArticleDetailPage(
  props: {
    params: Promise<{ locale: Locale; slug: string }>
  }
) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const post = getEditorialPostBySlug('ecommerce', slug, locale);
  if (!post) {
    notFound();
  }

  const allProducts = getCatalogItems('ecommerce', locale);
  const suggestedProducts = allProducts.slice(0, 3);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#8C7D73]">
          <Link href={`/${locale}/preview/ecommerce`} className="hover:text-[#1A1715]">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/preview/ecommerce/journal`} className="hover:text-[#1A1715]">
            {isAr ? 'المجلة' : 'Journal'}
          </Link>
          <span>/</span>
          <span className="text-[#1A1715] font-medium truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* Article Header */}
        <div className="space-y-4 pb-8 border-b border-[#EBE5DF]">
          <div className="flex items-center gap-3 text-xs text-[#8C7D73] font-mono">
            <span className="uppercase text-[#695E57] bg-[#F3EFEA] px-2.5 py-0.5 rounded-full font-semibold">
              {post.category}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>4 min read</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1715] leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#695E57] leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* Article Body */}
        <div className="space-y-8 text-sm sm:text-base text-[#524842] leading-relaxed font-serif">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1A1715] font-sans">
              {isAr ? 'جماليات البساطة والخطوط المعمارية' : 'The Aesthetics of Minimal Architecture in Dress'}
            </h2>
            <p>
              {isAr
                ? 'في عالم يتسارع فيه إنتاج الملابس الاستهلاكية، يبرز الكتان كخامة تعيد تعريف مفهوم الرفاهية الهادئة. لا يحتاج الكتان الطبيعي إلى بريق صناعي ليثبت جودته؛ إذ تكفيه بنيته النسيجية الغنية وثقله المنسدل الذي يمنح القميص أو الفستان حضوراً مميزاً يتناغم مع حركة الجسد اليومية.'
                : 'In a landscape dominated by hyper-accelerated trend churning, natural linen emerges as the quintessential expression of tactile luxury. Pure linen demands no artificial sheen; its organic textural irregularities and graceful drape provide an architectural presence that moves fluidly with everyday life.'}
            </p>
            <p>
              {isAr
                ? 'تمتاز ألياف الكتان بكونها أكثر متانة بثلاث مرات من القطن التقليدي، كما أنها تزداد نعومة ولمعاناً حريرياً خفيفاً بعد كل دورة غسيل. هذا التحول المستمر يجعل كل قطعة في خزانتك تجربة متجددة تعبر عن مسارك الشخصي.'
                : 'Flax fibers demonstrate up to three times the tensile strength of conventional staple cotton, gradually softening and acquiring a subtle patina with each laundering. This living transformation renders every piece a long-term investment in functional beauty.'}
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#F8F5F1] border border-[#E8E1D9] font-sans space-y-3">
            <h3 className="font-serif text-base font-bold text-[#1A1715] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C89B8C]" />
              <span>{isAr ? 'قواعد التنسيق اليومي المريح' : 'Three Styling Tenets from the Atelier'}</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#695E57] leading-relaxed">
              <li>• <strong>{isAr ? 'التناغم الأحادي (Monochrome):' : 'Monochrome Balance:'}</strong> {isAr ? 'ارتداء درجات متقاربة من العاجي والصلصال يمنح القامة امتداداً بصرياً مريحاً.' : 'Pairing tonal shades of unbleached ivory and desert clay creates a continuous, lengthening visual axis.'}</li>
              <li>• <strong>{isAr ? 'التباين الحسي في الملمس:' : 'Tactile Contrast:'}</strong> {isAr ? 'دمج الكتان الفضفاض مع وشاح صوفي خفيف يضيف عمقاً للأناقة دون ثقل.' : 'Layering crisp linen poplin with fine-spun wool adds dimensional depth without unnecessary bulk.'}</li>
              <li>• <strong>{isAr ? 'حرية النسب المسترخية:' : 'Volume Proportion:'}</strong> {isAr ? 'اختيار قطعة علوية واسعة مع بنطال مستقيم يمنح مظهراً عصرياً ومريحاً في آنٍ واحد.' : 'Balancing an oversized tunic with a tapered utility trouser maintains proportion and ease.'}</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1A1715] font-sans">
              {isAr ? 'العناية بالكتان للحفاظ على رونقه' : 'Caring for Linen Across Decades'}
            </h2>
            <p>
              {isAr
                ? 'للحفاظ على نعومة القطعة، يُنصح دائماً باستخدام الماء الفاتر أو البارد، والابتعاد عن درجات العصر القاسية في الغسالة. يكفي نشر القطعة في الظل بينما لا تزال رطبة قليلاً لتتساقط التجاعيد الحادة ويبقى مظهر القماش الطبيعي مفعماً بالحيوية دون الحاجة لكيّ قاسٍ.'
                : 'To retain textile softness, wash with cool water on a gentle cycle, avoiding harsh tumble drying. Hanging the garment damp in shaded air allows natural gravity to relax creases, preserving linen’s characteristic living texture without aggressive ironing.'}
            </p>
          </section>
        </div>

        {/* Related Products from Store */}
        <div className="pt-8 border-t border-[#EBE5DF] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#1A1715]">
              {isAr ? 'قطع من وحي هذا المقال' : 'Garments Featured in this Story'}
            </h3>
            <Link
              href={`/${locale}/preview/ecommerce/collections`}
              className="text-xs font-semibold text-[#1A1715] hover:text-[#C89B8C] inline-flex items-center gap-1"
            >
              <span>{isAr ? 'تصفح كل القطع' : 'Browse All'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {suggestedProducts.map(p => (
              <div key={p.id} className="p-4 rounded-2xl bg-white border border-[#EBE5DF] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#8C7D73]">{p.item_type}</span>
                <h4 className="font-serif text-sm font-bold text-[#1A1715]">{p.title}</h4>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold text-xs">{Math.round(p.base_price_cents / 100)} EGP</span>
                  <Link
                    href={`/${locale}/preview/ecommerce/products/${p.slug}`}
                    className="text-xs font-semibold text-[#C89B8C] hover:underline"
                  >
                    {isAr ? 'التفاصيل' : 'View'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

