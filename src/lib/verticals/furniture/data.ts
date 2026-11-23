import content from '../../../../data/verticals/furniture.json';
import type { Locale } from '@/lib/i18n/config';
export const OAKLINE=content;
export type OaklineProduct=typeof content.services[number];
export const oakPath=(locale:Locale,slug='')=>'/'+locale+'/preview/furniture'+(slug?'/'+slug:'');
export const oakProduct=(slug:string)=>content.services.find(p=>p.slug===slug)||null;
export const oakGuide=(slug:string)=>content.articles.find(a=>a.slug===slug)||null;
export const oakText=(copy:{ar:string;en:string},locale:Locale)=>copy[locale];
export const OAK_PHOTOS={
 room:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Living_room_%28Unsplash%29.jpg/1280px-Living_room_%28Unsplash%29.jpg',
 sofa:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Couch-furniture-living-room-sofa_%2824300293356%29.jpg/1280px-Couch-furniture-living-room-sofa_%2824300293356%29.jpg',
 vignette:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Furnished_living_room._%28Unsplash%29.jpg/768px-Furnished_living_room._%28Unsplash%29.jpg',
} as const;
