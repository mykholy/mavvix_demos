import content from '../../../../data/verticals/boutique-hotel.json';
import type { Locale } from '@/lib/i18n/config';
export const OASIS=content;
export const oasisPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/boutique-hotel'+(suffix?'/'+suffix:'');
export const oasisRoom=(slug:string)=>content.services.find(s=>s.slug===slug)??null;
export const oasisArticle=(slug:string)=>content.articles.find(a=>a.slug===slug)??null;
