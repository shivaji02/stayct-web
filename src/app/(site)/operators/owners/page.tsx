import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.operatorsOwners);

export default function OwnersPage() {
  return <PlaceholderPage title={SITE_PAGES.operatorsOwners.title} path={SITE_PAGES.operatorsOwners.path} />;
}
