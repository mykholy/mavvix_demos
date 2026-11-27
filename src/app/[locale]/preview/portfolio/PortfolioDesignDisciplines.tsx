'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/i18n/config';
import { Layers, Compass, PenTool, BookOpen, ArrowUpRight, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { salmaStudioPhotos, SalmaStudioPhoto } from './media';

interface DisciplineData {
  id: string;
  nameEn: string;
  nameAr: string;
  subtitleEn: string;
  subtitleAr: string;
  imageId: SalmaStudioPhoto['id'];
  icon: typeof PenTool;
  thesisEn: string;
  thesisAr: string;
  deliverablesEn: string[];
  deliverablesAr: string[];
  rationaleEn: string;
  rationaleAr: string;
}

const DISCIPLINES: DisciplineData[] = [
  {
    id: 'typography',
    nameEn: 'Dual-Script Typographic Rigor',
    nameAr: 'صرامة الصياغة الطباعية ثنائية اللغة',
    subtitleEn: 'Arabic Naskh/Kufic proportionality calibrated with Swiss Grotesk metrics',
    subtitleAr: 'معايرة نسب النسخ والكوفي المعاصر مع مقاييس الجروتسك السويسرية الرصينة',
    imageId: 'leadtype',
    icon: PenTool,
    thesisEn: 'We treat Arabic and Latin typography not as translations of each other, but as two distinct voices speaking in perfect visual parity. Baseline alignment, x-height balance, and optical weight distribution are calibrated down to individual stroke terminals.',
    thesisAr: 'نتعامل مع الحرف العربي واللاتيني ليس كترجمة ميكانيكية، بل كصوتين مستقلين يتحاوران بتوازن بصري مطلق. نحرص على محاذاة خط الأساس، توازن ارتفاع الحروف، والوزن البصري لنهايات الأحرف بدقة رياضية.',
    deliverablesEn: [
      'Custom Arabic/Latin typographic pairing hierarchy',
      'Optical kerning tables and OpenType feature spec',
      'Arabic calligraphic ligature rules & numeral systems',
      'Responsive web font subsetting (WOFF2 < 45KB)'
    ],
    deliverablesAr: [
      'هيكلية تدرج طباعي متناغمة للعربية والإنجليزية',
      'جداول التقنين البصري ومواصفات ميزات OpenType',
      'قواعد التركيبات الخطية والأرقام المتسقة',
      'تجزئة الخطوط الرقمية للويب بحجم خفيف جداً'
    ],
    rationaleEn: 'A brand identity in the Middle East must resonate with authentic cultural heritage while competing effortlessly on the global stage.',
    rationaleAr: 'الهوية البصرية في المنطقة العربية يجب أن تعكس أصالة ثقافية عميقة وتنافس في الوقت ذاته أرقى المعايير العالمية.'
  },
  {
    id: 'systems',
    nameEn: 'Modular Token Systems & Digital Architecture',
    nameAr: 'نظم الرموز المعيارية والبنية الرقمية',
    subtitleEn: 'Systematic 8pt spatial grid, semantic color tokens, and performant Next.js UI',
    subtitleAr: 'شبكة فراغية معيارية بأساس 8 بكسل، رموز ألوان دلالية، وواجهات Next.js عالية الكفاءة',
    imageId: 'blueprint',
    icon: Layers,
    thesisEn: 'Design is systematic engineering. We build resilient design systems structured from atomic design tokens in Figma that map 1:1 into TypeScript definitions, Tailwind utilities, and accessible React server components.',
    thesisAr: 'التصميم هندسة نظامية رصينة. نؤسس أنظمة تصميم قوية تبدأ من الرموز البرمجية في فيجما وترتبط مباشرة بتعريفات TypeScript وأطر العمل التفاعلية سهلة الوصول.',
    deliverablesEn: [
      'Tokens JSON pipeline synchronized to Git repository',
      'Component library with zero-layout-shift micro-interactions',
      'Automated WCAG 2.1 AA accessibility regression test suite',
      'Multi-locale directional layout system (LTR & RTL native)'
    ],
    deliverablesAr: [
      'مسار مؤتمت لرموز التصميم JSON متزامن مع جيت',
      'مكتبة مكونات تفاعلية دون أي انزياح بصري',
      'فحوصات وصول آلية مطابقة لمعايير WCAG AA',
      'نظام اتجاهي أصيل يدعم العربية والإنجليزية بمرونة'
    ],
    rationaleEn: 'Scalable brand equity requires digital interfaces that remain pristine through countless feature releases and organizational expansions.',
    rationaleAr: 'استدامة القيمة البصرية تتطلب واجهات رقمية تحافظ على نقائها ورصانتها عبر مئات التحديثات وتوسع فرق العمل.'
  },
  {
    id: 'print-craft',
    nameEn: 'Tactile Print Craft & Materiality',
    nameAr: 'حرفية المطبوعات والمادية الملموسة',
    subtitleEn: 'Cotton rag paper stocks, Heidelberg letterpress, blind embossing, and foil foils',
    subtitleAr: 'أوراق قطنية فاخرة، طباعة لتربرس عريقة، بصم حراري ونقش غائر متقن',
    imageId: 'workshop',
    icon: BookOpen,
    thesisEn: 'In an overwhelmingly ephemeral digital landscape, physical tactile artifacts carry disproportionate authority. We partner directly with artisan European and regional print houses to specify unyielding cotton stocks, bespoke cloth bindings, and precise blind debossing.',
    thesisAr: 'في عصر الرقمنة المتسارع، تمنح المطبوعات الملموسة وزناً استثنائياً للعلامة. نتعاون مع أعرق المطابع الحرفية لاختيار الأوراق القطنية المعمرة، التجليد القماشي الفاخر، والبصم البارز والغائر بدقة متناهية.',
    deliverablesEn: [
      'Technical print production dossiers & dieline drawings',
      'Paper stock curation (Fedrigoni, G.F Smith, Takeo)',
      'Foil stamping blocks, blind deboss dies & pantone specs',
      'Hardcover thread-sewn monographs and slipcases'
    ],
    deliverablesAr: [
      'ملفات الإنتاج الطباعي الفني وخطوط السكين الدقيقة',
      'انتقاء وتوثيق أرقى خامات الورق العالمية المتخصصة',
      'قوالب البصم الحراري والنقش البارز وأكواد البانتون',
      'مجلدات فاخرة مخيطة يدوياً مع أغلفة حافظة متينة'
    ],
    rationaleEn: 'A luxury or institutional brand is judged by the weight of its business card and the sound of its monograph binding opening.',
    rationaleAr: 'تُقاس العلامات الراقية والمؤسسات الكبرى بثقل بطاقاتها الملموسة وصدى فتح مجلداتها الفاخرة.'
  },
  {
    id: 'spatial',
    nameEn: 'Spatial Typography & Environmental Identity',
    nameAr: 'الخط المكاني والهوية البيئية والمعمارية',
    subtitleEn: 'Architectural wayfinding, cast bronze signage, and gallery spatial curation',
    subtitleAr: 'لوحات إرشاد معمارية، لافتات برونزية مسبوكة، وتنسيق الفراغات المتحفية',
    imageId: 'architecture',
    icon: Compass,
    thesisEn: 'We extend brand identity beyond screens and paper into three-dimensional architectural space. From monolithic building entrance signage to intuitive gallery wayfinding systems, typography becomes an integral material component of the physical environment.',
    thesisAr: 'نمد الهوية البصرية لما وراء الشاشات والورق إلى الفضاء المعماري ثلاثي الأبعاد. من لافتات المداخل الضخمة إلى أنظمة الإرشاد بالمتاحف والمعارض، يصبح الحرف مادة بنائية تتكامل مع الخرسانة والزجاج.',
    deliverablesEn: [
      'Architectural wayfinding elevation & mounting specs',
      'Material finishing guides (patinated bronze, milled steel, matte stone)',
      'Viewing distance typography scale calculations',
      'Exhibition wall typography & vinyl plotting dossiers'
    ],
    deliverablesAr: [
      'مساقط معمارية للافتات الإرشادية ومواصفات التثبيت',
      'أدلة معالجة المواد (برونز مؤكسد، فولاذ، رخام مطفي)',
      'حسابات تدرج أحجام الخط وفق مسافات الرؤية البشرية',
      'ملفات تفريغ النصوص لجدران المعارض الفنية والمنشآت'
    ],
    rationaleEn: 'Architecture and typography share the same fundamental discipline: dividing space with intentional proportion and rhythm.',
    rationaleAr: 'العمارة وفن الخط يشتركان في جوهر واحد: تقسيم الفراغ بنسب هندسية مقصودة وإيقاع بصري متزن.'
  }
];

export function PortfolioDesignDisciplines({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [activeTab, setActiveTab] = useState<string>('typography');

  const discipline = DISCIPLINES.find(d => d.id === activeTab) || DISCIPLINES[0];
  const photo = salmaStudioPhotos.find(p => p.id === discipline.imageId) || salmaStudioPhotos[0];

  return (
    <section className="bg-[#F6F5F2] rounded-[2rem] border border-[#E2E0D8] p-6 sm:p-10 lg:p-12 space-y-8" aria-labelledby="disciplines-heading">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E0D8] pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#42403B] font-bold">
            {isAr ? 'أركان الممارسة الاستشارية' : 'Methodology & Pillars'}
          </span>
          <h2 id="disciplines-heading" className="font-serif text-2xl sm:text-4xl font-bold text-[#0F0F10] mt-2">
            {isAr ? 'تكامل الحرف والرمز والمادة والفراغ' : 'Four Pillars of Design Rigor'}
          </h2>
        </div>
        <Link
          href={`/${locale}/preview/portfolio/services`}
          className="font-mono text-xs font-semibold text-[#0F0F10] hover:text-[#42403B] inline-flex items-center gap-1.5"
        >
          <span>{isAr ? 'استعراض كل الخدمات' : 'Explore All Services'}</span>
          <Arrow className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#EAE8E1] p-1.5 rounded-2xl border border-[#DDD9CE]">
        {DISCIPLINES.map(d => {
          const active = d.id === activeTab;
          const Icon = d.icon;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveTab(d.id)}
              className={`p-3 rounded-xl font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                active
                  ? 'bg-[#0F0F10] text-[#CCFF00] shadow-sm'
                  : 'text-[#57544C] hover:text-[#0F0F10] hover:bg-white/50'
              }`}
              aria-label={isAr ? d.nameAr : d.nameEn}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{isAr ? d.nameAr : d.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Active Discipline Body */}
      <div className="bg-white rounded-3xl border border-[#E2E0D8] p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Content & Thesis */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#42403B] font-bold uppercase tracking-wider block">
              {isAr ? 'المنهجية المعتمدة' : 'Operational Philosophy'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0F10]">
              {isAr ? discipline.nameAr : discipline.nameEn}
            </h3>
            <p className="font-mono text-xs text-[#0F0F10] font-medium">
              {isAr ? discipline.subtitleAr : discipline.subtitleEn}
            </p>
          </div>

          <p className="text-sm text-[#57544C] leading-relaxed font-sans">
            {isAr ? discipline.thesisAr : discipline.thesisEn}
          </p>

          <div className="p-4 rounded-2xl bg-[#F6F5F2] border border-[#E2E0D8] space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F0F10] block">
              {isAr ? 'المخرجات المعيارية الملموسة:' : 'Tangible Deliverables:'}
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#57544C] font-sans">
              {(isAr ? discipline.deliverablesAr : discipline.deliverablesEn).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F0F10] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/preview/portfolio/contact?discipline=${discipline.id}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F0F10] hover:bg-[#262629] text-white text-xs font-mono font-semibold transition-all shadow-sm"
            >
              <span>{isAr ? 'طلب استشارة في هذا المجال' : 'Commission This Discipline'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#CCFF00]" />
            </Link>
            <div className="font-mono text-xs text-[#42403B] font-semibold">
              {isAr ? 'استوديو سلمى حسن — مافيكس' : 'Salma Hassan Studio — Mavvix'}
            </div>
          </div>
        </div>

        {/* Right: Curated Photo Showcase */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E2E0D8] bg-[#EAE8E1] shadow-inner group">
            <Image
              src={photo.url}
              alt={isAr ? photo.titleAr : photo.titleEn}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 inset-x-3 text-white font-mono text-[11px] flex justify-between items-end">
              <span className="truncate max-w-[80%]">{isAr ? photo.titleAr : photo.titleEn}</span>
              <span className="text-[#CCFF00] font-bold uppercase">{photo.category}</span>
            </div>
          </div>
          <p className="text-[11px] font-mono text-[#42403B] font-semibold text-center">
            {photo.author} · {photo.license} ({photo.width}×{photo.height}px)
          </p>
        </div>
      </div>
    </section>
  );
}
