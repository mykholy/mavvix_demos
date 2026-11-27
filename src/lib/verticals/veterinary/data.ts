import catalog from '../../../../data/verticals/veterinary.json';
import type { Locale } from '@/lib/i18n/config';
export const PAWWELL=catalog;
export const pawPath=(locale:Locale,sub='')=>'/'+locale+'/preview/veterinary'+(sub?'/'+sub:'');
export const pawText=(copy:{ar:string;en:string},locale:Locale)=>copy[locale];
export const pawService=(slug:string)=>catalog.services.find(s=>s.slug===slug)||null;
export const pawArticle=(slug:string)=>catalog.articles.find(a=>a.slug===slug)||null;
export const PAW_HERO_IMAGE='/assets/portfolio/veterinary/vet_exam_dog.webp';
export const PAW_HERO_IMAGE_SOURCE='https://commons.wikimedia.org/wiki/File:Veterinary_Office_with_dog.JPG';
