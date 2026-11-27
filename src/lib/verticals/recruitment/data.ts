import content from '../../../../data/verticals/recruitment.json';
import type {Locale} from '@/lib/i18n/config';
export const TALENTYX=content;
export const talentPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/recruitment'+(suffix?'/'+suffix:'');
export const talentService=(slug:string)=>content.services.find(s=>s.slug===slug)??null;
export const talentRole=(slug:string)=>content.roles.find(s=>s.slug===slug)??null;
export const talentArticle=(slug:string)=>content.articles.find(s=>s.slug===slug)??null;
