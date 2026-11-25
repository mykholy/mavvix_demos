import content from '../../../../data/verticals/home-maintenance.json';
import type { Locale } from '@/lib/i18n/config';
export const HOME_CARE=content;
export const maintenancePath=(locale:Locale,slug='')=>'/'+locale+'/preview/home-maintenance'+(slug?'/'+slug:'');
export const careService=(slug:string)=>content.services.find(s=>s.slug===slug)||null;
export const careGuide=(slug:string)=>content.articles.find(a=>a.slug===slug)||null;
export const careLocale=(v:{ar:string;en:string},l:Locale)=>v[l];
