import type { Metadata } from 'next';

import { seoConfig, siteConfig } from '@/config';
import type { PageMetadataInput } from '@/types';
import { absoluteUrl } from '@/lib/url';

export function buildPageMetadata({ title, description, path, noIndex = false }: PageMetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const pageDescription = description ?? seoConfig.description;

  return {
    title,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      title,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary',
      title,
      description: pageDescription,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}
