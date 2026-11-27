/**
 * Motion Lab / معمل الحركة — Biomechanical Movement & Physical Rehabilitation
 * Authoritative Licensed Media Manifest & Type Definitions
 */

export interface MotionLabPhoto {
  id: 'gait_rehab' | 'joint_mobility' | 'biomechanics_lab' | 'postural_balance' | 'athletic_conditioning' | 'therapeutic_gym';
  filename: string;
  url: string;
  category: 'gait_rehab' | 'manual_therapy' | 'biomechanics_lab' | 'posture_balance' | 'athletic_conditioning' | 'therapeutic_gym';
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

export const motionLabPhotos: MotionLabPhoto[] = [
  {
    id: 'gait_rehab',
    filename: 'gait_rehab.webp',
    url: '/assets/portfolio/physiotherapy/gait_rehab.webp',
    category: 'gait_rehab',
    titleEn: 'Parallel Bars Gait Rehabilitation & Functional Kinetic Retraining',
    titleAr: 'إعادة تأهيل المشي الحركي وتدريبات التوازن على المتوازي الطبي',
    width: 1800,
    height: 2400,
    bytes: 81212,
    sha256: 'cc0b6e7a229dfe5b9aac83ee51b09042add5b3ce01888e52b82342728b3c5996',
    author: 'Ceibos',
    license: 'CC BY 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:Rehabilitaci%C3%B3n_fisioterapia.jpg'
  },
  {
    id: 'joint_mobility',
    filename: 'joint_mobility.webp',
    url: '/assets/portfolio/physiotherapy/joint_mobility.webp',
    category: 'manual_therapy',
    titleEn: 'Manual Joint Mobilization & Passive Range of Motion Examination',
    titleAr: 'العلاج اليدوي الحركي وتقييم المدى الحركي للمفاصل',
    width: 1800,
    height: 1195,
    bytes: 271958,
    sha256: '590015565d7ad1e39df51a39e30507d8367a96dcbad1e6bac6c4c7e8edc008db',
    author: 'Senior Airman Amber Bressler',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Physical_Therapy_DVIDS219872.jpg'
  },
  {
    id: 'biomechanics_lab',
    filename: 'biomechanics_lab.webp',
    url: '/assets/portfolio/physiotherapy/biomechanics_lab.webp',
    category: 'biomechanics_lab',
    titleEn: 'Computerized Biomechanical Motion Capture & Force Platform Analysis',
    titleAr: 'التحليل الميكانيكي الحيوي المحوسب ومنصات قياس القوى الحركية',
    width: 1800,
    height: 1195,
    bytes: 155708,
    sha256: '368ae564e963df56fc2aba9070db0259db29fe974f5f91513e3bfce64085b20b',
    author: 'Sgt. Aaron Ellerman',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Refining_Innovation_160223-A-AP268-922.jpg'
  },
  {
    id: 'postural_balance',
    filename: 'postural_balance.webp',
    url: '/assets/portfolio/physiotherapy/postural_balance.webp',
    category: 'posture_balance',
    titleEn: 'Dynamic Postural Balance Platform & Neuromuscular Proprioception Lab',
    titleAr: 'تقييم التوازن القوامي العصبي العضلي واختبارات الإحساس المفصلي',
    width: 1800,
    height: 2710,
    bytes: 166438,
    sha256: '2bdce70d13f454a5afc67dbf5679aee05fa30f495b6e17d26bf683e5c84d1926',
    author: 'Sgt. Aaron Ellerman',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Refining_Innovation_160223-A-AP268-983.jpg'
  },
  {
    id: 'athletic_conditioning',
    filename: 'athletic_conditioning.webp',
    url: '/assets/portfolio/physiotherapy/athletic_conditioning.webp',
    category: 'athletic_conditioning',
    titleEn: 'Resistance Band Kinetic Chain Conditioning & Sports Rehabilitation',
    titleAr: 'التأهيل الرياضي وتدريبات المقاومة المتدرجة للسلاسل الحركية',
    width: 1800,
    height: 1201,
    bytes: 46838,
    sha256: '01db1fae31fca53f4be947f73a35f0c8d6542342ea80458b97f589b090358e9b',
    author: 'Staff Sgt. Chanceler Nardone',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Spangdahlem_physical_therapy_rehabilitates_Airmen_after_injury_(7270862).jpg'
  },
  {
    id: 'therapeutic_gym',
    filename: 'therapeutic_gym.webp',
    url: '/assets/portfolio/physiotherapy/therapeutic_gym.webp',
    category: 'therapeutic_gym',
    titleEn: 'Clinical Physical Therapy Gymnasium & Functional Movement Suite',
    titleAr: 'صالة التأهيل الحركي السريري وأجهزة العلاج الطبيعي المتقدمة',
    width: 1800,
    height: 859,
    bytes: 204150,
    sha256: '03e1f28b51632d81050cbc8a2345ef26f853bc0dbee319bd8953be6677786288',
    author: 'Bernhard Lashleyleidner',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:LRMC_Physical,_Occupational_Therapy_Clinics_Help_Service_Members_Recover,_Return_to_Duty_(10036396).jpg'
  }
];
