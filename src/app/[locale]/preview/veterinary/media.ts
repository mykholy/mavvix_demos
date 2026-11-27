export interface PawWellPhoto {
  id: 'vet_exam_dog' | 'feline_checkup' | 'surgical_suite' | 'clinical_lab' | 'weight_intake' | 'kitten_pediatric';
  src: string;
  width: number;
  height: number;
  altAr: string;
  altEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  category: 'canine_wellness' | 'feline_wellness' | 'surgery' | 'diagnostics' | 'intake' | 'pediatrics';
  license: string;
  author: string;
  sourceUrl: string;
  sha256: string;
  byteSize: number;
}

export const PAWWELL_PHOTOS: PawWellPhoto[] = [
  {
    id: 'vet_exam_dog',
    src: '/assets/portfolio/veterinary/vet_exam_dog.webp',
    width: 1800,
    height: 1350,
    altAr: 'صورة فوتوغرافية حقيقية لكلب شيه تزو على طاولة الفحص في عيادة بيطرية مستقلة، لغرض التوجيه الفني فقط',
    altEn: 'Real Shih Tzu dog on examination table at an unrelated veterinary office; editorial photography',
    titleAr: 'الفحص السريري العام للكلاب',
    titleEn: 'Canine Clinical Examination',
    subtitleAr: 'فحص الحواس والمفاصل ومعدل ضربات القلب والتقييم الوقائي الشامل',
    subtitleEn: 'Comprehensive sensory, joint mobility, cardiovascular, and preventive wellness check',
    category: 'canine_wellness',
    license: 'CC0 1.0',
    author: 'MarkBuckawicki',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Veterinary_Office_with_dog.JPG',
    sha256: '7ccbb2933c8864f6029a0fc9c1dd64fdc5c1f006d22124d2f6d195181792c08c',
    byteSize: 103436
  },
  {
    id: 'feline_checkup',
    src: '/assets/portfolio/veterinary/feline_checkup.webp',
    width: 1350,
    height: 1800,
    altAr: 'فحص سريري لقط أليف باستخدام السماعة الطبية البيطرية في بيئة هادئة ومريحة',
    altEn: 'Feline wellness examination with pediatric veterinary stethoscope in a calm environment',
    titleAr: 'الفحص الدوري لصحة القطط',
    titleEn: 'Feline Cardiopulmonary Wellness',
    subtitleAr: 'فحص التنفس والقلب برفق شديد لتقليل توتر القطط أثناء الزيارة',
    subtitleEn: 'Gentle auscultation and low-stress handling tailored to feline comfort',
    category: 'feline_wellness',
    license: 'CC BY 4.0',
    author: 'Veterinarian Pet Alliance',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Stethoscope_examination_of_an_orange_cat_in_Newark,_New_Jersey.jpg',
    sha256: 'b1b3c5947a4a5b6aea1e1cc0b07be7803f5eb285aadfd499cca5acb1b8915e45',
    byteSize: 239420
  },
  {
    id: 'surgical_suite',
    src: '/assets/portfolio/veterinary/surgical_suite.webp',
    width: 1800,
    height: 1350,
    altAr: 'غرفة العمليات الجراحية البيطرية المعقمة مجهزة بإضاءة جراحية وطاولة عمليات حديثة',
    altEn: 'Sterile veterinary surgical operating suite equipped with surgical lighting and procedure table',
    titleAr: 'غرفة العمليات الجراحية المعقمة',
    titleEn: 'Sterile Surgical Procedure Suite',
    subtitleAr: 'معايير تعقيم صارمة، تخدير استنشاقي ومراقبة حيوية مستمرة طوال التدخل',
    subtitleEn: 'Strict surgical asepsis, precision gas anesthesia, and multi-parameter vital monitoring',
    category: 'surgery',
    license: 'CC BY 4.0',
    author: 'Veterinarian Pet Alliance',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Procedure_room_at_a_veterinary_clinic_in_Newark,_New_Jersey.jpg',
    sha256: '8c732aae81a3904ded89624c2adf28d8f82f632b6df03a0ac73f1fcd79f00197',
    byteSize: 102860
  },
  {
    id: 'clinical_lab',
    src: '/assets/portfolio/veterinary/clinical_lab.webp',
    width: 1800,
    height: 1350,
    altAr: 'أجهزة التحليل المخبري الآلية لفحوصات الدم والكيمياء الحيوية بالعيادة البيطرية',
    altEn: 'Automated in-house veterinary laboratory analyzers for hematology and blood chemistry',
    titleAr: 'المختبر السريري والتشخيص الفوري',
    titleEn: 'In-House Diagnostic Laboratory',
    subtitleAr: 'نتائج فورية لعينات الدم والبول ووظائف الكلى والكبد قبل الإجراءات العلاجية',
    subtitleEn: 'Rapid pre-procedural hematology, biochemistry, and organ function panels',
    category: 'diagnostics',
    license: 'CC BY 4.0',
    author: 'Veterinarian Pet Alliance',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Laboratory_analyzers_at_a_veterinary_clinic_in_Newark,_New_Jersey.jpg',
    sha256: '5cb6491f882c6dc803307c44a0e95c0c71287914007343aa12cb5ca8d85ddf0d',
    byteSize: 223222
  },
  {
    id: 'weight_intake',
    src: '/assets/portfolio/veterinary/weight_intake.webp',
    width: 1350,
    height: 1800,
    altAr: 'كلب يقف على ميزان أرضي إلكتروني عريض لقياس الوزن في محطة الفحص الأولي بالعيادة',
    altEn: 'Dog standing on a wide electronic floor scale at clinic initial triage station',
    titleAr: 'محطة الفرز والوزن الدقيق',
    titleEn: 'Objective Weight & Vital Triage',
    subtitleAr: 'متابعة دقيقة لمنحنيات الوزن وتحديد جرعات الأدوية واللقاحات بأعلى دقة',
    subtitleEn: 'Accurate weight tracking essential for medication dosing and nutritional guidance',
    category: 'intake',
    license: 'CC BY 4.0',
    author: 'Veterinarian Pet Alliance',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dog_on_a_veterinary_floor_scale_in_Newark,_New_Jersey.jpg',
    sha256: '9d14f5e357643865b19160c08cecc339bcac61563f182760972e7d5602c80052',
    byteSize: 376538
  },
  {
    id: 'kitten_pediatric',
    src: '/assets/portfolio/veterinary/kitten_pediatric.webp',
    width: 1350,
    height: 1800,
    altAr: 'قطة صغيرة مسنودة برفق على منشفة ناعمة فوق طاولة الفحص الطبي لتهدئتها',
    altEn: 'Young kitten gently supported on a soft towel atop an examination table for low-stress care',
    titleAr: 'رعاية حديثي الولادة والمواليد',
    titleEn: 'Pediatric Feline Development',
    subtitleAr: 'بروتوكولات الفحص الخالية من الخوف وتأسيس المناعة والتغذية الصحيحة',
    subtitleEn: 'Fear-free pediatric handling, maternal immunity transition, and early socialization',
    category: 'pediatrics',
    license: 'CC BY 4.0',
    author: 'Veterinarian Pet Alliance',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Kitten_supported_on_a_towel-covered_examination_table_in_Newark,_New_Jersey.jpg',
    sha256: '7ac34e94970e3efe727a2dc621942086bc6412c07347e0550a70b37c7c6a533f',
    byteSize: 187662
  }
];

export function getPawWellPhoto(id: PawWellPhoto['id']): PawWellPhoto {
  const p = PAWWELL_PHOTOS.find(item => item.id === id);
  if (!p) throw new Error(`Unknown PawWell photo: ${id}`);
  return p;
}
