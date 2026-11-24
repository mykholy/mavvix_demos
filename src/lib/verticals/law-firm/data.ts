import content from '../../../../data/verticals/law-firm.json';
import type { Locale } from '@/lib/i18n/config';
export const LEXORA=content;
export const lexoraPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/law-firm'+(suffix?'/'+suffix:'');
export const lexoraService=(slug:string)=>content.services.find(s=>s.slug===slug)||null;
export const lexoraArticle=(slug:string)=>content.articles.find(a=>a.slug===slug)||null;
export const lexoraText=(v:{ar:string;en:string},locale:Locale)=>v[locale];
export const LEGAL_BOOKS_PHOTO='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Canadian_law_books_%2831460630695%29.jpg/1280px-Canadian_law_books_%2831460630695%29.jpg';
export const LEGAL_BOOKS_SOURCE='https://commons.wikimedia.org/wiki/File:Canadian_law_books_(31460630695).jpg';
