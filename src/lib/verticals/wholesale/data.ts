import content from '../../../../data/verticals/wholesale.json';
import type {Locale} from '@/lib/i18n/config';
export const TRADEBRIDGE=content;
export const tradePath=(locale:Locale,suffix='')=>'/'+locale+'/preview/wholesale'+(suffix?'/'+suffix:'');
export const tradeItem=(slug:string)=>content.services.find(s=>s.slug===slug)??null;
export const tradeArticle=(slug:string)=>content.articles.find(a=>a.slug===slug)??null;
