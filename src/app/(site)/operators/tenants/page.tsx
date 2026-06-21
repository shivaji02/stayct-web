import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.operatorsTenants);

export default function TenantsPage() {
  return <PlaceholderPage title={SITE_PAGES.operatorsTenants.title} path={SITE_PAGES.operatorsTenants.path} />;
}
