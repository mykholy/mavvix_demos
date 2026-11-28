import content from '../../../../data/verticals/auto-service.json';
import type { Locale } from '@/lib/i18n/config';

export const AUTO_SERVICE=content;
export type AutoService=typeof content.services[number];
export type AutoArticle=typeof content.articles[number];
export function localized<T extends {ar:string;en:string}>(obj:T,locale:Locale){return obj[locale];}
export function findAutoService(slug:string){return content.services.find(s=>s.slug===slug)||null;}
export function findAutoArticle(slug:string){return content.articles.find(a=>a.slug===slug)||null;}
export const AUTO_BASE='/preview/auto-service';
export function autoPath(locale:Locale,suffix=''){return '/'+locale+AUTO_BASE+(suffix?'/'+suffix:'');}
export const AUTO_HERO_LOCAL = '/assets/portfolio/auto-service/engine_bay_diagnostic.webp';

