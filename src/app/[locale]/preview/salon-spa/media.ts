/**
 * Velora Beauty / Serene Sanctuary — Verified Media Module
 * All assets locally hosted, optimized WebP, with SHA-256 provenance tracking
 */

export interface SalonSpaMediaItem {
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
  category: 'nails' | 'hair' | 'interior' | 'facial' | 'spa';
  alt: {
    ar: string;
    en: string;
  };
  caption: {
    ar: string;
    en: string;
  };
}

export const SALON_SPA_MEDIA_ASSETS: SalonSpaMediaItem[] = [
  {
    id: 'editorial-manicure-treatment',
    src: '/assets/portfolio/salon-spa/editorial_manicure_treatment.webp',
    url: '/assets/portfolio/salon-spa/editorial_manicure_treatment.webp',
    width: 1800,
    height: 1200,
    format: 'webp',
    sha256: '716e55bfd5977b525747a75fd85be52e2ab33a1af28836d82b27304daa9d321f',
    author: 'Kris Atomic',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Getting_her_nails_painted_(Unsplash).jpg',
    category: 'nails',
    alt: {
      ar: 'صورة تحريرية لجلسة طلاء وعناية بالأظافر مع أدوات التجميل المتخصصة',
      en: 'Editorial nail painting and manicure treatment session with specialized beauty tools'
    },
    caption: {
      ar: 'طقوس العناية بالأظافر والطلاء الاحترافي مع استشارة الألوان والتشكيل المتناسق',
      en: 'Curated manicure and polish ritual with color consultation and precision nail contouring'
    }
  },
  {
    id: 'hair-salon-architectural-interior',
    src: '/assets/portfolio/salon-spa/hair_salon_architectural_interior.webp',
    url: '/assets/portfolio/salon-spa/hair_salon_architectural_interior.webp',
    width: 1800,
    height: 1012,
    format: 'webp',
    sha256: '53b31df32793eb99725d5cd11d62bdf6f506ca882a09cf597d261d2c468149d8',
    author: 'Daderot',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hair_salon_-_Arlington,_MA.jpg',
    category: 'interior',
    alt: {
      ar: 'تصميم داخلي راقٍ لصالة التصفيف ومحطات العناية بالشعر المجهزة بالكامل',
      en: 'Refined hair salon interior architecture and fully equipped styling stations'
    },
    caption: {
      ar: 'أجواء صالون مريحة وهندسة معمارية مصممة للخصوصية والراحة والهدوء التام',
      en: 'Atmospheric salon architecture designed for privacy, personal tranquility, and spacious comfort'
    }
  },
  {
    id: 'precision-haircut-styling',
    src: '/assets/portfolio/salon-spa/precision_haircut_styling.webp',
    url: '/assets/portfolio/salon-spa/precision_haircut_styling.webp',
    width: 1800,
    height: 1136,
    format: 'webp',
    sha256: 'f3cbe06b791fcee2208b91e4090fe812eb9d01011bbd9c10d7ae743987171231',
    author: 'Wilfredor',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hairdresser_cutting_hair.jpg',
    category: 'hair',
    alt: {
      ar: 'جلسة تصفيف وقص شعر احترافية بدقة حرفية عالية',
      en: 'Professional precision haircutting and artistic hair styling session'
    },
    caption: {
      ar: 'قص وتشكيل هندسي للشعر يراعي كثافة الخصلات ونمط النمو والحياة اليومية',
      en: 'Precision cutting and shaping tailored to hair density, texture, and everyday lifestyle'
    }
  },
  {
    id: 'botanical-facial-skincare-suite',
    src: '/assets/portfolio/salon-spa/botanical_facial_skincare_suite.webp',
    url: '/assets/portfolio/salon-spa/botanical_facial_skincare_suite.webp',
    width: 1800,
    height: 1200,
    format: 'webp',
    sha256: '73eaa144745650cd9141e4436a3cc586b2367b4009dc123e94fbf37f2c9557b2',
    author: 'Keyfwellness',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:SPA_SKIN_CARE.jpg',
    category: 'facial',
    alt: {
      ar: 'جناح العناية بالبشرة والطقوس النباتية المتكاملة في المنتجع الصحي',
      en: 'Botanical facial skincare suite and holistic wellness rituals'
    },
    caption: {
      ar: 'جلسات تنظيف وترطيب نباتية للبشرة تمنح الإشراق والنضارة الطبيعية دون ادعاءات طبية',
      en: 'Botanical hydration and radiance facial rituals emphasizing gentle, non-medical skin wellness'
    }
  },
  {
    id: 'spa-botanical-massage-stones',
    src: '/assets/portfolio/salon-spa/spa_botanical_massage_stones.webp',
    url: '/assets/portfolio/salon-spa/spa_botanical_massage_stones.webp',
    width: 1024,
    height: 685,
    format: 'webp',
    sha256: '04e1a1e90e039fe9eed5697a45c23aea6c81e0c48731fdd134c80527ee715d07',
    author: 'Daniela',
    license: 'CC-BY-2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hot_Stone_Massage_at_Witches_Falls_Cottages.jpg',
    category: 'spa',
    alt: {
      ar: 'جلسة تدليك استرخائي بالأحجار البركانية الدافئة والزيوت العطرية',
      en: 'Hot basalt stone therapeutic massage session with aromatic botanical oils'
    },
    caption: {
      ar: 'استرخاء عضلي عميق باستخدام أحجار البازلت الدافئة لتحسين الراحة وتجديد الطاقة',
      en: 'Deep sensory relaxation utilizing warmed volcanic stones and calming aromatic balms'
    }
  },
  {
    id: 'artisan-nail-lacquer-atelier',
    src: '/assets/portfolio/salon-spa/artisan_nail_lacquer_atelier.webp',
    url: '/assets/portfolio/salon-spa/artisan_nail_lacquer_atelier.webp',
    width: 1800,
    height: 1198,
    format: 'webp',
    sha256: '86c4badaa47c5657d3c0d395afb35455830dc11e87c944ff0f37960bbd2c847e',
    author: 'PattayaPatrol',
    license: 'CC-BY-SA-4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:DZ6_0587_A_nail_technician_carefully_files_a_customers_nails_at_a_salon_surrounded_by_color_samples_and_manicure_tools.jpg',
    category: 'nails',
    alt: {
      ar: 'خبيرة التجميل تقوم ببرد وتشكيل الأظافر بدقة ضمن استوديو متكامل لدرجات الألوان',
      en: 'Nail technician precision filing, shaping, and lacquer palette at manicure station'
    },
    caption: {
      ar: 'العناية المتكاملة بالأظافر وتطبيق الطلاء الدقيق مع معايير تعقيم الأدوات المعتمدة',
      en: 'Artisanal nail contouring, cuticle care, and lacquer application with sanitized instrumentation'
    }
  }
];

export function getSalonMediaByCategory(category?: string): SalonSpaMediaItem[] {
  if (!category || category === 'all') return SALON_SPA_MEDIA_ASSETS;
  return SALON_SPA_MEDIA_ASSETS.filter((item) => item.category === category);
}

export function getSalonMediaById(id: string): SalonSpaMediaItem | undefined {
  return SALON_SPA_MEDIA_ASSETS.find((item) => item.id === id);
}
