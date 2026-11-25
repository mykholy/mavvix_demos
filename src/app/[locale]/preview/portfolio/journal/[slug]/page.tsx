import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getEditorialPostBySlug, getProjects, getPortfolioServices } from '@/lib/db/repositories';
import { ArrowUpRight, ArrowRight, ArrowLeft, Clock, BookOpen, Sparkles } from 'lucide-react';

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

  const post = getEditorialPostBySlug('portfolio', slug, locale);
  if (!post) return { title: 'Essay Not Found' };
  return {
    title: `${post.title} | Salma Hassan Essay`,
    description: post.summary
  };
}

export default async function PortfolioEssayDetailPage(
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

  const post = getEditorialPostBySlug('portfolio', slug, locale);
  if (!post) {
    notFound();
  }

  const allProjects = getProjects('portfolio', locale);
  const relevantCase = allProjects[0];
  const allServices = getPortfolioServices(locale);
  const relevantService = allServices[0];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#737068]">
          <Link href={`/${locale}/preview/portfolio`} className="hover:text-[#0F0F10]">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/preview/portfolio/journal`} className="hover:text-[#0F0F10]">
            {isAr ? 'المقالات' : 'Essays'}
          </Link>
          <span>/</span>
          <span className="text-[#0F0F10] font-bold truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* Article Header */}
        <div className="space-y-4 pb-8 border-b border-[#E2E0D8]">
          <div className="flex items-center gap-3 font-mono text-xs text-[#737068]">
            <span className="uppercase text-[#57544C] bg-[#F6F5F2] px-2.5 py-0.5 rounded-full border border-[#E2E0D8]">
              {post.category || 'Monologue'}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>4 min read</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F0F10] leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#57544C] leading-relaxed font-sans">
            {post.summary}
          </p>
        </div>

        {/* Editorial Body (300+ words) */}
        <div className="space-y-8 text-sm sm:text-base text-[#3B3934] leading-relaxed font-serif">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#0F0F10] font-sans">
              {isAr ? '1. فخ الزخرفة وغياب الرؤية الهيكلية' : '1. The Decorative Trap in Contemporary Branding'}
            </h2>
            <p>
              {isAr
                ? 'تشهد الممارسات التصميمية المعاصرة إفراطاً مقلقاً في الاعتماد على المؤثرات البصرية اللحظية والرسوم الحركية المعقدة دون وجود أساس فكري رصين. عندما تفقد الهوية مبرر وجودها المنطقي، تصبح مجرد قناع سطحي سرعان ما يتقادم وتنكشف هشاشته مع أول اختبار لنمو المؤسسة أو دخولها أسواقاً جديدة.'
                : 'Contemporary design discourse suffers from a pervasive fascination with ephemeral visual ornamentation—fleeting micro-animations and aesthetic gloss masquerading as brand substance. When an identity lacks foundational structural logic, it functions as a brittle facade that disintegrates under the stress of institutional growth.'}
            </p>
            <p>
              {isAr
                ? 'إن قوة الهوية لا تقاس بكمية الأشكال المرسومة فيها، بل بقدرتها على الاختزال وإيصال الرسالة بأقل عدد ممكن من العناصر. البساطة الصارمة ليست عجزاً، بل هي أعلى درجات النضج المعرفي في مهنة التصميم.'
                : 'True visual durability is never quantified by decorative abundance, but by the relentless discipline of communicative reduction. Radical aesthetic restraint represents not an imaginative vacuum, but the pinnacle of structural maturity.'}
            </p>
          </section>

          <section className="p-6 rounded-3xl bg-white border border-[#E2E0D8] font-sans space-y-3 shadow-sm">
            <h3 className="font-serif text-base font-bold text-[#0F0F10] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0F0F10]" />
              <span>{isAr ? 'أعمدة الصمود البصري' : 'Tenets of Visual Longevity'}</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#57544C] leading-relaxed font-mono">
              <li>• <strong>Hierarchical Dominance:</strong> {isAr ? 'سيادة الكتلة الطباعية على العناصر الثانوية.' : 'Typography commanding uncompromised spatial primacy.'}</li>
              <li>• <strong>Systemic Interoperability:</strong> {isAr ? 'مرونة النظام عبر مختلف الشاشات والأوراق المادية.' : 'Tokens translating identically from print dielines to responsive CSS.'}</li>
              <li>• <strong>Cognitive Restraint:</strong> {isAr ? 'تقليل التشتت البصري لخدمة الفكرة المركزية.' : 'Elimination of sensory noise in favor of intentional focus.'}</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#0F0F10] font-sans">
              {isAr ? '2. نحو لغة عربية معاصرة غير مقيدة بالماضي' : '2. Contemporary Arabic Typography Unchained from Nostalgia'}
            </h2>
            <p>
              {isAr
                ? 'لقد عانى الخط العربي في العالم الرقمي لسنوات طويلة من وضعه في قالب تاريخي تراثي حصر استخدامه، أو تشويهه ليتطابق قسراً مع الحروف اللاتينية. تكمن مهمتنا في ابتكار معالجات تيبوغرافية عربية تحتفظ بروح الخط الأصيلة وقواعد توازنه الهندسي، بينما تتحرك بحرية في الفضاءات الرقمية الحديثة.'
                : 'Digital Arabic typography has long oscillated between nostalgic historicism and clumsy forced alignment with Western proportions. Our studio practice seeks an authoritative contemporary vernacular that honors the mathematical elegance of classic calligraphic balance while commanding modern digital surfaces with unhesitating confidence.'}
            </p>
          </section>
        </div>

        {/* Semantic Link to Relevant Case and Service (Journey 2 Oracle) */}
        <div className="pt-8 border-t border-[#E2E0D8] grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {relevantCase && (
            <div className="p-6 rounded-3xl bg-white border border-[#E2E0D8] space-y-2">
              <span className="text-[#737068] uppercase text-[10px]">{isAr ? 'دراسة حالة مرتبطة بالفكرة:' : 'Related Case Study:'}</span>
              <h4 className="font-serif text-base font-bold text-[#0F0F10]">{relevantCase.title}</h4>
              <p className="text-[#57544C] font-sans text-xs line-clamp-2">{relevantCase.summary}</p>
              <div className="pt-2">
                <Link
                  href={`/${locale}/preview/portfolio/work/${relevantCase.slug}`}
                  className="font-bold text-[#0F0F10] hover:underline inline-flex items-center gap-1"
                >
                  <span>{isAr ? 'عرض دراسة الحالة' : 'Inspect Case Study'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {relevantService && (
            <div className="p-6 rounded-3xl bg-white border border-[#E2E0D8] space-y-2">
              <span className="text-[#737068] uppercase text-[10px]">{isAr ? 'الخدمة الاستشارية المقابلة:' : 'Linked Engagement Model:'}</span>
              <h4 className="font-serif text-base font-bold text-[#0F0F10]">{relevantService.name}</h4>
              <p className="text-[#57544C] font-sans text-xs line-clamp-2">{relevantService.headline}</p>
              <div className="pt-2">
                <Link
                  href={`/${locale}/preview/portfolio/services/${relevantService.slug}`}
                  className="font-bold text-[#0F0F10] hover:underline inline-flex items-center gap-1"
                >
                  <span>{isAr ? 'تفاصيل الخدمة' : 'View Service Model'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

