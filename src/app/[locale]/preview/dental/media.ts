export type LumenPhoto = {
  id: string;
  category: 'operatory' | 'suite' | 'lounge' | 'consultation' | 'hygiene' | 'prosthetics';
  url: string;
  source: string;
  author: string;
  license: string;
  licenseUrl: string;
  ar: string;
  en: string;
  specs?: {
    equipment?: string;
    comfort?: string;
    standard?: string;
  };
};

const commons = 'https://commons.wikimedia.org/wiki/File:';
const by3 = 'https://creativecommons.org/licenses/by-sa/3.0/';
const by4 = 'https://creativecommons.org/licenses/by/4.0/';
const bySa4 = 'https://creativecommons.org/licenses/by-sa/4.0/';

export const lumenPhotos: LumenPhoto[] = [
  {
    id: 'operatory',
    category: 'operatory',
    url: '/assets/portfolio/dental/operatory.webp',
    source: commons + 'A_dental_chair_in_a_dentist_clinic_in_North_Carolina,_United_States.jpg',
    author: 'Washuotaku',
    license: 'CC BY 4.0 International',
    licenseUrl: by4,
    ar: 'جناح عيادة أسنان متطور ومريح مع إضاءة طبيعية وتجهيز مريح للمريض',
    en: 'Ergonomic clinical dental operatory suite with daylight illumination',
    specs: {
      equipment: 'Ergonomic Treatment Chair',
      comfort: 'Acoustic Wall Panels & Ambient Music',
      standard: 'Class B Autoclave Protocol'
    }
  },
  {
    id: 'suite',
    category: 'suite',
    url: '/assets/portfolio/dental/suite.webp',
    source: commons + 'Dental_chair_in_a_dentist_clinic.jpg',
    author: 'Washuotaku',
    license: 'CC BY-SA 4.0 International',
    licenseUrl: bySa4,
    ar: 'مقعد رعاية أسنان متكامل وبيئة عمل معقمة ومريحة للمريض',
    en: 'Modern dental care chair and sterile procedure environment',
    specs: {
      equipment: 'Integrated Intraoral Camera',
      comfort: 'Memory Foam Contour Support',
      standard: 'Single-Use Hermetic Barrier Wraps'
    }
  },
  {
    id: 'lounge',
    category: 'lounge',
    url: '/assets/portfolio/dental/lounge.webp',
    source: commons + 'A_waiting_room_at_a_medical_healthcare_clinic,_doctor%27s_office,_hospital.jpg',
    author: 'Washuotaku',
    license: 'CC BY 4.0 International',
    licenseUrl: by4,
    ar: 'استراحة مرضى هادئة ومريحة بأثاث خشبي طبيعي وإضاءة خافتة للاسترخاء',
    en: 'Calm and soothing patient reception lounge with natural timber seating',
    specs: {
      equipment: 'Private Arrival Check-In',
      comfort: 'Aromatherapy & Calming Lighting',
      standard: 'Continuous HEPA-14 Air Scrubbing'
    }
  },
  {
    id: 'consultation',
    category: 'consultation',
    url: '/assets/portfolio/dental/consultation.webp',
    source: commons + 'Medical_office_on_Johnson_Street,_New_Orleans_October_2025_-_Exam_Room.jpg',
    author: 'Infrogmation of New Orleans',
    license: 'CC BY-SA 4.0 International',
    licenseUrl: bySa4,
    ar: 'جناح استشارة سريرية وتشخيص متقدم لمناقشة خطة العلاج بخصوصية',
    en: 'Private clinical consultation and diagnostics suite',
    specs: {
      equipment: 'High-Res Digital Imaging Screen',
      comfort: 'Private Consultation Desk',
      standard: 'Confidential Treatment Planning'
    }
  },
  {
    id: 'hygiene',
    category: 'hygiene',
    url: '/assets/portfolio/dental/hygiene.webp',
    source: commons + 'Dental_mirror.jpg',
    author: 'Gerd Fahrenhorst',
    license: 'CC BY-SA 4.0 International',
    licenseUrl: bySa4,
    ar: 'مرآة تشخيصية وأدوات فحص دقيقة معقمة جراحيًا لطب الأسنان الوقائي',
    en: 'Surgically sterile precision dental diagnostic mirror and inspection tools',
    specs: {
      equipment: 'Titanium-Coated Examination Mirror',
      comfort: 'Non-Reflective Satin Finish',
      standard: 'EN 13060 Sterile Pack Sealed'
    }
  },
  {
    id: 'prosthetics',
    category: 'prosthetics',
    url: '/assets/portfolio/dental/prosthetics.webp',
    source: commons + 'Implant_retained_bridge_model.jpg',
    author: 'Dr. Parneet Sehgal',
    license: 'CC BY-SA 3.0 Unported',
    licenseUrl: by3,
    ar: 'نموذج تشريحي لزراعة وتثبيت الجسور السنية لتوضيح مسار الخطة العلاجية',
    en: 'Precision implant-retained anatomical dental model for treatment planning',
    specs: {
      equipment: 'CAD/CAM Biocompatible Zirconia',
      comfort: 'Computer-Guided Surgical Stents',
      standard: 'FDA / CE Approved Dental Grade'
    }
  }
];

export function getLumenPhoto(id: string): LumenPhoto | undefined {
  return lumenPhotos.find((p) => p.id === id);
}
