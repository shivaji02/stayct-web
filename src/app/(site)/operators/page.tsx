import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.operators);

export default function OperatorsPage() {
  return <PlaceholderPage title={SITE_PAGES.operators.title} path={SITE_PAGES.operators.path} />;
}
