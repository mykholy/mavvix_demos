export interface ElyraMediaAsset {
  id: string;
  local: string;
  sourcePage: string;
  author: string;
  license: string;
  licenseUrl: string;
  sha256: string;
  dimensions: string;
  bytes: number;
  alt: {
    ar: string;
    en: string;
  };
  caption: {
    ar: string;
    en: string;
  };
}

export const ELYRA_MEDIA_COLLECTION: readonly ElyraMediaAsset[] = [
  {
    id: 'elyra-room',
    local: '/assets/portfolio/skin-clinic/room.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Modern_medical_examination_room.jpg',
    author: 'Shixart1985 (Nenad Stojković)',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sha256: '2edffa3d4e096a5fa89c76ffd268b4ad1372ba7aa7021ddc865002e96cf3e23a',
    dimensions: '1600x1068',
    bytes: 100834,
    alt: {
      ar: 'غرفة فحص طبية حديثة في صورة تحريرية مستقلة، لا تمثل منشآت إيليرا',
      en: 'Modern medical examination room, independent editorial photograph, not Elyra premises'
    },
    caption: {
      ar: 'جناح الاستشارة الجلدية السريرية المخصص للفحص الطبي الهادئ',
      en: 'Clinical dermatology consultation suite designed for tranquil patient review'
    }
  },
  {
    id: 'elyra-device',
    local: '/assets/portfolio/skin-clinic/device.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Dermascope.jpg',
    author: 'Whispyhistory',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: 'eb959b581f847f7ace47ff9c9216858a55d9f4004ebe4e3d402b1db6b44a11b6',
    dimensions: '1600x1414',
    bytes: 282370,
    alt: {
      ar: 'جهاز فحص الجلد في صورة تحريرية مستقلة، لا يمثل معدات عيادة إيليرا',
      en: 'Dermatoscope in an independent editorial photograph, not Elyra equipment'
    },
    caption: {
      ar: 'منظار جلدي عالي الدقة لفحص بنية الآفات السطحية بدقة متناهية',
      en: 'High-resolution dermatoscope for evaluating surface pigment architecture'
    }
  },
  {
    id: 'elyra-treatment-suite',
    local: '/assets/portfolio/skin-clinic/treatment_suite.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Bright_and_modern_beauty_treatment_room.jpg',
    author: 'Shixart1985 (Nenad Stojković)',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sha256: '9219e75ac2cb4c686327cff3b57fa00bf204a03535c489d4da8b65af0e0f140c',
    dimensions: '1800x1201',
    bytes: 95432,
    alt: {
      ar: 'جناح علاجي تجميلي حديث، صورة تحريرية مستقلة لا تمثل منشأة تجارية',
      en: 'Bright and modern aesthetic treatment suite, independent editorial photography'
    },
    caption: {
      ar: 'جناح الإجراءات غير الجراحية وتجديد نضارة البشرة مع مقعد سريري مريح',
      en: 'Dedicated non-invasive treatment room with ergonomic clinical positioning'
    }
  },
  {
    id: 'elyra-consultation-room',
    local: '/assets/portfolio/skin-clinic/consultation_room.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Clean_medical_room_with_blue_treatment_chair_and_medical_equipment_in_a_quiet_clinic_setting.jpg',
    author: 'Shixart1985 (Nenad Stojković)',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sha256: '3b9fe89c68f3c6c8bdf2de7012ba2028c51fa20c20b21454a03a9e804a14a6a1',
    dimensions: '1800x1201',
    bytes: 83322,
    alt: {
      ar: 'غرفة استشارة جلدية مجهزة بمقعد علاجي، صورة تحريرية مستقلة',
      en: 'Clinical consultation room with ergonomic treatment chair, editorial photograph'
    },
    caption: {
      ar: 'بيئة استشارية متكاملة لتقييم الحالات المزمنة ومناقشة الخيارات',
      en: 'Integrated clinical environment for assessing chronic concerns and options'
    }
  },
  {
    id: 'elyra-dermatoscope-optic',
    local: '/assets/portfolio/skin-clinic/dermatoscope_optic.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:IDS-1100_Dermatoscope.jpg',
    author: 'Abessemans94',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: '7d22a096544a24fa8abbb9b3293b59207fdfd0470c4aa89452b03e3546bf41e6',
    dimensions: '1800x1800',
    bytes: 140362,
    alt: {
      ar: 'منظار جلدي بصري عالي الدقة لفحص الآفات الجلدية، صورة تحريرية مستقلة',
      en: 'High-resolution optical dermatoscope for skin surface inspection, editorial photo'
    },
    caption: {
      ar: 'بصريات استقطابية متقدمة للكشف المبكر والمتابعة السنوية للشامات',
      en: 'Advanced cross-polarized optics for precision baseline lesion monitoring'
    }
  },
  {
    id: 'elyra-aesthetic-lounge',
    local: '/assets/portfolio/skin-clinic/aesthetic_lounge.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Interior_of_Snow_Clinic_Ansan_branch_in_March_2026.jpg',
    author: 'ELIZABETH XIONG',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sha256: '18a3984a49419cce5d26a83ed4f347d4e50dfc3ac5bf60e4376aa79a934cea0c',
    dimensions: '1800x1350',
    bytes: 158724,
    alt: {
      ar: 'صالة استقبال هادئة ومريحة لعيادة جلدية، صورة تحريرية مستقلة',
      en: 'Tranquil and minimal aesthetic dermatology clinic lounge, editorial photography'
    },
    caption: {
      ar: 'مساحة استرخاء واستقبال تعكس الخصوصية والسكينة قبل اللقاء الطبي',
      en: 'Quiet reception lounge embodying privacy and stillness before clinical visits'
    }
  }
];
