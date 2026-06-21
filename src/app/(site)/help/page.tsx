import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.help);

export default function HelpPage() {
  return <PlaceholderPage title={SITE_PAGES.help.title} path={SITE_PAGES.help.path} />;
}
