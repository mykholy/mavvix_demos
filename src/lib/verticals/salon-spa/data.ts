import content from '../../../../data/verticals/salon-spa.json';
import type { Locale } from '@/lib/i18n/config';
export const VELORA=content;
export const veloraPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/salon-spa'+(suffix?'/'+suffix:'');
export const veloraService=(slug:string)=>content.services.find(s=>s.slug===slug)||null;
export const veloraArticle=(slug:string)=>content.articles.find(a=>a.slug===slug)||null;
export const veloraText=(copy:{ar:string;en:string},locale:Locale)=>copy[locale];
export const VELORA_PHOTOS = {
  manicure: '/assets/portfolio/salon-spa/editorial_manicure_treatment.webp',
  salon: '/assets/portfolio/salon-spa/hair_salon_architectural_interior.webp',
  haircut: '/assets/portfolio/salon-spa/precision_haircut_styling.webp',
  facial: '/assets/portfolio/salon-spa/botanical_facial_skincare_suite.webp',
  massage: '/assets/portfolio/salon-spa/spa_botanical_massage_stones.webp',
  lacquer: '/assets/portfolio/salon-spa/artisan_nail_lacquer_atelier.webp',
} as const;
