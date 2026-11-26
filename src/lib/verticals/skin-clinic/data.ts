import content from '../../../../data/verticals/skin-clinic.json';
import type { Locale } from '@/lib/i18n/config';
export const ELYRA = content;
export const elyraPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/skin-clinic'+(suffix?'/'+suffix:'');
export const elyraService=(slug:string)=>content.services.find(s=>s.slug===slug)??null;
export const elyraArticle=(slug:string)=>content.articles.find(a=>a.slug===slug)??null;
