import content from '../../../../data/verticals/sports-venues.json';
import type { Locale } from '@/lib/i18n/config';
export const ARENA=content;
export type ArenaFormat=typeof content.services[number];
export const arenaPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/sports-venues'+(suffix?'/'+suffix:'');
export const arenaFormat=(slug:string)=>content.services.find(s=>s.slug===slug)||null;
export const arenaGuide=(slug:string)=>content.articles.find(a=>a.slug===slug)||null;
export const arenaText=(value:{ar:string;en:string},locale:Locale)=>value[locale];
export const ARENA_PHOTOS={
 floodlit:'/assets/portfolio/sports-venues/floodlit_football_pitch.webp',
 night:'/assets/portfolio/sports-venues/night_football_action.webp',
 padel:'/assets/portfolio/sports-venues/panoramic_padel_court.webp',
 basketball:'/assets/portfolio/sports-venues/indoor_basketball_arena.webp',
 tennis:'/assets/portfolio/sports-venues/clay_tennis_court.webp'
} as const;

