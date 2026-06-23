import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.privacy);

export default function PrivacyPage() {
  return <PlaceholderPage title={SITE_PAGES.privacy.title} path={SITE_PAGES.privacy.path} />;
}
