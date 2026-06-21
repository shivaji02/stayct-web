import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { seoConfig, siteConfig } from '@/config';
import { AppProviders } from '@/providers';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  applicationName: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
