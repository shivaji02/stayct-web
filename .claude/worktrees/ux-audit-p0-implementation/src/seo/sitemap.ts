import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/url';
import type { PageContentEntry, SitemapChangeFrequency } from '@/types';

export type SitemapEntryInput = Pick<PageContentEntry, 'path' | 'priority' | 'changeFrequency'> & {
  lastModified?: Date;
};

export function buildSitemapEntries(entries: readonly SitemapEntryInput[]): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: entry.lastModified,
    priority: entry.priority,
    changeFrequency: entry.changeFrequency as SitemapChangeFrequency | undefined,
  }));
}
