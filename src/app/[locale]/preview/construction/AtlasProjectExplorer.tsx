'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { atlasPhotos } from './media';
import {
  Building2,
  Ruler,
  Layers,
  FileCheck2,
  ShieldCheck,
  Compass,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  HardHat,
  Cpu
} from 'lucide-react';

interface ProjectSpec {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  category: 'commercial' | 'residential' | 'industrial';
  areaM2: number;
  timelineMonths: number;
  concreteGrade: string;
  steelSpec: string;
  photoId: string;
  summaryAr: string;
  summaryEn: string;
  specs: {
    bua: string;
    seismic: string;
    fireRating: string;
    acoustic: string;
    leedTier: string;
  };
  milestones: { phaseAr: string; phaseEn: string; duration: string; deliverableAr: string; deliverableEn: string }[];
}

const FEATURED_PROJECTS: ProjectSpec[] = [
  {
    id: 'proj-01',
    slug: 'capital-financial-tower',
    titleAr: 'برج العاصمة المالي الإداري',
    titleEn: 'Capital Financial Corporate Tower',
    category: 'commercial',
    areaM2: 24500,
    timelineMonths: 18,
    concreteGrade: 'C50/60 Micro-Silica',
    steelSpec: 'ASTM A992 Grade 50',
    photoId: 'tower',
    summaryAr: 'تنفيذ كامل للهيكل الخرساني عالي الإجهاد وتشطيبات المقرات الإدارية ونظام الواجهات الزجاجية المزدوجة العازلة للصوت.',
    summaryEn: 'Turnkey structural concrete superstructure, double-glazed curtain wall envelope, and corporate headquarters interior fit-out.',
    specs: {
      bua: '24,500 m²',
      seismic: 'Zone 2B (UBC 97 Compliant)',
      fireRating: 'NFPA 101 (2-Hour Fire Separation)',
      acoustic: 'STC 58 (Acoustic Glass & Drywall)',
      leedTier: 'LEED Gold Targeted'
    },
    milestones: [
      { phaseAr: 'الأساسات والأعمال الترابية', phaseEn: 'Substructure & Piling', duration: '3.5 mo', deliverableAr: 'تنفيذ 180 خازوق خرساني واختبارات التحميل النواقلة', deliverableEn: '180 friction piles with verified dynamic load tests' },
      { phaseAr: 'الهيكل الخرساني المتكرر', phaseEn: 'Superstructure Concrete', duration: '7.0 mo', deliverableAr: 'صب 28 طابقاً خرسانياً بنظام الشدات المعدنية المنزلقة', deliverableEn: '28-story core and post-tensioned slabs' },
      { phaseAr: 'شبكات MEP والتكييف المركزي', phaseEn: 'Central MEP & HVAC Plants', duration: '4.5 mo', deliverableAr: 'تركيب شيلرات مياه مبردة ومحطات المحولات الكهربائية', deliverableEn: 'High-efficiency chillers and primary substations' },
      { phaseAr: 'التشطيبات والتسليم النهائي', phaseEn: 'Fit-Out & Commissioning', duration: '3.0 mo', deliverableAr: 'تشطيبات إدارية فاخرة واختبارات السلامة وضغط الهواء', deliverableEn: 'Acoustic ceilings, integrated BMS and life-safety handover' }
    ]
  },
  {
    id: 'proj-02',
    slug: 'al-nakheel-logistics-hub',
    titleAr: 'مجمع النخيل اللوجستي والصناعي',
    titleEn: 'Al-Nakheel Logistics & Industrial Park',
    category: 'industrial',
    areaM2: 38000,
    timelineMonths: 14,
    concreteGrade: 'C40 Post-Tensioned Slabs',
    steelSpec: 'High-Span PEB Portal Frames',
    photoId: 'steel',
    summaryAr: 'تصميم وتنفيذ هناجر ومستودعات التخزين المبرد والجاف بهياكل حديدية ممتدة وأرضيات صناعية ليزرية مقاومة للتآكل.',
    summaryEn: 'High-span steel portal frame logistics facility with laser-screed abrasion-resistant industrial floor slabs.',
    specs: {
      bua: '38,000 m²',
      seismic: 'Seismic Category C',
      fireRating: 'NFPA 13 (ESFR Sprinkler Certified)',
      acoustic: 'Industrial Sound Attenuation Enclosures',
      leedTier: 'EDGE Green Certified'
    },
    milestones: [
      { phaseAr: 'تسوية الموقع والأساسات المنعزلة', phaseEn: 'Civil Earthworks & Footings', duration: '2.5 mo', deliverableAr: 'تحسين خصائص التربة وصب القواعد الخرسانية المعزولة', deliverableEn: 'Soil compaction and heavy pad foundation casting' },
      { phaseAr: 'تصنيع وتركيب الهيكل المعدني', phaseEn: 'Steel Truss Erection', duration: '4.0 mo', deliverableAr: 'تركيب بحور حديدية تمتد إلى 42 متراً دون أعمدة وسيطة', deliverableEn: '42m clear-span structural trusses without central pillars' },
      { phaseAr: 'الأرضيات الصناعية الليزرية', phaseEn: 'Laser Screed Concrete Floors', duration: '3.5 mo', deliverableAr: 'صب أرضيات عالية الاستواء FF/FL معالجة بالكوارتز المقاوم', deliverableEn: 'Superflat industrial slabs treated with metallic hardeners' },
      { phaseAr: 'منظومة الإطفاء والأرصفة الهيدروليكية', phaseEn: 'Loading Docks & Fire Suppression', duration: '4.0 mo', deliverableAr: 'تركيب 32 رصيف شحن هيدروليكي وشبكة رذاذ متطورة', deliverableEn: '32 hydraulic loading docks and early-suppression fast-response sprinklers' }
    ]
  },
  {
    id: 'proj-03',
    slug: 'zenith-corporate-headquarters',
    titleAr: 'المقر الرئيسي لشركة زينيث للاستثمار',
    titleEn: 'Zenith Investment Corporate HQ',
    category: 'commercial',
    areaM2: 8600,
    timelineMonths: 9,
    concreteGrade: 'Architectural Exposed Fair-Faced',
    steelSpec: 'Structural Glazing Steel Mullions',
    photoId: 'fitout',
    summaryAr: 'تجهيز كامل للمكاتب الذكية وقاعات الاجتماعات الصوتية وغرف التحكم المركزية باستخدام مواد مستدامة وتشطيبات معمارية متقدمة.',
    summaryEn: 'Acoustically certified executive suites, boardroom audio-visual integration, and architectural fair-faced concrete detailing.',
    specs: {
      bua: '8,600 m²',
      seismic: 'IBC 2021 Compliant',
      fireRating: 'NFPA 101 Class A Interior Finishes',
      acoustic: 'NRC 0.85 Ceilings & STC 56 Partitions',
      leedTier: 'LEED Platinum Certified'
    },
    milestones: [
      { phaseAr: 'المسح الفني وهندسة المسارات', phaseEn: 'Technical Scan & Space Planning', duration: '1.5 mo', deliverableAr: 'مسح ليزري ثلاثي الأبعاد وتخطيط مسارات كابلات ومجاري الهواء', deliverableEn: '3D LiDAR scan and BIM MEP clash-detection models' },
      { phaseAr: 'الأعمال الكهروميكانيكية المتكاملة', phaseEn: 'Low-Current & MEP Execution', duration: '3.0 mo', deliverableAr: 'شبكات بيانات فئة Cat6A وتكييف مركزي متغير التدفق VRF', deliverableEn: 'Enterprise Cat6A cabling and variable-refrigerant-flow HVAC' },
      { phaseAr: 'القواطع الصوتية والتكسيات الخشبية', phaseEn: 'Acoustic Partitions & Joinery', duration: '2.5 mo', deliverableAr: 'حوائط زجاجية مزدوجة وبانوهات خشبية معالجة صوتياً', deliverableEn: 'Double-glazed demountable partitions and acoustic timber panels' },
      { phaseAr: 'المعايرة والتسليم التشغيلي', phaseEn: 'BMS Commissioning & Handover', duration: '2.0 mo', deliverableAr: 'ضبط أنظمة التحكم بالإضاءة وتسليم وثائق الصيانة الرقمية', deliverableEn: 'Automated lighting calibration and digital as-built manuals' }
    ]
  },
  {
    id: 'proj-04',
    slug: 'al-rawda-private-estate',
    titleAr: 'مجمع قصر الروضة السكني الهندسي',
    titleEn: 'Al-Rawda Private Architectural Estate',
    category: 'residential',
    areaM2: 4200,
    timelineMonths: 12,
    concreteGrade: 'C35 Sulphate-Resisting Cement',
    steelSpec: 'Thermal Break Aluminium & Steel',
    photoId: 'concrete',
    summaryAr: 'تنفيذ فيلا سكنية فاخرة بأسلوب عمارة معاصرة وحوائط خرسانية بيضاء مكشوفة مع عزل حراري ومائي متطور لأنظمة التبريد الأرضي.',
    summaryEn: 'High-end residential villa construction featuring exposed monolithic concrete facades and radiant underfloor climate control.',
    specs: {
      bua: '4,200 m²',
      seismic: 'Zone 2A Structural Design',
      fireRating: 'Civil Defense Residential Certified',
      acoustic: 'Triple-Glazed Thermal & Acoustic Glass',
      leedTier: 'Mostadam Gold Rated'
    },
    milestones: [
      { phaseAr: 'الحفر والعزل المائي للأقبية', phaseEn: 'Basement Excavation & Tanking', duration: '2.5 mo', deliverableAr: 'عزل مائي متعدد الطبقات مع نظام صرف تحت أرضي آلي', deliverableEn: 'Multi-layer bentonite waterproofing and automated sumps' },
      { phaseAr: 'الهياكل المعمارية البيضاء', phaseEn: 'Fair-Faced White Concrete', duration: '4.5 mo', deliverableAr: 'صب حوائط خرسانية بيضاء بنعومة ملمس الرخام دون لياسة', deliverableEn: 'Monolithic fair-faced white concrete without plastering' },
      { phaseAr: 'العزل الحراري والواجهات البانورامية', phaseEn: 'Thermal Envelope & Glazing', duration: '3.0 mo', deliverableAr: 'زجاج بانورامي مقسى مع فواصل حرارية مانعة للتكثف', deliverableEn: 'Structural panoramic glass with thermal break profiles' },
      { phaseAr: 'التجهيزات الميكانيكية والتشغيل', phaseEn: 'Radiant Cooling & Final Handover', duration: '2.0 mo', deliverableAr: 'نظام تبريد وتدفئة مدمج وشبكة ذكية للمراقبة والتحكم', deliverableEn: 'Integrated radiant climate loop and smart automation' }
    ]
  }
];

