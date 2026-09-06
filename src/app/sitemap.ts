import type { MetadataRoute } from 'next';

import { routeBuilders } from '@/constants/routes';
import { SITE_SITEMAP_ENTRIES } from '@/content';
import { getDiscoveryListingSlugs } from '@/services/public-api';
import { buildSitemapEntries } from '@/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: string[] = [];
  try {
    slugs = await getDiscoveryListingSlugs();
  } catch {
    slugs = [];
  }
  const publicStayEntries = slugs.map((slug) => ({
    path: routeBuilders.stay(slug) as `/${string}`,
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  }));

  return buildSitemapEntries([...SITE_SITEMAP_ENTRIES, ...publicStayEntries]);
}
