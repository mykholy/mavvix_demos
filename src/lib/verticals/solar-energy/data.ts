import content from '../../../../data/verticals/solar-energy.json';
import type {Locale} from '@/lib/i18n/config';
export const VOLTEDGE=content;
export const voltPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/solar-energy'+(suffix?'/'+suffix:'');
export const voltService=(slug:string)=>content.services.find(s=>s.slug===slug)??null;
export const voltArticle=(slug:string)=>content.articles.find(a=>a.slug===slug)??null;
