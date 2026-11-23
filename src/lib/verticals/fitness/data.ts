import content from '../../../../data/verticals/fitness.json';
import type { Locale } from '@/lib/i18n/config';
export const PULSE=content;
export const pulsePath=(locale:Locale,path='')=>'/'+locale+'/preview/fitness'+(path?'/'+path:'');
export const pulseClass=(slug:string)=>content.services.find(s=>s.slug===slug)||null;
export const pulseGuide=(slug:string)=>content.articles.find(g=>g.slug===slug)||null;
export const pulseText=(txt:{ar:string;en:string},l:Locale)=>txt[l];
export const PULSE_MEDIA={
 floor:'https://upload.wikimedia.org/wikipedia/commons/7/7d/Fitness_Center_Equipment.jpg',
 equipment:'https://upload.wikimedia.org/wikipedia/commons/4/40/Gym_Equipment.jpg',
} as const;
