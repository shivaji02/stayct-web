import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.about);

export default function AboutPage() {
  return <PlaceholderPage title={SITE_PAGES.about.title} path={SITE_PAGES.about.path} />;
}
