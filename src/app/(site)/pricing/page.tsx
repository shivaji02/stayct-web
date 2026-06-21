import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.pricing);

export default function PricingPage() {
  return <PlaceholderPage title={SITE_PAGES.pricing.title} path={SITE_PAGES.pricing.path} />;
}
