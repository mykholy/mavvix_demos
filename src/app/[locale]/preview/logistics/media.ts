export interface RouteLineMediaAsset {
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

export const ROUTELINE_MEDIA_COLLECTION: readonly RouteLineMediaAsset[] = [
  {
    id: 'routeline-singapore-terminal',
    local: '/assets/portfolio/logistics/terminal.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Shipping_terminal_in_Singapore_(Unsplash).jpg',
    author: 'chuttersnap',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sha256: 'af6d0bbf9427327178951c34ca710379f1ca24b5f1f3fa8919e290e2c856bf96',
    dimensions: '1600x1067',
    bytes: 469208,
    alt: {
      ar: 'صورة جوية لمحطة حاويات في سنغافورة، لا تمثل منشأة روت لاين',
      en: 'Aerial container terminal in Singapore, not a RouteLine facility'
    },
    caption: {
      ar: 'محطة حاويات بحرية دولية تمثل مراكز الربط والعبور اللوجستي العالمي',
      en: 'International container transshipment terminal illustrating global maritime flow'
    }
  },
  {
    id: 'routeline-container-vessel',
    local: '/assets/portfolio/logistics/container_vessel.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:MSC_HARMONY_III_(container_ship,_2006)_in_Port_Koper_(SIKOP,_2024).jpg',
    author: 'Petar Milošević',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: '3f44d46da1826d37a0567b9f1d5d374466358f07442575cffd2b2e20f3e7adba',
    dimensions: '1800x1183',
    bytes: 378956,
    alt: {
      ar: 'سفينة نقل حاويات بحرية ضخمة تدخل الميناء التجاري، صورة تحريرية مستقلة',
      en: 'Major ocean container vessel arriving at commercial port, editorial photo'
    },
    caption: {
      ar: 'سفينة خطوط ملاحية منتظمة للشحن البحري بحاويات FCL و LCL عبر الممرات الرئيسية',
      en: 'Liner container vessel providing scheduled FCL and LCL ocean connections'
    }
  },
  {
    id: 'routeline-air-freighter',
    local: '/assets/portfolio/logistics/air_freighter.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Evergreen_B747F_-_Cargo-In-Cargo-Out_DVIDS171689.jpg',
    author: 'Lance Cheung (US Air Force / DOD)',
    license: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sha256: 'f2b17640d0ef6293c6ef08e3a813638176e01bb4eb60e43d0a7e08507d7678d8',
    dimensions: '1800x2611',
    bytes: 350538,
    alt: {
      ar: 'تحميل منصات الشحن الجوي في طائرة شحن تجارية، صورة تحريرية مستقلة',
      en: 'Air cargo freighter receiving standardized aircraft pallets, editorial photograph'
    },
    caption: {
      ar: 'عمليات مناولة الشحن الجوي السريع وتحميل المنصات الموحدة على متن طائرة الشحن',
      en: 'Air freight tarmac operations with main-deck palletized freight handling'
    }
  },
  {
    id: 'routeline-highway-fleet',
    local: '/assets/portfolio/logistics/highway_fleet.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Container_trucks_on_an_American_highway.jpg',
    author: 'futureatlas.com',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sha256: '1b776e982cc1cc6be53cb4181ab78ab86a8eb26c37fd021591ef6d4b9746b16e',
    dimensions: '1062x706',
    bytes: 61902,
    alt: {
      ar: 'شاحنات نقل بري ثقيل تحمل حاويات شحن على الطريق السريع، صورة تحريرية',
      en: 'Intermodal container freight trucks on highway, independent editorial image'
    },
    caption: {
      ar: 'أسطول النقل البري لنقل الحاويات وشحنات FTL بين الموانئ والمستودعات الإقليمية',
      en: 'Heavy road transport fleet for intermodal container hauling and FTL routes'
    }
  },
  {
    id: 'routeline-quay-cranes',
    local: '/assets/portfolio/logistics/quay_cranes.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Waalhaven_-_Uniport_-_Port_of_Rotterdam_-_east_quay_-_port_crane_6.jpg',
    author: 'AgainErick',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: '896c9176b2aaa523bdd3d1187707bdee8b1741ef101e9cd185df14d62c54f5f6',
    dimensions: '1800x1350',
    bytes: 268620,
    alt: {
      ar: 'رافعات رصيف الحاويات العملاقة في ميناء تجاري دولي، صورة تحريرية',
      en: 'Heavy quay gantry cranes handling maritime containers at international port'
    },
    caption: {
      ar: 'رافعات رصيف الموانئ العملاقة لعمليات التفريغ والمناولة السريعة على مدار الساعة',
      en: 'Quayside container gantry cranes engineered for continuous round-the-clock discharge'
    }
  },
  {
    id: 'routeline-intermodal-hub',
    local: '/assets/portfolio/logistics/intermodal_hub.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Intermodal_terminal_loading.jpg',
    author: 'David Wilson from Oak Park, Illinois, USA',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sha256: 'f29861e712cef2553d72f62e65902f6323fd3aaa122ee9cb6c5c859672122e4e',
    dimensions: '1800x1350',
    bytes: 241202,
    alt: {
      ar: 'محطة مناولة ونقل متعدد الوسائط بين الشاحنات والقطارات، صورة تحريرية',
      en: 'Intermodal freight transfer hub facilitating rail and road interchange'
    },
    caption: {
      ar: 'محطة الربط متعدد الوسائط للتحويل السلس بين النقل بالسكك الحديدية والشاحنات',
      en: 'Intermodal interchange facility bridging dry-port rail freight and highway trucking'
    }
  }
];
