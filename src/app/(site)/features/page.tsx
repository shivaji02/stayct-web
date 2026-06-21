import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.features);

export default function FeaturesPage() {
  return <PlaceholderPage title={SITE_PAGES.features.title} path={SITE_PAGES.features.path} />;
}
