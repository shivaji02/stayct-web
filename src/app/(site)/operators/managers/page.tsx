import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.operatorsManagers);

export default function ManagersPage() {
  return <PlaceholderPage title={SITE_PAGES.operatorsManagers.title} path={SITE_PAGES.operatorsManagers.path} />;
}
