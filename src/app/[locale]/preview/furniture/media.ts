export type OaklinePhoto = {
  id: string;
  category: 'living' | 'dining' | 'bedroom' | 'craft' | 'seating';
  url: string;
  source: string;
  author: string;
  license: string;
  licenseUrl: string;
  ar: string;
  en: string;
};

const commons = 'https://commons.wikimedia.org/wiki/File:';
const zero = 'https://creativecommons.org/publicdomain/zero/1.0/';
const bySa4 = 'https://creativecommons.org/licenses/by-sa/4.0/';

export const oaklinePhotos: OaklinePhoto[] = [
  {
    id: 'living',
    category: 'living',
    url: '/assets/portfolio/furniture/living.webp',
    source: commons + 'Living_room_(Unsplash).jpg',
    author: 'Jarosław Ceborski',
    license: 'CC0 1.0 Universal',
    licenseUrl: zero,
    ar: 'غرفة معيشة بأثاث خشبي راقٍ وتوزيع ضوء طبيعي هادئ',
    en: 'Living room with bespoke timber furnishings'
  },
  {
    id: 'sofa',
    category: 'seating',
    url: '/assets/portfolio/furniture/sofa.webp',
    source: commons + 'Couch-furniture-living-room-sofa_(24300293356).jpg',
    author: 'Pixel.la Free Stock Photos',
    license: 'CC0 1.0 Universal',
    licenseUrl: zero,
    ar: 'كنبة لاونج موديل وحدات بتنجيد فاخر وقاعدة خشبية صلبة',
    en: 'Modular lounge sofa with tactile upholstery'
  },
  {
    id: 'vignette',
    category: 'living',
    url: '/assets/portfolio/furniture/vignette.webp',
    source: commons + 'Furnished_living_room._(Unsplash).jpg',
    author: 'Stephen Di Donato',
    license: 'CC0 1.0 Universal',
    licenseUrl: zero,
    ar: 'زاوية معيشة معمارية بتفاصيل خشبية ومسار حركة مريح',
    en: 'Architectural living vignette and spatial balance'
  },
  {
    id: 'dining',
    category: 'dining',
    url: '/assets/portfolio/furniture/dining.webp',
    source: commons + 'Dining_table_in_Standen_House_2024-10-08.jpg',
    author: 'Andy Li (Onthewings)',
    license: 'CC0 1.0 Universal',
    licenseUrl: zero,
    ar: 'طاولة طعام خشب بلوط صلب وكراسي خشبية يدوية الصنع',
    en: 'Solid oak dining table and handcrafted chairs'
  },
  {
    id: 'joinery',
    category: 'craft',
    url: '/assets/portfolio/furniture/joinery.webp',
    source: commons + 'Sashimono_joinery_-_The_Craft_of_Carpentry,_Japan_House_London_2025-05-12.jpg',
    author: 'Andy Li (Onthewings)',
    license: 'CC0 1.0 Universal',
    licenseUrl: zero,
    ar: 'تعشيقات خشبية تقليدية دقيقة بدون مسامير معدنية',
    en: 'Traditional Sashimono precision interlocking wood joinery'
  },
  {
    id: 'bedroom',
    category: 'bedroom',
    url: '/assets/portfolio/furniture/bedroom.webp',
    source: commons + 'Canopy_bed_and_wardrobes_in_Khan_Pool_Suite_at_Amantaka_luxury_Resort_&_Hotel_in_Luang_Prabang_Laos.jpg',
    author: 'Basile Morin',
    license: 'CC BY-SA 4.0',
    licenseUrl: bySa4,
    ar: 'جناح نوم بخشب طبيعي فاخر وسرير مظلة ودواليب مدمجة',
    en: 'Artisanal timber canopy bed suite and bespoke wardrobes'
  }
];

export const oaklineHeroPhoto = oaklinePhotos[0];
