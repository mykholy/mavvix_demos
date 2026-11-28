export interface LedgerMediaAsset {
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

export const LEDGER_MEDIA_COLLECTION: readonly LedgerMediaAsset[] = [
  {
    id: 'ledger-desk-calculator',
    local: '/assets/portfolio/accounting/desk_calculator.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Desktop_with_laptop_and_calculator_(Unsplash).jpg',
    author: 'Oliver Thomas Klein',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sha256: '3fab74baad93d08d020e198852dc421e2e9d8606684eed33951a6944e8a0f758',
    dimensions: '1800x1350',
    bytes: 56656,
    alt: {
      ar: 'مكتب عمل محاسبي مع حاسوب محمول وآلة حاسبة مكتبية ومستندات',
      en: 'Accounting desk workspace with laptop, desk calculator, and business records'
    },
    caption: {
      ar: 'سطح مكتب تحريري يوضح أدوات الحساب اليومية ومراجعة المستندات المصدرية',
      en: 'Editorial desk setting illustrating daily calculation tools and source document review'
    }
  },
  {
    id: 'ledger-financial-analysis',
    local: '/assets/portfolio/accounting/financial_analysis.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Financial_Analysis_Graph_Laptop_(23315801934).jpg',
    author: 'Dave Dugdale',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    sha256: '344a3c94e261259b844ac0439ddee0e808eba3ee0fb273795af9780bc91a0cd9',
    dimensions: '1800x1199',
    bytes: 82980,
    alt: {
      ar: 'رسوم بيانية لتحليل مالي وتقارير أعمال على شاشة حاسوب',
      en: 'Financial analysis charts and business performance reports displayed on laptop'
    },
    caption: {
      ar: 'مخططات بيانية توضح مسارات التحليل المالي وتتبع مؤشرات الأداء للإدارة',
      en: 'Visual charts illustrating financial analysis trajectories and management KPIs'
    }
  },
  {
    id: 'ledger-payroll-calculator',
    local: '/assets/portfolio/accounting/payroll_calculator.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Calculator_with_paper_and_pencil.jpg',
    author: 'Arun8388',
    license: 'CC0-1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sha256: '3baeba2936152d4ae668fd27f36b5d7caf39991ff5382b951a0f0594c9dcc814',
    dimensions: '1600x1066',
    bytes: 135528,
    alt: {
      ar: 'آلة حاسبة مع ورقة حسابات وقلم رصاص لمطابقة الأرقام',
      en: 'Desk calculator with calculation paper and pencil for manual tally review'
    },
    caption: {
      ar: 'تدقيق يدوي ومطابقة حسابية دقيقة لسجلات الرواتب والاستقطاعات',
      en: 'Manual mathematical verification and audit checks for payroll reconciliation'
    }
  },
  {
    id: 'ledger-contract-signing',
    local: '/assets/portfolio/accounting/contract_signing.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Signing_Contract_Agreement.jpg',
    author: 'Wingtsungeeks',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sha256: 'c94792e6afe1006ce0f5561de18e8cf4b5286e31254026027e8ba8658d9e717f',
    dimensions: '1800x1350',
    bytes: 103304,
    alt: {
      ar: 'توقيع اتفاقية نطاق عمل مهني واعتماد بنود الخدمة',
      en: 'Signing professional engagement scope agreement and terms of service'
    },
    caption: {
      ar: 'توثيق شروط التعاقد وتحديد المسؤوليات ونطاق الخدمات المحاسبية المعتمدة',
      en: 'Documenting engagement terms, defining responsibilities, and agreed service scope'
    }
  },
  {
    id: 'ledger-advisory-boardroom',
    local: '/assets/portfolio/accounting/advisory_boardroom.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:Conference_room_table_and_chairs.jpg',
    author: 'MarkJaysonAranda',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sha256: 'b882e856c207f6cbe68a77ea06613d4b3ca9379d16eb6221dd59f4ac8a9e9ad2',
    dimensions: '1800x1096',
    bytes: 203522,
    alt: {
      ar: 'قاعة اجتماعات مخصصة للاستشارات المالية ومناقشة تقارير الإدارة',
      en: 'Conference boardroom designated for executive financial advisory and governance'
    },
    caption: {
      ar: 'بيئة مهنية لمناقشة التقارير الدورية واستراتيجيات الحوكمة وإقفال الفترات المالية',
      en: 'Executive environment for periodic reporting discussions, governance, and financial close'
    }
  },
  {
    id: 'ledger-tax-compliance',
    local: '/assets/portfolio/accounting/tax_compliance.webp',
    sourcePage: 'https://commons.wikimedia.org/wiki/File:A_laptop_showing_a_spreadsheet_program_with_calculations.jpg',
    author: 'Joe lope',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sha256: '22a8f38ecdd87bf89a4e1e60de861f560eeb43c202e629cf12f6284c4c9722c9',
    dimensions: '1520x912',
    bytes: 113366,
    alt: {
      ar: 'جداول بيانات ومعادلات حسابية لاحتساب الالتزامات والتدقيق',
      en: 'Spreadsheet software with structured calculation formulas for accounting audits'
    },
    caption: {
      ar: 'تحليل دقيق لجداول البيانات والمعادلات المحاسبية لضمان سلامة الإقرارات',
      en: 'Detailed examination of spreadsheets and ledger formulas ensuring filing integrity'
    }
  }
];
