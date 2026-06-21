import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.resources);

export default function ResourcesPage() {
  return <PlaceholderPage title={SITE_PAGES.resources.title} path={SITE_PAGES.resources.path} />;
}
