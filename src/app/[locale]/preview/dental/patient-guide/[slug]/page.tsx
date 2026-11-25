import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getEditorialPostBySlug, getDentalServices } from '@/lib/db/repositories';
import ArticleReadingProgress from './ArticleReadingProgress';
import {
  FileText, ShieldAlert, Calendar, ArrowRight, ArrowLeft,
  CheckCircle2, Clock, Share2, BookOpen
} from 'lucide-react';

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

  const post = getEditorialPostBySlug('dental', slug, locale);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: `${post.title} | Lumen Patient Guide`,
    description: post.summary
  };
}

export default async function DentalArticleDetailPage(
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

  const post = getEditorialPostBySlug('dental', slug, locale);
  if (!post) {
    notFound();
  }

  const allServices = getDentalServices(locale);
  const relatedServices = allServices.slice(0, 2);

  return (
    <div className="py-12 sm:py-16">
      <ArticleReadingProgress />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#557874]">
          <Link href={`/${locale}/preview/dental`} className="hover:text-[#193A39]">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/preview/dental/patient-guide`} className="hover:text-[#193A39]">
            {isAr ? 'دليل المراجع' : 'Patient Guide'}
          </Link>
          <span>/</span>
          <span className="text-[#193A39] font-medium truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* Clinical Review Warning Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF9F2] border border-[#F4E3C8] text-[#7A4B1A] text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#C97825] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-[#945617]">
              {isAr ? 'تنويه المراجعة الطبية الاسترشادية' : 'Medical Review Disclaimer'}
            </h4>
            <p className="leading-relaxed">
              {isAr
                ? 'هذا المقال توعوي عام ومعد لنموذج مافيكس التجريبي. يجب مراجعة أي نصائح صحية أو عادات تنظيف من قبل طبيب أسنانك الخاص بما يلائم تاريخك الفموي الفردي.'
                : 'This article is prepared for the Mavvix demonstrative showcase. All hygiene and dental health topics are general educational overviews and must be reviewed by a licensed dental professional before clinical application.'}
            </p>
          </div>
        </div>

        {/* Article Header */}
        <div className="space-y-4 pb-8 border-b border-[#E0EBE7]">
          <div className="flex items-center gap-3 text-xs text-[#557874]">
            <span className="font-semibold text-[#2C5251] bg-[#EDF5F2] px-2.5 py-0.5 rounded-full">
              {post.category || 'Patient Education'}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{isAr ? 'قراءة في 3 دقائق' : '3 min read'}</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#193A39] leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#466662] leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* Table of Contents & Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Table of Contents (Desktop Sticky) */}
          <div className="md:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E0EBE7] space-y-3 sticky top-28">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C5251] flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{isAr ? 'فهرس المحتوى' : 'Table of Contents'}</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#557874]">
                <li><a href="#intro" className="hover:text-[#193A39] transition-colors">{isAr ? '1. المقدمة والأهمية الوقائية' : '1. Overview & Preventive Value'}</a></li>
                <li><a href="#principles" className="hover:text-[#193A39] transition-colors">{isAr ? '2. المبادئ والخطوات العملية' : '2. Core Practical Principles'}</a></li>
                <li><a href="#recommendations" className="hover:text-[#193A39] transition-colors">{isAr ? '3. إرشادات الزيارة والمتابعة' : '3. Clinical Visit Recommendations'}</a></li>
                <li><a href="#sources" className="hover:text-[#193A39] transition-colors">{isAr ? '4. مراجع وإشعار المراجعة' : '4. Sources & Verification'}</a></li>
              </ul>
            </div>
          </div>

          {/* Main Editorial Text (300+ words) */}
          <div className="md:col-span-8 space-y-8 text-sm sm:text-base text-[#2C4A47] leading-relaxed font-serif">
            <section id="intro" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#193A39] font-sans">
                {isAr ? '1. الرعاية الفموية الوقائية ودورها في الراحة طويلة الأمد' : '1. Preventative Oral Health and Long-Term Comfort'}
              </h2>
              <p>
                {isAr
                  ? 'تعتبر العناية بصحة الأسنان واللثة ركيزة أساسية للصحة العامة والراحة اليومية. يعتقد الكثير من الناس خطأً أن زيارة طبيب الأسنان ضرورية فقط عند الشعور بالألم أو الانزعاج، بينما تظهر الدراسات السريرية الحديثة أن الفحوصات الدورية الهادئة تمنع أكثر من 85% من المشكلات المعقدة قبل تطورها.'
                  : 'Maintaining optimal oral hygiene and gum health is foundational to overall well-being. It is a common misconception that dental visits are only necessary upon the onset of discomfort. Modern preventative dentistry demonstrates that scheduled, non-invasive examinations intercept the vast majority of restorative issues before they progress.'}
              </p>
              <p>
                {isAr
                  ? 'من خلال الفحص المبكر واستخدام تقنيات التصوير الرقمي منخفض الجرعة، يمكن للطبيب الكشف عن التغيرات الميكروسكوبية في طبقة المينا وصحة اللثة دون التسبب بأي ألم أو توتر للمراجع، مما يوفر الوقت والتكلفة ويحافظ على البنية الطبيعية للأسنان.'
                  : 'By incorporating low-dose digital diagnostics and high-magnification intraoral visuals, clinicians can observe micro-level enamel variations and periodontal shifts early, preserving natural tooth structure with minimal clinical intervention.'}
              </p>
            </section>

            <section id="principles" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#193A39] font-sans">
                {isAr ? '2. المبادئ اليومية للحفاظ على صحة الابتسامة' : '2. Daily Principles for Sustainable Smile Health'}
              </h2>
              <p>
                {isAr
                  ? 'تبدأ الوقاية الفعالة من روتين منزلي بسيط لكنه متسق. استخدام فرشاة ذات شعيرات ناعمة بزاوية 45 درجة مع حركة دائرية لطيفة يحمي خط اللثة من التراجع الميكانيكي. كما يلعب خيط الأسنان المائي أو التقليدي دوراً حيوياً في إزالة الرواسب البكتيرية الدقيقة بين الأسنان والتي تعجز الفرشاة العادية عن الوصول إليها.'
                  : 'Effective daily prophylaxis relies on consistent, gentle routines. Using an ultra-soft bristle brush angled at 45 degrees along the gingival margin prevents mechanical recession while effectively dislodging plaque bio-films. Interdental cleaning using floss or water pulsators removes interproximal debris unreachable by conventional bristles.'}
              </p>
              <p>
                {isAr
                  ? 'بالإضافة إلى ذلك، فإن تقليل تناول المشروبات الحمضية والسكريات المتكررة على مدار اليوم يقلل من فترات الهجوم الحمضي على طبقة المينا، مما يمنح اللعاب فرصة طبيعية لإعادة التمعدن وحماية سطح الأسنان.'
                  : 'Furthermore, spacing dietary acid and refined sugar exposures permits the natural buffering capacity of saliva to remineralize microscopic enamel fissures between meals.'}
              </p>
            </section>

            <section id="recommendations" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#193A39] font-sans">
                {isAr ? '3. كيف تساعدك استشارة لومِن على اتخاذ قرارات واثقة؟' : '3. How Lumen Consultations Guide Confident Decisions'}
              </h2>
              <p>
                {isAr
                  ? 'في عيادة لومِن، نحرص على ألا تكون جلسة الاستشارة مصدراً لأي ضغط نفسي. نأخذ الوقت الكافي لمراجعة تاريخك الفموي وتفضيلاتك الشخصية، ونعرض عليك الصور والخيارات بوضوح تام، بحيث تكون شريكاً كاملاً في اختيار خطة العناية المناسبة لك ولأسرتك.'
                  : 'At Lumen Dental Studio, consultations are structured to ensure you never feel rushed or pressured. We systematically review your oral landscape with high-definition digital imagery, discussing every alternative so you feel completely confident before any treatment commences.'}
              </p>
            </section>

            <section id="sources" className="p-4 rounded-xl bg-[#F8FBFA] border border-[#E0EBE7] text-xs font-sans space-y-2 text-[#557874]">
              <h3 className="font-bold text-[#193A39]">
                {isAr ? '4. مصادر توثيق المحتوى والمراجعة السريرية' : '4. Content Sources & Clinical Review Notice'}
              </h3>
              <p>
                {isAr
                  ? 'مراجع المحتوى الإرشادي: إرشادات الجمعيات الدولية لطب الأسنان الوقائي (محتوى تجريبي استرشادي لمافيكس). يخضع للتدقيق والاعتماد النهائي من قِبل الفريق الطبي المعين للعيادة قبل النشر الإنتاجي.'
                  : 'Content synthesized in alignment with general preventive dental literature. Fictional placeholder subject to clinical verification by the licensed medical director prior to live production.'}
              </p>
            </section>
          </div>
        </div>

        {/* Linked Services Section */}
        <div className="pt-8 border-t border-[#E0EBE7] space-y-6">
          <h3 className="font-serif text-xl font-bold text-[#193A39]">
            {isAr ? 'خدمات ذات صلة بهذا الدليل' : 'Related Clinical Services'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedServices.map(s => (
              <div key={s.id} className="p-5 rounded-2xl bg-white border border-[#E0EBE7] flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#193A39]">{s.title}</h4>
                  <p className="text-xs text-[#557874] line-clamp-1">{s.summary}</p>
                </div>
                <Link
                  href={`/${locale}/preview/dental/services/${s.slug}`}
                  className="text-xs font-semibold text-[#193A39] hover:text-[#2C5251] inline-flex items-center gap-1 flex-shrink-0 ml-4 rtl:ml-0 rtl:mr-4"
                >
                  <span>{isAr ? 'عرض الخدمة' : 'View'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-8 rounded-3xl bg-[#193A39] text-[#EDF5F2] space-y-4">
          <h3 className="font-serif text-2xl font-bold text-white">
            {isAr ? 'هل لديك تساؤلات فردية تود مناقشتها مع طبيبنا؟' : 'Have specific questions about your oral wellness?'}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto">
            {isAr
              ? 'احجز نافذة استشارة هادئة في أقرب فرع من فروع لومِن واستمتع بتجربة رعاية خالية من التوتر.'
              : 'Book a peaceful consultation window at your nearest Lumen studio branch.'}
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/preview/dental/request-appointment`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7AC7A5] hover:bg-[#68B794] text-[#193A39] text-xs sm:text-sm font-semibold transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>{isAr ? 'طلب موعد استشارة' : 'Request Consultation'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

