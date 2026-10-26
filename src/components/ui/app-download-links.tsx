import Link from 'next/link';

import { appDownloadConfig } from '@/config';

export function AppDownloadLinks() {
  const stores = [
    {
      ...appDownloadConfig.appStore,
      accessibleName: 'Download stayct on App Store',
    },
    {
      ...appDownloadConfig.googlePlay,
      accessibleName: 'Get stayct on Google Play',
    },
  ];

  return (
    <div className="mt-3 flex items-center gap-4">
      {stores.map((store) => (
        <Link
          key={store.label}
          href={store.url}
          aria-label={store.accessibleName}
          title={store.accessibleName}
          className="flex h-11 w-11 items-center justify-center text-white transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stayct-green-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center" aria-hidden="true">
            {store.platform === 'apple' ? <AppleIcon /> : <GooglePlayIcon />}
          </span>
        </Link>
      ))}
    </div>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current" focusable="false">
      <path d="M16.37 12.35c.02 2.22 1.95 2.96 1.97 2.97-.02.05-.31 1.07-1.02 2.12-.61.91-1.25 1.82-2.25 1.84-.98.02-1.3-.59-2.43-.59-1.13 0-1.49.57-2.42.61-.97.04-1.71-.99-2.32-1.9-1.26-1.83-2.22-5.17-.93-7.43.64-1.12 1.78-1.83 3.02-1.85.94-.02 1.83.64 2.42.64.58 0 1.67-.79 2.82-.68.48.02 1.82.19 2.68 1.44-.07.04-1.6.94-1.58 2.83ZM14.52 6.89c.51-.62.85-1.48.76-2.34-.74.03-1.63.49-2.16 1.11-.47.54-.88 1.42-.77 2.25.82.06 1.66-.42 2.17-1.02Z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" focusable="false">
      <path fill="#34A853" d="M3.6 2.5c-.38.4-.6 1.02-.6 1.82v15.36c0 .8.22 1.42.6 1.82L12.2 12 3.6 2.5Z" />
      <path fill="#4285F4" d="m3.6 21.5.14.13c.65.68 1.68.76 2.65.2l10.2-5.82L12.2 12l-8.6 9.5Z" />
      <path fill="#FBBC04" d="m16.59 15.99 4.23-2.41c1.58-.9 1.58-2.27 0-3.17l-4.23-2.41L12.2 12l4.39 3.99Z" />
      <path fill="#EA4335" d="M3.6 2.5 12.2 12l4.39-3.99L6.39 2.19c-1.03-.59-2.1-.49-2.79.31Z" />
    </svg>
  );
}
