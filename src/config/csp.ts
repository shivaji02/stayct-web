type CspOptions = {
  apiBaseUrl?: string | null;
  isProduction: boolean;
};

/**
 * Derive a single CSP connect-src origin from the configured public API base URL.
 * Strips the path (e.g. `/api/v1`) and never returns wildcards or scheme-only tokens.
 */
export function resolvePublicApiConnectSrcOrigin(raw: string | null | undefined): string | null {
  const trimmed = raw?.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const url = new URL(trimmed);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return null;
    }

    if (!url.hostname) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

export function buildContentSecurityPolicy({ apiBaseUrl, isProduction }: CspOptions): string {
  const apiOrigin = resolvePublicApiConnectSrcOrigin(apiBaseUrl);
  const connectSrc = apiOrigin ? `connect-src 'self' ${apiOrigin}` : "connect-src 'self'";

  return [
    "default-src 'self'",
    "base-uri 'self'",
    connectSrc,
    "font-src 'self' https://fonts.gstatic.com",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' data: blob:",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    ...(isProduction ? ['upgrade-insecure-requests'] : []),
  ].join('; ');
}
