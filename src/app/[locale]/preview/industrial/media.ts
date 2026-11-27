/**
 * Ferroline Industrial Metallurgy & Precision Manufacturing
 * Authoritative Licensed Media Manifest & Type Definitions
 */

export interface FerrolinePhoto {
  id: 'foundry' | 'cnc' | 'laser' | 'welding' | 'pipes' | 'coils';
  filename: string;
  url: string;
  category: 'foundry' | 'machining' | 'fabrication' | 'robotics' | 'extrusion' | 'materials';
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

export const ferrolinePhotos: FerrolinePhoto[] = [
  {
    id: 'foundry',
    filename: 'foundry.webp',
    url: '/assets/portfolio/industrial/foundry.webp',
    category: 'foundry',
    titleEn: 'Foundry Molten Steel Inoculation & Ladle Pouring',
    titleAr: 'صب وتلقيح الصلب المصهور في مرجل السبك الحراري',
    width: 1800,
    height: 2317,
    bytes: 176110,
    sha256: '50c174219becb669698b2f9b709316c6358c7ca9a99f58bbfaf2b6df69b5a07a',
    author: 'Alfred T. Palmer',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Allegheny_Ludlum_foundry_ladle.jpg'
  },
  {
    id: 'cnc',
    filename: 'cnc.webp',
    url: '/assets/portfolio/industrial/cnc.webp',
    category: 'machining',
    titleEn: '5-Axis CNC Precision Metallurgy Milling & Multi-Spindle Turning',
    titleAr: 'تشغيل وتفريز المعادن عالي الدقة خماسي المحاور (CNC)',
    width: 1800,
    height: 1200,
    bytes: 174672,
    sha256: '1fef82dfe814927eca2b9c669931b38296dd65d52ffe6c55f2543de9236209fc',
    author: 'Jokkx',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:5_axis_cnc_machining.jpg'
  },
  {
    id: 'laser',
    filename: 'laser.webp',
    url: '/assets/portfolio/industrial/laser.webp',
    category: 'fabrication',
    titleEn: 'High-Power Fiber Laser Metal Sheet & Profile Cutting',
    titleAr: 'قص ألواح الصلب بألياف الليزر الصناعي فائق الدقة',
    width: 1800,
    height: 1350,
    bytes: 197750,
    sha256: '96ab41c988d781239bc2225218f1f75754ceee4eefd9e300d4636efd8e736a37',
    author: 'S zillayali',
    license: 'CC BY 3.0 Unported',
    source: 'https://commons.wikimedia.org/wiki/File:CNC_Laser_Cutting_Machine.jpg'
  },
  {
    id: 'welding',
    filename: 'welding.webp',
    url: '/assets/portfolio/industrial/welding.webp',
    category: 'robotics',
    titleEn: 'Automated 6-Axis Robotic Welding Cells & Seam Tracking',
    titleAr: 'خلايا اللحام الروبوتي الآلي سداسي المحاور',
    width: 1800,
    height: 1350,
    bytes: 242158,
    sha256: '5406217bd199848e8b37e855674e133468a868c23148226bb57aa873b926ecde',
    author: 'Phasmatisnox',
    license: 'CC BY 3.0 Unported',
    source: 'https://commons.wikimedia.org/wiki/File:FANUC_6-axis_welding_robots.jpg'
  },
  {
    id: 'pipes',
    filename: 'pipes.webp',
    url: '/assets/portfolio/industrial/pipes.webp',
    category: 'extrusion',
    titleEn: 'High-Pressure Seamless Steel Pipes & Tubular Structural Sections',
    titleAr: 'مواسير وأنابيب الصلب غير الملحومة فائقة التحمل',
    width: 1706,
    height: 1279,
    bytes: 186096,
    sha256: '1dd8bb844eca955f27ffbdcc9462f8b5f4abd4c918195a21bcda1ae21ea198d4',
    author: 'Seamless Steel Pipes',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:Seamless_Steel_Pipes.jpg'
  },
  {
    id: 'coils',
    filename: 'coils.webp',
    url: '/assets/portfolio/industrial/coils.webp',
    category: 'materials',
    titleEn: 'Galvanized & Coated Heavy Steel Coils Logistics Warehouse',
    titleAr: 'مستودع لفائف وألواح الصلب المعالج والمجلفن',
    width: 1800,
    height: 1350,
    bytes: 519656,
    sha256: '1165de62a69c2a3fb67e19f39fd713748e4d5dea5e60432d301bc1258cdff7b2',
    author: 'Fumikas Sagisavas',
    license: 'CC0 1.0 Universal',
    source: 'https://commons.wikimedia.org/wiki/File:Colored_steel_coils.jpg'
  }
];

export const getFerrolinePhoto = (id: FerrolinePhoto['id']): FerrolinePhoto => {
  return ferrolinePhotos.find((p) => p.id === id) || ferrolinePhotos[0];
};
