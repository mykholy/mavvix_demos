import type { CSSProperties } from 'react';

type Sector = 'construction' | 'industrial' | 'real-estate' | 'dental' | 'ecommerce' | 'portfolio' | 'restaurant' | 'academy';
const photo = (id: string) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=1600&q=82';
export const SECTOR_IMAGES: Record<Sector, readonly [string, string]> = {
  construction: [photo('photo-1747056711958-9d8c3b97b578'), photo('photo-1781888688940-5730c3fd5baf')],
  industrial: [photo('photo-1748347084012-075796185d56'), photo('photo-1717386255767-52643970d483')],
  'real-estate': [photo('photo-1760611655987-d348d6d28174'), photo('photo-1774311237295-a65a4c1ff38a')],
  dental: [photo('photo-1704455306251-b4634215d98f'), photo('photo-1642844771937-23accb161a3d')],
  ecommerce: [photo('photo-1747396206869-75ea57b325ce'), photo('photo-1752825609278-f9696bc9d7bd')],
  portfolio: [photo('photo-1772442198907-765685249ea4'), photo('photo-1755520795091-adf1f3f307e0')],
  restaurant: [photo('photo-1741851259674-584c7b63d841'), photo('photo-1564695668588-7b2acfd497e5')],
  academy: [photo('photo-1778735940467-1335c201966d'), photo('photo-1755520795091-adf1f3f307e0')],
};
const extraFashion = photo('photo-1783113298894-eeb3b71315d9');
export const EDITORIAL_FASHION = [SECTOR_IMAGES.ecommerce[0], SECTOR_IMAGES.ecommerce[1], extraFashion];
export function getProductEditorialPhoto(slug: string) {
  let hash = 0;
  for (const char of slug) hash = ((hash * 31) + char.charCodeAt(0)) >>> 0;
  return EDITORIAL_FASHION[hash % EDITORIAL_FASHION.length];
}
export function getSectorHeroStyle(sector: Sector): CSSProperties {
  const dark = ['construction', 'industrial', 'real-estate'].includes(sector);
  const shade = dark
    ? 'linear-gradient(104deg,rgba(13,25,31,.98) 0%,rgba(13,25,31,.94) 48%,rgba(13,25,31,.57) 100%)'
    : 'linear-gradient(105deg,rgba(251,249,246,.97) 0%,rgba(251,249,246,.95) 52%,rgba(251,249,246,.65) 100%)';
  return {
    backgroundImage: shade + ', url("' + SECTOR_IMAGES[sector][0] + '")',
    backgroundPosition: 'center, center 48%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
}
