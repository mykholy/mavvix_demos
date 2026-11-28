import content from '../../../../data/verticals/home-maintenance.json';
import type { Locale } from '@/lib/i18n/config';

export const HOME_CARE = content;

export const HOME_PHOTOS = {
  hvacIndoor: '/assets/portfolio/home-maintenance/hvac_split_indoor_unit.webp',
  hvacCondenser: '/assets/portfolio/home-maintenance/hvac_condenser_outdoor_system.webp',
  plumbingManifold: '/assets/portfolio/home-maintenance/plumbing_manifold_pipework.webp',
  electricalPanel: '/assets/portfolio/home-maintenance/electrical_distribution_panel.webp',
  carpentryWorkshop: '/assets/portfolio/home-maintenance/precision_carpentry_workshop.webp',
  multimeterTest: '/assets/portfolio/home-maintenance/diagnostic_multimeter_testing.webp'
};

export const maintenancePath = (locale: Locale, slug = '') =>
  '/' + locale + '/preview/home-maintenance' + (slug ? '/' + slug : '');

export const careService = (slug: string) =>
  content.services.find((s) => s.slug === slug) || null;

export const careGuide = (slug: string) =>
  content.articles.find((a) => a.slug === slug) || null;

export const careLocale = (v: { ar: string; en: string }, l: Locale) => v[l];
