import content from '../../../../data/verticals/interiors-kitchens.json';
import type { Locale } from '@/lib/i18n/config';
export const FORMA=content;
export const formaPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/interiors-kitchens'+(suffix?'/'+suffix:'');
export const formaService=(slug:string)=>content.services.find(s=>s.slug===slug)||null;
export const formaArticle=(slug:string)=>content.articles.find(a=>a.slug===slug)||null;
export const formaText=(text:{ar:string;en:string},locale:Locale)=>text[locale];
export const FORMA_IMAGES={
 hero:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kitchen_Design.jpg/960px-Kitchen_Design.jpg',
 cabinetry:'https://upload.wikimedia.org/wikipedia/commons/3/35/Newly_renovated_kitchen_with_cabinets_refrigerator_stove_and_hardwood_floor.jpg',
} as const;
