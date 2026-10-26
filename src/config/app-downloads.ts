import { env } from './env';

export const ANDROID_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.stayct.app';

export const appDownloadConfig = {
  appStore: {
    label: 'Download on the App Store',
    url: env.appStoreUrl,
    status: env.appStoreUrl ? 'ready' : 'waiting',
    note: 'Waiting for public App Store release',
  },
  googlePlay: {
    label: 'Get it on Google Play',
    url: env.googlePlayUrl ?? ANDROID_PLAY_STORE_URL,
    status: 'ready',
    note: 'Google Play link coming soon',
  },
} as const;
