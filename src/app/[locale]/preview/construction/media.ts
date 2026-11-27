export type AtlasPhoto = {
  id: string;
  category: 'structural' | 'facades' | 'interior' | 'systems' | 'technical';
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
const pdMark = 'https://creativecommons.org/publicdomain/mark/1.0/';

export const atlasPhotos: AtlasPhoto[] = [
  {
    id: 'tower',
    category: 'structural',
    url: '/assets/portfolio/construction/tower.webp',
    source: commons + 'Skyscraper_Construction_in_Frankfurt,_Germany.jpg',
    author: 'Spinarak',
    license: 'CC0',
    licenseUrl: zero,
    ar: 'تشييد ناطحة سحاب وهيكل خرساني عملاق',
    en: 'High-rise skyscraper civil superstructure construction'
  },
  {
    id: 'steel',
    category: 'structural',
    url: '/assets/portfolio/construction/steel.webp',
    source: commons + '2022_CMP_Midtown_%E5%8B%A4%E7%BE%8E%E4%B9%8B%E6%A3%AE_construction_progress_02.jpg',
    author: 'Outlookxp',
    license: 'CC BY-SA 4.0',
    licenseUrl: bySa4,
    ar: 'تركيب الهياكل والكمرات الفولاذية الإنشائية',
    en: 'Structural steel erection and framing framework'
  },
  {
    id: 'concrete',
    category: 'facades',
    url: '/assets/portfolio/construction/concrete.webp',
    source: commons + 'FOT9561_Haltepunkt_Leipzig_Anger-Crottendorf_2024_%E2%80%93_Personentunnel_zum_Treppenaufgang_S%C3%BCd.jpg',
    author: 'FOT9561',
    license: 'CC BY-SA 4.0',
    licenseUrl: bySa4,
    ar: 'تنفيذ خرسانة معمارية مكشوفة بتشطيب هندسي دقيق',
    en: 'Precision fair-faced architectural concrete finish'
  },
  {
    id: 'fitout',
    category: 'interior',
    url: '/assets/portfolio/construction/fitout.webp',
    source: commons + 'M%C3%BCnster,_Westdeutsche_Lotterie_--_2018_--_0417.jpg',
    author: 'Dietmar Rabich',
    license: 'CC BY-SA 4.0',
    licenseUrl: bySa4,
    ar: 'تجهيزات وتشطيبات مقرات إدارية متكاملة',
    en: 'Turnkey architectural commercial office fit-out'
  },
  {
    id: 'mep',
    category: 'systems',
    url: '/assets/portfolio/construction/mep.webp',
    source: commons + 'HVAC_Air_Handler_Unit,_pic1.JPG',
    author: 'Tanyawilhelm',
    license: 'CC0',
    licenseUrl: zero,
    ar: 'أنظمة التكييف والتهوية والأعمال الكهروميكانيكية',
    en: 'Precision MEP HVAC plant and mechanical systems'
  },
  {
    id: 'blueprint',
    category: 'technical',
    url: '/assets/portfolio/construction/blueprint.webp',
    source: commons + 'Blueprint_of_elevation_by_Alice_Trythall_Washburn.jpg',
    author: 'Alice Trythall Washburn',
    license: 'Public domain',
    licenseUrl: pdMark,
    ar: 'مخططات معمارية وتنفيذية تفصيلية معتمدة',
    en: 'Certified architectural elevation blueprint and engineering drafts'
  }
];

export const atlasPhoto = (id: string) => atlasPhotos.find((p) => p.id === id) ?? atlasPhotos[0];
