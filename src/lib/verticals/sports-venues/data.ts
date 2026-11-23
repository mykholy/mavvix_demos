import content from '../../../../data/verticals/sports-venues.json';
import type { Locale } from '@/lib/i18n/config';
export const ARENA=content;
export type ArenaFormat=typeof content.services[number];
export const arenaPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/sports-venues'+(suffix?'/'+suffix:'');
export const arenaFormat=(slug:string)=>content.services.find(s=>s.slug===slug)||null;
export const arenaGuide=(slug:string)=>content.articles.find(a=>a.slug===slug)||null;
export const arenaText=(value:{ar:string;en:string},locale:Locale)=>value[locale];
export const ARENA_PHOTOS={
 floodlit:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Pexels-jonathan-petersson-399187.jpg/1280px-Pexels-jonathan-petersson-399187.jpg',
 night:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Soccer_at_night_%28Unsplash%29.jpg/1280px-Soccer_at_night_%28Unsplash%29.jpg'
} as const;
