import { SITE_LOCALE, SITE_NAME } from '@/constants/site';
import { env } from '@/config/env';

export const siteConfig = {
  name: SITE_NAME,
  locale: SITE_LOCALE,
  description: 'Discovery-first accommodation search across cities, categories, and stay listings.',
  siteUrl: env.siteUrl,
  publicApiBaseUrl: env.publicApiBaseUrl,
} as const;
