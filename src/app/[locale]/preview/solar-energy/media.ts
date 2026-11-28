export type VoltEdgePhotoId =
  | 'voltedge-farm'
  | 'voltedge-rooftop'
  | 'voltedge-utility'
  | 'voltedge-commercial'
  | 'voltedge-inverter'
  | 'voltedge-survey';

export interface VoltEdgePhoto {
  id: VoltEdgePhotoId;
  src: string;
  width: number;
  height: number;
  altAr: string;
  altEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  category: 'agricultural' | 'rooftop' | 'utility' | 'commercial' | 'inverter' | 'engineering';
  license: string;
  licenseUrl: string;
  author: string;
  sourceUrl: string;
  sha256: string;
  byteSize: number;
}

export const VOLTEDGE_PHOTOS: VoltEdgePhoto[] = [
  {
    id: 'voltedge-farm',
    src: '/assets/portfolio/solar-energy/farm.webp',
    width: 1600,
    height: 1200,
    altAr: 'مصفوفة ألواح شمسية في مزرعة زراعية مستقلة توفر الطاقة لعمليات الري والضخ',
    altEn: 'Agricultural farm solar array generating renewable power for irrigation and rural facilities',
    titleAr: 'المنظومات الزراعية وضخ المياه',
    titleEn: 'Agricultural Solar Arrays & Irrigation Pumping',
    subtitleAr: 'طاقة مستقلة عن الشبكة تضمن استدامة مزارع الإنتاج ومحطات الري بالطاقة النظيفة',
    subtitleEn: 'Off-grid resilience powering agricultural production and solar-driven water pumping',
    category: 'agricultural',
    license: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    author: 'David Kosling / USDA',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Photovoltaic_Panels_Reap_Solar_Energy_on_Farms_(20240809-USDA-RD-DCK-0329).jpg',
    sha256: 'fb9aad55ac62a025695a4acbcbf31af0e1fcaf14985e3e42002e91b2f470b856',
    byteSize: 628650
  },
  {
    id: 'voltedge-rooftop',
    src: '/assets/portfolio/solar-energy/rooftop.webp',
    width: 1600,
    height: 1079,
    altAr: 'ألواح شمسية كهروضوئية مثبتة على سطح مبنى سكني وتجاري للاستهلاك الذاتي',
    altEn: 'Photovoltaic solar installation mounted on an urban residential and commercial rooftop',
    titleAr: 'توليد الطاقة على أسطح المنشآت',
    titleEn: 'Urban Commercial & Residential Rooftop PV',
    subtitleAr: 'استغلال المساحات السطحية لتخفيض فواتير الاستهلاك والمشاركة في صافي القياس',
    subtitleEn: 'Maximizing roof asset utilization for self-consumption and net-metering integration',
    category: 'rooftop',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'Marta Victoria',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rooftop_solar_photovoltaic_installation.jpg',
    sha256: '3bf383b442219cb20429483fca343e00f09cef88f4ac3753c89206019fa6106c',
    byteSize: 410302
  },
  {
    id: 'voltedge-utility',
    src: '/assets/portfolio/solar-energy/utility_scale.webp',
    width: 1800,
    height: 1200,
    altAr: 'محطة طاقة شمسية كبرى أرضية في بيئة صحراوية مشمسة بنظام تتبع شمسي',
    altEn: 'Utility-scale ground-mounted solar power station in an expansive arid desert environment',
    titleAr: 'محطات التوليد الكبرى وتغذية الشبكة',
    titleEn: 'Utility-Scale Ground-Mounted Solar Parks',
    subtitleAr: 'بنية تحتية هندسية ضخمة بقدرات ميجاواط تغذي الشبكات الوطنية والصناعات الكبرى',
    subtitleEn: 'Megawatt-scale EPC infrastructure feeding national grids and heavy energy consumers',
    category: 'utility',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    author: 'spg solar',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Furnacecreeksolar.jpg',
    sha256: '52bdabb2044120186a47051573b5e25cc3543d4bfcd03f7598ad664ae76baaf1',
    byteSize: 392208
  },
  {
    id: 'voltedge-commercial',
    src: '/assets/portfolio/solar-energy/commercial_roof.webp',
    width: 1800,
    height: 1350,
    altAr: 'مصفوفة ألواح شمسية واسعة النطاق تغطي سطح مجمع صناعي ومستودعات لوجستية',
    altEn: 'Extensive photovoltaic panel array covering an industrial manufacturing plant roof',
    titleAr: 'منظومات المصانع والمنشآت اللوجستية',
    titleEn: 'Industrial Manufacturing & Logistics Rooftop PV',
    subtitleAr: 'حلول طاقة شمسية صناعية تقلل البصمة الكربونية وتخفض تكاليف التشغيل للخطوط الإنتاجية',
    subtitleEn: 'Industrial solar decarbonizing manufacturing lines and securing predictable energy overheads',
    category: 'commercial',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'Hokusai / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hatil_rooftop_solar_panels.jpg',
    sha256: '14727e2f045ff06593b0f854a192dfaa2f1946d4adb08ce873bfcd40def1340c',
    byteSize: 253180
  },
  {
    id: 'voltedge-inverter',
    src: '/assets/portfolio/solar-energy/inverter_system.webp',
    width: 1800,
    height: 1077,
    altAr: 'محولات طاقة شمسية صناعية ومنظومات عواكس متطورة مع دوائر الحماية الكهربائية',
    altEn: 'High-capacity solar string inverters, power conditioning units, and protective balance-of-system electronics',
    titleAr: 'العواكس الذكية وأنظمة التخزين',
    titleEn: 'Smart Inverters & Battery Energy Storage (BESS)',
    subtitleAr: 'عواكس عالية الكفاءة مع منظومات تخزين أيونات الليثيوم لإدارة تدفق الطاقة واستقرار التردد',
    subtitleEn: 'High-efficiency string inverters paired with lithium BESS for peak shaving and frequency stability',
    category: 'inverter',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    author: 'Dennis Schroeder / NREL',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:PV_Inverter.jpg',
    sha256: '1550ece487747d0931b7e95da8894a24052fb7235ce459b1286bceba9f6df7a5',
    byteSize: 126234
  },
  {
    id: 'voltedge-survey',
    src: '/assets/portfolio/solar-energy/engineering_survey.webp',
    width: 1800,
    height: 1200,
    altAr: 'مهندس وفني طاقة شمسية معتمد يجري فحصاً وقياسات ميدانية لكفاءة الألواح',
    altEn: 'Certified solar engineering technician conducting commissioning diagnostics and structural survey',
    titleAr: 'المعاينة الهندسية واختبارات التشغيل',
    titleEn: 'Certified Engineering Surveys & Commissioning',
    subtitleAr: 'دراسات هندسية موقعية وفحوصات كهروحرارية للتأكد من مطابقة الكابلات ومعايير السلامة IEC',
    subtitleEn: 'On-site structural surveys, thermographic imaging, and IEC compliance testing prior to handover',
    category: 'engineering',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    author: 'Stephen Yang / The Solutions Project',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Technician_working_on_a_solar_panel_installation_(9232).jpg',
    sha256: '819985efdf26e2414bdb14ee4b1e88580049279d7cc5111ebd9657d5f0756c98',
    byteSize: 168310
  }
];
