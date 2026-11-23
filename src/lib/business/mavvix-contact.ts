import { VERTICALS, type VerticalSlug } from '@/lib/verticals/registry';
// Official Mavvix customer contact: https://mavvix.com/ar/contact (verified Nov 2026).
export const MAVVIX_CONTACT = {
 phoneDisplay:'01062015302',phoneE164:'+201062015302',whatsappNumber:'201062015302',
 email:'info@mavvix.com',contactAr:'https://mavvix.com/ar/contact',contactEn:'https://mavvix.com/en/contact',
} as const;
export type SectorName = VerticalSlug;
export const SECTOR_LABELS: Record<SectorName,{ar:string;en:string}> =
 Object.fromEntries(VERTICALS.map(v=>[v.slug,{ar:'موقع متخصص في '+v.ar,en:'a website for '+v.en}])) as Record<SectorName,{ar:string;en:string}>;
