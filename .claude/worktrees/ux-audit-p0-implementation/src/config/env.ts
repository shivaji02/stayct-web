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

function readRequiredUrl(name: string, fallback: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`${name} is required in production.`);
    }

    return assertAbsoluteHttpUrl(fallback, name);
  }

  return assertAbsoluteHttpUrl(value, name);
}

function readOptionalUrl(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? assertAbsoluteHttpUrl(value, name) : null;
}

export const env = {
  siteUrl: readRequiredUrl('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000'),
  publicApiBaseUrl: readOptionalUrl('NEXT_PUBLIC_API_BASE_URL') ?? readOptionalUrl('API_BASE_URL'),
} as const;
