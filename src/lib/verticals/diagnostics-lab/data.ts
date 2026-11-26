import content from '../../../../data/verticals/diagnostics-lab.json';
import type { Locale } from '@/lib/i18n/config';
export const CLEARPATH=content;
export const clearPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/diagnostics-lab'+(suffix?'/'+suffix:'');
export const clearService=(slug:string)=>content.services.find(s=>s.slug===slug)??null;
export const clearArticle=(slug:string)=>content.articles.find(a=>a.slug===slug)??null;
