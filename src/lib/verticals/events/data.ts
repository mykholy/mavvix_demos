import content from '../../../../data/verticals/events.json';
import type { Locale } from '@/lib/i18n/config';
export const LUMA_EVENTS = content;
export const lumaPath = (locale: Locale, suffix = '') => '/' + locale + '/preview/events' + (suffix ? '/' + suffix : '');
export const lumaExperience = (slug: string) => content.services.find(s => s.slug === slug) ?? null;
export const lumaArticle = (slug: string) => content.articles.find(s => s.slug === slug) ?? null;
