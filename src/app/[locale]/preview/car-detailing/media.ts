/**
 * GlossBay Car Detailing & Paint Protection Studio
 * Authoritative Licensed Media Manifest & Type Definitions
 */

export interface GlossBayPhoto {
  id: 'exterior' | 'ceramic' | 'ppf' | 'correction' | 'interior' | 'wash';
  filename: string;
  url: string;
  category: 'wash' | 'interior' | 'correction' | 'protection';
  titleEn: string;
  titleAr: string;
  width: number;
  height: number;
  bytes: number;
  sha256: string;
  author: string;
  license: string;
  source: string;
}

export const glossBayPhotos: GlossBayPhoto[] = [
  {
    id: 'exterior',
    filename: 'exterior.webp',
    url: '/assets/portfolio/car-detailing/exterior.webp',
    category: 'wash',
    titleEn: 'Precision Exterior Detailing & Foam Rinse',
    titleAr: 'عناية خارجية دقيقة وشطف رغوي متطور',
    width: 1800,
    height: 1014,
    bytes: 213748,
    sha256: '47535bf5652a8ecbb0ccf69965995f00b141111d68e4be9da5d1cec0a9707dd9',
    author: 'Jeffkbookoo',
    license: 'CC0 1.0 Universal',
    source: 'https://commons.wikimedia.org/wiki/File:Exterior_Car_detailing.png'
  },
  {
    id: 'ceramic',
    filename: 'ceramic.webp',
    url: '/assets/portfolio/car-detailing/ceramic.webp',
    category: 'protection',
    titleEn: 'Multi-Layer Ceramic Nano-Coating Application & Gloss',
    titleAr: 'تطبيق طبقات النانو سيراميك وانعكاس اللمعان الفائق',
    width: 1800,
    height: 1350,
    bytes: 302130,
    sha256: 'de8bef2a4e658a36cf0cd10669d9e95e0654ecacaf16e51639828d45dc79ae2b',
    author: 'Mr.choppers',
    license: 'CC BY-SA 3.0 Unported',
    source: 'https://commons.wikimedia.org/wiki/File:Ceramic_Coating_on_Performance_Car.jpg'
  },
  {
    id: 'ppf',
    filename: 'ppf.webp',
    url: '/assets/portfolio/car-detailing/ppf.webp',
    category: 'protection',
    titleEn: 'Paint Protection Film (PPF) Squeegee Installation on Hood',
    titleAr: 'تركيب فيلم حماية الطلاء المقاوم للصدمات على غطاء المحرك',
    width: 1800,
    height: 1013,
    bytes: 109794,
    sha256: 'ddb76797428f528dafd62184b04395356ec9f07ae8ccd8ca9b5d1a6013643a61',
    author: 'Avtoshkoly',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0_%D0%B0%D0%BD%D1%82%D0%B8%D0%B3%D1%80%D0%B0%D0%B2%D0%B8%D0%B9%D0%BD%D0%BE%D0%B9_%D0%BF%D0%BB%D0%B5%D0%BD%D0%BA%D0%B8_%D0%BD%D0%B0_%D0%BA%D0%B0%D0%BF%D0%BE%D1%82.jpg'
  },
  {
    id: 'correction',
    filename: 'correction.webp',
    url: '/assets/portfolio/car-detailing/correction.webp',
    category: 'correction',
    titleEn: 'Precision Multi-Stage Machine Paint Correction & Buffer Studio',
    titleAr: 'تصحيح الطلاء الآلي متعدد المراحل وصقل المايكرو بالاستوديو',
    width: 1280,
    height: 854,
    bytes: 121672,
    sha256: '0e00979cc1e6403c151761c66caa59557e1392528650fd4270965be75ea05651',
    author: 'AZ Auto Detailing',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:AZ_Auto_Detailing.jpg'
  },
  {
    id: 'interior',
    filename: 'interior.webp',
    url: '/assets/portfolio/car-detailing/interior.webp',
    category: 'interior',
    titleEn: 'Executive Cabin Leather Deep Conditioning & Console Detailing',
    titleAr: 'عناية عميقة بجلد المقصورة الفاخر وتفاصيل لوحة التحكم',
    width: 1800,
    height: 1012,
    bytes: 81250,
    sha256: '6c722b87a10f753f76ab6c1ffac284761d634d72c3e27bead64326103ece2a32',
    author: 'Santeri Viinamäki',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:Cleaning_interior.jpg'
  },
  {
    id: 'wash',
    filename: 'wash.webp',
    url: '/assets/portfolio/car-detailing/wash.webp',
    category: 'wash',
    titleEn: 'Touchless Snow Foam Bath & Grit Guard Wheel Decontamination',
    titleAr: 'رغوة تنظيف متطورة وتطهير العجلات والجنوط بحواجز الشوائب',
    width: 1800,
    height: 1072,
    bytes: 339448,
    sha256: '1b5a18728a09474cfa70404d58c739f1b33d7c6705e8c92bb235fbb77f11935b',
    author: 'MobileWash',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:Mobile_Wash_partner_washing_a_car.jpg'
  }
];

export const getGlossBayPhoto = (id: GlossBayPhoto['id']): GlossBayPhoto => {
  return glossBayPhotos.find((p) => p.id === id) || glossBayPhotos[0];
};
