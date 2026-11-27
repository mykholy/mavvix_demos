import catalog from '../../../../data/verticals/car-detailing.json';
import type { Locale } from '@/lib/i18n/config';
export const GLOSSBAY=catalog;
export const glossPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/car-detailing'+(suffix?'/'+suffix:'');
export const glossText=(value:{ar:string;en:string},locale:Locale)=>value[locale];
export const glossService=(slug:string)=>catalog.services.find(s=>s.slug===slug)||null;
export const glossArticle=(slug:string)=>catalog.articles.find(a=>a.slug===slug)||null;
export const GLOSS_IMAGES = {
  exterior: '/assets/portfolio/car-detailing/exterior.webp',
  ceramic: '/assets/portfolio/car-detailing/ceramic.webp',
  ppf: '/assets/portfolio/car-detailing/ppf.webp',
  correction: '/assets/portfolio/car-detailing/correction.webp',
  interior: '/assets/portfolio/car-detailing/interior.webp',
  wash: '/assets/portfolio/car-detailing/wash.webp',
} as const;
