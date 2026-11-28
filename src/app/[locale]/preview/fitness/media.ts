/**
 * Pulse District / Pulse Training Club — Verified Media Module
 * All assets locally hosted, optimized WebP, with SHA-256 provenance tracking
 */

export interface FitnessMediaItem {
  id: string;
  src: string;
  url: string;
  width: number;
  height: number;
  format: 'webp';
  sha256: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  category: 'cardio' | 'strength' | 'functional';
  alt: {
    ar: string;
    en: string;
  };
  caption: {
    ar: string;
    en: string;
  };
}

export const FITNESS_MEDIA_ASSETS: FitnessMediaItem[] = [
  {
    id: 'fitness-center-floor-equipment',
    src: '/assets/portfolio/fitness/fitness_center_floor_equipment.webp',
    url: '/assets/portfolio/fitness/fitness_center_floor_equipment.webp',
    width: 1800,
    height: 1200,
    format: 'webp',
    sha256: 'aec8812a9ac888c7bac3a4fbfa8d084a3586c5de73028f880075d60701442f36',
    author: 'Teddyhtsai',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Fitness_Center_Equipment.jpg',
    category: 'cardio',
    alt: {
      ar: 'صالة لياقة بدنية مجهزة بأجهزة تدريب هوائي وقوة في منشأة مستقلة',
      en: 'Fitness center floor equipped with cardio and strength conditioning machines in an unrelated facility'
    },
    caption: {
      ar: 'تخطيط أرضية التدريب الرياضي وتوزيع مساحات الحركة الحرة والأجهزة الميكانيكية',
      en: 'Spacious gym floor layout optimizing functional movement lanes and resistance machines'
    }
  },
  {
    id: 'strength-selectorized-machine-suite',
    src: '/assets/portfolio/fitness/strength_selectorized_machine_suite.webp',
    url: '/assets/portfolio/fitness/strength_selectorized_machine_suite.webp',
    width: 1108,
    height: 1478,
    format: 'webp',
    sha256: '4206080d53907fde05c6474f070f77215af367d7a0e105c1bc6bfe14922ea681',
    author: 'Teddyhtsai',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gym_Equipment.jpg',
    category: 'strength',
    alt: {
      ar: 'أجهزة تمارين القوة وتدريب الأوزان المنتقاة كابلياً',
      en: 'Selectorized cable and pin-loaded strength resistance training machines'
    },
    caption: {
      ar: 'مسارات حركة مقيدة للأوزان تتيح للمتدربين عزل المجموعات العضلية بأمان وتحكم حركي',
      en: 'Biomechanical cable machines facilitating controlled muscular overload and safe isolation'
    }
  },
  {
    id: 'barbell-deadlift-technique-station',
    src: '/assets/portfolio/fitness/barbell_deadlift_technique_station.webp',
    url: '/assets/portfolio/fitness/barbell_deadlift_technique_station.webp',
    width: 1800,
    height: 1202,
    format: 'webp',
    sha256: 'f661acdf37536809f407124cdf9350e57c828b9e1b2c2abf8d90b42d3651f670',
    author: 'Nenad Stojkovic',
    license: 'CC-BY-2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Fit_young_man_doing_deadlift_exercise_in_gym.jpg',
    category: 'strength',
    alt: {
      ar: 'متدرب يؤدي تمرين الرفعة الميتة بالبار الأولمبي مع الحفاظ على استقامة العمود الفقري',
      en: 'Athlete executing an Olympic barbell deadlift maintaining neutral spinal alignment'
    },
    caption: {
      ar: 'معايرة تقنية الرفعات المركبة وتنشيط عضلات السلسلة الخلفية بأوزان متدرجة ومحسوبة',
      en: 'Compound lift biomechanics and posterior chain recruitment with progressive calibration'
    }
  },
  {
    id: 'kettlebell-functional-training-zone',
    src: '/assets/portfolio/fitness/kettlebell_functional_training_zone.webp',
    url: '/assets/portfolio/fitness/kettlebell_functional_training_zone.webp',
    width: 1800,
    height: 1200,
    format: 'webp',
    sha256: '5878b0ef4a437a399b8ef2137e993d19c40a7b1d5e5b7adb733e9f79101a5144',
    author: 'Rafaelqcn',
    license: 'CC-BY-SA-4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Kettlebell_workout.jpg',
    category: 'functional',
    alt: {
      ar: 'تدريب وظيفي باستخدام الكيتل بل لتطوير القوة الانفجارية والتحكم في الجذع',
      en: 'Functional kettlebell training conditioning explosive hip hinge power and core stability'
    },
    caption: {
      ar: 'تمارين الأرجحة والرفع الحركي للأوزان الحرة لتطوير التوازن والتحمل القلبي العضلي',
      en: 'Dynamic kettlebell swings and ballistic transitions developing cardiovascular endurance'
    }
  },
  {
    id: 'dumbbells-freeweight_rack-conditioning',
    src: '/assets/portfolio/fitness/dumbbells_freeweight_rack_conditioning.webp',
    url: '/assets/portfolio/fitness/dumbbells_freeweight_rack_conditioning.webp',
    width: 1800,
    height: 1202,
    format: 'webp',
    sha256: '5aaddf485783909f117e577b63310a6629b2cab04cf5859a97b8f607ef2ef61d',
    author: 'Shixart1985',
    license: 'CC-BY-2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Fitness_dumbbell_marked_with_a_green_logo_resting_on_a_gym_rack.jpg',
    category: 'strength',
    alt: {
      ar: 'حامل دامبلز احترافي مجهز بأوزان تدريجية للأوزان الحرة داخل الجيم',
      en: 'Commercial gym dumbbell rack holding graduated urethane free weights'
    },
    caption: {
      ar: 'مجموعة الأوزان الحرة المتدرجة المخصصة لتمارين العزل وتطوير القوة المتوازنة',
      en: 'Graduated free-weight dumbbells enabling unilateral symmetry and hypertrophy progressions'
    }
  },
  {
    id: 'treadmill-cardiovascular-endurance-bay',
    src: '/assets/portfolio/fitness/treadmill_cardiovascular_endurance_bay.webp',
    url: '/assets/portfolio/fitness/treadmill_cardiovascular_endurance_bay.webp',
    width: 1800,
    height: 1202,
    format: 'webp',
    sha256: '79cc49fc4d349ac4882a243d874ca31501f8c62be969e43a8cf9186f980d3def',
    author: 'Shixart1985',
    license: 'CC-BY-2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Young_blonde_woman_running_on_a_treadmill_in_the_gym_closeup.jpg',
    category: 'cardio',
    alt: {
      ar: 'متدربة تمارس الجري والتحمل القلبي على جهاز سير الجري الكهربائي في الجيم',
      en: 'Athlete running and training cardiovascular aerobic pace on commercial treadmill'
    },
    caption: {
      ar: 'منطقة التدريب الهوائي المصممة لتمارين فترات الشدة والتحمل التنفسي والتعافي النشط',
      en: 'Aerobic conditioning zone calibrated for interval pacing, cardiovascular VO2 max, and active recovery'
    }
  }
];

export function getFitnessMediaByCategory(category?: string): FitnessMediaItem[] {
  if (!category || category === 'all') return FITNESS_MEDIA_ASSETS;
  return FITNESS_MEDIA_ASSETS.filter((item) => item.category === category);
}

export function getFitnessMediaById(id: string): FitnessMediaItem | undefined {
  return FITNESS_MEDIA_ASSETS.find((item) => item.id === id);
}
