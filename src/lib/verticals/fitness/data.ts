import content from '../../../../data/verticals/fitness.json';
import type { Locale } from '@/lib/i18n/config';
export const PULSE=content;
export const pulsePath=(locale:Locale,path='')=>'/'+locale+'/preview/fitness'+(path?'/'+path:'');
export const pulseClass=(slug:string)=>content.services.find(s=>s.slug===slug)||null;
export const pulseGuide=(slug:string)=>content.articles.find(g=>g.slug===slug)||null;
export const pulseText=(txt:{ar:string;en:string},l:Locale)=>txt[l];
export const PULSE_MEDIA = {
  floor: '/assets/portfolio/fitness/fitness_center_floor_equipment.webp',
  equipment: '/assets/portfolio/fitness/strength_selectorized_machine_suite.webp',
  deadlift: '/assets/portfolio/fitness/barbell_deadlift_technique_station.webp',
  kettlebell: '/assets/portfolio/fitness/kettlebell_functional_training_zone.webp',
  dumbbells: '/assets/portfolio/fitness/dumbbells_freeweight_rack_conditioning.webp',
  treadmill: '/assets/portfolio/fitness/treadmill_cardiovascular_endurance_bay.webp',
} as const;
