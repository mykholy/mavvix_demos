import content from '../../../../data/verticals/travel-agency.json';
import type { Locale } from '@/lib/i18n/config';

export const NOMAD_ROUTES = content;
export const nomadPath = (locale: Locale, suffix = '') =>
  '/' + locale + '/preview/travel-agency' + (suffix ? '/' + suffix : '');
export const nomadJourney = (slug: string) => content.services.find((journey) => journey.slug === slug) ?? null;
export const nomadArticle = (slug: string) => content.articles.find((article) => article.slug === slug) ?? null;
export const nomadText = (value: { ar: string; en: string }, locale: Locale) => value[locale];
