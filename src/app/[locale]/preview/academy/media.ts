/**
 * Nova Learning / أكاديمية نـوفا — Applied Technical Education & Engineering
 * Authoritative Licensed Media Manifest & Type Definitions
 */

export interface NovaLearningPhoto {
  id: 'coding_lab' | 'data_cluster' | 'design_studio' | 'robotics_lab' | 'amphitheater' | 'campus_atrium';
  filename: string;
  url: string;
  category: 'software_engineering' | 'data_infrastructure' | 'design_systems' | 'hardware_robotics' | 'lecture_theater' | 'campus_architecture';
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

export const novaLearningPhotos: NovaLearningPhoto[] = [
  {
    id: 'coding_lab',
    filename: 'coding_lab.webp',
    url: '/assets/portfolio/academy/coding_lab.webp',
    category: 'software_engineering',
    titleEn: 'Systems Engineering & Collaborative Programming Lab',
    titleAr: 'مختبر هندسة البرمجيات والتطوير البرمجي المتقدم',
    width: 1800,
    height: 1200,
    bytes: 51086,
    sha256: '4a5a421ac7371336ef7c155fc39dfb45db2d75a06d9233925632dcb3c49bfbf0',
    author: 'Flanoz',
    license: 'CC0 1.0 Universal',
    source: 'https://commons.wikimedia.org/wiki/File:Wikimedia_Hackathon_2023_-_Hacking_Room-61.jpg'
  },
  {
    id: 'data_cluster',
    filename: 'data_cluster.webp',
    url: '/assets/portfolio/academy/data_cluster.webp',
    category: 'data_infrastructure',
    titleEn: 'High-Performance Computing Cluster & Enterprise GPU Data Center',
    titleAr: 'عناقيد الحوسبة فائقة الأداء ومركز بيانات البنية التحتية',
    width: 1800,
    height: 1195,
    bytes: 416556,
    sha256: 'd3b241e5de6c5c1c133bb4d1dea35868470ac10d5c2bcebd806343dc48f6e411',
    author: 'CSIRO',
    license: 'CC BY 3.0 Unported',
    source: 'https://commons.wikimedia.org/wiki/File:CSIRO_ScienceImage_11313_The_CSIRO_GPU_cluster_at_the_data_centre.jpg'
  },
  {
    id: 'design_studio',
    filename: 'design_studio.webp',
    url: '/assets/portfolio/academy/design_studio.webp',
    category: 'design_systems',
    titleEn: 'Design Systems Workshop & UX Architecture Atelier',
    titleAr: 'استوديو تصميم تجربة المستخدم وتطوير أنظمة التصميم المتقدمة',
    width: 1800,
    height: 1104,
    bytes: 190842,
    sha256: 'b9a9020922da04d5071ba700a009bc0755453ec57259f25fc484c906e4307074',
    author: 'Corinna Schuster (WMDE)',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:Design_Thinking_Workshop_WMDE_1.jpg'
  },
  {
    id: 'robotics_lab',
    filename: 'robotics_lab.webp',
    url: '/assets/portfolio/academy/robotics_lab.webp',
    category: 'hardware_robotics',
    titleEn: 'Robotics & Embedded Systems Research Engineering Laboratories',
    titleAr: 'مختبرات الأنظمة المدمجة والروبوتات والبحث الهندسي التطبيقي',
    width: 1800,
    height: 1195,
    bytes: 256862,
    sha256: '4c771392b5344f4b331025d33671a8dc0c15b63f14923603e8c2a681e7b8d48f',
    author: 'Joe Mabel',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:University_of_Washington_-_Bill_and_Melinda_Gates_Center_for_CSE_-_robotics_lab_grad_student_offices.jpg'
  },
  {
    id: 'amphitheater',
    filename: 'amphitheater.webp',
    url: '/assets/portfolio/academy/amphitheater.webp',
    category: 'lecture_theater',
    titleEn: 'Tiered Technical Lecture Amphitheater for Architecture Keynotes',
    titleAr: 'المدرج التعليمي المتدرج للمحاضرات التقنية والمؤتمرات المعمارية',
    width: 1800,
    height: 1350,
    bytes: 681878,
    sha256: '0b0419daa61f152adb346a187638eebfaf4fbe10b46b236ca8bf4b7f53bd140f',
    author: 'w_lemay',
    license: 'CC BY-SA 2.0 Generic',
    source: 'https://commons.wikimedia.org/wiki/File:Education_Lecture_Hall,_Arizona_State_University,_Gammage_Parkway,_Tempe,_AZ.jpg'
  },
  {
    id: 'campus_atrium',
    filename: 'campus_atrium.webp',
    url: '/assets/portfolio/academy/campus_atrium.webp',
    category: 'campus_architecture',
    titleEn: 'Modern Technical Campus Center & Collaborative Quadrangle',
    titleAr: 'المبنى الأكاديمي والبهو المعماري المعاصر لعلوم الحاسب',
    width: 1800,
    height: 1195,
    bytes: 351654,
    sha256: 'dfb7e423db4982f8fce295cb8b414f1ed0edec321e2bc1942325a8cfc832e434',
    author: 'Joe Mabel',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:University_of_Washington_-_Bill_and_Melinda_Gates_Center_for_CSE_01.jpg'
  }
];
