/**
 * Salma Hassan Studio — Independent Creative Practice & Design Direction
 * Authoritative Licensed Media Manifest & Type Definitions
 */

export interface SalmaStudioPhoto {
  id: 'leadtype' | 'architecture' | 'workshop' | 'gallery' | 'monograph' | 'blueprint';
  filename: string;
  url: string;
  category: 'typography' | 'spatial' | 'print_craft' | 'exhibition' | 'editorial' | 'systems';
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

export const salmaStudioPhotos: SalmaStudioPhoto[] = [
  {
    id: 'leadtype',
    filename: 'leadtype.webp',
    url: '/assets/portfolio/portfolio/leadtype.webp',
    category: 'typography',
    titleEn: 'Lead Type Sorts & Typesetter Composing Stick in Studio',
    titleAr: 'حروف الطباعة الرصاصية ومسطرة الجمع اليدوي بالاستوديو',
    width: 1800,
    height: 1350,
    bytes: 416936,
    sha256: 'b5c236d004499f37612d47840c7594df1ef6696b9a979064e06fb15735690f79',
    author: 'Hajotthu',
    license: 'CC BY 3.0 Unported',
    source: 'https://commons.wikimedia.org/wiki/File:Bleisatz_im_Winkelhaken.jpg'
  },
  {
    id: 'architecture',
    filename: 'architecture.webp',
    url: '/assets/portfolio/portfolio/architecture.webp',
    category: 'spatial',
    titleEn: 'Bauhaus Dessau Modernist Architecture & Rationalist Grid',
    titleAr: 'عمارة باوهاوس دساو العقلانية والشبكة الهندسية المعاصرة',
    width: 1800,
    height: 937,
    bytes: 258370,
    sha256: '47a2017f544a0ecc3bce3a42e3621f5439ee7a3018925b916fb18ed04b5712dc',
    author: 'Aconcagua',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:Au%C3%9Fenansichten_des_Bauhaus-Geb%C3%A4udes_in_Dessau_06.jpg'
  },
  {
    id: 'workshop',
    filename: 'workshop.webp',
    url: '/assets/portfolio/portfolio/workshop.webp',
    category: 'print_craft',
    titleEn: 'Master Letterpress Atelier with Type Cabinets & Archival Proofs',
    titleAr: 'محترف الطباعة اليدوية وخزائن الحروف الخشبية وسجلات التجارب',
    width: 1800,
    height: 1200,
    bytes: 158724,
    sha256: '7d74bf1be717b149186bb46583e3fd92de89ea3692b769c5b46ebbbb07404dbe',
    author: 'Stamperia Benedetti',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:09092018-stamperia_Benedetti3.jpg'
  },
  {
    id: 'gallery',
    filename: 'gallery.webp',
    url: '/assets/portfolio/portfolio/gallery.webp',
    category: 'exhibition',
    titleEn: 'Contemporary Arts Foundation Minimalist Exhibition Gallery',
    titleAr: 'صالة العرض المعاصرة بمؤسسة الفنون التشكيلية والمعمارية',
    width: 1800,
    height: 1199,
    bytes: 134782,
    sha256: 'd2fd23a8b20e6e084d6c9975e289f26a56cdc501ec7524e52ad4138642fb83c3',
    author: 'Pejman Foundation',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:06-Pejman-foundation.jpg'
  },
  {
    id: 'monograph',
    filename: 'monograph.webp',
    url: '/assets/portfolio/portfolio/monograph.webp',
    category: 'editorial',
    titleEn: 'Rare Printed Folio Monograph with Classical Typographic Layout',
    titleAr: 'مخطوطة ومطبوعة تحريرية نادرة بنظام طباعي كلاسيكي متوازن',
    width: 1800,
    height: 1197,
    bytes: 165126,
    sha256: '8046694b6cfe7b7df340c921954781bea561a4acf153b6e3769d935418df7653',
    author: 'Wellcome Collection',
    license: 'CC BY 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:%27De_Motu_Cordis%27,_by_William_Harvey,_Frankfurt,_Germany,_162_Wellcome_L0060483.jpg'
  },
  {
    id: 'blueprint',
    filename: 'blueprint.webp',
    url: '/assets/portfolio/portfolio/blueprint.webp',
    category: 'systems',
    titleEn: 'Architectural Sectional Elevation & Structural Blueprint Draft',
    titleAr: 'مخطط قطاعي إنشائي ومسقط هندسي يوضح دقة القياسات والنظم',
    width: 1800,
    height: 927,
    bytes: 235608,
    sha256: 'c54f518fdf09e0455cb0df3f31c6b0df2e9b9f6a7af99402fedd90e1054b95a1',
    author: 'Historic American Engineering Record / Library of Congress',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:00019.BH--Reinforced_Oil_House_(d1ac2b92-d1d1-423d-b796-bc6b7f5606fc).jpg'
  }
];

export const getSalmaStudioPhoto = (id: SalmaStudioPhoto['id']): SalmaStudioPhoto => {
  return salmaStudioPhotos.find((p) => p.id === id) || salmaStudioPhotos[0];
};
