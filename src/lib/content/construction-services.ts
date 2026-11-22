import { Building2, Ruler, Layers, FileCheck2 } from 'lucide-react';

export const servicesData = [
  {
    slug: 'fit-out',
    title: { ar: 'تجهيزات وتشطيبات المقرات الإدارية الفاخرة', en: 'Commercial Fit-Out & Turnkey Interiors' },
    desc: {
      ar: 'تنفيذ أعمال التشطيب الداخلي للمباني والمكاتب والشركات وفق أحدث معايير العزل الصوتي والشبكات الذكية والتأثيث المتكامل.',
      en: 'High-end interior contracting for corporate headquarters, acoustic partitioning, HVAC distribution, and turnkey furnishings.'
    },
    inclusions: {
      ar: ['القواطع الزجاجية والعزل الصوتي', 'شبكات التيار الخفيف والداتا', 'التكييف المركزي والمخفي', 'الأرضيات الرخامية والـ HDF'],
      en: ['Acoustic glass partitioning', 'Low-current structured cabling', 'Ducted & VRF HVAC integration', 'Engineered flooring & terrazzo']
    },
    exclusions: {
      ar: ['الرخص الإنشائية العامة للمبنى', 'الأجهزة المكتبية الإلكترونية الشخصية'],
      en: ['Core shell architectural permits', 'Personal office computing equipment']
    },
    icon: Building2
  },
  {
    slug: 'structural',
    title: { ar: 'التنفيذ الإنشائي وأعمال الخرسانات المتطورة', en: 'Civil Engineering & Structural Superstructure' },
    desc: {
      ar: 'تنفيذ الأعمال الترابية، الأساسات العميقة، والهياكل الخرسانية المسلحة والجمالونات المعدنية للمنشآت الكبرى.',
      en: 'Deep piling, reinforced concrete structural frames, post-tension slabs, and heavy steel truss execution.'
    },
    inclusions: {
      ar: ['الحفر ونزح المياه وتدعيم الجوانب', 'الأساسات والهيكل الخرساني الكامل', 'اختبارات ضبط الجودة وكسر المكعبات', 'العزل المائي للأساسات'],
      en: ['Excavation, dewatering & shoring', 'Full reinforced superstructure', 'Independent cube compression tests', 'Sub-grade waterproofing membrane']
    },
    exclusions: {
      ar: ['الديكورات المعمارية النهائية', 'تجهيزات الفرش الداخلي'],
      en: ['Interior decorative fit-out', 'Furniture & interior fixtures']
    },
    icon: Ruler
  },
  {
    slug: 'mep',
    title: { ar: 'الأعمال الكهروميكانيكية وشبكات الحريق (MEP)', en: 'MEP Infrastructure & Fire Protection' },
    desc: {
      ar: 'تصميم وتنفيذ شبكات مكافحة الحريق، إنذار الدخان، محطات الجهد المتوسط، وأنظمة إدارة المباني الذكية (BMS).',
      en: 'Complete installation of NFPA-compliant fire suppression, MV/LV electrical substations, and BMS automation.'
    },
    inclusions: {
      ar: ['شبكات الرشاشات ومضخات الحريق المعتمدة', 'لوحات التوزيع وكابلات الجهد المتوسط', 'أنظمة BMS والتحكم المركزي', 'اختبارات التشغيل والتوازن'],
      en: ['Certified sprinkler & pump networks', 'Medium/low voltage panels & risers', 'Centralized BMS automated controls', 'Air balancing & commissioning reports']
    },
    exclusions: {
      ar: ['رسوم مقايسات شركة الكهرباء الحكومية'],
      en: ['Municipal grid connection tariffs']
    },
    icon: Layers
  },
  {
    slug: 'value-engineering',
    title: { ar: 'الهندسة القيمية وتدقيق جداول الكميات (BOQ)', en: 'Value Engineering & BOQ Auditing' },
    desc: {
      ar: 'مراجعة المخططات الهندسية لتقليل تكاليف المواد والمصنعيات بنسبة تصل إلى 20% دون التأثير على معايير الأمان والسلامة.',
      en: 'Detailed technical audit of architectural specs and bills of quantities to eliminate redundant cost and material waste.'
    },
    inclusions: {
      ar: ['تدقيق جداول الكميات والأسعار المرجعية', 'اقتراح بدائل معتمدة مطابقة للمواصفات', 'إعادة تصميم الفراغات لتحسين استهلاك الطاقة'],
      en: ['Comprehensive BOQ rate audits', 'Pre-qualified equivalent material options', 'Spatial re-engineering for energy efficiency']
    },
    exclusions: {
      ar: ['إعادة استخراج رخص البناء الرسمية'],
      en: ['Re-submission of statutory city permits']
    },
    icon: FileCheck2
  }
];
