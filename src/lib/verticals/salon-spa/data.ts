import content from '../../../../data/verticals/salon-spa.json';
import type { Locale } from '@/lib/i18n/config';
export const VELORA=content;
export const veloraPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/salon-spa'+(suffix?'/'+suffix:'');
export const veloraService=(slug:string)=>content.services.find(s=>s.slug===slug)||null;
export const veloraArticle=(slug:string)=>content.articles.find(a=>a.slug===slug)||null;
export const veloraText=(copy:{ar:string;en:string},locale:Locale)=>copy[locale];
export const VELORA_PHOTOS={
 manicure:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Getting_her_nails_painted_%28Unsplash%29.jpg/1280px-Getting_her_nails_painted_%28Unsplash%29.jpg',
 salon:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hair_salon_-_Arlington%2C_MA.jpg/1280px-Hair_salon_-_Arlington%2C_MA.jpg',
} as const;
