import { notFound } from 'next/navigation';
import { getSiteBySlug } from '@/lib/db/repositories';
import { getPageByRouteKey } from '@/lib/db/cms';
import { CustomPageRenderer } from '@/components/cms/CustomPageRenderer';
import { ContactDock } from '@/components/shared/ContactDock';

interface Props {
  params: {
    locale: 'ar' | 'en';
    slug: string;
    pageSlug: string;
  };
}

export default function CustomDynamicPage({ params }: Props) {
  const { locale, slug, pageSlug } = params;

  const site = getSiteBySlug(slug);
  if (!site) notFound();

  const routeKey = `/p/${pageSlug}`;
  const cmsData = getPageByRouteKey(slug, routeKey);

  if (!cmsData || !cmsData.page) {
    notFound();
  }

  return (
    <>
      <CustomPageRenderer
        site={site}
        page={cmsData.page}
        sections={cmsData.sections}
        locale={locale}
      />
      <ContactDock locale={locale} sector={slug as any} />
    </>
  );
}
