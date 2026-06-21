import { PlaceholderPage } from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.contact);

export default function ContactPage() {
  return <PlaceholderPage title={SITE_PAGES.contact.title} path={SITE_PAGES.contact.path} />;
}
