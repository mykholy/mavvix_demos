export type TradeBridgePhotoId =
  | 'tradebridge-warehouse'
  | 'tradebridge-stock'
  | 'tradebridge-forklift'
  | 'tradebridge-pallets'
  | 'tradebridge-highbay'
  | 'tradebridge-inventory';

export interface TradeBridgePhoto {
  id: TradeBridgePhotoId;
  src: string;
  width: number;
  height: number;
  altAr: string;
  altEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  category: 'logistics' | 'storage' | 'packaging' | 'automation';
  license: string;
  licenseUrl: string;
  author: string;
  sourceUrl: string;
  sha256: string;
  byteSize: number;
}

export const TRADEBRIDGE_PHOTOS: TradeBridgePhoto[] = [
  {
    id: 'tradebridge-warehouse',
    src: '/assets/portfolio/wholesale/warehouse.webp',
    width: 1600,
    height: 781,
    altAr: 'مركز توزيع لوجستي وتوريد إقليمي في صورة تحريرية مستقلة توثق أروقة المستودعات الحديثة',
    altEn: 'Modern regional distribution center and wholesale logistics facility in editorial photograph',
    titleAr: 'مركز التوزيع والفرز اللوجستي',
    titleEn: 'Regional Distribution Center',
    subtitleAr: 'بنية تحتية لتنظيم تدفق البضائع بالجملة وإدارة التحميل وجداول التوزيع التجاري',
    subtitleEn: 'High-throughput distribution infrastructure managing bulk flow and dispatch schedules',
    category: 'logistics',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'Rsherwin',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Warehouse_distribution-center-1136510.jpg',
    sha256: '17c687f61aac1cd9bb1b7f02bc1e3bc916edf0e341add6a869ba42d1168f6063',
    byteSize: 501296
  },
  {
    id: 'tradebridge-stock',
    src: '/assets/portfolio/wholesale/stock.webp',
    width: 1600,
    height: 900,
    altAr: 'أرفف مستودعات تجارية منظمة بكراتين موحدة للشحن والتخزين الآمن',
    altEn: 'Organized commercial warehouse racking with standardized shipping cartons and inventory',
    titleAr: 'منظومة التخزين والرفوف الموحدة',
    titleEn: 'Standardized High-Bay Racking',
    subtitleAr: 'أرفف تخزين ثقيلة تضمن كفاءة المساحة وسرعة التجهيز للطلبات الإجمالية',
    subtitleEn: 'Heavy-duty storage racking ensuring volumetric efficiency and fast carton staging',
    category: 'storage',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    author: 'ProjectManhattan',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Warehouse_goods.jpg',
    sha256: '1fa2f12012334f66091d52d42592caa63a4a3e25ac3f2f716af2afe0873af838',
    byteSize: 339052
  },
  {
    id: 'tradebridge-forklift',
    src: '/assets/portfolio/wholesale/forklift.webp',
    width: 1800,
    height: 1192,
    altAr: 'رافعات شوكية ومشغلو مستودعات ينقلون منصات الشحن الخشبية داخل مستودع بضائع إقليمي',
    altEn: 'Forklift operators handling loaded Euro-pallets inside a regional distribution warehouse',
    titleAr: 'مناولة المنصات والرافعات الميكانيكية',
    titleEn: 'Pallet Handling & Heavy Material Staging',
    subtitleAr: 'عمليات مناولة صناعية آمنة تدعم الشحن السريع والتفريغ الدقيق للمركبات الثقيلة',
    subtitleEn: 'Industrial-grade mechanical handling accelerating loading and freight vehicle turnarounds',
    category: 'logistics',
    license: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    author: 'Flickr / USDAgov',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Workers_drive_Forkloaders_laden_with_USAID_goods_inside_a_large_warehouse_-_20110826-FS-LSC-0108_-_Flickr_-_USDAgov.jpg',
    sha256: '043a5806dbd8fbf7f01c232f53de26ad902edaa8fdaa18ebbbf6bfb11efd263a',
    byteSize: 623804
  },
  {
    id: 'tradebridge-pallets',
    src: '/assets/portfolio/wholesale/pallets.webp',
    width: 1800,
    height: 1175,
    altAr: 'منصات شحن خشبية مكدسة بكراتين كرتونية ملفوفة بالبلاستيك ومجهزة للشحن الدولي',
    altEn: 'Stretch-wrapped Euro pallets stacked with master cartons staged for freight dispatch',
    titleAr: 'تغليف وتثبيت البالتات للتوزيع',
    titleEn: 'Standard Euro-Pallet Stretch Wrapping',
    subtitleAr: 'تثبيت وتغليف عالي الكثافة يحمي البضائع أثناء النقل البري والتخزين الطويل',
    subtitleEn: 'High-tension shrink-wrapping and edge protection guarding bulk freight in transit',
    category: 'packaging',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'UNICEF / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:UNICEF_pallets_01.jpg',
    sha256: '3f30bd3ebbf7fb71f5dfd33bc72edfc4a094209c559430a9376fde7b702ad7c6',
    byteSize: 229600
  },
  {
    id: 'tradebridge-highbay',
    src: '/assets/portfolio/wholesale/highbay.webp',
    width: 1800,
    height: 905,
    altAr: 'مستودع آلي عالي الارتفاع مع رافعات استرجاع أوتوماتيكية للفرز الفائق',
    altEn: 'Automated high-bay warehouse corridor with automated stacker cranes',
    titleAr: 'المستودعات الذكية والرفع الآلي',
    titleEn: 'Automated High-Bay Storage Corridors',
    subtitleAr: 'تقنيات التخزين الرأسي المؤتمت لزيادة الكثافة وتقليل زمن استرجاع البضائع',
    subtitleEn: 'Automated vertical retrieval maximizing cubic storage efficiency and order turnaround',
    category: 'automation',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'KlausFoehl',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Automatisches_Hochregallager_mit_Regalbedienger%C3%A4ten.jpg',
    sha256: '86e8d766bd5104a029b6754a247679e7eb9a8a784739b1a03240420b3b27ad1e',
    byteSize: 221698
  },
  {
    id: 'tradebridge-inventory',
    src: '/assets/portfolio/wholesale/inventory.webp',
    width: 1800,
    height: 1243,
    altAr: 'عنابر تخزين واسعة تحتوي على مخزون منظم وبضائع تجارية جاهزة للتوزيع الفوري',
    altEn: 'Expansive inventory floor with organized bulk supplies staged for regional distribution',
    titleAr: 'عنابر المخزون التجاري الجاهز',
    titleEn: 'Ready-to-Dispatch Commercial Inventory Floor',
    subtitleAr: 'مساحات فسيحة مخصصة للتحضير السريع لشحنات البيع بالجملة وطلبيات التوزيع الكبرى',
    subtitleEn: 'Staging ground for rapid bulk consolidation, multi-lot pick-and-pack, and FTL dispatch',
    category: 'storage',
    license: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    author: 'Flickr / USDAgov',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:A_warehouse_full_of_USAID_goods_-_20110826-FS-LSC-0051_-_Flickr_-_USDAgov.jpg',
    sha256: '3a8a58a4dc9cfa85933e621c3dc28e3e7de732bc36586c16d682306bc4cc19f0',
    byteSize: 425478
  }
];
