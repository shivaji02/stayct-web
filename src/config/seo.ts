import { SITE_NAME } from '@/constants/site';

export type SeoConfig = Readonly<{
  siteName: string;
  defaultTitle: string;
  titleTemplate: string;
  description: string;
  robots: Readonly<{
    index: boolean;
    follow: boolean;
  }>;
  sitemap: Readonly<{
    changeFrequency: 'monthly' | 'weekly';
    enableDynamicRoutes: boolean;
  }>;
}>;

export const seoConfig: SeoConfig = {
  siteName: SITE_NAME,
  defaultTitle: SITE_NAME,
  titleTemplate: `%s | ${SITE_NAME}`,
  description: 'Find and compare PGs, hostels, co-living, shared flats, and rental rooms across Indian cities with STAYCT.',
  robots: {
    index: true,
    follow: true,
  },
  sitemap: {
    changeFrequency: 'monthly',
    enableDynamicRoutes: true,
  },
} as const;
