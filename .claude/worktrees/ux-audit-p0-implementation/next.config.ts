import path from 'node:path';

import type { NextConfig } from 'next';

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self' https://fonts.gstatic.com",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob:",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: CONTENT_SECURITY_POLICY,
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

if (process.env.NODE_ENV === 'production') {
  securityHeaders.push({
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  });
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
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
