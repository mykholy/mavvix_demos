export interface LumaMediaAsset {
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

export const LUMA_MEDIA_COLLECTION: readonly LumaMediaAsset[] = [
  {
    id: 'luma-conference-hall',
    local: '/assets/portfolio/events/conference_hall.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:DZ6_0468_Spacious_elegantly_lit_banquet_hall_set_up_with_rows_of_white-covered_chairs_facing_a_stage_ready_for_a_large_conference_or_formal_event.jpg',
    author: 'PattayaPatrol',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: '4b44c7768617ec2c8456342c017b88b8cc094efb290b6fb140cf8915e0a772e0',
    dimensions: '1280x852',
    bytes: 210850,
    alt: {
      ar: 'قاعة مؤتمر مجهزة، صورة تحريرية مستقلة لا تمثل فعالية من لوما',
      en: 'Prepared conference hall, independent editorial photograph, not a Luma event'
    },
    caption: {
      ar: 'تجهيز قاعات المؤتمرات الكبرى بمسارات جلوس وصوتيات للمتحدثين',
      en: 'Large-scale conference hall staging with attendee circulation and acoustic zoning'
    }
  },
  {
    id: 'luma-grand-ballroom',
    local: '/assets/portfolio/events/grand_ballroom.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Melia_Bali_Villas_and_Spa_Resort_Nusa_Dua_Bali_Grand_Ballroom.jpg',
    author: 'Paradisus Bali',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: 'ce273c4268ff0f9ba409e6464818ba3f5463dc36a257ce84765ed86e10ce1f40',
    dimensions: '1800x1200',
    bytes: 306912,
    alt: {
      ar: 'قاعة احتفالات كبرى مجهزة للمناسبات والقمم، صورة تحريرية مستقلة',
      en: 'Grand ballroom staged for events and summits, independent editorial photograph'
    },
    caption: {
      ar: 'قاعة كبرى بإضاءة دافئة وتوزيع احتفالي ملائم للقمم وحفلات العشاء',
      en: 'Grand ballroom architecture featuring ambient lighting and gala seating layouts'
    }
  },
  {
    id: 'luma-banquet-setting',
    local: '/assets/portfolio/events/banquet_setting.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Banquet_Table_Setting_(3666060481).jpg',
    author: 'Tracy Hunter',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sha256: '4198a4cf7e87ec3c825976fbb91fdd2e03fca154f971baf2a01b411ec88d12fb',
    dimensions: '1800x1350',
    bytes: 304774,
    alt: {
      ar: 'تنسيق موائد العشاء والمناسبات الرسمية، صورة تحريرية مستقلة',
      en: 'Banquet table staging and formal dining arrangement, independent editorial photograph'
    },
    caption: {
      ar: 'تفاصيل تنسيق الطاولات والزهور والخدمة لحفلات العشاء الخاصة والجوائز',
      en: 'Artisan floral and tableware styling calibrated for executive banquets'
    }
  },
  {
    id: 'luma-outdoor-stage',
    local: '/assets/portfolio/events/outdoor_stage.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Festival_stage_lighting_in_Batumi.jpg',
    author: 'Shixart1985',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sha256: '59b9a10a49ff787cf8704411cf83b3f9f92b800a7e71e5d03ec469599e72920f',
    dimensions: '1800x2705',
    bytes: 233752,
    alt: {
      ar: 'إضاءة مسرح مفتوح لفعالية خارجية، صورة تحريرية مستقلة',
      en: 'Outdoor festival stage lighting and truss rigging, independent editorial photograph'
    },
    caption: {
      ar: 'هندسة الإضاءة والمسارح المفتوحة مع مراعاة الرياح ومتطلبات الأمان',
      en: 'Open-air concert truss rigging and dynamic architectural wash lighting'
    }
  },
  {
    id: 'luma-lighting-console',
    local: '/assets/portfolio/events/lighting_console.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Audio_and_lighting_console_at_concert.jpg',
    author: 'Jeff Meyer',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sha256: '5d92a17df6d198948e97a625de18d067a9d13876df94374a751961fba008c09c',
    dimensions: '1024x768',
    bytes: 46888,
    alt: {
      ar: 'وحدة التحكم في الإضاءة والصوتيات المباشرة، صورة تحريرية مستقلة',
      en: 'Live lighting and audio mixing console, independent editorial photograph'
    },
    caption: {
      ar: 'غرفة التحكم الهندسي والتشغيل اللحظي لتسلسل الفقرات (Run-of-Show)',
      en: 'Front-of-house (FOH) lighting console managing precise live show execution'
    }
  },
  {
    id: 'luma-brand-pavilion',
    local: '/assets/portfolio/events/brand_pavilion.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:2008Computex_NVIDIA_Booth_Hall1.jpg',
    author: 'Rico Shen',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: '1f072c161c5c311c4a3c68297a6c6e40308913117781b7850cd073f77458a1cb',
    dimensions: '1800x1012',
    bytes: 214952,
    alt: {
      ar: 'جناح عرض معماري للعلامات التجارية، صورة تحريرية مستقلة',
      en: 'Architectural brand exhibition pavilion and activation, independent editorial photograph'
    },
    caption: {
      ar: 'تصميم وبناء أجنحة المعارض ومناطق تفعيل وتفاعل الجمهور مع العلامة',
      en: 'Bespoke brand pavilion showcasing experiential activation and product demos'
    }
  }
];