export function AtlasProjectExplorer({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const [activeCategory, setActiveCategory] = useState<'all' | 'commercial' | 'industrial' | 'residential'>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(FEATURED_PROJECTS[0].id);
  const [viewMode, setViewMode] = useState<'photo' | 'blueprint' | 'specs' | 'milestones'>('photo');

  const filteredProjects = activeCategory === 'all'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter((p) => p.category === activeCategory);

  const currentProject = FEATURED_PROJECTS.find((p) => p.id === selectedProjectId) || filteredProjects[0] || FEATURED_PROJECTS[0];
  const photo = atlasPhotos.find((p) => p.id === currentProject.photoId) || atlasPhotos[0];
  const blueprintPhoto = atlasPhotos.find((p) => p.id === 'blueprint') || atlasPhotos[5];

  return (
    <div className="bg-[#12181F] text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-2xl space-y-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#192027] border border-stone-700/80 rounded text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>ATLAS TECHNICAL EXPLORER // BIM & FIELD DOSSIER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isAr ? 'مستكشف المشروعات الهندسية والمواصفات التنفيذية' : 'Interactive Architectural Project Explorer'}
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {isAr
              ? 'تصفح المشروعات النموذجية مع التبديل الفوري بين صور التنفيذ الفعلي، المخططات الهندسية المعتمدة، مواصفات المواد، ومراحل الإنجاز.'
              : 'Inspect engineering project dossiers with instant toggles between site execution photography, CAD blueprints, material grades, and phase milestones.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-[#192027] p-1.5 rounded-xl border border-stone-800 shrink-0 overflow-x-auto max-w-full">
          {(['all', 'commercial', 'industrial', 'residential'] as const).map((cat) => {
            const labels = {
              all: isAr ? 'كافة المشروعات' : 'All Typologies',
              commercial: isAr ? 'إداري وتجاري' : 'Commercial',
              industrial: isAr ? 'صناعي ولوجستي' : 'Industrial',
              residential: isAr ? 'سكني فاخر' : 'Residential'
            };
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  const firstMatching = cat === 'all' ? FEATURED_PROJECTS[0] : FEATURED_PROJECTS.find((p) => p.category === cat);
                  if (firstMatching) setSelectedProjectId(firstMatching.id);
                }}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  active
                    ? 'bg-[#D97935] text-white shadow-sm'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Project Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-mono text-stone-500 font-semibold uppercase tracking-wider block mb-1">
            {isAr ? 'اختر المشروع للفحص الفني:' : 'Select Project Dossier:'}
          </span>
          {filteredProjects.map((p, idx) => {
            const isSelected = p.id === currentProject.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProjectId(p.id)}
                className={`w-full text-start p-4 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-[#192027] border-[#D97935] shadow-lg ring-1 ring-[#D97935]/30'
                    : 'bg-[#161D24]/60 border-stone-800/80 hover:bg-[#192027]/70 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono font-bold ${isSelected ? 'text-[#D97935]' : 'text-stone-500'}`}>
                    REF // 0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                    {p.areaM2.toLocaleString()} m² • {p.timelineMonths} {isAr ? 'شهر' : 'mo'}
                  </span>
                </div>
                <h3 className={`text-sm font-bold leading-snug ${isSelected ? 'text-white' : 'text-stone-300'}`}>
                  {isAr ? p.titleAr : p.titleEn}
                </h3>
                <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                  {isAr ? p.summaryAr : p.summaryEn}
                </p>
              </button>
            );
          })}

          <div className="pt-3">
            <Link
              href={`/${locale}/preview/construction/projects`}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 uppercase tracking-wider"
            >
              <span>{isAr ? 'عرض أرشيف المشروعات الكامل (12 مشروع)' : 'View Complete 12-Project Archive'}</span>
              <Arrow className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Project Display Console */}
        <div className="lg:col-span-8 bg-[#161D24] border border-stone-800 rounded-2xl overflow-hidden p-6 space-y-6">
          {/* Top Project Badge & View Toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
            <div>
              <span className="text-xs font-mono text-[#D97935] font-bold uppercase tracking-wider">
                {currentProject.category.toUpperCase()} // DOSSIER {currentProject.slug}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {isAr ? currentProject.titleAr : currentProject.titleEn}
              </h3>
            </div>

            {/* View Mode Buttons */}
            <div className="flex items-center gap-1 bg-[#12181F] p-1 rounded-xl border border-stone-800">
              <button
                type="button"
                onClick={() => setViewMode('photo')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'photo' ? 'bg-[#D97935] text-white shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
              >
                {isAr ? 'صورة التنفيذ' : 'Site Photo'}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('blueprint')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'blueprint' ? 'bg-[#D97935] text-white shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
              >
                {isAr ? 'المخطط الهندسي' : 'CAD Blueprint'}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('specs')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'specs' ? 'bg-[#D97935] text-white shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
              >
                {isAr ? 'المواصفات الفنية' : 'Tech Specs'}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('milestones')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'milestones' ? 'bg-[#D97935] text-white shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
              >
                {isAr ? 'المراحل الزمنية' : 'Milestones'}
              </button>
            </div>
          </div>

          {/* Console Content based on ViewMode */}
          {viewMode === 'photo' && (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-stone-950 h-72 sm:h-96 group">
                <img
                  src={photo.url}
                  alt={isAr ? photo.ar : photo.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 start-4 end-4 flex items-end justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                      {isAr ? 'البيانات الميدانية المعتمدة' : 'Verified Field Record'}
                    </span>
                    <p className="text-white text-sm font-semibold">
                      {isAr ? photo.ar : photo.en}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-stone-300 bg-black/60 px-2 py-1 rounded backdrop-blur border border-white/10 shrink-0">
                    License: {photo.license} • {photo.author}
                  </span>
                </div>
              </div>

              {/* Quick specs pill strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-[#12181F] p-3 rounded-lg border border-stone-800/80">
                  <span className="text-stone-400 text-[11px] block">{isAr ? 'مساحة البناء الإجمالية' : 'Gross BUA'}</span>
                  <span className="text-white font-bold font-mono">{currentProject.specs.bua}</span>
                </div>
                <div className="bg-[#12181F] p-3 rounded-lg border border-stone-800/80">
                  <span className="text-stone-400 text-[11px] block">{isAr ? 'رتبة الخرسانة' : 'Concrete Grade'}</span>
                  <span className="text-amber-400 font-bold font-mono text-xs">{currentProject.concreteGrade}</span>
                </div>
                <div className="bg-[#12181F] p-3 rounded-lg border border-stone-800/80">
                  <span className="text-stone-400 text-[11px] block">{isAr ? 'مواصفات الفولاذ' : 'Structural Steel'}</span>
                  <span className="text-white font-bold font-mono text-xs">{currentProject.steelSpec}</span>
                </div>
                <div className="bg-[#12181F] p-3 rounded-lg border border-stone-800/80">
                  <span className="text-stone-400 text-[11px] block">{isAr ? 'معيار الاستدامة' : 'Green Building'}</span>
                  <span className="text-emerald-400 font-bold font-mono text-xs">{currentProject.specs.leedTier}</span>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'blueprint' && (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-cyan-900/60 bg-[#0A1926] h-72 sm:h-96 group">
                <img
                  src={blueprintPhoto.url}
                  alt={isAr ? blueprintPhoto.ar : blueprintPhoto.en}
                  className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Blueprint grid overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />
                <div className="absolute top-4 start-4 bg-cyan-950/80 border border-cyan-700/60 px-3 py-1.5 rounded font-mono text-xs text-cyan-300">
                  CAD // ELEVATION & SCHEMATIC VIEWPORT
                </div>
                <div className="absolute bottom-4 start-4 end-4 bg-black/75 backdrop-blur-md p-3 rounded-lg border border-cyan-800/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-cyan-400 font-bold block">{isAr ? 'مخططات الإجهاد والتصميم الإنشائي' : 'Structural Elevation & Load Bearing Blueprint'}</span>
                    <span className="text-stone-300 text-[11px]">{isAr ? 'توصيف كامل لسمك البلاطات والكمرات والأعمدة وفق الكود المعتمد' : 'Complete detailing of slab spans, columns and deflection limit states'}</span>
                  </div>
                  <span className="font-mono text-cyan-300 text-[11px] bg-cyan-900/60 px-2 py-1 rounded">
                    SCALE 1:100
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                {isAr
                  ? 'يتم إصدار كافة المخططات التنفيذية التفصيلية بنظام BIM وتمريرها عبر برمجيات كشف التعارضات (Clash Detection) لتفادي أخطاء التنفيذ بالموقع.'
                  : 'All architectural and structural shop drawings are coordinated in 3D BIM with automated clash detection before on-site steel and conduit placement.'}
              </p>
            </div>
          )}

          {viewMode === 'specs' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#12181F] p-4 rounded-xl border border-stone-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Ruler className="w-4 h-4" />
                    <span>{isAr ? 'المحددات المكانية والمعمارية' : 'Spatial & Dimensional Criteria'}</span>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-stone-800 text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isAr ? 'مساحة البناء (BUA):' : 'Gross Floor Area:'}</span>
                      <span className="font-mono font-bold text-white">{currentProject.specs.bua}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isAr ? 'المدة التعاقدية:' : 'Contract Duration:'}</span>
                      <span className="font-mono font-bold text-white">{currentProject.timelineMonths} {isAr ? 'شهر' : 'Months'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isAr ? 'معيار التصنيف البيئي:' : 'Sustainability Tier:'}</span>
                      <span className="font-mono font-bold text-emerald-400">{currentProject.specs.leedTier}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#12181F] p-4 rounded-xl border border-stone-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isAr ? 'مقاومة الزلازل والسلامة الحريقية' : 'Seismic & Life-Safety Standard'}</span>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-stone-800 text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isAr ? 'المعامل الزلزالي:' : 'Seismic Zone:'}</span>
                      <span className="font-mono font-bold text-white">{currentProject.specs.seismic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isAr ? 'كود الحريق ومكافحة اللهب:' : 'Fire Life Safety:'}</span>
                      <span className="font-mono font-bold text-white">{currentProject.specs.fireRating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isAr ? 'العزل الصوتي المعتمد:' : 'Acoustic Rating:'}</span>
                      <span className="font-mono font-bold text-white">{currentProject.specs.acoustic}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#12181F] p-4 rounded-xl border border-stone-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Layers className="w-4 h-4" />
                    <span>{isAr ? 'رتبة ومواصفات الخرسانة' : 'Concrete Mix Design & Grade'}</span>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-stone-800 text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isAr ? 'قوة الكسر المعتمدة:' : 'Compressive Strength:'}</span>
                      <span className="font-mono font-bold text-white">{currentProject.concreteGrade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isAr ? 'اختبارات الموقع:' : 'Field Tests:'}</span>
                      <span className="font-mono font-bold text-white">Slump Flow & Cube 28d</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#12181F] p-4 rounded-xl border border-stone-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Building2 className="w-4 h-4" />
                    <span>{isAr ? 'مواصفات وتوريد الفولاذ الإنشائي' : 'Structural Steel Procurement'}</span>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-stone-800 text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isAr ? 'رتبة المقاطع:' : 'Section Grade:'}</span>
                      <span className="font-mono font-bold text-white">{currentProject.steelSpec}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">{isAr ? 'فحص اللحامات:' : 'Weld Quality Control:'}</span>
                      <span className="font-mono font-bold text-white">100% Ultrasonic NDT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'milestones' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {currentProject.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-[#12181F] p-4 rounded-xl border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded bg-[#D97935]/20 text-[#D97935] flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {isAr ? m.phaseAr : m.phaseEn}
                        </h4>
                        <p className="text-stone-400 text-xs mt-0.5">
                          {isAr ? m.deliverableAr : m.deliverableEn}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-amber-400 bg-stone-900 px-3 py-1 rounded border border-stone-800 shrink-0 self-start sm:self-center">
                      {m.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-400">
              <span>{isAr ? 'هل يناسب هذا النموذج متطلبات مشروعك؟' : 'Does this typology match your development scope?'}</span>
            </div>

            <Link
              href={`/${locale}/preview/construction/request-quote?ref=${currentProject.slug}&service=structural&area=${currentProject.areaM2}`}
              className="bg-[#D97935] hover:bg-[#c46828] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <span>{isAr ? 'حساب مقايسة نطاق مماثل' : 'Configure Matching Scope'}</span>
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
