import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { seoConfig, siteConfig } from '@/config';
import { SUPPORT_CONTACT } from '@/content';
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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    email: SUPPORT_CONTACT.email,
    telephone: SUPPORT_CONTACT.phoneDisplay,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_CONTACT.email,
        telephone: SUPPORT_CONTACT.phoneDisplay,
        areaServed: 'IN',
        availableLanguage: 'en',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'business support',
        email: SUPPORT_CONTACT.email,
        telephone: SUPPORT_CONTACT.phoneDisplay,
        areaServed: 'IN',
        availableLanguage: 'en',
      },
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
