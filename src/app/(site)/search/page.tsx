import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.search);

export default function SearchPage() {
  return <PlaceholderPage title={SITE_PAGES.search.title} path={SITE_PAGES.search.path} />;
}
