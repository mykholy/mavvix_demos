export type MeridianPhoto = {
  id: string;
  category: 'sky-villa' | 'living' | 'terrace' | 'architecture' | 'arrival' | 'masterplan';
  url: string;
  source: string;
  author: string;
  license: string;
  licenseUrl: string;
  ar: string;
  en: string;
  specs?: {
    area?: string;
    level?: string;
    orientation?: string;
  };
};

const commons = 'https://commons.wikimedia.org/wiki/File:';
const zero = 'https://creativecommons.org/publicdomain/zero/1.0/';
const by2 = 'https://creativecommons.org/licenses/by/2.0/';
const bySa2 = 'https://creativecommons.org/licenses/by-sa/2.0/';
const bySa4 = 'https://creativecommons.org/licenses/by-sa/4.0/';

export const meridianPhotos: MeridianPhoto[] = [
  {
    id: 'sky-villa',
    category: 'sky-villa',
    url: '/assets/portfolio/real-estate/sky-villa.webp',
    source: commons + 'Corner_Penthouse.png',
    author: 'Radlord',
    license: 'CC0 1.0 Universal',
    licenseUrl: zero,
    ar: 'بنتهاوس سكاي فيلا بإطلالة بانورامية وواجهات زجاجية ممتدة',
    en: 'Sky villa penthouse with panoramic floor-to-ceiling glazing',
    specs: {
      area: '420 m²',
      level: 'Penthouse (L48-49)',
      orientation: 'North-West Horizon'
    }
  },
  {
    id: 'living-interior',
    category: 'living',
    url: '/assets/portfolio/real-estate/living-interior.webp',
    source: commons + 'Modern_luxury_living_room_with_kitchen_interior.jpg',
    author: 'Shixart',
    license: 'CC BY 2.0 Generic',
    licenseUrl: by2,
    ar: 'صالون معيشة مفتوح وواسع متصل بجناح مطبخ معماري متكامل',
    en: 'Expansive open-plan living salon with integrated kitchen suite',
    specs: {
      area: '195 m²',
      level: 'Executive Tower (L24)',
      orientation: 'Sunset Bay View'
    }
  },
  {
    id: 'terrace-balcony',
    category: 'terrace',
    url: '/assets/portfolio/real-estate/terrace-balcony.webp',
    source: commons + 'Apartment_balconies,_Kanalv%C3%A4gen_and_Floragatan,_%C3%96rebro.jpg',
    author: 'DimiTal',
    license: 'CC0 1.0 Universal',
    licenseUrl: zero,
    ar: 'شرفة سكنية معلقة بإطلالة أفقية واسعة ومساحة جلوس رحبة',
    en: 'Cantilevered residential terrace with unobstructed horizon views',
    specs: {
      area: '65 m² (Outdoor)',
      level: 'Mid-Rise Garden Wings',
      orientation: 'South-East Promenade'
    }
  },
  {
    id: 'facade-tower',
    category: 'architecture',
    url: '/assets/portfolio/real-estate/facade-tower.webp',
    source: commons + '4_East_Elm,_Gold_Coast,_Chicago,_IL_(52877219272).jpg',
    author: 'Kenneth C. Zirkel',
    license: 'CC BY-SA 2.0 Generic',
    licenseUrl: bySa2,
    ar: 'برج سكني معاصر بواجهات برونزية وزجاج معماري عاكس',
    en: 'Contemporary residential tower with bronze and architectural glass facade',
    specs: {
      area: '54 Levels',
      level: 'Tower Exterior',
      orientation: 'Dual Aspect'
    }
  },
  {
    id: 'lobby-reception',
    category: 'arrival',
    url: '/assets/portfolio/real-estate/lobby-reception.webp',
    source: commons + 'Reception_lounge_at_Amantaka_luxury_Resort_%26_Hotel_at_blue_hour_in_Luang_Prabang_Laos.jpg',
    author: 'Basile Morin',
    license: 'CC BY-SA 4.0 International',
    licenseUrl: bySa4,
    ar: 'ردهة استقبال خاصة للمقيمين وجناح كونسيرج بتصميم هادئ',
    en: 'Private resident arrival lounge and bespoke concierge pavilion',
    specs: {
      area: '380 m²',
      level: 'Ground Podium',
      orientation: 'Private Valet Court'
    }
  },
  {
    id: 'masterplan-model',
    category: 'masterplan',
    url: '/assets/portfolio/real-estate/masterplan-model.webp',
    source: commons + 'Scale_model_of_Park_Royal_2.jpg',
    author: 'Meow2026',
    license: 'CC BY-SA 4.0 International',
    licenseUrl: bySa4,
    ar: 'مجسم معماري تخطيطي للمجمع السكني وتوزيع المساحات الخضراء',
    en: 'Architectural community masterplan and zoning podium scale model',
    specs: {
      area: '48 Hectares',
      level: 'Masterplan Overview',
      orientation: 'Central Axis'
    }
  }
];

export function getMeridianPhoto(id: string): MeridianPhoto | undefined {
  return meridianPhotos.find((p) => p.id === id);
}
