export interface NomadMediaAsset {
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

export const NOMAD_MEDIA_COLLECTION: readonly NomadMediaAsset[] = [
  {
    id: 'nomad-luxor-balloon',
    local: '/assets/portfolio/travel-agency/luxor_balloon.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Floating_over_the_Valley_of_the_Kings,_Luxor,_Egypt_(54480104477).jpg',
    author: 'Mustang Joe',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sha256: '0554d589f8bb5dc2b4e7862073891e190c5fd969b6475710645276cae03753f0',
    dimensions: '1800x1201',
    bytes: 139958,
    alt: {
      ar: 'منطاد فوق وادي الملوك بالأقصر — صورة تحريرية وليست نشاطًا محجوزًا',
      en: 'Hot-air balloon above the Valley of the Kings, Luxor — editorial photograph, not a booked activity'
    },
    caption: {
      ar: 'إطلالة جوية على وادي الملوك والضفة الغربية بالأقصر عند شروق الشمس',
      en: 'Sunrise hot-air balloon drift overlooking the Valley of the Kings and Theban West Bank'
    }
  },
  {
    id: 'nomad-giza-pyramids',
    local: '/assets/portfolio/travel-agency/giza_pyramids.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:All_Gizah_Pyramids.jpg',
    author: 'Ricardo Liberato',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    sha256: '2192f46628fe123ac40a2f131b02ceee7e3d8102215681d9caadda09d0808024',
    dimensions: '1800x1196',
    bytes: 321528,
    alt: {
      ar: 'هضبة أهرامات الجيزة، صورة تحريرية مستقلة',
      en: 'Giza Pyramids archaeological plateau, independent editorial photograph'
    },
    caption: {
      ar: 'أهرامات الجيزة الخالدة تمثل عمق التراث المعماري والحضاري لمصر القديمة',
      en: 'The Giza plateau pyramids anchoring classical antiquities and architectural heritage'
    }
  },
  {
    id: 'nomad-aswan-nile',
    local: '/assets/portfolio/travel-agency/aswan_nile.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Egypt_(Aswan)_A_sunset_view_of_a_Mosque_and_feluccas_on_the_Nile_River_(25743016964).jpg',
    author: 'Güldem Üstün',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sha256: '4b5a2ad19c3605d54fc760cf817d4807268c8140a8e3c495c1235bc1a4abe990',
    dimensions: '1800x1336',
    bytes: 145566,
    alt: {
      ar: 'غروب النيل في أسوان وقوارب الفلوكة الشراعية، صورة تحريرية مستقلة',
      en: 'Aswan Nile sunset with traditional felucca sailboats, independent editorial photograph'
    },
    caption: {
      ar: 'الإبحار الشراعي الهادئ في نهر النيل بأسوان مع انعكاسات الغروب الدافئة',
      en: 'Traditional wooden felucca sailing on the Nile at sunset in historic Aswan'
    }
  },
  {
    id: 'nomad-red-sea-reef',
    local: '/assets/portfolio/travel-agency/red_sea_reef.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Pez_estandarte_del_mar_Rojo_(Heniochus_intermedius),_mar_Rojo,_Egipto,_2023-04-15,_DD_36.jpg',
    author: 'Diego Delso',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: 'b4bb176ff08eadba8a0ff6b5d64d3c76e2299ca6e40eb795fb16edebd3dc3720',
    dimensions: '1800x1800',
    bytes: 264604,
    alt: {
      ar: 'الشعاب المرجانية والأسماك في البحر الأحمر، صورة تحريرية مستقلة',
      en: 'Red Sea coral reef and endemic marine wildlife, independent editorial photograph'
    },
    caption: {
      ar: 'التنوع البيولوجي الفريد والشعاب المرجانية المحمية على سواحل البحر الأحمر',
      en: 'Protected coastal coral ecosystem and endemic butterflyfish in the Red Sea'
    }
  },
  {
    id: 'nomad-alula-hegra',
    local: '/assets/portfolio/travel-agency/alula_hegra.webp',
    sourcePage: "https://commons.wikimedia.org/wiki/File:Qasr_al-Farid,_a_1st-century_AD_Nabatean_unfinished_tomb_carved_into_a_giant_boulder_in_Hegra_(Mada'in_Salih),_the_kingdom's_second_Nabatean_capital_after_Petra,_Saudi_Arabia_-_53535089614.jpg",
    author: 'Carole Raddato',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    sha256: 'e3225d0834f60c7d1f92b7a626c6305feaae0be8c4e1a44a7e310d4d6d4d7dcb',
    dimensions: '1800x1201',
    bytes: 223042,
    alt: {
      ar: 'قصر الفريد ومدائن صالح بالحجر في العلا، صورة تحريرية مستقلة',
      en: 'Qasr al-Farid Nabatean monolithic monument at Hegra in AlUla, independent editorial photograph'
    },
    caption: {
      ar: 'قصر الفريد المنحوت في الصخر الرملي بمدائن صالح (الحِجر)، أول موقع تراث عالمي لليونسكو في السعودية',
      en: 'Qasr al-Farid monolithic tomb carved into desert sandstone at Hegra, UNESCO World Heritage site'
    }
  },
  {
    id: 'nomad-jeddah-balad',
    local: '/assets/portfolio/travel-agency/jeddah_balad.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Jeddah_-_55362179623.jpg',
    author: 'xiquinhosilva',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sha256: 'ee8dc2cf8b40965b170e705f3ec7c3fd720aaa3f2508d9c9f4f2db3b11887eb4',
    dimensions: '1800x1200',
    bytes: 151302,
    alt: {
      ar: 'العمارة الحجازية التاريخية في جدة البلد، صورة تحريرية مستقلة',
      en: 'Historic Jeddah Al-Balad traditional coral architecture and Rawashin, independent editorial photograph'
    },
    caption: {
      ar: 'بيوت جدة التاريخية برواشينها الخشبية الأصيلة وبنائها المرجاني في حي البلد العريق',
      en: 'Traditional multi-story coral stone townhouses with intricate wooden Rawashin in Al-Balad'
    }
  }
];
