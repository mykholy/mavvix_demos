export type TalentyxPhotoId =
  | 'talentyx-interview'
  | 'talentyx-team'
  | 'talentyx-evaluation'
  | 'talentyx-workplace'
  | 'talentyx-executive'
  | 'talentyx-matchmaking';

export interface TalentyxPhoto {
  id: TalentyxPhotoId;
  src: string;
  width: number;
  height: number;
  altAr: string;
  altEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  category: 'interview' | 'collaboration' | 'evaluation' | 'workplace' | 'executive' | 'matchmaking';
  license: string;
  licenseUrl: string;
  author: string;
  creditUrl: string;
  sourceUrl: string;
  sha256: string;
  byteSize: number;
}

export const TALENTYX_PHOTOS: TalentyxPhoto[] = [
  {
    id: 'talentyx-interview',
    src: '/assets/portfolio/recruitment/interview.webp',
    width: 1600,
    height: 1037,
    altAr: 'مقابلة عمل تقييمية في صورة تحريرية مستقلة توثق الحوار المهني المباشر',
    altEn: 'Independent editorial job interview photograph documenting professional dialogue',
    titleAr: 'جلسات المقابلة والتقييم المهني',
    titleEn: 'Structured Competency Interview Sessions',
    subtitleAr: 'تقييم منهجي يركز على المهارات العملية والمواءمة مع متطلبات الوظيفة الشاغرة',
    subtitleEn: 'Systematic candidate evaluation prioritizing applied skills and job-relevant alignment',
    category: 'interview',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    author: 'Amtec Photos / amtec_photos',
    creditUrl: 'https://www.amtec.us.com',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Job_Interview_-_38630953066.jpg',
    sha256: 'd80b55e6f14a91c819e2bbd11c85b489c30a57b97d7a21c29f58d5919975d1a7',
    byteSize: 129672
  },
  {
    id: 'talentyx-team',
    src: '/assets/portfolio/recruitment/team.webp',
    width: 1600,
    height: 602,
    altAr: 'اجتماع فريق عمل متعدد التخصصات في جلسة تخطيط استراتيجي للفرق',
    altEn: 'Cross-functional team meeting in an agile strategic talent planning session',
    titleAr: 'مواءمة الكفاءات واحتياجات الفرق',
    titleEn: 'Cross-Functional Team & Sourcing Alignment',
    subtitleAr: 'تخطيط الاحتياجات الوظيفية ومستويات الخبرة المطلوبة لدعم التوسع المؤسسي',
    subtitleEn: 'Forecasting organizational talent requirements and seniority tiers for sustainable scale',
    category: 'collaboration',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    author: 'woodleywonderworks',
    creditUrl: 'https://www.flickr.com/people/73645804@N00/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Team_Meeting.jpg',
    sha256: 'e48201aa03d752e78077467d8da35bdce74350c68fe4dc54ec09d4297ebd19e6',
    byteSize: 130648
  },
  {
    id: 'talentyx-evaluation',
    src: '/assets/portfolio/recruitment/evaluation.webp',
    width: 1800,
    height: 1151,
    altAr: 'مستشارة توظيف تجري حواراً تقييمياً فردياً مع مرشحة في بيئة مهنية',
    altEn: 'Senior talent advisor conducting a structured one-on-one candidate evaluation',
    titleAr: 'التقييم الفردي ومصفوفة المهارات',
    titleEn: 'Objective Candidate Evaluation & Skills Review',
    subtitleAr: 'حوار معمق يستكشف الإنجازات السابقة والسياق العملي دون تحيز أو أحكام مسبقة',
    subtitleEn: 'In-depth assessment reviewing verified track records and contextual problem-solving',
    category: 'evaluation',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    author: 'Amtec Photos / amtec_photos',
    creditUrl: 'https://www.amtec.us.com',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Woman_Conducting_an_Interview.jpg',
    sha256: 'd32447a244cb93ae7227688f88784fc66b3801144340f315b2d1693d532253d8',
    byteSize: 93428
  },
  {
    id: 'talentyx-workplace',
    src: '/assets/portfolio/recruitment/workplace.webp',
    width: 1800,
    height: 1200,
    altAr: 'بيئة عمل مفتوحة لفرق التقنية والابتكار تبرز الثقافة المؤسسية الحيوية',
    altEn: 'Modern open-concept workspace highlighting vibrant collaborative engineering culture',
    titleAr: 'بيئات العمل المعاصرة وثقافة الفرق',
    titleEn: 'Modern High-Growth Workplaces & Culture',
    subtitleAr: 'مواءمة الكوادر مع بيئات عمل ديناميكية تعزز الابتكار والإنتاجية المشتركة',
    subtitleEn: 'Matching specialists to workplace environments that foster innovation and cross-discipline synergy',
    category: 'workplace',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    author: 'Crew / Unsplash',
    creditUrl: 'https://unsplash.com',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Working_in_open_office_space_(Unsplash).jpg',
    sha256: '33178a006b157ad3dd19c74d8d0f16a4209e2b0d9e92f6ea32c60f6064555ccf',
    byteSize: 147954
  },
  {
    id: 'talentyx-executive',
    src: '/assets/portfolio/recruitment/executive.webp',
    width: 1800,
    height: 1196,
    altAr: 'قيادية أعمال في جلسة استشارية استراتيجية لاستقطاب القيادات التنفيذية',
    altEn: 'Executive business leader engaged in confidential strategic advisory consultation',
    titleAr: 'استقطاب القيادات التنفيذية ومجالس الإدارة',
    titleEn: 'Executive Search & Strategic Leadership Advisory',
    subtitleAr: 'بحث سري وانتقائي لاختيار القيادات التي تقود التحول الرقمي والتوسع الإقليمي',
    subtitleEn: 'Discreet leadership talent mapping for C-suite appointments and regional expansion mandates',
    category: 'executive',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    author: 'Amy Clarke',
    creditUrl: 'https://www.flickr.com/photos/amyclarke/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Boss_Woman_(16374516410).jpg',
    sha256: 'c539d2b8215ed8ecf05f579b7c1e6881c4fe995cd47a12efd7113fdac0d41715',
    byteSize: 263670
  },
  {
    id: 'talentyx-matchmaking',
    src: '/assets/portfolio/recruitment/matchmaking.webp',
    width: 1800,
    height: 1200,
    altAr: 'جلسة حوار وتعارف مهني مباشر بين مسؤولي التوظيف والكوادر المتخصصة',
    altEn: 'Interactive employer-candidate talent dialogue and matchmaking session',
    titleAr: 'جلسات التعارف المباشر والتوافق المهني',
    titleEn: 'Direct Employer-Talent Matchmaking Dialogue',
    subtitleAr: 'تقريب وجهات النظر واستكشاف التطلعات المهنية قبل الدخول في مراحل التفاوض',
    subtitleEn: 'Bridging mutual expectations and career growth trajectories prior to contractual offer stages',
    category: 'matchmaking',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'Andrew / Tech Elevator',
    creditUrl: 'https://commons.wikimedia.org/wiki/User:Andrewtechelevator',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Employer_Matchmaking_at_Tech_Elevator.jpg',
    sha256: 'c2dda090ed4a6fe3fe4c45929e1ec1e70c9db887691e45f08b0ce2ccffd8f6f4',
    byteSize: 148072
  }
];
