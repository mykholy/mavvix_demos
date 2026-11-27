/**
 * Noria Atelier / Aurelia Luxe Contemporary Haute Couture & Lifestyle Atelier
 * Authoritative Licensed Media Manifest & Type Definitions
 */

export interface NoriaAtelierPhoto {
  id: 'linen' | 'gown' | 'leather' | 'atelier' | 'jewelry' | 'sautoir';
  filename: string;
  url: string;
  category: 'textiles' | 'haute_couture' | 'leather_craft' | 'tailoring' | 'jewelry' | 'accessories';
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

export const noriaAtelierPhotos: NoriaAtelierPhoto[] = [
  {
    id: 'linen',
    filename: 'linen.webp',
    url: '/assets/portfolio/ecommerce/linen.webp',
    category: 'textiles',
    titleEn: 'Finely Pleated Pure Linen Fabric Detail & Texture',
    titleAr: 'تفاصيل طيات الكتان الطبيعي الفاخر والملمس النسيجي',
    width: 1800,
    height: 1198,
    bytes: 946806,
    sha256: '7689a91357d36395f961843e5e0ac8cd9fcfd083c5eda0ef22d89450135c0036',
    author: "Hunt Museum and Eamonn O'Mahony",
    license: 'CC0 1.0 Universal',
    source: 'https://commons.wikimedia.org/wiki/File:Lavender_evening_gown_by_Sybil_Connolly_fabric_detail.jpg'
  },
  {
    id: 'gown',
    filename: 'gown.webp',
    url: '/assets/portfolio/ecommerce/gown.webp',
    category: 'haute_couture',
    titleEn: 'Architectural Evening Gown & Silk Draped Silhouette',
    titleAr: 'فستان سهرة معماري بانسيابية الحرير الخالص',
    width: 1800,
    height: 2544,
    bytes: 308870,
    sha256: '50b4e1c94fe7091c3644f2c0b91602ee1e24de59b2ff95e2e29e9a633635d4e7',
    author: 'Callot Soeurs / The Metropolitan Museum of Art',
    license: 'CC0 1.0 Universal',
    source: 'https://commons.wikimedia.org/wiki/File:Evening_dress_MET_DT414.jpg'
  },
  {
    id: 'leather',
    filename: 'leather.webp',
    url: '/assets/portfolio/ecommerce/leather.webp',
    category: 'leather_craft',
    titleEn: 'Master Leather Artisan Workbench & Traditional Saddle Stitching',
    titleAr: 'طاولة الحرفي وحياكة الجلود الطبيعية يدوياً بغرز السراجة',
    width: 1800,
    height: 1200,
    bytes: 58128,
    sha256: 'f8c3e2b92a8b5fde65418ed635eb459e90bd317941d8d01802e059487e1bfbff',
    author: 'Armitage Leather',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:Armitage_Leather_-_Nigel_Armitage.jpg'
  },
  {
    id: 'atelier',
    filename: 'atelier.webp',
    url: '/assets/portfolio/ecommerce/atelier.webp',
    category: 'tailoring',
    titleEn: 'Bespoke Fashion Tailoring Atelier & Pattern Drafting',
    titleAr: 'أتيليه تصميم الأزياء المعاصرة وإعداد الباترون والقص',
    width: 1800,
    height: 1198,
    bytes: 226056,
    sha256: '989d14b0ce061db86dc51658382f89bbc01a520e61ef0834f6d1b127279fe5dc',
    author: 'Karim Diarra',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:L%27atelier_couture.jpg'
  },
  {
    id: 'jewelry',
    filename: 'jewelry.webp',
    url: '/assets/portfolio/ecommerce/jewelry.webp',
    category: 'jewelry',
    titleEn: 'Artisanal Goldsmithing & Micro-Gemstone Setting Craft',
    titleAr: 'صياغة المجوهرات وتثبيت الأحجار الكريمة بحرفية يدوية',
    width: 1800,
    height: 1012,
    bytes: 292766,
    sha256: '77699825befedc951f7d8482e1b68bd44abea7a055ef54e9d9462877ff03a738',
    author: 'SerChevalerie',
    license: 'CC0 1.0 Universal',
    source: 'https://commons.wikimedia.org/wiki/File:Traditional_goldsmith_at_work_in_Margao%2C_Goa%2C_India.jpg'
  },
  {
    id: 'sautoir',
    filename: 'sautoir.webp',
    url: '/assets/portfolio/ecommerce/sautoir.webp',
    category: 'accessories',
    titleEn: 'Fine Pearl Sautoir Pendant & Platinum Filigree Necklace',
    titleAr: 'عقد اللؤلؤ الطبيعي الفاخر والمشغولات البلاتينية الدقيقة',
    width: 1434,
    height: 1799,
    bytes: 49292,
    sha256: '60bc023520572ed91f8c23c81bb8ae42958226f82c030d4f178582698e96ff53',
    author: 'Tiffany & Co. / Walters Art Museum',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Tiffany_and_Company_-_Sautoir_with_Pearl_Pendant_-_Walters_572034.jpg'
  }
];

export const getNoriaAtelierPhoto = (id: NoriaAtelierPhoto['id']): NoriaAtelierPhoto => {
  return noriaAtelierPhotos.find((p) => p.id === id) || noriaAtelierPhotos[0];
};
