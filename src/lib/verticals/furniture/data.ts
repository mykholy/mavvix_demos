import content from '../../../../data/verticals/furniture.json';
import type { Locale } from '@/lib/i18n/config';
export const OAKLINE=content;
export type OaklineProduct=typeof content.services[number];
export const oakPath=(locale:Locale,slug='')=>'/'+locale+'/preview/furniture'+(slug?'/'+slug:'');
export const oakProduct=(slug:string)=>content.services.find(p=>p.slug===slug)||null;
export const oakGuide=(slug:string)=>content.articles.find(a=>a.slug===slug)||null;
export const oakText=(copy:{ar:string;en:string},locale:Locale)=>copy[locale];
export const OAK_PHOTOS = {
  room: '/assets/portfolio/furniture/living.webp',
  sofa: '/assets/portfolio/furniture/sofa.webp',
  vignette: '/assets/portfolio/furniture/vignette.webp',
  dining: '/assets/portfolio/furniture/dining.webp',
  joinery: '/assets/portfolio/furniture/joinery.webp',
  bedroom: '/assets/portfolio/furniture/bedroom.webp',
} as const;
