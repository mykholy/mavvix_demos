import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { verifySessionToken } from '@/lib/security/auth';
import {
  getSiteBySlug,
  getSubmissions,
  getProjects,
  getCatalogItems,
  getPropertyUnits,
  getDentalServices,
  getRestaurantDishes,
  getAcademyCourses,
} from '@/lib/db/repositories';
import { getSitePages, getPageByRouteKey } from '@/lib/db/cms';
import { SiteDashboardClient } from './SiteDashboardClient';

const SECTOR_ROUTES_MAP: Record<string, string[]> = {
  construction: [
    '',
    '/projects',
    '/projects/tower-al-andalus',
    '/services',
    '/services/commercial-structural-works',
    '/process',
    '/request-quote',
    '/about',
    '/contact',
    '/journal',
    '/journal/deep-foundations-guidelines',
  ],
  industrial: [
    '',
    '/products',
    '/products/ferro-beam-he-b',
    '/industries',
    '/process',
    '/rfq',
    '/compare',
    '/about',
    '/contact',
    '/resources',
    '/resources/iso-compliance-structural-steels',
  ],
  'real-estate': [
    '',
    '/properties',
    '/properties/meridian-sky-penthouse',
    '/developments',
    '/developments/meridian-cove-residences',
    '/compare',
    '/viewing',
    '/saved',
    '/about',
    '/contact',
    '/journal',
    '/journal/coastal-living-architecture',
  ],
  dental: [
    '',
    '/services',
    '/services/cosmetic-porcelain-veneers',
    '/team',
    '/team/dr-amina-khalil',
    '/patient-guide',
    '/patient-guide/first-visit-preparation',
    '/request-appointment',
    '/locations',
    '/faq',
    '/contact',
  ],
  ecommerce: [
    '',
    '/shop',
    '/collections',
    '/collections/spring-summer-atelier',
    '/products/noria-cashmere-overcoat',
    '/search',
    '/cart',
    '/checkout',
    '/lookbook',
    '/journal',
    '/journal/sustainable-weaving-practices',
    '/contact',
    '/faq',
  ],
  portfolio: [
    '',
    '/work',
    '/work/al-rawabi-cultural-pavilion',
    '/services',
    '/approach',
    '/intake',
    '/journal',
    '/journal/minimalist-sculptural-spaces',
    '/about',
    '/contact',
  ],
  restaurant: [
    '',
    '/menu',
    '/menu/lamb-tagine-royal',
    '/story',
    '/locations',
    '/locations/downtown-heritage-bistro',
    '/reserve',
    '/order',
    '/journal',
    '/journal/art-of-saffron-infusion',
    '/faq',
  ],
  academy: [
    '',
    '/courses',
    '/courses/full-stack-nextjs-enterprise',
    '/learn/full-stack-nextjs-enterprise/lesson-01-01',
    '/quiz/lesson-01-01',
    '/learning-paths',
    '/enrollment-interest',
    '/instructors',
    '/instructors/tariq-al-mansoor',
    '/resources',
    '/resources/clean-architecture-handbook',
    '/faq',
  ],
};

export default async function SiteDetailPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const cookieStore = await cookies();
  const token = cookieStore.get('mavvix_admin_session')?.value;
  const admin = token ? verifySessionToken(token) : null;

  if (!admin) {
    redirect('/admin/login');
  }

  const { slug } = params;
  const site = getSiteBySlug(slug);

  if (!site) {
    notFound();
  }

  // Fetch submissions specifically for this site
  const siteSubmissions = getSubmissions(slug);

  // Fetch sector-specific inventory/items for this site
  let sectorItems: any[] = [];
  try {
    if (slug === 'restaurant') {
      sectorItems = getRestaurantDishes('ar');
    } else if (slug === 'real-estate') {
      sectorItems = getPropertyUnits('ar');
    } else if (slug === 'construction') {
      sectorItems = getProjects('construction', 'ar');
    } else if (slug === 'industrial') {
      sectorItems = getCatalogItems('industrial', 'ar');
    } else if (slug === 'dental') {
      sectorItems = getDentalServices('ar');
    } else if (slug === 'ecommerce') {
      sectorItems = getCatalogItems('ecommerce', 'ar');
    } else if (slug === 'portfolio') {
      sectorItems = getProjects('portfolio', 'ar');
    } else if (slug === 'academy') {
      sectorItems = getAcademyCourses('ar');
    }
  } catch (err) {
    console.error('Error fetching sector items for', slug, err);
  }

  const siteRoutes = SECTOR_ROUTES_MAP[slug] || ['', '/about', '/contact'];
  const initialPages = getSitePages(slug);
  const initialHomeSections = getPageByRouteKey(slug, '/')?.sections || [];

  return (
    <SiteDashboardClient
      site={site}
      submissions={siteSubmissions}
      sectorItems={sectorItems}
      routes={siteRoutes}
      adminUser={admin}
      initialPages={initialPages}
      initialHomeSections={initialHomeSections}
    />
  );
}

