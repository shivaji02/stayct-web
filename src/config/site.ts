import { SITE_LOCALE, SITE_NAME } from '@/constants/site';
import { env } from '@/config/env';

export const siteConfig = {
  name: SITE_NAME,
  locale: SITE_LOCALE,
  description: 'STAYCT public website foundation.',
  siteUrl: env.siteUrl,
  publicApiBaseUrl: env.publicApiBaseUrl,
} as const;
