import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.cities);

export default function CitiesPage() {
  return <PlaceholderPage title={SITE_PAGES.cities.title} path={SITE_PAGES.cities.path} />;
}
