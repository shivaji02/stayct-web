import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.home);

export default function HomePage() {
  return <PlaceholderPage title={SITE_PAGES.home.title} path={SITE_PAGES.home.path} />;
}
