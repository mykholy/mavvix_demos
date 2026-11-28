export interface BloomMediaAsset {
  id: string;
  local: string;
  sourcePage: string;
  author: string;
  license: string;
  licenseUrl: string;
  sha256: string;
  dimensions: string;
  bytes: number;
  alt: {
    ar: string;
    en: string;
  };
  caption: {
    ar: string;
    en: string;
  };
}

export const BLOOM_MEDIA_COLLECTION: readonly BloomMediaAsset[] = [
  {
    id: 'bloom-montessori-cube',
    local: '/assets/portfolio/nursery/montessori_cube.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Montessori_cube.jpg',
    author: 'Rakoon',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sha256: '1f56cb9d98c34c3f9a8aa0ebe0739348cab9a3b13f2729874700ee0d4d320c2f',
    dimensions: '1800x1578',
    bytes: 125092,
    alt: {
      ar: 'مكعب مونتيسوري ولعبة الألغاز الخشبية الملونة لتطوير الإدراك المكاني',
      en: 'Montessori spatial puzzle cube and colorful wooden learning apparatus'
    },
    caption: {
      ar: 'أداة تعليمية خشبية لتطوير التفكير المنطقي والإدراك الحسي الثلاثي الأبعاد',
      en: 'Tactile wooden puzzle cube fostering spatial reasoning and geometric discovery'
    }
  },
  {
    id: 'bloom-montessori-shelves',
    local: '/assets/portfolio/nursery/montessori_shelves.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Montessorishelves.jpg',
    author: 'Clematitedusud',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: '468377ad2492a6b07a44d81725eae0ba7ff6976772721299ac07c89c8edb5efe',
    dimensions: '1800x1800',
    bytes: 214722,
    alt: {
      ar: 'أرفف خشبية مفتوحة مرتبة لخامات تعليمية واستكشاف حسي مستقل',
      en: 'Organized wooden open shelving displaying sensory and educational materials'
    },
    caption: {
      ar: 'أرفف منخفضة في متناول الأطفال تشجع على حرية الاختيار وترتيب الأدوات بعد اللعب',
      en: 'Low-height accessible shelving empowering autonomous choice and tidy-up habits'
    }
  },
  {
    id: 'bloom-traditional-materials',
    local: '/assets/portfolio/nursery/traditional_materials.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Traditional_Montessori_educational_materials.jpg',
    author: 'Nixdorf',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: '1c885d9176f4ced02d1d888e6e8cad5ff0c207fce17ecdb2a57167a5b5c406c2',
    dimensions: '1800x1012',
    bytes: 127792,
    alt: {
      ar: 'خامات وأسطوانات ملونة لمطابقة الألوان والأحجام وتطوير الحواس',
      en: 'Color-coded educational cylinders and wooden tactile materials'
    },
    caption: {
      ar: 'خامات حسية تقليدية معتمدة لمطابقة التدرجات اللونية واستكشاف الأوزان والأطوال',
      en: 'Sensory chromatic cylinders designed for shade graduation and visual discrimination'
    }
  },
  {
    id: 'bloom-metal-insets-tray',
    local: '/assets/portfolio/nursery/metal_insets_tray.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Montessori_Metal_Insets_Tray.jpg',
    author: 'Syrupisbetterthanjelly',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: '10aa2c487aede03559d3393a6795d47e4b84a60936770c1448c5086d8d5452d8',
    dimensions: '1800x1344',
    bytes: 491040,
    alt: {
      ar: 'صواني الأشكال الهندسية المعدنية لتدريب الأصابع والتحضير للكتابة',
      en: 'Montessori metal geometry insets tray for pre-writing pencil grip coordination'
    },
    caption: {
      ar: 'أشكال هندسية لتمرين عضلات الأصابع الدقيقة وتنسيق حركة اليد مع العين قبل مرحلة الكتابة',
      en: 'Curved and rectilinear metal insets refining fine motor control and early pencil coordination'
    }
  },
  {
    id: 'bloom-cairo-kindergarten',
    local: '/assets/portfolio/nursery/cairo_kindergarten.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Learning_in_a_KG_Classroom-Cairo,_2019.jpg',
    author: 'Linda Herrera',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: 'b89a7124fd0e4892fead4c378c5d9c0cad266339b4e617b7f66322972178a2cd',
    dimensions: '1800x1391',
    bytes: 251452,
    alt: {
      ar: 'بيئة فصل روضة أطفال وأنشطة تعلم جماعية وتفاعل تفاعلي',
      en: 'Kindergarten classroom setting featuring early childhood peer interaction and play'
    },
    caption: {
      ar: 'أنشطة حوارية ولعب جماعي مرح يشجع التعبير الشفوي والتفاعل الاجتماعي الإيجابي',
      en: 'Early language interactions, storytelling, and collaborative peer learning moments'
    }
  },
  {
    id: 'bloom-wooden-play-blocks',
    local: '/assets/portfolio/nursery/wooden_play_blocks.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Children%27s_Play_Blocks.JPG',
    author: 'CC0 / Public domain',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sha256: 'f4ae9fb9778c86cb58dc89f9a9d929e9310dd93f7d80964e5916ae7e6da0f6af',
    dimensions: '1800x1385',
    bytes: 89942,
    alt: {
      ar: 'مكعبات بناء خشبية طبيعية لتعزيز مهارات البناء والتركيز الحركي الدقيق',
      en: 'Natural wooden building blocks supporting construction play and fine motor focus'
    },
    caption: {
      ar: 'مكعبات بناء متينة مصنعة من الخشب الطبيعي غير المعالج لدعم الابتكار والتركيب الحر',
      en: 'Solid natural wooden building blocks encouraging architectural curiosity and balance'
    }
  }
];
