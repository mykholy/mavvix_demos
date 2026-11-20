import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { Sparkles, ArrowUpRight, ArrowRight, ArrowLeft, Layers, PenTool, CheckCircle2, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'About the Studio & Philosophy | Salma Hassan',
  description: 'Design ethos, creative methodology, and tools shaping Salma Hassan Studio’s independent practice.'
};

export default function PortfolioAboutPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const tools = [
    { cat: 'Design & Tokens', items: ['Figma Master Architecture', 'Glyphs 3 (Custom Typography)', 'Adobe Creative Cloud', 'Linear & Notion'] },
    { cat: 'Engineering Bridge', items: ['Next.js & React', 'Tailwind CSS & Tokens', 'TypeScript & Zod', 'Git & GitHub Actions'] },
    { cat: 'Physical Proofing', items: ['Epson Pro Color Proofing', 'Pantone Formula Guides', 'Fedrigoni & Gmund Paper Archives'] }
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#737068]">
            {isAr ? 'عن الاستوديو والمنهجية' : 'Practice Profile & Ethos'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F10] leading-tight">
            {isAr ? 'التصميم ليس مجرد زينة، بل هو قرار هيكلي واضح' : 'Design as Structural Decision, Not Mere Decoration'}
          </h1>
          <p className="text-base sm:text-lg text-[#57544C] leading-relaxed">
            {isAr
              ? 'تأسست ممارسة سلمى حسن كاستوديو تصميم مستقل يؤمن بأن قوة العلامة التجارية تكمن في وضوح أفكارها وتجردها من الزخرفة الزائفة.'
              : 'Salma Hassan Studio operates as an autonomous design consultancy grounded in the conviction that authoritative brand presence stems from conceptual clarity and disciplined reduction.'}
          </p>
        </div>

        {/* Fictional Concept Disclaimer */}
        <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#F4E3C8] text-[#7A4B1A] text-xs flex items-start gap-3 font-mono">
          <ShieldAlert className="w-5 h-5 text-[#C97825] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-[#945617]">
              {isAr ? 'إشعار الشفافية والنموذج التجريبي' : 'Fictional Illustrative Practice Disclaimer'}
            </h4>
            <p className="leading-relaxed font-sans">
              {isAr
                ? 'استوديو سلمى حسن هو شخصية وممارسة تمثيلية صممتها شركة مافيكس لعرض قدرات المنصة البرمجية في بناء مواقع المحافظ الإبداعية الراقية. لا يدعي هذا الموقع أي ألقاب أو اعتمادات شخصية فعلية.'
                : 'Salma Hassan Studio is an illustrative concept persona engineered for the Mavvix commercial platform kit. No actual personal practicing licensure or unverified client relationships are asserted.'}
            </p>
          </div>
        </div>

        {/* Studio Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E0D8] space-y-3 shadow-sm">
            <span className="font-mono text-xs text-[#737068] uppercase tracking-widest">Principle 01</span>
            <h3 className="font-serif text-xl font-bold text-[#0F0F10]">
              {isAr ? 'التيبوغرافيا كأساس معماري' : 'Typography as Structural Architecture'}
            </h3>
            <p className="text-xs sm:text-sm text-[#57544C] leading-relaxed">
              {isAr
                ? 'الخط ليس مجرد وعاء للكلمات، بل هو العنصر الذي يحدد نبرة الحديث، وسرعة القراءة، ومصداقية العلامة في أذهان الناس.'
                : 'Typography is not merely a vehicle for text—it dictates pacing, vocal authority, and institutional credibility across every scale.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E0D8] space-y-3 shadow-sm">
            <span className="font-mono text-xs text-[#737068] uppercase tracking-widest">Principle 02</span>
            <h3 className="font-serif text-xl font-bold text-[#0F0F10]">
              {isAr ? 'احترام القيود التقنية' : 'Strict Technical Rigor'}
            </h3>
            <p className="text-xs sm:text-sm text-[#57544C] leading-relaxed">
              {isAr
                ? 'لا نصمم أعمالاً حبيسة برامج الرسم؛ بل نصمم أصولاً تتكامل فورياً مع كود البرمجة وأنظمة الرموز وقواعد الأداء الرقمي.'
                : 'We refuse to create designs stranded in vector canvases. Our assets are engineered for direct translation into tokens, code, and responsive reality.'}
            </p>
          </div>
        </div>

        {/* Tools and Stack */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E0D8] space-y-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#0F0F10]">
            {isAr ? 'أدوات الاستوديو والبيئة الهندسية' : 'Studio Tooling & Environmental Infrastructure'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            {tools.map((t, idx) => (
              <div key={idx} className="space-y-2">
                <span className="font-bold text-[#0F0F10] uppercase text-[11px] block pb-1 border-b border-[#F0EFEA]">
                  {t.cat}
                </span>
                <ul className="space-y-1.5 text-[#57544C]">
                  {t.items.map((it, i) => (
                    <li key={i}>• {it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-3xl bg-[#0F0F10] text-[#E5E3DD] space-y-4">
          <h3 className="font-serif text-2xl font-bold text-white">
            {isAr ? 'هل لديك مشروع يطلب هذا المستوى من الصرامة؟' : 'Have a Project Requiring this Depth of Rigor?'}
          </h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto font-sans">
            {isAr
              ? 'نقبل عدداً محدوداً من المشاريع سنوياً لضمان التركيز الكامل على كل التفاصيل.'
              : 'We accept a strictly capped number of client commissions annually to ensure uncompromised partner immersion.'}
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/preview/portfolio/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#CCFF00] hover:bg-[#B8E600] text-[#0F0F10] font-mono text-xs font-bold transition-colors"
            >
              <span>{isAr ? 'بدء موجز المشروع' : 'Initiate Project Brief'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

