export type ClearPathPhotoId =
  | 'clearpath-analyzer'
  | 'clearpath-glassware'
  | 'clearpath-microscope'
  | 'clearpath-centrifuge'
  | 'clearpath-sample-intake'
  | 'clearpath-assay-plate';

export interface ClearPathPhoto {
  id: ClearPathPhotoId;
  src: string;
  width: number;
  height: number;
  altAr: string;
  altEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  category: 'analyzer' | 'glassware' | 'microscope' | 'centrifuge' | 'accessioning' | 'assay';
  license: string;
  licenseUrl: string;
  author: string;
  sourceUrl: string;
  sha256: string;
  byteSize: number;
}

export const CLEARPATH_PHOTOS: ClearPathPhoto[] = [
  {
    id: 'clearpath-analyzer',
    src: '/assets/portfolio/diagnostics-lab/analyzer.webp',
    width: 1020,
    height: 768,
    altAr: 'محلل كيمياء حيوية سريري آلي لإجراء الفحوصات الروتينية والمتخصصة',
    altEn: 'Automated clinical chemistry and immunoassay analyzer in a diagnostic laboratory',
    titleAr: 'المحللات السريرية الآلية',
    titleEn: 'Automated Clinical Chemistry Analyzers',
    subtitleAr: 'منظومات روبوتية مغلقة تجري مئات التحاليل الكيميائية والمناعية بدقة متناهية وسرعة فائقة',
    subtitleEn: 'High-throughput closed analytical platforms delivering precise photometric and potentiometric assays',
    category: 'analyzer',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    author: 'Lazborn',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cobas_machine.jpg',
    sha256: 'cf4a9ebb9e919cc39217269453f8f59e5d29532a2958d472283a7d4146526e99',
    byteSize: 47666
  },
  {
    id: 'clearpath-glassware',
    src: '/assets/portfolio/diagnostics-lab/glassware.webp',
    width: 1600,
    height: 898,
    altAr: 'أدوات زجاجية مخبرية وكواشف كيميائية نقية لإعداد العينات والمعايرة',
    altEn: 'Volumetric laboratory glassware and sterile calibrated diagnostic reagents',
    titleAr: 'الكواشف والتحضير المعياري',
    titleEn: 'Standard Reagents & Volumetric Glassware',
    subtitleAr: 'أدوات قياس حجمية دقيقة وكواشف معتمدة دولياً لتحضير المحاليل القياسية وضبط المنحنيات',
    subtitleEn: 'Traceable grade-A volumetric glassware and analytical calibration standards ensuring test veracity',
    category: 'glassware',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    author: 'Belikov Maxim',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Laboratory_equipment.jpg',
    sha256: 'ecf9b993b2e1f3428eb8bd30e5f203921ff927eaaf85583ca6f83cb18b6474fe',
    byteSize: 136774
  },
  {
    id: 'clearpath-microscope',
    src: '/assets/portfolio/diagnostics-lab/microscope.webp',
    width: 1800,
    height: 1200,
    altAr: 'مجهر ضوئي ثنائي العينية عالي الدقة لفحص عينات الدم والأنسجة والمسحات',
    altEn: 'High-resolution optical binocular microscope for hematology and cytology smears',
    titleAr: 'الفحص المجهري وأمراض الدم',
    titleEn: 'Diagnostic Optical Microscopy',
    subtitleAr: 'فحص مجهري يدوي للتأكد من المورفولوجيا الخلوية لكرات الدم البيضاء والحمراء والصفائح',
    subtitleEn: 'Manual cellular morphological verification supporting clinical differential hematology and parasitology',
    category: 'microscope',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    author: 'International Gemini Observatory/NOIRLab/NSF/AURA/T. Slovinský',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Binocular_Microscope_at_Gemini_North_Hilo_Base_Facility_(6V7A0537-CC).jpg',
    sha256: '52f9f9eb3c8f3c311f80c0dfce54389a4f7f61796440ad53530397fda4e044e1',
    byteSize: 101346
  },
  {
    id: 'clearpath-centrifuge',
    src: '/assets/portfolio/diagnostics-lab/centrifuge.webp',
    width: 1800,
    height: 1521,
    altAr: 'جهاز طرد مركزي مبرد لفصل مصل الدم والبلازما بسرعات دقيقة مضبوطة',
    altEn: 'Benchtop laboratory centrifuge for serum and plasma specimen separation',
    titleAr: 'أجهزة الطرد المركزي وفصل المصل',
    titleEn: 'Centrifugation & Serum Separation',
    subtitleAr: 'فصل حراري مضبوط يمنع انحلال الدم ويضمن الحصول على مصل نقي للفحوصات الإنزيمية',
    subtitleEn: 'Controlled temperature-regulated centrifugation safeguarding serum specimen integrity against hemolysis',
    category: 'centrifuge',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    author: 'Unknown / Creative Commons Zero',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Laboratory_Centrifuge.jpg',
    sha256: '699e70db6341d41d1f7229cae107fe32c5695d04f3d04791d2122dd9bdd952ee',
    byteSize: 853026
  },
  {
    id: 'clearpath-sample-intake',
    src: '/assets/portfolio/diagnostics-lab/sample_intake.webp',
    width: 1800,
    height: 1198,
    altAr: 'فحص باركود أنابيب سحب الدم والتأكد من سلامة العينات وسلسلة التتبع',
    altEn: 'Biomedical specialist verifying barcoded blood collection tubes for accessioning',
    titleAr: 'استلام العينات والباركود الموحد',
    titleEn: 'Specimen Accessioning & Barcode Integrity',
    subtitleAr: 'نظام تشفير فريد لكل أنبوب يضمن مطابقة هوية العينة مع طلب التحليل وسلسلة الحيازة',
    subtitleEn: 'Positive patient sample identification and chain-of-custody barcode tracking from venipuncture to report',
    category: 'accessioning',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    author: 'US Navy / Mass Communication Specialist 3rd Class Everett Allen',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Checking_Blood_Sample_(9955279835).jpg',
    sha256: '157c120537dab6511d2e1364a5399a20afaa900e042f7088fb23000ff2668997',
    byteSize: 127120
  },
  {
    id: 'clearpath-assay-plate',
    src: '/assets/portfolio/diagnostics-lab/assay_plate.webp',
    width: 1800,
    height: 1200,
    altAr: 'لوحة معايرة ميكروية 96 عيناً لإجراء اختبارات المناعة والإنزيمات الحيوية',
    altEn: '96-well microplate utilized for high-throughput immunoassays and molecular diagnostics',
    titleAr: 'فحوصات ELISA والتشخيص المناعي',
    titleEn: 'ELISA Microplates & Serological Assays',
    subtitleAr: 'قياس كمي دقيق للأجسام المضادة ومؤشرات الالتهاب والهرمونات باستخدام تقنيات الامتصاص المناعي',
    subtitleEn: 'Enzyme-linked immunosorbent assay platforms measuring antibodies and specialized biomarkers',
    category: 'assay',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'J.N. Eskra',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:96_well_plate.jpg',
    sha256: '5c1ecde7a82eb40e8acf1297b95a286e87c2df978df7f38f67e97837836023ce',
    byteSize: 110016
  }
];
