import { env } from './env';

export const ANDROID_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.stayct.app';
export const APP_STORE_URL = 'https://apps.apple.com/us/app/stayct/id6811476546';

export const appDownloadConfig = {
  appStore: {
    platform: 'apple',
    label: 'Download on the App Store',
    url: env.appStoreUrl ?? APP_STORE_URL,
    status: 'ready',
    note: 'App Store link unavailable',
  },
  googlePlay: {
    platform: 'google-play',
    label: 'Get it on Google Play',
    url: env.googlePlayUrl ?? ANDROID_PLAY_STORE_URL,
    status: 'ready',
    note: 'Google Play link coming soon',
  },
} as const;
