import content from '../../../../data/verticals/accounting.json';
import type { Locale } from '@/lib/i18n/config';
export const LEDGERPOINT=content;
export const ledgerPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/accounting'+(suffix?'/'+suffix:'');
export const ledgerService=(slug:string)=>content.services.find(s=>s.slug===slug)||null;
export const ledgerArticle=(slug:string)=>content.articles.find(a=>a.slug===slug)||null;
export const ledgerText=(v:{ar:string;en:string},locale:Locale)=>v[locale];
export const LEDGER_HERO='https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Desktop_with_laptop_and_calculator_%28Unsplash%29.jpg/1280px-Desktop_with_laptop_and_calculator_%28Unsplash%29.jpg';
export const LEDGER_HERO_SOURCE='https://commons.wikimedia.org/wiki/File:Desktop_with_laptop_and_calculator_(Unsplash).jpg';
