export type LexoraPhotoId =
  | 'legal_library'
  | 'contract_signing'
  | 'courthouse_columns'
  | 'arbitration_chamber'
  | 'statutory_archive'
  | 'scales_of_justice';

export interface LexoraPhoto {
  id: LexoraPhotoId;
  src: string;
  width: number;
  height: number;
  altAr: string;
  altEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  category: 'jurisprudence' | 'contracts' | 'disputes' | 'governance';
  license: string;
  licenseUrl: string;
  author: string;
  sourceUrl: string;
  sha256: string;
  byteSize: number;
}

export const LEXORA_PHOTOS: LexoraPhoto[] = [
  {
    id: 'legal_library',
    src: '/assets/portfolio/law-firm/legal_library.webp',
    width: 1800,
    height: 1406,
    altAr: 'مجلدات تقارير قانونية كلاسيكية مجلدة بجلد طبيعي في مكتبة فقهية تحريرية لديفيد ويلان',
    altEn: 'Classical bound law reports and jurisprudence volumes in an editorial legal library by David Whelan',
    titleAr: 'مكتبة الفقه والتقارير القانونية',
    titleEn: 'Jurisprudence & Statutory Archive',
    subtitleAr: 'تقارير قضائية تاريخية ومصادر فقهية راسخة تدعم التأصيل القانوني السليم',
    subtitleEn: 'Historical court reports and foundational jurisprudence supporting doctrinal clarity',
    category: 'jurisprudence',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    author: 'David Whelan',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Canadian_law_books_(31460630695).jpg',
    sha256: 'dacb14e4ca86557d6442b8abe0d054e7c6292bce520b78d3d39562376d270256',
    byteSize: 173020
  },
  {
    id: 'contract_signing',
    src: '/assets/portfolio/law-firm/contract_signing.webp',
    width: 1800,
    height: 1350,
    altAr: 'توقيع اتفاقية تجارية رسمية بقلم حبر على وثيقة تعاقدية بدرجات لونية دافئة',
    altEn: 'Formal execution of commercial contract agreement with fountain pen in warm editorial tones',
    titleAr: 'صياغة واعتماد العقود التجارية',
    titleEn: 'Commercial Contract Execution',
    subtitleAr: 'مراجعة دقيقة لالتزامات الأطراف وآليات إنهاء العلاقة والمسؤولية التعاقدية قبل التوقيع',
    subtitleEn: 'Meticulous review of party obligations, termination clauses, and liability bounds before execution',
    category: 'contracts',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    author: 'Blogtrepreneur',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Legal_Contract_%26_Signature_-_Warm_Tones.jpg',
    sha256: '9b696407a89cd2c130ca68a26809265829176583d24c36cc81f4bcaf02e8a01e',
    byteSize: 123226
  },
  {
    id: 'courthouse_columns',
    src: '/assets/portfolio/law-firm/courthouse_columns.webp',
    width: 1800,
    height: 1350,
    altAr: 'أعمدة كلاسيكية رخامية وصرح قضائي مهيب يجسد سلطة القضاء والمحاكم العليا',
    altEn: 'Neoclassical architectural columns of a supreme court reflecting judicial dignity and authority',
    titleAr: 'محاريب العدالة والمحاكم العليا',
    titleEn: 'Judicial Venues & Superior Courts',
    subtitleAr: 'فهم عميق للاختصاص القضائي والمساطر الإجرائية للمحاكم المدنية والتجارية',
    subtitleEn: 'Deep structural command of procedural rules and jurisdiction in civil and commercial litigation',
    category: 'disputes',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    author: 'Mjrmtg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Supreme_Court_of_Florida.JPG',
    sha256: '2b11bc2f9e5c8bc34bd2946c58f1531b048888fb39f1376b4ab97d57311f1d3d',
    byteSize: 205906
  },
  {
    id: 'arbitration_chamber',
    src: '/assets/portfolio/law-firm/arbitration_chamber.webp',
    width: 1616,
    height: 1080,
    altAr: 'قاعة مداولات وتحكيم تجاري رسمية مجهزة بطاولة اجتماعات تنفيذية ومقاعد مريحة',
    altEn: 'Executive commercial arbitration hearing chamber and dispute settlement conference table',
    titleAr: 'قاعة جلسات التحكيم والتسوية الودية',
    titleEn: 'Commercial Arbitration Hearing Suite',
    subtitleAr: 'إدارة متخصصة لفض منازعات الأعمال المعقدة والوساطة البديلة تحت مظلات التحكيم الإقليمية والدولية',
    subtitleEn: 'Specialized handling of complex commercial disputes and mediation under regional arbitration rules',
    category: 'disputes',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    author: 'Nick Young',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cedars_Society_(36292295446).jpg',
    sha256: '4cafccfe0413216b7d3846765a4316ca2c93332e912963a0ec50e973a04ca139',
    byteSize: 68182
  },
  {
    id: 'statutory_archive',
    src: '/assets/portfolio/law-firm/statutory_archive.webp',
    width: 1350,
    height: 1800,
    altAr: 'أرفف مكتبة القانون التاريخية بجامعة ييل تحتوي على مصنفات التشريعات والقوانين المقارنة',
    altEn: 'Historical law library book stacks at Yale Law Library with statutory compendiums and civil law treatises',
    titleAr: 'أرشيف التشريعات والأنظمة المقارنة',
    titleEn: 'Comparative Statutory Library',
    subtitleAr: 'توثيق دقيق للمتون القانونية والمراسيم الملكية واللوائح التنفيذية عبر النظم القانونية',
    subtitleEn: 'Systematic reference to statutory texts, royal decrees, and executive regulations across jurisdictions',
    category: 'jurisprudence',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    author: 'Yale Law Library',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Flickr_-_Yale_Law_Library_-_France_47_G767-1.jpg',
    sha256: '17c97b4be661d12b8c1fd7fa59f02664732e35912ce0125d2ec56e9708b882e2',
    byteSize: 525998
  },
  {
    id: 'scales_of_justice',
    src: '/assets/portfolio/law-firm/scales_of_justice.webp',
    width: 1800,
    height: 1201,
    altAr: 'تمثال برونزي لسيدة العدالة يمسك بميزان العدالة المتزن، رمزًا للإنصاف والنزاهة القانونية',
    altEn: 'Classical bronze sculpture of Lady Justice holding balanced scales, symbolizing equity and legal integrity',
    titleAr: 'ميزان العدالة والحوكمة الأخلاقية',
    titleEn: 'Scales of Justice & Legal Ethics',
    subtitleAr: 'الالتزام التام بالمعايير المهنية وأخلاقيات ممارسة المحاماة وحماية مصالح الموكلين',
    subtitleEn: 'Uncompromising adherence to professional standards, legal ethics, and fiduciary duties',
    category: 'governance',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'Shutterbug / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Close-up_of_Lady_Justice_statue_holding_scales,_symbolizing_justice_and_fairness.jpg',
    sha256: '4a28880416be76f35feeb16f436f345254f58de2e84d21ed0efb414a6211d754',
    byteSize: 87308
  }
];

export function getLexoraPhoto(id: LexoraPhotoId): LexoraPhoto {
  const photo = LEXORA_PHOTOS.find(p => p.id === id);
  if (!photo) {
    throw new Error(`Lexora photo not found for id: ${id}`);
  }
  return photo;
}
