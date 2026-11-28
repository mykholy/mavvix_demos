/**
 * Apex Auto Care / Torque Garage — Verified Media Module
 * All assets locally hosted, optimized WebP, with SHA-256 provenance tracking
 */

export interface AutoMediaItem {
  id: string;
  src: string;
  width: number;
  height: number;
  format: 'webp';
  sha256: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  category: 'engine' | 'precision' | 'chassis' | 'powertrain' | 'overhaul' | 'electrical';
  alt: {
    ar: string;
    en: string;
  };
  caption: {
    ar: string;
    en: string;
  };
}

export const AUTO_MEDIA_ASSETS: AutoMediaItem[] = [
  {
    id: 'auto_media_01',
    src: '/assets/portfolio/auto-service/engine_bay_diagnostic.webp',
    width: 1800,
    height: 1350,
    format: 'webp',
    sha256: '2ed0290d69ce6cea6814a884bece10970a20635940136bce164182d44c72cc9a',
    author: 'Bembety',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mechanic_repairing_car_engine.jpg',
    category: 'engine',
    alt: {
      ar: 'فحص تحليلي شامل لحجرة المحرك والأنظمة الميكانيكية بمركز الصيانة',
      en: 'Comprehensive engine bay and mechanical diagnostic inspection at automotive workshop'
    },
    caption: {
      ar: 'تشخيص ميكانيكي دقيق لحجرة المحرك ومراجعة أداء السيور ومستوى السوائل',
      en: 'Precision mechanical diagnostics of engine bay, belt tension, and fluid levels'
    }
  },
  {
    id: 'auto_media_02',
    src: '/assets/portfolio/auto-service/mechanical_precision_service.webp',
    width: 1350,
    height: 1800,
    format: 'webp',
    sha256: 'a36970d2d408c59019b39f766e953e749c9e88b9f1dfec2632e3b88d726689f1',
    author: 'Bembety',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mechanic_repairing_car_engine_1.jpg',
    category: 'precision',
    alt: {
      ar: 'فني محترف ينفذ أعمال الصيانة الدقيقة وفق معايير المصنع المعتمدة',
      en: 'Certified automotive technician performing precision mechanical service to manufacturer standards'
    },
    caption: {
      ar: 'معايرة ميكانيكية دقيقة واستبدال الأجزاء الاستهلاكية بمعدات القياس المعتمدة',
      en: 'Precision mechanical calibration and wear-item replacement using certified measurement tools'
    }
  },
  {
    id: 'auto_media_03',
    src: '/assets/portfolio/auto-service/vehicle_undercarriage_lift.webp',
    width: 1202,
    height: 1800,
    format: 'webp',
    sha256: '0e8ffa3c46bca708dfef86ec70aa713d826e49c8fc966b3fd4ce094e687d5109',
    author: 'Shixart1985',
    license: 'CC-BY-2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Car_mechanic_worker_repairing_suspension_of_lifted_automobile_at_auto_repair_garage_shop.jpg',
    category: 'chassis',
    alt: {
      ar: 'فحص نظام التعليق والعفشة والمحور السفلي للسيارة على رافعة هيدروليكية',
      en: 'Automotive suspension and undercarriage chassis inspection on hydraulic two-post lift'
    },
    caption: {
      ar: 'فحص العفشة، المساعدين، جلب التوجيه وسلامة الهيكل السفلي تحت حمولة واقعية',
      en: 'Inspection of dampers, suspension bushings, steering linkage, and underbody structural integrity'
    }
  },
  {
    id: 'auto_media_04',
    src: '/assets/portfolio/auto-service/powertrain_routine_maintenance.webp',
    width: 1800,
    height: 1201,
    format: 'webp',
    sha256: '9023215b90592c221f935795b075d15a9a459bc766a4c94843bd7cac56162bff',
    author: 'Shixart1985',
    license: 'CC-BY-2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mechanic_works_on_car_engine_performing_routine_maintenance_and_inspections_on_vehicle_parts.jpg',
    category: 'powertrain',
    alt: {
      ar: 'صيانة دورية وقائية لمنظومة الدفع ومحرك السيارة بورشة الصيانة',
      en: 'Preventive routine maintenance and inspection on automobile powertrain in service bay'
    },
    caption: {
      ar: 'فحص دوري وقائي للزيوت، الفلاتر وشمعات الاحتراق لإطالة العمر الافتراضي للمحرك',
      en: 'Routine preventive maintenance of lubricants, filters, and spark plugs for powertrain longevity'
    }
  },
  {
    id: 'auto_media_05',
    src: '/assets/portfolio/auto-service/engine_component_overhaul.webp',
    width: 1800,
    height: 1202,
    format: 'webp',
    sha256: '3e6b3309b5aeefd206f600b3deb90959afdecb25d5d047f7f50095c66fcc4ce9',
    author: 'Shixart1985',
    license: 'CC-BY-2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Old_car_engine_showing_various_parts_and_tools_during_maintenance_work_in_a_garage.jpg',
    category: 'overhaul',
    alt: {
      ar: 'أجزاء المحرك الميكانيكية وأدوات العَمْرة والضبط المتخصصة في ورشة الصيانة',
      en: 'Detailed mechanical engine assembly and precision tooling during overhaul in workshop'
    },
    caption: {
      ar: 'أدوات ضبط العزم وتفكيك الصمامات وبلوكات المحرك لتجديد الكفاءة الميكانيكية',
      en: 'Torque measurement tools, valve disassembly, and block inspection for mechanical restoration'
    }
  },
  {
    id: 'auto_media_06',
    src: '/assets/portfolio/auto-service/diagnostic_electronic_inspection.webp',
    width: 1198,
    height: 1800,
    format: 'webp',
    sha256: '0576ed1844048fd656abbb329f8b16dbaa6d40d0f7bba71afbd1d9bdc7a92697',
    author: 'Shixart1985',
    license: 'CC-BY-2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Car_engine_maintenance_involves_a_mechanic_inspecting_and_adjusting_parts_under_the_hood.jpg',
    category: 'electrical',
    alt: {
      ar: 'فحص إلكتروني للحساسات والظفيرة الكهربائية وحواضن التوصيل بمقصورة المحرك',
      en: 'Electrical sensor, harness diagnostics, and actuator testing under the engine hood'
    },
    caption: {
      ar: 'مطابقة قراءات الحساسات المباشرة مع قيم التشغيل القياسية لاكتشاف الأعطال الكهربائية المتقطعة',
      en: 'Live sensor telemetry matching against OEM threshold parameters to pinpoint intermittent faults'
    }
  }
];

export const AUTO_HERO_IMAGE = AUTO_MEDIA_ASSETS[0];
