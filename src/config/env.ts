function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function assertAbsoluteHttpUrl(value: string, name: string): string {
  try {
    const url = new URL(value);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error();
    }

    return trimTrailingSlash(url.toString());
  } catch {
    throw new Error(`Invalid ${name}: expected an absolute http(s) URL.`);
  }
}

function readRequiredUrl(value: string | undefined, name: string, fallback: string): string {
  const trimmed = value?.trim();

  if (!trimmed) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`${name} is required in production.`);
    }

    return assertAbsoluteHttpUrl(fallback, name);
  }

  return assertAbsoluteHttpUrl(trimmed, name);
}

function readOptionalUrl(value: string | undefined, name: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? assertAbsoluteHttpUrl(trimmed, name) : null;
}

export const env = {
  // Next.js only inlines NEXT_PUBLIC_* values that are accessed as static
  // property reads. Dynamic process.env[name] stays undefined in the browser.
  siteUrl: readRequiredUrl(process.env.NEXT_PUBLIC_SITE_URL, 'NEXT_PUBLIC_SITE_URL', 'http://localhost:3000'),
  publicApiBaseUrl:
    readOptionalUrl(process.env.NEXT_PUBLIC_API_BASE_URL, 'NEXT_PUBLIC_API_BASE_URL') ??
    readOptionalUrl(process.env.API_BASE_URL, 'API_BASE_URL'),
} as const;
