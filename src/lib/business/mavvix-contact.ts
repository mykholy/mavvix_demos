// Official Mavvix customer contact: https://mavvix.com/ar/contact (verified Nov 2026).
export const MAVVIX_CONTACT = {
 phoneDisplay:'01062015302',phoneE164:'+201062015302',whatsappNumber:'201062015302',
 email:'info@mavvix.com',contactAr:'https://mavvix.com/ar/contact',contactEn:'https://mavvix.com/en/contact',
} as const;
export type SectorName = 'construction'|'industrial'|'real-estate'|'dental'|'ecommerce'|'portfolio'|'restaurant'|'academy';
export const SECTOR_LABELS:Record<SectorName,{ar:string;en:string}>={
 construction:{ar:'موقع شركة مقاولات',en:'a construction company website'},
 industrial:{ar:'موقع توريدات ومصانع',en:'an industrial supply website'},
 'real-estate':{ar:'موقع شركة عقارات',en:'a real estate website'},
 dental:{ar:'موقع عيادات أسنان',en:'a dental clinic website'},
 ecommerce:{ar:'متجر إلكتروني',en:'an e-commerce store'},
 portfolio:{ar:'موقع استوديو إبداعي',en:'a creative studio website'},
 restaurant:{ar:'موقع ومنيو مطعم',en:'a restaurant website'},
 academy:{ar:'موقع ومنصة تعليمية',en:'an education platform'},
};
