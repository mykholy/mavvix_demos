/**
 * ArenaHub / Arena Courts — Verified Media Module
 * All assets locally hosted, optimized WebP, with SHA-256 provenance tracking
 */

export interface ArenaMediaItem {
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
  category: 'football' | 'padel' | 'indoor' | 'tennis';
  alt: {
    ar: string;
    en: string;
  };
  caption: {
    ar: string;
    en: string;
  };
}

export const ARENA_MEDIA_ASSETS: ArenaMediaItem[] = [
  {
    id: 'sports-floodlit-football-pitch',
    src: '/assets/portfolio/sports-venues/floodlit_football_pitch.webp',
    url: '/assets/portfolio/sports-venues/floodlit_football_pitch.webp',
    width: 1800,
    height: 1197,
    format: 'webp',
    sha256: '02f9a8ba518b577e9ba66a1a44e5482329e46a788e0b6238b693eb1f8beea1c1',
    author: 'Jonathan Petersson',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pexels-jonathan-petersson-399187.jpg',
    category: 'football',
    alt: {
      ar: 'ملعب كرة قدم ليلي بإضاءة كاشفة وأرضية عشب صناعي معتمدة',
      en: 'Floodlit football pitch with FIFA-quality artificial turf at night'
    },
    caption: {
      ar: 'ملعب كرة قدم خماسي وسباعي بأعمدة إنارة كاشفة تفوق ٥٠٠ لوكس',
      en: 'Five-a-side and seven-a-side pitch with high-lux LED anti-glare floodlighting'
    }
  },
  {
    id: 'sports-night-football-action',
    src: '/assets/portfolio/sports-venues/night_football_action.webp',
    url: '/assets/portfolio/sports-venues/night_football_action.webp',
    width: 1800,
    height: 1200,
    format: 'webp',
    sha256: 'cbc6fb7b5f22f7e0fcbbce55a299fe950d6f466b04392263435166f2b5a51a80',
    author: 'Abigail Keenan',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Soccer_at_night_(Unsplash).jpg',
    category: 'football',
    alt: {
      ar: 'مباراة تنافسية ليلية على أرضية عشبية ممتازة تحت أضواء الملعب',
      en: 'Competitive night match underway on premium turf under stadium floodlights'
    },
    caption: {
      ar: 'مباريات دورية وبطولات مسائية مع تنظيم كامل لأوقات اللعب والتبديل',
      en: 'Organized evening leagues and community tournament matches with timed intervals'
    }
  },
  {
    id: 'sports-panoramic-padel-court',
    src: '/assets/portfolio/sports-venues/panoramic_padel_court.webp',
    url: '/assets/portfolio/sports-venues/panoramic_padel_court.webp',
    width: 1800,
    height: 1355,
    format: 'webp',
    sha256: '68ca12f84e4cf1f96e4762c2f35e4d2bfb9ce053428d022b3149be8eb9f3fb71',
    author: 'Diegodlh',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cancha_de_p%C3%A1del_en_el_centro_deportivo_%22El_Tuc%C3%A1n%22.jpg',
    category: 'padel',
    alt: {
      ar: 'ملعب بادل زجاجي بانورامي حديث مع عشب أزرق محبب وإضاءة متطورة',
      en: 'Modern panoramic glass padel court with textured blue monofilament turf'
    },
    caption: {
      ar: 'ملاعب بادل مطابقة لمعايير FIP بزجاج حراري مقسى وشبكات متطورة',
      en: 'FIP-compliant panoramic padel court with tempered safety glass and anti-glare illumination'
    }
  },
  {
    id: 'sports-outdoor-padel-arena',
    src: '/assets/portfolio/sports-venues/outdoor_padel_arena.webp',
    url: '/assets/portfolio/sports-venues/outdoor_padel_arena.webp',
    width: 1800,
    height: 1200,
    format: 'webp',
    sha256: '176b3af413e2fce13d71109a9058b7621c17ee16f728fa545a05b38d7b322da4',
    author: 'Sniper Zeta',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bagartorp_Padelbana_1000_Solnabilder.jpg',
    category: 'padel',
    alt: {
      ar: 'مجمع ملاعب بادل مفتوحة مهيأة للحجوزات الفردية والجماعية',
      en: 'Outdoor padel court complex prepared for individual matches and group training'
    },
    caption: {
      ar: 'أرضيات ممتصة للصدمات تقلل إجهاد المفاصل وتوفر ارتدادًا متجانسًا للكرة',
      en: 'Shock-absorbent padel surfaces delivering optimal ball rebound and joint protection'
    }
  },
  {
    id: 'sports-indoor-basketball-arena',
    src: '/assets/portfolio/sports-venues/indoor_basketball_arena.webp',
    url: '/assets/portfolio/sports-venues/indoor_basketball_arena.webp',
    width: 1800,
    height: 1012,
    format: 'webp',
    sha256: 'f973b6494e4c25f44da2b7a48fb8488e1467498c474962ee99d305d0337da54b',
    author: 'Samos@Wikipedia Project',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Indoor_Basketball_Court_in_Karlovasi,_Samos.jpg',
    category: 'indoor',
    alt: {
      ar: 'صالة كرة سلة وملاعب متعددة الأغراض بأرضية باركيه خشبية معتمدة',
      en: 'Indoor basketball and multi-sport sports arena with certified hardwood parquet flooring'
    },
    caption: {
      ar: 'صالة مغطاة مكيفة بخطوط تخطيط رسمية لسلة وطائرة ويد وفق المعايير الدولية',
      en: 'Climate-controlled indoor arena with FIBA-regulation hardwood lines for basketball and volleyball'
    }
  },
  {
    id: 'sports-clay-tennis-court',
    src: '/assets/portfolio/sports-venues/clay_tennis_court.webp',
    url: '/assets/portfolio/sports-venues/clay_tennis_court.webp',
    width: 1800,
    height: 1350,
    format: 'webp',
    sha256: 'bae1c1d9676a0d0c3ebc95359a3c9ae7236ceca5c2ca1c736c0a0c4f3ce37c56',
    author: 'KeepActive Australia',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Clay_tennis_courts_melbourne_looking_down_the_net.jpg',
    category: 'tennis',
    alt: {
      ar: 'ملعب تنس ترابي احترافي مع شبكة قياسية وتخطيط أبيض دقيق',
      en: 'Professional clay tennis court with regulation net and precise baseline markings'
    },
    caption: {
      ar: 'ملاعب تنس كلاسيكية مطابقة لمعايير ITF مع خدمات صيانة دورية للرمال والتسوية',
      en: 'ITF-standard clay court surface maintained for consistent sliding and authentic ball bounce'
    }
  }
];

export const ARENA_HERO_IMAGE = ARENA_MEDIA_ASSETS[0];
