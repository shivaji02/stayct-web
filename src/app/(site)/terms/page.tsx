import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.terms);

export default function TermsPage() {
  return <PlaceholderPage title={SITE_PAGES.terms.title} path={SITE_PAGES.terms.path} />;
}
