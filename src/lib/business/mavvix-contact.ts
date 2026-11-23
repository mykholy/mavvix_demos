import { VERTICALS, type VerticalSlug } from '@/lib/verticals/registry';
// Official Mavvix customer contact: https://mavvix.com/ar/contact (verified Nov 2026).
export const MAVVIX_CONTACT = {
 phoneDisplay:'01062015302',phoneE164:'+201062015302',whatsappNumber:'201062015302',
 email:'info@mavvix.com',contactAr:'https://mavvix.com/ar/contact',contactEn:'https://mavvix.com/en/contact',
} as const;
/** Eight original sectors use SectorDepth's legacy media map. */
export type SectorName = 'construction'|'industrial'|'real-estate'|'dental'|'ecommerce'|'portfolio'|'restaurant'|'academy';
/** New conversion dock supports all thirty catalogued industries. */
export type PortfolioSectorName = VerticalSlug;
export const SECTOR_LABELS: Record<PortfolioSectorName,{ar:string;en:string}> =
 Object.fromEntries(VERTICALS.map(v=>[v.slug,{ar:'موقع متخصص في '+v.ar,en:'a website for '+v.en}])) as Record<PortfolioSectorName,{ar:string;en:string}>;
