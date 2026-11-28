/**
 * ProFix Services / Fixora Care — Verified Media Module
 * All assets locally hosted, optimized WebP, with SHA-256 provenance tracking
 */

export interface HomeMaintenanceMediaItem {
  id: string;
  src: string;
  url: string;
  width: number;
  height: number;
  format: 'webp';
  sha256: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  category: 'ac' | 'plumbing' | 'electrical' | 'carpentry';
  alt: {
    ar: string;
    en: string;
  };
  caption: {
    ar: string;
    en: string;
  };
}

export const HOME_MAINTENANCE_MEDIA_ASSETS: HomeMaintenanceMediaItem[] = [
  {
    id: 'maintenance-hvac-split-indoor-unit',
    src: '/assets/portfolio/home-maintenance/hvac_split_indoor_unit.webp',
    url: '/assets/portfolio/home-maintenance/hvac_split_indoor_unit.webp',
    width: 1800,
    height: 1200,
    format: 'webp',
    sha256: '867d11fb5a6f38f8821e4db4bd9e559d318bc0a749b5036634a0d2b445ef1e30',
    author: 'Raysonho @ Open Grid Scheduler / Grid Engine',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:AirConditioner.jpg',
    category: 'ac',
    alt: {
      ar: 'وحدة تكييف هواء داخلية سبليت أثناء الفحص والتشخيص الهندسي',
      en: 'Indoor split air conditioner unit undergoing diagnostic technical assessment'
    },
    caption: {
      ar: 'فحص مسارات تدفق الهواء ونظافة الفلاتر ومبخر التبريد الداخلي',
      en: 'Evaluating indoor airflow conduits, filtration cleanliness, and evaporator heat transfer'
    }
  },
  {
    id: 'maintenance-hvac-condenser-outdoor-system',
    src: '/assets/portfolio/home-maintenance/hvac_condenser_outdoor_system.webp',
    url: '/assets/portfolio/home-maintenance/hvac_condenser_outdoor_system.webp',
    width: 1800,
    height: 1253,
    format: 'webp',
    sha256: '212d25bd83f42765cd63e9b96e82566cb0d2cfe0db88d8bbdc95dcf32cd7bfcb',
    author: 'Tony Webster',
    license: 'CC-BY-4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Carrier_Outdoor_Split_Air_Conditioner_Heat_Pump_System_(55005181522).jpg',
    category: 'ac',
    alt: {
      ar: 'وحدة تكثيف وضغط خارجية لأنظمة التكييف والحرارة المركزية',
      en: 'Outdoor condenser and compressor unit for split air conditioning and heat pump systems'
    },
    caption: {
      ar: 'مراجعة أداء ضاغط التبريد والتبادل الحراري الخارجي ومستويات الاهتزاز',
      en: 'Exterior heat dissipation, compressor performance and anti-vibration mount inspection'
    }
  },
  {
    id: 'maintenance-plumbing-manifold-pipework',
    src: '/assets/portfolio/home-maintenance/plumbing_manifold_pipework.webp',
    url: '/assets/portfolio/home-maintenance/plumbing_manifold_pipework.webp',
    width: 1600,
    height: 1200,
    format: 'webp',
    sha256: 'a4d0f9dedcdc3e0b817ddd9f6a445dcb42b83d0a1e492572c54a73008d135c9f',
    author: 'Tetris L',
    license: 'CC-BY-SA-3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Heizkreisverteiler.jpg',
    category: 'plumbing',
    alt: {
      ar: 'شبكة توزيع وصمامات سباكة متعددة الخطوط وتدفق هيدروليكي منتظم',
      en: 'Multi-circuit plumbing manifold distribution network with calibrated control valves'
    },
    caption: {
      ar: 'ضبط توازن الضغط الهيدروليكي وصمامات العزل لمنع التسريبات الداخلية',
      en: 'Calibrating hydraulic pressure equilibrium and isolation valves to eliminate concealed leaks'
    }
  },
  {
    id: 'maintenance-electrical-distribution-panel',
    src: '/assets/portfolio/home-maintenance/electrical_distribution_panel.webp',
    url: '/assets/portfolio/home-maintenance/electrical_distribution_panel.webp',
    width: 1800,
    height: 1350,
    format: 'webp',
    sha256: 'a0472f1b8394fb439c5a5398a3aaa7c95c1b4b71508d8c8a7076b64644db3175',
    author: 'FuriousYogi',
    license: 'CC-BY-SA-4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Electrical_panel_opened.jpg',
    category: 'electrical',
    alt: {
      ar: 'لوحة توزيع وقواطع كهربائية رئيسية مفتوحة للفحص الهندسي',
      en: 'Open electrical distribution panel and circuit breaker enclosure during inspection'
    },
    caption: {
      ar: 'اختبار توازن الأحمال الكهربائية وسلامة قواطع الدائرة المؤرضة ضد الالتماس',
      en: 'Testing phase load distribution and earth-leakage circuit breaker trip reliability'
    }
  },
  {
    id: 'maintenance-precision-carpentry-workshop',
    src: '/assets/portfolio/home-maintenance/precision_carpentry_workshop.webp',
    url: '/assets/portfolio/home-maintenance/precision_carpentry_workshop.webp',
    width: 1800,
    height: 1200,
    format: 'webp',
    sha256: '67987967646cf5b3befd2462cb77df01a8c1b4f308f346dae7a68fae7a00d62d',
    author: 'A S M Jobaer',
    license: 'CC-BY-SA-4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Woodworking_hand_tools_on_timber_planks_01.jpg',
    category: 'carpentry',
    alt: {
      ar: 'أدوات نجارة يدوية دقيقة ومسطرة وزوايا قياس على ألواح خشبية طبيعية',
      en: 'Precision hand carpentry tools, squares and chisels arranged on solid timber planks'
    },
    caption: {
      ar: 'معايرة استواء الأبواب وصيانة المفصلات والتركيبات الخشبية المعمارية',
      en: 'Verifying door alignment tolerances, hinge anchors and architectural joinery fittings'
    }
  },
  {
    id: 'maintenance-diagnostic-multimeter-testing',
    src: '/assets/portfolio/home-maintenance/diagnostic_multimeter_testing.webp',
    url: '/assets/portfolio/home-maintenance/diagnostic_multimeter_testing.webp',
    width: 1800,
    height: 1350,
    format: 'webp',
    sha256: '0aa6d533f3a3378e033af967d1311e405880a7efa384d1302aa039abad221a54',
    author: 'Zeroping',
    license: 'CC-BY-4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Multimeter_probes_on_breadboard.jpg',
    category: 'electrical',
    alt: {
      ar: 'مجسات جهاز ملتميتر رقمي لقياس الجهد والمقاومة الكهربائية بدقة',
      en: 'Digital multimeter diagnostic test probes measuring circuit continuity and resistance'
    },
    caption: {
      ar: 'قياس فروق الجهد والتأكد من استمرارية الدوائر الكهربائية قبل أعمال الصيانة',
      en: 'Measuring voltage drops and verifying electrical continuity prior to circuit intervention'
    }
  }
];
