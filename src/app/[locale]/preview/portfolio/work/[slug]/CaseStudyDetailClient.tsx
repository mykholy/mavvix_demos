'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { LocalizedProject } from '@/lib/db/repositories';
import {
  Sparkles, Layers, CheckCircle2, XCircle, ArrowUpRight,
  ArrowRight, ArrowLeft, MessageSquare, Tag, Eye
} from 'lucide-react';

interface Props {
  locale: Locale;
  project: LocalizedProject;
}

export default function CaseStudyDetailClient({ locale, project }: Props) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [showAnnotations, setShowAnnotations] = useState(true);

  const images = [
    { title: isAr ? 'المخطط الهندسي للمنظومة الطباعية' : 'Typography & Spatial Grid Axis', annotation: isAr ? 'تم اعتماد قياسات خطية ترتكز على مضاعفات الرقم 8 لضبط التوازن البصري.' : 'Strict 8pt vertical baseline grid enforced for harmonious hierarchy.' },
    { title: isAr ? 'لوحة الألوان والتباين اللوني' : 'Color Contrast & Token Mapping', annotation: isAr ? 'اختبار التباين طبقاً لمعايير WCAG AAA لضمان وضوح فائق على الشاشات.' : 'WCAG AAA contrast validation applied across dark and light surfaces.' },
    { title: isAr ? 'المسودة المرفوضة والمفاضلة' : 'Rejected Alternative Divergence', annotation: isAr ? 'تم استبعاد الاتجاه الحركي الصاخب لصالح البساطة الهندسية المستدامة.' : 'Rejected kinetic decorative paths in favor of durable structural simplicity.' },
    { title: isAr ? 'تطبيقات الهوية عبر الشاشات المدمجة' : 'Responsive Component Orchestration', annotation: isAr ? 'بناء مكونات مرنة تتكيف بين الهواتف وشاشات المكاتب العريضة.' : 'Multi-device fluid layouts balancing reading cadence and density.' },
    { title: isAr ? 'المخرجات النهائية وحزم التسليم' : 'Final Deliverables & Asset Specs', annotation: isAr ? 'تسليم أصول متجهة وتوثيق هندسي متكامل لفرق التطوير والإنتاج.' : 'Vector deliverables and developer tokens exported with automated CI/CD.' },
  ];

  return (
    <div className="space-y-12">
      {/* Top Metadata and Annotation Controller */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E0D8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold text-[#0F0F10] uppercase bg-[#F6F5F2] px-2.5 py-1 rounded-md border border-[#E2E0D8]">
            {project.project_type || 'Design'}
          </span>
          <span className="text-[#737068]">Year: 2025</span>
          <span className="text-[#737068]">ID: {project.slug}</span>
        </div>

        {/* Interactive Annotation Toggle */}
        <button
          onClick={() => setShowAnnotations(!showAnnotations)}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
            showAnnotations
              ? 'bg-[#0F0F10] text-[#CCFF00] font-bold shadow-sm'
              : 'bg-[#F6F5F2] text-[#737068] hover:text-[#0F0F10]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{isAr ? (showAnnotations ? 'إخفاء شروحات القرارات' : 'إظهار شروحات القرارات') : (showAnnotations ? 'Annotations: Active' : 'Annotations: Hidden')}</span>
        </button>
      </div>

      {/* Hero Visual Presentation */}
      <div className="aspect-[16/9] rounded-3xl bg-gradient-to-br from-[#ECEAE3] via-[#DDD9CE] to-[#C9C4B7] border border-[#DDD9CE] p-8 sm:p-12 flex flex-col justify-between shadow-sm relative overflow-hidden">
        <span className="font-mono text-xs uppercase tracking-widest text-[#737068]">
          Case Study Documentation
        </span>

        <div className="space-y-2 max-w-2xl">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F0F10]">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#57544C] leading-relaxed font-sans">
            {project.summary}
          </p>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-black/10 font-mono text-xs text-[#0F0F10]">
          <span>Salma Hassan Studio</span>
          <Link
            href={`/${locale}/preview/portfolio/contact?case=${project.slug}`}
            className="inline-flex items-center gap-1.5 font-bold hover:underline"
          >
            <span>{isAr ? 'طلب نطاق عمل مماثل' : 'Request Similar Scope'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Six Distinct Sections Required by Spec */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Main Editorial Case Narrative (8 cols) */}
        <div className="md:col-span-8 space-y-10 text-xs sm:text-sm text-[#57544C] leading-relaxed font-serif">
          {/* Section 1: Context & Problem */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E0D8] space-y-3 font-sans">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#737068]">
              {isAr ? '01. السياق والمشكلة' : '01. Context & Core Problem'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F0F10]">
              {isAr ? 'تحدي التموضع البصري وسط سوق مزدحم' : 'Visual Positioning in a Saturated Market'}
            </h2>
            <p className="font-serif text-[#57544C] leading-relaxed">
              {isAr
                ? 'واجه المشروع تحدياً يتمثل في وجود فجوة حادة بين الرسالة الاستراتيجية المتقدمة للعلامة وبين هويتها البصرية القديمة التي لم تعد تعكس القيمة الحقيقية للخدمة. كان الهدف إعادة صياغة اللغة البصرية بصرامة منهجية تجعل العلامة مرجعاً في قطاعها.'
                : 'The client faced an acute divergence between their sophisticated market positioning and legacy visual assets. The mandate required establishing an uncompromising brand architecture capable of commanding instant respect across both regional and international enterprise audiences.'}
            </p>
          </section>

          {/* Section 2: Constraints & Tensions */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E0D8] space-y-3 font-sans">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#737068]">
              {isAr ? '02. القيود والتحديات التقنية' : '02. Constraints & Structural Tensions'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F0F10]">
              {isAr ? 'معايير التطبيق ثنائي اللغة وسرعة الأداء' : 'Bilingual Typography & Latency Ceilings'}
            </h2>
            <p className="font-serif text-[#57544C] leading-relaxed">
              {isAr
                ? 'من أهم القيود ضرورة التوافق الكامل بين الحروف اللاتينية والخط العربي المعاصر مع الحفاظ على ذات الوزن البصري والارتفاع الأفقي. كما تطلب النظام الرقمي الالتزام بمعايير أداء فائقة لا تتجاوز 100 كيلوبايت لجميع خطوط الويب.'
                : 'Key constraints included zero compromise between Latin and contemporary Arabic font geometry, guaranteeing visual parity without typographic distortion. Digital assets had to honor strict sub-100kb payload ceilings to maintain instantaneous page loads.'}
            </p>
          </section>

          {/* Section 3: Research & Explorations */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E0D8] space-y-3 font-sans">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#737068]">
              {isAr ? '03. البحث والاستكشاف المنهجي' : '03. Research & Directional Prototyping'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F0F10]">
              {isAr ? 'استكشاف نماذج الشبكات التيبوغرافية' : 'Exploring Editorial Space & Tension'}
            </h2>
            <p className="font-serif text-[#57544C] leading-relaxed">
              {isAr
                ? 'قمنا بتحليل أكثر من 40 مرجعاً بصرياً في العمارة الكلاسيكية والمدارس السويسرية، مع اختبار نماذج شبكية متعددة لتحديد كثافة المعلومات المثلى التي تمنح القارئ شعوراً بالراحة دون إهدار للمساحات.'
                : 'We scrutinized over 40 archival references from mid-century Swiss editorial design and modernist architecture, iterating modular grids to uncover the optimal typographic tension between generous negative space and informational density.'}
            </p>
          </section>

          {/* Section 4: Rejected Alternative (Tradeoffs) */}
          <section className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-8 border border-[#E2E0D8] space-y-3 font-sans">
            <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] uppercase tracking-widest">
              <XCircle className="w-3.5 h-3.5" />
              <span>{isAr ? '04. المسار المرفوض ومبررات الاستبعاد' : '04. Rejected Direction & Decision Tradeoffs'}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F0F10]">
              {isAr ? 'استبعاد الاتجاه التعبيري عالي الحركة' : 'The Expressive Kinetic Alternative (Discarded)'}
            </h2>
            <p className="font-serif text-[#57544C] leading-relaxed">
              {isAr
                ? 'تم اقتراح اتجاه بصري أولي يعتمد على الحركات الديناميكية ثلاثية الأبعاد والتدرجات اللونية المعقدة. رغم جاذبيته السطحية، قمنا باستبعاده بوضوح لأنه كان سيشتت انتباه صناع القرار عن المضمون الجوهري ويتسبب ببطء ملحوظ في الأجهزة المحمولة.'
                : 'An early conceptual vector prioritized heavy 3D kinetic transitions and high-saturation gradient meshes. While visually striking, it was formally rejected because it diluted corporate clarity, increased cognitive friction for decision-makers, and introduced significant mobile render overhead.'}
            </p>
          </section>

          {/* Section 5: Chosen Direction Rationale */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0F0F10] space-y-3 font-sans shadow-md">
            <div className="flex items-center gap-2 text-[#2C5251] font-mono text-[10px] uppercase tracking-widest">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F0F10]" />
              <span>{isAr ? '05. مبررات الاتجاه النهائي المعتمد' : '05. Chosen Direction Rationale'}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F0F10]">
              {isAr ? 'النقاء الطباعي والشبكة المعيارية الصارمة' : 'Typographic Purity & Monolithic Grid'}
            </h2>
            <p className="font-serif text-[#57544C] leading-relaxed">
              {isAr
                ? 'اعتمدنا حلاً يرتكز على قوة التيبوغرافيا وتباين الخطوط العريضة مع هوامش تنفس واسعة، مع استخدام لمسات لونية حمضية محددة بدقة لتوجيه الانتباه. هذا الاتجاه أثبت قدرته على الصمود لسنوات دون أن يفقد بريقه أو يتأثر بالموضات العابرة.'
                : 'The approved framework centers on stark typographic authority, monolithic contrasting weights, and expansive quiet margins punctuated by disciplined electric accent tokens. This creates an unyielding visual presence designed to endure for decades without succumbing to transient design trends.'}
            </p>
          </section>

          {/* Section 6: Process Assets & Annotated Gallery */}
          <section className="space-y-6 pt-4 font-sans">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#737068]">
                {isAr ? '06. معرض الأصول والشروحات (5 أصول)' : '06. Asset Progression & Annotations (5)'}
              </span>
            </div>

            <div className="space-y-6">
              {images.map((img, idx) => (
                <div key={idx} className="bg-white rounded-3xl border border-[#E2E0D8] overflow-hidden shadow-sm">
                  <div className="aspect-[16/9] bg-gradient-to-br from-[#EDEBE4] to-[#DDD9CE] p-8 flex flex-col justify-between">
                    <span className="font-mono text-[11px] text-[#737068]">Asset #{idx + 1}</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#0F0F10]">
                      {img.title}
                    </span>
                  </div>

                  {showAnnotations && (
                    <div className="p-4 bg-[#0F0F10] text-[#CCFF00] font-mono text-xs flex items-start gap-2.5">
                      <span className="font-bold">NOTE:</span>
                      <p className="text-white/90 font-sans text-xs">{img.annotation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Deliverables Inventory & Scope CTA (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E2E0D8] space-y-6 shadow-sm sticky top-28">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#737068]">
                {isAr ? 'قائمة المخرجات النهائية' : 'Deliverables Inventory'}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0F0F10]">
                {isAr ? 'حزم التسليم المعتمدة' : 'Verified Deliverables'}
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs text-[#57544C] font-mono border-t border-[#F0EFEA] pt-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F0F10] flex-shrink-0 mt-0.5" />
                <span>{isAr ? 'ملفات الشعار والرموز المتجهة' : 'Master Vector Mark Kit (.SVG / .EPS)'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F0F10] flex-shrink-0 mt-0.5" />
                <span>{isAr ? 'دليل المعايير البصرية (120 صفحة)' : '120-page Brand Architecture Book'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F0F10] flex-shrink-0 mt-0.5" />
                <span>{isAr ? 'مكتبة مكونات Figma الذكية' : 'Figma Component Tokens & Variants'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F0F10] flex-shrink-0 mt-0.5" />
                <span>{isAr ? 'تجهيز قوالب المطبوعات والتشطيبات' : 'Print & Packaging Production Dielines'}</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-[#F0EFEA] space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#0F0F10]">
                {isAr ? 'هل تريد نطاق عمل مماثلاً لمشروعك؟' : 'Commission a Similar Engagement?'}
              </h4>
              <p className="text-xs text-[#737068] leading-relaxed font-sans">
                {isAr
                  ? 'يمكنك بدء محادثة استكشافية وتحديد المخرجات والجدول الزمني المناسب.'
                  : 'Submit a qualified project brief preselected with this case’s scope parameters.'}
              </p>
              <Link
                href={`/${locale}/preview/portfolio/contact?case=${project.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F0F10] hover:bg-[#262629] text-[#CCFF00] font-mono text-xs font-bold transition-colors shadow"
              >
                <span>{isAr ? 'بدء موجز المشروع' : 'Initiate Project Brief'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

