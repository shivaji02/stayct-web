import path from 'node:path';

import { loadEnvConfig } from '@next/env';
import type { NextConfig } from 'next';

import { buildContentSecurityPolicy } from './src/config/csp';

// next.config is evaluated before Next's automatic .env load in some paths.
// Load it here so DEV connect-src uses the current NEXT_PUBLIC_API_BASE_URL origin.
loadEnvConfig(process.cwd());

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

function securityHeaders() {
  const production = isProduction();
  const headers = [
    {
      key: 'Content-Security-Policy',
      value: buildContentSecurityPolicy({
        apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL,
        isProduction: production,
      }),
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    },
  ];

  if (production) {
    headers.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    });
  }

  return headers;
}

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(process.cwd()),
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/contact', destination: '/support', permanent: true },
      { source: '/help', destination: '/support', permanent: true },
      { source: '/pricing', destination: '/resources', permanent: true },
      { source: '/features', destination: '/resources', permanent: true },
      { source: '/operators', destination: '/list-property', permanent: true },
      { source: '/operators/owners', destination: '/list-property', permanent: true },
      { source: '/operators/managers', destination: '/manage-property', permanent: true },
      { source: '/operators/tenants', destination: '/support', permanent: true },
      { source: '/app-login', destination: '/manage-property', permanent: true },
      { source: '/property/:slug', destination: '/stays/:slug', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders(),
      },
    ];
  },
};

export default nextConfig;
