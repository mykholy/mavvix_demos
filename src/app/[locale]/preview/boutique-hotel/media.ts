export type OasisPhotoId =
  | 'oasis-suite'
  | 'oasis-dining'
  | 'oasis-courtyard'
  | 'oasis-terrace'
  | 'oasis-wellness'
  | 'oasis-library';

export interface OasisPhoto {
  id: OasisPhotoId;
  src: string;
  width: number;
  height: number;
  altAr: string;
  altEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  category: 'suite' | 'dining' | 'courtyard' | 'terrace' | 'wellness' | 'library';
  license: string;
  licenseUrl: string;
  author: string;
  sourceUrl: string;
  sha256: string;
  byteSize: number;
}

export const OASIS_PHOTOS: OasisPhoto[] = [
  {
    id: 'oasis-suite',
    src: '/assets/portfolio/boutique-hotel/suite.webp',
    width: 1600,
    height: 1600,
    altAr: 'جناح فندقي هادئ مع مفروشات طبيعية وإضاءة ناعمة للاسترخاء',
    altEn: 'Serene boutique suite with organic textiles and ambient warm lighting',
    titleAr: 'أجنحة الاسترخاء والهدوء',
    titleEn: 'Serene Sanctuary Suites',
    subtitleAr: 'مساحات نوم رحبة مصممة بخامات طبيعية ولمسات معمارية مستوحاة من عمارة الواحات',
    subtitleEn: 'Spacious sleeping chambers crafted with natural stone, woven linens, and soft illumination',
    category: 'suite',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'Book Elizabeth',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Boutique-hotel.jpg',
    sha256: '79a591b5900a6d30b0a59dd68d408f74b9e5ae4db5af6507b404cc57642acf12',
    byteSize: 177202
  },
  {
    id: 'oasis-dining',
    src: '/assets/portfolio/boutique-hotel/dining.webp',
    width: 1600,
    height: 900,
    altAr: 'مائدة إفطار صباحية تعتمد على مكونات موسمية طازجة في فناء مشمس',
    altEn: 'Artisan morning table setting with farm-to-table seasonal breakfast fare',
    titleAr: 'مائدة الضيافة الصباحية',
    titleEn: 'Artisan Farm-to-Table Dining',
    subtitleAr: 'وجبات موسمية طازجة تُعد يومياً من خيرات بساتين النخيل والمزارع العضوية المجاورة',
    subtitleEn: 'Fresh daily harvests and local seasonal cuisine served in a sunlit breakfast courtyard',
    category: 'dining',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'Ka23 13',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:TableSetting_20240504_073606.jpg',
    sha256: 'b18e685c3378d90f37551896c87581900d446a0d4999059c43fd6d99d98222d5',
    byteSize: 55710
  },
  {
    id: 'oasis-courtyard',
    src: '/assets/portfolio/boutique-hotel/courtyard.webp',
    width: 1600,
    height: 1200,
    altAr: 'فناء داخلي محاط بأعمدة أندلسية تقليدية ونباتات الواحة الخضراء',
    altEn: 'Tranquil inner courtyard framed by traditional arches and lush greenery',
    titleAr: 'الفناء الداخلي والنوافير',
    titleEn: 'Inner Cloistered Courtyards',
    subtitleAr: 'قلب الفندق النابض بالسكينة وخرير المياه وظلال أشجار البرتقال والياسمين',
    subtitleEn: 'A secluded sanctuary sheltered from desert sun with murmuring fountains and verdant flora',
    category: 'courtyard',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    author: 'Arnaud 25',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Riad_Maroc_034.JPG',
    sha256: '13ecc7e7acf37e456d7b0ab0a30e7a16e5da71cf147addab4c4715b33e5b30ea',
    byteSize: 250040
  },
  {
    id: 'oasis-terrace',
    src: '/assets/portfolio/boutique-hotel/terrace.webp',
    width: 1800,
    height: 1350,
    altAr: 'تراس علوي مطل على قمم الجبال ومساحات الأفق الهادئة وقت الغروب',
    altEn: 'Panoramic rooftop terrace overlooking majestic mountain ridges at dusk',
    titleAr: 'تراس الغروب والأفق المفتوح',
    titleEn: 'Panoramic Sunset Terraces',
    subtitleAr: 'إطلالات بانورامية مفتوحة على سلاسل الجبال وسماء الصحراء المزدانة بالنجوم',
    subtitleEn: 'Unobstructed rooftop vistas across mountain horizons and serene starlit night skies',
    category: 'terrace',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'Anton Christoffersen / Marrakech Best Riads',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Atlas-Mountain.jpg',
    sha256: '9a8b374be192fdeb6c16d2c4c904162b00ae45734538b087689962d94800f162',
    byteSize: 530118
  },
  {
    id: 'oasis-wellness',
    src: '/assets/portfolio/boutique-hotel/wellness.webp',
    width: 1800,
    height: 1200,
    altAr: 'مسبح داخلي ومنطقة استرخاء هادئة تعزز الهدوء وتجديد النشاط',
    altEn: 'Tranquil indoor thermal pool and wellness sanctuary for holistic rejuvenation',
    titleAr: 'مسبح الاسترخاء وحمامات العافية',
    titleEn: 'Thermal Spa & Wellness Pool',
    subtitleAr: 'طقوس استشفائية تقليدية بمياه عذبة وزيوت طبيعية تعيد للجسم توازنه وطاقته',
    subtitleEn: 'Reflective indoor plunge pools and restorative botanical thermal baths',
    category: 'wellness',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'Basile Morin',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Indoor_pool_and_shower_of_spa_at_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos_front_view.jpg',
    sha256: 'b3338a7192d9bf949b724e3ce050efa017739efcf683cbdfcbe827de96b0e1cc',
    byteSize: 132828
  },
  {
    id: 'oasis-library',
    src: '/assets/portfolio/boutique-hotel/library.webp',
    width: 1800,
    height: 1200,
    altAr: 'صالون استقبال دافئ ومكتبة للقراءة والحديث الهادئ عند الغسق',
    altEn: 'Welcoming heritage library salon and evening reading lounge',
    titleAr: 'صالون الاستقبال والمكتبة التراثية',
    titleEn: 'Heritage Salon & Reading Library',
    subtitleAr: 'ركن حميمي يجمع كتب التراث والمخطوطات والمشروبات الساخنة للأمسيات الهادئة',
    subtitleEn: 'Intimate reading alcoves curated with regional literature, board games, and herbal infusions',
    category: 'library',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'Basile Morin',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Reception_lounge_at_Amantaka_luxury_Resort_%26_Hotel_at_blue_hour_in_Luang_Prabang_Laos.jpg',
    sha256: '863f534c24bb1f3d310b9ce666d26db9713b515e398bae4d8d49e5c36fb8d9f9',
    byteSize: 187662
  }
];
