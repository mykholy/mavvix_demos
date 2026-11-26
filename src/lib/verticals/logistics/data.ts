import content from '../../../../data/verticals/logistics.json';
import type { Locale } from '@/lib/i18n/config';
export const ROUTELINE = content;
export const routeLinePath=(locale:Locale,suffix='')=>'/'+locale+'/preview/logistics'+(suffix?'/'+suffix:'');
export const routeLineService=(slug:string)=>content.services.find(s=>s.slug===slug)??null;
export const routeLineArticle=(slug:string)=>content.articles.find(a=>a.slug===slug)??null;
