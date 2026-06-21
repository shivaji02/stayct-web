import type { MetadataRoute } from 'next';

import { SITE_SITEMAP_ENTRIES } from '@/content';
import { buildSitemapEntries } from '@/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries(SITE_SITEMAP_ENTRIES);
}
