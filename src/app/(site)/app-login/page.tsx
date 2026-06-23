import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.appLogin);

export default function AppLoginPage() {
  return <PlaceholderPage title={SITE_PAGES.appLogin.title} path={SITE_PAGES.appLogin.path} />;
}
