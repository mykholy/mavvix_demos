import catalog from '../../../../data/verticals/physiotherapy.json';
import type { Locale } from '@/lib/i18n/config';
export const MOTION=catalog;
export const motionPath=(locale:Locale,sub='')=>'/'+locale+'/preview/physiotherapy'+(sub?'/'+sub:'');
export const motionText=(v:{ar:string;en:string},locale:Locale)=>v[locale];
export const motionService=(slug:string)=>catalog.services.find(x=>x.slug===slug)||null;
export const motionArticle=(slug:string)=>catalog.articles.find(x=>x.slug===slug)||null;
export const MOTION_PHOTO='/assets/portfolio/physiotherapy.webp';
export const MOTION_PHOTO_SOURCE='https://commons.wikimedia.org/wiki/File:Rehabilitaci%C3%B3n_fisioterapia.jpg';
